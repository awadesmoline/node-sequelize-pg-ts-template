import { UserFacingError } from './UserFacingError';

export class UnAuthorizedError extends UserFacingError {
  constructor(message: string, options = {}) {
    super(message);

    // You can attach relevant information to the error instance
    // (e.g.. the username)

    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get statusCode(): number {
    return 401;
  }
}
