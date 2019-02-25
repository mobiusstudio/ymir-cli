import { clean } from './clean'
import { copy } from './copy'
import { output } from './output'

export const build = async (configPath, projectPath) => {
  try {
    console.log('start build')
    await clean(projectPath)
    await copy(projectPath)
    await output(configPath, projectPath)
    console.log('finish build')
  } catch (error) {
    console.error(error)
  }
}
