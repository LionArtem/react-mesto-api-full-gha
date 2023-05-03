const { ERROR__REPEATS_EMAIL } = require('../utils/constants');

class RepeatsEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR__REPEATS_EMAIL;
  }
}

module.exports = RepeatsEmailError;
