

<?php
$production = true;		// set true if LIVE ON THE AIR!!!

if ($production){
	// NOT yet tested on freehostia servers.
$dbc = mysqli_connect("localhost", "miccou3_test", "password", "miccou3_test");

} else {
$dbc = mysqli_connect("localhost", "root", "root", "test");
}
?>
    