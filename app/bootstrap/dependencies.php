<?php

declare(strict_types=1);
session_start();

$container = $app->getContainer();

$container['config'] = function ($c) {
    return \MazenTouati\Simple2wayConfig\S2WConfigFactory::create(ROOT.'\core\config');
};

$container['db'] = function ($c) {
    $driver = $c['config']->get('database.driver');
    $db = $c['config']->get('database.drivers.mysql');

    $pdo = new PDO(
      $driver.':host='.$db['host'].';dbname='.$db['database'].';charset='.$db['charset'],
      $db['username'],
      $db['password']
  );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    return $pdo;
};

$container['flash'] = function () {
    return new \Slim\Flash\Messages();
};

$container['foundHandler'] = function () {
    return new \Slim\Handlers\Strategies\RequestResponseArgs();
};
