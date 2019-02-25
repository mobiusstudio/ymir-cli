/* eslint-disable operator-linebreak */
export const template = {}

template.path =
`import { #BaseRoutes#, assemblePath, addTag } from '../../../swagger'

class #ClassName# extends #BaseRoutes# {
  constructor() {
    super(#superCode#)
  }
}

const routes = new #ClassName#()

const basePath = '/#basePath#'

addTag({
  name: '#Tag#',
})

export const pth = assemblePath(routes, basePath)
`
