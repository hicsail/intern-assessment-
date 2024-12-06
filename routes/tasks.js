const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Fetch all tasks
    res.json(tasks); // Return the tasks as JSON
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Get a single task by ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id); // Fetch task by primary key (ID)
    if (task) {
      res.json(task); // Return the task as JSON
    } else {
      res.status(404).json({ error: "Task not found" }); // Task not found
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const { title } = req.body; // Extract title from request body
  if (!title) {
    return res.status(400).json({ error: "Title is required" }); // Handle missing title
  }
  
  try {
    const newTask = await Task.create({ title }); // Create a new task
    res.status(201).json(newTask); // Return the created task as JSON
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task by ID
router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body; // Extract title and completed status from request body

  try {
    const task = await Task.findByPk(id); // Fetch task by ID
    if (!task) {
      return res.status(404).json({ error: "Task not found" }); // Task not found
    }

    // Update the task
    task.title = title || task.title; // Update title if provided, else keep current title
    task.completed = completed !== undefined ? completed : task.completed; // Update completed status if provided, else keep current value
    await task.save(); // Save the changes to the task

    res.json(task); // Return the updated task as JSON
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id); // Fetch task by ID
    if (!task) {
      return res.status(404).json({ error: "Task not found" }); // Task not found
    }

    await task.destroy(); // Delete the task from the database
    res.status(204).send(); // Send a no-content response to indicate successful deletion
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
