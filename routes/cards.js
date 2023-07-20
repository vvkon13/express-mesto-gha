const router = require('express').Router();

const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CARD_VALIDATION_OBJECT } = require('../utils/constants');

router.get('/', getCards);
router.post('/', celebrate(CARD_VALIDATION_OBJECT), createCard);
router.delete('/:cardId', celebrate(CARD_VALIDATION_OBJECT), deleteCard);
router.put('/:cardId/likes', celebrate(CARD_VALIDATION_OBJECT), likeCard);
router.delete('/:cardId/likes', celebrate(CARD_VALIDATION_OBJECT), dislikeCard);

module.exports = router;
