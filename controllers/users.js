const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  handleErrors,
  HTTP_STATUS_CREATED,
} = require('../utils/handleErrors');

const { JWT_SECRET } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

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
   User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictError(`Пользователь с ${email} уже существует.`));
    }

    return bcrypt.hash(req.body.password, 10);
  })
  .then((hash) =>
  User.create({ name, about, avatar, email, password: hash }))
  .then((user) => {
    const data = user.toObject();
    delete data.password;
    res.send(data);
  })
  .catch(next);
};

/* module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

   User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictError(`Пользователь с ${email} уже существует.`));
    }

    return bcrypt.hash(password, 10);
  })
    .then((hash) => User.create({
      email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch(next);
}; */

/* module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
}; */

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      return next(new NotFoundError('Пользователь не найден.'));
    }

    // возвращаем пользователя, если он есть
    return res.status(200).send(user);
  }).catch(next);
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
