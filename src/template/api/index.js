/* eslint-disable operator-linebreak */
import { template as path } from './path.template'
import { template as definitions } from './definitions.template'
import { template as controllers } from './controllers.template'

export const template = {
  ...path,
  ...definitions,
  ...controllers,
}

template.apiIndex =
`import { pth } from './path'
import { def } from './definitions'

export default {
  pth,
  def,
}
`

template.swaggerIndex =
`import { addPaths, addDefinitions } from '../swagger'

#importCode#

const api = {
#objCode#
}

export const register = () => {
  Object.values(api).forEach((i) => {
    addPaths(i.pth)
    addDefinitions(i.def)
  })
}
`

template.controllerIndex =
`import isPromise from 'is-promise'

#importCode#

const ctrs = {
#objCode#
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
`
