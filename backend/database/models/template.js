const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Organization = require("./organization.js")

const Template = sequelize.define('Template', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    design: {
        type: Sequelize.STRING
    },
    html: {
        type: Sequelize.STRING
    },
    organizationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Organization,
            key: 'id'
        }
    }
},
{
    timestamps: false,
});

module.exports = Template