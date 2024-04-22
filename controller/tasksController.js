import { response } from "express";
import * as tasksService from '../services/tasksServices.js';
import { setResponse, setErrorResponse } from '../utils/responseHandler.js';

console.log("Controller/Service file loaded");      // check file load

/**
    THIS FILE HAS ALL THE CONTROLLER FUNCTIONS WHICH TAKE USER REQUEST AND SEND IT TO THE SERVICE
    TO INTERACT WITH THE MODEL/DB TO PERFORM REQUIRED OPERATIONS
*/

// GET ALL TASKS
export const getAllTasks = async (request, response) => {
    try {
        const tasks = await tasksService.getAllTasks();
        setResponse(tasks, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

// CREATE NEW TASK
export const addTask = async (request, response) => {
    try {
        const title = request.body.title;
        const newTask = await tasksService.addNewTask(title);
        setResponse(newTask, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

// DELETE A TASK
export const deleteTask = async (request, response) => {
    try {
        const id = request.params.id;
        const result = await tasksService.deleteTask(id);
        if(result == 0) {
            response.status(404).json({ message: "No task found with the provided ID." });
        } else {
            setResponse("Task Deleted", response);
        }
    } catch (error) {
        setErrorResponse(error, response);
    }
};

// MARK TASK AS COMPLETED
export const completeTask = async (request, response) => {
    try {
        const id = request.params.id;
        const task = await tasksService.markTaskAsCompleted(id);
        setResponse("Task marked as complete", response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

// GET TASK BY ID
export const getTask = async (request, response) => {
    try {
        const id = request.params.id;
        const task = await tasksService.readTask(id);
        setResponse(task, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

// UPDATE TASK TITLE
export const updateTask = async (request, response) => {
    try {
        const id = request.params.id;
        const title = request.body.title;
        await tasksService.updateTaskTitle(id, title);
        setResponse({ message: 'Task title updated successfully' }, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

// LIST COMPLETED TASKS
export const listCompleted = async (request, response) => {
    try {
        console.log("Showing completed tasks");
        const tasks = await tasksService.listCompletedTasks();
        setResponse(tasks, response);
    } catch (error) {
        console.log("Error in completed tasks");
        setErrorResponse(error, response);
    }
};

// LIST PENDING TASKS
export const listPending = async (request, response) => {
    try {
        const tasks = await tasksService.listPendingTasks();
        setResponse(tasks, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};