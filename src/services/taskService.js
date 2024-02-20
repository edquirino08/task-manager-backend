const tasksModel = require('../models/tasksModel');
const baseServices = require('./baseServices');

const listTasks = async (idUser) => {
    const tasks = await tasksModel.listTasks(idUser);
    return tasks;
};

const saveTask = async (task, idUser) => {
    task.id_user = idUser;
    if (task.priority === null || task.priority === undefined) {
        task.priority = 0;
    }
    await tasksModel.saveTask(task);
};

module.exports = {
    baseServices,
    listTasks,
    saveTask
};