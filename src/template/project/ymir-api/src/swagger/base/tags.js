export const tags = []

export const addTag = ({ name, description = '', externalDocs = { url: '' } }) => {
  if (tags.every(item => item.name !== name)) {
    tags.push({
      name,
      description,
      externalDocs,
    })
  }
}
