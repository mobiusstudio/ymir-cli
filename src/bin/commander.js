#!/usr/bin/env node
import program from 'commander'
import { db } from '../db/database'

global.db = db

const { version } = require('../../package.json')

program
  .on('--help', () => {
    console.log('')
    console.log('Commands:')
    console.log(' createApi       create api with config')
    console.log(' initdb          init db with config')
    console.log(' updatedb        update db with config')
  })

program
  .version(version)
  .parse(process.argv)

if (program.args.length > 0) {
  // eslint-disable-next-line import/no-dynamic-require
  require(`./${program.args[0]}.js`)
}
