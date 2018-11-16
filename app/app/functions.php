<?php

function resolveRoute($name, $args = [])
{
    global $app;
    return $app->getContainer()->get('router')->pathFor($name, $args);
}

function testDatabaseConnectivity($driver, $host, $database, $username, $password)
{
    try {
        $options = [
            \PDO::ATTR_TIMEOUT => 5,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
        ];

        $pdo = new \PDO(
            $driver . ':host=' . $host . ';dbname=' . $database . ';charset=utf8',
            $username,
            $password,
            $options
        );

        return true;
    } catch (\PDOException $e) {
        return false;
    }
}

function old($key, $default = '')
{
    global $app;
    $flash = $app->getContainer()->get('flash')->getMessages();

    return (isset($flash['old'][0][$key])) ? $flash['old'][0][$key] : $default;
}
