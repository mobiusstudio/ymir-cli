import isPromise from 'is-promise'

import { task } from './task'

const ctrs = {
  ...task,
}

export const controllers = Object.keys(ctrs).reduce((syncControllers, operationId) => {
  const newSC = syncControllers
  newSC[operationId] = (req, res, next) => {
    const result = ctrs[operationId](req, res, next)
    if (isPromise(result)) {
      return result.catch(next)
    }
    return result
  }
  return newSC
}, {})
