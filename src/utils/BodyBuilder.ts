import HttpStatus from "../enums/HttpStatus";
import StringUtil from "./StringUtil";

class BodyBuilder {
  [x: string | number]: unknown

  public constructor(status: HttpStatus, message?: string) {
    this.status = status
    this.message = message || StringUtil.toTitleCase(HttpStatus[status].replace('_', ' '))
  }

  public addProperty(name: string, value: any): BodyBuilder {
    this[name] = value
    return this
  }
}

export default BodyBuilder