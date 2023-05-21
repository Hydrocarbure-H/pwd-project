import {post_request} from "../utils/requests.js";

$(document).ready(function ()
{
    // Check if the user is already logged in
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "undefined")
    {
        window.location.href = "../pages/profile.html";
    }

    // Check url for register=succes
    let url = new URL(window.location.href);
    let register = url.searchParams.get("register");
    if (register === "success")
    {
        document.getElementById("success").innerHTML = "Account created successfully, you can now login.";
    }

    // Add event listener to login button
    document.getElementById("login_button").addEventListener("click", login);
    document.addEventListener("keydown", function (event)
    {
        if (event.key === "Enter")
        {
            login();
        }
    });
});

/**
 * Login the user
 */
function login()
{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "")
    {
        document.getElementById("error").innerHTML = "Please fill all the fields.";
        return;
    }

    let progress_bar = document.getElementById("progress_login");
    progress_bar.style.width = "0%";
    document.getElementById("error").innerHTML = "";

    post_request("/pwd-project/back/routes/users.php", JSON.stringify({
        "query": "login",
        "email": email,
        "password": password
    })).onload = function ()
    {
        let json = JSON.parse(this.responseText);
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
            if (json["type"] === "success")
            {
                localStorage.setItem("token", json["message"]["token"]);
                window.location.href = "../pages/profile.html";
            }
            else
            {
                document.getElementById("error").innerHTML = json["message"];
            }
        }, 1500);

    }
}
