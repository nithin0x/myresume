const THEME_KEY = 'resume-theme';

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeButtonLabel();
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

function updateThemeButtonLabel() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const current = document.body.getAttribute('data-theme') || 'light';
  btn.textContent = current === 'light' ? 'Dark Mode' : 'Light Mode';
}

// Load saved theme or system preference
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

// Download as PDF (uses browser print → Save as PDF)
function downloadPdf() {
  window.print();
}

window.addEventListener('DOMContentLoaded', initTheme);
