<?php


$arr = array("Home", "Search", "Bans", "Forum", "Shop");
foreach ($arr as &$value) {
    echo "                <li class=\"nav-item\">
                    <a class=\"nav-link\" href=\"/forum/\">
                        <i class=\"fas fa-comments fa-fw\"></i>
                        $value
                    </a>
                </li>";
}
?>
