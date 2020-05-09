<!-- Discord widget-->
<script src="https://cdn.imperfectgamers.org/inc/assets/npm/widget/crate.js" async defer>
    const button = new Crate({
        server: '193909594270072832',
        channel: '366373736766636042',
        shard: 'https://e.widgetbot.io',
        color: '#ff3535'
    })
</script>

<script>
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 60) {
                $('#toTopBtn').fadeIn();
            } else {
                $('#toTopBtn').fadeOut();
            }
        });

        $('#toTopBtn').click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    });
    </script>

