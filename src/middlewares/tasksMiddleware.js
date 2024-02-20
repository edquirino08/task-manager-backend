const saveTask = (req, res, next) => {
    const { body } = req;
    if (body.task === undefined || body.task == '') {
        return res.status(400).json({ message: 'The field "task" is required' });
    }

    if (body.status === undefined || body.status == null) {
        return res.status(400).json({ message: 'The field "status" is required' });
    }

    next();
};

module.exports = {
    saveTask
};