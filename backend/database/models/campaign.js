const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Organization = require('./organization.js')

const Campaign = sequelize.define('Campaign', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    emailsSent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    organizationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Organization,
            key: 'id'
        }
    }
}, {
    timestamps: false,
});

module.exports = Campaign;