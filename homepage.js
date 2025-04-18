document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const page3 = document.querySelector('.page3');
    const header = document.querySelector('header');
    const video = document.querySelector('.background-video');
    const content = document.querySelector('.content');
    const track = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.next-btn');

    let isAnimating = false;
    let lastScrollPos = window.scrollY;
    let currentPage = 1;

    const page1Height = page1.offsetHeight;
    const page2Height = page2.offsetHeight;
    const page2Top = page2.offsetTop;
    const page2Bottom = page2Top + page2Height;
    const scrollTrigger = window.innerHeight * 0.6;

    page2.style.overflowY = 'hidden';
    page3.style.overflowY = 'hidden';

    function updateVisuals(scrollY) {
        const progress = Math.min(scrollY / page1Height, 1);

        if (progress < 1) {
            const scaleY = Math.max(1 - progress, 0.8);
            video.style.transform = `scale(1, ${scaleY})`;
            video.style.opacity = '1';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.left = '0';
        } else {
            video.style.opacity = '0';
        }

        if (progress < 0.6) {
            header.style.backgroundColor = `rgba(5, 68, 13, 0)`;
            header.style.boxShadow = 'none';
        } else {
            const fadeProgress = (progress - 0.6) / 0.4;
            header.style.backgroundColor = `rgba(5, 68, 13, 1)`;
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.5)';
        }

        content.style.opacity = 1 - progress;
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const direction = scrollY > lastScrollPos ? 'down' : 'up';
        lastScrollPos = scrollY;

        if (isAnimating) return;

        updateVisuals(scrollY);

        if (direction === 'down') {
            if (currentPage === 1 && scrollY >= page1Height * 0.8) {
                page2.style.overflowY = 'auto';
                snapToPage(2);
            } else if (currentPage === 2 && scrollY >= page2Bottom - window.innerHeight * 0.2) {
                page3.style.overflowY = 'hidden';
                snapToPage(3);
                setTimeout(() => {
                    page3.style.overflowY = 'auto';
                }, 1000);
            }
        } else {
            if (currentPage === 3 && scrollY <= page2Bottom + window.innerHeight * 0.2) {
                page3.style.overflowY = 'hidden';
                snapToPage(2);
            } else if (currentPage === 2 && scrollY <= page1Height * 0.2) {
                page2.style.overflowY = 'hidden';
                snapToPage(1);
            }
        }
    }

    function snapToPage(pageNum) {
        isAnimating = true;
        currentPage = pageNum;

        let targetY;
        if (pageNum === 1) targetY = 0;
        else if (pageNum === 2) targetY = page1Height;
        else if (pageNum === 3) targetY = page2Bottom;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });

        if (pageNum === 1) {
            video.style.transform = 'scale(1, 1)';
            video.style.opacity = '1';
            video.style.width = '100%';
            video.style.height = '100%';
        }

        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }

    function setInitialPage() {
        const scrollY = window.scrollY;

        updateVisuals(scrollY);

        if (scrollY < page1Height * 0.5) {
            currentPage = 1;
        } else if (scrollY < page2Bottom * 0.5) {
            currentPage = 2;
        } else {
            currentPage = 3;
        }
    }

    setInitialPage();
    window.addEventListener('scroll', handleScroll, { passive: true });

    let currentSlide = 0;
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % document.querySelectorAll('.slide').length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    }
});

document.addEventListener('scroll', () => {
    const page4 = document.querySelector('.page4');
    const rect = page4.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
        page4.style.overflowY = 'auto'; 
    } else {
        page4.scrollTop = 0; 
        page4.style.overflowY = 'hidden';
    }
});

document.addEventListener('scroll', () => {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const page3 = document.querySelector('.page3');
    const page4 = document.querySelector('.page4');

    const windowHeight = window.innerHeight;
    const page1Rect = page1.getBoundingClientRect();
    const page2Rect = page2.getBoundingClientRect();
    const page3Rect = page3.getBoundingClientRect();

    const page1VisibleHeight = Math.min(windowHeight, page1Rect.bottom) - Math.max(0, page1Rect.top);
    const page1ScrollRatio = 1 - (page1VisibleHeight / page1.offsetHeight);

    const page2VisibleHeight = Math.min(windowHeight, page2Rect.bottom) - Math.max(0, page2Rect.top);
    const page2VisibilityRatio = page2VisibleHeight / page2.offsetHeight;

    const page3VisibleHeight = Math.min(windowHeight, page3Rect.bottom) - Math.max(0, page3Rect.top);
    const page3VisibilityRatio = page3VisibleHeight / page3.offsetHeight;

    // Lock page2 unless 90% of page1 is scrolled
    if (page1ScrollRatio < 0.9) {
        page2.scrollTop = 0;
        page2.style.pointerEvents = 'none';
        page2.style.overflowY = 'hidden';
    } else {
        page2.style.pointerEvents = 'auto';
        page2.style.overflowY = 'auto';
    }

    if (page2VisibilityRatio <= 0.1) {
        page3.style.pointerEvents = 'auto';
        page3.style.overflowY = 'auto';
    } else {
        page3.scrollTop = 0;
        page3.style.pointerEvents = 'none';
        page3.style.overflowY = 'hidden';
    }

    if (page3VisibilityRatio <= 0.2) {
        page4.style.pointerEvents = 'auto';
        page4.style.overflowY = 'auto';
    } else {
        page4.scrollTop = 0;
        page4.style.pointerEvents = 'none';
        page4.style.overflowY = 'hidden';
    }
});


