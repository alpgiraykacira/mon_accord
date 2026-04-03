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
  const SUGGESTION_CACHE_KEY = 'community_daily_suggestion';
  const todayKey = new Date().toISOString().slice(0, 10);
  let cachedSuggestion = loadCachedSuggestion();
  let currentSuggestion = cachedSuggestion?.date === todayKey ? cachedSuggestion.remix : null;
  let suggestionLoading = !currentSuggestion;

  function loadCachedSuggestion() {
    try {
      return JSON.parse(sessionStorage.getItem(SUGGESTION_CACHE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function persistSuggestion(remix) {
    sessionStorage.setItem(SUGGESTION_CACHE_KEY, JSON.stringify({ date: todayKey, remix }));
  }

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
        <!-- Two-column top: Trending + Today's Selection -->
        <div class="community-top-grid">

          <!-- Trending -->
          <div class="community-panel">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Trending</h3>
              <div class="community-sort">
                <button class="community-sort-btn ${sortBy === 'likes' ? 'community-sort-btn--active' : ''}" data-sort="likes">♥</button>
                <button class="community-sort-btn ${sortBy === 'match' ? 'community-sort-btn--active' : ''}" data-sort="match">✦</button>
                <button class="community-sort-btn ${sortBy === 'newest' ? 'community-sort-btn--active' : ''}" data-sort="newest">New</button>
              </div>
            </div>
            <div class="community-trending-list">
              ${sorted.map((formula, i) => `
                <div class="community-trending-item" data-id="${formula.id}">
                  <div class="community-trending-rank">${i + 1}</div>
                  <div class="community-trending-content">
                    <div class="community-trending-top">
                      <h4 class="community-trending-name">${formula.name}</h4>
                      <span class="community-trending-match" style="color: ${formula.matchPercent > 70 ? '#4CAF50' : formula.matchPercent > 50 ? 'var(--accent)' : 'var(--text-tertiary)'};">${formula.matchPercent}%</span>
                    </div>
                    <div class="community-trending-layers">
                      ${(formula.layers || []).map(l => {
                        const p = getPerfumeById(l.perfumeId);
                        const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                        return `<span style="color: ${r?.color || 'var(--text-tertiary)'};">${r?.icon || ''} ${p?.name || ''}</span>`;
                      }).join(' <span style="color: var(--text-tertiary);">+</span> ')}
                    </div>
                    ${formula.description ? `<p class="community-trending-desc community-desc-clamp">${formula.description}</p>` : ''}
                  </div>
                  <div class="community-trending-actions">
                    <span class="community-trending-likes">♥ ${formula.likes || 0}</span>
                    <button class="community-discuss-btn community-interact-btn" data-id="${formula.id}">Discussion</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Today's Selection -->
          <div class="community-panel community-panel--selection">
            <div class="community-panel-header">
              <h3 class="community-panel-title">✦ Today's selection for you</h3>
            </div>
            <div id="suggestion-container">
              ${renderSuggestionContent(currentSuggestion, suggestionLoading)}
            </div>
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

    const loadBtn = container.querySelector('#btn-load-suggestion');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => {
        if (currentSuggestion?.layers?.length) {
          const ids = currentSuggestion.layers.map(l => l.perfumeId).filter(id => getPerfumeById(id));
          sessionStorage.setItem('labPending', JSON.stringify(ids));
          navigate('#lab');
        }
      });
    }
  }

  render();

  if (!currentSuggestion) {
    hydrateSuggestion();
  }

  async function hydrateSuggestion() {
    const fallback = getFallbackSuggestion();

    if (isAIAvailable()) {
      const result = await generateRemixSuggestion();
      if (result.success && result.remix) {
        currentSuggestion = result.remix;
      } else {
        currentSuggestion = fallback;
      }
    } else {
      currentSuggestion = fallback;
    }

    suggestionLoading = false;
    persistSuggestion(currentSuggestion);
    render();
  }

  function getFallbackSuggestion() {
    const base = formulasWithMatch
      .slice()
      .sort((a, b) => b.matchPercent - a.matchPercent)[0] || trending[0];
    return {
      remixName: base?.name || 'Daily Selection',
      layers: base?.layers || [],
      inspiration: base?.description || 'A community-loved formula selected for your profile.',
      scentDescription: 'Balanced for versatility across day and evening wear.',
    };
  }
}

function renderSuggestionContent(remix, isLoading) {
  if (isLoading) {
    return `
      <div class="card" style="padding: var(--space-2xl); text-align: center;">
        <span class="loading-spinner"></span>
        <p style="margin-top: var(--space-md); color: var(--text-tertiary);">Preparing today’s suggestion...</p>
      </div>
    `;
  }

  if (!remix) {
    return `<p style="font-size: var(--text-sm); color: var(--text-tertiary);">No suggestion available yet.</p>`;
  }

  return `
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
        ${remix.inspiration ? `<p><strong>Inspiration:</strong> ${limitToSentenceCount(remix.inspiration, 3)}</p>` : ''}
        ${remix.scentDescription ? `<p><em>${limitToSentenceCount(remix.scentDescription, 1)}</em></p>` : ''}
      </div>
    </div>
    <div class="flex gap-sm mt-md">
      <button class="btn btn--primary btn--sm" id="btn-load-suggestion">Load to Lab</button>
    </div>
  `;
}

function limitToSentenceCount(text, maxSentences = 3) {
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  return sentences.slice(0, maxSentences).join(' ').trim();
}

function renderStars(rating, ci) {
  return [1,2,3,4,5].map(n =>
    `<span class="cm-star cm-star-display ${n <= rating ? 'cm-star--on' : ''}" data-ci="${ci}" data-val="${n}">★</span>`
  ).join('');
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
        <div id="comments-list" style="max-height: 260px; overflow-y: auto; margin-bottom: var(--space-md);">
          ${comments.length === 0 ? '<p style="font-size: var(--text-xs); color: var(--text-tertiary);">No comments yet. Be the first!</p>' :
            comments.map((c, ci) => `
              <div class="cm-comment" data-ci="${ci}">
                <div class="cm-comment-meta">
                  <span class="cm-comment-author">Anonymous</span>
                  <span class="cm-stars">${renderStars(c.rating || 0, ci)}</span>
                  <span class="cm-comment-date">${new Date(c.date).toLocaleDateString()}</span>
                </div>
                <p class="cm-comment-text">${c.text}</p>
                ${(c.replies || []).map(r => `
                  <div class="cm-reply">
                    <span class="cm-reply-arrow">↳</span>
                    <p>${r.text}</p>
                    <span class="cm-comment-date">${new Date(r.date).toLocaleDateString()}</span>
                  </div>
                `).join('')}
                <button class="cm-reply-btn" data-ci="${ci}">Reply</button>
                <div class="cm-reply-input" id="reply-input-${ci}" style="display:none;">
                  <input type="text" class="input cm-reply-field" placeholder="Write a reply..." data-ci="${ci}" style="font-size: var(--text-xs);" />
                  <button class="btn btn--ghost btn--sm cm-post-reply" data-ci="${ci}">Post</button>
                </div>
              </div>
            `).join('')}
        </div>
        <div class="cm-new-comment">
          <div class="cm-rate-row">
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);">Rate:</span>
            <span class="cm-stars cm-new-stars">
              ${[1,2,3,4,5].map(n => `<span class="cm-star cm-new-star" data-val="${n}">★</span>`).join('')}
            </span>
          </div>
          <div class="flex gap-sm">
            <input type="text" class="input" id="comment-input" placeholder="Write a comment..." style="flex: 1;" />
            <button class="btn btn--primary btn--sm" id="btn-post-comment">Post</button>
          </div>
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

  // New comment rating
  let newCommentRating = 0;
  overlay.querySelectorAll('.cm-new-star').forEach(star => {
    star.addEventListener('mouseover', () => {
      overlay.querySelectorAll('.cm-new-star').forEach(s => {
        s.classList.toggle('cm-star--on', Number(s.dataset.val) <= Number(star.dataset.val));
      });
    });
    star.addEventListener('mouseout', () => {
      overlay.querySelectorAll('.cm-new-star').forEach(s => {
        s.classList.toggle('cm-star--on', Number(s.dataset.val) <= newCommentRating);
      });
    });
    star.addEventListener('click', () => {
      newCommentRating = Number(star.dataset.val);
      overlay.querySelectorAll('.cm-new-star').forEach(s => {
        s.classList.toggle('cm-star--on', Number(s.dataset.val) <= newCommentRating);
      });
    });
  });

  // Rate existing comment stars
  overlay.querySelectorAll('.cm-star-display').forEach(star => {
    star.addEventListener('click', () => {
      const ci = Number(star.dataset.ci);
      const val = Number(star.dataset.val);
      comments[ci].rating = val;
      localStorage.setItem('monaccord_comments_' + formula.id, JSON.stringify(comments));
      overlay.remove();
      showInteractionModal(formula);
    });
  });

  // Post new comment
  overlay.querySelector('#btn-post-comment').onclick = () => {
    const input = overlay.querySelector('#comment-input');
    const text = input.value.trim();
    if (!text) return;
    comments.push({ text, date: Date.now(), rating: newCommentRating, replies: [] });
    localStorage.setItem('monaccord_comments_' + formula.id, JSON.stringify(comments));
    overlay.remove();
    showInteractionModal(formula);
  };

  // Reply buttons
  overlay.querySelectorAll('.cm-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ci = btn.dataset.ci;
      const box = overlay.querySelector(`#reply-input-${ci}`);
      if (box) box.style.display = box.style.display === 'none' ? 'flex' : 'none';
    });
  });

  // Post reply
  overlay.querySelectorAll('.cm-post-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const ci = Number(btn.dataset.ci);
      const field = overlay.querySelector(`.cm-reply-field[data-ci="${ci}"]`);
      const text = field?.value.trim();
      if (!text) return;
      if (!comments[ci].replies) comments[ci].replies = [];
      comments[ci].replies.push({ text, date: Date.now() });
      localStorage.setItem('monaccord_comments_' + formula.id, JSON.stringify(comments));
      overlay.remove();
      showInteractionModal(formula);
    });
  });
}

function addCommunityStyles() {
  if (document.getElementById('community-styles')) return;
  const style = document.createElement('style');
  style.id = 'community-styles';
  style.textContent = `
    .community-top-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-xl);
      align-items: start;
    }

    .community-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .community-panel--selection {
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
    }

    .community-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-lg) var(--space-lg) var(--space-md);
      border-bottom: 1px solid var(--border);
    }

    .community-panel-title {
      font-size: var(--text-lg);
      font-weight: 600;
    }

    .community-sort {
      display: flex;
      gap: 4px;
    }

    .community-sort-btn {
      padding: 4px 10px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--surface);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .community-sort-btn:hover { border-color: var(--accent-light); color: var(--accent); }
    .community-sort-btn--active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; }

    .community-trending-list {
      display: flex;
      flex-direction: column;
    }

    .community-trending-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--border);
      transition: background var(--transition-fast);
      cursor: pointer;
    }

    .community-trending-item:last-child { border-bottom: none; }

    .community-trending-item:hover { background: var(--bg-primary); }

    .community-trending-rank {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--accent-light);
      min-width: 26px;
      padding-top: 2px;
    }

    .community-trending-content { flex: 1; min-width: 0; }

    .community-trending-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
      gap: var(--space-sm);
    }

    .community-trending-name { font-size: var(--text-sm); font-weight: 600; }

    .community-trending-match {
      font-size: var(--text-xs);
      font-weight: 700;
      white-space: nowrap;
    }

    .community-trending-layers {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
      margin-bottom: 4px;
      font-size: var(--text-xs);
    }

    .community-desc-clamp {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      line-height: 1.5;
    }

    .community-trending-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-xs);
      flex-shrink: 0;
    }

    .community-trending-likes {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .community-discuss-btn {
      padding: 4px 10px;
      font-size: var(--text-xs);
      font-weight: 600;
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-full);
      background: var(--accent-bg);
      color: var(--accent);
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }

    .community-discuss-btn:hover {
      background: var(--accent);
      color: var(--text-on-accent);
    }

    #suggestion-container {
      padding: var(--space-lg);
    }

    @media (max-width: 768px) {
      .community-top-grid { grid-template-columns: 1fr; }
      .community-panel--selection { position: static; }
    }

    /* ── Comment styles ── */
    .cm-comment {
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--border);
    }

    .cm-comment:last-child { border-bottom: none; }

    .cm-comment-meta {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: 4px;
      flex-wrap: wrap;
    }

    .cm-comment-author { font-size: var(--text-xs); font-weight: 600; }
    .cm-comment-date { font-size: 10px; color: var(--text-tertiary); }
    .cm-comment-text { font-size: var(--text-sm); line-height: 1.5; margin-bottom: 4px; }

    .cm-stars { display: flex; gap: 2px; }

    .cm-star {
      font-size: 14px;
      color: var(--border);
      cursor: pointer;
      transition: color var(--transition-fast);
      line-height: 1;
    }

    .cm-star--on { color: var(--accent); }
    .cm-star:hover { color: var(--accent-light); }

    .cm-reply {
      display: flex;
      align-items: flex-start;
      gap: var(--space-xs);
      margin-top: 4px;
      padding: 4px var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
    }

    .cm-reply-arrow { color: var(--accent-light); font-weight: 600; }

    .cm-reply-btn {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      cursor: pointer;
      margin-top: 4px;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .cm-reply-btn:hover { color: var(--accent); }

    .cm-reply-input {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
      margin-top: var(--space-xs);
    }

    .cm-new-comment {
      border-top: 1px solid var(--border);
      padding-top: var(--space-sm);
    }

    .cm-rate-row {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-sm);
    }
  `;
  document.head.appendChild(style);
}
