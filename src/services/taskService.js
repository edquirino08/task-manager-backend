const tasksModel = require('../models/tasksModel');
const baseServices = require('./baseServices');

const listTasks = async (idUser) => {
    const tasks = await tasksModel.listTasks(idUser);
    return tasks;
};

module.exports = {
    baseServices,
    listTasks
};