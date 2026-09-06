const landingScreen = document.querySelector("#landing");
const portfolioScreen = document.querySelector("#portfolio");
const enterButton = document.querySelector("#enter-button");
const backButton = document.querySelector("#back-button");
const portfolioTitle = document.querySelector("#portfolio-title");
const transitionDuration = 300;

function showScreen(screenToShow, screenToHide) {
    screenToHide.classList.remove("is-active");
    screenToHide.setAttribute("aria-hidden", "true");
    screenToHide.inert = true;

    screenToShow.classList.add("is-active");
    screenToShow.removeAttribute("aria-hidden");
    screenToShow.inert = false;
}

enterButton.addEventListener("click", () => {
    showScreen(portfolioScreen, landingScreen);

    window.setTimeout(() => {
        portfolioTitle.focus();
    }, transitionDuration);
});

backButton.addEventListener("click", () => {
    showScreen(landingScreen, portfolioScreen);

    window.setTimeout(() => {
        enterButton.focus();
    }, transitionDuration);
});
