import { BaseControllers } from './base'
import { Task } from '../models'

class TaskControllers extends BaseControllers {
  constructor() {
    super('task', Task)
  }
}

export const task = new TaskControllers()
