const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  handleErrors,
  HTTP_STATUS_CREATED,
} = require('../utils/handleErrors');

const { JWT_SECRET } = require('../utils/constants'); //различие,  еще в создании пользователя нет проверки на равенство 1000
const ConflictError = require('../errors/ConflictError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' }
        );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Вы авторизованы' });
      console.log(token);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserDataById = (req, res, next) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
    console.log(_id);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
  .then((hash) =>
  User.create({ name, about, avatar, email, password: hash }))
  .then((user) => {
    const data = user.toObject();
    delete data.password;
    res.send(data);
  })
  .catch((err) => {
    if (err.code === 11000) {
      next(new ConflictError());
    }
    next();
  });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((userAvatar) => res.send({ data: userAvatar }))
    .catch(next);
};
