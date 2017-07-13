const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  question: String,
  answer: String,
  category: String
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
