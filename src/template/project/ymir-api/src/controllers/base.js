import { upperFirst } from 'lodash'

export class BaseControllers {
  constructor(schemaName, Model) {
    this[`get${upperFirst(schemaName)}List`] = async (req, res) => {
      try {
        const { page, pagesize, next, paging } = req.swagger.params
        const params = {
          page: page.value,
          pagesize: pagesize.value,
          next: next.value,
          nextKey: 'id',
          filters: paging.value.filters,
          orderBy: paging.value.orderBy,
        }
        global.logger.trace(`Get ${schemaName} list`, params)
        const items = await new Model().from().do(params)
        return res.json(items)
      } catch (error) {
        throw error
      }
    }

    this[`get${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const id = req.swagger.params.id.value
        global.logger.trace(`Get ${schemaName}`, id)
        const object = await new Model().get(id)
        return res.json(object)
      } catch (error) {
        throw error
      }
    }

    this[`batchGet${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch get ${schemaName}`, data)
        const result = await new Model().batchGet(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`add${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Add new ${schemaName}`, data)
        const result = await new Model().push({
          data,
        })
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchAdd${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch add new ${schemaName}`, data)
        const result = await new Model().batchPush(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`update${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        const id = req.swagger.params.id.value
        global.logger.trace(`Update ${schemaName}`, data)
        const result = await new Model().push({
          data,
          pkeyValue: id,
        })
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchUpdate${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch update new ${schemaName}`, data)
        const result = await new Model().batchPush(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`delete${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const id = req.swagger.params.id.value
        global.logger.trace(`Delete ${schemaName}`, id)
        const result = await new Model().delete(id)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchDelete${upperFirst(schemaName)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch delete ${schemaName}`, data)
        const result = await new Model().batchDelete(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }
  }
}

export class BaseChildControllers {
  constructor(fatherName, schemaName, Model) {
    const fullname = `${fatherName}${upperFirst(schemaName)}`

    this[`get${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const id = req.swagger.params.id.value
        global.logger.trace(`Get ${fullname}`, id)
        const object = await new Model().get(id)
        return res.json(object)
      } catch (error) {
        throw error
      }
    }

    this[`batchGet${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch get ${fullname}`, data)
        const result = await new Model().batchGet(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`add${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        const id = req.swagger.params.id.value
        global.logger.trace(`Add new ${fullname}`, data)
        const result = await new Model().push({
          data,
          pkeyValue: id,
        })
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchAdd${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch add new ${fullname}`, data)
        const result = await new Model().batchPush(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`update${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        const id = req.swagger.params.id.value
        global.logger.trace(`Update ${fullname}`, data)
        const result = await new Model().push({
          data,
          pkeyValue: id,
        })
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchUpdate${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch update new ${fullname}`, data)
        const result = await new Model().batchPush(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`delete${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const id = req.swagger.params.id.value
        global.logger.trace(`Delete ${fullname}`, id)
        const result = await new Model().delete(id)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }

    this[`batchDelete${upperFirst(fullname)}`] = async (req, res) => {
      try {
        const data = req.swagger.params.data.value
        global.logger.trace(`Batch delete ${fullname}`, data)
        const result = await new Model().batchDelete(data)
        return res.json(result)
      } catch (error) {
        throw error
      }
    }
  }
}
