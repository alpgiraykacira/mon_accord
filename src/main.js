// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Main Application
// ═══════════════════════════════════════════════════════════════

import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderLanding } from './pages/landing.js';
import { renderProfileQuiz } from './pages/profile-quiz.js';
import { renderExplorer } from './pages/explorer.js';
import { renderLayeringLab } from './pages/layering-lab.js';
import { renderVault } from './pages/vault.js';
import { renderCommunity } from './pages/community.js';
import { renderShop } from './pages/shop.js';
import { storage } from './utils/storage.js';

const app = document.getElementById('app');

// ── Simple Hash Router ──
const routes = {
  '': renderLanding,
  '#landing': renderLanding,
  '#profile': renderProfileQuiz,
  '#explorer': renderExplorer,
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

  const apiKey = storage.getApiKey();
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
        <div class="input-group mb-lg">
          <label class="input-label">Gemini API Key</label>
          <input type="password" class="input" id="api-key-input" placeholder="Enter your Gemini API key..." value="${apiKey}" />
          <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 4px;">
            Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--accent);">Google AI Studio</a>
          </p>
        </div>
        <div class="input-group">
          <label class="input-label">Profile</label>
          ${storage.getProfile()
            ? `<p style="font-size: var(--text-sm); color: var(--text-secondary);">Archetype: <strong>${storage.getProfile().archetypeName || 'Set'}</strong></p>
               <button class="btn btn--ghost btn--sm mt-sm" id="reset-profile-btn" style="color: #e74c3c;">Reset Profile</button>`
            : '<p style="font-size: var(--text-sm); color: var(--text-tertiary);">No profile created yet.</p>'
          }
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="cancel-settings">Cancel</button>
        <button class="btn btn--primary" id="save-settings">Save</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#close-settings').onclick = () => overlay.remove();
  overlay.querySelector('#cancel-settings').onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  overlay.querySelector('#save-settings').onclick = () => {
    const key = overlay.querySelector('#api-key-input').value.trim();
    storage.setApiKey(key);
    // Reset AI so it picks up new key
    import('./services/ai-engine.js').then(m => m.resetAI());
    window.showToast('Settings saved!');
    overlay.remove();
  };

  const resetBtn = overlay.querySelector('#reset-profile-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      storage.remove('monaccord_profile');
      storage.set('profile', null);
      window.showToast('Profile reset.');
      overlay.remove();
      render();
    };
  }
};

// ── Init ──
window.addEventListener('hashchange', render);
render();
