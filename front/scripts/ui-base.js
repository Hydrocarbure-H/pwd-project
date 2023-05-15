import create_navbar from "../scripts/components/navbar.js";

// on ready, append the navbar to the body with ajax

$(document).ready(function ()
{
    // Create the navbar
    let navbar = create_navbar();
    // Append the navbar to the body
    $("body").prepend(navbar);
});