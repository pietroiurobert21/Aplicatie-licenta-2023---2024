const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const Users = require("../database/models/user");

const Employees = require("../database/models/employee");
const Organization = require("../database/models/organization");

// GET all users from Database
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        users.forEach(user => {
            delete user.dataValues.password;
        })
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ err });
    }
}

// using Jwt
const getUser = async (req, res) => {
    const id = req.userId
    try {
        const user = await Users.findByPk(id);
       // delete user.dataValues.password;
        res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "user not found" });
    }
}

const postUser = async (req, res) => {
    const body = req.body; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Object.values(body).some(value => value === "")) {
        res.status(400).json({ success: false, error: "Empty fields are not allowed" });
        return;
    } else if (body.email && !emailRegex.test(body.email)) {
        res.status(400).json({ success: false, error: "Invalid email format" });
        return;
    }
    try {
        const password = body.password
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        body.password = hash
        const user = await Users.create(body);
        res.status(201).json({ success:true, user: user });
    } catch (error) {
        res.status(500).json({ success:false, error: "User already exists" });
    }
}

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password)
            if (isPasswordValid || password == user.password) {
                delete user.dataValues.password;
                
                const employee = await Employees.findOne({where: {userId: user.id}})
                let token;
                if (employee) {
                    token = jwt.sign({ id: user.id, organizationId: employee.organizationId }, process.env.JWT_SECRET);
                } else {
                    token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
                }
                
                res.status(200).json({ success:true, token, user });
            } else {
                res.status(401).json({ success:false, error: "Invalid password" });
            }
        } else {
            res.status(404).json({ success:false, error: "User not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error" });
    }
}

const belongsToOrganization = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ where: { email } });
        if (user) {
            const userId = user.id;
            const userOrganization = await Employees.findOne({ where: { userId: userId } });
            if (userOrganization) {
                res.status(200).json({ success: true, message: "User belongs to an organization" });
            } else {
                res.status(403).json({ success: false, message: "User does not belong to an organization" })
            }
        } else {
            res.status(404).json({ success:false, error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success:false, error: "error" });
    }
}

const updateUser = async (req, res) => {
    const body = req.body
    try {
        const user = await Users.findByPk(body.id);
        if (user) {
            user.username = body.username
            user.firstName = body.firstName
            user.lastName = body.lastName
            await user.save()
            res.status(200).json({success: true})
        } else {
            res.status(404).json({ success:false, error: "User not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error updating profile" });
    }
}

const updatePassword = async (req, res) => {
    const body = req.body
    try {
        const user = await Users.findByPk(body.id)
        if (user) {
            user.password = body.password
            await user.save()
            res.status(200).json({success:true})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "error updating password" });
    }
}

module.exports = {
    getUsers,
    postUser,
    loginUser,
    belongsToOrganization,
    getUser,
    updateUser,
    updatePassword
}