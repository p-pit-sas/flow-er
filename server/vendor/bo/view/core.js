const renderCore = () => {
    return `
    <script src="/flow-er/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/flow-er/popper/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!--<script src="/flow-er/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>-->
    <!--<script src="/flow-er/bootstrap-select-1.13.1/dist/js/bootstrap-select.min.js"></script>-->
    <script src="/flow-er/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/flow-er/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="https://kit.fontawesome.com/a57cef3c40.js" crossorigin="anonymous"></script>
    <script src="/flow-er/toastr/build/toastr.min.js"></script>
    <script src="/flow-er/json-viewer/jquery.json-viewer.js"></script>

    <!-- FullCalendar -->
    <script src="/flow-er/moment/moment-with-locales.min.js"></script>
    <script src="/flow-er/fullcalendar/fullcalendar.js"></script>
    
    <!-- ZingChart -->
    <script src="/flow-er/zingchart/zingchart.min.js"></script>

    <!-- Flow-ER -->
    <script src="/flow-er/js/search.js"></script>
    <script src="/flow-er/js/list.js"></script>
    <script src="/flow-er/js/detail.js"></script>

    <script>
    getSearch()
    $('#listPanel').each(getList)
    </script>
    `
}

module.exports = {
    renderCore
}
