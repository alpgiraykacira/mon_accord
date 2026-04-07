// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MON ACCORD â€” Demo Tour v3
// Smart card positioning â€¢ Flash transitions â€¢ 26 steps
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ Utilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function smoothScrollToEl(el, offset) {
  if (!el) return sleep(0);
  var off = offset !== undefined ? offset : 90;
  var top = el.getBoundingClientRect().top + window.scrollY - off;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return sleep(700);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function snapshotStorage(store) {
  const snapshot = {};
  for (let i = 0; i < store.length; i += 1) {
    const key = store.key(i);
    if (key) snapshot[key] = store.getItem(key);
  }
  return snapshot;
}

function restoreStorage(store, snapshot) {
  store.clear();
  Object.entries(snapshot || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      store.setItem(key, value);
    }
  });
}

// Flash overlay for cross-page transitions
async function flashTransition() {
  const flash = document.createElement('div');
  flash.id = 'dt-flash';
  flash.style.cssText = `
    position:fixed;inset:0;z-index:99994;
    background:rgba(200,169,126,0.07);
    pointer-events:none;opacity:0;
    transition:opacity 0.18s ease;
  `;
  document.body.appendChild(flash);
  requestAnimationFrame(() => requestAnimationFrame(() => { flash.style.opacity = '1'; }));
  await sleep(210);
  flash.style.opacity = '0';
  setTimeout(() => flash.remove(), 230);
}

// Navigate to a hash; show flash overlay on cross-page transitions.
async function goTo(hash) {
  if (window.location.hash !== hash) flashTransition();
  if (window.location.hash === hash) {
    window.location.hash = '#_nav';
    await sleep(150);
  }
  window.location.hash = hash;
  await sleep(450);
}

function waitForEl(selector, fallback, timeout = 2000) {
  return new Promise(resolve => {
    const find = () =>
      document.querySelector(selector) ||
      (fallback ? document.querySelector(fallback) : null);

    const el = find();
    if (el) { resolve(el); return; }

    const obs = new MutationObserver(() => {
      const found = find();
      if (found) { obs.disconnect(); clearTimeout(t); resolve(found); }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    const t = setTimeout(() => {
      obs.disconnect();
      resolve(document.getElementById('page-content') || document.body);
    }, timeout);
  });
}

// â”€â”€ Demo profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEMO_PROFILE = {
  username: 'Alp',
  archetypeName: 'The Elegant Minimalist',
  description:
    'You are drawn to understated sophistication - scents that whisper rather than shout. ' +
    'Your olfactory identity is defined by clean precision, refined florals, and the quiet ' +
    'depth of woody bases. You seek harmony, not performance.',
  primaryFamilies: ['floral', 'woody', 'citrus'],
  sillageProfile: 'Medium - intimate yet memorable, discovered only in close proximity.',
  notePreferences: {
    loves:   ['iris', 'sandalwood', 'bergamot', 'white musk'],
    explore: ['oud', 'rose', 'vetiver', 'ambergris'],
    avoid:   ['heavy synthetics', 'excessive sweetness', 'dense patchouli'],
  },
  recommendedRegions: ['scandinavian', 'mediterranean', 'eastasia'],
  updatedAt: Date.now(),
};

const PROFILE_STORAGE_KEY = 'monaccord_profile';
const QUIZ_STATE_KEY      = 'monaccord_quiz_state';
const DEBUG_STEP_DURATION = 10 * 60 * 1000;
let _savedHash = '';
let _savedLocalStorage = null;
let _savedSessionStorage = null;
let _savedRetakeQuiz = undefined;

// â”€â”€ Tour steps â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// samePage: true â†’ same-page transition with no navigation
const STEPS = [

  // â”€â”€ 01 Hero â€” intro overview â”€â”€
  {
    title: 'Mon Accord',
    run: async () => {
      await goTo('#landing');
      window.scrollTo({ top: 0, behavior: 'auto' });
      return await waitForEl('#hero-section .hero__content', '#hero-section', 2000);
    },
    duration: 3500,
  },

  // â”€â”€ 02 Regions â€” focus on one region card â”€â”€
  {
    title: 'Six World Regions',
    run: async () => {
      const section = document.querySelector('#regions-section');
      if (section) { await smoothScrollToEl(section, 60); }
      return document.querySelector('.region-card') || section || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 03 Notes popup â”€â”€
  {
    title: 'Spray & Oil Notes',
    run: async () => {
      document.querySelector('.notes-popup')?.remove();
      document.querySelector('.region-format-btn[data-format="spray"]')?.click();
      await sleep(250);
      document.querySelector('.notes-popup')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      await sleep(300);
      return document.querySelector('.notes-popup__inner')
          || document.querySelector('#regions-section');
    },
    duration: 4000,
  },

  // â”€â”€ 04 (NEW) Take the Quiz CTA â”€â”€
  {
    title: 'Take the Quiz',
    samePage: true,
    run: async () => {
      document.querySelector('.notes-popup')?.remove();
      // Scroll to the bottom CTA section
      const ctaSection = document.querySelector('#cta-section');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
      await sleep(700);
      const btn = document.querySelector('#bottom-cta');
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await sleep(500);
              }
      // Return the CTA button as highlight target (navigation happens in step 05)
      return btn || document.querySelector('#cta-section') || document.querySelector('.page__container');
    },
    duration: 3000,
  },

  // â”€â”€ 05 Quiz â€” Step 1 (username) â”€â”€
  {
    title: 'Step 1 - Your Name',
    run: async () => {
      document.querySelector('.notes-popup')?.remove();
      localStorage.removeItem(QUIZ_STATE_KEY);
      window.__retakeQuiz = true;
      await goTo('#profile');
      const el = await waitForEl('.quiz-container', '.page__container', 2500);
      await sleep(300);
      const inp = document.querySelector('#quiz-username');
      if (inp) {
        inp.focus();
        for (const ch of 'Alp') {
          inp.value += ch;
          inp.dispatchEvent(new Event('input'));
          await sleep(120);
        }
      }
      return el;
    },
    duration: 2500,
  },

  // â”€â”€ 06 Quiz â€” Step 2 (scent families) â”€â”€
  {
    title: 'Step 2 - Scent Families',
    run: async () => {
      document.querySelector('#quiz-next')?.click();
      await sleep(400);
      const opts = [...document.querySelectorAll('.quiz-grid--families .quiz-option')];
      for (const opt of opts.slice(0, 3)) { opt.click(); await sleep(280); }
      return document.querySelector('.quiz-grid--families')
          || document.querySelector('.quiz-container');
    },
    duration: 2500,
  },

  // â”€â”€ 06 Quiz â€” Step 3 (known perfumes) â”€â”€
  {
    title: 'Step 3 - Perfumes You Love',
    run: async () => {
      document.querySelector('#quiz-next')?.click();
      await sleep(450);
      const opts = [...document.querySelectorAll('.quiz-option--perfume')];
      for (const opt of opts.slice(0, 2)) { opt.click(); await sleep(220); }
      return document.querySelector('.quiz-perfume-list')
          || document.querySelector('.quiz-container');
    },
    duration: 2500,
  },

  // â”€â”€ 07 Quiz â€” Step 4 (sliders) â”€â”€
  {
    title: 'Step 4 - Performance',
    run: async () => {
      document.querySelector('#quiz-next')?.click();
      await sleep(400);
      // Set slider values: sillage=7, longevity=10, intensity=5
      const sliderDefs = [
        { id: 'slider-sillage',   valId: 'sillage-val',   target: 7  },
        { id: 'slider-longevity', valId: 'longevity-val', target: 10 },
        { id: 'slider-intensity', valId: 'intensity-val', target: 5  },
      ];
      for (const def of sliderDefs) {
        const slider = document.querySelector('#' + def.id);
        if (slider) {
          slider.value = def.target;
          slider.dispatchEvent(new Event('input', { bubbles: true }));
          await sleep(350);
        }
      }
      return document.querySelector('.quiz-sliders')
          || document.querySelector('.quiz-container');
    },
    duration: 2500,
  },

  // â”€â”€ 08 Quiz â€” Step 5 (personality + type notes) â”€â”€
  {
    title: 'Step 5 - Your Personality',
    run: async () => {
      document.querySelector('#quiz-next')?.click();
      await sleep(400);
      const elegant = document.querySelector('[id="ctx-elegant"]')
                   || document.querySelector('.quiz-grid--context .quiz-option');
      elegant?.click();
      await sleep(300);
      // Type a sentence into "Any additional notes?" textarea
      const notes = document.querySelector('#quiz-notes');
      if (notes) {
        notes.focus();
        const sentence = 'I love the scent of fresh linen and evening air.';
        for (const ch of sentence) {
          notes.value += ch;
          notes.dispatchEvent(new Event('input'));
          await sleep(38);
        }
      }
      return document.querySelector('.quiz-grid--context')
          || document.querySelector('.quiz-container');
    },
    duration: 5500,
  },

  // â”€â”€ 09 Profile result â€” inject demo profile and show the result view â”€â”€
  {
    title: 'Your Olfactory Profile',
    run: async () => {
      // Inject demo profile + owned perfumes so result & vault pages render correctly
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEMO_PROFILE));
      localStorage.setItem('monaccord_my_perfumes', JSON.stringify({
        monAccord: ['scandinavian-spray', 'eastasia-spray', 'mediterranean-oil'],
        loreal: ['ysl-libre', 'ysl-black-opium'],
      }));
      window.__retakeQuiz = false;
      // Re-render profile page in-place (no vault flash)
      window.dispatchEvent(new Event('hashchange'));
      await sleep(500);
      window.scrollTo({ top: 0, behavior: 'auto' });
      await waitForEl('.profile-result', '.page__container', 3000);
      return document.querySelector('.section-header')
          || document.querySelector('.profile-result')
          || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 10 Profile â€” identity details â”€â”€
  {
    title: 'Identity & Preferences',
    run: async () => {
      const section = document.querySelector('.profile-overview');
      const el = document.querySelector('.profile-details') || section;
      await smoothScrollToEl(section);
      return el || document.querySelector('.profile-result');
    },
    duration: 4000,
  },

  // â”€â”€ 11 Mon Accord recommendations â”€â”€
  {
    title: 'Mon Accord Combinations',
    run: async () => {
      const grid = document.querySelectorAll('.recommendation-grid')[0];
      const heading = grid?.previousElementSibling?.previousElementSibling || grid;
      const el = grid?.querySelector('.combo-card') || grid;
      await smoothScrollToEl(heading || el, 80);
      return el || document.querySelector('.profile-result');
    },
    duration: 4000,
  },

  // â”€â”€ 12 L'OrÃ©al Luxe recommendations â”€â”€
  {
    title: "L'Oreal Luxe Combinations",
    run: async () => {
      const grids = document.querySelectorAll('.recommendation-grid');
      const grid = grids.length > 1 ? grids[1] : grids[0];
      const heading = grid?.previousElementSibling?.previousElementSibling || grid;
      const el = grid?.querySelector('.combo-card') || grid;
      await smoothScrollToEl(heading || el, 80);
      return el || document.querySelector('.profile-result');
    },
    duration: 4000,
  },

  // â”€â”€ 13 Shop â”€â”€
  {
    title: 'Shop - Build Your Collection',
    run: async () => {
      const buyBtn = document.querySelector('[data-buy-combo]');
      if (buyBtn) { buyBtn.click(); await sleep(600); }
      else { await goTo('#shop'); }
      return await waitForEl('.shop-region-card', '.shop-layout', 2000);
    },
    duration: 4000,
  },

  // â”€â”€ 14 Add to Cart â”€â”€
  {
    title: 'Add to Cart',
    run: async () => {
      const btns = [...document.querySelectorAll('.shop-product__btn:not(.shop-product__btn--added)')];
      if (btns[0]) { btns[0].click(); await sleep(180); }
      if (btns[1]) { btns[1].click(); await sleep(180); }
      const cart = document.querySelector('.shop-cart');
      cart?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(300);
      return cart || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 15 Order confirmation â”€â”€
  {
    title: 'Now Available',
    run: async () => {
      document.querySelector('#btn-confirm-order')?.click();
      await sleep(350);
      return document.querySelector('.order-confirmed-modal')
          || document.querySelector('.modal-overlay')
          || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 16 Layering Lab â”€â”€
  {
    title: 'The Layering Lab',
    run: async () => {
      document.querySelector('.modal-overlay')?.remove();
      await goTo('#lab');
      window.scrollTo({ top: 0, behavior: 'auto' });
      await sleep(200);
      const addBtns = [...document.querySelectorAll('.lab-add-btn:not(.lab-add-btn--added)')];
      if (addBtns[0]) { addBtns[0].click(); await sleep(200); }
      if (addBtns[2]) { addBtns[2].click(); await sleep(200); }
      await sleep(300);
      return document.querySelector('#lab-layers') || document.querySelector('#lab-add-section');
    },
    duration: 5000,
  },

  // ── 17 Simulate Scent — inject fake simulation output ──
  {
    title: 'Virtual Scent Simulation',
    samePage: true,
    run: async () => {
      const simBtn = document.querySelector('#btn-simulate');
      if (simBtn) {
        await smoothScrollToEl(simBtn);
        // Show loading state briefly
        simBtn.innerHTML = '<span class=”loading-spinner”></span> Simulating...';
        simBtn.disabled = true;
        await sleep(1200);
        simBtn.innerHTML = '✦ Simulate Scent';
        simBtn.disabled = false;
      }
      // Inject a fake simulation result
      let result = document.querySelector('#simulation-result');
      if (!result) {
        result = document.createElement('div');
        result.id = 'simulation-result';
        result.className = 'ai-response mt-lg';
        const actionsEl = document.querySelector('#lab-actions');
        if (actionsEl) {
          actionsEl.insertAdjacentElement('afterend', result);
        } else {
          document.querySelector('#lab-layers')?.appendChild(result);
        }
      }
      if (result) {
        result.style.display = '';
        result.innerHTML = `
          <div class=”ai-response__label”>✦ Virtual Scent Simulation</div>
          <div class=”ai-response__text”>
            <p><strong style=”color: var(--accent);”>OPENING:</strong> A bright burst of bergamot and yuzu zest — sparkling, citrus-forward, immediately uplifting.</p>
            <p><strong style=”color: var(--accent);”>HEART:</strong> The iris and white tea settle into a soft floral corridor, whispering elegance without weight.</p>
            <p><strong style=”color: var(--accent);”>DRY DOWN:</strong> Sandalwood and sheer musk create a warm, skin-close finish that lingers for hours.</p>
            <p><strong style=”color: var(--accent);”>SILLAGE:</strong> Medium — intimate yet memorable, discovered only in close proximity.</p>
          </div>
        `;
        await smoothScrollToEl(result);
      }
      return result || document.querySelector('#lab-layers') || document.querySelector('.page__container');
    },
    duration: 4500,
  },

  // â”€â”€ 18 AI Advisor â€” inject fake output â”€â”€
  {
    title: 'AI Contextual Advisor',
    run: async () => {
      const el = document.querySelector('.lab-advisor');
      await smoothScrollToEl(el);
      document.querySelector('#mood-chips .lab-chip')?.click();     await sleep(100);
      document.querySelector('#occasion-chips .lab-chip')?.click(); await sleep(100);
      document.querySelector('#season-chips .lab-chip')?.click();   await sleep(250);
      // Inject a simulated AI response so the demo looks live
      let result = document.querySelector('#advisor-result');
      if (!result) {
        result = document.createElement('div');
        result.id = 'advisor-result';
        result.className = 'lab-advisor__result mt-lg';
        document.querySelector('.lab-advisor__form')?.insertAdjacentElement('afterend', result);
      }
      if (result) {
        result.style.display = '';
        result.innerHTML = `
          <div style="padding:var(--space-md);background:rgba(200,169,126,0.06);border-radius:var(--radius-md);border:1px solid rgba(200,169,126,0.18);">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">Combination Tip</div>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.65;margin:0;">
              For a <strong style="color:var(--text-primary);">romantic evening</strong>, your current blend reads beautifully - the bergamot top note softens into the woody base creating quiet intimacy. Consider adding a touch of rose absolute to amplify the floral heart without overpowering the composition.
            </p>
          </div>
        `;
      }
      return result || document.querySelector('.lab-advisor__form') || el || document.querySelector('.page__container');
    },
    duration: 5000,
  },

  // â”€â”€ 18 (NEW) Save to Vault â”€â”€
  {
    title: 'Save to Vault',
    samePage: true,
    run: async () => {
      const saveBtn = await waitForEl('#btn-save-formula', '.page__container', 1200);
      if (saveBtn && saveBtn.id === 'btn-save-formula') {
        await smoothScrollToEl(saveBtn);
        saveBtn.click();
        await sleep(450);
      }
      const modal = await waitForEl('#save-vault-overlay .modal', '#save-vault-overlay', 2000);
      const nameInput = document.querySelector('#sv-name');
      if (nameInput) {
        nameInput.value = '';
        nameInput.focus();
        for (const ch of 'Evening Velvet') {
          nameInput.value += ch;
          nameInput.dispatchEvent(new Event('input'));
          await sleep(55);
        }
        await sleep(300);
      }
      const folderSelect = document.querySelector('#sv-folder-dropdown');
      if (folderSelect) {
        const option = [...folderSelect.options].find(o =>
          o.value === 'evening' || o.text.toLowerCase().includes('evening')
        );
        if (option) {
          folderSelect.value = option.value;
          folderSelect.dispatchEvent(new Event('change'));
        }
        await sleep(400);
      }
      return modal || document.querySelector('#save-vault-overlay') || document.querySelector('.page__container');
    },
    duration: 4500,
  },

  // â”€â”€ 19 Vault â€” folders overview â”€â”€
  {
    title: 'Your Vault',
    run: async () => {
      document.querySelector('#sv-confirm')?.click();
      await sleep(350);
      await goTo('#vault');
      return await waitForEl('.vault-folders-col', '.page__container', 2000);
    },
    duration: 4000,
  },

  // â”€â”€ 20 Vault â€” My Perfumes â”€â”€
  {
    title: 'My Perfumes',
    samePage: true,
    run: async () => {
      // my_perfumes data was injected in step 09 — just surface the sticky column
      const el = document.querySelector('.vault-myperfumes-col');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      await sleep(400);
      return el || document.querySelector('.vault-main-layout') || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 22 Community â€” trending combinations â”€â”€
  {
    title: 'Trending Combinations',
    run: async () => {
      await goTo('#community');
      // Duygu fotoğrafının yüklenmesini bekle
      const duyguImg = document.querySelector('.duygu-card__photo');
      if (duyguImg && !duyguImg.complete) {
        await new Promise(resolve => {
          duyguImg.onload = resolve;
          duyguImg.onerror = resolve;
          setTimeout(resolve, 3000);
        });
      }
      await sleep(200);
      return await waitForEl('.community-trending-item', '.community-trending-list', 2000);
    },
    duration: 4000,
  },

  // â”€â”€ 23 Community â€” today's selection â”€â”€
  {
    title: "Today's Selection",
    samePage: true,
    run: async () => {
      const el = document.querySelector('.community-panel--selection');
      await smoothScrollToEl(el);
      return el || document.querySelector('.community-top-grid') || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 24 (NEW) Duygu's Choice â”€â”€
  {
    title: "Duygu's Choice",
    samePage: true,
    run: async () => {
      const el = document.querySelector('.community-duygu-choice');
      if (el) {
        await smoothScrollToEl(el);
        return el;
      }
      return document.querySelector('.community-right-col')
          || document.querySelector('.page__container');
    },
    duration: 4000,
  },

  // â”€â”€ 25 Discussion â€” show post detail (no new-post form) â”€â”€
  {
    title: 'Community Discussion',
    samePage: true,
    run: async () => {
      const section = document.querySelector('.community-discussion-section');
      await smoothScrollToEl(section, 60);
      document.querySelector('.community-post-item')?.click();
      await sleep(300);
      return document.querySelector('.community-discussion-layout')
          || section
          || document.querySelector('.page__container');
    },
    duration: 4500,
  },
];

// â”€â”€ Demo card state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ── Step durations (total = 90 s, 26 steps) ────────────────────────────────
const STEP_DURATIONS = [
  3000, 3500, 3500, 3000, 2500, 2500, 2500, 2500, 5000, 4500, 3000, 4000, 3000,
  3500, 3500, 3500, 4500, 4500, 4000, 3500, 3500, 3500, 3500, 3000, 3500, 3500
];
STEPS.forEach((step, i) => {
  step.duration = STEP_DURATIONS[i] ?? step.duration;
});

function getCardEl()  { return document.getElementById('dt-card'); }
function getProgEl()  { return document.getElementById('dt-prog'); }
function getCdEl()    { return document.getElementById('dt-cd'); }
function getDotsEl()  { return document.getElementById('dt-dots'); }
function getCountEl() { return document.getElementById('dt-count'); }
function getTitleEl() { return document.getElementById('dt-title'); }
function getNextEl()  { return document.getElementById('dt-next'); }

const CARD_MARGIN = 24;
const CARD_GAP = 20;

function positionCard(targetEl) {
  const card = getCardEl();
  if (!card) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = CARD_MARGIN;
  const cardWidth = Math.min(card.offsetWidth || 288, vw - margin * 2);
  const cardHeight = card.offsetHeight || 126;
  let tr = targetEl ? targetEl.getBoundingClientRect() : null;

  if (!tr || (tr.width || 0) === 0 || (tr.height || 0) === 0 || tr.bottom <= 0 || tr.top >= vh || tr.right <= 0 || tr.left >= vw) {
    const fallbackWidth = Math.min(vw - margin * 2, 320);
    const fallbackHeight = Math.min(vh - margin * 2, 160);
    tr = {
      left: (vw - fallbackWidth) / 2,
      top: (vh - fallbackHeight) / 2,
      right: (vw + fallbackWidth) / 2,
      bottom: (vh + fallbackHeight) / 2,
    };
  }

  const targetWidth = tr.right - tr.left;
  const targetHeight = tr.bottom - tr.top;
  const candidates = [
    { placement: 'bottom', x: tr.left + (targetWidth - cardWidth) / 2, y: tr.bottom + CARD_GAP },
    { placement: 'top', x: tr.left + (targetWidth - cardWidth) / 2, y: tr.top - cardHeight - CARD_GAP },
    { placement: 'right', x: tr.right + CARD_GAP, y: tr.top + (targetHeight - cardHeight) / 2 },
    { placement: 'left', x: tr.left - cardWidth - CARD_GAP, y: tr.top + (targetHeight - cardHeight) / 2 },
    { placement: 'bottom-right', x: tr.right - cardWidth, y: tr.bottom + CARD_GAP },
    { placement: 'bottom-left', x: tr.left, y: tr.bottom + CARD_GAP },
    { placement: 'top-right', x: tr.right - cardWidth, y: tr.top - cardHeight - CARD_GAP },
    { placement: 'top-left', x: tr.left, y: tr.top - cardHeight - CARD_GAP },
  ];

  function normalizeRect(candidate) {
    const x = clamp(candidate.x, margin, Math.max(margin, vw - cardWidth - margin));
    const y = clamp(candidate.y, margin, Math.max(margin, vh - cardHeight - margin));
    return {
      placement: candidate.placement,
      left: x,
      top: y,
      right: x + cardWidth,
      bottom: y + cardHeight,
      clampDelta: Math.abs(candidate.x - x) + Math.abs(candidate.y - y),
    };
  }

  function getDistanceScore(rect) {
    const rectCx = (rect.left + rect.right) / 2;
    const rectCy = (rect.top + rect.bottom) / 2;
    const targetCx = (tr.left + tr.right) / 2;
    const targetCy = (tr.top + tr.bottom) / 2;
    return Math.hypot(rectCx - targetCx, rectCy - targetCy);
  }

  function getOverlapPenalty(rect) {
    const left = Math.max(rect.left, tr.left);
    const top = Math.max(rect.top, tr.top);
    const right = Math.min(rect.right, tr.right);
    const bottom = Math.min(rect.bottom, tr.bottom);
    return right > left && bottom > top ? (right - left) * (bottom - top) : 0;
  }

  const best = candidates
    .map(candidate => {
      const rect = normalizeRect(candidate);
      const overlapPenalty = getOverlapPenalty(rect) * 4;
      const distanceScore = getDistanceScore(rect);
      return { rect, score: overlapPenalty + distanceScore + rect.clampDelta * 6 };
    })
    .sort((a, b) => a.score - b.score)[0];

  card.dataset.placement = best.rect.placement;
  card.style.transform = `translate(${Math.round(best.rect.left)}px, ${Math.round(best.rect.top)}px)`;
}

function updateCard(index) {
  const step  = STEPS[index];
  const total = STEPS.length;

  const countEl = getCountEl();
  const titleEl = getTitleEl();
  const dotsEl  = getDotsEl();
  const progEl  = getProgEl();
  const nextEl  = getNextEl();

  if (countEl) countEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  if (titleEl) titleEl.textContent = step.title;
  if (progEl)  progEl.style.width  = `${((index + 1) / total) * 100}%`;
  if (nextEl)  nextEl.textContent  = index === total - 1 ? 'Finish' : 'Next';

  if (dotsEl) {
    const shown  = Math.min(total, 12);
    const offset = Math.max(0, index - Math.floor(shown / 2));
    dotsEl.innerHTML = Array.from({ length: shown }, (_, i) => {
      const real = i + offset;
      const cls  = real === index ? 'dt-dot--active'
                 : real < index  ? 'dt-dot--done'
                 : 'dt-dot--pending';
      return `<span class="dt-dot ${cls}"></span>`;
    }).join('');
  }
}

// â”€â”€ Countdown bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let cdInterval = null;

function startCd(duration) {
  clearInterval(cdInterval);
  const el = getCdEl();
  if (!el) return;
  el.style.width = '0%';
  const t0 = Date.now();
  cdInterval = setInterval(() => {
    const pct = Math.min(100, ((Date.now() - t0) / duration) * 100);
    el.style.width = pct + '%';
    if (pct >= 100) clearInterval(cdInterval);
  }, 40);
}

// â”€â”€ Tour engine â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let active    = false;
let stepIdx   = 0;
let autoTimer = null;

async function showStep(index) {
  if (!active) return;
  stepIdx = index;
  const step = STEPS[index];

  updateCard(index);

  let target;
  try {
    target = await step.run();
  } catch (e) {
    target = document.getElementById('page-content') || document.body;
  }

  if (!active) return;

  positionCard(target);
  startCd(step.duration);

  clearTimeout(autoTimer);
  autoTimer = setTimeout(() => advance(), step.duration);
}

function advance() {
  if (!active) return;
  clearTimeout(autoTimer);
  if (stepIdx >= STEPS.length - 1) {
    endTour();
  } else {
    showStep(stepIdx + 1);
  }
}

function buildUI() {
  removeUI();
  injectStyles();

  const card = document.createElement('div');
  card.id = 'dt-card';
  card.innerHTML = `
    <div class="dt-card__body">
      <div class="dt-prog-track"><div class="dt-prog-fill" id="dt-prog"></div></div>
      <div class="dt-top-row">
        <span class="dt-count" id="dt-count"></span>
        <button class="dt-skip" id="dt-skip">Skip</button>
      </div>
      <p class="dt-title" id="dt-title"></p>
      <div class="dt-bottom-row">
        <div class="dt-dots" id="dt-dots"></div>
        <button class="dt-next" id="dt-next">Next</button>
      </div>
      <div class="dt-cd-track"><div class="dt-cd-bar" id="dt-cd"></div></div>
    </div>
  `;
  document.body.appendChild(card);

  document.getElementById('dt-skip').addEventListener('click', endTour);
  document.getElementById('dt-next').addEventListener('click', () => {
    clearTimeout(autoTimer);
    clearInterval(cdInterval);
    advance();
  });
}

function removeUI() {
  document.getElementById('dt-card')?.remove();
  document.getElementById('dt-flash')?.remove();
}

export function startTour() {
  if (active) endTour();

  _savedHash = window.location.hash || '';
  _savedLocalStorage = snapshotStorage(localStorage);
  _savedSessionStorage = snapshotStorage(sessionStorage);
  _savedRetakeQuiz = window.__retakeQuiz;

  localStorage.clear();
  sessionStorage.clear();
  delete window.__retakeQuiz;
  localStorage.removeItem(PROFILE_STORAGE_KEY);

  active  = true;
  stepIdx = 0;
  buildUI();
  showStep(0);
}

export function endTour() {
  active = false;
  clearTimeout(autoTimer);
  clearInterval(cdInterval);

  restoreStorage(localStorage, _savedLocalStorage);
  restoreStorage(sessionStorage, _savedSessionStorage);
  _savedLocalStorage = null;
  _savedSessionStorage = null;

  if (_savedRetakeQuiz === undefined) {
    delete window.__retakeQuiz;
  } else {
    window.__retakeQuiz = _savedRetakeQuiz;
  }
  _savedRetakeQuiz = undefined;

  if ((_savedHash || '') !== (window.location.hash || '')) {
    window.location.hash = _savedHash || '#landing';
  }
  _savedHash = '';

  removeUI();
}

function injectStyles() {
  if (document.getElementById('dt-styles')) return;
  const s = document.createElement('style');
  s.id = 'dt-styles';
  s.textContent = `
    #dt-card {
      position: fixed;
      z-index: 99995;
      top: 0;
      left: 0;
      width: min(300px, calc(100vw - 48px));
      pointer-events: all;
      overflow: visible;
      transform: translate(24px, calc(100vh - 160px));
      transition: transform 0.35s cubic-bezier(.4,0,.2,1);
      animation: dt-fadein 0.35s cubic-bezier(.4,0,.2,1) both;
    }

    #dt-card::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(232, 201, 158, 0.95) 0%, rgba(200, 169, 126, 0.22) 55%, rgba(200, 169, 126, 0) 72%);
      pointer-events: none;
      animation: dt-ping 1.8s ease-out infinite;
    }

    #dt-card[data-placement^="top"]::after {
      left: calc(50% - 9px);
      bottom: -28px;
    }

    #dt-card[data-placement^="bottom"]::after {
      left: calc(50% - 9px);
      top: -28px;
    }

    #dt-card[data-placement="left"]::after,
    #dt-card[data-placement="top-left"]::after,
    #dt-card[data-placement="bottom-left"]::after {
      top: calc(50% - 9px);
      right: -28px;
      left: auto;
      bottom: auto;
    }

    #dt-card[data-placement="right"]::after,
    #dt-card[data-placement="top-right"]::after,
    #dt-card[data-placement="bottom-right"]::after {
      top: calc(50% - 9px);
      left: -28px;
      bottom: auto;
    }

    .dt-card__body {
      position: relative;
      background: rgba(14, 14, 14, 0.94);
      border: 1px solid rgba(200, 169, 126, 0.22);
      border-radius: 14px;
      padding: 14px 16px 12px;
      backdrop-filter: blur(12px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
      overflow: hidden;
      animation: dt-float 2.6s ease-in-out infinite;
    }

    @keyframes dt-fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes dt-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    @keyframes dt-ping {
      0% {
        transform: scale(0.85);
        opacity: 0.75;
      }
      70% {
        transform: scale(1.35);
        opacity: 0;
      }
      100% {
        transform: scale(1.35);
        opacity: 0;
      }
    }

    .dt-prog-track {
      width: 100%;
      height: 2px;
      background: rgba(255,255,255,0.06);
      border-radius: 2px;
      margin-bottom: 11px;
      overflow: hidden;
    }
    .dt-prog-fill {
      height: 100%;
      background: linear-gradient(90deg, #c8a97e, #e8c99e);
      border-radius: 2px;
      transition: width 0.4s ease;
    }

    .dt-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .dt-count {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: rgba(200, 169, 126, 0.6);
      text-transform: uppercase;
      font-variant-numeric: tabular-nums;
    }
    .dt-skip {
      font-size: 11px;
      color: rgba(255,255,255,0.25);
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 5px;
      transition: color 0.15s, background 0.15s;
    }
    .dt-skip:hover { color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }

    .dt-title {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      margin: 0 0 12px;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }

    .dt-bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dt-dots { display: flex; gap: 4px; align-items: center; }
    .dt-dot  { width: 5px; height: 5px; border-radius: 50%; transition: all 0.25s ease; }
    .dt-dot--pending { background: rgba(255,255,255,0.12); }
    .dt-dot--active  { background: #c8a97e; width: 14px; border-radius: 3px; }
    .dt-dot--done    { background: rgba(200, 169, 126, 0.35); }

    .dt-next {
      font-size: 12px;
      font-weight: 600;
      color: #c8a97e;
      background: rgba(200, 169, 126, 0.1);
      border: 1px solid rgba(200, 169, 126, 0.22);
      border-radius: 7px;
      padding: 6px 13px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .dt-next:hover { background: rgba(200, 169, 126, 0.2); border-color: rgba(200, 169, 126, 0.45); }

    .dt-cd-track {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: rgba(255,255,255,0.03);
    }
    .dt-cd-bar {
      height: 100%;
      background: rgba(200, 169, 126, 0.4);
      width: 0%;
    }
  `;
  document.head.appendChild(s);
}




