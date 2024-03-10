const express = require('express');
const sequelize = require('sequelize')

const Organization = require('../database/models/organization');
const Employee = require('../database/models/employee');
const User = require('../database/models/user');
const Deal = require('../database/models/deals');
const Contact = require('../database/models/contact');

// create a new organization
const postOrganization = async (req, res) => {
    const { name } = req.body;
    if (name.trim() === "") 
        return res.status(400).json({ success:false, error: "Organization name is required" });
    try {
        const existingOrganization = await Organization.findAll({ where: { name } });
        if  (existingOrganization.length > 0)
            res.status(400).json({ success:false, error: "Organization already exists" });
        else {
            const organization = await Organization.create({ name });
            res.status(201).json({ success:true, organization });
        }
    } catch (error) {
        res.status(500).json({ success:false, error });
    } 
}

const getOrganizationByCode = async (req, res) => {
    const { code } = req.params
    try {
        const existingOrganization = await Organization.findAll({where: { code: code }})
        if (existingOrganization.length === 1) {
            res.status(200).json({success: true, existingOrganization})
        } else {
            res.status(404).json({success: false, error: "no organization found"})
        }
    } catch (error) {
        res.status(500).json({ success:false, error });
    }
}

const getOrganizationById = async (req, res) => {
    const { id } = req.params
    try {
        const existingOrganization = await Organization.findByPk(id)
        if (existingOrganization.length === 1) {
            res.status(200).json({success: true, existingOrganization})
        } else {
            res.status(404).json({success: false, error: "no organization found"})
        }
    } catch (error) {
        res.status(500).json({ success:false, error });
    }
}

const getOrganizationByUserId = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findByPk(userId, { include: [Employee] });
        if (user) {
            const idOrganization = user.Employee.organizationId;
            const organization = await Organization.findByPk(idOrganization)
            if (organization) {
                res.status(200).json({success:true, organization})
            } else {
                res.status(404).json({ success:false, error: "Organization not found" });
            }
        } else {
            res.status(404).json({ success:false, error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success:false, error: "error" });
    }
}

const getOrganizationMembers = async (req, res) => {
    const { id } = req.params
    try {
        const organizationMembers = await Employee.findAll({where: {organizationId: id}})
        if (organizationMembers) {
            res.status(200).json({success: true, organizationMembers})
        } else {
            res.status(404).json({success: false, error: "no members found"})
        }
    } catch(error) {
        res.status(500).json({ success:false, error: "error occured" });
    }
}

const getOrganizationDeals = async (req, res) => {
    const { id } = req.params
    try {
        const organizationDeals = await Deal.findAll({where: {organizationId: id}, 
            include: [
                { model: Employee , 
                    include: [
                        { model: User }
                    ]
                },
                { model: Contact },
            ]
        })
        if (organizationDeals) {
            res.status(200).json({success: true, organizationDeals})
        } else {
            res.status(404).json({success: false, error: "no deals found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error occured" });
    }
}

const getStructuredOrganizationDeals = async (req, res) => {
    const { id } = req.params
    try {
        const organizationDeals = await Deal.findAll({
            where: {
                organizationId: id
            },
            attributes: [
              'organizationId',
              [sequelize.literal("EXTRACT('YEAR' FROM date)"), 'YEAR'],
              [sequelize.literal("EXTRACT('MONTH' FROM date)"), 'MONTH'],
              [sequelize.literal('SUM(value)'), 'SUM_VALUE'],
              [sequelize.literal('COUNT(value)'), 'COUNT_VALUE']
            ],
            group: ['organizationId', sequelize.literal("EXTRACT('YEAR' FROM date)"), sequelize.literal("EXTRACT('MONTH' FROM date)")],
          });

        if (organizationDeals) {
            res.status(200).json({success: true, organizationDeals})
        } else {
            res.status(404).json({success: false, error: "no deals found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error occured" });
    } 
}

const getOrganizationDealsYears = async (req, res) => {
    const { id } = req.params;
    try {
        const years = await Deal.findAll({
            attributes: [
                [sequelize.literal("EXTRACT('year' FROM date)"), 'year']
            ],
            group: sequelize.literal("EXTRACT('year' FROM date)"),
            where: {
                organizationId: id
            },
            raw: true
        });

        if (years.length) {
            const yearsArray = years.map(yearObj => yearObj.year);
            res.status(200).json({ success: true, years: yearsArray });
        } else {
            res.status(200).json({ success: true, years: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Error occurred" });
    }
}


module.exports = {
    postOrganization,
    getOrganizationByCode,
    getOrganizationMembers,
    getOrganizationById,
    getOrganizationByUserId,
    getOrganizationDeals,
    getStructuredOrganizationDeals,
    getOrganizationDealsYears
}