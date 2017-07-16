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
    let _id = req.params.id
      , category = req.body.category;
    Card.findOneAndRemove({_id: _id}).then(() => {
      res.redirect('/user/quiz/' + category)
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
      });
      res.redirect('/user/quiz/' + category);
    });
  },

  patchCard: (req, res) => {
    let _id = req.params.id
      , question = req.body.question
      , answer = req.body.answer
      , currentCategory = req.body.category
      , newCategory = req.body.newCategory;

    Card.findOneAndUpdate({_id: _id}, {
      question: question,
      answer: answer,
      category: newCategory
    }).then(() => {
      res.redirect('/user/quiz/' + currentCategory);
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
    let _id = req.body.id
      , category = req.body.category;
    console.log(req.body.id);
    Card.findById(_id).then(card =>{
      card.showAnswer = true;
      card.save();

      res.redirect('/user/quiz/' + category);
    });
  },

  logGuess: (req, res) => {
    let _id = req.body.id
      , category = req.body.category
      , correct = req.body.correct;
    Card.findById(_id).then(card =>{
      card.guesses.push({
        date: Date.now(),
        correct: correct
      })
      card.save();
      res.redirect('/user/quiz/' + category);
    });
  }

//end exports
};
