// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Landing Page
// ═══════════════════════════════════════════════════════════════

import { REGIONS, PERFUMES } from '../data/perfumes.js';
import { storage } from '../utils/storage.js';

export function renderLanding(container, navigate) {
  const hasProfile = !!storage.getProfile();

  container.innerHTML = `
    <!-- HERO -->
    <section class="hero" id="hero-section">
      <div class="hero__bg">
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__orb hero__orb--3"></div>
        <div class="hero__orb hero__orb--4"></div>
        <div class="hero__orb hero__orb--5"></div>
        <div class="hero__orb hero__orb--6"></div>
      </div>
      <div class="hero__content">
        <h1 class="hero__title" id="hero-title">
          <span class="hero__title-line">Build Your</span>
          <span class="hero__title-line hero__title-accent">Signature.</span>
        </h1>
        <p class="hero__subtitle">
          Discover the art of fragrance layering with six world regions.<br>
          Create your unique olfactory identity.
        </p>
        <div class="hero__actions">
          <button class="btn btn--primary btn--lg" id="hero-cta">
            ${hasProfile ? 'Enter the Lab' : 'Begin Your Journey'}
          </button>
        </div>
      </div>
      <div class="hero__scroll-hint" id="scroll-hint">
        <span>Discover</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    <!-- REGIONS -->
    <section class="landing-regions" id="regions-section">
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">The Collection</p>
          <h2 class="section-title">Six Regions, One Language</h2>
          <p class="section-subtitle">Each region carries centuries of olfactory tradition — distilled into spray and oil formats for infinite layering.</p>
        </div>
        <div class="regions-grid" id="regions-grid">
          ${REGIONS.map((region, i) => {
            const spray = PERFUMES.find(p => p.region === region.id && p.format === 'spray');
            const oil   = PERFUMES.find(p => p.region === region.id && p.format === 'oil');
            const rgb = hexToRgb(region.color);
            return `
              <div class="region-card" data-region="${region.id}" id="region-card-${region.id}" style="--delay: ${i * 0.1}s; --region-color: ${region.color}; --region-light: ${region.colorLight};">
                <div class="region-card__orb">${region.icon}</div>
                <h3 class="region-card__name">${region.name}</h3>
                <p class="region-card__tagline">${region.tagline}</p>
                <p class="region-card__description">${region.description}</p>
                <div class="region-card__formats">
                  ${spray ? `<button class="region-format-btn" data-region="${region.id}" data-format="spray" style="--rc: ${region.color}; --rc-rgb: ${rgb};">💨 Spray</button>` : ''}
                  ${oil   ? `<button class="region-format-btn" data-region="${region.id}" data-format="oil"   style="--rc: ${region.color}; --rc-rgb: ${rgb};">💧 Oil</button>`   : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="landing-how" id="how-section">
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">The Experience</p>
          <h2 class="section-title">How Mon Accord Works</h2>
        </div>
        <div class="how-steps">
          <div class="how-step" id="how-step-1">
            <div class="how-step__number">01</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Discover Your Profile</h3>
              <p class="how-step__text">Our AI analyzes your scent preferences, experience, and lifestyle to create your unique olfactory archetype.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-2">
            <div class="how-step__number">02</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Explore & Layer</h3>
              <p class="how-step__text">Combine sprays and oils from different regions. Our AI simulates the scent and guides your layering ratios.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-3">
            <div class="how-step__number">03</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Get Contextual Advice</h3>
              <p class="how-step__text">Tell us your mood, occasion, and season — the AI crafts a personalized formula just for that moment.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-4">
            <div class="how-step__number">04</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Evolve Your Scent</h3>
              <p class="how-step__text">Your profile grows with you. AI tracks your preferences and suggests remixes as your taste evolves.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="landing-cta" id="cta-section">
      <div class="page__container text-center">
        <div class="cta-card">
          <p class="section-label">Ready?</p>
          <h2 class="section-title">Find Your Accord</h2>
          <p class="section-subtitle mb-lg">Start with a quick profile quiz — your AI-powered scent journey begins here.</p>
          <button class="btn btn--primary btn--lg" id="bottom-cta">
            ${hasProfile ? 'Go to Lab' : 'Take the Quiz'}
          </button>
        </div>
      </div>
    </section>
  `;

  // ── Event Listeners ──
  container.querySelector('#hero-cta').addEventListener('click', () => {
    navigate(hasProfile ? '#lab' : '#profile');
  });

  container.querySelector('#bottom-cta').addEventListener('click', () => {
    navigate(hasProfile ? '#lab' : '#profile');
  });

  // Format buttons → popup
  container.querySelectorAll('.region-format-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const regionId = btn.dataset.region;
      const format   = btn.dataset.format;
      const region   = REGIONS.find(r => r.id === regionId);
      const perfume  = PERFUMES.find(p => p.region === regionId && p.format === format);
      if (!perfume || !region) return;

      // Remove any existing popup
      document.querySelector('.notes-popup')?.remove();

      const popup = document.createElement('div');
      popup.className = 'notes-popup';
      popup.innerHTML = `
        <div class="notes-popup__inner" style="--rc: ${region.color}; --rc-rgb: ${hexToRgb(region.color)};">
          <div class="notes-popup__header">
            <span class="notes-popup__title">${region.icon} ${region.name} — ${format === 'spray' ? '💨 Spray' : '💧 Oil'}</span>
            <button class="notes-popup__close">✕</button>
          </div>
          <div class="notes-popup__rows">
            <div class="notes-popup__row">
              <span class="notes-popup__label">Top</span>
              <span class="notes-popup__val">${perfume.topNotes.join(', ')}</span>
            </div>
            <div class="notes-popup__row">
              <span class="notes-popup__label">Middle</span>
              <span class="notes-popup__val">${perfume.middleNotes.join(', ')}</span>
            </div>
            <div class="notes-popup__row">
              <span class="notes-popup__label">Base</span>
              <span class="notes-popup__val">${perfume.baseNotes.join(', ')}</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(popup);

      // Position near the button
      const rect = btn.getBoundingClientRect();
      const inner = popup.querySelector('.notes-popup__inner');
      // Wait for paint so we know popup size
      requestAnimationFrame(() => {
        const pw = inner.offsetWidth;
        const ph = inner.offsetHeight;
        let left = rect.left + rect.width / 2 - pw / 2;
        let top  = rect.bottom + window.scrollY + 10;
        // Keep inside viewport
        if (left + pw > window.innerWidth - 12) left = window.innerWidth - pw - 12;
        if (left < 12) left = 12;
        const viewportBottom = window.scrollY + window.innerHeight - 12;
        if (top + ph > viewportBottom) {
          top = rect.top + window.scrollY - ph - 10;
        }
        const viewportTop = window.scrollY + 12;
        if (top < viewportTop) top = viewportTop;
        popup.style.left = left + 'px';
        popup.style.top  = top + 'px';
      });

      const close = () => popup.remove();
      popup.querySelector('.notes-popup__close').addEventListener('click', close);
      setTimeout(() => document.addEventListener('click', close, { once: true }), 0);

    });
  });

  // Intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  container.querySelectorAll('.region-card, .how-step').forEach(el => {
    observer.observe(el);
  });

  // ── Landing-specific styles ──
  addLandingStyles();
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function addLandingStyles() {
  if (document.getElementById('landing-styles')) return;
  const style = document.createElement('style');
  style.id = 'landing-styles';
  style.textContent = `
    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: var(--space-xl);
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .hero__orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.25;
      animation: float 8s ease-in-out infinite;
    }

    .hero__orb--1 { width: 300px; height: 300px; background: var(--region-scandinavian-light); top: 10%; left: 5%; animation-delay: 0s; }
    .hero__orb--2 { width: 250px; height: 250px; background: var(--region-eastasia-light); top: 20%; right: 10%; animation-delay: 1.5s; }
    .hero__orb--3 { width: 350px; height: 350px; background: var(--region-mediterranean-light); bottom: 15%; left: 15%; animation-delay: 3s; }
    .hero__orb--4 { width: 200px; height: 200px; background: var(--region-middleeast-light); top: 50%; right: 20%; animation-delay: 2s; }
    .hero__orb--5 { width: 280px; height: 280px; background: var(--region-southamerica-light); bottom: 20%; right: 5%; animation-delay: 4s; }
    .hero__orb--6 { width: 220px; height: 220px; background: var(--region-southafrica-light); top: 5%; left: 40%; animation-delay: 1s; }

    .hero__content {
      text-align: center;
      position: relative;
      z-index: 1;
      max-width: 700px;
    }

    .hero__title {
      font-size: var(--text-hero);
      font-weight: 600;
      line-height: 1.1;
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.8s var(--ease-out) 0.3s both;
    }

    .hero__title-line {
      display: block;
    }

    .hero__title-accent {
      color: var(--accent);
      font-style: italic;
    }

    .hero__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: var(--space-2xl);
      animation: fadeIn 0.8s var(--ease-out) 0.5s both;
    }

    .hero__actions {
      display: flex;
      gap: var(--space-md);
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeIn 0.8s var(--ease-out) 0.7s both;
    }

    .hero__scroll-hint {
      position: absolute;
      bottom: var(--space-xl);
      left: 0;
      right: 0;
      width: fit-content;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: var(--text-lg);
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--accent);
      animation: float 3s ease-in-out infinite, fadeIn 1s var(--ease-out) 1.2s both;
      cursor: pointer;
      text-transform: uppercase;
      text-align: center;
    }

    /* ── Regions Grid ── */
    .landing-regions {
      padding: var(--space-4xl) 0;
    }

    .regions-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-lg);
    }

    .region-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-slow);
      opacity: 0;
      transform: translateY(24px);
      position: relative;
      overflow: hidden;
      min-height: var(--card-min-tall);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .region-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--region-color), var(--region-light));
      opacity: 0;
      transition: opacity var(--transition-base);
    }

    .region-card.visible {
      opacity: 1;
      transform: translateY(0);
      transition-delay: var(--delay);
    }

    .region-card:hover {
      border-color: var(--region-color);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
      transform: translateY(-4px);
    }

    .region-card:hover::before {
      opacity: 1;
    }

    .region-card__orb {
      font-size: 2.5rem;
      margin-bottom: var(--space-md);
      display: inline-block;
      transition: transform var(--transition-base);
    }

    .region-card:hover .region-card__orb {
      transform: scale(1.15);
    }

    .region-card__name {
      font-size: var(--text-xl);
      margin-bottom: var(--space-xs);
    }

    .region-card__tagline {
      font-size: var(--text-sm);
      color: var(--accent);
      font-weight: 500;
      margin-bottom: var(--space-md);
    }

    .region-card__description {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      line-height: 1.6;
      margin-bottom: var(--space-md);
      flex: 1;
    }

    .region-card__formats {
      display: flex;
      gap: var(--space-xs);
      justify-content: center;
      margin-bottom: 0;
      margin-top: auto;
    }

    .region-format-btn {
      padding: 6px 16px;
      font-size: var(--text-xs);
      font-weight: 600;
      border: 1px solid rgba(var(--rc-rgb), 0.35);
      border-radius: var(--radius-full);
      background: rgba(var(--rc-rgb), 0.07);
      color: var(--rc);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .region-format-btn:hover,
    .region-format-btn--active {
      background: rgba(var(--rc-rgb), 0.18);
      border-color: var(--rc);
    }

    .notes-popup {
      position: absolute;
      z-index: 2000;
      animation: fadeIn 0.15s var(--ease-out);
    }

    .notes-popup__inner {
      background: var(--surface);
      border: 1px solid rgba(var(--rc-rgb), 0.3);
      border-radius: var(--radius-lg);
      box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      padding: var(--space-lg);
      width: 280px;
    }

    .notes-popup__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid rgba(var(--rc-rgb), 0.2);
    }

    .notes-popup__title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--rc);
    }

    .notes-popup__close {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      transition: background var(--transition-fast);
    }

    .notes-popup__close:hover { background: var(--bg-secondary); }

    .notes-popup__rows { margin-bottom: var(--space-md); }

    .notes-popup__row {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: 6px;
      font-size: var(--text-xs);
      line-height: 1.5;
    }

    .notes-popup__label {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-tertiary);
      min-width: 46px;
      flex-shrink: 0;
    }

    .notes-popup__val { color: var(--text-secondary); }

    /* ── How It Works ── */
    .landing-how {
      padding: var(--space-3xl) 0 var(--space-4xl);
    }

    .how-steps {
      max-width: 700px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .how-step {
      display: flex;
      gap: var(--space-xl);
      align-items: flex-start;
      opacity: 0;
      transform: translateX(-24px);
      transition: all var(--transition-slow);
    }

    .how-step.visible {
      opacity: 1;
      transform: translateX(0);
    }

    .how-step__number {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--accent-light);
      min-width: 60px;
      line-height: 1;
    }

    .how-step__title {
      font-size: var(--text-lg);
      margin-bottom: var(--space-xs);
    }

    .how-step__text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* ── Bottom CTA ── */
    .landing-cta {
      padding: var(--space-2xl) 0 var(--space-4xl);
    }

    .cta-card {
      background: linear-gradient(135deg, var(--accent-bg), rgba(200,169,126,0.03));
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-xl);
      padding: var(--space-4xl) var(--space-2xl);
      width: min(100%, 760px);
      margin: 0 auto;
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .regions-grid {
        grid-template-columns: 1fr;
      }

      .how-step {
        flex-direction: column;
        gap: var(--space-sm);
      }

      .hero__title {
        font-size: 2.2rem;
      }
    }
  `;
  document.head.appendChild(style);
}
