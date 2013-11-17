<?php
function list_action()
{
    $projects = get_all_projects();
    require 'templates/home.php';
}

function show_action($id)
{
    $project = get_project($id);
    require 'templates/projects.php';
}
?>