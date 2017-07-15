const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('express-validator');

const userControl = require('./controllers/user_controller.js');
const cardControl = require('./controllers/card_controller.js')
const User = require('./models/user');
const Card = require('./models/card');

const env = process.env.NODE_ENV || 'development';
const mongoUrl = require('./config.json')[env].mongoUrl;
mongoose.connect(mongoUrl);

app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

//==========user controllers
app.get('/user', userControl.viewUsers);

app.post('/user', userControl.createUser);

app.post('/user/login', userControl.login);

//==========flashcard controllers
app.get('/card', cardControl.viewCards);

app.get('/card/category', cardControl.viewCardsByCategory);

app.get('/card/:id', cardControl.viewOneCard);

app.post('/card', cardControl.createCard);

app.patch('/card/:id', cardControl.patchCard);

app.delete('/card/:id/delete', cardControl.deleteCard);


module.exports = app;

app.listen(3000);
