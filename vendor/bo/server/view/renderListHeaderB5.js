const renderListHeaderB5 = (context, entity, view, measure, orderParam, properties) => {

    const listConfig = context.config[`${entity}/list/${view}`]

    let major = "n_last", dir = "ASC"
    if (orderParam) {
        for (let orderer of orderParam.split(",")) {
            if (orderer.charAt(0) == "-") {
                major = orderer.substring(1)
                dir = "DESC"
            }
            else major = orderer
            break
        }    
    }

    let measureValues = (measure) ? Object.values(measure) : false, count = (measure) ? measureValues[0] : false, sum = (measure) ? parseFloat(measureValues[1]) : false
    const average = (sum && count) ? Math.round(sum / count * 10) / 10 : false

    const renderSelectOption = (propertyId) => {
        const property = properties[propertyId]
        const options = []
        for (let modality of Object.keys(property.distribution)) {
            const { code, value } = property.distribution[modality]
            let label
            if (["select"].includes(property.type)) label = context.localize(property.modalities[code])
            else if (property.type == "date") label = context.decodeDate(code)
            else if (property.type == "number") label = parseFloat(code).toLocaleString("fr-FR")
            else label = code
            options.push(`<option value="${modality}" title="${ (modality) ? label : "Vide" } (${value})">${ (modality) ? label : "Vide" } (${value})</option>`)
        }
        return options.join("\n")
    }

    const head = [`<thead class="table-light">
    <th>
        <div class="text-center">
            <small>
                <b id="listCount" title="Nombre de lignes">${count}</b>
                ${ (sum) ? `<br><b id="listCount" title="Somme">${sum.toLocaleString("fr-FR")}</b>` : "" }
                ${ (average) ? `<br><em id="listAverage" title="Moyenne">${average.toLocaleString("fr-FR")}</em>`: "" }
            </small>
        </div>
    </th>
    <th class="text-center">
        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="tooltip" title="${context.translate("Refresh the list")}" id="flRefreshButton">
            <i class="fas fa-sync-alt"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="tooltip" title="${context.translate("Cancel the filters")}" id="flEraseButton">
            <i class="fas fa-times"></i>
        </button>
    </th>`]
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        const forms = []
        if (["select", "tag"].includes(property.type)) {
            forms.push(`<select class="form-select form-select-sm px-0 searchInput searchInputSelect" size="${ Math.min(4, Object.keys(property.distribution).length) }" id="search-${propertyId}" multiple>${renderSelectOption(propertyId)}</select>`)
        }
        else if (["input", "email", "phone", "source"].includes(property.type)) {
            forms.push(`<input type="text" class="form-control form-control-sm searchInput" list="searchDatalistOptions-${propertyId}" id="search-${propertyId}" />
                <datalist id="searchDatalistOptions-${propertyId}">
                <option value="San Francisco">
                <option value="New York">
                <option value="Seattle">
                <option value="Los Angeles">
                <option value="Chicago">
            </datalist>`)
        }
        else if (["date", "datetime"].includes(property.type)) {
            forms.push(`<input type="text" class="form-control form-control-sm searchInput searchInputDate searchInputDateMin" id="searchMin-${propertyId}" placeholder="${context.translate("Min")}" />`)
            forms.push(`<input type="text" class="form-control form-control-sm searchInput searchInputDate searchInputDateMax" id="searchMax-${propertyId}" placeholder="${context.translate("Max")}" />`)
        }
        else if (["time", "number"].includes(property.type)) {
            forms.push(`<input type="text" class="form-control form-control-sm searchInput searchInputNumber searchInputNumberMin" id="searchMin-${propertyId}" placeholder="${context.translate("Min")}" />`)
            forms.push(`<input type="text" class="form-control form-control-sm searchInput searchInputNumber searchInputNumberMax" id="searchMax-${propertyId}" placeholder="${context.translate("Max")}" />`)
        }

        head.push(`<th>
            <div data-bs-toggle="collapse" href="#listSortCollapse-${propertyId}" role="button" id="listSortAnchor-${propertyId}" aria-expanded="false" aria-controls="listSortCollapse-${propertyId}">
                <span class="listHeaderLabel" id="listHeaderLabel-${propertyId}">${ context.localize(property.labels) }</span>
                <i class="fa fa-filter listHeaderIcon" id="listHeaderIcon-${propertyId}"></i>
            </div>
            <div class="collapse" id="listSortCollapse-${propertyId}">
                ${ forms.join("") }
            </div>
        </th>`)
    }
    head.push("</thead>")
    return head.join("\n")
}

module.exports = {
    renderListHeaderB5
}
