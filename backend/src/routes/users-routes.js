const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { getUsers, getUserById, postUser, loginUser, belongsToOrganization } = require("../controllers/users-controller"); // Import the functions from the controller
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.get("/", getUsers)
router.get("/getUser/:id", verifyToken, getUserById)
router.get("/getOrganizationByUserId")

router.post("/belongsToOrganization", belongsToOrganization)
router.post("/", postUser)
router.post("/login", loginUser)


module.exports = router // Export the router so it can be used by other parts of the application