const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Organization = require('./organization.js')

const Contact = sequelize.define('Contact', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    professionalTitle: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    emailAddress: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
    },
    homeAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pipelineStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Lead"
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

module.exports = Contact;