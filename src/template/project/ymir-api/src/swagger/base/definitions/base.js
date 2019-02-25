import { upperFirst } from 'lodash'

export class BaseDefinitions {
  constructor(schemaName, requestBody) {
    this[`add${upperFirst(schemaName)}Request`] = {
      description: `create ${schemaName} request`,
      properties: requestBody,
    }

    this[`batchAdd${upperFirst(schemaName)}Request`] = {
      description: 'batch add request',
      type: 'array',
      items: this[`add${upperFirst(schemaName)}Request`],
    }

    this[`update${upperFirst(schemaName)}Request`] = {
      description: `update ${schemaName} request`,
      properties: requestBody,
    }

    this[`batchUpdate${upperFirst(schemaName)}Request`] = {
      description: 'batch update request',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          data: this[`update${upperFirst(schemaName)}Request`],
          pkeyValue: {
            description: 'id',
            type: 'integer',
            format: 'int64',
          },
        },
      },
    }

    this[`batchDelete${upperFirst(schemaName)}Request`] = {
      description: 'batch delete request',
      type: 'array',
      items: {
        description: 'id',
        type: 'integer',
        format: 'int64',
      },
    }
  }
}
