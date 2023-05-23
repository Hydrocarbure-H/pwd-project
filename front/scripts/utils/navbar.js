import {post_request} from "./requests.js";

export default function get_shopcart_count()
{
    post_request("/back/routes/shopcart.php", JSON.stringify({
        "query": "get",
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let json = this.responseText;
        let response = JSON.parse(json);
        let cart_badge = document.getElementById("cart-badge");

        if (response["message"] === "Shopcart empty." || response["message"] === "Token missing. Please reconnect.")
        {
            cart_badge.innerHTML = 0;
            return;
        }
        // get the length of the json list
        cart_badge.innerHTML = response.message.length;
    }
}