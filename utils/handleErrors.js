const mongoose = require('mongoose');

const { CastError, ValidationError, DocumentNotFoundError } = mongoose.Error;

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const HTTP_STATUS_CREATED = 201;

/* class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
} */

function handleErrors(err, res) {
  if (err instanceof DocumentNotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Данные не найдены' });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Поле заполнено некорректно' });
  }
  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
}

/* function throwNotFoundError() {
  throw new NotFoundError();
}
function throwError() {
  throw new Error();
} */

module.exports = {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_CREATED,
  handleErrors,
  /* throwNotFoundError,
  throwError, */
 /*  NotFoundError, */
};
