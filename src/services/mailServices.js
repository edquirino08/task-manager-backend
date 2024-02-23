const mailModel = require('../models/mailModel');
const baseServices = require('./baseServices');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');


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
        mailModel.insertMailSender(user.id, 'email verification', msg.templateId);
    } catch (err) {
        throw Error(`Error /sendVerificationEmail: ${err.response.body.errors[0].message}`);
    }
};

const verifyEmail = (token) => mailModel.verifyEmail(token);

const sendNewPassword = async (req, email) => {
    const user =  await baseServices.findUserByEmail(email);
    if (user === null) {
        throw Error('1'); //email not found
    }

    if (!user.confmail) {
        throw Error('2'); //email not confirmed
    }
    req.user = user;
    const newPassword = baseServices.generateNewPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {

        const msg = {
            to: user.email,
            from: 'contato.taskmanager@gmail.com',
            templateId: 'd-5e42c7b05f91496189aea094322ca3a2',
            dynamicTemplateData: {
                name: user.name_user,
                password: newPassword
            }
        };
        await sgMail.send(msg);
        mailModel.insertMailSender(user.id, 'email verification', msg.templateId);
        const { updatePassword } = require('../models/userModel');
        updatePassword(hashedPassword, user.id);
    } catch (err) {
        throw Error(`Error /sendNewPassword: ${err.response.body.errors[0].message}`);
    }
};


module.exports = {
    baseServices,
    sendVerificationEmail,
    verifyEmail,
    sendNewPassword
};