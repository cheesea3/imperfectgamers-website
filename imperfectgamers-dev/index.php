<?php include("Classes/config.php");?>
<html lang="en">
<head>
<?php include("inc/assets/components/cdn/main.php"); ?>
</head>
<body class="ImperfectGamers" id="active">

<div class="ImperfectGamers-header">
<header><?php include("inc/assets/components/header/header.php"); ?></header>
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
<?php include("inc/assets/components/footer/footer.php"); ?>
</footer>

<?php include("inc/assets/components/footer/includes.php"); ?>

</body>
</html>
