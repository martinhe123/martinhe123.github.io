const landingScreen = document.querySelector("#landing");
const portfolioScreen = document.querySelector("#portfolio");
const enterButton = document.querySelector("#enter-button");
const backButton = document.querySelector("#back-button");
const portfolioTitle = document.querySelector("#portfolio-title");
const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");
const transitionDuration = 300;

function showScreen(screenToShow, screenToHide) {
    screenToHide.classList.remove("is-active");
    screenToHide.setAttribute("aria-hidden", "true");
    screenToHide.inert = true;

    screenToShow.classList.add("is-active");
    screenToShow.removeAttribute("aria-hidden");
    screenToShow.inert = false;
}

function filterProjects(category) {
    projects.forEach((project) => {
        const categories = project.dataset.category.split(" ");
        project.hidden = category !== "all" && !categories.includes(category);
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterProjects(button.dataset.filter);

        filterButtons.forEach((filterButton) => {
            filterButton.setAttribute("aria-pressed", filterButton === button);
        });
    });
});

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
