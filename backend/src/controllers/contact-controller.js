const express = require("express");
const { Sequelize, Op } = require('sequelize');

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact");
const Deal = require("../database/models/deals");

const addContact = async (req, res) => {
    const info = req.body
    info.organizationId = req.organizationId
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (info.emailAddress && !emailRegex.test(info.emailAddress)) {
            res.status(400).json({ success: false, error: "Invalid email format!" });
        } else {
            const newContact = await Contact.create(info)
            res.status(201).json({success: true, contact: newContact})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "Contact email already exists!" });
    }
}


const getContactsByOrganizationId = async (req, res) => {
    const organizationId = req.organizationId
    try {
        const contacts = await Contact.findAll({
            where: {organizationId: organizationId}, 
            order: [ ['id', 'ASC'] ]
        })
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

const getCustomersByOrganizationId = async (req, res) => {
    const organizationId = req.organizationId
    try {
        const contacts = await Contact.findAll({
            where: {organizationId: organizationId, pipelineStatus: 'customer'},
            order: [ ['id', 'ASC'] ]
        })
        if (contacts.length > 0) {
            res.status(200).json({success: true, contacts})
        } else {
            res.status(404).json({success: false, error: "no customers found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the customers" });
    }
}


const getContactById = async (req, res) => {
    const { id } = req.params
    try {
        const contact = await Contact.findByPk(id)
        if (contact) {
            res.status(200).json({success: true, contact})
        } else {
            res.status(404).json({success:false, error: "contact not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the contact" });
    }
}

const deleteContactById = async (req, res) => {
    const { id } = req.params
    try {
        const contact = await Contact.findByPk(id)

        const contactDeals = await Deal.findAll({ where: { contactId: id } })
        if (contactDeals.length > 0) {
            await Deal.update({ contactId: null }, { where: { contactId: id } });
        }

        await contact.destroy()
        res.status(200).json({success: true, message: "contact deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error contact deal" });
    }
}

const updateContact = async (req, res) => {
    const body = req.body
    try {
        const contact = await Contact.findByPk(body.id)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (body.emailAddress && !emailRegex.test(body.emailAddress)) {
            return res.status(400).json({ success: false, error: "Invalid email format!" });
        } 
        contact.firstName = body.firstName
        contact.lastName = body.lastName
        contact.professionalTitle = body.professionalTitle
        contact.emailAddress = body.emailAddress
        contact.homeAddress = body.homeAddress
        contact.phoneNumber = body.phoneNumber
        contact.companyName = body.companyName
        await contact.save()
        return res.status(200).json({success: true, message: "Contact modified successfully!"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success:false, error: "Contact email already exists!" });
    }
}

module.exports = {
    addContact,
    getContactsByOrganizationId,
    getContactById,
    getCustomersByOrganizationId,
    deleteContactById,
    updateContact
}