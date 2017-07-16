const Card = require('../models/card');


module.exports = {

  createCard: (req, res) => {
    let question1 = req.body.question1
      , question2 = req.body.question2
      , question3 = req.body.question3
      , answer1 = req.body.answer1
      , answer2 = req.body.answer2
      , answer3 = req.body.answer3
      , newCategory = req.body.newCategory
      , userId = req.body.userId;

    let newCard1 = new Card({
      userId: userId,
      category: newCategory,
      question: question1,
      answer: answer1
    });

    let newCard2 = new Card({
      userId: userId,
      category: newCategory,
      question: question2,
      answer: answer2
    });

    let newCard3 = new Card({
      userId: userId,
      category: newCategory,
      question: question3,
      answer: answer3
    });

    Card.insertMany([newCard1, newCard2, newCard3]).then(() => {
      res.redirect('/user/collections');
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
    let _id = req.body.id
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
    Card.findById(_id).then(card =>{
      card.showAnswer = true;
      card.save();

      res.redirect('/user/quiz/' + category);
    });
  },

  logGuess: (req, res) => {
    let _id = req.body.id
      , category = req.body.category
      , correct = req.body.correct
      , guessDate = Date.now();
    Card.findById(_id).then(card =>{
      card.guesses.push({
        date: guessDate,
        correct: correct,
      })
      card.save();
      res.redirect('/user/quiz/' + category);
    });
  }

//end exports
};
