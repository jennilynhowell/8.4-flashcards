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

  login: (req, res) => {
    let _id = req.params.id;
    let typedPassword = req.body.password;
    User.findById(_id).then(user => {
      console.log(user);
      let pwObject = user.password;
      let newPwObject = createPasswordObject(typedPassword, pwObject.salt);
      console.log('new: ', newPwObject);

      if (!user || pwObject.hash !== newPwObject.hash){
        res.status(403).json({message: 'Login error, please try again.'});
      } else if (user && pwObject.hash === newPwObject.hash ){
        res.status(200).json({message: 'Success', data: user});
      };
    });
  }



//end exports
};
