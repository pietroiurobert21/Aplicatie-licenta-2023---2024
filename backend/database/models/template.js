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
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    design: {
        type: Sequelize.TEXT
    },
    html: {
        type: Sequelize.TEXT
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