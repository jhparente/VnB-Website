let partnerStarted = false;

function showPartner() {
    const partner = document.querySelector('.partner');
    const header = document.querySelector('header');
    const sec1 = document.querySelector('.sec1');
    const sec2 = document.querySelector('.sec2');

    closeSidebar();

    if (!partnerStarted) {

        sec1.style.display = 'none';
        sec2.style.display = 'none';

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
    const header = document.querySelector('header');
    const sec1 = document.querySelector('.sec1');
    const sec2 = document.querySelector('.sec2');

    // Animate journey slide-up
    partner.style.transform = 'translateY(-100%)';

    setTimeout(() => {
        partner.style.display = 'none';
        sec1.style.display = 'flex';
        sec2.style.display = 'block';

        partnerStarted = false;
    }, 300); 
}
