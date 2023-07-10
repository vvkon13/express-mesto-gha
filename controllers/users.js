const { User } = require('../models/user');
const {
  ERROR_CODE_VALIDATION, ERROR_CODE_DEFAULT, ERROR_CODE_NOT_FOUND, ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch(next);
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
    .catch(next);
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
    switch (err.name) {
      case 'CastError':
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные пользователя.' });
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
