const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, cardByIdValidation } = require('../middlewares/validations');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', cardByIdValidation, deleteCard);
router.put('/:cardId/likes', cardByIdValidation, likeCard);
router.delete('/:cardId/likes', cardByIdValidation, dislikeCard);

module.exports = router;
