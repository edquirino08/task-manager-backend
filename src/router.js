const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const userMiddlewares = require('./middlewares/userMiddlewares');

router.post('/login', userMiddlewares.login, userController.login);

module.exports = router;
