const { HTTP_STATUS_UNAUTHORIZED } = require('../utils/handleErrors')

module.exports = class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
};