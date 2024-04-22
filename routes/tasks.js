const express = require("express");
const router = express.Router();
const Task = require("../models/task");

//Home page
router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.render("index.ejs", { tasks: tasks});
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json({ tasks });
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title });
  res.json(task);
});

// Read a specific task
router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(task);
  }
});

//Update a task's title
router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).json({ error: "Task not found" });
  } 
  task.title = title;
  task.completed = completed;
  await task.save();
  res.json(task);
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).json({ error: "Task not found" });
  } 
  await task.destroy();
  res.json(task);
});

module.exports = router;
