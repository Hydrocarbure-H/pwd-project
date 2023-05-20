import {get_request} from "../utils/requests.js";

// on ready
$(document).ready(function ()
{
    // Get the flash
    get_flash();
});

function get_flash()
{
    get_request("/pwd-project/back/routes/products.php?query=flash").onload = function ()
    {
        let flash = JSON.parse(this.responseText)["message"];
        let flash_div = document.getElementById("flash_content");

        // Create 3 by 3 cards


        // 3 lines
        for (let k = 0; k < 3; k++)
        {
            let cards = document.createElement("div");
            cards.classList.add("d-block");
            let cards_content = document.createElement("div");
            cards_content.classList.add("d-lg-flex");
            cards_content.classList.add("d-print-block");
            for (let i = 0; i < 3; i++)
            {
                let card_item = document.createElement("div");
                card_item.classList.add("card");
                let card_body = document.createElement("div");
                card_body.classList.add("card-body");
                let card_title = document.createElement("h4");
                card_title.classList.add("card-title");
                card_title.innerHTML = flash[i + k * 3]["name"];
                let card_subtitle = document.createElement("h6");
                card_subtitle.classList.add("card-subtitle", "mb-2", "text-muted");
                card_subtitle.innerHTML = flash[i + k * 3]["category"];
                // add image
                let card_image = document.createElement("img");
                card_image.classList.add("card-img-top");
                card_image.src = flash[i + k * 3]["image"];
                card_image.alt = "Card image cap";
                let card_text = document.createElement("p");
                card_text.classList.add("card-text");
                card_text.innerHTML = flash[i + k * 3]["description"];
                let card_link_details = document.createElement("a");
                card_link_details.classList.add("card-link");
                card_link_details.innerHTML = "Détails";
                let card_link_seller = document.createElement("a");
                card_link_seller.classList.add("card-link");
                card_link_seller.innerHTML = flash[i + k * 3]["vendor"];

                // Add the elements to the card
                card_body.appendChild(card_title);
                card_body.appendChild(card_subtitle);
                card_body.appendChild(card_image);
                card_body.appendChild(card_text);
                card_body.appendChild(card_link_details);
                card_body.appendChild(card_link_seller);
                card_item.appendChild(card_body);
                cards_content.appendChild(card_item);
            }
            cards.appendChild(cards_content);
            flash_div.appendChild(cards);
        }
    }
}