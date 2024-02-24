const express = require('express');

const Organization = require('../database/models/organization');
const Employee = require('../database/models/employee');

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

module.exports = {
    postOrganization,
    getOrganizationByCode,
    getOrganizationMembers
}