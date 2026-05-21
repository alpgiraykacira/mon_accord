// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Profile Quiz Page
// ═══════════════════════════════════════════════════════════════

import { SCENT_FAMILIES, REGIONS, PERFUMES, LOREAL_LUXE_PERFUMES, getPerfumeById } from '../data/perfumes.js';
import { generateProfile } from '../services/profile-engine.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';

const SCENT_FAMILY_IMGS = Object.fromEntries(
  ['fresh', 'floral', 'woody', 'oriental', 'citrus', 'gourmand', 'green', 'aromatic', 'spicy', 'musky']
    .map(id => [id, new URL(`../assets/quiz_scent_families/${id}.webp`, import.meta.url).href])
);

const TRAIT_IMGS = {
  elegant:     new URL('../assets/quiz_traits/elegant_classic.webp',     import.meta.url).href,
  adventurous: new URL('../assets/quiz_traits/adventurous_bold.webp',    import.meta.url).href,
  romantic:    new URL('../assets/quiz_traits/romantic_dreamy.webp',     import.meta.url).href,
  minimalist:  new URL('../assets/quiz_traits/minimalist_clean.webp',    import.meta.url).href,
  creative:    new URL('../assets/quiz_traits/creative_expressive.webp', import.meta.url).href,
  confident:   new URL('../assets/quiz_traits/confident_powerful.webp',  import.meta.url).href,
};

const TOTAL_STEPS = 5;

export function renderProfileQuiz(container, navigate) {
  const existingProfile = storage.getProfile();

  if (existingProfile && !window.__retakeQuiz) {
    renderProfileResult(container, existingProfile, navigate);
    return;
  }

  window.__retakeQuiz = false;
  const savedState = storage.getQuizState();
  let currentStep = savedState?.step || 1;
  let answers = savedState?.answers || {
    username: '',
    scentFamilies: [],
    knownPerfumes: [],
    sillage: 5,
    longevity: 5,
    intensity: 5,
    personality: '',
    notes: '',
  };

  function renderStep() {
    storage.setQuizState({ step: currentStep, answers });
    const content = `
      <div class="page__container">
        <div class="quiz-container">
          <div class="quiz-stepper">
            ${Array.from({length: TOTAL_STEPS}, (_, i) => {
              const n = i + 1;
              const cls = n < currentStep ? 'completed' : n === currentStep ? 'active' : '';
              const lineCls = n < currentStep ? 'done' : '';
              const label = n < currentStep ? '✓' : String(n);
              const line = i < TOTAL_STEPS - 1 ? `<div class="quiz-stepper__line ${lineCls}"></div>` : '';
              return `<div class="quiz-stepper__item ${cls}"><div class="quiz-stepper__circle">${label}</div></div>${line}`;
            }).join('')}
          </div>
          <div class="quiz-content" id="quiz-step-content">
            ${getStepContent(currentStep, answers)}
          </div>
          <div class="quiz-actions">
            ${currentStep > 1 ? '<button class="btn btn--ghost" id="quiz-back">← Back</button>' : '<div></div>'}
            ${currentStep < TOTAL_STEPS
              ? '<button class="btn btn--primary" id="quiz-next">Continue →</button>'
              : `<button class="btn btn--primary" id="quiz-finish">
                  ${isAIAvailable() ? '✦ Generate My Profile' : '✦ Generate Profile'}
                </button>`
            }
          </div>
        </div>
      </div>
    `;
    container.innerHTML = content;
    addQuizStyles();
    bindStepEvents(currentStep, answers, container);

    const backBtn = container.querySelector('#quiz-back');
    const nextBtn = container.querySelector('#quiz-next');
    const finishBtn = container.querySelector('#quiz-finish');

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        collectStepAnswers(currentStep, answers, container);
        currentStep--;
        renderStep();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        collectStepAnswers(currentStep, answers, container);
        currentStep++;
        renderStep();
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener('click', async () => {
        collectStepAnswers(currentStep, answers, container);

        if (!isAIAvailable()) {
          window.showToast('Please set your Gemini API key in Settings first.', 'error');
          window.showSettings();
          return;
        }

        finishBtn.disabled = true;
        finishBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';

        let statusEl = container.querySelector('#generation-status');
        if (!statusEl) {
          statusEl = document.createElement('p');
          statusEl.id = 'generation-status';
          statusEl.style.cssText = 'font-size: var(--text-xs); color: var(--text-tertiary); text-align: center; margin-top: var(--space-sm);';
          finishBtn.parentElement.appendChild(statusEl);
        }
        statusEl.textContent = 'Analysing your preferences...';

        const result = await generateProfile(answers);

        if (result.success) {
          result.profile.username = answers.username || 'Anonymous';
          storage.setProfile(result.profile);
          storage.clearQuizState();
          renderRecommendations(container, result.profile, navigate);
          window.showToast('Your olfactory profile has been created! ✦');
        } else {
          finishBtn.disabled = false;
          finishBtn.innerHTML = '✦ Generate My Profile';
          statusEl.textContent = '';
          window.showToast(result.error || 'Failed to generate profile.', 'error');
        }
      });
    }
  }

  renderStep();
}

function getStepContent(step, answers) {
  switch (step) {
    case 1:
      return `
        <div class="quiz-step-centered">
          <h2 class="quiz-title">Welcome! What should we call you?</h2>
          <p class="quiz-subtitle">This name will appear on your posts and comments in the community.</p>
          <div class="input-group" style="max-width: 480px; margin: 0 auto;">
            <input type="text" class="input" id="quiz-username" placeholder="Enter your username..." value="${answers.username || ''}" />
          </div>
        </div>
      `;

    case 2:
      return `
        <h2 class="quiz-title">Which scent families draw you in?</h2>
        <p class="quiz-subtitle">Select all that resonate with you.</p>
        <div class="quiz-grid quiz-grid--families">
          ${SCENT_FAMILIES.map(f => `
            <div class="quiz-option quiz-option--img-card ${answers.scentFamilies.includes(f.id) ? 'quiz-option--selected' : ''}" data-value="${f.id}" id="family-${f.id}">
              <img class="quiz-option__img" src="${SCENT_FAMILY_IMGS[f.id]}" alt="${f.name}" loading="lazy" decoding="async" />
            </div>
          `).join('')}
        </div>
      `;

    case 3:
      return `
        <h2 class="quiz-title">Perfumes you know and love</h2>
        <p class="quiz-subtitle">Select any fragrances you've worn or enjoyed.</p>
        <div class="quiz-search-container">
          <input type="text" class="input quiz-search" id="perfume-search" placeholder="Search by brand or name..." />
        </div>
        <div class="quiz-perfume-list" id="perfume-list">
          ${renderPerfumeList(answers.knownPerfumes, '')}
        </div>
        <p class="quiz-hint">Selected: ${answers.knownPerfumes.length} perfume${answers.knownPerfumes.length !== 1 ? 's' : ''}</p>
      `;

    case 4:
      return `
        <div class="quiz-step-centered">
          <h2 class="quiz-title">Performance Preferences</h2>
          <p class="quiz-subtitle">How do you like your fragrance to behave?</p>
        </div>
        <div class="quiz-sliders">
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Sillage (Projection)</span>
              <span class="slider-value" id="sillage-val">${answers.sillage}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${answers.sillage}" id="slider-sillage" style="--pct: ${(answers.sillage - 1) / 9 * 100}%" />
            <div class="slider-labels"><span>Intimate</span><span>Room-filling</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Longevity</span>
              <span class="slider-value" id="longevity-val">${answers.longevity}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${answers.longevity}" id="slider-longevity" style="--pct: ${(answers.longevity - 1) / 9 * 100}%" />
            <div class="slider-labels"><span>Few hours</span><span>All day</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Intensity</span>
              <span class="slider-value" id="intensity-val">${answers.intensity}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${answers.intensity}" id="slider-intensity" style="--pct: ${(answers.intensity - 1) / 9 * 100}%" />
            <div class="slider-labels"><span>Subtle</span><span>Bold</span></div>
          </div>
        </div>
      `;

    case 5:
      return `
        <h2 class="quiz-title">What describes you best?</h2>
        <p class="quiz-subtitle">Choose the personality trait that resonates most with your style.</p>
        <div class="quiz-grid quiz-grid--context">
          ${[
            { id: 'elegant',     name: 'Elegant & Classic',      desc: 'Timeless sophistication' },
            { id: 'adventurous', name: 'Adventurous & Bold',     desc: 'Love discovering the new' },
            { id: 'romantic',    name: 'Romantic & Dreamy',      desc: 'Soft, poetic, emotional' },
            { id: 'minimalist',  name: 'Minimalist & Clean',     desc: 'Less is more' },
            { id: 'creative',    name: 'Creative & Expressive',  desc: 'Unique, unconventional' },
            { id: 'confident',   name: 'Confident & Powerful',   desc: 'Commands attention' },
          ].map(ctx => `
            <div class="quiz-option quiz-option--img-card ${answers.personality === ctx.id ? 'quiz-option--selected' : ''}" data-value="${ctx.id}" id="ctx-${ctx.id}">
              <img class="quiz-option__img" src="${TRAIT_IMGS[ctx.id]}" alt="${ctx.name}" loading="lazy" decoding="async" />
            </div>
          `).join('')}
        </div>
        <div class="input-group mt-lg">
          <label class="input-label">Any additional notes? (optional)</label>
          <textarea class="input" id="quiz-notes" placeholder="E.g., I love the smell of rain, old books, or fresh coffee...">${answers.notes || ''}</textarea>
        </div>
      `;
  }
}

function renderPerfumeList(selected, filter) {
  const filtered = filter
    ? LOREAL_LUXE_PERFUMES.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.brand.toLowerCase().includes(filter.toLowerCase())
      )
    : LOREAL_LUXE_PERFUMES;

  const brands = {};
  filtered.forEach(p => {
    if (!brands[p.brand]) brands[p.brand] = [];
    brands[p.brand].push(p);
  });

  return Object.entries(brands).map(([brand, perfumes]) => `
    <div class="perfume-brand-group">
      <p class="perfume-brand-label">${brand}</p>
      <div class="perfume-brand-items">
        ${perfumes.map(p => `
          <div class="quiz-option quiz-option--perfume ${selected.includes(p.id) ? 'quiz-option--selected' : ''}" data-value="${p.id}">
            <span class="quiz-option__name">${p.name}</span>
            <span class="quiz-option__desc">${p.family}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function bindStepEvents(step, answers, container) {
  if (step === 2) {
    container.querySelectorAll('.quiz-grid--families .quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.dataset.value;
        if (answers.scentFamilies.includes(val)) {
          answers.scentFamilies = answers.scentFamilies.filter(f => f !== val);
          opt.classList.remove('quiz-option--selected');
        } else {
          answers.scentFamilies.push(val);
          opt.classList.add('quiz-option--selected');
        }
      });
    });
  }

  if (step === 3) {
    const searchInput = container.querySelector('#perfume-search');
    const listEl = container.querySelector('#perfume-list');

    const updateList = (filter) => {
      listEl.innerHTML = renderPerfumeList(answers.knownPerfumes, filter);
      listEl.querySelectorAll('.quiz-option--perfume').forEach(opt => {
        opt.addEventListener('click', () => {
          const val = opt.dataset.value;
          if (answers.knownPerfumes.includes(val)) {
            answers.knownPerfumes = answers.knownPerfumes.filter(p => p !== val);
            opt.classList.remove('quiz-option--selected');
          } else {
            answers.knownPerfumes.push(val);
            opt.classList.add('quiz-option--selected');
          }
          container.querySelector('.quiz-hint').textContent = `Selected: ${answers.knownPerfumes.length} perfume${answers.knownPerfumes.length !== 1 ? 's' : ''}`;
        });
      });
    };

    searchInput.addEventListener('input', (e) => updateList(e.target.value));
    updateList('');
  }

  if (step === 4) {
    ['sillage', 'longevity', 'intensity'].forEach(key => {
      const slider = container.querySelector(`#slider-${key}`);
      const valEl = container.querySelector(`#${key}-val`);
      if (slider) {
        slider.addEventListener('input', () => {
          answers[key] = parseInt(slider.value);
          valEl.textContent = `${slider.value}/10`;
          slider.style.setProperty('--pct', `${(parseInt(slider.value) - 1) / 9 * 100}%`);
        });
      }
    });
  }

  if (step === 5) {
    container.querySelectorAll('.quiz-grid--context .quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.quiz-grid--context .quiz-option').forEach(o => o.classList.remove('quiz-option--selected'));
        opt.classList.add('quiz-option--selected');
        answers.personality = opt.dataset.value;
      });
    });
  }
}

function collectStepAnswers(step, answers, container) {
  if (step === 1) {
    const input = container.querySelector('#quiz-username');
    if (input) answers.username = input.value.trim();
  }
  if (step === 5) {
    const notes = container.querySelector('#quiz-notes');
    if (notes) answers.notes = notes.value;
  }
}

// ── Post-Quiz: Recommendations ──
function renderRecommendations(container, profile, navigate) {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Generate spray-heavy combinations from 6 regions
  const regionCombos = generateRegionCombinations(profile);
  const mixedCombos = generateMixedCombinations(profile);

  container.innerHTML = `
    <div class="page__container">
      <div class="profile-result">
        <div class="profile-hero">
          <p class="profile-hero__label">Your Olfactory Profile</p>
          <h1 class="profile-hero__title">${profile.archetypeName || 'Your Scent Identity'}</h1>
        </div>

        <div class="profile-summary-card card mt-xl">
          <p class="profile-summary-card__desc">${profile.description || 'Your unique olfactory archetype has been defined.'}</p>

          <div class="profile-summary-card__divider"></div>

          <div class="profile-summary-card__meta">
            ${profile.notePreferences ? `
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Note Preferences</p>
              <div class="profile-summary-card__notes">
                <div><span class="note-label note-label--love">♥ Love</span><span class="note-values">${(profile.notePreferences.loves || []).join(', ')}</span></div>
                <div><span class="note-label note-label--explore">✦ Explore</span><span class="note-values">${(profile.notePreferences.explore || []).join(', ')}</span></div>
                <div><span class="note-label note-label--avoid">↓ Avoid</span><span class="note-values">${(profile.notePreferences.avoid || []).join(', ')}</span></div>
              </div>
            </div>` : ''}
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Scent Families</p>
              <ul class="profile-families-list">
                ${(profile.primaryFamilies || []).map(f => `<li>${f}</li>`).join('')}
              </ul>
              <p class="profile-summary-card__sillage">Sillage — ${profile.sillageProfile || 'Medium'}</p>
            </div>
          </div>
        </div>

        <!-- Region-Only Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Recommended Combinations — Mon Accord</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Sprays and oils from our 6 world regions, curated for your profile.</p>
          <div class="recommendation-grid">
            ${regionCombos.map(combo => renderComboCard(combo, { showBuyButton: true })).join('')}
          </div>
        </div>

        <!-- Mixed Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Extended Combinations — with L'Oréal Luxe</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Combine Mon Accord scents with iconic luxury perfumes.</p>
          <div class="recommendation-grid">
            ${mixedCombos.map(combo => renderComboCard(combo)).join('')}
          </div>
        </div>

        <div class="profile-actions mt-xl text-center">
          <button class="btn btn--primary btn--lg" id="go-to-shop">Shop Now →</button>
          <button class="btn btn--secondary btn--lg" id="go-to-lab">Enter the Lab</button>
          <button class="btn btn--ghost" id="retake-quiz">Retake Quiz</button>
        </div>
      </div>
    </div>
  `;

  addQuizStyles();

  container.querySelector('#go-to-shop').addEventListener('click', () => navigate('#shop'));
  container.querySelectorAll('[data-buy-combo]').forEach(btn => {
    btn.addEventListener('click', () => {
      const perfumeIds = btn.dataset.comboIds
        .split(',')
        .map(id => id.trim())
        .filter(Boolean);
      storage.setPendingShopCart(perfumeIds);
      navigate('#shop');
    });
  });
  container.querySelector('#go-to-lab').addEventListener('click', () => navigate('#lab'));
  container.querySelector('#retake-quiz').addEventListener('click', () => {
    window.__retakeQuiz = true;
    storage.clearQuizState();
    renderProfileQuiz(container, navigate);
  });
}

function renderComboCard(combo, options = {}) {
  const comboIds = (combo.productIds || []).join(',');
  return `
    <div class="combo-card card">
      <h4 class="combo-card__name">${combo.name}</h4>
      <div class="combo-card__layers">
        ${combo.layers.map(l => {
          const r = l.regionData;
          return `<p style="font-size: var(--text-sm); margin-bottom: 2px;">
            <span style="color: ${r?.color || 'var(--accent)'};">${r?.icon || '•'}</span>
            ${l.amount} ${l.unit} — <strong>${l.name}</strong>
          </p>`;
        }).join('')}
      </div>
      ${options.showBuyButton && combo.productIds?.length ? `
        <button class="btn btn--primary combo-card__buy" data-buy-combo="true" data-combo-ids="${comboIds}">
          Buy this combination
        </button>
      ` : ''}
    </div>
  `;
}

function generateRegionCombinations(profile) {
  const owned = storage.getOwnedPerfumes();
  const ownedIds = owned.monAccord || [];

  // Build layer from a perfume id
  function layer(id, amount) {
    const p = getPerfumeById(id);
    if (!p) return null;
    const r = REGIONS.find(rg => rg.id === p.region);
    return { id: p.id, name: p.name, amount, unit: p.format === 'spray' ? 'sprays' : 'drops', regionData: r };
  }

  // Prefer owned Mon Accord perfumes in the first slots
  const ownedSprays = ownedIds.filter(id => getPerfumeById(id)?.format === 'spray');
  const ownedOils = ownedIds.filter(id => getPerfumeById(id)?.format === 'oil');

  const fallback = (format, excludeIds = []) =>
    PERFUMES.find(p => p.format === format && !excludeIds.includes(p.id));

  const spray1 = ownedSprays[0] || fallback('spray', [])?.id || 'scandinavian-spray';
  const spray2 = ownedSprays[1] || fallback('spray', [spray1])?.id || 'mediterranean-spray';
  const spray3 = ownedSprays[2] || fallback('spray', [spray1, spray2])?.id || 'middleeast-spray';
  const oil1 = ownedOils[0] || fallback('oil', [])?.id || 'eastasia-oil';
  const oil2 = ownedOils[1] || fallback('oil', [oil1])?.id || 'southafrica-oil';

  return [
    {
      name: 'Morning Clarity',
      description: ownedIds.length ? `Built around your ${getPerfumeById(spray1)?.name || 'collection'} — crisp and bright for daytime.` : 'A crisp, bright opening with spray-forward projection, anchored by a subtle oil base.',
      layers: [layer(spray1, 3), layer(spray2, 2), layer(oil1, 1)].filter(Boolean),
    },
    {
      name: 'Golden Evening',
      description: ownedIds.length ? `Your ${getPerfumeById(spray3)?.name || 'spray'} takes centre stage in this warm evening blend.` : 'A warm, opulent blend of spray richness over deep oil.',
      layers: [layer(spray3, 3), layer(oil2, 2), layer(spray2, 1)].filter(Boolean),
    },
    {
      name: 'Signature Blend',
      description: ownedIds.length ? 'A layering of your owned collection that showcases your personal scent identity.' : 'A balanced blend drawing from multiple regions.',
      layers: [layer(spray1, 2), layer(spray3, 2), layer(oil1, 1)].filter(Boolean),
    },
  ].map(combo => ({
    ...combo,
    productIds: [...new Set(combo.layers.map(layer => layer.id).filter(Boolean))],
  }));
}

function generateMixedCombinations(profile) {
  const owned = storage.getOwnedPerfumes();
  const ownedLoreal = owned.loreal || [];
  const ownedMonAccord = owned.monAccord || [];

  function maLayer(id, amount) {
    const p = getPerfumeById(id);
    if (!p) return null;
    return { id: p.id, name: p.name, amount, unit: p.format === 'spray' ? 'sprays' : 'drops', regionData: REGIONS.find(r => r.id === p.region) };
  }

  function lorealLayer(id, amount) {
    const p = LOREAL_LUXE_PERFUMES.find(lp => lp.id === id);
    if (!p) return null;
    return { name: `${p.brand} ${p.name}`, amount, unit: 'sprays', regionData: { icon: '✦', color: 'var(--accent)' } };
  }

  // If user has owned L'Oréal perfumes, use those first
  const lorealIds = ownedLoreal.length ? ownedLoreal : ['ysl-libre', 'ysl-black-opium', 'armani-my-way'];
  const maIds = ownedMonAccord.length ? ownedMonAccord : ['scandinavian-spray', 'southafrica-spray', 'mediterranean-spray', 'eastasia-oil', 'southamerica-oil', 'middleeast-oil'];

  const fallbackMA = (format, exclude = []) => PERFUMES.find(p => p.format === format && !exclude.includes(p.id))?.id;

  const l1 = lorealIds[0] || 'ysl-libre';
  const l2 = lorealIds[1] || 'ysl-black-opium';
  const l3 = lorealIds[2] || 'armani-my-way';
  const ma1spray = maIds.find(id => getPerfumeById(id)?.format === 'spray') || fallbackMA('spray');
  const ma2spray = maIds.filter(id => getPerfumeById(id)?.format === 'spray')[1] || fallbackMA('spray', [ma1spray]);
  const ma1oil = maIds.find(id => getPerfumeById(id)?.format === 'oil') || fallbackMA('oil');

  const owned1 = LOREAL_LUXE_PERFUMES.find(p => p.id === l1);
  const owned2 = LOREAL_LUXE_PERFUMES.find(p => p.id === l2);
  const owned3 = LOREAL_LUXE_PERFUMES.find(p => p.id === l3);

  return [
    {
      name: owned1 ? `${owned1.name} Accord` : 'Libre Accord',
      description: owned1 ? `Your ${owned1.brand} ${owned1.name} elevated with Mon Accord layering.` : 'YSL Libre layered with Scandinavian freshness for a modern twist.',
      layers: [lorealLayer(l1, 2), maLayer(ma1spray, 2), maLayer(ma1oil, 1)].filter(Boolean),
    },
    {
      name: owned2 ? `${owned2.name} Fusion` : 'Velvet Opium',
      description: owned2 ? `${owned2.brand} ${owned2.name} deepened with Mon Accord warmth.` : 'Black Opium\'s coffee-vanilla paired with depth and warmth.',
      layers: [lorealLayer(l2, 2), maLayer(ma2spray || ma1spray, 2), maLayer(ma1oil, 1)].filter(Boolean),
    },
    {
      name: owned3 ? `${owned3.name} Journey` : 'Mediterranean Way',
      description: owned3 ? `${owned3.brand} ${owned3.name} blended with complementary Mon Accord scents.` : 'Armani My Way paired with Mediterranean sunshine.',
      layers: [lorealLayer(l3, 2), maLayer(ma1spray, 2), maLayer(ma1oil, 1)].filter(Boolean),
    },
  ];
}

// ── Profile Result (for returning users) ──
function renderProfileResult(container, profile, navigate) {
  renderRecommendations(container, profile, navigate);
}

function addQuizStyles() {
  if (document.getElementById('quiz-styles')) return;
  const style = document.createElement('style');
  style.id = 'quiz-styles';
  style.textContent = `
    /* ── Quiz layout ── */
    .quiz-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: var(--space-3xl) var(--space-2xl);
    }

    /* ── Step indicator ── */
    .quiz-stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-3xl);
    }

    .quiz-stepper__item {
      display: flex;
      align-items: center;
    }

    .quiz-stepper__circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--text-tertiary);
      background: var(--surface);
      transition: all var(--transition-base);
      position: relative;
      z-index: 1;
      flex-shrink: 0;
    }

    .quiz-stepper__item.active .quiz-stepper__circle {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
      box-shadow: 0 0 0 5px rgba(200,169,126,0.15);
    }

    .quiz-stepper__item.completed .quiz-stepper__circle {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent);
    }

    .quiz-stepper__line {
      width: 56px;
      height: 2px;
      background: var(--border);
      transition: background var(--transition-base);
    }

    .quiz-stepper__line.done {
      background: linear-gradient(90deg, var(--accent), rgba(200,169,126,0.3));
    }

    /* ── Step content animation ── */
    .quiz-content {
      animation: quizStepIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes quizStepIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Titles ── */
    .quiz-title {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 500;
      margin-bottom: var(--space-sm);
      line-height: 1.2;
    }

    .quiz-subtitle {
      font-size: var(--text-base);
      color: var(--text-secondary);
      margin-bottom: var(--space-xl);
      line-height: 1.6;
    }

    .quiz-step-centered { text-align: center; padding: var(--space-2xl) 0; }

    /* ── Option grids ── */
    .quiz-grid { display: grid; gap: var(--space-md); }
    .quiz-grid--families,
    .quiz-grid--context {
      gap: 3px;
      overflow: hidden;
      border-radius: 0;
      -webkit-mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      -webkit-mask-composite: destination-in;
      mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      mask-composite: intersect;
    }
    .quiz-grid--families { grid-template-columns: repeat(5, 1fr); }
    .quiz-grid--context  { grid-template-columns: repeat(3, 1fr); }

    .quiz-option {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl) var(--space-md);
      cursor: pointer;
      transition: border-color var(--transition-fast), background var(--transition-fast),
                  transform var(--transition-fast), box-shadow var(--transition-fast);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      min-height: 130px;
    }

    .quiz-option:hover {
      border-color: var(--accent-light);
      background: var(--accent-bg);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .quiz-option--selected {
      border-color: var(--accent);
      background: var(--accent-bg);
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .quiz-option__icon { font-size: 2.2rem; line-height: 1; display: block; }
    .quiz-option__name { font-weight: 600; font-size: var(--text-sm); color: var(--text-primary); display: block; }
    .quiz-option__desc { font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.4; display: block; }

    .quiz-option--img-card {
      padding: 0;
      overflow: hidden;
      gap: 0;
      justify-content: flex-start;
      min-height: unset;
      border: none;
      border-radius: 0;
      position: relative;
      transform: none;
    }

    .quiz-option--img-card:hover { transform: none; box-shadow: none; background: transparent; border-color: transparent; }

    .quiz-option__img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
      flex-shrink: 0;
      transition: transform 0.35s ease, filter 0.25s ease;
      filter: brightness(0.65);
      -webkit-mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      -webkit-mask-composite: destination-in;
      mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      mask-composite: intersect;
    }

    .quiz-option--img-card:hover .quiz-option__img {
      transform: scale(1.05);
      filter: brightness(0.85);
    }

    .quiz-option--img-card.quiz-option--selected .quiz-option__img {
      transform: scale(1.05);
      filter: brightness(1);
    }

    .quiz-option--img-card.quiz-option--selected::after {
      content: '✓';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 26px;
      height: 26px;
      background: var(--accent);
      color: #fff;
      border-radius: 50%;
      font-size: 13px;
      font-weight: 700;
      line-height: 26px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    /* ── Actions ── */
    .quiz-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--space-2xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border);
    }

    /* ── Sliders ── */
    .quiz-sliders {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
      max-width: 560px;
      margin: 0 auto;
    }

    .slider-container { display: flex; flex-direction: column; }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
    }

    .slider-label { font-size: var(--text-base); font-weight: 600; }
    .slider-value { font-size: var(--text-sm); font-weight: 700; color: var(--accent); min-width: 40px; text-align: right; }

    input[type="range"].slider-range {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(90deg, var(--accent) var(--pct, 50%), var(--bg-tertiary) var(--pct, 50%));
      outline: none;
      cursor: pointer;
    }

    input[type="range"].slider-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent);
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(200,169,126,0.45);
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    input[type="range"].slider-range::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 14px rgba(200,169,126,0.65);
    }

    input[type="range"].slider-range::-moz-range-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent);
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(200,169,126,0.45);
      cursor: pointer;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      margin-top: var(--space-sm);
    }

    /* ── Perfume list ── */
    .quiz-search-container { margin-bottom: var(--space-md); }
    .quiz-search { width: 100%; }
    .quiz-perfume-list {
      overflow-y: auto;
      max-height: calc(100vh - 380px);
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--surface);
    }
    .perfume-brand-group { position: relative; }
    .perfume-brand-label {
      position: sticky; top: 0; z-index: 2;
      font-size: var(--text-sm); font-weight: 700;
      color: var(--text-primary); background: var(--bg-secondary);
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border);
      letter-spacing: 0.01em;
    }
    .perfume-brand-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
    }
    .quiz-option--perfume {
      text-align: left;
      padding: var(--space-sm) var(--space-md);
      min-height: unset;
      flex-direction: row;
      justify-content: flex-start;
      gap: var(--space-sm);
    }
    .quiz-hint { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-sm); }

    /* ── Profile result ── */
    .profile-result { margin: 0 auto; }

    .profile-hero { text-align: center; padding: var(--space-2xl) 0 var(--space-lg); }
    .profile-hero__label {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }
    .profile-hero__title {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 500;
      line-height: 1.1;
      color: var(--text-primary);
      margin: 0;
    }

    .profile-summary-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }
    .profile-summary-card__desc {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }
    .profile-summary-card__divider {
      height: 1px;
      background: var(--border);
    }
    .profile-summary-card__meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-lg);
    }
    .profile-summary-card__heading {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      margin-bottom: var(--space-sm);
    }
    .profile-families-list {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-sm);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .profile-families-list li {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text-primary);
      padding-left: var(--space-md);
      position: relative;
    }
    .profile-families-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }
    .profile-summary-card__sillage {
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      margin-top: var(--space-xs);
    }
    .profile-summary-card__notes { display: flex; flex-direction: column; gap: 6px; }
    .profile-summary-card__notes > div { display: flex; align-items: baseline; gap: var(--space-sm); }
    .note-label {
      font-size: var(--text-xs);
      font-weight: 700;
      white-space: nowrap;
      min-width: 64px;
    }
    .note-label--love    { color: #4CAF50; }
    .note-label--explore { color: var(--accent); }
    .note-label--avoid   { color: var(--text-tertiary); }
    .note-values { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; }

    .profile-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
    .recommendation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-md); }
    .combo-card { display: flex; flex-direction: column; }
    .combo-card__name { font-size: var(--text-lg); font-family: var(--font-display); margin-bottom: var(--space-md); }
    .combo-card__layers { flex: 1; }
    .combo-card__buy { width: 100%; margin-top: var(--space-md); }

    @media (max-width: 1024px) { .profile-overview { grid-template-columns: 1fr; } }
    @media (max-width: 900px) {
      .quiz-grid--families { grid-template-columns: repeat(2, 1fr); }
      .quiz-grid--context  { grid-template-columns: repeat(2, 1fr); }
      .perfume-brand-items { grid-template-columns: 1fr; }
      .quiz-stepper__line { width: 32px; }
    }
  `;
  document.head.appendChild(style);
}
