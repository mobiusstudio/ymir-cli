export const uploadToken = {
  required: ['type', 'values'],
  properties: {
    type: {
      description: 'token 的类型，目前只有 `qiniu`',
      type: 'string',
    },
    values: {
      description: '描述 token 信息的 Key-Value-Pair，string-to-string',
      additionalProperties: { type: 'string' },
    },
  },
}
