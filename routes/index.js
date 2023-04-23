const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const {
  handleErrors,
  NotFoundError,
} = require('../utils/handleErrors');

router
  .use('/users', userRoutes)
  .use('/cards', cardRoutes)
  .use('*', (req, res) => {
    const newError = new NotFoundError(); // скобки
    handleErrors(newError, res);
  });
module.exports = router;
