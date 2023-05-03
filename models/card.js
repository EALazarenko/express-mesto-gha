const mongoose = require('mongoose');

const { URL_REGEXP } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
    minlength: [2, 'Минимальная длина - два символа'],
    maxlength: [30, 'Максиимальная длина - тридцать символов'],
  },
  link: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
    validate: {
      validator: (url) => URL_REGEXP.test(url),
      message: 'Некорректная ссылка',
    },
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
