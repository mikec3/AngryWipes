<html>
   <? include('dbc.php'); ?>
    <link rel="stylesheet" href="styles.css">
          
<body>

<?php
$link = $dbc;

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;


 echo "<p> mysqli_query test </p>";
 $sql =
   "SELECT *
    FROM angry_wipes_test
    ORDER BY unit"
;

if(!$result = $link->query($sql)){
    die('There was an error running the query [' . $link->error . ']');
}

$sicuTotal = 0;
$micuTotal = 0;
while($row = $result->fetch_assoc()){
    echo $row['player']. ' '. $row['unit']. '<br />';
    if ($row['unit'] == 'SICU') { $sicuTotal ++;}
    else if ($row['unit'] == 'MICU'){ $micuTotal++;}
}

echo ' <br/>';
echo 'SICU total: ' . $sicuTotal. '<br/>';
echo 'MICU total: ' . $micuTotal. '<br/>';

echo 'Total results: ' . $result->num_rows . '<br/>';

$arg = "SICU";
$arg1 = "mike";
$stmt = $link->prepare("SELECT * FROM angry_wipes_test WHERE unit = ? AND player = ?");
$stmt->bind_param("ss", $arg, $arg1);
$stmt -> execute();
$result = $stmt->get_result();
while ($row = $result -> fetch_assoc()){
	echo $row['unit'].  '<br/>';	
}

// ----------------
// $result=mysqli_query($link, $sql);
// $num=mysql_numrows($result);
// 
// 
// $i=0;
// while ($i < $num) {
//   
//     $player=mysql_result($result,$i,"angry_wipes_test.player");
//     $unit=mysql_result($result,$i,"angry_wipes_test.unit");
//     $date=mysql_result($result,$i,"angry_wipes_test.comp_date");
// 
//     };
//     
//     echo "<b> $player </b>
//             <b> $unit </b>
//             <b> $date </b></br>";
//     $i++;
// }
// 
// echo 'Total results: ' . $result->num_rows;
// 
 
 
 echo "<p> ending mysqli test</p>";
 
// $query="SELECT 
//             emp.first_name,
//             emp.last_name,
//             emp.BLS,
//             FROM emp
//             ORDER BY
//             emp.BLS ASC";
// $result=mysqli_query($link, $query);
// $num=mysql_numrows($result);
// mysqli_close();
// 
// $i=0;
// while ($i < $num) {
//     
//     $rowClass = 'green';
//     $first=mysql_result($result,$i,"emp.first_name");
//     $last=mysql_result($result,$i,"emp.last_name");
//     $BLS=mysql_result($result,$i,"emp.BLS");
//     $rowClass = 'green';
//     if ($first == 'Mike') {
//       $rowClass = 'red';  
//     };
//     
//     echo "<b class=" .$rowClass ."> $first </b>
//             <b> $last </b>
//             <b> $BLS </b></br>";
//     $i++;
// }

mysqli_close($link);
?>
    