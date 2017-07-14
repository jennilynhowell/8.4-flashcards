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
    req.checkBody('username', 'Ooops, there was an error. Please try again');
    req.checkBody('password', 'Ooops, there was an error. Please try again');
    req.checkBody('passwordConf', 'Ooops, there was an error. Please try again').matches(req.body.password);
    let valErrors = req.validationErrors();
    if (valErrors) {
      res.send(valErrors);
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
          res.status(500).json({message: 'Error'});
        } else {
          res.status(201).json({message: 'Success', data: user});
        };
      });
    };

  },

  login: (req, res) => {
    let username = req.body.username
      , password = req.body.password;

    User.findOne({username: username}).then(user => {
      let pwObject = user.password;
      let newPwObject = createPasswordObject(password, pwObject.salt);

      if (!user || pwObject.hash !== newPwObject.hash){
        res.status(403).json({message: 'Login error, please try again.'});
      } else if (user && pwObject.hash === newPwObject.hash ){
        res.status(200).json({message: 'Success', data: user});
      };
    });
  }



//end exports
};
