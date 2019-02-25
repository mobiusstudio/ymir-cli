#!/usr/bin/env node
import program from 'commander'
import { initdb, updatedb } from './db'
import { createProject } from './project'

const { version } = require('../../package.json')

program
  .version(version)
  .option('-t --test')
  .option('-i, --initdb [config-file-path]', 'init db with config file')
  .option('-u, --updatedb [config-file-path]', 'update db with config file')
  .option('-c, --createProject [config-file-path]', 'create new project with config')
  .parse(process.argv)

if (program.test) {
  console.log(process.env)
}

if (program.initdb) {
  const configPath = program.initdb
  initdb(configPath)
}

if (program.updatedb) {
  const configPath = program.updatedb
  updatedb(configPath)
}

if (program.createProject) {
  console.log(program.createProject)
  const projectName = program.createProject
  const projectPath = process.env.PWD
  createProject(projectName, projectPath)
}
