<main class="Site-content">
    <div style="text-align: center; color: white">
        <h1>Page not found</h1>
        <p><?php
            $path = $_SERVER['DOCUMENT_ROOT'];
            $path .= "/resources/assets/classes/class-404.php";
            include_once($path);
            ?>
        </p>
    </div>

</main>
