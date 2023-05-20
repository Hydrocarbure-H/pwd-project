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
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    http_response_code($code);
    $response = array(
        "code" => $code,
        "type" => $type,
        "message" => $message
    );
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response, JSON_PRETTY_PRINT);
    die();
}