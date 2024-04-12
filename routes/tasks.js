const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const numDeleted = await Task.destroy({
      where: { id: req.params.id },
    });
    if (numDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single task by id
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a task title and completion status
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.completed =
        req.body.completed !== undefined ? req.body.completed : task.completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// List all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// List all pending tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: false },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
