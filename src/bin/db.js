import fs from 'fs'
import { db } from '../db/database'

global.db = db

export const initdb = async (configPath) => {
  try {
    const str = fs.readFileSync(configPath, 'utf8')
    const options = JSON.parse(str)
    const dbManager = await db.configure(options)
    await dbManager.rebuild()
    console.log(`Current db version: ${dbManager.version}`)
  } catch (error) {
    console.error(error)
  }
}

export const updatedb = async (configPath) => {
  try {
    const str = fs.readFileSync(configPath, 'utf8')
    const options = JSON.parse(str)
    const dbManager = await db.configure(options)
    const version = await dbManager.getCurrentVersion()
    console.log(`Before update db version: ${version}`)
    await dbManager.update()
    console.log(`After update db version: ${dbManager.version}`)
  } catch (error) {
    console.error(error)
  }
}
