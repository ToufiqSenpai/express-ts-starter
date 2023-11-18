import { Validator } from "flare-validator";
import Unique from "../rules/Unique";
import Exists from "../rules/Exists";
import BcryptCompare from "../rules/BcryptCompare";

async function validator(data: any, rules: Record<string, string>, messages?: Record<string, string>, attributes?: Record<string, string>) {
  return await Validator.validate(data, rules, messages, rules, {
    unique: Unique,
    exists: Exists,
    bcrypt_compare: BcryptCompare
  })
}