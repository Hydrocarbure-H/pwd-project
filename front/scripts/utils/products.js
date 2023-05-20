import {add_product} from "./shopcart.js";
import {remove_product} from "./shopcart.js";
import display_message from "./errors.js";

export default function display_products(json, is_shopcart = false)
{
    let response = null;
    let products = null;
    let products_div = null;
    if (is_shopcart)
    {
        response = json;
        if (response["type"] === "error")
        {
            display_message("danger", response["message"]);
            return;
        }

        products = json["message"];
        products_div = document.getElementById("shopcart_content");
    }
    else
    {
        let response = JSON.parse(json)
        if (response["type"] === "error")
        {
            display_message("danger", response["message"]);
            return;
        }

        products = JSON.parse(json)["message"];
        products_div = document.getElementById("products_content");
    }


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
            if (is_shopcart)
            {
                card_button.classList.add("btn", "btn-danger");
                card_button.innerHTML = "Retirer du panier - " + products[i + k * 3]["price"].toFixed(2) + "€";
            }
            else
            {
                card_button.classList.add("btn", "btn-dark");
                card_button.innerHTML = "Ajouter au panier - " + products[i + k * 3]["price"] + "€";
            }

            card_button_div.appendChild(card_button);

            card_body.appendChild(card_title);
            card_body.appendChild(card_subtitle);
            card_body.appendChild(card_image);
            card_body.appendChild(card_text);
            card_body.appendChild(card_button_div);
            card_item.appendChild(card_body);
            cards_content.appendChild(card_item);

            if (is_shopcart)
            {
                card_button.addEventListener("click", function ()
                {
                    remove_product(products[i + k * 3]["id"]);
                });
            }
            else
            {
                card_button.addEventListener("click", function ()
                {
                    add_product(products[i + k * 3]["id"]);
                });
            }
        }
        cards.appendChild(cards_content);
        products_div.appendChild(cards);
    }

    if (is_shopcart)
    {

        let validate_div = document.createElement("div");
        validate_div.classList.add("d-block", "validate-div");
        let validate_button = document.createElement("button");
        validate_button.classList.add("btn", "btn-success");

        let total = 0;
        for (let i = 0; i < products.length; i++)
        {
            let price = parseFloat(products[i]["price"]);
            if (isNaN(price))
            {
                continue;
            }
            total += price;
        }
        validate_button.innerHTML = "Valider mon panier - " + total.toFixed(2) + "€";
        validate_div.appendChild(validate_button);
        products_div.appendChild(validate_div);
    }
}