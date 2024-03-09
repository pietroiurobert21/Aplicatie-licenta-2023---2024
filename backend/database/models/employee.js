const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Users = require("./user.js")
const Organization = require("./organization.js")

const Employee = sequelize.define('Employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
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
    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false,
});

module.exports = Employee;