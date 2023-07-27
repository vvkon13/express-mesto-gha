const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const IncorrectEmailPasswordError = require('../errors/IncorrectEmailPasswordErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const e = new IncorrectEmailPasswordError('Неправильные почта или пароль');
    next(e);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const e = new IncorrectEmailPasswordError('Неправильные почта или пароль');
    next(e);
  }
  req.user = payload;
  next();
};
