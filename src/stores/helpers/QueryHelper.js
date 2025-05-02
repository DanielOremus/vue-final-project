class QueryHelper {
  static search(fieldValue) {
    return fieldValue.trim()
  }
  static range(fieldValue) {
    const [min, max] = fieldValue
    const rangeArr = []
    if (min) rangeArr.push(`gte:${min}`)
    if (max) rangeArr.push(`lte:${max}`)
    return rangeArr
  }
  static list(fieldValue) {
    if (fieldValue.length > 0) fieldValue = fieldValue.join(",")
    return fieldValue
  }
  static prepareFilterQuery(fieldsConfig, fieldsObj) {
    const query = {}
    for (const fieldConfig of fieldsConfig) {
      const fieldValue = fieldsObj[fieldConfig.fieldName]
      if (fieldValue) {
        query[fieldConfig.queryName] = this[fieldConfig.type](fieldValue)
      }
    }
    return query
  }
  static prepareActionQuery(fieldsObj) {
    const query = {}

    if (fieldsObj.sort) {
      const { field, order } = fieldsObj.sort
      query.sort = `${field}:${order > 0 ? "asc" : "desc"}`
    }
    if (fieldsObj.startPage === Math.abs(fieldsObj.startPage))
      query.page = fieldsObj.startPage
    return query
  }

  static prepareQuery(fieldsConfig, fieldsObj) {
    const filterQuery = this.prepareFilterQuery(fieldsConfig, fieldsObj)
    const actionQuery = this.prepareActionQuery(fieldsObj)

    return { ...filterQuery, ...actionQuery }
  }
}

export default QueryHelper
