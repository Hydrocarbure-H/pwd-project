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
    cors();
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($code);
    $response = array(
        "code" => $code,
        "type" => $type,
        "message" => $message
    );
    echo json_encode($response, JSON_PRETTY_PRINT);
    die();
}

function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: *");

        exit(0);
    }
}