const User = require('../models/user');
const Card = require('../models/card');
const createPasswordObject = require('./helpers').createPasswordObject;

module.exports = {
  getPages: {
    getIndex: (req, res) => {
      res.render('index', {});
    },

    getLogin: (req, res) => {
      res.render('login', {});
    },

    getCollections: (req, res) => {
      let userSession = {
        username: req.session.name,
        userId: req.session.user
      };

      Card.find({userId: userSession.userId}).then(cards => {
        let holding = []
          , counter = 0;

        //Info about SET at MDN &&: https://stackoverflow.com/questions/1960473/unique-values-in-an-array

        for (let i = 0; i < cards.length; i++) {
          holding.push(cards[i].category);
        };

        let categories = Array.from(new Set(holding));

        let context = {
          userSession: userSession,
          cards: cards,
          categories: categories
        };

        res.render('collections', context);
      });
    },

    quiz: (req, res) => {
      let category = req.params.category
        , userId = req.body.userId
        , userSession = {
          username: req.session.name,
          userId: req.session.user
        };

      Card.find({$and: [{userId: userSession.userId}, {category: category}]}).then(cards => {
        cards.forEach(card => {
          card.showCard = true;
          card.save();
        });

        let context = {
          userSession: userSession,
          category: category,
          cards: cards
        };

        res.render('quiz', context);
      });
    }

  },

  viewUsers: (req, res) => {
    User.find().then(users => {
      if (users.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(201).json({message: 'Success', data: users});
      };
    });
  },

  createUser: (req, res) => {
    //good notes about express-validator at https://booker.codes/input-validation-in-express-with-express-validator/

    req.checkBody('username', 'Ooops, there was an error. Please try again');
    req.checkBody('password', 'Ooops, there was an error. Please try again');
    req.checkBody('passwordConf', 'Ooops, there was an error. Please try again').equals(req.body.password);

    //handle any validation errors
    let valErrors = req.validationErrors();
    if (valErrors) {
      res.render('index', {valErrors: valErrors});
      return;

    } else {
      let username = req.body.username
        , password = req.body.password
        , passwordConf = req.body.passwordConf
        , passwordObj = createPasswordObject(password);

      let newUser = new User({
        username: username,
        password: passwordObj
      });

      newUser.save().then(user => {
        if (user.err){
          res.render('index', {message: 'Error'});
        } else {
          req.session.user = user._id;
          req.session.name = user.username;
          let userSession = {
            userId: req.session.user,
            username: req.session.name,
            welcome: 'Hey there, and welcome to Popquiz! Start here by making a few cards.'
          };
          res.render('collections', {userSession: userSession});
        };
      });
    };

  },

  login: (req, res) => {
    req.checkBody('username', 'Ooops, there was an error. Please try again');
    req.checkBody('password', 'Ooops, there was an error. Please try again');

    //handle any validation errors
    let valErrors = req.validationErrors();
    if (valErrors) {
      res.render('login', {valErrors: valErrors});
      return;

    } else {
      let username = req.body.username
        , password = req.body.password;

      User.findOne({username: username}).then(user => {
        let pwObject = user.password;
        let newPwObject = createPasswordObject(password, pwObject.salt);

        if (!user || pwObject.hash !== newPwObject.hash){
          res.render('login', {message: 'Login error, please try again.'});
        } else if (user && pwObject.hash === newPwObject.hash ){
          req.session.user = user._id;
          req.session.name = user.username;

          Card.find({userId: req.session.user}).then(cards => {
            for (let i = 0; i < cards.length; i++) {
              cards[i].showCard = false;
              cards[i].showAnswer = false;
              cards[i].save();
            };
          })
          res.redirect('/user/collections');
        };
      });
    }
  },

  logout: (req, res) => {
    delete req.session.user;
    delete req.session.name;
    res.redirect('/user/login');
  }





//end exports
};
