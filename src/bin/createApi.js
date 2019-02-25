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
    const questions = [{
      type: 'input',
      name: 'configPath',
      message: 'please input api config path',
      default: './api.config.json',
    }, {
      type: 'input',
      name: 'projectName',
      message: 'please input project name',
      default: 'myproject',
    }, {
      type: 'input',
      name: 'dbname',
      message: 'please input database name',
      default: 'mydatabase',
    }, {
      type: 'input',
      name: 'host',
      message: 'please input database host',
      default: 'localhost',
    }, {
      type: 'input',
      name: 'port',
      message: 'please input database port',
      default: '5432',
    }, {
      type: 'input',
      name: 'username',
      message: 'please input database username',
      default: 'postgres',
    }, {
      type: 'input',
      name: 'password',
      message: 'please input database password',
      default: 'postgres',
    }]
    inquirer.prompt(questions).then(async (answers) => {
      const { configPath, projectName, dbname, host, port, username, password } = answers
      const projectPath = process.env.PWD
      const dbconfig = {
        projectName,
        dbname,
        host,
        port,
        username,
        password,
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
