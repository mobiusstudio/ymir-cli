import program from 'commander'
import inquirer from 'inquirer'
import { build } from '../project/scripts/build'

const createProject = async (configPath, projectPath) => {
  await build(configPath, projectPath)
}

program
  .command('createApi')
  .description('create a new api project')
  .action((options) => {
    console.log(options)
    console.log('creating...')
    const questions = [{
      type: 'input',
      name: 'configPath',
      message: 'please input api config path',
      default: './api.config.json',
    }]
    inquirer.prompt(questions).then((answers) => {
      const { configPath } = answers
      const projectPath = process.env.PWD
      createProject(configPath, projectPath)
    })
  })

program.parse(process.argv)
