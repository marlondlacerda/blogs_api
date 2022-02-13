const express = require('express');
const bodyParser = require('body-parser');

// TODO IMPORTAR CONTROLLERS
const authControler = require('./controllers/authController.js');
const userController = require('./controllers/userController.js');
// TODO IMPORTAR MIDDLEWARES
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/', authControler);

app.use(middlewares.auth);

app.use('/user', userController);

app.use(middlewares.domainError);
app.use(middlewares.joiError);

module.exports = app;
