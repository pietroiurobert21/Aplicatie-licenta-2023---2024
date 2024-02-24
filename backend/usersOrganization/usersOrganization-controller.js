const express = require("express");

const UserOrganization = require("../database/models/userOrganization");
const Organization = require("../database/models/organization");
const User = require("../database/models/user");

// create a new userOrganization
const postUserOrganization = async (req, res) => {
    const { role, userId, organizationId } = req.body;
    try {
        const organization = await Organization.findAll({
            where:
                {id: organizationId}
        })
        if (organization) {
            const userOrganization = await UserOrganization.create({ role, userId, organizationId });
            res.status(201).json({ success:true, userOrganization });
        } else {
            res.status(404).json({ success:false, error: "organization not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error creating the userOrganization" });
    }
}

const getUserOrganizationByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const userOrganization = await UserOrganization.findAll({where: { userId: userId }})
        if (userOrganization && userOrganization[0]) {
            res.status(200).json({success: true, userOrganization: userOrganization[0]})
        } else {
            res.status(404).json({ success:false, error: "userOrganization not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the userOrganization" });
    }
}

module.exports = {
    postUserOrganization,
    getUserOrganizationByUserId
}