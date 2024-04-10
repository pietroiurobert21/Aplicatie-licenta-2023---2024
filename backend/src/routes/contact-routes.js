const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { addContact, getContactsByOrganizationId, getContactById, getCustomersByOrganizationId, deleteContactById } = require("../controllers/contact-controller")

router.post("/", verifyToken, addContact)
router.get("/", verifyToken, getContactsByOrganizationId)
router.get("/customers/", verifyToken, getCustomersByOrganizationId)
router.get("/id/:id", verifyToken, getContactById)
router.delete("/:id", verifyToken, deleteContactById)

module.exports = router // Export the router so it can be used by other parts of the application