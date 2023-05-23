import {get_request, post_request} from "../utils/requests.js";
import get_shopcart_count from "../utils/navbar.js";
/**
 * Create the navbar
 */
export default function create_navbar()
{
    // Create the previous navbar
    let navbar = document.createElement("nav");
    navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-primary", "fixed-top");
    let container_fluid = document.createElement("div");
    container_fluid.classList.add("container-fluid");
    let a_navbar_brand = document.createElement("a");
    a_navbar_brand.classList.add("navbar-brand");
    a_navbar_brand.setAttribute("href", "../pages/index.html");
    a_navbar_brand.innerHTML = "Kiventout";
    let button_navbar_toggler = document.createElement("button");
    button_navbar_toggler.classList.add("navbar-toggler");
    button_navbar_toggler.setAttribute("type", "button");
    button_navbar_toggler.setAttribute("data-bs-toggle", "collapse");
    button_navbar_toggler.setAttribute("data-bs-target", "#navbarColor01");
    button_navbar_toggler.setAttribute("aria-controls", "navbarColor01");
    button_navbar_toggler.setAttribute("aria-expanded", "false");
    button_navbar_toggler.setAttribute("aria-label", "Toggle navigation");
    let span_navbar_toggler_icon = document.createElement("span");
    span_navbar_toggler_icon.classList.add("navbar-toggler-icon");
    button_navbar_toggler.appendChild(span_navbar_toggler_icon);
    let div_collapse_navbar = document.createElement("div");
    div_collapse_navbar.classList.add("collapse", "navbar-collapse");
    div_collapse_navbar.setAttribute("id", "navbarColor01");
    let ul_navbar_nav = document.createElement("ul");
    ul_navbar_nav.classList.add("navbar-nav", "me-auto");
    let li_navbar_nav_home = document.createElement("li");
    li_navbar_nav_home.classList.add("nav-item");
    let a_navbar_nav_home = document.createElement("a");
    a_navbar_nav_home.classList.add("nav-link");
    a_navbar_nav_home.setAttribute("href", "../pages/index.html");
    a_navbar_nav_home.innerHTML = "Accueil";
    let span_navbar_nav_home = document.createElement("span");
    span_navbar_nav_home.classList.add("visually-hidden");
    span_navbar_nav_home.innerHTML = "(current)";
    a_navbar_nav_home.appendChild(span_navbar_nav_home);
    li_navbar_nav_home.appendChild(a_navbar_nav_home);
    ul_navbar_nav.appendChild(li_navbar_nav_home);

    // Create the dropdown menu with categories
    get_request("/back/routes/products.php?query=categories").onload = function ()
    {

        let json = this.responseText;
        let categories = JSON.parse(json)["message"];

        let li_navbar_nav_dropdown = document.createElement("li");
        li_navbar_nav_dropdown.classList.add("nav-item", "dropdown");
        let a_navbar_nav_dropdown = document.createElement("a");
        a_navbar_nav_dropdown.classList.add("nav-link", "dropdown-toggle");
        a_navbar_nav_dropdown.setAttribute("data-bs-toggle", "dropdown");
        a_navbar_nav_dropdown.setAttribute("href", "#");
        a_navbar_nav_dropdown.setAttribute("role", "button");
        a_navbar_nav_dropdown.setAttribute("aria-haspopup", "true");
        a_navbar_nav_dropdown.setAttribute("aria-expanded", "false");
        a_navbar_nav_dropdown.innerHTML = "Catégories";
        let div_navbar_nav_dropdown = document.createElement("div");
        div_navbar_nav_dropdown.classList.add("dropdown-menu");
        for (let i = 0; i < categories.length; i++)
        {
            let a_navbar_nav_dropdown_category = document.createElement("a");
            a_navbar_nav_dropdown_category.classList.add("dropdown-item");
            a_navbar_nav_dropdown_category.setAttribute("href", "../pages/products.html?category=" + categories[i]["name"]);
            a_navbar_nav_dropdown_category.innerHTML = categories[i]["name"].charAt(0).toUpperCase() + categories[i]["name"].slice(1);

            div_navbar_nav_dropdown.appendChild(a_navbar_nav_dropdown_category);
            li_navbar_nav_dropdown.appendChild(a_navbar_nav_dropdown);
            li_navbar_nav_dropdown.appendChild(div_navbar_nav_dropdown);
        }
        let div_navbar_nav_dropdown_divider = document.createElement("div");
        div_navbar_nav_dropdown_divider.classList.add("dropdown-divider");
        let a_navbar_nav_dropdown_all = document.createElement("a");
        a_navbar_nav_dropdown_all.classList.add("dropdown-item");
        a_navbar_nav_dropdown_all.setAttribute("href", "../pages/products.html");
        a_navbar_nav_dropdown_all.innerHTML = "Tout afficher";
        div_navbar_nav_dropdown.appendChild(div_navbar_nav_dropdown_divider);
        div_navbar_nav_dropdown.appendChild(a_navbar_nav_dropdown_all);
        ul_navbar_nav.appendChild(li_navbar_nav_dropdown);

        let li_navbar_nav_notifications = document.createElement("li");
        li_navbar_nav_notifications.classList.add("nav-item");
        let a_navbar_nav_notifications = document.createElement("a");
        a_navbar_nav_notifications.classList.add("nav-link");
        a_navbar_nav_notifications.setAttribute("href", "#");
        a_navbar_nav_notifications.innerHTML = "Notifications";
        li_navbar_nav_notifications.appendChild(a_navbar_nav_notifications);
        ul_navbar_nav.appendChild(li_navbar_nav_notifications);

        let li_navbar_nav_cart = document.createElement("li");
        li_navbar_nav_cart.classList.add("nav-item");
        let a_navbar_nav_cart = document.createElement("a");
        a_navbar_nav_cart.classList.add("nav-link");
        a_navbar_nav_cart.setAttribute("href", "../pages/shopcart.html");
        a_navbar_nav_cart.innerHTML = "Panier";

        // add badge with number of items in cart
        let span_navbar_nav_cart_badge = document.createElement("span");
        span_navbar_nav_cart_badge.classList.add("badge", "bg-secondary");
        span_navbar_nav_cart_badge.setAttribute("id", "cart-badge");
        span_navbar_nav_cart_badge.innerHTML = "0";
        a_navbar_nav_cart.appendChild(span_navbar_nav_cart_badge);

        li_navbar_nav_cart.appendChild(a_navbar_nav_cart);
        ul_navbar_nav.appendChild(li_navbar_nav_cart);
        div_collapse_navbar.appendChild(ul_navbar_nav);
        let form_navbar_nav = document.createElement("form");
        form_navbar_nav.classList.add("d-flex");
        form_navbar_nav.setAttribute("action", "../pages/profile.html");
        let button_navbar_nav_account = document.createElement("button");
        button_navbar_nav_account.classList.add("btn", "btn-secondary", "my-2", "my-sm-0");
        button_navbar_nav_account.setAttribute("type", "submit");
        button_navbar_nav_account.innerHTML = "Mon compte";
        form_navbar_nav.appendChild(button_navbar_nav_account);
        div_collapse_navbar.appendChild(form_navbar_nav);
        container_fluid.appendChild(a_navbar_brand);
        container_fluid.appendChild(button_navbar_toggler);
        container_fluid.appendChild(div_collapse_navbar);
        navbar.appendChild(container_fluid);
        document.body.appendChild(navbar);
    }
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "undefined")
    {
        get_shopcart_count();
    }
}
