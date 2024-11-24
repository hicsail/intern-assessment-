const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// List / Get all tasks with optional filter for 'completed' to list completed or pending tasks
router.get("/tasks", async (req, res) => {
  try {
    const { completed } = req.query; // Extract the 'completed' query parameter
    const whereClause = completed !== undefined 
      ? { completed: completed === "true" } // Apply filter for completed tasks
      : {}; // No filter if 'completed' parameter is not provided

    // Log the filter for debugging
    console.log("Filter:", whereClause);

    // Fetch tasks based on the filter
    const tasks = await Task.findAll({ where: whereClause });
    res.json(tasks); // Return tasks as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error message
  }
});

//Read a task, Get a specific task by ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract task ID from URL parameters
    const task = await Task.findByPk(id); // Find the task by primary key (ID)
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" }); // Task not found
    }

    res.json(task); // Return the task details as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error if something goes wrong
  }
});


// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    //Extract title from the request provided by client
    const { title } = req.body;

    // Create a new task with the provided title and set default 'completed' to false
    const newTask = await Task.create({title, completed: false });

    //return created task with 201 status
    res.status(201).json(newTask);
  }
  catch (error) {
    //return error message if task creation fails
    res.status(500).json({ error: error.message });
  }
});

//Mark a task as completed
router.patch("/tasks/:id/complete", async (req, res) => {
  try {
    //Extract task id 
    const { id } = req.params;

    //Find the task by its id
    const task = await Task.findByPk(id);
    if (!task) {

      //return error if task not found
      return res.status(404).json({ error: "Task not found "});
    }

    //mark the task as completed
    task.completed = true;

    //save and return task
    await task.save();
    res.json(task);
  }
  catch (error) {
    //error handling
    res.status(500).json({ error: error.message });
  }
});

//Update task title
router.put("/tasks/:id", async (req, res) => {
  try {
    //Extract task id and new title requested by client
    const { id } = req.params;
    const { title } = req.body;

    //find the task by extracted id
    const task = await Task.findByPk(id);
    
    if (!task) {

      //return error if task not found
      return res.status(404).json({error: "Task not found" });
    }
    //update task title , save task and reurn task
    task.title = title;
    await task.save();
    res.json(task);

  } catch (error) {
    //error handling
    res.status(500).json({error: error.message });
  }
});

//Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    //Extract task id 
    const { id } = req.params;

    //find task by id
    const task = await Task.findByPk(id);
    if (!task) {
      //return error if task not found
      return res.status(404).json( {error: "Task not found" });
    }

    //Delete task and return success message
    await task.destroy();
    res.json({ message: 'Task with ID ${req.params.id} deleted successfully' });

  }
  catch (error) {
    //error handling
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
