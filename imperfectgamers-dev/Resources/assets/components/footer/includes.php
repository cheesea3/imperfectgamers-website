<!-- Discord widget-->
<script src="https://cdn.imperfectgamers.org/inc/assets/npm/widget/crate.js" async defer>
    const button = new Crate({
        server: '193909594270072832',
        channel: '366373736766636042',
        shard: 'https://disweb.dashflo.net',
        color: '#ff3535'
    })
</script>
<script>$(document).ready(function() {
        $(".mainfade").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1500,
            outDuration: 800,
            linkElement: '.animsition-link',
            // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            loadingInner: '', // e.g '<img src="loading.svg" />'
            timeout: false,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            browser: [ 'animation-duration', '-webkit-animation-duration'],
            // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
            // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
            overlay : false,
            overlayClass : 'animsition-overlay-slide',
            overlayParentElement : 'body',
            transition: function(url){ window.location.href = url; }
        });
    });</script>
