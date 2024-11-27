/* Author: Jaideep Singh, 11/26/2024 */
 
const express = require("express");
const router = express.Router();
const Task = require("../models/task"); // Import the Task model

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update task title
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Mark task as completed
router.put("/:id/complete", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.completed = true; // Set completed to true
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).send(); // No content, successfully deleted
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Get all completed tasks
router.get("/completed", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch completed tasks" });
  }
});

// Get all pending tasks
router.get("/pending", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: false },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pending tasks" });
  }
});

module.exports = router;
