import { errors } from 'chaos-model'

// const { locales } = require('../config')
// eslint-disable-next-line import/no-dynamic-require
// const localization = require(`./locale.${locales}.json`)
const localization = require('./locale.zh-cn.json')

errors.update(localization)

errors.register({
  NotAuthorize: 400,
  NotAuthenticate: 400,
  ApiAuthKeyIsMissing: 400,
  InvalidVerifyCode: 400,
  InvalidMobileNumber: 400,
  InvalidEmail: 400,
  AccountExist: 400,
  NoFileFound: 400,
  SaveFileFailed: 400,
  FileSizeExtendLimit: 400,
  SuperAdmin: 400,
})

export { errors }
