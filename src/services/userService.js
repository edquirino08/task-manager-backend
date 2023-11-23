const loginModel = require('../models/userModel');

const login = async (email, password) => {
    const access = await loginModel.login(email, password);
    return access;
};

module.exports = {
    login
};