const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');
const tasksMiddlewares = require('./middlewares/tasksMiddlewares');
const userMiddlewares = require('./middlewares/userMiddlewares');

router.post('/login', userMiddlewares.login, userController.login);

router.get('/listTasks', tasksMiddlewares.listTasks, tasksController.listTasks);

module.exports = router;
