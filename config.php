<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', 'sql201.epizy.com');
define('DB_USERNAME', 'epiz_26002047');
define('DB_PASSWORD', 'm26ZxyEA2Ewca3C');
define('DB_NAME', 'epiz_26002047_seffflix');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>