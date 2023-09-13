import { Validator } from "flare-validator";
import Unique from "../rules/Unique";
import Exists from "../rules/Exists";
import BcryptCompare from "../rules/BcryptCompare";

const validator = Validator.getValidator()

validator.addRule({
  unique: Unique,
  exists: Exists,
  bcrypt_compare: BcryptCompare
})

export default validator