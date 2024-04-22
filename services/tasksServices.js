import Task from '../models/task.js';

export const getAllTasks = async () => {
    const tasks = await Task.findAll();
    return tasks;
};

export const addNewTask = async (title) => {
    const task = new Task({
        title: title
    });
    return task.save()
}
