const { ERROR__AUTHORIZATION } = require('../utils/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR__AUTHORIZATION;
  }
}

module.exports = AuthorizationError;
