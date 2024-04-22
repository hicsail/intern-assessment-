
const taskService = require('../Services/taskServices.js')

// Controller for Tasks API. All validation for valid requests are done before sending the control to the service module. Needs to have a body or ID as per the request.

//Controller method to get all tasks. Doesn't need any query parameter or a request body. Returns 400 Bad request if any error occurs.
const getAllTasks = async (request, response) => {
    try {
        const tasks = await taskService.getAllTasks()
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}


//Controller method to save a new task. This request needs a body. 
const saveTask = async (request, response) => {
    try {
        if(!request.body){
            response.status(400)
            .json("Bad Request, Please check!")
        }
        const newTask = {...request.body}
        const tasks = await taskService.saveTask(newTask)
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller Method to get tasks by ID. Need id in query param.
const getTaskByID = async(request, response) => {
    try {
        if(!request.params.id){
            response.status(400)
            .json("Bad Request, Please check!")
        }
        const taskID = request.params.id
        const tasks = await taskService.getAllTasksByID(taskID)
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller method to delete a task. Needs task id in query parameter
const deleteTask = async(request, response) => {
    try {
        if(!request.params.id){
            response.status(400)
            .json("Bad Request, Please check!")
        }
        const taskID = request.params.id
        const tasks = await taskService.deleteTask(taskID)
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller method to fetch all completed tasks
const getAllCompletedTasks = async (request, response) => {
    try {
        const tasks = await taskService.getAllCompletedTasks()
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller method to fetch all pending tasks
const getAllPendingTasks = async (request, response) => {
    try {
        const tasks = await taskService.getAllPendingTasks()
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller method to upadte a task as completed
const updateTaskAsCompleted = async(request, response) => {
    try {
        if(!request.params.id){
            response.status(400)
            .json("Bad Request, Please check!")
        }
        const taskID = request.params.id
        const tasks = await taskService.updateTaskAsCompleted(taskID)
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

//Controller method to upadte a tasks title
const updateTaskTitle = async(request, response) => {
    try {
        if(!request.params.id || !request.body){
            response.status(400)
            .json("Bad Request, Please check!")
        }
        const taskID = request.params.id
        const taskToBeUpdated = {...request.body}
        const tasks = await taskService.updateTaskTitle(taskID, taskToBeUpdated)
        response.status(200)
        .json(tasks)
    } catch (error) {
        response.status(400)
        .json("Bad Request, Please check!")
    }
}

module.exports = {getAllTasks, saveTask, getTaskByID, deleteTask, getAllCompletedTasks, getAllPendingTasks, updateTaskAsCompleted, updateTaskTitle}