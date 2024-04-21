const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  return res.json(tasks);
});

// Get all filtered tasks based on task's status(todo, pending, completed)
router.get("/tasks/filtered", async (req, res) => {
  const { status } = req.body;
  const tasks = await Task.findAll({
    where: {
      status: status,
    },
  });
  return res.json(tasks);
});

// Get one task by id
router.get("/task/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    where: { id: id },
  });
  if (task === null) {
    return res.json({ message: "Not found!", data: task });
  }
  return res.json({ message: "Find one task", data: task });
});

// Create a new task
router.post("/task", async (req, res) => {
  const task = req.body;
  const tasks = await Task.create({
    title: task.title,
  });

  return res.json({ message: "Successfully Create a task.", data: tasks });
});

// Update a task's attributes(title, status)
router.post("/task/:id", async (req, res) => {
  const id = req.params.id;
  const task = req.body;
  const isFound = await Task.findOne({
    where: { id: id },
  });

  if (isFound === null) {
    return res.json({ message: "Update Failed! Task not found!", data: task });
  }

  // When task isFound
  const data = await Task.update(
    { ...task },
    {
      where: {
        id: id,
      },
    },
  );
  return res.json({ message: "Successfully update a task.", data: data });
});

router.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Task.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Successfully delete a task.", data: data });
});

module.exports = router;
