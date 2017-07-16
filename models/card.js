const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  category: String,
  showCard: {type: Boolean, default: false},
  showAnswer: {type: Boolean, default: false},
  cardArray: [{
    question: String,
    answer: String,
    response: [{
      date: {type: Date, default: Date.now()},
      correct: Boolean
    }]
  }]

});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
