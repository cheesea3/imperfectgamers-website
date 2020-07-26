<?php
$search_keyword = '';
if(!empty($_POST['search']['keyword'])) {
    $search_keyword = $_POST['search']['keyword'];
}

$pdo_statement = $pdo_conn->prepare("
SELECT steamid, 
       name, 
       country, 
       style, 
       points, 
       wrpoints, 
       wrbpoints, 
       wrcppoints, 
       top10points, 
       groupspoints, 
       mappoints, 
       bonuspoints, 
       finishedmapspro, 
       finishedbonuses, 
       finishedstages, 
       wrs, 
       wrbs, 
       wrcps, 
       top10s, 
       groups, 
       lastseen, 
       ( 
              SELECT Count(*)+1 
              FROM   ck_playerrank b 
              WHERE  a.style=b.style 
              AND    b.points > a.points) AS rank , 
       ( 
                  SELECT     Count(DISTINCT ck_zones.mapname, `zonegroup`) 
                  FROM       ck_zones 
                  INNER JOIN ck_maptier 
                  ON         ck_zones.mapname=ck_maptier.mapname 
                  WHERE      `zonetypeid` = 0 
                  AND        `zonegroup` > 0 
                  AND        ranked = 1 
                  AND        tier > 0) AS bonuscount, 
       ( 
              SELECT Count(*) 
              FROM   ck_maptier 
              WHERE  ranked = 1 
              AND    tier > 0) AS mapcount, 
       ( 
              SELECT Count(*) 
              FROM   ck_maptier 
              WHERE  ranked = 1 
              AND    tier > 0) AS mapcount, 
       ( 
                  SELECT     Count(DISTINCT ck_zones.mapname, `zonetypeid`) 
                  FROM       `ck_zones` 
                  INNER JOIN ck_maptier 
                  ON         ck_zones.mapname=ck_maptier.mapname 
                  WHERE      `zonetype` IN (1, 
                                            3, 
                                            5) 
                  AND        `zonegroup` = 0 
                  AND        ranked = 1 
                  AND        tier > 0) AS stagecount FROM ck_playerrank a 

       
WHERE style='1' ORDER BY rank ASC limit 10
");

require_once("pagination.php");
$stmt = $pdo_conn->query('SELECT steamid, title FROM ck_vipadmins');
$pdo_statement->bindValue(':keyword', '%' . $search_keyword . '%', PDO::PARAM_STR);
$pdo_statement->execute();
$result = $pdo_statement->fetchAll();



function EchoPlayerName($steamid){
    $xml = simplexml_load_file("http://steamcommunity.com/profiles/$steamid/?xml=1");//link to user xml
    if(!empty($xml)) {
        $username = $xml->steamID;
        echo $username;
    }
}
