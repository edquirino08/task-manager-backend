const baseServices = require('../services/baseServices');

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

module.exports = {
    verifyEmail
};