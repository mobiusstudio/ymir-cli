/* eslint-disable operator-linebreak */
export const template = {}

template.path =
`import { BaseRoutes, assemblePath, addTag } from '../../../swagger'

class #TableRoutes# extends BaseRoutes {
  constructor() {
    super('#tableName#')
  }
}

const routes = new #TableRoutes#()

const basePath = '/#tableName#'

addTag({
  name: '#TableName#',
})

export const pth = assemblePath(routes, basePath)
`
