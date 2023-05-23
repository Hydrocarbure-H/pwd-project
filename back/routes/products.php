<?php
include_once "../utils/utils.php";
include_once "../db/connect.php";
include_once "../constants.php";
include_once "../process/products.php";

$db = null;
if (isset($DB_PASS) && isset($DB_USER) && isset($DB_HOST) && isset($DB_NAME))
{
    $db = connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
}
else
{
    display_response("error", "Database connection failed", 500);
}
// Check if the request is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
    display_errors(false);
    // Check if the request is for a specific product
    if (isset($_GET['query']))
    {
        switch ($_GET['query'])
        {
            // Get all products
            case 'all':
                all($db);
                break;
            // Get all products from a specific category
            case 'category':
                category($db);
                break;
            // Get all products from a specific category
            case 'categories':
                categories($db);
                break;
            // Get all products from a specific vendor
            case 'vendor':
                vendor($db);
                break;
            // Get a specific product
            case 'product':
                product($db);
                break;
            // Get all products on flash sale
            case 'flash':
                flash($db);
                break;
            default:
                display_response("error", "Unknown request.", 403);
                break;
        }
    }
    else
    {
        display_response("error", "Query parameter missing.", 403);
    }
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $_POST = json_decode(file_get_contents("php://input"), true);
    // Check if the request is for a specific product
    if (isset($_POST['query']))
    {
        switch ($_POST['query'])
        {
            // Add a product to the shopcart
            // Add a product to the db
            case 'add_product':
                add_product($db);
                break;
            // Add a product to the db
            case 'remove_product':
                remove_product($db);
                break;
            default:
                display_response("error", "Unknown request.", 403);
                break;
        }
    }
    else
    {
        display_response("error", "Query parameter missing.", 403);
    }
}
else
{
    display_response("error", "Unknown request.", 403);
}