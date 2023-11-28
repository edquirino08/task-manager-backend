const userService = require('../services/userService');

const login = async (req, res) => {
    try {
        const access = await userService.login(req.body.email, req.body.password);
        userService.baseServices.createLog(req.user.id, '/login');
        return res.status(200).json(access);
    } catch (err) {
        userService.baseServices.createError(req.headers.token, `Error /login: ${err.message}`);
        return res.status(404).json({ error: 'Error! Invalid credentials' });
    }
};

module.exports = {
    login
};