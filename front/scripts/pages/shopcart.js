import {post_request} from "../utils/requests.js";

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
            display_products(json);
        }
    }
}

function display_products(response)
{
    if (response["type"] === "error")
    {
        console.log("error");
        // Display the error
        let alert = document.createElement("div");
        alert.classList.add("alert");
        alert.classList.add("alert-dismissible");
        alert.classList.add("alert-danger");
        let button = document.createElement("button");
        button.classList.add("btn-close");
        button.setAttribute("data-bs-dismiss", "alert");
        button.setAttribute("aria-label", "Close");
        alert.appendChild(button);
        let strong = document.createElement("strong");
        strong.innerHTML = "Oh noo... ";
        let text = document.createTextNode(response["message"] + " Please try again.");
        alert.appendChild(strong);
        alert.appendChild(text);
        document.getElementById("products_content").appendChild(alert);
        return;
    }

    let products = response["message"];
    let products_div = document.getElementById("shopcart_content");

    for (let k = 0; k < products.length; k++)
    {
        let cards = document.createElement("div");
        cards.classList.add("d-block");
        let cards_content = document.createElement("div");
        cards_content.classList.add("d-lg-flex");
        cards_content.classList.add("d-print-block");
        for (let i = 0; i < 3; i++)
        {
            if (i + k * 3 >= products.length)
            {
                break;
            }
            let card_item = document.createElement("div");
            card_item.classList.add("card");
            card_item.classList.add("text-black");
            card_item.classList.add("m-3");
            let card_body = document.createElement("div");
            card_body.classList.add("card-body");
            let card_title = document.createElement("h4");
            card_title.classList.add("card-title");
            card_title.innerHTML = products[i + k * 3]["name"];
            let card_subtitle = document.createElement("h6");
            card_subtitle.classList.add("card-subtitle", "mb-2", "text-muted");
            card_subtitle.innerHTML = products[i + k * 3]["category"];
            let card_image = document.createElement("img");
            card_image.classList.add("card-img-top");
            card_image.src = products[i + k * 3]["image"];
            card_image.alt = "Card image cap";
            let card_text = document.createElement("p");
            card_text.classList.add("card-text");
            card_text.innerHTML = products[i + k * 3]["description"];
            let card_button_div = document.createElement("div");
            card_button_div.classList.add("d-block", "buy-div");
            let card_button = document.createElement("button");
            card_button.classList.add("btn", "btn-danger");
            card_button.innerHTML = "Retirer du panier - " + products[i + k * 3]["price"] + "€";

            card_button_div.appendChild(card_button);
            card_body.appendChild(card_title);
            card_body.appendChild(card_subtitle);
            card_body.appendChild(card_image);
            card_body.appendChild(card_text);
            card_body.appendChild(card_button_div);
            card_item.appendChild(card_body);
            cards_content.appendChild(card_item);
        }
        cards.appendChild(cards_content);
        products_div.append(cards);
    }
}