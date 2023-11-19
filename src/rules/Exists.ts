import { RuleValidator, RuleValidatorContext } from "flare-validator";
import { model } from 'mongoose'

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
    const [modelName, prop] = this.args

    return Boolean(await model(modelName).findOne({ [prop]: this.context.getValue() }))
  }
}

export default Exists