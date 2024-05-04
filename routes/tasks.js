const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const sequelize = require("../database");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
      const tasks = await Task.findAll();
      res.json(tasks);
  } catch (error) {
    // Handle erros
    console.error(error);
    res.status(500).json({ error: "Failed to get task!" });
  }
});

// Get all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    // Retrieve completed tasks from the DB
    const completedTasks = await Task.findAll({
      where: { completed: true }
    });
    
    // Send the list as the response
    res.json(completedTasks);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get completed tasks" });
  }
});

// Get all completed tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    // Retrieve completed tasks from the DB
    const pendingTasks = await Task.findAll({
      where: { completed: false }
    });
    
    // Send the list as the response
    res.json(pendingTasks);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get pending tasks" });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  // Destructuring: Take the title from request body as the task title
  const { title } = req.body;

  // Create and resolve a promise
  try {
    const newTask = await Task.create({ title });
    res.status(201).json({ newTask });
  } catch(error) {
    res.status(500).json({ error : "Failed to creat the task!" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  // Get the task ID from the req
  const id = req.params.id;
  try {
    const deletedTaskCount = await Task.destroy({
      where : { id : id },
    });
    if (deletedTaskCount == 1) {
      const updatedList = await Task.findAll();
      res.status(200).json({ updatedList });
    } else {
      res.status(404).json({ error : "Task not found!" });
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ error : "No task left to delete!" });
  }
});

// Mark a task as completed
router.patch("/tasks/:id/completed", async (req, res) => {
  const id = req.params.id;
  
  try {
    // Find the task by its id 
    const task = await Task.findByPk(id);
    
    // If the task is not found, give error
    if(!task) {
      return res.status(404).json({ error: "Task not found"});
    }

    // Update the task's status to completed
    task.completed = true;
    await task.save();
    res.json({ message: "Task marked as completed!" });
  } catch(error) {
    console.error(error);
    res.status(500).json({ error : "Failed to mark task as completed" });
  }
});

// Update a task's title
router.patch("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const { newTitle } = req.body;

  try {
    // Find the task by ID in the database
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task's title with the new title
    task.title = newTitle;

    // Save the changes to the database
    await task.save();

    // Send a success response
    res.json({ message: "Task title updated successfully" });
  } catch(error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Failed to update task title" });
  }
});


module.exports = router;
