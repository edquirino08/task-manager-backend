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

    const data = new Date(task.date_end);

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    task.date_end = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}.0`;

    await tasksModel.saveTask(task);
};

module.exports = {
    baseServices,
    listTasks,
    saveTask
};