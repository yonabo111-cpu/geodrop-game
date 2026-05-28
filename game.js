// ═══════════════════════════════════════════════════════════
//  GEO DROP  –  game.js
// ═══════════════════════════════════════════════════════════

// ── Country / Capital data ──────────────────────────────────
const COUNTRIES = [
  // Europe
  { country: "France",         capital: "Paris",          flag: "🇫🇷", continent: "Europe" },
  { country: "Germany",        capital: "Berlin",         flag: "🇩🇪", continent: "Europe" },
  { country: "Italy",          capital: "Rome",           flag: "🇮🇹", continent: "Europe" },
  { country: "Spain",          capital: "Madrid",         flag: "🇪🇸", continent: "Europe" },
  { country: "Portugal",       capital: "Lisbon",         flag: "🇵🇹", continent: "Europe" },
  { country: "Greece",         capital: "Athens",         flag: "🇬🇷", continent: "Europe" },
  { country: "Sweden",         capital: "Stockholm",      flag: "🇸🇪", continent: "Europe" },
  { country: "Norway",         capital: "Oslo",           flag: "🇳🇴", continent: "Europe" },
  { country: "Denmark",        capital: "Copenhagen",     flag: "🇩🇰", continent: "Europe" },
  { country: "Netherlands",    capital: "Amsterdam",      flag: "🇳🇱", continent: "Europe" },
  { country: "Belgium",        capital: "Brussels",       flag: "🇧🇪", continent: "Europe" },
  { country: "Switzerland",    capital: "Bern",           flag: "🇨🇭", continent: "Europe" },
  { country: "Austria",        capital: "Vienna",         flag: "🇦🇹", continent: "Europe" },
  { country: "Poland",         capital: "Warsaw",         flag: "🇵🇱", continent: "Europe" },
  { country: "Ukraine",        capital: "Kyiv",           flag: "🇺🇦", continent: "Europe" },
  { country: "Romania",        capital: "Bucharest",      flag: "🇷🇴", continent: "Europe" },
  { country: "Hungary",        capital: "Budapest",       flag: "🇭🇺", continent: "Europe" },
  { country: "Czech Republic", capital: "Prague",         flag: "🇨🇿", continent: "Europe" },
  { country: "Finland",        capital: "Helsinki",       flag: "🇫🇮", continent: "Europe" },
  { country: "Russia",         capital: "Moscow",         flag: "🇷🇺", continent: "Europe" },
  // Asia
  { country: "Japan",          capital: "Tokyo",          flag: "🇯🇵", continent: "Asia" },
  { country: "China",          capital: "Beijing",        flag: "🇨🇳", continent: "Asia" },
  { country: "India",          capital: "New Delhi",      flag: "🇮🇳", continent: "Asia" },
  { country: "South Korea",    capital: "Seoul",          flag: "🇰🇷", continent: "Asia" },
  { country: "Thailand",       capital: "Bangkok",        flag: "🇹🇭", continent: "Asia" },
  { country: "Vietnam",        capital: "Hanoi",          flag: "🇻🇳", continent: "Asia" },
  { country: "Indonesia",      capital: "Jakarta",        flag: "🇮🇩", continent: "Asia" },
  { country: "Malaysia",       capital: "Kuala Lumpur",   flag: "🇲🇾", continent: "Asia" },
  { country: "Philippines",    capital: "Manila",         flag: "🇵🇭", continent: "Asia" },
  { country: "Pakistan",       capital: "Islamabad",      flag: "🇵🇰", continent: "Asia" },
  { country: "Bangladesh",     capital: "Dhaka",          flag: "🇧🇩", continent: "Asia" },
  { country: "Singapore",      capital: "Singapore",      flag: "🇸🇬", continent: "Asia" },
  // Africa
  { country: "Egypt",          capital: "Cairo",          flag: "🇪🇬", continent: "Africa" },
  { country: "Nigeria",        capital: "Abuja",          flag: "🇳🇬", continent: "Africa" },
  { country: "South Africa",   capital: "Pretoria",       flag: "🇿🇦", continent: "Africa" },
  { country: "Kenya",          capital: "Nairobi",        flag: "🇰🇪", continent: "Africa" },
  { country: "Morocco",        capital: "Rabat",          flag: "🇲🇦", continent: "Africa" },
  { country: "Algeria",        capital: "Algiers",        flag: "🇩🇿", continent: "Africa" },
  { country: "Ethiopia",       capital: "Addis Ababa",    flag: "🇪🇹", continent: "Africa" },
  { country: "Ghana",          capital: "Accra",          flag: "🇬🇭", continent: "Africa" },
  // Americas
  { country: "USA",            capital: "Washington D.C.", flag: "🇺🇸", continent: "Americas" },
  { country: "Canada",         capital: "Ottawa",         flag: "🇨🇦", continent: "Americas" },
  { country: "Mexico",         capital: "Mexico City",    flag: "🇲🇽", continent: "Americas" },
  { country: "Brazil",         capital: "Brasília",       flag: "🇧🇷", continent: "Americas" },
  { country: "Argentina",      capital: "Buenos Aires",   flag: "🇦🇷", continent: "Americas" },
  { country: "Cuba",           capital: "Havana",         flag: "🇨🇺", continent: "Americas" },
  { country: "Peru",           capital: "Lima",           flag: "🇵🇪", continent: "Americas" },
  { country: "Colombia",       capital: "Bogotá",         flag: "🇨🇴", continent: "Americas" },
  { country: "Chile",          capital: "Santiago",       flag: "🇨🇱", continent: "Americas" },
  { country: "Venezuela",      capital: "Caracas",        flag: "🇻🇪", continent: "Americas" },
  // Oceania
  { country: "Australia",      capital: "Canberra",       flag: "🇦🇺", continent: "Oceania" },
  { country: "New Zealand",    capital: "Wellington",     flag: "🇳🇿", continent: "Oceania" },
  // Middle East
  { country: "Turkey",         capital: "Ankara",         flag: "🇹🇷", continent: "Middle East" },
  { country: "Saudi Arabia",   capital: "Riyadh",         flag: "🇸🇦", continent: "Middle East" },
  { country: "Iran",           capital: "Tehran",         flag: "🇮🇷", continent: "Middle East" },
  { country: "Iraq",           capital: "Baghdad",        flag: "🇮🇶", continent: "Middle East" },
  { country: "Israel",         capital: "Jerusalem",      flag: "🇮🇱", continent: "Middle East" },
  { country: "Jordan",         capital: "Amman",          flag: "🇯🇴", continent: "Middle East" },
  { country: "UAE",            capital: "Abu Dhabi",      flag: "🇦🇪", continent: "Middle East" },
  { country: "Qatar",          capital: "Doha",           flag: "🇶🇦", continent: "Middle East" },
];

// ── Difficulty settings ─────────────────────────────────────
const DIFFICULTY = {
  easy:   { dropSpeed: 1.5, dropInterval: 1800, distractors: 1, lives: 5 },
  medium: { dropSpeed: 2.0, dropInterval: 1400, distractors: 2, lives: 3 },
  hard:   { dropSpeed: 2.8, dropInterval: 1000, distractors: 2, lives: 2 },
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
  marathon:     { rgb: "247,201,72",  hex: "#f7c948" },  // gold
};

// ── Basket Skins ─────────────────────────────────────────────
const SKINS = [
  { id: "classic",   name: "Classic",   threshold: 0,   icon: "🧺", rgb: null,           hex: null },
  { id: "fire",      name: "Inferno",   threshold: 50,  icon: "🔥", rgb: "255,107,107",  hex: "#ff6b6b" },
  { id: "galaxy",    name: "Galaxy",    threshold: 150, icon: "🌌", rgb: "126,130,255",  hex: "#7e82ff" },
  { id: "gold",      name: "Golden",    threshold: 300, icon: "✨", rgb: "247,201,72",   hex: "#f7c948" },
  { id: "neon",      name: "Neon",      threshold: 500, icon: "⚡", rgb: "85,239,196",   hex: "#55efc4" },
];

// ── DOM refs ────────────────────────────────────────────────
const startScreen    = document.getElementById("startScreen");
const gameScreen     = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const learnScreen    = document.getElementById("learnScreen");
const canvas         = document.getElementById("gameCanvas");
const ctx            = canvas.getContext("2d");
const scoreEl        = document.getElementById("score");
const levelEl        = document.getElementById("level");
const countryLabel   = document.getElementById("countryLabel");
const livesDisplay   = document.getElementById("livesDisplay");
const modeBadgeEl    = document.getElementById("modeBadge");
const streakDisplay  = document.getElementById("streakDisplay");
const pauseOverlay   = document.getElementById("pauseOverlay");
const finalScoreEl   = document.getElementById("finalScore");
const bestScoreEl    = document.getElementById("bestScore");
const finalLevelEl   = document.getElementById("finalLevel");
const finalModeEl    = document.getElementById("finalMode");
const finalMessageEl = document.getElementById("finalMessage");

// ── Background Music ─────────────────────────────────────────
const bgMusic      = document.getElementById("bgMusic");
const musicToggle  = document.getElementById("musicToggle");
let   musicMuted   = localStorage.getItem("geodrop_muted") === "true";
let   musicStarted = false;

bgMusic.volume = 0.45;

function applyMuteState() {
  bgMusic.muted           = musicMuted;
  musicToggle.textContent = musicMuted ? "🔇" : "🔊";
  musicToggle.classList.toggle("muted", musicMuted);
}

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  bgMusic.play().catch(() => { musicStarted = false; });
}

musicToggle.addEventListener("click", () => {
  musicMuted = !musicMuted;
  localStorage.setItem("geodrop_muted", musicMuted);
  applyMuteState();
  if (!musicMuted) startMusic();
});

applyMuteState();

// ── Pause button wiring ─────────────────────────────────────
document.getElementById("pauseBtn").addEventListener("click", togglePause);
document.getElementById("resumeBtn").addEventListener("click", togglePause);
document.getElementById("pauseMenuBtn").addEventListener("click", () => {
  if (state.paused) togglePause();
  showMenu();
});

// ── State ───────────────────────────────────────────────────
let state          = {};
let animId         = null;
let selectedDiff   = "easy";
let selectedMode   = "capitalMode";   // "capitalMode" | "countryMode" | "marathon"
let selectedRegion = "all";           // "all" | continent name
let selectedSkin   = localStorage.getItem("geodrop_skin") || "classic";
let bestScore      = parseInt(localStorage.getItem("geodrop_best") || "0");

// ── Leaderboard helpers ──────────────────────────────────────
function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem("geodrop_leaderboard") || "[]");
  } catch (e) { return []; }
}
function saveToLeaderboard(name, score, mode, level) {
  const lb = getLeaderboard();
  lb.push({ name: name.trim().slice(0, 20) || "Anonymous", score, mode, level, date: new Date().toLocaleDateString() });
  lb.sort((a, b) => b.score - a.score);
  lb.splice(5); // keep top 5
  localStorage.setItem("geodrop_leaderboard", JSON.stringify(lb));
}

// ── Mode buttons ─────────────────────────────────────────────
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
  marathon: [
    "🔁 Questions <strong>alternate</strong> between Capital Hunt and Country Hunt",
    "💧 Capitals AND country names rain down",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or tap buttons",
    "✅ Catch whichever the <strong>badge tells you</strong>",
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
  const key  = HOW_TO[selectedMode] ? selectedMode : "capitalMode";
  list.innerHTML = HOW_TO[key].map(t => `<li>${t}</li>`).join("");
}

// ── Region buttons ───────────────────────────────────────────
document.querySelectorAll(".region-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRegion = btn.dataset.region;
  });
});

// ── Difficulty buttons ──────────────────────────────────────
document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDiff = btn.dataset.diff;
  });
});

// ── Skin selector ───────────────────────────────────────────
function buildSkinSelector() {
  const container = document.getElementById("skinBtns");
  if (!container) return;
  const unlockedScore = bestScore;
  container.innerHTML = "";
  SKINS.forEach(skin => {
    const unlocked = unlockedScore >= skin.threshold;
    const btn = document.createElement("button");
    btn.className  = "skin-btn" + (selectedSkin === skin.id ? " active" : "") + (unlocked ? "" : " locked");
    btn.dataset.skin = skin.id;
    btn.title      = unlocked ? skin.name : `Unlock at ${skin.threshold} pts`;
    btn.innerHTML  = `<span class="skin-icon">${skin.icon}</span><span class="skin-name">${skin.name}</span>`
      + (unlocked ? "" : `<span class="skin-lock">🔒${skin.threshold}</span>`);
    if (unlocked) {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".skin-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSkin = skin.id;
        localStorage.setItem("geodrop_skin", skin.id);
      });
    }
    container.appendChild(btn);
  });
}

// ── Leaderboard display ─────────────────────────────────────
function buildLeaderboardDisplay() {
  const lb   = getLeaderboard();
  const html = lb.length === 0
    ? `<div class="lb-empty">No scores yet — play your first game!</div>`
    : lb.map((entry, i) => `
    <div class="lb-row ${i === 0 ? 'lb-gold' : i === 1 ? 'lb-silver' : i === 2 ? 'lb-bronze' : ''}">
      <span class="lb-rank">${["🥇","🥈","🥉","4","5"][i]}</span>
      <span class="lb-name">${escapeHtml(entry.name)}</span>
      <span class="lb-score">${entry.score} pts</span>
      <span class="lb-meta">Lv.${entry.level} · ${entry.date}</span>
    </div>
  `).join("");
  // Update both the preview (game-over) and the full leaderboard screen
  const preview = document.getElementById("leaderboardListPreview");
  const full    = document.getElementById("leaderboardListFull");
  if (preview) preview.innerHTML = html;
  if (full)    full.innerHTML    = html;
}

function escapeHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ── Button wire-ups ─────────────────────────────────────────
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("menuBtn").addEventListener("click", showMenu);
document.getElementById("learnBtn").addEventListener("click", showLearnScreen);
document.getElementById("learnBackBtn").addEventListener("click", showMenu);
document.getElementById("leaderboardBtn").addEventListener("click", () => {
  buildLeaderboardDisplay();
  showScreen("leaderboardScreen");
});
document.getElementById("leaderboardBackBtn").addEventListener("click", showMenu);

// Name entry modal submit
document.getElementById("submitNameBtn").addEventListener("click", submitNameAndSave);
document.getElementById("skipNameBtn").addEventListener("click", () => {
  saveToLeaderboard("Anonymous", pendingScore.score, pendingScore.mode, pendingScore.level);
  document.getElementById("nameModal").classList.add("hidden");
  buildLeaderboardDisplay();
  showScreen("gameOverScreen");
});
document.getElementById("playerNameInput").addEventListener("keydown", e => {
  if (e.key === "Enter") submitNameAndSave();
});

let pendingScore = null;
function submitNameAndSave() {
  const name = document.getElementById("playerNameInput").value;
  saveToLeaderboard(name, pendingScore.score, pendingScore.mode, pendingScore.level);
  document.getElementById("nameModal").classList.add("hidden");
  buildLeaderboardDisplay();
  showScreen("gameOverScreen");
}

// ── Keyboard ────────────────────────────────────────────────
const keys = {};
window.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (["ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
  if (e.key === "Escape" && state.running) togglePause();
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
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function showMenu() {
  buildSkinSelector();
  buildLeaderboardDisplay();
  showScreen("startScreen");
}

// ── Learn screen ─────────────────────────────────────────────
function showLearnScreen() {
  populateLearnScreen();
  showScreen("learnScreen");
}

function populateLearnScreen() {
  const grid = document.getElementById("learnGrid");
  if (!grid) return;
  grid.innerHTML = COUNTRIES.map(c => `
    <div class="learn-card">
      <div class="learn-flag">${c.flag}</div>
      <div class="learn-country">${c.country}</div>
      <div class="learn-capital">🏛️ ${c.capital}</div>
      <div class="learn-continent">${c.continent}</div>
      <a class="learn-map-link"
         href="https://www.google.com/maps/search/${encodeURIComponent(c.country)}"
         target="_blank" rel="noopener">🗺️ View on Map</a>
    </div>
  `).join("");
}

// ── Learn search filter ───────────────────────────────────────
document.getElementById("learnSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".learn-card").forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? "" : "none";
  });
});

// ── Learn continent filter ────────────────────────────────────
document.querySelectorAll(".learn-filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".learn-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cont = btn.dataset.continent;
    document.querySelectorAll(".learn-card").forEach(card => {
      card.style.display = (cont === "all" || card.querySelector(".learn-continent").textContent === cont)
        ? "" : "none";
    });
  });
});

// ════════════════════════════════════════════════════════════
//  MODE HELPERS
// ════════════════════════════════════════════════════════════

/** Active question pool filtered by region */
function questionPool() {
  if (selectedRegion === "all") return COUNTRIES;
  const filtered = COUNTRIES.filter(c => c.continent === selectedRegion);
  return filtered.length >= 3 ? filtered : COUNTRIES; // fallback if too few
}

/** Text shown inside the basket */
function basketLabel() {
  return state.mode === "capitalMode" ? state.country : state.capital;
}

/** The ONE correct capsule text for the current question */
function correctAnswer() {
  return state.mode === "capitalMode" ? state.capital : state.country;
}

/** Flag for the current question entry */
function currentFlag() {
  const pool = questionPool();
  const entry = pool[state.questionIdx] || COUNTRIES[0];
  return entry.flag || "";
}

/** Pool of wrong answers (texts to use as distractors) */
function wrongAnswerPool(exclude) {
  const pool = questionPool();
  if (state.mode === "capitalMode") {
    return pool.filter(c => c.capital !== exclude).map(c => c.capital);
  } else {
    return pool.filter(c => c.country !== exclude).map(c => c.country);
  }
}

/** Friendly label for missed-capsule flash message */
function missedMsg() {
  return state.mode === "capitalMode" ? "Missed the capital! 💨" : "Missed the country! 💨";
}

/** Friendly label for wrong-catch flash message */
function wrongCatchMsg() {
  return state.mode === "capitalMode" ? "Wrong capital! ❌" : "Wrong country! ❌";
}

// ════════════════════════════════════════════════════════════
//  START GAME
// ════════════════════════════════════════════════════════════
function startGame() {
  if (animId) cancelAnimationFrame(animId);
  musicStarted = false;
  bgMusic.currentTime = 0;
  showScreen("gameScreen");
  resizeCanvas();

  const diff = DIFFICULTY[selectedDiff];
  // Marathon starts on capitalMode for first question
  const initialMode = selectedMode === "marathon" ? "capitalMode" : selectedMode;
  const pool = questionPool();
  const qi   = pickQuestion(pool);

  state = {
    running:       true,
    paused:        false,
    score:         0,
    level:         1,
    lives:         diff.lives,
    maxLives:      diff.lives,
    diff:          selectedDiff,
    diffCfg:       { ...diff },
    mode:          initialMode,
    isMarathon:    selectedMode === "marathon",
    questionIdx:   qi,
    country:       pool[qi].country,
    capital:       pool[qi].capital,
    flag:          pool[qi].flag,
    capsules:      [],
    particles:     [],
    dropTimer:     diff.dropInterval,
    dropInterval:  diff.dropInterval,
    dropQueue:     [],
    correctCount:  0,
    nextLevel:     8,
    streak:        0,
    speedMult:     1.0,
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

  updateModeBadge();
  updateHUD();
  startMusic();

  lastTime = performance.now();
  animId   = requestAnimationFrame(loop);
}

function updateModeBadge() {
  if (state.mode === "capitalMode") {
    modeBadgeEl.textContent = state.isMarathon ? "🔁 Capital Hunt" : "🧺 Capital Hunt";
    modeBadgeEl.classList.remove("country-mode", "marathon-mode");
    if (state.isMarathon) modeBadgeEl.classList.add("marathon-mode");
  } else {
    modeBadgeEl.textContent = state.isMarathon ? "🔁 Country Hunt" : "🗺️ Country Hunt";
    modeBadgeEl.classList.remove("marathon-mode");
    modeBadgeEl.classList.add("country-mode");
  }
}

// ════════════════════════════════════════════════════════════
//  PAUSE
// ════════════════════════════════════════════════════════════
function togglePause() {
  if (!state.running) return;
  state.paused = !state.paused;

  if (state.paused) {
    cancelAnimationFrame(animId);
    animId = null;
    pauseOverlay.classList.remove("hidden");
    if (!bgMusic.paused && !bgMusic.muted) bgMusic.volume = 0.15;
  } else {
    pauseOverlay.classList.add("hidden");
    if (!bgMusic.muted) bgMusic.volume = 0.45;
    lastTime = performance.now();
    animId = requestAnimationFrame(loop);
  }
}

// ════════════════════════════════════════════════════════════
//  MAIN LOOP
// ════════════════════════════════════════════════════════════
let lastTime = 0;
function loop(now) {
  if (!state.running || state.paused) return;
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

  if (keys["ArrowLeft"])  basket.x -= basket.speed;
  if (keys["ArrowRight"]) basket.x += basket.speed;
  basket.x = Math.max(basket.w / 2, Math.min(canvas.width - basket.w / 2, basket.x));

  if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 0.12);

  refillQueue();

  state.dropTimer += dt;
  const curInterval = Math.max(600, state.dropInterval - (state.level - 1) * 60);
  if (state.dropTimer >= curInterval && state.dropQueue.length > 0) {
    state.dropTimer = 0;
    dropOneCapsule();
  }

  const speed      = diffCfg.dropSpeed * (1 + (state.level - 1) * 0.18) * state.speedMult;
  const capSnapshot = state.capsules.slice();

  for (let i = 0; i < capSnapshot.length; i++) {
    const cap = capSnapshot[i];
    if (!state.capsules.includes(cap)) continue;

    cap.y      += speed * (dt / 16);
    cap.wobble  = (cap.wobble || 0) + 0.05;
    cap.x      += Math.sin(cap.wobble) * 0.4;

    if (
      cap.y + cap.h / 2 >= basket.y &&
      cap.y - cap.h / 2 <= basket.y + basket.h &&
      cap.x + cap.w / 2 >= basket.x - basket.w / 2 &&
      cap.x - cap.w / 2 <= basket.x + basket.w / 2
    ) {
      catchCapsule(cap);
      break;
    }

    if (cap.y - cap.h / 2 > canvas.height + 10) {
      const idx = state.capsules.indexOf(cap);
      if (idx !== -1) state.capsules.splice(idx, 1);

      if (cap.isCorrect && state.lives > 0) {
        loseLife(missedMsg());
        if (state.lives > 0) {
          state.dropQueue.unshift({ text: correctAnswer(), flag: currentFlag() });
        }
        break;
      }
    }
  }

  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p  = state.particles[i];
    p.x     += p.vx;
    p.y     += p.vy;
    p.vy    += 0.15;
    p.life  -= dt * 0.02;
    if (p.life <= 0) state.particles.splice(i, 1);
  }

  if (state.flashMsg) {
    state.flashMsg.life -= dt;
    if (state.flashMsg.life <= 0) state.flashMsg = null;
  }
}

// ════════════════════════════════════════════════════════════
//  CONTINUOUS SINGLE-DROP SYSTEM
// ════════════════════════════════════════════════════════════
function refillQueue() {
  if (state.dropQueue.length > 2) return;

  const { diffCfg } = state;
  const correct      = correctAnswer();
  const flag         = currentFlag();

  const wrongOnScreen = state.capsules.filter(c => !c.isCorrect).length;
  const wrongNeeded   = Math.max(0, diffCfg.distractors - wrongOnScreen);

  const visibleTexts = new Set(state.capsules.map(c => c.text));
  const wrongPool    = wrongAnswerPool(correct)
    .filter(t => !visibleTexts.has(t))
    .sort(() => Math.random() - 0.5)
    .slice(0, wrongNeeded);

  const correctOnScreen = state.capsules.some(c => c.isCorrect);
  const correctInQueue  = state.dropQueue.some(q => q.text === correct);

  // Build with flag info for wrong answers
  const pool = questionPool();
  const toAdd = wrongPool.map(text => {
    // Find flag for this distractor
    let f = "🌐";
    if (state.mode === "capitalMode") {
      const entry = pool.find(c => c.capital === text);
      if (entry) f = entry.flag;
    } else {
      const entry = pool.find(c => c.country === text);
      if (entry) f = entry.flag;
    }
    return { text, flag: f };
  });

  if (!correctOnScreen && !correctInQueue) {
    const pos = Math.floor(Math.random() * (toAdd.length + 1));
    toAdd.splice(pos, 0, { text: correct, flag });
  }

  state.dropQueue.push(...toAdd);
}

function dropOneCapsule() {
  if (state.dropQueue.length === 0) return;

  const item    = state.dropQueue.shift();
  const text    = item.text;
  const flag    = item.flag || "🌐";
  const correct = correctAnswer();
  const w       = measureCapsule(flag + " " + text);
  const h       = 40; // slightly taller to fit flag
  const margin  = 60;
  const usableW = canvas.width - margin * 2;

  let x, tries = 0;
  const topCaps = state.capsules.filter(c => c.y < canvas.height * 0.35);
  do {
    x = margin + Math.random() * usableW;
    tries++;
  } while (tries < 40 && topCaps.some(c => Math.abs(c.x - x) < Math.max(c.w, w) * 0.7));

  state.capsules.push({
    text,
    flag,
    isCorrect: text === correct,
    x,
    y: -h / 2,
    w,
    h,
    color:  CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
  });
}

function measureCapsule(text) {
  ctx.font = "bold 13px 'Segoe UI', sans-serif";
  return ctx.measureText(text).width + 38; // extra room for flag
}

// ════════════════════════════════════════════════════════════
//  CATCH / MISS LOGIC
// ════════════════════════════════════════════════════════════
function catchCapsule(cap) {
  const idx = state.capsules.indexOf(cap);
  if (idx !== -1) state.capsules.splice(idx, 1);

  if (cap.isCorrect) {
    const bonus = state.level;
    state.score += 10 * bonus;
    state.correctCount++;

    state.streak++;
    state.speedMult    = Math.min(2.2, 1.0 + state.streak * 0.08);
    state.dropInterval = Math.max(400,
      state.diffCfg.dropInterval - (state.level - 1) * 60 - state.streak * 80
    );

    spawnParticles(cap.x, cap.y, cap.color, 22, true);
    const streakTag = state.streak >= 2 ? ` 🔥x${state.streak}` : "";
    showFlash(`✅ +${10 * bonus}${streakTag}`, "#4ecca3");

    state.capsules = state.capsules.filter(c => !c.isCorrect);

    if (state.correctCount >= state.nextLevel) {
      levelUp();
    } else {
      nextQuestion();
    }
  } else {
    state.streak       = 0;
    state.speedMult    = 1.0;
    state.dropInterval = Math.max(400,
      state.diffCfg.dropInterval - (state.level - 1) * 60
    );
    spawnParticles(cap.x, cap.y, "#ff6b6b", 14, false);
    loseLife(wrongCatchMsg());
  }

  updateHUD();
}

function loseLife(msg) {
  state.lives--;
  state.shake        = 18;
  state.streak       = 0;
  state.speedMult    = 1.0;
  state.dropInterval = Math.max(400,
    state.diffCfg.dropInterval - (state.level - 1) * 60
  );
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
  state.dropInterval = Math.max(400,
    state.diffCfg.dropInterval - (state.level - 1) * 60 - state.streak * 80
  );
  nextQuestion();
}

function nextQuestion() {
  // Reverse Marathon: alternate mode each question
  if (state.isMarathon) {
    state.mode = state.mode === "capitalMode" ? "countryMode" : "capitalMode";
    updateModeBadge();
  }

  const pool = questionPool();
  let qi;
  do { qi = pickQuestion(pool); }
  while (qi === state.questionIdx && pool.length > 1);

  state.questionIdx = qi;
  state.country     = pool[qi].country;
  state.capital     = pool[qi].capital;
  state.flag        = pool[qi].flag;

  state.dropQueue = [];
  state.capsules  = state.capsules.filter(c => !c.isCorrect);

  updateHUD();
}

function pickQuestion(pool) {
  const p = pool || questionPool();
  return Math.floor(Math.random() * p.length);
}

// ════════════════════════════════════════════════════════════
//  END GAME
// ════════════════════════════════════════════════════════════
function fadeOutMusic(duration = 1500) {
  if (bgMusic.paused || bgMusic.muted) return;
  const startVol = bgMusic.volume;
  const steps    = 30;
  const stepTime = duration / steps;
  const dec      = startVol / steps;
  let   step     = 0;
  const iv = setInterval(() => {
    step++;
    bgMusic.volume = Math.max(0, startVol - dec * step);
    if (step >= steps) {
      clearInterval(iv);
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume      = startVol;
    }
  }, stepTime);
}

function endGame() {
  state.running = false;
  cancelAnimationFrame(animId);
  fadeOutMusic();

  if (state.score > bestScore) {
    bestScore = state.score;
    localStorage.setItem("geodrop_best", bestScore);
  }

  // Rebuild skin selector to reflect new unlocks
  buildSkinSelector();

  finalScoreEl.textContent = state.score;
  bestScoreEl.textContent  = bestScore;
  finalLevelEl.textContent = state.level;
  finalModeEl.textContent  = state.isMarathon
    ? "🔁 Reverse Marathon"
    : state.mode === "capitalMode"
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

  // Show name-entry modal before game-over screen
  pendingScore = { score: state.score, mode: finalModeEl.textContent, level: state.level };
  document.getElementById("modalScoreDisplay").textContent = `Score: ${state.score}`;
  document.getElementById("playerNameInput").value = "";
  document.getElementById("nameModal").classList.remove("hidden");
}

// ════════════════════════════════════════════════════════════
//  HUD UPDATE
// ════════════════════════════════════════════════════════════
function updateHUD() {
  scoreEl.textContent = state.score;
  levelEl.textContent = state.level;
  countryLabel.textContent = basketLabel();

  const hearts = "❤️".repeat(state.lives)
    + "🖤".repeat(Math.max(0, state.maxLives - state.lives));
  livesDisplay.textContent = hearts;

  if (state.streak >= 2) {
    streakDisplay.textContent = `🔥 x${state.streak}`;
    streakDisplay.classList.remove("hidden");
    streakDisplay.style.animation = "none";
    streakDisplay.offsetHeight;
    streakDisplay.style.animation = "";
  } else {
    streakDisplay.classList.add("hidden");
  }

  updateModeBadge();
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
  const mKey = state.isMarathon ? "marathon" : state.mode;
  const mStyle = MODE_STYLE[mKey] || MODE_STYLE.capitalMode;
  const gg = ctx.createLinearGradient(0, H - gh, 0, H);
  gg.addColorStop(0, `rgba(${mStyle.rgb},.5)`);
  gg.addColorStop(1, `rgba(${mStyle.rgb},.1)`);
  ctx.fillStyle = gg;
  ctx.fillRect(0, H - gh, W, gh);
}

// ── Capsules ───────────────────────────────────────────────
function drawCapsules() {
  state.capsules.forEach(cap => {
    const { x, y, w, h, text, flag, color } = cap;
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

    // Flag emoji above text
    ctx.shadowColor  = "rgba(0,0,0,0.5)";
    ctx.shadowBlur   = 3;
    ctx.font         = "13px 'Segoe UI', sans-serif";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "#fff";
    // Draw flag slightly above center, text below
    ctx.fillText(flag, x, y - 6);

    ctx.font         = "bold 11px 'Segoe UI', sans-serif";
    ctx.fillText(text, x, y + 9);
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
  const mKey    = state.isMarathon ? "marathon" : state.mode;
  const mStyle  = MODE_STYLE[mKey] || MODE_STYLE.capitalMode;

  // Apply skin override colours if skin is not classic
  const skin = SKINS.find(s => s.id === selectedSkin) || SKINS[0];
  const skinRgb = skin.rgb || mStyle.rgb;
  const skinHex = skin.hex || mStyle.hex;

  // Glow
  ctx.shadowColor = skinHex;
  ctx.shadowBlur  = 22;

  // Body gradient
  const bg = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + h);
  bg.addColorStop(0, `rgba(${skinRgb},0.45)`);
  bg.addColorStop(1, `rgba(${skinRgb},0.18)`);

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
  ctx.strokeStyle = skinHex;
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Weave lines
  ctx.shadowBlur  = 0;
  ctx.strokeStyle = `rgba(${skinRgb},0.25)`;
  ctx.lineWidth   = 1;
  for (let lx = x - w / 2 + 18; lx < x + w / 2 - 10; lx += 18) {
    ctx.beginPath();
    ctx.moveTo(lx, y + 4);
    ctx.lineTo(lx, y + h - 4);
    ctx.stroke();
  }

  // Skin icon on far-left of basket
  if (skin.id !== "classic") {
    ctx.font         = "14px 'Segoe UI', sans-serif";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(skin.icon, x - w / 2 + 14, y + h / 2);
  }

  // Label inside basket
  const label = truncateLabel(basketLabel(), w - (skin.id !== "classic" ? 28 : 14));
  ctx.fillStyle    = "#fff";
  ctx.font         = "bold 12px 'Segoe UI', sans-serif";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = "rgba(0,0,0,0.6)";
  ctx.shadowBlur   = 4;
  ctx.fillText(label, x + (skin.id !== "classic" ? 7 : 0), y + h / 2);
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
  const num = parseInt(hex.replace("#",""), 16);
  const r   = Math.min(255, (num >> 16) + amount);
  const g   = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b   = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}

// ── Init on load ─────────────────────────────────────────────
buildSkinSelector();
buildLeaderboardDisplay();
