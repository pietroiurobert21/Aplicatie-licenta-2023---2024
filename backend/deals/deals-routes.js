const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { addDeal, updateDeal } = require("./deals-controller")

router.post("/", verifyToken, addDeal)
router.put("/:id", verifyToken, updateDeal)

module.exports = router // Export the router so it can be used by other parts of the application