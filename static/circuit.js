
// --- Canvas setup ---
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --- Trace shape generation (circuit-style zigzag) ---
const GRID = 12;

function generateTracePoints(startX, startY) {
  const points = [{ x: startX, y: startY }];
  let x = startX;
  let y = startY;

  const segments = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < segments; i++) {
    const horizontalLen = 60 + Math.random() * 24; // ~0.75in to ~1in
    x += horizontalLen; // always forward — no more +1/-1 direction choice

    points.push({ x, y });

    if (i < segments - 1) {
      const jog = GRID * (Math.random() < 0.5 ? 1 : -1); // up or down
      x += Math.abs(jog); // moves forward by the same amount, creating a true 45° diagonal
      y += jog;
      points.push({ x, y });
    }
  }

  return points;
}

// Distance between two consecutive points, and a running total per point —
// needed so we can later ask "where is the path at 40% drawn?"
function computeCumulativeLengths(points) {
  const lengths = [0]; // length from start up to points[0] is always 0
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const segmentLen = Math.sqrt(dx * dx + dy * dy);
    lengths.push(lengths[i - 1] + segmentLen);
  }
  return lengths;
}

function getThemeColor(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

function drawNode(point, filled, opacity) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(0, 255, 255, ${0.45 * opacity})`; // aqua
  ctx.lineWidth = 1.5;

  if (filled) {
    ctx.fillStyle = `rgba(0, 255, 255, ${0.45 * opacity})`;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}


// --- Stratified zones: one slot per screen region, so coverage is guaranteed ---
const ZONE_WIDTH = 160;
const ZONE_HEIGHT = 120;

function getZoneCount() {
  const cols = Math.ceil((canvas.width + 300) / ZONE_WIDTH);
  const rows = Math.ceil(canvas.height / ZONE_HEIGHT);
  return { cols, rows };
}

function randomPointInZone(col, row) {
  const zoneX = col * ZONE_WIDTH - 300;
  const zoneY = row * ZONE_HEIGHT;
  const startX = Math.floor((zoneX + Math.random() * ZONE_WIDTH) / GRID) * GRID;
  const startY = Math.floor((zoneY + Math.random() * ZONE_HEIGHT) / GRID) * GRID;
  return { startX, startY };
}


// --- A single trace: shape + its own growth/fade state ---
function createTrace(col, row) {
  const startX = Math.floor((Math.random() * (canvas.width + 300) - 300) / GRID) * GRID;
  const startY = Math.floor((Math.random() * canvas.height) / GRID) * GRID;
  const points = generateTracePoints(startX, startY);
  const cumulativeLengths = computeCumulativeLengths(points);
  const totalLength = cumulativeLengths[cumulativeLengths.length - 1];

  return {
    col, row,               // which zone this trace belongs to
    points,
    cumulativeLengths,
    totalLength,
    progress: 0,          // 0 = nothing drawn, 1 = fully drawn
    opacity: 1,
    state: "growing",     // "growing" -> "holding" -> "fading" -> respawn
    growSpeed: 0.0015 + Math.random() * 0.0025,
    holdTimer: 0,
    holdDuration: 40 + Math.random() * 60,   // frames to pause once fully drawn
    fadeSpeed: 0.015 + Math.random() * 0.02
  };
}

const { cols, rows } = getZoneCount();
const traces = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    traces.push(createTrace(col, row));
  }
}

// Finds the point at a given distance along the path, walking segment by
// segment. Returns both the interpolated position and how many full points
// have been passed (so we know which corner-nodes to draw).
function getPointAtDistance(trace, distance) {
  const { points, cumulativeLengths } = trace;

  for (let i = 1; i < cumulativeLengths.length; i++) {
    if (distance <= cumulativeLengths[i]) {
      const segStart = cumulativeLengths[i - 1];
      const segEnd = cumulativeLengths[i];
      const segT = segEnd === segStart ? 0 : (distance - segStart) / (segEnd - segStart);

      const p1 = points[i - 1];
      const p2 = points[i];

      return {
        x: p1.x + (p2.x - p1.x) * segT,
        y: p1.y + (p2.y - p1.y) * segT,
        passedIndex: i - 1
      };
    }
  }

  // distance >= totalLength: fully drawn, return the last point
  return { ...points[points.length - 1], passedIndex: points.length - 1 };
}

function drawTrace(trace) {
  const distance = trace.progress * trace.totalLength;
  const head = getPointAtDistance(trace, distance);

  ctx.beginPath();
  ctx.moveTo(trace.points[0].x, trace.points[0].y);
  for (let i = 1; i <= head.passedIndex; i++) {
    ctx.lineTo(trace.points[i].x, trace.points[i].y);
  }
  ctx.lineTo(head.x, head.y); // partial final segment, up to current progress

  // ctx.strokeStyle = `rgba(200, 155, 60, ${0.45 * trace.opacity})`;
  ctx.strokeStyle = `rgba(0, 255, 255, ${0.45 * trace.opacity})`;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = getThemeColor("--c7");
  ctx.shadowBlur = 4 * trace.opacity;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Draw a node at every corner already reached, plus the growing tip
  drawNode(trace.points[0], true, trace.opacity); // fixed starting point
  drawNode(head, false, trace.opacity);            // current growing tip
}

function updateTrace(trace) {
  if (trace.state === "growing") {
    trace.progress += trace.growSpeed;
    if (trace.progress >= 1) {
      trace.progress = 1;
      trace.state = "holding";
    }
  } else if (trace.state === "holding") {
    trace.holdTimer++;
    if (trace.holdTimer >= trace.holdDuration) {
      trace.state = "fading";
    }
  } else if (trace.state === "fading") {
    trace.opacity -= trace.fadeSpeed;
    if (trace.opacity <= 0) {
      return createTrace(trace.col, trace.row); // respawn in the SAME zone
    }
  }
  return trace;
}

// --- Animation loop ---
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < traces.length; i++) {
    traces[i] = updateTrace(traces[i]);
    drawTrace(traces[i]);
  }

  requestAnimationFrame(animate);
}

animate();