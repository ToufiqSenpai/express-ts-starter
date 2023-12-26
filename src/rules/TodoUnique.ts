import { RuleValidator, RuleValidatorContext } from "flare-validator";
import Todo from "../models/Todo";
import moment from "moment";

class TodoUnique implements RuleValidator {
  public context: RuleValidatorContext

  public constructor(private userId: string) {}
  
  public message(): string {
    return 'Todo on this date is already exists.'
  }

  public async isValid(): Promise<boolean> {
    const date = moment.utc(this.context.getValue())

    if(!date.isValid()) return false

    const todo = await Todo.findOne({ createdAt: {
      $gte: date.startOf('day').toDate(),
      $lt: date.endOf('day').toDate()
    }, userId: this.userId})

    return !Boolean(todo)
  }
}

export default TodoUnique