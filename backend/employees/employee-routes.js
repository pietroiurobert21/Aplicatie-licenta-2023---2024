const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postEmployee, getEmployeeByUserId, getColleagues, deleteEmployee } = require("./employee-controller"); // Import the functions from the controller
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postEmployee)
router.get("/getEmployee/:userId", verifyToken, getEmployeeByUserId)
router.get("/getColleagues/:userId", getColleagues)
router.delete("/deleteEmployee/:employeeId", verifyToken, deleteEmployee)

module.exports = router // Export the router so it can be used by other parts of the application