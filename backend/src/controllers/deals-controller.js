const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact");
const Deal = require("../database/models/deals")

const addDeal = async (req, res) => {
    const dealInfo = req.body
    try {
        const newDeal = await Deal.create(dealInfo)

        // now the lead becomes customer:
        const contact = await Contact.findByPk(newDeal.contactId)
        contact.pipelineStatus = 'customer'
        await contact.save({fields: ['pipelineStatus']})
 
        res.status(201).json({success: true, deal: newDeal})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error creating deal" });
    }
}

const updateDeal = async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const deal = await Deal.findByPk(id)
        if (deal && deal.status!=body.status) {
            deal.status = body.status
            await deal.save({fields: ['status']})
            res.status(200).json({success:true, deal})

            // update organization points
            const organization = await Organization.findByPk(deal.organizationId)
            const employee = await Employee.findByPk(deal.employeeId)
            if (organization) {
                if (body.status == 'accepted')
                    organization.points++
                else if (organization.points > 0)
                    organization.points--
                await organization.save({fields: ['points']})
            }
            if (employee) {
                if (body.status == 'accepted') 
                    employee.points++
                else if (employee.points > 0)
                    employee.points--
                await employee.save({fields: ['points']})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error updating deal" });
    }
}

const deleteDealById = async (req, res) => {
    const { id } = req.params
    try {
        const deal = await Deal.findByPk(id)
        await deal.destroy()
        res.status(200).json({success: true, message: "deal deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error deleting deal" });
    }
}

module.exports = {
    addDeal,
    updateDeal,
    deleteDealById
}