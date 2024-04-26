const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST Route to create a new task
router.post("/", async (req, res) => {
    try {
        // Get the task data from the request body
        const { title, completed, pending } = req.body;
        // Create a new task
        const newTask = await Task.create({ title, completed, pending });
        console.log(newTask.toJSON());

        // Send a 200 response showing the newly created task
        res.status(200).send({ message: "Task created", task: newTask.toJSON() })
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;