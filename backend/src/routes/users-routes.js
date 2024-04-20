const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { getUsers, getUserById, postUser, loginUser, belongsToOrganization, updateUser } = require("../controllers/users-controller"); // Import the functions from the controller
const { getUser } = require("../controllers/users-controller")
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.get("/", getUsers)

router.get("/getOrganizationByUserId")
router.get("/getUserJwt", verifyToken, getUser)


router.post("/belongsToOrganization", belongsToOrganization)
router.post("/", postUser)
router.post("/login", loginUser)

router.put("/", verifyToken, updateUser)


module.exports = router // Export the router so it can be used by other parts of the application