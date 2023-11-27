const tasksModel = require('../models/tasksModel');

const listTasks = async (idUser) => {
    const tasks = await tasksModel.listTasks(idUser);
    return tasks;
};

module.exports = {
    listTasks
};