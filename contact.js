let contactStarted = false;

function showContact() {
  const contact = document.querySelector(".contact");
  const header = document.querySelector("header");
  const partner = document.querySelector(".partner");

  closeSidebar();

  if (!contactStarted) {
    header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
    header.style.backgroundColor = "rgba(5, 68, 13, 1)";
    header.style.boxSizing = "border-box";

    partner.style.display = "none";
    contact.style.display = "flex";
    contact.style.transform = "translateY(-100%)";
    void contact.offsetHeight;
    contact.style.transform = "translateY(0)";

    contactStarted = true;
    partnerStarted = false;
  } else {
    startContact();
    startPartner();
  }
}

function startContact() {
  const contact = document.querySelector(".contact");
  const header = document.querySelector("header");
  const partner = document.querySelector(".partner");

  contact.style.transform = 'translateY(-100%)';

  setTimeout(() => {
    
    contact.style.display = "none";
    partner.style.display = "none";
  }, 300);

  contactStarted = false;
  header.style.display = 'transparent';
  updateHeaderStyleContact();
}
