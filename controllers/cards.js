const Card = require('../models/card');
const {
  SUCCESS_CREATING_RESOURCE_CODE,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationErr');
const AlienError = require('../errors/AlienErr');
const NotFoundError = require('../errors/NotFoundErr');

const errorHandlerCards = (err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return new ValidationError('Данные карточки не прошли валидацию.');
  }
  return err;
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      next(errorHandlerCards(err));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const likes = [];
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(SUCCESS_CREATING_RESOURCE_CODE).send(card))
    .catch((err) => {
      next(errorHandlerCards(err));
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() !== req.user._id) {
          throw new AlienError('Отсутствуют права на удаление карточки.');
        }
        return Card.deleteOne(card)
          .then((element) => res.send(element))
          .catch((err) => {
            next(errorHandlerCards(err));
          });
      }
      throw new NotFoundError('Карточка с указанным ID не найдена.');
    })
    .catch((err) => {
      next(errorHandlerCards(err));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка с указанным ID не найдена.');
      }
    })
    .catch((err) => {
      next(errorHandlerCards(err));
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка с указанным ID не найдена.');
      }
    })
    .catch((err) => {
      next(errorHandlerCards(err));
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  errorHandlerCards,
};
