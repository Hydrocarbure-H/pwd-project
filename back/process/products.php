<?php

/**
 * Get all products
 * @param $db
 * @return void
 */
function all($db): void
{
    $query = $db->prepare('SELECT products.name as name, 
       categories.name as category, 
       price, 
       image, 
       users.firstname as vendor,
      users.id as vendor_id,
       description,
       products.id as id
        FROM products 
        INNER JOIN categories ON products.category_id = categories.id 
        INNER JOIN users ON products.vendor_id = users.id ORDER BY products.id ASC'
    );
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
    if (isset($_GET['name']))
    {
        $name = $_GET['name'];
        $query = $db->prepare('SELECT
        products.name as name, 
       categories.name as category, 
       price, 
       image, 
       users.firstname as vendor,
      users.id as vendor_id,
       description,
         products.id as id
        FROM products 
        INNER JOIN categories ON products.category_id = categories.id 
        INNER JOIN users ON products.vendor_id = users.id WHERE categories.name = :name ORDER BY products.id ASC'
        );
        $query->execute([
            'name' => $name
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

function categories($db): void
{
    $query = $db->prepare('SELECT * FROM categories');
    $query->execute();
    $categories = $query->fetchAll(PDO::FETCH_ASSOC);
    if (count($categories) === 0)
    {
        display_response("error", "No categories found.", 404);
    }
    else
    {
        display_response("success", $categories, 200);
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
        $query = $db->prepare('SELECT
        products.name as name, 
       categories.name as category, 
       price, 
       image, 
       users.firstname as vendor,
      users.id as vendor_id,
       description,
         products.id as id
        FROM products 
        INNER JOIN categories ON products.category_id = categories.id 
        INNER JOIN users ON products.vendor_id = users.id WHERE vendor_id = :id ORDER BY products.id ASC'
        );
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
function product($db): void
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
function flash($db): void
{
    $query = $db->prepare('SELECT products.name as name, 
       categories.name as category, 
       price, 
       image, 
       users.firstname as vendor,
       users.id as vendor_id,
       description,
         products.id as id
    FROM products 
        INNER JOIN categories ON products.category_id = categories.id 
        INNER JOIN users ON products.vendor_id = users.id 
    WHERE flash_sale = 1 LIMIT 6');

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


function add_product($db): void
{
    if (isset($_POST['token']))
    {
        $token = $_POST['token'];
        $query = $db->prepare('SELECT * FROM users WHERE token = :token');
        $query->execute([
            'token' => $token
        ]);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (count($user) === 0)
        {
            display_response("error", "User not found.", 404);
        }
        else
        {
            if ($user['account_type'] === "vendor")
            {
                // Check if all the parameters are set
                if (isset($_POST['name']) && isset($_POST['category_id']) && isset($_POST['price']) && isset($_POST['description']) && isset($_POST['image']))
                {
                    $name = $_POST['name'];
                    $category_id = $_POST['category_id'];
                    $price = $_POST['price'];
                    $description = $_POST['description'];
                    $vendor_id = $user['id'];
                    $image = $_POST['image'];
                    // Check if the category exists
                    $query = $db->prepare('SELECT * FROM categories WHERE id = :id');
                    $query->execute([
                        'id' => $category_id
                    ]);
                    $category = $query->fetch(PDO::FETCH_ASSOC);
                    if (!$category)
                    {
                        display_response("error", "Category not found.", 404);
                    }
                    $query = $db->prepare('INSERT INTO products (name, category_id, price, description, vendor_id, image) VALUES (:name, :category_id, :price, :description, :vendor_id, :image)');
                    $query->execute([
                        'name' => $name,
                        'category_id' => $category_id,
                        'price' => $price,
                        'description' => $description,
                        'vendor_id' => $vendor_id,
                        'image' => $image
                    ]);
                    if ($query->rowCount() > 0)
                    {
                        display_response("success", "Product added.", 200);
                    }
                    else
                    {
                        display_response("error", "Error while adding product.", 500);
                    }
                }
                else
                {
                    display_response("error", "Missing parameters.", 403);
                }
            }
            else
            {
                display_response("error", "You are not a vendor.", 403);
            }
        }
    }
}

function remove_product($db): void
{
    if (isset($_POST['token']))
    {
        $token = $_POST['token'];
        $query = $db->prepare('SELECT * FROM users WHERE token = :token');
        $query->execute([
            'token' => $token
        ]);
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (count($user) === 0)
        {
            display_response("error", "User not found.", 404);
        }
        else
        {
            if ($user['account_type'] === "vendor")
            {

                if (isset($_POST['product_id']))
                {
                    $id = $_POST['product_id'];
                    $query = $db->prepare('DELETE FROM products WHERE id = :id');
                    $query->execute([
                        'id' => $id
                    ]);
                    if ($query->rowCount() > 0)
                    {
                        display_response("success", "Product removed.", 200);
                    }
                    else
                    {
                        display_response("error", "Product not found.", 500);
                    }
                }
                else
                {
                    display_response("error", "Missing parameters.", 403);
                }
            }
            else
            {
                display_response("error", "You are not a vendor.", 403);
            }
        }
    }
}