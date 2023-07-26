const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {
  SUCCESS_CREATING_RESOURCE_CODE,
  JWT_SECRET,
} = require('../utils/constants');
const IncorrectEmailPasswordError = require('../errors/IncorrectEmailPasswordErr');
const NotFoundError = require('../errors/NotFoundErr');
const DublicateError = require('../errors/DublicateErr');
const ValidationError = require('../errors/ValidationErr');

const errorHandlerUsers = (err) => {
  if (err.code === 11000) {
    return new DublicateError('Неправильные почта или пароль');
  }
  if (err.name === 'CastError' || err.name === 'ValidationError' || err.name === 'Error') {
    return new ValidationError('Даные пользователя не прошли валидацию.');
  }
  return err;
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let _id;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new IncorrectEmailPasswordError('Неправильные почта или пароль');
      }
      _id = user._id;
      bcrypt.compare(password, user.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        throw new IncorrectEmailPasswordError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(errorHandlerUsers(err));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(errorHandlerUsers(err));
    });
};

const createUser = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      req.body.password = hash;
      User.create(req.body)
        .then((user) => res.status(SUCCESS_CREATING_RESOURCE_CODE)
          .send({ ...user._doc, password: undefined }))
        .catch((err) => {
          next(errorHandlerUsers(err));
        });
    })
    .catch((err) => {
      next(errorHandlerUsers(err));
    });
};

const findUserById = (userId, res, next) => {
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь по указанном ID не найден.');
      }
    })
    .catch((err) => {
      next(errorHandlerUsers(err));
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  findUserById(userId, res, next);
};

const getUserMe = (req, res, next) => {
  findUserById(req.user._id, res, next);
};

const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(errorHandlerUsers(err));
    });
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
