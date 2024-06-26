const { renderListHeaderB5 } = require("./renderListHeaderB5")
const { renderList } = require("./renderList")

const renderDataviewB5 = (context, entity, view, rows, orderParam, limit, measure, listConfig, properties) => {

    return `<style>
    table td { 
        font-size: 0.9rem;
    }
    </style>
    <div class="row">
        <div class="table-responsive">
            <div class="col-md-12">
                <table class="table table-sm table-hover" id="listPanel">
                    ${ renderListHeaderB5(context, entity, view, measure, orderParam, properties) }
                    <input type="hidden" id="listCount" value="${rows.length}" />
                    <tbody class="table-group-divider" id=\"listTbody\">
                        ${ renderList(context, entity, view, rows, orderParam, limit, listConfig, properties) }
                    </tbody>
                </table>
            </div>
        </div>
    </div>`
}

module.exports = {
    renderDataviewB5
}
