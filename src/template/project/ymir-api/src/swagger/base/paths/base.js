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
      post: {
        operationId: `batchAdd${upperFirst(schemaName)}`,
        summary: `Batch add new ${schemaName}`,
        ...generalDescription,
        parameters: [batchAddContent],
      },
      patch: {
        operationId: `batchUpdate${upperFirst(schemaName)}`,
        summary: `Batch update new ${schemaName}`,
        ...generalDescription,
        parameters: [batchUpdateContent],
      },
      delete: {
        operationId: `batchDelete${upperFirst(schemaName)}`,
        summary: `Batch delete new ${schemaName}`,
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
