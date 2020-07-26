<html>
<?php require_once("config/dbclass.php");
?>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="main.css">
</head>


<body>
<div class="header">
<h1>Imperfect Gamers</h1>
</div>

<div class="row">
<div class="col-3">
    <div class="sidebar">
    <h1>Search</h1>
        <label for="search-player">Search player:</label>
        <label for="search-desc">
        </label>
        <input type="search" id="site-search" name="q"
               aria-label="Search for a player">

        <button>Search</button>

    </div>
</div>

     <div class="col-9">
         <h1>Stats</h1>
         <p>Top ten swaggy ppl</p>
         <table class="tbl-qa">
             <thead>
             <tr>
                 <th class="table-header" width="20%">STEAM</th>
                 <th class="table-header" width="40%">Name</th>
                 <th class="table-header" width="20%">Rank</th>
                 <th class="table-header" width="5%">Last seen</th>
             </tr>
             </thead>
             <tbody id="table-body">
             <?php
             if(!empty($result)) {
                 foreach($result as $row) {
                     ?>
                     <tr class="table-row">
                         <td><?php echo $row["steamid"]; ?></td>
                         <td><?php echo $row["name"]; ?></td>
                         <td><?php echo $row["rank"]; ?></td>
                         <td><?php echo date("Y-m-d", $row["lastseen"]); ?></td>
                     </tr>
                     <?php
                 }
             }
             ?>
             </tbody>
         </table>
     </div>
</div>




    <h1>titles</h1>
    <p>alot of swaggy ppl with titles</p>
    <table class="tbl-qa">
        <thead>
        <tr>
            <th class="table-header" width="20%">STEAM</th>
            <th class="table-header" width="40%">NAME</th>
            <th class="table-header" width="40%">TITLE</th>
        </tr>
        </thead>
        <tbody id="table-body">
        <?php
        if(!empty($stmt)) {
            foreach($stmt as $row) {
                ?>
                <tr class="table-row">
                    <td><?php echo $row["steamid"]; ?></td>
                    <td><?php  EchoPlayerName($row["steamid"]); ?></td>
                    <td><?php echo $row["title"]; ?></td>
                </tr>
                <?php
            }
        }
        ?>
        </tbody>
    </table>
</div>




<div class="footer">
    <p>imperfectgamers.org</p>
</div>
</body>








</html>
