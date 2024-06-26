const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient2 } = require("../../../utils/db-client")
const { getModel } = require("../model/index")
const { getDBConfig } = require("../../../../vendor/studio/server/controller/getDBConfig")

const { getAction } = require("./getAction")
const { postAction } = require("./postAction")

const { shortcutsAction } = require("./shortcutsAction")
const { searchAction } = require("./searchAction")
const { listHeaderB5Action } = require("./listHeaderB5Action")
const { dataviewAction } = require("./dataviewAction")
const { listHeaderAction } = require("./listHeaderAction")
const { listRowsAction } = require("./listRowsAction")
const { listAction } = require("./listAction")
const { columnsAction } = require("./columnsAction")
const { addAction, postAddAction } = require("./addAction")
const { detailAction } = require("./detailAction")
const { updateAction, postUpdateAction } = require("./updateAction")
const { historyAction } = require("./historyAction")
const { apiAction } = require("./apiAction")
const { formAction, postFormAction } = require("./formAction")
const { configShortcutsAction, postConfigShortcutsAction } = require("./configShortcutsAction")

const { renderIndex } = require("../view/renderIndex")
const { renderIndexB5 } = require("../view/renderIndexB5")
const { renderSearch } = require("../view/renderSearch")
const { renderSearchB5 } = require("../view/renderSearchB5")
const { renderDataview } = require("../view/renderDataview")
const { renderDataviewB5 } = require("../view/renderDataviewB5")
const { renderListHeaderB5 } = require("../view/renderListHeaderB5")
const { renderList } = require("../view/renderList")
const { renderCalendar } = require("../view/renderCalendar")
const { renderChart } = require("../view/renderChart")

const registerBo = async ({ context, config, logger, app, renderer }) => {
    const model = await getModel(config, context)
    const db = model.db
    if (context.config.studio.mode == "staging") {
        getDBConfig(context, model)
    }
    const execute = executeService(config, logger)
    const upload = multer()
    registerViews(renderer)
    app.use(upload.array())
    app.get(`${config.prefix}config`, execute(() => { return JSON.stringify(context.config) }))
    app.get(`${config.prefix}language`, execute(() => { return JSON.stringify(context.translations) }))
    app.get(`${config.prefix}user`, execute(() => { return JSON.stringify(context.user) }))
    app.get(`${config.prefix}index/:entity`, execute(index, context, db, renderer))
    app.get(`${config.prefix}shortcuts/:entity`, execute(shortcutsAction, context, db))
    app.get(`${config.prefix}search/:entity`, execute(searchAction, context, db, renderer))
    app.get(`${config.prefix}listHeaderB5/:entity`, execute(listHeaderB5Action, context, db, renderer))
    app.get(`${config.prefix}dataview/:entity`, execute(dataviewAction, context, db, renderer))
    app.get(`${config.prefix}listHeader/:entity`, execute(listHeaderAction, context, db, renderer))
    app.get(`${config.prefix}listRows/:entity`, execute(listRowsAction, context, db, renderer))
    app.get(`${config.prefix}list/:entity`, execute(listAction, context, db))
    app.get(`${config.prefix}columns/:entity`, execute(columnsAction, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detailAction, context, db))
    app.get(`${config.prefix}add/:entity`, execute(addAction, context, db))
    app.post(`${config.prefix}add/:entity`, execute(postAddAction, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(updateAction, context, db))
    app.post(`${config.prefix}update/:entity/:id`, execute(postUpdateAction, context, db))
    app.get(`${config.prefix}history/:entity/:id`, execute(historyAction, context, db))
    app.get(`${config.prefix}api/:entity`, execute(apiAction, context, db)) // Deprecated
    app.get(`${config.prefix}form/:entity`, execute(formAction, context, db))
    app.post(`${config.prefix}form/:entity`, execute(postFormAction, context, db))
    app.get(`${config.prefix}configShortcuts/:entity/:id`, execute(configShortcutsAction, context, db))
    app.post(`${config.prefix}configShortcuts/:entity/:id`, execute(postConfigShortcutsAction, context, db))

    app.get(`${config.prefix}v1/:entity/:view`, execute(getAction, context, db))
    app.post(`${config.prefix}v1/:entity`, execute(postAction, context, db))
    // app.post(`${config.prefix}v1/:entity/:id`, execute(postAction, context, db))
    // app.delete(`${config.prefix}v1/:entity/:id`, execute(deleteAction, context, db))
}

const index = async ({ req }, context, db, renderer) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const indexConfig = context.config[`${entity}/index/${view}`]
    const data = { where: (indexConfig && indexConfig.where) ? indexConfig.where : "", order: (indexConfig && indexConfig.order) ? indexConfig.order : "", limit: (indexConfig && indexConfig.limit) ? indexConfig.limit : 1000 }
    const indexRenderer = renderer.retrieve((indexConfig && indexConfig.view) ? indexConfig.view : "renderIndexB5")
    return indexRenderer(context, entity, view, data)
}

const registerViews = (renderer) => {
    renderer.register("renderIndex", renderIndex)
    renderer.register("renderIndexB5", renderIndexB5)
    renderer.register("renderSearch", renderSearch)
    renderer.register("renderSearchB5", renderSearchB5)
    renderer.register("renderDataview", renderDataview)
    renderer.register("renderDataviewB5", renderDataviewB5)
    renderer.register("renderListHeaderB5", renderListHeaderB5)
    renderer.register("renderList", renderList)
    renderer.register("renderCalendar", renderCalendar)
    renderer.register("renderChart", renderChart)
}

module.exports = {
    registerBo
}