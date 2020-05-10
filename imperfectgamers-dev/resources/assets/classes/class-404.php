<?php
if(isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER'])){
    $refurl = parse_url($_SERVER['HTTP_REFERER']); // use the parse_url() function to create an array containing information about the domain
    if($refurl['host'] == "imperfectgamers.org"){
        echo "Please email contact@imperfectgamers.org and let us know about the dead link on our site.";
    }
    else{
        echo "You should email someone over at " . $refurl['host'] . " and let them know they have a dead link to Imperfect Gamers.";
    }
}
else{
    echo "404

";

}



?>
