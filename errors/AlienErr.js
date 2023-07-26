const { ERROR_CODE_ALIEN } = require('../utils/constants');

class AlienError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_ALIEN;
  }
}
module.exports = AlienError;
