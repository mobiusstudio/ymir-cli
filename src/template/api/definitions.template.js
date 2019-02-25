/* eslint-disable operator-linebreak */
export const template = {}

template.definitions =
`import { BaseDefinitions } from '../../../swagger'
import { #propsImport# } from './properties'

const requestBody = {
  #propsName#
}

class #TableDefinitions# extends BaseDefinitions {
  constructor() {
    super('#tableName#', requestBody)
  }
}

export const def = new #TableDefinitions#()
`

template.property =
`export const #columnName# = {
  description: '#columnDescription#',
  #columnType#
}`
