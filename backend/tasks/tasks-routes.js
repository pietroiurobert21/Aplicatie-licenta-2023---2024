const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postTask, getTasksAssignedByUserId, getTasksAssignedToUserId } = require("./tasks-controller")
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postTask)
router.get("/assignedBy/:id", verifyToken, getTasksAssignedByUserId)
router.get("/assignedTo/:id", verifyToken, getTasksAssignedToUserId)

module.exports = router