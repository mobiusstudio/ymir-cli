import { upperFirst } from 'lodash'
import { contentType, pagesize, page, next, paging } from '../constants'

class DataContent {
  constructor(operation, schemaName) {
    this.in = 'body'
    this.name = 'data'
    this.description = `${operation} ${schemaName} data`
    this.required = true
    this.schema = {
      $ref: `#/definitions/${operation}${upperFirst(schemaName)}Request`,
    }
  }
}

export class BaseRoutes {
  constructor(schemaName) {
    const id = {
      type: 'integer',
      format: 'int64',
      description: `${schemaName} id`,
      name: 'id',
      in: 'path',
      required: true,
    }

    const batchGetContent = new DataContent('batchGet', schemaName)

    const addContent = new DataContent('add', schemaName)

    const batchAddContent = new DataContent('batchAdd', schemaName)

    const updateContent = new DataContent('update', schemaName)

    const batchUpdateContent = new DataContent('batchUpdate', schemaName)

    const batchDeleteContent = new DataContent('batchDelete', schemaName)

    const generalDescription = {
      tags: [upperFirst(schemaName)],
      consumes: [contentType.json],
      produces: [contentType.json],
      responses: {
        200: {
          description: 'return 200 if succeed',
        },
      },
    }

    this[''] = {
      get: {
        operationId: `get${upperFirst(schemaName)}List`,
        summary: `Get ${schemaName} list`,
        ...generalDescription,
        parameters: [pagesize, page, next, paging],
      },
      post: {
        operationId: `add${upperFirst(schemaName)}`,
        summary: `Add new ${schemaName}`,
        ...generalDescription,
        parameters: [addContent],
      },
    }
    // eslint-disable-next-line dot-notation
    this['batch'] = {
      get: {
        operationId: `batchGet${upperFirst(schemaName)}`,
        summary: `Batch get ${schemaName}`,
        ...generalDescription,
        parameters: [batchGetContent],
      },
      post: {
        operationId: `batchAdd${upperFirst(schemaName)}`,
        summary: `Batch add new ${schemaName}`,
        ...generalDescription,
        parameters: [batchAddContent],
      },
      patch: {
        operationId: `batchUpdate${upperFirst(schemaName)}`,
        summary: `Batch update ${schemaName}`,
        ...generalDescription,
        parameters: [batchUpdateContent],
      },
      delete: {
        operationId: `batchDelete${upperFirst(schemaName)}`,
        summary: `Batch delete ${schemaName}`,
        ...generalDescription,
        parameters: [batchDeleteContent],
      },
    }
    this['{id}'] = {
      get: {
        operationId: `get${upperFirst(schemaName)}`,
        summary: `Get ${schemaName} by id`,
        ...generalDescription,
        parameters: [id],
      },
      patch: {
        operationId: `update${upperFirst(schemaName)}`,
        summary: `Update ${schemaName}`,
        ...generalDescription,
        parameters: [id, updateContent],
      },
      delete: {
        operationId: `delete${upperFirst(schemaName)}`,
        summary: `Delete ${schemaName}`,
        ...generalDescription,
        parameters: [id],
      },
    }
  }
}

export class BaseChildRoutes {
  constructor(fatherName, schemaName) {
    const fullname = `${fatherName}${upperFirst(schemaName)}`

    const id = {
      type: 'integer',
      format: 'int64',
      description: `${fullname} id`,
      name: 'id',
      in: 'path',
      required: true,
    }

    const batchGetContent = new DataContent('batchGet', fullname)

    const addContent = new DataContent('add', fullname)

    const batchAddContent = new DataContent('batchAdd', fullname)

    const updateContent = new DataContent('update', fullname)

    const batchUpdateContent = new DataContent('batchUpdate', fullname)

    const batchDeleteContent = new DataContent('batchDelete', fullname)

    const generalDescription = {
      tags: [upperFirst(fullname)],
      consumes: [contentType.json],
      produces: [contentType.json],
      responses: {
        200: {
          description: 'return 200 if succeed',
        },
      },
    }

    this[`{id}/${schemaName}`] = {
      get: {
        operationId: `get${upperFirst(fullname)}`,
        summary: `Get ${fullname} by id`,
        ...generalDescription,
        parameters: [id],
      },
      post: {
        operationId: `add${upperFirst(fullname)}`,
        summary: `Add new ${fullname}`,
        ...generalDescription,
        parameters: [id, addContent],
      },
      patch: {
        operationId: `update${upperFirst(fullname)}`,
        summary: `Update ${fullname}`,
        ...generalDescription,
        parameters: [id, updateContent],
      },
      delete: {
        operationId: `delete${upperFirst(fullname)}`,
        summary: `Delete ${fullname}`,
        ...generalDescription,
        parameters: [id],
      },
    }
    // eslint-disable-next-line dot-notation
    this[`${schemaName}/batch`] = {
      get: {
        operationId: `batchGet${upperFirst(fullname)}`,
        summary: `Batch get ${fullname}`,
        ...generalDescription,
        parameters: [batchGetContent],
      },
      post: {
        operationId: `batchAdd${upperFirst(fullname)}`,
        summary: `Batch add new ${fullname}`,
        ...generalDescription,
        parameters: [batchAddContent],
      },
      patch: {
        operationId: `batchUpdate${upperFirst(fullname)}`,
        summary: `Batch update ${fullname}`,
        ...generalDescription,
        parameters: [batchUpdateContent],
      },
      delete: {
        operationId: `batchDelete${upperFirst(fullname)}`,
        summary: `Batch delete ${fullname}`,
        ...generalDescription,
        parameters: [batchDeleteContent],
      },
    }
  }
}
