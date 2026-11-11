/** @format */
document.addEventListener('DOMContentLoaded', () => {
    const navigationToggle = document.querySelector(".sec-nav-toggle");
    const navigationLinks = document.querySelector(".sec-nav-links");
    const navigationBar = navigationToggle?.closest(".sec-navbar");

    if (navigationToggle && navigationLinks && navigationBar) {
        const closeNavigation = () => {
            navigationToggle.setAttribute("aria-expanded", "false");
            navigationLinks.classList.remove("sec-open");
            navigationBar.classList.remove("sec-menu-open");
        };

        navigationToggle.addEventListener("click", () => {
            const isExpanded =
                navigationToggle.getAttribute("aria-expanded") === "true";
            navigationToggle.setAttribute("aria-expanded", String(!isExpanded));
            navigationLinks.classList.toggle("sec-open", !isExpanded);
            navigationBar.classList.toggle("sec-menu-open", !isExpanded);
        });

        navigationLinks.addEventListener("click", (event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
                closeNavigation();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeNavigation();
            }
        });
    }

    if (typeof Swiper !== "undefined") {
        const ingredientSwiper = document.querySelector(".sec-ingredient-swiper");
        if (ingredientSwiper) {
            new Swiper(ingredientSwiper, {
                slidesPerView: 1.25,
                spaceBetween: 14,
                loop: true,
                navigation: {
                    nextEl: ".sec-swiper-next",
                    prevEl: ".sec-swiper-prev",
                },
                breakpoints: {
                    520: { slidesPerView: 2, spaceBetween: 18 },
                    760: { slidesPerView: 3, spaceBetween: 22 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                },
            });
        }
    }


    const tabList = document.querySelector('.menu-tabs');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = tabs
        .map((tab) => document.getElementById(tab.getAttribute('aria-controls')))
        .filter(Boolean);

    function activateTab(tab, moveFocus = false) {
        tabs.forEach((item) => {
            const isActive = item === tab;
            item.classList.toggle('menu-tab--active', isActive);
            item.setAttribute('aria-selected', String(isActive));
            item.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
            const isActive = panel.id === tab.getAttribute('aria-controls');
            panel.classList.toggle('menu-panel--active', isActive);
            panel.hidden = !isActive;
        });

        if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', (event) => {
            let nextIndex;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft')
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;

            if (nextIndex !== undefined) {
                event.preventDefault();
                activateTab(tabs[nextIndex], true);
            }
        });
    });

    const initiallySelected =
        tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initiallySelected) activateTab(initiallySelected);
});
