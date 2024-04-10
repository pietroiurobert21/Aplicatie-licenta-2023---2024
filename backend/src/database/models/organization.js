const Sequelize = require('sequelize');
const sequelize = require('../server.js');
const { v4: uuidv4 } = require('uuid');

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
        unique: true,
        allowNull: false,
    },
    code: {  
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(), 
    },
    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false,
});

module.exports = Organization;