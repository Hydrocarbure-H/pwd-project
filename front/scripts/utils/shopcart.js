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


export function display_shopcart_dialog(amount)
{
    /**
     * <div class="card border-primary mb-3 m-auto" style="max-width: 50rem;">
     *             <div class="card-header">Paiement</div>
     *             <div class="card-body">
     *                 <form>
     *
     *                     <h4 class="card-title">Régler mon panier : 34.99€</h4>
     *                     <div class="form-group">
     *                         <input type="number" class="form-control" id="card_number" aria-describedby="emailHelp"
     *                                placeholder="Numéro de carte" maxlength="16" required>
     *                         <small id="cardHelp" class="form-text text-muted">Format : 0000 0000 0000 0000</small>
     *                     </div>
     *                     <div class="form-group">
     *                         <input type="text" class="form-control" id="card_expiration" aria-describedby="emailHelp"
     *                                placeholder="Date d'expiration" maxlength="5" required>
     *                         <small id="card_expHelp" class="form-text text-muted">Format: 01/01</small>
     *                     </div>
     *                     <div class="form-group">
     *                         <input type="number" class="form-control" id="card_cvv" aria-describedby="emailHelp"
     *                                placeholder="CVV" length="3" required>
     *                         <small id="cardcvvHelp" class="form-text text-muted">Format : 000</small>
     *                     </div>
     *                     <div class="d-block">
     *                         <div class="d-flex justify-content-center">
     *                             <button type="submit" class="btn btn-primary">Valider le paiement</button>
     *                         </div>
     *                     </div>
     *                 </form>
     *
     *             </div>
     *         </div>
     */
        // remove the content of shopcart_content
    let shopcart_content = document.getElementById("shopcart_content");
    shopcart_content.innerHTML = "";

    // Create the previous divs
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
    input.setAttribute("type", "number");
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
    input3.setAttribute("type", "number");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", "card_cvv");
    input3.setAttribute("aria-describedby", "emailHelp");
    input3.setAttribute("placeholder", "CVV");
    input3.setAttribute("length", "3");
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
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "Valider le paiement";
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
    card.appendChild(card_header);
    card.appendChild(card_body);
    // Add the event listener
    form.addEventListener("submit", function (e)
    {
        console.log("submit");
    });

    // Add the divs to the shopcart_content
    shopcart_content.appendChild(card);
}
