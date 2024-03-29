const Task = require("../database/models/task");
const Templates = require("../database/models/template")

const getTemplatesByOrganizationID = async (req,res) => {
    const { organizationId } = req.params 
    try {
        const templates = await Task.findAll({where: {organizationId: organizationId}})
        if (templates) {
            res.json({success: true, templates})
        } else {
            res.json({success: false, error: "No templates found"})
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Error retrieving templates" });
    }
}

const postTemplate = async (req, res) => { 
    const body = req.body
    try {
        const template = await Templates.create(body)
        res.status(201).json({success: true, template})
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating template" });
    }
}

const getTemplateById = async (req, res) => {
    const { id } = req.params
    try {
        const template = await Templates.findByPk(id)
        if (template) {
            res.status(200).json({success: true, template})
        } else {
            res.status(404).json({success: false, error: "template not found"})
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Error retrieving template" });
    }
}

module.exports = { 
    getTemplatesByOrganizationID,
    postTemplate,
    getTemplateById
}