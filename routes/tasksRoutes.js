import express from 'express';
const router = express.Router();
import * as tasksController from '../controller/tasksController.js';
import Task from '../models/task.js'; 

/**
 *
 * THIS FILE HAS ALL THE ROUTES FOR THE BACKEND FUNCTIONS 
 */

// Get all tasks
router.get('/tasks', tasksController.getAllTasks);

// Create a new task
router.post("/tasks", tasksController.addTask);

// Delete a task
router.delete('/tasks/:id', tasksController.deleteTask);

// Mark a task as completed
router.patch('/tasks/:id/complete', tasksController.completeTask);

// List all completed tasks
router.get('/tasks/completed', tasksController.listCompleted);

// List all pending tasks
router.get('/tasks/pending', tasksController.listPending);

// Get a task by ID
router.get('/tasks/:id', tasksController.getTask);

// Update a task's title
router.patch('/tasks/:id', tasksController.updateTask);

export default router;