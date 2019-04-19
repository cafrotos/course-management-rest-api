const HttpErrors = require('http-errors');

class CreateError extends HttpErrors {
  constructor(...args) {
    super(args[0], args[1]);
    this.failures = args[2];
  }
}

module.exports = CreateError;