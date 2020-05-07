<?php include("Config/config.php");?>
<html lang="en">
<head>
<?php include("Resources/assets/inc/head.php"); ?>
</head>
<body class="ImperfectGamers" id="active">

<div class="ImperfectGamers-header">
<header>
    <?php include("Resources/assets/components/header/header.php"); ?>
    <?php include("Resources/assets/components/navbar/navbar.php"); ?>
</header>
</div>


<div class="ImperfectGamers-body">

    <main class="ImperfectGamers-content">
        <div class="mainfade">
        <?php include($INCLUDE_PATH); ?>
        </div>
    </main>



    <nav class="ImperfectGamers-nav"></nav>

    <aside class="ImperfectGamers-news"></aside>
</div>

<footer class="ImperfectGamers-footer">
<?php include("Resources/assets/components/footer/footer.php"); ?>
</footer>

<?php include("Resources/assets/components/footer/includes.php"); ?>

</body>
</html>
