import run from './run'
import clean from './clean'
import bundle from './bundle'

async function build(options) {
  await run(clean)
  const res = await run(bundle, options)
  return res
}

export default build
