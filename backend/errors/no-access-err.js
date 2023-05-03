const { ERROR__NO_ACCESS } = require('../utils/constants');

class NoAccessErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR__NO_ACCESS;
  }
}

module.exports = NoAccessErr;
