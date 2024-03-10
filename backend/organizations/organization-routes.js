const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postOrganization, getOrganizationByCode, getOrganizationMembers, getOrganizationById, getOrganizationByUserId, getOrganizationDeals, getStructuredOrganizationDeals } = require("./organization-controller"); // Import the functions from the controller
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postOrganization)
router.get("/:code", verifyToken, getOrganizationByCode)
router.get("/:id", verifyToken, getOrganizationById)
router.get("/members/:id", verifyToken, getOrganizationMembers)
router.get("/getByUserId/:userId", verifyToken, getOrganizationByUserId)
router.get("/deals/:id", verifyToken, getOrganizationDeals)
router.get("/structuredDeals/:id", verifyToken, getStructuredOrganizationDeals)


module.exports = router // Export the router so it can be used by other parts of the application