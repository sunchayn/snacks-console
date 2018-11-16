<?php
declare(strict_types = 1);

require ROOT . '/vendor/autoload.php';

require __DIR__ . '/../app/functions.php';


$configuration = require(ROOT . '/core/config/slim.php');

$app = new \Slim\App(['settings' => $configuration ]);

define('VIEWS', __DIR__ . '/../views/');

require(__DIR__ . '/dependencies.php');
require(ROOT . '/core/routes/app.php');

$app->run();
