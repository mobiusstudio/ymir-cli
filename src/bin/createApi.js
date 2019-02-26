/* eslint-disable no-shadow */
import program from 'commander'
import inquirer from 'inquirer'
import { build } from '../project/scripts/build'
import { initdb } from './initdb'

program
  .command('createApi')
  .description('create a new api project')
  .action(() => {
    console.log('creating...')
    const def = require('./config.json').defaultApi
    const questions = [{
      type: 'input',
      name: 'configPath',
      message: 'please input api config path',
      default: def.configPath,
    }, {
      type: 'input',
      name: 'projectName',
      message: 'please input project name',
      default: def.projectName,
    }, {
      type: 'input',
      name: 'dbname',
      message: 'please input database name',
      default: def.dbname,
    }, {
      type: 'input',
      name: 'host',
      message: 'please input database host',
      default: def.host,
    }, {
      type: 'input',
      name: 'port',
      message: 'please input database port',
      default: def.port,
    }, {
      type: 'input',
      name: 'username',
      message: 'please input database username',
      default: def.username,
    }, {
      type: 'input',
      name: 'password',
      message: 'please input database password',
      default: def.password,
    }, {
      type: 'input',
      name: 'managedb',
      message: 'please input manage database',
      default: def.managedb,
    }, {
      type: 'input',
      name: 'musername',
      message: 'please input manage username',
      default: def.musername,
    }, {
      type: 'input',
      name: 'mpassword',
      message: 'please input manage password',
      default: def.mpassword,
    }]
    inquirer.prompt(questions).then(async (answers) => {
      const { configPath, projectName, dbname, host, port, username, password, managedb, musername, mpassword } = answers
      const projectPath = process.env.PWD
      const dbconfig = {
        projectName,
        dbname,
        host,
        port,
        username,
        password,
        managedb,
        musername,
        mpassword,
      }
      await build(configPath, projectPath, dbconfig)
      const questions = [{
        type: 'input',
        name: 'configPath',
        message: 'please input db config path',
        default: './api/database/db.config.json',
      }]
      inquirer.prompt(questions).then((answers) => {
        const { configPath } = answers
        initdb(configPath)
      })
    })
  })

program.parse(process.argv)
