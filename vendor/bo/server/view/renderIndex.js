
const { renderCore } = require("./renderCore")

const renderIndex = ({ context, entity, view }, data) => {

    const user = data.user, tab = data.tab, indexConfig = data.indexConfig

    return `<!DOCTYPE html>
    <html lang="fr" ${ (tab.darkMode) ? "data-bs-theme=\"dark\"" : "" }>
    
    <!-- Head -->
    <head><title>${context.localize(tab.labels)}</title>
        <meta charset="utf-8">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link href="/bo/cli/resources/bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.css">
        <link rel="stylesheet" href="/bo/cli/resources/jquery.timepicker/jquery.timepicker.css">
        <link rel="stylesheet" href="/bo/cli/resources/toastr/build/toastr.min.css" rel="stylesheet" />
        <link rel='stylesheet' href="/bo/cli/resources/json-viewer/jquery.json-viewer.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fullcalendar/fullcalendar.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/fontawesome.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/brands.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/solid.css" />
          
        <style>
        .chip {
            display: inline-block;
            padding: 0 10px;
            height: 25px;
            font-size: 11px;
            line-height: 25px;
            border-radius: 25px;
        }

        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
        }

        /* Recommended icon sizes */
        span.size-20 {
            font-size: 20px;
            font-variation-settings: 'OPSZ' 20;
        }
        span.size-24 {
            font-size: 24px;
            font-variation-settings: 'OPSZ' 24;
        }
        span.size-40 {
            font-size: 40px;
            font-variation-settings: 'OPSZ' 40;
        }
        span.size-48 {
            font-size: 48px;
            font-variation-settings: 'OPSZ' 48;
        }

        /* Rules for using icons as black on a light background. */
        .dark {
            background: black;
            color: rgba(255, 255, 255, 1);
            font-variation-settings: 'GRAD' -25;
        }
        .dark-inactive {
            background: black;
            color: rgba(255, 255, 255, 0.3);
            font-variation-settings: 'GRAD' -25;
        }
        </style>
    </head>
    
    <body></body>

    <!-- Scripts -->
    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/popper/popper.min.js"></script>
    <script src="/bo/cli/resources/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="/bo/cli/resources/toastr/build/toastr.min.js"></script>
    <script src="/bo/cli/resources/json-viewer/jquery.json-viewer.js"></script>

    <script>
    $.datepicker.regional['fr'] = {
        prevText: "${context.translate("Previous")}",
        nextText: "${context.translate("Next")}",
        monthNames: [
            "${context.translate("January")}",
            "${context.translate("February")}",
            "${context.translate("March")}",
            "${context.translate("April")}",
            "${context.translate("May")}",
            "${context.translate("June")}",
            "${context.translate("July")}",
            "${context.translate("August")}",
            "${context.translate("September")}",
            "${context.translate("October")}",
            "${context.translate("November")}",
            "${context.translate("December")}"
        ],
        dayNamesMin: [
            "${context.translate("Su")}",
            "${context.translate("Mo")}",
            "${context.translate("Tu")}",
            "${context.translate("We")}",
            "${context.translate("Th")}",
            "${context.translate("Fr")}",
            "${context.translate("Sa")}"
        ],
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        yearSuffix: ""
    }
    
    ${(user.locale.substring(0, 2) == "fr") ? "$.datepicker.setDefaults($.datepicker.regional[\"fr\"])" : ""}
    </script>
    
    <!-- Flow-ER -->
    ${ renderCore({ context, entity, view }, data) }

    <!-- FullCalendar -->
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>
    <script src="/bo/cli/resources/fullcalendar-6.1.15/dist/index.global.min.js"></script>

    <!-- ZingChart -->
    <script src="/bo/cli/resources/zingchart/zingchart.min.js"></script>

    <!-- Pluggable renderers by index config -->
    <script src="/bo/cli/bootstrap/renderHeader.js"></script>
    <script src="/bo/cli/bootstrap/renderBody10.js"></script>
    <script src="/bo/cli/bootstrap/renderBody12.js"></script>
    <script src="/bo/cli/bootstrap/renderCalendar.js"></script>
    <script src="/bo/cli/bootstrap/renderChart.js"></script>
    <script src="/bo/cli/bootstrap/renderMenu.js"></script>
    <script src="/bo/cli/bootstrap/renderFooter.js"></script>
    <script src="/bo/cli/bootstrap/renderShortcuts.js"></script>
    <script src="/bo/cli/bootstrap/renderSearch.js"></script>
    <script src="/bo/cli/bootstrap/renderListHeader.js"></script>
    <script src="/bo/cli/bootstrap/renderList.js"></script>
    <script src="/bo/cli/bootstrap/renderColumns.js"></script>

    <!-- Alternative renderers by design block -->

    <script src="/bo/cli/controller/fullcalendarCallback.js"></script>
    <script src="/bo/cli/controller/zingchartCallback.js"></script>

    <script>
    const bodyRenderer = ${ (indexConfig && indexConfig.bodyRenderer) ? indexConfig.bodyRenderer : "renderBody12" }
    const searchRenderer = ${ (indexConfig && indexConfig.searchRenderer) ? indexConfig.searchRenderer : "renderListHeader" }
    const searchCallback = ({ context, entity, view }) => {}
    const listCallback = ({ context, entity, view }) => {}
    const calendarCallback = fullcalendarCallback
    const chartCallback = zingchartCallback
    const listRenderer = ${ (indexConfig && indexConfig.listRenderer) ? indexConfig.listRenderer : "renderList" }
    loadPage({ entity: "${entity}", view: "${view}" })
    </script>

    </html>`
}

module.exports = {
    renderIndex
}
