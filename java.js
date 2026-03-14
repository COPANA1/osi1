// ── CONFETI DE CORAZONES AL CARGAR ──
function launchConfetti() {
  const emojis = ['❤️','🧡','💕','💗','💖','💝','🌹','✨','💘','🌸'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-heart';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const size = 14 + Math.floor(Math.random() * 18);
      const left = Math.random() * 100;
      const dur  = (2.5 + Math.random() * 2.5).toFixed(1);
      const drift = (Math.random() * 120 - 60).toFixed(0);
      el.style.cssText = `left:${left}%;font-size:${size}px;--dur:${dur}s;--drift:${drift}px;animation-delay:${(Math.random()*1.5).toFixed(1)}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (parseFloat(dur) + 2) * 1000);
    }, i * 40);
  }
}

// ── TRANSICIÓN DE ENTRADA (cortina de pétalos) ──
function playIntroTransition() {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;
  setTimeout(() => {
    overlay.classList.add('reveal');
    setTimeout(() => { overlay.style.display = 'none'; launchConfetti(); }, 1400);
  }, 600);
}

window.addEventListener('load', () => {
  playIntroTransition();
  initConstellation();
  setTimeout(() => revealConstellation(), 3500);
});

// ── ESTRELLAS ──
const starsEl = document.getElementById('stars');
const starObjects = [];
for (let i = 0; i < 130; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = (Math.random() * 2.4 + 0.4).toFixed(1);
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  s.style.cssText = `width:${size}px;height:${size}px;top:${y.toFixed(1)}%;left:${x.toFixed(1)}%;--d:${(Math.random()*3+1.5).toFixed(1)}s;animation-delay:${(Math.random()*5).toFixed(1)}s`;
  starsEl.appendChild(s);
  starObjects.push({ el: s });
}

// ── PARALLAX ESTRELLAS ──
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 2;
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  starObjects.forEach((star, i) => {
    const depth = (i % 5 + 1) * 0.8;
    star.el.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
  });
});

// ── PÉTALOS ──
const petalsEl = document.getElementById('petals');
const petalTypes = ['🌸','🌹','💮','❤️','🌺','🌷'];
for (let i = 0; i < 24; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const drift = (Math.random() * 220 - 110).toFixed(0);
  p.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;--drift:${drift}px;animation-duration:${(Math.random()*9+7).toFixed(1)}s;animation-delay:${(Math.random()*12).toFixed(1)}s;font-size:${(Math.random()*14+12).toFixed(0)}px`;
  p.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
  petalsEl.appendChild(p);
}

// ── JARDÍN + CORAZONES AL CLICK ──
const flowerTypes = ['🌸','🌹','🌺','🌷','🌼','💐'];
const heartEmojis = ['❤️','🧡','💕','💗','💖','💝','✨'];

document.addEventListener('click', (e) => {
  if (e.target.closest('button') || e.target.closest('.dot') || e.target.closest('.chat-bubble') || e.target.closest('.puzzle-piece')) return;
  const fl = document.createElement('div');
  fl.className = 'garden-flower';
  fl.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
  fl.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${20+Math.floor(Math.random()*20)}px`;
  document.body.appendChild(fl);
  setTimeout(() => fl.classList.add('grown'), 50);

  for (let i = 0; i < 5 + Math.floor(Math.random()*4); i++) {
    const el = document.createElement('div');
    el.className = 'click-heart';
    el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const angle = Math.random() * 360;
    const dist = 50 + Math.random() * 70;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist - 50;
    const dur = (0.6 + Math.random() * 0.5).toFixed(2);
    el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${14+Math.floor(Math.random()*16)}px;--dx:${dx}px;--dy:${dy}px;animation-duration:${dur}s`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
});

// ── CARRUSEL ──
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots');
const imgs = Array.from(track.querySelectorAll('img'));
const captions = [
  'Nuestro primer momento juntos 🌹',
  'Siempre te elegiría a ti 💕',
  'Mi favorita de todas las fotos 🧡',
];
const total = imgs.length;
let current = 0, autoTimer;

imgs.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => { goTo(i); resetAuto(); };
  dotsContainer.appendChild(d);
});

const captionEl = document.getElementById('caption');
function goTo(idx) {
  dotsContainer.children[current].classList.remove('active');
  current = (idx + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsContainer.children[current].classList.add('active');
  if (captionEl) {
    captionEl.style.opacity = '0';
    setTimeout(() => { captionEl.textContent = captions[current] || ''; captionEl.style.opacity = '1'; }, 300);
  }
}
document.getElementById('btnPrev').onclick = () => { goTo(current - 1); resetAuto(); };
document.getElementById('btnNext').onclick = () => { goTo(current + 1); resetAuto(); };
function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 4500);
}
resetAuto();
if (captionEl) captionEl.textContent = captions[0] || '';

// ── AUDIO + VISUALIZADOR ──
const audio = document.getElementById('myAudio');
const audioBtn = document.getElementById('audioBtn');
const audioIcon = document.getElementById('audioIcon');
const audioLabel = document.getElementById('audioLabel');
let playing = false, analyser, dataArray;
const vizCanvas = document.getElementById('vizCanvas');
const vCtx = vizCanvas ? vizCanvas.getContext('2d') : null;

function setupVisualizer() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const src = ac.createMediaElementSource(audio);
    analyser = ac.createAnalyser();
    analyser.fftSize = 64;
    src.connect(analyser);
    analyser.connect(ac.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    drawViz();
  } catch(e) {}
}

function drawViz() {
  if (!analyser || !vCtx) return;
  requestAnimationFrame(drawViz);
  analyser.getByteFrequencyData(dataArray);
  const W = vizCanvas.width, H = vizCanvas.height;
  vCtx.clearRect(0, 0, W, H);
  const bw = (W / dataArray.length) * 0.7;
  const gap = (W / dataArray.length) * 0.3;
  dataArray.forEach((val, i) => {
    const bh = (val / 255) * H;
    vCtx.fillStyle = `rgba(240,128,160,${0.5+(val/255)*0.5})`;
    vCtx.beginPath();
    vCtx.roundRect(i*(bw+gap), H-bh, bw, bh, 3);
    vCtx.fill();
  });
}

function toggleAudio() {
  if (!playing) {
    if (!analyser) setupVisualizer();
    audio.play().catch(() => {});
    playing = true;
    audioBtn.classList.add('playing');
    audioIcon.textContent = '♫';
    audioLabel.textContent = 'Pausar';
    if (vizCanvas) vizCanvas.style.opacity = '1';
    startChat();
  } else {
    audio.pause();
    playing = false;
    audioBtn.classList.remove('playing');
    audioIcon.textContent = '♪';
    audioLabel.textContent = 'Reproducir';
    if (vizCanvas) vizCanvas.style.opacity = '0';
  }
}

audio.addEventListener('ended', () => {
  playing = false;
  audioBtn.classList.remove('playing');
  audioIcon.textContent = '♪';
  audioLabel.textContent = 'Reproducir';
  if (vizCanvas) vizCanvas.style.opacity = '0';
  showEndMessage();
});

// ── CHAT TRISTE Y ROMÁNTICO (estilo WhatsApp con emojis) ──
const chatMessages = [
  { from: 'them', text: 'oye... 🥺',                                             delay: 1000 },
  { from: 'me',   text: 'qué pasó? 😟',                                          delay: 5000 },
  { from: 'them', text: 'es que a veces me da miedo... 😔💔',                    delay: 9000 },
  { from: 'me',   text: 'miedo de qué... dime 🥺',                               delay: 14000 },
  { from: 'them', text: 'de perderte. de que un día ya no estés 😢',             delay: 19000 },
  { from: 'them', text: 'siento que te quiero demasiado y eso me asusta 😭❤️',   delay: 25000 },
  { from: 'me',   text: 'oye... para. aquí estoy 🤍',                            delay: 31000 },
  { from: 'me',   text: 'no me voy a ningún lado, te lo prometo 😔💕',           delay: 36000 },
  { from: 'them', text: '¿de verdad? porque sin ti ya no sería lo mismo 😞',     delay: 42000 },
  { from: 'them', text: 'me haces tanta falta incluso cuando estás 🥹',          delay: 48000 },
  { from: 'me',   text: 'lloro con eso... 😭',                                   delay: 54000 },
  { from: 'me',   text: 'yo también te necesito. más de lo que crees 💔❤️',      delay: 59000 },
  { from: 'them', text: 'prométeme que siempre vamos a estar bien... 🙏😢',      delay: 65000 },
  { from: 'me',   text: 'te lo juro. pase lo que pase. siempre. 🌹💕',           delay: 71000 },
  { from: 'them', text: '...gracias. eres mi todo 😭❤️🌹',                       delay: 78000 },
];

const chatContainer = document.getElementById('chatContainer');
let chatStarted = false;

function startChat() {
  if (chatStarted) return;
  chatStarted = true;
  chatContainer.innerHTML = '';
  chatMessages.forEach(msg => {
    setTimeout(() => addBubble(msg), msg.delay);
  });
}

function addBubble(msg) {
  if (!chatContainer) return;
  const typing = document.createElement('div');
  typing.className = `chat-bubble ${msg.from === 'me' ? 'chat-me' : 'chat-them'} typing`;
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatContainer.appendChild(typing);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${msg.from === 'me' ? 'chat-me' : 'chat-them'}`;
    bubble.textContent = msg.text;
    bubble.style.cssText = `opacity:0;transform:${msg.from==='me'?'translateX(20px)':'translateX(-20px)'}`;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    setTimeout(() => {
      bubble.style.transition = 'all 0.35s ease';
      bubble.style.opacity = '1';
      bubble.style.transform = 'translateX(0)';
    }, 30);
  }, 1000);
}

function showEndMessage() {
  if (!chatContainer) return;
  setTimeout(() => {
    const end = document.createElement('div');
    end.className = 'chat-end-msg';
    end.innerHTML = '🎵 <em>...y aunque la canción terminó,<br>lo que siento por ti no termina nunca. 😭❤️</em>';
    chatContainer.appendChild(end);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 800);
}

// ── PUZZLE DE FOTO ──
const puzzleGrid = document.getElementById('puzzleGrid');
const puzzleOverlay = document.getElementById('puzzleOverlay');
const puzzleMsg = document.getElementById('puzzleMsg');
const COLS = 3, ROWS = 3, TOTAL = COLS * ROWS;
let pieces = [], emptyIdx = TOTAL - 1, moves = 0;

function initPuzzle() {
  if (!puzzleGrid) return;
  pieces = Array.from({ length: TOTAL }, (_, i) => i);
  // mezclar
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  emptyIdx = pieces.indexOf(TOTAL - 1);
  renderPuzzle();
}

function renderPuzzle() {
  if (!puzzleGrid) return;
  puzzleGrid.innerHTML = '';
  const W = puzzleGrid.offsetWidth || 280;
  const pieceW = Math.floor(W / COLS);
  const pieceH = pieceW;

  pieces.forEach((piece, pos) => {
    const el = document.createElement('div');
    el.className = 'puzzle-piece' + (piece === TOTAL - 1 ? ' empty' : '');
    el.style.width = pieceW + 'px';
    el.style.height = pieceH + 'px';

    if (piece !== TOTAL - 1) {
      const srcCol = piece % COLS;
      const srcRow = Math.floor(piece / COLS);
      el.style.backgroundImage = `url('imagenes/img1.jpg')`;
      el.style.backgroundSize = `${W}px ${pieceH * ROWS}px`;
      el.style.backgroundPosition = `-${srcCol * pieceW}px -${srcRow * pieceH}px`;
    }

    el.onclick = () => tryMove(pos);
    puzzleGrid.appendChild(el);
  });
}

function tryMove(pos) {
  const row = Math.floor(pos / COLS), col = pos % COLS;
  const eRow = Math.floor(emptyIdx / COLS), eCol = emptyIdx % COLS;
  const isAdjacent = (Math.abs(row - eRow) + Math.abs(col - eCol)) === 1;
  if (!isAdjacent) return;

  [pieces[pos], pieces[emptyIdx]] = [pieces[emptyIdx], pieces[pos]];
  emptyIdx = pos;
  moves++;
  document.getElementById('puzzleMoves').textContent = moves + ' movimientos';
  renderPuzzle();

  if (isSolved()) {
    setTimeout(() => {
      if (puzzleOverlay) {
        puzzleOverlay.style.display = 'flex';
        puzzleMsg.textContent = '🎉 ¡Lo lograste! ' + moves + ' movimientos 💕';
      }
    }, 300);
  }
}

function isSolved() {
  return pieces.every((p, i) => p === i);
}

window.initPuzzle = initPuzzle;
setTimeout(() => initPuzzle(), 500);

// ── CONSTELACIONES ──
const conCanvas = document.getElementById('constellationCanvas');
const conCtx = conCanvas ? conCanvas.getContext('2d') : null;
const heartPts = [
  [0.5,0.2],[0.62,0.1],[0.75,0.15],[0.8,0.28],[0.75,0.42],
  [0.5,0.65],[0.25,0.42],[0.2,0.28],[0.25,0.15],[0.38,0.1],[0.5,0.2]
];
function initConstellation() {
  if (!conCtx) return;
  const W = conCanvas.width, H = conCanvas.height;
  conCtx.clearRect(0, 0, W, H);
  heartPts.forEach(([rx,ry]) => {
    conCtx.beginPath(); conCtx.arc(rx*W, ry*H, 4, 0, Math.PI*2);
    conCtx.fillStyle = 'rgba(240,128,160,0.6)'; conCtx.fill();
    conCtx.beginPath(); conCtx.arc(rx*W, ry*H, 8, 0, Math.PI*2);
    conCtx.fillStyle = 'rgba(240,128,160,0.12)'; conCtx.fill();
  });
}
function revealConstellation() {
  if (!conCtx) return;
  const W = conCanvas.width, H = conCanvas.height;
  let step = 0;
  const iv = setInterval(() => {
    if (step >= heartPts.length - 1) { clearInterval(iv); return; }
    const [x1,y1] = heartPts[step], [x2,y2] = heartPts[step+1];
    conCtx.beginPath(); conCtx.moveTo(x1*W,y1*H); conCtx.lineTo(x2*W,y2*H);
    conCtx.strokeStyle='rgba(240,128,160,0.8)'; conCtx.lineWidth=1.5; conCtx.stroke();
    conCtx.beginPath(); conCtx.arc(x2*W,y2*H,5,0,Math.PI*2);
    conCtx.fillStyle='#f080a0'; conCtx.fill();
    step++;
  }, 180);
}

// ── TARJETA QUE SE VOLTEA ──
const flipCard = document.getElementById('flipCard');
if (flipCard) flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));

// ── MÁQUINA DE ESCRIBIR ──
function typeWriter(el, texts, speed, pause) {
  speed=speed||70; pause=pause||2000;
  let ti=0, ci=0, del=false;
  function tick() {
    const cur=texts[ti];
    el.textContent = del ? cur.slice(0,ci-1) : cur.slice(0,ci+1);
    del ? ci-- : ci++;
    if (!del && ci===cur.length) { del=true; setTimeout(tick,pause); return; }
    if (del && ci===0) { del=false; ti=(ti+1)%texts.length; }
    setTimeout(tick, del?speed/2:speed);
  }
  tick();
}
const typeEl = document.getElementById('typewriter');
if (typeEl) typeWriter(typeEl, [
  'Te quiero muchísimo 🧡',
  'Eres mi persona favorita 🌹',
  'Gracias por existir 💕',
  'Feliz San Valentín, OSI 🐼',
  'Mi calma, mi hogar ♥',
]);

// ── BARRA DE PROGRESO ──
const fill = document.getElementById('progressFill');
const text = document.getElementById('progressText');
const finalMsg = document.getElementById('finalMsg');
const loadMsgs = ['contando las estrellas...','recordando tu sonrisa...','juntando abrazos virtuales...','¡amor al infinito! 💕'];
let progress=0, msgIdx=0;
const pIv = setInterval(() => {
  progress = Math.min(progress + Math.random()*2.5+0.5, 100);
  fill.style.width = progress+'%';
  const ni = Math.min(Math.floor((progress/100)*loadMsgs.length), loadMsgs.length-1);
  if (ni!==msgIdx) {
    msgIdx=ni; text.style.opacity='0';
    setTimeout(()=>{ text.textContent=loadMsgs[msgIdx]; text.style.opacity='1'; },350);
  }
  if (progress>=100) {
    clearInterval(pIv);
    setTimeout(()=>{ text.style.opacity='0'; setTimeout(()=>{ text.textContent=''; },400); finalMsg.classList.add('show'); },600);
  }
}, 130);