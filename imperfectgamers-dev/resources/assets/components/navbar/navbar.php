<nav class="navbar navbar-expand-lg navbar-dark bg-ig">
    <div class="container" style="user-select: none">
            <div class="mainfade">
                <a class="navbar-brand">
                    <object data="https://cdn.imperfectgamers.org/inc/assets/img/logo.svg" alt="Imperfect Gamers Brand Logo" type="image/svg+xml" height="48px" width="48px">
                    </object>
                </a>
            </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item <?php if ($CURRENT_PAGE == "Index") {?>active<?php }?>">
                    <a class="nav-link" href="/">
                        Home
                        <?php if ($CURRENT_PAGE == "Index") {?><span class="sr-only">(current)</span><?php }?>
                    </a>
                </li>

                <li class="nav-item <?php if ($CURRENT_PAGE == "Records") {?>active<?php }?>">
                    <a class="nav-link" href="/records">
                        Records
                        <?php if ($CURRENT_PAGE == "Records") {?><span class="sr-only">(current)</span><?php }?>
                    </a>
                </li>

                <li class="nav-item <?php if ($CURRENT_PAGE == "Activity") {?>active<?php }?>">
                    <a class="nav-link" href="/activity">
                        Activity
                        <?php if ($CURRENT_PAGE == "Activity") {?><span class="sr-only">(current)</span><?php }?>
                    </a>
                </li>

                <li class="nav-item <?php if ($CURRENT_PAGE == "Bans") {?>active<?php }?>">
                    <a class="nav-link" href="/bans">
                        Bans
                        <?php if ($CURRENT_PAGE == "Bans") {?><span class="sr-only">(current)</span><?php }?>
                    </a>
                </li>


                <li class="nav-item <?php if ($CURRENT_PAGE == "Apply") {?>active<?php }?>">
                    <a class="nav-link" href="/apply">
                        Apply
                        <?php if ($CURRENT_PAGE == "Store") {?><span class="sr-only">(current)</span><?php }?>
                    </a>
                </li>

            </ul>
            <ul class="nav justify-content-end">
                <button type="button" class="btn btn-dark"><a href="/store" style="text-decoration: none; color: white">
                        Store
                        <?php if ($CURRENT_PAGE == "Store") {?><span class="sr-only">(current)</span><?php }?>
                    </a></button
            </ul>
        </div>
    </div>
</nav>
