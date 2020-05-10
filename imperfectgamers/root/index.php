<html lang="en">
<head>
<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/resources/assets/components/cdn/home-view.php";
include_once($path);
?>
</head>


<body class="ImperfectGamers">

<div class="ImperfectGamers-header">
<header><?php
    include("inc/assets/components/header/header.php");
    ?></header>
</div>


<div class="ImperfectGamers-body">

    <main class="ImperfectGamers-content">
        <?php
        include("inc/assets/components/main/main.php");
        ?></header>
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

</body>
</html>
