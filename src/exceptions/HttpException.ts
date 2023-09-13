import HttpStatus from "../enums/HttpStatus";

class HttpException extends Error {
  private httpStatus: HttpStatus

  private errors: object

  public constructor(status: HttpStatus, message: string, errors?: object) {
    super(message)

    this.httpStatus = status
    this.errors = errors
  }

  public getHttpStatus(): HttpStatus {
    return this.httpStatus
  }

  public getErrors(): object {
    return this.errors
  }
}

export default HttpException