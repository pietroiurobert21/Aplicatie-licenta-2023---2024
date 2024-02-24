const Sequelize = require('sequelize');
const sequelize = require('../server.js');

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
    }
}, {
    timestamps: false,
});

module.exports = Employee;