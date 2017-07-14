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
    let _id = req.params.id;
    Card.remove({_id: _id}).then(card => {
      if (card.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success'});
      };
    });
  },

  viewCards: (req, res) => {
    Card.find().then(cards => {
      if (cards.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success', data: cards});
      };
    });
  },

  viewCardsByCategory: (req, res) => {
    let category = req.body.category;
    Card.find({category: category}).then(cards => {
      if (cards.err){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success', data: cards});
      };
    });
  },

  patchCard: (req, res) => {
    let _id = req.params._id
      , question = req.body.question
      , answer = req.body.answer
      , category = req.body.category;

    Card.findOneAndUpdate({_id: _id}, {
      question: question,
      answer: answer,
      category: category
    }).then((error, card) => {
      if (error){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success', data: card});
      };
    });
  },

  viewOneCard: (req, res) => {
    let _id = req.params.id;
    Card.findById(_id).then(card => {
      console.log(card);
      if (!card){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success', data: card});
      };
    })
  }

//end exports
};
