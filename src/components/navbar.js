// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Navbar Component
// ═══════════════════════════════════════════════════════════════

import { storage } from '../utils/storage.js';

export function renderNavbar(navigate, currentRoute) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'main-nav';

  const hasProfile = !!storage.getProfile();

  const links = [
    { hash: '#landing', label: 'Home', always: true },
    { hash: '#profile', label: 'Profile', always: true },
    { hash: '#explorer', label: 'Explorer', always: true },
    { hash: '#lab', label: 'Layering Lab', always: true },
    { hash: '#vault', label: 'Vault', always: true },
    { hash: '#shop', label: 'Shop', always: true },
    { hash: '#community', label: 'Community', always: true },
  ];

  nav.innerHTML = `
    <div class="navbar__brand">
      <a href="#landing" class="navbar__logo" id="nav-brand">
        <span class="navbar__logo-accent">✦</span> MON ACCORD
      </a>
    </div>
    <div class="navbar__links" id="nav-links">
      ${links.map(l => `
        <a href="${l.hash}" class="navbar__link ${currentRoute === l.hash || (currentRoute === '' && l.hash === '#landing') ? 'active' : ''}" id="nav-${l.hash.replace('#', '')}">${l.label}</a>
      `).join('')}
    </div>
    <button class="navbar__settings-btn" id="nav-settings-btn" title="Settings">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    </button>
  `;

  // Handle scroll effect
  setTimeout(() => {
    const handleScroll = () => {
      const el = document.getElementById('main-nav');
      if (el) {
        el.classList.toggle('scrolled', window.scrollY > 10);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, 0);

  // Settings button
  nav.querySelector('#nav-settings-btn').addEventListener('click', () => {
    window.showSettings();
  });

  return nav;
}
