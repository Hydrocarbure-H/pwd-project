export default function display_message(type, message)
{

    let alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add("alert-dismissible");
    alert.classList.add("alert-" + type);
    let button = document.createElement("button");
    button.classList.add("btn-close");
    button.setAttribute("data-bs-dismiss", "alert");
    button.setAttribute("aria-label", "Close");
    alert.appendChild(button);
    let strong = document.createElement("strong");
    strong.innerHTML = "Oh noo... ";
    let text = document.createTextNode(message);
    alert.appendChild(strong);
    alert.appendChild(text);
    document.getElementById("products_content").appendChild(alert);
}