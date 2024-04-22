const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ err: 'server error, please try again!'});
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({err: 'failed to create a new task!'})
  }
});

// update the title of a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const task = await Task.findByPk(id);
    // error handling when the task is not found 
    if (!task) {
      const result = res.status(404).json({err: 'can not find the task!'});
      return result;
    }
    task.title = title;
    await task.save();
    res.json(task);
  }
  catch (err) {
    res.status(400).json({err: 'can not update the task!'})
  }
});

// delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    // error handling when the task not found 
    if (!task) {
      const result = res.status(404).json({err: 'can not find the task!'});
      return result;
    }
    await task.destroy();
    res.json({msg: 'The task is successfully deleted!'});
  } catch (err) {
    res.status(400).json({ err: 'can not delete the task!'})
  }
});

// fetch the info of a specific task
router.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    // error handling when the task not found
    if (!task) {
      const result = res.status(404).json({err: 'can not find the task!'});
      return result;
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ err: 'can not get the info of the task!'});
  }
})


// mark a task as completed 
router.put('/tasks/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await Task.findByPk(id);
    // error handling when the task not found
    if (!task) {
      const result = res.status(404).json({err: 'can not find the task!'});
      return result;
    }
    // if the task is found
    task.completed = completed;
    await task.save();
    res.json(task);
  } catch(err) {
    res.status(400).json({ err: 'can not mark the task as completed!'});
  }
});

// get a list of completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    const tasksCompleted = await Task.findAll({where: { completed: true }});
    res.json(tasksCompleted);
  } catch (err) {
    res.status(500).json({ err: 'server error, please try again!'});
  }
});

// get a list of pending tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    const tasksPending = await Task.findAll({where: {completed: false}});
    res.json(tasksPending);
  } catch (err) {
    res.status(500).json({ err: 'server error, please try again!'});
  }
});

module.exports = router;
