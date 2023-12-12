const model = require('../models/userModel');
const baseServices = require('./baseServices');

const login = async (email, password) => {
    const access = await model.login(email, password);
    if (access === null) {
        throw Error('Error! Invalid credentials.');
    }
    return access;
};

const signup = async (email, password, nameUser, telephone) => {

    if (await baseServices.findUserByEmail(email) != null) {
        throw Error('error! E-mail already registered');
    }
    let token = '';
    let user = null;
    do {
        token = baseServices.generateRandomToken();
        user =  await baseServices.validateToken(token);
    } while (user != null);

    model.signup(email, password, nameUser, telephone, token);

};

module.exports = {
    baseServices,
    login,
    signup
};