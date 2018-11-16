<?php declare(strict_types = 1);

namespace API\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \API\Helpers\DataManager as DataManager;

class Query
{
    public function __construct($container)
    {
        $this->container = $container;
    }

    public function index(Request $request, Response $response, $page = 1)
    {

        // $query = $request->getParsedBodyParam('query', 'select * from products');
        $query = $request->getParsedBodyParam('query', 'use senda');
        $DataManager = new DataManager($query, $this->container, $page);

        if ($DataManager->isError()) {
            return $response->withJson($DataManager->getErrorData(), 200);
        }

        $data = [];

        if ($DataManager->isFetching()) {
            $data['fetching'] = true;
            $fetchedData = $DataManager->paginator->getCurrentItems();
            $data['count'] = $DataManager->paginator->getTotalItem();
            $data['currentPage'] = $DataManager->paginator->getCurrentPage();
            $data['totalPages'] = $DataManager->paginator->getTotalPages();
            $data['rowsPerPage'] = $DataManager->paginator->getRowsPerPage();
            $data['message'] = $data['count'] . ' rows has been returned.';
            $data['columns'] = isset($fetchedData[0]) ? array_keys($fetchedData[0]) : [];
            $data['rows'] = $fetchedData;
        } else {
            if ($DataManager->getCustomMessage() !== false) {
                $data['message'] = $DataManager->getCustomMessage();
            } else {
                $data['message'] = 'the query has been successfully performed !';
            }
        }

        // sleep(5);
        //
        // $data = [];

        return $response->withJson($data, 200);
    }

    public function page(Request $request, Response $response)
    {
        $query = $request->getParsedBodyParam('query', 'select * from products');
        $page = $request->getParsedBodyParam('page', 1);

        $db = $this->container->db;
        $DataManager = new DataManager($query, $this->container, $page);
        $fetchedData = $DataManager->paginator->getCurrentItems();
        $data['currentPage'] = $DataManager->paginator->getCurrentPage();
        $data['rows'] = $fetchedData;

        // sleep(5);

        return $response->withJson($data, 200);
    }
}
