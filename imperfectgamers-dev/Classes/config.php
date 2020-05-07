<?php
switch ($_SERVER["SCRIPT_NAME"]) {
    case "/Classes/records/index.php":
        $CURRENT_PAGE = "Records";
        $INCLUDE_PATH = "inc/assets/components/main/main.php";
        $PAGE_TITLE = "Records";
        break;
    case "/Classes/activity/index.php":
        $CURRENT_PAGE = "Activity";
        $INCLUDE_PATH = "inc/assets/components/main/main.php";
        $PAGE_TITLE = "Activity";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $INCLUDE_PATH = "inc/assets/components/main/main.php";
        $PAGE_TITLE = "Imperfect Gamers";
}
