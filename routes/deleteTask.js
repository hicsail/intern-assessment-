const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Route that deletes a task by title
router.delete("/", async (req, res) => {
    try {
        // Get the title of the task to delete from the request body
        const { title } = req.body;
        // Find the task by title
        const task = await Task.findOne({ where: { title: title } });
        if (!task) {
            throw new Error("Task not found");
        }
        // Delete the task
        await task.destroy();
        
        // Send a 200 response with a success message
        res.status(200).send({ message: "Task deleted" });
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
