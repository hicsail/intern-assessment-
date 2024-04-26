const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST Route that queries the database for one specific task by title
router.post("/", async (req, res) => {
    try {
        // Get the title of the task from the request query
        const { title } = req.body;
        // Find the task by title using the findOne method
        const task = await Task.findOne({ where: { title: title } });
        // If the task is not found, throw an error
        if (!task) {
            throw new Error("Task not found");
        }

        // Send a 200 response with the task as JSON
        res.status(200).json(task);
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
