const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    // Extract the title field from the request body
    const { title } = req.body;
    
    // Use Sequelize's `create` method to add a new task to the database
    // The task will be created with the specified title
    const newTask = await Task.create({ title });

    // Respond with a 201 status code (Created) and return the new task as JSON
    res.status(201).json(newTask);
  } catch (error) {
    // If an error occurs during task creation, log the error message to the console
    console.error("Error creating task:", error);
    
    // Respond with a 500 status code (Internal Server Error) and an error message
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    // Fetch all tasks from the database using Sequelize's `findAll` method
    const tasks = await Task.findAll();
    
    // Respond with the list of tasks in JSON format
    res.json(tasks);
  } catch (error) {
    // Log any error encountered during task retrieval to the console
    console.error("Error fetching tasks:", error);
    
    // Return a 500 status code (Internal Server Error) with a descriptive error message
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Mark a task as completed
router.put("/tasks/:id/complete", async (req, res) => {
  try {
    // Extract the task ID from the route parameters
    const taskId = req.params.id;

    // Find the task by its primary key (ID) using Sequelize's `findByPk` method
    const task = await Task.findByPk(taskId);

    // If the task is not found, respond with a 404 status code and an error message
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task's status to indicate it is completed
    task.completed = true;

    // Optionally, mark it as not pending if there's a `pending` field
    task.pending = false;

    // Save the changes to the database
    await task.save();

    // Respond with the updated task in JSON format
    res.json(task);
  } catch (error) {
    // Log any errors encountered during the update operation
    console.error("Error marking task as completed:", error);

    // Respond with a 500 status code (Internal Server Error) and an error message
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
});

// Update the title of a task
router.put("/tasks/:id", async (req, res) => {
  try {
    // Extract task ID from the route parameters
    const taskId = req.params.id;

    // Extract the title from the request body
    const { title } = req.body;

    // Find the task by primary key (ID)
    const task = await Task.findByPk(taskId);

    // If the task doesn't exist, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task's title and save changes
    task.title = title;
    await task.save();

    // Respond with the updated task
    res.json(task);
  } catch (error) {
    // Log errors and return a 500 status code with an error message
    console.error("Error updating task title:", error);
    res.status(500).json({ error: "Failed to update task title" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    // Extract task ID from the route parameters
    const taskId = req.params.id;

    // Find the task by primary key (ID)
    const task = await Task.findByPk(taskId);

    // If the task doesn't exist, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Delete the task from the database
    await task.destroy();

    // Respond with a success message
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    // Log errors and return a 500 status code with an error message
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Get all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    // Find all tasks where the `completed` field is true
    const completedTasks = await Task.findAll({ where: { completed: true } });

    // Respond with the list of completed tasks
    res.json(completedTasks);
  } catch (error) {
    // Log errors and return a 500 status code with an error message
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ error: "Failed to fetch completed tasks" });
  }
});

// Get all pending tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    // Find all tasks where the `completed` field is false (pending tasks)
    const pendingTasks = await Task.findAll({ where: { completed: false } });

    // Respond with the list of pending tasks
    res.json(pendingTasks);
  } catch (error) {
    // Log errors and return a 500 status code with an error message
    console.error("Error fetching pending tasks:", error);
    res.status(500).json({ error: "Failed to fetch pending tasks" });
  }
});

// Get a single task by its ID
router.get("/tasks/:id", async (req, res) => {
  try {
    // Extract the task ID from the route parameters
    const taskId = req.params.id;

    // Find the task by its primary key using `findByPk`
    const task = await Task.findByPk(taskId);

    // If the task doesn't exist, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the found task in JSON format
    res.json(task);
  } catch (error) {
    // Log errors and return a 500 status code with an error message
    console.error("Error retrieving task:", error);
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

module.exports = router;
