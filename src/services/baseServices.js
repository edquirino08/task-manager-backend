const model = require('../models/baseServicesModel');

const createLog = async (idUser, log) => {
    model.createLog(idUser, log);
};

const createError = async (userToken, error) => {
    model.createError(userToken, error);
};

const findUserByToken = async (token) => {
    const user = await model.findUserByToken(token);
    if (user === null) {
        throw Error('Error! Invalid token.');
    }
    return user;
};

module.exports = {
    createLog,
    createError,
    findUserByToken
};