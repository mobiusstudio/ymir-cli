#!/usr/bin/env node
import program from 'commander'
import { initdb, updatedb } from './db'
import { createProject } from './project'

const { version } = require('../../package.json')

program
  .version(version)
  .option('-i, --initdb [config-file-path]', 'init db with config file')
  .option('-u, --updatedb [config-file-path]', 'update db with config file')
  .option('-c, --createApi [config-file-path]', 'create api with config in current project')
  .parse(process.argv)

if (program.initdb) {
  const configPath = program.initdb
  initdb(configPath)
}

if (program.updatedb) {
  const configPath = program.updatedb
  updatedb(configPath)
}

if (program.createApi) {
  console.log(program.createApi)
  const configPath = program.createApi
  const projectPath = process.env.PWD
  createProject(configPath, projectPath)
}
