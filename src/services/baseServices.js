const model = require('../models/baseServicesModel');

const createLog = async (idUser, log) => {
    model.createLog(idUser, log);
};

const createError = async (ip, error) => {
    model.createError(ip, error);
};

const findUserByToken = async (token) => {
    const user = await model.findUserByToken(token);
    if (user === null) {
        throw Error('Error! Invalid token.');
    }
    return user;
};

const validateToken = async (token) => await model.findUserByToken(token);

const findUserByEmail = async (email) => {

    return await model.findUserByEmail(email);
};

const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};

module.exports = {
    createLog,
    createError,
    findUserByToken,
    validateToken,
    findUserByEmail,
    generateRandomToken
};