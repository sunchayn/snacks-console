<?php

declare(strict_types=1);

$app->group('/api', function () use ($app) {
    $app->post('/query', 'API\Controllers\Query:index');
    $app->get('/query', 'API\Controllers\Query:index');

    $app->post('/page', 'API\Controllers\Query:page');
    $app->get('/page', 'API\Controllers\Query:page');
});
