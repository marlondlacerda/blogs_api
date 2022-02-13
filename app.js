const express = require('express');
const bodyParser = require('body-parser');

// TODO IMPORTAR CONTROLLERS
const userController = require('./controllers/userController.js');
const loginController = require('./controllers/loginController.js');
// TODO IMPORTAR MIDDLEWARES
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);

app.use(middlewares.domainError);
app.use(middlewares.joiError);

module.exports = app;
