const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const IncorrectEmailPasswordError = require('../errors/IncorrectEmailPasswordErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new IncorrectEmailPasswordError('Неправильные почта или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new IncorrectEmailPasswordError('Неправильные почта или пароль'));
  }
  req.user = payload;
  next();
};
