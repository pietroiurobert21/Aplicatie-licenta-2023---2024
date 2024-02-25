const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact")

const addContact = async (req, res) => {
    const info = req.body
    try {
        const newContact = await Contact.create(info)
        res.status(201).json({success: true, contact: newContact})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error creating the contact" });
    }
}

const getContactsByOrganizationId = async (req, res) => {
    const { organizationId } = req.params
    try {
        const contacts = await Contact.findAll({where: {organizationId: organizationId}})
        if (contacts.length > 0) {
            res.status(200).json({success: true, contacts})
        } else {
            res.status(404).json({success: false, error: "no contacts found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the contacts" });
    }
}

module.exports = {
    addContact,
    getContactsByOrganizationId
}