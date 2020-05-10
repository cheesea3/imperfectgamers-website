<?php
switch ($_SERVER["SCRIPT_NAME"]) {
    case "/records/index.php":
        $CURRENT_PAGE = "Records";
        $PAGE_TITLE = "Records";
        $INCLUDE_PATH = "/views/records-view.php";
        $META_DESC = "The new age underground scene for rapping, producing, gami=";
        $META_WORDS = "TEST";
        break;
    case "/activity/index.php":
        $CURRENT_PAGE = "Activity";
        $PAGE_TITLE = "Activity";
        $INCLUDE_PATH = "/views/activity-view.php";
        $META_DESC = "TEST";
        $META_WORDS = "TEST";
        break;
    case "/bans/index.php":
        $CURRENT_PAGE = "Bans";
        $PAGE_TITLE = "Bans";
        $INCLUDE_PATH = "/views/bans-view.php";
        $META_DESC = "TEST";
        $META_WORDS = "TEST";
        break;
    case "/store/index.php":
        $CURRENT_PAGE = "Store";
        $PAGE_TITLE = "Store";
        $INCLUDE_PATH = "/views/store-view.php";
        $META_DESC = "TEST";
        $META_WORDS = "TEST";
        break;
    case "/404/index.php":
        $CURRENT_PAGE = "404";
        $PAGE_TITLE = "Page Not Found";
        $INCLUDE_PATH = "/views/404-view.php";
        $META_DESC = "Page not found";
        $META_WORDS = "TEST";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $PAGE_TITLE = "Imperfect Gamers";
        $INCLUDE_PATH = "/views/home-view.php";
        $META_DESC = "The new age underground scene for music and gaming enthusiasts.";
        $META_WORDS = "surf, ws, knife, 102.4, music, beats, uncapped, cksurf, summit1g, kitsune, 1v1, skins, !ws, rap, !knife, kitsune, utopia, fastdl, no lag, beginner, noob, glove, credits, vip, shop, zeph, swaggersouls, fitz, imperfectgamers";
}
