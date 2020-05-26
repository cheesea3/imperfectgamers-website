<?php
include 'conn.php';
$limit = isset($_POST["limit-records"]) ? $_POST["limit-records"] : 5000;
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$start = ($page - 1) * $limit;
$result = $conn->query("SELECT * FROM ck_playerrank LIMIT $start, $limit");
$players = $result->fetch_all(MYSQLI_ASSOC);

$result1 = $conn->query("SELECT count(steamid) AS id FROM ck_playerrank");
$userCount = $result1->fetch_all(MYSQLI_ASSOC);
$total = $userCount[0]['id'];
$pages = ceil( $total / $limit );

$Previous = $page - 1;
$Next = $page + 1;

?>


<?php require_once('config.php');?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
<?php include('inc/head.php'); ?>

<body>



<div class="wrap">


<?php include('inc/header.php'); ?>
<?php include('inc/navbar.php'); ?>



    <div class="container">
        <h1>Stats</h1>
        <div class="row">
            <?php include('rowone.php') ?>
            <?php include('rowtwo.php') ?>
        </div>
    </div>
<?php include('inc/footer.php'); ?>
<?php include('inc/footerscript.php'); ?>
</div>
</body>
</html>


