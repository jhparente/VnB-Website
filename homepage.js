const partner = document.querySelector(".partner");
partner.style.display = "none";

let partnerStarted = false;

function initPageBehavior() {
  const page1 = document.querySelector(".page1");
  const page2 = document.querySelector(".page2");
  const page3 = document.querySelector(".page3");
  const header = document.querySelector("header");
  const part = document.querySelector(".page2-mainContent");

  page2.style.overflowY = "hidden";

  header.style.backgroundColor = "transparent";
  header.style.boxShadow = "none";

  function updateHeaderStyle() {
    if (partnerStarted) return;

    const page1Height = page1.offsetHeight;
    const scrollPosition = window.scrollY;
    const scrollPercent = (scrollPosition / page1Height) * 100;

    if (scrollPercent >= 55) {
      header.style.backgroundColor = "rgba(5, 68, 13, 1)";
      header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
      header.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
    }
  }

  function isPartFullyVisible() {
    const rect = part.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function updatePage2ScrollState() {
    if (isPartFullyVisible()) {
      page2.style.overflowY = "auto";
    } else {
      page2.style.overflowY = "hidden";
      page2.scrollTop = 0;
    }
  }

  function checkScroll() {
    updateHeaderStyle();
    updatePage2ScrollState();
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", updatePage2ScrollState);

  page2.addEventListener(
    "wheel",
    function (e) {
      if (!isPartFullyVisible()) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  checkScroll();
  updateHeaderStyle();
}

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform = "translateX(100%)";
  sidebar.style.opacity = "0";
  sidebar.style.visibility = "hidden";

  initPageBehavior();
});

const nextBtn = document.querySelector(".next-btn");
const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let isTransitioning = false;
let touchStartX = 0;
let touchEndX = 0;
let touchStartTime = 0;
let isSwiping = false;
const TRANSITION_DURATION = 1000;
const SWIPE_THRESHOLD = 50; // Minimum distance to consider a swipe
const SWIPE_TIME_THRESHOLD = 500; // Maximum time for a swipe gesture
const MIN_SWIPE_DISTANCE = 30; // Minimum horizontal movement to start tracking

slides[currentIndex].classList.add("active");

nextBtn.addEventListener("click", () => {
  if (!isTransitioning) {
    goToSlide(currentIndex + 1);
  }
});

// Touch swipe functionality
sliderTrack.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartTime = Date.now();
    isSwiping = false; // Reset swipe flag on new touch
  },
  { passive: true }
);

sliderTrack.addEventListener(
  "touchmove",
  (e) => {
    if (!isTransitioning) {
      const touchX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchX;

      // Only start tracking if horizontal movement exceeds threshold
      if (Math.abs(diff) > MIN_SWIPE_DISTANCE) {
        isSwiping = true;
      }

      if (isSwiping) {
        e.preventDefault(); // Prevent vertical scroll when swiping horizontally
        sliderTrack.style.transition = "none";
        sliderTrack.style.transform = `translateX(calc(-${
          currentIndex * 100
        }% - ${diff}px))`;
      }
    }
  },
  { passive: false }
);

sliderTrack.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const touchEndTime = Date.now();

    // Only handle as swipe if we were actively tracking a swipe gesture
    if (isSwiping) {
      handleSwipe(touchEndTime - touchStartTime);
    }
    isSwiping = false; // Reset swipe flag
  },
  { passive: true }
);

function handleSwipe(swipeDuration) {
  const distance = touchStartX - touchEndX;
  const absDistance = Math.abs(distance);

  if (absDistance > SWIPE_THRESHOLD && swipeDuration < SWIPE_TIME_THRESHOLD) {
    if (distance > 0) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  } else {
    // Return to current position if swipe wasn't sufficient
    sliderTrack.style.transition = `transform ${
      TRANSITION_DURATION / 2
    }ms ease-out`;
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

function goToSlide(index) {
  if (isTransitioning) return;

  isTransitioning = true;

  // Update slide classes for fade effect
  slides[currentIndex].classList.remove("active");

  // Handle wrap-around
  if (index >= slides.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex = index;
  }

  // Apply the transform with slower transition
  sliderTrack.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active slide
  slides[currentIndex].classList.add("active");

  // Reset transitioning flag after animation completes
  setTimeout(() => {
    isTransitioning = false;
  }, TRANSITION_DURATION);
}

let currentDamping;
let scrollAmount = 0;
let isScrolling = false;
let inertia = 0;
let ticking = false;

const speedMultiplier = 0.06;
const page2SpeedMultiplier = 0.03;
const damping = 0.91;

const page2 = document.querySelector(".page2");
page2.style.maxHeight = "100vh";
page2.style.scrollBehavior = "smooth";

function canScroll(element, deltaY) {
  if (
    element === window ||
    element === document.documentElement ||
    element === document.body
  ) {
    return true;
  }
  if (deltaY < 0 && element.scrollTop > 0) return true;
  if (
    deltaY > 0 &&
    element.scrollTop + element.clientHeight < element.scrollHeight
  )
    return true;
  return false;
}

window.addEventListener(
  "wheel",
  function (e) {
    const hovered = document.elementFromPoint(e.clientX, e.clientY);
    const overPage2 = page2.contains(hovered);

    e.preventDefault();
    scrollAmount += e.deltaY * speedMultiplier;
    isScrolling = true;

    if (!ticking) {
      animateScroll();
      ticking = true;
    }
  },
  { passive: false }
);

function animateScroll() {
  let delta = scrollAmount || inertia;

  const hovered = document.elementFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  const overPage2 = page2.contains(hovered);
  const page1StillVisible =
    document.querySelector(".page1").getBoundingClientRect().bottom > 0;

  const isPage2Target =
    overPage2 && !page1StillVisible && canScroll(page2, delta);
  const target = isPage2Target ? page2 : window;
  const currentDamping = isPage2Target ? 0.935 : 0.91;

  if (Math.abs(scrollAmount) > 0.1) {
    target.scrollBy({ top: scrollAmount, behavior: "instant" });
    inertia = scrollAmount;
    scrollAmount *= currentDamping;
  } else if (isScrolling) {
    isScrolling = false;
  } else if (Math.abs(inertia) > 0.1) {
    target.scrollBy({ top: inertia, behavior: "instant" });
    inertia *= currentDamping;
  } else {
    ticking = false;
    return;
  }

  requestAnimationFrame(animateScroll);
}

// Sidebar Toggle Functions
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");
  const headerShadow = document.querySelector("header");

  sidebar.style.transform = "translateX(0)";
  sidebar.style.opacity = "1";
  sidebar.style.visibility = "visible";
  openSidebar.style.display = "none";
  closeSidebar.style.display = "block";
  hideLogo.style.display = "none";
  headerShadow.style.boxShadow = "none";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");
  const header = document.querySelector("header");

  sidebar.style.transform = "translateX(100%)";
  sidebar.style.opacity = "0";
  sidebar.style.visibility = "hidden";
  openSidebar.style.display = "flex";
  closeSidebar.style.display = "none";
  hideLogo.style.display = "flex";

  if (!partnerStarted) {
    const page1Height = document.querySelector(".page1").offsetHeight;
    const scrollPosition = window.scrollY;
    const scrollPercent = (scrollPosition / page1Height) * 100;

    if (scrollPercent >= 55) {
      header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
    } else {
      header.style.boxShadow = "none";
    }
  }
}

window.addEventListener("resize", function () {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");

  if (window.innerWidth > 1080) {
    sidebar.style.transform = "translateX(100%)";
    sidebar.style.visibility = "hidden";
    openSidebar.style.display = "none";
    closeSidebar.style.display = "none";
    hideLogo.style.display = "flex";
  } else {
    openSidebar.style.display = "flex";
    closeSidebar.style.display = "none";
  }
});

document.addEventListener("click", function (e) {
  const sidebar = document.querySelector(".sidebar");
  const openSidebarBtn = document.querySelector(".open-sidebar");

  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnToggle = openSidebarBtn.contains(e.target);
  const isSidebarVisible = sidebar.style.transform !== "translateX(100%)";

  if (isSidebarVisible && !isClickInsideSidebar && !isClickOnToggle) {
    closeSidebar();
  }
});

// Typing Animation
new TypeIt("#type1", {
  speed: 40,
  waitUntilVisible: true,
  cursor: true,
  startDelay: 2200,
}).go();

// ScrollReveal Animations
ScrollReveal().reveal("#project-line1, #project-line2", {
  origin: "left",
  distance: "50px",
  duration: 400,
  delay: -200,
  easing: "ease-in-out",
  reset: true,
  viewFactor: 1,
});

ScrollReveal().reveal("#project-line2", {
  origin: "right",
});

ScrollReveal().reveal(".project-header p", {
  delay: 200,
  distance: "1px",
  duration: 300,
  delay: 100,
  easing: "ease-in-out",
  reset: true,
});

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = 0;
  }, 1800);

  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.display = "none";
  }, 2300);
});

function goToSlide(index) {
  if (isTransitioning) return;

  isTransitioning = true;

  slides[currentIndex].classList.remove("active");

  // Handle wrap-around
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  // Apply transform without affecting opacity
  sliderTrack.style.transition = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides[currentIndex].classList.add("active");

  setTimeout(() => {
    isTransitioning = false;
  }, TRANSITION_DURATION);
}


// show journey from top
function showPartner() {
  const partner = document.querySelector('.partner');
  const header = document.querySelector('header');
  const page1 = document.querySelector('.page1');
  const page2 = document.querySelector('.page2');
  const page3 = document.querySelector('.page3');
  const page4 = document.querySelector('.page4');
  const content = document.querySelector('.content');


  closeSidebar();

  if (!partnerStarted) {
      // Show journey
      page1.style.display = 'none';
      page2.style.display = 'none';
      page3.style.display = 'none';
      page4.style.display = 'none';
      content.style.display = 'none';


      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
      header.style.backgroundColor = 'rgba(5, 68, 13, 1)';
      header.style.boxSizing = 'border-box';

      partner.style.display = 'flex';
      partner.style.transform = 'translateY(-100%)';
      void partner.offsetHeight; 
      partner.style.transform = 'translateY(0)'; 

      partnerStarted = true;
  } else {
      startPartner();
  }
}

function startPartner() {
  const partner = document.querySelector('.partner');
  const page1 = document.querySelector('.page1');
  const page2 = document.querySelector('.page2');
  const page3 = document.querySelector('.page3');
  const page4 = document.querySelector('.page4');
  const content = document.querySelector('.content');
  const header = document.querySelector('header');


  partner.style.transform = 'translateY(-100%)';
  
  setTimeout(() => {
      partner.style.display = 'none';
      page1.style.display = 'block';
      page2.style.display = 'block';
      page3.style.display = 'block';
      page4.style.display = 'flex';
      content.style.display = 'block';
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'transparent';
  }, 300); 

  partnerStarted = false;
}

