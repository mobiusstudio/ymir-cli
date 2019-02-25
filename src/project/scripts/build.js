import { clean } from './clean'
import { copy } from './copy'
import { output } from './output'

export const build = async (projectName, projectPath) => {
  try {
    console.log('start build')
    await clean(projectName, projectPath)
    await copy(projectName, projectPath)
    await output(projectName, projectPath)
    console.log('finish build')
  } catch (error) {
    console.error(error)
  }
}
