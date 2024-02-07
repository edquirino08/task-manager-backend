const connection = require('./connection');

const insertMailSender = (idUser, type, idTemplate) => {
    connection.promise().query('INSERT INTO mail_sender (id_user, type, id_template) VALUES (?,?, ?);', [idUser, type, idTemplate]);
};

const verifyEmail = (token) => {
    connection.promise().query('UPDATE user SET confmail = 1 WHERE token = ? ORDER BY id DESC LIMIT 1', [token]);
};

module.exports = {
    insertMailSender,
    verifyEmail
};
