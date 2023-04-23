const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    required: [true, 'Не заполнено обязательное поле'],
    type: String,
    minlength: [2, 'Минимальная длина - два символа'],
    maxlength: [30, 'Максиимальная длина - тридцать символов'],
  },
  link: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
