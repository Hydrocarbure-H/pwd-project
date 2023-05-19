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
            email VARCHAR(255) DEFAULT NULL,
            password VARCHAR(255) DEFAULT NULL,
            firstname VARCHAR(255) DEFAULT NULL,
            lastname VARCHAR(255) DEFAULT NULL,
            address VARCHAR(255) DEFAULT NULL,
            account_type VARCHAR(255) DEFAULT NULL,
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
            FOREIGN KEY (category_id) REFERENCES categories(id),
            FOREIGN KEY (vendor_id) REFERENCES users(id),
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category_id INT UNSIGNED,
            price FLOAT NOT NULL,
            description TEXT NOT NULL,
            vendor_id INT UNSIGNED,
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
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id),
            user_id INT UNSIGNED,
            product_id INT UNSIGNED,
            quantity INT UNSIGNED NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');

    }
    catch (PDOException $e)
    {
        display_response("error", $e->getMessage(), 500);
    }
}
