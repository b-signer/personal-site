// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ── Hero canvas: animated dot grid ──────────────────────────────
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let dots = [], raf;

  function buildDots() {
    const SPACING = 56;
    dots = [];
    const cols = Math.ceil(canvas.width  / SPACING) + 1;
    const rows = Math.ceil(canvas.height / SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * SPACING,
          y: r * SPACING,
          phase: Math.random() * Math.PI * 2,
          speed: 0.28 + Math.random() * 0.44,
        });
      }
    }
  }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function draw(ts) {
    const t = ts / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      const pulse = (Math.sin(t * d.speed + d.phase) + 1) / 2; // 0–1
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1 + pulse * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,85,247,${0.04 + pulse * 0.13})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();
  raf = requestAnimationFrame(draw);
})();

// ── Scroll-triggered reveals ─────────────────────────────────────
(function () {
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
})();

// ── Staggered entrance delays for grouped elements ────────────────
(function () {
  ['.timeline-item', '.project-card', '.community-card',
   '.course-group', '.contact-item'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });
})();

// ── Active nav section highlighting ──────────────────────────────
(function () {
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = document.querySelectorAll('.nav-links a[data-section]');
  if (!navLinks.length) return;

  let current = '';

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) current = e.target.id; });
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
    },
    { threshold: 0.35, rootMargin: '-64px 0px -25% 0px' }
  );

  sections.forEach(s => obs.observe(s));
})();

// ── Mobile nav toggle ────────────────────────────────────────────
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
