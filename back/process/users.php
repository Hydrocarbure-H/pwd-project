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
        }
        catch (PDOException $e)
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
                }
                catch (PDOException $e)
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