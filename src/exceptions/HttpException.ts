import HttpStatus from "../enums/HttpStatus";
import responseStatus from "../utils/responseStatus";

class HttpException extends Error {
  private httpStatus: HttpStatus

  private errors: object

  public constructor(status: HttpStatus, message?: string, errors?: object) {
    const resMessage = responseStatus(status, message)
    super(resMessage.message)

    this.httpStatus = resMessage.status
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