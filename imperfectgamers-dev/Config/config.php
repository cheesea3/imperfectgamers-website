<?php
switch ($_SERVER["SCRIPT_NAME"]) {
    case "/records/index.php":
        $CURRENT_PAGE = "Records";
        $PAGE_TITLE = "Records";
        $INCLUDE_PATH = "/views/records-view.php";
        break;
    case "/activity/index.php":
        $CURRENT_PAGE = "Activity";
        $PAGE_TITLE = "Activity";
        $INCLUDE_PATH = "/views/activity-view.php";
        break;
    case "/bans/index.php":
        $CURRENT_PAGE = "Bans";
        $PAGE_TITLE = "Bans";
        $INCLUDE_PATH = "/views/bans-view.php";
        break;
    case "/store/index.php":
        $CURRENT_PAGE = "Store";
        $PAGE_TITLE = "Store";
        $INCLUDE_PATH = "/views/store-view.php";
        break;
    case "/404/index.php":
        $CURRENT_PAGE = "404";
        $PAGE_TITLE = "Page Not Found";
        $INCLUDE_PATH = "/views/404-view.php";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $PAGE_TITLE = "Imperfect Gamers";
        $INCLUDE_PATH = "/views/home-view.php";
}
