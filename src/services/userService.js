const loginModel = require('../models/userModel');
const baseServices = require('./baseServices');

const login = async (email, password) => {
    const access = await loginModel.login(email, password);
    if (access === null) {
        throw Error('Error! Invalid credentials.');
    }
    return access;
};

module.exports = {
    baseServices,
    login
};