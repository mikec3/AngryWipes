
<html>
<body>

<?php
session_start();
echo session_id();
echo "sessiontest two <br/>";
echo "Session variable: " .$_SESSION["bool"];
echo "<br/>";
echo $_SESSION;
session_write_close();
?>

<a href = "/sessionTest.php"> sessionTest two</a>

</html>
</body>