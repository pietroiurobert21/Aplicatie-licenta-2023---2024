const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact")


const getLeadsByOrganizationId = async (req, res) => {
    const filters = req.query
    const organizationId = req.organizationId


    const whereClause = {
        organizationId: organizationId,
        pipelineStatus: 'lead'
    }

    try {
        Object.keys(filters).forEach(key => {
            if (filters[key].trim())
                whereClause[key] = filters[key];
        });

        const leads = await Contact.findAll({
            where: whereClause,
            order: [ ['id', 'ASC'] ]
        })
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