import express from 'express';
const router = express.Router();
import * as tasksController from '../controller/tasksController.js';
import Task from '../models/task.js'; 

// Get all tasks
router.get('/tasks', tasksController.getAllTasks);

// Create a new task
router.post("/tasks", tasksController.addTask);

export default router;