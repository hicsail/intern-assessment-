const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET Route that queries the database for all completed tasks
router.get("/", async (req, res) => {
    try {
        // Use the findAll function with a where clause to get all completed tasks
        const tasks = await Task.findAll({
            where: {
                completed: true
            }
        });
        
        // Send a 200 response with the tasks as JSON
        res.status(200).json(tasks);
    } catch (error) {
        // Log the error and send a 400 response with an error message
        console.log(error);
        res.status(400).send({ message: error.message });
    }
})

module.exports = router;
