const mailModel = require('../models/mailModel');
const baseServices = require('./baseServices');
const sgMail = require('@sendgrid/mail');


require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (user) => {

    const msg = {
        to: user.email,
        from: 'contato.taskmanager@gmail.com',
        templateId: 'd-410e837098e14d17a4017fde5f1fc3d6',
        dynamicTemplateData: {
            name: user.name_user,
            token: user.token
        }
    };

    try {
        await sgMail.send(msg);
        mailModel.insertMailSender(user.id, 'email verification', 'd-410e837098e14d17a4017fde5f1fc3d6');
    } catch (err) {
        throw Error(`Error /sendVerificationEmail: ${err.response.body.errors[0].message}`);
    }
};

const verifyEmail = (token) => mailModel.verifyEmail(token);

module.exports = {
    baseServices,
    sendVerificationEmail,
    verifyEmail
};