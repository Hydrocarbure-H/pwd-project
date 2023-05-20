import {post_request} from "./requests.js";

export function add_product(product_id)
{
    // add a product to the shopcart by doing a POST request to the API
    // with the product id and the token
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "add",
        "token": localStorage.getItem("token"),
        "product_id": product_id
    })).onload = function ()
    {
        // Remove the previous alerts -- TO IMPROVE
        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
        {
            alerts[i].remove();
        }
        let json = JSON.parse(this.responseText);
        if (json["type"] === "error")
        {
            // Display the error
            let alert = document.createElement("div");
            alert.classList.add("alert");
            alert.classList.add("alert-dismissible");
            alert.classList.add("alert-danger");
            let button = document.createElement("button");
            button.classList.add("btn-close");
            button.setAttribute("data-bs-dismiss", "alert");
            button.setAttribute("aria-label", "Close");
            alert.appendChild(button);
            let strong = document.createElement("strong");
            strong.innerHTML = "Oh noo... ";
            let text = document.createTextNode(json["message"] + " Please try again.");
            alert.appendChild(strong);
            alert.appendChild(text);
            document.getElementById("products_content").appendChild(alert);
        }
        else
        {
            // Display the error
            let alert = document.createElement("div");
            alert.classList.add("alert");
            alert.classList.add("alert-dismissible");
            alert.classList.add("alert-success");
            let button = document.createElement("button");
            button.classList.add("btn-close");
            button.setAttribute("data-bs-dismiss", "alert");
            button.setAttribute("aria-label", "Close");
            alert.appendChild(button);
            let strong = document.createElement("strong");
            strong.innerHTML = "Yep !";
            let text = document.createTextNode(
                " The product has been added to your shopcart.");
            alert.appendChild(strong);
            alert.appendChild(text);
            document.getElementById("products_content").prepend(alert);
        }
    }
}

export function remove_product(shopcart_product_id)
{
    // remove a product from the shopcart by doing a POST request to the API
    // with the product id and the token
    post_request("/pwd-project/back/routes/shopcart.php", JSON.stringify({
        "query": "remove",
        "token": localStorage.getItem("token"),
        "id": shopcart_product_id
    })).onload = function ()
    {
        // Remove the previous alerts -- TO IMPROVE
        let alerts = document.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++)
        {
            alerts[i].remove();
        }
        let json = JSON.parse(this.responseText);
        if (json["type"] === "error")
        {
            // Display the error
            let alert = document.createElement("div");
            alert.classList.add("alert");
            alert.classList.add("alert-dismissible");
            alert.classList.add("alert-danger");
            let button = document.createElement("button");
            button.classList.add("btn-close");
            button.setAttribute("data-bs-dismiss", "alert");
            button.setAttribute("aria-label", "Close");
            alert.appendChild(button);
            let strong = document.createElement("strong");
            strong.innerHTML = "Oh noo... ";
            let text = document.createTextNode(json["message"] + " Please try again.");
            alert.appendChild(strong);
            alert.appendChild(text);
            document.getElementById("products_content").appendChild(alert);
        }
        else
        {
            // Display the error
            window.location.reload();
        }
    }
}