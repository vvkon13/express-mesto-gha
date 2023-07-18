const jwt = require('jsonwebtoken');
const { ERROR_CODE_INCORRECT_EMAIL_PASSWORD, JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(ERROR_CODE_INCORRECT_EMAIL_PASSWORD).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_CODE_INCORRECT_EMAIL_PASSWORD).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
  return undefined;
};
