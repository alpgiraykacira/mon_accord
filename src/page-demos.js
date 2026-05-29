// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Page-Specific Demo Sequences
// ═══════════════════════════════════════════════════════════════

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function injectPageDemoStyles() {
  if (document.getElementById('pd-styles')) return;
  const s = document.createElement('style');
  s.id = 'pd-styles';
  s.textContent = `
    @keyframes pd-glow-in {
      0%   { box-shadow: 0 0 0 0px rgba(200,169,126,0.00), 0 0  0px rgba(200,169,126,0.00); }
      100% { box-shadow: 0 0 0 4px rgba(200,169,126,0.55), 0 0 35px rgba(200,169,126,0.20); }
    }
    @keyframes pd-glow-pulse {
      0%,100% { box-shadow: 0 0 0 3px rgba(200,169,126,0.45), 0 0 25px rgba(200,169,126,0.15); }
      50%     { box-shadow: 0 0 0 6px rgba(200,169,126,0.80), 0 0 55px rgba(200,169,126,0.32); }
    }
    @keyframes pd-glow-out {
      0%   { box-shadow: 0 0 0 3px rgba(200,169,126,0.45), 0 0 25px rgba(200,169,126,0.15); }
      100% { box-shadow: 0 0 0 0px rgba(200,169,126,0.00), 0 0  0px rgba(200,169,126,0.00); }
    }
    /* outline variant — not clipped by overflow, used for elements inside scroll containers */
    @keyframes pd-ol-in    { 0% { outline-color: rgba(200,169,126,0.00); } 100% { outline-color: rgba(200,169,126,0.75); } }
    @keyframes pd-ol-pulse { 0%,100% { outline-color: rgba(200,169,126,0.55); } 50% { outline-color: rgba(200,169,126,0.95); } }
    @keyframes pd-ol-out   { 0% { outline-color: rgba(200,169,126,0.55); } 100% { outline-color: rgba(200,169,126,0.00); } }
    .pd-highlight {
      border-radius: 12px !important;
      animation: pd-glow-in 0.9s ease forwards,
                 pd-glow-pulse 2.2s ease-in-out 0.9s infinite !important;
    }
    .pd-highlight--out {
      border-radius: 12px !important;
      animation: pd-glow-out 0.9s ease forwards !important;
    }
    /* inner variant — outline only, won't be clipped by canvas overflow */
    .pd-highlight-inner {
      border-radius: 12px !important;
      outline: 2px solid rgba(200,169,126,0.00) !important;
      outline-offset: 5px !important;
      animation: pd-ol-in 0.9s ease forwards,
                 pd-ol-pulse 2.2s ease-in-out 0.9s infinite !important;
    }
    .pd-highlight-inner--out {
      border-radius: 12px !important;
      outline: 2px solid rgba(200,169,126,0.55) !important;
      outline-offset: 5px !important;
      animation: pd-ol-out 0.9s ease forwards !important;
    }
  `;
  document.head.appendChild(s);
}

// ── Highlight helpers ──────────────────────────────────────────
function hlOn(els) {
  (Array.isArray(els) ? els : [els]).forEach(el => {
    el.classList.remove('pd-highlight--out');
    el.classList.add('pd-highlight');
  });
}
async function hlOff(els) {
  const arr = Array.isArray(els) ? els : [els];
  arr.forEach(el => { el.classList.remove('pd-highlight'); el.classList.add('pd-highlight--out'); });
  await sleep(900);
  arr.forEach(el => el.classList.remove('pd-highlight--out'));
}
// Inner variant — outline only, safe inside overflow:auto/scroll containers
function hlInnerOn(el) {
  el.classList.remove('pd-highlight-inner--out');
  el.classList.add('pd-highlight-inner');
}
async function hlInnerOff(el) {
  el.classList.remove('pd-highlight-inner');
  el.classList.add('pd-highlight-inner--out');
  await sleep(900);
  el.classList.remove('pd-highlight-inner--out');
}

// ── Profile Page Demo ──────────────────────────────────────────
async function runProfileDemo() {
  injectPageDemoStyles();

  const hero = document.querySelector('.profile-hero');
  const summaryCard = document.querySelector('.profile-summary-card');
  if (!hero || !summaryCard) return;

  // Scroll to top so both hero + summary card are in view
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await sleep(600);

  // ── Phase 1 (2s): show hero + summary card together ──
  await sleep(2000);

  // ── Phase 2 (3s): highlight summary card ──
  hlOn(summaryCard);
  await sleep(3000);
  await hlOff(summaryCard);
  await sleep(400);

  // ── Scroll to Recommended Combinations ──
  const grids = document.querySelectorAll('.recommendation-grid');
  const firstGrid = grids[0];
  if (!firstGrid) return;

  const firstSection = firstGrid.closest('.mt-xl') || firstGrid.parentElement;
  const top = (firstSection || firstGrid).getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  await sleep(700);

  // ── 1s wait after scroll ──
  await sleep(1000);

  // ── Phase 4 (2s): highlight top 3 cards (Mon Accord grid) ──
  const topCards = [...(grids[0]?.querySelectorAll('.combo-card') || [])];
  hlOn(topCards);
  await sleep(2000);
  await hlOff(topCards);

  // ── Phase 5 (2s): highlight bottom 3 cards (L'Oréal Luxe grid) ──
  const bottomCards = [...(grids[1]?.querySelectorAll('.combo-card') || [])];
  if (bottomCards.length) {
    const secondSection = grids[1]?.closest('.mt-xl') || grids[1]?.parentElement;
    if (secondSection) {
      const top2 = secondSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top2), behavior: 'smooth' });
      await sleep(400);
    }
    hlOn(bottomCards);
    await sleep(2000);
    await hlOff(bottomCards);
  }
}

// ── Layering Lab Page Demo ─────────────────────────────────────
async function runLabDemo() {
  injectPageDemoStyles();

  // ── 2s initial wait ──
  window.scrollTo({ top: 0, behavior: 'auto' });
  await sleep(2000);

  // ── Step 1 (~5s): Select chips + intensity + fake loading + inject context ──
  const advisor = document.querySelector('.lab-advisor');
  if (advisor) {
    const advisorTop = advisor.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, advisorTop), behavior: 'smooth' });
  }
  await sleep(700);

  const chipSelections = [
    ['#mood-chips',     'romantic'],
    ['#occasion-chips', 'date-night'],
    ['#season-chips',   'autumn'],
    ['#time-chips',     'evening'],
  ];
  for (const [groupId, value] of chipSelections) {
    document.querySelector(`${groupId} [data-value="${value}"]`)?.click();
    await sleep(450);
  }

  // Slide intensity to Present (value 7)
  const slider = document.querySelector('#advisor-intensity');
  if (slider) {
    slider.value = 7;
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }
  await sleep(500);

  // Show loading state on Get Recommendation button
  const adviceBtn = document.querySelector('#btn-get-advice');
  if (adviceBtn) {
    adviceBtn.innerHTML = '<span class="loading-spinner"></span> Crafting...';
    adviceBtn.disabled = true;
  }
  await sleep(1100);

  // Inject real contextResult into the lab closure + re-render
  window.__labSetDemoContext?.({
    formulaName: 'Evening Accord',
    reasoning: 'A confident, romantic blend for a date night — woody base anchors the floral heart.',
    scentPreview: 'Opens with bergamot, blooms into iris, settles into warm sandalwood.',
    tips: 'Apply to pulse points for intimate sillage.',
    layers: [
      { perfumeId: 'scandinavian-spray',  amount: 3, unit: 'sprays' },
      { perfumeId: 'mediterranean-spray', amount: 2, unit: 'sprays' },
      { perfumeId: 'eastasia-oil',        amount: 2, unit: 'drops'  },
    ],
  });
  // After __labSetDemoContext calls render(), DOM is fresh — wait a tick then scroll to result
  await sleep(150);

  // ── Step 2 (~3s): Scroll to result, highlight, click real Apply ──
  const resultEl = document.querySelector('#advisor-result');
  if (resultEl) {
    const resultTop = resultEl.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, resultTop), behavior: 'smooth' });
    await sleep(700);
    hlOn(resultEl);
    await sleep(1500);
    await hlOff(resultEl);
    await sleep(300);
    document.querySelector('#btn-apply-recommendation')?.click();
    await sleep(500);
  }

  // ── Step 3: Canvas highlight + Simulate Scent + AI response ──
  await sleep(300);
  const canvas = document.querySelector('.lab-canvas');
  if (canvas) {
    canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await sleep(600);
    hlOn(canvas);
    await sleep(1000);
    await hlOff(canvas);
  }

  // Click simulate (fake: show loading, inject result)
  const simBtn = document.querySelector('#btn-simulate');
  if (simBtn) {
    simBtn.innerHTML = '<span class="loading-spinner"></span> Simulating...';
    simBtn.disabled = true;
  }
  await sleep(1000);

  let simResult = document.querySelector('#simulation-result');
  const actionsEl = document.querySelector('#lab-actions');
  if (!simResult && actionsEl) {
    simResult = document.createElement('div');
    simResult.id = 'simulation-result';
    simResult.className = 'ai-response mt-lg';
    simResult.style.margin = '0 6px';
    actionsEl.insertAdjacentElement('afterend', simResult);
  }
  if (simResult) {
    simResult.innerHTML = `
      <div class="ai-response__label">✦ Virtual Scent Simulation</div>
      <div class="ai-response__text">
        <p><strong style="color:var(--accent);">OPENING:</strong> Bright bergamot and cool Nordic air — confident, uplifting, immediate.</p>
        <p><strong style="color:var(--accent);">HEART:</strong> Warm iris and Mediterranean florals — romantic, intimate, quietly refined.</p>
        <p><strong style="color:var(--accent);">DRY DOWN:</strong> East Asian woods and soft musk — quiet authority that lingers for hours.</p>
        <p><strong style="color:var(--accent);">SILLAGE:</strong> Present — fills the room gently, confident without overwhelming.</p>
      </div>
    `;
  }
  if (simBtn) {
    simBtn.innerHTML = '✦ Simulate Scent';
    simBtn.disabled = false;
  }

  // Scroll canvas to sim result + highlight
  await sleep(200);
  if (simResult) {
    if (canvas) canvas.scrollTo({ top: canvas.scrollHeight, behavior: 'smooth' });
    else simResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await sleep(700);
    simResult.style.margin = '0 6px';
    hlInnerOn(simResult);
    await sleep(1800);
    await hlInnerOff(simResult);
  }

  // ── Step 4: Clear all (visible) ──
  await sleep(400);
  document.querySelector('#btn-clear-layers')?.click();
  await sleep(500);

  // ── Step 5: Scroll down to Select Layers + pick 3 bottles ──
  const addSection = document.querySelector('#lab-add-section');
  if (addSection) {
    const addTop = addSection.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, addTop), behavior: 'smooth' });
    await sleep(700);

    const manualIds = ['middleeast-spray', 'southamerica-spray', 'southafrica-oil'];
    for (const id of manualIds) {
      const btn = document.querySelector(`.lab-bottle-btn[data-id="${id}"]`);
      if (btn) {
        btn.click();
        await sleep(400);
      }
    }
  }
}

// ── Vault Page Demo ────────────────────────────────────────────
async function runVaultDemo() {
  injectPageDemoStyles();

  // Force re-seed so folder counts reflect DEFAULT_FORMULAS (3,4,2,1,3)
  window.__vaultForceReseed?.();
  await sleep(200);

  // ── Phase 1 (2s): show full page ──
  window.scrollTo({ top: 0, behavior: 'auto' });
  await sleep(2000);

  // ── Phase 2 (3s): zoom folders grid ──
  const foldersGrid = document.querySelector('.vault-folders-grid');
  if (foldersGrid) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await sleep(500);

    foldersGrid.style.transition = 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
    foldersGrid.style.transformOrigin = 'top center';
    foldersGrid.style.transform = 'scale(1.06)';
    hlOn(foldersGrid);
    await sleep(3000);

    foldersGrid.style.transform = 'scale(1)';
    await hlOff(foldersGrid);
    await sleep(600);
    foldersGrid.style.transform = '';
    foldersGrid.style.transition = '';
    foldersGrid.style.transformOrigin = '';
  }

  // ── Phase 3 (3s): zoom My Perfumes panel ──
  const myPerfumesCol = document.querySelector('.vault-myperfumes-col');
  if (myPerfumesCol) {
    myPerfumesCol.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await sleep(600);

    myPerfumesCol.style.transition = 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)';
    myPerfumesCol.style.transformOrigin = 'top center';
    myPerfumesCol.style.transform = 'scale(1.04)';
    hlOn(myPerfumesCol);
    await sleep(3000);

    myPerfumesCol.style.transform = 'scale(1)';
    await hlOff(myPerfumesCol);
    await sleep(600);
    myPerfumesCol.style.transform = '';
    myPerfumesCol.style.transition = '';
    myPerfumesCol.style.transformOrigin = '';
  }
}

// ── Registry ──────────────────────────────────────────────────
const PAGE_DEMOS = {
  '#profile': runProfileDemo,
  '#lab':     runLabDemo,
  '#vault':   runVaultDemo,
};

export function hasPageDemo(route) {
  return route in PAGE_DEMOS;
}

export function startPageDemo(route) {
  const demo = PAGE_DEMOS[route];
  if (!demo) {
    window.showToast?.('Bu sayfa için demo mevcut değil.', 'info');
    return;
  }
  demo().catch(err => console.error('[page-demo]', err));
}
