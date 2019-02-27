import { assemblePath } from '../utils'

const basePath = ''

const routes = {
}

export const paths = assemblePath(routes, basePath)

export const addPaths = (data) => {
  Object.keys(data).forEach((key) => {
    if (Object.keys(paths).includes(key)) throw new Error(`Duplicate path: ${key}`)
    else paths[key] = data[key]
  })
}
