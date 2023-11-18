import { RuleValidator, RuleValidatorContext } from "flare-validator";
import database from "../utils/database";

class Exists implements RuleValidator {
  public context: RuleValidatorContext
  
  private args: string[]

  public constructor(...args: string[]) {
    this.args = args
  }
  
  public message(): string {
    return ':attribute is not available.'
  }
  
  public async isValid(): Promise<boolean> {
    const [table, column] = this.args
    // Query to database is the value is exist in database 
    // If the result greater than 0, return true

    return true
  }
}

export default Exists