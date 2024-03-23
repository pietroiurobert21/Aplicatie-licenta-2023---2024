const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { addContact, getContactsByOrganizationId, getContactById, getCustomersByOrganizationId} = require("./contact-controller")

router.post("/", verifyToken, addContact)
router.get("/:organizationId", verifyToken, getContactsByOrganizationId)
router.get("/customers/:organizationId", verifyToken, getCustomersByOrganizationId)
router.get("/id/:id", verifyToken, getContactById)

module.exports = router // Export the router so it can be used by other parts of the application