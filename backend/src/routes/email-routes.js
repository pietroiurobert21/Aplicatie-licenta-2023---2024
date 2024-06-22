const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { sendEmail, getsmth }  = require("../controllers/email-controller")

router.post("/sendEmail", sendEmail)

router.get("/", getsmth)
module.exports = router