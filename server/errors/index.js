class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

class Unauthorized extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}

class Forbidden extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}

class Conflict extends CustomError {
  constructor(message) {
    super(message, 409);
  }
}

class RateError extends CustomError {
  constructor(message) {
    super(message, 429);
  }
}

module.exports = {
  CustomError,
  NotFound,
  Unauthorized,
  BadRequest,
  Forbidden,
  RateError,
  Conflict,
};
