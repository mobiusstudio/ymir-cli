import { build } from '../project/scripts/build'

export const createProject = async (projectName, projectPath) => {
  await build(projectName, projectPath)
}
