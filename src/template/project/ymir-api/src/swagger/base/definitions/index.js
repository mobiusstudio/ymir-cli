import { error } from './error'
import { errorResponse } from './errorResponse'
import { validationError } from './validationError'
import { validationErrorResponse } from './validationErrorResponse'
import { errorFieldDescription } from './errorFieldDescription'
import { uploadToken } from './uploadToken'
import { pagingData } from '../constants'

export const definitions = {
  error,
  errorResponse,
  validationError,
  validationErrorResponse,
  errorFieldDescription,
  uploadToken,
  pagingData,
}

export const addDefinitions = (data) => {
  Object.keys(data).forEach((key) => {
    if (Object.keys(definitions).includes(key)) throw new Error(`Duplicate definition name: ${key}`)
    else definitions[key] = data[key]
  })
}
