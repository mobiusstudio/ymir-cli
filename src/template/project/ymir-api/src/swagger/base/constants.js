import { snakeCase } from 'lodash'
import { errors } from '../../errors'

// const type2formats = {
//   integer: ['int32', 'int64'],
//   number: ['float', 'double'],
//   string: ['byte', 'binary', 'date', 'date-time', 'password'],
//   boolean: [],
//   object: [],
//   array: [],
//   file: [],
// }

// function buildName2NameMap(arr) {
//   return arr.reduce((map, name) => {
//     let keyName = ''
//     const newMap = map
//     for (let i = 0; i < name.length; i += 1) {
//       if (name[i] === '-') {
//         i += 1
//         keyName += name[i].toUpperCase()
//       } else {
//         keyName += name[i]
//       }
//     }
//     newMap[keyName] = name
//     return newMap
//   }, {})
// }

// const typeList = Object.keys(type2formats)

// export const type = buildName2NameMap(typeList)

// export const format = typeList.reduce((typeConstantsMap, typeName) => {
//   const newMap = typeConstantsMap
//   newMap[typeName] = buildName2NameMap(type2formats[typeName])
//   return newMap
// }, {})

// export function $ref(typeName) {
//   return `#/definitions/${typeName}`
// }

export function code(c, lang = 'javascript') {
  return `${'```'}${lang}
${c}
${'```'}`
}

export const contentType = {
  json: 'application/json',
  jpg: 'image/jpeg',
  formData: 'multipart/form-data',
}

export const pagesize = {
  type: 'integer',
  format: 'int32',
  in: 'query',
  name: 'pagesize',
  description: '分页大小',
  required: false,
  default: 10,
}

export const page = {
  type: 'integer',
  format: 'int32',
  in: 'query',
  name: 'page',
  description: '分页页数(不能同时使用page和next)',
}

export const next = {
  type: 'integer',
  format: 'int64',
  in: 'query',
  name: 'next',
  description: '分页开始id，获取此id之后的数据(不能同时使用page和next)',
}

export const paging = {
  in: 'body',
  name: 'paging',
  description: '分页筛选/排序条件',
  schema: {
    $ref: '#/definitions/pagingData',
  },
}

const filter = {
  description: '筛选参数，{ key, symbol, value }',
  properties: {
    key: { type: 'string' },
    symbol: { type: 'string' },
    value: { type: ['string', 'number'] },
  },
}

const filters = {
  description: '筛选参数数组',
  type: 'array',
  items: filter,
}

const orderByItem = {
  description: '排序参数, { by, sort, ... }',
  properties: {
    by: { type: 'string' },
    sort: { type: 'string' },
  },
}


const orderBy = {
  description: '排序参数数组',
  type: 'array',
  items: orderByItem,
}

export const pagingData = {
  description: '排序参数body',
  properties: {
    filters,
    orderBy,
  },
}


// export const to = {
//   in: 'query',
//   name: 'to',
//   description: '分页截止到id，表示获取此id之前的数据',
//   type: type.integer,
//   format: format.integer.int64,
//   required: false,
// }

export const total = {
  description: '列表总条目',
  type: 'integer',
  format: 'int64',
}

export const eol = {
  description: 'End Of List，表示是否已经到最后一条',
  type: 'boolean',
}

export const generateErrorResponses = (errorArr) => {
  const code2error = errorArr.reduce((map, ErrorConstructor) => {
    const err = new ErrorConstructor()
    const newMap = map
    if (!newMap[err.statusCode]) newMap[err.statusCode] = []
    newMap[err.statusCode].push({
      errorCode: snakeCase(err.name).toUpperCase(),
      message: errors.lang(err) || err.name,
    })
    return newMap
  }, {})
  return Object.keys(code2error).reduce((map, errorCode) => {
    const errs = code2error[errorCode]
    const newMap = map
    newMap[errorCode] = {
      description: `
| code | message |
| ---- | ------- |
${errs.map(err => `| ${err.errorCode} | ${err.message} |\n`).join('')}

`,
      schema: {
        $ref: '#/definitions/errorResponse',
      },
    }
    return newMap
  }, {})
}
