

const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const taskController = require("../controllers/taskController.js")

//This file registers all routes for the API call from the front end. This refrences controller methods for all respective routes.
// Get all tasks
router.route("/tasks")
      .get(taskController.getAllTasks)

// Create a new task
router.route("/tasks")
      .post(taskController.saveTask)

//get all completed tasks
router.route("/tasks/completed")
      .get(taskController.getAllCompletedTasks)

//get all pending tasks
router.route("/tasks/pending")
      .get(taskController.getAllPendingTasks)

//Update a task completed. Need task Id to identify task to be completed
router.route("/tasks/completed/:id")
      .put(taskController.updateTaskAsCompleted)

//Update a tasks title. Need task id to identify task to be updated
router.route("/tasks/:id")
      .put(taskController.updateTaskTitle)

// Get a particular task by ID
router.route("/tasks/:id")
.get(taskController.getTaskByID)  

//Delete a task.
router.route("/tasks/:id")
.delete(taskController.deleteTask)

module.exports = router;