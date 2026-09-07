const landingScreen = document.querySelector("#landing");
const portfolioScreen = document.querySelector("#portfolio");
const enterButton = document.querySelector("#enter-button");
const backButton = document.querySelector("#back-button");
const portfolioTitle = document.querySelector("#portfolio-title");
const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");
const transitionDuration = 300;
const filterTransitionDuration = 300;
let filterHideTimeout;
let filterFadeFrame;

function showScreen(screenToShow, screenToHide) {
    screenToHide.classList.remove("is-active");
    screenToHide.setAttribute("aria-hidden", "true");
    screenToHide.inert = true;

    screenToShow.classList.add("is-active");
    screenToShow.removeAttribute("aria-hidden");
    screenToShow.inert = false;
}

function filterProjects(category) {
    window.clearTimeout(filterHideTimeout);
    window.cancelAnimationFrame(filterFadeFrame);

    const projectsToShow = [];
    const projectsToHide = [];

    projects.forEach((project) => {
        const categories = project.dataset.category.split(" ");
        const shouldShow = category === "all" || categories.includes(category);

        if (shouldShow) {
            project.hidden = false;
            projectsToShow.push(project);
        } else {
            project.classList.add("is-filtering-out");
            projectsToHide.push(project);
        }
    });

    filterFadeFrame = window.requestAnimationFrame(() => {
        projectsToShow.forEach((project) => {
            project.classList.remove("is-filtering-out");
        });
    });

    filterHideTimeout = window.setTimeout(() => {
        projectsToHide.forEach((project) => {
            project.hidden = true;
        });
    }, filterTransitionDuration);
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
