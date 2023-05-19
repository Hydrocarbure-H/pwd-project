<?php
function display_errors($display = true): void
{
    $display = $display ? 1 : 0;
    ini_set('display_errors', $display);
    ini_set('display_startup_errors', $display);
    error_reporting(E_ALL);
}

function display_response($type, $message, $code): void
{
    $response = array(
        "code" => $code,
        "type" => $type,
        "message" => $message
    );
    echo "<pre>";
    echo json_encode($response, JSON_PRETTY_PRINT);
    echo "</pre>";
    die();
}