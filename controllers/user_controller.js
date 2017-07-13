const User = require('../models/user');
const helpers = require('./helpers')

module.exports = {
  createUser: (req, res) => {
    console.log('HELLO');
    console.log(req.body.username);
    if(req.body.password){ console.log('I ALSO HAVE A PW'); };
    let username = req.body.username
      , password = req.body.password
      // , passwordObj = helpers.createPasswordObject(password);

    console.log('HELLO I HAVE A USER IT IS: ', username);
    console.log(passwordObj);
    let newUser = new User({
      username: user,
      password: passwordObj
    });
    console.log(newUser);

    newUser.save().then(user => {
      console.log('from app: ', user);
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
