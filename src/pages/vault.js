// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Vault Page (with Folder System)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { getPerfumeById, REGIONS, PERFUMES, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';

export function renderVault(container, navigate) {
  let folders = storage.get('vault_folders', [{ id: 'default', name: 'All Formulas', icon: '📁' }]);
  let activeFolder = null;
  let showCreateFolder = false;
  let addingSection = null; // 'monAccord' | 'loreal' | null

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
        ${!activeFolder ? renderFolderView(vault) : renderFolderContents(activeFolder, vault)}
      </div>
    `;

    addVaultStyles();
    bindEvents(vault);
  }

  function renderFolderView(vault) {
    return `
      <div class="vault-main-layout">
        <!-- Left: Folders -->
        <div class="vault-folders-col">
          <div class="vault-folders-header">
            <h3 style="font-size: var(--text-lg);">Folders</h3>
            <button class="btn btn--secondary btn--sm" id="btn-create-folder">+ New Folder</button>
          </div>

          ${showCreateFolder ? `
            <div class="vault-create-folder mb-lg">
              <input type="text" class="input" id="new-folder-name" placeholder="Folder name..." style="max-width: 260px;" />
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
              <p style="font-size: var(--text-base); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Your vault is empty</p>
              <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Create formulas in the Layering Lab and save them here.</p>
              <button class="btn btn--primary" id="go-to-lab">Go to Layering Lab</button>
            </div>
          ` : ''}
        </div>

        <!-- Right: My Perfumes -->
        ${renderMyPerfumes()}
      </div>
    `;
  }

  function renderMyPerfumes() {
    const owned = storage.getOwnedPerfumes();

    function renderChips(ids, type) {
      if (!ids.length) return `<p style="font-size:var(--text-xs);color:var(--text-tertiary);">None added yet.</p>`;
      return `<div class="vault-myperfumes-list">
        ${ids.map(id => {
          let label, iconHtml;
          if (type === 'monAccord') {
            const p = getPerfumeById(id);
            const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
            label = p?.name || id;
            iconHtml = `<span style="color:${r?.color||'inherit'};">${r?.icon||'•'}</span>`;
          } else {
            const p = LOREAL_LUXE_PERFUMES.find(lp => lp.id === id);
            label = p ? `${p.brand} — ${p.name}` : id;
            iconHtml = `<span>✦</span>`;
          }
          return `<div class="vault-myperfume-chip">
            ${iconHtml}<span>${label}</span>
            <button class="vault-myperfume-remove" data-remove="${id}" data-type="${type}">✕</button>
          </div>`;
        }).join('')}
      </div>`;
    }

    function renderAddInput(type) {
      if (addingSection !== type) return `<button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="${type}" style="margin-top:var(--space-xs);">+ Add</button>`;
      if (type === 'monAccord') {
        const unowned = PERFUMES.filter(p => !owned.monAccord.includes(p.id));
        return `<div class="vault-myperfumes-input">
          <select class="select vault-owned-select" data-type="monAccord" style="flex:1;">
            <option value="">Select...</option>
            ${unowned.map(p => { const r = REGIONS.find(rg => rg.id === p.region); return `<option value="${p.id}">${r?.icon||''} ${p.name}</option>`; }).join('')}
          </select>
          <button class="btn btn--primary btn--sm vault-save-owned-btn" data-type="monAccord">Add</button>
          <button class="btn btn--ghost btn--sm vault-cancel-owned-btn">Cancel</button>
        </div>`;
      } else {
        const unowned = LOREAL_LUXE_PERFUMES.filter(p => !owned.loreal.includes(p.id));
        const brands = [...new Set(unowned.map(p => p.brand))];
        return `<div class="vault-myperfumes-input">
          <select class="select vault-owned-select" data-type="loreal" style="flex:1;">
            <option value="">Select...</option>
            ${brands.map(brand => `<optgroup label="${brand}">${unowned.filter(p=>p.brand===brand).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('')}
          </select>
          <button class="btn btn--primary btn--sm vault-save-owned-btn" data-type="loreal">Add</button>
          <button class="btn btn--ghost btn--sm vault-cancel-owned-btn">Cancel</button>
        </div>`;
      }
    }

    const recText = getRecommendationText(owned);

    return `
      <div class="vault-myperfumes-col">
        <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-xs);">My Perfumes</h3>
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-lg);">Your collection guides all AI recommendations across the app.</p>

        <!-- Mon Accord Section -->
        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">Mon Accord</p>
          ${renderChips(owned.monAccord, 'monAccord')}
          ${renderAddInput('monAccord')}
        </div>

        <!-- L'Oréal Luxe Section -->
        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">L'Oréal Luxe</p>
          ${renderChips(owned.loreal, 'loreal')}
          ${renderAddInput('loreal')}
        </div>

        ${recText ? `
          <div class="vault-myperfumes-rec mt-md">
            <p class="vault-myperfumes-rec-label">✦ Based on your collection</p>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;">${recText}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  function getRecommendationText(owned) {
    const maIds = owned.monAccord || [];
    if (!maIds.length) return '';
    const perfumes = maIds.map(id => getPerfumeById(id)).filter(Boolean);
    const families = [...new Set(perfumes.flatMap(p => p.scentFamily.split('-')))];
    const complementary = PERFUMES.filter(p =>
      !maIds.includes(p.id) &&
      p.scentFamily.split('-').some(f => families.includes(f))
    ).slice(0, 3);
    if (!complementary.length) return `Your collection spans ${families.slice(0, 3).join(', ')} notes. Explore the Layering Lab to create blends.`;
    return `Pairs well with: ${complementary.map(p => { const r = REGIONS.find(rg=>rg.id===p.region); return `${r?.icon||''} ${p.name}`; }).join(', ')}.`;
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

    // My Perfumes: show add input
    container.querySelectorAll('.vault-add-owned-btn').forEach(btn => {
      btn.addEventListener('click', () => { addingSection = btn.dataset.section; render(); });
    });

    container.querySelectorAll('.vault-cancel-owned-btn').forEach(btn => {
      btn.addEventListener('click', () => { addingSection = null; render(); });
    });

    container.querySelectorAll('.vault-save-owned-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const sel = container.querySelector(`.vault-owned-select[data-type="${type}"]`);
        if (!sel?.value) return;
        const owned = storage.getOwnedPerfumes();
        if (!owned[type].includes(sel.value)) {
          owned[type] = [...owned[type], sel.value];
          storage.setOwnedPerfumes(owned);
        }
        addingSection = null;
        render();
      });
    });

    // My Perfumes: remove chip
    container.querySelectorAll('.vault-myperfume-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const { remove: id, type } = btn.dataset;
        const owned = storage.getOwnedPerfumes();
        owned[type] = owned[type].filter(x => x !== id);
        storage.setOwnedPerfumes(owned);
        render();
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
    .vault-main-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: var(--space-2xl);
      align-items: start;
    }

    .vault-folders-col {}

    .vault-myperfumes-col {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
    }

    .vault-myperfumes-section {
      margin-bottom: var(--space-lg);
      padding-bottom: var(--space-lg);
      border-bottom: 1px solid var(--border);
    }

    .vault-myperfumes-section:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .vault-myperfumes-section-label {
      font-size: var(--text-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }

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
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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

    .vault-myperfumes-input {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
      margin-top: var(--space-sm);
      flex-wrap: wrap;
    }

    .vault-myperfumes-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: var(--space-sm);
    }

    .vault-myperfume-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      background: var(--accent-bg);
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
    }

    .vault-myperfume-remove {
      font-size: 9px;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 0 1px;
      line-height: 1;
    }

    .vault-myperfume-remove:hover { color: #e74c3c; }

    .vault-myperfumes-rec {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: var(--space-sm) var(--space-md);
      margin-top: var(--space-sm);
    }

    .vault-myperfumes-rec-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    @media (max-width: 1100px) {
      .vault-main-layout { grid-template-columns: 1fr; }
      .vault-myperfumes-col { position: static; }
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
