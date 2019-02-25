import del from 'del'

export const clean = async (projectName) => {
  console.log('cleanup...')
  await del([`../${projectName}-api`], { force: true })
}
