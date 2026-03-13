/* ============================================================
   MAIN.JS — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ---- Smooth active link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav__links a');
  function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Scroll reveal ----
  function reveal() {
    const elements = document.querySelectorAll(
      '.skill-card, .timeline__item, .achievement-card, .project-card, .philosophy__card, .cert-card, .about__grid, .contact__grid, .skills__architecture'
    );
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', reveal, { passive: true });
  window.addEventListener('load', reveal);

  // ---- Counter animation ----
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      const rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight) return;

      counter.dataset.animated = 'true';
      const target = parseFloat(counter.dataset.count);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = isDecimal ? target.toFixed(2) : target;
        }
      }
      requestAnimationFrame(update);
    });
  }
  window.addEventListener('scroll', animateCounters, { passive: true });
  window.addEventListener('load', animateCounters);

  // ---- CSS-based particles ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (60 + Math.random() * 40) + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- Contact form (basic client-side handling) ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Basic client-side validation is handled by HTML5 required attributes
      // For a real deployment, connect to Formspree, Netlify Forms, or a backend endpoint

      btn.innerHTML = '<span>Message Sent! ✓</span>';
      btn.style.background = 'var(--color-accent)';
      btn.style.color = 'var(--color-bg)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ---- Staggered reveal for grid items ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          child.style.transitionDelay = (i * 0.1) + 's';
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.achievements__grid, .skills__grid, .philosophy__grid, .certs__grid').forEach(grid => {
    observer.observe(grid);
  });

})();
