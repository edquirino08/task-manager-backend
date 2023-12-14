const model = require('../models/userModel');
const baseServices = require('./baseServices');
const bcrypt = require('bcrypt');

const login = async (email, password) => {

    const user = await baseServices.findUserByEmail(email);
    if (user === null) {
        throw Error('Error! User not found.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw Error('Error! Invalid credentials.');
    }
    return {
        email: user.email,
        name_user: user.name_user,
        telephone: user.telephone,
        token: user.token,
        date_reg: user.date_reg

    };
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