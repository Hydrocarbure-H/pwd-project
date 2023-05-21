import {post_request} from "../utils/requests.js";
import display_profile from "../utils/profile.js";

$(document).ready(function ()
{
    // Get profile data
    // get vendor_id from url
    let url = new URL(window.location.href);
    let vendor_id = url.searchParams.get("vendor_id");
    get_vendor_profile(vendor_id);
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