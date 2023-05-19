import create_navbar from "./components/navbar.js";
import create_footer from "./components/footer.js";

// on ready, append the navbar to the body with ajax

$(document).ready(function ()
{
    // Create the navbar
    let navbar = create_navbar();
    // Append the navbar to the body
    $("body").prepend(navbar);
    // Create the footer
    let footer = create_footer();
    // Append the footer to the body
    $("#container").append(footer);
});