/* const { HTTP_STATUS_NOT_FOUND } = require('../utils/handleErrors') */

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};