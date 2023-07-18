const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_DEFAULT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DUBLICATE,
  ERROR_CODE_INCORRECT_EMAIL_PASSWORD,
  ERROR_DEFAULT_MESSAGE,
  JWT_SECRET,
} = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password, _id } = req.body;
  if (!validator.isEmail(email)) return res.status(ERROR_CODE_INCORRECT_EMAIL_PASSWORD).send({ message: 'Неправильные почта или пароль' });
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return res.status(ERROR_CODE_INCORRECT_EMAIL_PASSWORD).send({ message: 'Неправильные почта или пароль' });
      return bcrypt.compare(password, user.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) return res.status(ERROR_CODE_INCORRECT_EMAIL_PASSWORD).send({ message: 'Неправильные почта или пароль' });
      return res.status(200).send(jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' }));
    })
    .catch(next);
  return undefined;
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    bcrypt.hash(password, 10)
      .then((hash) => {
        req.body.password = hash;
        User.create(req.body)
          .then((user) => res.send(user))
          .catch(next);
      })
      .catch(next);
  } else {
    res.status(ERROR_CODE_VALIDATION).send({ message: 'Передан некорректный email' });
  }
};

const findUserById = (userId, res, next) => {
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанном ID не найден.' });
      }
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  findUserById(userId, res, next);
};

const getUserMe = (req, res, next) => {
  findUserById(req.user, res, next);
};

const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};

const errorHandlerUsers = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    if (err.code === 1100) {
      return res.status(ERROR_CODE_DUBLICATE).send({ message: 'Неправильные почта или пароль' });
    }
    switch (err.name) {
      case 'CastError':
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные пользователя.' });
      case 'ValidationError':
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Даные пользователя не прошли валидацию.' });
      default:
        return res.status(ERROR_CODE_DEFAULT).send(ERROR_DEFAULT_MESSAGE);
    }
  }
  return undefined;
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  getUserMe,
  patchUser,
  errorHandlerUsers,
  login,
};
