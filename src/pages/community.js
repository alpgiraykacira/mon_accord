// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Community Page (formerly Trends)
// ═══════════════════════════════════════════════════════════════

import { generateRemixSuggestion } from '../services/learning-engine.js';
import { getTrendingCombinations } from '../services/collective-intel.js';
import { getPerfumeById, REGIONS } from '../data/perfumes.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';
import { showSaveToVaultModal } from '../utils/save-modal.js';

export function renderCommunity(container, navigate) {
  const trending = getTrendingCombinations();
  const profile = storage.getProfile();
  let sortBy = 'likes';
  let activeFormulaId = null;

  // Calculate profile match % for each formula
  function getMatchPercent(formula) {
    if (!profile) return Math.floor(Math.random() * 40) + 30;
    let score = 50;
    const userFamilies = profile.primaryFamilies || [];
    (formula.layers || []).forEach(l => {
      const p = getPerfumeById(l.perfumeId);
      if (p) {
        const families = p.scentFamily.split('-');
        families.forEach(f => { if (userFamilies.includes(f)) score += 12; });
        if (profile.recommendedRegions?.includes(p.region)) score += 8;
      }
    });
    return Math.min(score, 98);
  }

  const formulasWithMatch = trending.map(f => ({ ...f, matchPercent: getMatchPercent(f) }));

  function getSortedFormulas() {
    const sorted = [...formulasWithMatch];
    if (sortBy === 'likes') sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    else if (sortBy === 'match') sorted.sort((a, b) => b.matchPercent - a.matchPercent);
    else if (sortBy === 'newest') sorted.sort((a, b) => (b.id > a.id ? 1 : -1));
    return sorted;
  }

  function render() {
    const sorted = getSortedFormulas();

    container.innerHTML = `
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">✦ Collective Intelligence</p>
          <h2 class="section-title">Community</h2>
          <p class="section-subtitle">Discover trending combinations, get AI suggestions, and connect with fellow fragrance lovers.</p>
        </div>

        <!-- AI Suggestion -->
        <div class="community-section">
          <h3 class="community-section-title">✦ AI Suggestion</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">
            Based on community trends and your preferences, here's something to try.
          </p>
          <div id="suggestion-container">
            <button class="btn btn--primary" id="btn-generate-suggestion">✦ Get AI Suggestion</button>
          </div>
        </div>

        <!-- Trending Combinations -->
        <div class="community-section mt-2xl">
          <div class="community-section-header">
            <h3 class="community-section-title">Trending Combinations</h3>
            <div class="community-sort">
              <button class="community-sort-btn ${sortBy === 'likes' ? 'community-sort-btn--active' : ''}" data-sort="likes">♥ Most Liked</button>
              <button class="community-sort-btn ${sortBy === 'match' ? 'community-sort-btn--active' : ''}" data-sort="match">✦ Best Match</button>
              <button class="community-sort-btn ${sortBy === 'newest' ? 'community-sort-btn--active' : ''}" data-sort="newest">🕐 Newest</button>
            </div>
          </div>
          <div class="community-trending-list">
            ${sorted.map((formula, i) => `
              <div class="community-trending-item ${activeFormulaId === formula.id ? 'community-trending-item--active' : ''}" data-id="${formula.id}" id="community-${formula.id}">
                <div class="community-trending-rank">${i + 1}</div>
                <div class="community-trending-content">
                  <div class="community-trending-top">
                    <h4 class="community-trending-name">${formula.name}</h4>
                    <div class="community-trending-match" style="color: ${formula.matchPercent > 70 ? '#4CAF50' : formula.matchPercent > 50 ? 'var(--accent)' : 'var(--text-tertiary)'};">
                      ${formula.matchPercent}% match
                    </div>
                  </div>
                  <div class="community-trending-layers">
                    ${(formula.layers || []).map(l => {
                      const p = getPerfumeById(l.perfumeId);
                      const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                      return `<span style="font-size: var(--text-xs); color: ${r?.color || 'var(--text-tertiary)'};">${r?.icon || ''} ${l.amount} ${l.unit} ${p?.name || ''}</span>`;
                    }).join(' <span style="color: var(--text-tertiary);">+</span> ')}
                  </div>
                  ${formula.description ? `<p class="community-trending-desc">${formula.description}</p>` : ''}
                </div>
                <div class="community-trending-actions">
                  <span class="community-trending-likes">♥ ${formula.likes || 0}</span>
                  <button class="btn btn--ghost btn--sm community-interact-btn" data-id="${formula.id}">💬</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    addCommunityStyles();

    // Sort buttons
    container.querySelectorAll('.community-sort-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sortBy = btn.dataset.sort;
        render();
      });
    });

    // Interaction buttons
    container.querySelectorAll('.community-interact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const formula = sorted.find(f => f.id === id);
        if (formula) showInteractionModal(formula);
      });
    });

    // Click on trending item
    container.querySelectorAll('.community-trending-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const formula = sorted.find(f => f.id === id);
        if (formula) showInteractionModal(formula);
      });
    });

    // AI Suggestion
    const suggestBtn = container.querySelector('#btn-generate-suggestion');
    if (suggestBtn) {
      suggestBtn.addEventListener('click', async () => {
        if (!isAIAvailable()) {
          window.showToast('Set your Gemini API key in Settings.', 'error');
          window.showSettings();
          return;
        }

        const sugContainer = container.querySelector('#suggestion-container');
        sugContainer.innerHTML = `
          <div class="card" style="padding: var(--space-2xl); text-align: center;">
            <span class="loading-spinner"></span>
            <p style="margin-top: var(--space-md); color: var(--text-tertiary);">Crafting a suggestion...</p>
          </div>
        `;

        const result = await generateRemixSuggestion();

        if (result.success && result.remix) {
          const remix = result.remix;
          sugContainer.innerHTML = `
            <div class="ai-response">
              <div class="ai-response__label">✦ ${remix.remixName || 'AI Suggestion'}</div>
              <div class="ai-response__text">
                ${remix.layers?.length > 0 ? `
                  <div style="margin-bottom: var(--space-md);">
                    ${remix.layers.map(l => {
                      const p = getPerfumeById(l.perfumeId);
                      const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                      return `<p>${r?.icon || '•'} ${l.amount} ${l.unit} of <strong>${p?.name || l.perfumeId}</strong></p>`;
                    }).join('')}
                  </div>
                ` : ''}
                ${remix.inspiration ? `<p><strong>Inspiration:</strong> ${remix.inspiration}</p>` : ''}
                ${remix.scentDescription ? `<p><em>${remix.scentDescription}</em></p>` : ''}
              </div>
            </div>
            <div class="flex gap-sm mt-md">
              <button class="btn btn--primary btn--sm" id="btn-load-suggestion">Load to Lab</button>
              <button class="btn btn--ghost btn--sm" id="btn-new-suggestion">Try Another</button>
            </div>
          `;

          const loadBtn = sugContainer.querySelector('#btn-load-suggestion');
          if (loadBtn) {
            loadBtn.addEventListener('click', () => {
              if (remix.layers?.length) {
                const ids = remix.layers.map(l => l.perfumeId).filter(id => getPerfumeById(id));
                sessionStorage.setItem('labPending', JSON.stringify(ids));
                navigate('#lab');
              }
            });
          }

          const newBtn = sugContainer.querySelector('#btn-new-suggestion');
          if (newBtn) {
            newBtn.addEventListener('click', () => {
              sugContainer.innerHTML = '<button class="btn btn--primary" id="btn-generate-suggestion">✦ Get AI Suggestion</button>';
              sugContainer.querySelector('#btn-generate-suggestion').addEventListener('click', suggestBtn.onclick);
            });
          }
        } else {
          sugContainer.innerHTML = `
            <div class="card" style="padding: var(--space-xl);">
              <p style="color: var(--text-tertiary);">${result.error || 'Unable to generate. Try again.'}</p>
              <button class="btn btn--ghost btn--sm mt-md" id="btn-retry-suggestion">Retry</button>
            </div>
          `;
        }
      });
    }
  }

  render();
}

function showInteractionModal(formula) {
  const comments = JSON.parse(localStorage.getItem('monaccord_comments_' + formula.id) || '[]');
  const isLiked = storage.isLiked(formula.id);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 600px;">
      <div class="modal__header">
        <h3 class="modal__title">${formula.name}</h3>
        <button class="modal__close" id="close-interaction">✕</button>
      </div>
      <div class="modal__body">
        <div style="margin-bottom: var(--space-lg);">
          ${(formula.layers || []).map(l => {
            const p = getPerfumeById(l.perfumeId);
            const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
            return `<p style="font-size: var(--text-sm); margin-bottom: 2px;"><span style="color: ${r?.color || 'inherit'};">${r?.icon || ''}</span> ${l.amount} ${l.unit} of <strong>${p?.name || ''}</strong></p>`;
          }).join('')}
        </div>
        ${formula.description ? `<p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-lg); line-height: 1.6;">${formula.description}</p>` : ''}
        
        <div class="flex gap-md mb-lg">
          <button class="btn ${isLiked ? 'btn--primary' : 'btn--secondary'} btn--sm" id="modal-like-btn">
            ${isLiked ? '♥ Liked' : '♡ Like'} (${formula.likes || 0})
          </button>
          <button class="btn btn--secondary btn--sm" id="modal-save-btn">⬇ Save to Vault</button>
        </div>

        <div class="divider--gold"></div>

        <h4 style="font-size: var(--text-sm); margin: var(--space-md) 0 var(--space-sm);">Comments</h4>
        <div id="comments-list" style="max-height: 200px; overflow-y: auto; margin-bottom: var(--space-md);">
          ${comments.length === 0 ? '<p style="font-size: var(--text-xs); color: var(--text-tertiary);">No comments yet. Be the first!</p>' :
            comments.map(c => `
              <div style="padding: var(--space-sm); background: var(--bg-secondary); border-radius: var(--radius-sm); margin-bottom: var(--space-xs);">
                <p style="font-size: var(--text-xs); font-weight: 600;">Anonymous</p>
                <p style="font-size: var(--text-sm);">${c.text}</p>
                <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(c.date).toLocaleDateString()}</span>
              </div>
            `).join('')}
        </div>
        <div class="flex gap-sm">
          <input type="text" class="input" id="comment-input" placeholder="Write a comment..." style="flex: 1;" />
          <button class="btn btn--primary btn--sm" id="btn-post-comment">Post</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#close-interaction').onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  overlay.querySelector('#modal-like-btn').onclick = () => {
    storage.toggleLike(formula.id);
    overlay.remove();
    showInteractionModal(formula);
  };

  overlay.querySelector('#modal-save-btn').onclick = () => {
    overlay.remove();
    const enrichedLayers = (formula.layers || []).map(l => {
      const p = getPerfumeById(l.perfumeId);
      const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
      return { ...l, name: `${r?.icon || ''} ${p?.name || l.perfumeId}` };
    });
    showSaveToVaultModal({
      ...formula,
      id: 'saved-' + formula.id,
      layers: enrichedLayers,
    }, { showNameInput: false });
  };

  overlay.querySelector('#btn-post-comment').onclick = () => {
    const input = overlay.querySelector('#comment-input');
    const text = input.value.trim();
    if (!text) return;
    comments.push({ text, date: Date.now() });
    localStorage.setItem('monaccord_comments_' + formula.id, JSON.stringify(comments));
    overlay.remove();
    showInteractionModal(formula);
  };
}

function addCommunityStyles() {
  if (document.getElementById('community-styles')) return;
  const style = document.createElement('style');
  style.id = 'community-styles';
  style.textContent = `
    .community-section { margin-bottom: var(--space-xl); }
    .mt-2xl { margin-top: var(--space-2xl); }

    .community-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
      gap: var(--space-md);
    }

    .community-section-title {
      font-size: var(--text-xl);
      margin-bottom: var(--space-sm);
    }

    .community-sort {
      display: flex;
      gap: var(--space-xs);
    }

    .community-sort-btn {
      padding: 6px 14px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--surface);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .community-sort-btn:hover { border-color: var(--accent-light); color: var(--accent-dark); }
    .community-sort-btn--active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent-dark); font-weight: 600; }

    .community-trending-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .community-trending-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      cursor: pointer;
    }

    .community-trending-item:hover {
      border-color: var(--border-accent);
      box-shadow: var(--shadow-sm);
    }

    .community-trending-rank {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--accent-light);
      min-width: 30px;
    }

    .community-trending-content { flex: 1; }

    .community-trending-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .community-trending-name { font-size: var(--text-sm); font-weight: 600; }

    .community-trending-match {
      font-size: var(--text-xs);
      font-weight: 600;
    }

    .community-trending-layers {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      align-items: center;
      margin-bottom: 4px;
    }

    .community-trending-desc {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      line-height: 1.5;
    }

    .community-trending-actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .community-trending-likes {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }
  `;
  document.head.appendChild(style);
}
