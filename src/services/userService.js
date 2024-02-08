const model = require('../models/userModel');
const baseServices = require('./baseServices');
const bcrypt = require('bcrypt');

const login = async (email, password) => {

    const user = await baseServices.findUserByEmail(email);
    if (user === null) {
        throw Error('1'); //e-mail not found
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw Error('2'); //invalid password
    }
    if (!user.confmail) {
        throw Error('3'); //e-mail not verified
    }
    return user;
};

const signup = async (email, password, nameUser, telephone) => {

    if (await baseServices.findUserByEmail(email) != null) {
        throw Error('error! E-mail already registered');
    }
    let token = '';
    let user = null;
    do {
        token = baseServices.generateRandomToken();
        user = await baseServices.validateToken(token);
    } while (user != null);

    const hashedPassword = await bcrypt.hash(password, 10);
    return await model.signup(email, hashedPassword, nameUser, telephone, token);

};

module.exports = {
    baseServices,
    login,
    signup
};