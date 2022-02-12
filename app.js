const express = require('express');
const bodyParser = require('body-parser');

// TODO IMPORTAR CONTROLLERS
const userController = require('./controllers/userController.js');
// TODO IMPORTAR MIDDLEWARES

const app = express();

app.use(bodyParser.json());

app.use('/users', userController);

module.exports = app;
