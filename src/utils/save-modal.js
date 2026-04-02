// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Save to Vault Modal (with Folder Selection)
// ═══════════════════════════════════════════════════════════════

import { storage } from './storage.js';

/**
 * Opens a modal popup for saving a formula to the vault.
 * Shows a folder dropdown, new folder creation, and formula name input.
 * @param {Object} formula - The formula object to save (must have layers, optionally name)
 * @param {Object} options - Optional settings
 * @param {boolean} options.showNameInput - Whether to show a name input (default: true)
 * @param {Function} options.onSaved - Callback after saving
 */
export function showSaveToVaultModal(formula, options = {}) {
  const { showNameInput = true, onSaved } = options;

  let folders = storage.get('vault_folders', [{ id: 'default', name: 'All Formulas', icon: '📁' }]);
  let selectedFolderId = 'default';
  let showNewFolder = false;

  function renderModal() {
    // Remove existing modal if any
    const existing = document.getElementById('save-vault-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'save-vault-overlay';
    overlay.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal__header">
          <h3 class="modal__title">Save to Vault</h3>
          <button class="modal__close" id="sv-close">✕</button>
        </div>
        <div class="modal__body">
          ${showNameInput ? `
            <div class="input-group sv-group">
              <label class="input-label">Formula Name</label>
              <input type="text" class="input" id="sv-name" placeholder="Give your creation a name..." value="${formula.name || ''}" />
            </div>
          ` : ''}

          <div class="input-group sv-group">
            <label class="input-label">Choose Folder</label>
            <div class="sv-folder-select-wrap">
              <select class="input sv-folder-select" id="sv-folder-dropdown">
                ${folders.map(f => `
                  <option value="${f.id}" ${f.id === selectedFolderId ? 'selected' : ''}>
                    ${f.icon || '📁'} ${f.name}
                  </option>
                `).join('')}
              </select>
              <button class="btn btn--ghost btn--sm sv-new-folder-toggle" id="sv-toggle-new" title="New folder">
                + New
              </button>
            </div>
          </div>

          ${showNewFolder ? `
            <div class="sv-new-folder-form">
              <div class="sv-new-folder-row">
                <input type="text" class="input" id="sv-new-folder-name" placeholder="New folder name..." autofocus />
                <button class="btn btn--primary btn--sm" id="sv-create-folder">Create</button>
                <button class="btn btn--ghost btn--sm" id="sv-cancel-new">✕</button>
              </div>
            </div>
          ` : ''}

          <div class="sv-preview">
            <p class="sv-preview-label">Layers</p>
            ${(formula.layers || []).map(l => {
              const name = l.name || l.perfumeId || 'Unknown';
              return `<p class="sv-preview-layer">• ${l.amount || ''} ${l.unit || ''} ${name}</p>`;
            }).join('')}
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary" id="sv-cancel">Cancel</button>
          <button class="btn btn--primary" id="sv-confirm">Save ✦</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    addSaveModalStyles();

    // Close handlers
    overlay.querySelector('#sv-close').onclick = () => overlay.remove();
    overlay.querySelector('#sv-cancel').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    // Folder dropdown change
    overlay.querySelector('#sv-folder-dropdown').onchange = (e) => {
      selectedFolderId = e.target.value;
    };

    // Toggle new folder form
    overlay.querySelector('#sv-toggle-new').onclick = () => {
      showNewFolder = !showNewFolder;
      renderModal();
    };

    // Create new folder
    const createBtn = overlay.querySelector('#sv-create-folder');
    if (createBtn) {
      createBtn.onclick = () => {
        const nameInput = overlay.querySelector('#sv-new-folder-name');
        const name = nameInput.value.trim();
        if (!name) return;
        const newFolder = { id: 'folder-' + Date.now(), name, icon: '📂' };
        folders.push(newFolder);
        storage.set('vault_folders', folders);
        selectedFolderId = newFolder.id;
        showNewFolder = false;
        renderModal();
        window.showToast(`Folder "${name}" created!`);
      };
    }

    // Cancel new folder
    const cancelNew = overlay.querySelector('#sv-cancel-new');
    if (cancelNew) {
      cancelNew.onclick = () => { showNewFolder = false; renderModal(); };
    }

    // Confirm save
    overlay.querySelector('#sv-confirm').onclick = () => {
      const nameEl = overlay.querySelector('#sv-name');
      const name = nameEl ? nameEl.value.trim() : formula.name;
      const finalName = name || `Blend ${Date.now().toString(36).slice(-4)}`;

      const savedFormula = {
        ...formula,
        id: formula.id || 'f-' + Date.now(),
        name: finalName,
        folderId: selectedFolderId === 'default' ? undefined : selectedFolderId,
        savedAt: Date.now(),
      };

      storage.saveFormula(savedFormula);
      overlay.remove();

      const folderName = folders.find(f => f.id === selectedFolderId)?.name || 'Vault';
      window.showToast(`"${finalName}" saved to ${folderName}! ✦`);

      if (onSaved) onSaved(savedFormula);
    };

    // Focus name input
    if (showNameInput) {
      const nameInput = overlay.querySelector('#sv-name');
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  }

  renderModal();
}

function addSaveModalStyles() {
  if (document.getElementById('save-modal-styles')) return;
  const style = document.createElement('style');
  style.id = 'save-modal-styles';
  style.textContent = `
    .sv-group { margin-bottom: var(--space-lg); }

    .sv-folder-select-wrap {
      display: flex;
      gap: var(--space-sm);
      align-items: center;
    }

    .sv-folder-select {
      flex: 1;
      appearance: auto;
      cursor: pointer;
    }

    .sv-new-folder-toggle {
      white-space: nowrap;
      font-size: var(--text-xs) !important;
      padding: 6px 12px !important;
    }

    .sv-new-folder-form {
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.2s ease-out;
    }

    .sv-new-folder-row {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
    }

    .sv-new-folder-row .input { flex: 1; }

    .sv-preview {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: var(--space-md);
    }

    .sv-preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
      margin-bottom: var(--space-xs);
    }

    .sv-preview-layer {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-bottom: 2px;
    }
  `;
  document.head.appendChild(style);
}
