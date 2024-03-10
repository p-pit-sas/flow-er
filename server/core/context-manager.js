const path = require("path")
const fs = require("fs")
const { loadConfig } = require("./config-manager")

const loadContext = (settings, logger) => {

    const middlewares = settings.server.middlewares
    if (!middlewares) {
        return
    }

    const roles = ["sales_manager"]
    const locale = "fr_FR"
    const translations = loadTranslations(middlewares, locale)
    const config = loadAppConfig(middlewares)

    const context = {

        instanceCaption: "flow-er.fr",
        formattedName: "LARTILLOT, Bruno",
        roles: roles,
        locale: locale,

        config: config,
        translations: translations,

        localize: (str) => {
            if (str[locale]) return str[locale]
            else return str.default
        },

        translate: (str) => {
            if (translations[locale][str]) {
                return translations[locale][str]
            }
            else return str
        },

        isAllowed: (route) => {
            if (config.guard[route]) {
                for (let role of roles) {
                    if (config.guard[route].roles.includes(role)) return true
                }
                return false
            }
            else return false
        }
    }

    return context
}

const loadAppConfig = middlewares => {
    const appConfig = {}
    for (let key of Object.keys(middlewares)) {
        if (fs.existsSync(`${middlewares[key].dir}/config`)) {
            const fileNames = fs.readdirSync(`${middlewares[key].dir}/config`)
            for (let fileName of fileNames) {
                const configFile = loadConfig(`${middlewares[key].dir}/config/${fileName}`)
                for (let key of Object.keys(configFile)) {
                    if (appConfig[key]) {
                        for (let subkey of Object.keys(configFile[key])) {
                            appConfig[key][subkey] = configFile[key][subkey]
                        }
                    }
                    else appConfig[key] = configFile[key]
                }    
            }
        }
    }
    return appConfig
}

const loadTranslations = (middlewares, locale) => {
    const translations = {}
    translations[locale] = {}
    for (let key of Object.keys(middlewares)) {
        if (fs.existsSync(`${middlewares[key].dir}/language/${locale}.json`)) {
            const lang = JSON.parse(fs.readFileSync(`${middlewares[key].dir}/language/${locale}.json`, "utf8"))
            for (let key of Object.keys(lang)) {
                translations[locale][key] = lang[key]
            }
        }
    }
    return translations
}

module.exports = {
    loadContext
}
