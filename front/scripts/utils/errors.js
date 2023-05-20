/**
 * Display an error message
 * @param type
 * @param title
 * @param message
 * @param div_id
 */
export default function display_message(type, title, message, div_id = "products_content")
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
    strong.innerHTML = title;
    let text = document.createTextNode(message);
    alert.appendChild(strong);
    alert.appendChild(text);
    document.getElementById(div_id).prepend(alert);
}