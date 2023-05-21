<?php

include_once "../utils/utils.php";

/**
 * Connect to the database for the first time
 * @param $DB_HOST
 * @param $DB_USER
 * @param $DB_PASS
 * @return PDO
 */
function connect_firstime($DB_HOST, $DB_USER, $DB_PASS): PDO
{
    $db = null;
    try
    {
        $db = new PDO('mysql:host=' . $DB_HOST . ';charset=utf8mb4',
            $DB_USER,
            $DB_PASS);
    } catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
    return $db;
}

/**
 * Connect to the database
 * @return PDO
 */
function connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME): PDO
{
    $db = null;
    try
    {
        $db = new PDO('mysql:host=' . $DB_HOST . ';dbname=' . $DB_NAME . ';charset=utf8mb4',
            $DB_USER,
            $DB_PASS);
    } catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
    return $db;
}
