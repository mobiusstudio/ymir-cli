import Hashids from 'hashids'
import { errors } from '../errors'

export const validateEmail = (email) => {
  if (!email) throw new errors.EmailInvalidError()
  if (!/^[\d\w._+]+@[\d\w.-]+$/.test(email)) {
    throw new errors.EmailInvalidError()
  }
}

export const encode = (num) => {
  const { config } = global
  const hashids = new Hashids(config.secret.hash, 8)
  return hashids.encode(num)
}

export const decode = (hash) => {
  const { config } = global
  const hashids = new Hashids(config.secret.hash, 8)
  return hashids.decode(hash)[0]
}

export const queryString = params => Object.keys(params)
  .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`)
  .join('&')

export const decodeQueryString = str => str.split('&')
  .map(s => s.split('=').map(decodeURIComponent)).reduce((obj, arr) => {
    if (arr[1] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      obj[arr[0]] = arr[1] // eslint-disable-line no-param-reassign
    }
    return obj
  }, {})

// const iterateKeysObj = (obj, keyFunc) => {
//   if (!(obj instanceof Object)) return obj

//   if (obj instanceof Array) {
//     return obj.reduce((newArray, item) => {
//       newArray.push(iterateKeysObj(item, keyFunc))
//       return newArray
//     }, [])
//   }

//   return Object.keys(obj).reduce((newObj, key) => {
//     const newKey = keyFunc(key)
//     // eslint-disable-next-line no-param-reassign
//     newObj[newKey] = iterateKeysObj(obj[key], keyFunc)
//     return newObj
//   }, {})
// }

// const iterateKeys = (obj, keyFunc) => {
//   if (typeof (obj) === 'string') return keyFunc(obj)
//   return iterateKeysObj(obj, keyFunc)
// }

// export const underlineCase2camelCase = obj =>
//   iterateKeys(obj, (key) => {
//     let newKey = ''
//     let toUpperCase = false
//     for (let i = 0; i < key.length; i++) {
//       if (key[i] === '_') {
//         toUpperCase = true
//       } else {
//         newKey += toUpperCase ? key[i].toUpperCase() : key[i]
//         toUpperCase = false
//       }
//     }
//     return newKey
//   })

// export const camelCase2underlineCase = obj =>
//   iterateKeys(obj, (key) => {
//     let newKey = ''
//     for (let i = 0; i < key.length; i++) {
//       if (key[i] < 'a') {
//         if (newKey) newKey += '_'
//         newKey += `${key[i].toLowerCase()}`
//       } else {
//         newKey += key[i]
//       }
//     }
//     return newKey
//   })

export const readSwaggerParams = (req, fields) => fields.reduce((result, field) => {
  const newRes = result
  newRes[field] = req.swagger.param[field].value
  return newRes
}, {})

export const calculateIsFeatured = profile => profile.promotionScore > 2
