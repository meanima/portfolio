
function createFloatingCircles(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const count = options.count ?? 12;
  const maxRadius = options.maxRadius ?? 60;
  const minRadius = options.minRadius ?? 25;
  const maxOpacity = options.maxOpacity ?? 0.15;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createCircle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: minRadius + Math.random() * (maxRadius - minRadius),
      vx: (Math.random() - 0.5) * 4, // slow drift
      vy: (Math.random() - 0.5) * 4,
      opacity: maxOpacity * (0.5 + Math.random() * 0.5) // slight variation per circle
    };
  }

  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push(createCircle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const circle of circles) {
      circle.x += circle.vx;
      circle.y += circle.vy;

      // Bounce off edges: reverse direction once the circle's edge touches a wall
      if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
        circle.vx *= -1;
      }
      if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
        circle.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${circle.opacity})`;
      ctx.filter = "blur(8px)"; // soft, glowing edge instead of a hard circle outline
      ctx.fill();
      ctx.filter = "none";
    }

    requestAnimationFrame(draw);
  }

  draw();
}

createFloatingCircles("about-canvas");
createFloatingCircles("projects-canvas");
createFloatingCircles("skills-canvas");
createFloatingCircles("contact-canvas");