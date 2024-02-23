const baseServices = require('../services/baseServices');

const sendVerificationEmail = async (req, res, next) => {
    const { headers } = req;
    if (!headers.token) {
        return res.status(400).json({ error: 'Error! User token is required to this resource.' });
    }
    try {
        req.user = await baseServices.findUserByToken(headers.token);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
    next();
};


const verifyEmail = async (req, res, next) => {
    const { query } = req;
    if (!query.token) {
        return res.status(400).json({ error: 'Error! User token is required to this resource.' });
    }
    try {
        req.user = await baseServices.findUserByToken(query.token);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
    next();
};

const sendNewPassword = async (req, res, next) => {
    const { body } = req;
    if (!body.email) {
        return res.status(400).json({ error: 'Error! Field "email" is required to this resource.' });
    }
    next();
};

module.exports = {
    sendVerificationEmail,
    verifyEmail,
    sendNewPassword
};