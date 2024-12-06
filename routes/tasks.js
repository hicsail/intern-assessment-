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
// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body; // Extract title from the request body

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create a new task in the database
    const newTask = await Task.create({ title });

    // Return the created task
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

