// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Trends & Evolution Page
// ═══════════════════════════════════════════════════════════════

import { getUserTrends, generateRemixSuggestion, getProfileEvolution } from '../services/learning-engine.js';
import { getTrendingCombinations } from '../services/collective-intel.js';
import { getPerfumeById, REGIONS } from '../data/perfumes.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';

export function renderTrends(container, navigate) {
  const trends = getUserTrends();
  const evolution = getProfileEvolution();
  const trending = getTrendingCombinations();
  const profile = storage.getProfile();

  container.innerHTML = `
    <div class="page__container">
      <div class="section-header">
        <p class="section-label">✦ Continuous Learning</p>
        <h2 class="section-title">Your Scent Evolution</h2>
        <p class="section-subtitle">Track your journey, discover trends, and let AI surprise you with fresh remixes.</p>
      </div>

      <!-- Profile Summary -->
      <div class="trends-profile-summary">
        ${profile ? `
          <div class="card card--gold">
            <div class="trends-profile-header">
              <div>
                <p class="section-label">Current Archetype</p>
                <h3 style="font-size: var(--text-2xl);">${profile.archetypeName || 'Undefined'}</h3>
                <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-top: var(--space-xs);">${profile.description || ''}</p>
              </div>
              <div class="trends-stats">
                <div class="trends-stat">
                  <span class="trends-stat__value">${trends?.totalFormulas || 0}</span>
                  <span class="trends-stat__label">Formulas</span>
                </div>
                <div class="trends-stat">
                  <span class="trends-stat__value">${trends?.totalLikes || 0}</span>
                  <span class="trends-stat__label">Likes</span>
                </div>
                <div class="trends-stat">
                  <span class="trends-stat__value">${evolution?.daysSinceStart || 0}</span>
                  <span class="trends-stat__label">Days</span>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="card text-center" style="padding: var(--space-3xl);">
            <p style="color: var(--text-tertiary); margin-bottom: var(--space-md);">Create your profile to start tracking your evolution.</p>
            <button class="btn btn--primary" id="create-profile-btn">Take the Quiz →</button>
          </div>
        `}
      </div>

      <!-- Region Usage & Preference -->
      ${trends && trends.topRegions.length > 0 ? `
        <div class="mt-2xl">
          <h3 class="trends-section-title">Your Region Preferences</h3>
          <div class="trends-regions">
            ${trends.topRegions.map((tr, i) => {
              const maxCount = trends.topRegions[0]?.count || 1;
              return `
                <div class="trends-region-bar">
                  <div class="trends-region-bar__label">
                    <span>${tr.data?.icon || '•'} ${tr.data?.name || tr.region}</span>
                    <span class="trends-region-bar__count">${tr.count} uses</span>
                  </div>
                  <div class="trends-region-bar__track">
                    <div class="trends-region-bar__fill" style="width: ${(tr.count / maxCount) * 100}%; background: ${tr.data?.color || 'var(--accent)'}; animation-delay: ${i * 0.1}s;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          <p class="mt-md" style="font-size: var(--text-sm); color: var(--text-tertiary);">
            Format preference: <strong style="color: var(--accent);">${trends.formatPreference === 'spray-dominant' ? 'Spray Dominant 💨' : trends.formatPreference === 'oil-dominant' ? 'Oil Dominant 💧' : 'Balanced ⚖️'}</strong>
          </p>
        </div>
      ` : ''}

      <!-- AI Remix -->
      <div class="mt-2xl">
        <h3 class="trends-section-title">✦ AI Remix Suggestion</h3>
        <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">
          Based on your journey and current trends, here's something new to try.
        </p>
        <div id="remix-container">
          <button class="btn btn--primary" id="btn-generate-remix">✦ Generate Remix</button>
        </div>
      </div>

      <!-- Trending -->
      <div class="mt-2xl">
        <h3 class="trends-section-title">Trending Combinations</h3>
        <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">
          What the community is loving right now.
        </p>
        <div class="trends-trending-list">
          ${trending.map((formula, i) => `
            <div class="trends-trending-item" id="trending-${formula.id}">
              <div class="trends-trending-rank">${i + 1}</div>
              <div class="trends-trending-content">
                <h4 class="trends-trending-name">${formula.name}</h4>
                <div class="trends-trending-layers">
                  ${(formula.layers || []).map(l => {
                    const p = getPerfumeById(l.perfumeId);
                    const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                    return `<span style="font-size: var(--text-xs); color: ${r?.color || 'var(--text-tertiary)'};">${r?.icon || ''} ${l.amount} ${l.unit} ${p?.name || ''}</span>`;
                  }).join(' <span style="color: var(--text-tertiary);">+</span> ')}
                </div>
              </div>
              <div class="trends-trending-likes">♥ ${formula.likes || 0}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Evolution Timeline -->
      ${evolution && evolution.timeline.length > 0 ? `
        <div class="mt-2xl">
          <h3 class="trends-section-title">Your Journey Timeline</h3>
          <div class="trends-timeline">
            ${evolution.timeline.slice(-10).reverse().map(event => `
              <div class="trends-timeline-item">
                <div class="trends-timeline-dot"></div>
                <div class="trends-timeline-content">
                  <span class="trends-timeline-label">${event.label}</span>
                  <span class="trends-timeline-detail">${event.detail || ''}</span>
                  <span class="trends-timeline-date">${formatDate(event.date)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  addTrendsStyles();

  // Create profile
  const createBtn = container.querySelector('#create-profile-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => navigate('#profile'));
  }

  // Generate remix
  const remixBtn = container.querySelector('#btn-generate-remix');
  if (remixBtn) {
    remixBtn.addEventListener('click', async () => {
      if (!isAIAvailable()) {
        window.showToast('Set your Gemini API key in Settings.', 'error');
        window.showSettings();
        return;
      }

      const remixContainer = container.querySelector('#remix-container');
      remixContainer.innerHTML = `
        <div class="card" style="padding: var(--space-2xl); text-align: center;">
          <span class="loading-spinner"></span>
          <p style="margin-top: var(--space-md); color: var(--text-tertiary);">Analyzing your journey and crafting a remix...</p>
        </div>
      `;

      const result = await generateRemixSuggestion();

      if (result.success && result.remix) {
        const remix = result.remix;
        remixContainer.innerHTML = `
          <div class="ai-response">
            <div class="ai-response__label">✦ ${remix.remixName || 'AI Remix'}</div>
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
              ${remix.newElement ? `<p><strong>What's new:</strong> ${remix.newElement}</p>` : ''}
              ${remix.scentDescription ? `<p><em>${remix.scentDescription}</em></p>` : ''}
            </div>
          </div>
          <div class="flex gap-sm mt-md">
            <button class="btn btn--primary btn--sm" id="btn-load-remix">Load to Lab</button>
            <button class="btn btn--ghost btn--sm" id="btn-new-remix">Try Another</button>
          </div>
        `;

        // Load remix to lab
        const loadBtn = remixContainer.querySelector('#btn-load-remix');
        if (loadBtn) {
          loadBtn.addEventListener('click', () => {
            if (remix.layers?.length) {
              const ids = remix.layers.map(l => l.perfumeId).filter(id => getPerfumeById(id));
              sessionStorage.setItem('labPending', JSON.stringify(ids));
              navigate('#lab');
              window.showToast('Remix loaded into lab!');
            }
          });
        }

        // New remix
        const newBtn = remixContainer.querySelector('#btn-new-remix');
        if (newBtn) {
          newBtn.addEventListener('click', () => {
            remixContainer.innerHTML = '<button class="btn btn--primary" id="btn-generate-remix">✦ Generate Remix</button>';
            remixContainer.querySelector('#btn-generate-remix').addEventListener('click', remixBtn.onclick);
          });
        }
      } else {
        remixContainer.innerHTML = `
          <div class="card" style="padding: var(--space-xl);">
            <p style="color: var(--text-tertiary);">${result.error || 'Unable to generate remix. Try saving some formulas first.'}</p>
            <button class="btn btn--ghost btn--sm mt-md" id="btn-retry-remix">Try Again</button>
          </div>
        `;
      }
    });
  }
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function addTrendsStyles() {
  if (document.getElementById('trends-styles')) return;
  const style = document.createElement('style');
  style.id = 'trends-styles';
  style.textContent = `
    .trends-profile-summary {
      margin-bottom: var(--space-xl);
    }

    .trends-profile-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-xl);
      flex-wrap: wrap;
    }

    .trends-stats {
      display: flex;
      gap: var(--space-xl);
    }

    .trends-stat {
      text-align: center;
    }

    .trends-stat__value {
      display: block;
      font-size: var(--text-2xl);
      font-weight: 700;
      font-family: var(--font-display);
      color: var(--accent);
    }

    .trends-stat__label {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .trends-section-title {
      font-size: var(--text-xl);
      margin-bottom: var(--space-sm);
    }

    .mt-2xl { margin-top: var(--space-2xl); }

    /* ── Region Bars ── */
    .trends-regions {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .trends-region-bar__label {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-sm);
      margin-bottom: 4px;
    }

    .trends-region-bar__count {
      color: var(--text-tertiary);
      font-size: var(--text-xs);
    }

    .trends-region-bar__track {
      height: 8px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .trends-region-bar__fill {
      height: 100%;
      border-radius: var(--radius-full);
      animation: barGrow 0.8s var(--ease-out) both;
    }

    @keyframes barGrow {
      from { width: 0 !important; }
    }

    /* ── Trending List ── */
    .trends-trending-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .trends-trending-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .trends-trending-item:hover {
      border-color: var(--border-accent);
      box-shadow: var(--shadow-sm);
    }

    .trends-trending-rank {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--accent-light);
      min-width: 30px;
    }

    .trends-trending-content {
      flex: 1;
    }

    .trends-trending-name {
      font-size: var(--text-sm);
      font-weight: 600;
      margin-bottom: 2px;
    }

    .trends-trending-layers {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      align-items: center;
    }

    .trends-trending-likes {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }

    /* ── Timeline ── */
    .trends-timeline {
      position: relative;
      padding-left: var(--space-xl);
    }

    .trends-timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border);
    }

    .trends-timeline-item {
      position: relative;
      padding-bottom: var(--space-lg);
    }

    .trends-timeline-dot {
      position: absolute;
      left: calc(-1 * var(--space-xl) + 3px);
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg-primary);
    }

    .trends-timeline-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .trends-timeline-label {
      font-size: var(--text-sm);
      font-weight: 500;
    }

    .trends-timeline-detail {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .trends-timeline-date {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }
  `;
  document.head.appendChild(style);
}
