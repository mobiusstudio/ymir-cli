export const assemblePath = (routes, basePath) => Object.keys(routes).reduce((paths, route) => {
  const newPaths = paths
  newPaths[`${basePath}${route === '' ? '' : `/${route}`}`] = routes[route]
  return newPaths
}, {})
