<?php
switch ($_SERVER["SCRIPT_NAME"]) {
    case "/Config/records/index.php":
        $CURRENT_PAGE = "Records";
        $PAGE_TITLE = "Records";
        $INCLUDE_PATH = "Resources/assets/components/main/home-view.php";
        break;
    case "/Config/activity/index.php":
        $CURRENT_PAGE = "Activity";
        $PAGE_TITLE = "Activity";
        $INCLUDE_PATH = "Resources/assets/components/main/home-view.php";
        break;
    case "404.php":
        $CURRENT_PAGE = "404";
        $PAGE_TITLE = "Activity";
        $INCLUDE_PATH = "Resources/assets/components/main/404.php";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $PAGE_TITLE = "Imperfect Gamers";
        $INCLUDE_PATH = "views/home-view.php";
}
