const express = require("express");
const router = express.Router();
const Task = require("../models/task");

const POSSIBLE_STATUSES = ["completed", "pending"];

// When adding a new POSSIBLE_STATUSES status, make sure to update the if statements
// Get all tasks or all completed/pending tasks
router.get("/tasks", async (req, res) => {
  try {
    const { status } = req.query;

    if (status && !POSSIBLE_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Status must be ${POSSIBLE_STATUSES.join(", ")}, or not specified.`,
      });
    }

    let tasks;
    if (status === "completed") {
      tasks = await Task.findAll({ where: { completed: true } });
    } else if (status === "pending") {
      tasks = await Task.findAll({ where: { completed: false } });
    } else {
      tasks = await Task.findAll();
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific task given an ID
router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a parameter (either title or completed)
router.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body;

    const task = await Task.findByPk(id);

    if (task) {
      if (title !== undefined) {
        task.title = title;
      }
      if (completed !== undefined) {
        task.completed = completed;
      }
      await task.save();

      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new task (completed not implemented in param as there is no point in creating a task
// that is already completed)
router.post("/task", async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a task given an ID
router.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (task) {
      await task.destroy();

      res.status(204).end();
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
