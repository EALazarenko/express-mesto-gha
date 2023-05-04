const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');
const {
  HTTP_STATUS_CREATED,
} = require('../utils/handleErrors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      'owner',
      'likes',
    ])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
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
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};
