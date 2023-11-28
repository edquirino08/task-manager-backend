const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');
const userMiddlewares = require('./middlewares/userMiddlewares');
const authMiddleware = require('./middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/login', userMiddlewares.login, userController.login);

router.post('/listTasks', tasksController.listTasks);

module.exports = router;
