<?php

declare(strict_types=1);

require ROOT.'/vendor/autoload.php';
$configuration = require ROOT.'/core/config/slim.php';

$app = new \Slim\App(['settings' => $configuration]);

require __DIR__.'/dependencies.php';
require ROOT.'/core/routes/api.php';

$app->run();
