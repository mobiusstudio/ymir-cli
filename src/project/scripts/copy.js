import path from 'path'
import Promise from 'bluebird'

const ncp = Promise.promisify(require('ncp'))

const copyApi = async (projectName, projectPath) => {
  const exclude = [
    '.git',
    '.vscode',
    'build',
    'logs',
    'node_modules',
    'database/scripts/',
    'src/api/',
    'src/controllers/',
    'src/models/',
    'package-lock.json',
  ]
  const include = [
    '.gitignore',
    'src/controllers/base.js',
  ]
  const folderPath = `${projectPath}/${projectName}-api`
  const options = {
    filter: filename => exclude.every(excludePath => filename.indexOf(`/ymir-api/${excludePath}`) === -1),
  }

  // copy ymir-api
  await ncp(path.join(__dirname, '../../template/project/ymir-api'), folderPath, options)

  const cps = []
  include.forEach(includePath => cps.push(ncp(path.join(__dirname, `../../template/project/ymir-api/${includePath}`), `${folderPath}/${includePath}`)))

  await Promise.all(cps).catch(err => err)
}

export const copy = async (projectName, projectPath) => {
  console.log('copy ...')
  try {
    await copyApi(projectName, projectPath)
  } catch (error) {
    console.error(error)
  }
}
