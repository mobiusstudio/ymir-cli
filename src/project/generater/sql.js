import { snakeCase, without, cloneDeep } from 'lodash'
import { typeMap as T } from 'chaos-library'
import { template } from '../../template/sql.template'
import { generate } from './generate'

const snakeCaseSchema = (schema) => {
  const tempSchema = cloneDeep(schema)
  const { schemaName, tables } = tempSchema
  tempSchema.schemaName = snakeCase(schemaName)
  tempSchema.tables = tables.map((table) => {
    const tempTable = table
    const { tableName, columns } = tempTable
    tempTable.schemaName = snakeCase(schemaName)
    tempTable.tableName = snakeCase(tableName)
    tempTable.columns = columns.map((column) => {
      const tempColumn = column
      const { name } = tempColumn
      tempColumn.schemaName = snakeCase(schemaName)
      tempColumn.tableName = snakeCase(tableName)
      tempColumn.name = snakeCase(name)
      return tempColumn
    })
    return tempTable
  })
  return tempSchema
}

// const snakeCaseAll = schemaList => schemaList.map(schema => snakeCaseSchema(schema))

const timeCode = (createTime = true, lastUpdateTime = true) => {
  const arr = []
  if (createTime) arr.push('created bigint DEFAULT unix_now()')
  if (lastUpdateTime) arr.push('last_updated bigint DEFAULT unix_now()')
  return arr.join(',\n  ').concat(',')
}

const foreignCode = (foreign, schemaName) => {
  if (typeof foreign === 'string') return `"${schemaName}".${foreign}`
  if (foreign.length === 1) return `"${schemaName}".${foreign[0]}`
  if (foreign.length === 2) return `"${foreign[0]}".${foreign[1]}`
  if (foreign.length === 3) return `"${foreign[0]}".${foreign[1]} (${foreign[2]})`
  return null
}


const pkeyCode = (pkey) => {
  const { schemaName, type, name, foreign, def } = pkey
  const arr = []
  arr.push(name)
  switch (type) {
    case 'id-auto': arr.push(T.get(type).sql(schemaName)); break
    case 'id-seq': arr.push(T.get(type).sql()); break
    default: arr.push(T.get(type).sql({ req: true, def })); break
  }
  if (foreign) arr.push(`REFERENCES ${foreignCode(foreign, schemaName)}`)
  return arr.join(' ').concat(',')
}

const columnCode = (column) => {
  const { schemaName, type, name, foreign, default: def, required } = column
  const arr = []
  if (name) arr.push(name)
  const req = required === true || required === 'true' || required === 1
  if (type) arr.push(T.get(type).sql({ req, def }))
  if (foreign) arr.push(`REFERENCES ${foreignCode(foreign, schemaName)}`)
  return arr.join(' ')
}

const columnsCode = (columns) => {
  const arr = []
  columns.forEach((column) => {
    arr.push(columnCode(column))
  })
  return arr.join(',\n  ').concat(',')
}

const tableCode = (table) => {
  const { schemaName, tableName, pkeyIndex, columns: tempColumns } = table
  const pkey = tempColumns[pkeyIndex]
  const columns = without(tempColumns, pkey)
  return template.table.replace(/#schemaName#/g, schemaName)
    .replace(/#tableName#/g, tableName)
    .replace(/#pkeyCode#/g, pkeyCode(pkey))
    .replace(/#columnsCode#/g, columnsCode(columns))
    .replace(/#timeCode#/g, timeCode())
    .replace(/#pkeyName#/g, pkey.name)
}

const tablesCode = (tables) => {
  const arr = []
  tables.forEach((table) => {
    arr.push(tableCode(table))
  })
  return arr.join('\n')
}

export const sqlCode = (schema) => {
  const { schemaName, tables } = snakeCaseSchema(schema)
  return template.schema.replace(/#schemaName#/g, schemaName).replace(/#tablesCode#/g, tablesCode(tables))
}

export const generateSql = ({ schemaList, outDir }) => (generate({
  suffix:
  '.sql',
  outDir,
  schemaList,
  code: sqlCode,
}))
