<?php
require_once 'model.php';
require_once 'controllers.php';

$uri = $_SERVER['REQUEST_URI'];
if ($uri == '/') {
    list_action();
} elseif ($uri == '/index.php/projects?id='.($_GET['id']) && isset($_GET['id']) && get_project($_GET['id'])!= FALSE) {
    show_action($_GET['id']);
} else {
    header('Status: 404 Not Found');
    echo '<html><body><h1>Page Not Found</h1></body></html>';
}
?>