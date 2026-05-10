// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Layering Lab Page (Main Experience)
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';
import { generateScentSimulation } from '../services/profile-engine.js';
import { getContextualRecommendation, MOODS, OCCASIONS, SEASONS, INTENSITIES } from '../services/contextual-advisor.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';
import { showSaveToVaultModal } from '../utils/save-modal.js';

const REGION_IMGS = {
  scandinavian: new URL('../assets/scandinavian.png',   import.meta.url).href,
  eastasia:     new URL('../assets/east_asia.png',      import.meta.url).href,
  southafrica:  new URL('../assets/south_africa.png',   import.meta.url).href,
  mediterranean:new URL('../assets/mediterranean.png',  import.meta.url).href,
  southamerica: new URL('../assets/south_america.png',  import.meta.url).href,
  middleeast:   new URL('../assets/middle_east.png',    import.meta.url).href,
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
          <p class="lab-page-header__desc">Layer fragrances from six world regions — combine sprays for projection with oils for depth and longevity.</p>
        </div>

        <div class="lab-layout">

          <!-- Col 1: Select Layers + Advisor -->
          <div class="lab-left-col">

            <div class="lab-add-section" id="lab-add-section">
              <p class="lab-section-label">Select Layers</p>
              <div class="lab-perfume-selector">
                ${REGIONS.map(r => `
                  <div class="lab-region-group" style="--region-color: ${r.color};">
                    <div class="lab-region-layout">
                      <img class="lab-region-img" src="${REGION_IMGS[r.id]}" alt="${r.name}" />
                      <div class="lab-region-right">
                        <p class="lab-region-label">${r.name}</p>
                        <div class="lab-region-items">
                          ${getPerfumesByRegionLocal(r.id).map(p => {
                            const isAdded = layers.find(l => l.perfumeId === p.id);
                            return `
                              <button class="lab-add-btn ${isAdded ? 'lab-add-btn--added' : ''}" data-id="${p.id}" style="--region-color: ${r.color};">
                                <span class="lab-format-badge lab-format-badge--${p.format}">${p.format === 'spray' ? 'SPRAY' : 'OIL'}</span>
                                <span class="lab-add-btn__indicator">${isAdded ? '✓' : '+'}</span>
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

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
                    <div class="lab-layer__header">
                      <div class="lab-layer__identity">
                        <span class="lab-layer__region-icon">${r.icon}</span>
                        <div class="lab-layer__info">
                          <span class="lab-layer__name">${p.name}</span>
                          <span class="lab-layer__region">${r.name}</span>
                        </div>
                        <span class="lab-format-badge lab-format-badge--${p.format}">${p.format === 'spray' ? 'SPRAY' : 'OIL'}</span>
                      </div>
                      <button class="lab-layer__remove" data-idx="${idx}" title="Remove">✕</button>
                    </div>
                    <div class="lab-layer__footer">
                      <div class="lab-layer__amount">
                        <button class="lab-layer__amount-btn" data-action="decrease" data-idx="${idx}">−</button>
                        <span class="lab-layer__amount-value">${layer.amount}</span>
                        <button class="lab-layer__amount-btn" data-action="increase" data-idx="${idx}">+</button>
                        <span class="lab-layer__amount-unit">${layer.unit}</span>
                      </div>
                      <span class="lab-layer__notes">${p.topNotes.slice(0, 2).join(', ')} · ${p.baseNotes[0]}</span>
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
    container.querySelectorAll('.lab-add-btn').forEach(btn => {
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
        if (!isAIAvailable()) {
          window.showToast('Please set your Gemini API key in Settings.', 'error');
          window.showSettings();
          return;
        }
        isSimulating = true;
        render();
        const result = await generateScentSimulation(layers);
        isSimulating = false;
        if (result.success) {
          scentSimulation = result.text;
          persistState();
        } else {
          window.showToast(result.text || 'Simulation failed.', 'error');
        }
        render();
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
        if (!isAIAvailable()) {
          window.showToast('Please set your Gemini API key in Settings.', 'error');
          window.showSettings();
          return;
        }

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
        } else {
          window.showToast(result.error || 'Advice failed.', 'error');
        }
        render();
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
    .map(line => {
      if (line.match(/^(OPENING|HEART|DRY DOWN|OVERALL|SILLAGE)/i)) {
        const [label, ...rest] = line.split(':');
        return `<p><strong style="color: var(--accent);">${label.trim()}:</strong> ${rest.join(':').trim()}</p>`;
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
      display: flex;
      flex-direction: column;
    }

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
      margin-bottom: var(--space-xl);
    }

    .lab-perfume-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
    }

    .lab-region-group {
      background: transparent;
      border: none;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .lab-region-layout {
      display: flex;
      flex-direction: column;
    }

    .lab-region-img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      border-radius: var(--radius-md);
      display: block;
    }

    .lab-region-right {
      flex: 1;
      padding: var(--space-sm) 0;
      display: flex;
      flex-direction: column;
      background: transparent;
      border-left: none;
    }

    .lab-region-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--region-color);
      margin-bottom: var(--space-sm);
    }

    .lab-region-items {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }

    .lab-add-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 6px 8px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lab-add-btn:hover {
      border-color: var(--region-color);
      background: var(--surface);
    }

    .lab-add-btn--added {
      border-color: var(--region-color);
      background: color-mix(in srgb, var(--region-color) 6%, transparent);
    }

    .lab-add-btn__indicator {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--text-tertiary);
    }

    .lab-add-btn--added .lab-add-btn__indicator {
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
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--region-color);
      border-radius: var(--radius-md);
      padding: var(--space-md) var(--space-lg);
      transition: box-shadow var(--transition-fast);
    }
    .lab-layer:hover { box-shadow: var(--shadow-sm); }

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

    .lab-layer__region-icon { font-size: 1.2rem; flex-shrink: 0; }

    .lab-layer__info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .lab-layer__name {
      font-weight: 600;
      font-size: var(--text-base);
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lab-layer__region {
      font-size: var(--text-xs);
      color: var(--region-color);
      font-weight: 600;
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
      justify-content: space-between;
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
      color: var(--text-tertiary);
      text-align: right;
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

    @media (max-width: 1024px) {
      .lab-layout { grid-template-columns: 1fr; }
      .lab-canvas { position: static; }
    }
  `;
  document.head.appendChild(style);
}
