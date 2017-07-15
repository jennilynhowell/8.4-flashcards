const User = require('../models/user');
const createPasswordObject = require('./helpers').createPasswordObject;

module.exports = {
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
        , passwordObj = createPasswordObject(password);

      let newUser = new User({
        username: username,
        password: passwordObj
      });

      newUser.save().then(user => {
        if (user.err){
          res.render('index', {message: 'Error'});
        } else {
          res.session.user = user._id;
          res.session.name = user.username;
          res.render('collections', {data: user});
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
          res.render('collections', {data: user});
        };
      });
    }


  }



//end exports
};
