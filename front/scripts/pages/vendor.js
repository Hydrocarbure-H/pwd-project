import {post_request} from "../utils/requests.js";
import {get_request} from "../utils/requests.js";
import display_profile from "../utils/profile.js";
import display_products from "../utils/products.js";

$(document).ready(function ()
{
    // Get profile data
    let url = new URL(window.location.href);
    let vendor_id = url.searchParams.get("vendor_id");
    get_vendor_profile(vendor_id);
    get_vendor_products(vendor_id);
});

/**
 * Get the profile data
 */
function get_vendor_profile(vendor_id)
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "vendor_profile",
        "vendor_id": Number(vendor_id)
    })).onload = function ()
    {
        display_profile("profile_content", this.responseText, "vendor_page");
    }
}

function get_vendor_products(vendor_id)
{
    get_request("/pwd-project/back/routes/products.php?query=vendor&id=" + vendor_id
    ).onload = function ()
    {
        display_products(this.responseText);
    }
}