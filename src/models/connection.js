const mysql = require('mysql2');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const connection = mysql.createConnection(DATABASE_URL);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

module.exports = connection;