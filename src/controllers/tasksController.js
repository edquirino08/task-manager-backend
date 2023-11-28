const taskService = require('../services/taskService');

const listTasks = async (req, res) => {
    try {
        const user = taskService.baseServices.findUserByToken(req.body.token);
        const tasks = await taskService.listTasks(req.body.idUser);
        taskService.baseServices.createLog()
        return res.status(200).json({ tasks });
    } catch (err) {
        return res.status(500).json('Error');
    }

};

module.exports = {
    listTasks
};