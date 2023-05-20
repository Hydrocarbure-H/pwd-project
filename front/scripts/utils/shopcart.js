import {post_request} from "./requests.js";
import display_message from "./errors.js";

/**
 * Add a product to the shopcart
 * @param product_id
 */
export function add_product(product_id)
{
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "add",
        "token": localStorage.getItem("token"),
        "product_id": product_id
    })).onload = function ()
    {
        // Remove the previous alerts -- TO IMPROVE
        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
        {
            alerts[i].remove();
        }
        let json = JSON.parse(this.responseText);
        if (json["type"] === "error")
        {
            display_message("danger", "Erreur... ", "Impossible d'ajouter le produit à votre panier pour le moment. Error: " + json["message"], "products_content");
        }
        else
        {
            display_message("success", "Produit ajouté ! ", "Le produit a bien été ajouté à votre panier.", "products_content");
        }
    }
}

/**
 * Remove a product from the shopcart
 * @param shopcart_product_id
 */
export function remove_product(shopcart_product_id)
{
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "remove",
        "token": localStorage.getItem("token"),
        "id": shopcart_product_id
    })).onload = function ()
    {
        // Remove the previous alerts -- TO IMPROVE
        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
        {
            alerts[i].remove();
        }
        let json = JSON.parse(this.responseText);
        if (json["type"] === "error")
        {
            display_message("danger", "Erreur... ", "Impossible de supprimer le produit de votre panier pour le moment. Error: " + json["message"], "shopcart_content");
        }
        else
        {
            window.location.reload();
        }
    }
}