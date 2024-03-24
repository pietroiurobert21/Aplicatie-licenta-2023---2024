const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postTask, getTasksAssignedByUserId, getTasksAssignedToUserId, updateIsDone, deleteTask } = require("./tasks-controller")
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postTask)
router.get("/assignedBy/:id", verifyToken, getTasksAssignedByUserId)
router.get("/assignedTo/:id", verifyToken, getTasksAssignedToUserId)

router.put("/:id", verifyToken, updateIsDone)

router.delete("/:id", verifyToken, deleteTask)

module.exports = router