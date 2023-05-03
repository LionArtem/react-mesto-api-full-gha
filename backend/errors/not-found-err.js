const { ERROR__NOT__FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR__NOT__FOUND;
  }
}

module.exports = NotFoundError;
