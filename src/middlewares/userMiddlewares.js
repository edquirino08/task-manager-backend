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

const signup = (req, res, next) => {
    const { body } = req;

    if (body.password === undefined || body.password == '') {
        return res.status(400).json({ message: 'The field "password" is required' });
    }
    if (body.email === undefined || body.email == '') {
        return res.status(400).json({ message: 'The field "email" is required' });
    }
    if (body.nameUser === undefined || body.nameUser == '') {
        return res.status(400).json({ message: 'The field "nameUser" is required' });
    }
    if (body.telephone === undefined || body.telephone == '') {
        return res.status(400).json({ message: 'The field "telephone" is required' });
    }
    const regex = /^\d{8,15}$/;
    if (!regex.test(body.telephone)) {
        return res.status(400).json({ message: 'Error! Invalid telephone.' });
    }
    next();
};

module.exports = {
    login,
    signup
};