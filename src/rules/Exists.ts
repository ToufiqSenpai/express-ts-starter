import { RuleValidator, RuleValidatorContext } from "flare-validator";
import database from "../utils/database";
import { Prisma } from "@prisma/client";

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
    const result = await database.$queryRaw<[{ count: number }]>`SELECT COUNT(*) AS count FROM ${Prisma.raw(table)} WHERE ${Prisma.raw(column)} = ${this.context.getValue()}`

    return Boolean(result[0].count)
  }
}

export default Exists