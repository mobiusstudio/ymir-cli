import url from 'url'

const routes = {}

export const add = (path) => {
  let newPath = path.toLowerCase()
  if (!newPath.startsWith('/')) {
    newPath = `/${newPath}`
  }
  routes[newPath] = true
}

export const has = (path) => {
  if (routes['*']) return true
  const pathname = (url.parse(path).pathname).toLowerCase()
  return routes[pathname] || false
}
