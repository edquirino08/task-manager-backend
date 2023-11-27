const taskService = require('../services/taskService');

const listTasks = async (req, res) => {
    const tasks = await taskService.listTasks(req.body.idUser);
    return res.status(200).json({ tasks });
};

module.exports = {
    listTasks
};