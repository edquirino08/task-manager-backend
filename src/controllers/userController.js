const userService = require('../services/userService');
const baseServices = require('../services/baseServices');

const login = async (req, res) => {
    try {
        const access = await userService.login(req.body.email, req.body.password);
        const user = await baseServices.findUserByToken(access.token);
        userService.baseServices.createLog(user.id, '/login');
        return res.status(200).json(access);
    } catch (err) {
        userService.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /login: ${err.message}`);
        return res.status(404).json({ error: 'Error! Invalid credentials' });
    }
};

const signup = async (req, res) => {
    try {
        const { body } = req;
        const userId = await userService.signup(body.email, body.password, body.nameUser, body.telephone);
        userService.baseServices.createLog(userId, '/signup');
        return res.status(204).json();
    } catch (err) {
        userService.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /signup: ${err.message}`);
        return res.status(404).json({ error: 'Error! Invalid credentials' });
    }
};

module.exports = {
    login,
    signup
};