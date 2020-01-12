<?php
define('ISITSAFETORUN', TRUE);
error_reporting(E_ALL);
ini_set('display_errors', 1);
$databasename ='techdefs.sqlite';
$stylesheet = '';
$javascript ='';
$mycss='';
$pagetitle = 'Create Database and Tables';
require 'html5head.php';
$db = new SQLite3($databasename);
echo"<p>Creating  SQLite database tables on the server</p>";


$sql = 'CREATE TABLE IF NOT EXISTS "mydefinitions" ("term" TEXT PRIMARY KEY NOT NULL , "definition" TEXT )';
$db->exec($sql) or die('Create table failed');


echo "<p>Database created.</p>"; 


$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('Router','A router is a networking device that forwards data packets between computer networks.')";
$db->exec($sql) or die('add data failed');
$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('Firewall','A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.')";
$db->exec($sql) or die('add data failed');
$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('Server','A server is a computer program or a device that provides functionality for other programs or devices, called clients.')";
$db->exec($sql) or die('add data failed');
$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('ISP','An Internet service provider (ISP) is an organization that provides services accessing and using the Internet.')";
$db->exec($sql) or die('add data failed');
$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('Broadband','Broadband is wide bandwidth data transmission which transports multiple signals and traffic types.')";
$db->exec($sql) or die('add data failed');
$sql = "INSERT OR REPLACE INTO 'mydefinitions' VALUES ('Database','A database is a collection of information that is organized so that it can be easily accessed, managed and updated.')";
$db->exec($sql) or die('add data failed');

echo "<p>Values added</p>"; 

require 'html5tail.php';
?>
