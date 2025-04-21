function showJourney() {
    const journey = document.querySelector('.journey');
    const header = document.querySelector('header');
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const page3 = document.querySelector('.page3');
    const page4 = document.querySelector('.page4');
    const content = document.querySelector('.content');

    closeSidebar();

    if (!journeyStarted) {
        // Show journey
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'none';
        page4.style.display = 'none';
        content.style.display = 'none';

        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        header.style.backgroundColor = 'rgba(5, 68, 13, 1)';
        header.style.boxSizing = 'border-box';

        journey.style.display = 'flex';
        journey.style.transform = 'translateY(-100%)';
        void journey.offsetHeight; 
        journey.style.transform = 'translateY(0)'; 

        journeyStarted = true;
    } else {
        journey.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            journey.style.display = 'none';
            page1.style.display = 'block';
            page2.style.display = 'block';
            page3.style.display = 'block';
            page4.style.display = 'flex';
            content.style.display = 'block';
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'transparent';
        }, 300); 

        journeyStarted = false;
    }
}
