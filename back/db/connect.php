<?php

include_once "../utils/utils.php";
/**
 * Connect to the database
 * @return PDO
 */
function connect($DB_HOST, $DB_USER, $DB_PASS): PDO
{
    try
    {
        $db = new PDO('mysql:host=' . $DB_HOST,
            $DB_USER,
            $DB_PASS);
    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
    return $db;
}
