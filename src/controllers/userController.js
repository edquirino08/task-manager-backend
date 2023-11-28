const userService = require('../services/userService');
const baseServices = require('../services/baseServices');

const login = async (req, res) => {
    try {
        const access = await userService.login(req.body.email, req.body.password);
        const user = await baseServices.findUserByToken(access.token);
        userService.baseServices.createLog(user.id, '/login');
        return res.status(200).json(access);
    } catch (err) {
        userService.baseServices.createError(req.headers.token, `Error /login: ${err.message}`);
        return res.status(404).json({ error: 'Error! Invalid credentials' });
    }
};

module.exports = {
    login
};