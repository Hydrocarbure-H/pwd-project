import {get_request} from "../utils/requests.js";
import display_message from "../utils/errors.js";
import display_products from "../utils/products.js";

$(document).ready(function ()
{
    get_flash();
});

/**
 * Get the flash products
 */
function get_flash()
{
    get_request("/pwd-project/back/routes/products.php?query=flash").onload = function ()
    {
        let json = this.responseText;
        let response = JSON.parse(json)
        if (response["type"] === "error")
        {
            display_message("danger", "Erreur... ", "Impossible de récupérer les produits flash pour le moment. Error: " + response["message"], "flash_content");
            return;
        }
        display_products(json, false)
    }
}