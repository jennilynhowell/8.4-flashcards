const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userControl = require('./controllers/user_controller');
const cardControl = require('./controllers/card_controller.js')
const User = require('./models/user');
const Card = require('./models/card');

const env = process.env.NODE_ENV || development;
const mongoUrl = require('./config.json')[env].mongoUrl;
mongoose.connect(mongoUrl);

app.use(bodyParser.json());

//==========user controllers
app.post('/api/user', userControl.createUser);

app.get('/api/user/:id', userControl.login);

//==========flashcard controllers
app.post('/api/card', cardControl.createCard);

app.delete('/api/card/:id/delete', cardControl.deleteCard);

// module.exports = {
//   deleteCard: deleteCard,
//   createCard: createCard,
//   login: login,
//   createPasswordObject: createPasswordObject,
//   createUser: createUser
// };

module.exports = app;
