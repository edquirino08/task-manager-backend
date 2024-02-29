const saveTask = (req, res, next) => {
    const { body } = req;
    if (body.task === undefined || body.task == '') {
        return res.status(400).json({ message: 'The field "task" is required' });
    }

    if (body.status === undefined || body.status == null) {
        return res.status(400).json({ message: 'The field "status" is required' });
    }

    if (body.description != undefined && body.description.length > 255) {
        throw new Error('Error! The description is longer than 255 characters.');
    }
    next();
};

module.exports = {
    saveTask
};