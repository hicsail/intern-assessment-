const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create new task
router.post("/tasks", async (req, res) => {
  try {
    // Get title from request
    const { title } = req.body;
    // If no title is provided, return error
    if (!title) return res.status(400).json({ error: "Title is required" });

    // Create new task
    const newTask = await Task.create({title});
    res.json(newTask);

  } catch (error) {
    // Handle unexpected errors
    res.status(400).json({ error: error.message });
  }
});

// Read all tasks
router.get("/tasks", async (req, res) => {
  // Fetch the tasks
  const tasks = await Task.findAll();
  // If no tasks are found, inform user
  if (!tasks || tasks.length === 0) return res.json({ message: "No tasks found" });

  // Send tasks as response
  res.json(tasks); 
});

// Read all completed tasks
router.get("/tasks/completed", async (req, res) => {
  // Fetch the tasks
  const tasks = await Task.findAll({ where: { status: "Completed" } });
   // If no completed tasks are found, inform user
  if (!tasks || tasks.length === 0) return res.json({ message: "No completed tasks found" });

  // Send completed tasks as response
  res.json(tasks); 
});

// Read all pending tasks
router.get("/tasks/pending", async (req, res) => {
  // Fetch the tasks
  const tasks = await Task.findAll({ where: { status: "Pending" } });
     // If no pending tasks are found, inform user
  if (!tasks || tasks.length === 0) return res.json({ message: "No pending tasks found" });

  // Send pending tasks as response
  res.json(tasks); 
});

// Read task by id
router.get("/tasks/:id", async (req, res) => {
  try {
    // Save task id
    const id = req.params.id;
    // If no task id is provided, return error
    if (!id) return res.status(400).json({ error: "Task id is required" });

    // Find task by id
    const task = await Task.findByPk(id);
    // If task doesn't exist, return error
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Send task as response
    res.json(task);

  } catch {
    // Handle unexpected errors
    return res.status(400).json({ error: error.message });
  }
});

// Mark task as completed
router.patch("/tasks/:id/mark", async(req, res) => {
  try {
    // Save task id
    const id = req.params.id;
    // If no task id is provided, return error
    if (!id) return res.status(400).json({ error: "Task id is required" });

    // Find task by id
    const task = await Task.findByPk(id);
    // If task doesn't exist, return error
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Update task status to completed if needed
    if (task.status === "Pending") {
      task.status = "Completed";
      await task.save();
      res.json(task);
    } else {
      // If already completed, inform user
      res.json({ mesage: "Task was already completed" });
    }

  } catch {
    // Handle unexpected errors
    return res.status(400).json({ error: error.message });
  }
});

// Mark task as pending
router.patch("/tasks/:id/unmark", async(req, res) => {
  try {
    // Save task id
    const id = req.params.id;
    // If no task id is provided, return error
    if (!id) return res.status(400).json({ error: "Task id is required" });

    // Find task by id
    const task = await Task.findByPk(id);
    // If task doesn't exist, return error
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Update task status to pending if needed
    if (task.status === "Completed") {
      task.status = "Pending";
      await task.save();
      res.json(task);
    } else {
      // If already completed, inform user
      res.json({ message: "Task was already pending" });
    }

  } catch {
    // Handle unexpected errors
    return res.status(400).json({ error: error.message });
  }
});

// Update task title
router.patch("/tasks/:id/update", async(req, res) => {
  try {
    // Save task id
    const id = req.params.id;
    // If no task id is provided, return error
    if (!id) return res.status(400).json({ error: "Task id is required" });

    // Find task by id
    const task = await Task.findByPk(id);
    // If task doesn't exist, return error
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Get new title from request
    const { title } = req.body;
    // If no title is provided, return error
    if (!title) return res.status(400).json({ error: "A new title is required" });

    // Update task title
    task.title = title;
    await task.save();
    res.json(task);
    
  } catch {
    // Handle unexpected errors
    return res.status(400).json({ error: error.message });
  }
});

// Delete task
router.patch("/tasks/:id/delete", async(req, res) => {
  try {
    // Save task id
    const id = req.params.id;
    // If no task id is provided, return error
    if (!id) return res.status(400).json({ error: "Task id is required" });

    // Find task by id
    const task = await Task.findByPk(id);
    // If task doesn't exist, return error
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Delete task
    await task.destroy();
    res.json({ message: "Task deleted successfully" });

  } catch {
    // Handle unexpected errors
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
