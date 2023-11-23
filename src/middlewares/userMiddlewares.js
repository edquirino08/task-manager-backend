const login = (req, res, next) => {
    const { body } = req;
    if (body.email === undefined || body.email == '') {
        return res.status(400).json({ message: 'The field "email" is required' });
    }
    if (body.password === undefined || body.password == '') {
        return res.status(400).json({ message: 'The field "password" is required' });
    }
    next();
};

module.exports = {
    login
};