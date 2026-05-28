// ═══════════════════════════════════════════════════════════
//  GEO DROP  –  game.js
// ═══════════════════════════════════════════════════════════

// ── Country / Capital data ──────────────────────────────────
const COUNTRIES = [
  { country: "France",       capital: "Paris" },
  { country: "Germany",      capital: "Berlin" },
  { country: "Italy",        capital: "Rome" },
  { country: "Spain",        capital: "Madrid" },
  { country: "Portugal",     capital: "Lisbon" },
  { country: "Japan",        capital: "Tokyo" },
  { country: "China",        capital: "Beijing" },
  { country: "India",        capital: "New Delhi" },
  { country: "Brazil",       capital: "Brasília" },
  { country: "Argentina",    capital: "Buenos Aires" },
  { country: "Australia",    capital: "Canberra" },
  { country: "Canada",       capital: "Ottawa" },
  { country: "Mexico",       capital: "Mexico City" },
  { country: "Russia",       capital: "Moscow" },
  { country: "Egypt",        capital: "Cairo" },
  { country: "Nigeria",      capital: "Abuja" },
  { country: "South Africa", capital: "Pretoria" },
  { country: "Kenya",        capital: "Nairobi" },
  { country: "Turkey",       capital: "Ankara" },
  { country: "Greece",       capital: "Athens" },
  { country: "Sweden",       capital: "Stockholm" },
  { country: "Norway",       capital: "Oslo" },
  { country: "Denmark",      capital: "Copenhagen" },
  { country: "Netherlands",  capital: "Amsterdam" },
  { country: "Belgium",      capital: "Brussels" },
  { country: "Switzerland",  capital: "Bern" },
  { country: "Austria",      capital: "Vienna" },
  { country: "Poland",       capital: "Warsaw" },
  { country: "Ukraine",      capital: "Kyiv" },
  { country: "USA",          capital: "Washington D.C." },
  { country: "South Korea",  capital: "Seoul" },
  { country: "Thailand",     capital: "Bangkok" },
  { country: "Vietnam",      capital: "Hanoi" },
  { country: "Indonesia",    capital: "Jakarta" },
  { country: "Malaysia",     capital: "Kuala Lumpur" },
  { country: "Philippines",  capital: "Manila" },
  { country: "Pakistan",     capital: "Islamabad" },
  { country: "Bangladesh",   capital: "Dhaka" },
  { country: "Saudi Arabia", capital: "Riyadh" },
  { country: "Iran",         capital: "Tehran" },
  { country: "Iraq",         capital: "Baghdad" },
  { country: "Israel",       capital: "Jerusalem" },
  { country: "Jordan",       capital: "Amman" },
  { country: "Morocco",      capital: "Rabat" },
  { country: "Algeria",      capital: "Algiers" },
  { country: "Ethiopia",     capital: "Addis Ababa" },
  { country: "Ghana",        capital: "Accra" },
  { country: "Cuba",         capital: "Havana" },
  { country: "Peru",         capital: "Lima" },
  { country: "Colombia",     capital: "Bogotá" },
  { country: "Chile",        capital: "Santiago" },
  { country: "Venezuela",    capital: "Caracas" },
  { country: "Romania",      capital: "Bucharest" },
  { country: "Hungary",      capital: "Budapest" },
  { country: "Czech Republic", capital: "Prague" },
  { country: "Finland",      capital: "Helsinki" },
  { country: "New Zealand",  capital: "Wellington" },
  { country: "Singapore",    capital: "Singapore" },
  { country: "UAE",          capital: "Abu Dhabi" },
  { country: "Qatar",        capital: "Doha" },
];

// ── Difficulty settings ─────────────────────────────────────
const DIFFICULTY = {
  easy:   { dropSpeed: 1.4, spawnInterval: 2600, distractors: 2, lives: 5 },
  medium: { dropSpeed: 2.2, spawnInterval: 2000, distractors: 3, lives: 3 },
  hard:   { dropSpeed: 3.2, spawnInterval: 1400, distractors: 4, lives: 2 },
};

// ── Colour palette for capsules ──────────────────────────────
const CAPSULE_COLORS = [
  "#f7c948", "#ff6b6b", "#4ecca3", "#7e82ff",
  "#ff9f43", "#a29bfe", "#fd79a8", "#55efc4",
];

// ── DOM refs ────────────────────────────────────────────────
const startScreen    = document.getElementById("startScreen");
const gameScreen     = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const canvas         = document.getElementById("gameCanvas");
const ctx            = canvas.getContext("2d");
const scoreEl        = document.getElementById("score");
const levelEl        = document.getElementById("level");
const countryLabel   = document.getElementById("countryLabel");
const livesDisplay   = document.getElementById("livesDisplay");
const finalScoreEl   = document.getElementById("finalScore");
const bestScoreEl    = document.getElementById("bestScore");
const finalLevelEl   = document.getElementById("finalLevel");
const finalMessageEl = document.getElementById("finalMessage");

// ── State ───────────────────────────────────────────────────
let state = {};
let animId = null;
let selectedDiff = "easy";
let bestScore = parseInt(localStorage.getItem("geodrop_best") || "0");

// ── Difficulty buttons ──────────────────────────────────────
document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDiff = btn.dataset.diff;
  });
});

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("menuBtn").addEventListener("click", showMenu);

// ── Keyboard ────────────────────────────────────────────────
const keys = {};
window.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (["ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
});
window.addEventListener("keyup",  e => { keys[e.key] = false; });

// ── Mobile controls ─────────────────────────────────────────
const leftBtn  = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
leftBtn.addEventListener("pointerdown",  () => { keys["ArrowLeft"]  = true;  });
leftBtn.addEventListener("pointerup",    () => { keys["ArrowLeft"]  = false; });
leftBtn.addEventListener("pointerleave", () => { keys["ArrowLeft"]  = false; });
rightBtn.addEventListener("pointerdown", () => { keys["ArrowRight"] = true;  });
rightBtn.addEventListener("pointerup",   () => { keys["ArrowRight"] = false; });
rightBtn.addEventListener("pointerleave",() => { keys["ArrowRight"] = false; });

// ════════════════════════════════════════════════════════════
//  CANVAS RESIZE
// ════════════════════════════════════════════════════════════
function resizeCanvas() {
  const area = document.getElementById("gameArea");
  const maxW  = Math.min(area.clientWidth  - 20, 760);
  const maxH  = area.clientHeight - 10;
  canvas.width  = maxW;
  canvas.height = maxH;
}
window.addEventListener("resize", () => {
  resizeCanvas();
  if (state.running) repositionBasket();
});

function repositionBasket() {
  if (!state.basket) return;
  state.basket.x = Math.max(state.basket.w / 2,
    Math.min(canvas.width - state.basket.w / 2, state.basket.x));
  state.basket.y = canvas.height - state.basket.h - 12;
}

// ════════════════════════════════════════════════════════════
//  SCREENS
// ════════════════════════════════════════════════════════════
function showScreen(id) {
  [startScreen, gameScreen, gameOverScreen].forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function showMenu() { showScreen("startScreen"); }

// ════════════════════════════════════════════════════════════
//  START GAME
// ════════════════════════════════════════════════════════════
function startGame() {
  if (animId) cancelAnimationFrame(animId);
  showScreen("gameScreen");
  resizeCanvas();

  const diff = DIFFICULTY[selectedDiff];

  // Pick a random starting question
  const qi = pickQuestion();

  state = {
    running:      true,
    score:        0,
    level:        1,
    lives:        diff.lives,
    maxLives:     diff.lives,
    diff:         selectedDiff,
    diffCfg:      { ...diff },
    questionIdx:  qi,
    country:      COUNTRIES[qi].country,
    capital:      COUNTRIES[qi].capital,
    capsules:     [],
    particles:    [],
    spawnTimer:   diff.spawnInterval,   // trigger first wave immediately
    spawnInterval: diff.spawnInterval,
    correctCount: 0,         // correct catches this level
    nextLevel:    8,         // catches needed to level-up
    basket: {
      x: canvas.width / 2,
      y: canvas.height - 52,
      w: 130,
      h: 44,
      speed: 7,
    },
    shake:    0,
    flashMsg: null,
  };

  updateHUD();
  lastTime = performance.now();
  animId = requestAnimationFrame(loop);
}

// ════════════════════════════════════════════════════════════
//  MAIN LOOP
// ════════════════════════════════════════════════════════════
let lastTime = 0;
function loop(now) {
  if (!state.running) return;
  const dt = Math.min(now - lastTime, 50);  // cap at 50 ms
  lastTime = now;

  update(dt);
  draw();

  animId = requestAnimationFrame(loop);
}

// ════════════════════════════════════════════════════════════
//  UPDATE
// ════════════════════════════════════════════════════════════
function update(dt) {
  const { basket, diffCfg } = state;

  // Move basket
  if (keys["ArrowLeft"])  basket.x -= basket.speed;
  if (keys["ArrowRight"]) basket.x += basket.speed;
  basket.x = Math.max(basket.w / 2, Math.min(canvas.width - basket.w / 2, basket.x));

  // Shake decay
  if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 0.12);

  // Spawn capsules
  state.spawnTimer += dt;
  if (state.spawnTimer >= state.spawnInterval) {
    state.spawnTimer = 0;   // reset — never goes negative
    spawnWave();
  }

  // Move capsules
  const speed = diffCfg.dropSpeed * (1 + (state.level - 1) * 0.18);

  for (let i = state.capsules.length - 1; i >= 0; i--) {
    const cap = state.capsules[i];
    cap.y += speed * (dt / 16);
    cap.wobble = (cap.wobble || 0) + 0.05;
    cap.x += Math.sin(cap.wobble) * 0.4;

    // Caught by basket
    if (
      cap.y + cap.h / 2 >= basket.y &&
      cap.y - cap.h / 2 <= basket.y + basket.h &&
      cap.x + cap.w / 2 >= basket.x - basket.w / 2 &&
      cap.x - cap.w / 2 <= basket.x + basket.w / 2
    ) {
      catchCapsule(cap, i);
      continue;
    }

    // Missed (gone past bottom)
    if (cap.y - cap.h / 2 > canvas.height + 10) {
      if (cap.isCorrect && state.lives > 0) {
        // Only penalise once per wave by advancing to next question too
        loseLife("Missed the capital! 💨");
        state.capsules = [];   // clear the whole wave, avoid double-penalty
        if (state.lives > 0) nextQuestion();
        break;                 // exit the loop — capsules array was replaced
      } else {
        state.capsules.splice(i, 1);
      }
    }
  }

  // Update particles
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += 0.15;
    p.life -= dt * 0.02;
    if (p.life <= 0) state.particles.splice(i, 1);
  }

  // Flash message timer
  if (state.flashMsg) {
    state.flashMsg.life -= dt;
    if (state.flashMsg.life <= 0) state.flashMsg = null;
  }
}

// ════════════════════════════════════════════════════════════
//  SPAWN WAVE
// ════════════════════════════════════════════════════════════
function spawnWave() {
  const { diffCfg, capital } = state;
  const count = diffCfg.distractors + 1;

  // Build list: correct capital + random wrong ones
  const options = [capital];
  const wrongPool = COUNTRIES
    .filter(c => c.capital !== capital)
    .map(c => c.capital)
    .sort(() => Math.random() - 0.5)
    .slice(0, diffCfg.distractors);
  options.push(...wrongPool);

  // Shuffle & position without overlap
  shuffle(options);

  const margin = 60;
  const usableW = canvas.width - margin * 2;
  const positions = [];

  options.forEach((text, i) => {
    const w   = measureCapsule(text);
    const h   = 36;
    let x;
    let tries = 0;

    do {
      x = margin + Math.random() * usableW;
      tries++;
    } while (tries < 30 && positions.some(p => Math.abs(p - x) < w + 14));

    positions.push(x);

    state.capsules.push({
      text,
      isCorrect: text === capital,
      x,
      y: -h / 2 - i * 30,   // stagger start heights
      w,
      h,
      color: CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)],
      wobble: Math.random() * Math.PI * 2,
    });
  });
}

function measureCapsule(text) {
  ctx.font = "bold 14px 'Segoe UI', sans-serif";
  return ctx.measureText(text).width + 28;
}

// ════════════════════════════════════════════════════════════
//  CATCH / MISS LOGIC
// ════════════════════════════════════════════════════════════
function catchCapsule(cap, idx) {
  state.capsules.splice(idx, 1);

  if (cap.isCorrect) {
    // ✅ Correct!
    const bonus = state.level;
    state.score += 10 * bonus;
    state.correctCount++;
    spawnParticles(cap.x, cap.y, cap.color, 22, true);
    showFlash("✅ Correct! +" + (10 * bonus), "#4ecca3");

    // Clear remaining capsules
    state.capsules = [];

    // Level-up check
    if (state.correctCount >= state.nextLevel) {
      levelUp();
    } else {
      nextQuestion();
    }
  } else {
    // ❌ Wrong capital
    spawnParticles(cap.x, cap.y, "#ff6b6b", 14, false);
    loseLife("Wrong capital! ❌");
  }

  updateHUD();
}

function loseLife(msg) {
  state.lives--;
  state.shake = 18;
  showFlash(msg, "#ff6b6b");
  updateHUD();

  if (state.lives <= 0) {
    setTimeout(endGame, 600);
  }
}

// ════════════════════════════════════════════════════════════
//  LEVEL UP / NEXT QUESTION
// ════════════════════════════════════════════════════════════
function levelUp() {
  state.level++;
  state.correctCount = 0;
  showFlash("🎉 Level " + state.level + "!", "#f7c948");

  // Tighten the spawn interval, but never go below 700 ms
  state.spawnInterval = Math.max(700, state.diffCfg.spawnInterval - (state.level - 1) * 80);

  nextQuestion();
}

function nextQuestion() {
  state.capsules = [];

  // Pick a new question (avoid repeating the same country back-to-back)
  let qi;
  do { qi = pickQuestion(); } while (qi === state.questionIdx && COUNTRIES.length > 1);
  state.questionIdx = qi;
  state.country = COUNTRIES[qi].country;
  state.capital  = COUNTRIES[qi].capital;
  countryLabel.textContent = state.country;

  // Spawn the next wave after a short fixed delay (800 ms)
  state.spawnTimer = state.spawnInterval - 800;
}

function pickQuestion() {
  return Math.floor(Math.random() * COUNTRIES.length);
}

// ════════════════════════════════════════════════════════════
//  END GAME
// ════════════════════════════════════════════════════════════
function endGame() {
  state.running = false;
  cancelAnimationFrame(animId);

  if (state.score > bestScore) {
    bestScore = state.score;
    localStorage.setItem("geodrop_best", bestScore);
  }

  finalScoreEl.textContent = state.score;
  bestScoreEl.textContent  = bestScore;
  finalLevelEl.textContent = state.level;

  const messages = [
    "Keep exploring the globe! 🌍",
    "Geography superstar in training! ⭐",
    "Nice try! Can you do better? 🗺️",
    "The world awaits — try again! 🌐",
  ];
  finalMessageEl.textContent = state.score >= 100
    ? "Amazing! You're a geography legend! 🏆"
    : messages[Math.floor(Math.random() * messages.length)];

  showScreen("gameOverScreen");
}

// ════════════════════════════════════════════════════════════
//  HUD UPDATE
// ════════════════════════════════════════════════════════════
function updateHUD() {
  scoreEl.textContent  = state.score;
  levelEl.textContent  = state.level;
  countryLabel.textContent = state.country;
  const hearts = "❤️".repeat(state.lives) + "🖤".repeat(Math.max(0, state.maxLives - state.lives));
  livesDisplay.textContent = hearts;
}

// ════════════════════════════════════════════════════════════
//  PARTICLES
// ════════════════════════════════════════════════════════════
function spawnParticles(x, y, color, count, burst) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const speed = burst ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5;
    state.particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (burst ? 2 : 1),
      color,
      size: 4 + Math.random() * 5,
      life: 1,
    });
  }
}

// ════════════════════════════════════════════════════════════
//  FLASH MESSAGE
// ════════════════════════════════════════════════════════════
function showFlash(msg, color) {
  state.flashMsg = { text: msg, color, life: 1400, maxLife: 1400 };
}

// ════════════════════════════════════════════════════════════
//  DRAW
// ════════════════════════════════════════════════════════════
function draw() {
  const W = canvas.width, H = canvas.height;

  // Shake offset
  let sx = 0, sy = 0;
  if (state.shake > 0) {
    sx = (Math.random() - 0.5) * state.shake;
    sy = (Math.random() - 0.5) * state.shake * 0.5;
  }

  ctx.save();
  ctx.translate(sx, sy);

  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#070720");
  grad.addColorStop(1, "#0f1040");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  drawStars(W, H);
  drawGround(W, H);
  drawCapsules();
  drawParticles();
  drawBasket();
  drawFlash(W, H);

  ctx.restore();
}

// ── Stars ──────────────────────────────────────────────────
let starCache = null;
let starW = 0, starH = 0;
function drawStars(W, H) {
  if (!starCache || starW !== W || starH !== H) {
    starW = W; starH = H;
    starCache = [];
    for (let i = 0; i < 80; i++) {
      starCache.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.75,
        r: 0.5 + Math.random() * 1.2,
        a: 0.3 + Math.random() * 0.7,
      });
    }
  }
  const t = performance.now() / 1000;
  starCache.forEach(s => {
    ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(t + s.x));
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ── Ground ─────────────────────────────────────────────────
function drawGround(W, H) {
  const gh = 10;
  const gg = ctx.createLinearGradient(0, H - gh, 0, H);
  gg.addColorStop(0, "rgba(78,204,163,.5)");
  gg.addColorStop(1, "rgba(78,204,163,.1)");
  ctx.fillStyle = gg;
  ctx.fillRect(0, H - gh, W, gh);
}

// ── Capsules ───────────────────────────────────────────────
function drawCapsules() {
  state.capsules.forEach(cap => {
    const { x, y, w, h, text, color } = cap;
    const r = h / 2;

    // Shadow
    ctx.shadowColor = color;
    ctx.shadowBlur  = 14;

    // Pill shape
    ctx.beginPath();
    ctx.moveTo(x - w / 2 + r, y - h / 2);
    ctx.lineTo(x + w / 2 - r, y - h / 2);
    ctx.arc(x + w / 2 - r, y, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x - w / 2 + r, y + h / 2);
    ctx.arc(x - w / 2 + r, y, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();

    // Gradient fill
    const cg = ctx.createLinearGradient(x, y - h / 2, x, y + h / 2);
    cg.addColorStop(0, lighten(color, 40));
    cg.addColorStop(1, color);
    ctx.fillStyle = cg;
    ctx.fill();

    // Shine
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.15, w * 0.35, h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 13px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur  = 4;
    ctx.fillText(text, x, y);
    ctx.shadowBlur = 0;
  });
}

// ── Particles ──────────────────────────────────────────────
function drawParticles() {
  state.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ── Basket ─────────────────────────────────────────────────
function drawBasket() {
  const { x, y, w, h } = state.basket;
  const r = 8;

  // Glow
  ctx.shadowColor = "#4ecca3";
  ctx.shadowBlur  = 20;

  // Basket body
  const bg = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + h);
  bg.addColorStop(0, "rgba(78,204,163,0.35)");
  bg.addColorStop(1, "rgba(78,204,163,0.15)");

  ctx.beginPath();
  ctx.moveTo(x - w / 2 + r, y);
  ctx.lineTo(x + w / 2 - r, y);
  ctx.quadraticCurveTo(x + w / 2, y, x + w / 2, y + r);
  ctx.lineTo(x + w / 2, y + h - r);
  ctx.quadraticCurveTo(x + w / 2, y + h, x + w / 2 - r, y + h);
  ctx.lineTo(x - w / 2 + r, y + h);
  ctx.quadraticCurveTo(x - w / 2, y + h, x - w / 2, y + h - r);
  ctx.lineTo(x - w / 2, y + r);
  ctx.quadraticCurveTo(x - w / 2, y, x - w / 2 + r, y);
  ctx.closePath();

  ctx.fillStyle   = bg;
  ctx.fill();
  ctx.strokeStyle = "rgba(78,204,163,0.9)";
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Basket weave lines
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(78,204,163,0.25)";
  ctx.lineWidth   = 1;
  for (let lx = x - w / 2 + 18; lx < x + w / 2 - 10; lx += 18) {
    ctx.beginPath();
    ctx.moveTo(lx, y + 4);
    ctx.lineTo(lx, y + h - 4);
    ctx.stroke();
  }

  // Country name inside basket
  ctx.fillStyle    = "#fff";
  ctx.font         = "bold 12px 'Segoe UI', sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = "rgba(0,0,0,0.6)";
  ctx.shadowBlur   = 4;

  // Truncate if too long
  let label = state.country;
  ctx.font = "bold 12px 'Segoe UI', sans-serif";
  while (ctx.measureText(label).width > w - 14 && label.length > 4) {
    label = label.slice(0, -1);
  }
  if (label !== state.country) label += "…";
  ctx.fillText(label, x, y + h / 2);
  ctx.shadowBlur = 0;
}

// ── Flash message ──────────────────────────────────────────
function drawFlash(W, H) {
  if (!state.flashMsg) return;
  const { text, color, life, maxLife } = state.flashMsg;
  const progress = life / maxLife;
  const alpha    = progress < 0.3 ? progress / 0.3 : 1;

  ctx.globalAlpha = alpha;
  ctx.font = "bold 26px 'Segoe UI', sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = color;
  ctx.shadowBlur   = 20;
  ctx.fillStyle    = color;

  const yOff = H * 0.35 - (1 - progress) * 30;
  ctx.fillText(text, W / 2, yOff);
  ctx.shadowBlur  = 0;
  ctx.globalAlpha = 1;
}

// ════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace("#",""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
  const b = Math.min(255, (num & 0x0000FF) + amount);
  return `rgb(${r},${g},${b})`;
}
