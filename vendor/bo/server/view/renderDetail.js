const renderDetail = (context, entity, view, id) => {
    const detailConfig = context.config[`${entity}/detail/${view}`]

    return `<div class="container">
        <ul class="nav nav-tabs">
            ${renderMenu(context, detailConfig, id)}
        </ul>
        ${renderRoutes(context, detailConfig, id)}
        <div id="detailPanel"></div>
    </div>`
}

const renderMenu = function (context, detailConfig, id) {
    console.log(detailConfig)
    let defaultTab = false
    const html = []
    for (let tabId of Object.keys(detailConfig.tabs)) {
        const tab = detailConfig.tabs[tabId]
        if (tab.key == "id" && id != 0 || !tab.key && id == 0) {
            html.push(`<li class="nav-item"><a class="nav-link detailTab ${(!defaultTab) ? "active" : "disabled"}" id="detailTab-${tabId}">${context.localize(tab.labels)}</a></li>`)
            defaultTab = tabId
        }
    }
    html.push(`<input type="hidden" id="defaultTab" value="${defaultTab}">`)
    return html.join("\n")
}

const renderRoutes = (context, detailConfig, id) => {
    const html = []
    for (let tabId of Object.keys(detailConfig.tabs)) {
        const tab = detailConfig.tabs[tabId]
        if (tab.key == "id" && id != 0 || !tab.key && id == 0) {
            if (tab.route) {
                const query = []
                if (tab.query) {
                    for (let key of Object.keys(tab.query)) {
                        let value = tab.query[key]
                        query.push(`${key}=${value}`)
                    }    
                }
                html.push(`<input type="hidden" id="detailTabRoute-${tabId}" value="${tab.route}${ (id != 0) ? `/${id}` : ""}?${query.join("&")}" />
                <input type="hidden" id="detailTabQuery-${tabId}" value="${query}" />`)
            }
        }
    }
    return html.join("\n")
}

module.exports = {
    renderDetail
}