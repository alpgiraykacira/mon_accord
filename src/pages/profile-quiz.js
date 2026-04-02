// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Profile Quiz Page
// ═══════════════════════════════════════════════════════════════

import { SCENT_FAMILIES, REGIONS, PERFUMES, LOREAL_LUXE_PERFUMES, getPerfumeById } from '../data/perfumes.js';
import { generateProfile } from '../services/profile-engine.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';

const TOTAL_STEPS = 4;

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
          <div class="quiz-progress">
            <div class="quiz-progress__bar" style="width: ${(currentStep / TOTAL_STEPS) * 100}%"></div>
          </div>
          <p class="quiz-step-label">Step ${currentStep} of ${TOTAL_STEPS}</p>
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
        statusEl.textContent = 'Analyzing your preferences with AI...';

        const result = await generateProfile(answers);

        if (result.success) {
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
        <h2 class="quiz-title">Which scent families draw you in?</h2>
        <p class="quiz-subtitle">Select all that resonate with you.</p>
        <div class="quiz-grid quiz-grid--families">
          ${SCENT_FAMILIES.map(f => `
            <div class="quiz-option ${answers.scentFamilies.includes(f.id) ? 'quiz-option--selected' : ''}" data-value="${f.id}" id="family-${f.id}">
              <span class="quiz-option__icon">${f.icon}</span>
              <span class="quiz-option__name">${f.name}</span>
              <span class="quiz-option__desc">${f.description}</span>
            </div>
          `).join('')}
        </div>
      `;

    case 2:
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

    case 3:
      return `
        <h2 class="quiz-title">Performance Preferences</h2>
        <p class="quiz-subtitle">How do you like your fragrance to behave?</p>
        <div class="quiz-sliders">
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Sillage (Projection)</span>
              <span class="slider-value" id="sillage-val">${answers.sillage}/10</span>
            </div>
            <input type="range" min="1" max="10" value="${answers.sillage}" id="slider-sillage" />
            <div class="slider-labels"><span>Intimate</span><span>Room-filling</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Longevity</span>
              <span class="slider-value" id="longevity-val">${answers.longevity}/10</span>
            </div>
            <input type="range" min="1" max="10" value="${answers.longevity}" id="slider-longevity" />
            <div class="slider-labels"><span>Few hours</span><span>All day</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Intensity</span>
              <span class="slider-value" id="intensity-val">${answers.intensity}/10</span>
            </div>
            <input type="range" min="1" max="10" value="${answers.intensity}" id="slider-intensity" />
            <div class="slider-labels"><span>Subtle</span><span>Bold</span></div>
          </div>
        </div>
      `;

    case 4:
      return `
        <h2 class="quiz-title">What describes you best?</h2>
        <p class="quiz-subtitle">Choose the personality trait that resonates most with your style.</p>
        <div class="quiz-grid quiz-grid--context">
          ${[
            { id: 'elegant', name: 'Elegant & Classic', icon: '👑', desc: 'Timeless sophistication' },
            { id: 'adventurous', name: 'Adventurous & Bold', icon: '🌍', desc: 'Love discovering the new' },
            { id: 'romantic', name: 'Romantic & Dreamy', icon: '🌙', desc: 'Soft, poetic, emotional' },
            { id: 'minimalist', name: 'Minimalist & Clean', icon: '✨', desc: 'Less is more' },
            { id: 'creative', name: 'Creative & Expressive', icon: '🎨', desc: 'Unique, unconventional' },
            { id: 'confident', name: 'Confident & Powerful', icon: '🔥', desc: 'Commands attention' },
          ].map(ctx => `
            <div class="quiz-option ${answers.personality === ctx.id ? 'quiz-option--selected' : ''}" data-value="${ctx.id}" id="ctx-${ctx.id}">
              <span class="quiz-option__icon">${ctx.icon}</span>
              <span class="quiz-option__name">${ctx.name}</span>
              <span class="quiz-option__desc">${ctx.desc}</span>
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
  if (step === 1) {
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

  if (step === 2) {
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

  if (step === 3) {
    ['sillage', 'longevity', 'intensity'].forEach(key => {
      const slider = container.querySelector(`#slider-${key}`);
      const valEl = container.querySelector(`#${key}-val`);
      if (slider) {
        slider.addEventListener('input', () => {
          answers[key] = parseInt(slider.value);
          valEl.textContent = `${slider.value}/10`;
        });
      }
    });
  }

  if (step === 4) {
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
  if (step === 4) {
    const notes = container.querySelector('#quiz-notes');
    if (notes) answers.notes = notes.value;
  }
}

// ── Post-Quiz: Recommendations ──
function renderRecommendations(container, profile, navigate) {
  // Generate spray-heavy combinations from 6 regions
  const regionCombos = generateRegionCombinations(profile);
  const mixedCombos = generateMixedCombinations(profile);

  container.innerHTML = `
    <div class="page__container">
      <div class="profile-result">
        <div class="section-header">
          <p class="section-label">Your Olfactory Profile</p>
          <h2 class="section-title">${profile.archetypeName || 'Your Scent Identity'}</h2>
        </div>

        <div class="ai-response" id="profile-description">
          <div class="ai-response__label">✦ Your Scent Identity</div>
          <div class="ai-response__text">
            <p>${profile.description || 'Your unique olfactory archetype has been defined.'}</p>
          </div>
        </div>

        <!-- Merged Cards -->
        <div class="profile-details mt-xl">
          <div class="grid grid--2">
            <div class="card">
              <h4 style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Scent Families & Sillage</h4>
              <div class="flex gap-sm mb-sm" style="flex-wrap: wrap;">
                ${(profile.primaryFamilies || []).map(f => `<span class="tag tag--accent">${f}</span>`).join('')}
              </div>
              <p style="font-size: var(--text-sm); color: var(--accent); font-weight: 600;">Sillage: ${profile.sillageProfile || 'Medium'}</p>
            </div>
            <div class="card">
              <h4 style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Note Preferences</h4>
              ${profile.notePreferences ? `
                <div style="margin-bottom: var(--space-xs);">
                  <span style="font-size: var(--text-xs); color: #4CAF50; font-weight: 600;">♥ Love: </span>
                  <span style="font-size: var(--text-xs);">${(profile.notePreferences.loves || []).join(', ')}</span>
                </div>
                <div style="margin-bottom: var(--space-xs);">
                  <span style="font-size: var(--text-xs); color: var(--accent); font-weight: 600;">✦ Explore: </span>
                  <span style="font-size: var(--text-xs);">${(profile.notePreferences.explore || []).join(', ')}</span>
                </div>
                <div>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: 600;">↓ Avoid: </span>
                  <span style="font-size: var(--text-xs);">${(profile.notePreferences.avoid || []).join(', ')}</span>
                </div>
              ` : '<p style="font-size: var(--text-xs); color: var(--text-tertiary);">Not available yet.</p>'}
            </div>
          </div>
        </div>

        <!-- Region-Only Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Recommended Combinations — Mon Accord</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Sprays and oils from our 6 world regions, curated for your profile.</p>
          <div class="recommendation-grid">
            ${regionCombos.map(combo => renderComboCard(combo)).join('')}
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
  container.querySelector('#go-to-lab').addEventListener('click', () => navigate('#lab'));
  container.querySelector('#retake-quiz').addEventListener('click', () => {
    window.__retakeQuiz = true;
    storage.clearQuizState();
    renderProfileQuiz(container, navigate);
  });
}

function renderComboCard(combo) {
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
      <p class="combo-card__desc">${combo.description}</p>
    </div>
  `;
}

function generateRegionCombinations(profile) {
  const families = profile.primaryFamilies || ['woody', 'oriental'];
  
  // Spray-heavy combinations
  return [
    {
      name: 'Morning Clarity',
      description: 'A crisp, bright opening with spray-forward projection, anchored by a subtle oil base.',
      layers: [
        { name: 'Scandinavian Spray', amount: 3, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'scandinavian') },
        { name: 'Mediterranean Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'mediterranean') },
        { name: 'East Asia Oil', amount: 1, unit: 'drops', regionData: REGIONS.find(r => r.id === 'eastasia') },
      ]
    },
    {
      name: 'Golden Evening',
      description: 'A warm, opulent blend of Middle Eastern spray richness over South African oil depth.',
      layers: [
        { name: 'Middle East Spray', amount: 3, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'middleeast') },
        { name: 'South Africa Oil', amount: 2, unit: 'drops', regionData: REGIONS.find(r => r.id === 'southafrica') },
        { name: 'South America Spray', amount: 1, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'southamerica') },
      ]
    },
    {
      name: 'Tropical Bloom',
      description: 'Vibrant spray layers from South America and Mediterranean, grounded with East Asian oil.',
      layers: [
        { name: 'South America Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'southamerica') },
        { name: 'East Asia Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'eastasia') },
        { name: 'Mediterranean Oil', amount: 1, unit: 'drops', regionData: REGIONS.find(r => r.id === 'mediterranean') },
      ]
    },
  ];
}

function generateMixedCombinations(profile) {
  return [
    {
      name: 'Libre Accord',
      description: 'YSL Libre layered with Scandinavian freshness for a modern twist on a classic.',
      layers: [
        { name: 'YSL Libre EDP', amount: 2, unit: 'sprays', regionData: { icon: '✦', color: 'var(--accent)' } },
        { name: 'Scandinavian Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'scandinavian') },
        { name: 'Middle East Oil', amount: 1, unit: 'drops', regionData: REGIONS.find(r => r.id === 'middleeast') },
      ]
    },
    {
      name: 'Velvet Opium',
      description: 'Black Opium\'s coffee-vanilla paired with South African depth and South American cocoa.',
      layers: [
        { name: 'Black Opium EDP', amount: 2, unit: 'sprays', regionData: { icon: '✦', color: 'var(--accent)' } },
        { name: 'South Africa Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'southafrica') },
        { name: 'South America Oil', amount: 1, unit: 'drops', regionData: REGIONS.find(r => r.id === 'southamerica') },
      ]
    },
    {
      name: 'Mediterranean Way',
      description: 'Armani My Way paired with Mediterranean sunshine and East Asian serenity.',
      layers: [
        { name: 'My Way EDP', amount: 2, unit: 'sprays', regionData: { icon: '✦', color: 'var(--accent)' } },
        { name: 'Mediterranean Spray', amount: 2, unit: 'sprays', regionData: REGIONS.find(r => r.id === 'mediterranean') },
        { name: 'East Asia Oil', amount: 1, unit: 'drops', regionData: REGIONS.find(r => r.id === 'eastasia') },
      ]
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
    .quiz-container { max-width: 720px; margin: 0 auto; padding: var(--space-3xl) 0; }
    .quiz-progress { height: 3px; background: var(--bg-tertiary); border-radius: var(--radius-full); margin-bottom: var(--space-sm); overflow: hidden; }
    .quiz-progress__bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-dark)); border-radius: var(--radius-full); transition: width var(--transition-slow); }
    .quiz-step-label { font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); margin-bottom: var(--space-2xl); }
    .quiz-title { font-size: var(--text-3xl); margin-bottom: var(--space-sm); }
    .quiz-subtitle { font-size: var(--text-base); color: var(--text-secondary); margin-bottom: var(--space-xl); }
    .quiz-grid { display: grid; gap: var(--space-sm); }
    .quiz-grid--families { grid-template-columns: repeat(2, 1fr); }
    .quiz-grid--context { grid-template-columns: repeat(3, 1fr); }
    .quiz-option { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-md); cursor: pointer; transition: all var(--transition-fast); text-align: center; }
    .quiz-option:hover { border-color: var(--accent-light); background: var(--accent-bg); }
    .quiz-option--selected { border-color: var(--accent); background: var(--accent-bg); box-shadow: var(--shadow-gold); }
    .quiz-option__icon { display: block; font-size: 1.5rem; margin-bottom: 4px; }
    .quiz-option__name { display: block; font-weight: 600; font-size: var(--text-sm); margin-bottom: 2px; }
    .quiz-option__desc { display: block; font-size: var(--text-xs); color: var(--text-tertiary); }
    .quiz-actions { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2xl); padding-top: var(--space-xl); border-top: 1px solid var(--border); }
    .quiz-sliders { display: flex; flex-direction: column; gap: var(--space-xl); }
    .slider-labels { display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 4px; }
    .quiz-search-container { margin-bottom: var(--space-md); }
    .quiz-search { width: 100%; }
    .quiz-perfume-list { max-height: 350px; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-md); padding-right: var(--space-sm); }
    .perfume-brand-group { margin-bottom: var(--space-sm); }
    .perfume-brand-label { font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: var(--space-xs); padding-bottom: 4px; border-bottom: 1px solid var(--border); }
    .perfume-brand-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-xs); }
    .quiz-option--perfume { text-align: left; padding: var(--space-sm) var(--space-md); }
    .quiz-hint { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-sm); }
    .profile-result { max-width: 900px; margin: 0 auto; padding: var(--space-3xl) 0; }
    .profile-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
    .recommendation-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
    .combo-card { display: flex; flex-direction: column; }
    .combo-card__name { font-size: var(--text-lg); font-family: var(--font-display); margin-bottom: var(--space-md); }
    .combo-card__layers { margin-bottom: var(--space-md); }
    .combo-card__desc { font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.6; margin-top: auto; }

    @media (max-width: 1024px) { .recommendation-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) {
      .quiz-grid--families, .quiz-grid--context { grid-template-columns: repeat(2, 1fr); }
      .perfume-brand-items { grid-template-columns: 1fr; }
      .recommendation-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}
