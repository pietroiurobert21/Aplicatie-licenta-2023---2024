const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact")


const getLeadsByOrganizationId = async (req, res) => {
    const { organizationId } = req.params
    try {
        const leads = await Contact.findAll({where: {organizationId: organizationId, pipelineStatus: 'lead'}})
        if (leads.length > 0) {
            res.status(200).json({success: true, leads})
        } else {
            res.status(404).json({success: false, error: "no leads found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the leads" });
    }
}

module.exports = {
    getLeadsByOrganizationId
}