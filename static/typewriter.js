
const line1 = document.getElementById("line1-text");
const line2 = document.getElementById("line2-text");
const line3 = document.getElementById("line3-text");

const greeting = "Hello..! 👋🏽";
const name = "I'm Benjamin Kadiri...";
const titles = [
  "A Data Scientist & ML Engineer.",
  "A Certified Economist.",
  "A Certified Data Analyst.",
  "A Security professional."
];

const cursor = document.createElement("span");
cursor.className = "cursor";

function typeText(element, text, speed, callback) {
  let i = 0;
  function tick() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    } else {
      callback && callback();
    }
  }
  tick();
}

function eraseText(element, speed, callback) {
  function tick() {
    if (element.textContent.length > 0) {
      element.textContent = element.textContent.slice(0, -1);
      setTimeout(tick, speed);
    } else {
      callback && callback();
    }
  }
  tick();
}

let titleIndex = 0;

function cycleTitles() {
  const current = titles[titleIndex];
  if (!line3 || !line3.parentElement) return;
  line3.parentElement.appendChild(cursor);

  typeText(line3, current, 60, () => {
    setTimeout(() => {
      eraseText(line3, 35, () => {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(cycleTitles, 300);
      });
    }, 1400);
  });
}

function startSequence() {
  if (!line1 || !line1.parentElement || !line2 || !line2.parentElement) return;
  line1.parentElement.appendChild(cursor);
  typeText(line1, greeting, 60, () => {
    line2.parentElement.appendChild(cursor);
    typeText(line2, name, 60, () => {
      setTimeout(cycleTitles, 400);
    });
  });
}

if (line1 && line2 && line3) {
  startSequence();
} else {
  console.warn("typewriter.js: terminal elements not found — skipping typewriter sequence.");
}
