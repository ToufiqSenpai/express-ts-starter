import HttpStatus from "../enums/HttpStatus";
import StringUtil from "./StringUtil";

/**
 * Simple response body by response status
 * @param status HttpStatus
 * @param message string
 * @returns object
 */
function responseStatus(status: HttpStatus, message?: string) {
  return { 
    status: status, 
    message: message ? message : StringUtil.toTitleCase(HttpStatus[status].replaceAll('_', ' ')) 
  }
}

export default responseStatus