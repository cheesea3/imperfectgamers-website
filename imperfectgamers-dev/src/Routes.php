<?php declare(strict_types = 1);

return [
    ['GET', '/', ['igmain\Controllers\Homepage', 'show']],
    ['GET', '/{slug}', ['igmain\Controllers\Page', 'show']],
];