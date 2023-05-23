<?php

/**
 * Get all products
 * @param $db
 * @return void
 */
function add($db): void
{
    if (isset($_POST['token']) && $_POST['token'] != "")
    {
        $token = $_POST['token'];
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE token = :token');
            $query->execute([
                'token' => $token
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (!$user)
        {
            unset($user['password']);
            display_response("error", "User not found. Please reconnect", 404);
        }

        // Add to shopcart table
        if (isset($_POST['product_id']) && $_POST['product_id'] != "")
        {
            $product_id = $_POST['product_id'];
            $query = null;
            try
            {
                $query = $db->prepare('INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES (:user_id, :product_id, 1)');
                $query->execute([
                    'user_id' => $user['id'],
                    'product_id' => $product_id
                ]);
            } catch (PDOException $e)
            {
                display_response("error", $e->getMessage(), 500);
            }

            display_response("success", "Product added to shopcart.", 200);
        }
        else
        {
            display_response("error", "Product id missing.", 403);
        }
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}

/**
 * Remove a product from shopcart
 * @param $db
 * @return void
 */
function remove($db): void
{
    if (isset($_POST['token']) && $_POST['token'] != "")
    {
        $token = $_POST['token'];
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE token = :token');
            $query->execute([
                'token' => $token
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (!$user)
        {
            unset($user['password']);
            display_response("error", "User not found. Please reconnect", 404);
        }

        // Remove from shopcart table
        if (isset($_POST['id']) && $_POST['id'] != "")
        {
            $product_id = $_POST['id'];
            $query = null;
            try
            {
                // Improve : multiple remove if the user has multiple times the same product in his shopcart
                $query = $db->prepare('DELETE FROM shopping_cart WHERE id = :product_id');
                $query->execute([
                    'product_id' => $product_id
                ]);
            } catch (PDOException $e)
            {
                display_response("error", $e->getMessage(), 500);
            }

            display_response("success", "Product removed from shopcart.", 200);
        }
        else
        {
            display_response("error", "Product id missing.", 403);
        }
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}

/**
 * Validate the shopping cart - TODO
 * @param $db
 * @return void
 */
function validate($db): void
{
    if (isset($_POST['token']) && $_POST['token'] != "")
    {
        $token = $_POST['token'];
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE token = :token');
            $query->execute([
                'token' => $token
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (!$user)
        {
            unset($user['password']);
            display_response("error", "User not found. Please reconnect", 404);
        }
        // Get the total price of the shopping cart
        $query = null;
        try
        {
            $query = $db->prepare('SELECT SUM(products.price) as total FROM shopping_cart INNER JOIN products ON shopping_cart.product_id = products.id WHERE shopping_cart.user_id = :user_id');
            $query->execute([
                'user_id' => $user['id']
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }
        $total = $query->fetch(PDO::FETCH_ASSOC);
        if (!$total)
        {
            display_response("error", "Shopping cart empty.", 404);
        }
        // Check the amount the user has sent in post request
        if (isset($_POST['amount']) && $_POST['amount'] != "")
        {
            $amount = $_POST['amount'];
            $total['total'] = round($total['total'], 2);
            if ($amount >= $total['total'])
            {
                $query = null;
                try
                {
                    $query = $db->prepare('DELETE FROM shopping_cart WHERE user_id = :user_id');
                    $query->execute([
                        'user_id' => $user['id']
                    ]);
                } catch (PDOException $e)
                {
                    display_response("error", $e->getMessage(), 500);
                }
                display_response("success", "Payment accepted.", 200);
            }
            else
            {
                display_response("error", "Payment refused.", 403);
            }
        }
        else
        {
            display_response("error", "Amount missing.", 403);
        }
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}

/**
 * Get all products in shopcart
 * @param $db
 * @return void
 */
function get($db): void
{
    display_errors(false);
    if (isset($_POST['token']) && $_POST['token'] != "")
    {
        $token = $_POST['token'];
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE token = :token');
            $query->execute([
                'token' => $token
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (!$user)
        {
            unset($user['password']);
            display_response("error", "User not found. Please reconnect", 404);
        }

        // Get all products from shopcart table
        $query = null;
        try
        {
            $query = $db->prepare('SELECT 
                products.name as name, 
                products.price as price, 
                products.image as image, 
                products.description as description, 
                categories.name as category,
                shopping_cart.id as id 
                FROM shopping_cart 
                    INNER JOIN products ON shopping_cart.product_id = products.id 
                    INNER JOIN categories ON products.category_id = categories.id 
                WHERE shopping_cart.user_id = :user_id');
            $query->execute([
                'user_id' => $user['id']
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $shopcart = $query->fetchAll(PDO::FETCH_ASSOC);
        if (!$shopcart)
        {
            display_response("success", "Shopcart empty.", 204);
        }

        $products = [];
        foreach ($shopcart as $product)
        {
            $products[] = [
                'id' => $product['id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'image' => $product['image'],
                'description' => $product['description'],
                'category' => $product['category']
            ];
        }

        display_response("success", $products, 200);
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}