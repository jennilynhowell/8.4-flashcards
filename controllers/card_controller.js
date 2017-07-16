const Card = require('../models/card');

module.exports = {

  createCard: (req, res) => {
    let myCard = new Card(req.body).save().then(card => {
      if (card.err){
        res.render('collections', {message: 'Error'});
      } else {
        res.redirect('/user/collections');
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
    let category = req.body.category
      , userId = req.body.userId;
    Card.find({$and: [{userId: userId}, {category: category}]}).then(cards => {
      cards.forEach(card => {
        card.showCard = true;
        card.save();
        console.log(card, ' (after)');
      });

      res.redirect('/user/collections');
    });
  },

  patchCard: (req, res) => {
    let _id = req.params._id
      , question = req.body.question
      , answer = req.body.answer
      , category = req.body.category;

    Card.findOneAndUpdate({_id: _id}, {
      cardArray: {
        question: question,
        answer: answer,
        response: [true, Date.now()]
      },
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
      if (!card){
        res.status(500).json({message: 'Error'});
      } else {
        res.status(200).json({message: 'Success', data: card});
      };
    })
  },

  viewAnswer: (req, res) => {
    let _id = req.body._id;
    Card.findOneAndUpdate({_id: _id}, {$set: {showAnswer: true}}).then(card =>{
      console.log(card);
      console.log('ANSWER SHOULD BE VISIBLE');
      res.redirect('/user/collections');
    });
  }

//end exports
};
