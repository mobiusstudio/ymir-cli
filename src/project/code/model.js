import { upperFirst } from 'lodash'
import { template } from '../../template/model.template'
import { generate, writeFile } from './generate'

const foreignCode = (foreign) => {
  if (typeof foreign === 'string') return `'${foreign}'`
  if (foreign.length === 1) return `['${foreign[0]}']`
  if (foreign.length === 2) return `['${foreign[0]}', '${foreign[1]}']`
  return null
}

const columnCode = (column) => {
  const { type, name, alias, foreign, default: def, required } = column
  const props = []
  if (type) props.push(`type: '${type}',`)
  if (name) props.push(`name: '${name}',`)
  if (alias) props.push(`alias: '${alias}',`)
  if (foreign) props.push(`foreign: ${foreignCode(foreign)},`)
  if (def) props.push(`default: '${def}',`)
  if (required) props.push(`required: '${required}',`)
  return template.column.replace(/#propsCode#/g, `${props.join('\n          ')}`)
}

const columnsCode = columns => columns.map(column => columnCode(column)).join('\n')

const tableCode = (table) => {
  const { schemaName, tableName, pkeyIndex, columns } = table
  const modelName = schemaName === tableName ? upperFirst(tableName) : `${upperFirst(schemaName)}${upperFirst(tableName)}`
  return template.table
    .replace(/#modelName#/g, modelName)
    .replace(/#schemaName#/g, schemaName)
    .replace(/#tableName#/g, tableName)
    .replace(/#pkeyIndex#/g, pkeyIndex)
    .replace(/#columnsCode#/g, columnsCode(columns))
}

const tablesCode = tables => tables.map(table => tableCode(table)).join('\n\n')

export const modelCode = (schema) => {
  const { tables } = schema
  return template.schema.replace(/#tablesCode#/g, tablesCode(tables))
}

const indexCode = (schemaList) => {
  const codeArray = []
  schemaList.forEach((schema) => {
    const code = `export * from './${schema.schemaName}'`
    codeArray.push(code)
  })
  return codeArray.join('\n')
}

export const generateModel = ({ schemaList, outDir }) => {
  generate({
    suffix: '.js',
    outDir,
    schemaList,
    code: modelCode,
  })
  writeFile({
    buffer: indexCode(schemaList),
    path: outDir,
    filename: 'index.js',
  })
}
