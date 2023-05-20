import create_navbar from "./components/navbar.js";
import create_footer from "./components/footer.js";

/**
 * On document ready, create the navbar and the footer
 */
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