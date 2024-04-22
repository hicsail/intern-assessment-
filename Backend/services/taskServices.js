const Task = require("../models/task")

//Services to interact with DB for CRUD operations.

//Method to return all saved tasks.
const getAllTasks = async () => {
    const tasks = await Task.findAll(); 
    return tasks;
  };

//Method to save a task.
const saveTask = async (newTask) => {
    const task = (await Task.create(newTask)).save(); 
    return task;
  };

//Method to return a task by ID.
const getAllTasksByID = async (taskID) => {
    const tasks = await Task.findByPk(taskID); 
    return tasks;
  };

//Method to delete a task.
const deleteTask = async (taskID) => {
    const tasks = await Task.destroy({where: {id: taskID}}); 
    return tasks;
  };

//Method to return all completed tasks.
const getAllCompletedTasks = async () => {
  console.log("test")
    const tasks = await Task.findAll(
        {
            where:{status: true}
        }
    ); 
    return tasks;
  };

//Method to return all pending tasks.
const getAllPendingTasks = async () => {
    const tasks = await Task.findAll({
      where: {status: false}
    }); 
    return tasks;
  };


//Method to update a task as completed.
const updateTaskAsCompleted = async (taskID) => {
    const tasks = await Task.update(
        { status: true},
        { where: {id: taskID} }
    )
};

//Method to update a tasks title.
const updateTaskTitle = async (taskID, task) => { 
    const tasks = await Task.update(task ,{where: {id: taskID}})
    return tasks;
};


module.exports = {getAllTasks, saveTask, getAllTasksByID, deleteTask, getAllCompletedTasks, getAllPendingTasks, updateTaskAsCompleted, updateTaskTitle}
  