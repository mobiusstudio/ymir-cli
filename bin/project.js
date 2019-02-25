import { build } from '../src/project/scripts/build'

export const createProject = async (projectName) => {
  await build(projectName)
}
