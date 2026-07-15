
const skillBars = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const bar = entry.target;
      if (entry.isIntersecting) {
        bar.style.width = bar.dataset.percent + "%";
      } else {
        bar.style.width = "0%"; // resets, so it re-animates on next scroll-in
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));