const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Employee = require("./employee.js")

const Task = sequelize.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    assignedToEmployeeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    timestamps: false,
});

module.exports = Task