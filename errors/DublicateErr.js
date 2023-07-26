const { ERROR_CODE_DUBLICATE } = require('../utils/constants');

class DublicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DUBLICATE;
  }
}
module.exports = DublicateError;
