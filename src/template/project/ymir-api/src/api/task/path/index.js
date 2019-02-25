import { BaseRoutes, assemblePath, addTag } from '../../../swagger'

class TaskRoutes extends BaseRoutes {
  constructor() {
    super('task')
  }
}

const routes = new TaskRoutes()

const basePath = '/task'

addTag({
  name: 'Task',
})

export const pth = assemblePath(routes, basePath)
