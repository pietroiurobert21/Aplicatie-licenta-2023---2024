const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postTask, getTasksAssignedByUserId, getTasksAssignedToUserId, updateIsDone, deleteTask, updateTask } = require("../controllers/tasks-controller")
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postTask)
router.get("/assignedBy", verifyToken, getTasksAssignedByUserId)
router.get("/assignedTo", verifyToken, getTasksAssignedToUserId)

router.put("/toggleTaskStatus/:id", verifyToken, updateIsDone)
router.put("/updateTask", verifyToken, updateTask)

router.delete("/:id", verifyToken, deleteTask)

module.exports = router