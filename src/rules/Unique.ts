import { RuleValidator, RuleValidatorContext } from "flare-validator";
import database from "../utils/database";

class Unique implements RuleValidator {
  public context: RuleValidatorContext

  private args: string[]

  public constructor(...args: string[]) {
    this.args = args
  }

  public message(): string {
    return ':attribute is already exist.'
  }

  public async isValid(): Promise<boolean> {
    const [table, column, ignoreColumn, ignoreValue] = this.args

    return true
  }
  
}

export default Unique