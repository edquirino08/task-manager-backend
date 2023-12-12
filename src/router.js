const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');
const userMiddlewares = require('./middlewares/userMiddlewares');
const authMiddleware = require('./middlewares/authMiddleware');

router.post('/login', userMiddlewares.login, userController.login);

router.post('/listTasks', authMiddleware, tasksController.listTasks);

router.post('/signup', userMiddlewares.signup, userController.signup);

module.exports = router;
