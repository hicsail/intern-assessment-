const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Fetch all tasks from the database
    res.json(tasks); // Return tasks as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body; // Extract title and description from the request body

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create a new task in the database
    const newTask = await Task.create({ title, description });

    // Return the created task
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Task ID from the URL
    const { title, description, completed } = req.body; // Extract fields from the request body

    // Find the task by ID
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task
    task.title = title || task.title; // Update title if provided
    task.description = description || task.description; // Update description if provided
    task.completed = completed !== undefined ? completed : task.completed; // Update completion status if provided

    // Save the task to the database
    await task.save();

    // Return the updated task
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Task ID from the URL

    // Find the task by ID
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Delete the task
    await task.destroy();

    // Return a success message
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
