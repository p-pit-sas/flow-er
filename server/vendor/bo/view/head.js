
const renderHead = () => {
    return `
    <head>
      <title><?php echo $context->localize($tab['labels']) ?></title>
      <meta charset="utf-8">
      <meta name="robots" content="noindex, nofollow">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <!--<link rel="stylesheet" href="/flow-er/bootstrap-4.3.1-dist/css/bootstrap.min.css">-->
      <!--<link rel="stylesheet" href="/flow-er/bootstrap-select-1.13.1/dist/css/bootstrap-select.min.css">-->
      <link rel="stylesheet" href="/flow-er/jquery-ui-1.13.2/jquery-ui.css">
      <link rel="stylesheet" href="/flow-er/jquery.timepicker/jquery.timepicker.css">
      <link rel="stylesheet" href="/flow-er/toastr/build/toastr.min.css" rel="stylesheet" />
      <link rel='stylesheet' href="/flow-er/json-viewer/jquery.json-viewer.css" />
      <link rel='stylesheet' href="/flow-er/fullcalendar/fullcalendar.css" />
    
    <style>
    .chip {
      display: inline-block;
      padding: 0 10px;
      height: 25px;
      font-size: 11px;
      line-height: 25px;
      border-radius: 25px;
    }
    </style>
    
    </head>`
}

module.exports = {
    renderHead
}
