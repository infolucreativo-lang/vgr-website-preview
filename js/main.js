document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();
  initializeMobileMenu();
  initializeLanguageButtons();
  initializeActiveNavigation();
  initializeRevealAnimations();
  initializeGalleryLightbox();
  initializeMediaTabs();
  initializeLiveStream();
  startCountdown();
});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

function initializeNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    return;
  }

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}


/* =========================================
   MOBILE MENU
========================================= */

function initializeMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


/* =========================================
   LANGUAGE BUTTONS
========================================= */

function initializeLanguageButtons() {
  const languageButtons = document.querySelectorAll(".lang-btn");

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.dataset.lang;

      if (
        selectedLanguage &&
        typeof window.setLanguage === "function"
      ) {
        window.setLanguage(selectedLanguage);
      }
    });
  });
}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

function initializeActiveNavigation() {
  const activePage = document.body.dataset.page;

  if (!activePage) {
    return;
  }

  const activeLink = document.querySelector(
    `[data-page-link="${activePage}"]`
  );

  activeLink?.classList.add("active");
}


/* =========================================
   REVEAL ANIMATIONS
========================================= */

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================
   GALLERY LIGHTBOX
========================================= */

function initializeGalleryLightbox() {
  const galleryImages = document.querySelectorAll(
    ".gallery-item img"
  );

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = document.querySelector(".lightbox-close");

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) {
        return;
      }

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || "VGR media image";
      lightbox.classList.add("open");

      document.body.style.overflow = "hidden";
    });
  });

  closeButton?.addEventListener("click", () => {
    closeLightbox();
  });

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox?.classList.remove("open");
    document.body.style.overflow = "";
  }
}


/* =========================================
   MEDIA TABS
========================================= */

function initializeMediaTabs() {
  const mediaTabs = document.querySelectorAll(".media-tab");
  const mediaPanels = document.querySelectorAll(".media-panel");

  mediaTabs.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) {
        return;
      }

      mediaTabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      mediaPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      button.classList.add("active");
      targetPanel.classList.add("active");

      /*
       * Elfsight sometimes needs a resize event
       * after its tab becomes visible.
       */
      if (targetId === "instagram-panel") {
        window.setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 300);
      }
    });
  });
}


/* =========================================
   IMSA YOUTUBE LIVE STREAM
========================================= */

function initializeLiveStream() {
  const liveFrame = document.getElementById("live-frame");
  const config = window.VGR_CONFIG;

  if (!liveFrame || !config?.youtubeVideoId) {
    return;
  }

  const videoId = extractYouTubeVideoId(
    config.youtubeVideoId
  );

  if (!videoId) {
    console.error("Invalid YouTube video ID or URL.");
    return;
  }

  const pageOrigin =
    window.location.protocol === "http:" ||
    window.location.protocol === "https:"
      ? window.location.origin
      : "";

  const parameters = new URLSearchParams({
    rel: "0",
    playsinline: "1",
    enablejsapi: "1"
  });

  if (pageOrigin) {
    parameters.set("origin", pageOrigin);
  }

  liveFrame.src =
    `https://www.youtube.com/embed/` +
    `${encodeURIComponent(videoId)}?${parameters.toString()}`;

  liveFrame.setAttribute(
    "allow",
    [
      "accelerometer",
      "autoplay",
      "clipboard-write",
      "encrypted-media",
      "gyroscope",
      "picture-in-picture",
      "web-share"
    ].join("; ")
  );

  liveFrame.setAttribute(
    "referrerpolicy",
    "strict-origin-when-cross-origin"
  );

  liveFrame.setAttribute("allowfullscreen", "");
}


/* =========================================
   YOUTUBE ID EXTRACTION

   Accepts:
   - vmgTujW0DGI
   - https://youtu.be/vmgTujW0DGI
   - https://www.youtube.com/watch?v=vmgTujW0DGI
   - https://www.youtube.com/live/vmgTujW0DGI
========================================= */

function extractYouTubeVideoId(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const trimmedValue = value.trim();

  const directIdPattern = /^[a-zA-Z0-9_-]{11}$/;

  if (directIdPattern.test(trimmedValue)) {
    return trimmedValue;
  }

  try {
    const url = new URL(trimmedValue);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    const queryVideoId = url.searchParams.get("v");

    if (queryVideoId) {
      return queryVideoId;
    }

    const pathParts = url.pathname
      .split("/")
      .filter(Boolean);

    const videoTypeIndex = pathParts.findIndex(
      (part) =>
        part === "embed" ||
        part === "live" ||
        part === "shorts"
    );

    if (
      videoTypeIndex !== -1 &&
      pathParts[videoTypeIndex + 1]
    ) {
      return pathParts[videoTypeIndex + 1];
    }
  } catch (error) {
    console.error(
      "Unable to read YouTube URL:",
      error
    );
  }

  return "";
}


/* =========================================
   NEXT RACE COUNTDOWN
========================================= */

function startCountdown() {
  const countdownBox = document.getElementById(
    "countdown"
  );

  const config = window.VGR_CONFIG;

  if (!countdownBox || !config?.nextRace?.date) {
    return;
  }

  const targetDate = new Date(
    config.nextRace.date
  );

  if (Number.isNaN(targetDate.getTime())) {
    console.error(
      "Invalid next race date in js/config.js"
    );

    return;
  }

  const updateCountdown = () => {
    const currentDate = new Date();

    const remainingMilliseconds = Math.max(
      0,
      targetDate.getTime() - currentDate.getTime()
    );

    const days = Math.floor(
      remainingMilliseconds / 86400000
    );

    const hours = Math.floor(
      (remainingMilliseconds % 86400000) /
        3600000
    );

    const minutes = Math.floor(
      (remainingMilliseconds % 3600000) /
        60000
    );

    const seconds = Math.floor(
      (remainingMilliseconds % 60000) /
        1000
    );

    updateCountdownValue("days", days);
    updateCountdownValue("hours", hours);
    updateCountdownValue("minutes", minutes);
    updateCountdownValue("seconds", seconds);
  };

  updateCountdown();

  window.setInterval(updateCountdown, 1000);
}


/* =========================================
   COUNTDOWN VALUE HELPER
========================================= */

function updateCountdownValue(elementId, value) {
  const element = document.getElementById(
    elementId
  );

  if (!element) {
    return;
  }

  element.textContent = String(value).padStart(
    2,
    "0"
  );
}