const { noCacheMiddleware, notFoundMiddleware, handleCorsMiddleware } = require("../../core/api-utils")
const { registerUser } = require("./server/controller/index")
const { registerUserUnitTest } = require("./unitTest")

const register = async ({ context, config, logger, app }) => {

    app.use(`${config.prefix}/*`, noCacheMiddleware)
    app.use(`${config.prefix}/*`, handleCorsMiddleware)

    registerUser({ context, config, logger, app })
    registerUserUnitTest({ context, config, logger, app })

    // fallback : send 404
    app.use(`${config.prefix}/`, notFoundMiddleware)
}

module.exports = {
    register
}