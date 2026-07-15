const root = document.documentElement; // the <html> element
const toggleBtn = document.getElementById("theme-toggle");

if (!toggleBtn) {
  console.warn("theme.js: #theme-toggle not found — skipping theme toggle.");
} else {
  // On page load: check if the user chose a theme before, and restore it
  const savedTheme = localStorage.getItem("theme");
  // Default to dark unless the person explicitly chose light before
  if (savedTheme !== "light") {
    root.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";

    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    }
  });
}