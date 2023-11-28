const userModel = require('../models/userModel');

const createLog = async (idUser, type, log) => {
    userModel.createLog(idUser, type, log);
};

const findUserByToken = async (token) => {
    const user = await userModel.findUserByToken(token);
    if (user === null) {
        throw Error('Error! Invalid token.');
    }

    return user;
};

module.exports = {
    createLog,
    findUserByToken
};