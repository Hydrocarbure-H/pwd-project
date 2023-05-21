import {post_request} from "../utils/requests.js";
import display_products from "../utils/products.js";
import display_message from "../utils/errors.js";

$(document).ready(function ()
{
    // Check if the user is already logged in
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "undefined")
    {
        window.location.href = "../pages/login.html";
        return;
    }

    get_shopcart();
});

/**
 * Get the shopcart
 */
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
            display_message("danger", "Erreur... ", "Impossible de récupérer votre panier pour le moment. Error: " + json["message"], "shopcart_content");
        }

        else if (json["message"] === "Shopcart empty.")
        {
            display_message("secondary", "Rien pour le moment... ", "Votre panier est actuellement vide. Faites profiter la société de consommation en achetant quelques articles !", "shopcart_content");
        }
        else
        {
            display_products(json, true);
        }
    }
}

/**
 * Validate the shopcart
 * @param amount
 */
export default function validate(amount)
{
    let progress_validate = 0;
    let progress_bar = document.getElementById("progress_validate");
    let progress_interval = setInterval(function ()
    {
        progress_validate += 10;
        progress_bar.style.width = progress_validate + "%";
        if (progress_validate >= 100)
        {
            clearInterval(progress_interval);
        }
    }, 100);

    // wait 2 seconds
    setTimeout(function ()
    {
        post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
            "query": "validate",
            "token": localStorage.getItem("token"),
            "amount": amount
        })).onload = function ()
        {
            let json = JSON.parse(this.responseText);
            if (json["type"] === "error")
            {
                display_message("danger", "Erreur... ", "Impossible de valider votre panier pour le moment. Error: " + json["message"], "shopcart_content");
            }
            else
            {
                display_message("success", "Succès ! ", "Votre panier a été validé avec succès ! " + json["message"] + " - Vous allez être redirigé vers l'accueil dans quelques secondes...", "shopcart_content");

                let progress_validate = 0;
                let progress_bar = document.getElementById("progress_validate");
                let progress_interval = setInterval(function ()
                {
                    progress_validate += 10;
                    progress_bar.style.width = progress_validate + "%";
                    if (progress_validate >= 100)
                    {
                        clearInterval(progress_interval);
                        window.location.href = "../pages/index.html";
                    }
                }, 900);
            }
        }
    }, 2000);
}