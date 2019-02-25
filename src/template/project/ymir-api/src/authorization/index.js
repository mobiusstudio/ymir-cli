import jwt from 'jsonwebtoken'
import { errors } from 'chaos-model'

errors.register({
  ApiAuthKeyIsMissing: 401,
  InvalidAuthKey: 401,
})

export const apiKeyAuth = (req, definition, apiKey, cb) => {
  if (!apiKey) {
    cb(new errors.ApiAuthKeyIsMissingError())
    return
  }

  const { config } = global
  try {
    const token = apiKey.substr(7)
    const credentials = jwt.verify(token, config.secret.jwt)
    req.trailers.credentials = credentials
    cb()
  } catch (err) {
    cb(new errors.InvalidAuthKeyError())
  }
}

export const getToken = (id, role) => {
  const { config } = global
  jwt.sign({ id, role }, config.secret.jwt, config.jwtOptions)
}


export const getTenantId = (req) => {
  if (req.trailers.credentials && req.trailers.credentials.tenantId) {
    return req.trailers.credentials.tenantId
  }
  throw new errors.InvalidAuthKeyError()
}
