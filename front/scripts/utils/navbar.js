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
        if (response["code"] !== "200")
        {
            return;
        }
        let cart_badge = document.getElementById("cart-badge");
        // get the length of the json list
        cart_badge.innerHTML = response.message.length;
    }
}