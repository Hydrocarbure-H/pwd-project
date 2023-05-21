<?php

/**
 * Login a user
 * Auth method : a simple insertion in the database with a token
 * This token is constructed with random_bytes() and bin2hex()
 * This is not a real authentication method, but it's enough for this project
 * @param $db
 * @return void
 * @throws Exception
 */
function login($db): void
{
    if (isset($_POST['email']) && isset($_POST['password']))
    {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE email = :email');
            $query->execute([
                'email' => $email
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if ($user)
        {
            if ($password == $user['password'])
            {
                $token = bin2hex(random_bytes(32));
                try
                {
                    $query = $db->prepare('UPDATE users SET token = :token WHERE id = :id');
                    $query->execute([
                        'token' => $token,
                        'id' => $user['id']
                    ]);
                } catch (PDOException $e)
                {
                    display_response("error", $e->getMessage(), 500);
                }

                $user['token'] = $token;
                unset($user['password']);
                display_response("success", $user, 200);
            }
            else
            {
                display_response("error", "Wrong password.", 403);
            }
        }
        else
        {
            display_response("error", "User not found.", 404);
        }
    }
    else
    {
        display_response("error", "Email or password missing.", 403);
    }
}

/**
 * Register a user
 * @param $db
 * @return void
 */
function register($db): void
{
    if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST["account_type"]))
    {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $account_type = $_POST['account_type'];
        // Check if user already exists
        $query = null;
        try
        {
            $query = $db->prepare('SELECT * FROM users WHERE email = :email');
            $query->execute([
                'email' => $email
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }

        if ($query->fetch(PDO::FETCH_ASSOC))
        {
            display_response("error", "User already exists.", 403);
        }

        // Insert user
        try
        {
            $query = $db->prepare('INSERT INTO users(email, password, firstname, lastname, account_type) VALUES (:email, :password, :firstname, :lastname, :account_type)');
            $query->execute([
                'email' => $email,
                'password' => $password,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'account_type' => $account_type
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }
        display_response("success", "User registered.", 200);
    }
    else
    {
        display_response("error", "Missing parameters.", 403);
    }
}

function profile($db): void
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
        if ($user)
        {
            unset($user['password']);
            display_response("success", $user, 200);
        }
        else
        {
            display_response("error", "User not found.", 404);
        }
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}

/**
 * Logout a user
 * @param $db
 * @return void
 */
function logout($db): void
{
    if (isset($_POST['token']) && $_POST['token'] != "")
    {
        $token = $_POST['token'];
        try
        {
            $query = $db->prepare('UPDATE users SET token = NULL WHERE token = :token');
            $query->execute([
                'token' => $token
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }
        display_response("success", "User disconnected.", 200);
    }
    else
    {
        display_response("error", "Token missing. Please reconnect.", 403);
    }
}

/**
 * Get Vendor's profile
 * @param $db
 */
function vendor_profile($db): void
{
    if (isset($_POST['vendor_id']) && $_POST['vendor_id'] != "")
    {
        $vendor_id = $_POST['vendor_id'];

        $query = null;
        try
        {
            $query = $db->prepare('SELECT firstname, lastname, email, account_type, address, created_at FROM users WHERE id = :user_id AND account_type = "vendor"');
            $query->execute([
                'user_id' => $vendor_id
            ]);
        } catch (PDOException $e)
        {
            display_response("error", $e->getMessage(), 500);
        }
        if ($query->rowCount() == 0)
        {
            display_response("error", "Vendor not found.", 404);
        }
        else
        {
            $vendor = $query->fetch(PDO::FETCH_ASSOC);
            unset($vendor['password']);
            display_response("success", $vendor, 200);
        }
    }
    else
    {
        display_response("error", "Missing parameters.", 403);
    }
}