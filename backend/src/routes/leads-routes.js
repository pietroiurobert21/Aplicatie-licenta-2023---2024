const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { getLeadsByOrganizationId } = require("../controllers/leads-controller")

router.get("/", verifyToken, getLeadsByOrganizationId)

module.exports = router