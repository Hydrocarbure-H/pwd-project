<?php

include_once "../utils/utils.php";

/**
 * Construct database
 * @param $db
 * @return void
 */
function construct($db): void
{
    try
    {
        $db->exec('CREATE DATABASE IF NOT EXISTS kiventout');
        $db->exec('USE kiventout');
    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }

    try
    {
        // create table users
        $db->exec('CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            account_type VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');
    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }

    try
    {
        // Create table categories
        $db->exec('CREATE TABLE IF NOT EXISTS categories (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');

    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
    try
    {
        // create table products
        $db->exec('CREATE TABLE IF NOT EXISTS products (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category_id INT UNSIGNED NOT NULL REFERENCES categories(id),
            price FLOAT NOT NULL,
            description TEXT NOT NULL,
            vendor_id INT UNSIGNED NOT NULL REFERENCES users(id),
            flash_sale BOOLEAN NOT NULL DEFAULT FALSE,
            image VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');

    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
    try
    {
        // create table shopping_cart
        $db->exec('CREATE TABLE IF NOT EXISTS shopping_cart (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL REFERENCES users(id),
            product_id INT UNSIGNED NOT NULL REFERENCES products(id),
            quantity INT UNSIGNED NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');

    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
}
