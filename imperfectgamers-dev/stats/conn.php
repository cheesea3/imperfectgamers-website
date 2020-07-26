
<?php
$servername = "imperfectgamers.org";
$username = "igfastdl";
$password = "UR5WnRgRgUcT9mh5";
$database = "igfastdl_surftimerg";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed! Contact Jumpman.");
}
?>
