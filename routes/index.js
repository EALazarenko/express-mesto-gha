const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const {
  /* handleErrors, */
  /* NotFoundError, */
  HTTP_STATUS_NOT_FOUND
} = require('../utils/handleErrors');

router
  .use('/users', userRoutes)
  .use('/cards', cardRoutes)
  .use('*', (req, res) => {
    /* const newError = new NotFoundError(); // скобки
    handleErrors(newError, res); */
    res.status(HTTP_STATUS_NOT_FOUND).send({ message: "Страница не найдена" });
  });
module.exports = router;
