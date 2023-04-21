export class AppError extends Error {
  private readonly _error: string;
  private readonly _statusCode: number;

  constructor(message: string, error: string, statusCode: number) {
    super(message);
    this._error = error;
    this._statusCode = statusCode;
  }

  public getResponse() {
    return {
      message: this.message,
      error: this._error,
      statusCode: this._statusCode,
    };
  }
}
