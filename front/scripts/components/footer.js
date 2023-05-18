export default function create_footer()
{
    let div_footer = document.createElement("div");
    div_footer.classList.add("footer", "secondary-color");
    let h3_footer = document.createElement("h3");
    let small_footer = document.createElement("small");
    small_footer.classList.add("text-muted");
    h3_footer.innerHTML = "Kiventout";
    small_footer.innerHTML = "- Copyright 2023";
    h3_footer.appendChild(small_footer);
    div_footer.appendChild(h3_footer);
    return div_footer;
}