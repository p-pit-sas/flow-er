
const renderTableHead = (context, properties, major, dir) => {

    const head = []
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        head.push(`<th>
            
              <span>${context.localize(property.labels)}</span>

              ${(major == propertyId) ? `<i class="fas fa-caret-${(dir == "ASC") ? "up" : "down"}"></i>` : ""}
        </th>`)
    }
    return head.join("\n")
}

const renderRows = (context, listConfig, properties, rows) => {

    const result = []

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]

        const listCheckIds = []
        if (listConfig.checkIds) {
            for (let checkId of listConfig.checkIds) {
                listCheckIds.push(`<input type="hidden" class="listCheckId-${row.id}" id="listCheckId-${row.id}-${checkId}" value="${row[checkId]}"></input>`)
            }
        }

        const renderProperties = () => {

            const html = []

            for (let propertyId of Object.keys(properties)) {
                const property = properties[propertyId]
                if (property.type == "select") {
                    html.push(`<td class="${(property.options.class) ? property.options.class[row[propertyId]] : ""}">${context.localize(property.modalities[row[propertyId]])}</td>`)
                }
                
                else if (property.type == "multiselect") {
                    const captions = []
                    for (let modalityId of row[propertyId].split(",")) {
                        captions.push(context.localize(property.modalities[modalityId]))
                    }
                    html.push(`<td>${captions.join(",")}</td>`)                  
                }

                else if (property.type == "date") {
                    html.push(`<td>${context.decodeDate(row[propertyId])}</td>`)
                }
              
                else if (property.type == "datetime") {
                    html.push(`<td>${context.decodeTime(row[propertyId])}</td>`)
                }

                else if (property.type == "email") {
                    html.push(`<td><a href="mailto:${row[propertyId]}">${row[propertyId]}</a></td>`)
                }              

                else if (property.type == "phone") {
                    html.push(`<td><a href="tel:${row[propertyId]}">${row[propertyId]}</a></td>`)
                }

                else if (property.type == "tags") {
                    html.push(`<td class="listTagsName" id="listTagsName-${propertyId}-${row.id}">${row[propertyId]}</td>`)
                }

                else {
                    html.push(`<td>${row[propertyId]}</td>`)                  
                }
            }
            return html.join("\n")
        }

        result.push(`
        <tr>
            <td>
                <input type="checkbox" class="listCheck" id="listCheck-${row.id}-${i}"></input>
                ${listCheckIds.join("\n")}
            </td>

            <td style="text-align: center">
              <div class="input-group input-group-sm">
                <button type="button" class="btn btn-sm btn-outline-primary index-btn listDetailButton" title="${context.translate("Detail")}" id="listDetailButton-${row.id}">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </td>

            ${renderProperties()}
        </tr>`)
    }

    return result.join("\n")
}

const renderList = (context, entity, tab, rows, orderParam, limit) => {

    const listConfig = context.config[`${entity}/list/${tab}`]
    const properties = {}
    for (let propertyId of Object.keys(listConfig.properties)) {
        const options = listConfig.properties[propertyId]
        let property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]
        properties[propertyId] = property
        properties[propertyId].options = options 
        if (properties[propertyId].options.modalities) listModalities.push({ propertyId: properties[propertyId].options.modalities }) 
    }

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

    let sum = 0, distribution = {}, indicator, labelType, label, average

    const majorProperty = properties[major]
    if (majorProperty.options.distribution) {
        indicator = majorProperty.options.distribution
        labelType = "data"
    }
    else if (["select", "multiselect"].includes(majorProperty.type)) {
        indicator = major
        labelType = "text"
    }
    else indicator = null

    for (let row of rows) {
        if (majorProperty.type == "number") sum += row[major]
        else if (indicator) {
            const values = row[indicator].split(",")
            for (let value of values) {
                if (labelType == "text") label = (row[major]) ? context.localize(majorProperty.modalities[row[major]]) : ""
                else label = row[major]
                if (!distribution[value]) distribution[value] = [label, 0]
                distribution[value][1]++    
            }
        }
    }
    average = (rows.length > 0) ? Math.round(sum / rows.length * 10) / 10 : null

    const renderDistribution = () => {

        const renderSelectOption = () => {
            const options = []
            for (let modality of Object.keys(distribution)) {
                const { label, value } = distribution[modality]
                options.push(`<option value="${modality}">${label}</option>`)
            }
            return options.join("\n")
        }

        const renderModalitySpan = () => {
            const spans = []
            for (let modality of Object.keys(distribution)) {
                const { label, value } = distribution[modality]
                spans.push(`<span class="distributionAnchor" id="distribution-${modality}">${value}&nbsp;/&nbsp;${rows.length}&nbsp;=&nbsp;${(value / rows.length * 100).toFixed(1)}%</span>`)
            }
            return spans.join("\n")
        }

        const html = []
        for (let propertyId of Object.keys(properties)) {
            if (propertyId == major) {
                html.push(`
                <th>
                    ${context.translate("Number")}:&nbsp;${rows.length}<br>
                    ${(sum) ? `${context.translate("Sum")}:&nbsp;${sum}<br>` : ""}
                    ${(average) ? `${context.translate("Average")}:&nbsp;${average}`: ""}
                    ${(Object.keys(distribution).length != 0) ? `<select class="form-control px-0 py-0 my-0" id="distributionSelect">
        
                        ${renderSelectOption()}

                    </select>

                    ${renderModalitySpan()}` : ""}
                </th>`)
            }
            else html.push("<th/>")
        }
        return html.join("\n")
    }

    return `
    <style>
    table td { 
        font-size: 0.9rem;
    }
    </style>

    <div class="row">
        <div class="table-responsive">
            <div class="col-md-12">
                <form class="was-validated" id="ListForm">

                    <table class="table table-sm table-hover">
                        <thead>
                            <th colspan="2">
                                <a type="button" class="btn btn-sm sort_anchor" role="button">
                                    <b id="listCount">${rows.length}</b>
                                </a>
                            </th>
                            ${renderTableHead(context, properties, major, dir)}

                        </thead>

                        <input type="hidden" id="caption_0" value="${context.translate("Add")}" />
                        <tr>
                            <td>
                              <input type="checkbox" class="listCheckAll" data-toggle="tooltip" data-placement="top" title="${context.translate("Check all")}"></input>
                            </td>

                            <td style="text-align: center">
                                <div class="input-group input-group-sm">
                                    <button type="button" class="btn btn-sm btn-outline-primary index-btn listDetailButton" title="${context.translate("Add")}" id="listDetailButton-0">
                                        <span class="fas fa-plus"></span>
                                    </button>
                                </div>
                            </td>

                            <td colspan="${Object.keys(properties).length + 2}"></td>
                        </tr>

                        <input type="hidden" id="listCount" value="${rows.length}" />

                        ${renderRows(context, listConfig, properties, rows)}

                        <tr>
                            <td>
                                <input type="checkbox" class="listCheckAll" title="${context.translate("Check all")}"></input>
                            </td>

                            <td style="text-align: center">
                                <div class="input-group input-group-sm">
                                    <button type="button" class="btn btn-sm btn-outline-primary index-btn listGroupButton" data-toggle="tooltip" data-placement="top" title="${context.translate("Grouped actions")}" id="listGroupButton-1">
                                        <span class="fas fa-list"></span>
                                    </button>
                                </div>
                            </td>

                            ${(rows.length == limit) ?`<td style="text-align: center">
                                <div class="input-group input-group-sm">
                                    <button type="button" class="btn btn-sm btn-outline-primary listMoreButton" data-toggle="tooltip" data-placement="top" title="${context.translate("Display the entire list")}">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </button>
                                </div>
                            </td>` : "<td>&nbsp;</td>"}

                            <td colspan="${Object.keys(properties).length}" />
                        </tr>

                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            ${renderDistribution()}
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    </div>`
}

module.exports = {
    renderList
}
