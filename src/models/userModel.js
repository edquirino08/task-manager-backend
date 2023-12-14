const connection = require('./connection');

const signup = async (email, password, nameUser, telephone, token) => {
    const data = await connection.promise().query('INSERT INTO user (email, password, name_user, telephone, token) VALUES (?,?,?,?,?);', [email, password, nameUser, telephone, token]);
    return data[0].insertId;
};

module.exports = {
    signup
};