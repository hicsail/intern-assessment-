import { response } from "express";
import * as tasksService from '../services/tasksServices.js'
import { setResponse, setErrorResponse } from '../utils/responseHandler.js'

// get all tasks
export const getAllTasks = async (request, response) => {
    try {
        const tasks = await tasksService.getAllTasks()
        setResponse(tasks, response)
    } catch (error) {
        setErrorResponse(error, response)
    }
}

// CREATE new task
export const addTask = async (request, response) => {
    try {
        const title = request.body.title
        const newTask = await tasksService.addNewTask(title)
        setResponse(newTask, response)
    } catch (error) {
        setErrorResponse(error, response)
    }
}