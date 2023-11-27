const listTasks = (req, res, next) => {
    const { body } = req;
    if (body.idUser === undefined || body.idUser == '') {
        return res.status(400).json({ message: 'The field "idUser" is required' });
    }

    next();
};

module.exports = {
    listTasks
};