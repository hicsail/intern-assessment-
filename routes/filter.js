const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get completed tasks
router.get("/completed", async (req, res) => {
  const tasks = await Task.findAll({ where: { completed: true } });
  res.json(tasks);
});

// Get pending tasks
router.get("/pending", async (req, res) => {
  const tasks = await Task.findAll({ where: { completed: false } });
  res.json(tasks);
});

module.exports = router;