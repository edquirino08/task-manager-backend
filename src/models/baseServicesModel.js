const connection = require('./connection');

const createLog = async (idUser, log) => {
    connection.promise().query('INSERT INTO logs (id_user, log) VALUES (?,?);', [idUser, log]);
};

const createError = async (ip
, error) => {
    connection.promise().query('INSERT INTO error (ip, error) VALUES (?,?);', [ip, error]);
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

const findUserByEmail = async (email) => {

    const [res] = await connection.promise().query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
    if (res.length > 0) {
        return res[0];
    }
    return null;

};

module.exports = {
    createLog,
    createError,
    findUserByToken,
    findUserByEmail
};