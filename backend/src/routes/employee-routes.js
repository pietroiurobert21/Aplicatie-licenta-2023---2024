const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postEmployee, getColleagues, deleteEmployee } = require("../controllers/employee-controller"); // Import the functions from the controller
const { getEmployee } = require("../controllers/employee-controller");
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postEmployee)
router.get("/getEmployeeJWT", verifyToken, getEmployee)

router.get("/getColleagues", verifyToken, getColleagues)
router.delete("/deleteEmployee/:employeeId", verifyToken, deleteEmployee)

module.exports = router // Export the router so it can be used by other parts of the application