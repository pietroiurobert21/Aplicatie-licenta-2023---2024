const express = require('express');
const sequelize = require('sequelize')
const { v4: uuidv4 } = require('uuid');

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

const getOrganizationByUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findByPk(userId, { include: [Employee] });
        if (user) {
            const idOrganization = user.Employee.organizationId;
            const organization = await Organization.findByPk(idOrganization)
            if (organization) {
                res.status(200).json({ success:true, organization })
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

const getOrganizationByCode = async (req, res) => {
    const { code } = req.params 
    try {
        const org = await Organization.findOne({where: {code: code}})
        if (org) {
            res.status(200).json({success: true, org})
        } else {
            res.status(404).json({success: false, error: "no organization found"})
        }
    } catch (error) {
        res.status(500).json({ success:false, error: "error" }); 
    }
}

const getOrganizationMembers = async (req, res) => {
    const id = req.organizationId
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
    const organizationId = req.organizationId
    const filters = req.query

    const whereClause = {
        organizationId: organizationId
    }

    if (filters.lowestValue && filters.lowestValue.trim() !== '') {
        whereClause.value = { [sequelize.Op.gte]: filters.lowestValue };
    }

    if (filters.highestValue && filters.highestValue.trim() !== '') {
        whereClause.value = {
            ...whereClause.value,
            [sequelize.Op.lte]: filters.highestValue
        };
    }

    const id = req.organizationId
    try {
        const organizationDeals = await Deal.findAll({where: whereClause, 
            include: [
                { model: Employee , 
                    include: [
                        { model: User }
                    ]
                },
                { model: Contact },
            ],
            order: [ ['id', 'ASC'] ]
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
    const id = req.organizationId
    try {
        const acceptedDeals = await Deal.findAll({
            where: {
                organizationId: id,
                status: 'accepted'
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

        const rejectedDeals = await Deal.findAll({
            where: {
                organizationId: id,
                status: 'rejected'
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

        const proposedDeals = await Deal.findAll({
            where: {
                organizationId: id,
                status: 'proposed'
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
        

        if (acceptedDeals || proposedDeals || rejectedDeals) {
            res.status(200).json({success: true, acceptedDeals, rejectedDeals, proposedDeals})
        } else {
            res.status(404).json({success: false, error: "no deals found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error occured" });
    } 
}

const getOrganizationDealsYears = async (req, res) => {
    const id = req.organizationId;
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
            yearsArray.sort((a, b) => b - a);
            res.status(200).json({ success: true, years: yearsArray });
        } else {
            res.status(200).json({ success: true, years: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Error occurred" });
    }
}

const changeCodeByOrganizationId = async (req, res) => {
    const id = req.organizationId
    try {
        const organization = await Organization.findByPk(id)
        if (organization) {
            organization.code = uuidv4()
            await organization.save()
            res.status(200).json({success: true, message: "invitation code has changed successfully"})
        } else {
            res.status(404).json({success: false, error: "organization not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "error occured"})
    }
}


const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Organization.findAll({
                order: [ ['points', 'DESC'] ],
                limit: 50 }
        );
        if (leaderboard) {
            leaderboard.forEach((org)=>delete org.dataValues.code)
            res.status(200).json({success: true, leaderboard});
        } else {
            res.status(404).json({success: false, error: "no organization found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "error occured"});
    }
}


module.exports = {
    postOrganization,
    getOrganizationByCode,
    getOrganizationMembers,
   // getOrganizationById,
    
    getOrganizationByUser,
    
    getOrganizationDeals,
    getStructuredOrganizationDeals,
    getOrganizationDealsYears,
    changeCodeByOrganizationId,

    getLeaderboard
}