import { RuleValidator, RuleValidatorContext } from "flare-validator"
import * as bcyrpt from 'bcrypt'

class BcryptCompare implements RuleValidator {
  public context: RuleValidatorContext

  private args: string[]

  public constructor(...args: string[]) {
    this.args = args
  }
  
  public message(): string {
    return 'Value is not valid'
  }

  public isValid(): boolean | Promise<boolean> {
    return bcyrpt.compareSync(this.context.getValue(), this.args[0])
  }
}

export default BcryptCompare