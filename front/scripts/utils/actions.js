import {post_request} from "./requests.js";
import display_message from "./errors.js";

/**
 * Add a vendor to the database
 * @param vendor
 */
export function add_vendor(vendor)
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "add_vendor",
        "firstname": vendor.firstname,
        "lastname": vendor.lastname,
        "email": vendor.email,
        "password": vendor.password,
        "address": vendor.address,
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Vendeur ajouté ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}

/**
 * Remove a vendor from the database
 * @param id
 */
export function remove_vendor(id)
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "remove_vendor",
        "vendor_id": Number(id),
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Vendeur supprimé ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}

/**
 * Add a product to the database
 * @param product
 */
export function add_product(product)
{
    post_request("/pwd-project/back/routes/products.php", JSON.stringify({
        "query": "add_product",
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "image": product.image,
        "category_id": product.category_id,
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Produit ajouté ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}

/**
 * Remove a product from the database
 * @param id
 */
export function remove_product(id)
{
    post_request("/pwd-project/back/routes/products.php", JSON.stringify({
        "query": "remove_product",
        "product_id": Number(id),
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Produit supprimé ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}