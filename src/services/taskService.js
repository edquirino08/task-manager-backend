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

    verifyTaskParams(task);

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

const verifyTaskParams = (task) => {

    if (baseServices.findUserbyId(task.id_user) == null)
        throw Error('Error! Invalid id_user.');

    if ((typeof task.task !== 'string' || task.task.length > 5000))
        throw Error('Error! Invalid task name.');

    if ((typeof task.description !== 'string' || task.description.length > 255))
        throw Error('Error! Invalid task description.');

    if (!(/^[0-9]+$/.test(task.status) || !(task.status >= 0 && task.status <= 2)))
        throw Error('Error! Invalid task status.');

    if (!(/^[0-9]+$/.test(task.priority) || !(task.priority >= 0 && task.status <= 3)))
        throw Error('Error! Invalid task priority.');
};

const editTask = async (newTask, idUser) => {

    try {

        newTask.id_user = idUser;

        verifyTaskParamsEdit(newTask);

        const task = await tasksModel.findTaskByIdAndIdUser(newTask.id, idUser);

        if (task === null)
            throw Error(({ prefix: 5, message: 'Task not found for this user' }));

        if (newTask.description != null && newTask.description != undefined)
            task.description = newTask.description;

        if (newTask.status !== null && newTask.status !== undefined)
            task.status = newTask.status;

        if (newTask.priority !== null && newTask.priority !== undefined)
            task.priority = newTask.priority;

        if (newTask.date_end !== null && newTask.date_end !== undefined) {

            const data = new Date(newTask.date_end);

            const ano = data.getFullYear();
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const dia = data.getDate().toString().padStart(2, '0');
            const hora = data.getHours().toString().padStart(2, '0');
            const minutos = data.getMinutes().toString().padStart(2, '0');
            const segundos = data.getSeconds().toString().padStart(2, '0');

            task.date_end = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}.0`;
        }


        const edit = await tasksModel.editTask(task);

        if (!edit)
            throw Error(JSON.stringify({ prefix: 6, message: 'Task not updated on database' }));

    } catch (err) {

        throw Error(err.message);

    }
};


const verifyTaskParamsEdit = (task) => {

    if (baseServices.findUserbyId(task.id_user) == null)
        throw Error(JSON.stringify({ prefix: 1, message: 'Invalid id_user' }));

    if ((typeof task.description !== 'string' || task.description.length > 255))
        throw Error(JSON.stringify({ prefix: 2, message: 'Invalid task description' }));

    if (!(/^[0-9]+$/.test(task.status)) || !(task.status >= 0 && task.status <= 2))
        throw Error(JSON.stringify({ prefix: 3, message: 'Invalid task status' }));

    if (!(/^[0-9]+$/.test(task.priority)) || !(task.priority >= 0 && task.status <= 3))
        throw Error(JSON.stringify({ prefix: 4, message: 'Invalid task priority' }));
};


module.exports = {
    baseServices,
    listTasks,
    saveTask,
    editTask
};