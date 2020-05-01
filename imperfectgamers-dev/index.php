<html class="loading" lang="en">
	<head>
		<meta charset="utf-8" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Imperfect Gamers</title>
		
	<!-- CDNS -->	
		<!-- IG CUSTOM -->
		<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
				<!-- IG JS -->
					<!-- IG BS CORE JS -->
						<script src="https://cdn.imperfectgamers.org/inc/assets/js/essential.js?v=1.0.1"></script>
					<!-- IG ROWLINK JS-->
						<script src="https://cdn.imperfectgamers.org/inc/assets/js/rowlink.js"></script>
					<!-- IG CLIPBOARD JS-->
						<script src="https://cdn.imperfectgamers.org/inc/assets/js/clipboard.min.js"></script>
				<!-- IG END JS -->
				<!-- IG FAVICON -->
				<link rel="icon" href="https://cdn.imperfectgamers.org/inc/assets/icon/favicon.ico">
		<!-- END IG CUSTOM -->					
		<!-- Font -->
			<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
		<!-- jQuery API -->
			<script src="https://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script> <!-- WidgetBot -->
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>	
	<!-- END CDNS -->
		</head>	


			    <!-- LOADER -->
<body>
		    <!-- Header -->
		<?php
			include("inc/assets/components/header/header.php");
		?>
		<!-- NAV BAR -->
		<?php
			include("inc/assets/components/navbar/navbar.php");
		?>
		
<!-- CONTENT -->

				
   <?php
 
    $jsonIn = file_get_contents('https://discordapp.com/api/guilds/193909594270072832/widget.json');
    $JSON = json_decode($jsonIn, true);
 
    $membersCount = ($JSON['presence_count']);
 
    echo "Members online: " . $membersCount;
   ?>
            <br>

	
				    <!-- Footer -->
 		<?php 
					   $path = $_SERVER['DOCUMENT_ROOT'];
					   $path .= "/inc/assets/components/footer/footer.php";
					   include_once($path);
		?>

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
