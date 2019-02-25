import { BaseDefinitions } from '../../../swagger'
import { isCompleted, title, content, deadline } from './properties'

const requestBody = {
  isCompleted,
  title,
  content,
  deadline,
}

class TaskDefinitions extends BaseDefinitions {
  constructor() {
    super('task', requestBody)
  }
}

export const def = new TaskDefinitions()
