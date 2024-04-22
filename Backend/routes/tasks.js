const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  res.json([]);
});

// Create a new task
router.post("/tasks", async (req, res) => {
  res.json({});
});

module.exports = router;
