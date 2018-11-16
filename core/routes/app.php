<?php

declare(strict_types=1);

$app->get('/', 'APP\Controllers\Console:index')->setName('home');

$app->get('/settings', 'APP\Controllers\Settings:index');

$app->get('/setup', 'APP\Controllers\Setup:index')->setName('setup');
$app->post('/setup', 'APP\Controllers\Setup:update');
