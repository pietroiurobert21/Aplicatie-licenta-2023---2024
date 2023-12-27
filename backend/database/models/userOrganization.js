const Sequelize = require('sequelize');
const sequelize = require('../server.js');

const UserOrganization = sequelize.define('UserOrganization', {
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

module.exports = UserOrganization;