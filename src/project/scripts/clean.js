import del from 'del'

export const clean = async (projectName, projectPath) => {
  try {
    console.log('cleanup...')
    await del([`${projectPath}/${projectName}-api`], { force: true })
  } catch (error) {
    console.error(error)
  }
}
