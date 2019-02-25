import { template } from '../../template/dbconfig.template'
import { writeFile } from './generate'

const dbCode = (dbconfig) => {
  const { projectName, dbname, host, port, username, password } = dbconfig
  return template.db
    .replace(/#projectName#/g, projectName)
    .replace(/#dbname#/g, dbname)
    .replace(/#host#/g, host)
    .replace(/#port#/g, port)
    .replace(/#username#/g, username)
    .replace(/#password#/g, password)
}

const apiCode = (dbconfig) => {
  const { dbname, host, port, username, password } = dbconfig
  return template.api
    .replace(/#dbname#/g, dbname)
    .replace(/#host#/g, host)
    .replace(/#port#/g, port)
    .replace(/#username#/g, username)
    .replace(/#password#/g, password)
}

export const generateDbconfig = ({ dbconfig, outDir }) => {
  writeFile({
    buffer: dbCode(dbconfig),
    path: `${outDir}/database`,
    filename: 'db.config.json',
  })
  writeFile({
    buffer: apiCode(dbconfig),
    path: `${outDir}/src/config`,
    filename: 'development.json',
  })
}
