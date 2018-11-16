<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>snacks@console : the intuitive browser-based SQL console</title>

  <link rel="apple-touch-icon" sizes="180x180" href="public/static/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="public/static/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="public/static/favicon/favicon-16x16.png">
  <!-- <link rel="manifest" href="public/../static/site.webmanifest"> -->
  <link rel="mask-icon" href="public/static/favicon/safari-pinned-tab.svg" color="#5bbad5">

  <link rel="stylesheet" href="public/css/app.min.css">
</head>

<body>

  <div class="l-workspace">

    <div class="console">
      <div class="console-navbar">
        <span>snacks@console</span> [ <a href="">homepage</a> ] - [ <a href="#show-help" id="help">help ?</a> ] - [ <a href="#about" id="about">about</a> ]
      </div>
      <div class="terminal" id="terminal"></div>
    </div>

    <div class="result is-empty" id="results">
      <div class="result-dummyMessage">
        <h1>USE YOUR MAGIC</h1>
        <h3>QUERIES RESULTS WILL BE SHOWN HERE</h3>
      </div>
    </div>

  </div>

  <script>
    window.username = '<?=$username;?>';
  </script>
  <script src="public/js/bundle.js"></script>
  <script src="public/js/vendor.min.js"></script>
</body>

</html>
