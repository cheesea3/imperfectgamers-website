<div class="col-12">
    <div class="jumbotron bg-transparent justify-content-center text-center">
        <div class="container well">
            <h1 class="text-center">

                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Wait a second!</strong> You should know that this page is currently under development!.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

            </h1>


                <div class="col-md-10">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="index.php?page=<?= $Previous; ?>" aria-label="Previous">
                                    <span aria-hidden="true">&laquo; </span>
                                </a>
                            </li>
                            <?php for($i = 1; $i<= $pages; $i++) : ?>
                                <li class="page-item"><a class="page-link" href="index.php?page=<?= $i; ?>"><?= $i; ?></a></li>
                            <?php endfor; ?>
                            <li>
                                <a class="page-link" href="index.php?page=<?= $Next; ?>" aria-label="Next">
                                    <span aria-hidden="true"> &raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="text-center" style="margin-top: 20px; " class="col-md-2">
                    <form class="form-inline" method="post" action="#">
                        <select class="form-control" name="limit-records" id="limit-records">
                            <option disabled="disabled" selected="selected"> Records </option>
                            <?php foreach([10,100,500,1000,5000] as $limit): ?>
                                <option <?php if( isset($_POST["limit-records"]) && $_POST["limit-records"] == $limit) echo "selected" ?> value="<?= $limit; ?>"><?= $limit; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </form>
                </div>

            <div style="height: 600px; overflow-y: auto;">
                <table id="" class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Steam ID</th>
                        <th>Player</th>
                        <th>points</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach($players as $user) :  ?>
                        <tr>
                            <td><?= $user['steamid']; ?></td>
                            <td><?= $user['name']; ?></td>
                            <td><?= $user['points']; ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>


            </div>

            <div style="position: fixed; bottom: 10px; left: 10px; color: red;">
                <strong>
UNDER DEVELOPMENT
                </strong>
            </div>
            <script type="text/javascript">
                $(document).ready(function(){
                    $("#limit-records").change(function(){
                        $('form').submit();
                    })
                })
            </script>



























        <h2>Find a user</h2>
        <p>Type something in the input field to search the table for steam user, titles, or ranks:</p>
        <input class="form-control" id="myInput" type="text" placeholder="Search..">
        <br>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Steam</th>
                <th>Titles</th>
                <th>Rank</th>
            </tr>
            </thead>
            <tbody id="myTable">
            <tr>
                <td>Xed</td>
                <td>Rapper</td>
                <td>VIP</td>
            </tr>
            <tr>
                <td>Gaga</td>
                <td>IG</td>
                <td>VIP</td>
            </tr>
            <tr>
                <td>Drew</td>
                <td>Rapper, DJ, IG</td>
                <td>None</td>
            </tr>
            <tr>
                <td>Quentin</td>
                <td>Singer, DJ</td>
                <td>VIP</td>
            </tr>
            </tbody>
        </table>
        <!-- Start First Row  -->
        <div class="card-deck">

            <!-- Loop -->
            <?php for($i = 0; $i < 3; $i++) {
                echo "            <div class=\"card card-splash\">
                <div class=\"icon\">
                    <i class=\"fa fa-credit-card\" style=\"font-size: 64px; color: #FFFFFF\"></i>
                </div>
                <div class=\"card-content\">
                    <h4 class=\"card-title\">This is the title of the card?</h4>
                    <p class=\"card-description\"> This is the title of the card. Swag swag swag title lol 123 plaplp lorem.</p>
                </div>
                <div class=\"card-link-footer\" >
                    <a href=\"#\" class=\" \"> call to da action</a>
                </div>
            </div>";
            }
            ?>




        </div>


    </div>
</div>
