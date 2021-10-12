
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initNavMenu();
  }
};

function initNavMenu() {
  const openNav = document.getElementById("open-nav");
  openNav.onclick = function () {
    document.body.classList.toggle("nav-open");
    return false;
  };

}