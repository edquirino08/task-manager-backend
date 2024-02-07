const mailServices = require('../services/mailServices');

const verifyEmail = async (req, res) => {
    try {
        const { query } = req;
        mailServices.verifyEmail(query.token);
        mailServices.baseServices.createLog(req.user.id, '/verifyEmail');
        return res.status(204).json();
    } catch (err) {
        mailServices.baseServices.createError(req.ip || req.connection.remoteAddress, `Error /verifyEmail: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }

};

module.exports = {
    verifyEmail
};