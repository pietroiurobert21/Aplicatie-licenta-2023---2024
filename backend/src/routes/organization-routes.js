const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { postOrganization, getOrganizationMembers, getOrganizationByCode, getOrganizationDeals, getStructuredOrganizationDeals, getOrganizationDealsYears, changeCodeByOrganizationId, getLeaderboard } = require("../controllers/organization-controller"); // Import the functions from the controller
const { getOrganizationByUser } = require("../controllers/organization-controller");
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.post("/", verifyToken, postOrganization)
router.get("/code/:code", verifyToken, getOrganizationByCode)
//router.get("/:id", verifyToken, getOrganizationById)
router.get("/members", verifyToken, getOrganizationMembers)

router.get("/getByUserIdJWT", verifyToken, getOrganizationByUser)

router.get("/deals", verifyToken, getOrganizationDeals)
router.get("/structuredDeals", verifyToken, getStructuredOrganizationDeals)
router.get("/dealsyears", verifyToken, getOrganizationDealsYears)

router.get("/leaderboard", verifyToken, getLeaderboard);

router.put("/code", verifyToken, changeCodeByOrganizationId)

module.exports = router // Export the router so it can be used by other parts of the application