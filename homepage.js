document.addEventListener('DOMContentLoaded', function () {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const page3 = document.querySelector('.page3');
    const header = document.querySelector('header');
    const part = document.querySelector('.page2-mainContent');

    page2.style.overflowY = 'hidden';

    function updateHeaderStyle() {
        const page1Height = page1.offsetHeight;
        const scrollPosition = window.scrollY;
        const scrollPercent = (scrollPosition / page1Height) * 100;

        if (scrollPercent >= 55) {
            header.style.backgroundColor = 'rgba(5, 68, 13, 1)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
            header.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    }

    // Check if .page2-mainContent is fully visible
    function isPartFullyVisible() {
        const rect = part.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function updatePage2ScrollState() {
        if (isPartFullyVisible()) {
            page2.style.overflowY = 'auto';
        } else {
            page2.style.overflowY = 'hidden';
            page2.scrollTop = 0;
        }
    }

    function checkScroll() {
        updateHeaderStyle();
        updatePage2ScrollState();
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', updatePage2ScrollState);

    page2.addEventListener('wheel', function (e) {
        if (!isPartFullyVisible()) {
            e.preventDefault();
        }
    }, { passive: false });

    checkScroll();
    updateHeaderStyle();
});

// Slider logic
const nextBtn = document.querySelector(".next-btn");
const sliderTrack = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= slides.length) {    
        currentIndex = 0;
    }
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
});

// Smooth scrolling
let scrollAmount = 0;
let isScrolling = false;
let inertia = 0;
let ticking = false;
const speedMultiplier = 0.05;
const damping = 0.91;

const page2 = document.querySelector('.page2');
page2.style.maxHeight = '100vh';
page2.style.scrollBehavior = 'smooth';

function canScroll(element, deltaY) {
    if (element === window || element === document.documentElement || element === document.body) {
        return true;
    }
    if (deltaY < 0 && element.scrollTop > 0) return true;
    if (deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight) return true;
    return false;
}

window.addEventListener('wheel', function (e) {
    const hovered = document.elementFromPoint(e.clientX, e.clientY);
    const overPage2 = page2.contains(hovered);

    e.preventDefault();
    scrollAmount += e.deltaY * speedMultiplier;
    isScrolling = true;

    if (!ticking) {
        animateScroll();
        ticking = true;
    }
}, { passive: false });

function animateScroll() {
    let delta = scrollAmount || inertia;
    let target;

    const hovered = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    const overPage2 = page2.contains(hovered);
    const page1StillVisible = document.querySelector('.page1').getBoundingClientRect().bottom > 0;

    if (overPage2 && !page1StillVisible && canScroll(page2, delta)) {
        target = page2;
    } else {
        target = window;
    }

    if (Math.abs(scrollAmount) > 0.1) {
        target.scrollBy({ top: scrollAmount, behavior: 'instant' });
        inertia = scrollAmount;
        scrollAmount *= damping;
    } else if (isScrolling) {
        isScrolling = false;
    } else if (Math.abs(inertia) > 0.1) {
        target.scrollBy({ top: inertia, behavior: 'instant' });
        inertia *= damping;
    } else {
        ticking = false;
        return;
    }

    requestAnimationFrame(animateScroll);
}
