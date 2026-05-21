// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Landing Page
// ═══════════════════════════════════════════════════════════════

import { REGIONS, PERFUMES } from '../data/perfumes.js';
import { storage } from '../utils/storage.js';

const PERFUME_IMAGES = {
  scandinavian: new URL('../assets/perfumes/scandinavian.webp',   import.meta.url).href,
  eastasia:     new URL('../assets/perfumes/east_asia.webp',      import.meta.url).href,
  southafrica:  new URL('../assets/perfumes/south_africa.webp',   import.meta.url).href,
  mediterranean:new URL('../assets/perfumes/mediterranean.webp',  import.meta.url).href,
  southamerica: new URL('../assets/perfumes/south_america.webp',  import.meta.url).href,
  middleeast:   new URL('../assets/perfumes/middle_east.webp',    import.meta.url).href,
};

const OIL_IMAGES = {
  scandinavian: new URL('../assets/oils/scandinavian.webp',   import.meta.url).href,
  eastasia:     new URL('../assets/oils/east_asia.webp',      import.meta.url).href,
  southafrica:  new URL('../assets/oils/south_africa.webp',   import.meta.url).href,
  mediterranean:new URL('../assets/oils/mediterranean.webp',  import.meta.url).href,
  southamerica: new URL('../assets/oils/south_america.webp',  import.meta.url).href,
  middleeast:   new URL('../assets/oils/middle_east.webp',    import.meta.url).href,
};

export function renderLanding(container, navigate) {
  const hasProfile = !!storage.getProfile();

  container.innerHTML = `
    <!-- HERO -->
    <section class="hero" id="hero-section">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line">Build Your</span>
          <span class="hero__title-line hero__title-accent">Signature.</span>
        </h1>
        <p class="hero__subtitle">
          Layer fragrances from six world regions.<br>
          Your olfactory identity, composed by you.
        </p>
      </div>
      <div class="hero__scroll-hint" id="scroll-hint">
        <div class="hero__discover-ring">
          <span class="hero__discover-label">Discover</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>
    </section>

    <!-- COLLECTION -->
    <section class="landing-regions" id="regions-section">
      <div class="cf-showcase">

        <!-- Left: visual carousel -->
        <div class="cf-visual">
          <button class="cf-nav cf-nav--prev" id="cf-prev" aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="cf-stage" id="cf-stage">
            ${REGIONS.map((r, i) => `
              <div class="cf-card" data-index="${i}" data-region="${r.id}">
                <img src="${PERFUME_IMAGES[r.id]}" alt="${r.name} Spray" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
                <img src="${OIL_IMAGES[r.id]}" alt="${r.name} Oil" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
              </div>
            `).join('')}
          </div>
          <button class="cf-nav cf-nav--next" id="cf-next" aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div class="cf-dots" id="cf-dots">
            ${REGIONS.map((r, i) => `<button class="cf-dot" data-index="${i}" style="--rc: ${r.color};" aria-label="${r.name}"></button>`).join('')}
          </div>
        </div>

        <!-- Right: info panel -->
        <div class="cf-info" id="cf-info"></div>

      </div>
    </section>

    <!-- NAME ORIGIN -->
    <section class="landing-origin" id="origin-section">
      <div class="page__container">
        <div class="origin-block">
          <p class="origin-word">Mon Accord</p>
          <p class="origin-definition">French for <em>my harmony</em>. A fragrance is never just a scent — it is an agreement between notes, between cultures, between a moment and a memory. Find yours.</p>
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
              <h3 class="how-step__title">Build Your Profile</h3>
              <p class="how-step__text">Answer a short quiz and we create your unique olfactory archetype — your taste, your language, your starting point.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-2">
            <div class="how-step__number">02</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Layer & Compose</h3>
              <p class="how-step__text">Combine sprays and oils from six world regions. Adjust ratios, simulate the scent, and get advice tailored to your mood, occasion, and season.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-3">
            <div class="how-step__number">03</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Save & Evolve</h3>
              <p class="how-step__text">Vault your formulas, revisit them anytime. Your profile grows with every session — refining your accord as your taste evolves.</p>
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
          <p class="section-subtitle mb-lg">Start with a quick profile quiz — your personalised scent journey begins here.</p>
          <button class="btn btn--primary btn--lg" id="bottom-cta">
            ${hasProfile ? 'Go to Lab' : 'Take the Quiz'}
          </button>
        </div>
      </div>
    </section>
  `;

  addLandingStyles();

  // ── Scroll hint ──
  container.querySelector('#scroll-hint').addEventListener('click', () => {
    document.getElementById('origin-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ── Bottom CTA ──
  container.querySelector('#bottom-cta').addEventListener('click', () => {
    navigate(hasProfile ? '#lab' : '#profile');
  });

  // ── Coverflow ring buffer ──
  // slots[2] = active center. Slot index → visual pos: slotIdx - 2
  // slot 0 = pos -2 (hidden left), slots 1/2/3 visible, slot 4/5 hidden right
  let slots = [0, 1, 2, 3, 4, 5];

  function cardEl(regionIdx) {
    return container.querySelector(`.cf-card[data-index="${regionIdx}"]`);
  }

  function applyPos(card, pos, instant = false) {
    const absP  = Math.abs(pos);
    const tx    = pos * 320;
    const scale = absP === 0 ? 1 : absP === 1 ? 0.68 : 0.50;
    const op    = absP === 0 ? 1 : absP === 1 ? 0.55 : 0;
    const z     = absP === 0 ? 5 : absP === 1 ? 3 : 1;
    if (instant) card.style.transition = 'none';
    card.style.transform = `translateX(calc(-50% + ${tx}px)) translateY(-50%) scale(${scale})`;
    card.style.opacity   = op;
    card.style.zIndex    = z;
    if (instant) { card.offsetHeight; card.style.transition = ''; }
  }

  function renderSlots(instant = false) {
    slots.forEach((regionIdx, slotIdx) => {
      applyPos(cardEl(regionIdx), slotIdx - 2, instant);
      cardEl(regionIdx).classList.toggle('cf-card--active', slotIdx === 2);
    });
    container.querySelectorAll('.cf-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === slots[2]);
    });
    renderDetail();
  }

  function renderDetail() {
    const region = REGIONS[slots[2]];
    const spray  = PERFUMES.find(p => p.region === region.id && p.format === 'spray');
    const oil    = PERFUMES.find(p => p.region === region.id && p.format === 'oil');
    const info   = container.querySelector('#cf-info');

    const noteCol = (label, notes) => `
      <div class="cf-info__note-col">
        <p class="cf-info__note-heading">${label}</p>
        <p class="cf-info__note-vals">${notes.join(', ')}</p>
      </div>`;

    info.innerHTML = `
      <div class="cf-info__inner" style="--rc: ${region.color}; --rcl: ${region.colorLight};">
        <div class="cf-info__top">
          <p class="cf-info__label">The Collection</p>
          <h2 class="cf-info__name">${region.name}</h2>

        </div>
        <p class="cf-info__desc">${region.description}</p>
        <div class="cf-info__divider"></div>
        ${spray ? `
          <div class="cf-info__notes-block">
            <p class="cf-info__notes-type">Spray</p>
            <div class="cf-info__notes-cols">
              ${noteCol('TOP', spray.topNotes)}
              ${noteCol('HEART', spray.middleNotes)}
              ${noteCol('BASE', spray.baseNotes)}
            </div>
          </div>` : ''}
        ${oil ? `
          <div class="cf-info__notes-block">
            <p class="cf-info__notes-type">Oil</p>
            <div class="cf-info__notes-cols">
              ${noteCol('TOP', oil.topNotes)}
              ${noteCol('HEART', oil.middleNotes)}
              ${noteCol('BASE', oil.baseNotes)}
            </div>
          </div>` : ''}
      </div>
    `;

    info.querySelector('.cf-info__inner').animate(
      [{ opacity: 0, transform: 'translateX(16px)' }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 340, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'forwards' }
    );
  }

  function goRight() {
    applyPos(cardEl(slots[0]), 3, true); // snap hidden-left to hidden-right
    slots = [...slots.slice(1), slots[0]];
    renderSlots();
  }

  function goLeft() {
    applyPos(cardEl(slots[5]), -3, true); // snap hidden-right to hidden-left
    slots = [slots[5], ...slots.slice(0, 5)];
    renderSlots();
  }

  function snapToRegion(targetIdx) {
    const pos = slots.indexOf(targetIdx) - 2;
    if (pos === 0) return;
    const shift = slots.indexOf(targetIdx);
    slots = [...slots.slice(shift), ...slots.slice(0, shift)];
    renderSlots(true);
  }

  container.querySelector('#cf-prev').addEventListener('click', goLeft);
  container.querySelector('#cf-next').addEventListener('click', goRight);

  container.querySelectorAll('.cf-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => snapToRegion(i));
  });

  container.querySelectorAll('.cf-card').forEach(card => {
    card.addEventListener('click', () => {
      const slotIdx = slots.indexOf(Number(card.dataset.index));
      if (slotIdx === 2) return;
      if (slotIdx > 2) goRight(); else goLeft();
    });
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goLeft();
    if (e.key === 'ArrowRight') goRight();
  });

  renderSlots(true);

  // ── Intersection observer for how-steps ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  container.querySelectorAll('.how-step').forEach(el => observer.observe(el));
}

function addLandingStyles() {
  if (document.getElementById('landing-styles')) return;
  const style = document.createElement('style');
  style.id = 'landing-styles';
  style.textContent = `
    /* ── Hero ── */
    .hero {
      min-height: calc(100vh - var(--nav-height));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: var(--space-xl);
      padding-bottom: 100px;
    }

    .hero__content {
      text-align: center;
      max-width: 700px;
    }

    .hero__brand {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-primary);
      margin-bottom: var(--space-sm);
      animation: fadeIn 0.8s var(--ease-out) 0.1s both;
    }

    .hero__title {
      font-size: var(--text-hero);
      font-weight: 600;
      line-height: 1.1;
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.8s var(--ease-out) 0.3s both;
    }

    .hero__title-line { display: block; }

    .hero__title-accent {
      color: var(--accent);
      font-style: italic;
    }

    .hero__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: 1.6;
      animation: fadeIn 0.8s var(--ease-out) 0.5s both;
    }

    .hero__scroll-hint {
      position: absolute;
      bottom: var(--space-xl);
      left: 0; right: 0;
      width: fit-content;
      margin: 0 auto;
      animation: float 3s ease-in-out infinite, fadeIn 1s var(--ease-out) 1.2s both;
      cursor: pointer;
    }

    .hero__discover-ring {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px 28px;
      transition: opacity var(--transition-base);
    }

    .hero__discover-ring:hover { opacity: 0.65; }

    .hero__discover-label {
      font-size: var(--text-base);
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
    }

    .hero__discover-ring svg { color: var(--accent); }

    /* ── Name Origin ── */
    .landing-origin { padding: var(--space-3xl) 0 var(--space-2xl); }

    .origin-block {
      max-width: 640px;
      margin: 0 auto;
      border-left: 2px solid var(--accent);
      padding-left: var(--space-xl);
    }

    .origin-word {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 600;
      font-style: italic;
      color: var(--accent);
      margin-bottom: var(--space-md);
    }

    .origin-definition {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.75;
    }

    .origin-definition em {
      color: var(--text-primary);
      font-style: italic;
    }

    /* ── Collection showcase ── */
    .landing-regions { padding: var(--space-3xl) 0; }

    .cf-showcase {
      display: grid;
      grid-template-columns: 58% 42%;
      height: 580px;
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 var(--space-lg);
    }

    /* ── Visual carousel ── */
    .cf-visual {
      position: relative;
      height: 520px;
      flex-shrink: 0;
    }

    .cf-stage {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .cf-card {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 340px;
      height: 420px;
      cursor: pointer;
      transition: transform 0.55s cubic-bezier(0.16,1,0.3,1),
                  opacity  0.55s cubic-bezier(0.16,1,0.3,1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .cf-card__img {
      width: 50%;
      height: 360px;
      object-fit: contain;
      object-position: bottom;
      pointer-events: none;
      user-select: none;
      display: block;
    }

    /* Nav buttons */
    .cf-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(20, 20, 20, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-sm);
    }

    .cf-nav:hover {
      border-color: var(--accent);
      color: var(--accent);
      box-shadow: var(--shadow-gold);
    }

    .cf-nav--prev { left: 16px; }
    .cf-nav--next { right: 16px; }

    /* Dots */
    .cf-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }

    .cf-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      cursor: pointer;
      transition: all var(--transition-base);
      padding: 0;
    }

    .cf-dot.active {
      background: var(--rc);
      transform: scale(1.35);
    }

    /* ── Info panel ── */
    .cf-info {
      display: flex;
      align-items: center;
      padding: var(--space-2xl) var(--space-2xl) var(--space-2xl) var(--space-3xl);
    }

    .cf-info__inner {
      width: 100%;
    }

    .cf-info__label {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }

    .cf-info__name {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 500;
      line-height: 1.1;
      color: var(--text-primary);
      margin-bottom: var(--space-sm);
    }


    .cf-info__desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.75;
      max-width: 380px;
      margin-bottom: var(--space-lg);
    }

    .cf-info__divider {
      height: 1px;
      background: linear-gradient(90deg, var(--rc), transparent);
      opacity: 0.35;
      margin-bottom: var(--space-lg);
    }

    .cf-info__notes-block {
      margin-bottom: var(--space-md);
    }

    .cf-info__notes-type {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-tertiary);
      margin-bottom: var(--space-sm);
    }

    .cf-info__notes-cols {
      display: flex;
      gap: var(--space-xl);
    }

    .cf-info__note-col { flex: 1; }

    .cf-info__note-heading {
      font-size: var(--text-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      margin-bottom: 4px;
    }

    .cf-info__note-vals {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .cf-info__cta {
      margin-top: var(--space-xl);
    }

    /* ── How It Works ── */
    .landing-how { padding: var(--space-3xl) 0 var(--space-4xl); }

    .how-steps {
      margin: var(--space-2xl) auto 0;
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      gap: var(--space-3xl);
    }

    .how-step {
      display: flex;
      flex-direction: row;
      gap: var(--space-lg);
      padding: var(--space-xl);
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--transition-slow);
    }

    .how-step.visible { opacity: 1; transform: translateY(0); }

    .how-step__number {
      font-family: var(--font-display);
      font-size: var(--text-4xl);
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      opacity: 0.35;
    }

    .how-step__title { font-size: var(--text-lg); font-weight: 600; }

    .how-step__text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.65;
      width: 250px;
      margin-top: var(--space-lg);
    }

    /* ── Bottom CTA ── */
    .landing-cta { padding: var(--space-2xl) 0 var(--space-4xl); }

    .cta-card {
      background: linear-gradient(135deg, var(--accent-bg), rgba(201,169,110,0.05));
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-xl);
      padding: var(--space-4xl) var(--space-2xl);
      width: min(100%, 760px);
      margin: 0 auto;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .cf-showcase { grid-template-columns: 1fr; height: auto; }
      .cf-visual { height: 420px; }
      .cf-info { padding: var(--space-xl); }
      .how-steps { grid-template-columns: 1fr; }
      .hero__title { font-size: 2.2rem; }
    }
  `;
  document.head.appendChild(style);
}
