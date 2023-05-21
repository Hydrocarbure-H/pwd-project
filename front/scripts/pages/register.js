import {post_request} from "../utils/requests.js";

$(document).ready(function ()
{
    // Check if the user is already logged in
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "undefined")
    {
        // Redirect to the home page
        window.location.href = "../../pages/profile.html";
    }

    document.getElementById("register_button").addEventListener("click", register);
    document.addEventListener("keydown", function (event)
    {
        if (event.key === "Enter")
        {
            register();
        }
    });

});

/**
 * Register the user
 */
function register()
{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;

    let account_type = document.querySelector('input[name="status"]:checked').value;

    if (email === "" || password === "" || firstname === "" || lastname === "")
    {
        document.getElementById("error").innerHTML = "Please fill all the fields.";
        return;
    }

    let progress_bar = document.getElementById("progress_register");
    progress_bar.style.width = "0%";
    document.getElementById("error").innerHTML = "";

    post_request("/back/routes/users.php", JSON.stringify({
        "query": "register",
        "email": email,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "account_type": account_type
    })).onload = function ()
    {
        let json = JSON.parse(this.responseText);
        let progress_login = 0;
        let progress_bar = document.getElementById("progress_register");
        let progress_interval = setInterval(function ()
        {
            progress_login += 10;
            progress_bar.style.width = progress_login + "%";
            if (progress_login >= 100)
            {
                clearInterval(progress_interval);
            }
        }, 100);
        // wait 1.5s before redirecting
        setTimeout(function ()
        {
            if (json["type"] === "success")
            {
                localStorage.setItem("token", json["message"]["token"]);
                window.location.href = "../pages/login.html?register=success";
            }
            else
            {
                document.getElementById("error").innerHTML = json["message"];
            }
        }, 1500);

    }
}