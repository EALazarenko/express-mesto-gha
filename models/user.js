const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
    minlength: [2, 'Минимальная длина - два символа'],
    maxlength: [30, 'Максиимальная длина - тридцать символов'],
  },
  about: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
    minlength: [2, 'Минимальная длина - два символа'],
    maxlength: [30, 'Максиимальная длина - тридцать символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Не заполнено обязательное поле'],
  },
});

module.exports = mongoose.model('user', userSchema);
