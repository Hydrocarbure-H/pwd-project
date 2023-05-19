<?php
$request = $_SERVER['REQUEST_URI'];

switch ($request)
{
    case "/":
    case '/init' :
        require __DIR__ . '/routes/init.php';
        break;
    case '/products':
        require __DIR__ . '/routes/products.php';
        break;
    case '/users':
        require __DIR__ . '/routes/users.php';
        break;
    default:
        http_response_code(404);
        require __DIR__ . '/routes/errors/404.php';
        break;
}