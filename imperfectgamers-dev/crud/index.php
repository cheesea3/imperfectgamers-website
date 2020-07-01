<html>
<?php include_once ("conn.php");
?>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    * {
        box-sizing: border-box;
    }
    .header {
        border: 1px solid red;
        padding: 15px;
        text-align: center;
    }
    .main {
        width: 75%;
        float: left;
        border: 1px solid red;
        padding: 15px

    }
    .sidebar {
        width: 25%;
        float: left;
        border: 1px solid red;
        padding: 15px
    }
</style>
</head>


<body>
<div class="header">
<h1>Imperfect Gamers</h1>
</div>


<div class="sidebar">
    <h1>Search</h1>
</div>

     <div class="main">
         <h1>Stats</h1>
     <table>
             <tr>
                 <th>Player</th>
                 <th>Joined</th>
                 <th>Last Seen</th>
             </tr>
             <tr>
                 <td>Jumpman</td>
                 <td>6/29/2020</td>
                 <td>6/30/2020</td>
             </tr>
         </table>
     </div>
</body>






</html>
