const Campaign = require("../database/models/campaign");

const getCampaignsByOrganizationId = async (req, res) => {
    const organizationId = req.organizationId
    try {
        const campaigns = await Campaign.findAll({where: {organizationId: organizationId}})
        if (campaigns && campaigns.length) {
            res.status(200).json({success: true, campaigns})
        } else {
            res.status(404).json({success: false, error: "no campaigns found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "error retrieving campaigns"})
    }
}

const addCampaign = async (req, res) => {
    const body = req.body
    body.organizationId = req.organizationId
    try {
        const campaign = await Campaign.create(body)
        res.status(201).json({success: true, campaign})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "error creating campaign"})
    }
}

module.exports = {
    getCampaignsByOrganizationId,
    addCampaign
}