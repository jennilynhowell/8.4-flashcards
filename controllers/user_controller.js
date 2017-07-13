const User = require('../models/user');
const helpers = require('./helpers')

module.exports = {
  createUser: (username, password) => {
    return User.create({username: username, password: helpers.createPasswordObject(password)}).then(user => {res.json(user)});
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
