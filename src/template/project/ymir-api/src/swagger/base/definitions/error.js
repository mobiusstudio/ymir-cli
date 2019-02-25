import { snakeCase } from 'lodash'
import { errors } from '../../../errors'

const errorCodeTableBody = Object.keys(errors)
  .filter(key => typeof errors[key] === 'function')
  .map(code => `| ${
    snakeCase(code).toUpperCase()
  } | ${
    errors.localization[code.replace(/Error$/, '')] || '-'
  } |\n`)
  .join('')

export const errorDescription = `
错误号和描述对应表如下：

| code | message |
| ---- | ------- |
${errorCodeTableBody}

`

export const error = {
  description: '见文档开头错误号说明。',
  required: ['code'],
  properties: {
    code: { type: 'string' },
    message: { type: 'string' },
  },
}
