// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Shop Page
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';
import { storage } from '../utils/storage.js';

const PERFUME_IMGS = {
  scandinavian: new URL('../assets/perfumes/scandinavian.png',    import.meta.url).href,
  eastasia:     new URL('../assets/perfumes/east_asia.png',       import.meta.url).href,
  southafrica:  new URL('../assets/perfumes/south_africa.png',    import.meta.url).href,
  mediterranean:new URL('../assets/perfumes/mediterranean.png',   import.meta.url).href,
  southamerica: new URL('../assets/perfumes/south_america.png',   import.meta.url).href,
  middleeast:   new URL('../assets/perfumes/middle_east.png',     import.meta.url).href,
};

const OIL_IMGS = {
  scandinavian: new URL('../assets/oils/scandinavian.png',    import.meta.url).href,
  eastasia:     new URL('../assets/oils/east_asia.png',       import.meta.url).href,
  southafrica:  new URL('../assets/oils/south_africa.png',    import.meta.url).href,
  mediterranean:new URL('../assets/oils/mediterranean.png',   import.meta.url).href,
  southamerica: new URL('../assets/oils/south_america.png',   import.meta.url).href,
  middleeast:   new URL('../assets/oils/middle_east.png',     import.meta.url).href,
};
import sephoraLogo   from '../assets/Sephora-Logo.png';
import boynerLogo    from '../assets/Boyner_Logo.jpg';
import trendyolLogo  from '../assets/Trendyol_logo.png';
import hepsiburadaLogo from '../assets/hepsiburada-logo.png';

export function renderShop(container, navigate) {
  const existingCartIds = storage.getShopCart();
  const pendingCartIds = [...new Set(storage.consumePendingShopCart())];
  const mergedCartIds = [...new Set([...existingCartIds, ...pendingCartIds])];
  let cart = mergedCartIds.map(id => ({ id }));

  if (pendingCartIds.length) {
    const addedCount = mergedCartIds.length - existingCartIds.length;
    window.showToast(`Added ${addedCount} new item${addedCount !== 1 ? 's' : ''} from your recommended combination.`);
  }

  syncCart();

  function syncCart() {
    storage.setShopCart(cart.map(item => item.id));
  }

  function render() {
    const ownedIds = storage.getOwnedPerfumes().monAccord || [];
    const recommendation = getShopRecommendation(ownedIds, cart);

    container.innerHTML = `
      <div class="page__container">
        <div class="shop-layout">
          <div class="shop-products">
            ${REGIONS.map(r => {
              const spray = PERFUMES.find(p => p.region === r.id && p.format === 'spray');
              const oil   = PERFUMES.find(p => p.region === r.id && p.format === 'oil');
              return `
                <div class="shop-region-card" style="--region-color: ${r.color}; --region-light: ${r.colorLight};">
                  <div class="shop-region-card__header">
                    <h3 class="shop-region-card__name">${r.name}</h3>
                  </div>
                  <div class="shop-region-card__products">
                    ${spray ? (() => {
                      const inCart = cart.find(c => c.id === spray.id);
                      const isOwned = ownedIds.includes(spray.id);
                      return `
                        <button class="shop-bottle-btn ${inCart ? 'shop-bottle-btn--in-cart' : ''} ${isOwned ? 'shop-bottle-btn--owned' : ''}" data-id="${spray.id}" style="--region-color:${r.color};">
                          ${inCart ? '<div class="shop-bottle-check">✓</div>' : ''}
                          ${isOwned ? '<div class="shop-bottle-owned">Owned</div>' : ''}
                          <img src="${PERFUME_IMGS[r.id]}" class="shop-bottle-img" alt="Spray" loading="lazy" decoding="async" />
                          <span class="shop-bottle-type">SPRAY</span>
                        </button>`;
                    })() : ''}
                    ${oil ? (() => {
                      const inCart = cart.find(c => c.id === oil.id);
                      const isOwned = ownedIds.includes(oil.id);
                      return `
                        <button class="shop-bottle-btn ${inCart ? 'shop-bottle-btn--in-cart' : ''} ${isOwned ? 'shop-bottle-btn--owned' : ''}" data-id="${oil.id}" style="--region-color:${r.color};">
                          ${inCart ? '<div class="shop-bottle-check">✓</div>' : ''}
                          ${isOwned ? '<div class="shop-bottle-owned">Owned</div>' : ''}
                          <img src="${OIL_IMGS[r.id]}" class="shop-bottle-img" alt="Oil" loading="lazy" decoding="async" />
                          <span class="shop-bottle-type">OIL</span>
                        </button>`;
                    })() : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Cart Sidebar -->
          <div class="shop-cart">
            <div class="shop-cart__header">
              <h3 class="shop-cart__title">Your Cart</h3>
              <span class="shop-cart__count">${cart.length} item${cart.length !== 1 ? 's' : ''}</span>
            </div>
            ${cart.length === 0 ? `
              <div class="shop-cart__empty">
                <p>Your cart is empty</p>
                <p style="font-size: var(--text-xs); color: var(--text-tertiary);">Add sprays and oils to get started.</p>
              </div>
            ` : `
              <div class="shop-cart__items">
                ${cart.map(item => {
                  const p = getPerfumeById(item.id);
                  const r = REGIONS.find(rg => rg.id === p.region);
                  return `
                    <div class="shop-cart__item">
                      <div class="shop-cart__item-info">
                        <span>${p.name}</span>
                      </div>
                      <button class="shop-cart__item-remove" data-id="${p.id}">✕</button>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="shop-cart__footer">
                <button class="btn btn--primary w-full" id="btn-confirm-order">Confirm Order</button>
              </div>
            `}

          </div>
        </div>
      </div>
    `;

    addShopStyles();

    // Add to cart buttons
    container.querySelectorAll('.shop-bottle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const idx = cart.findIndex(c => c.id === id);
        if (idx >= 0) {
          cart.splice(idx, 1);
        } else {
          cart.push({ id });
        }
        syncCart();
        render();
      });
    });

    // Remove from cart
    container.querySelectorAll('.shop-cart__item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(c => c.id !== btn.dataset.id);
        syncCart();
        render();
      });
    });

    // Confirm order
    const confirmBtn = container.querySelector('#btn-confirm-order');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        showOrderConfirmation(cart, container, navigate);
      });
    }
  }

  render();
}

function getShopRecommendation(ownedIds, cart) {
  if (!ownedIds.length) return null;
  const cartIds = cart.map(c => c.id);
  const owned = ownedIds.map(id => getPerfumeById(id)).filter(Boolean);
  const families = [...new Set(owned.flatMap(p => p.scentFamily.split('-')))];
  const complements = PERFUMES.filter(p =>
    !ownedIds.includes(p.id) &&
    !cartIds.includes(p.id) &&
    p.scentFamily.split('-').some(f => families.includes(f))
  ).slice(0, 2);
  if (!complements.length) return null;
  return `Based on your owned ${owned.map(p => p.name).join(' & ')}: try adding ${complements.map(p => p.name).join(' or ')}.`;
}

function showOrderConfirmation(cart, container, navigate) {
  storage.clearShopCart();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal order-confirmed-modal">
      <button class="modal__close" id="btn-close-retailers" aria-label="Close">✕</button>
      <div class="modal__body order-confirmed-body">
        <div class="order-confirmed-icon"></div>
        <h3 class="order-confirmed-title">Now Available</h3>

        <div class="order-retailers">
          <div class="order-retailers__grid">
            <div class="order-retailer-card" aria-label="Sephora">
              <img src="${sephoraLogo}" alt="Sephora" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Boyner">
              <img src="${boynerLogo}" alt="Boyner" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Trendyol">
              <img src="${trendyolLogo}" alt="Trendyol" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Hepsiburada">
              <img src="${hepsiburadaLogo}" alt="Hepsiburada" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="btn-go-profile">Go to Profile</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#btn-go-profile').addEventListener('click', () => {
    overlay.remove();
    navigate('#profile');
  });
  overlay.querySelector('#btn-close-retailers').addEventListener('click', () => {
    overlay.remove();
  });
  overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); } };
}

function addShopStyles() {
  if (document.getElementById('shop-styles')) return;
  const style = document.createElement('style');
  style.id = 'shop-styles';
  style.textContent = `

    /* ── Order Confirmed Modal ── */
    .order-confirmed-modal {
      max-width: 480px;
      text-align: center;
      position: relative;
    }

    .order-confirmed-modal .modal__close {
      position: absolute;
      top: var(--space-md);
      right: var(--space-md);
    }

    .order-confirmed-body {
      padding: var(--space-2xl) var(--space-xl);
    }

    .order-confirmed-icon {
      font-size: 2.4rem;
      margin-bottom: var(--space-md);
      color: var(--accent);
    }

    .order-confirmed-title {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-sm);
    }

    .order-confirmed-sub {
      color: var(--text-secondary);
      font-size: var(--text-sm);
      line-height: 1.6;
      margin-bottom: var(--space-xl);
    }

    .order-retailers {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      margin-bottom: var(--space-xl);
    }

    .order-retailers__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
    }

    .order-retailer-card {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-sm) var(--space-xs);
      height: 52px;
      transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
    }

    .order-retailer-card:hover {
      border-color: var(--accent);
      box-shadow: 0 2px 12px rgba(200,169,126,0.18);
      transform: translateY(-2px);
    }

    .order-retailer-card__logo {
      max-width: 100%;
      max-height: 28px;
      width: auto;
      height: auto;
      object-fit: contain;
      filter: grayscale(25%);
      transition: filter 0.18s;
    }

    .order-retailer-card:hover .order-retailer-card__logo {
      filter: grayscale(0%);
    }

    /* ── Shop Layout ── */
    .shop-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) minmax(18rem, var(--sidebar-width));
      gap: var(--space-2xl);
      align-items: start;
    }

    .shop-products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-lg);
    }

    .shop-region-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
      transition: all var(--transition-base);
      display: flex;
      flex-direction: column;
    }

    .shop-region-card:hover {
      border-color: var(--region-color);
      box-shadow: var(--shadow-md);
    }

    .shop-region-card__header {
      padding: var(--space-sm) var(--space-md);
      text-align: center;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(var(--region-color), 0.03), transparent);
    }

    .shop-region-card__name { font-size: var(--text-sm); font-weight: 700; color: var(--region-color); font-family: var(--font-body); }

    .shop-region-card__products {
      padding: var(--space-sm);
      display: flex;
      gap: var(--space-sm);
      flex: 1;
    }

    .shop-bottle-btn {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 4px 6px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--bg-primary);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }

    .shop-bottle-btn:hover { border-color: var(--region-color); background: var(--surface); }

    .shop-bottle-btn--in-cart {
      border-color: var(--region-color);
      background: color-mix(in srgb, var(--region-color) 8%, transparent);
    }

    .shop-bottle-btn--owned { border-color: var(--accent); }

    .shop-bottle-img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      pointer-events: none;
      display: block;
    }

    .shop-bottle-type {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
    }

    .shop-bottle-btn--in-cart .shop-bottle-type { color: var(--region-color); }

    .shop-bottle-check {
      position: absolute;
      top: 4px;
      right: 5px;
      font-size: 10px;
      font-weight: 700;
      color: var(--region-color);
    }

    .shop-bottle-owned {
      position: absolute;
      top: 4px;
      left: 5px;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--accent-dark);
      background: color-mix(in srgb, var(--accent) 15%, white);
      border: 1px solid var(--accent);
      border-radius: var(--radius-full);
      padding: 2px 6px;
    }

    .shop-cart {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
    }

    .shop-cart__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg); }
    .shop-cart__title { font-size: var(--text-lg); }
    .shop-cart__count { font-size: var(--text-xs); color: var(--accent); font-weight: 600; }

    .shop-cart__empty {
      text-align: center;
      padding: var(--space-2xl) var(--space-md);
      color: var(--text-tertiary);
      font-size: var(--text-sm);
    }

    .shop-cart__items { display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-lg); }

    .shop-cart__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
    }

    .shop-cart__item-info { display: flex; align-items: center; gap: var(--space-sm); }

    .shop-cart__item-remove {
      width: 24px; height: 24px;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      cursor: pointer; background: none; border: none;
      transition: all var(--transition-fast);
    }
    .shop-cart__item-remove:hover { color: #e74c3c; background: rgba(231,76,60,0.08); }

    @media (max-width: 1024px) {
      .shop-layout { grid-template-columns: 1fr; }
      .shop-cart { position: static; }
    }

    @media (max-width: 640px) {
      .shop-region-card { min-height: auto; }
    }
  `;
  document.head.appendChild(style);
}
