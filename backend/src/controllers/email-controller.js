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
    const { to, subject, text, html, names } = req.body;

    const recipients = to;
    console.log(recipients)
    console.log(names)

    try {
        // Loop through each recipient to send personalized emails
        recipients.map(async (recipient, index) => {
            const personalizedHtml = names && html.replace('{name}', names[index]);
            const info = {
                from: {
                    name: "Node CRM",
                    address: process.env.NODEMAILER_USER
                },
                to: recipient,         // Single receiver
                subject,    // Subject line
                text, // plain text body
                html: names ? personalizedHtml : html// html body
            };
        
            // Send the email
            await transporter.sendMail(info);
        });
        // If all emails are sent successfully, send a success response
        res.status(200).json({ success: true, message: 'All emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ success: false, message: 'Failed to send emails', error: error.message });
    }
};


const getsmth = async (req, res) =>{
    res.status(200).json("sal")
}

module.exports = {
    sendEmail,
    getsmth
}