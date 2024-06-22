const express = require("express");
const nodemailer = require("nodemailer");
const { send, mainModule } = require("process");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_pass,
    },
});


const sendEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    const info = {
        from: {
            name: "Node CRM",
            address: process.env.nodemailer_user
        },
        to,         // list of receivers
        subject,    // Subject line
        text, // plain text body
        html // html body
    }

    try {
        await transporter.sendMail(info)
        res.status(200).json({success:true, message: 'email sent'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error})
    }
}

const getsmth = async (req, res) =>{
    res.status(200).json("sal")
}

module.exports = {
    sendEmail,
    getsmth
}