import {post_request} from "./requests.js";
import display_message from "./errors.js";

export function add_vendor(vendor)
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "add_vendor",
        "firstname": vendor.firstname,
        "lastname": vendor.lastname,
        "email": vendor.email,
        "password": vendor.password,
        "address": vendor.address,
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Vendeur ajouté ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}

export function remove_vendor(id)
{
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "remove_vendor",
        "vendor_id": Number(id),
        "token": localStorage.getItem("token")
    })).onload = function ()
    {
        let response = JSON.parse(this.responseText);
        if (response.type === "success")
        {
            display_message("success", "Vendeur supprimé ! ", response.message, "actions_content");
        }
        else
        {
            display_message("danger", "Erreur : ", response.message, "actions_content");
        }
    }
}