const { Joi } = require('celebrate');

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_DEFAULT = 500;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INCORRECT_EMAIL_PASSWORD = 401;
const ERROR_CODE_DUBLICATE = 409;
const ERROR_DEFAULT_MESSAGE = 'Произошла ошибка.';
const PORT = 3000;
const JWT_SECRET = 'SpartakChampion2024';
const USER_VALIDATION_OBJECT = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
const CARD_VALIDATION_OBJECT = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    createdAt: Joi.date(),
  }).unknown(true),
};

module.exports = {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_DEFAULT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INCORRECT_EMAIL_PASSWORD,
  ERROR_CODE_DUBLICATE,
  ERROR_DEFAULT_MESSAGE,
  PORT,
  JWT_SECRET,
  USER_VALIDATION_OBJECT,
  CARD_VALIDATION_OBJECT,
};
