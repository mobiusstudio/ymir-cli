import path from 'path'
import { generateSql, generateModel, generateApi } from '../src/code'
import schemaList from '../ymir.config.json'

export const output = (projectName) => {
  generateSql({ schemaList, outDir: path.join(__dirname, `../../${projectName}-api/database/scripts`) })
  generateModel({ schemaList, outDir: path.join(__dirname, `../../${projectName}-api/src/models`) })
  generateApi({ schemaList, outDir: path.join(__dirname, `../../${projectName}-api/src`) })
}
