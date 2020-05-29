<?php require_once 'conn.php';?>
<?php require_once 'process.php';?>
<!DOCTYPE html>
<html>
<head>
    <title>
        LEARNING CRUD
    </title>
    <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

</head>
<body>

<div class="container">
<div class="row justify-content-center">
    <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Location</th>
            <th colspan="2">Action</th>
            </tr>
        </thead>
        <?php
        while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row['name']; ?></td>
            <td><?php echo $row['location']; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</div>



<?php
pre_r($result->fetch_assoc());

function pre_r( $array ) {
echo '<pre>';
    print_r($array);
    echo '</pre>';
}
?>

<div class="row justify-content-center">
<form action="process.php" method="POST">
    <div class="form-group">
    <label>Name</label>
    <input type="type" name="name" class="form-control" value="Enter your name">
    </div>
    <div class="form-group">
    <label>Location</label>
    <input type="text" name="location" class="form-control" value="Enter your location">
    </div>
    <div class="form-group">
    <button type="submit" class="btn btn-primary" name="save">Save</button>
    </div>
</form>
</div>




<style>
    td, th {
    padding: 15px;
    }
</style>
<table>
    <caption>What i'm going to use</caption>
<tr>
    <th>Elements</th>
    <th>Class</th>
    <th>What does it do</th>
</tr>
    <tr>
        <td>div</td>
        <td>Justify-content-center</td>
        <td>aligns flexible content to the center using it's available space (horizontally).
        </td>
    </tr>
    <tr>
        <td>div</td>
        <td>Form group</td>
        <td>Used to wrap labels and form controls</td>
    </tr>
    <tr>
        <td>div</td>
        <td>alert alert-warning</td>
        <td>Wrapping this around the text makes the design suitable for alerts</td>
    </tr>
    <tr>
        <td>div</td>
        <td>alert alert-danger</td>
        <td>Wrapping this around the text makes the design suitable for alerts</td>
    </tr>
    <tr>
        <td>div</td>
        <td>alert alert-success</td>
        <td>Wrapping this around the text makes the design suitable for alerts</td>
    </tr>
    <tr>
        <td>div</td>
        <td>row</td>
        <td>Wrappers for columns, adds a gutter in between each line and if you want a new row,</td>
    </tr>
    <tr>
        <td>input</td>
        <td>form-control</td>
        <td>helps with the appearance, focus state, sizing, and more. applied on &lt;input&gt;, &lt;select&gt;, and &lt;textarea&gt;.</td>
    </tr>
    <tr>
        <td>input</td>
        <td>btn btn-primary</td>
        <td>Wrapping this around the button makes the design suitable for alerts</td>
    </tr>
    <tr>
        <td>input</td>
        <td>btn btn-info</td>
        <td>Wrapping this around the button makes the design suitable for alerts</td>
    </tr>
</table>

</div>
</body>
</html>
