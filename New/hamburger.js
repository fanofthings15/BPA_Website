window.onload = () => {
    const hamburgerButton = document.getElementById("hamburger-button");
    const hamburgerMenu = document.getElementById("hamburger-menu");

    let enabled = false;

    hamburgerButton.addEventListener("click", (e) => {
        if (enabled) {
            hamburgerMenu.style.display = "none";

            hamburgerButton.src = "imgs/hamburger.webp";
        } else {
            hamburgerMenu.style.display = "flex";

            hamburgerButton.src = "imgs/x.webp";
        }

        enabled = !enabled;
    });
}