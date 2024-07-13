const Tasks = require("../database/models/task");
const Employee = require("../database/models/employee");
const User = require("../database/models/user");

const postTask = async (req, res) => {
    const body = req.body;
    try {
        const task = await Tasks.create(body);
        res.status(201).json({ success: true, task })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Error creating task" });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Tasks.findByPk(id)
        if (task) {
            await task.destroy()
        } else {
            res.status(404).json({ success: false, error: "Task not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Error deleting task" });
    }
}

const getTasksAssignedByUserId = async (req, res) => {
    const id = req.userId
    const employee = await Employee.findOne({where: {userId: id}});

    try {
        const tasks = await Tasks.findAll({
            where: {assignedByEmployeeId: employee.id},
            order: [ ['id', 'ASC'] ]
        });

        if(tasks) {
            const tasksWithAllProperties = await Promise.all(tasks.map(async task => {
                const assignedToEmployee = await Employee.findByPk(task.assignedToEmployeeId);
                const assignedByEmployee = await Employee.findByPk(task.assignedByEmployeeId);

                if (assignedToEmployee && assignedByEmployee) {
                    const assignedToUser = await User.findByPk(assignedToEmployee.userId)
                    const assignedByUser = await User.findByPk(assignedByEmployee.userId)
                    

                    return { ...task.toJSON(), assignedTo:assignedToUser, assignedBy: assignedByUser };
                }
            }));

            res.status(200).json({ success: true, tasks: tasksWithAllProperties });
        } else {
            res.status(404).json({ success: false,  error: "No tasks found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, error: "Error retrieving tasks" });
    }
}

const getTasksAssignedToUserId = async (req, res) => {
    const id = req.userId
    const employee = await Employee.findOne({where: {userId: id}});
    try {
        const tasks = await Tasks.findAll({
            where: {assignedToEmployeeId: employee.id},
            order: [ ['id', 'ASC'] ]
        })
        if(tasks) {
            const tasksWithAllProperties = await Promise.all(tasks.map(async task => {
                const assignedToEmployee = await Employee.findByPk(task.assignedToEmployeeId);
                const assignedByEmployee = await Employee.findByPk(task.assignedByEmployeeId);

                const assignedToUser = await User.findByPk(assignedToEmployee.userId)
                const assignedByUser = await User.findByPk(assignedByEmployee.userId)

                return { ...task.toJSON(), assignedTo:assignedToUser, assignedBy: assignedByUser };
            }));
            res.status(200).json({ success: true, tasks: tasksWithAllProperties });
        } else {
            res.status(404).json({ success: false,  error: "No tasks found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, error: "Error retrieving tasks" });
    }
}

const updateIsDone = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Tasks.findByPk(id)
        if (task) {
            task.isDone = !task.isDone
            await task.save()
            res.status(200).json({success:true, task})
        } else {
            res.status(404).json({success:false, error:"task not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, error: "Error updating task" });
    }
}

const updateTask = async (req, res) => {
    const { id, description, assignedToEmployeeId, isDone } = req.body  
    console.log(req.body)
    try {
        const task = await Tasks.findByPk(id);
        if (task) {
            task.description = description
            task.assignedToEmployeeId = assignedToEmployeeId
            task.isDone = isDone
            await task.save();
            res.status(200).json({success:true, task})
        } else {
            res.status(404).json({success:false, error:"task not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:false, error: "Error updating task" });
    }
}

module.exports = {
    postTask,
    getTasksAssignedByUserId,
    getTasksAssignedToUserId,
    updateIsDone,
    updateTask,
    deleteTask
}