const lines = [
  {
    element: document.getElementById("line1-text"),
    text: "Hello..! 👋🏽"
  },
  {
    element: document.getElementById("line2-text"),
    text: "I'm Benjamin Kadiri..."
  },
  {
    element: document.getElementById("line3-text"),
    text: " A Data Scientist & ML Engineer."
  }
];

const cursor = document.createElement("span");
cursor.className = "cursor";

let lineIndex = 0;
let charIndex = 0;

function placeCursor() {
  const currentLine = lines[lineIndex];
  currentLine.element.parentElement.appendChild(cursor);
}

function typeCurrentLine() {
  const currentLine = lines[lineIndex];

  if (charIndex < currentLine.text.length) {
    currentLine.element.textContent += currentLine.text[charIndex];
    charIndex += 1;
    setTimeout(typeCurrentLine, 60);
    return;
  }

  if (lineIndex < lines.length - 1) {
    lineIndex += 1;
    charIndex = 0;
    placeCursor();
    setTimeout(typeCurrentLine, 400);
    return;
  }

  setTimeout(eraseCurrentLine, 1400);
}

function eraseCurrentLine() {
  const currentLine = lines[lineIndex];

  if (currentLine.element.textContent.length > 0) {
    currentLine.element.textContent = currentLine.element.textContent.slice(0, -1);
    setTimeout(eraseCurrentLine, 35);
    return;
  }

  if (lineIndex > 0) {
    lineIndex -= 1;
    placeCursor();
    setTimeout(eraseCurrentLine, 35);
    return;
  }

  lineIndex = 0;
  charIndex = 0;
  lines.forEach((line) => {
    line.element.textContent = "";
  });
  placeCursor();
  setTimeout(typeCurrentLine, 700);
}

function startSequence() {
  placeCursor();
  setTimeout(typeCurrentLine, 1200);
}

startSequence();


(function(){
  // mobile nav toggle: open/close, close on link click or outside click
  const toggle = document.getElementById('nav-toggle');
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.site-nav a');
  if(toggle){
    toggle.addEventListener('click', (e)=>{
      e.stopPropagation();
      header.classList.toggle('open');
    });
  }
  navLinks.forEach(a=> a.addEventListener('click', ()=> header.classList.remove('open')));
  document.addEventListener('click', (e)=>{
    if(header.classList.contains('open') && !header.contains(e.target)){
      header.classList.remove('open');
    }
  });
})();
