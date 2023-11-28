const baseServices = require('../services/baseServices');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try {
        req.user = await baseServices.findUserByToken(req.headers.token);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
    next();
};

module.exports = authMiddleware;
