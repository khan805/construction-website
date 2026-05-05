function setupResponsiveNavigation() {
  const navList = document.querySelector("#navigation");
  const mobileContainer = document.querySelector(".mobile_menu");

  if (!navList || !mobileContainer) {
    return;
  }

  let toggleButton = mobileContainer.querySelector(".mobile-menu-toggle");
  let mobileNav = mobileContainer.querySelector(".mobile-nav");

  if (!toggleButton) {
    toggleButton = document.createElement("button");
    toggleButton.className = "mobile-menu-toggle";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-label", "Toggle navigation menu");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.innerHTML = "<span></span><span></span><span></span>";
    mobileContainer.appendChild(toggleButton);
  }

  if (!mobileNav) {
    mobileNav = document.createElement("nav");
    mobileNav.className = "mobile-nav";
    mobileNav.setAttribute("aria-label", "Mobile navigation");
    mobileContainer.appendChild(mobileNav);
  }

  if (!mobileNav.querySelector("#mobile-navigation")) {
    const mobileList = navList.cloneNode(true);
    mobileList.id = "mobile-navigation";
    mobileNav.innerHTML = "";
    mobileNav.appendChild(mobileList);
  }

  const mobileList = mobileNav.querySelector("#mobile-navigation");
  const desktopSocial = document.querySelector(".header-social");

  if (desktopSocial && !mobileNav.querySelector(".mobile-social")) {
    const socialList = desktopSocial.cloneNode(true);
    socialList.classList.remove("header-social");
    socialList.classList.add("mobile-social");
    mobileNav.appendChild(socialList);
  }

  mobileList.querySelectorAll("li").forEach((item) => {
    const submenu = item.querySelector(":scope > .submenu");
    if (!submenu || item.querySelector(":scope > .submenu-toggle")) {
      return;
    }

    const submenuToggle = document.createElement("button");
    submenuToggle.className = "submenu-toggle";
    submenuToggle.type = "button";
    submenuToggle.setAttribute("aria-expanded", "false");
    submenuToggle.setAttribute("aria-label", "Toggle submenu");
    submenuToggle.textContent = "+";

    submenuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = submenu.classList.toggle("open");
      item.classList.toggle("is-open", isOpen);
      submenuToggle.textContent = isOpen ? "-" : "+";
      submenuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    item.insertBefore(submenuToggle, submenu);
  });

  const closeMenu = () => {
    mobileContainer.classList.remove("open");
    toggleButton.classList.remove("active");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("mobile-menu-open");
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = mobileContainer.classList.toggle("open");
    toggleButton.classList.toggle("active", isOpen);
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("mobile-menu-open", isOpen);
  });

  mobileList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mobileNav.contains(event.target);
    const clickedToggle = toggleButton.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      closeMenu();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupResponsiveNavigation);
} else {
  setupResponsiveNavigation();
}
