const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postTask, getTasks } = require("./tasks-controller")
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postTask)
router.get("/", verifyToken, getTasks)

module.exports = router