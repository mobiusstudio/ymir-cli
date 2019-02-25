/* eslint-disable operator-linebreak */
export const template = {}

template.controllers =
`import { #BaseControllers# } from './base'
import { #ModelName# } from '../models'

class #ClassName# extends #BaseControllers# {
  constructor() {
    super(#superCode#, #ModelName#)
  }
}

export const #objName# = new #ClassName#()
`
