const { User } = require('../models/user');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_DEFAULT, ERROR_CODE_NOT_FOUND, ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанном ID не найден.' });
      }
    })
    .catch((err) => next(err));
};

const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const errorHandlerUsers = (err, req, res, next) => {
  console.log(err.name);
  if (res.headersSent) {
    next(err);
  } else {
    switch (err.name) {
      case 'CastError':
        console.log('hi');
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Пользователь с указанным ID не найден.' });
        break;
      case 'SyntaxError':
        console.log('hi');
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Синтаксическая ошибка в запросе.' });
        break;
      case 'ValidationError':
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Даные пользователя не прошли валидацию.' });
        break;
      default:
        res.status(ERROR_CODE_DEFAULT).send(ERROR_DEFAULT_MESSAGE);
        break;
    }
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  patchUser,
  errorHandlerUsers,
};
