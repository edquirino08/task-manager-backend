const connection = require('./connection');

const createLog = async (idUser, log) => {
    connection.query('INSERT INTO logs (id_user, log) VALUES (?,?);', [idUser, log]);
};

const createError = async (ip
    , error) => {
    connection.query('INSERT INTO error (ip, error) VALUES (?,?);', [ip, error]);
};

const findUserByToken = async (token) => {
    const [rows] = await connection.query('SELECT * FROM user WHERE token = ? LIMIT 1', [token]);
    let user = null;
    if (rows.length > 0) {
        user = rows[0];
    }
    return user;
};

const findUserByEmail = async (email) => {
    const [res] = await connection.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
    if (res.length > 0) {
        return res[0];
    }
    return null;
};


const findUserById = async (idUser) => {
    const [res] = await connection.query('SELECT * FROM user WHERE id = ? LIMIT 1', [idUser]);
    if (res.length > 0) {
        return res[0];
    }
    return null;
};

module.exports = {
    createLog,
    createError,
    findUserByToken,
    findUserByEmail,
    findUserById
};