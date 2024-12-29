export class InvalidDataError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 422;
    this.name = "InvalidDataError";
  }
}
