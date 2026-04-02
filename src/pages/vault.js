// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Vault Page (with Folder System)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { getPerfumeById, REGIONS } from '../data/perfumes.js';

export function renderVault(container, navigate) {
  let folders = storage.get('vault_folders', [{ id: 'default', name: 'All Formulas', icon: '📁' }]);
  let activeFolder = null;
  let showCreateFolder = false;

  function saveFolders() {
    storage.set('vault_folders', folders);
  }

  function getFormulasForFolder(folderId) {
    const vault = storage.getVault();
    if (folderId === 'default') return vault;
    return vault.filter(f => f.folderId === folderId);
  }

  function render() {
    const vault = storage.getVault();

    container.innerHTML = `
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">Your Collection</p>
          <h2 class="section-title">Vault</h2>
          <p class="section-subtitle">${vault.length} formula${vault.length !== 1 ? 's' : ''} saved</p>
        </div>

        ${!activeFolder ? renderFolderView(vault) : renderFolderContents(activeFolder, vault)}
      </div>
    `;

    addVaultStyles();
    bindEvents(vault);
  }

  function renderFolderView(vault) {
    return `
      <div class="vault-folders-header">
        <h3 style="font-size: var(--text-lg);">Folders</h3>
        <button class="btn btn--secondary btn--sm" id="btn-create-folder">+ New Folder</button>
      </div>

      ${showCreateFolder ? `
        <div class="vault-create-folder mb-lg">
          <input type="text" class="input" id="new-folder-name" placeholder="Folder name..." style="max-width: 300px;" />
          <button class="btn btn--primary btn--sm" id="btn-save-folder">Create</button>
          <button class="btn btn--ghost btn--sm" id="btn-cancel-folder">Cancel</button>
        </div>
      ` : ''}

      <div class="vault-folders-grid">
        ${folders.map(f => {
          const count = getFormulasForFolder(f.id).length;
          return `
            <div class="vault-folder-card card card--interactive" data-folder="${f.id}">
              <div class="vault-folder-icon">${f.icon || '📁'}</div>
              <h4 class="vault-folder-name">${f.name}</h4>
              <span class="vault-folder-count">${count} formula${count !== 1 ? 's' : ''}</span>
              ${f.id !== 'default' ? `<button class="vault-folder-delete" data-delete="${f.id}" title="Delete folder">✕</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      ${vault.length === 0 ? `
        <div class="vault-empty mt-xl">
          <p style="font-size: var(--text-lg); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Your vault is empty</p>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Create formulas in the Layering Lab and save them here.</p>
          <button class="btn btn--primary" id="go-to-lab">Go to Layering Lab</button>
        </div>
      ` : ''}
    `;
  }

  function renderFolderContents(folder, vault) {
    const formulas = getFormulasForFolder(folder.id);
    return `
      <div class="vault-breadcrumb mb-lg">
        <button class="btn btn--ghost btn--sm" id="btn-back-folders">← All Folders</button>
        <span style="color: var(--text-tertiary);">/</span>
        <span style="font-weight: 600;">${folder.icon} ${folder.name}</span>
      </div>

      ${formulas.length === 0 ? `
        <div class="vault-empty">
          <p style="color: var(--text-tertiary);">No formulas in this folder yet.</p>
        </div>
      ` : `
        <div class="vault-formulas-list">
          ${formulas.map(formula => {
            const layers = formula.layers || [];
            return `
              <div class="vault-formula-card" data-id="${formula.id}">
                <div class="vault-formula-header">
                  <h4 class="vault-formula-name">${formula.name}</h4>
                  <span class="vault-formula-date">${formula.savedAt ? new Date(formula.savedAt).toLocaleDateString() : ''}</span>
                </div>
                <div class="vault-formula-layers">
                  ${layers.map(l => {
                    const p = getPerfumeById(l.perfumeId);
                    const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                    return `<span class="vault-formula-layer" style="color: ${r?.color || 'var(--text-secondary)'};">${r?.icon || '•'} ${l.amount} ${l.unit} ${p?.name || l.perfumeId}</span>`;
                  }).join(' + ')}
                </div>
                <div class="vault-formula-actions">
                  <button class="btn btn--ghost btn--sm vault-load-btn" data-id="${formula.id}">Load to Lab</button>
                  ${folder.id !== 'default' ? '' : `
                    <select class="select vault-move-select" data-id="${formula.id}" style="font-size: var(--text-xs); padding: 4px 30px 4px 8px;">
                      <option value="">Move to...</option>
                      ${folders.filter(f => f.id !== 'default').map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
                    </select>
                  `}
                  <button class="btn btn--ghost btn--sm vault-delete-btn" data-id="${formula.id}" style="color: var(--text-tertiary);">✕</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  }

  function bindEvents(vault) {
    // Folder click
    container.querySelectorAll('.vault-folder-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.vault-folder-delete')) return;
        const folderId = card.dataset.folder;
        activeFolder = folders.find(f => f.id === folderId);
        render();
      });
    });

    // Delete folder
    container.querySelectorAll('.vault-folder-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.delete;
        // Move formulas back to default
        const vault = storage.getVault();
        vault.forEach(f => { if (f.folderId === id) f.folderId = undefined; });
        storage.set('vault', vault);
        folders = folders.filter(f => f.id !== id);
        saveFolders();
        render();
      });
    });

    // Create folder
    const createBtn = container.querySelector('#btn-create-folder');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        showCreateFolder = true;
        render();
      });
    }

    const saveBtn = container.querySelector('#btn-save-folder');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const nameInput = container.querySelector('#new-folder-name');
        const name = nameInput.value.trim();
        if (name) {
          folders.push({ id: 'folder-' + Date.now(), name, icon: '📂' });
          saveFolders();
          showCreateFolder = false;
          render();
        }
      });
    }

    const cancelBtn = container.querySelector('#btn-cancel-folder');
    if (cancelBtn) cancelBtn.addEventListener('click', () => { showCreateFolder = false; render(); });

    // Back to folders
    const backBtn = container.querySelector('#btn-back-folders');
    if (backBtn) backBtn.addEventListener('click', () => { activeFolder = null; render(); });

    // Go to lab
    const labBtn = container.querySelector('#go-to-lab');
    if (labBtn) labBtn.addEventListener('click', () => navigate('#lab'));

    // Load formula to lab
    container.querySelectorAll('.vault-load-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const formula = vault.find(f => f.id === btn.dataset.id);
        if (formula?.layers) {
          const ids = formula.layers.map(l => l.perfumeId).filter(Boolean);
          sessionStorage.setItem('labPending', JSON.stringify(ids));
          navigate('#lab');
        }
      });
    });

    // Delete formula
    container.querySelectorAll('.vault-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        storage.removeFormula(btn.dataset.id);
        render();
        window.showToast('Formula removed from vault.');
      });
    });

    // Move formula to folder
    container.querySelectorAll('.vault-move-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const folderId = sel.value;
        if (!folderId) return;
        const vault = storage.getVault();
        const formula = vault.find(f => f.id === sel.dataset.id);
        if (formula) {
          formula.folderId = folderId;
          storage.set('vault', vault);
          render();
          window.showToast(`Formula moved to folder.`);
        }
      });
    });
  }

  render();
}

function addVaultStyles() {
  if (document.getElementById('vault-styles')) return;
  const style = document.createElement('style');
  style.id = 'vault-styles';
  style.textContent = `
    .vault-folders-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-lg);
    }

    .vault-create-folder {
      display: flex;
      gap: var(--space-sm);
      align-items: center;
    }

    .vault-folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-md);
    }

    .vault-folder-card {
      text-align: center;
      padding: var(--space-xl);
      position: relative;
    }

    .vault-folder-icon { font-size: 2.5rem; margin-bottom: var(--space-sm); }
    .vault-folder-name { font-size: var(--text-base); margin-bottom: 4px; }
    .vault-folder-count { font-size: var(--text-xs); color: var(--text-tertiary); }

    .vault-folder-delete {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      width: 24px; height: 24px;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      cursor: pointer; background: none; border: none;
      transition: all var(--transition-fast);
      opacity: 0;
    }

    .vault-folder-card:hover .vault-folder-delete { opacity: 1; }
    .vault-folder-delete:hover { color: #e74c3c; background: rgba(231,76,60,0.08); }

    .vault-breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--text-sm);
    }

    .vault-formulas-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-md);
    }

    .vault-formula-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: all var(--transition-fast);
      display: flex;
      flex-direction: column;
    }

    .vault-formula-card:hover {
      border-color: var(--border-accent);
      box-shadow: var(--shadow-md);
    }

    .vault-formula-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-sm);
    }

    .vault-formula-name { font-size: var(--text-sm); font-weight: 600; }
    .vault-formula-date { font-size: 10px; color: var(--text-tertiary); white-space: nowrap; }

    .vault-formula-layers {
      font-size: var(--text-xs);
      line-height: 1.6;
      margin-bottom: var(--space-md);
      flex: 1;
    }

    .vault-formula-actions {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
      flex-wrap: wrap;
    }

    .vault-empty {
      text-align: center;
      padding: var(--space-3xl) var(--space-xl);
    }

    @media (max-width: 1024px) {
      .vault-formulas-list { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .vault-formulas-list { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}
