const User = require('../models/user');
const createPasswordObject = require('./helpers').createPasswordObject;

module.exports = {
  createUser: (req, res) => {
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
  },

  login: (username, password) => {
    return User.findOne({username: username}).then(user => {
      if(!user){
        return false;
      };
      let pwObject = user.password;
      let newPwObject = helpers.createPasswordObject(password, pwObject.salt);
      return pwObject.hash === newPwObject.hash;
    });
  }



//end exports
};
