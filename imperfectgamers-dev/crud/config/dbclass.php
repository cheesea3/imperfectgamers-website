<?php
$database_username = 'root';
$database_password = '';
$pdo_conn = new PDO( 'mysql:host=127.0.0.1;dbname=igfastdl_surftimerg', $database_username, $database_password );



require_once("playerrank/read.php");
