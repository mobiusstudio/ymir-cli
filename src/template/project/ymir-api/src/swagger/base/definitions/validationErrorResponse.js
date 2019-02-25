export const validationErrorResponse = {
  required: ['error'],
  properties: {
    error: {
      $ref: '#/definitions/validationError',
    },
  },
}
