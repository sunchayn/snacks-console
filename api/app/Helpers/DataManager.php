<?php

namespace API\Helpers;

use MazenTouati\Simple2wayConfig\S2WConfigException;

class DataManager
{

  // the query to run
    public $query = '';
    public $queryResult = null;
    //data to return in case of error
    private $error = [];

    public $db = null;
    public $config = null;

    public $paginator = null;
    private $paginatorConfig = [
    'item_per_page' => 25,
    'current_page' => 1
  ];

    private $customMessage = false;

    // query type: fetching, inserting or altering (update, delete)
    private $type = '';
    const TYPE_FETCHING = 'fetching';
    const TYPE_INSERTING = 'inserting';
    const TYPE_ALTERING = 'altering';
    const TYPE_OTHER = 'other';

    public function __construct($query, $container, $currentPage = 1)
    {
        $this->query = $query;
        $this->db = $container->db;
        $this->config = $container->config;
        $this->paginatorConfig['current_page'] = $currentPage;

        $this->determineQueryType();
        $this->runQuery();
    }

    private function determineQueryType()
    {
        if (starts_with($this->query, 'select ')) {
            $this->type = self::TYPE_FETCHING;
        } elseif (starts_with($this->query, 'insert ')) {
            $this->type = self::TYPE_INSERTING;
        } elseif (starts_with($this->query, 'update ') || starts_with($this->query, 'delete ')) {
            $this->type = self::TYPE_ALTERING;
        } else {
            $this->type = self::TYPE_OTHER;
        }
    }

    public function isError()
    {
        return !empty($this->error);
    }

    public function getErrorData()
    {
        return $this->error;
    }

    public function isFetching()
    {
        return $this->type === self::TYPE_FETCHING;
    }

    public function isInserting()
    {
        return $this->type === self::TYPE_INSERTING;
    }

    public function isAltering()
    {
        return $this->type === self::TYPE_ALTERING;
    }

    public function isOther()
    {
        return $this->type === self::TYPE_OTHER;
    }

    public function getCustomMessage()
    {
        return $this->customMessage;
    }

    private function runQuery()
    {
        try {
            if ($this->isFetching()) {
                $this->paginator = new Paginator($this->query, $this->paginatorConfig, $this->db);
            } else {
                if ($this->runSpecialQueries() === false) {
                    $this->queryResult = $this->db->query($this->query);
                }
            }
        } catch (\PDOException $e) {
            // this entry is used by the front-end part, because we return a 200 status code even when there's a syntax error or logical error in the query.
            $this->error['error'] = true;
            $this->error['message'] = $e->getMessage();
        }
    }

    private function runSpecialQueries()
    {
        if (starts_with($this->query, 'use')) {
            $database = str_replace('use ', '', $this->query);

            //run query against database to make sure the database name is valid
            if ($this->db->query($this->query) !== false) {
                $this->config->set('database.drivers.mysql.database', $database);
                try {
                    $this->config->sync('database');
                } catch (S2WConfigException $e) {
                    $this->customMessage = $e->getMessage();
                    return false;
                }
                $this->customMessage = '`'. $database . "` is your new database now.";
                return true;
            }
        }

        return false;
    }
}
