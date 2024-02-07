const mailModel = require('../models/mailModel');
const baseServices = require('./baseServices');

const verifyEmail = (token) => mailModel.verifyEmail(token);

module.exports = {
    baseServices,
    verifyEmail
};