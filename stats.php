
<html>
   <? include('dbc.php'); ?>
    <link rel="stylesheet" href="Cert.css">      
<body>

<?php
$link = $dbc;

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "<div id = 'fixedElement'> </div>";
$keys =  array("SICU", "MICU", "CLC", "1E", "SCI", "2W", "BMTU", "5E", "6W", "7W", 
		"ED", "Primary_Care", "GI", "RDU", "Womans_Care", "Pain_Clinic", "East_Clinic", "South_Clinic", "West_Clinic", 
		"Radiology", "MRI", "Cath_Lab", "IR", "Environmental", "Kitchen", "Admin", "Student");
$arg=array_fill_keys($keys, ' ');
foreach($arg as $unit => $unit_value) {
$quer = $link ->prepare("SELECT * FROM angry_wipes_test WHERE unit = ?");
$quer -> bind_param("s", $unit);
$quer -> execute();
$result = $quer->get_result();
$unit_value= $result->num_rows;	
$arg[$unit] = $unit_value;	// assings values to keys example. key: SICU = value: 4 
}
//echo $arg["SICU"];		// echo SICU value
arsort($arg);		// sort array by value descending
$i = 1;
echo "<div class = 'container'>";
 echo "<h1 style='text-align: center'> Leaderboard </h1> ";
 echo "<a id='gameLink' href='http://www.mysicu.com/games/wipeout'> Back to game </a>";
foreach($arg as $unit => $unit_value){
echo "<div class='statDisplay'><p id='placing'>" . $i . " Place:</p><p id='unit'>" 
	. $unit . " </p> <p id='value'>" . $unit_value . "</p><p id='t'> toilets saved</p></div>";
$i++;
}

echo "</div class = 'container'>";		// end of container

mysqli_close($link);
?>
    </body>
    </html>