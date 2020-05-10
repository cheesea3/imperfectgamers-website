<div class="alert alert-dark alert-dismissible fade show" role="alert">
    <strong>What's going on?!!</strong> The site is slowly being updated! Thank you for your patience!    <div style="float: right"><?php

    $jsonIn = file_get_contents('https://discordapp.com/api/guilds/193909594270072832/widget.json');
    $JSON = json_decode($jsonIn, true);

    $membersCount = ($JSON['presence_count']);

    echo "Members online: " . $membersCount;
        ?></div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
