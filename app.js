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

//==========static file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

//==========user controllers
app.get('/api/user', userControl.viewUsers);

app.post('/api/user', userControl.createUser);

app.post('/api/user/login', userControl.login);

//==========flashcard controllers
app.get('/api/card', cardControl.viewCards);

app.get('/api/card/category', cardControl.viewCardsByCategory);

app.get('/api/card/:id', cardControl.viewOneCard);

app.post('/api/card', cardControl.createCard);

app.patch('/api/card/:id', cardControl.patchCard);

app.delete('/api/card/:id/delete', cardControl.deleteCard);


module.exports = app;

app.listen(3000);
