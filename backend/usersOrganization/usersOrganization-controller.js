const express = require("express");

const UserOrganization = require("../database/models/userOrganization");
const Organization = require("../database/models/organization");
const User = require("../database/models/user");

// create a new userOrganization
const postUserOrganization = async (req, res) => {
    const { role, userId, organizationId } = req.body;
    try {
        const userOrganization = await UserOrganization.create({ role, userId, organizationId });
        res.status(201).json({ success:true, userOrganization });
    } catch (error) {
        res.status(500).json({ success:false, error: "error creating the userOrganization" });
    }
}

module.exports = {
    postUserOrganization,
}