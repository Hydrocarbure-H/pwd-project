import {get_request} from "../utils/requests.js";
import display_products from "../utils/products.js";

$(document).ready(function ()
{
    let url = new URL(window.location.href);
    let category = url.searchParams.get("category");
    if (!category || category === "all")
    {
        get_all_products();
    }
    else
    {
        let title = document.getElementById("title-cat");
        title.innerHTML = "Catégorie | " + category.charAt(0).toUpperCase() + category.slice(1);
        get_products_by_category(category);
    }
});

/**
 * Get all the products
 */
function get_all_products()
{
    get_request("/back/routes/products.php?query=all").onload = function ()
    {
        display_products(this.responseText);
    };
}


/**
 * Get all the products by category
 * @param category
 */
function get_products_by_category(category)
{
    get_request("/back/routes/products.php?query=category&name=" + category).onload = function ()
    {
        display_products(this.responseText);
    };
}