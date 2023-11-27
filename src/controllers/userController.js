const userService = require('../services/userService');

const login = async (req, res) => {
    const access = await userService.login(req.body.email, req.body.password);
    if (access === null) {
        return res.status(404).json('Invalid');
    }
    return res.status(200).json(access);

};

module.exports = {
    login
};