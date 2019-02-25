import { clean } from './clean'
import { copy } from './copy'
import { output } from './output'

export const build = async (projectName) => {
  console.log('start build')
  await clean(projectName)
  await copy(projectName)
  await output(projectName)
  console.log('finish build')
}
