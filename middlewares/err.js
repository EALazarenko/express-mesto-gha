/* const mongoose = require('mongoose'); */

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;


/* const { CastError, ValidationError, DocumentNotFoundError } = mongoose.Error;

const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');

const { HTTP_STATUS_CONFLICT,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED } = require('../utils/handleErrors');

module.exports = (err, req, res, next) => {
  switch (true) {
    case err instanceof ValidationError:
      return res.status(HTTP_STATUS_BAD_REQUEST).send({
        message: `Введены некорректные двнные: ${Object.values(err.errors)
          .map((e) => e.message).join(", ")}`,
      });
    case err instanceof DocumentNotFoundError:
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: "Запрашиваемый документ не найден" });
    case err instanceof CastError:
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: "Некорректный Id" });
    case err instanceof ConflictError:
      return res.status(HTTP_STATUS_CONFLICT).send({ message: err.message });
    case err instanceof ForbiddenError:
      return res.status(HTTP_STATUS_FORBIDDEN).send({ message: err.message });
    case err instanceof AuthError:
      return res.status(HTTP_STATUS_UNAUTHORIZED).send({ message: err.message });
    case err instanceof NotFoundError:
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: err.message });
    default: res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: `Что-то пошло не так... ${err.name}: ${err.message}` });
  }
  return next();
}; */