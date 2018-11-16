<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>setup - snacks@console</title>

  <link rel="apple-touch-icon" sizes="180x180" href="public/static/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="public/static/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="public/static/favicon/favicon-16x16.png">
  <!-- <link rel="manifest" href="public/../static/site.webmanifest"> -->
  <link rel="mask-icon" href="public/static/favicon/safari-pinned-tab.svg" color="#5bbad5">

  <link rel="stylesheet" href="public/css/app.min.css">
</head>

<body>

  <div class="l-setup">

    <div class="setup-wrapper">
      <div class="setup-introduction">
        <img src="public/static/logo.png" class="setup-logo" alt="snacks db logo">
        <?php if ($error) { ?>
        <h2 class="is-error">Ooops, we could not establish a connection using these credentials</h2>
        <h3>Let's fix them</h3>
        <?php } else { ?>
        <h2>Howdie, it seems that you need to setup your console</h2>
        <h3>Let's do it together</h3>
        <?php } ?>
      </div>


      <div class="boxedForm">
        <!-- <h2 class="boxedForm-heading">Login to your account ( <a href="#">need help ?</a> )</h2> -->
        <form action="<?=$actionRoute;?>" method="POST" class="form">
          
          <div class="form-row">
            <label for="host">>_host</label>
            <input type="text" id="host" placeholder="127.0.0.1 💖" name="host" value="<?=old('host', '');?>">
          </div>

          <div class="form-row">
            <label for="database">>_database</label>
            <input type="text" id="database" placeholder="test" name="database" value="<?=old('database', '');?>">
          </div>

          <div class="form-row">
            <label for="username">>_username</label>
            <input type="text" id="username" placeholder="root ?" name="username" value="<?=old('username', '');?>">
          </div>

          <div class="form-row">
            <label for="password">>_password</label>
            <input type="password" id="password" placeholder="our secret" name="password">
          </div>

          <input type="submit" class="button boxedForm-submit" value="SETUP">

        </form>
      </div>
    </div>
  
  </div>


<!--   <script src="public/js/bundle.js"></script>
  <script src="public/js/vendor.min.js"></script> -->
</body>

</html>
