const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");
const originalCardsCount = track.children.length;

// 1. Build dots based on original count BEFORE cloning anything
for (let i = 0; i < originalCardsCount; i++) {
  const dot = document.createElement("div");
  dot.className = "carousel-dot";
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(i + 1);
    resetAutoAdvance(); // Reset timer if a user manually clicks a dot
  });
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.children;

// 2. Programmatically clone elements for the infinite track structure
const firstClone = track.children[0].cloneNode(true);
const lastClone = track.children[originalCardsCount - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, track.children[0]);

// 3. Track setup & states
const cards = track.children; 
let currentIndex = 1; // Index 1 is the first original card
let isTransitioning = false;
let slideTimer = null; // Holds our auto-advance instance

// Set initial structural view to the true first card
track.style.transition = "none";
track.style.transform = `translateX(-${currentIndex * 100}%)`;

function goToSlide(index, smooth = true) {
  if (isTransitioning && smooth) return;
  isTransitioning = true;

  if (smooth) {
    track.style.transition = "transform 1.2s ease-in-out";
  } else {
    track.style.transition = "none";
  }

  currentIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;

  updateDots(index);
}

// 4. Handle seamless boundary snaps AND restart the timer ONLY after snapping finishes
track.addEventListener("transitionend", () => {
  isTransitioning = false;

  // Arrived at duplicate first card (end) -> teleport to actual first card
  if (currentIndex === cards.length - 1) {
    goToSlide(1, false);
  }
  
  // Arrived at duplicate last card (start) -> teleport to actual last card
  if (currentIndex === 0) {
    goToSlide(cards.length - 2, false);
  }

  // GLITCH FIX: Restart the 6-second timer only AFTER all movement and snaps are completely finished
  resetAutoAdvance(); 
});

function updateDots(index) {
  let activeDotIndex = index - 1;

  if (index === cards.length - 1) activeDotIndex = 0;
  if (index === 0) activeDotIndex = originalCardsCount - 1;

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle("active", i === activeDotIndex);
  }
}

// GLITCH FIX: Completely clear the old timer and queue up a fresh, isolated 6-second delay
function resetAutoAdvance() {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(() => {
    goToSlide(currentIndex + 1);
  }, 6000); // 6 seconds
}

// Start the initial auto-advance loop on page load
resetAutoAdvance();
