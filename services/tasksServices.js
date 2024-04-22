import Task from '../models/task.js';

/*
    THIS FILE CONTAINS ALL THE SERVICE METHODS FOR THE TASK MODEL
    THESE METHODS ACT AS CONNECTION BETWEEN THE CONTROLLER AND MODEL
    THESE ARE RESPONSIBLE FOR INTERACTING WITH THE DATABASE
*/

export const getAllTasks = async () => {
    const tasks = await Task.findAll();
    return tasks;
};

export const addNewTask = async (title) => {
    const task = new Task({
        title: title
    });
    return task.save();
};

export const deleteTask = async (id) => {
    return Task.destroy({
        where: { id: id }
    });
};

export const markTaskAsCompleted = async (id) => {
    return Task.update({ completed: true }, {
        where: { id: id }
    });
};

export const readTask = async (id) => {
    return Task.findByPk(id);
};

export const updateTaskTitle = async (id, title) => {
    return Task.update({ title: title }, {
        where: { id: id }
    });
};

export const listCompletedTasks = async () => {
    console.log("Fetching completed tasks");
    return Task.findAll({
        where: {completed: true, },
    });
};

export const listPendingTasks = async () => {
    return Task.findAll({
        where: { completed: false }
    });
};
