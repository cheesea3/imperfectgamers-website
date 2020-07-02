<?php


class ck_playerrank {

    // Connection instance
    private $connection;

    // table name
    private $table_name = "ck_playerrank";

    // table columns
    public $steamid;
    public $steamid64;
    public $name;
    public $country;
    public $points;
    public $wrpoints;
    public $wrbpoints;
    public $wrcppoints;
    public $top10points;
    public $groupspoints;
    public $mappoints;
    public $bonuspoints;
    public $finishedmaps;
    public $finishedbonuses;
    public $finishedstages;
    public $wrs;
    public $wrbs;
    public $wrcps;
    public $top10s;
    public $groups;
    public $lastseen;
    public $joined;
    public $timealive;
    public $timespec;
    public $connections;
    public $readchangelog;
    public $style;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    //C
    public function create(){

    }
    //R
    public function read(){
        $query = "SELECT name as Player,  ";
        $stmt = "";
        return $stmt;
    }

    //U
    public function update(){}
    //D
    public function delete(){}

}
