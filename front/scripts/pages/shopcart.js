import {post_request} from "../utils/requests.js";
import display_products from "../utils/products.js";
// on ready
$(document).ready(function ()
{
    // Check if the user is already logged in
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "undefined")
    {
        // Redirect to the home page
        window.location.href = "../pages/login.html";
        return;
    }
    // Get the shopcart
    get_shopcart();

});

function get_shopcart()
{
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "get",
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let json = JSON.parse(this.responseText);
        if (json["type"] === "error")
        {
            let alert = document.createElement("div");
            alert.classList.add("alert", "alert-danger", "alert-secondary");
            alert.innerHTML = "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button><strong>Erreur...</strong> Impossible de récupérer votre panier pour le moment. Error: " + json["message"];
            document.getElementById("shopcart_content").appendChild(alert);
        }

        else if (json["message"] === "Shopcart empty.")
        {
            let alert = document.createElement("div");
            alert.classList.add("alert", "alert-dismissible", "alert-secondary");
            alert.innerHTML = "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button><strong>Rien pour le moment...</strong> Votre panier est actuellement vide. Faites profiter la société de consommation en achetant quelques articles !";
            document.getElementById("shopcart_content").appendChild(alert);
        }
        else
        {
            display_products(json, true);
        }
    }
}