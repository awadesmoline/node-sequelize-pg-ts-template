import { ApplicationError } from './ApplicationError';

export class UserFacingError extends ApplicationError {
  get statusCode(): number {
    return 400; // default status code
  }
}
