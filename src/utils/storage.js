// ═══════════════════════════════════════════════════════════════
// MON ACCORD — localStorage Utility
// ═══════════════════════════════════════════════════════════════

const PREFIX = 'monaccord_';

export const storage = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(PREFIX + key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  // ── Profile ──
  getProfile() {
    return this.get('profile', null);
  },

  setProfile(profile) {
    this.set('profile', { ...profile, updatedAt: Date.now() });
  },

  // ── Vault (saved formulas) ──
  getVault() {
    return this.get('vault', []);
  },

  saveFormula(formula) {
    const vault = this.getVault();
    const existing = vault.findIndex(f => f.id === formula.id);
    if (existing >= 0) {
      vault[existing] = { ...formula, savedAt: Date.now() };
    } else {
      vault.push({ ...formula, id: formula.id || 'f-' + Date.now(), savedAt: Date.now() });
    }
    this.set('vault', vault);
    this.addInteraction({ type: 'save', formulaId: formula.id, timestamp: Date.now() });
    return vault;
  },

  removeFormula(formulaId) {
    const vault = this.getVault().filter(f => f.id !== formulaId);
    this.set('vault', vault);
    return vault;
  },

  // ── Interaction History (for learning engine) ──
  getInteractions() {
    return this.get('interactions', []);
  },

  addInteraction(interaction) {
    const interactions = this.getInteractions();
    interactions.push({ ...interaction, timestamp: interaction.timestamp || Date.now() });
    // Keep last 500 interactions
    if (interactions.length > 500) interactions.splice(0, interactions.length - 500);
    this.set('interactions', interactions);
  },

  // ── Likes ──
  getLikes() {
    return this.get('likes', []);
  },

  toggleLike(formulaId) {
    const likes = this.getLikes();
    const idx = likes.indexOf(formulaId);
    if (idx >= 0) {
      likes.splice(idx, 1);
      this.addInteraction({ type: 'unlike', formulaId, timestamp: Date.now() });
    } else {
      likes.push(formulaId);
      this.addInteraction({ type: 'like', formulaId, timestamp: Date.now() });
    }
    this.set('likes', likes);
    return likes;
  },

  isLiked(formulaId) {
    return this.getLikes().includes(formulaId);
  },

  // ── API Key ──
  getApiKey() {
    return this.get('gemini_api_key', '');
  },

  setApiKey(key) {
    this.set('gemini_api_key', key);
  },

  // ── Quiz State ──
  getQuizState() {
    return this.get('quiz_state', null);
  },

  setQuizState(state) {
    this.set('quiz_state', state);
  },

  clearQuizState() {
    this.remove('quiz_state');
  },
};
