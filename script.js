// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-triggered reveals
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

// Active nav section highlighting
(function () {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');
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

// Mobile nav toggle
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
