const { User } = require('../models/user');

const getUsers = (req, res) => {
  console.log('запрос на пользователя пошел!!!');
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = (req, res) => {
  console.log('запрос на создание пошел!!!');
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
