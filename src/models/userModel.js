const connection = require('./connection');

const login = async (email, password) => {

    const [rows] = await connection.promise().query('SELECT email, name_user, telephone, session_token, date_reg FROM user WHERE email = ? AND password = ? LIMIT 1',
        [email, password]);

    if (rows.length > 0) {
        const user = rows[0];
        return user;
    } else {
        return null;
    }
};

const createLog = async (idUser, type, log) => {
    connection.promise.query('INSERT INTO LOGS (idUser, tipo, alteracao) VALUES (?,?,?);', [idUser, type, log]);
};

const findUserByToken = async (token) => {

    const [rows] = await connection.promise.query('SELECT * FROM user WHERE session_token = ? LIMIT 1', [token]);

    if (rows.length > 0) {
        const user = rows[0];
        return user;
    } else {
        return null;
    }
};

module.exports = {
    login,
    createLog,
    findUserByToken
};