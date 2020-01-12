<?php
define('ISITSAFETORUN', TRUE);
error_reporting(E_ALL);
ini_set('display_errors', 1);
$databasename ='techdefs.sqlite';
$stylesheet = '';
$javascript ='';
$mycss='';
$pagetitle = 'Extract data from Table';
require 'html5head.php';
require 'opendatabase.php';
require 'sformdata.php';
echo "<p>Database opened. Now reading some data back from the database to confirm it is working</p>";
$sql='select term , definition from mydefinitions where term like :term';
$stmt = $db->prepare( $sql); 
$stmt->bindValue(":term" , '%'.$webdata['term'].'%' , SQLITE3_TEXT); 
$result = $stmt->execute(); 
while ($row = $result->fetchArray()){ 
    echo '<p>' . htmlspecialchars($row['term'])  . " : " . htmlspecialchars($row['definition']).'</p>';
}

?>


     
