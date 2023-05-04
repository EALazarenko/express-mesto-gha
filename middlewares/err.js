const mongoose = require('mongoose');

const { AuthError } = require('../errors/AuthError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { HTTP_STATUS_CONFLICT, HTTP_STATUS_NOT_FOUND } = require('../utils/handleErrors');

module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(HTTP_STATUS_CONFLICT).send({ message: 'Пользователь с таким email уже существует' });
  }
  if (err instanceof AuthError || err instanceof NotFoundError || err instanceof ForbiddenError) {
    const { message } = err;

    return res.status(err.statusCode).send( message );
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Данные не найдены' });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Поле заполнено некорректно' });
  }
  /* return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' }); */
  return(next);
}