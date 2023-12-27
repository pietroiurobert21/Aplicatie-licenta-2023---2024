const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postUserOrganization } = require("./usersOrganization-controller"); // Import the functions from the controller
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postUserOrganization)

module.exports = router // Export the router so it can be used by other parts of the application