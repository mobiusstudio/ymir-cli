import { upperFirst } from 'lodash'
import { typeMap as T } from 'chaos-library'
import { template } from '../../template/api'
import { writeFile } from './generate'

export const apiCode = {}

const indexCode = tables => ({
  swagger: {
    import: tables.map(table => `import ${table.tableName} from './${table.tableName}'`).join('\n'),
    obj: tables.map(table => `  ${table.tableName}`).join(',\n').concat(','),
  },
  controllers: {
    import: tables.map(table => `import { ${table.tableName} } from './${table.tableName}'`).join('\n'),
    obj: tables.map(table => `  ...${table.tableName}`).join(',\n').concat(','),
  },
})

apiCode.controllers = (table) => {
  const { tableName } = table
  return template.controllers
    .replace(/#tableName#/g, tableName)
    .replace(/#TableName#/g, `${upperFirst(tableName)}`)
    .replace(/#TableControllers#/g, `${upperFirst(tableName)}Controllers`)
}

const propsCode = columns => ({
  import: columns.map(column => column.name).join(', '),
  body: columns.map(column => column.name).join(',\n  ').concat(','),
  properties: columns.map(column => template.property
    .replace(/#columnName#/g, column.name)
    .replace(/#columnType#/g, T.get(column.type).swt({ req: false }).concat(','))
    .replace(/#columnDescription#/g, column.description || `${column.tableName} ${column.name}`))
    .join('\n\n')
    .concat('\n'),
})

apiCode.properties = (table) => {
  const { columns } = table
  return propsCode(columns).properties
}

apiCode.definitions = (table) => {
  const { tableName, columns } = table
  return template.definitions
    .replace(/#tableName#/g, tableName)
    .replace(/#TableDefinitions#/g, `${upperFirst(tableName)}Definitions`)
    .replace(/#propsImport#/g, propsCode(columns).import)
    .replace(/#propsName#/g, propsCode(columns).body)
}

apiCode.path = (table) => {
  const { tableName } = table
  return template.path
    .replace(/#TableRoutes#/g, `${upperFirst(tableName)}Routes`)
    .replace(/#TableName#/g, `${upperFirst(tableName)}`)
    .replace(/#tableName#/g, tableName)
}

export const generateApi = ({ schemaList, outDir }) => {
  const apiMap = ['path', 'definitions']
  const tableList = []
  schemaList.forEach((schema) => {
    const { tables } = schema
    const ptable = tables[0]
    tables.forEach((table, tindex) => {
      const { tableName } = table
      // const filename = schemaName === tableName ? tableName : `${schemaName}-${tableName}`
      const filename = tableName
      tableList.push(table)
      // path & definitions
      apiMap.forEach((i) => {
        writeFile({
          buffer: apiCode[i](table, tindex === 0, ptable),
          path: `${outDir}/api/${filename}/${i}`,
          filename: 'index.js',
        })
      })
      writeFile({
        buffer: apiCode.properties(table),
        path: `${outDir}/api/${filename}/definitions`,
        filename: 'properties.js',
      })
      writeFile({
        buffer: template.apiIndex,
        path: `${outDir}/api/${filename}`,
        filename: 'index.js',
      })
      // controllers
      writeFile({
        buffer: apiCode.controllers(table),
        path: `${outDir}/controllers`,
        filename: `${filename}.js`,
      })
    })
  })
  // swagger index
  writeFile({
    buffer: template.swaggerIndex
      .replace(/#importCode#/g, indexCode(tableList).swagger.import)
      .replace(/#objCode#/g, indexCode(tableList).swagger.obj),
    path: `${outDir}/api`,
    filename: 'index.js',
  })
  // controller index
  writeFile({
    buffer: template.controllerIndex
      .replace(/#importCode#/g, indexCode(tableList).controllers.import)
      .replace(/#objCode#/g, indexCode(tableList).controllers.obj),
    path: `${outDir}/controllers`,
    filename: 'index.js',
  })
}
