<html class="loading">
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
    <div class="content">
			<main class="container">
			<div class="row">
								<div class="news-block col-md-5">
									          
                    <div class="card card-splash card-balance">
                        <div class="icon">
						<br>
						<br>
						<center>
                                   <div class="row animated bounceIn"><i class="fa fa-info" style="font-size:64px; color: #FFFFFF"></i></div>
							</center>
                        </div>
                        <div class="card-content">
                            <h2 class="card-title"	 style="color:white;">About us</h2>
                            <p class="card-description">Hello, Imperfect Gamers is a Surf CSGO Network that is in the Top 10 percentile @ gametracker that revolves around entertainment.. primarily rapping (freestyling), singing, prank calling, and so much more! We are a nice community and we do not have any room for drama, please be courteous of your fellow members and try your best to avoid racism or targetting of another member. We feel when people visit our servers they feel safe. Thank you!</p>							
                        </div>
                    </div>
								</div>
								<center>
																	                <div class="col-md-5">
                    <div class="card card-splash card-balance">
                        <div class="icon">
						<br>
						<br>
                                   <div class="row animated bounceIn"> <i class="fa fa-sign-in" style="font-size:64px; color: #ff3535"></i></div>
                        </div>
                        <div class="card-content">
                            <h4 class="card-title" style="color:white;">JOIN NOW FOR FREE!</h4>
                            <p class="card-description"> All you need to join the lobby is have Counter-Strike installed. You don't need any counter-strike interest to enjoy our server!						
							</p>
                        </div>
                    </div>
					                      <div class="card-link-footer">				
        <div class="row animated bounceIn"><a class="c-btn type-2" style="border-color:#602626; color:#fff" tabindex="0" role="button"><span>play.imperfectgamers.org:27015</span><button class="IsCopied btn234 w3-button w3-green"><i class="fa fa-clipboard"></i> Copy</button></a> <!-- Place your server IP in script below -->
<br>
<input type="submit" onclick="document.location = 'steam://connect/play.imperfectgamers.org:27015'" name="button" class="c-btn type-1" style="margin:0px;" id="button" value="Quick Join">		                                         
					</div>
					<br>
					<br>
					</div>
                    </div>
					</center>
				
   <?php
 
    $jsonIn = file_get_contents('https://discordapp.com/api/guilds/193909594270072832/widget.json');
    $JSON = json_decode($jsonIn, true);
 
    $membersCount = ($JSON['presence_count']);
 
    echo "Members online: " . $membersCount;
   ?>

		</main>
		</div>
		</div>
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed" async defer></script>
		   <script>


    var clipboard = new Clipboard('.btn234', {
        text: function() {
            return 'play.imperfectgamers.org:27015'; // Set your current server IP
        }
    });

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });


    $('.IsCopied').click(function(){
        var $this = $(this);
        $this.toggleClass('IsCopied');
        if($this.hasClass('IsCopied')){
            $this.text('Copy');
        } else {
            $this.text("Copied");
        }
    });

    </script>
	
				    <!-- Footer -->
 		<?php 
					   $path = $_SERVER['DOCUMENT_ROOT'];
					   $path .= "inc/assets/components/footer/footer.php";
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
