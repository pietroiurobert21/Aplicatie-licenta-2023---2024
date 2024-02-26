const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const Contact = require("../database/models/contact");
const Deal = require("../database/models/deals")

const addDeal = async (req, res) => {
    const dealInfo = req.body
    try {
        const newDeal = await Deal.create(dealInfo)
        res.status(201).json({success: true, deal: newDeal})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error creating deal" });
    }
}

module.exports = {
    addDeal
}