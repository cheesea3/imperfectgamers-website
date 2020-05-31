<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
    <title>Timer Stats (Lite) by Zipcore</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

</head>
<body>
<div class="container">
<h1 align=middle>Top Players</h1>
<table width='100%' border='1' cellpadding='5' cellspacing='0';>
    <tr>
        <th align=middle>Name</th>
        <th align=middle>Points</th>
    </tr>


<?php

require_once("conn.php");
    $sql = "SELECT `points`, `name` FROM `ck_playerrank` ORDER BY `points` DESC LIMIT 10";
    $players = $link->query($sql);
    while($array = mysqli_fetch_array($players))
    {
        echo "<tr>";
        echo "<td align=middle>".$array["name"]."</td>";
        echo "<td align=middle>".$array["points"]."</td>";
        echo "</tr>";
    }
    ?>
</table>

<h1 align=middle>Most World Records</h1>
<table width='100%' border='1' cellpadding='5' cellspacing='0';>
    <tr>
        <th align=middle>Name</th>
        <th align=middle>WRs</th>
    </tr>

    <?php
    $sql = "SELECT `wrs`, `name` FROM `ck_playerrank` ORDER BY `wrs` DESC LIMIT 10";
    $players = $link->query($sql);
    while($array = mysqli_fetch_array($players))
    {
        echo "<tr>";
        echo "<td align=middle>".$array["name"]."</td>";
        echo "<td align=middle>".$array[0]."</td>";
        echo "</tr>";
    }?>
</table>

    <h1 align=middle>Surf normal </h1>
    <table width='100%' border='1' cellpadding='5' cellspacing='0';>
        <tr>
            <th align=middle>Name</th>
            <th align=middle>time spent</th>
        </tr>

        <?php
        $sql = "SELECT `name`, timealive + timespec AS lol FROM (SELECT * FROM `ck_playerrank` WHERE `style` = 1) ORDER BY `lol` DESC LIMIT 10";
        $players = $link->query($sql);
        while($array = mysqli_fetch_array($players))
        {
            echo "<th>' .$array[0].' </th>";
            echo "<tr>";
            echo "<td align=middle>".$array["name"]."</td>";
            echo "<td align=middle>".$array[1]."</td>";
            echo "</tr>";
        }?>
    </table>


    <h1 align=middle>Most active</h1>
    <table width='100%' border='1' cellpadding='5' cellspacing='0';>
        <tr>
            <th align=middle>Name</th>
            <th align=middle>time spent</th>
        </tr>

        <?php
        $sql = "SELECT `name`, timealive + timespec AS lol FROM `ck_playerrank` ORDER BY `lol` DESC LIMIT 10";
        $players = $link->query($sql);
        while($array = mysqli_fetch_array($players))
        {
            echo "<tr>";
            echo "<td align=middle>".$array["name"]."</td>";
            echo "<td align=middle>".$array[1]."</td>";
            echo "</tr>";
        }?>
    </table>

<center><a target='_blank' href='http://forums.alliedmods.net/member.php?u=74431'>Timer Stats (Lite) &copy; 2014 by Zipcore</a></center>

<?
echo mysqli_error();
mysqli_real_escape_string("imperfectgamers.org");
mysqli_close();
?>
</div>
</body>
</html>
