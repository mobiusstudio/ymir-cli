import { upperFirst, camelCase } from 'lodash'
import { typeMap as T } from 'chaos-library'
import { template } from '../../template/api'
import { writeFile } from './generate'

export const apiCode = {}

const indexHelper = (tables, handler) => tables.map((table) => {
  const { schemaName, tableName } = table
  const filename = schemaName === tableName ? tableName : `${schemaName}-${tableName}`
  return handler(filename)
})

const indexCode = tables => ({
  swagger: {
    import: indexHelper(tables, filename => `import ${camelCase(filename)} from './${filename}'`).join('\n'),
    obj: indexHelper(tables, filename => `  ${camelCase(filename)}`).join(',\n').concat(','),
  },
  controllers: {
    import: indexHelper(tables, filename => `import { ${camelCase(filename)} } from './${filename}'`).join('\n'),
    obj: indexHelper(tables, filename => `  ...${camelCase(filename)}`).join(',\n').concat(','),
  },
})

apiCode.controllers = (table, isPrimary = true) => {
  const { schemaName, tableName } = table
  const fullname = schemaName === tableName ? tableName : `${schemaName}${upperFirst(tableName)}`
  const baseControllers = isPrimary ? 'BaseControllers' : 'BaseChildControllers'
  const className = `${isPrimary ? upperFirst(tableName) : upperFirst(fullname)}Controllers`
  const superCode = isPrimary ? `'${tableName}'` : `'${schemaName}', '${tableName}'`
  return template.controllers
    .replace(/#BaseControllers#/g, baseControllers)
    .replace(/#ModelName#/g, upperFirst(fullname))
    .replace(/#ClassName#/g, className)
    .replace(/#superCode#/g, superCode)
    .replace(/#objName#/g, fullname)
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

apiCode.definitions = (table, isPrimary = true) => {
  const { schemaName, tableName, columns } = table
  const fullname = schemaName === tableName ? tableName : `${schemaName}${upperFirst(tableName)}`
  const baseDefinitions = isPrimary ? 'BaseDefinitions' : 'BaseChildDefinitions'
  const className = `${isPrimary ? upperFirst(tableName) : upperFirst(fullname)}Definitions`
  const superCode = isPrimary ? `'${tableName}'` : `'${schemaName}', '${tableName}'`
  return template.definitions
    .replace(/#BaseDefinitions#/g, baseDefinitions)
    .replace(/#propsImport#/g, propsCode(columns).import)
    .replace(/#propsName#/g, propsCode(columns).body)
    .replace(/#ClassName#/g, className)
    .replace(/#superCode#/g, superCode)
}

apiCode.path = (table, isPrimary = true) => {
  const { schemaName, tableName } = table
  const fullname = schemaName === tableName ? tableName : `${schemaName}${upperFirst(tableName)}`
  const baseRoutes = isPrimary ? 'BaseRoutes' : 'BaseChildRoutes'
  const className = `${isPrimary ? upperFirst(tableName) : upperFirst(fullname)}Routes`
  const superCode = isPrimary ? `'${tableName}'` : `'${schemaName}', '${tableName}'`
  const basePath = isPrimary ? tableName : schemaName
  const tag = isPrimary ? upperFirst(tableName) : upperFirst(fullname)
  return template.path
    .replace(/#BaseRoutes#/g, baseRoutes)
    .replace(/#ClassName#/g, className)
    .replace(/#superCode#/g, superCode)
    .replace(/#basePath#/g, basePath)
    .replace(/#Tag#/g, tag)
}

export const generateApi = ({ schemaList, outDir }) => {
  const apiMap = ['path', 'definitions']
  const tableList = []
  schemaList.forEach((schema) => {
    const { tables } = schema
    tables.forEach((table, tindex) => {
      const { schemaName, tableName } = table
      const filename = schemaName === tableName ? tableName : `${schemaName}-${tableName}`
      // const filename = tableName
      tableList.push(table)
      // path & definitions
      apiMap.forEach((i) => {
        writeFile({
          buffer: apiCode[i](table, tindex === 0),
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
        buffer: apiCode.controllers(table, tindex === 0),
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
