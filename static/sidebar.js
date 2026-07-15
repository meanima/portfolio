
const sidebar = document.getElementById("sidebar");
const sidebarBtn = document.getElementById("sidebar-toggle");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
  });

  function collapseSidebar() {
    sidebar.classList.remove("expanded");
  }

  // Auto-collapse whenever the user scrolls, in either direction
  window.addEventListener("scroll", collapseSidebar);

  // Auto-collapse on touch (mobile), the instant a touch begins
  window.addEventListener("touchstart", collapseSidebar);
} else {
  console.warn("sidebar.js: sidebar or toggle button not found — skipping sidebar behaviour.");
}