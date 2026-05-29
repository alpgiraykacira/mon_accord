// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Layering Lab Page (Main Experience)
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';
import { generateScentSimulation } from '../services/profile-engine.js';
import { getContextualRecommendation, MOODS, OCCASIONS, SEASONS, INTENSITIES } from '../services/contextual-advisor.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';
import { showSaveToVaultModal } from '../utils/save-modal.js';

const BADGE_IMGS = {
  scandinavian: new URL('../assets/layering_lab_badges/scandinavian.webp',   import.meta.url).href,
  eastasia:     new URL('../assets/layering_lab_badges/east_asia.webp',      import.meta.url).href,
  southafrica:  new URL('../assets/layering_lab_badges/south_africa.webp',   import.meta.url).href,
  mediterranean:new URL('../assets/layering_lab_badges/mediterranean.webp',  import.meta.url).href,
  southamerica: new URL('../assets/layering_lab_badges/south_america.webp',  import.meta.url).href,
  middleeast:   new URL('../assets/layering_lab_badges/middle_east.webp',    import.meta.url).href,
};

const PERFUME_IMGS = {
  scandinavian: new URL('../assets/perfumes/scandinavian.webp',   import.meta.url).href,
  eastasia:     new URL('../assets/perfumes/east_asia.webp',      import.meta.url).href,
  southafrica:  new URL('../assets/perfumes/south_africa.webp',   import.meta.url).href,
  mediterranean:new URL('../assets/perfumes/mediterranean.webp',  import.meta.url).href,
  southamerica: new URL('../assets/perfumes/south_america.webp',  import.meta.url).href,
  middleeast:   new URL('../assets/perfumes/middle_east.webp',    import.meta.url).href,
};

const OIL_IMGS = {
  scandinavian: new URL('../assets/oils/scandinavian.webp',   import.meta.url).href,
  eastasia:     new URL('../assets/oils/east_asia.webp',      import.meta.url).href,
  southafrica:  new URL('../assets/oils/south_africa.webp',   import.meta.url).href,
  mediterranean:new URL('../assets/oils/mediterranean.webp',  import.meta.url).href,
  southamerica: new URL('../assets/oils/south_america.webp',  import.meta.url).href,
  middleeast:   new URL('../assets/oils/middle_east.webp',    import.meta.url).href,
};

const LAB_STATE_KEY = 'lab_session_state';

function saveLabState(state) {
  try { sessionStorage.setItem(LAB_STATE_KEY, JSON.stringify(state)); } catch {}
}

function loadLabState() {
  try { return JSON.parse(sessionStorage.getItem(LAB_STATE_KEY) || 'null'); } catch { return null; }
}

export function renderLayeringLab(container, navigate) {
  // Restore persisted state
  const saved = loadLabState();
  let layers = saved?.layers || [];
  let scentSimulation = saved?.scentSimulation || null;
  let isSimulating = false;
  let contextResult = saved?.contextResult || null;
  let isAdvising = false;
  let selectedMood = saved?.selectedMood || null;
  let selectedOccasion = saved?.selectedOccasion || null;
  let selectedSeason = saved?.selectedSeason || null;
  let selectedTime = saved?.selectedTime || null;
  let selectedIntensity = saved?.selectedIntensity || 5;

  function persistState() {
    saveLabState({ layers, scentSimulation, contextResult, selectedMood, selectedOccasion, selectedSeason, selectedTime, selectedIntensity });
  }

  // Check for pending perfumes from Lab/Explorer/Community
  const pending = JSON.parse(sessionStorage.getItem('labPending') || '[]');
  if (pending.length > 0) {
    pending.forEach(id => {
      const p = getPerfumeById(id);
      if (p && !layers.find(l => l.perfumeId === id)) {
        layers.push({ perfumeId: id, amount: p.format === 'spray' ? 2 : 3, unit: p.format === 'spray' ? 'sprays' : 'drops' });
      }
    });
    sessionStorage.removeItem('labPending');
    persistState();
  }

  function render() {
    container.innerHTML = `
      <div class="page__container">

        <div class="lab-page-header">
          <p class="lab-page-header__label">The Lab</p>
          <h1 class="lab-page-header__title">Compose Your Signature</h1>
          <p class="lab-page-header__desc">Layer fragrances from six world regions — combine sprays with oils for depth and longevity.</p>
        </div>

        <div class="lab-layout">

          <!-- Col 1: Advisor + Select Layers -->
          <div class="lab-left-col">

            <div class="lab-advisor">
              <div class="lab-advisor__header">
                <h3 class="lab-advisor__title">✦ Curated for Your Profile</h3>
                <p class="lab-advisor__subtitle">Set the mood and moment — we'll compose a formula aligned with your olfactory identity.</p>
              </div>

              <div class="lab-advisor__form">
                <div class="input-group">
                  <label class="input-label">Mood</label>
                  <div class="lab-advisor__chips" id="mood-chips">
                    ${MOODS.map(m => `<button class="lab-chip ${selectedMood === m.id ? 'lab-chip--active' : ''}" data-value="${m.id}">${m.icon} ${m.name}</button>`).join('')}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Occasion</label>
                  <div class="lab-advisor__chips" id="occasion-chips">
                    ${OCCASIONS.map(o => `<button class="lab-chip ${selectedOccasion === o.id ? 'lab-chip--active' : ''}" data-value="${o.id}">${o.icon} ${o.name}</button>`).join('')}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Season</label>
                  <div class="lab-advisor__chips" id="season-chips">
                    ${SEASONS.map(s => `<button class="lab-chip ${selectedSeason === s.id ? 'lab-chip--active' : ''}" data-value="${s.id}">${s.icon} ${s.name}</button>`).join('')}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Time of Day</label>
                  <div class="lab-advisor__chips" id="time-chips">
                    ${['Morning', 'Afternoon', 'Evening', 'Night'].map(t => `<button class="lab-chip ${selectedTime === t.toLowerCase() ? 'lab-chip--active' : ''}" data-value="${t.toLowerCase()}">${t}</button>`).join('')}
                  </div>
                </div>

                <div class="slider-container">
                  <div class="slider-header">
                    <span class="slider-label">Intensity</span>
                    <span class="slider-value" id="advisor-intensity-val">${(INTENSITIES.find(i => i.value === selectedIntensity) || {}).name || 'Moderate'}</span>
                  </div>
                  <input type="range" min="1" max="9" value="${selectedIntensity}" step="2" id="advisor-intensity" />
                </div>

                <button class="btn btn--primary w-full" id="btn-get-advice" ${isAdvising ? 'disabled' : ''}>
                  ${isAdvising ? '<span class="loading-spinner"></span> Crafting...' : '✦ Get Recommendation'}
                </button>
                <button class="btn btn--ghost w-full" id="btn-clear-recommendation">Clear</button>
              </div>

              ${contextResult ? `
                <div class="lab-advisor__result mt-lg" id="advisor-result">
                  <div class="ai-response">
                    <div class="ai-response__label">✦ ${contextResult.formulaName || 'Your Formula'}</div>
                    <div class="ai-response__text ai-response__text--compact">
                      ${contextResult.reasoning ? `<p>${truncateText(contextResult.reasoning, 150)}</p>` : ''}
                      ${contextResult.scentPreview ? `<p><em>${truncateText(contextResult.scentPreview, 100)}</em></p>` : ''}
                      ${contextResult.tips ? `<p style="color: var(--accent); font-size: var(--text-xs);">◈ ${truncateText(contextResult.tips, 100)}</p>` : ''}
                    </div>
                  </div>
                  ${contextResult.layers?.length > 0 ? `
                    <button class="btn btn--primary w-full mt-md" id="btn-apply-recommendation">✦ Apply This Formula</button>
                  ` : ''}
                </div>
              ` : ''}
            </div>

            <div class="lab-add-section" id="lab-add-section">
              <p class="lab-section-label">Select Layers</p>
              <div class="lab-perfume-selector">
                ${REGIONS.map(r => {
                  const spray = PERFUMES.find(p => p.region === r.id && p.format === 'spray');
                  const oil   = PERFUMES.find(p => p.region === r.id && p.format === 'oil');
                  const sprayAdded = spray && layers.find(l => l.perfumeId === spray.id);
                  const oilAdded   = oil   && layers.find(l => l.perfumeId === oil.id);
                  return `
                    <div class="lab-region-group" style="--region-color: ${r.color};">
                      <p class="lab-region-label">${r.name}</p>
                      <div class="lab-bottle-row">
                        ${spray ? `
                          <button class="lab-bottle-btn ${sprayAdded ? 'lab-bottle-btn--added' : ''}" data-id="${spray.id}" style="--region-color: ${r.color};" title="${r.name} Spray">
                            <img src="${PERFUME_IMGS[r.id]}" alt="${r.name} Spray" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">SPRAY</span>
                            ${sprayAdded ? '<div class="lab-bottle-check">✓</div>' : ''}
                          </button>` : ''}
                        ${oil ? `
                          <button class="lab-bottle-btn ${oilAdded ? 'lab-bottle-btn--added' : ''}" data-id="${oil.id}" style="--region-color: ${r.color};" title="${r.name} Oil">
                            <img src="${OIL_IMGS[r.id]}" alt="${r.name} Oil" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">OIL</span>
                            ${oilAdded ? '<div class="lab-bottle-check">✓</div>' : ''}
                          </button>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

          <!-- Col 2: Canvas (sticky) -->
          <div class="lab-canvas">
            <p class="lab-section-label">Your Canvas</p>

            <div class="lab-layers" id="lab-layers">
              ${layers.length === 0 ? `
                <div class="lab-empty">
                  <p class="lab-empty__symbol">◈</p>
                  <p class="lab-empty__text">Your canvas is empty</p>
                  <p class="lab-empty__hint">Select fragrances to begin composing your accord.</p>
                </div>
              ` : layers.map((layer, idx) => {
                const p = getPerfumeById(layer.perfumeId);
                const r = REGIONS.find(rg => rg.id === p.region);
                return `
                  <div class="lab-layer" data-idx="${idx}" style="--region-color: ${r.color};">
                    <div class="lab-layer__bg" style="background-image: url('${BADGE_IMGS[r.id]}')"></div>
                    <div class="lab-layer__content">
                      <div class="lab-layer__header">
                        <div class="lab-layer__identity">
                          <div class="lab-layer__info">
                            <span class="lab-layer__name">${p.name}</span>
                          </div>
                        </div>
                        <button class="lab-layer__remove" data-idx="${idx}" title="Remove">✕</button>
                      </div>
                      <span class="lab-layer__notes">${p.topNotes.slice(0, 2).join(', ')} · ${p.baseNotes[0]}</span>
                      <div class="lab-layer__footer">
                        <div class="lab-layer__amount">
                          <button class="lab-layer__amount-btn" data-action="decrease" data-idx="${idx}">−</button>
                          <span class="lab-layer__amount-value">${layer.amount}</span>
                          <button class="lab-layer__amount-btn" data-action="increase" data-idx="${idx}">+</button>
                          <span class="lab-layer__amount-unit">${layer.unit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            ${layers.length > 0 ? `
              <div class="lab-actions" id="lab-actions">
                <button class="btn btn--primary" id="btn-simulate">
                  ${isSimulating ? '<span class="loading-spinner"></span> Simulating...' : '✦ Simulate Scent'}
                </button>
                <button class="btn btn--secondary" id="btn-save-formula">Save to Vault</button>
                <button class="btn btn--ghost" id="btn-clear-layers">Clear All</button>
              </div>
            ` : ''}

            ${scentSimulation ? `
              <div class="ai-response mt-lg" id="simulation-result">
                <div class="ai-response__label">✦ Scent Portrait</div>
                <div class="ai-response__text">
                  ${formatSimulationText(scentSimulation)}
                </div>
              </div>
            ` : ''}
          </div>

        </div>
      </div>
    `;

    addLabStyles();
    bindLabEvents();
  }

  function bindLabEvents() {
    // Add perfume buttons
    container.querySelectorAll('.lab-bottle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const existing = layers.findIndex(l => l.perfumeId === id);
        if (existing >= 0) {
          layers.splice(existing, 1);
        } else {
          const p = getPerfumeById(id);
          layers.push({ perfumeId: id, amount: p.format === 'spray' ? 2 : 3, unit: p.format === 'spray' ? 'sprays' : 'drops' });
        }
        scentSimulation = null;
        persistState();
        render();
      });
    });

    // Layer controls
    container.querySelectorAll('.lab-layer__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        layers.splice(parseInt(btn.dataset.idx), 1);
        scentSimulation = null;
        persistState();
        render();
      });
    });

    container.querySelectorAll('.lab-layer__amount-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        if (btn.dataset.action === 'increase') {
          layers[idx].amount = Math.min(layers[idx].amount + 1, 10);
        } else {
          layers[idx].amount = Math.max(layers[idx].amount - 1, 1);
        }
        persistState();
        render();
      });
    });

    // Simulate scent
    const simBtn = container.querySelector('#btn-simulate');
    if (simBtn) {
      simBtn.addEventListener('click', async () => {
        isSimulating = true;
        render();
        const result = await generateScentSimulation(layers);
        isSimulating = false;
        if (result.success) {
          scentSimulation = result.text;
          persistState();
          render();
          setTimeout(() => {
            const canvas = document.querySelector('.lab-canvas');
            if (canvas) canvas.scrollTo({ top: canvas.scrollHeight, behavior: 'smooth' });
          }, 500);
        } else {
          window.showToast(result.text || 'Simulation failed.', 'error');
          render();
        }
      });
    }

    // Save formula
    const saveBtn = container.querySelector('#btn-save-formula');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        showSaveModal(layers, scentSimulation);
      });
    }

    // Clear
    const clearBtn = container.querySelector('#btn-clear-layers');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        layers = [];
        scentSimulation = null;
        persistState();
        render();
      });
    }

    // Chip selection
    ['mood', 'occasion', 'season', 'time'].forEach(group => {
      container.querySelectorAll(`#${group}-chips .lab-chip`).forEach(chip => {
        chip.addEventListener('click', () => {
          container.querySelectorAll(`#${group}-chips .lab-chip`).forEach(c => c.classList.remove('lab-chip--active'));
          chip.classList.add('lab-chip--active');
          // Persist selection in state
          const val = chip.dataset.value;
          if (group === 'mood') selectedMood = val;
          else if (group === 'occasion') selectedOccasion = val;
          else if (group === 'season') selectedSeason = val;
          else if (group === 'time') selectedTime = val;
          persistState();
        });
      });
    });

    // Intensity slider
    const intensitySlider = container.querySelector('#advisor-intensity');
    if (intensitySlider) {
      intensitySlider.addEventListener('input', () => {
        selectedIntensity = parseInt(intensitySlider.value);
        const intensity = INTENSITIES.find(i => i.value === selectedIntensity);
        container.querySelector('#advisor-intensity-val').textContent = intensity?.name || 'Moderate';
        persistState();
      });
    }

    // Get advice
    const adviceBtn = container.querySelector('#btn-get-advice');
    if (adviceBtn) {
      adviceBtn.addEventListener('click', async () => {
        const mood = container.querySelector('#mood-chips .lab-chip--active')?.dataset.value;
        const occasion = container.querySelector('#occasion-chips .lab-chip--active')?.dataset.value;
        const season = container.querySelector('#season-chips .lab-chip--active')?.dataset.value;
        const timeOfDay = container.querySelector('#time-chips .lab-chip--active')?.dataset.value;
        const intensity = INTENSITIES.find(i => i.value === parseInt(container.querySelector('#advisor-intensity')?.value || 5))?.name || 'moderate';

        isAdvising = true;
        render();

        const result = await getContextualRecommendation({ mood, occasion, season, timeOfDay, intensity });
        isAdvising = false;

        if (result.success) {
          contextResult = result.recommendation;
          persistState();
          render();
          setTimeout(() => {
            const canvas = document.querySelector('.lab-canvas');
            if (canvas) canvas.scrollTo({ top: canvas.scrollHeight, behavior: 'smooth' });
          }, 500);
        } else {
          window.showToast(result.error || 'Advice failed.', 'error');
          render();
        }
      });
    }

    // Apply recommendation
    const applyBtn = container.querySelector('#btn-apply-recommendation');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        if (contextResult?.layers) {
          layers = contextResult.layers.map(l => ({
            perfumeId: l.perfumeId,
            amount: l.amount,
            unit: l.unit || (l.perfumeId.includes('oil') ? 'drops' : 'sprays'),
          })).filter(l => getPerfumeById(l.perfumeId));
          scentSimulation = null;
          persistState();
          render();
          window.showToast('Formula applied! Try simulating the scent.');
        }
      });
    }

    // Clear recommendation
    const clearRecBtn = container.querySelector('#btn-clear-recommendation');
    if (clearRecBtn) {
      clearRecBtn.addEventListener('click', () => {
        contextResult = null;
        selectedMood = null;
        selectedOccasion = null;
        selectedSeason = null;
        selectedTime = null;
        persistState();
        render();
      });
    }
  }

  function showSaveModal(layers, simulation) {
    const enrichedLayers = layers.map(l => {
      const p = getPerfumeById(l.perfumeId);
      return { ...l, name: p?.name || l.perfumeId };
    });
    showSaveToVaultModal({
      id: 'f-' + Date.now(),
      layers: enrichedLayers,
      simulation,
      createdAt: Date.now(),
    }, { showNameInput: true });
  }

  // Demo hook: lets page-demos.js inject a contextResult and re-render
  window.__labSetDemoContext = (ctx) => {
    contextResult = ctx;
    render();
  };

  render();
}

function getPerfumesByRegionLocal(regionId) {
  return PERFUMES.filter(p => p.region === regionId);
}

function truncateText(text, maxLen = 150) {
  if (!text || text.length <= maxLen) return text;
  return text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function formatSimulationText(text) {
  if (!text) return '';
  return text
    .split('\n')
    .filter(line => line.trim())
    .filter(line => !line.match(/^(OVERALL|SILLAGE)/i))
    .map(line => {
      if (line.match(/^(OPENING|HEART|DRY DOWN)/i)) {
        const colonIdx = line.indexOf(':');
        const label = line.substring(0, colonIdx).trim();
        const body = line.substring(colonIdx + 1).trim();
        return `<p class="sim-section"><span class="sim-label">${label}</span><span class="sim-body">${body}</span></p>`;
      }
      return `<p>${line}</p>`;
    })
    .join('');
}

function addLabStyles() {
  if (document.getElementById('lab-styles')) return;
  const style = document.createElement('style');
  style.id = 'lab-styles';
  style.textContent = `
    /* ── Page Header ── */
    .lab-page-header {
      text-align: center;
      padding: var(--space-2xl) 0 var(--space-2xl);
    }
    .lab-page-header__label {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }
    .lab-page-header__title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 500;
      line-height: 1.1;
      margin-bottom: var(--space-sm);
    }
    .lab-page-header__desc {
      font-size: var(--text-base);
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ── Layout ── */
    .lab-layout {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-2xl);
      align-items: start;
    }

    .lab-left-col {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    .lab-canvas {
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
      max-height: calc(100vh - var(--nav-height) - var(--space-lg) * 2);
      overflow-y: auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      scrollbar-width: thin;
      scrollbar-color: var(--border) transparent;
    }
    .lab-canvas::-webkit-scrollbar { width: 4px; }
    .lab-canvas::-webkit-scrollbar-track { background: transparent; }
    .lab-canvas::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .lab-canvas > * { flex-shrink: 0; }

    /* ── Section label ── */
    .lab-section-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--space-md);
    }

    /* ── Add Section ── */
    .lab-add-section {
      margin-bottom: var(--space-md);
    }

    .lab-perfume-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
    }

    .lab-region-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .lab-region-label {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--region-color);
      text-align: center;
    }

    .lab-bottle-row {
      display: flex;
      gap: 6px;
    }

    .lab-bottle-btn {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 4px 6px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--bg-primary);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      overflow: hidden;
    }

    .lab-bottle-btn:hover {
      border-color: var(--region-color);
      background: var(--surface);
    }

    .lab-bottle-btn--added {
      border-color: var(--region-color);
      background: color-mix(in srgb, var(--region-color) 8%, transparent);
    }

    .lab-bottle-img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      display: block;
      pointer-events: none;
    }

    .lab-bottle-type {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
    }

    .lab-bottle-btn--added .lab-bottle-type {
      color: var(--region-color);
    }

    .lab-bottle-check {
      position: absolute;
      top: 4px;
      right: 5px;
      font-size: 10px;
      font-weight: 700;
      color: var(--region-color);
    }

    /* ── Format badges ── */
    .lab-format-badge {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.04em;
      padding: 2px 5px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .lab-format-badge--spray {
      background: rgba(99, 132, 255, 0.12);
      color: #6384ff;
    }
    .lab-format-badge--oil {
      background: rgba(200, 169, 126, 0.18);
      color: var(--accent-dark);
    }

    /* ── Layers ── */
    .lab-layers {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
    }

    .lab-empty {
      text-align: center;
      padding: var(--space-2xl) var(--space-xl);
      border: 1.5px dashed var(--border);
      border-radius: var(--radius-lg);
    }
    .lab-empty__symbol {
      font-size: 2rem;
      color: var(--border);
      margin-bottom: var(--space-sm);
      line-height: 1;
    }
    .lab-empty__text {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 4px;
    }
    .lab-empty__hint {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }

    .lab-layer {
      position: relative;
      overflow: hidden;
      background: var(--surface);
      border: 1px solid transparent;
      border-radius: var(--radius-lg);
      transition: box-shadow var(--transition-fast);
    }
    .lab-layer:hover { box-shadow: var(--shadow-sm); }

    .lab-layer__bg {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-size: auto 100%;
      background-position: right center;
      background-repeat: no-repeat;
      -webkit-mask-image: linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%);
      mask-image: linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%);
      pointer-events: none;
    }

    .lab-layer__content {
      position: relative;
      z-index: 1;
      padding: var(--space-md) var(--space-lg);
    }

    .lab-layer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-sm);
    }

    .lab-layer__identity {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex: 1;
      min-width: 0;
    }

    .lab-layer__info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .lab-layer__name {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lab-layer__remove {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      color: var(--text-tertiary);
      font-size: var(--text-xs);
      cursor: pointer;
      transition: all var(--transition-fast);
      background: none;
      border: none;
      flex-shrink: 0;
      margin-left: var(--space-sm);
    }
    .lab-layer__remove:hover { background: rgba(244,67,54,0.08); color: #F44336; }

    .lab-layer__footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .lab-layer__amount {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .lab-layer__amount-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      font-size: var(--text-base);
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .lab-layer__amount-btn:hover { border-color: var(--accent); color: var(--accent); }

    .lab-layer__amount-value {
      font-size: var(--text-lg);
      font-weight: 700;
      min-width: 24px;
      text-align: center;
    }

    .lab-layer__amount-unit {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__notes {
      font-size: var(--text-xs);
      color: var(--text-primary);
      text-align: left;
      display: block;
      margin: var(--space-sm) 0;
    }

    .lab-actions {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
    }

    /* ── Col 2: Advisor ── */
    .lab-advisor {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
    }

    .lab-advisor__header { margin-bottom: var(--space-lg); }

    .lab-advisor__title {
      font-size: var(--text-lg);
      font-weight: 600;
      margin-bottom: 6px;
    }

    .lab-advisor__subtitle {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .lab-advisor__form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .lab-advisor__result-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .lab-advisor__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .lab-chip {
      padding: 5px 12px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .lab-chip:hover { border-color: var(--accent-light); color: var(--accent-dark); }
    .lab-chip--active {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent-dark);
      font-weight: 600;
    }

    /* ── Simulation result sections ── */
    .sim-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: var(--space-md);
    }
    .sim-section:last-child { margin-bottom: 0; }
    .sim-label {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .sim-body {
      font-size: var(--text-sm);
      line-height: 1.65;
      color: var(--text-secondary);
    }

    @media (max-width: 1024px) {
      .lab-layout { grid-template-columns: 1fr; }
      .lab-canvas { position: static; }
    }
  `;
  document.head.appendChild(style);
}
