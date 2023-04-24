const User = require('../models/user');

const {
  handleErrors,
  HTTP_STATUS_CREATED,
  /* throwNotFoundError, */
} = require('../utils/handleErrors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleErrors(err, res));
};

module.exports.getUserDataById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      if (!user) {
        return (handleErrors());
      }
      return res.status(200).send(user);
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUser = (req, res) => {
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
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
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
    .catch((err) => handleErrors(err, res));
};
