const { ERROR__INCORRECT } = require('../utils/constants');

class IncorrectErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR__INCORRECT;
  }
}

module.exports = IncorrectErr;
