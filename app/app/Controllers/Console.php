<?php declare(strict_types = 1);

namespace APP\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class Console
{
    public function __construct($container)
    {
        $this->container = $container;
    }

    public function index(Request $request, Response $response)
    {
        $driver = $this->container['config']->get('database.driver');
        $host = $this->container['config']->get('database.drivers.mysql.host');
        $database = $this->container['config']->get('database.drivers.mysql.database');
        $username = $this->container['config']->get('database.drivers.mysql.username');
        $password = $this->container['config']->get('database.drivers.mysql.password');

        if (!testDatabaseConnectivity($driver, $host, $database, $username, $password)) {
            return $response->withHeader('Location', resolveRoute('setup'));
        }

        $username = $this->container['config']->get('database.drivers.mysql.username');

        ob_start();
        include(VIEWS . 'index.php');
        $view = ob_get_contents();
        ob_end_clean();

        $response->write($view);

        return $response;
    }
}
