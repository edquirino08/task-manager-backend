const connection = require('./connection');

const signup = async (email, password, nameUser, telephone, token) => {
    const data = await connection.query('INSERT INTO user (email, password, name_user, telephone, token) VALUES (?,?,?,?,?);', [email, password, nameUser, telephone, token]);
    return data[0].insertId;
};

const updatePassword = (password, id_user) => {
    connection.query('UPDATE user SET password = ? WHERE id = ? LIMIT 1;', [password, id_user]);
};

module.exports = {
    signup,
    updatePassword
};