// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Shop Page
// ═══════════════════════════════════════════════════════════════

import { PERFUMES, REGIONS, getPerfumeById } from '../data/perfumes.js';

export function renderShop(container, navigate) {
  let cart = [];

  function render() {
    container.innerHTML = `
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">Shop</p>
          <h2 class="section-title">Mon Accord Collection</h2>
          <p class="section-subtitle">Select sprays and oils from our six world regions to build your collection.</p>
        </div>

        <div class="shop-layout">
          <div class="shop-products">
            ${REGIONS.map(r => {
              const sprays = PERFUMES.filter(p => p.region === r.id && p.format === 'spray');
              const oils = PERFUMES.filter(p => p.region === r.id && p.format === 'oil');
              return `
                <div class="shop-region-card" style="--region-color: ${r.color}; --region-light: ${r.colorLight};">
                  <div class="shop-region-card__header">
                    <span class="shop-region-card__icon">${r.icon}</span>
                    <h3 class="shop-region-card__name">${r.name}</h3>
                    <p class="shop-region-card__tagline">${r.tagline}</p>
                  </div>
                  <div class="shop-region-card__products">
                    ${[...sprays, ...oils].map(p => {
                      const inCart = cart.find(c => c.id === p.id);
                      return `
                        <div class="shop-product ${inCart ? 'shop-product--in-cart' : ''}" data-id="${p.id}">
                          <div class="shop-product__info">
                            <span class="shop-product__format">${p.format === 'spray' ? '💨 Spray' : '💧 Oil'}</span>
                            <span class="shop-product__name">${p.name}</span>
                          </div>
                          <button class="shop-product__btn ${inCart ? 'shop-product__btn--added' : ''}" data-id="${p.id}">
                            ${inCart ? '✓ Added' : '+ Add'}
                          </button>
                        </div>
                      `;
                    }).join('')}
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
                        <span style="color: ${r.color};">${r.icon}</span>
                        <span>${p.format === 'spray' ? '💨' : '💧'} ${p.name}</span>
                      </div>
                      <button class="shop-cart__item-remove" data-id="${p.id}">✕</button>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="shop-cart__footer">
                <button class="btn btn--primary w-full" id="btn-confirm-order">Confirm Order ✦</button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    addShopStyles();

    // Add to cart buttons
    container.querySelectorAll('.shop-product__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const idx = cart.findIndex(c => c.id === id);
        if (idx >= 0) {
          cart.splice(idx, 1);
        } else {
          cart.push({ id });
        }
        render();
      });
    });

    // Remove from cart
    container.querySelectorAll('.shop-cart__item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(c => c.id !== btn.dataset.id);
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

function showOrderConfirmation(cart, container, navigate) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width: 480px; text-align: center;">
      <div class="modal__body" style="padding: var(--space-3xl) var(--space-xl);">
        <div style="font-size: 3rem; margin-bottom: var(--space-lg);">✦</div>
        <h3 style="font-size: var(--text-2xl); margin-bottom: var(--space-md);">Order Confirmed!</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
          Your order of ${cart.length} item${cart.length !== 1 ? 's' : ''} has been placed successfully. 
          We're crafting your signature collection.
        </p>
        <button class="btn btn--primary btn--lg" id="btn-go-profile">Go to Profile →</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#btn-go-profile').addEventListener('click', () => {
    overlay.remove();
    navigate('#profile');
  });
  overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); navigate('#profile'); } };
}

function addShopStyles() {
  if (document.getElementById('shop-styles')) return;
  const style = document.createElement('style');
  style.id = 'shop-styles';
  style.textContent = `
    .shop-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-2xl);
      align-items: start;
    }

    .shop-products {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-lg);
    }

    .shop-region-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
      transition: all var(--transition-base);
    }

    .shop-region-card:hover {
      border-color: var(--region-color);
      box-shadow: var(--shadow-md);
    }

    .shop-region-card__header {
      padding: var(--space-lg);
      text-align: center;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(var(--region-color), 0.03), transparent);
    }

    .shop-region-card__icon { font-size: 1.8rem; display: block; margin-bottom: var(--space-xs); }
    .shop-region-card__name { font-size: var(--text-lg); margin-bottom: 2px; }
    .shop-region-card__tagline { font-size: var(--text-xs); color: var(--region-color); font-weight: 500; }

    .shop-region-card__products {
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .shop-product {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .shop-product:hover { background: var(--bg-secondary); }
    .shop-product--in-cart { background: var(--accent-bg); }

    .shop-product__info { display: flex; flex-direction: column; }
    .shop-product__format { font-size: var(--text-xs); color: var(--text-tertiary); }
    .shop-product__name { font-size: var(--text-sm); font-weight: 500; }

    .shop-product__btn {
      padding: 4px 12px;
      font-size: var(--text-xs);
      font-weight: 600;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--surface);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .shop-product__btn:hover { border-color: var(--accent); color: var(--accent-dark); }
    .shop-product__btn--added { border-color: var(--accent); background: var(--accent-bg); color: var(--accent-dark); }

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
      .shop-products { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}
