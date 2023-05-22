import {post_request} from "../utils/requests.js";
import display_profile from "../utils/profile.js";

$(document).ready(function ()
{
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "undefined")
    {
        window.location.href = "../pages/login.html";
        return;
    }
    // Get profile data
    get_profile();
});

/**
 * Get the profile data
 */
function get_profile()
{
    post_request("/back/routes/users.php", JSON.stringify({
        "query": "profile",
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        display_profile("profile_content", this.responseText);
    }
}