<main class="Site-content">
    <div style="text-align: center; color: white">
        <?php
        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/resources/assets/components/elements/warningtool.php";
        include_once($path);
        ?>
        <h1>Bans</h1>
        <?php
        include_once "../bans/bansmodule/init.php";
        include_once(INCLUDES_PATH . "/user-functions.php");
        include_once(INCLUDES_PATH . "/system-functions.php");
        include_once('../bans/bansmodule/config.php');
        $xajax->processRequests();
        session_start();
        include_once(INCLUDES_PATH . "/page-builder.php");



        ?>
    </div>

</main>
