const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({  error: "Failed to get all tasks!" });
  }
});

// Get all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: true }
    });
    res.json(tasks);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all completed tasks!" });
  }
});

// Get all pending tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: false }
    });
    res.json(tasks);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all pending tasks!" });
  }
});

// Get a specific task
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get task!" });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error : "Failed to create task!" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(204).send();
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to delete task!" });
  }
});

// Mark task as completed
router.patch("/tasks/:id/complete", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.completed = true;
    await task.save();
    res.json(task);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to mark task as completed!" });
  }
});

// Update task title
router.patch("/tasks/:id/title", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    await task.save();
    res.json(task);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task title!" });
  }
});

module.exports = router;
