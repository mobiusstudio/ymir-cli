import { generateSql, generateModel, generateApi } from '../generater'
import schemaList from '../ymir.config.json'

export const output = (projectName, projectPath) => {
  generateSql({ schemaList, outDir: `${projectPath}/${projectName}-api/database/scripts` })
  generateModel({ schemaList, outDir: `${projectPath}/${projectName}-api/src/models` })
  generateApi({ schemaList, outDir: `${projectPath}/${projectName}-api/src` })
}
