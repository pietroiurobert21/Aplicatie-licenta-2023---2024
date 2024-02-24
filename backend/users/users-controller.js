const express = require("express");
const jwt = require("jsonwebtoken");

const Users = require("../database/models/user");

const Employees = require("../database/models/employee");

// GET all users from Database
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ err });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findByPk(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: "user not found" });
    }
}

// POST a new user to the Database
const postUser = async (req, res) => {
    const body = req.body; 
    // Check if body has empty strings
    if (Object.values(body).some(value => value === "")) {
        res.status(400).json({ success: false, error: "Empty fields are not allowed" });
        return;
    }
    try {
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
            if (user.password === password) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({ success:true, token, user });
            } else {
                res.status(401).json({ success:false, error: "Invalid password" });
            }
        } else {
            res.status(404).json({ success:false, error: "User not found" });
        }
    } catch (error) {
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

module.exports = {
    getUsers,
    getUserById,
    postUser,
    loginUser,
    belongsToOrganization
}