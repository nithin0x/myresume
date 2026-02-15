const THEME_KEY = 'resume-theme';

// Command runner for terminal UI
function runCommand(cmd) {
  const output = document.getElementById('output');
  if (!output) return;

  const timestamp = new Date().toLocaleTimeString();

  switch(cmd) {
    case 'theme':
      toggleTheme();
      addOutputLine(`[${timestamp}] Executing: toggle_theme... OK`, 'success');
      break;
    case 'matrix':
      toggleMatrixEffect();
      break;
    default:
      addOutputLine(`[${timestamp}] Command not found: ${cmd}`, 'error');
  }
}

function addOutputLine(text, type = 'info') {
  const output = document.getElementById('output');
  if (!output) return;

  const line = document.createElement('div');
  line.className = `line ${type === 'success' ? 'system-msg' : type === 'error' ? 'error-msg' : ''}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeButtonLabel();
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

function updateThemeButtonLabel() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const current = document.body.getAttribute('data-theme') || 'dark';
  btn.classList.toggle('light-mode', current === 'light');
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// Matrix effect toggle
let matrixInterval = null;

function toggleMatrixEffect() {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) canvas.remove();
    addOutputLine('[SYSTEM] Matrix effect disabled', 'success');
    return;
  }

  addOutputLine('[SYSTEM] Matrix effect enabled - follow the white rabbit', 'success');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:500;pointer-events:none;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = '15px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 33);
}

// Calculate work duration for the current role (Oct 2023)
function calculateDuration() {
  const el = document.getElementById('duration-1');
  if (!el) return;

  const start = new Date(2023, 9, 1); // October 2023
  const now = new Date();
  const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = '';
  if (years > 0) duration += `${years}y `;
  duration += `${months}m`;
  el.textContent = `[${duration}]`;
}

// Uptime counter (time since page load)
function startUptime() {
  const el = document.getElementById('uptime');
  if (!el) return;

  const loadTime = Date.now();

  function update() {
    const elapsed = Math.floor((Date.now() - loadTime) / 1000);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    requestAnimationFrame(update);
  }

  update();
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  calculateDuration();
  startUptime();
});
