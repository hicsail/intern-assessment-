const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET Route that queries the database for all tasks
router.get("/", async (req, res) => {
    try {
        // Find all tasks using the findAll method
        const tasks = await Task.findAll();

        // Send a 200 response with the tasks as JSON
        res.status(200).json(tasks);
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
