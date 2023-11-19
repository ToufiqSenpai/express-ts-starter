import { Validator } from "flare-validator";
import { RulesProp } from "flare-validator/dist/cjs/types/ValidatorType";
import BcryptCompare from "../rules/BcryptCompare";
import Exists from "../rules/Exists";
import Unique from "../rules/Unique";

Validator.setRuleValidator('unique', Unique)
Validator.setRuleValidator('exists', Exists)
Validator.setRuleValidator('bcrypt_compare', BcryptCompare)

async function validator(data: any, rules: Record<string, RulesProp>, messages?: Record<string, string>, attributes?: Record<string, string>) {
  return await Validator.validate(data, rules, messages, attributes)
}

export default validator