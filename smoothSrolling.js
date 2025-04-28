let scrollAmount = 0;
let isScrolling = false;
let inertia = 0;
let ticking = false;
const speedMultiplier = 0.08;
const damping = 0.91;
let smoothScrollEnabled = true; 

function handleWheel(e) {
    if (!smoothScrollEnabled) return; 
    e.preventDefault();
    scrollAmount += e.deltaY * speedMultiplier;
    isScrolling = true;

    if (!ticking) {
        animateScroll();
        ticking = true;
    }
}

window.addEventListener('wheel', handleWheel, { passive: false });

function animateScroll() {
    let delta = scrollAmount || inertia;

    if (Math.abs(scrollAmount) > 0.1) {
        window.scrollBy({ top: scrollAmount, behavior: 'instant' });
        inertia = scrollAmount;
        scrollAmount *= damping;
    } else if (isScrolling) {
        isScrolling = false;
    } else if (Math.abs(inertia) > 0.1) {
        window.scrollBy({ top: inertia, behavior: 'instant' });
        inertia *= damping;
    } else {
        ticking = false;
        return;
    }

    requestAnimationFrame(animateScroll);
}


