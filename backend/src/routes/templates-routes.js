const express = require("express");
const router = express.Router() // Create a new router using the express.Router() method

const { getTemplatesByOrganizationID, getTemplateById, postTemplate, deleteTemplate } = require("../controllers/templates-controller");
const { verifyToken } = require("../middlewares/middlewares"); // Import the middleware function

router.get("/", verifyToken, getTemplatesByOrganizationID);
router.get("/template/:id", verifyToken, getTemplateById);
router.post("/", verifyToken, postTemplate);
router.delete("/:id", verifyToken, deleteTemplate);

module.exports = router;
