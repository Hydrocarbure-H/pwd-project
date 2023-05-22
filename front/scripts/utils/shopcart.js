import {post_request} from "./requests.js";
import display_message from "./errors.js";
import validate from "../pages/shopcart.js";

/**
 * Add a product to the shopcart
 * @param product_id
 */
export function add_product(product_id)
{
    post_request("/back/routes/shopcart.php", JSON.stringify({
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
    post_request("/back/routes/shopcart.php", JSON.stringify({
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

/**
 * Display the shopcart dialog
 * @param amount
 */
export function display_shopcart_dialog(amount)
{
    let shopcart_content = document.getElementById("shopcart_content");
    shopcart_content.innerHTML = "";

    let card = document.createElement("div");
    card.setAttribute("class", "card border-primary mb-3 m-auto");
    card.setAttribute("style", "max-width: 50rem;");
    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header");
    card_header.innerHTML = "Paiement";
    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    let card_title = document.createElement("h4");
    card_title.setAttribute("class", "card-title");
    card_title.innerHTML = "Régler mon panier : " + amount + "€";
    let form = document.createElement("form");
    let form_group = document.createElement("div");
    form_group.setAttribute("class", "form-group");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", "card_number");
    input.setAttribute("aria-describedby", "emailHelp");
    input.setAttribute("placeholder", "Numéro de carte");
    input.setAttribute("maxlength", "16");
    input.setAttribute("required", "");
    let small = document.createElement("small");
    small.setAttribute("id", "cardHelp");
    small.setAttribute("class", "form-text text-muted");
    small.innerHTML = "Format : 0000 0000 0000 0000";
    let form_group2 = document.createElement("div");
    form_group2.setAttribute("class", "form-group");
    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", "card_expiration");
    input2.setAttribute("aria-describedby", "emailHelp");
    input2.setAttribute("placeholder", "Date d'expiration");
    input2.setAttribute("maxlength", "5");
    input2.setAttribute("required", "");
    let small2 = document.createElement("small");
    small2.setAttribute("id", "card_expHelp");
    small2.setAttribute("class", "form-text text-muted");
    small2.innerHTML = "Format: 01/01";
    let form_group3 = document.createElement("div");
    form_group3.setAttribute("class", "form-group");
    let input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", "card_cvv");
    input3.setAttribute("aria-describedby", "emailHelp");
    input3.setAttribute("placeholder", "CVV");
    input3.setAttribute("maxlength", "3");
    input3.setAttribute("required", "");
    let small3 = document.createElement("small");
    small3.setAttribute("id", "cardcvvHelp");
    small3.setAttribute("class", "form-text text-muted");
    small3.innerHTML = "Format : 000";
    let form_group4 = document.createElement("div");
    form_group4.setAttribute("class", "d-block");
    let form_group5 = document.createElement("div");
    form_group5.setAttribute("class", "d-flex justify-content-center");
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "Valider le paiement";
    let progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    progress.setAttribute("style", "margin-top: 0.5rem;");
    let progress_bar = document.createElement("div");
    progress_bar.setAttribute("class", "progress-bar progress-bar-striped progress-bar-animated");
    progress_bar.setAttribute("role", "progressbar");
    progress_bar.setAttribute("aria-valuenow", "75");
    progress_bar.setAttribute("aria-valuemin", "0");
    progress_bar.setAttribute("aria-valuemax", "100");
    progress_bar.setAttribute("style", "width: 0%;");
    progress_bar.setAttribute("id", "progress_validate");
    progress.appendChild(progress_bar);

    // Add the elements to the DOM
    form_group.appendChild(input);
    form_group.appendChild(small);
    form_group2.appendChild(input2);
    form_group2.appendChild(small2);
    form_group3.appendChild(input3);
    form_group3.appendChild(small3);
    form_group5.appendChild(button);
    form_group4.appendChild(form_group5);
    form.appendChild(card_title);
    form.appendChild(form_group);
    form.appendChild(form_group2);
    form.appendChild(form_group3);
    form.appendChild(form_group4);
    card_body.appendChild(form);
    card_body.appendChild(progress);
    card.appendChild(card_header);
    card.appendChild(card_body);

    button.addEventListener("click", function (e)
    {
        // Check for empty fields
        if (input.value === "" || input2.value === "" || input3.value === "")
        {
            display_message("danger", "Erreur... ", "Veuillez remplir tous les champs.", "shopcart_content");
            return;
        }
        validate(amount);
    });
    shopcart_content.appendChild(card);
}
