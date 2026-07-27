import { projects, skills, certificates } from './data.js';

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI Elements & Global States
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Theme Switching Logic
  initTheme();

  // 3. Typed Animation in Hero
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const roles = ["Software Engineer", "Full Stack Developer", "Problem Solver"];
    typeEffect(typedTextEl, roles);
  }

  // 4. Interactive Canvas Particle Background
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    new ParticleNetwork(canvas);
  }

  // 5. Dynamic Data Rendering
  renderSkills();
  renderProjects();
  renderCertificates();

  // 6. Navigation Logic (Sticky Nav, Mobile Drawer, Active Links)
  initNavigation();

  // 7. Scroll Reveal Animation
  initScrollReveal();

  // 8. Contact Form Handling
  initContactForm();
});

/* ========================================================================= */
/* 2. Theme Handling
/* ========================================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve theme or default to system/dark preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Set theme on html tag
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeToggleIcon(themeToggleBtn, initialTheme);

  // Toggle Theme Listener
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(themeToggleBtn, newTheme);
  });
}

function updateThemeToggleIcon(btn, theme) {
  // Insert correct icon dynamically
  btn.innerHTML = theme === 'dark' 
    ? '<i data-lucide="sun"></i>' 
    : '<i data-lucide="moon"></i>';
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ========================================================================= */
/* 3. Typing Effect
/* ========================================================================= */
function typeEffect(element, words, speed = 80, delay = 2000) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = speed;
    if (isDeleting) {
      typeSpeed /= 2; // Delete faster
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = delay; // Hold word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Delay before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ========================================================================= */
/* 4. Particle Canvas Network
/* ========================================================================= */
class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.numberOfParticles = 60;
    this.connectionDistance = 110;
    this.mouse = { x: null, y: null, radius: 140 };

    this.init();
    this.animate();
    this.setupListeners();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1
      });
    }
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    const parent = this.canvas.parentElement;
    parent.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    parent.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';

    // Tailor colors to current theme
    const particleColor = theme === 'light' ? 'rgba(79, 70, 229, 0.22)' : 'rgba(99, 102, 241, 0.28)';
    const lineColor = theme === 'light' ? 'rgba(79, 70, 229, 0.05)' : 'rgba(99, 102, 241, 0.08)';
    const mouseLineColor = theme === 'light' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(16, 185, 129, 0.22)';

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off boundary edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle circle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particleColor;
      this.ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = lineColor;
          this.ctx.lineWidth = alpha;
          this.ctx.stroke();
        }
      }

      // Connect particles to user mouse pointer
      if (this.mouse.x !== null) {
        const distToMouse = Math.hypot(p.x - this.mouse.x, p.y - this.mouse.y);
        if (distToMouse < this.mouse.radius) {
          const alpha = (1 - distToMouse / this.mouse.radius) * 0.75;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = mouseLineColor;
          this.ctx.lineWidth = alpha;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

/* ========================================================================= */
/* 5. Data Rendering Methods
/* ========================================================================= */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skills.map(skillGroup => `
    <div class="glass-panel skill-card">
      <div class="skill-title-wrapper">
        <i data-lucide="${getSkillIcon(skillGroup.category)}"></i>
        <h3>${skillGroup.category}</h3>
      </div>
      <div class="skills-list">
        ${skillGroup.items.map(skill => `
          <span class="skill-tag">${skill}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function getSkillIcon(category) {
  switch (category.toLowerCase()) {
    case 'frontend': return 'layout';
    case 'backend': return 'server';
    case 'database': return 'database';
    default: return 'cpu';
  }
}

function renderProjects(filter = 'All') {
  const grid = document.getElementById('projects-grid');
  const tabs = document.getElementById('filter-tabs');
  if (!grid) return;

  // Extract unique categories for filter tabs
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  
  // Render tabs if not already populated
  if (tabs && tabs.children.length === 0) {
    tabs.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === filter ? 'active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    // Filter Click Listener
    tabs.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProjects(e.target.dataset.category);
      });
    });
  }

  // Filter projects data
  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Render cards with fade-out/in transition
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';
  grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(() => {
    grid.innerHTML = filtered.map(p => `
      <div class="glass-panel project-card">
        <div class="project-image-container">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
        </div>
        <div class="project-details">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech">
            ${p.techStack.map(tech => `<span class="tech-bubble">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" class="project-link-item" target="_blank" rel="noopener">
                <i data-lucide="github"></i> Code
              </a>
            ` : ''}
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" class="project-link-item" target="_blank" rel="noopener">
                <i data-lucide="external-link"></i> Live Demo
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }

    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 250);
}

function renderCertificates() {
  const container = document.getElementById('cert-grid');
  if (!container) return;

  container.innerHTML = certificates.map(cert => `
    <div class="glass-panel cert-card">
      <div class="cert-meta">
        <span class="cert-date">${cert.date}</span>
        <span class="cert-issuer">${cert.issuer}</span>
      </div>
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-desc">${cert.description}</p>
      ${cert.credentialId ? `<div class="cert-id" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem; font-family: monospace;">ID: ${cert.credentialId}</div>` : ''}
      <a href="${cert.link}" class="cert-link">
        View Verification <i data-lucide="arrow-up-right"></i>
      </a>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ========================================================================= */
/* 6. Navigation Controls
/* ========================================================================= */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Navigation Link Highlighter based on Scroll Position
    let currentActiveId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = sec.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile Navigation Drawer Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Auto-close Drawer on link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ========================================================================= */
/* 7. Scroll Reveal Animation (Intersection Observer)
/* ========================================================================= */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ========================================================================= */
/* 8. Contact Form Handling & Validation
/* ========================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedbackMsg = document.getElementById('form-message');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedbackMsg.className = 'form-message';
    feedbackMsg.style.display = 'none';

    // Values & Validation
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const body = document.getElementById('form-message-body').value.trim();

    if (!name || !email || !subject || !body) {
      showFormFeedback('Please fill out all fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showFormFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending progress
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="spin"></i>';
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      if (window.lucide) window.lucide.createIcons();

      // Show success
      showFormFeedback('Thank you! Your message was sent successfully.', 'success');
      form.reset();
    }, 1500);
  });

  function showFormFeedback(text, status) {
    feedbackMsg.textContent = text;
    feedbackMsg.classList.add(status);
    feedbackMsg.style.display = 'block';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
