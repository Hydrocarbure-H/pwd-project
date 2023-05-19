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
        }
        catch (PDOException $e)
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
                $query = $db->prepare('INSERT INTO shopcart (user_id, product_id) VALUES (:user_id, :product_id)');
                $query->execute([
                    'user_id' => $user['id'],
                    'product_id' => $product_id
                ]);
            }
            catch (PDOException $e)
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
        }
        catch (PDOException $e)
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
        if (isset($_POST['product_id']) && $_POST['product_id'] != "")
        {
            $product_id = $_POST['product_id'];
            $query = null;
            try
            {
                $query = $db->prepare('DELETE FROM shopcart WHERE user_id = :user_id AND product_id = :product_id');
                $query->execute([
                    'user_id' => $user['id'],
                    'product_id' => $product_id
                ]);
            }
            catch (PDOException $e)
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
        }
        catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if (!$user)
        {
            unset($user['password']);
            display_response("error", "User not found. Please reconnect", 404);
        }
        // TO DO : Buy the shopping cart following instructions in project description
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}