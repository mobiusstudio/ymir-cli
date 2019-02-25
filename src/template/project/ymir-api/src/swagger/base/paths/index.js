import { assemblePath } from '../utils'
import { test } from './test'

const basePath = ''

const routes = {
  test,
}

export const paths = assemblePath(routes, basePath)

export const addPaths = (data) => {
  Object.keys(data).forEach((key) => {
    if (Object.keys(paths).includes(key)) throw new Error(`Duplicate path: ${key}`)
    else paths[key] = data[key]
  })
}
