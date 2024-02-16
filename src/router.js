const express = require('express');
const router = express.Router();

/* Controllers*/

const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');
const mailController = require('./controllers/mailController');

/* Midlewares*/
const authMiddleware = require('./middlewares/authMiddleware');
const userMiddlewares = require('./middlewares/userMiddlewares');
const mailMiddlewares = require('./middlewares/mailMiddlewares');

router.post('/signup', userMiddlewares.signup, userController.signup);

router.post('/login', userMiddlewares.login, userController.login);

router.get('/listTasks', authMiddleware, tasksController.listTasks);

router.post('/sendVerificationEmail', mailMiddlewares.sendVerificationEmail, mailController.sendVerificationEmail);

router.get('/verifyEmail', mailMiddlewares.verifyEmail, mailController.verifyEmail);

module.exports = router;
