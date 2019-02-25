import del from 'del'

export const clean = async (projectPath) => {
  try {
    console.log('cleanup...')
    await del([`${projectPath}/api`], { force: true })
  } catch (error) {
    console.error(error)
  }
}
