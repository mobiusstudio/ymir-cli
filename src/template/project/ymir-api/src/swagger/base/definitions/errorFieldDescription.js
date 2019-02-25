export const errorFieldDescription = {
  properties: {
    code: { type: 'string' },
    field: { type: 'string' },
    message: { type: 'string' },
    recommendedValue: { type: 'string' },
    path: {
      type: 'array',
      items: { type: 'string' },
    },
  },
}
