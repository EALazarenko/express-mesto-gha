const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');
const { signin, signup } = require('../middlewares/validations');
/* const handleErrors = require('../utils/handleErrors'); */

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router
  /* .use(auth) */
  .use('/users',  userRoutes)
  .use('/cards', /* auth */ cardRoutes)
  .use('*', (req, res, next) => {
    next(new NotFoundError('Страница не найдена'));
  });

module.exports = router;
