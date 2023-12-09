import {RuleValidator, RuleValidatorContext} from "flare-validator";

class ISODate implements RuleValidator {
  public context: RuleValidatorContext

  public isValid(): boolean | Promise<boolean> {
    return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/.test(this.context.getValue())
  }

  public message(): string {
    return `${this.context.getAttribute()} is not ISO 8601 format.`
  }
}

export default ISODate