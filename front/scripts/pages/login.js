import {post_request} from "../utils/requests.js";

$(document).ready(function ()
{
    // Check if the user is already logged in
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "undefined")
    {
        // Redirect to the home page
        window.location.href = "../pages/profile.html";
    }

    // Check url for register=succes
    let url = new URL(window.location.href);
    let register = url.searchParams.get("register");
    if (register === "success")
    {
        document.getElementById("success").innerHTML = "Account created successfully, you can now login.";
    }

    document.getElementById("login_button").addEventListener("click", login);
    document.addEventListener("keydown", function (event)
    {
        if (event.key === "Enter")
        {
            login();
        }
    });

});

function login()
{
    // Get email and password
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "")
    {
        // Display the error
        document.getElementById("error").innerHTML = "Please fill all the fields.";
        return;
    }

    let progress_bar = document.getElementById("progress_login");
    progress_bar.style.width = "0%";
    document.getElementById("error").innerHTML = "";


    // Send the request
    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "login",
        "email": email,
        "password": password
    })).onload = function ()
    {
        let json = JSON.parse(this.responseText);
        // increase with of progress bar every .5s progress_login
        let progress_login = 0;
        let progress_bar = document.getElementById("progress_login");
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
            // Redirect to the home page
            if (json["type"] === "success")
            {
                // Save the token
                localStorage.setItem("token", json["message"]["token"]);
                // Redirect to the home page
                window.location.href = "../pages/profile.html";
            }
            else
            {
                // Display the error
                document.getElementById("error").innerHTML = json["message"];
            }
        }, 1500);

    }
}

function register()
{

}