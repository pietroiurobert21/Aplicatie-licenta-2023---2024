const express = require('express');

const Organization = require('../database/models/organization');
const UserOrganization = require('../database/models/userOrganization');

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

module.exports = {
    postOrganization,
}