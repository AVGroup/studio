<?php
define('SERVERNAME', 'localhost');
define('NAME', 'root');
define('PASSWORD', '123456');  


function connect_bd (){
    $link = mysql_connect(SERVERNAME, NAME, PASSWORD);
    if (!$link) {
        die('Ошибка соединения: ' . mysql_error());
    }
    mysql_select_db("studio",$link);
    mysql_query ("set_client='utf8'");
    mysql_query ("set character_set_results='utf8'");
    mysql_query ("set collation_connection='utf8_unicode_ci'");
    mysql_query ("SET NAMES utf8");
    return $link;
}


function get_all_projects(){
    $link = connect_bd();
    $result = mysql_query("SELECT * FROM projects", $link);
    $projects = array();
    while ($row = mysql_fetch_assoc($result)) {
        $projects[] = $row;
    }
    return $projects;
}

function get_project($id){
    $link = connect_bd();
    $result = mysql_query('SELECT * FROM photo WHERE idp ='.$id.'', $link);
    if(empty($result)){
        return FALSE;
    }
    $project = array();
    while ($row = mysql_fetch_assoc($result)) {
        $project[] = $row;
    }
    return $project;
}
?>
