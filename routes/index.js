const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');
const { signin, signup } = require('../middlewares/validations');

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router
  .use('/users', auth, userRoutes)
  .use('/cards', auth, cardRoutes)
  .use('*', auth, (req, res, next) => {
    next(new NotFoundError('Страница не найдена'));
  });

module.exports = router;
