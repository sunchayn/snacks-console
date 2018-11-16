<?php

declare(strict_types=1);

namespace APP\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Setup
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

        if (testDatabaseConnectivity($driver, $host, $database, $username, $password)) {
            return $response->withHeader('Location', resolveRoute('home'));
        }

        $actionRoute = resolveRoute('setup');
        $messages = $this->container['flash']->getMessages();
        $error = false;

        if (isset($messages['error'])) {
            $error = true;
        }

        ob_start();
        include VIEWS.'setup.php';
        $view = ob_get_contents();
        ob_end_clean();

        $response->write($view);

        return $response;
    }

    public function update(Request $request, Response $response)
    {
        $driver = $this->container['config']->get('database.driver');

        $inputs = $request->getParsedBody();

        $host = $inputs['host'];
        $database = $inputs['database'];
        $username = $inputs['username'];
        $password = $inputs['password'];

        // to avoid a strange behaviour the PDO's class make which is not throwing an exepction when the host is empty.
        // TO-DO: figure out what cause the problem really !
        if (!$host) {
            $host = '0.0.0.0';
        }

        if (!testDatabaseConnectivity($driver, $host, $database, $username, $password)) {
            $this->container['flash']->addMessage('error', true);
            $this->container['flash']->addMessage('old', $inputs);

            return $response->withHeader('Location', resolveRoute('setup'));
        }

        $this->container['config']->set('database.drivers.mysql.host', $host, true);
        $this->container['config']->set('database.drivers.mysql.database', $database, true);
        $this->container['config']->set('database.drivers.mysql.username', $username, true);
        $this->container['config']->set('database.drivers.mysql.password', $password, true);

        $this->container['config']->sync('database');

        return $response->withHeader('Location', resolveRoute('home'));
    }
}
