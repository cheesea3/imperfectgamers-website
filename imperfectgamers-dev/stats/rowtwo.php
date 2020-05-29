<div class="col-12">
    <div class="jumbotron bg-transparent justify-content-center text-center">
        <h3 class="text-center text-light">
            Top players
        </h3>
    </div>

    <div class="card-deck">

<?php
for ($i = 0; $i < 6; $i++)  {
    echo "<div class=\"card bg-brand-dark-grey text-center my-2\" style=\"flex-basis: 210px;\">
            <div class=\"card-header bg-transparent border-0 m-3 justify-content-center\">
                <img src=\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4b/4b3dbd96ae9d67b17b46bf1023db0bb2710ef066_medium.jpg\" class=\"rounded-circle\" height=\"64px\"/>
            </div>
            <div class=\"title\" style=\"color: white\">
                <h4>User name</h4>
            </div>
            <div class=\"card-body text-light\">

                <p class=\"card-text\">
                    Points
                </p>

                <a href=\"https://google.com\"><i class=\"fab fa-steam text-white fa-fw fa-2x\"></i></a>
            </div>
        </div>";
}
?>






    </div>

</div>
