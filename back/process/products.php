<?php

/**
 * Get all products
 * @param $db
 * @return void
 */
function all($db): void
{
    $query = $db->prepare('SELECT * FROM products');
    $query->execute();
    $products = $query->fetchAll(PDO::FETCH_ASSOC);
    if (count($products) === 0)
    {
        display_response("error", "No products found.", 404);
    }
    else
    {
        display_response("success", $products, 200);
    }
}

/**
 * Get all products from a specific category
 * @param $db
 * @return void
 */
function category($db): void
{
    if (isset($_GET['id']))
    {
        $id = $_GET['id'];
        $query = $db->prepare('SELECT * FROM products WHERE category_id = :id');
        $query->execute([
            'id' => $id
        ]);
        $products = $query->fetchAll(PDO::FETCH_ASSOC);
        if (count($products) === 0)
        {
            display_response("error", "No products found for this category.", 404);
        }
        else
        {
            display_response("success", $products, 200);
        }
    }
    else
    {
        display_response("error", "Id parameter missing.", 403);
    }
}

/**
 * Get all products from a specific vendor
 * @param $db
 * @return void
 */
function vendor($db): void
{
    if (isset($_GET['id']))
    {
        $id = $_GET['id'];
        $query = $db->prepare('SELECT * FROM products WHERE vendor_id = :id');
        $query->execute([
            'id' => $id
        ]);
        $products = $query->fetchAll(PDO::FETCH_ASSOC);
        if (count($products) === 0)
        {
            display_response("error", "No products found for this vendor.", 404);
        }
        else
        {
            display_response("success", $products, 200);
        }
    }
    else
    {
        display_response("error", "Id parameter missing.", 403);
    }

}

/**
 * Get a specific product
 * @param $db
 * @return void
 */
function product($db)
{
    if (isset($_GET['id']))
    {
        $id = $_GET['id'];
        $query = $db->prepare('SELECT * FROM products WHERE id = :id');
        $query->execute([
            'id' => $id
        ]);
        $product = $query->fetch(PDO::FETCH_ASSOC);
        if (count($product) === 0)
        {
            display_response("error", "No product found.", 404);
        }
        else
        {
            display_response("success", $product, 200);
        }
    }
    else
    {
        display_response("error", "Id parameter missing.", 403);
    }
}

/**
 * Get all products on flash sale
 * @param $db
 * @return void
 */
function flash($db)
{
    $query = $db->prepare('SELECT * FROM products WHERE flash_sale = 1');
    $query->execute();
    $products = $query->fetchAll(PDO::FETCH_ASSOC);
    if (count($products) === 0)
    {
        display_response("error", "No flash products found.", 404);
    }
    else
    {
        display_response("success", $products, 200);
    }
}
