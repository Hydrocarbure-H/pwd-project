import {post_request} from "../utils/requests.js";

$(document).ready(function ()
{
    // Get profile data
    get_profile();
});

/**
 * Get the profile data
 */
function get_profile()
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "profile",
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        // get profile_content div
        let profile_content = document.getElementById("profile_content");
        // get json response
        let json = JSON.parse(this.responseText).message;
        // Create the card
        let card = document.createElement("div");
        card.classList.add("card", "mb-3");
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
        card_subtitle.innerHTML = json.email;
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
        let card_link = document.createElement("a");
        card_link.href = "#logout";
        card_link.id = "logout";
        card_link.classList.add("card-link");
        card_link.innerHTML = "Déconnexion";
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
        card_body2.appendChild(card_link);
        card.appendChild(card_header);
        card.appendChild(card_body);
        card.appendChild(list_group);
        card.appendChild(card_body2);
        card.appendChild(card_footer);
        profile_content.appendChild(card);

        document.getElementById("logout").addEventListener("click", logout);
    }
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