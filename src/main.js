// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Main Application
// ═══════════════════════════════════════════════════════════════

import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderLanding } from './pages/landing.js';
import { renderProfileQuiz } from './pages/profile-quiz.js';
import { renderLayeringLab } from './pages/layering-lab.js';
import { renderVault } from './pages/vault.js';
import { renderCommunity } from './pages/community.js';
import { renderShop } from './pages/shop.js';
import { storage } from './utils/storage.js';
import { startTour, endTour } from './demo-tour.js';
import { startPageDemo, hasPageDemo } from './page-demos.js';

const app = document.getElementById('app');

// ── Theme System ──
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  storage.set('theme', theme);
}

function initTheme() {
  const saved = storage.get('theme', 'dark');
  document.documentElement.setAttribute('data-theme', saved);
}

// ── Simple Hash Router ──
const routes = {
  '': renderLanding,
  '#landing': renderLanding,
  '#profile': renderProfileQuiz,
  '#lab': renderLayeringLab,
  '#vault': renderVault,
  '#shop': renderShop,
  '#community': renderCommunity,
};

function getRoute() {
  return window.location.hash || '';
}

function navigate(hash) {
  window.location.hash = hash;
}

function render() {
  const route = getRoute();
  const renderer = routes[route] || renderLanding;

  app.innerHTML = '';
  app.appendChild(renderNavbar(navigate, route));

  const page = document.createElement('div');
  page.className = 'page page-enter';
  page.id = 'page-content';
  renderer(page, navigate);
  app.appendChild(page);

  // Toast container
  if (!document.querySelector('.toast-container')) {
    const toasts = document.createElement('div');
    toasts.className = 'toast-container';
    toasts.id = 'toast-container';
    document.body.appendChild(toasts);
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

// ── Toast System ──
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<span class="toast__message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s var(--ease-out) forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ── Settings Modal ──
window.showSettings = function() {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const currentTheme = storage.get('theme', 'dark');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'settings-modal';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">Settings</h3>
        <button class="modal__close" id="close-settings">✕</button>
      </div>
      <div class="modal__body">

        <!-- Appearance -->
        <div class="input-group">
          <label class="input-label">Appearance</label>
          <div style="display:flex; gap:var(--space-md); margin-top:var(--space-sm);">

            <button id="theme-opt-dark" data-theme-opt="dark" style="
              flex:1; padding:var(--space-md); border-radius:var(--radius-lg);
              border: 2px solid ${currentTheme === 'dark' ? 'var(--accent)' : 'var(--border)'};
              background: ${currentTheme === 'dark' ? 'var(--accent-bg)' : 'var(--surface)'};
              cursor:pointer; transition: all var(--transition-fast);
              display:flex; flex-direction:column; align-items:center; gap:var(--space-sm);
            ">
              <div style="
                width:100%; height:52px; border-radius:var(--radius-md); overflow:hidden;
                background:#0A0A0A; border:1px solid rgba(255,255,255,0.08);
                display:flex; flex-direction:column; gap:3px; padding:6px;
              ">
                <div style="height:7px; border-radius:3px; background:rgba(255,255,255,0.12); width:60%;"></div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(201,169,110,0.15); border:1px solid rgba(201,169,110,0.2);"></div>
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);"></div>
                </div>
              </div>
              <span style="font-size:var(--text-xs); font-weight:600; color:${currentTheme === 'dark' ? 'var(--accent)' : 'var(--text-secondary)'}; letter-spacing:0.05em;">DARK</span>
            </button>

            <button id="theme-opt-light" data-theme-opt="light" style="
              flex:1; padding:var(--space-md); border-radius:var(--radius-lg);
              border: 2px solid ${currentTheme === 'light' ? 'var(--accent)' : 'var(--border)'};
              background: ${currentTheme === 'light' ? 'var(--accent-bg)' : 'var(--surface)'};
              cursor:pointer; transition: all var(--transition-fast);
              display:flex; flex-direction:column; align-items:center; gap:var(--space-sm);
            ">
              <div style="
                width:100%; height:52px; border-radius:var(--radius-md); overflow:hidden;
                background:#FAFAF8; border:1px solid rgba(26,26,46,0.08);
                display:flex; flex-direction:column; gap:3px; padding:6px;
              ">
                <div style="height:7px; border-radius:3px; background:rgba(26,26,46,0.12); width:60%;"></div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(200,169,126,0.12); border:1px solid rgba(200,169,126,0.25);"></div>
                  <div style="flex:1; height:20px; border-radius:3px; background:#FFFFFF; border:1px solid rgba(26,26,46,0.08);"></div>
                </div>
              </div>
              <span style="font-size:var(--text-xs); font-weight:600; color:${currentTheme === 'light' ? 'var(--accent)' : 'var(--text-secondary)'}; letter-spacing:0.05em;">LIGHT</span>
            </button>

          </div>
        </div>

        <!-- Profile -->
        <div class="input-group" style="margin-top:var(--space-lg); padding-top:var(--space-lg); border-top:1px solid var(--border);">
          <label class="input-label">Profile</label>
          ${storage.getProfile()
            ? `<p style="font-size:var(--text-sm); color:var(--text-secondary);">Archetype: <strong>${storage.getProfile().archetypeName || 'Set'}</strong></p>
               <button class="btn btn--ghost btn--sm mt-sm" id="reset-profile-btn" style="color:#e74c3c;">Reset All Data</button>`
            : '<p style="font-size:var(--text-sm); color:var(--text-tertiary);">No profile created yet.</p>'
          }
        </div>

        <!-- Demo -->
        <div class="input-group" style="margin-top:var(--space-lg); padding-top:var(--space-lg); border-top:1px solid var(--border);">
          <label class="input-label">Demo</label>
          <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
            <button class="btn btn--secondary btn--sm" id="settings-demo-btn">▶ Watch Demo</button>
            ${hasPageDemo(getRoute()) ? `<button class="btn btn--primary btn--sm" id="settings-page-demo-btn" style="margin-top:2px;">▶ Bulunduğun Sayfanın Demosunu Başlat</button>` : ''}
          </div>
        </div>

      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="cancel-settings">Cancel</button>
        <button class="btn btn--primary" id="save-settings">Save</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Track selected theme (live preview on click)
  let selectedTheme = currentTheme;

  function selectThemeOpt(theme) {
    selectedTheme = theme;
    applyTheme(theme); // live preview
    ['dark','light'].forEach(t => {
      const btn = overlay.querySelector(`#theme-opt-${t}`);
      if (!btn) return;
      const isActive = t === theme;
      btn.style.borderColor = isActive ? 'var(--accent)' : 'var(--border)';
      btn.style.background   = isActive ? 'var(--accent-bg)' : 'var(--surface)';
      btn.querySelector('span').style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)';
    });
  }

  overlay.querySelector('#theme-opt-dark').onclick  = () => selectThemeOpt('dark');
  overlay.querySelector('#theme-opt-light').onclick = () => selectThemeOpt('light');

  overlay.querySelector('#close-settings').onclick  = () => { applyTheme(currentTheme); overlay.remove(); };
  overlay.querySelector('#cancel-settings').onclick = () => { applyTheme(currentTheme); overlay.remove(); };
  overlay.onclick = (e) => { if (e.target === overlay) { applyTheme(currentTheme); overlay.remove(); } };

  overlay.querySelector('#save-settings').onclick = () => {
    applyTheme(selectedTheme);
    window.showToast('Settings saved!');
    overlay.remove();
  };

  const resetBtn = overlay.querySelector('#reset-profile-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      ['profile', 'quiz_state', 'vault', 'interactions', 'likes',
       'my_perfumes', 'pending_shop_cart', 'shop_cart',
       'community_posts', 'post_likes', 'vault_folders'].forEach(k => storage.remove(k));
      sessionStorage.clear();
      window.showToast('All data cleared. Starting fresh!');
      overlay.remove();
      render();
    };
  }

  const demoBtn = overlay.querySelector('#settings-demo-btn');
  if (demoBtn) {
    demoBtn.onclick = () => {
      overlay.remove();
      if (typeof window.startDemoTour === 'function') window.startDemoTour();
    };
  }

  const pageDemoBtn = overlay.querySelector('#settings-page-demo-btn');
  if (pageDemoBtn) {
    pageDemoBtn.onclick = () => {
      overlay.remove();
      startPageDemo(getRoute());
    };
  }
};

// ── Demo Tour ──
window.startDemoTour  = startTour;
window.endDemoTour    = endTour;
window.startPageDemo  = startPageDemo;

// ── Init ──
initTheme();
window.addEventListener('hashchange', render);
render();
