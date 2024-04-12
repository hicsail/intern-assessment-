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

// delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.send({ status: 400, message: "Request is incomplete" });
      return;
    }
   const deletedTask = Task.destroy({where: {id: id }})

   if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "Task deleted successfully" });
  return
  } catch (error) {
    console.error(error);
  }
});

// update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newTitle = req.body
    if (!id || !newTitle) {
      res.send({ status: 400, message: "Request is incomplete" });
      return;
    }
   const updatedTask = Task.update({ title: newTitle },{where: {id: id }})

   if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "Task updated successfully" });
  return
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
