<!-- Footer -->

<style>
    .footer {
        background:#f6f6f6;
        padding:20px 0;
        border-top:2px solid orange;
    }
    .widget h5 {
        cursor:pointer;
        font-size:18px;
        font-weight:bold;
        padding-bottom:5px;
    }
    .footer-bottom {
        background:#d8d8d8;
        padding:15px 0;
        border-top:1px solid #d9d9d9;
        font-size:11px;
        color:#777;
    }

    @media only screen and (max-width: 479px) {
        .widget_content{
            display:none;
        }
        .active .widget_content{
            display:inline;
        }
        .widget h5 {
            border-bottom:1px solid #ddd;
        }
        .widget h5:after {
            content:"\203A";
            color:white;
            width:20px;
            height:20px;
            background:#999;
            text-align:center;
            float:right;
        }
        .active.widget h5:after {
            content:"\2039";
            background:#ccc;
        }
    }
</style>
<div class="container" style="user-select: none">
    <div class="row text-center text-xs-center text-sm-left text-md-left">
        <div class="col-xs-12 col-sm-4 col-md-4">
            <div class="widget">
            <h5>Directory</h5>
                <article class="widget_content">
            <ul class="list-unstyled quick-links">
                <li><a href="/"><i class="fa fa-angle-double-right"></i> Home</a></li>
                <li><a href="/records"><i class="fa fa-angle-double-right"></i> Records</a></li>
                <li><a href="/activity"><i class="fa fa-angle-double-right"></i> Activity</a></li>
                <li><a href="/bans"><i class="fa fa-angle-double-right"></i> Bans</a></li>
                <li><a href="/store"><i class="fa fa-angle-double-right"></i> Store</a></li>
            </ul>
                </article>
            </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4">
            <div class="widget">
            <h5>Documentation</h5>
                <article class="widget_content">
            <ul class="list-unstyled quick-links">
                <li><a href="/forum/Thread-Official-Community-Information"><i class="fa fa-angle-double-right"></i> Community Information</a></li>
                <li><a href="/forum/Thread-Official-Community-Rules-Guidelines"><i class="fa fa-angle-double-right"></i> Community Rules & Guidelines</a></li>
                <li><a href="/forum/Thread-Official-SourceMod-Commands"><i class="fa fa-angle-double-right"></i> Sourcemod Commands</a></li>
                <li><a href="/store/privacy.php" title="You hereby agree that by accepting this TOS, you know that your contract with ImperfectGamers.org also correlates to the server and any service that is owned by us."><i class="fa fa-angle-double-right"></i> Terms of Service</a></li>
                <li><a href="/store/tos.php" title="This page governs the manner in which Imperfect Gamers operates."><i class="fa fa-angle-double-right"></i> Privacy Policy</a></li>
            </ul>
                </article>
            </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4">
            <div class="widget">
            <h5>Private</h5>
                <article class="widget_content">
            <ul class="list-unstyled quick-links">
                <li><a href="https://www.imperfectgamers.org/forum/Thread-Using-the-Admin-Panel"><i class="fa fa-angle-double-right"></i> Using the Admin Panel</a></li>
                <li><a href="https://www.imperfectgamers.org/forum/Thread-Advanced-Rules-Menu"><i class="fa fa-angle-double-right"></i> Advanced Rules Menu</a></li>
                <li><a href="https://www.imperfectgamers.org/forum/Thread-SourceMod-Staff-Commands"><i class="fa fa-angle-double-right"></i> Sourcemod Staff Commands</a></li>
            </ul>
                </article>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul class="list-unstyled list-inline social text-center">
                <li class="list-inline-item"><a href="/steam" target="_blank"><i class="fab fa-steam-square"></i></a></li>
                <li class="list-inline-item"><a href="/instagram" target="_blank"><i class="fab fa-instagram"></i></a></li>
                <li class="list-inline-item"><a href="/discord" target="_blank"><i class="fab fa-discord"></i></a></li>
                <li class="list-inline-item"><a href="mailto:support@imperfectgamers.org" target="_blank"><i class="fa fa-envelope"></i></a></li>
            </ul>
        </div>
        <hr>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p style="color: gray"><a href="abc.html"
                                      onMouseOver="this.style.color='#gray'"
                                      onMouseOut="this.style.color='#gray'" >Imperfect Gamers</a> is a service of Imperfect and Company, LLC.</p>
            <p class="h6"><a class="ml-2" href="https://imperfectcreators.org/" target="_blank">Imperfect and Company</a>  Copyright &copy; <?php print date("Y");?>. All right Reversed.<a class="ml-2" style="color: white" href="https://imperfectcreators.org/" target="_blank">Privacy Policy</a></p>
        </div>
    </div>
</div>
<script>$(document).ready(function() {
        $( ".widget h5" ).click(
            function() {
                $(this).parent().toggleClass('active');
            }
        );
    });


</script>
<!-- /Footer -->
