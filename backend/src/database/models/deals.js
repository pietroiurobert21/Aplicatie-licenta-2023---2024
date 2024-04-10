const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Employee = require("./employee.js")
const Organization = require("./organization.js")
const Contact = require("./contact.js")

const Deal = sequelize.define('Deal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    value: {
        type: Sequelize.REAL,
        allowNull: false,
        defaultValue: 0.0
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    employeeId: {
        type: Sequelize.INTEGER,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    organizationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Organization,
            key: 'id'
        }
    },
    contactId: {
        type: Sequelize.INTEGER,
        references: {
            model: Contact,
            key: 'id'
        }
    },
},
{
    timestamps: false,
});

module.exports = Deal

