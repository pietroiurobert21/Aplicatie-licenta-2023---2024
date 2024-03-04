const express = require("express");
const jwt = require("jsonwebtoken");

const Tasks = require("../database/models/task");
const Employees = require("../database/models/employee");

const postTask = async (req, res) => {
    const body = req.body;
    try {
        const task = await Tasks.create(body);
        res.status(201).json({ success: true, task })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Task already exists" });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        if (tasks) {
            res.status(200).json({ success: true, tasks})
        } else {
            res.status(404).json({ success: false,  error: "No tasks found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: "Error retrieving tasks" });
    }
}

module.exports = {
    postTask,
    getTasks
}