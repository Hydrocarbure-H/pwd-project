<?php
/**
 * Fill the database with some data from a JSON file
 */
function fill($db): void
{
    // Open the file in read mode db.json
    $file = fopen("../db/db.json", "r");
    // Read the file and store the content in a variable
    $content = fread($file, filesize("../db/db.json"));
    // Close the file
    fclose($file);
    // Decode the JSON content
    $json = json_decode($content, true);
    
    // Loop over the previous json to insert data in the database
    foreach ($json['data']['users'] as $user)
    {
        $query = $db->prepare('INSERT INTO users (email, password, firstname, lastname, account_type) VALUES (:email, :password, :firstname, :lastname, :account_type)');
        $query->execute([
            'firstname' => $user['firstname'],
            'lastname' => $user['lastname'],
            'email' => $user['email'],
            'password' => $user['password'],
            'account_type' => $user['account_type']
        ]);
    }

    foreach ($json['data']['categories'] as $category)
    {
        $query = $db->prepare('INSERT INTO categories (name) VALUES (:name)');
        $query->execute([
            'name' => $category['name']
        ]);
    }

    foreach ($json['data']['products'] as $product)
    {
        $query = $db->prepare('INSERT INTO products (name, description, price, category_id, vendor_id, image, flash_sale) VALUES (:name, :description, :price, :category_id, :vendor_id, :image, :flash_sale)');
        $query->execute([
            'name' => $product['name'],
            'description' => $product['description'],
            'price' => $product['price'],
            'category_id' => $product['category_id'],
            'vendor_id' => $product['vendor_id'],
            'image' => $product['image'],
            'flash_sale' => $product['flash_sale']
        ]);
    }
}