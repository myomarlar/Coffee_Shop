/** @format */

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
