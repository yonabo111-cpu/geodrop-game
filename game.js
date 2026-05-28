// ═══════════════════════════════════════════════════════════
//  GEO DROP  –  game.js
// ═══════════════════════════════════════════════════════════

// ── Country / Capital data ──────────────────────────────────
const COUNTRIES = [
  { country: "France",         capital: "Paris" },
  { country: "Germany",        capital: "Berlin" },
  { country: "Italy",          capital: "Rome" },
  { country: "Spain",          capital: "Madrid" },
  { country: "Portugal",       capital: "Lisbon" },
  { country: "Japan",          capital: "Tokyo" },
  { country: "China",          capital: "Beijing" },
  { country: "India",          capital: "New Delhi" },
  { country: "Brazil",         capital: "Brasília" },
  { country: "Argentina",      capital: "Buenos Aires" },
  { country: "Australia",      capital: "Canberra" },
  { country: "Canada",         capital: "Ottawa" },
  { country: "Mexico",         capital: "Mexico City" },
  { country: "Russia",         capital: "Moscow" },
  { country: "Egypt",          capital: "Cairo" },
  { country: "Nigeria",        capital: "Abuja" },
  { country: "South Africa",   capital: "Pretoria" },
  { country: "Kenya",          capital: "Nairobi" },
  { country: "Turkey",         capital: "Ankara" },
  { country: "Greece",         capital: "Athens" },
  { country: "Sweden",         capital: "Stockholm" },
  { country: "Norway",         capital: "Oslo" },
  { country: "Denmark",        capital: "Copenhagen" },
  { country: "Netherlands",    capital: "Amsterdam" },
  { country: "Belgium",        capital: "Brussels" },
  { country: "Switzerland",    capital: "Bern" },
  { country: "Austria",        capital: "Vienna" },
  { country: "Poland",         capital: "Warsaw" },
  { country: "Ukraine",        capital: "Kyiv" },
  { country: "USA",            capital: "Washington D.C." },
  { country: "South Korea",    capital: "Seoul" },
  { country: "Thailand",       capital: "Bangkok" },
  { country: "Vietnam",        capital: "Hanoi" },
  { country: "Indonesia",      capital: "Jakarta" },
  { country: "Malaysia",       capital: "Kuala Lumpur" },
  { country: "Philippines",    capital: "Manila" },
  { country: "Pakistan",       capital: "Islamabad" },
  { country: "Bangladesh",     capital: "Dhaka" },
  { country: "Saudi Arabia",   capital: "Riyadh" },
  { country: "Iran",           capital: "Tehran" },
  { country: "Iraq",           capital: "Baghdad" },
  { country: "Israel",         capital: "Jerusalem" },
  { country: "Jordan",         capital: "Amman" },
  { country: "Morocco",        capital: "Rabat" },
  { country: "Algeria",        capital: "Algiers" },
  { country: "Ethiopia",       capital: "Addis Ababa" },
  { country: "Ghana",          capital: "Accra" },
  { country: "Cuba",           capital: "Havana" },
  { country: "Peru",           capital: "Lima" },
  { country: "Colombia",       capital: "Bogotá" },
  { country: "Chile",          capital: "Santiago" },
  { country: "Venezuela",      capital: "Caracas" },
  { country: "Romania",        capital: "Bucharest" },
  { country: "Hungary",        capital: "Budapest" },
  { country: "Czech Republic", capital: "Prague" },
  { country: "Finland",        capital: "Helsinki" },
  { country: "New Zealand",    capital: "Wellington" },
  { country: "Singapore",      capital: "Singapore" },
  { country: "UAE",            capital: "Abu Dhabi" },
  { country: "Qatar",          capital: "Doha" },
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

// ── Mode colours (basket glow / stroke) ─────────────────────
const MODE_STYLE = {
  capitalMode: { rgb: "78,204,163",  hex: "#4ecca3" },   // teal
  countryMode:  { rgb: "162,155,254", hex: "#a29bfe" },  // purple
};

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
const modeBadgeEl    = document.getElementById("modeBadge");
const finalScoreEl   = document.getElementById("finalScore");
const bestScoreEl    = document.getElementById("bestScore");
const finalLevelEl   = document.getElementById("finalLevel");
const finalModeEl    = document.getElementById("finalMode");
const finalMessageEl = document.getElementById("finalMessage");

// ── State ───────────────────────────────────────────────────
let state        = {};
let animId       = null;
let selectedDiff = "easy";
let selectedMode = "capitalMode";   // "capitalMode" | "countryMode"
let bestScore    = parseInt(localStorage.getItem("geodrop_best") || "0");

// ── Mode buttons ────────────────────────────────────────────
const HOW_TO = {
  capitalMode: [
    "🧺 The basket shows a <strong>country name</strong>",
    "💧 Capitals rain down from the top",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or tap buttons",
    "✅ Catch the <strong>correct capital</strong> for points",
    "❌ Wrong answers cost you a life",
  ],
  countryMode: [
    "🗺️ The basket shows a <strong>capital city</strong>",
    "💧 Country names rain down from the top",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or tap buttons",
    "✅ Catch the <strong>correct country</strong> for points",
    "❌ Wrong answers cost you a life",
  ],
};

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMode = btn.dataset.mode;
    updateHowTo();
  });
});

function updateHowTo() {
  const list = document.getElementById("howToList");
  list.innerHTML = HOW_TO[selectedMode]
    .map(t => `<li>${t}</li>`)
    .join("");
}

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
  if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
});
window.addEventListener("keyup", e => { keys[e.key] = false; });

// ── Mobile controls ─────────────────────────────────────────
const leftBtn  = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
leftBtn.addEventListener("pointerdown",   () => { keys["ArrowLeft"]  = true;  });
leftBtn.addEventListener("pointerup",     () => { keys["ArrowLeft"]  = false; });
leftBtn.addEventListener("pointerleave",  () => { keys["ArrowLeft"]  = false; });
rightBtn.addEventListener("pointerdown",  () => { keys["ArrowRight"] = true;  });
rightBtn.addEventListener("pointerup",    () => { keys["ArrowRight"] = false; });
rightBtn.addEventListener("pointerleave", () => { keys["ArrowRight"] = false; });

// ════════════════════════════════════════════════════════════
//  CANVAS RESIZE
// ════════════════════════════════════════════════════════════
function resizeCanvas() {
  const area = document.getElementById("gameArea");
  const maxW = Math.min(area.clientWidth - 20, 760);
  const maxH = area.clientHeight - 10;
  canvas.width  = maxW;
  canvas.height = maxH;
}
window.addEventListener("resize", () => {
  resizeCanvas();
  if (state.running) repositionBasket();
});

function repositionBasket() {
  if (!state.basket) return;
  state.basket.x = Math.max(
    state.basket.w / 2,
    Math.min(canvas.width - state.basket.w / 2, state.basket.x)
  );
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
//  MODE HELPERS
//  In capitalMode: basket = country, capsules = capitals
//  In countryMode: basket = capital,  capsules = countries
// ════════════════════════════════════════════════════════════

/** Text shown inside the basket */
function basketLabel() {
  return selectedMode === "capitalMode" ? state.country : state.capital;
}

/** The ONE correct capsule text for the current question */
function correctAnswer() {
  return selectedMode === "capitalMode" ? state.capital : state.country;
}

/** Pool of wrong answers (texts to use as distractors) */
function wrongAnswerPool(exclude) {
  if (selectedMode === "capitalMode") {
    return COUNTRIES
      .filter(c => c.capital !== exclude)
      .map(c => c.capital);
  } else {
    return COUNTRIES
      .filter(c => c.country !== exclude)
      .map(c => c.country);
  }
}

/** Friendly label for missed-capsule flash message */
function missedMsg() {
  return selectedMode === "capitalMode"
    ? "Missed the capital! 💨"
    : "Missed the country! 💨";
}

/** Friendly label for wrong-catch flash message */
function wrongCatchMsg() {
  return selectedMode === "capitalMode"
    ? "Wrong capital! ❌"
    : "Wrong country! ❌";
}

// ════════════════════════════════════════════════════════════
//  START GAME
// ════════════════════════════════════════════════════════════
function startGame() {
  if (animId) cancelAnimationFrame(animId);
  showScreen("gameScreen");
  resizeCanvas();

  const diff = DIFFICULTY[selectedDiff];
  const qi   = pickQuestion();

  state = {
    running:       true,
    score:         0,
    level:         1,
    lives:         diff.lives,
    maxLives:      diff.lives,
    diff:          selectedDiff,
    diffCfg:       { ...diff },
    mode:          selectedMode,
    questionIdx:   qi,
    country:       COUNTRIES[qi].country,
    capital:       COUNTRIES[qi].capital,
    capsules:      [],
    particles:     [],
    spawnTimer:    diff.spawnInterval,   // fire first wave immediately
    spawnInterval: diff.spawnInterval,
    correctCount:  0,
    nextLevel:     8,
    basket: {
      x: canvas.width / 2,
      y: canvas.height - 52,
      w: 140,
      h: 44,
      speed: 7,
    },
    shake:    0,
    flashMsg: null,
  };

  // update HUD badge
  updateModeBadge();
  updateHUD();
  lastTime = performance.now();
  animId   = requestAnimationFrame(loop);
}

function updateModeBadge() {
  if (state.mode === "capitalMode") {
    modeBadgeEl.textContent = "🧺 Capital Hunt";
    modeBadgeEl.classList.remove("country-mode");
  } else {
    modeBadgeEl.textContent = "🗺️ Country Hunt";
    modeBadgeEl.classList.add("country-mode");
  }
}

// ════════════════════════════════════════════════════════════
//  MAIN LOOP
// ════════════════════════════════════════════════════════════
let lastTime = 0;
function loop(now) {
  if (!state.running) return;
  const dt = Math.min(now - lastTime, 50);
  lastTime  = now;
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

  // Spawn wave
  state.spawnTimer += dt;
  if (state.spawnTimer >= state.spawnInterval) {
    state.spawnTimer = 0;
    spawnWave();
  }

  // Move capsules
  const speed = diffCfg.dropSpeed * (1 + (state.level - 1) * 0.18);

  for (let i = state.capsules.length - 1; i >= 0; i--) {
    const cap = state.capsules[i];
    cap.y      += speed * (dt / 16);
    cap.wobble  = (cap.wobble || 0) + 0.05;
    cap.x      += Math.sin(cap.wobble) * 0.4;

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
        loseLife(missedMsg());
        state.capsules = [];
        if (state.lives > 0) nextQuestion();
        break;
      } else {
        state.capsules.splice(i, 1);
      }
    }
  }

  // Particles
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p  = state.particles[i];
    p.x     += p.vx;
    p.y     += p.vy;
    p.vy    += 0.15;
    p.life  -= dt * 0.02;
    if (p.life <= 0) state.particles.splice(i, 1);
  }

  // Flash timer
  if (state.flashMsg) {
    state.flashMsg.life -= dt;
    if (state.flashMsg.life <= 0) state.flashMsg = null;
  }
}

// ════════════════════════════════════════════════════════════
//  SPAWN WAVE
// ════════════════════════════════════════════════════════════
function spawnWave() {
  const { diffCfg } = state;
  const correct     = correctAnswer();
  const pool        = wrongAnswerPool(correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, diffCfg.distractors);

  const options = shuffle([correct, ...pool]);

  const margin   = 60;
  const usableW  = canvas.width - margin * 2;
  const positions = [];

  options.forEach((text, i) => {
    const w = measureCapsule(text);
    const h = 36;
    let x, tries = 0;

    do {
      x = margin + Math.random() * usableW;
      tries++;
    } while (tries < 30 && positions.some(p => Math.abs(p - x) < w + 14));

    positions.push(x);

    state.capsules.push({
      text,
      isCorrect: text === correct,
      x,
      y: -h / 2 - i * 30,
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
    const bonus = state.level;
    state.score += 10 * bonus;
    state.correctCount++;
    spawnParticles(cap.x, cap.y, cap.color, 22, true);
    showFlash("✅ Correct! +" + (10 * bonus), "#4ecca3");
    state.capsules = [];

    if (state.correctCount >= state.nextLevel) {
      levelUp();
    } else {
      nextQuestion();
    }
  } else {
    spawnParticles(cap.x, cap.y, "#ff6b6b", 14, false);
    loseLife(wrongCatchMsg());
  }

  updateHUD();
}

function loseLife(msg) {
  state.lives--;
  state.shake = 18;
  showFlash(msg, "#ff6b6b");
  updateHUD();
  if (state.lives <= 0) setTimeout(endGame, 600);
}

// ════════════════════════════════════════════════════════════
//  LEVEL UP / NEXT QUESTION
// ════════════════════════════════════════════════════════════
function levelUp() {
  state.level++;
  state.correctCount = 0;
  showFlash("🎉 Level " + state.level + "!", "#f7c948");
  state.spawnInterval = Math.max(
    700,
    state.diffCfg.spawnInterval - (state.level - 1) * 80
  );
  nextQuestion();
}

function nextQuestion() {
  state.capsules = [];

  let qi;
  do { qi = pickQuestion(); }
  while (qi === state.questionIdx && COUNTRIES.length > 1);

  state.questionIdx = qi;
  state.country     = COUNTRIES[qi].country;
  state.capital     = COUNTRIES[qi].capital;

  updateHUD();

  // 800 ms pause before next wave
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
  finalModeEl.textContent  = state.mode === "capitalMode"
    ? "🧺 Capital Hunt"
    : "🗺️ Country Hunt";

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
  scoreEl.textContent = state.score;
  levelEl.textContent = state.level;

  // The HUD label shows what the basket is looking for
  countryLabel.textContent = basketLabel();

  const hearts = "❤️".repeat(state.lives)
    + "🖤".repeat(Math.max(0, state.maxLives - state.lives));
  livesDisplay.textContent = hearts;
}

// ════════════════════════════════════════════════════════════
//  PARTICLES
// ════════════════════════════════════════════════════════════
function spawnParticles(x, y, color, count, burst) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const spd   = burst ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5;
    state.particles.push({
      x, y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - (burst ? 2 : 1),
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

  let sx = 0, sy = 0;
  if (state.shake > 0) {
    sx = (Math.random() - 0.5) * state.shake;
    sy = (Math.random() - 0.5) * state.shake * 0.5;
  }

  ctx.save();
  ctx.translate(sx, sy);

  // Background
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
let starCache = null, starW = 0, starH = 0;
function drawStars(W, H) {
  if (!starCache || starW !== W || starH !== H) {
    starW = W; starH = H; starCache = [];
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
    ctx.fillStyle   = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ── Ground ─────────────────────────────────────────────────
function drawGround(W, H) {
  const gh = 10;
  const mStyle = MODE_STYLE[state.mode];
  const gg = ctx.createLinearGradient(0, H - gh, 0, H);
  gg.addColorStop(0, `rgba(${mStyle.rgb},.5)`);
  gg.addColorStop(1, `rgba(${mStyle.rgb},.1)`);
  ctx.fillStyle = gg;
  ctx.fillRect(0, H - gh, W, gh);
}

// ── Capsules ───────────────────────────────────────────────
function drawCapsules() {
  state.capsules.forEach(cap => {
    const { x, y, w, h, text, color } = cap;
    const r = h / 2;

    ctx.shadowColor = color;
    ctx.shadowBlur  = 14;

    // Pill
    ctx.beginPath();
    ctx.moveTo(x - w / 2 + r, y - h / 2);
    ctx.lineTo(x + w / 2 - r, y - h / 2);
    ctx.arc(x + w / 2 - r, y, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x - w / 2 + r, y + h / 2);
    ctx.arc(x - w / 2 + r, y, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();

    const cg = ctx.createLinearGradient(x, y - h / 2, x, y + h / 2);
    cg.addColorStop(0, lighten(color, 40));
    cg.addColorStop(1, color);
    ctx.fillStyle = cg;
    ctx.fill();

    // Shine
    ctx.shadowBlur = 0;
    ctx.fillStyle  = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.15, w * 0.35, h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle    = "#fff";
    ctx.font         = "bold 13px 'Segoe UI', sans-serif";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor  = "rgba(0,0,0,0.5)";
    ctx.shadowBlur   = 4;
    ctx.fillText(text, x, y);
    ctx.shadowBlur   = 0;
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
  const r       = 8;
  const mStyle  = MODE_STYLE[state.mode];

  // Glow
  ctx.shadowColor = mStyle.hex;
  ctx.shadowBlur  = 22;

  // Body gradient
  const bg = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + h);
  bg.addColorStop(0, `rgba(${mStyle.rgb},0.38)`);
  bg.addColorStop(1, `rgba(${mStyle.rgb},0.15)`);

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
  ctx.strokeStyle = mStyle.hex;
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Weave lines
  ctx.shadowBlur  = 0;
  ctx.strokeStyle = `rgba(${mStyle.rgb},0.25)`;
  ctx.lineWidth   = 1;
  for (let lx = x - w / 2 + 18; lx < x + w / 2 - 10; lx += 18) {
    ctx.beginPath();
    ctx.moveTo(lx, y + 4);
    ctx.lineTo(lx, y + h - 4);
    ctx.stroke();
  }

  // Label inside basket — shows country (capitalMode) or capital (countryMode)
  const label = truncateLabel(basketLabel(), w - 14);
  ctx.fillStyle    = "#fff";
  ctx.font         = "bold 12px 'Segoe UI', sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = "rgba(0,0,0,0.6)";
  ctx.shadowBlur   = 4;
  ctx.fillText(label, x, y + h / 2);
  ctx.shadowBlur   = 0;
}

function truncateLabel(text, maxWidth) {
  ctx.font = "bold 12px 'Segoe UI', sans-serif";
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 4 && ctx.measureText(t + "…").width > maxWidth) {
    t = t.slice(0, -1);
  }
  return t + "…";
}

// ── Flash message ──────────────────────────────────────────
function drawFlash(W, H) {
  if (!state.flashMsg) return;
  const { text, color, life, maxLife } = state.flashMsg;
  const progress = life / maxLife;
  const alpha    = progress < 0.3 ? progress / 0.3 : 1;

  ctx.globalAlpha  = alpha;
  ctx.font         = "bold 26px 'Segoe UI', sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = color;
  ctx.shadowBlur   = 20;
  ctx.fillStyle    = color;
  ctx.fillText(text, W / 2, H * 0.35 - (1 - progress) * 30);
  ctx.shadowBlur   = 0;
  ctx.globalAlpha  = 1;
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
  const num = parseInt(hex.replace("#", ""), 16);
  const r   = Math.min(255, (num >> 16) + amount);
  const g   = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b   = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}
