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
    let query = `SELECT COUNT(*) as count FROM ${table} WHERE ${column} = '${this.context.getValue()}'`

    if(ignoreColumn && ignoreValue) {
      query += ` AND ${ignoreColumn} <> '${ignoreValue}'`
    }

    const result = await database.$queryRawUnsafe<{ count: number }[]>(query)

    return !Boolean(result[0].count)
  }
  
}

export default Unique