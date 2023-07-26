const { ERROR_CODE_INCORRECT_EMAIL_PASSWORD } = require('../utils/constants');

class IncorrectEmailPasswordError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_EMAIL_PASSWORD;
  }
}
module.exports = IncorrectEmailPasswordError;
