/* eslint-disable operator-linebreak */
export const template = {}

template.controllers =
`import { BaseControllers } from './base'
import { #TableName# } from '../models'

class #TableControllers# extends BaseControllers {
  constructor() {
    super('#tableName#', #TableName#)
  }
}

export const #tableName# = new #TableControllers#()
`
