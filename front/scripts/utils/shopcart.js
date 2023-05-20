import {post_request} from "./requests.js";
import display_message from "./errors.js";

export function add_product(product_id)
{
    // add a product to the shopcart by doing a POST request to the API
    // with the product id and the token
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

export function remove_product(shopcart_product_id)
{
    // remove a product from the shopcart by doing a POST request to the API
    // with the product id and the token
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
            // Display the error
            display_message("danger", "Erreur... ", "Impossible de supprimer le produit de votre panier pour le moment. Error: " + json["message"], "shopcart_content");
        }
        else
        {
            // Display the error
            window.location.reload();
        }
    }
}