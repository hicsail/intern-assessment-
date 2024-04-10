const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.render('index', { tasks: tasks });
});

// Add a new task
router.post('/add', async (req, res) => {
  const title = req.body.title;
  await Task.create({ title: title });
  res.redirect('/tasks');
});

// Mark a task as completed
router.post('/complete/:id', async (req, res) => {
  const id = req.params.id;
  await Task.update({ completed: true }, { where: { id: id } });
  res.redirect('/tasks');
});

// Delete a task
router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await Task.destroy({ where: { id: id } });
  res.redirect('/tasks');
});

module.exports = router;
