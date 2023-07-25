const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CARD_VALIDATION_OBJECT } = require('../utils/constants');

router.get('/', getCards);

router.post('/', celebrate(CARD_VALIDATION_OBJECT), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
