<html lang="en">
<head>
<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/inc/assets/components/cdn/main.php";
include_once($path);
?>
</head>


<body class="ImperfectGamers">

<div class="ImperfectGamers-header">
<header><?php
    include("inc/assets/components/header/header.php");
    ?></header>
    <!-- animsition.css -->
    <link rel="stylesheet" href="https://cdn.imperfectgamers.org/inc/assets/css/animsition.min.css">
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- animsition.js -->
    <script src="https://cdn.imperfectgamers.org/inc/assets/js/animsition.min.js"></script>
    <!-- end animisition.css -->
</div>


<div class="ImperfectGamers-body">

    <main class="ImperfectGamers-content">
        <div class="mainfade">
        <?php
        include("inc/assets/components/main/main.php");
        ?></header>
        </div>
    </main>



    <nav class="ImperfectGamers-nav"></nav>

    <aside class="ImperfectGamers-news"></aside>
</div>

<footer class="ImperfectGamers-footer">
<?php
    include("inc/assets/components/footer/footer.php");
    ?>
</footer>

<!-- Discord widget-->
<script src="https://cdn.imperfectgamers.org/inc/assets/npm/widget/crate.js" async defer>
    const button = new Crate({
        server: '193909594270072832',
        channel: '366373736766636042',
        shard: 'https://disweb.dashflo.net',
        color: '#ff3535'
    })
</script>
<script>$(document).ready(function() {
    $(".mainfade").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '', // e.g '<img src="loading.svg" />'
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });
});</script>

</body>
</html>
