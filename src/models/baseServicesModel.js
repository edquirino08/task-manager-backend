const connection = require('./connection');

const createLog = async (idUser, log) => {
    connection.promise().query('INSERT INTO logs (id_user, log) VALUES (?,?);', [idUser, log]);
};

const createError = async (userToken, error) => {
    connection.promise().query('INSERT INTO error (user_token, error) VALUES (?,?);', [userToken, error]);
};

const findUserByToken = async (token) => {

    const [rows] = await connection.promise().query('SELECT * FROM user WHERE token = ? LIMIT 1', [token]);

    if (rows.length > 0) {
        const user = rows[0];
        return user;
    } else {
        return null;
    }
};

module.exports = {
    createLog,
    createError,
    findUserByToken
};