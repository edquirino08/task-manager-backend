const connection = require('./connection');

const verifyEmail = (token) => {
    connection.promise().query('UPDATE user SET confmail = 1 WHERE token = ? ORDER BY id DESC LIMIT 1', [token]);
};

module.exports = {
    verifyEmail
};
