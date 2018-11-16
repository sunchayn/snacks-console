<?php

namespace API\Helpers;

class Paginator
{
    private $config;
    private $countQuery;
    private $paginationQuery;
    private $totalItems;
    private $totalPages;

    public function __construct($query, $config, $db)
    {
        $this->config = $config;
        $this->craftQuries($query);
        $this->performQueries($db);
    }


    /**
     * create two queries out of the given query :
     * - query to count the rows
     * - query to paginate the data
     * @todo handle the case when the query already have the limit clause.
     */
    public function craftQuries($query)
    {

        // replace the columns part with count(*) as total to number of rows
        $this->countQuery = preg_replace('/(select ).*( from.*)/i', '$1 count(*) as total $2', $query);

        $startFrom = ($this->config['current_page'] * $this->config['item_per_page']) - $this->config['item_per_page'];
        $this->paginationQuery = $query . ' limit ' .  $startFrom . ', ' . $this->config['item_per_page'];
    }

    public function performQueries($db)
    {
        $this->totalItems = $db->query($this->countQuery)->fetch()['total'];
        $this->totalPages = ceil($this->totalItems / $this->config['item_per_page']);
        $this->currentItems = $db->query($this->paginationQuery)->fetchAll();
    }

    public function getCurrentItems()
    {
        return $this->currentItems;
    }

    public function getCurrentPage()
    {
        return $this->config['current_page'];
    }

    public function getTotalItem()
    {
        return $this->totalItems;
    }

    public function getRowsPerPage()
    {
        return $this->config['item_per_page'];
    }

    public function getTotalPages()
    {
        return $this->totalPages;
    }
}
