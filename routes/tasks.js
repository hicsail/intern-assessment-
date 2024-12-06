const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Fetch all tasks from the database
    res.json(tasks); // Return tasks as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create a new task
router.post("/tasks", async (req, res) => {
  res.json({});
});

module.exports = router;
