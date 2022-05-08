export class ApplicationError extends Error {
  get name(): string {
    return this.constructor.name;
  }
}
