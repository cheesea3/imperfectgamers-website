<?php

SESSION_START();

ob_start();

$page = 'home';
$page_title = 'Store';

require_once('inc/functions.php');

if(isset($_GET['newlicense'])) {
    cache::clear();

    if (!prometheus::lkcheck()) {
        setSetting($_GET['newlicense'], 'api_key', 'value', false);

        cache::clear();
    }
}

if (!prometheus::loggedin())
    include('inc/login.php');
else
    $UID = $_SESSION['uid'];

if (getSetting('installed', 'value2') == 0) {
    cache::clear();
    util::redirect('install.php');
}

if (prometheus::loggedin() && !actions::delivered() && $page != 'required')
    util::redirect('store.php?page=required');

if (prometheus::loggedin() && is_numeric(actions::delivered('customjob', $_SESSION['uid'])) && $_GET['page'] != 'customjob')
    util::redirect('store.php?page=customjob&pid=' . actions::delivered('customjob', $_SESSION['uid']));

ob_end_clean();
?>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
<link href="compiled/css/jBox.all.min.css" rel="stylesheet">
   <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/StephanWagner/jBox@v1.0.5/dist/jBox.all.min.js"></script>
<script>

$(document).ready(function() {

new jBox('Modal', {
  attach: '#myModal',
  theme: 'TooltipDark',
  height: 400,
  title: 'VIP Benefits So Far!',
  content: '<h1>Benefits</h1><h2>Commands</h2><ul><li>VIP Mute [<b>!</b>vmute]</li><li>VIP Menu [<b>!</b>vip]</li><li>Vote Extend [<b>!</b>ve]</li><li>Noclip [<b>!</b>nc]</li></ul><br><h2>Aesthetics</h2><ul><li>Name colors</li><li>Message Colors</li><li>Voice/Scoreboard Tag [VIP]</li></ul><br><h2>VIP Exclusive Store</h2><pre>In-game credits still required.</pre><ul><li>Models: [ALL]</li><li>Pets: [ALL]</li><li>Hats: [ALL]</li><li>Eyewear: [ALL]</li><li>Tracers: [ALL]</li><li>Auras [ALL]</li><li>Sprays [ALL]</li></ul><h2>Monthly Rewards</h2><ul><li>2500 In-game Credits</li></ul><br> ',
  footer: 'Copyright © 2019 Imperfect Gamers. All rights reserved.'
 });

});
</script>	


</head>
<?php include('inc/header.php'); ?>

<?php if (getSetting('installed', 'value2') == 1) { ?>
    <div class="content">
    <div class="container">
    <div class="row">
        <div class="col-xs-12">
            <?php if (isset($_GET['installed']) && $_GET['installed'] == true) { ?>
                <p class="bs-callout bs-callout-success">
                    <button type="button" class="close" data-dismiss="alert">×</button>
                    Installation successfull! Please delete install.php if it didn't do it itself. The first
                    user who signs in gets admin access!<br>
                </p>
            <?php } ?>
        </div>
    </div>
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async defer>
  const button = new Crate({
    server: '193909594270072832',
    channel: '366373736766636042',
    shard: 'https://disweb.deploys.io',
    color: '#ff3535'
  })
  
</script>
    <div class="content">
    <!-- Start Server Info  -->
    <?php if($show_server_info == true): ?>
    <div class="splash-info <?php echo $row_1_animation ?>">

<?php endif; ?>

		<div class="row">
    <div class="col-xs-12">
        <?php if (tos::getLast() < getSetting('tos_lastedited', 'value3') && prometheus::loggedin()) { ?>
            <div class="info-box">
                <form method="POST" style="width: 40%;">
                    <input type="hidden" name="csrf_token" value="<?= csrf_token(); ?>">
					
					<style>
.yeeta {
    display: flex;
    justify-content: 10px;  
}
.yeetup
    display: flex;
    justify-content: flex-end;  
}
</style>

<div class="yeeta">
<h2><?= lang('tos'); ?></h2>
<div class="yeetup">
									<div class="infoelez">
                           <a href="tos.php"><i class="fa fa-info-circle" style="font-size:18px;"></i></a>
                </div>
				</div>
</div>  
                    <?= lang('tos_edited'); ?><br>
                    <input type="submit" class="btn btn-prom" value="<?= lang('tos_accept'); ?>" name="tos_submit" style="margin-top: 10px;">
                </form>
			
            </div>
        <?php } ?>
		</div>
		</div>
		
			
    <!-- Start First Row  -->
    <?php if($show_main_row == true): ?>
        <div class="row animated bounceIn">
			<center>
												                <?php if (!prometheus::loggedin()) { ?>
                    <div class="header">
                        <?= lang('signin', 'Sign in'); ?>
                    </div>
                    <?= lang('You need to sign in first in order to subscribe', 'You need to sign in first in order to buy any packages'); ?><br><br>
                    <?php echo '<a href="' . SteamSignIn::genUrl() . '"><img src="//steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_large_noborder.png"></img></a>'; ?>
                    <br><br>
                <?php } ?>
					
					
					
					<!-- INFO POPUP -->
<style>
.btn {
  background-color: #242727;
  font-size: 8px;
  cursor: pointer;	 
}

.btn.focus, .btn:focus {
    outline: 0 !important;
    box-shadow: none !important;
 }
 
/* Darker background on mouse-over */
.btn:hover {
  background-color: #272a2a;
}

.infoele {
  padding-right:10px;
  margin-top: 10px;		
  color: #FFFFFF !important;
}
	
.infoele.hover {
  padding-right:10px;
  margin-top: 10px;		
  color: #FFFFFF !important;
}

.infoelez {
  color: #FFFFFF !important;
}
	
.infoelez.hover {	
  color: #FFFFFF !important;
}

.fa-info-circle, .fa-question-circle, .fa-bolt, .fa-credit-card {
     font-size:30px;
     margin:5px;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}
.fa-info-circle:hover, .fa-question-circle:hover, .fa-credit-card:hover, .fa-bolt:hover {
  font-size: 40px;
  transform: rotate(45deg);
}

.demo-container {
  padding: 50px 0;
  text-align: center;
}

.demo-container .hover {
  margin: 5px;
}

.card-link-footer {
display: relative; + display:absolute;
}
                <div class="card-link-footer">


</style>
<!-- lol -->
</center>

            <div class="row">
<center>
									                <div class="col-md-4">
                    <div class="card card-splashy card-balance">
                        <div class="icon">
						<br>
						<br>
                            <i class="fa fa-credit-card" style="font-size:64px; color: #FFFFFF"></i>
                        </div>
                        <div class="card-content">
                            <h4 class="card-title" style="color:white;"> Can I use something other than paypal? </h4>
                            <p class="card-description"> You can use the debit / credit card options that are used inside of paypal as a guest account.							
							</p>
                        </div>
                    </div>
                    </div>
					
					<!-- second -->

				                <div class="col-md-4">
                    <div class="card card-splashz card-balance">
				<div class="infoele" align="right">
                           <button class="btn" id="myModal"><i class="fa fa-info-circle" style="font-size:18px;"></i></button>
                </div>
                        <div class="icon">
                            <i class="fa fa-bolt" style="font-size:64px; color: #5cb85c"></i>
                        </div>
                        <div class="card-content">
                            <h4 class="card-title" style="color:white;"> Subscribe as VIP </h4>
                            <p class="card-description"> Learn more about the benefits of being VIP</p>
                        </div>
                    </div>
                      <div class="card-link-footer">
											<?php					
         if (tos::getLast() < getSetting('tos_lastedited', 'value3') && prometheus::loggedin()) { 
						echo "<a href='store.php?page=purchase&type=pkg&pid=12' class='buy-btn disabled' style=''>You must accept the ToS before purchasing!</a>";
        } elseif (!prometheus::loggedin()) {
						echo "<a href='store.php?page=purchase&type=pkg&pid=12' class='buy-btn disabled' style=''>You need to be signed in to subscribe!</a>";	
		} else { 
						echo "<a href='store.php?page=purchase&type=pkg&pid=12' class='buy-btn' style=''><i class='fa fa-money'></i> Purchase</a>";		
						}
						?>				
					</div>
                    </div>
					
										<!-- second -->
									                <div class="col-md-4">
                    <div class="card card-splashz card-balance">
                        <div class="icon">
						<br>
						<br>
                            <i class="fa fa-question-circle" style="font-size:64px; color: #0275d8"></i>
                        </div>
                        <div class="card-content">
						<br>
                            <h4 class="card-title" style="color:white;"> Have any questions? </h4>
                            <p class="card-description"> Do not hesitate to open a support ticket
							</p>
                        </div>
                    </div>
                    <div class="card-link-footer">
		                    <div class="card-link-footer">
											<?php					
						if (!prometheus::loggedin()) {
						echo "<a href='https://www.imperfectgamers.org/store/support.php' class='buy-btn disabled' style=''>You need to be signed in to open a ticket!</a>";
        } else {
						echo "<a href='https://www.imperfectgamers.org/store/support.php' class='buy-btn' style=''><i class='fa fa-ticket'></i> Support Ticket</a>";
						}
						?>				
					</div>
					</div>
                    </div>
			
					
                </div>
				</center>
        </div>
		</div>
		                    <?php if (getSetting('show_recent', 'value2') == 1) { ?>
                        <div class="recent_donators">
                            <h2>Recent VIPS</h2>
                            <table class="table table-striped">

                                <tbody>
                                <?= dashboard::getRecent(); ?>
                                </tbody>
                            </table>
                        </div>
                    <?php } ?>
		</div>
		
				<?php if (isset($_POST['tos_submit'])) {
    if(!csrf_check())
        return util::error("Invalid CSRF token!");
    
    tos::agree();
	
	echo "<script type='text/javascript'>window.location.replace('splash.php?tos=1')</script>";

	
	
} ?>
		
		</div>
		</div>
		<?php 				if ( isset($_GET['tos']) && $_GET['tos'] == 1 )
{
echo "<script type='text/javascript'>console.log('TOS has been agreed. You now have access to purchasing packages, if for some reason there is an issue please come on the discord for immediate assistance. Thank you!');</script>";

} ?>
    <?php endif; ?>
    <?php include('inc/footer.php'); ?>
<?php } ?>
