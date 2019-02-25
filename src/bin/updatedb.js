import fs from 'fs'
import program from 'commander'
import inquirer from 'inquirer'

const updatedb = async (configPath) => {
  try {
    const str = fs.readFileSync(configPath, 'utf8')
    const options = JSON.parse(str)
    const dbManager = await db.configure(options)
    const version = await dbManager.getCurrentVersion()
    console.log(`Before update db version: ${version}`)
    console.log('Updating...')
    await dbManager.update()
    console.log(`After update db version: ${dbManager.version}`)
  } catch (error) {
    console.error(error)
  }
}

program
  .command('updatedb')
  .description('update db with db config')
  .action(() => {
    const questions = [{
      type: 'input',
      name: 'configPath',
      message: 'please input db config path',
      default: './api/database/config.json',
    }]
    inquirer.prompt(questions).then((answers) => {
      const { configPath } = answers
      updatedb(configPath)
    })
  })

program.parse(process.argv)
