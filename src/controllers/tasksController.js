const tasksModel = require('../models/tasksModel');

const listTasks = async (req, res) => {
    const tasks = await tasksModel.listTasks(req.body.idUser);
    return res.status(200).json({ tasks });
};

module.exports = {
    listTasks
};