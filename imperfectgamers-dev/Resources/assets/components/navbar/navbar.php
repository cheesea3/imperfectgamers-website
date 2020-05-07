<nav class="navbar navbar-expand-lg navbar-dark bg-ig">
    <div class="container" style="user-select: none">
        <a class="navbar-brand" href="/"><object data="https://cdn.imperfectgamers.org/inc/assets/img/logo.svg" alt="Imperfect Gamers Brand Logo" type="image/svg+xml" height="48px" width="48px"></object></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item <?php if ($CURRENT_PAGE == "Index") {?>active<?php }?>">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item <?php if ($CURRENT_PAGE == "Records") {?>active<?php }?>">
                    <a class="nav-link" href="#">Records</a>
                </li>
                <li class="nav-item <?php if ($CURRENT_PAGE == "Activity") {?>active<?php }?>">
                <a class="nav-link" href="#">Activity</a>
                </li>
                <li class="nav-item <?php if ($CURRENT_PAGE == "Bans") {?>active<?php }?>">
                <a class="nav-link" href="#">Bans</a>
                </li>
                <li class="nav-item <?php if ($CURRENT_PAGE == "Store") {?>active<?php }?>">
                <a class="nav-link" href="#">Store</a>
                </li>
            </ul>
            <ul class="nav justify-content-end">
                <button type="button" class="btn btn-dark"><a href="/forum" target="_blank" style="text-decoration: none; color: white">Forums</a></button
            </ul>
        </div>
    </div>
</nav>
