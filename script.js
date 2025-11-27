// script.js — theme toggle + mobile nav + simple contact demo
(function () {
  // Theme toggle
  const key = 'theme-preference';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  const saved = localStorage.getItem(key);
  if (saved) {
    applyTheme(saved);
  } else {
    // Respect system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  btn && btn.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(key, next);
  });

  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.classList.remove('open');
      }
    });
  });

  // Simple contact form demo
  window.handleForm = function (ev) {
    ev.preventDefault();
    const f = ev.target;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    if (!name || !email || !message) {
      alert('Please complete all fields.');
      return;
    }
    // Demo: log and show success
    console.log('Contact form (demo):', { name, email, message });
    alert('Thanks — your message was sent (demo).');
    f.reset();
  };

  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
// CERTIFICATE MODAL
const certModal = document.getElementById("certModal");
const certImage = document.getElementById("certImage");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".view-cert").forEach(btn => {
  btn.addEventListener("click", () => {
    const imgPath = btn.getAttribute("data-cert");
    certImage.src = imgPath;
    certModal.classList.add("show");
  });
});

closeBtn.addEventListener("click", () => {
  certModal.classList.remove("show");
});

// Close modal when clicking outside image
certModal.addEventListener("click", (e) => {
  if (e.target === certModal) {
    certModal.classList.remove("show");
  }
});
