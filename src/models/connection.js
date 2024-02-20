const mysql = require('mysql2/promise');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const pool = mysql.createPool(DATABASE_URL);

module.exports = pool;
