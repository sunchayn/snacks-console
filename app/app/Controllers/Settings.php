<?php

declare(strict_types=1);

namespace APP\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Settings
{
    public function __construct($container)
    {
        $this->container = $container;
    }

    public function index(Request $request, Response $response)
    {
        $username = $this->container['config']->get('database.drivers.mysql.username');

        ob_start();
        include VIEWS.'settings.php';
        $view = ob_get_contents();
        ob_end_clean();

        $response->write($view);

        return $response;
    }
}
