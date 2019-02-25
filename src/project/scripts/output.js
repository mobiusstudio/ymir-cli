import fs from 'fs'
import { generateSql, generateModel, generateApi, generateDbconfig } from '../generater'

export const output = (configPath, projectPath, dbconfig) => {
  const schemaList = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  generateSql({ schemaList, outDir: `${projectPath}/api/database/scripts` })
  generateModel({ schemaList, outDir: `${projectPath}/api/src/models` })
  generateApi({ schemaList, outDir: `${projectPath}/api/src` })
  generateDbconfig({ dbconfig, outDir: `${projectPath}/api` })
}
