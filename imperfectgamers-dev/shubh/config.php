<?php
switch ($_SERVER['PHP_SELF']) {
    case "/shubh/index.php":
        $SITE_TITLE = "Shubhs Index";
        break;
    case "/shubh/page2.php":
        $SITE_TITLE = "Shubhs Page2";
        break;
    default:
        echo "i is not equal to 0, 1 or 2";
}

