const connection = require('./connection');

const login = async (email, password) => {

    const [rows] = await connection.promise().query('SELECT * FROM user WHERE email = ? AND password = ? LIMIT 1',
        [email, password]);

    if (rows.length > 0) {
        const user = rows[0];
        return user;
    } else {
        return null;
    }
};

module.exports = {
    login
};