import fs from 'fs'
import program from 'commander'
import inquirer from 'inquirer'

export const initdb = async (configPath) => {
  try {
    console.log('Initializing...')
    const str = fs.readFileSync(configPath, 'utf8')
    const options = JSON.parse(str)
    const dbManager = await db.configure(options)
    await dbManager.rebuild()
    console.log(`Current db version: ${dbManager.version}`)
  } catch (error) {
    console.error(error)
  }
}

program
  .command('initdb')
  .description('init db with db config')
  .action(() => {
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

program.parse(process.argv)
