#!./node_modules/.bin/babel-node --
import program from 'commander'
import { initdb, updatedb } from './db'
// import { createProject } from './project'

const { version } = require('../package.json')

program
  .version(version)
  .option('-i, --initdb [config-file-path]', 'init db with config file')
  .option('-u, --upatedb [config-file-path]', 'update db with config file')
  .option('-c, --createProject [project-folder-path]', 'create new project in path')

console.log('use ymir -h or --help for help')
if (program.initdb) {
  const configPath = program.initdb
  initdb(configPath)
}

if (program.updatedb) {
  const configPath = program.initdb
  updatedb(configPath)
}

if (program.createProject) {
  console.log(program.createProject)
  // const projectName = program.createProject
  // createProject(projectName)
}
