import { addPaths, addDefinitions } from '../swagger'

import task from './task'

const api = {
  task,
}

export const register = () => {
  Object.values(api).forEach((i) => {
    addPaths(i.pth)
    addDefinitions(i.def)
  })
}
