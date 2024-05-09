const { assert } = require("../../../../core/api-utils")
const { getProperties } = require("./getProperties")
const { getList } = require("./getList")
const { getMeasure } = require("./getMeasure")
const { getDistribution } = require("./getDistribution")
const { renderDataview } = require("../view/renderDataview")

const dataviewAction = async ({ req }, context, db, renderer) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const where = (req.query.where) ? req.query.where : null
    const order = (req.query.order) ? req.query.order : null
    const limit = (req.query.limit) ? req.query.limit : 1000
    let columns = Object.keys(context.config[`${entity}/list/${view}`].properties)

    const whereParam = (where != null) ? where.split("|") : []

    let orderArray = null
    if (order != null) {
        orderArray = {}
        for (let orderer of order.split(",")) {
            let propertyId, direction
            if (orderer[0] == "-") {
                propertyId = orderer.substring(1)
                direction = "DESC"
            }
            else {
                propertyId = orderer
                direction = "ASC"
            }
            orderArray[propertyId] = direction    
        }    
    }

    let listConfig = context.config[`${entity}/list/${view}`]
    const propertyDefs = listConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, whereParam)
    const propertyList = []
    for (let propertyId of properties) {
        const property = properties[propertyId]
        if (property.type != "tags") propertyList.push(propertyId)
    }

    let major = false
    if (order != null) {
        major = order.split(",")[0]
        if (major.charAt(0) == "-") major = major.substring(1)
    }

    if (!columns) columns = propertyList
    columns = columns.concat(["id"])

    const data = await getList(db, context, entity, view, columns, properties, whereParam, order, limit)
    const measure = (listConfig.measure) ? await getMeasure(db, context, entity, view, listConfig.measure, whereParam) : false
    const distribution = (major) ? await getDistribution(db, context, entity, view, major, properties, whereParam) : false
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        property.distribution = await getDistribution(db, context, entity, view, propertyId, properties, whereParam)
    }

    const listRenderer = renderer.retrieve((context.config[`${entity}/list/${view}`].view) ? context.config[`${entity}/list/${view}`].view : "renderDataview")
    return listRenderer(context, entity, view, data, order, limit, measure, distribution, properties)
}

module.exports = {
    dataviewAction,
}