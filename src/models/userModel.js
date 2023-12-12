const connection = require('./connection');

const login = async (email, password) => {

    const [rows] = await connection.promise().query('SELECT email, name_user, telephone, token, date_reg FROM user WHERE email = ? AND password = ? LIMIT 1',
        [email, password]);

    if (rows.length > 0) {
        const user = rows[0];
        return user;
    } else {
        return null;
    }
};

const signup = async (email, password, nameUser, telephone, token) => {
    connection.promise().query('INSERT INTO user (email, password, name_user, telephone, token) VALUES (?,?,?,?,?);', [email, password, nameUser, telephone, token]);
};

module.exports = {
    login,
    signup
};