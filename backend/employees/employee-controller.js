const express = require("express");

const Employee = require("../database/models/employee");
const Organization = require("../database/models/organization");
const User = require("../database/models/user");
const { col } = require("sequelize");

Employee.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Employee, { foreignKey: 'userId' });
// create a new employee
const postEmployee = async (req, res) => {
    const { role, userId, organizationId } = req.body;
    try {
        const organization = await Organization.findAll({
            where:
                {id: organizationId}
        })
        if (organization) {
            const userOrganization = await Employee.create({ role, userId, organizationId });
            res.status(201).json({ success:true, userOrganization });
        } else {
            res.status(404).json({ success:false, error: "organization not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error creating the employee" });
    }
}

const getEmployeeByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const userOrganization = await Employee.findAll({where: { userId: userId }})
        if (userOrganization && userOrganization[0]) {
            res.status(200).json({success: true, userOrganization: userOrganization[0]})
        } else {
            res.status(404).json({ success:false, error: "employee not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the employee" });
    }
}

const getColleagues = async (req, res) => {
    const { userId } = req.params;
    try {
        const employee = (await Employee.findAll({where: { userId: userId }}))
        const organizationId = employee[0].organizationId
        if (organizationId) {
            const colleagues = await Employee.findAll({where: { organizationId: organizationId}, include: [User] })

            if (colleagues) {
                res.status(200).json({success: true, colleagues: colleagues})
            } else {
                res.status(404).json({ success:false, error: "colleagues not found" });
            }
        }
        else {
              res.status(404).json({ success:false, error: "organization not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error retrieving the employee" });
    }
}

module.exports = {
    postEmployee,
    getEmployeeByUserId,
    getColleagues
}