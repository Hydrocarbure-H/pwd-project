import {get_request, post_request} from "../utils/requests.js";

// on ready
$(document).ready(function ()
{
    // Get the shopcart
    get_shopcart();

});

function get_shopcart()
{
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "get",
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        console.log("Implement login first");
    }
}