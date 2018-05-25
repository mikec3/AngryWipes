
<?php 
session_start();
?>
<html>

<body>

<?php
$_SESSION["bool"] = "true";
echo session_id() . "<br/>";
echo "Session variable: " .$_SESSION["bool"];

session_write_close();
?>

<a href = "/sessionTest2.php"> session two</a>

</html>
</body>