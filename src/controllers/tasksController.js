const taskService = require('../services/taskService');

const listTasks = async (req, res) => {
    try {
        const tasks = await taskService.listTasks(req.user.id);
        taskService.baseServices.createLog(req.user.id, '/listTasks');
        return res.status(200).json({ tasks });
    } catch (err) {
        taskService.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /listTasks: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveTask = async (req, res) => {
    try {
        await taskService.saveTask(req.body, req.user.id);
        taskService.baseServices.createLog(req.user.id, '/saveTask');
        return res.status(204).json();
    } catch (err) {
        taskService.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /saveTask: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editTask = async (req, res) => {
    try {
        await taskService.editTask(req.body, req.user.id);
        taskService.baseServices.createLog(req.user.id, '/editTask');
        return res.status(204).json();
    } catch (err) {
        const parsedError = JSON.parse(err.message);
        taskService.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /editTask: ${parsedError.message}`);
        return res.status(500).json({ error: parsedError.prefix });
    }
};


module.exports = {
    listTasks,
    saveTask,
    editTask
};