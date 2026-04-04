// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Layering Lab Page (Main Experience)
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';
import { generateScentSimulation } from '../services/profile-engine.js';
import { getContextualRecommendation, MOODS, OCCASIONS, SEASONS, INTENSITIES } from '../services/contextual-advisor.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';
import { showSaveToVaultModal } from '../utils/save-modal.js';

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
        <div class="lab-layout">

          <!-- Col 1: Workspace (add section + layers + actions + simulation) -->
          <div class="lab-workspace">
            <div class="lab-add-section" id="lab-add-section">
              <p class="lab-add-label">Add a layer</p>
              <div class="lab-perfume-selector">
                ${REGIONS.map(r => `
                  <div class="lab-region-group">
                    <p class="lab-region-label" style="color: ${r.color};">${r.icon} ${r.name}</p>
                    <div class="lab-region-items">
                      ${getPerfumesByRegionLocal(r.id).map(p => `
                        <button class="lab-add-btn ${layers.find(l => l.perfumeId === p.id) ? 'lab-add-btn--added' : ''}" data-id="${p.id}" style="--region-color: ${r.color};">
                          ${p.format === 'spray' ? '💨' : '💧'} ${p.format === 'spray' ? 'Spray' : 'Oil'}
                          ${layers.find(l => l.perfumeId === p.id) ? ' ✓' : ' +'}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="lab-layers" id="lab-layers">
              ${layers.length === 0 ? `
                <div class="lab-empty">
                  <p class="lab-empty__text">Add perfumes above to start layering.</p>
                  <p class="lab-empty__hint">Combine sprays and oils from different regions to create your unique blend.</p>
                </div>
              ` : layers.map((layer, idx) => {
                const p = getPerfumeById(layer.perfumeId);
                const r = REGIONS.find(rg => rg.id === p.region);
                return `
                  <div class="lab-layer" data-idx="${idx}" style="--region-color: ${r.color};">
                    <div class="lab-layer__header">
                      <div class="lab-layer__info">
                        <span class="lab-layer__icon">${r.icon}</span>
                        <div>
                          <span class="lab-layer__name">${p.name}</span>
                          <span class="lab-layer__meta">${p.scentFamily} · ${p.layeringRole}</span>
                        </div>
                      </div>
                      <button class="lab-layer__remove" data-idx="${idx}" title="Remove">✕</button>
                    </div>
                    <div class="lab-layer__controls">
                      <div class="lab-layer__amount">
                        <button class="lab-layer__amount-btn" data-action="decrease" data-idx="${idx}">−</button>
                        <span class="lab-layer__amount-value">${layer.amount}</span>
                        <button class="lab-layer__amount-btn" data-action="increase" data-idx="${idx}">+</button>
                        <span class="lab-layer__amount-unit">${layer.unit}</span>
                      </div>
                      <div class="lab-layer__notes">
                        Top: ${p.topNotes.slice(0, 2).join(', ')} · Base: ${p.baseNotes.slice(0, 2).join(', ')}
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
                <div class="ai-response__label">✦ Virtual Scent Simulation</div>
                <div class="ai-response__text">
                  ${formatSimulationText(scentSimulation)}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Col 2: Contextual Advisor -->
          <div class="lab-advisor">
            <div class="lab-advisor__header">
              <h3 class="lab-advisor__title">✦ Contextual Advisor</h3>
              <p class="lab-advisor__subtitle">Tell us the moment, we'll craft the formula.</p>
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
                ${contextResult.layers?.length > 0 ? `
                  <button class="btn btn--primary btn--sm w-full" id="btn-apply-recommendation" style="margin-bottom: var(--space-md);">✦ Apply This Formula</button>
                ` : ''}
                <div class="ai-response">
                  <div class="ai-response__label">✦ ${contextResult.formulaName || 'Recommendation'}</div>
                  <div class="ai-response__text ai-response__text--compact">
                    ${contextResult.reasoning ? `<p>${truncateText(contextResult.reasoning, 150)}</p>` : ''}
                    ${contextResult.scentPreview ? `<p><em>${truncateText(contextResult.scentPreview, 100)}</em></p>` : ''}
                    ${contextResult.tips ? `<p style="color: var(--accent); font-size: var(--text-xs);">💡 ${truncateText(contextResult.tips, 100)}</p>` : ''}
                  </div>
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
        contextResult = null;
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
    .lab-layout {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-2xl);
      align-items: start;
      max-width: 1680px;
    }

    /* ── Col 1: Workspace ── */
    .lab-workspace {
      display: flex;
      flex-direction: column;
    }

    /* ── Add Section ── */
    .lab-add-section {
      margin-bottom: var(--space-md);
    }

    .lab-add-label {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--space-sm);
    }

    .lab-perfume-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
    }

    .lab-region-group {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-sm);
      display: flex;
      flex-direction: column;
    }

    .lab-region-label {
      font-size: var(--text-xs);
      font-weight: 700;
      margin-bottom: var(--space-sm);
    }

    .lab-region-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .lab-add-btn {
      padding: 6px 10px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-align: left;
    }

    .lab-add-btn:hover {
      border-color: var(--region-color);
      color: var(--region-color);
      background: var(--surface);
    }

    .lab-add-btn--added {
      border-color: var(--region-color);
      background: rgba(0,0,0,0.02);
      color: var(--region-color);
      font-weight: 600;
    }

    /* ── Layers ── */
    .lab-layers {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }

    .lab-empty {
      text-align: center;
      padding: var(--space-md) var(--space-xl);
      border: 2px dashed var(--border);
      border-radius: var(--radius-lg);
    }

    .lab-empty__text {
      font-size: var(--text-lg);
      color: var(--text-tertiary);
      margin-bottom: var(--space-xs);
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
      transition: all var(--transition-fast);
    }

    .lab-layer:hover {
      box-shadow: var(--shadow-sm);
    }

    .lab-layer__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-sm);
    }

    .lab-layer__info {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .lab-layer__icon {
      font-size: 1.3rem;
    }

    .lab-layer__name {
      font-weight: 600;
      font-size: var(--text-sm);
      display: block;
    }

    .lab-layer__meta {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__remove {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      color: var(--text-tertiary);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
      background: none;
      border: none;
    }

    .lab-layer__remove:hover {
      background: rgba(244, 67, 54, 0.08);
      color: #F44336;
    }

    .lab-layer__controls {
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

    .lab-layer__amount-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .lab-layer__amount-value {
      font-size: var(--text-lg);
      font-weight: 700;
      min-width: 24px;
      text-align: center;
      color: var(--text-primary);
    }

    .lab-layer__amount-unit {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__notes {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-actions {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
    }

    /* ── Col 2: Advisor Panel ── */
    .lab-advisor {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
    }

    .lab-advisor__header {
      margin-bottom: var(--space-md);
    }

    .lab-advisor__title {
      font-size: var(--text-lg);
      margin-bottom: 4px;
    }

    .lab-advisor__subtitle {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
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
      padding: 6px 12px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lab-chip:hover {
      border-color: var(--accent-light);
      color: var(--accent-dark);
    }

    .lab-chip--active {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent-dark);
      font-weight: 600;
    }

    @media (max-width: 1024px) {
      .lab-layout {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}
