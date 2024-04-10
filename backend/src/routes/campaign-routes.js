const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { verifyToken } = require("../middlewares/middlewares")
const { addCampaign, getCampaignsByOrganizationId } = require("../controllers/campaign-controller")

router.post("/", verifyToken, addCampaign)
router.get("/", verifyToken, getCampaignsByOrganizationId)

module.exports = router // Export the router so it can be used by other parts of the application