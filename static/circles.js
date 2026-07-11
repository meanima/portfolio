function createPageBackground() {
  const canvas = document.getElementById("page-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function getThemeColor(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }

  function createCircle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 15 + Math.random() * 35,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      opacity: 0.15 * (0.5 + Math.random() * 0.5)
    };
  }

  const circles = [];
  for (let i = 0; i < 25; i++) {
    circles.push(createCircle());
  }

  function draw() {
    // Paint the current theme's background color first — this is now the
    // page's only background, since sections themselves are transparent.
    ctx.fillStyle = getThemeColor("--c7");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const circle of circles) {
      circle.x += circle.vx;
      circle.y += circle.vy;

      if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
        circle.vx *= -1;
      }
      if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
        circle.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${circle.opacity})`;
      ctx.filter = "blur(8px)";
      ctx.fill();
      ctx.filter = "none";
    }

    requestAnimationFrame(draw);
  }

  draw();
}

createPageBackground();