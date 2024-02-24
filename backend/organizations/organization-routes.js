const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postOrganization, getOrganizationByCode, getOrganizationMembers } = require("./organization-controller"); // Import the functions from the controller
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postOrganization)
router.get("/:code", verifyToken, getOrganizationByCode)
router.get("/members/:id", verifyToken, getOrganizationMembers)

module.exports = router // Export the router so it can be used by other parts of the application