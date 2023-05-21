import {add_vendor, remove_vendor} from "./actions.js";

/**
 * Display the profile of the user (vendor or buyer)
 * @param location
 * @param response
 * @param type
 */
export default function display_profile(location, response, type = "normal")
{
    // get profile_content div
    let profile_content = document.getElementById(location);
    // get json response
    let json = JSON.parse(response).message;
    // Create the card
    let card = document.createElement("div");
    card.classList.add("card", "mb-3", "profile-card-override");
    // Create the card header
    let card_header = document.createElement("h3");
    card_header.classList.add("card-header");
    card_header.innerHTML = "Profil";
    // Create the card body
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    // Create the card title
    let card_title = document.createElement("h5");
    card_title.classList.add("card-title");
    card_title.innerHTML = json.firstname + " " + json.lastname;
    // Create the card subtitle
    let card_subtitle = document.createElement("h6");
    card_subtitle.classList.add("card-subtitle", "text-muted");
    if (type === "vendor_page")
    {
        card_subtitle.innerHTML = "<a class='mail_link text-muted' href='mailto:" + json.email + "'>" + json.email + "</a>";
    }
    else
    {
        card_subtitle.innerHTML = json.email;
    }
    // Create the card image div
    let card_image_div = document.createElement("div");
    card_image_div.classList.add("d-block", "profile-img-div");
    // Create the card image
    let card_image = document.createElement("img");
    card_image.src = "../assets/images/profile.png";
    card_image.alt = "Card image";
    card_image.style.width = "100%";
    // Create the list group
    let list_group = document.createElement("ul");
    list_group.classList.add("list-group", "list-group-flush");
    // Create the list group items
    let list_group_item1 = document.createElement("li");
    list_group_item1.classList.add("list-group-item");
    list_group_item1.innerHTML = "Addresse : " + json.address;
    let list_group_item2 = document.createElement("li");
    list_group_item2.classList.add("list-group-item");
    list_group_item2.innerHTML = "Date de création : " + json.created_at;
    // Create the card body
    let card_body2 = document.createElement("div");
    card_body2.classList.add("card-body");
    // Create the card link
    let card_link = null;
    if (type !== "vendor_page")
    {
        card_link = document.createElement("a");
        card_link.href = "#logout";
        card_link.id = "logout";
        card_link.classList.add("card-link");
        card_link.innerHTML = "Déconnexion";
    }

    // Create the card footer
    let card_footer = document.createElement("div");
    card_footer.classList.add("card-footer", "text-muted");
    card_footer.innerHTML = json.account_type.charAt(0).toUpperCase() + json.account_type.slice(1);
    // Append all elements
    card_body.appendChild(card_title);
    card_body.appendChild(card_subtitle);
    card_image_div.appendChild(card_image);
    card_body.appendChild(card_image_div);
    list_group.appendChild(list_group_item1);
    list_group.appendChild(list_group_item2);
    if (type !== "vendor_page")
    {
        card_body2.appendChild(card_link);
    }
    card.appendChild(card_header);
    card.appendChild(card_body);
    card.appendChild(list_group);
    card.appendChild(card_body2);
    card.appendChild(card_footer);
    profile_content.appendChild(card);

    if (type !== "vendor_page")
    {
        // Add event listener to logout link
        document.getElementById("logout").addEventListener("click", logout);
    }

    display_actions(response);
}

function display_actions(response)
{
    let account_type = JSON.parse(response).message.account_type;
    if (account_type === "vendor")
    {
        vendor_actions();
    }
    if (account_type === "admin")
    {
        admin_actions();
    }
}


function vendor_actions()
{
    let actions_div = document.createElement("div");
    actions_div.classList.add("actions");
    let actions_header = document.createElement("h3");
    actions_header.innerHTML = "Actions";
    let actions_nav = document.createElement("ul");
    actions_nav.classList.add("nav", "nav-tabs");
    actions_nav.setAttribute("role", "tablist");
    let add_nav_item = document.createElement("li");
    add_nav_item.classList.add("nav-item");
    add_nav_item.setAttribute("role", "presentation");
    let add_nav_link = document.createElement("a");
    add_nav_link.classList.add("nav-link", "active");
    add_nav_link.setAttribute("data-bs-toggle", "tab");
    add_nav_link.setAttribute("href", "#add");
    add_nav_link.setAttribute("aria-selected", "true");
    add_nav_link.setAttribute("role", "tab");
    add_nav_link.innerHTML = "Ajouter";
    add_nav_item.appendChild(add_nav_link);
    let delete_nav_item = document.createElement("li");
    delete_nav_item.classList.add("nav-item");
    delete_nav_item.setAttribute("role", "presentation");
    let delete_nav_link = document.createElement("a");
    delete_nav_link.classList.add("nav-link");
    delete_nav_link.setAttribute("data-bs-toggle", "tab");
    delete_nav_link.setAttribute("href", "#delete");
    delete_nav_link.setAttribute("aria-selected", "false");
    delete_nav_link.setAttribute("role", "tab");
    delete_nav_link.setAttribute("tabindex", "-1");
    delete_nav_link.innerHTML = "Supprimer";
    delete_nav_item.appendChild(delete_nav_link);
    actions_nav.appendChild(add_nav_item);
    actions_nav.appendChild(delete_nav_item);
    actions_div.appendChild(actions_header);
    actions_div.appendChild(actions_nav);

    // Create the tab content
    let tab_content = document.createElement("div");
    tab_content.classList.add("tab-content");
    tab_content.setAttribute("id", "myTabContent");
    let add_tab = document.createElement("div");
    add_tab.classList.add("tab-pane", "fade", "active", "show");
    add_tab.setAttribute("id", "add");
    add_tab.setAttribute("role", "tabpanel");
    // Add product tab
    let add_tab_header = document.createElement("h3");
    add_tab_header.innerHTML = "Ajouter un produit";
    add_tab_header.classList.add("mt-3");
    let add_tab_form = document.createElement("div");
    add_tab_form.classList.add("form-group", "mt-3");
    let add_tab_name = document.createElement("input");
    add_tab_name.classList.add("form-control");
    add_tab_name.setAttribute("type", "email");
    add_tab_name.setAttribute("id", "name");
    add_tab_name.setAttribute("aria-describedby", "emailHelp");
    add_tab_name.setAttribute("placeholder", "Nom");
    let add_tab_name_text = document.createElement("small");
    add_tab_name_text.classList.add("form-text", "text-muted");
    add_tab_name_text.innerHTML = "Nom du produit";
    add_tab_form.appendChild(add_tab_name);
    add_tab_form.appendChild(add_tab_name_text);
    let add_tab_category = document.createElement("div");
    add_tab_category.classList.add("form-group");
    let add_tab_category_input = document.createElement("input");
    add_tab_category_input.classList.add("form-control");
    add_tab_category_input.setAttribute("type", "email");
    add_tab_category_input.setAttribute("id", "category");
    add_tab_category_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_category_input.setAttribute("placeholder", "Catégorie");
    let add_tab_category_text = document.createElement("small");
    add_tab_category_text.classList.add("form-text", "text-muted");
    add_tab_category_text.innerHTML = "Catégorie du produit";
    add_tab_category.appendChild(add_tab_category_input);
    add_tab_category.appendChild(add_tab_category_text);
    let add_tab_price = document.createElement("div");
    add_tab_price.classList.add("form-group");
    let add_tab_price_input = document.createElement("input");
    add_tab_price_input.classList.add("form-control");
    add_tab_price_input.setAttribute("type", "number");
    add_tab_price_input.setAttribute("id", "price");
    add_tab_price_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_price_input.setAttribute("placeholder", "Prix");
    let add_tab_price_text = document.createElement("small");
    add_tab_price_text.classList.add("form-text", "text-muted");
    add_tab_price_text.innerHTML = "Prix du produit";
    add_tab_price.appendChild(add_tab_price_input);
    add_tab_price.appendChild(add_tab_price_text);
    let add_tab_description = document.createElement("div");
    add_tab_description.classList.add("form-group");
    let add_tab_description_input = document.createElement("textarea");
    add_tab_description_input.classList.add("form-control");
    add_tab_description_input.setAttribute("id", "description");
    add_tab_description_input.setAttribute("rows", "3");
    add_tab_description_input.innerHTML = "Description...";
    let add_tab_description_text = document.createElement("small");
    add_tab_description_text.classList.add("form-text", "text-muted");
    add_tab_description_text.innerHTML = "Description du produit";
    add_tab_description.appendChild(add_tab_description_input);
    add_tab_description.appendChild(add_tab_description_text);
    let add_tab_image = document.createElement("div");
    add_tab_image.classList.add("form-group");
    let add_tab_image_input = document.createElement("input");
    add_tab_image_input.classList.add("form-control");
    add_tab_image_input.setAttribute("type", "text");
    add_tab_image_input.setAttribute("id", "image");
    add_tab_image_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_image_input.setAttribute("placeholder", "Url");
    let add_tab_image_text = document.createElement("small");
    add_tab_image_text.classList.add("form-text", "text-muted");
    add_tab_image_text.innerHTML = "URL vers l'image du produit";
    add_tab_image.appendChild(add_tab_image_input);
    add_tab_image.appendChild(add_tab_image_text);
    let add_tab_button = document.createElement("button");
    add_tab_button.classList.add("btn", "btn-primary", "mt-3");
    add_tab_button.setAttribute("id", "addProduct");
    add_tab_button.innerHTML = "Ajouter";
    add_tab.appendChild(add_tab_header);
    add_tab.appendChild(add_tab_form);
    add_tab.appendChild(add_tab_category);
    add_tab.appendChild(add_tab_price);
    add_tab.appendChild(add_tab_description);
    add_tab.appendChild(add_tab_image);
    add_tab.appendChild(add_tab_button);
    // Delete tab
    let delete_tab = document.createElement("div");
    delete_tab.classList.add("tab-pane", "fade");
    delete_tab.setAttribute("id", "delete");
    delete_tab.setAttribute("role", "tabpanel");
    let delete_tab_header = document.createElement("h3");
    delete_tab_header.classList.add("mt-3");
    delete_tab_header.innerHTML = "Supprimer un produit";
    let delete_tab_form = document.createElement("div");
    delete_tab_form.classList.add("form-group", "mt-3");
    let delete_tab_number = document.createElement("input");
    delete_tab_number.classList.add("form-control");
    delete_tab_number.setAttribute("type", "number");
    delete_tab_number.setAttribute("id", "product_id");
    delete_tab_number.setAttribute("aria-describedby", "emailHelp");
    delete_tab_number.setAttribute("placeholder", "Identifiant");
    let delete_tab_number_text = document.createElement("small");
    delete_tab_number_text.classList.add("form-text", "text-muted");
    delete_tab_number_text.innerHTML = "Identifiant du produit dans la base de données";
    delete_tab_form.appendChild(delete_tab_number);
    delete_tab_form.appendChild(delete_tab_number_text);
    let delete_tab_button = document.createElement("button");
    delete_tab_button.classList.add("btn", "btn-primary", "mt-3");
    delete_tab_button.setAttribute("id", "deleteProduct");
    delete_tab_button.innerHTML = "Supprimer";
    delete_tab.appendChild(delete_tab_header);
    delete_tab.appendChild(delete_tab_form);
    delete_tab.appendChild(delete_tab_button);
    // Append tabs
    tab_content.appendChild(add_tab);
    tab_content.appendChild(delete_tab);
    // Append content
    actions_div.appendChild(tab_content);
    document.getElementById("actions_content").appendChild(actions_div);
}

function admin_actions()
{
    let actions_div = document.createElement("div");
    actions_div.classList.add("actions");
    let actions_header = document.createElement("h3");
    actions_header.innerHTML = "Actions";
    let actions_nav = document.createElement("ul");
    actions_nav.classList.add("nav", "nav-tabs");
    actions_nav.setAttribute("role", "tablist");
    let add_nav_item = document.createElement("li");
    add_nav_item.classList.add("nav-item");
    add_nav_item.setAttribute("role", "presentation");
    let add_nav_link = document.createElement("a");
    add_nav_link.classList.add("nav-link", "active");
    add_nav_link.setAttribute("data-bs-toggle", "tab");
    add_nav_link.setAttribute("href", "#add");
    add_nav_link.setAttribute("aria-selected", "true");
    add_nav_link.setAttribute("role", "tab");
    add_nav_link.innerHTML = "Ajouter";
    add_nav_item.appendChild(add_nav_link);
    let delete_nav_item = document.createElement("li");
    delete_nav_item.classList.add("nav-item");
    delete_nav_item.setAttribute("role", "presentation");
    let delete_nav_link = document.createElement("a");
    delete_nav_link.classList.add("nav-link");
    delete_nav_link.setAttribute("data-bs-toggle", "tab");
    delete_nav_link.setAttribute("href", "#delete");
    delete_nav_link.setAttribute("aria-selected", "false");
    delete_nav_link.setAttribute("role", "tab");
    delete_nav_link.setAttribute("tabindex", "-1");
    delete_nav_link.innerHTML = "Supprimer";
    delete_nav_item.appendChild(delete_nav_link);
    actions_nav.appendChild(add_nav_item);
    actions_nav.appendChild(delete_nav_item);
    actions_div.appendChild(actions_header);
    actions_div.appendChild(actions_nav);

    // Create the tab content
    let tab_content = document.createElement("div");
    tab_content.classList.add("tab-content");
    tab_content.setAttribute("id", "myTabContent");
    let add_tab = document.createElement("div");
    add_tab.classList.add("tab-pane", "fade", "active", "show");
    add_tab.setAttribute("id", "add");
    add_tab.setAttribute("role", "tabpanel");
    // Add product tab
    let add_tab_header = document.createElement("h3");
    add_tab_header.innerHTML = "Ajouter un vendeur";
    add_tab_header.classList.add("mt-3");
    let add_tab_form = document.createElement("div");
    add_tab_form.classList.add("form-group", "mt-3");
    let add_tab_name = document.createElement("input");
    add_tab_name.classList.add("form-control");
    add_tab_name.setAttribute("type", "text");
    add_tab_name.setAttribute("id", "firstname");
    add_tab_name.setAttribute("aria-describedby", "emailHelp");
    add_tab_name.setAttribute("placeholder", "Prénom");
    let add_tab_name_text = document.createElement("small");
    add_tab_name_text.classList.add("form-text", "text-muted");
    add_tab_name_text.innerHTML = "Prénom du vendeur";
    add_tab_form.appendChild(add_tab_name);
    add_tab_form.appendChild(add_tab_name_text);
    let add_tab_category = document.createElement("div");
    add_tab_category.classList.add("form-group");
    let add_tab_category_input = document.createElement("input");
    add_tab_category_input.classList.add("form-control");
    add_tab_category_input.setAttribute("type", "text");
    add_tab_category_input.setAttribute("id", "lastname");
    add_tab_category_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_category_input.setAttribute("placeholder", "Nom");
    let add_tab_category_text = document.createElement("small");
    add_tab_category_text.classList.add("form-text", "text-muted");
    add_tab_category_text.innerHTML = "Nom du vendeur";
    add_tab_category.appendChild(add_tab_category_input);
    add_tab_category.appendChild(add_tab_category_text);
    let add_tab_price = document.createElement("div");
    add_tab_price.classList.add("form-group");
    let add_tab_price_input = document.createElement("input");
    add_tab_price_input.classList.add("form-control");
    add_tab_price_input.setAttribute("type", "text");
    add_tab_price_input.setAttribute("id", "email");
    add_tab_price_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_price_input.setAttribute("placeholder", "Adresse Email");
    let add_tab_price_text = document.createElement("small");
    add_tab_price_text.classList.add("form-text", "text-muted");
    add_tab_price_text.innerHTML = "Adresse email du vendeur";
    add_tab_price.appendChild(add_tab_price_input);
    add_tab_price.appendChild(add_tab_price_text);
    let add_tab_description = document.createElement("div");
    add_tab_description.classList.add("form-group");
    let add_tab_description_input = document.createElement("textarea");
    add_tab_description_input.classList.add("form-control");
    add_tab_description_input.setAttribute("id", "address");
    add_tab_description_input.setAttribute("rows", "3");
    add_tab_description_input.innerHTML = "";
    let add_tab_description_text = document.createElement("small");
    add_tab_description_text.classList.add("form-text", "text-muted");
    add_tab_description_text.innerHTML = "Adresse du vendeur";
    add_tab_description.appendChild(add_tab_description_input);
    add_tab_description.appendChild(add_tab_description_text);
    let add_tab_image = document.createElement("div");
    add_tab_image.classList.add("form-group");
    let add_tab_image_input = document.createElement("input");
    add_tab_image_input.classList.add("form-control");
    add_tab_image_input.setAttribute("type", "password");
    add_tab_image_input.setAttribute("id", "password");
    add_tab_image_input.setAttribute("aria-describedby", "emailHelp");
    add_tab_image_input.setAttribute("placeholder", "Mot de passe");
    let add_tab_image_text = document.createElement("small");
    add_tab_image_text.classList.add("form-text", "text-muted");
    add_tab_image_text.innerHTML = "Mot de passe du vendeur";
    add_tab_image.appendChild(add_tab_image_input);
    add_tab_image.appendChild(add_tab_image_text);
    let add_tab_button = document.createElement("button");
    add_tab_button.classList.add("btn", "btn-primary", "mt-3");
    add_tab_button.setAttribute("id", "addProduct");
    add_tab_button.innerHTML = "Ajouter";
    add_tab.appendChild(add_tab_header);
    add_tab.appendChild(add_tab_form);
    add_tab.appendChild(add_tab_category);
    add_tab.appendChild(add_tab_price);
    add_tab.appendChild(add_tab_description);
    add_tab.appendChild(add_tab_image);
    add_tab.appendChild(add_tab_button);
    // Delete tab
    let delete_tab = document.createElement("div");
    delete_tab.classList.add("tab-pane", "fade");
    delete_tab.setAttribute("id", "delete");
    delete_tab.setAttribute("role", "tabpanel");
    let delete_tab_header = document.createElement("h3");
    delete_tab_header.classList.add("mt-3");
    delete_tab_header.innerHTML = "Supprimer un vendeur";
    let delete_tab_form = document.createElement("div");
    delete_tab_form.classList.add("form-group", "mt-3");
    let delete_tab_number = document.createElement("input");
    delete_tab_number.classList.add("form-control");
    delete_tab_number.setAttribute("type", "number");
    delete_tab_number.setAttribute("id", "product_id");
    delete_tab_number.setAttribute("aria-describedby", "emailHelp");
    delete_tab_number.setAttribute("placeholder", "Identifiant");
    let delete_tab_number_text = document.createElement("small");
    delete_tab_number_text.classList.add("form-text", "text-muted");
    delete_tab_number_text.innerHTML = "Identifiant du vendeur dans la base de données";
    delete_tab_form.appendChild(delete_tab_number);
    delete_tab_form.appendChild(delete_tab_number_text);
    let delete_tab_button = document.createElement("button");
    delete_tab_button.classList.add("btn", "btn-primary", "mt-3");
    delete_tab_button.setAttribute("id", "deleteProduct");
    delete_tab_button.innerHTML = "Supprimer";
    delete_tab.appendChild(delete_tab_header);
    delete_tab.appendChild(delete_tab_form);
    delete_tab.appendChild(delete_tab_button);
    // Append tabs
    tab_content.appendChild(add_tab);
    tab_content.appendChild(delete_tab);
    // Append content
    actions_div.appendChild(tab_content);
    document.getElementById("actions_content").appendChild(actions_div);

    // add event listener on add button
    document.getElementById("addProduct").addEventListener("click", function ()
    {
        let firstname = document.getElementById("firstname").value;
        let lastname = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let address = document.getElementById("address").value;

        add_vendor({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "address": address
        })
    });

    // add event listener on delete button
    document.getElementById("deleteProduct").addEventListener("click", function ()
    {
        let id = document.getElementById("product_id").value;
        remove_vendor(id);
    });
}

/**
 * Logout the user
 */
function logout()
{
    // remove the token
    localStorage.removeItem("token");
    // redirect to login page
    window.location.href = "../pages/login.html";
}