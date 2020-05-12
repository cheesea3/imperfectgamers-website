<?php
switch ($_SERVER["SCRIPT_NAME"]) {
    case "/records/index.php":
        $CURRENT_PAGE = "Records";
        $PAGE_TITLE = "Records Center";
        $INCLUDE_PATH = "/views/records-view.php";
        $META_DESC = "The Records Center allows you to see where you stand against others in various ways.";
        $META_WORDS = "records, stats, times, maps, surf_kitsune, surf_mesa, surf_calycate_ig, imperfectgamersfastdl, maps";
        break;
    case "/activity/index.php":
        $CURRENT_PAGE = "Activity";
        $PAGE_TITLE = "Activity Center";
        $INCLUDE_PATH = "/views/activity-view.php";
        $META_DESC = "Track your in-game activity, see where you stand amongst others.";
        $META_WORDS = "activity, Name, SteamID, SteamID64, daaag runi, yamo, home, search, Days, Hrs, Min";
        break;
    case "/bans/index.php":
        $CURRENT_PAGE = "Bans";
        $PAGE_TITLE = "Bans Center";
        $INCLUDE_PATH = "/views/bans-view.php";
        $META_DESC = "The Bans Center gives immediate information necessary for resolving account limitations";
        $META_WORDS = "banned, for, hardr, fbomb, help, micspam, banned, how to get unbanned, ipbanned, unban, appeal, information";
        break;
    case "/store/index.php":
        $CURRENT_PAGE = "Store";
        $PAGE_TITLE = "Store Center";
        $INCLUDE_PATH = "/views/store-view.php";
        $META_DESC = "Subscribing to VIP grants you exclusive features while helping us to stay free from intruding advertisements that most servers have.";
        $META_WORDS = "donate, subscribe, donate, vip, vote mute, vote extend, ve, vmute, !vmute, !ve, !vip, sm_vip, sm_ve, sm_vmute";
        break;
    case "/404/index.php":
        $CURRENT_PAGE = "404";
        $PAGE_TITLE = "Page Not Found";
        $INCLUDE_PATH = "/views/404-view.php";
        $META_DESC = "Page not found";
        $META_WORDS = "404, page not found, lost";
        break;
    case "/apply/index.php":
        $CURRENT_PAGE = "Apply";
        $PAGE_TITLE = "Application Center";
        $INCLUDE_PATH = "/views/apply-view.php";
        $META_DESC = "The Application Center is for applying for staff and also applying for an unban, hopefully not in that order.";
        $META_WORDS = "banned, for, hardr, fbomb, help, micspam, banned, how to get unbanned, ipbanned, unban, appeal, information";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $PAGE_TITLE = "Imperfect Gamers";
        $INCLUDE_PATH = "/views/home-view.php";
        $META_DESC = "The new age underground scene for music and gaming enthusiasts.";
        $META_WORDS = "surf, ws, knife, 102.4, music, beats, uncapped, cksurf, summit1g, kitsune, 1v1, skins, !ws, rap, !knife, kitsune, utopia, fastdl, no lag, beginner, noob, glove, credits, vip, shop, zeph, swaggersouls, fitz, imperfectgamers";
}
