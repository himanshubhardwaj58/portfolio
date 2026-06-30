/* ===============================
   PORTFOLIO — Premium Interactions
   Himanshu Bhardwaj
================================ */

/* ===============================
   TYPING ANIMATION
================================ */
const typedTextEl = document.getElementById('typed-text');
const roles = ['Web Developer', 'Frontend Engineer', 'UI Designer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeText() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeText, 2000); // pause before deleting
      return;
    }
    typingTimeout = setTimeout(typeText, 80);
  } else {
    typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingTimeout = setTimeout(typeText, 500); // pause before next word
      return;
    }
    typingTimeout = setTimeout(typeText, 40);
  }
}

/* ===============================
   SCROLL REVEAL (IntersectionObserver)
================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve to allow re-animation if needed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ===============================
   COUNTER ANIMATION
================================ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(eased * count);
          target.textContent = currentCount + '+';

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ===============================
   SKILL BARS ANIMATION
================================ */
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          const width = getComputedStyle(bar).getPropertyValue('--bar-width');
          bar.style.width = width;
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(card => skillObserver.observe(card));
}

/* ===============================
   HEADER SCROLL EFFECT
================================ */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ===============================
   ACTIVE NAV LINK ON SCROLL
================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ===============================
   SMOOTH SCROLL NAVIGATION
================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        const nav = document.getElementById('main-nav');
        const hamburger = document.getElementById('hamburger-btn');
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          hamburger.classList.remove('active');
        }
      }
    });
  });
}

/* ===============================
   HAMBURGER MENU
================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

/* ===============================
   DARK / LIGHT MODE TOGGLE
================================ */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  // Default to dark mode
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');

    if (document.body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
      toggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '🌙';
    }
  });
}

/* ===============================
   HERO CONTACT BUTTON
================================ */
function goContact() {
  const headerHeight = document.getElementById('main-header').offsetHeight;
  const contactSection = document.getElementById('contact');
  const targetPosition = contactSection.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/* ===============================
   BACK TO TOP BUTTON
================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===============================
   PARTICLES CANVAS
================================ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);

    for (let i = 0; i < Math.min(count, 60); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 214, 160, ${p.opacity})`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 214, 160, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(drawParticles);
  }

  resize();
  createParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ===============================
   FORM SUBMIT FEEDBACK
================================ */
function initForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send (since no backend is set up)
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #06d6a0, #06d6a0)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2500);
      }, 1000);
    });
  }
}

/* ===============================
   SCROLL PROGRESS BAR
================================ */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ===============================
   TIMELINE PROGRESS LINE
================================ */
function initTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  const progressBar = document.getElementById('timeline-progress-bar');
  if (!timeline || !progressBar) return;

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    const startPoint = viewportHeight * 0.8;
    const endPoint = viewportHeight * 0.2;
    
    const totalDistance = startPoint - endPoint + elementHeight;
    const currentPos = startPoint - elementTop;
    
    let progress = (currentPos / totalDistance) * 100;
    progress = Math.max(0, Math.min(100, progress));
    
    progressBar.style.height = `${progress}%`;
  }, { passive: true });
}

/* ===============================
   3D CARD TILT & SPOTLIGHT GLOW
================================ */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.project-card, .skill-card, .timeline-card');
  cards.forEach(card => {
    card.style.setProperty('--mouse-x', `-999px`);
    card.style.setProperty('--mouse-y', `-999px`);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 8; // Max 8deg
      const rotateY = ((x - centerX) / centerX) * 8; // Max 8deg
      
      card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.setProperty('--mouse-x', `-999px`);
      card.style.setProperty('--mouse-y', `-999px`);
    });
  });
}

/* ===============================
   MAGNETIC INTERACTION
================================ */
function initMagnetButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .theme-toggle, .hero-social a, .footer-social a');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ===============================
   INITIALIZE EVERYTHING
================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Start typing animation
  setTimeout(typeText, 800);

  // Init all modules
  initScrollProgress();
  initTimelineProgress();
  initCardSpotlight();
  initMagnetButtons();
  initScrollReveal();
  animateCounters();
  initSkillBars();
  initHeaderScroll();
  initActiveNav();
  initSmoothScroll();
  initHamburger();
  initThemeToggle();
  initBackToTop();
  initParticles();
  initForm();
});
