const nodemailer = require("nodemailer");
const { send, mainModule } = require("process");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.VITE_nodemailer_user,
        pass: process.env.VITE_nodemailer_password,
    },
});

const info = {
    from: {
        name: "Node CRM",
        address: process.env.VITE_nodemailer_user
    },
    to: ["pietroiurobert65@gmail.com", "nodecrmapp@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
}

const sendMail = async (transporter, info) => {
    try {
        await transporter.sendMail(info)
        console.log("Email sent")
    } catch (error) {
        console.log(error)
    }
}

sendMail(transporter, info)