const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// This Route is used to mark a task as completed
router.put("/", async (req, res) => {
    try {
        // Get the title of the task to complete from the request body
        const { title } = req.body;
        // Find the task by title using the findOne method
        const task = await Task.findOne({ where: { title: title } });
        // If the task is not found, throw an error
        if (!task) {
            throw new Error("Task not found");
        }
        // Update the task instance using save() method
        task.completed = true;
        task.pending = false;
        await task.save();

        // Send a 200 response with a success message
        res.status(200).send({ message: "Task marked completed" });
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
