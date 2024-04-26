const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST Route that updates the title of a task
router.post("/", async (req, res) => {
    try {
        // Get the title from the request body
        const { title, newTitle } = req.body;
        // Find the task by title using the findOne method
        const task = await Task.findOne({ where: { title: title } });
        // If the task is not found, throw an error
        if (!task) {
            throw new Error("Task not found");
        }
        task.title = newTitle;
        // Save the updated task
        await task.save();

        // Send a 200 response with the updated task as JSON
        res.status(200).json(task);
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
