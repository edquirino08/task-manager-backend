const taskService = require('../services/taskService');

const listTasks = async (req, res) => {
    try {
        const tasks = await taskService.listTasks(req.user.id);
        taskService.baseServices.createLog(req.user.id, '/listTasks');
        return res.status(200).json({ tasks });
    } catch (err) {
        taskService.baseServices.createError(req.headers.token, `Error /listTasks: ${err.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    listTasks
};