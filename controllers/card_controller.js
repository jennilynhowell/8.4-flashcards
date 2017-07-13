const Card = require('../models/card');

module.exports = {

  createCard: (req, res) => {
    let myCard = new Card(req.body).save().then(card => {
      if (card.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(201).json({message: 'Success', data: card});
      };
    });
  },

  deleteCard: (req, res) => {
    let userId = req.params.userId;
    Card.remove({userId: userId}).then(card => {
      if (card.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success'});
      };
    });
  }

//end exports
};
