// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Explorer Page (Region-based Cards)
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';
import { storage } from '../utils/storage.js';

export function renderExplorer(container, navigate) {
  let selectedPerfume = null;

  function render() {
    container.innerHTML = `
      <div class="page__container">
        <div class="explorer-grid">
          ${REGIONS.map(r => {
            const sprays = PERFUMES.filter(p => p.region === r.id && p.format === 'spray');
            const oils = PERFUMES.filter(p => p.region === r.id && p.format === 'oil');
            return `
              <div class="explorer-region-card" style="--region-color: ${r.color}; --region-light: ${r.colorLight};">
                <div class="explorer-region-header" style="border-bottom: 2px solid ${r.color};">
                  <span class="explorer-region-icon">${r.icon}</span>
                  <div>
                    <h3 class="explorer-region-name">${r.name}</h3>
                    <p class="explorer-region-tagline">${r.tagline}</p>
                  </div>
                </div>

                <div class="explorer-region-body">
                  <!-- Sprays -->
                  <div class="explorer-format-section">
                    <p class="explorer-format-label">💨 Sprays</p>
                    ${sprays.map(p => `
                      <div class="explorer-perfume-row" data-id="${p.id}">
                        <div>
                          <span class="explorer-perfume-name">${p.name}</span>
                          <span class="explorer-perfume-family">${p.scentFamily}</span>
                        </div>
                        <div class="explorer-perfume-actions">
                          <button class="explorer-detail-btn" data-id="${p.id}" title="Details">ⓘ</button>
                          <button class="explorer-add-btn" data-id="${p.id}" title="Add to Lab">+</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Oils -->
                  <div class="explorer-format-section">
                    <p class="explorer-format-label">💧 Oils</p>
                    ${oils.map(p => `
                      <div class="explorer-perfume-row" data-id="${p.id}">
                        <div>
                          <span class="explorer-perfume-name">${p.name}</span>
                          <span class="explorer-perfume-family">${p.scentFamily}</span>
                        </div>
                        <div class="explorer-perfume-actions">
                          <button class="explorer-detail-btn" data-id="${p.id}" title="Details">ⓘ</button>
                          <button class="explorer-add-btn" data-id="${p.id}" title="Add to Lab">+</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    addExplorerStyles();

    // Detail popup
    container.querySelectorAll('.explorer-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = getPerfumeById(btn.dataset.id);
        if (p) showDetailPopup(p);
      });
    });

    // Add to lab
    container.querySelectorAll('.explorer-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pending = JSON.parse(sessionStorage.getItem('labPending') || '[]');
        if (!pending.includes(btn.dataset.id)) pending.push(btn.dataset.id);
        sessionStorage.setItem('labPending', JSON.stringify(pending));
        window.showToast('Added to Layering Lab!');
      });
    });
  }

  render();
}

function showDetailPopup(perfume) {
  const r = REGIONS.find(rg => rg.id === perfume.region);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 480px;">
      <div class="modal__header">
        <h3 class="modal__title">${perfume.name}</h3>
        <button class="modal__close" id="close-detail">✕</button>
      </div>
      <div class="modal__body">
        <div class="flex gap-sm mb-md" style="flex-wrap: wrap;">
          <span class="tag" style="color: ${r?.color || 'inherit'};">${r?.icon || ''} ${r?.name || ''}</span>
          <span class="tag">${perfume.format === 'spray' ? '💨 Spray' : '💧 Oil'}</span>
          <span class="tag tag--accent">${perfume.scentFamily}</span>
          <span class="tag">${perfume.layeringRole}</span>
        </div>

        <div class="mb-md">
          <p style="font-size: var(--text-xs); font-weight: 600; color: var(--text-tertiary); margin-bottom: 4px;">TOP NOTES</p>
          <p style="font-size: var(--text-sm);">${perfume.topNotes.join(', ')}</p>
        </div>
        <div class="mb-md">
          <p style="font-size: var(--text-xs); font-weight: 600; color: var(--text-tertiary); margin-bottom: 4px;">MIDDLE NOTES</p>
          <p style="font-size: var(--text-sm);">${perfume.middleNotes.join(', ')}</p>
        </div>
        <div class="mb-md">
          <p style="font-size: var(--text-xs); font-weight: 600; color: var(--text-tertiary); margin-bottom: 4px;">BASE NOTES</p>
          <p style="font-size: var(--text-sm);">${perfume.baseNotes.join(', ')}</p>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="popup-close">Close</button>
        <button class="btn btn--primary" id="popup-add-lab">+ Add to Lab</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#close-detail').onclick = () => overlay.remove();
  overlay.querySelector('#popup-close').onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.querySelector('#popup-add-lab').onclick = () => {
    const pending = JSON.parse(sessionStorage.getItem('labPending') || '[]');
    if (!pending.includes(perfume.id)) pending.push(perfume.id);
    sessionStorage.setItem('labPending', JSON.stringify(pending));
    window.showToast(`${perfume.name} added to Lab!`);
    overlay.remove();
  };
}

function addExplorerStyles() {
  if (document.getElementById('explorer-styles')) return;
  const style = document.createElement('style');
  style.id = 'explorer-styles';
  style.textContent = `
    .explorer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-lg);
    }

    .explorer-region-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
      transition: all var(--transition-base);
      min-height: var(--card-min-feature);
      display: flex;
      flex-direction: column;
    }

    .explorer-region-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--region-color);
    }

    .explorer-region-header {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-lg);
    }

    .explorer-region-icon { font-size: 2rem; }
    .explorer-region-name { font-size: var(--text-lg); margin-bottom: 2px; }
    .explorer-region-tagline { font-size: var(--text-xs); color: var(--region-color); font-weight: 500; }

    .explorer-region-body {
      padding: var(--space-md) var(--space-lg) var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      flex: 1;
    }

    .explorer-format-section { margin-bottom: 0; }
    .explorer-format-section:last-child { margin-bottom: 0; }

    .explorer-format-label {
      font-size: var(--text-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
      margin-bottom: var(--space-xs);
      padding-bottom: 4px;
      border-bottom: 1px solid var(--border);
    }

    .explorer-perfume-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-xs) 0;
    }

    .explorer-perfume-name {
      display: block;
      font-size: var(--text-sm);
      font-weight: 500;
    }

    .explorer-perfume-family {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .explorer-perfume-actions {
      display: flex;
      gap: 4px;
    }

    .explorer-detail-btn, .explorer-add-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-tertiary);
      cursor: pointer;
      font-size: var(--text-xs);
      transition: all var(--transition-fast);
    }

    .explorer-detail-btn:hover { border-color: var(--accent-light); color: var(--accent); }
    .explorer-add-btn:hover { border-color: var(--accent); color: var(--accent-dark); background: var(--accent-bg); }

    @media (max-width: 640px) {
      .explorer-region-card { min-height: auto; }
    }
  `;
  document.head.appendChild(style);
}
