const { Joi } = require('celebrate');

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_DEFAULT = 500;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_ALIEN = 403;
const ERROR_CODE_INCORRECT_EMAIL_PASSWORD = 401;
const ERROR_CODE_DUBLICATE = 409;
const ERROR_DEFAULT_MESSAGE = 'Произошла ошибка.';
const PORT = 3000;
const JWT_SECRET = 'SpartakChampion2024';
const REG_EX_URL = /^https?:\/\/[\w-\.~:/\?#\[\]@!\$&'\(\)\*\+,;=]+$/;
const USER_VALIDATION_OBJECT = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EX_URL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
const CARD_VALIDATION_OBJECT = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REG_EX_URL),
    createdAt: Joi.date(),
  }).unknown(true),
};
const USER_VALIDATION_OBJECT_NOT_REQUIRED = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EX_URL),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

module.exports = {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_DEFAULT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INCORRECT_EMAIL_PASSWORD,
  ERROR_CODE_DUBLICATE,
  ERROR_DEFAULT_MESSAGE,
  ERROR_CODE_ALIEN,
  PORT,
  JWT_SECRET,
  USER_VALIDATION_OBJECT,
  USER_VALIDATION_OBJECT_NOT_REQUIRED,
  CARD_VALIDATION_OBJECT,
  REG_EX_URL,
};
