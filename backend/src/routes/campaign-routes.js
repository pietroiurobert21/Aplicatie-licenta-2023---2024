const express = require("express");
const router = express.Router()

const { verifyToken } = require("../middlewares/middlewares")
const { addCampaign, getCampaignsByOrganizationId } = require("../controllers/campaign-controller")

router.post("/", verifyToken, addCampaign)
router.get("/", verifyToken, getCampaignsByOrganizationId)

module.exports = router

