
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebar-toggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("expanded");
});

function collapseSidebar() {
  sidebar.classList.remove("expanded");
}

// Auto-collapse whenever the user scrolls, in either direction
window.addEventListener("scroll", collapseSidebar);

// Auto-collapse on touch (mobile), the instant a touch begins
window.addEventListener("touchstart", collapseSidebar);