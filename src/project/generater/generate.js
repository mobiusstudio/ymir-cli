import fs from 'fs'
import mkdirp from 'mkdirp'

export const writeFile = ({ buffer, path, filename }) => {
  mkdirp.sync(path)
  fs.writeFileSync(`${path}/${filename}`, buffer)
}

export const generate = ({ suffix, outDir, schemaList, code = () => {} }) => {
  schemaList.forEach((schema, index) => (writeFile({
    buffer: code(schema),
    path: outDir,
    filename: `${suffix === '.sql' ? `0${index + 1}.` : ''}${schema.schemaName}${suffix}`,
  })))
}
