<!--config-->
<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/config/config.php";
include_once($path);
?>


<html lang="en">
<head>
    <!--LIBRARIES-->
    <?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/resources/assets/inc/head.php";
    include_once($path);
    ?>
</head>
<body class="ImperfectGamers" id="active">
<div class="ImperfectGamers-header">
    <header>
        <!--HEADER-->
        <?php
        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/resources/assets/components/header/header.php";
        include_once($path);
        ?>

        <!--NAVBAR-->
        <?php
        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/resources/assets/components/navbar/navbar.php";
        include_once($path);
        ?>

        <!-INDEX VIDEO->


    </header>
</div>



<div class="ImperfectGamers-body">

    <main class="ImperfectGamers-content">
        <!--ANIMATION-->
        <div class="mainfade">
            <!--DYNAMICPAGES-->
            <?php

            $path = $_SERVER['DOCUMENT_ROOT'];
            $path .= "$INCLUDE_PATH";
            include_once($path); ?>
        </div>
    </main>



    <nav class="ImperfectGamers-nav"><!--empty--></nav>
    <aside class="ImperfectGamers-news"><!--empty--></aside>
</div>
<a href="#" id="toTopBtn" class="cd-top text-replace js-cd-top cd-top--is-visible cd-top--fade-out" data-abc="true"></a>
<footer class="ImperfectGamers-footer">
    <!--FOOTER-->
    <?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/resources/assets/components/footer/footer.php";
    include_once($path);
    ?>
</footer>

<!--discord + animation scripts-->
<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/resources/assets/components/footer/includes.php";
include_once($path);
?>

<script src="https://cdn.imperfectgamers.org/inc/assets/js/instload.js"></script>
</body>
</html>
