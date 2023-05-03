const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');
const {
  HTTP_STATUS_CREATED,
  handleErrors,
} = require('../utils/handleErrors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      'owner',
      'likes',
    ])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;

  Card.findByIdAndDelete({ _id })
    .orFail()
    .then((card) => {
      if ((card.owner).toString() === req.user._id) {
        Card.deleteOne(card._id)
          .orFail()
          .then(res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};
