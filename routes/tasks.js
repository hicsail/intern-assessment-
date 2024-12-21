const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all existing tasks
router.get("/tasks", async (req, res) => {
  try {
    // Get all tasks and return the data as json data.
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
});

// Get all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    const tasks = await Task.findAll({where: {completed: true },});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
});

// Get all incomplete tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    const tasks = await Task.findAll({where: {completed: false },});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
});

// Read a specific task given its title
router.get("/tasks/read", async (req, res) => { 
  try {
    // Title passed in through the query of the get request.
    const { title } = req.query;

    // Make sure title was included
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Check if a task exists, if it does not, return appropriate error.
    const existingTask = await Task.findOne({ where: { title } });
    if (!existingTask) {
      return res.status(404).json({ error: "No task with that title found" });
    }

    res.json(existingTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" }) 
  }
});

// Delete an existing task
router.delete("/tasks", async(req, res) => {
  try{
    const { title } = req.query;

    // Make sure title was included
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Check if a task with the same title already exists
    const existingTask = await Task.findOne({ where: { title } });
    if (!existingTask) {
      return res.status(404).json({ error: `Task ${title} not found` });
    }

    await existingTask.destroy();

    res.json({ message: `Task ${title} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
})

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    // Make sure title was included
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Check if a task with the same title already exists. This prevents duplicates.
    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(500).json({ error: "A task with this title already exists" });
    }

    // Create the task and return message on success
    await Task.create({ title });
    res.json({ message: `Task ${title} created successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task as completed
router.post("/tasks/complete", async (req, res) => {
  try{ 
    const { title } = req.body;

    // Make sure title was included
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Check if a task exists, if it does not, return appropriate error.
    const existingTask = await Task.findOne({ where: { title } });
    if (!existingTask) {
      return res.status(404).json({ error: "No task with that title found" });
    }

    // If the task was already completed, return an error
    if (existingTask.completed === true) {
      return res.status(500).json({ error: "Task already completed" });
    }

    // Mark task as completed andsave it
    existingTask.completed = true;
    await existingTask.save();

    // Return message if task was correctly updated
    res.json({ message: `Task ${title} marked as completed!` });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
});

// Change title of a task
router.post("/tasks/title", async (req, res) => {
  try{ 
    const { oldTitle, newTitle } = req.body;

    // Make sure both titles were included
    if (!oldTitle) {
      return res.status(400).json({ error: "oldTitle is required" });
    } else if (!newTitle) {
      return res.status(400).json({ error: "newTitle is required" });
    }

    // Verify that task with old title exists
    const existingTask = await Task.findOne({ where: { title: oldTitle } });
    if (!existingTask) {
      return res.status(400).json({ error: "No task with given old Title found" });
    }

    // Verify that no task with new title already exists. If it does return an error. This prevents duplicates.
    const newTitleTask = await Task.findOne({ where: { title: newTitle } });
    if (newTitleTask) {
      return res.status(400).json({ error: "Task with given newTitle already exists" });
    }

    // Mark task as completed andsave it
    existingTask.title = newTitle;
    await existingTask.save();

    // Return message if task was correctly updated
    res.json({ message: `Task ${oldTitle} updated to ${newTitle}!` });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark task as completed" });
  }
});

module.exports = router;
