import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import swaggerTools from 'swagger-tools'
import log4js from 'log4js'
import { snakeCase } from 'lodash'
import { connect } from 'chaos-model'

import { register } from './api'
import { swagger } from './swagger'
import { controllers } from './controllers'
import { config } from './config'
import { errors } from './errors'
import { apiKeyAuth } from './authorization'

register()
global.config = config

const instance = process.env.NODE_APP_INSTANCE

const isDevelopment = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

log4js.configure({
  appenders: {
    out: { type: 'stdout', level: 'trace' },
    logFile: {
      type: 'dateFile', filename: 'logs/api', pattern: 'yyyyMMdd.log', alwaysIncludePattern: true, level: 'trace',
    },
  },
  categories: {
    default: { appenders: ['logFile', 'out'], level: 'trace' },
  },
})
const logger = log4js.getLogger()
global.logger = logger

const server = async () => {
  if (!isDevelopment) {
    logger.level = 'INFO'
  }

  let { port } = config.server
  if (instance) port += instance

  swagger.host = config.swagger.host
  swagger.schemes = config.swagger.schemes

  // create/update db version
  await connect(config.database)
  logger.info('database connected')

  const app = express()

  const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth-Key'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(fileUpload({ limits: { fileSize: 500 * 1024 * 1024 } }))

  const apiRouter = express.Router()

  if (isDevelopment) {
    const logMiddleware = log4js.connectLogger(
      logger,
      { level: 'auto', format: ':method :url :status :response-timems' },
    )
    apiRouter.use(/^((?!notification|message).)*$/, logMiddleware)
  }

  // simulate delay for development env
  // app.use((req, res, next) => {
  //   setTimeout(next, 1000)
  // })

  swaggerTools.initializeMiddleware(swagger, (middleware) => {
    app.use(middleware.swaggerUi())
    apiRouter.use(middleware.swaggerMetadata())
    apiRouter.use(middleware.swaggerSecurity({
      apiKeyAuth,
    }))

    const options = {
      controllers,
      useStubs: isDevelopment, // Conditionally turn on stubs (mock mode)
      ignoreMissingHandlers: isDevelopment,
    }

    // Route validated requests to appropriate controller
    apiRouter.use(middleware.swaggerRouter(options))

    apiRouter.use((req, res, next) => {
      if (req.xhr) {
        res.header('Cache-Control', 'max-age=0, private, must-revalidate')
        res.header('Pragma', 'no-cache')
        res.header('Expires')
      }
      next()
    })

    // error handling
    apiRouter.use((err, req, res, next) => {
      if (!err.statusCode && !err.failedValidation) {
        logger.error(err)
      }
      let error = {}
      let statusCode = 500
      if (typeof err === 'string') {
        const e = new errors.InternalError()
        error.code = snakeCase(e.name).toUpperCase()
        error.message = `${errors.lang(e)} (${err})` || e.name
      } else if (err.failedValidation) {
        statusCode = 400
        error = err
      } else if (err.name) {
        error.code = snakeCase(err.name).toUpperCase()
        error.message = errors.lang(err) || err.name
        statusCode = err.statusCode || statusCode
      } else {
        error.code = err.code
        error.message = err.message
        statusCode = err.statusCode || statusCode
      }
      res.status(statusCode).send({ error })
      next()
    })
  })

  // app.use('/docs', express.static('node_modules/swagger-ui/dist'))
  app.use('/files', express.static('files'))

  app.get('/api-docs', (req, res) => {
    res.json(swagger)
  })

  app.use('/', apiRouter)

  if (isTest) return app

  return app.listen(port, () => {
    logger.info(`server [${config.name}] running on port: ${port}`)
  })
}

export default () => server().catch((err) => {
  logger.error(err)
  throw err
})
