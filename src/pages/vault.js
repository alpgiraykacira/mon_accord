// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Vault Page (with Folder System)
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';
import { getPerfumeById, REGIONS, PERFUMES, LOREAL_LUXE_PERFUMES } from '../data/perfumes.js';
import folderIconUrl from '../assets/open-folder.png';

const PRESET_FOLDERS = [
  { id: 'default',  name: 'All Formulas' },
  { id: 'evening',  name: 'Evening Wear' },
  { id: 'daytime',  name: 'Daytime' },
  { id: 'office',   name: 'Office' },
  { id: 'weekend',  name: 'Weekend' },
  { id: 'seasonal', name: 'Seasonal' },
];

export function renderVault(container, navigate) {
  // Seed / merge preset folders for new and existing users
  const rawFolders = storage.get('vault_folders', null);
  let folders;
  if (!rawFolders) {
    folders = PRESET_FOLDERS.map(f => ({ ...f }));
    storage.set('vault_folders', folders);
  } else {
    const existingIds = new Set(rawFolders.map(f => f.id));
    const missing = PRESET_FOLDERS.filter(p => !existingIds.has(p.id));
    if (missing.length) {
      folders = [...rawFolders, ...missing].map(f => ({ id: f.id, name: f.name }));
      storage.set('vault_folders', folders);
    } else {
      folders = rawFolders.map(f => ({ id: f.id, name: f.name }));
    }
  }
  let activeFolder = null;
  let showCreateFolder = false;
  let addingSection = null; // 'monAccord' | 'loreal' | null
  let selectedLorealBrand = null;

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
      ${renderOwnedModal()}
    `;

    addVaultStyles();
    bindEvents(vault);
  }

  function renderFolderView(vault) {
    return `
      <div class="vault-main-layout">
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
                  <img src="${folderIconUrl}" class="vault-folder-icon" alt="folder" />
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
            iconHtml = `<span style="color:${r?.color || 'inherit'};">${r?.icon || '•'}</span>`;
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
      return `<div class="vault-myperfumes-input">
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin:0;">Selection opens in popup.</p>
        <button class="btn btn--ghost btn--sm vault-cancel-owned-btn">Cancel</button>
      </div>`;
    }

    const recText = getRecommendationText(owned);

    return `
      <div class="vault-myperfumes-col">
        <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-xs);">My Perfumes</h3>
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-lg);">Your collection guides all AI recommendations across the app.</p>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">Mon Accord</p>
          ${renderChips(owned.monAccord, 'monAccord')}
          ${renderAddInput('monAccord')}
        </div>

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
    const complementary = PERFUMES.filter(p => !maIds.includes(p.id) && p.scentFamily.split('-').some(f => families.includes(f))).slice(0, 3);
    if (!complementary.length) return `Your collection spans ${families.slice(0, 3).join(', ')} notes. Explore the Layering Lab to create blends.`;
    return `Pairs well with: ${complementary.map(p => { const r = REGIONS.find(rg => rg.id === p.region); return `${r?.icon || ''} ${p.name}`; }).join(', ')}.`;
  }

  function renderFolderContents(folder, vault) {
    const formulas = getFormulasForFolder(folder.id);
    return `
      <div class="vault-breadcrumb mb-lg">
        <button class="btn btn--ghost btn--sm" id="btn-back-folders">← All Folders</button>
        <span style="color: var(--text-tertiary);">/</span>
        <span style="font-weight: 600;">${folder.name}</span>
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

  function renderOwnedModal() {
    if (!addingSection) return '';
    const owned = storage.getOwnedPerfumes();

    if (addingSection === 'monAccord') {
      return `
        <div class="modal-overlay" id="vault-owned-modal-overlay">
          <div class="modal vault-owned-modal">
            <div class="modal__header">
              <h3 class="modal__title">Add Mon Accord Perfume</h3>
              <button class="modal__close" id="vault-close-owned-modal">✕</button>
            </div>
            <div class="modal__body">
              <p class="vault-owned-modal-subtitle">Choose one of the six regions, then select Spray or Oil.</p>
              <div class="vault-region-grid">
                ${REGIONS.map(region => {
                  const spray = PERFUMES.find(p => p.region === region.id && p.format === 'spray');
                  const oil = PERFUMES.find(p => p.region === region.id && p.format === 'oil');
                  return `
                    <div class="vault-region-card" style="--region-color:${region.color};">
                      <p class="vault-region-card__title">${region.icon} ${region.name}</p>
                      <div class="vault-region-card__actions">
                        ${spray ? `<button class="btn btn--secondary btn--sm vault-owned-add-btn" data-type="monAccord" data-id="${spray.id}" ${owned.monAccord.includes(spray.id) ? 'disabled' : ''}>💨 Spray ${owned.monAccord.includes(spray.id) ? '✓' : ''}</button>` : ''}
                        ${oil ? `<button class="btn btn--secondary btn--sm vault-owned-add-btn" data-type="monAccord" data-id="${oil.id}" ${owned.monAccord.includes(oil.id) ? 'disabled' : ''}>💧 Oil ${owned.monAccord.includes(oil.id) ? '✓' : ''}</button>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const unownedLoreal = LOREAL_LUXE_PERFUMES.filter(p => !owned.loreal.includes(p.id));
    const brands = [...new Set(unownedLoreal.map(p => p.brand))].sort((a, b) => a.localeCompare(b));
    const brandItems = selectedLorealBrand ? unownedLoreal.filter(p => p.brand === selectedLorealBrand) : [];

    return `
      <div class="modal-overlay" id="vault-owned-modal-overlay">
        <div class="modal vault-owned-modal">
          <div class="modal__header">
            <h3 class="modal__title">Add L'Oréal Luxe Perfume</h3>
            <button class="modal__close" id="vault-close-owned-modal">✕</button>
          </div>
          <div class="modal__body">
            ${!selectedLorealBrand ? `
              <p class="vault-owned-modal-subtitle">First choose a brand.</p>
              <div class="vault-brand-grid">
                ${brands.map(brand => `<button class="btn btn--secondary vault-brand-btn" data-brand="${brand}">${brand}</button>`).join('')}
              </div>
            ` : `
              <div class="flex" style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
                <p class="vault-owned-modal-subtitle" style="margin:0;">${selectedLorealBrand}</p>
                <button class="btn btn--ghost btn--sm" id="vault-back-to-brands">← Brands</button>
              </div>
              <div class="vault-loreal-list">
                ${brandItems.length ? brandItems.map(item => `
                  <div class="vault-loreal-item">
                    <div>
                      <p class="vault-loreal-item__name">${item.name}</p>
                      <p class="vault-loreal-item__meta">${item.family}</p>
                    </div>
                    <button class="btn btn--primary btn--sm vault-owned-add-btn" data-type="loreal" data-id="${item.id}">Add</button>
                  </div>
                `).join('') : `<p style="font-size:var(--text-sm);color:var(--text-tertiary);">All perfumes in this brand are already added.</p>`}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents(vault) {
    container.querySelectorAll('.vault-folder-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.vault-folder-delete')) return;
        const folderId = card.dataset.folder;
        activeFolder = folders.find(f => f.id === folderId);
        render();
      });
    });

    container.querySelectorAll('.vault-folder-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.delete;
        const currentVault = storage.getVault();
        currentVault.forEach(f => { if (f.folderId === id) f.folderId = undefined; });
        storage.set('vault', currentVault);
        folders = folders.filter(f => f.id !== id);
        saveFolders();
        render();
      });
    });

    const createBtn = container.querySelector('#btn-create-folder');
    if (createBtn) createBtn.addEventListener('click', () => { showCreateFolder = true; render(); });

    const saveBtn = container.querySelector('#btn-save-folder');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const nameInput = container.querySelector('#new-folder-name');
        const name = nameInput.value.trim();
        if (name) {
          folders.push({ id: 'folder-' + Date.now(), name });
          saveFolders();
          showCreateFolder = false;
          render();
        }
      });
    }

    const cancelBtn = container.querySelector('#btn-cancel-folder');
    if (cancelBtn) cancelBtn.addEventListener('click', () => { showCreateFolder = false; render(); });

    const backBtn = container.querySelector('#btn-back-folders');
    if (backBtn) backBtn.addEventListener('click', () => { activeFolder = null; render(); });

    const labBtn = container.querySelector('#go-to-lab');
    if (labBtn) labBtn.addEventListener('click', () => navigate('#lab'));

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

    container.querySelectorAll('.vault-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        storage.removeFormula(btn.dataset.id);
        render();
        window.showToast('Formula removed from vault.');
      });
    });

    container.querySelectorAll('.vault-move-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const folderId = sel.value;
        if (!folderId) return;
        const currentVault = storage.getVault();
        const formula = currentVault.find(f => f.id === sel.dataset.id);
        if (formula) {
          formula.folderId = folderId;
          storage.set('vault', currentVault);
          render();
          window.showToast('Formula moved to folder.');
        }
      });
    });

    container.querySelectorAll('.vault-add-owned-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addingSection = btn.dataset.section;
        selectedLorealBrand = null;
        render();
      });
    });

    container.querySelectorAll('.vault-cancel-owned-btn').forEach(btn => {
      btn.addEventListener('click', () => { addingSection = null; selectedLorealBrand = null; render(); });
    });

    container.querySelectorAll('.vault-owned-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const owned = storage.getOwnedPerfumes();
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        if (!owned[type].includes(id)) {
          owned[type] = [...owned[type], id];
          storage.setOwnedPerfumes(owned);
          window.showToast('Added to your collection.');
        }
        if (type === 'monAccord') addingSection = null;
        render();
      });
    });

    container.querySelectorAll('.vault-brand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedLorealBrand = btn.dataset.brand;
        render();
      });
    });

    const backToBrandsBtn = container.querySelector('#vault-back-to-brands');
    if (backToBrandsBtn) backToBrandsBtn.addEventListener('click', () => { selectedLorealBrand = null; render(); });

    const closeOwnedModalBtn = container.querySelector('#vault-close-owned-modal');
    if (closeOwnedModalBtn) {
      closeOwnedModalBtn.addEventListener('click', () => {
        addingSection = null;
        selectedLorealBrand = null;
        render();
      });
    }

    const ownedModalOverlay = container.querySelector('#vault-owned-modal-overlay');
    if (ownedModalOverlay) {
      ownedModalOverlay.addEventListener('click', (e) => {
        if (e.target.id === 'vault-owned-modal-overlay') {
          addingSection = null;
          selectedLorealBrand = null;
          render();
        }
      });
    }

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
      grid-template-columns: minmax(0, 1.55fr) minmax(18rem, var(--sidebar-width));
      gap: var(--space-2xl);
      align-items: start;
    }

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
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
    }

    .vault-folder-card {
      text-align: center;
      padding: var(--space-xl) var(--space-md);
      position: relative;
      width: 160px;
      height: 160px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--space-xs);
    }

    .vault-folder-icon {
      width: 52px;
      height: 52px;
      object-fit: contain;
      margin-bottom: var(--space-xs);
    }

    .vault-folder-name { font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px; }
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
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
      min-height: var(--card-min-regular);
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

    .vault-owned-modal {
      width: min(980px, calc(100vw - 2rem));
      max-height: min(600px, calc(100vh - 4rem));
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .vault-owned-modal .modal__body {
      overflow-y: auto;
      flex: 1;
      min-height: 0;
    }

    .vault-owned-modal-subtitle {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin-bottom: var(--space-md);
    }

    .vault-region-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-md);
    }

    .vault-region-card {
      border: 1px solid var(--border);
      border-left: 3px solid var(--region-color);
      border-radius: var(--radius-md);
      padding: var(--space-md);
      background: var(--bg-primary);
      min-height: 9.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .vault-region-card__title {
      font-size: var(--text-sm);
      font-weight: 600;
      margin-bottom: var(--space-sm);
    }

    .vault-region-card__actions {
      display: flex;
      gap: var(--space-sm);
      flex-wrap: wrap;
    }

    .vault-brand-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--space-sm);
    }

    .vault-loreal-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .vault-loreal-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-sm);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-sm) var(--space-md);
    }

    .vault-loreal-item__name {
      font-size: var(--text-sm);
      font-weight: 600;
      margin: 0;
    }

    .vault-loreal-item__meta {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      margin: 0;
    }

    @media (max-width: 1100px) {
      .vault-main-layout { grid-template-columns: 1fr; }
      .vault-myperfumes-col { position: static; }
    }


    @media (max-width: 640px) {
      .vault-formulas-list,
      .vault-region-grid,
      .vault-brand-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}
