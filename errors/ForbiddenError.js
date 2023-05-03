const { HTTP_STATUS_FORBIDDEN } = require('../utils/handleErrors')

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
};