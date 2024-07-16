// Projects containers
const projectsContainerEls = Array.from(document.querySelectorAll(".projects-container"));
for (let projectsContainerEl of projectsContainerEls) {
    let projectsTitleEl = projectsContainerEl.querySelector(".projects-title");
    let projectsDescriptionEl = projectsContainerEl.querySelector(".projects-description");
    let linkEl = projectsContainerEl.querySelector(".projects-link");
    let githubEl = projectsContainerEl.querySelector(".projects-github");

    let link = projectsContainerEl.getAttribute("link");
    let github = projectsContainerEl.getAttribute("github");

    let hyperlinkEls = projectsContainerEl.querySelectorAll(".hyperlink");
    for (let hyperlinkEl of hyperlinkEls) {
        if (hyperlinkEl) {
            hyperlinkEl.addEventListener("click", function(event) {
                event.stopPropagation();
            })

            hyperlinkEl.addEventListener("mouseover", () => {
                linkEl.style.fill = "";
                linkEl.style.transform = "";
                projectsTitleEl.style.color = "";
                projectsDescriptionEl.style.color = "";
            })
        }
    }

    for (let el of [projectsTitleEl, projectsDescriptionEl,linkEl]) {
        el.addEventListener("mouseover", () => {
            linkEl.style.fill = "var(--primary-main)";
            linkEl.style.transform = "translate(4px, -4px)";
            projectsTitleEl.style.color = "var(--primary-main)";
            projectsDescriptionEl.style.color = "var(--secondary-main)";

            el.style.cursor = "pointer";
        })

        el.addEventListener("mouseout", () => {
            linkEl.style.fill = "";
            linkEl.style.transform = "";
            projectsTitleEl.style.color = "";
            projectsDescriptionEl.style.color = "";

            el.style.cursor = "";
        })

        el.addEventListener("click", () => {
            openInANewTab(link)
        })
    }

    githubEl.addEventListener("click", () => {
        openInANewTab(github);
    })

    // let projectSkillsListEl = projectsContainerEl.querySelector(".projects-skills-list");
    // let projectsSkillsItemEls = Array.from(projectSkillsListEl.querySelectorAll(".projects-skills-item"));

    // for (let projectsSkillsItem of projectsSkillsItemEls) {
    //     let link = projectsSkillsItem.getAttribute("link");

    //     projectsSkillsItem.addEventListener("click", () => {
    //         openInANewTab(link)
    //     })
    // }

}


// Anchor stuff
// Anchor on load
document.addEventListener('DOMContentLoaded', (event) => {
    // Check if there is a hash in the URL
    if (window.location.hash) {
        const targetId = window.location.hash; // Get target ID from the hash in the URL

        // Find the target element
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smoothly scroll to the target element
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Anchor menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href'); // Get target ID from href attribute
        const targetElement = document.querySelector(targetId); // Find target element

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the target element
        }
    });
});


// Fix scroll (to allow scroll on left container too)
document.addEventListener("DOMContentLoaded", (event) => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 970) {
        return;
    }

    const containerEl = document.getElementById("container");

    const leftContainer = document.getElementById("left-container");
    const rightContainer = document.getElementById("right-container");

    if (window.getComputedStyle(containerEl).display !== "grid") {
        return;
    }

    leftContainer.addEventListener("wheel", (e) => {
        if (e.deltaY !== 0) {
            rightContainer.scrollTop += e.deltaY;
            e.preventDefault();
        }
    });

    leftContainer.addEventListener("touchmove", (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            rightContainer.scrollTop += touch.clientY - leftContainer.offsetTop;
            e.preventDefault();
        }
    });
});


// Hyperlinks
function openInANewTab(url) {
        const newWindow = window.open(url, '_blank');
}

const hyperlinkEls = Array.from(document.querySelectorAll(".hyperlink"));
for (let hyperlinkEl of hyperlinkEls) {
    let link = hyperlinkEl.getAttribute("link");

    hyperlinkEl.addEventListener("click", () => {
        openInANewTab(link);
    })
}

// Connect container
const connectIconEls = Array.from(document.querySelectorAll(".connect-icon"));
connectIconEls.forEach(connectIconEl => {
    let link = connectIconEl.getAttribute("link");

    connectIconEl.addEventListener("click", () => {
        openInANewTab(link);
    })
})

// Footer container
const FooterHyperlinkEls = Array.from(document.querySelectorAll(".footer-hyperlink"));
FooterHyperlinkEls.forEach(FooterHyperlinkEl => {
    let link = FooterHyperlinkEl.getAttribute("link");

    FooterHyperlinkEl.addEventListener("click", () => {
        openInANewTab(link);
    })
})