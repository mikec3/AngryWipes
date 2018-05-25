

<html>
    <link rel="stylesheet" href="Cert.css">
           <? include('dbc.php'); ?>
<body>
<?php
// if ($production){
// 	// if production is true, write below code to document so that user is redirected if
// 	// accessing page from unauthorized URL.
// echo "<script>
//   if (document.referrer =='http://www.mysicu.com/games/wipeout/index.html' || document.referrer == 
//   
//   
//   'http://www.mysicu.com/games/wipeout/addStats.php') {
//   	
//   } else {
//   	       document.write('attempting to access this page from unauthorized source: ' + document.referrer);
//   	       location.href='http://www.mysicu.com/games/wipeout/index.html'; 
//    }
//   </script>" ;
//   }
?>
<div class= "addStatContainer">
<div class = "addStatBox">
<h1> Select your unit! </h1>
<div class="unitSelect" >
         <form name = "myFirstForm" action = "" method = "post">
 <select name = "unit" >
 <optgroup>
  <option value="1E">1E rehab</option>
  <option value="2W">2 West</option>
  <option value="5E">5 East</option>
  <option value="6W">6 West</option>
  <option value="7W">7 West</option>
    <option value="Admin">Admin</option>
  <option value="BMTU">BMTU</option>
    <option value="CLC">CLC</option>
  <option value="Cath_Lab">Cath Lab</option>
  <option value="East_Clinic">East Clinic</option>
  <option value="ED">ED</option>
  <option value="Environmental">Environmental</option>
  <option value="GI">GI</option>
  <option value="IR">IR</option>
  <option value="Kitchen">Kitchen</option>
  <option value="MICU">MICU</option>
  <option value="MRI">MRI</option>
  <option value="Pain_Clinic">Pain Clinic</option>
  <option value="Primary_Care">Primary Care</option>
  <option value="RDU">RDU</option>
  <option value="Radiology">Radiology</option>
  <option value="SCI">SCI</option>
  <option value="SICU">SICU</option>
  <option value="South_Clinic">South Clinic</option>
  <option value="Student">Student</option>
  <option value="West_Clinic">West Clinic</option>
  <option value="Womans_Care">Womans Care</option>
  </optgroup>
</select>
            <br />
            <input id = "button" type = "submit" value ="Submit" name = "UnitSelected"/>
            <br />  
</form>
</div>
<div id='image'> </div>
</div>
</div>

<?php

 if (isset($_POST["UnitSelected"])){
$link = $dbc;

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;

$stmt = $link->prepare( "INSERT INTO `angry_wipes_test`(`unit`, `comp_date`) VALUES (?, CURDATE())");
$stmt->bind_param("s", $_POST["unit"] );
$stmt -> execute();

mysqli_close();

echo "<script>location.href='stats.php'; </script>";

}
?>  
    </body>
    </html>