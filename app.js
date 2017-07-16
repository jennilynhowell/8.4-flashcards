const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('express-validator');
const mustache = require('mustache-express');
const session = require('express-session');


const userControl = require('./controllers/user_controller.js');
const cardControl = require('./controllers/card_controller.js')
const User = require('./models/user');
const Card = require('./models/card');

const env = process.env.NODE_ENV || 'development';
const mongoUrl = require('./config.json')[env].mongoUrl;
mongoose.connect(mongoUrl);

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

//middleware
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(session({
  secret: 'keyboard cats',
  resave: false,
  saveUninitialized: true
}));


app.get('/', (req, res) => {
  res.redirect('/user/signup')
});

//fetch some pages
app.get('/user/signup', userControl.getPages.getIndex);
app.get('/user/login', userControl.getPages.getLogin);
app.get('/user/collections', userControl.getPages.getCollections);
app.get('/user/quiz/:category', userControl.getPages.quiz);

//==========user controllers
app.get('/api/user', userControl.viewUsers);

app.post('/user/signup', userControl.createUser);

app.post('/user/login', userControl.login);

//==========a couple api controllers
app.get('/api/card', cardControl.viewCards);
app.patch('api/card/:id', cardControl.patchCard);


  //all these should be a form submit

app.post('/card/category', cardControl.viewCardsByCategory);

app.post('/card/answer', cardControl.viewAnswer);

app.post('/card/guess', cardControl.logGuess);
// 
// app.get('/card/:id', cardControl.viewOneCard);

app.post('/card', cardControl.createCard);

app.post('/card/update', cardControl.patchCard);

app.post('/card/delete', cardControl.deleteCard);


module.exports = app;

app.listen(3000);
