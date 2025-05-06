function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");
  const headerShadow = document.querySelector("header");

  sidebar.style.transform = "translateX(0)";
  sidebar.style.opacity = "1";
  openSidebar.style.display = "none";
  closeSidebar.style.display = "block";
  hideLogo.style.display = "none";
  headerShadow.style.boxShadow = "0 0 0 0";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");
  const headerShadow = document.querySelector("header");

  sidebar.style.transform = "translateX(100%)";
  sidebar.style.opacity = "0";
  openSidebar.style.display = "flex";
  closeSidebar.style.display = "none";
  hideLogo.style.display = "flex";
  headerShadow.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
}

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

window.addEventListener("resize", function () {
  const sidebar = document.querySelector(".sidebar");
  const openSidebar = document.querySelector(".open-sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const hideLogo = document.querySelector(".nav-logo");

  if (window.innerWidth > 1055) {
    sidebar.style.transform = "translateX(100%)";
    openSidebar.style.display = "none";
    closeSidebar.style.display = "none";
    hideLogo.style.display = "flex";
  } else {
    openSidebar.style.display = "flex";
    closeSidebar.style.display = "none";
  }
});
