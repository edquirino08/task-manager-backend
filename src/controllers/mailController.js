const mailServices = require('../services/mailServices');

const sendVerificationEmail = async (req, res) => {
    try {
        const { user } = req;
        await mailServices.sendVerificationEmail(user);
        mailServices.baseServices.createLog(req.user.id, '/sendVerificationEmail');
        return res.status(204).json();
    } catch (err) {
        mailServices.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /sendVerificationEmail: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { query } = req;
        await mailServices.verifyEmail(query.token);
        mailServices.baseServices.createLog(req.user.id, '/verifyEmail');
        return res.status(204).json();
    } catch (err) {
        mailServices.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /verifyEmail: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }

};

const sendNewPassword = async (req, res) => {
    try {
        const { body } = req;
        await mailServices.sendNewPassword(req, body.email);
        mailServices.baseServices.createLog(req.user.id, '/sendNewPassword');
        return res.status(204).json();
    } catch (err) {
        mailServices.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /sendNewPassword: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
    sendVerificationEmail,
    verifyEmail,
    sendNewPassword
};