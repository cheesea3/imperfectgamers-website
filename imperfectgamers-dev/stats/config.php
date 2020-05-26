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
    case "/forum/index.php":
        $CURRENT_PAGE = "Forum";
        $PAGE_TITLE = "Application Center";
        $INCLUDE_PATH = "/views/apply-view.php";
        $META_DESC = "The Application Center is for applying for staff and also applying for an unban, hopefully not in that order.";
        $META_WORDS = "banned, for, hardr, fbomb, help, micspam, banned, how to get unbanned, ipbanned, unban, appeal, information";
        break;
    case "/search/index.php":
        $CURRENT_PAGE = "Search";
        $PAGE_TITLE = "Search Center";
        $INCLUDE_PATH = "/views/apply-view.php";
        $META_DESC = "Search system.";
        $META_WORDS = "Search";
        break;
    default:
        $CURRENT_PAGE = "Index";
        $PAGE_TITLE = "Imperfect Gamers";
        $INCLUDE_PATH = "/views/home-view.php";
        $META_DESC = "The new age underground scene for music and gaming enthusiasts.";
        $META_WORDS = "surf, ws, knife, 102.4, music, beats, uncapped, cksurf, summit1g, kitsune, 1v1, skins, !ws, rap, !knife, kitsune, utopia, fastdl, no lag, beginner, noob, glove, credits, vip, shop, zeph, swaggersouls, fitz, imperfectgamers";
}




function navbar() {
    //"path", "name", "fontawesome"
    $arr = array (
        array("/home/", "Home", "fas fa-home"),
        array("/stats/", "Stats", "fa fa-search"),
        array("/forum/", "Forum", "fas fa-comments"),
        array("/bans/", "Bans", "fa fa-hammer"),
        array("/shop/", "Shop", "fa fa-store"),
    );
    //for each array ($arr) pass it as value ($value)




    //$value[0] access first index, path
    //$value[2] accesses last index, fontawesome
    //$value[1] accesses middle index, name

    foreach ($arr as &$value) {
        //global required to access current_page since thats outside the function
        global $CURRENT_PAGE;
        //if the current_page matches value[1] then display this, active difference.
        if ($CURRENT_PAGE == "$value[1]") {
            $navlinks = '
                    <li class="nav-item active">
                        <a class="nav-link" href="' . $value[0] . '"> 
                            <i class="' . $value[2] . '"></i> 
                            ' . $value[1] . '  
                        </a>
                    </li>
                    
                    ';
        }
//if the current page does not match the array, then display this.
        else {
            $navlinks = '
                    <li class="nav-item">
                        <a class="nav-link" href="' . $value[0] . '"> 
                            <i class="' . $value[2] . '"></i> 
                            ' . $value[1] . '  
                        </a>
                    </li>
                    
                    ';
        }



        $navbar = '

                 <ul class="nav flex-column flex-md-row"> 
                 '.$navlinks.'
                 </ul>

                 ';
        unset($value);
        echo $navbar;
    }
//             navbar();  calling this function ultimately echos $navbar which holds $navlinks with necessary divs around it :P
}


