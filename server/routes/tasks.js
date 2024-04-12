const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ status: 200, message: "success", tasks: tasks });
  } catch (error) {
    console.error(error);
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.send({ status: 400, message: "Request is incomplete" });
      return;
    }
    const newTask = new Task({
      title: title,
    });

    await newTask.save();
    res.json({ status: 200, message: "success" });
    return;
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
