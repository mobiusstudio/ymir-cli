/* eslint-disable operator-linebreak */
export const template = {}

template.definitions =
`import { #BaseDefinitions# } from '../../../swagger'
import { #propsImport# } from './properties'

const requestBody = {
  #propsName#
}

class #ClassName# extends #BaseDefinitions# {
  constructor() {
    super(#superCode#, requestBody)
  }
}

export const def = new #ClassName#()
`

template.property =
`export const #columnName# = {
  description: '#columnDescription#',
  #columnType#
}`
