const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const Organization = sequelize.define('Organization', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Organization;