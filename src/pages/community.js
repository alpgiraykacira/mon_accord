// ═══════════════════════════════════════════════════════════════
// MON ACCORD — Community Page
// ═══════════════════════════════════════════════════════════════

import { generateRemixSuggestion } from '../services/learning-engine.js';
import { getTrendingCombinations } from '../services/collective-intel.js';
import { getPerfumeById, REGIONS, PERFUMES, LOREAL_LUXE_PERFUMES, COMMUNITY_FORMULAS } from '../data/perfumes.js';
import { isAIAvailable } from '../services/ai-engine.js';
import { storage } from '../utils/storage.js';
import { showSaveToVaultModal } from '../utils/save-modal.js';
import duyguPhoto from '../assets/duyguozaslan.png';

// ── Seed Posts ──
const SEED_POSTS = [
  {
    id: 'sp-1', author: 'ScentExplorer', date: Date.now() - 86400000 * 3,
    title: 'My go-to date night combo',
    topicType: 'trending', topicRef: 'cf-4', content: 'Velvet Rose is absolutely stunning for evenings out. The oud-citrus balance is perfect — not too heavy, not too light. My partner always compliments this one!',
    likes: 18, comments: [
      { id: 'sc-1', author: 'RoseAddict', date: Date.now() - 86400000 * 2, text: 'Totally agree! I add an extra drop of the oil for more longevity.', replies: [
        { id: 'sc-1r1', author: 'ScentExplorer', date: Date.now() - 86400000, text: 'Great tip, I\'ll try that next time!' },
        { id: 'sc-1r2', author: 'VelvetQueen', date: Date.now() - 86400000 * 0.5, text: 'The oil trick really does work — I noticed at least 2 extra hours of longevity with it.', replies: [] }
      ]},
      { id: 'sc-2', author: 'NordicNose', date: Date.now() - 86400000, text: 'Have you tried mixing it with a Scandinavian spray? The contrast is amazing.', replies: [
        { id: 'sc-2r1', author: 'ScentExplorer', date: Date.now() - 86400000 * 0.8, text: 'Not yet but that sounds like an interesting idea! Warm + cool could be really unique.', replies: [] },
        { id: 'sc-2r2', author: 'LayeringPro', date: Date.now() - 86400000 * 0.3, text: 'I do this combo regularly. The birch from Scandinavia really grounds the rose beautifully.', replies: [] }
      ] },
    ]
  },
  {
    id: 'sp-2', author: 'MinimalistMusk', date: Date.now() - 86400000 * 5,
    title: 'Best office-safe layering?',
    topicType: 'free', topicLabel: 'Office Fragrances', content: 'Looking for recommendations on subtle combinations that work in a professional setting. I love the Zen Garden combo but wondering if there are other options that project softly.',
    likes: 12, comments: [
      { id: 'sc-3', author: 'CorporateChic', date: Date.now() - 86400000 * 4, text: 'Azure Morning is my daily driver for work. Very clean and inoffensive.', replies: [
        { id: 'sc-3r1', author: 'MinimalistMusk', date: Date.now() - 86400000 * 3, text: 'Oh that sounds perfect, adding it to my cart!' },
        { id: 'sc-3r2', author: 'FreshFan', date: Date.now() - 86400000 * 2, text: 'Second this. Mediterranean spray + Scandinavian oil is chef\'s kiss for office.' }
      ]},
      { id: 'sc-3b', author: 'QuietScenter', date: Date.now() - 86400000 * 3, text: 'I go with just 2 sprays of East Asia spray. The green tea and bamboo are super subtle but elegant.', replies: [
        { id: 'sc-3b1', author: 'MinimalistMusk', date: Date.now() - 86400000 * 2, text: 'That\'s actually brilliant — single region, minimal projection. Love it.' }
      ]},
    ]
  },
  {
    id: 'sp-3', author: 'OudLover', date: Date.now() - 86400000 * 1,
    title: 'Custom evening blend I created',
    topicType: 'combination',
    topicCombination: [
      { perfumeId: 'middleeast-spray', amount: 3, unit: 'sprays' },
      { perfumeId: 'southafrica-oil', amount: 2, unit: 'drops' },
    ],
    content: 'I\'ve been experimenting with this bold combo for a while. The saffron-oud meets vanilla-coffee and it\'s absolutely divine for cold winter nights. Who else loves intense combos?',
    likes: 24, comments: [
      { id: 'sc-4', author: 'AmberAddict', date: Date.now() - 86400000 * 0.8, text: 'This is EXACTLY what I\'ve been looking for! The warmth from both regions must be incredible together.', replies: [
        { id: 'sc-4r1', author: 'OudLover', date: Date.now() - 86400000 * 0.5, text: 'It really is — the saffron opens bright and then the rooibos-vanilla base just wraps around you.' }
      ]},
      { id: 'sc-5', author: 'NightOwlScents', date: Date.now() - 86400000 * 0.6, text: 'Have you tried adding a single drop of Scandinavian oil to cool it down slightly? Adds an interesting twist.', replies: [] },
    ]
  },
  {
    id: 'sp-4', author: 'FloralFusion', date: Date.now() - 86400000 * 2,
    title: 'Spring cherry blossom layering',
    topicType: 'combination',
    topicCombination: [
      { perfumeId: 'eastasia-spray', amount: 2, unit: 'sprays' },
      { perfumeId: 'mediterranean-oil', amount: 2, unit: 'drops' },
    ],
    content: 'Cherry blossom from East Asia with neroli and fig from Mediterranean oil creates this gorgeous springtime aura. Light, feminine, and so uplifting. Perfect for daytime!',
    likes: 31, comments: [
      { id: 'sc-6', author: 'GardenBreeze', date: Date.now() - 86400000 * 1.5, text: 'This sounds absolutely heavenly! Trying this tomorrow morning.', replies: [
        { id: 'sc-6r1', author: 'FloralFusion', date: Date.now() - 86400000 * 1, text: 'Let me know how you like it! The fig really brings out the floral notes.' },
        { id: 'sc-6r2', author: 'GardenBreeze', date: Date.now() - 86400000 * 0.4, text: 'Update: I LOVE it. Got three compliments at brunch today. This is my new signature.' }
      ]},
      { id: 'sc-7', author: 'PerfumeNovice', date: Date.now() - 86400000 * 1.2, text: 'Would this work well in warm weather? I\'m worried about the oil being too heavy in summer.', replies: [
        { id: 'sc-7r1', author: 'FloralFusion', date: Date.now() - 86400000 * 0.8, text: 'It\'s actually quite light! The Mediterranean oil is more fresh than heavy. Give it a try.' }
      ]},
    ]
  },
  {
    id: 'sp-5', author: 'SeasonalSniffer', date: Date.now() - 86400000 * 4,
    title: 'Summer vs winter layering strategies',
    topicType: 'free', topicLabel: 'Seasonal Tips',
    content: 'I\'ve noticed that in summer I prefer spray-only combos (2 regions, light application), while in winter I go heavy on oils with maybe one spray on top. Does anyone else change their approach with seasons?',
    likes: 19, comments: [
      { id: 'sc-8', author: 'AllSeasonScenter', date: Date.now() - 86400000 * 3.5, text: 'Absolutely! Summer is all about Mediterranean + East Asia for me. Winter I switch to Middle East + South Africa.', replies: [
        { id: 'sc-8r1', author: 'SeasonalSniffer', date: Date.now() - 86400000 * 3, text: 'That\'s almost exactly my rotation! Great minds think alike.' },
        { id: 'sc-8r2', author: 'NordicNose', date: Date.now() - 86400000 * 2.5, text: 'Don\'t sleep on Scandinavian in summer though — the birch and juniper are so refreshing.' }
      ]},
      { id: 'sc-9', author: 'TropicalVibes', date: Date.now() - 86400000 * 3, text: 'Living in a tropical climate I use light sprays year-round. Oils are too intense in 35°C heat!', replies: [] },
      { id: 'sc-10', author: 'FourSeasons', date: Date.now() - 86400000 * 2, text: 'I keep a separate shelf for each season. Spring: florals. Summer: citrus. Fall: woody. Winter: spicy-sweet.', replies: [
        { id: 'sc-10r1', author: 'SeasonalSniffer', date: Date.now() - 86400000 * 1.5, text: 'That level of organization is goals! Do you have a favorite fall combo?' },
        { id: 'sc-10r2', author: 'FourSeasons', date: Date.now() - 86400000 * 1, text: 'Scandinavian spray + Middle East oil. The cedar-oud combination is *chef\'s kiss* for autumn walks.' }
      ]},
    ]
  },
  {
    id: 'sp-6', author: 'GiftGuru', date: Date.now() - 86400000 * 6,
    title: 'Gifting layering sets — any tips?',
    topicType: 'trending', topicRef: 'cf-2',
    content: 'I want to gift a friend a layering combo but I\'m not sure how to present it. Anyone wrapped up Mon Accord sets as gifts before? Which combos are crowd-pleasers?',
    likes: 15, comments: [
      { id: 'sc-11', author: 'ThoughtfulGifter', date: Date.now() - 86400000 * 5, text: 'Mediterranean + East Asia is always a safe bet. Almost everyone loves the freshness.', replies: [
        { id: 'sc-11r1', author: 'GiftGuru', date: Date.now() - 86400000 * 4.5, text: 'That\'s what I was leaning towards! Simple and universally appealing.' }
      ]},
      { id: 'sc-12', author: 'WrapQueen', date: Date.now() - 86400000 * 5, text: 'I put the spray + oil in a nice pouch with a card explaining the layering technique. People love it!', replies: [] },
    ]
  },
  {
    id: 'sp-7', author: 'VanillaCloud', date: Date.now() - 86400000 * 1.5,
    title: 'Gourmand lovers unite — best sweet combos?',
    topicType: 'trending', topicRef: 'cf-5',
    content: 'I\'m obsessed with Cocoa Cloud but looking for more sweet, cozy combinations. Who else here loves gourmand-leaning layering? Drop your favourites!',
    likes: 22, comments: [
      { id: 'sc-13', author: 'SweetTooth', date: Date.now() - 86400000 * 1.2, text: 'Cocoa Cloud is my absolute favourite! I also add 1 drop of Middle East oil on top for a rich amber-vanilla twist.', replies: [
        { id: 'sc-13r1', author: 'VanillaCloud', date: Date.now() - 86400000 * 1, text: 'Oh that sounds amazing, the oud would add so much depth!' },
        { id: 'sc-13r2', author: 'GourmandQueen', date: Date.now() - 86400000 * 0.8, text: 'Can confirm this works beautifully. The saffron note from Middle East pairs perfectly with the cocoa.', replies: [] }
      ]},
      { id: 'sc-14', author: 'CozyNights', date: Date.now() - 86400000 * 1, text: 'Try South America spray + South Africa oil + a single East Asia oil drop. Tonka-vanilla-cherry blossom is heavenly.', replies: [
        { id: 'sc-14r1', author: 'VanillaCloud', date: Date.now() - 86400000 * 0.5, text: 'Three layers! That\'s ambitious. Adding it to my list to try this weekend.' }
      ]},
    ]
  },
  {
    id: 'sp-8', author: 'NoseTrainer', date: Date.now() - 86400000 * 3.5,
    title: 'How I trained my nose for layering',
    topicType: 'free', topicLabel: 'Tips & Guides',
    content: 'When I started layering I couldn\'t tell the difference between combos. Here\'s what helped: start with just ONE spray and ONE oil. Wear it for a full day. Next day, swap one layer. After 2 weeks you\'ll notice nuances you never imagined!',
    likes: 34, comments: [
      { id: 'sc-15', author: 'BeginnerSniffer', date: Date.now() - 86400000 * 3, text: 'This is exactly what I needed! I\'ve been overwhelmed trying 3-layer combos from the start.', replies: [
        { id: 'sc-15r1', author: 'NoseTrainer', date: Date.now() - 86400000 * 2.8, text: 'Start simple! Mediterranean spray + Scandinavian oil is a great first combo. Very distinct notes.' },
        { id: 'sc-15r2', author: 'ScentExplorer', date: Date.now() - 86400000 * 2.5, text: 'Agreed. I started the same way and now I can pick apart 4-layer combos no problem.' }
      ]},
      { id: 'sc-16', author: 'OlfactoryJourney', date: Date.now() - 86400000 * 2.5, text: 'Another tip: smell coffee beans between testing different combos. It resets your nose.', replies: [] },
      { id: 'sc-17', author: 'FragranceNerd', date: Date.now() - 86400000 * 2, text: 'I keep a scent journal — I write down what I smell at 0min, 1hr, 4hr, and 8hr. Game changer for understanding how layers evolve.', replies: [
        { id: 'sc-17r1', author: 'NoseTrainer', date: Date.now() - 86400000 * 1.5, text: 'The journal idea is brilliant! I should start doing that too.' }
      ]},
    ]
  },
  {
    id: 'sp-9', author: 'MidnightRose', date: Date.now() - 86400000 * 0.5,
    title: 'Amber Veil is the new obsession',
    topicType: 'combination',
    topicCombination: [
      { perfumeId: 'middleeast-oil', amount: 2, unit: 'drops' },
      { perfumeId: 'southamerica-spray', amount: 2, unit: 'sprays' },
      { perfumeId: 'scandinavian-oil', amount: 1, unit: 'drops' },
    ],
    content: 'Just tried this three-layer combo and I\'m speechless. The Arabian amber opens rich and warm, the South American tonka adds this gorgeous sweetness, and that single drop of Scandinavian oil on top gives it a cool, clean edge. Pure sophistication!',
    likes: 28, comments: [
      { id: 'sc-18', author: 'LayeringPro', date: Date.now() - 86400000 * 0.4, text: 'Three regions in one combo? Bold move. How\'s the longevity?', replies: [
        { id: 'sc-18r1', author: 'MidnightRose', date: Date.now() - 86400000 * 0.3, text: 'Easily 8+ hours. The oil base really anchors everything.' },
        { id: 'sc-18r2', author: 'OudLover', date: Date.now() - 86400000 * 0.2, text: 'Middle East oil as a base is always a longevity cheat code. Great choice.' }
      ]},
      { id: 'sc-19', author: 'NordicNose', date: Date.now() - 86400000 * 0.3, text: 'Love the Scandinavian finishing touch. That birch-juniper coolness must cut through the sweetness perfectly.', replies: [] },
    ]
  },
  {
    id: 'sp-10', author: 'WorkdayScenter', date: Date.now() - 86400000 * 7,
    title: 'My week of different combos — review',
    topicType: 'free', topicLabel: 'Reviews',
    content: 'I wore a different trending combo each workday last week: Mon — Azure Morning, Tue — Zen Garden, Wed — Golden Hour, Thu — Forest Ceremony, Fri — Velvet Rose. Here\'s my ranking: Velvet Rose > Azure Morning > Zen Garden > Golden Hour > Forest Ceremony. Friday combo got 4 compliments!',
    likes: 21, comments: [
      { id: 'sc-20', author: 'CorporateChic', date: Date.now() - 86400000 * 6.5, text: 'Velvet Rose for WORK? That\'s brave! I usually save that for evenings.', replies: [
        { id: 'sc-20r1', author: 'WorkdayScenter', date: Date.now() - 86400000 * 6, text: 'I went light — just 1 spray + 1 drop instead of the full recommended amount. Keeps it office-appropriate.' },
        { id: 'sc-20r2', author: 'MinimalistMusk', date: Date.now() - 86400000 * 5.5, text: 'Smart approach! Half-dosing heavier combos is underrated.' }
      ]},
      { id: 'sc-21', author: 'AllSeasonScenter', date: Date.now() - 86400000 * 6, text: 'Azure Morning on Monday is perfect — fresh and energizing to start the week. I do the same!', replies: [
        { id: 'sc-21r1', author: 'WorkdayScenter', date: Date.now() - 86400000 * 5, text: 'Right?! It\'s like a morning espresso in fragrance form.' }
      ]},
    ]
  },
];

function getSeedPosts() {
  let posts = storage.getPosts();
  if (!posts.length) {
    posts = SEED_POSTS;
    storage.setPosts(posts);
  } else {
    // Merge any new seed posts that don't exist yet
    const existingIds = new Set(posts.map(p => p.id));
    const missing = SEED_POSTS.filter(sp => !existingIds.has(sp.id));
    if (missing.length) {
      posts = [...posts, ...missing];
      storage.setPosts(posts);
    }
  }
  return posts;
}

export function renderCommunity(container, navigate) {
  const trending = getTrendingCombinations();
  const profile = storage.getProfile();
  let sortBy = 'likes';
  let selectedPostId = null;
  let showNewPostForm = false;
  let newPostTopicType = null; // 'combination' | 'trending' | 'free'

  // Today's suggestion cache
  const SUGGESTION_CACHE_KEY = 'community_daily_suggestion';
  const todayKey = new Date().toISOString().slice(0, 10);
  let cachedSuggestion = null;
  try { cachedSuggestion = JSON.parse(sessionStorage.getItem(SUGGESTION_CACHE_KEY) || 'null'); } catch {}
  let currentSuggestion = cachedSuggestion?.date === todayKey ? cachedSuggestion.remix : null;
  let suggestionLoading = !currentSuggestion;

  function getMatchPercent(formula) {
    if (!profile) return Math.floor(Math.random() * 40) + 30;
    let score = 50;
    const userFamilies = profile.primaryFamilies || [];
    (formula.layers || []).forEach(l => {
      const p = getPerfumeById(l.perfumeId);
      if (p) {
        p.scentFamily.split('-').forEach(f => { if (userFamilies.includes(f)) score += 12; });
        if (profile.recommendedRegions?.includes(p.region)) score += 8;
      }
    });
    return Math.min(score, 98);
  }

  const formulasWithMatch = trending.map(f => ({ ...f, matchPercent: getMatchPercent(f) }));

  function getSortedFormulas() {
    const sorted = [...formulasWithMatch];
    if (sortBy === 'likes') sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    else if (sortBy === 'match') sorted.sort((a, b) => b.matchPercent - a.matchPercent);
    else if (sortBy === 'newest') sorted.sort((a, b) => (b.id > a.id ? 1 : -1));
    return sorted;
  }

  function render() {
    const sorted = getSortedFormulas();
    const posts = getSeedPosts();
    const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;

    container.innerHTML = `
      <div class="page__container">
        <!-- ═══ TRENDING SECTION ═══ -->
        <div class="community-top-grid">
          <div class="community-panel">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Trending Combinations</h3>
              <div class="community-sort">
                <button class="community-sort-btn ${sortBy === 'likes' ? 'community-sort-btn--active' : ''}" data-sort="likes">Popular</button>
                <button class="community-sort-btn ${sortBy === 'match' ? 'community-sort-btn--active' : ''}" data-sort="match">For You</button>
                <button class="community-sort-btn ${sortBy === 'newest' ? 'community-sort-btn--active' : ''}" data-sort="newest">New</button>
              </div>
            </div>
            <div class="community-trending-list">
              ${sorted.map((formula, i) => {
                const isLiked = storage.isLiked(formula.id);
                const displayLikes = (formula.likes || 0) + (isLiked ? 1 : 0);
                return `
                <div class="community-trending-item" data-id="${formula.id}">
                  <div class="community-trending-rank">${i + 1}</div>
                  <div class="community-trending-content">
                    <div class="community-trending-top">
                      <h4 class="community-trending-name">${formula.name}</h4>
                    </div>
                    <div class="community-trending-layers">
                      ${(formula.layers || []).map(l => {
                        const p = getPerfumeById(l.perfumeId);
                        const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
                        return `<span style="color: ${r?.color || 'var(--text-tertiary)'};">${r?.icon || ''} ${p?.name || ''}</span>`;
                      }).join(' <span style="color: var(--text-tertiary);">+</span> ')}
                    </div>
                  </div>
                  <div class="community-trending-meta">
                    <span class="community-trending-match" style="color: ${formula.matchPercent > 70 ? '#4CAF50' : formula.matchPercent > 50 ? 'var(--accent)' : 'var(--text-tertiary)'};">${formula.matchPercent}% match</span>
                    <button class="community-like-btn ${isLiked ? 'community-like-btn--active' : ''}" data-like-formula="${formula.id}">
                      ${isLiked ? '♥' : '♡'} ${displayLikes}
                    </button>
                    <button class="btn btn--ghost btn--sm community-vault-btn" data-vault-formula="${formula.id}">+ Vault</button>
                  </div>
                </div>
              `;}).join('')}
            </div>
          </div>

          <!-- Right Column: Today's Selection + Duygu's Choice -->
          <div class="community-right-col">
            <div class="community-panel community-panel--selection">
              <div class="community-panel-header">
                <h3 class="community-panel-title">✦ Today's Selection</h3>
              </div>
              <div id="suggestion-container">
                ${renderSuggestionContent(currentSuggestion, suggestionLoading)}
              </div>
            </div>

            <!-- Duygu's Choice -->
            <div class="community-panel community-duygu-choice">
              <div class="community-panel-header">
                <h3 class="community-panel-title">Duygu's Choice</h3>
              </div>
              <div class="duygu-card">
                <div class="duygu-card__photo-wrap">
                  <img src="${duyguPhoto}" alt="Duygu Özaslan" class="duygu-card__photo" />
                </div>
                <p class="duygu-card__name">Duygu Özaslan</p>
                <p class="duygu-card__role">Influencer</p>
                <p class="duygu-card__quote">"Cherry blossom and fig together feel like a spring garden by the sea — feminine, luminous, and unforgettable."</p>
                <div class="duygu-card__combo">
                  <div class="duygu-card__layer">
                    <span style="color: ${REGIONS.find(r => r.id === 'eastasia')?.color || '#888'};">${REGIONS.find(r => r.id === 'eastasia')?.icon || ''}</span>
                    <span>East Asia — Spray</span>
                    <span class="duygu-card__amount">2 sprays</span>
                  </div>
                  <div class="duygu-card__layer">
                    <span style="color: ${REGIONS.find(r => r.id === 'mediterranean')?.color || '#888'};">${REGIONS.find(r => r.id === 'mediterranean')?.icon || ''}</span>
                    <span>Mediterranean — Oil</span>
                    <span class="duygu-card__amount">3 drops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ DISCUSSION SECTION ═══ -->
        <div class="community-discussion-section">
          <div class="community-discussion-header">
            <h3 class="community-panel-title">Discussion</h3>
            <button class="btn btn--primary btn--sm" id="btn-new-post">+ New Post</button>
          </div>

          ${showNewPostForm ? renderNewPostForm(sorted) : ''}

          <div class="community-discussion-layout">
            <!-- Post List (left) -->
            <div class="community-post-list">
              ${posts.length === 0 ? '<p style="color:var(--text-tertiary);font-size:var(--text-sm);padding:var(--space-lg);">No posts yet. Be the first to share!</p>' :
                posts.map(post => `
                  <div class="community-post-item ${selectedPostId === post.id ? 'community-post-item--active' : ''}" data-post-id="${post.id}">
                    <div class="community-post-item__top">
                      <span class="community-post-item__author">${post.author}</span>
                      <span class="community-post-item__date">${timeAgo(post.date)}</span>
                    </div>
                    <h4 class="community-post-item__title">${post.title}</h4>
                    <div class="community-post-item__bottom">
                      <span class="community-post-item__topic">${getTopicLabel(post)}</span>
                      <span class="community-post-item__stats">♥ ${post.likes || 0} · ${countAllComments(post)} comments</span>
                    </div>
                  </div>
                `).join('')}
            </div>

            <!-- Post Detail (right) -->
            <div class="community-post-detail">
              ${selectedPost ? renderPostDetail(selectedPost) : `
                <div class="community-post-empty">
                  <p>Select a post to view</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    addCommunityStyles();
    bindEvents(sorted, posts);
  }

  function renderNewPostForm(sorted) {
    const allPerfumes = [...PERFUMES.map(p => ({ id: p.id, label: `${REGIONS.find(r=>r.id===p.region)?.icon||''} ${p.name} (${p.format})`, group: 'Mon Accord' })),
      ...LOREAL_LUXE_PERFUMES.map(p => ({ id: p.id, label: `${p.brand} — ${p.name}`, group: 'L\'Oreal Luxe' }))];

    return `
      <div class="community-new-post-form">
        <div class="input-group">
          <label class="input-label">Title</label>
          <input type="text" class="input" id="new-post-title" placeholder="Give your post a title..." />
        </div>

        <div class="input-group">
          <label class="input-label">Topic Type</label>
          <div class="community-topic-selector">
            <button class="community-topic-btn ${newPostTopicType === 'combination' ? 'community-topic-btn--active' : ''}" data-topic="combination">Custom Combination</button>
            <button class="community-topic-btn ${newPostTopicType === 'trending' ? 'community-topic-btn--active' : ''}" data-topic="trending">Trending Combo</button>
            <button class="community-topic-btn ${newPostTopicType === 'free' ? 'community-topic-btn--active' : ''}" data-topic="free">Free Topic</button>
          </div>
        </div>

        ${newPostTopicType === 'combination' ? `
          <div class="input-group">
            <label class="input-label">Build your combination</label>
            <div id="combo-builder">
              <div id="combo-layers"></div>
              <div class="community-combo-add">
                <select class="select" id="combo-perfume-select" style="flex:1;">
                  <option value="">Select perfume...</option>
                  ${allPerfumes.map(p => `<option value="${p.id}">${p.label}</option>`).join('')}
                </select>
                <input type="number" class="input" id="combo-amount" placeholder="Qty" min="1" max="10" value="2" style="width:70px;" />
                <select class="select" id="combo-unit" style="width:90px;">
                  <option value="sprays">sprays</option>
                  <option value="drops">drops</option>
                </select>
                <button class="btn btn--secondary btn--sm" id="combo-add-layer">+</button>
              </div>
            </div>
          </div>
        ` : ''}

        ${newPostTopicType === 'trending' ? `
          <div class="input-group">
            <label class="input-label">Select trending combination</label>
            <select class="select" id="trending-select">
              <option value="">Choose...</option>
              ${COMMUNITY_FORMULAS.map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
            </select>
          </div>
        ` : ''}

        ${newPostTopicType === 'free' ? `
          <div class="input-group">
            <label class="input-label">Topic</label>
            <input type="text" class="input" id="free-topic-label" placeholder="What's this about?" />
          </div>
        ` : ''}

        ${newPostTopicType ? `
          <div class="input-group">
            <label class="input-label">Content</label>
            <textarea class="input" id="new-post-content" rows="4" placeholder="Share your thoughts..."></textarea>
          </div>
          <div class="flex gap-sm">
            <button class="btn btn--primary btn--sm" id="btn-submit-post">Post</button>
            <button class="btn btn--ghost btn--sm" id="btn-cancel-post">Cancel</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Temp state for combo builder
  let comboLayers = [];

  function renderPostDetail(post) {
    const isLiked = storage.isPostLiked(post.id);
    const topicHtml = getTopicDetailHtml(post);

    return `
      <div class="community-post-detail__inner">
        <div class="community-post-detail__header">
          <h3 class="community-post-detail__title">${post.title}</h3>
          <div class="community-post-detail__meta">
            <span class="community-post-detail__author">${post.author}</span>
            <span class="community-post-detail__date">${new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
        ${topicHtml}
        <p class="community-post-detail__content">${post.content}</p>
        <div class="community-post-detail__actions">
          <button class="community-like-btn ${isLiked ? 'community-like-btn--active' : ''}" data-like-post="${post.id}">
            ${isLiked ? '♥' : '♡'} ${post.likes || 0}
          </button>
          <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${countAllComments(post)} comments</span>
        </div>
        <div class="divider--gold"></div>
        <div class="community-comments">
          <h4 style="font-size:var(--text-sm);margin-bottom:var(--space-sm);">Comments</h4>
          ${renderComments(post.comments || [], post.id, 0)}
          <div class="community-add-comment">
            <input type="text" class="input" id="new-comment-input" placeholder="Write a comment..." style="flex:1;" />
            <button class="btn btn--primary btn--sm" id="btn-add-comment" data-post-id="${post.id}">Post</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderComments(comments, postId, depth) {
    if (!comments || !comments.length) return '';
    return comments.map(c => `
      <div class="community-comment" style="margin-left:${depth * 20}px;">
        <div class="community-comment__meta">
          <span class="community-comment__author">${c.author}</span>
          <span class="community-comment__date">${timeAgo(c.date)}</span>
        </div>
        <p class="community-comment__text">${c.text}</p>
        <button class="community-reply-toggle" data-comment-id="${c.id}" data-post-id="${postId}">Reply</button>
        <div class="community-reply-input" id="reply-${c.id}" style="display:none;">
          <input type="text" class="input" placeholder="Write a reply..." style="flex:1;font-size:var(--text-xs);" />
          <button class="btn btn--ghost btn--sm community-reply-submit" data-comment-id="${c.id}" data-post-id="${postId}">Post</button>
        </div>
        ${renderComments(c.replies || [], postId, depth + 1)}
      </div>
    `).join('');
  }

  function getTopicLabel(post) {
    if (post.topicType === 'trending') {
      const f = COMMUNITY_FORMULAS.find(cf => cf.id === post.topicRef);
      return f ? `📈 ${f.name}` : '📈 Trending';
    }
    if (post.topicType === 'combination') return '🧪 Custom Combo';
    return post.topicLabel || 'General';
  }

  function getTopicDetailHtml(post) {
    if (post.topicType === 'trending') {
      const f = COMMUNITY_FORMULAS.find(cf => cf.id === post.topicRef);
      if (!f) return '';
      return `<div class="community-post-topic-badge">📈 Trending: ${f.name}</div>`;
    }
    if (post.topicType === 'combination' && post.topicCombination?.length) {
      return `<div class="community-post-topic-badge">🧪 ${post.topicCombination.map(l => {
        const p = getPerfumeById(l.perfumeId);
        const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
        return `${r?.icon || ''} ${p?.name || l.perfumeId} (${l.amount} ${l.unit})`;
      }).join(' + ')}</div>`;
    }
    if (post.topicType === 'free' && post.topicLabel) {
      return `<div class="community-post-topic-badge">${post.topicLabel}</div>`;
    }
    return '';
  }

  function countAllComments(post) {
    let count = 0;
    function walk(arr) { (arr || []).forEach(c => { count++; walk(c.replies); }); }
    walk(post.comments);
    return count;
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function findCommentById(comments, id) {
    for (const c of (comments || [])) {
      if (c.id === id) return c;
      const found = findCommentById(c.replies, id);
      if (found) return found;
    }
    return null;
  }

  function bindEvents(sorted, posts) {
    // Sort buttons
    container.querySelectorAll('.community-sort-btn').forEach(btn => {
      btn.addEventListener('click', () => { sortBy = btn.dataset.sort; render(); });
    });

    // Formula like
    container.querySelectorAll('[data-like-formula]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        storage.toggleLike(btn.dataset.likeFormula);
        render();
      });
    });

    // Add to vault from trending
    container.querySelectorAll('[data-vault-formula]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const formula = sorted.find(f => f.id === btn.dataset.vaultFormula);
        if (!formula) return;
        const enrichedLayers = (formula.layers || []).map(l => {
          const p = getPerfumeById(l.perfumeId);
          const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
          return { ...l, name: `${r?.icon || ''} ${p?.name || l.perfumeId}` };
        });
        showSaveToVaultModal({ ...formula, id: 'saved-' + formula.id, layers: enrichedLayers }, { showNameInput: false });
      });
    });

    // Load suggestion to lab
    const loadBtn = container.querySelector('#btn-load-suggestion');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => {
        if (currentSuggestion?.layers?.length) {
          sessionStorage.setItem('labPending', JSON.stringify(currentSuggestion.layers.map(l => l.perfumeId).filter(id => getPerfumeById(id))));
          navigate('#lab');
        }
      });
    }

    // Post list clicks
    container.querySelectorAll('[data-post-id]').forEach(el => {
      if (el.classList.contains('community-post-item')) {
        el.addEventListener('click', () => { selectedPostId = el.dataset.postId; render(); });
      }
    });

    // New post button
    const newPostBtn = container.querySelector('#btn-new-post');
    if (newPostBtn) newPostBtn.addEventListener('click', () => { showNewPostForm = true; newPostTopicType = null; comboLayers = []; render(); });

    // Topic type selector
    container.querySelectorAll('.community-topic-btn').forEach(btn => {
      btn.addEventListener('click', () => { newPostTopicType = btn.dataset.topic; comboLayers = []; render(); });
    });

    // Combo builder: add layer
    const comboAddBtn = container.querySelector('#combo-add-layer');
    if (comboAddBtn) {
      comboAddBtn.addEventListener('click', () => {
        const sel = container.querySelector('#combo-perfume-select');
        const amt = container.querySelector('#combo-amount');
        const unit = container.querySelector('#combo-unit');
        if (sel.value) {
          comboLayers.push({ perfumeId: sel.value, amount: parseInt(amt.value) || 2, unit: unit.value });
          renderComboLayers();
        }
      });
    }

    function renderComboLayers() {
      const el = container.querySelector('#combo-layers');
      if (!el) return;
      el.innerHTML = comboLayers.map((l, i) => {
        const p = getPerfumeById(l.perfumeId);
        const lp = LOREAL_LUXE_PERFUMES.find(lx => lx.id === l.perfumeId);
        const name = p?.name || (lp ? `${lp.brand} — ${lp.name}` : l.perfumeId);
        return `<div class="community-combo-layer"><span>${name} (${l.amount} ${l.unit})</span><button class="community-combo-remove" data-idx="${i}">✕</button></div>`;
      }).join('');
      el.querySelectorAll('.community-combo-remove').forEach(btn => {
        btn.addEventListener('click', () => { comboLayers.splice(parseInt(btn.dataset.idx), 1); renderComboLayers(); });
      });
    }

    // Cancel post
    const cancelBtn = container.querySelector('#btn-cancel-post');
    if (cancelBtn) cancelBtn.addEventListener('click', () => { showNewPostForm = false; newPostTopicType = null; render(); });

    // Submit post
    const submitBtn = container.querySelector('#btn-submit-post');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const title = container.querySelector('#new-post-title')?.value.trim();
        const content = container.querySelector('#new-post-content')?.value.trim();
        if (!title || !content || !newPostTopicType) { window.showToast('Please fill in all fields.', 'error'); return; }

        const post = {
          id: 'p-' + Date.now(),
          author: storage.getUsername(),
          date: Date.now(),
          title, content,
          topicType: newPostTopicType,
          likes: 0,
          comments: [],
        };

        if (newPostTopicType === 'combination') post.topicCombination = [...comboLayers];
        if (newPostTopicType === 'trending') post.topicRef = container.querySelector('#trending-select')?.value || '';
        if (newPostTopicType === 'free') post.topicLabel = container.querySelector('#free-topic-label')?.value.trim() || 'General';

        const allPosts = getSeedPosts();
        allPosts.unshift(post);
        storage.setPosts(allPosts);
        showNewPostForm = false;
        newPostTopicType = null;
        selectedPostId = post.id;
        render();
        window.showToast('Post published!');
      });
    }

    // Post like
    container.querySelectorAll('[data-like-post]').forEach(btn => {
      btn.addEventListener('click', () => {
        const postId = btn.dataset.likePost;
        const wasLiked = storage.isPostLiked(postId);
        storage.togglePostLike(postId);
        const allPosts = getSeedPosts();
        const post = allPosts.find(p => p.id === postId);
        if (post) { post.likes = (post.likes || 0) + (wasLiked ? -1 : 1); storage.setPosts(allPosts); }
        render();
      });
    });

    // Add comment
    const addCommentBtn = container.querySelector('#btn-add-comment');
    if (addCommentBtn) {
      addCommentBtn.addEventListener('click', () => {
        const input = container.querySelector('#new-comment-input');
        const text = input?.value.trim();
        if (!text) return;
        const allPosts = getSeedPosts();
        const post = allPosts.find(p => p.id === addCommentBtn.dataset.postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push({ id: 'c-' + Date.now(), author: storage.getUsername(), date: Date.now(), text, replies: [] });
          storage.setPosts(allPosts);
          render();
        }
      });
    }

    // Reply toggles
    container.querySelectorAll('.community-reply-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = container.querySelector(`#reply-${btn.dataset.commentId}`);
        if (box) box.style.display = box.style.display === 'none' ? 'flex' : 'none';
      });
    });

    // Reply submit
    container.querySelectorAll('.community-reply-submit').forEach(btn => {
      btn.addEventListener('click', () => {
        const box = container.querySelector(`#reply-${btn.dataset.commentId}`);
        const input = box?.querySelector('input');
        const text = input?.value.trim();
        if (!text) return;
        const allPosts = getSeedPosts();
        const post = allPosts.find(p => p.id === btn.dataset.postId);
        if (post) {
          const comment = findCommentById(post.comments, btn.dataset.commentId);
          if (comment) {
            if (!comment.replies) comment.replies = [];
            comment.replies.push({ id: 'r-' + Date.now(), author: storage.getUsername(), date: Date.now(), text, replies: [] });
            storage.setPosts(allPosts);
            render();
          }
        }
      });
    });
  }

  render();

  // Hydrate daily suggestion
  if (!currentSuggestion) {
    (async () => {
      let remix;
      if (isAIAvailable()) {
        const result = await generateRemixSuggestion();
        remix = result.success && result.remix ? result.remix : getFallback();
      } else {
        remix = getFallback();
      }
      currentSuggestion = remix;
      suggestionLoading = false;
      sessionStorage.setItem(SUGGESTION_CACHE_KEY, JSON.stringify({ date: todayKey, remix }));
      render();
    })();
  }

  function getFallback() {
    const base = formulasWithMatch.slice().sort((a, b) => b.matchPercent - a.matchPercent)[0] || trending[0];
    return {
      remixName: base?.name || 'Daily Selection',
      layers: base?.layers || [],
      inspiration: base?.description || 'A community-loved formula selected for your profile.',
      scentDescription: 'Balanced for versatility across day and evening wear.',
    };
  }
}

function renderSuggestionContent(remix, isLoading) {
  if (isLoading) {
    return `<div style="padding:var(--space-xl);text-align:center;"><span class="loading-spinner"></span><p style="margin-top:var(--space-md);color:var(--text-tertiary);">Preparing today's suggestion...</p></div>`;
  }
  if (!remix) return `<p style="font-size:var(--text-sm);color:var(--text-tertiary);padding:var(--space-lg);">No suggestion available.</p>`;

  return `
    <div style="padding:var(--space-lg);">
      <div class="ai-response">
        <div class="ai-response__label">✦ ${remix.remixName || 'AI Suggestion'}</div>
        <div class="ai-response__text">
          ${remix.layers?.length ? `<div style="margin-bottom:var(--space-md);">${remix.layers.map(l => {
            const p = getPerfumeById(l.perfumeId);
            const r = p ? REGIONS.find(rg => rg.id === p.region) : null;
            return `<p>${r?.icon || '•'} ${l.amount} ${l.unit} of <strong>${p?.name || l.perfumeId}</strong></p>`;
          }).join('')}</div>` : ''}
          ${remix.inspiration ? `<p>${remix.inspiration}</p>` : ''}
        </div>
      </div>
      <button class="btn btn--primary btn--sm mt-md" id="btn-load-suggestion">Load to Lab</button>
    </div>
  `;
}

function addCommunityStyles() {
  if (document.getElementById('community-styles')) return;
  const style = document.createElement('style');
  style.id = 'community-styles';
  style.textContent = `
    /* ── Top Grid: Trending + Today's Selection ── */
    .community-top-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(18rem, var(--sidebar-width));
      gap: var(--space-xl);
      align-items: start;
      margin-bottom: var(--space-2xl);
    }

    .community-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .community-right-col {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
      align-self: start;
    }

    .community-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--border);
    }

    .community-panel-title { font-size: var(--text-lg); font-weight: 600; }

    .community-sort { display: flex; gap: 4px; }

    .community-sort-btn {
      padding: 4px 10px; font-size: var(--text-xs); font-weight: 500;
      border: 1px solid var(--border); border-radius: var(--radius-full);
      background: var(--surface); color: var(--text-secondary); cursor: pointer;
      transition: all var(--transition-fast);
    }
    .community-sort-btn:hover { border-color: var(--accent-light); color: var(--accent); }
    .community-sort-btn--active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; }

    /* ── Trending Items ── */
    .community-trending-list { display: flex; flex-direction: column; }

    .community-trending-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-lg);
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    .community-trending-item:last-child { border-bottom: none; }
    .community-trending-item:hover { background: var(--bg-primary); }

    .community-trending-rank {
      font-family: var(--font-display); font-size: var(--text-lg); font-weight: 600;
      color: var(--accent-light); min-width: 26px;
    }

    .community-trending-content { min-width: 0; }
    .community-trending-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; gap: var(--space-sm); }
    .community-trending-name { font-size: var(--text-sm); font-weight: 600; }

    .community-trending-layers {
      display: flex; flex-wrap: wrap; gap: 4px; align-items: center;
      margin-bottom: 2px; font-size: var(--text-xs);
    }

    .community-desc-clamp {
      display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
      overflow: hidden; font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.5;
    }

    .community-trending-meta {
      display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;
    }

    .community-trending-match { font-size: var(--text-xs); font-weight: 600; white-space: nowrap; }

    .community-like-btn {
      padding: 3px 10px; font-size: var(--text-xs); font-weight: 600;
      border: 1px solid var(--border); border-radius: var(--radius-full);
      background: var(--surface); color: var(--text-tertiary); cursor: pointer;
      transition: all var(--transition-fast); white-space: nowrap;
    }
    .community-like-btn:hover { border-color: #e74c3c; color: #e74c3c; }
    .community-like-btn--active { border-color: #e74c3c; background: rgba(231,76,60,0.08); color: #e74c3c; }

    .community-vault-btn { font-size: var(--text-xs) !important; padding: 2px 8px !important; }

    /* ── Discussion Section ── */
    .community-discussion-section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .community-discussion-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--border);
    }

    .community-discussion-layout {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(0, 1.8fr);
      min-height: 400px;
    }

    /* ── Post List ── */
    .community-post-list {
      border-right: 1px solid var(--border);
      overflow-y: auto;
      max-height: 600px;
    }

    .community-post-item {
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    .community-post-item:hover { background: var(--bg-primary); }
    .community-post-item--active { background: var(--accent-bg); border-left: 3px solid var(--accent); }

    .community-post-item__top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
    .community-post-item__author { font-size: var(--text-xs); font-weight: 600; color: var(--accent); }
    .community-post-item__date { font-size: 10px; color: var(--text-tertiary); }
    .community-post-item__title { font-size: var(--text-sm); font-weight: 600; margin-bottom: 4px; }
    .community-post-item__bottom { display: flex; justify-content: space-between; align-items: center; }
    .community-post-item__topic { font-size: 10px; color: var(--text-tertiary); }
    .community-post-item__stats { font-size: 10px; color: var(--text-tertiary); }

    /* ── Post Detail ── */
    .community-post-detail { overflow-y: auto; max-height: 600px; }

    .community-post-detail__inner { padding: var(--space-lg); }

    .community-post-detail__header { margin-bottom: var(--space-md); }
    .community-post-detail__title { font-size: var(--text-lg); margin-bottom: 4px; }
    .community-post-detail__meta { display: flex; gap: var(--space-sm); align-items: center; }
    .community-post-detail__author { font-size: var(--text-xs); font-weight: 600; color: var(--accent); }
    .community-post-detail__date { font-size: var(--text-xs); color: var(--text-tertiary); }
    .community-post-detail__content { font-size: var(--text-sm); line-height: 1.7; color: var(--text-secondary); margin-bottom: var(--space-md); }
    .community-post-detail__actions { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md); }

    .community-post-topic-badge {
      font-size: var(--text-xs); color: var(--accent); font-weight: 500;
      padding: 4px 10px; background: var(--accent-bg); border-radius: var(--radius-full);
      display: inline-block; margin-bottom: var(--space-sm);
    }

    .community-post-empty {
      display: flex; align-items: center; justify-content: center; height: 100%;
      color: var(--text-tertiary); font-size: var(--text-sm);
    }

    /* ── Comments ── */
    .community-comments { margin-top: var(--space-md); }

    .community-comment {
      padding: var(--space-xs) 0;
      border-bottom: 1px solid var(--border);
    }
    .community-comment:last-of-type { border-bottom: none; }

    .community-comment__meta { display: flex; gap: var(--space-sm); align-items: center; margin-bottom: 2px; }
    .community-comment__author { font-size: var(--text-xs); font-weight: 600; }
    .community-comment__date { font-size: 10px; color: var(--text-tertiary); }
    .community-comment__text { font-size: var(--text-sm); line-height: 1.5; margin-bottom: 2px; }

    .community-reply-toggle {
      font-size: var(--text-xs); color: var(--text-tertiary); cursor: pointer;
      text-decoration: underline; text-underline-offset: 2px; background: none; border: none;
    }
    .community-reply-toggle:hover { color: var(--accent); }

    .community-reply-input { display: flex; gap: var(--space-xs); align-items: center; margin-top: var(--space-xs); }

    .community-add-comment {
      display: flex; gap: var(--space-sm); align-items: center;
      margin-top: var(--space-md); padding-top: var(--space-sm);
      border-top: 1px solid var(--border);
    }

    /* ── New Post Form ── */
    .community-new-post-form {
      padding: var(--space-lg);
      border-bottom: 1px solid var(--border);
      background: var(--bg-secondary);
      display: flex; flex-direction: column; gap: var(--space-md);
    }

    .community-topic-selector { display: flex; gap: var(--space-xs); flex-wrap: wrap; }

    .community-topic-btn {
      padding: 6px 14px; font-size: var(--text-xs); font-weight: 500;
      border: 1px solid var(--border); border-radius: var(--radius-full);
      background: var(--surface); color: var(--text-secondary); cursor: pointer;
      transition: all var(--transition-fast);
    }
    .community-topic-btn:hover { border-color: var(--accent-light); }
    .community-topic-btn--active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; }

    .community-combo-add { display: flex; gap: var(--space-xs); align-items: center; flex-wrap: wrap; }

    .community-combo-layer {
      display: flex; align-items: center; gap: var(--space-sm);
      padding: 4px 10px; background: var(--accent-bg); border: 1px solid var(--border-accent);
      border-radius: var(--radius-full); font-size: var(--text-xs); margin-bottom: 4px;
    }

    .community-combo-remove {
      font-size: 10px; color: var(--text-tertiary); cursor: pointer;
      background: none; border: none;
    }
    .community-combo-remove:hover { color: #e74c3c; }

    /* ── Duygu's Choice ── */
    .community-duygu-choice { overflow: hidden; }

    .duygu-card { padding: var(--space-lg); text-align: center; }

    .duygu-card__photo-wrap {
      display: flex; justify-content: center; margin-bottom: var(--space-md);
    }

    .duygu-card__photo {
      width: 120px; height: 120px; border-radius: 50%; object-fit: cover;
      border: 3px solid var(--accent-light);
    }

    .duygu-card__name { font-size: var(--text-base); font-weight: 600; margin: 0 0 2px; }
    .duygu-card__role { font-size: var(--text-xs); color: var(--text-tertiary); margin: 0 0 var(--space-md); }

    .duygu-card__quote {
      font-size: var(--text-sm); font-style: italic; color: var(--text-secondary);
      line-height: 1.6; margin-bottom: var(--space-md); text-align: left;
      padding-left: var(--space-md); border-left: 2px solid var(--accent-light);
    }

    .duygu-card__combo {
      display: flex; flex-direction: column; gap: var(--space-xs); text-align: left;
    }

    .duygu-card__layer {
      display: flex; align-items: center; gap: var(--space-sm);
      font-size: var(--text-sm); padding: var(--space-xs) var(--space-sm);
      background: var(--bg-primary); border-radius: var(--radius-md);
    }

    .duygu-card__amount {
      margin-left: auto; font-size: var(--text-xs); color: var(--text-tertiary); font-weight: 500;
    }

    @media (max-width: 1024px) {
      .community-top-grid { grid-template-columns: 1fr; }
      .community-right-col { position: static; }
      .community-discussion-layout { grid-template-columns: 1fr; }
      .community-post-list { border-right: none; border-bottom: 1px solid var(--border); max-height: 300px; }
    }
  `;
  document.head.appendChild(style);
}
