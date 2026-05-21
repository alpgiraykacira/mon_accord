(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`monaccord_`,t={get(t,n=null){try{let r=localStorage.getItem(e+t);return r?JSON.parse(r):n}catch{return n}},set(t,n){try{localStorage.setItem(e+t,JSON.stringify(n))}catch(e){console.warn(`Storage write failed:`,e)}},remove(t){localStorage.removeItem(e+t)},getProfile(){return this.get(`profile`,null)},setProfile(e){this.set(`profile`,{...e,updatedAt:Date.now()})},getVault(){return this.get(`vault`,[])},saveFormula(e){let t=this.getVault(),n=t.findIndex(t=>t.id===e.id);return n>=0?t[n]={...e,savedAt:Date.now()}:t.push({...e,id:e.id||`f-`+Date.now(),savedAt:Date.now()}),this.set(`vault`,t),this.addInteraction({type:`save`,formulaId:e.id,timestamp:Date.now()}),t},removeFormula(e){let t=this.getVault().filter(t=>t.id!==e);return this.set(`vault`,t),t},getInteractions(){return this.get(`interactions`,[])},addInteraction(e){let t=this.getInteractions();t.push({...e,timestamp:e.timestamp||Date.now()}),t.length>500&&t.splice(0,t.length-500),this.set(`interactions`,t)},getLikes(){return this.get(`likes`,[])},toggleLike(e){let t=this.getLikes(),n=t.indexOf(e);return n>=0?(t.splice(n,1),this.addInteraction({type:`unlike`,formulaId:e,timestamp:Date.now()})):(t.push(e),this.addInteraction({type:`like`,formulaId:e,timestamp:Date.now()})),this.set(`likes`,t),t},isLiked(e){return this.getLikes().includes(e)},getOwnedPerfumes(){let e=this.get(`my_perfumes`,null);return Array.isArray(e)?{monAccord:e.map(e=>e.id),loreal:[]}:e||{monAccord:[],loreal:[]}},setOwnedPerfumes(e){this.set(`my_perfumes`,e)},getApiKey(){return this.get(`gemini_api_key`,``)},setApiKey(e){this.set(`gemini_api_key`,e)},getQuizState(){return this.get(`quiz_state`,null)},setQuizState(e){this.set(`quiz_state`,e)},clearQuizState(){this.remove(`quiz_state`)},setPendingShopCart(e){this.set(`pending_shop_cart`,e)},consumePendingShopCart(){let e=this.get(`pending_shop_cart`,[]);return this.remove(`pending_shop_cart`),Array.isArray(e)?e:[]},getShopCart(){let e=this.get(`shop_cart`,[]);return Array.isArray(e)?e:[]},setShopCart(e){this.set(`shop_cart`,e)},clearShopCart(){this.remove(`shop_cart`)},getUsername(){return this.getProfile()?.username||`Anonymous`},getPosts(){return this.get(`community_posts`,[])},setPosts(e){this.set(`community_posts`,e)},getPostLikes(){return this.get(`post_likes`,[])},togglePostLike(e){let t=this.getPostLikes(),n=t.indexOf(e);return n>=0?t.splice(n,1):t.push(e),this.set(`post_likes`,t),t},isPostLiked(e){return this.getPostLikes().includes(e)}};function n(e,n){let r=document.createElement(`nav`);return r.className=`navbar`,r.id=`main-nav`,t.getProfile(),r.innerHTML=`
    <div class="navbar__brand">
      <a href="#landing" class="navbar__logo" id="nav-brand">
        MON ACCORD
        <span class="navbar__logo-sub">by L'Oreal Luxe</span>
      </a>
    </div>
    <div class="navbar__links" id="nav-links">
      ${[{hash:`#landing`,label:`Home`,always:!0},{hash:`#profile`,label:`Profile`,always:!0},{hash:`#lab`,label:`Layering Lab`,always:!0},{hash:`#vault`,label:`Vault`,always:!0},{hash:`#shop`,label:`Shop`,always:!0},{hash:`#community`,label:`Community`,always:!0}].map(e=>`
        <a href="${e.hash}" class="navbar__link ${n===e.hash||n===``&&e.hash===`#landing`?`active`:``}" id="nav-${e.hash.replace(`#`,``)}">${e.label}</a>
      `).join(``)}
    </div>
    <button class="navbar__settings-btn" id="nav-settings-btn" title="Settings">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    </button>
  `,setTimeout(()=>{window.addEventListener(`scroll`,()=>{let e=document.getElementById(`main-nav`);e&&e.classList.toggle(`scrolled`,window.scrollY>10)},{passive:!0})},0),r.querySelector(`#nav-settings-btn`).addEventListener(`click`,()=>{window.showSettings()}),r}var r=[{id:`scandinavian`,name:`Scandinavian`,tagline:`Crisp Nordic Purity`,description:`Inspired by the pristine landscapes of the North — frozen lakes, evergreen forests, and Arctic air. A study in minimalist elegance and crystalline freshness.`,color:`#7BA7BC`,colorLight:`#A8D0E0`,gradient:`linear-gradient(135deg, #7BA7BC, #A8D0E0)`,icon:``},{id:`eastasia`,name:`East Asia`,tagline:`Zen Garden Harmony`,description:`Drawing from centuries of incense tradition, temple gardens, and the quiet beauty of cherry blossoms. Delicate balance meets deep-rooted sophistication.`,color:`#D4A0A0`,colorLight:`#EACFCF`,gradient:`linear-gradient(135deg, #D4A0A0, #EACFCF)`,icon:``},{id:`southafrica`,name:`South Africa`,tagline:`Wild Earth Warmth`,description:`The raw beauty of the Cape — fynbos-covered mountains, red earth, and the warm embrace of rooibos. Bold, grounding, and unmistakably alive.`,color:`#C4956A`,colorLight:`#DDB892`,gradient:`linear-gradient(135deg, #C4956A, #DDB892)`,icon:``},{id:`mediterranean`,name:`Mediterranean`,tagline:`Sun-Kissed Coast`,description:`The luminous spirit of the Mediterranean shore — sun-warmed citrus groves, herb-scented hillsides, and sea-salt breezes through olive trees.`,color:`#7BAF8E`,colorLight:`#A8D4B8`,gradient:`linear-gradient(135deg, #7BAF8E, #A8D4B8)`,icon:``},{id:`southamerica`,name:`South America`,tagline:`Tropical Depth`,description:`The lush intensity of Amazonian rainforests — rich earth, exotic botanicals, and the sweet warmth of tonka and cocoa beneath a canopy of green.`,color:`#8B9F6B`,colorLight:`#B0C490`,gradient:`linear-gradient(135deg, #8B9F6B, #B0C490)`,icon:``},{id:`middleeast`,name:`Middle East`,tagline:`Ancient Opulence`,description:`The timeless luxury of Arabian perfumery — precious oud, damask rose, golden saffron, and the whisper of musk in palace halls. Richness without restraint.`,color:`#B8879B`,colorLight:`#D4ADC0`,gradient:`linear-gradient(135deg, #B8879B, #D4ADC0)`,icon:``}],i=[{id:`scandinavian-spray`,name:`Scandinavian - Spray`,region:`scandinavian`,format:`spray`,topNotes:[`bergamot ice`,`frozen mint`,`arctic birch`],middleNotes:[`white tea`,`sea moss`,`juniper berry`],baseNotes:[`pine resin`,`white musk`,`driftwood`],sillage:4,longevity:5,intensity:3,scentFamily:`fresh`,layeringRole:`brightener`,description:`A crisp, transparent spray that opens with an icy burst of bergamot and settles into a serene blend of white tea and Nordic pine.`},{id:`scandinavian-oil`,name:`Scandinavian - Oil`,region:`scandinavian`,format:`oil`,topNotes:[`frozen violet leaf`,`cold air accord`],middleNotes:[`birch sap`,`white tea`,`lichen`],baseNotes:[`cedarwood`,`clean musk`,`mineral stone`],sillage:2,longevity:7,intensity:4,scentFamily:`fresh`,layeringRole:`base-anchor`,description:`An intimate oil concentrate that wraps the skin in soft birch and cedarwood, creating a whispering Nordic calm that lasts all day.`},{id:`eastasia-spray`,name:`East Asia - Spray`,region:`eastasia`,format:`spray`,topNotes:[`sakura blossom`,`yuzu`,`shiso leaf`],middleNotes:[`green tea`,`bamboo`,`rice steam`],baseNotes:[`hinoki wood`,`white sandalwood`,`silk musk`],sillage:5,longevity:6,intensity:4,scentFamily:`floral-green`,layeringRole:`harmonizer`,description:`A delicate spray that captures the ephemeral beauty of sakura season — yuzu brightness melting into green tea serenity over warm hinoki.`},{id:`eastasia-oil`,name:`East Asia - Oil`,region:`eastasia`,format:`oil`,topNotes:[`osmanthus`,`rice milk`],middleNotes:[`sakura`,`matcha`,`bamboo heart`],baseNotes:[`hinoki`,`shiso`,`incense smoke`],sillage:3,longevity:8,intensity:5,scentFamily:`floral-woody`,layeringRole:`depth-builder`,description:`A contemplative oil that unfolds like a tea ceremony — osmanthus and rice milk yielding to the meditative warmth of temple incense.`},{id:`southafrica-spray`,name:`South Africa - Spray`,region:`southafrica`,format:`spray`,topNotes:[`wild fynbos`,`bergamot`,`pink pepper`],middleNotes:[`rooibos tea`,`honeybush`,`geranium`],baseNotes:[`vanilla bean`,`earth accord`,`coffee absolute`],sillage:6,longevity:7,intensity:6,scentFamily:`warm-spicy`,layeringRole:`statement`,description:`A bold spray that captures the untamed spirit of the Cape — wild fynbos opening into warm rooibos, grounded by rich vanilla and coffee.`},{id:`southafrica-oil`,name:`South Africa - Oil`,region:`southafrica`,format:`oil`,topNotes:[`buchu leaf`,`sparkling citrus`],middleNotes:[`rooibos`,`fynbos`,`wild honey`],baseNotes:[`coffee`,`vanilla`,`red earth`,`tonka`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`base-anchor`,description:`A sumptuous oil that stays close to the skin like a warm embrace — deep vanilla and coffee woven through with the wild sweetness of fynbos honey.`},{id:`mediterranean-spray`,name:`Mediterranean - Spray`,region:`mediterranean`,format:`spray`,topNotes:[`lemon zest`,`bergamot`,`orange blossom`],middleNotes:[`fig leaf`,`olive blossom`,`lavender`],baseNotes:[`sea salt`,`sun-bleached wood`,`white musk`],sillage:5,longevity:5,intensity:4,scentFamily:`citrus-aromatic`,layeringRole:`brightener`,description:`Bottled sunlight — a sparkling burst of citrus and orange blossom that dries to a breezy blend of fig and Mediterranean sea salt.`},{id:`mediterranean-oil`,name:`Mediterranean - Oil`,region:`mediterranean`,format:`oil`,topNotes:[`neroli`,`bergamot`],middleNotes:[`fig milk`,`lavender absolute`,`orange blossom`],baseNotes:[`olive wood`,`lemon rind`,`ambergris`],sillage:3,longevity:8,intensity:5,scentFamily:`green-aromatic`,layeringRole:`harmonizer`,description:`A golden oil that envelops the skin in the warmth of a Mediterranean afternoon — neroli and fig milk over sun-warmed olive wood.`},{id:`southamerica-spray`,name:`South America - Spray`,region:`southamerica`,format:`spray`,topNotes:[`pink pepper`,`tropical green leaf`,`lime`],middleNotes:[`cocoa blossom`,`jungle orchid`,`mate`],baseNotes:[`tonka bean`,`vetiver`,`palo santo`],sillage:6,longevity:6,intensity:5,scentFamily:`green-woody`,layeringRole:`statement`,description:`A vibrant spray that plunges you into tropical abundance — pink pepper and lime dissolving into rich cocoa and smoky palo santo.`},{id:`southamerica-oil`,name:`South America - Oil`,region:`southamerica`,format:`oil`,topNotes:[`açaí berry`,`green mandarin`],middleNotes:[`cocoa absolute`,`tobacco flower`,`tropical green`],baseNotes:[`tonka`,`vetiver heart`,`copaiba balsam`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`depth-builder`,description:`A luxurious oil of remarkable depth — cocoa and tobacco flower resting on a bed of tonka and vetiver, intimate yet unforgettable.`},{id:`middleeast-spray`,name:`Middle East - Spray`,region:`middleeast`,format:`spray`,topNotes:[`saffron`,`pink rose`,`cardamom`],middleNotes:[`damask rose`,`oud`,`incense`],baseNotes:[`musk`,`amber`,`sandalwood`],sillage:8,longevity:8,intensity:8,scentFamily:`oriental`,layeringRole:`statement`,description:`A majestic spray that commands presence — saffron-laced rose unfolding over precious oud and golden amber. Opulent and unapologetic.`},{id:`middleeast-oil`,name:`Middle East - Oil`,region:`middleeast`,format:`oil`,topNotes:[`saffron threads`,`bergamot`],middleNotes:[`Bulgarian rose`,`oud assam`,`frankincense`],baseNotes:[`royal musk`,`amber resin`,`agarwood`],sillage:4,longevity:10,intensity:9,scentFamily:`oriental-woody`,layeringRole:`base-anchor`,description:`The crown jewel — a deeply concentrated oil of finest oud and rose, anointed with saffron and sealed in royal musk. Lasts from dawn to dusk.`}],a=[{id:`fresh`,name:`Fresh`,description:`Clean, aquatic, and invigorating`,icon:`💧`,gradient:`linear-gradient(145deg, #ffffff 0%, #f0f6fc 40%, #ddeef8 70%, #C9A96E22 100%)`},{id:`floral`,name:`Floral`,description:`Romantic blooms and petal softness`,icon:`🌹`,gradient:`linear-gradient(145deg, #ffffff 0%, #fdf4f7 40%, #f8e0ea 70%, #C9A96E22 100%)`},{id:`woody`,name:`Woody`,description:`Warm woods and natural depth`,icon:`🌲`,gradient:`linear-gradient(145deg, #ffffff 0%, #faf6f0 40%, #f0e4d0 70%, #C9A96E22 100%)`},{id:`oriental`,name:`Oriental`,description:`Rich, warm, and spice-laden`,icon:`✨`,gradient:`linear-gradient(145deg, #ffffff 0%, #fdf8ef 40%, #f5e8c8 70%, #C9A96E22 100%)`},{id:`citrus`,name:`Citrus`,description:`Bright, zesty, and energizing`,icon:`🍋`,gradient:`linear-gradient(145deg, #ffffff 0%, #fdfcec 40%, #f8f2c0 70%, #C9A96E22 100%)`},{id:`gourmand`,name:`Gourmand`,description:`Sweet, edible, and comforting`,icon:`🍫`,gradient:`linear-gradient(145deg, #ffffff 0%, #fdf6f0 40%, #f5dfc8 70%, #C9A96E22 100%)`},{id:`green`,name:`Green`,description:`Leafy, herbal, and natural`,icon:`🍃`,gradient:`linear-gradient(145deg, #ffffff 0%, #f3faf3 40%, #d8f0d8 70%, #C9A96E22 100%)`},{id:`aromatic`,name:`Aromatic`,description:`Herbal, lavender, and sage`,icon:`🌿`,gradient:`linear-gradient(145deg, #ffffff 0%, #f7f4fd 40%, #e8dffa 70%, #C9A96E22 100%)`},{id:`spicy`,name:`Spicy`,description:`Warm spices and fiery accents`,icon:`🌶`,gradient:`linear-gradient(145deg, #ffffff 0%, #fdf4f0 40%, #f8d8c8 70%, #C9A96E22 100%)`},{id:`musky`,name:`Musky`,description:`Skin-like warmth and intimacy`,icon:`🤍`,gradient:`linear-gradient(145deg, #ffffff 0%, #faf8f6 40%, #ede5da 70%, #C9A96E22 100%)`}],o=[{id:`ysl-libre`,brand:`Yves Saint Laurent`,name:`Libre EDP`,gender:`women`,family:`oriental-fougere`,topNotes:[`lavender`,`mandarin`,`black currant`],middleNotes:[`orange blossom`,`jasmine`],baseNotes:[`vanilla`,`musk`],longevity:8,sillage:7},{id:`ysl-libre-intense`,brand:`Yves Saint Laurent`,name:`Libre EDP Intense`,gender:`women`,family:`oriental-floral`,topNotes:[`mandarin`,`lavender`],middleNotes:[`orange blossom`,`lavender`],baseNotes:[`vanilla`,`musk`],longevity:9,sillage:9},{id:`ysl-libre-le-parfum`,brand:`Yves Saint Laurent`,name:`Libre Le Parfum`,gender:`women`,family:`oriental-floral`,topNotes:[`bergamot`,`saffron`],middleNotes:[`lavender`,`orange blossom`],baseNotes:[`vetiver`,`tonka`,`vanilla bourbon`],longevity:10,sillage:9},{id:`ysl-libre-absolu-platine`,brand:`Yves Saint Laurent`,name:`Libre L'Absolu Platine`,gender:`women`,family:`floral-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`orange blossom`,`aldehydes`],baseNotes:[`vanilla`,`amber`],longevity:8,sillage:7},{id:`ysl-libre-berry-crush`,brand:`Yves Saint Laurent`,name:`Libre Berry Crush`,gender:`women`,family:`fruity-floral`,topNotes:[`raspberry`],middleNotes:[`orange blossom`,`lavender`],baseNotes:[`vanilla`,`coconut`,`musk`],longevity:7,sillage:6},{id:`ysl-libre-leau-nue`,brand:`Yves Saint Laurent`,name:`Libre L'Eau Nue`,gender:`women`,family:`floral-citrus`,topNotes:[`lemon`,`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`lavender`,`musk`],longevity:4,sillage:3},{id:`ysl-black-opium`,brand:`Yves Saint Laurent`,name:`Black Opium EDP`,gender:`women`,family:`amber-vanilla`,topNotes:[`pear`,`pink pepper`],middleNotes:[`coffee`,`jasmine`,`orange blossom`],baseNotes:[`vanilla`,`cedar`,`patchouli`],longevity:8,sillage:8},{id:`ysl-black-opium-le-parfum`,brand:`Yves Saint Laurent`,name:`Black Opium Le Parfum`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`pear`],middleNotes:[`coffee flower`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`],longevity:9,sillage:9},{id:`ysl-mon-paris`,brand:`Yves Saint Laurent`,name:`Mon Paris EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`strawberry`,`raspberry`,`pear`],middleNotes:[`peony`,`datura`],baseNotes:[`patchouli`,`white musk`],longevity:7,sillage:7},{id:`ysl-myslf`,brand:`Yves Saint Laurent`,name:`MYSLF EDP`,gender:`men`,family:`woody-floral`,topNotes:[`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`,`ambrofix`],longevity:7,sillage:6},{id:`ysl-myslf-absolu`,brand:`Yves Saint Laurent`,name:`MYSLF L'Absolu`,gender:`men`,family:`spicy-floral-woody`,topNotes:[`bergamot`,`ginger`,`cardamom`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`],longevity:8,sillage:7},{id:`ysl-y-edp`,brand:`Yves Saint Laurent`,name:`Y EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`ginger`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`tonka`],longevity:7,sillage:6},{id:`ysl-y-le-parfum`,brand:`Yves Saint Laurent`,name:`Y Le Parfum`,gender:`men`,family:`aromatic-amber`,topNotes:[`ginger`,`bergamot`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`incense`],longevity:9,sillage:8},{id:`ysl-y-edt`,brand:`Yves Saint Laurent`,name:`Y EDT`,gender:`men`,family:`aromatic-fresh`,topNotes:[`apple`,`ginger`,`bergamot`],middleNotes:[`sage`,`juniper`],baseNotes:[`cedar`,`vetiver`,`olibanum`],longevity:5,sillage:5},{id:`ysl-la-nuit`,brand:`Yves Saint Laurent`,name:`La Nuit de L'Homme EDT`,gender:`men`,family:`spicy-oriental`,topNotes:[`cardamom`,`bergamot`,`lavender`],middleNotes:[`cedar`,`vetiver`],baseNotes:[`coumarin`,`tonka`],longevity:5,sillage:5},{id:`ysl-lhomme`,brand:`Yves Saint Laurent`,name:`L'Homme EDT`,gender:`men`,family:`floral-woody`,topNotes:[`ginger`,`bergamot`],middleNotes:[`white pepper`,`violet leaf`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`ysl-tuxedo`,brand:`Yves Saint Laurent`,name:`Tuxedo (Le Vestiaire)`,gender:`unisex`,family:`spicy-woody`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`black pepper`,`patchouli`],baseNotes:[`cedar`,`incense`,`musk`],longevity:9,sillage:8},{id:`armani-si`,brand:`Giorgio Armani`,name:`Sì EDP`,gender:`women`,family:`chypre-fruity`,topNotes:[`black currant`,`mandarin`],middleNotes:[`may rose`,`neroli`],baseNotes:[`vanilla`,`patchouli`,`amber`],longevity:7,sillage:7},{id:`armani-si-passione`,brand:`Giorgio Armani`,name:`Sì Passione EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`black currant`,`pink pepper`,`pear`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`cedar`,`white musk`],longevity:7,sillage:6},{id:`armani-my-way`,brand:`Giorgio Armani`,name:`My Way EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`cedar`,`vanilla`,`white musk`],longevity:8,sillage:7},{id:`armani-my-way-parfum`,brand:`Giorgio Armani`,name:`My Way Parfum`,gender:`women`,family:`floral-amber`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`,`amber`],longevity:9,sillage:8},{id:`armani-power-of-you`,brand:`Giorgio Armani`,name:`Power of You EDP`,gender:`women`,family:`floral-musky`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`jasmine`,`iris`],baseNotes:[`musk`,`cedar`],longevity:7,sillage:6},{id:`armani-acqua-di-gio`,brand:`Giorgio Armani`,name:`Acqua di Giò EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`neroli`,`green mandarin`],middleNotes:[`rosemary`,`jasmine`],baseNotes:[`cedar`,`patchouli`,`white musk`],longevity:4,sillage:4},{id:`armani-acqua-di-gio-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`sea notes`,`green mandarin`],middleNotes:[`sage`,`lavender`],baseNotes:[`mineral`,`vetiver`,`patchouli`],longevity:7,sillage:6},{id:`armani-acqua-di-gio-parfum`,brand:`Giorgio Armani`,name:`Acqua di Giò Parfum`,gender:`men`,family:`woody-aquatic`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`rosemary`,`sage`],baseNotes:[`olibanum`,`patchouli`],longevity:7,sillage:6},{id:`armani-adg-profondo-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDP`,gender:`men`,family:`aquatic-amber`,topNotes:[`bergamot`,`sea notes`,`green mandarin`],middleNotes:[`rosemary`,`lavender`,`cypress`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`armani-adg-profondo-edt`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rosemary`,`lavender`],baseNotes:[`patchouli`,`amber`],longevity:6,sillage:5},{id:`armani-adg-elixir`,brand:`Giorgio Armani`,name:`Acqua di Giò Elixir`,gender:`men`,family:`aromatic-woody`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`lavender`,`sage`],baseNotes:[`oudh`,`amber`,`patchouli`],longevity:9,sillage:8},{id:`armani-adg-edp-intense`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP Intense`,gender:`men`,family:`aromatic-woody`,topNotes:[`bergamot`,`mandarin`],middleNotes:[`rosemary`,`clary sage`],baseNotes:[`vetiver`,`patchouli`,`incense`],longevity:8,sillage:7},{id:`armani-code-parfum`,brand:`Giorgio Armani`,name:`Armani Code Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`iris`,`bergamot`],middleNotes:[`lavender`,`iris`],baseNotes:[`tonka`,`vanilla`],longevity:8,sillage:8},{id:`armani-code-edt`,brand:`Giorgio Armani`,name:`Armani Code EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`lemon`],middleNotes:[`olive blossom`,`star anise`],baseNotes:[`guaiac wood`,`tonka`],longevity:5,sillage:5},{id:`armani-stronger-with-you`,brand:`Giorgio Armani`,name:`Stronger With You Intensely`,gender:`men`,family:`amber-vanilla`,topNotes:[`pink pepper`,`violet leaf`],middleNotes:[`chestnut`,`cinnamon`],baseNotes:[`vanilla`,`amber`,`suede`],longevity:9,sillage:8},{id:`armani-prive-rose-arabie`,brand:`Giorgio Armani`,name:`Privé Rose d'Arabie`,gender:`unisex`,family:`oriental-rose`,topNotes:[`rose`,`saffron`],middleNotes:[`oud`,`papyrus`],baseNotes:[`amber`,`musk`],longevity:10,sillage:9},{id:`armani-prive-vert-malachite`,brand:`Giorgio Armani`,name:`Privé Vert Malachite`,gender:`unisex`,family:`green-floral`,topNotes:[`mandarin`,`jasmine`],middleNotes:[`tuberose`,`ylang ylang`],baseNotes:[`wood`,`vanilla`],longevity:8,sillage:7},{id:`armani-prive-rouge-malachite`,brand:`Giorgio Armani`,name:`Privé Rouge Malachite`,gender:`unisex`,family:`spicy-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`clove`,`cinnamon`],baseNotes:[`amber`,`oud`,`benzoin`],longevity:10,sillage:9},{id:`armani-prive-musc-shamal`,brand:`Giorgio Armani`,name:`Privé Musc Shamal`,gender:`unisex`,family:`musky-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`oud`,`rose`],baseNotes:[`musk`,`amber`,`sandalwood`],longevity:10,sillage:9},{id:`armani-prive-blanc-kogane`,brand:`Giorgio Armani`,name:`Privé Blanc Kogane`,gender:`unisex`,family:`white-floral`,topNotes:[`bergamot`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`sandalwood`,`white musk`],longevity:8,sillage:7},{id:`lancome-la-vie-est-belle`,brand:`Lancôme`,name:`La Vie Est Belle EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`pear`],middleNotes:[`iris`,`jasmine`,`orange blossom`],baseNotes:[`praline`,`vanilla`,`patchouli`],longevity:8,sillage:7},{id:`lancome-la-vie-intensement`,brand:`Lancôme`,name:`La Vie Est Belle Intensément`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`red currant`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`red sandalwood`,`vanilla`],longevity:8,sillage:8},{id:`lancome-la-vie-elixir`,brand:`Lancôme`,name:`La Vie Est Belle L'Elixir`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`iris`,`jasmine`],baseNotes:[`vanilla`,`praline`,`patchouli`],longevity:9,sillage:8},{id:`lancome-la-vie-iris-absolu`,brand:`Lancôme`,name:`La Vie Est Belle Iris Absolu`,gender:`women`,family:`floral-powdery`,topNotes:[`bergamot`,`pear`],middleNotes:[`iris`,`rose`],baseNotes:[`musk`,`patchouli`],longevity:7,sillage:6},{id:`lancome-la-vie-rose`,brand:`Lancôme`,name:`La Vie Est Belle Rose Extraordinaire`,gender:`women`,family:`floral-rose`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rose`,`peony`],baseNotes:[`musk`,`patchouli`,`vanilla`],longevity:7,sillage:6},{id:`lancome-la-vie-vanille-nude`,brand:`Lancôme`,name:`La Vie Est Belle Vanille Nude`,gender:`women`,family:`vanilla-gourmand`,topNotes:[`pear`,`bergamot`],middleNotes:[`iris`],baseNotes:[`vanilla`,`musk`],longevity:7,sillage:6},{id:`lancome-la-vie-soleil`,brand:`Lancôme`,name:`La Vie Est Belle Soleil Cristal`,gender:`women`,family:`floral-solar`,topNotes:[`coconut`,`citrus`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`musk`,`vanilla`],longevity:6,sillage:5},{id:`lancome-idole`,brand:`Lancôme`,name:`Idôle EDP`,gender:`women`,family:`floral-chypre`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`white musk`,`cedar`],longevity:7,sillage:6},{id:`lancome-tresor`,brand:`Lancôme`,name:`Trésor EDP`,gender:`women`,family:`oriental-floral`,topNotes:[`rose`,`lilac`,`peach`],middleNotes:[`iris`,`rose`,`muguet`],baseNotes:[`sandalwood`,`amber`,`musk`,`vanilla`],longevity:7,sillage:6},{id:`prada-paradoxe`,brand:`Prada`,name:`Paradoxe EDP`,gender:`women`,family:`floral-amber`,topNotes:[`neroli bud`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`ambrofix`,`musk`],longevity:8,sillage:7},{id:`prada-paradoxe-intense`,brand:`Prada`,name:`Paradoxe Intense`,gender:`women`,family:`floral-amber-vanilla`,topNotes:[`bergamot`,`neroli`,`pear`],middleNotes:[`jasmine`,`moss`],baseNotes:[`ambrofix`,`vanilla bourbon`],longevity:9,sillage:8},{id:`prada-paradoxe-virtual-flower`,brand:`Prada`,name:`Paradoxe Virtual Flower`,gender:`women`,family:`floral-green`,topNotes:[`bergamot`,`green notes`],middleNotes:[`jasmine`,`peony`],baseNotes:[`musk`,`ambrofix`],longevity:6,sillage:5},{id:`prada-paradoxe-radical-essence`,brand:`Prada`,name:`Paradoxe Radical Essence`,gender:`women`,family:`floral-woody`,topNotes:[`neroli`,`bergamot`],middleNotes:[`jasmine`,`iris`],baseNotes:[`cedar`,`ambrofix`,`musk`],longevity:7,sillage:6},{id:`prada-candy`,brand:`Prada`,name:`Candy EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`caramel`],middleNotes:[`musk`,`almond`],baseNotes:[`vanilla`,`benzoin`],longevity:7,sillage:6},{id:`prada-la-femme`,brand:`Prada`,name:`La Femme Prada`,gender:`women`,family:`floral-chypre`,topNotes:[`mandarin`,`frangipani`],middleNotes:[`tuberose`,`ylang ylang`,`jasmine`],baseNotes:[`vetiver`,`vanilla`,`beeswax`],longevity:7,sillage:6},{id:`prada-infusion-iris`,brand:`Prada`,name:`Infusion d'Iris EDP`,gender:`women`,family:`floral-powdery`,topNotes:[`mandarin`,`orange`],middleNotes:[`iris`,`incense`],baseNotes:[`vetiver`,`cedar`,`benzoin`],longevity:6,sillage:5},{id:`prada-luna-rossa-edt`,brand:`Prada`,name:`Luna Rossa EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`lavender`,`bitter orange`],middleNotes:[`clary sage`,`spearmint`],baseNotes:[`ambroxan`],longevity:5,sillage:5},{id:`prada-luna-rossa-carbon`,brand:`Prada`,name:`Luna Rossa Carbon EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`pepper`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`],longevity:7,sillage:6},{id:`prada-luna-rossa-carbon-edp`,brand:`Prada`,name:`Luna Rossa Carbon EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`dry amber`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`,`cedar`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-edt`,brand:`Prada`,name:`Luna Rossa Ocean EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`lavender`,`cashmere wood`],baseNotes:[`patchouli`,`musk`],longevity:6,sillage:5},{id:`prada-luna-rossa-ocean-edp`,brand:`Prada`,name:`Luna Rossa Ocean EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`patchouli`,`musk`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-le-parfum`,brand:`Prada`,name:`Luna Rossa Ocean Le Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`oud`,`patchouli`],longevity:9,sillage:8},{id:`prada-luna-rossa-black`,brand:`Prada`,name:`Luna Rossa Black`,gender:`men`,family:`amber-fougere`,topNotes:[`bergamot`,`angelica`],middleNotes:[`coumarin`,`patchouli`],baseNotes:[`amber`,`sandalwood`],longevity:8,sillage:7},{id:`prada-lhomme`,brand:`Prada`,name:`L'Homme Prada EDT`,gender:`men`,family:`amber-fougere`,topNotes:[`iris`,`neroli`],middleNotes:[`amber`,`patchouli`],baseNotes:[`cedar`,`sandalwood`],longevity:6,sillage:5},{id:`prada-paradigme`,brand:`Prada`,name:`Paradigme EDP`,gender:`men`,family:`amber-woody`,topNotes:[`citrus`,`amber`],middleNotes:[`floral`,`soapy accord`],baseNotes:[`vanilla`,`balsam`,`woody`],longevity:8,sillage:7},{id:`valentino-donna-born-in-roma`,brand:`Valentino`,name:`Donna Born in Roma EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`black currant`,`bergamot`,`pink pepper`],middleNotes:[`jasmine sambac`,`jasmine grandiflorum`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:7,sillage:7},{id:`valentino-donna-intense`,brand:`Valentino`,name:`Born in Roma Donna Intense`,gender:`women`,family:`floral-amber`,topNotes:[`black currant`,`raspberry`],middleNotes:[`jasmine`,`tuberose`],baseNotes:[`vanilla`,`amber`,`sandalwood`],longevity:8,sillage:8},{id:`valentino-donna-extradose`,brand:`Valentino`,name:`Born in Roma Donna Extradose`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`jasmine sambac`,`osmanthus`],baseNotes:[`vanilla`,`tonka`],longevity:8,sillage:7},{id:`valentino-donna-purple-mel`,brand:`Valentino`,name:`Born in Roma Purple Melancholia Donna`,gender:`women`,family:`floral-leather`,topNotes:[`bergamot`],middleNotes:[`jasmine`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`cashmere wood`],longevity:8,sillage:7},{id:`valentino-uomo`,brand:`Valentino`,name:`Uomo Born in Roma EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`mineral salt`,`ginger`],middleNotes:[`sage`,`lavender`],baseNotes:[`vetiver`,`cashmere wood`],longevity:7,sillage:6},{id:`valentino-uomo-intense`,brand:`Valentino`,name:`Uomo Born in Roma Intense`,gender:`men`,family:`oriental-vanilla`,topNotes:[`lavender`],middleNotes:[`vetiver`,`iris`],baseNotes:[`vanilla`,`tonka`],longevity:9,sillage:8},{id:`valentino-uomo-coral`,brand:`Valentino`,name:`Uomo Born in Roma Coral Fantasy`,gender:`men`,family:`aromatic-woody`,topNotes:[`grapefruit`,`basil`],middleNotes:[`sage`,`geranium`],baseNotes:[`vetiver`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-extradose`,brand:`Valentino`,name:`Uomo Born in Roma Extradose`,gender:`men`,family:`oriental-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`vetiver`],baseNotes:[`vanilla`,`amber`,`tonka`],longevity:8,sillage:7},{id:`valentino-uomo-ivory`,brand:`Valentino`,name:`Uomo Born in Roma Ivory`,gender:`men`,family:`aromatic-fresh`,topNotes:[`bergamot`,`lavender`],middleNotes:[`sage`,`iris`],baseNotes:[`musk`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-purple-mel`,brand:`Valentino`,name:`Uomo Born in Roma Purple Melancholia`,gender:`men`,family:`oriental-leather`,topNotes:[`bergamot`,`lavender`],middleNotes:[`iris`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`oud`],longevity:9,sillage:8},{id:`valentino-anatomy-dreams`,brand:`Valentino`,name:`Anatomy of Dreams Collection`,gender:`unisex`,family:`niche-various`,topNotes:[`artistic notes`],middleNotes:[`rare ingredients`],baseNotes:[`premium woods`],longevity:8,sillage:7},{id:`mugler-angel`,brand:`Mugler`,name:`Angel EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`coconut`,`pineapple`],middleNotes:[`honey`,`chocolate`,`caramel`],baseNotes:[`patchouli`,`vanilla`,`tonka`],longevity:10,sillage:9},{id:`mugler-angel-nova`,brand:`Mugler`,name:`Angel Nova EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`lychee`],middleNotes:[`damask rose`,`peony`],baseNotes:[`akigalawood`,`benzoin`],longevity:8,sillage:7},{id:`mugler-alien`,brand:`Mugler`,name:`Alien EDP`,gender:`women`,family:`woody-solar`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`],baseNotes:[`white amber`],longevity:10,sillage:9},{id:`mugler-alien-goddess`,brand:`Mugler`,name:`Alien Goddess EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`coconut water`],middleNotes:[`jasmine`,`heliotrope`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:8,sillage:7},{id:`mugler-alien-hypersense`,brand:`Mugler`,name:`Alien Hypersense EDP`,gender:`women`,family:`floral-solar`,topNotes:[`ylang ylang`],middleNotes:[`jasmine sambac`,`tuberose`],baseNotes:[`cashmere wood`,`white amber`],longevity:8,sillage:8},{id:`mugler-alien-supra-florale`,brand:`Mugler`,name:`Alien Supra Florale`,gender:`women`,family:`white-floral`,topNotes:[`jasmine`,`tuberose`],middleNotes:[`orange blossom`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-alien-extraintense`,brand:`Mugler`,name:`Alien Extraintense`,gender:`women`,family:`amber-woody`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`,`vanilla`],baseNotes:[`white amber`,`benzoin`],longevity:10,sillage:9},{id:`mugler-alien-pulp`,brand:`Mugler`,name:`Alien Pulp`,gender:`women`,family:`fruity-floral`,topNotes:[`pear`,`passion fruit`],middleNotes:[`jasmine`,`peony`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-amen`,brand:`Mugler`,name:`A*Men EDT`,gender:`men`,family:`oriental-woody`,topNotes:[`mint`,`lavender`,`bergamot`],middleNotes:[`coffee`,`tar`],baseNotes:[`tonka`,`patchouli`,`vanilla`,`caramel`],longevity:8,sillage:7},{id:`mugler-alien-man`,brand:`Mugler`,name:`Alien Man EDT`,gender:`men`,family:`amber-woody`,topNotes:[`white osmanthus`],middleNotes:[`leather`,`smoked beechwood`],baseNotes:[`cashmere wood`,`amber`],longevity:6,sillage:5},{id:`vr-flowerbomb`,brand:`Viktor & Rolf`,name:`Flowerbomb EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`tea`,`bergamot`],middleNotes:[`sambac jasmine`,`rose`,`orchid`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`vr-flowerbomb-ruby`,brand:`Viktor & Rolf`,name:`Flowerbomb Ruby Orchid`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`saffron`],middleNotes:[`orchid`,`vanilla`],baseNotes:[`sandalwood`,`musk`],longevity:8,sillage:7},{id:`vr-flowerbomb-extreme-2025`,brand:`Viktor & Rolf`,name:`Flowerbomb Extreme 2025`,gender:`women`,family:`floral-oriental`,topNotes:[`rose`,`bergamot`],middleNotes:[`jasmine`,`orchid`,`orange blossom`],baseNotes:[`patchouli`,`tonka`,`vanilla`],longevity:9,sillage:8},{id:`vr-good-fortune`,brand:`Viktor & Rolf`,name:`Good Fortune EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`jasmine`],middleNotes:[`vanilla`],baseNotes:[`amber`,`vetiver`,`crème brûlée`],longevity:8,sillage:7},{id:`vr-bonbon`,brand:`Viktor & Rolf`,name:`Bonbon EDP`,gender:`women`,family:`gourmand-fruity`,topNotes:[`mandarin`,`peach`],middleNotes:[`caramel`,`orange blossom`],baseNotes:[`cedar`,`guaiac wood`,`sandalwood`],longevity:7,sillage:6},{id:`vr-spicebomb`,brand:`Viktor & Rolf`,name:`Spicebomb EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`grapefruit`,`pink pepper`],middleNotes:[`cinnamon`,`saffron`],baseNotes:[`tobacco`,`vetiver`,`leather`],longevity:7,sillage:7},{id:`vr-spicebomb-extreme`,brand:`Viktor & Rolf`,name:`Spicebomb Extreme EDP`,gender:`men`,family:`oriental-spicy`,topNotes:[`black pepper`,`saffron`],middleNotes:[`lavender`,`cinnamon`],baseNotes:[`tonka`,`tobacco`,`amber`],longevity:9,sillage:9},{id:`vr-spicebomb-night-vision`,brand:`Viktor & Rolf`,name:`Spicebomb Night Vision EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`clary sage`,`grapefruit`],middleNotes:[`cinnamon`,`green cardamom`],baseNotes:[`benzoin`,`tobacco`],longevity:7,sillage:6},{id:`vr-spicebomb-dark-leather`,brand:`Viktor & Rolf`,name:`Spicebomb Dark Leather EDP`,gender:`men`,family:`leather-spicy`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`leather`,`cinnamon`],baseNotes:[`tonka`,`benzoin`],longevity:9,sillage:8},{id:`vr-spicebomb-metallic-musk`,brand:`Viktor & Rolf`,name:`Spicebomb Metallic Musk EDP`,gender:`men`,family:`musky-spicy`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`musk`,`lavender`],baseNotes:[`amber`,`cedar`],longevity:7,sillage:6},{id:`azzaro-wanted`,brand:`Azzaro`,name:`Azzaro Wanted EDT`,gender:`men`,family:`spicy-woody`,topNotes:[`lemon`,`ginger`,`mint`],middleNotes:[`cardamom`,`juniper`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`azzaro-most-wanted`,brand:`Azzaro`,name:`The Most Wanted EDP`,gender:`men`,family:`amber-spicy`,topNotes:[`cardamom`,`toffee`],middleNotes:[`lavender`,`iris`],baseNotes:[`amber wood`,`woody notes`],longevity:8,sillage:7},{id:`azzaro-most-wanted-parfum`,brand:`Azzaro`,name:`The Most Wanted Parfum`,gender:`men`,family:`amber-vanilla`,topNotes:[`cardamom`,`fig`],middleNotes:[`amber`,`lavender`],baseNotes:[`vanilla`,`tonka`],longevity:10,sillage:9},{id:`azzaro-chrome`,brand:`Azzaro`,name:`Azzaro Chrome EDT`,gender:`men`,family:`citrus-aquatic`,topNotes:[`lemon`,`neroli`,`rosemary`],middleNotes:[`cyclamen`,`jasmine`],baseNotes:[`musk`,`oakmoss`,`cedar`],longevity:5,sillage:4},{id:`mm-by-the-fireplace`,brand:`Maison Margiela`,name:`By the Fireplace`,gender:`unisex`,family:`woody-spicy`,topNotes:[`clove oil`,`pink pepper`],middleNotes:[`chestnut`,`guaiac wood`],baseNotes:[`vanilla`,`peru balsam`,`cashmere wood`],longevity:7,sillage:6},{id:`mm-jazz-club`,brand:`Maison Margiela`,name:`Jazz Club`,gender:`unisex`,family:`aromatic-fougere`,topNotes:[`pink pepper`,`neroli`,`lemon`],middleNotes:[`rose`,`sage`],baseNotes:[`tobacco`,`vanilla`,`styrax`],longevity:7,sillage:5},{id:`mm-lazy-sunday`,brand:`Maison Margiela`,name:`Lazy Sunday Morning`,gender:`unisex`,family:`floral-musky`,topNotes:[`muguet`,`pear`,`aldehydes`],middleNotes:[`iris`,`rose`,`orange blossom`],baseNotes:[`white musk`,`patchouli`],longevity:5,sillage:4},{id:`mm-beach-walk`,brand:`Maison Margiela`,name:`Beach Walk`,gender:`unisex`,family:`floral-aquatic`,topNotes:[`bergamot`,`lemon`,`pink pepper`],middleNotes:[`ylang ylang`,`coconut milk`],baseNotes:[`musk`,`cedar`,`benzoin`],longevity:5,sillage:4},{id:`mm-whispers`,brand:`Maison Margiela`,name:`Whispers in the Library`,gender:`unisex`,family:`woody-spicy`,topNotes:[`pepper`],middleNotes:[`vanilla`,`cedar`],baseNotes:[`benzoin`,`musk`],longevity:7,sillage:5},{id:`mm-across-sands`,brand:`Maison Margiela`,name:`Across Sands`,gender:`unisex`,family:`oriental-amber`,topNotes:[`saffron`,`bergamot`],middleNotes:[`rose`,`amber`],baseNotes:[`oud`,`vanilla`],longevity:8,sillage:8},{id:`mm-on-a-date`,brand:`Maison Margiela`,name:`On a Date`,gender:`unisex`,family:`gourmand-floral`,topNotes:[`pear`],middleNotes:[`rose`,`iris`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`mm-flying`,brand:`Maison Margiela`,name:`Flying`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`citrus`],middleNotes:[`aromatic notes`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`mm-soul-of-forest`,brand:`Maison Margiela`,name:`Soul of the Forest`,gender:`unisex`,family:`woody-green`,topNotes:[`green notes`],middleNotes:[`mushroom`,`woody notes`],baseNotes:[`cedar`,`musk`],longevity:5,sillage:5},{id:`rl-polo-blue-edt`,brand:`Ralph Lauren`,name:`Polo Blue EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`melon`,`cucumber`],middleNotes:[`sage`,`basil`],baseNotes:[`suede`,`musk`,`woody notes`],longevity:5,sillage:5},{id:`rl-polo-blue`,brand:`Ralph Lauren`,name:`Polo Blue EDP`,gender:`men`,family:`citrus-woody`,topNotes:[`bergamot`,`salt notes`],middleNotes:[`cardamom`,`sage`],baseNotes:[`patchouli`,`vetiver`,`suede`],longevity:7,sillage:6},{id:`rl-polo-red`,brand:`Ralph Lauren`,name:`Polo Red EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`grapefruit`,`cranberry`],middleNotes:[`sage`,`amber wood`],baseNotes:[`cedar`,`coffee`],longevity:5,sillage:5},{id:`rl-ralphs-club`,brand:`Ralph Lauren`,name:`Ralph's Club EDP`,gender:`men`,family:`woody-aromatic`,topNotes:[`lavender`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`vetiver`,`musk`],longevity:7,sillage:6},{id:`rl-ralphs-club-parfum`,brand:`Ralph Lauren`,name:`Ralph's Club Parfum`,gender:`men`,family:`woody-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`tonka bean`,`iris`],baseNotes:[`cedar`,`vanilla`,`sandalwood`],longevity:9,sillage:8},{id:`rl-beyond-romance`,brand:`Ralph Lauren`,name:`Beyond Romance EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`raspberry`,`damask rose`],middleNotes:[`jasmine`,`iris`],baseNotes:[`vanilla`,`cashmere wood`],longevity:7,sillage:6},{id:`cacharel-yes-i-am`,brand:`Cacharel`,name:`Yes I Am EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`peach`,`red currant`],middleNotes:[`rose`,`iris`],baseNotes:[`vanilla`,`caramel`,`cedar`],longevity:5,sillage:5},{id:`cacharel-anais-anais`,brand:`Cacharel`,name:`Anaïs Anaïs L'Original EDT`,gender:`women`,family:`floral-white`,topNotes:[`hyacinth`,`muguet`],middleNotes:[`jasmine`,`ylang ylang`,`iris`],baseNotes:[`sandalwood`,`vetiver`,`musk`],longevity:5,sillage:4},{id:`cacharel-amor-amor`,brand:`Cacharel`,name:`Amor Amor EDT`,gender:`women`,family:`floral-fruity`,topNotes:[`grapefruit`,`blood orange`,`mandarin`],middleNotes:[`jasmine`,`lily`,`rose`],baseNotes:[`vanilla`,`amber`,`musk`],longevity:5,sillage:5},{id:`diesel-d`,brand:`Diesel`,name:`Diesel D EDT`,gender:`men`,family:`fresh-woody`,topNotes:[`lavender`,`bergamot`],middleNotes:[`denim accord`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`diesel-only-the-brave`,brand:`Diesel`,name:`Only The Brave EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`lemon`,`mandarin`,`parsley`],middleNotes:[`coriander`,`violet leaf`],baseNotes:[`amber`,`cedar`,`styrax`],longevity:5,sillage:5},{id:`miu-miu-miutine`,brand:`Miu Miu`,name:`Miutine EDP`,gender:`women`,family:`floral`,topNotes:[`muguet`],middleNotes:[`floral notes`],baseNotes:[`musk`,`amber`],longevity:7,sillage:5},{id:`aesop-hwyl`,brand:`Aesop`,name:`Hwyl EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`cypress`],middleNotes:[`vetiver`,`incense`],baseNotes:[`moss`],longevity:7,sillage:5},{id:`aesop-marrakech`,brand:`Aesop`,name:`Marrakech Intense EDT`,gender:`unisex`,family:`spicy-floral`,topNotes:[`neroli`],middleNotes:[`rose`,`cardamom`],baseNotes:[`sandalwood`,`cedar`],longevity:5,sillage:4},{id:`aesop-rozu`,brand:`Aesop`,name:`Rozu EDP`,gender:`unisex`,family:`floral-green`,topNotes:[`guaiac wood`],middleNotes:[`shiso`,`rose`],baseNotes:[`vetiver`,`patchouli`],longevity:5,sillage:4},{id:`aesop-karst`,brand:`Aesop`,name:`Karst EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`florentine iris`],middleNotes:[`smoked vetiver`],baseNotes:[`smoky cedar`],longevity:7,sillage:5},{id:`aesop-miraceti`,brand:`Aesop`,name:`Miraceti EDP`,gender:`unisex`,family:`musky-amber`,topNotes:[`labdanum`],middleNotes:[`musk`],baseNotes:[`ambrette`],longevity:7,sillage:5},{id:`aesop-eidesis`,brand:`Aesop`,name:`Eidesis EDP`,gender:`unisex`,family:`floral-musky`,topNotes:[`jasmine`],middleNotes:[`orange blossom`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`ac-clementine-california`,brand:`Atelier Cologne`,name:`Clémentine California`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`clementine`,`red pepper`],middleNotes:[`juniper berry`],baseNotes:[`vetiver`,`sandalwood`],longevity:5,sillage:5},{id:`ac-orange-sanguine`,brand:`Atelier Cologne`,name:`Orange Sanguine`,gender:`unisex`,family:`citrus`,topNotes:[`blood orange`],middleNotes:[`jasmine`],baseNotes:[`tonka bean`,`sandalwood`],longevity:4,sillage:3},{id:`ac-vanille-insensee`,brand:`Atelier Cologne`,name:`Vanille Insensée`,gender:`unisex`,family:`vanilla-woody`,topNotes:[`lemon`],middleNotes:[`vanilla`],baseNotes:[`oak moss`,`amber`],longevity:5,sillage:5}],s=[{id:`cf-1`,name:`Midnight Silk Road`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:3,unit:`drops`}],context:`evening`,likes:234,saves:89,tags:[`evening`,`date-night`,`warm`],description:`A mysterious East-meets-East blend. Oud and saffron from the Middle East intertwined with the contemplative incense of East Asian temples.`},{id:`cf-2`,name:`Golden Hour`,authorProfile:`fresh-citrus`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:187,saves:72,tags:[`summer`,`casual`,`warm`],description:`Sun-kissed Mediterranean citrus anchored by the warm vanilla-coffee richness of South Africa. Like a golden sunset over the Cape.`},{id:`cf-3`,name:`Forest Ceremony`,authorProfile:`woody-green`,layers:[{perfumeId:`scandinavian-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`},{perfumeId:`eastasia-oil`,amount:1,unit:`drops`}],context:`office`,likes:156,saves:64,tags:[`office`,`sophisticated`,`green`],description:`Nordic freshness layered over Amazonian depth with a whisper of Japanese hinoki. A global forest walk in three layers.`},{id:`cf-4`,name:`Velvet Rose`,authorProfile:`floral-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`mediterranean-spray`,amount:2,unit:`sprays`}],context:`evening`,likes:312,saves:128,tags:[`romantic`,`elegant`,`evening`],description:`The opulent rose and oud of the Middle East lightened by Mediterranean citrus and fig. Elegance without heaviness.`},{id:`cf-5`,name:`Cocoa Cloud`,authorProfile:`gourmand-lover`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:3,unit:`drops`}],context:`weekend`,likes:198,saves:85,tags:[`cozy`,`winter`,`gourmand`],description:`A dessert-like warmth — tropical cocoa and palo santo fused with South African vanilla and coffee absolute. Comfort in a bottle.`},{id:`cf-6`,name:`Zen Garden`,authorProfile:`fresh-clean`,layers:[{perfumeId:`eastasia-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:2,unit:`drops`}],context:`meditation`,likes:145,saves:67,tags:[`calm`,`clean`,`daytime`],description:`Sakura and green tea floating above a crystalline Nordic base. Serene minimalism for moments of mindfulness.`},{id:`cf-7`,name:`Saharan Night`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-oil`,amount:1,unit:`drops`}],context:`evening`,likes:276,saves:112,tags:[`bold`,`evening`,`statement`],description:`A commanding nighttime blend — Arabian oud intensified by African coffee-vanilla and a drop of South American tonka. Not for the faint-hearted.`},{id:`cf-8`,name:`Azure Morning`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`morning`,likes:203,saves:91,tags:[`morning`,`fresh`,`office`],description:`Bright Mediterranean citrus with a cool Scandinavian mineral finish. Like diving into the Aegean Sea at dawn.`},{id:`cf-9`,name:`Imperial Garden`,authorProfile:`floral-green`,layers:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`},{perfumeId:`mediterranean-oil`,amount:1,unit:`drops`}],context:`special-occasion`,likes:167,saves:73,tags:[`elegant`,`special`,`floral`],description:`East Asian florals crowned with a touch of Middle Eastern oud and Mediterranean neroli. A garden fit for royalty.`},{id:`cf-10`,name:`Safari Dawn`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`adventure`,likes:134,saves:56,tags:[`adventure`,`daytime`,`warm`],description:`The wild warmth of the African savanna softened by Mediterranean olive blossom and fig. For the modern explorer.`},{id:`cf-11`,name:`Spice Bazaar`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`}],context:`evening`,likes:189,saves:78,tags:[`bold`,`evening`,`spicy`],description:`Arabian saffron meets Amazonian tonka and dark chocolate. A walk through a moonlit spice market.`},{id:`cf-12`,name:`Nordic Bloom`,authorProfile:`floral-green`,layers:[{perfumeId:`scandinavian-spray`,amount:3,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:162,saves:61,tags:[`spring`,`fresh`,`floral`],description:`Crisp birch and juniper lifted by cherry blossom and yuzu. Scandinavian clarity with Japanese elegance.`},{id:`cf-13`,name:`Cape Sunset`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:3,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`}],context:`weekend`,likes:147,saves:59,tags:[`weekend`,`warm`,`rich`],description:`South African rooibos warmth deepened by a single drop of Arabian oud. Bold yet comforting.`},{id:`cf-14`,name:`Tropical Breeze`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`summer`,likes:173,saves:68,tags:[`summer`,`casual`,`tropical`],description:`Amazonian green notes and palo santo with Mediterranean neroli and fig. A sun-drenched tropical getaway.`},{id:`cf-15`,name:`Amber Veil`,authorProfile:`warm-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`evening`,likes:215,saves:94,tags:[`evening`,`sophisticated`,`warm`],description:`Arabian amber and rose oil layered with South American tonka, finished with a cool Nordic touch. Mysterious elegance.`}],c=[{id:`warm-oriental`,name:`Warm Oriental`,description:`Rich, spice-laden warmth with amber and resinous depth`,families:[`oriental`,`spicy`,`gourmand`]},{id:`fresh-aquatic`,name:`Fresh Aquatic`,description:`Clean, crisp, and invigorating like ocean air`,families:[`fresh`,`citrus`,`aromatic`]},{id:`floral-romantic`,name:`Floral Romantic`,description:`Lush blooms, soft petals, and romantic elegance`,families:[`floral`,`musky`]},{id:`woody-earthy`,name:`Woody Earthy`,description:`Grounded in nature — forests, earth, and bark`,families:[`woody`,`green`,`aromatic`]},{id:`citrus-bright`,name:`Citrus Bright`,description:`Zesty, luminous, and energizing sunshine`,families:[`citrus`,`fresh`,`green`]},{id:`gourmand-cozy`,name:`Gourmand Cozy`,description:`Edible comfort — vanilla, cocoa, and sweet warmth`,families:[`gourmand`,`oriental`]}];function l(e){return i.find(t=>t.id===e)}var u={scandinavian:new URL(`/mon_accord/assets/scandinavian-DvtLirp4.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-UzXNmAB4.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-PFpjigF9.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-CV0fuGZk.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DyzbduD3.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Bmlf8LlT.webp`,``+import.meta.url).href},d={scandinavian:new URL(`/mon_accord/assets/scandinavian-BBoj4W5D.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-D93RVLet.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-hdHFYwXs.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-B_fMAvaC.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DcR51yl4.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DMI8-64c.webp`,``+import.meta.url).href};function f(e,n){let a=!!t.getProfile();e.innerHTML=`
    <!-- HERO -->
    <section class="hero" id="hero-section">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line">Build Your</span>
          <span class="hero__title-line hero__title-accent">Signature.</span>
        </h1>
        <p class="hero__subtitle">
          Layer fragrances from six world regions.<br>
          Your olfactory identity, composed by you.
        </p>
      </div>
      <div class="hero__scroll-hint" id="scroll-hint">
        <div class="hero__discover-ring">
          <span class="hero__discover-label">Discover</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </div>
    </section>

    <!-- COLLECTION -->
    <section class="landing-regions" id="regions-section">
      <div class="cf-showcase">

        <!-- Left: visual carousel -->
        <div class="cf-visual">
          <button class="cf-nav cf-nav--prev" id="cf-prev" aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="cf-stage" id="cf-stage">
            ${r.map((e,t)=>`
              <div class="cf-card" data-index="${t}" data-region="${e.id}">
                <img src="${u[e.id]}" alt="${e.name} Spray" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
                <img src="${d[e.id]}" alt="${e.name} Oil" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
              </div>
            `).join(``)}
          </div>
          <button class="cf-nav cf-nav--next" id="cf-next" aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div class="cf-dots" id="cf-dots">
            ${r.map((e,t)=>`<button class="cf-dot" data-index="${t}" style="--rc: ${e.color};" aria-label="${e.name}"></button>`).join(``)}
          </div>
        </div>

        <!-- Right: info panel -->
        <div class="cf-info" id="cf-info"></div>

      </div>
    </section>

    <!-- NAME ORIGIN -->
    <section class="landing-origin" id="origin-section">
      <div class="page__container">
        <div class="origin-block">
          <p class="origin-word">Mon Accord</p>
          <p class="origin-definition">French for <em>my harmony</em>. A fragrance is never just a scent — it is an agreement between notes, between cultures, between a moment and a memory. Find yours.</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="landing-how" id="how-section">
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">The Experience</p>
          <h2 class="section-title">How Mon Accord Works</h2>
        </div>
        <div class="how-steps">
          <div class="how-step" id="how-step-1">
            <div class="how-step__number">01</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Build Your Profile</h3>
              <p class="how-step__text">Answer a short quiz and we create your unique olfactory archetype — your taste, your language, your starting point.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-2">
            <div class="how-step__number">02</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Layer & Compose</h3>
              <p class="how-step__text">Combine sprays and oils from six world regions. Adjust ratios, simulate the scent, and get advice tailored to your mood, occasion, and season.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-3">
            <div class="how-step__number">03</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Save & Evolve</h3>
              <p class="how-step__text">Vault your formulas, revisit them anytime. Your profile grows with every session — refining your accord as your taste evolves.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="landing-cta" id="cta-section">
      <div class="page__container text-center">
        <div class="cta-card">
          <p class="section-label">Ready?</p>
          <h2 class="section-title">Find Your Accord</h2>
          <p class="section-subtitle mb-lg">Start with a quick profile quiz — your personalised scent journey begins here.</p>
          <button class="btn btn--primary btn--lg" id="bottom-cta">
            ${a?`Go to Lab`:`Take the Quiz`}
          </button>
        </div>
      </div>
    </section>
  `,p(),e.querySelector(`#scroll-hint`).addEventListener(`click`,()=>{document.getElementById(`origin-section`)?.scrollIntoView({behavior:`smooth`})}),e.querySelector(`#bottom-cta`).addEventListener(`click`,()=>{n(a?`#lab`:`#profile`)});let o=[0,1,2,3,4,5];function s(t){return e.querySelector(`.cf-card[data-index="${t}"]`)}function c(e,t,n=!1){let r=Math.abs(t),i=t*320,a=r===0?1:r===1?.68:.5,o=r===0?1:r===1?.55:0,s=r===0?5:r===1?3:1;n&&(e.style.transition=`none`),e.style.transform=`translateX(calc(-50% + ${i}px)) translateY(-50%) scale(${a})`,e.style.opacity=o,e.style.zIndex=s,n&&(e.offsetHeight,e.style.transition=``)}function l(t=!1){o.forEach((e,n)=>{c(s(e),n-2,t),s(e).classList.toggle(`cf-card--active`,n===2)}),e.querySelectorAll(`.cf-dot`).forEach((e,t)=>{e.classList.toggle(`active`,t===o[2])}),f()}function f(){let t=r[o[2]],n=i.find(e=>e.region===t.id&&e.format===`spray`),a=i.find(e=>e.region===t.id&&e.format===`oil`),s=e.querySelector(`#cf-info`),c=(e,t)=>`
      <div class="cf-info__note-col">
        <p class="cf-info__note-heading">${e}</p>
        <p class="cf-info__note-vals">${t.join(`, `)}</p>
      </div>`;s.innerHTML=`
      <div class="cf-info__inner" style="--rc: ${t.color}; --rcl: ${t.colorLight};">
        <div class="cf-info__top">
          <p class="cf-info__label">The Collection</p>
          <h2 class="cf-info__name">${t.name}</h2>

        </div>
        <p class="cf-info__desc">${t.description}</p>
        <div class="cf-info__divider"></div>
        ${n?`
          <div class="cf-info__notes-block">
            <p class="cf-info__notes-type">Spray</p>
            <div class="cf-info__notes-cols">
              ${c(`TOP`,n.topNotes)}
              ${c(`HEART`,n.middleNotes)}
              ${c(`BASE`,n.baseNotes)}
            </div>
          </div>`:``}
        ${a?`
          <div class="cf-info__notes-block">
            <p class="cf-info__notes-type">Oil</p>
            <div class="cf-info__notes-cols">
              ${c(`TOP`,a.topNotes)}
              ${c(`HEART`,a.middleNotes)}
              ${c(`BASE`,a.baseNotes)}
            </div>
          </div>`:``}
      </div>
    `,s.querySelector(`.cf-info__inner`).animate([{opacity:0,transform:`translateX(16px)`},{opacity:1,transform:`translateX(0)`}],{duration:340,easing:`cubic-bezier(0.16,1,0.3,1)`,fill:`forwards`})}function m(){c(s(o[0]),3,!0),o=[...o.slice(1),o[0]],l()}function h(){c(s(o[5]),-3,!0),o=[o[5],...o.slice(0,5)],l()}function g(e){if(o.indexOf(e)-2==0)return;let t=o.indexOf(e);o=[...o.slice(t),...o.slice(0,t)],l(!0)}e.querySelector(`#cf-prev`).addEventListener(`click`,h),e.querySelector(`#cf-next`).addEventListener(`click`,m),e.querySelectorAll(`.cf-dot`).forEach((e,t)=>{e.addEventListener(`click`,()=>g(t))}),e.querySelectorAll(`.cf-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.indexOf(Number(e.dataset.index));t!==2&&(t>2?m():h())})}),e.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&h(),e.key===`ArrowRight`&&m()}),l(!0);let _=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.1});e.querySelectorAll(`.how-step`).forEach(e=>_.observe(e))}function p(){if(document.getElementById(`landing-styles`))return;let e=document.createElement(`style`);e.id=`landing-styles`,e.textContent=`
    /* ── Hero ── */
    .hero {
      min-height: calc(100vh - var(--nav-height));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: var(--space-xl);
      padding-bottom: 100px;
    }

    .hero__content {
      text-align: center;
      max-width: 700px;
    }

    .hero__brand {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-primary);
      margin-bottom: var(--space-sm);
      animation: fadeIn 0.8s var(--ease-out) 0.1s both;
    }

    .hero__title {
      font-size: var(--text-hero);
      font-weight: 600;
      line-height: 1.1;
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.8s var(--ease-out) 0.3s both;
    }

    .hero__title-line { display: block; }

    .hero__title-accent {
      color: var(--accent);
      font-style: italic;
    }

    .hero__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: 1.6;
      animation: fadeIn 0.8s var(--ease-out) 0.5s both;
    }

    .hero__scroll-hint {
      position: absolute;
      bottom: var(--space-xl);
      left: 0; right: 0;
      width: fit-content;
      margin: 0 auto;
      animation: float 3s ease-in-out infinite, fadeIn 1s var(--ease-out) 1.2s both;
      cursor: pointer;
    }

    .hero__discover-ring {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px 28px;
      transition: opacity var(--transition-base);
    }

    .hero__discover-ring:hover { opacity: 0.65; }

    .hero__discover-label {
      font-size: var(--text-base);
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-transform: uppercase;
    }

    .hero__discover-ring svg { color: var(--accent); }

    /* ── Name Origin ── */
    .landing-origin { padding: var(--space-3xl) 0 var(--space-2xl); }

    .origin-block {
      max-width: 640px;
      margin: 0 auto;
      border-left: 2px solid var(--accent);
      padding-left: var(--space-xl);
    }

    .origin-word {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 600;
      font-style: italic;
      color: var(--accent);
      margin-bottom: var(--space-md);
    }

    .origin-definition {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.75;
    }

    .origin-definition em {
      color: var(--text-primary);
      font-style: italic;
    }

    /* ── Collection showcase ── */
    .landing-regions { padding: var(--space-3xl) 0; }

    .cf-showcase {
      display: grid;
      grid-template-columns: 58% 42%;
      height: 580px;
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 var(--space-lg);
    }

    /* ── Visual carousel ── */
    .cf-visual {
      position: relative;
      height: 520px;
      flex-shrink: 0;
    }

    .cf-stage {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .cf-card {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 340px;
      height: 420px;
      cursor: pointer;
      transition: transform 0.55s cubic-bezier(0.16,1,0.3,1),
                  opacity  0.55s cubic-bezier(0.16,1,0.3,1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .cf-card__img {
      width: 50%;
      height: 360px;
      object-fit: contain;
      object-position: bottom;
      pointer-events: none;
      user-select: none;
      display: block;
    }

    /* Nav buttons */
    .cf-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(20, 20, 20, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      box-shadow: var(--shadow-sm);
    }

    .cf-nav:hover {
      border-color: var(--accent);
      color: var(--accent);
      box-shadow: var(--shadow-gold);
    }

    .cf-nav--prev { left: 16px; }
    .cf-nav--next { right: 16px; }

    /* Dots */
    .cf-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }

    .cf-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      cursor: pointer;
      transition: all var(--transition-base);
      padding: 0;
    }

    .cf-dot.active {
      background: var(--rc);
      transform: scale(1.35);
    }

    /* ── Info panel ── */
    .cf-info {
      display: flex;
      align-items: center;
      padding: var(--space-2xl) var(--space-2xl) var(--space-2xl) var(--space-3xl);
    }

    .cf-info__inner {
      width: 100%;
    }

    .cf-info__label {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }

    .cf-info__name {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 500;
      line-height: 1.1;
      color: var(--text-primary);
      margin-bottom: var(--space-sm);
    }


    .cf-info__desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.75;
      max-width: 380px;
      margin-bottom: var(--space-lg);
    }

    .cf-info__divider {
      height: 1px;
      background: linear-gradient(90deg, var(--rc), transparent);
      opacity: 0.35;
      margin-bottom: var(--space-lg);
    }

    .cf-info__notes-block {
      margin-bottom: var(--space-md);
    }

    .cf-info__notes-type {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-tertiary);
      margin-bottom: var(--space-sm);
    }

    .cf-info__notes-cols {
      display: flex;
      gap: var(--space-xl);
    }

    .cf-info__note-col { flex: 1; }

    .cf-info__note-heading {
      font-size: var(--text-xs);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      margin-bottom: 4px;
    }

    .cf-info__note-vals {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .cf-info__cta {
      margin-top: var(--space-xl);
    }

    /* ── How It Works ── */
    .landing-how { padding: var(--space-3xl) 0 var(--space-4xl); }

    .how-steps {
      margin: var(--space-2xl) auto 0;
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      gap: var(--space-3xl);
    }

    .how-step {
      display: flex;
      flex-direction: row;
      gap: var(--space-lg);
      padding: var(--space-xl);
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--transition-slow);
    }

    .how-step.visible { opacity: 1; transform: translateY(0); }

    .how-step__number {
      font-family: var(--font-display);
      font-size: var(--text-4xl);
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      opacity: 0.35;
    }

    .how-step__title { font-size: var(--text-lg); font-weight: 600; }

    .how-step__text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.65;
      width: 250px;
      margin-top: var(--space-lg);
    }

    /* ── Bottom CTA ── */
    .landing-cta { padding: var(--space-2xl) 0 var(--space-4xl); }

    .cta-card {
      background: linear-gradient(135deg, var(--accent-bg), rgba(201,169,110,0.05));
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-xl);
      padding: var(--space-4xl) var(--space-2xl);
      width: min(100%, 760px);
      margin: 0 auto;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .cf-showcase { grid-template-columns: 1fr; height: auto; }
      .cf-visual { height: 420px; }
      .cf-info { padding: var(--space-xl); }
      .how-steps { grid-template-columns: 1fr; }
      .hero__title { font-size: 2.2rem; }
    }
  `,document.head.appendChild(e)}var m=`/mon_accord/assets/aromatic-CmpTH1Ki.png`,h=`/mon_accord/assets/citrus-CUxOPFui.png`,g=`/mon_accord/assets/floral-4tgVvd3d.png`,_=`/mon_accord/assets/fresh-BHcNl6ul.png`,v=`/mon_accord/assets/gourmand-DmKdC6Sb.png`,y=`/mon_accord/assets/green-C3YolgwO.png`,b=`/mon_accord/assets/musky-bxHISrED.png`,x=`/mon_accord/assets/oriental-D2UnWmBQ.png`,S=`/mon_accord/assets/spicy-BJsI8kVS.png`,ee=`/mon_accord/assets/woody-DpWZUNXq.png`,C=`https://mon-accord-ai.alpgiraykacira.workers.dev`,te=`b779d4d71581850227941ec6f62abdb1b9060ca364e361c49355d25395ba9437`,w=`https://generativelanguage.googleapis.com/v1beta/models`,ne=`gemini-3.1-flash-lite`,T=6e3,re=`You are Mon Accord's AI Perfume Advisor — a world-class fragrance expert specializing in scent layering and olfactory profiling.

You work with Mon Accord's exclusive collection of 12 perfumes from 6 world regions:
- Scandinavian (Spray & Oil): Pine, moss, ice, white tea, birch, cedar
- East Asia (Spray & Oil): Sakura, green tea, bamboo, shiso, hinoki, rice
- South Africa (Spray & Oil): Rooibos, fynbos, earth, vanilla, coffee
- Mediterranean (Spray & Oil): Lemon, bergamot, orange blossom, fig, olive blossom, lavender
- South America (Spray & Oil): Tonka, cocoa, vetiver, tropical green, palo santo
- Middle East (Spray & Oil): Oud, rose, saffron, musk, frankincense

Key knowledge:
- Sprays project more (higher sillage) but less longevity. Oils are intimate but last longer.
- Layering = combining multiple sprays and oils. Oil goes on pulse points first, spray over.
- Amounts are in "sprays" for spray format and "drops" for oil format.
- A formula is a list of perfumes with their amounts (e.g., "2 sprays Mediterranean + 3 drops Middle East Oil").

Your tone: Sophisticated, warm, poetic but precise. Like a knowledgeable friend at a luxury fragrance house.
Always respond in English.
When describing scents, be vivid and sensory — help the user "smell" through words.
Keep responses concise but rich. Use fragrance terminology naturally.`,ie=(e,t=400)=>({contents:[{parts:[{text:e.slice(0,T)}]}],systemInstruction:{parts:[{text:re}]},generationConfig:{maxOutputTokens:t,temperature:.7,candidateCount:1,thinkingConfig:{thinkingBudget:0}}});function E(e,t){return t===429||e.includes(`429`)||e.includes(`quota`)||e.includes(`RESOURCE_EXHAUSTED`)?`rate-limit`:t===401||t===403||e.includes(`API_KEY`)||e.includes(`API key`)?`invalid-key`:e.includes(`fetch`)||e.includes(`network`)||e.includes(`Failed to fetch`)?`network`:`unknown`}function D(e,t){switch(e){case`rate-limit`:return`Rate limit reached. Please wait ${t||30} seconds and try again.`;case`invalid-key`:return`Service key is invalid. Please contact the site owner.`;case`network`:return`Network error. Please check your connection and try again.`;default:return`Request failed. Please try again.`}}async function O(e,n){let r=ie(e,n);{let e={"Content-Type":`application/json`};e[`X-Worker-Token`]=te;let t=await fetch(C,{method:`POST`,headers:e,body:JSON.stringify(r)}),n=await t.json();if(!t.ok){let e=n?.error?.message||`HTTP ${t.status}`;throw Object.assign(Error(e),{status:t.status})}return n}let i=t.getApiKey();if(!i)throw Object.assign(Error(`no-api-key`),{status:0});let a=await fetch(`${w}/${ne}:generateContent?key=${i}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(r)}),o=await a.json();if(!a.ok){let e=o?.error?.message||`HTTP ${a.status}`;throw Object.assign(Error(e),{status:a.status})}return o}async function k(e,t=2,n){try{let t=await O(e,n),r=t?.candidates?.[0]?.content?.parts?.[0]?.text;return r?{success:!0,text:r}:(console.error(`Empty Gemini response`,t),{success:!1,error:`empty-response`,text:`No response received. Please try again.`})}catch(r){let i=r.message||String(r),a=r.status??0;if(console.error(`AI error:`,i),i===`no-api-key`)return{success:!1,error:`no-api-key`,text:`This feature is not available. Please contact the site owner.`};let o=E(i,a);if(o===`rate-limit`&&t>0){let r=i.match(/retry[^0-9]*(\d+)/i),a=r?parseInt(r[1]):30;return console.log(`Rate limited. Waiting ${a}s… (${t} retries left)`),await new Promise(e=>setTimeout(e,(a+2)*1e3)),k(e,t-1,n)}let s=i.match(/retry[^0-9]*(\d+)/i);return{success:!1,error:o,text:D(o,s?parseInt(s[1]):void 0)}}}function A(){return!0}async function j(e){let n=await k(ae(e),2,700);if(n.success){let r=oe(n.text,e);return t.setProfile(r),t.addInteraction({type:`profile-created`,profile:r.archetype}),{success:!0,profile:r}}return{success:!1,error:n.text}}function ae(e){let t=e.scentFamilies?.join(`, `)||`not specified`,n=(e.knownPerfumes||[]).map(e=>{let t=o.find(t=>t.id===e);return t?`${t.brand} ${t.name} (${t.family})`:e}).join(`, `)||`none selected`,r=e.interestedRegions?.join(`, `)||`all regions`;return`Analyze this user's fragrance preferences and create their olfactory profile.

USER QUIZ ANSWERS:
- Preferred scent families: ${t}
- Perfumes they currently wear/enjoy: ${n}
- Sillage preference (1-10): ${e.sillage||5}
- Longevity preference (1-10): ${e.longevity||5}
- Intensity preference (1-10): ${e.intensity||5}
- Interested regions: ${r}
- Daily context: ${e.context||`versatile`}
- Additional notes: ${e.notes||`none`}

Please respond in EXACTLY this JSON format (no markdown, no code blocks, just pure JSON):
{
  "archetype": "one of: warm-oriental, fresh-aquatic, floral-romantic, woody-earthy, citrus-bright, gourmand-cozy",
  "archetypeName": "human-readable name",
  "description": "A 2-3 sentence poetic description of their scent identity",
  "primaryFamilies": ["top 2-3 scent families"],
  "sillageProfile": "low/medium/high",
  "notePreferences": {
    "loves": ["3-5 note types they'd love"],
    "explore": ["2-3 notes to explore"],
    "avoid": ["1-2 notes to avoid"]
  },
  "recommendedRegions": ["top 2-3 Mon Accord regions for them"],
  "signatureBlend": {
    "description": "A vivid sensory description of their ideal scent",
    "layers": [
      {"perfumeId": "id from our collection", "amount": 2, "unit": "sprays or drops"}
    ]
  }
}`}function oe(e,t){try{let n=e.trim();return n.startsWith("```")&&(n=n.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``)),{...JSON.parse(n),createdAt:Date.now(),quizAnswers:t}}catch(e){return console.error(`Failed to parse profile JSON:`,e),se(t)}}function se(e){let t=e.scentFamilies||[`woody`],n=`woody-earthy`;t.includes(`oriental`)||t.includes(`spicy`)?n=`warm-oriental`:t.includes(`fresh`)||t.includes(`citrus`)?n=`fresh-aquatic`:t.includes(`floral`)?n=`floral-romantic`:t.includes(`gourmand`)&&(n=`gourmand-cozy`);let r=c.find(e=>e.id===n)||c[0];return{archetype:n,archetypeName:r.name,description:r.description,primaryFamilies:t.slice(0,3),sillageProfile:e.sillage>7?`high`:e.sillage>4?`medium`:`low`,notePreferences:{loves:[],explore:[],avoid:[]},recommendedRegions:e.interestedRegions||[`mediterranean`,`eastasia`],signatureBlend:null,createdAt:Date.now(),quizAnswers:e}}async function ce(e){return await k(`You are simulating the scent experience of this fragrance combination. Describe what the wearer would smell in three temporal phases.

FORMULA:
${e.map(e=>{let t=i.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} of ${t.name} (Top: ${t.topNotes.join(`, `)}; Mid: ${t.middleNotes.join(`, `)}; Base: ${t.baseNotes.join(`, `)})`:``}).filter(Boolean).join(`
`)}

Respond using exactly this format — three sections, nothing more:

OPENING (first 15 min): [1-2 sentences on the initial burst]
HEART (30 min – 2 hrs): [1-2 sentences on the mid-stage development]
DRY DOWN (2+ hrs): [1-2 sentences on the lasting base]

Be poetic but concise. One vivid idea per section. No extra headings or commentary.`,2,300)}var le=Object.fromEntries([`fresh`,`floral`,`woody`,`oriental`,`citrus`,`gourmand`,`green`,`aromatic`,`spicy`,`musky`].map(e=>[e,new URL(Object.assign({"../assets/quiz_scent_families_v2/aromatic.png":m,"../assets/quiz_scent_families_v2/citrus.png":h,"../assets/quiz_scent_families_v2/floral.png":g,"../assets/quiz_scent_families_v2/fresh.png":_,"../assets/quiz_scent_families_v2/gourmand.png":v,"../assets/quiz_scent_families_v2/green.png":y,"../assets/quiz_scent_families_v2/musky.png":b,"../assets/quiz_scent_families_v2/oriental.png":x,"../assets/quiz_scent_families_v2/spicy.png":S,"../assets/quiz_scent_families_v2/woody.png":ee})[`../assets/quiz_scent_families_v2/${e}.png`],import.meta.url).href])),ue={elegant:new URL(`/mon_accord/assets/elegant_classic-BWma7RUf.webp`,``+import.meta.url).href,adventurous:new URL(`/mon_accord/assets/adventurous_bold-B8qkq39y.webp`,``+import.meta.url).href,romantic:new URL(`/mon_accord/assets/romantic_dreamy-DfjnsaQk.webp`,``+import.meta.url).href,minimalist:new URL(`/mon_accord/assets/minimalist_clean-DxYPWAc5.webp`,``+import.meta.url).href,creative:new URL(`/mon_accord/assets/creative_expressive-KLFTMH5o.webp`,``+import.meta.url).href,confident:new URL(`/mon_accord/assets/confident_powerful-9p8Y7K6Y.webp`,``+import.meta.url).href},M=5;function de(e,n){let r=t.getProfile();if(r&&!window.__retakeQuiz){ye(e,r,n);return}window.__retakeQuiz=!1;let i=t.getQuizState(),a=i?.step||1,o=i?.answers||{username:``,scentFamilies:[],knownPerfumes:[],sillage:5,longevity:5,intensity:5,personality:``,notes:``};function s(){t.setQuizState({step:a,answers:o}),e.innerHTML=`
      <div class="page__container">
        <div class="quiz-container">
          <div class="quiz-stepper">
            ${Array.from({length:M},(e,t)=>{let n=t+1,r=n<a?`completed`:n===a?`active`:``,i=n<a?`done`:``;return`<div class="quiz-stepper__item ${r}"><div class="quiz-stepper__circle">${n<a?`✓`:String(n)}</div></div>${t<M-1?`<div class="quiz-stepper__line ${i}"></div>`:``}`}).join(``)}
          </div>
          <div class="quiz-content" id="quiz-step-content">
            ${fe(a,o)}
          </div>
          <div class="quiz-actions">
            ${a>1?`<button class="btn btn--ghost" id="quiz-back">← Back</button>`:`<div></div>`}
            ${a<M?`<button class="btn btn--primary" id="quiz-next">Continue →</button>`:`<button class="btn btn--primary" id="quiz-finish">
                  ${A()?`✦ Generate My Profile`:`✦ Generate Profile`}
                </button>`}
          </div>
        </div>
      </div>
    `,be(),me(a,o,e);let r=e.querySelector(`#quiz-back`),i=e.querySelector(`#quiz-next`),c=e.querySelector(`#quiz-finish`);r&&r.addEventListener(`click`,()=>{N(a,o,e),a--,s()}),i&&i.addEventListener(`click`,()=>{N(a,o,e),a++,s()}),c&&c.addEventListener(`click`,async()=>{if(N(a,o,e),!A()){window.showToast(`Please set your Gemini API key in Settings first.`,`error`),window.showSettings();return}c.disabled=!0,c.innerHTML=`<span class="loading-spinner"></span> Generating...`;let r=e.querySelector(`#generation-status`);r||(r=document.createElement(`p`),r.id=`generation-status`,r.style.cssText=`font-size: var(--text-xs); color: var(--text-tertiary); text-align: center; margin-top: var(--space-sm);`,c.parentElement.appendChild(r)),r.textContent=`Analysing your preferences...`;let i=await j(o);i.success?(i.profile.username=o.username||`Anonymous`,t.setProfile(i.profile),t.clearQuizState(),he(e,i.profile,n),window.showToast(`Your olfactory profile has been created! ✦`)):(c.disabled=!1,c.innerHTML=`✦ Generate My Profile`,r.textContent=``,window.showToast(i.error||`Failed to generate profile.`,`error`))})}s()}function fe(e,t){switch(e){case 1:return`
        <div class="quiz-step-centered">
          <h2 class="quiz-title">Welcome! What should we call you?</h2>
          <p class="quiz-subtitle">This name will appear on your posts and comments in the community.</p>
          <div class="input-group" style="max-width: 480px; margin: 0 auto;">
            <input type="text" class="input" id="quiz-username" placeholder="Enter your username..." value="${t.username||``}" />
          </div>
        </div>
      `;case 2:return`
        <h2 class="quiz-title">Which scent families draw you in?</h2>
        <p class="quiz-subtitle">Select all that resonate with you.</p>
        <div class="quiz-grid quiz-grid--families">
          ${a.map(e=>`
            <div class="quiz-option quiz-option--img-card quiz-option--family-card ${t.scentFamilies.includes(e.id)?`quiz-option--selected`:``}" data-value="${e.id}" id="family-${e.id}">
              <img class="quiz-family-img" src="${le[e.id]}" alt="${e.name}" loading="lazy" decoding="async" />
              <div class="quiz-family-overlay">
                <span class="quiz-family-name">${e.name}</span>
              </div>
            </div>
          `).join(``)}
        </div>
      `;case 3:return`
        <h2 class="quiz-title">Perfumes you know and love</h2>
        <p class="quiz-subtitle">Select any fragrances you've worn or enjoyed.</p>
        <div class="quiz-search-container">
          <input type="text" class="input quiz-search" id="perfume-search" placeholder="Search by brand or name..." />
        </div>
        <div class="quiz-perfume-list" id="perfume-list">
          ${pe(t.knownPerfumes,``)}
        </div>
        <p class="quiz-hint">Selected: ${t.knownPerfumes.length} perfume${t.knownPerfumes.length===1?``:`s`}</p>
      `;case 4:return`
        <div class="quiz-step-centered">
          <h2 class="quiz-title">Performance Preferences</h2>
          <p class="quiz-subtitle">How do you like your fragrance to behave?</p>
        </div>
        <div class="quiz-sliders">
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Sillage (Projection)</span>
              <span class="slider-value" id="sillage-val">${t.sillage}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${t.sillage}" id="slider-sillage" style="--pct: ${(t.sillage-1)/9*100}%" />
            <div class="slider-labels"><span>Intimate</span><span>Room-filling</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Longevity</span>
              <span class="slider-value" id="longevity-val">${t.longevity}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${t.longevity}" id="slider-longevity" style="--pct: ${(t.longevity-1)/9*100}%" />
            <div class="slider-labels"><span>Few hours</span><span>All day</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Intensity</span>
              <span class="slider-value" id="intensity-val">${t.intensity}/10</span>
            </div>
            <input type="range" class="slider-range" min="1" max="10" value="${t.intensity}" id="slider-intensity" style="--pct: ${(t.intensity-1)/9*100}%" />
            <div class="slider-labels"><span>Subtle</span><span>Bold</span></div>
          </div>
        </div>
      `;case 5:return`
        <h2 class="quiz-title">What describes you best?</h2>
        <p class="quiz-subtitle">Choose the personality trait that resonates most with your style.</p>
        <div class="quiz-grid quiz-grid--context">
          ${[{id:`elegant`,name:`Elegant & Classic`,desc:`Timeless sophistication`},{id:`adventurous`,name:`Adventurous & Bold`,desc:`Love discovering the new`},{id:`romantic`,name:`Romantic & Dreamy`,desc:`Soft, poetic, emotional`},{id:`minimalist`,name:`Minimalist & Clean`,desc:`Less is more`},{id:`creative`,name:`Creative & Expressive`,desc:`Unique, unconventional`},{id:`confident`,name:`Confident & Powerful`,desc:`Commands attention`}].map(e=>`
            <div class="quiz-option quiz-option--img-card ${t.personality===e.id?`quiz-option--selected`:``}" data-value="${e.id}" id="ctx-${e.id}">
              <img class="quiz-option__img" src="${ue[e.id]}" alt="${e.name}" loading="lazy" decoding="async" />
            </div>
          `).join(``)}
        </div>
        <div class="input-group mt-lg">
          <label class="input-label">Any additional notes? (optional)</label>
          <textarea class="input" id="quiz-notes" placeholder="E.g., I love the smell of rain, old books, or fresh coffee...">${t.notes||``}</textarea>
        </div>
      `}}function pe(e,t){let n=t?o.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.brand.toLowerCase().includes(t.toLowerCase())):o,r={};return n.forEach(e=>{r[e.brand]||(r[e.brand]=[]),r[e.brand].push(e)}),Object.entries(r).map(([t,n])=>`
    <div class="perfume-brand-group">
      <p class="perfume-brand-label">${t}</p>
      <div class="perfume-brand-items">
        ${n.map(t=>`
          <div class="quiz-option quiz-option--perfume ${e.includes(t.id)?`quiz-option--selected`:``}" data-value="${t.id}">
            <span class="quiz-option__name">${t.name}</span>
            <span class="quiz-option__desc">${t.family}</span>
          </div>
        `).join(``)}
      </div>
    </div>
  `).join(``)}function me(e,t,n){if(e===2&&n.querySelectorAll(`.quiz-grid--families .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.value;t.scentFamilies.includes(n)?(t.scentFamilies=t.scentFamilies.filter(e=>e!==n),e.classList.remove(`quiz-option--selected`)):(t.scentFamilies.push(n),e.classList.add(`quiz-option--selected`))})}),e===3){let e=n.querySelector(`#perfume-search`),r=n.querySelector(`#perfume-list`),i=e=>{r.innerHTML=pe(t.knownPerfumes,e),r.querySelectorAll(`.quiz-option--perfume`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.value;t.knownPerfumes.includes(r)?(t.knownPerfumes=t.knownPerfumes.filter(e=>e!==r),e.classList.remove(`quiz-option--selected`)):(t.knownPerfumes.push(r),e.classList.add(`quiz-option--selected`)),n.querySelector(`.quiz-hint`).textContent=`Selected: ${t.knownPerfumes.length} perfume${t.knownPerfumes.length===1?``:`s`}`})})};e.addEventListener(`input`,e=>i(e.target.value)),i(``)}e===4&&[`sillage`,`longevity`,`intensity`].forEach(e=>{let r=n.querySelector(`#slider-${e}`),i=n.querySelector(`#${e}-val`);r&&r.addEventListener(`input`,()=>{t[e]=parseInt(r.value),i.textContent=`${r.value}/10`,r.style.setProperty(`--pct`,`${(parseInt(r.value)-1)/9*100}%`)})}),e===5&&n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>e.classList.remove(`quiz-option--selected`)),e.classList.add(`quiz-option--selected`),t.personality=e.dataset.value})})}function N(e,t,n){if(e===1){let e=n.querySelector(`#quiz-username`);e&&(t.username=e.value.trim())}if(e===5){let e=n.querySelector(`#quiz-notes`);e&&(t.notes=e.value)}}function he(e,n,r){window.scrollTo({top:0,behavior:`smooth`});let i=_e(n),a=ve(n);e.innerHTML=`
    <div class="page__container">
      <div class="profile-result">
        <div class="profile-hero">
          <p class="profile-hero__label">Your Olfactory Profile</p>
          <h1 class="profile-hero__title">${n.archetypeName||`Your Scent Identity`}</h1>
        </div>

        <div class="profile-summary-card card mt-xl">
          <p class="profile-summary-card__desc">${n.description||`Your unique olfactory archetype has been defined.`}</p>

          <div class="profile-summary-card__divider"></div>

          <div class="profile-summary-card__meta">
            ${n.notePreferences?`
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Note Preferences</p>
              <div class="profile-summary-card__notes">
                <div><span class="note-label note-label--love">♥ Love</span><span class="note-values">${(n.notePreferences.loves||[]).join(`, `)}</span></div>
                <div><span class="note-label note-label--explore">✦ Explore</span><span class="note-values">${(n.notePreferences.explore||[]).join(`, `)}</span></div>
                <div><span class="note-label note-label--avoid">↓ Avoid</span><span class="note-values">${(n.notePreferences.avoid||[]).join(`, `)}</span></div>
              </div>
            </div>`:``}
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Scent Families</p>
              <ul class="profile-families-list">
                ${(n.primaryFamilies||[]).map(e=>`<li>${e}</li>`).join(``)}
              </ul>
              <p class="profile-summary-card__sillage">Sillage — ${n.sillageProfile||`Medium`}</p>
            </div>
          </div>
        </div>

        <!-- Region-Only Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Recommended Combinations — Mon Accord</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Sprays and oils from our 6 world regions, curated for your profile.</p>
          <div class="recommendation-grid">
            ${i.map(e=>ge(e,{showBuyButton:!0})).join(``)}
          </div>
        </div>

        <!-- Mixed Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Extended Combinations — with L'Oréal Luxe</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Combine Mon Accord scents with iconic luxury perfumes.</p>
          <div class="recommendation-grid">
            ${a.map(e=>ge(e)).join(``)}
          </div>
        </div>

        <div class="profile-actions mt-xl text-center">
          <button class="btn btn--primary btn--lg" id="go-to-shop">Shop Now →</button>
          <button class="btn btn--secondary btn--lg" id="go-to-lab">Enter the Lab</button>
          <button class="btn btn--ghost" id="retake-quiz">Retake Quiz</button>
        </div>
      </div>
    </div>
  `,be(),e.querySelector(`#go-to-shop`).addEventListener(`click`,()=>r(`#shop`)),e.querySelectorAll(`[data-buy-combo]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.comboIds.split(`,`).map(e=>e.trim()).filter(Boolean);t.setPendingShopCart(n),r(`#shop`)})}),e.querySelector(`#go-to-lab`).addEventListener(`click`,()=>r(`#lab`)),e.querySelector(`#retake-quiz`).addEventListener(`click`,()=>{window.__retakeQuiz=!0,t.clearQuizState(),de(e,r)})}function ge(e,t={}){let n=(e.productIds||[]).join(`,`);return`
    <div class="combo-card card">
      <h4 class="combo-card__name">${e.name}</h4>
      <div class="combo-card__layers">
        ${e.layers.map(e=>{let t=e.regionData;return`<p style="font-size: var(--text-sm); margin-bottom: 2px;">
            <span style="color: ${t?.color||`var(--accent)`};">${t?.icon||`•`}</span>
            ${e.amount} ${e.unit} — <strong>${e.name}</strong>
          </p>`}).join(``)}
      </div>
      ${t.showBuyButton&&e.productIds?.length?`
        <button class="btn btn--primary combo-card__buy" data-buy-combo="true" data-combo-ids="${n}">
          Buy this combination
        </button>
      `:``}
    </div>
  `}function _e(e){let n=t.getOwnedPerfumes().monAccord||[];function a(e,t){let n=l(e);if(!n)return null;let i=r.find(e=>e.id===n.region);return{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:i}}let o=n.filter(e=>l(e)?.format===`spray`),s=n.filter(e=>l(e)?.format===`oil`),c=(e,t=[])=>i.find(n=>n.format===e&&!t.includes(n.id)),u=o[0]||c(`spray`,[])?.id||`scandinavian-spray`,d=o[1]||c(`spray`,[u])?.id||`mediterranean-spray`,f=o[2]||c(`spray`,[u,d])?.id||`middleeast-spray`,p=s[0]||c(`oil`,[])?.id||`eastasia-oil`,m=s[1]||c(`oil`,[p])?.id||`southafrica-oil`;return[{name:`Morning Clarity`,description:n.length?`Built around your ${l(u)?.name||`collection`} — crisp and bright for daytime.`:`A crisp, bright opening with spray-forward projection, anchored by a subtle oil base.`,layers:[a(u,3),a(d,2),a(p,1)].filter(Boolean)},{name:`Golden Evening`,description:n.length?`Your ${l(f)?.name||`spray`} takes centre stage in this warm evening blend.`:`A warm, opulent blend of spray richness over deep oil.`,layers:[a(f,3),a(m,2),a(d,1)].filter(Boolean)},{name:`Signature Blend`,description:n.length?`A layering of your owned collection that showcases your personal scent identity.`:`A balanced blend drawing from multiple regions.`,layers:[a(u,2),a(f,2),a(p,1)].filter(Boolean)}].map(e=>({...e,productIds:[...new Set(e.layers.map(e=>e.id).filter(Boolean))]}))}function ve(e){let n=t.getOwnedPerfumes(),a=n.loreal||[],s=n.monAccord||[];function c(e,t){let n=l(e);return n?{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:r.find(e=>e.id===n.region)}:null}function u(e,t){let n=o.find(t=>t.id===e);return n?{name:`${n.brand} ${n.name}`,amount:t,unit:`sprays`,regionData:{icon:`✦`,color:`var(--accent)`}}:null}let d=a.length?a:[`ysl-libre`,`ysl-black-opium`,`armani-my-way`],f=s.length?s:[`scandinavian-spray`,`southafrica-spray`,`mediterranean-spray`,`eastasia-oil`,`southamerica-oil`,`middleeast-oil`],p=(e,t=[])=>i.find(n=>n.format===e&&!t.includes(n.id))?.id,m=d[0]||`ysl-libre`,h=d[1]||`ysl-black-opium`,g=d[2]||`armani-my-way`,_=f.find(e=>l(e)?.format===`spray`)||p(`spray`),v=f.filter(e=>l(e)?.format===`spray`)[1]||p(`spray`,[_]),y=f.find(e=>l(e)?.format===`oil`)||p(`oil`),b=o.find(e=>e.id===m),x=o.find(e=>e.id===h),S=o.find(e=>e.id===g);return[{name:b?`${b.name} Accord`:`Libre Accord`,description:b?`Your ${b.brand} ${b.name} elevated with Mon Accord layering.`:`YSL Libre layered with Scandinavian freshness for a modern twist.`,layers:[u(m,2),c(_,2),c(y,1)].filter(Boolean)},{name:x?`${x.name} Fusion`:`Velvet Opium`,description:x?`${x.brand} ${x.name} deepened with Mon Accord warmth.`:`Black Opium's coffee-vanilla paired with depth and warmth.`,layers:[u(h,2),c(v||_,2),c(y,1)].filter(Boolean)},{name:S?`${S.name} Journey`:`Mediterranean Way`,description:S?`${S.brand} ${S.name} blended with complementary Mon Accord scents.`:`Armani My Way paired with Mediterranean sunshine.`,layers:[u(g,2),c(_,2),c(y,1)].filter(Boolean)}]}function ye(e,t,n){he(e,t,n)}function be(){if(document.getElementById(`quiz-styles`))return;if(!document.getElementById(`quiz-fonts`)){let e=document.createElement(`link`);e.id=`quiz-fonts`,e.rel=`stylesheet`,e.href=`https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Cormorant+Garamond:ital,wght@1,700&family=Merriweather:wght@700&family=Cinzel:wght@700&family=Pacifico&family=Nunito:wght@800&family=Josefin+Sans:wght@700&family=EB+Garamond:wght@700&family=Bebas+Neue&family=Playfair+Display:wght@700&display=swap`,document.head.appendChild(e)}let e=document.createElement(`style`);e.id=`quiz-styles`,e.textContent=`
    /* ── Quiz layout ── */
    .quiz-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: var(--space-3xl) var(--space-2xl);
    }

    /* ── Step indicator ── */
    .quiz-stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-3xl);
    }

    .quiz-stepper__item {
      display: flex;
      align-items: center;
    }

    .quiz-stepper__circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--text-tertiary);
      background: var(--surface);
      transition: all var(--transition-base);
      position: relative;
      z-index: 1;
      flex-shrink: 0;
    }

    .quiz-stepper__item.active .quiz-stepper__circle {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
      box-shadow: 0 0 0 5px rgba(200,169,126,0.15);
    }

    .quiz-stepper__item.completed .quiz-stepper__circle {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent);
    }

    .quiz-stepper__line {
      width: 56px;
      height: 2px;
      background: var(--border);
      transition: background var(--transition-base);
    }

    .quiz-stepper__line.done {
      background: linear-gradient(90deg, var(--accent), rgba(200,169,126,0.3));
    }

    /* ── Step content animation ── */
    .quiz-content {
      animation: quizStepIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes quizStepIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Titles ── */
    .quiz-title {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 500;
      margin-bottom: var(--space-sm);
      line-height: 1.2;
    }

    .quiz-subtitle {
      font-size: var(--text-base);
      color: var(--text-secondary);
      margin-bottom: var(--space-xl);
      line-height: 1.6;
    }

    .quiz-step-centered { text-align: center; padding: var(--space-2xl) 0; }

    /* ── Option grids ── */
    .quiz-grid { display: grid; gap: var(--space-md); }
    .quiz-grid--families,
    .quiz-grid--context {
      gap: 3px;
      overflow: hidden;
      border-radius: 0;
      -webkit-mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      -webkit-mask-composite: destination-in;
      mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      mask-composite: intersect;
    }
    .quiz-grid--families { grid-template-columns: repeat(5, 1fr); }
    .quiz-grid--context  { grid-template-columns: repeat(3, 1fr); }

    .quiz-option {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl) var(--space-md);
      cursor: pointer;
      transition: border-color var(--transition-fast), background var(--transition-fast),
                  transform var(--transition-fast), box-shadow var(--transition-fast);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      min-height: 130px;
    }

    .quiz-option:hover {
      border-color: var(--accent-light);
      background: var(--accent-bg);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .quiz-option--selected {
      border-color: var(--accent);
      background: var(--accent-bg);
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .quiz-option__icon { font-size: 2.2rem; line-height: 1; display: block; }
    .quiz-option__name { font-weight: 600; font-size: var(--text-sm); color: var(--text-primary); display: block; }
    .quiz-option__desc { font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.4; display: block; }

    .quiz-option--img-card {
      padding: 0;
      overflow: hidden;
      gap: 0;
      justify-content: flex-start;
      min-height: unset;
      border: none;
      border-radius: 0;
      position: relative;
      transform: none;
    }

    .quiz-option--img-card:hover { transform: none; box-shadow: none; background: transparent; border-color: transparent; }

    .quiz-option__img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
      flex-shrink: 0;
      transition: transform 0.35s ease, filter 0.25s ease;
      filter: brightness(0.65);
      -webkit-mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      -webkit-mask-composite: destination-in;
      mask-image:
        linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%);
      mask-composite: intersect;
    }

    .quiz-option--img-card:hover .quiz-option__img {
      transform: scale(1.05);
      filter: brightness(0.85);
    }

    .quiz-option--img-card.quiz-option--selected .quiz-option__img {
      transform: scale(1.05);
      filter: brightness(1);
    }

    .quiz-option--img-card.quiz-option--selected::after {
      content: '✓';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 26px;
      height: 26px;
      background: var(--accent);
      color: #fff;
      border-radius: 50%;
      font-size: 13px;
      font-weight: 700;
      line-height: 26px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    /* ── Scent family PNG cards ── */
    .quiz-option--family-card {
      background: transparent;
      height: 220px;
      align-items: center;
      justify-content: center;
    }

    .quiz-option--family-card.quiz-option--selected {
      border: none;
      box-shadow: none;
      background: transparent;
      transform: none;
    }

    .quiz-family-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .quiz-family-overlay {
      position: relative;
      z-index: 1;
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .quiz-family-name {
      font-size: var(--text-2xl);
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-style: italic;
      color: #fff;
      letter-spacing: 0.08em;
      line-height: 1.2;
      text-transform: uppercase;
      text-shadow: 0 1px 6px rgba(0,0,0,0.6);
    }

    /* ── Actions ── */
    .quiz-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--space-2xl);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border);
    }

    /* ── Sliders ── */
    .quiz-sliders {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
      max-width: 560px;
      margin: 0 auto;
    }

    .slider-container { display: flex; flex-direction: column; }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
    }

    .slider-label { font-size: var(--text-base); font-weight: 600; }
    .slider-value { font-size: var(--text-sm); font-weight: 700; color: var(--accent); min-width: 40px; text-align: right; }

    input[type="range"].slider-range {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(90deg, var(--accent) var(--pct, 50%), var(--bg-tertiary) var(--pct, 50%));
      outline: none;
      cursor: pointer;
    }

    input[type="range"].slider-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent);
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(200,169,126,0.45);
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    input[type="range"].slider-range::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 14px rgba(200,169,126,0.65);
    }

    input[type="range"].slider-range::-moz-range-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--accent);
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(200,169,126,0.45);
      cursor: pointer;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      margin-top: var(--space-sm);
    }

    /* ── Perfume list ── */
    .quiz-search-container { margin-bottom: var(--space-md); }
    .quiz-search { width: 100%; }
    .quiz-perfume-list {
      overflow-y: auto;
      max-height: calc(100vh - 380px);
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--surface);
    }
    .perfume-brand-group { position: relative; }
    .perfume-brand-label {
      position: sticky; top: 0; z-index: 2;
      font-size: var(--text-sm); font-weight: 700;
      color: var(--text-primary); background: var(--bg-secondary);
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border);
      letter-spacing: 0.01em;
    }
    .perfume-brand-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
    }
    .quiz-option--perfume {
      text-align: left;
      padding: var(--space-sm) var(--space-md);
      min-height: unset;
      flex-direction: row;
      justify-content: flex-start;
      gap: var(--space-sm);
    }
    .quiz-hint { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-sm); }

    /* ── Profile result ── */
    .profile-result { margin: 0 auto; }

    .profile-hero { text-align: center; padding: var(--space-2xl) 0 var(--space-lg); }
    .profile-hero__label {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }
    .profile-hero__title {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 500;
      line-height: 1.1;
      color: var(--text-primary);
      margin: 0;
    }

    .profile-summary-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }
    .profile-summary-card__desc {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }
    .profile-summary-card__divider {
      height: 1px;
      background: var(--border);
    }
    .profile-summary-card__meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-lg);
    }
    .profile-summary-card__heading {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      margin-bottom: var(--space-sm);
    }
    .profile-families-list {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-sm);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .profile-families-list li {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text-primary);
      padding-left: var(--space-md);
      position: relative;
    }
    .profile-families-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }
    .profile-summary-card__sillage {
      font-size: var(--text-xs);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      margin-top: var(--space-xs);
    }
    .profile-summary-card__notes { display: flex; flex-direction: column; gap: 6px; }
    .profile-summary-card__notes > div { display: flex; align-items: baseline; gap: var(--space-sm); }
    .note-label {
      font-size: var(--text-xs);
      font-weight: 700;
      white-space: nowrap;
      min-width: 64px;
    }
    .note-label--love    { color: #4CAF50; }
    .note-label--explore { color: var(--accent); }
    .note-label--avoid   { color: var(--text-tertiary); }
    .note-values { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; }

    .profile-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
    .recommendation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-md); }
    .combo-card { display: flex; flex-direction: column; }
    .combo-card__name { font-size: var(--text-lg); font-family: var(--font-display); margin-bottom: var(--space-md); }
    .combo-card__layers { flex: 1; }
    .combo-card__buy { width: 100%; margin-top: var(--space-md); }

    @media (max-width: 1024px) { .profile-overview { grid-template-columns: 1fr; } }
    @media (max-width: 900px) {
      .quiz-grid--families { grid-template-columns: repeat(2, 1fr); }
      .quiz-grid--context  { grid-template-columns: repeat(2, 1fr); }
      .perfume-brand-items { grid-template-columns: 1fr; }
      .quiz-stepper__line { width: 32px; }
    }
  `,document.head.appendChild(e)}var xe=[{id:`confident`,name:`Confident`,icon:``,description:`Bold and commanding`},{id:`romantic`,name:`Romantic`,icon:``,description:`Soft and alluring`},{id:`calm`,name:`Calm`,icon:``,description:`Peaceful and centered`},{id:`energetic`,name:`Energetic`,icon:``,description:`Vibrant and lively`},{id:`mysterious`,name:`Mysterious`,icon:``,description:`Enigmatic and deep`},{id:`playful`,name:`Playful`,icon:``,description:`Light and fun`}],Se=[{id:`office`,name:`Office / Work`,icon:``},{id:`date-night`,name:`Date Night`,icon:``},{id:`casual`,name:`Casual Outing`,icon:``},{id:`formal`,name:`Formal Event`,icon:``},{id:`outdoor`,name:`Outdoor Adventure`,icon:``},{id:`cozy`,name:`Cozy Night In`,icon:``}],Ce=[{id:`spring`,name:`Spring`,icon:``},{id:`summer`,name:`Summer`,icon:``},{id:`autumn`,name:`Autumn`,icon:``},{id:`winter`,name:`Winter`,icon:``}],P=[{id:`whisper`,name:`Whisper`,value:1,description:`Barely there, intimate`},{id:`soft`,name:`Soft`,value:3,description:`Close range only`},{id:`moderate`,name:`Moderate`,value:5,description:`Noticeable arm's length`},{id:`present`,name:`Present`,value:7,description:`Fills the room gently`},{id:`bold`,name:`Bold`,value:9,description:`Leaves a trail`}];function we(){let e=t.getOwnedPerfumes(),n=[];if(e.monAccord?.length){let t=e.monAccord.map(e=>i.find(t=>t.id===e)?.name).filter(Boolean);t.length&&n.push(`Mon Accord owned: ${t.join(`, `)}`)}if(e.loreal?.length){let t=e.loreal.map(e=>o.find(t=>t.id===e)?.name).filter(Boolean);t.length&&n.push(`L'Oréal Luxe owned: ${t.join(`, `)}`)}return n.length?n.join(`
`):null}async function Te(e){let n=t.getProfile(),r=we(),a=await k(`Based on the user's context, recommend a Mon Accord layering formula.

USER PROFILE: ${n?`Archetype: ${n.archetypeName}, Preferred families: ${n.primaryFamilies?.join(`, `)}, Sillage: ${n.sillageProfile}`:`No profile yet — make a versatile recommendation.`}

${r?`USER'S OWNED PERFUMES (prioritize recommendations that use or complement these):
${r}

`:``}CURRENT CONTEXT:
- Mood: ${e.mood||`not specified`}
- Occasion: ${e.occasion||`not specified`}
- Season: ${e.season||`not specified`}
- Time of day: ${e.timeOfDay||`not specified`}
- Desired intensity: ${e.intensity||`moderate`}

Available perfumes (use exact IDs):
${i.map(e=>`- ${e.id}: ${e.name} (${e.scentFamily}, sillage: ${e.sillage}/10)`).join(`
`)}

Respond in EXACTLY this JSON format (no markdown, no code blocks):
{
  "formulaName": "creative name for this blend",
  "layers": [
    {"perfumeId": "exact-id", "amount": 2, "unit": "sprays or drops"}
  ],
  "reasoning": "2-3 sentences explaining why this blend works for the given context",
  "scentPreview": "A vivid 2-sentence sensory description of what this will smell like",
  "tips": "One practical application tip"
}`,2,400);if(a.success)try{let n=a.text.trim();n.startsWith("```")&&(n=n.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let r=JSON.parse(n);return t.addInteraction({type:`contextual-recommendation`,context:e,recommendation:r.formulaName}),{success:!0,recommendation:r}}catch(e){return console.error(`Failed to parse recommendation:`,e),{success:!0,recommendation:{formulaName:`Your Recommendation`,layers:[],reasoning:a.text,scentPreview:``,tips:``}}}return{success:!1,error:a.text}}function Ee(e,n={}){let{showNameInput:r=!0,onSaved:i}=n,a=t.get(`vault_folders`,[{id:`default`,name:`All Formulas`,icon:``}]),o=`default`,s=!1;function c(){let n=document.getElementById(`save-vault-overlay`);n&&n.remove();let l=document.createElement(`div`);l.className=`modal-overlay`,l.id=`save-vault-overlay`,l.innerHTML=`
      <div class="modal" style="max-width: 480px;">
        <div class="modal__header">
          <h3 class="modal__title">Save to Vault</h3>
          <button class="modal__close" id="sv-close">✕</button>
        </div>
        <div class="modal__body">
          ${r?`
            <div class="input-group sv-group">
              <label class="input-label">Formula Name</label>
              <input type="text" class="input" id="sv-name" placeholder="Give your creation a name..." value="${e.name||``}" />
            </div>
          `:``}

          <div class="input-group sv-group">
            <label class="input-label">Choose Folder</label>
            <div class="sv-folder-select-wrap">
              <select class="input sv-folder-select" id="sv-folder-dropdown">
                ${a.map(e=>`
                  <option value="${e.id}" ${e.id===o?`selected`:``}>
                    ${e.icon||`📁`} ${e.name}
                  </option>
                `).join(``)}
              </select>
              <button class="btn btn--ghost btn--sm sv-new-folder-toggle" id="sv-toggle-new" title="New folder">
                + New
              </button>
            </div>
          </div>

          ${s?`
            <div class="sv-new-folder-form">
              <div class="sv-new-folder-row">
                <input type="text" class="input" id="sv-new-folder-name" placeholder="New folder name..." autofocus />
                <button class="btn btn--primary btn--sm" id="sv-create-folder">Create</button>
                <button class="btn btn--ghost btn--sm" id="sv-cancel-new">✕</button>
              </div>
            </div>
          `:``}

          <div class="sv-preview">
            <p class="sv-preview-label">Layers</p>
            ${(e.layers||[]).map(e=>{let t=e.name||e.perfumeId||`Unknown`;return`<p class="sv-preview-layer">• ${e.amount||``} ${e.unit||``} ${t}</p>`}).join(``)}
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary" id="sv-cancel">Cancel</button>
          <button class="btn btn--primary" id="sv-confirm">Save</button>
        </div>
      </div>
    `,document.body.appendChild(l),De(),l.querySelector(`#sv-close`).onclick=()=>l.remove(),l.querySelector(`#sv-cancel`).onclick=()=>l.remove(),l.onclick=e=>{e.target===l&&l.remove()},l.querySelector(`#sv-folder-dropdown`).onchange=e=>{o=e.target.value},l.querySelector(`#sv-toggle-new`).onclick=()=>{s=!s,c()};let u=l.querySelector(`#sv-create-folder`);u&&(u.onclick=()=>{let e=l.querySelector(`#sv-new-folder-name`).value.trim();if(!e)return;let n={id:`folder-`+Date.now(),name:e,icon:``};a.push(n),t.set(`vault_folders`,a),o=n.id,s=!1,c(),window.showToast(`Folder "${e}" created!`)});let d=l.querySelector(`#sv-cancel-new`);if(d&&(d.onclick=()=>{s=!1,c()}),l.querySelector(`#sv-confirm`).onclick=()=>{let n=l.querySelector(`#sv-name`),r=(n?n.value.trim():e.name)||`Blend ${Date.now().toString(36).slice(-4)}`,s={...e,id:e.id||`f-`+Date.now(),name:r,folderId:o===`default`?void 0:o,savedAt:Date.now()};t.saveFormula(s),l.remove();let c=a.find(e=>e.id===o)?.name||`Vault`;window.showToast(`"${r}" saved to ${c}!`),i&&i(s)},r){let e=l.querySelector(`#sv-name`);e&&setTimeout(()=>e.focus(),100)}}c()}function De(){if(document.getElementById(`save-modal-styles`))return;let e=document.createElement(`style`);e.id=`save-modal-styles`,e.textContent=`
    .sv-group { margin-bottom: var(--space-lg); }

    .sv-folder-select-wrap {
      display: flex;
      gap: var(--space-sm);
      align-items: center;
    }

    .sv-folder-select {
      flex: 1;
      appearance: auto;
      cursor: pointer;
    }

    .sv-new-folder-toggle {
      white-space: nowrap;
      font-size: var(--text-xs) !important;
      padding: 6px 12px !important;
    }

    .sv-new-folder-form {
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.2s ease-out;
    }

    .sv-new-folder-row {
      display: flex;
      gap: var(--space-xs);
      align-items: center;
    }

    .sv-new-folder-row .input { flex: 1; }

    .sv-preview {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: var(--space-md);
    }

    .sv-preview-label {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
      margin-bottom: var(--space-xs);
    }

    .sv-preview-layer {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-bottom: 2px;
    }
  `,document.head.appendChild(e)}var Oe={scandinavian:new URL(`/mon_accord/assets/scandinavian-BN4U9Git.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-CIRqjWhL.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-BeRUDnKj.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-v1NGrAPJ.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DEpvED0s.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DE6yO7Qz.webp`,``+import.meta.url).href},ke={scandinavian:new URL(`/mon_accord/assets/scandinavian-DvtLirp4.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-UzXNmAB4.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-PFpjigF9.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-CV0fuGZk.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DyzbduD3.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Bmlf8LlT.webp`,``+import.meta.url).href},Ae={scandinavian:new URL(`/mon_accord/assets/scandinavian-BBoj4W5D.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-D93RVLet.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-hdHFYwXs.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-B_fMAvaC.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DcR51yl4.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DMI8-64c.webp`,``+import.meta.url).href},je=`lab_session_state`;function Me(e){try{sessionStorage.setItem(je,JSON.stringify(e))}catch{}}function Ne(){try{return JSON.parse(sessionStorage.getItem(je)||`null`)}catch{return null}}function Pe(e,t){let n=Ne(),a=n?.layers||[],o=n?.scentSimulation||null,s=!1,c=n?.contextResult||null,u=!1,d=n?.selectedMood||null,f=n?.selectedOccasion||null,p=n?.selectedSeason||null,m=n?.selectedTime||null,h=n?.selectedIntensity||5;function g(){Me({layers:a,scentSimulation:o,contextResult:c,selectedMood:d,selectedOccasion:f,selectedSeason:p,selectedTime:m,selectedIntensity:h})}let _=JSON.parse(sessionStorage.getItem(`labPending`)||`[]`);_.length>0&&(_.forEach(e=>{let t=l(e);t&&!a.find(t=>t.perfumeId===e)&&a.push({perfumeId:e,amount:t.format===`spray`?2:3,unit:t.format===`spray`?`sprays`:`drops`})}),sessionStorage.removeItem(`labPending`),g());function v(){e.innerHTML=`
      <div class="page__container">

        <div class="lab-page-header">
          <p class="lab-page-header__label">The Lab</p>
          <h1 class="lab-page-header__title">Compose Your Signature</h1>
          <p class="lab-page-header__desc">Layer fragrances from six world regions — combine sprays with oils for depth and longevity.</p>
        </div>

        <div class="lab-layout">

          <!-- Col 1: Select Layers + Advisor -->
          <div class="lab-left-col">

            <div class="lab-add-section" id="lab-add-section">
              <p class="lab-section-label">Select Layers</p>
              <div class="lab-perfume-selector">
                ${r.map(e=>{let t=i.find(t=>t.region===e.id&&t.format===`spray`),n=i.find(t=>t.region===e.id&&t.format===`oil`),r=t&&a.find(e=>e.perfumeId===t.id),o=n&&a.find(e=>e.perfumeId===n.id);return`
                    <div class="lab-region-group" style="--region-color: ${e.color};">
                      <p class="lab-region-label">${e.name}</p>
                      <div class="lab-bottle-row">
                        ${t?`
                          <button class="lab-bottle-btn ${r?`lab-bottle-btn--added`:``}" data-id="${t.id}" style="--region-color: ${e.color};" title="${e.name} Spray">
                            <img src="${ke[e.id]}" alt="${e.name} Spray" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">SPRAY</span>
                            ${r?`<div class="lab-bottle-check">✓</div>`:``}
                          </button>`:``}
                        ${n?`
                          <button class="lab-bottle-btn ${o?`lab-bottle-btn--added`:``}" data-id="${n.id}" style="--region-color: ${e.color};" title="${e.name} Oil">
                            <img src="${Ae[e.id]}" alt="${e.name} Oil" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">OIL</span>
                            ${o?`<div class="lab-bottle-check">✓</div>`:``}
                          </button>`:``}
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            </div>

            <div class="lab-advisor">
              <div class="lab-advisor__header">
                <h3 class="lab-advisor__title">✦ Curated for Your Profile</h3>
                <p class="lab-advisor__subtitle">Set the mood and moment — we'll compose a formula aligned with your olfactory identity.</p>
              </div>

              <div class="lab-advisor__form">
                <div class="input-group">
                  <label class="input-label">Mood</label>
                  <div class="lab-advisor__chips" id="mood-chips">
                    ${xe.map(e=>`<button class="lab-chip ${d===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Occasion</label>
                  <div class="lab-advisor__chips" id="occasion-chips">
                    ${Se.map(e=>`<button class="lab-chip ${f===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Season</label>
                  <div class="lab-advisor__chips" id="season-chips">
                    ${Ce.map(e=>`<button class="lab-chip ${p===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Time of Day</label>
                  <div class="lab-advisor__chips" id="time-chips">
                    ${[`Morning`,`Afternoon`,`Evening`,`Night`].map(e=>`<button class="lab-chip ${m===e.toLowerCase()?`lab-chip--active`:``}" data-value="${e.toLowerCase()}">${e}</button>`).join(``)}
                  </div>
                </div>

                <div class="slider-container">
                  <div class="slider-header">
                    <span class="slider-label">Intensity</span>
                    <span class="slider-value" id="advisor-intensity-val">${(P.find(e=>e.value===h)||{}).name||`Moderate`}</span>
                  </div>
                  <input type="range" min="1" max="9" value="${h}" step="2" id="advisor-intensity" />
                </div>

                <button class="btn btn--primary w-full" id="btn-get-advice" ${u?`disabled`:``}>
                  ${u?`<span class="loading-spinner"></span> Crafting...`:`✦ Get Recommendation`}
                </button>
                <button class="btn btn--ghost w-full" id="btn-clear-recommendation">Clear</button>
              </div>

              ${c?`
                <div class="lab-advisor__result mt-lg" id="advisor-result">
                  <div class="ai-response">
                    <div class="ai-response__label">✦ ${c.formulaName||`Your Formula`}</div>
                    <div class="ai-response__text ai-response__text--compact">
                      ${c.reasoning?`<p>${F(c.reasoning,150)}</p>`:``}
                      ${c.scentPreview?`<p><em>${F(c.scentPreview,100)}</em></p>`:``}
                      ${c.tips?`<p style="color: var(--accent); font-size: var(--text-xs);">◈ ${F(c.tips,100)}</p>`:``}
                    </div>
                  </div>
                  ${c.layers?.length>0?`
                    <button class="btn btn--primary w-full mt-md" id="btn-apply-recommendation">✦ Apply This Formula</button>
                  `:``}
                </div>
              `:``}
            </div>

          </div>

          <!-- Col 2: Canvas (sticky) -->
          <div class="lab-canvas">
            <p class="lab-section-label">Your Canvas</p>

            <div class="lab-layers" id="lab-layers">
              ${a.length===0?`
                <div class="lab-empty">
                  <p class="lab-empty__symbol">◈</p>
                  <p class="lab-empty__text">Your canvas is empty</p>
                  <p class="lab-empty__hint">Select fragrances to begin composing your accord.</p>
                </div>
              `:a.map((e,t)=>{let n=l(e.perfumeId),i=r.find(e=>e.id===n.region);return`
                  <div class="lab-layer" data-idx="${t}" style="--region-color: ${i.color};">
                    <div class="lab-layer__bg" style="background-image: url('${Oe[i.id]}')"></div>
                    <div class="lab-layer__content">
                      <div class="lab-layer__header">
                        <div class="lab-layer__identity">
                          <div class="lab-layer__info">
                            <span class="lab-layer__name">${n.name}</span>
                          </div>
                        </div>
                        <button class="lab-layer__remove" data-idx="${t}" title="Remove">✕</button>
                      </div>
                      <span class="lab-layer__notes">${n.topNotes.slice(0,2).join(`, `)} · ${n.baseNotes[0]}</span>
                      <div class="lab-layer__footer">
                        <div class="lab-layer__amount">
                          <button class="lab-layer__amount-btn" data-action="decrease" data-idx="${t}">−</button>
                          <span class="lab-layer__amount-value">${e.amount}</span>
                          <button class="lab-layer__amount-btn" data-action="increase" data-idx="${t}">+</button>
                          <span class="lab-layer__amount-unit">${e.unit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `}).join(``)}
            </div>

            ${a.length>0?`
              <div class="lab-actions" id="lab-actions">
                <button class="btn btn--primary" id="btn-simulate">
                  ${s?`<span class="loading-spinner"></span> Simulating...`:`✦ Simulate Scent`}
                </button>
                <button class="btn btn--secondary" id="btn-save-formula">Save to Vault</button>
                <button class="btn btn--ghost" id="btn-clear-layers">Clear All</button>
              </div>
            `:``}

            ${o?`
              <div class="ai-response mt-lg" id="simulation-result">
                <div class="ai-response__label">✦ Scent Portrait</div>
                <div class="ai-response__text">
                  ${Fe(o)}
                </div>
              </div>
            `:``}
          </div>

        </div>
      </div>
    `,Ie(),y()}function y(){e.querySelectorAll(`.lab-bottle-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id,n=a.findIndex(e=>e.perfumeId===t);if(n>=0)a.splice(n,1);else{let e=l(t);a.push({perfumeId:t,amount:e.format===`spray`?2:3,unit:e.format===`spray`?`sprays`:`drops`})}o=null,g(),v()})}),e.querySelectorAll(`.lab-layer__remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),a.splice(parseInt(e.dataset.idx),1),o=null,g(),v()})}),e.querySelectorAll(`.lab-layer__amount-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.idx);e.dataset.action===`increase`?a[n].amount=Math.min(a[n].amount+1,10):a[n].amount=Math.max(a[n].amount-1,1),g(),v()})});let t=e.querySelector(`#btn-simulate`);t&&t.addEventListener(`click`,async()=>{if(!A()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}s=!0,v();let e=await ce(a);s=!1,e.success?(o=e.text,g(),v(),setTimeout(()=>{let e=document.querySelector(`.lab-canvas`);e&&e.scrollTo({top:e.scrollHeight,behavior:`smooth`})},500)):(window.showToast(e.text||`Simulation failed.`,`error`),v())});let n=e.querySelector(`#btn-save-formula`);n&&n.addEventListener(`click`,()=>{b(a,o)});let r=e.querySelector(`#btn-clear-layers`);r&&r.addEventListener(`click`,()=>{a=[],o=null,g(),v()}),[`mood`,`occasion`,`season`,`time`].forEach(t=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(n=>{n.addEventListener(`click`,()=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(e=>e.classList.remove(`lab-chip--active`)),n.classList.add(`lab-chip--active`);let r=n.dataset.value;t===`mood`?d=r:t===`occasion`?f=r:t===`season`?p=r:t===`time`&&(m=r),g()})})});let i=e.querySelector(`#advisor-intensity`);i&&i.addEventListener(`input`,()=>{h=parseInt(i.value);let t=P.find(e=>e.value===h);e.querySelector(`#advisor-intensity-val`).textContent=t?.name||`Moderate`,g()});let _=e.querySelector(`#btn-get-advice`);_&&_.addEventListener(`click`,async()=>{if(!A()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}let t=e.querySelector(`#mood-chips .lab-chip--active`)?.dataset.value,n=e.querySelector(`#occasion-chips .lab-chip--active`)?.dataset.value,r=e.querySelector(`#season-chips .lab-chip--active`)?.dataset.value,i=e.querySelector(`#time-chips .lab-chip--active`)?.dataset.value,a=P.find(t=>t.value===parseInt(e.querySelector(`#advisor-intensity`)?.value||5))?.name||`moderate`;u=!0,v();let o=await Te({mood:t,occasion:n,season:r,timeOfDay:i,intensity:a});u=!1,o.success?(c=o.recommendation,g(),v(),setTimeout(()=>{let e=document.querySelector(`.lab-canvas`);e&&e.scrollTo({top:e.scrollHeight,behavior:`smooth`})},500)):(window.showToast(o.error||`Advice failed.`,`error`),v())});let y=e.querySelector(`#btn-apply-recommendation`);y&&y.addEventListener(`click`,()=>{c?.layers&&(a=c.layers.map(e=>({perfumeId:e.perfumeId,amount:e.amount,unit:e.unit||(e.perfumeId.includes(`oil`)?`drops`:`sprays`)})).filter(e=>l(e.perfumeId)),o=null,g(),v(),window.showToast(`Formula applied! Try simulating the scent.`))});let x=e.querySelector(`#btn-clear-recommendation`);x&&x.addEventListener(`click`,()=>{c=null,d=null,f=null,p=null,m=null,g(),v()})}function b(e,t){let n=e.map(e=>{let t=l(e.perfumeId);return{...e,name:t?.name||e.perfumeId}});Ee({id:`f-`+Date.now(),layers:n,simulation:t,createdAt:Date.now()},{showNameInput:!0})}v()}function F(e,t=150){return!e||e.length<=t?e:e.substring(0,t).replace(/\s+\S*$/,``)+`…`}function Fe(e){return e?e.split(`
`).filter(e=>e.trim()).filter(e=>!e.match(/^(OVERALL|SILLAGE)/i)).map(e=>{if(e.match(/^(OPENING|HEART|DRY DOWN)/i)){let t=e.indexOf(`:`);return`<p class="sim-section"><span class="sim-label">${e.substring(0,t).trim()}</span><span class="sim-body">${e.substring(t+1).trim()}</span></p>`}return`<p>${e}</p>`}).join(``):``}function Ie(){if(document.getElementById(`lab-styles`))return;let e=document.createElement(`style`);e.id=`lab-styles`,e.textContent=`
    /* ── Page Header ── */
    .lab-page-header {
      text-align: center;
      padding: var(--space-2xl) 0 var(--space-2xl);
    }
    .lab-page-header__label {
      font-size: var(--text-xs);
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: var(--space-sm);
    }
    .lab-page-header__title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 500;
      line-height: 1.1;
      margin-bottom: var(--space-sm);
    }
    .lab-page-header__desc {
      font-size: var(--text-base);
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ── Layout ── */
    .lab-layout {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-2xl);
      align-items: start;
    }

    .lab-left-col {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    .lab-canvas {
      position: sticky;
      top: calc(var(--nav-height) + var(--space-lg));
      max-height: calc(100vh - var(--nav-height) - var(--space-lg) * 2);
      overflow-y: auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      scrollbar-width: thin;
      scrollbar-color: var(--border) transparent;
    }
    .lab-canvas::-webkit-scrollbar { width: 4px; }
    .lab-canvas::-webkit-scrollbar-track { background: transparent; }
    .lab-canvas::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .lab-canvas > * { flex-shrink: 0; }

    /* ── Section label ── */
    .lab-section-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--space-md);
    }

    /* ── Add Section ── */
    .lab-add-section {
      margin-bottom: var(--space-md);
    }

    .lab-perfume-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
    }

    .lab-region-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .lab-region-label {
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--region-color);
      text-align: center;
    }

    .lab-bottle-row {
      display: flex;
      gap: 6px;
    }

    .lab-bottle-btn {
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
      overflow: hidden;
    }

    .lab-bottle-btn:hover {
      border-color: var(--region-color);
      background: var(--surface);
    }

    .lab-bottle-btn--added {
      border-color: var(--region-color);
      background: color-mix(in srgb, var(--region-color) 8%, transparent);
    }

    .lab-bottle-img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      display: block;
      pointer-events: none;
    }

    .lab-bottle-type {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
    }

    .lab-bottle-btn--added .lab-bottle-type {
      color: var(--region-color);
    }

    .lab-bottle-check {
      position: absolute;
      top: 4px;
      right: 5px;
      font-size: 10px;
      font-weight: 700;
      color: var(--region-color);
    }

    /* ── Format badges ── */
    .lab-format-badge {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.04em;
      padding: 2px 5px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .lab-format-badge--spray {
      background: rgba(99, 132, 255, 0.12);
      color: #6384ff;
    }
    .lab-format-badge--oil {
      background: rgba(200, 169, 126, 0.18);
      color: var(--accent-dark);
    }

    /* ── Layers ── */
    .lab-layers {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
    }

    .lab-empty {
      text-align: center;
      padding: var(--space-2xl) var(--space-xl);
      border: 1.5px dashed var(--border);
      border-radius: var(--radius-lg);
    }
    .lab-empty__symbol {
      font-size: 2rem;
      color: var(--border);
      margin-bottom: var(--space-sm);
      line-height: 1;
    }
    .lab-empty__text {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text-tertiary);
      margin-bottom: 4px;
    }
    .lab-empty__hint {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }

    .lab-layer {
      position: relative;
      overflow: hidden;
      background: var(--surface);
      border: 1px solid transparent;
      border-radius: var(--radius-lg);
      transition: box-shadow var(--transition-fast);
    }
    .lab-layer:hover { box-shadow: var(--shadow-sm); }

    .lab-layer__bg {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-size: auto 100%;
      background-position: right center;
      background-repeat: no-repeat;
      -webkit-mask-image: linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%);
      mask-image: linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%);
      pointer-events: none;
    }

    .lab-layer__content {
      position: relative;
      z-index: 1;
      padding: var(--space-md) var(--space-lg);
    }

    .lab-layer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-sm);
    }

    .lab-layer__identity {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex: 1;
      min-width: 0;
    }

    .lab-layer__info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .lab-layer__name {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lab-layer__remove {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      color: var(--text-tertiary);
      font-size: var(--text-xs);
      cursor: pointer;
      transition: all var(--transition-fast);
      background: none;
      border: none;
      flex-shrink: 0;
      margin-left: var(--space-sm);
    }
    .lab-layer__remove:hover { background: rgba(244,67,54,0.08); color: #F44336; }

    .lab-layer__footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .lab-layer__amount {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .lab-layer__amount-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      font-size: var(--text-base);
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .lab-layer__amount-btn:hover { border-color: var(--accent); color: var(--accent); }

    .lab-layer__amount-value {
      font-size: var(--text-lg);
      font-weight: 700;
      min-width: 24px;
      text-align: center;
    }

    .lab-layer__amount-unit {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__notes {
      font-size: var(--text-xs);
      color: var(--text-primary);
      text-align: left;
      display: block;
      margin: var(--space-sm) 0;
    }

    .lab-actions {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
    }

    /* ── Col 2: Advisor ── */
    .lab-advisor {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
    }

    .lab-advisor__header { margin-bottom: var(--space-lg); }

    .lab-advisor__title {
      font-size: var(--text-lg);
      font-weight: 600;
      margin-bottom: 6px;
    }

    .lab-advisor__subtitle {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .lab-advisor__form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .lab-advisor__result-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .lab-advisor__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .lab-chip {
      padding: 5px 12px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .lab-chip:hover { border-color: var(--accent-light); color: var(--accent-dark); }
    .lab-chip--active {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent-dark);
      font-weight: 600;
    }

    /* ── Simulation result sections ── */
    .sim-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: var(--space-md);
    }
    .sim-section:last-child { margin-bottom: 0; }
    .sim-label {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .sim-body {
      font-size: var(--text-sm);
      line-height: 1.65;
      color: var(--text-secondary);
    }

    @media (max-width: 1024px) {
      .lab-layout { grid-template-columns: 1fr; }
      .lab-canvas { position: static; }
    }
  `,document.head.appendChild(e)}var Le=`/mon_accord/assets/folder-DAYqs9Dj.webp`,Re={scandinavian:new URL(`/mon_accord/assets/scandinavian-DvtLirp4.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-UzXNmAB4.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-PFpjigF9.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-CV0fuGZk.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DyzbduD3.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Bmlf8LlT.webp`,``+import.meta.url).href},ze={scandinavian:new URL(`/mon_accord/assets/scandinavian-BBoj4W5D.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-D93RVLet.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-hdHFYwXs.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-B_fMAvaC.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DcR51yl4.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DMI8-64c.webp`,``+import.meta.url).href},Be={"mugler-angel":new URL(`/mon_accord/assets/angel-JaKC4iyN.webp`,``+import.meta.url).href,"ysl-black-opium":new URL(`/mon_accord/assets/black_opium-CwBrp2qb.webp`,``+import.meta.url).href,"lancome-la-vie-est-belle":new URL(`/mon_accord/assets/la_vie_est_belle-CHGqLg72.webp`,``+import.meta.url).href},Ve=[`mugler-angel`,`ysl-black-opium`,`lancome-la-vie-est-belle`],He=[{id:`evening`,name:`Evening Wear`},{id:`daytime`,name:`Daytime`},{id:`office`,name:`Office`},{id:`weekend`,name:`Weekend`},{id:`seasonal`,name:`Seasonal`}];function Ue(e,n){let a=t.getOwnedPerfumes(),s=Ve.filter(e=>!a.loreal.includes(e));s.length&&(a.loreal=[...a.loreal,...s],t.setOwnedPerfumes(a));let c=t.get(`vault_folders`,null),u;if(!c)u=He.map(e=>({...e})),t.set(`vault_folders`,u);else{let e=c.filter(e=>e.id!==`default`),n=new Set(e.map(e=>e.id)),r=He.filter(e=>!n.has(e.id));u=[...e,...r].map(e=>({id:e.id,name:e.name})),t.set(`vault_folders`,u)}let d=null,f=!1,p=null,m=null;function h(){t.set(`vault_folders`,u)}function g(e){return t.getVault().filter(t=>t.folderId===e)}function _(){let n=t.getVault();e.innerHTML=`
      <div class="page__container">
        ${d?b(d,n):v(n)}
      </div>
      ${x()}
    `,We(),S(n)}function v(e){return`
      <div class="vault-main-layout">
        <div class="vault-folders-col">
          <div class="vault-folders-header">
            <h3 style="font-size: var(--text-lg);">Folders</h3>
            <button class="btn btn--secondary btn--sm" id="btn-create-folder">+ New Folder</button>
          </div>

          ${f?`
            <div class="vault-create-folder mb-lg">
              <input type="text" class="input" id="new-folder-name" placeholder="Folder name..." style="max-width: 260px;" />
              <button class="btn btn--primary btn--sm" id="btn-save-folder">Create</button>
              <button class="btn btn--ghost btn--sm" id="btn-cancel-folder">Cancel</button>
            </div>
          `:``}

          <div class="vault-folders-grid">
            ${u.map(e=>{let t=g(e.id).length;return`
                <div class="vault-folder-card card card--interactive" data-folder="${e.id}">
                  <img src="${Le}" class="vault-folder-icon" alt="folder" loading="lazy" decoding="async" />
                  <h4 class="vault-folder-name">${e.name}</h4>
                  <span class="vault-folder-count">${t} formula${t===1?``:`s`}</span>
                  ${e.id===`default`?``:`<button class="vault-folder-delete" data-delete="${e.id}" title="Delete folder">✕</button>`}
                </div>
              `}).join(``)}
          </div>

          ${e.length===0?`
            <div class="vault-empty mt-xl">
              <p style="font-size: var(--text-base); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Your vault is empty</p>
              <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Create formulas in the Layering Lab and save them here.</p>
              <button class="btn btn--primary" id="go-to-lab">Go to Layering Lab</button>
            </div>
          `:``}
        </div>

        ${y()}
      </div>
    `}function y(){let e=t.getOwnedPerfumes();function n(e){return e.length?`<div class="vault-bottle-grid">
        ${e.map(e=>{let t=l(e),n=t?r.find(e=>e.id===t.region):null,i=t?.format===`spray`?Re[t.region]:ze[t.region],a=t?.name||e;return`
            <div class="vault-bottle-card" style="--region-color:${n?.color||`var(--accent)`};">
              <button class="vault-bottle-remove" data-remove="${e}" data-type="monAccord">✕</button>
              <img src="${i}" alt="${a}" class="vault-bottle-img" loading="lazy" decoding="async" />
              <span class="vault-bottle-name">${a}</span>
            </div>`}).join(``)}
      </div>`:`<p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-sm);">None added yet.</p>`}function i(e){return e.length?`<div class="vault-bottle-grid">
        ${e.map(e=>{let t=o.find(t=>t.id===e),n=Be[e],r=t?t.name:e,i=t?.brand||``;return`
            <div class="vault-bottle-card vault-bottle-card--loreal">
              <button class="vault-bottle-remove" data-remove="${e}" data-type="loreal">✕</button>
              ${n?`<img src="${n}" alt="${r}" class="vault-bottle-img" loading="lazy" decoding="async" />`:`<div class="vault-bottle-placeholder">${i.charAt(0)}</div>`}
              <span class="vault-bottle-name">${r}</span>
              <span class="vault-bottle-brand">${i}</span>
            </div>`}).join(``)}
      </div>`:`<p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-sm);">None added yet.</p>`}return`
      <div class="vault-myperfumes-col">
        <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-xs);">My Perfumes</h3>
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-lg);">Your collection guides all recommendations across the app.</p>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">Mon Accord</p>
          ${n(e.monAccord)}
          <button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="monAccord" style="margin-top:var(--space-xs);">+ Add</button>
        </div>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">L'Oréal Luxe</p>
          ${i(e.loreal)}
          <button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="loreal" style="margin-top:var(--space-xs);">+ Add</button>
        </div>
      </div>
    `}function b(e,t){let n=g(e.id);return`
      <div class="vault-breadcrumb mb-lg">
        <button class="btn btn--ghost btn--sm" id="btn-back-folders">← All Folders</button>
        <span style="color: var(--text-tertiary);">/</span>
        <span style="font-weight: 600;">${e.name}</span>
      </div>

      ${n.length===0?`
        <div class="vault-empty">
          <p style="color: var(--text-tertiary);">No formulas in this folder yet.</p>
        </div>
      `:`
        <div class="vault-formulas-list">
          ${n.map(t=>{let n=t.layers||[];return`
              <div class="vault-formula-card" data-id="${t.id}">
                <div class="vault-formula-header">
                  <h4 class="vault-formula-name">${t.name}</h4>
                  <span class="vault-formula-date">${t.savedAt?new Date(t.savedAt).toLocaleDateString():``}</span>
                </div>
                <div class="vault-formula-layers">
                  ${n.map(e=>{let t=l(e.perfumeId),n=t?r.find(e=>e.id===t.region):null;return`<span class="vault-formula-layer" style="color: ${n?.color||`var(--text-secondary)`};">${n?.icon||`•`} ${e.amount} ${e.unit} ${t?.name||e.perfumeId}</span>`}).join(` + `)}
                </div>
                <div class="vault-formula-actions">
                  <button class="btn btn--ghost btn--sm vault-load-btn" data-id="${t.id}">Load to Lab</button>
                  ${e.id===`default`?`
                    <select class="select vault-move-select" data-id="${t.id}" style="font-size: var(--text-xs); padding: 4px 30px 4px 8px;">
                      <option value="">Move to...</option>
                      ${u.filter(e=>e.id!==`default`).map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
                    </select>
                  `:``}
                  <button class="btn btn--ghost btn--sm vault-delete-btn" data-id="${t.id}" style="color: var(--text-tertiary);">✕</button>
                </div>
              </div>
            `}).join(``)}
        </div>
      `}
    `}function x(){if(!p)return``;let e=t.getOwnedPerfumes();if(p===`monAccord`)return`
        <div class="modal-overlay" id="vault-owned-modal-overlay">
          <div class="modal vault-owned-modal">
            <div class="modal__header">
              <h3 class="modal__title">Add Mon Accord Perfume</h3>
              <button class="modal__close" id="vault-close-owned-modal">✕</button>
            </div>
            <div class="modal__body">
              <div class="vault-modal-bottle-grid">
                ${r.map(t=>{let n=i.find(e=>e.region===t.id&&e.format===`spray`),r=i.find(e=>e.region===t.id&&e.format===`oil`),a=n&&e.monAccord.includes(n.id),o=r&&e.monAccord.includes(r.id);return`
                    <div class="vault-modal-region" style="--region-color:${t.color};">
                      <p class="vault-modal-region-label">${t.name}</p>
                      <div class="vault-modal-bottle-row">
                        ${n?`
                          <button class="vault-modal-bottle-btn vault-owned-add-btn ${a?`vault-modal-bottle-btn--owned`:``}"
                            data-type="monAccord" data-id="${n.id}"
                            ${a?`disabled`:``}>
                            <img src="${Re[t.id]}" alt="Spray" class="vault-modal-bottle-img" loading="lazy" decoding="async" />
                            <span class="vault-modal-bottle-type">SPRAY</span>
                            ${a?`<div class="vault-modal-bottle-check">✓</div>`:``}
                          </button>`:``}
                        ${r?`
                          <button class="vault-modal-bottle-btn vault-owned-add-btn ${o?`vault-modal-bottle-btn--owned`:``}"
                            data-type="monAccord" data-id="${r.id}"
                            ${o?`disabled`:``}>
                            <img src="${ze[t.id]}" alt="Oil" class="vault-modal-bottle-img" loading="lazy" decoding="async" />
                            <span class="vault-modal-bottle-type">OIL</span>
                            ${o?`<div class="vault-modal-bottle-check">✓</div>`:``}
                          </button>`:``}
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            </div>
          </div>
        </div>
      `;let n=o.filter(t=>!e.loreal.includes(t.id)),a=[...new Set(n.map(e=>e.brand))].sort((e,t)=>e.localeCompare(t)),s=m?n.filter(e=>e.brand===m):[];return`
      <div class="modal-overlay" id="vault-owned-modal-overlay">
        <div class="modal vault-owned-modal">
          <div class="modal__header">
            <h3 class="modal__title">Add L'Oréal Luxe Perfume</h3>
            <button class="modal__close" id="vault-close-owned-modal">✕</button>
          </div>
          <div class="modal__body">
            ${m?`
              <div class="flex" style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
                <p class="vault-owned-modal-subtitle" style="margin:0;">${m}</p>
                <button class="btn btn--ghost btn--sm" id="vault-back-to-brands">← Brands</button>
              </div>
              <div class="vault-loreal-list">
                ${s.length?s.map(e=>`
                  <div class="vault-loreal-item">
                    <div>
                      <p class="vault-loreal-item__name">${e.name}</p>
                      <p class="vault-loreal-item__meta">${e.family}</p>
                    </div>
                    <button class="btn btn--primary btn--sm vault-owned-add-btn" data-type="loreal" data-id="${e.id}">Add</button>
                  </div>
                `).join(``):`<p style="font-size:var(--text-sm);color:var(--text-tertiary);">All perfumes in this brand are already added.</p>`}
              </div>
            `:`
              <p class="vault-owned-modal-subtitle">First choose a brand.</p>
              <div class="vault-brand-grid">
                ${a.map(e=>`<button class="btn btn--secondary vault-brand-btn" data-brand="${e}">${e}</button>`).join(``)}
              </div>
            `}
          </div>
        </div>
      </div>
    `}function S(r){e.querySelectorAll(`.vault-folder-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.vault-folder-delete`))return;let n=e.dataset.folder;d=u.find(e=>e.id===n),_()})}),e.querySelectorAll(`.vault-folder-delete`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=e.dataset.delete,i=t.getVault();i.forEach(e=>{e.folderId===r&&(e.folderId=void 0)}),t.set(`vault`,i),u=u.filter(e=>e.id!==r),h(),_()})});let i=e.querySelector(`#btn-create-folder`);i&&i.addEventListener(`click`,()=>{f=!0,_()});let a=e.querySelector(`#btn-save-folder`);a&&a.addEventListener(`click`,()=>{let t=e.querySelector(`#new-folder-name`).value.trim();t&&(u.push({id:`folder-`+Date.now(),name:t}),h(),f=!1,_())});let o=e.querySelector(`#btn-cancel-folder`);o&&o.addEventListener(`click`,()=>{f=!1,_()});let s=e.querySelector(`#btn-back-folders`);s&&s.addEventListener(`click`,()=>{d=null,_()});let c=e.querySelector(`#go-to-lab`);c&&c.addEventListener(`click`,()=>n(`#lab`)),e.querySelectorAll(`.vault-load-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=r.find(t=>t.id===e.dataset.id);if(t?.layers){let e=t.layers.map(e=>e.perfumeId).filter(Boolean);sessionStorage.setItem(`labPending`,JSON.stringify(e)),n(`#lab`)}})}),e.querySelectorAll(`.vault-delete-btn`).forEach(e=>{e.addEventListener(`click`,()=>{t.removeFormula(e.dataset.id),_(),window.showToast(`Formula removed from vault.`)})}),e.querySelectorAll(`.vault-move-select`).forEach(e=>{e.addEventListener(`change`,()=>{let n=e.value;if(!n)return;let r=t.getVault(),i=r.find(t=>t.id===e.dataset.id);i&&(i.folderId=n,t.set(`vault`,r),_(),window.showToast(`Formula moved to folder.`))})}),e.querySelectorAll(`.vault-add-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{p=e.dataset.section,m=null,_()})}),e.querySelectorAll(`.vault-cancel-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{p=null,m=null,_()})}),e.querySelectorAll(`.vault-owned-add-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let n=t.getOwnedPerfumes(),r=e.dataset.type,i=e.dataset.id;n[r].includes(i)||(n[r]=[...n[r],i],t.setOwnedPerfumes(n),window.showToast(`Added to your collection.`)),r===`monAccord`&&(p=null),_()})}),e.querySelectorAll(`.vault-brand-btn`).forEach(e=>{e.addEventListener(`click`,()=>{m=e.dataset.brand,_()})});let l=e.querySelector(`#vault-back-to-brands`);l&&l.addEventListener(`click`,()=>{m=null,_()});let g=e.querySelector(`#vault-close-owned-modal`);g&&g.addEventListener(`click`,()=>{p=null,m=null,_()});let v=e.querySelector(`#vault-owned-modal-overlay`);v&&v.addEventListener(`click`,e=>{e.target.id===`vault-owned-modal-overlay`&&(p=null,m=null,_())}),e.querySelectorAll(`.vault-myperfume-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let{remove:n,type:r}=e.dataset,i=t.getOwnedPerfumes();i[r]=i[r].filter(e=>e!==n),t.setOwnedPerfumes(i),_()})})}_()}function We(){if(document.getElementById(`vault-styles`))return;let e=document.createElement(`style`);e.id=`vault-styles`,e.textContent=`
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
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-md);
    }

    .vault-folder-card {
      text-align: center;
      padding: var(--space-xl) var(--space-sm);
      position: relative;
      height: 140px;
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

    .vault-bottle-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
      margin-bottom: var(--space-sm);
    }

    .vault-bottle-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 4px 6px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--bg-primary);
      text-align: center;
    }

    .vault-bottle-img {
      width: 100%;
      height: 80px;
      object-fit: contain;
      display: block;
    }

    .vault-bottle-placeholder {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-tertiary);
      background: var(--surface);
      border-radius: var(--radius-sm);
    }

    .vault-bottle-name {
      font-size: 9px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
      word-break: break-word;
    }

    .vault-bottle-brand {
      font-size: 8px;
      color: var(--text-tertiary);
    }

    .vault-bottle-remove {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 16px;
      height: 16px;
      font-size: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: none;
      border: none;
      color: var(--text-tertiary);
      cursor: pointer;
      opacity: 0;
      transition: all var(--transition-fast);
    }

    .vault-bottle-card:hover .vault-bottle-remove { opacity: 1; }
    .vault-bottle-remove:hover { color: #e74c3c; background: rgba(231,76,60,0.1); }

    .vault-modal-bottle-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
    }

    .vault-modal-region { display: flex; flex-direction: column; gap: 6px; }

    .vault-modal-region-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--region-color);
      text-align: center;
    }

    .vault-modal-bottle-row { display: flex; gap: 6px; }

    .vault-modal-bottle-btn {
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

    .vault-modal-bottle-btn:hover:not(:disabled) {
      border-color: var(--region-color);
      background: var(--surface);
    }

    .vault-modal-bottle-btn--owned {
      border-color: var(--region-color);
      background: color-mix(in srgb, var(--region-color) 8%, transparent);
    }

    .vault-modal-bottle-btn:disabled { cursor: default; }

    .vault-modal-bottle-img {
      width: 100%;
      height: 90px;
      object-fit: contain;
      pointer-events: none;
    }

    .vault-modal-bottle-type {
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
    }

    .vault-modal-bottle-btn--owned .vault-modal-bottle-type { color: var(--region-color); }

    .vault-modal-bottle-check {
      position: absolute;
      top: 4px;
      right: 5px;
      font-size: 10px;
      font-weight: 700;
      color: var(--region-color);
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
  `,document.head.appendChild(e)}function Ge(){let e=t.getInteractions(),n=t.getVault(),a=t.getLikes(),o=t.getProfile();if(e.length===0&&n.length===0)return null;let s={},c={spray:0,oil:0},l=[];n.forEach(e=>{(e.layers||[]).forEach(e=>{let t=i.find(t=>t.id===e.perfumeId);t&&(s[t.region]=(s[t.region]||0)+1,c[t.format]++,l.push({...e,region:t.region,format:t.format,family:t.scentFamily}))})});let u=Object.entries(s).sort(([,e],[,t])=>t-e).map(([e,t])=>({region:e,count:t,data:r.find(t=>t.id===e)})),d=Date.now()-720*60*60*1e3,f=e.filter(e=>e.timestamp>d);e.filter(e=>e.timestamp<=d),n.length;let p=a.length,m=n.filter(e=>e.savedAt>d).length;return{topRegions:u,formatPreference:c.spray>c.oil?`spray-dominant`:c.oil>c.spray?`oil-dominant`:`balanced`,totalFormulas:n.length,totalLikes:p,recentActivity:f.length,engagementLevel:f.length>10?`high`:f.length>3?`medium`:`low`,profile:o,recentSaves:m}}function Ke(){let e=t.getOwnedPerfumes(),n=[];if(e.monAccord?.length){let t=e.monAccord.map(e=>i.find(t=>t.id===e)?.name).filter(Boolean);t.length&&n.push(`Mon Accord owned: ${t.join(`, `)}`)}if(e.loreal?.length){let t=e.loreal.map(e=>o.find(t=>t.id===e)?.name).filter(Boolean);t.length&&n.push(`L'Oréal Luxe owned: ${t.join(`, `)}`)}return n.length?n.join(`
`):`No owned perfumes registered.`}async function qe(){let e=Ge(),n=t.getVault(),r=t.getProfile();if(!n.length&&!r)return{success:!1,error:`No usage data yet. Create some formulas first!`};let a=n.slice(0,3).map(e=>{let t=(e.layers||[]).map(e=>{let t=i.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} ${t.name}`:``}).filter(Boolean).join(` + `);return`"${e.name}": ${t}`}).join(`
`),o=await k(`Based on this user's fragrance journey, suggest a fresh remix.

USER PROFILE: ${r?`${r.archetypeName} (${r.primaryFamilies?.join(`, `)})`:`No formal profile`}

USER'S OWNED PERFUMES (these are their starting point — prioritize combinations using these):
${Ke()}

FAVORITE FORMULAS:
${a||`None saved yet`}

USAGE TRENDS:
- Most used regions: ${e?.topRegions?.map(e=>e.region).join(`, `)||`not enough data`}
- Format preference: ${e?.formatPreference||`balanced`}
- Total formulas: ${e?.totalFormulas||0}
- Engagement: ${e?.engagementLevel||`new user`}

TASK: Suggest a remix that:
1. Incorporates their favorites but adds something new
2. Introduces a region they haven't explored much
3. Pushes their comfort zone slightly

Respond in EXACTLY this JSON format (no markdown, no code blocks):
{
  "remixName": "creative name",
  "layers": [
    {"perfumeId": "exact-perfume-id", "amount": 2, "unit": "sprays or drops"}
  ],
  "inspiration": "What inspired this remix — connect to their journey",
  "newElement": "What's new/different about this compared to their usual",
  "scentDescription": "Vivid 2-sentence sensory preview"
}`,2,400);if(o.success)try{let e=o.text.trim();e.startsWith("```")&&(e=e.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let n=JSON.parse(e);return t.addInteraction({type:`remix-generated`,name:n.remixName}),{success:!0,remix:n}}catch{return{success:!0,remix:{remixName:`Curated Remix`,layers:[],inspiration:o.text,newElement:``,scentDescription:``}}}return{success:!1,error:o.text}}function Je(){let e=t.getInteractions().filter(e=>e.type===`like`&&e.timestamp>Date.now()-720*60*60*1e3),n={};return e.forEach(e=>{n[e.formulaId]=(n[e.formulaId]||0)+1}),s.sort((e,t)=>t.likes+(n[t.id]||0)*10-(e.likes+(n[e.id]||0)*10)).slice(0,10)}var Ye=`/mon_accord/assets/duyguozaslan-CU-KocgS.webp`,Xe=[{id:`sp-1`,author:`ScentExplorer`,date:Date.now()-864e5*3,title:`My go-to date night combo`,topicType:`trending`,topicRef:`cf-4`,content:`Velvet Rose is absolutely stunning for evenings out. The oud-citrus balance is perfect — not too heavy, not too light. My partner always compliments this one!`,likes:18,comments:[{id:`sc-1`,author:`RoseAddict`,date:Date.now()-864e5*2,text:`Totally agree! I add an extra drop of the oil for more longevity.`,replies:[{id:`sc-1r1`,author:`ScentExplorer`,date:Date.now()-864e5,text:`Great tip, I'll try that next time!`},{id:`sc-1r2`,author:`VelvetQueen`,date:Date.now()-864e5*.5,text:`The oil trick really does work — I noticed at least 2 extra hours of longevity with it.`,replies:[]}]},{id:`sc-2`,author:`NordicNose`,date:Date.now()-864e5,text:`Have you tried mixing it with a Scandinavian spray? The contrast is amazing.`,replies:[{id:`sc-2r1`,author:`ScentExplorer`,date:Date.now()-864e5*.8,text:`Not yet but that sounds like an interesting idea! Warm + cool could be really unique.`,replies:[]},{id:`sc-2r2`,author:`LayeringPro`,date:Date.now()-864e5*.3,text:`I do this combo regularly. The birch from Scandinavia really grounds the rose beautifully.`,replies:[]}]}]},{id:`sp-2`,author:`MinimalistMusk`,date:Date.now()-864e5*5,title:`Best office-safe layering?`,topicType:`free`,topicLabel:`Office Fragrances`,content:`Looking for recommendations on subtle combinations that work in a professional setting. I love the Zen Garden combo but wondering if there are other options that project softly.`,likes:12,comments:[{id:`sc-3`,author:`CorporateChic`,date:Date.now()-864e5*4,text:`Azure Morning is my daily driver for work. Very clean and inoffensive.`,replies:[{id:`sc-3r1`,author:`MinimalistMusk`,date:Date.now()-864e5*3,text:`Oh that sounds perfect, adding it to my cart!`},{id:`sc-3r2`,author:`FreshFan`,date:Date.now()-864e5*2,text:`Second this. Mediterranean spray + Scandinavian oil is chef's kiss for office.`}]},{id:`sc-3b`,author:`QuietScenter`,date:Date.now()-864e5*3,text:`I go with just 2 sprays of East Asia spray. The green tea and bamboo are super subtle but elegant.`,replies:[{id:`sc-3b1`,author:`MinimalistMusk`,date:Date.now()-864e5*2,text:`That's actually brilliant — single region, minimal projection. Love it.`}]}]},{id:`sp-3`,author:`OudLover`,date:Date.now()-864e5*1,title:`Custom evening blend I created`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],content:`I've been experimenting with this bold combo for a while. The saffron-oud meets vanilla-coffee and it's absolutely divine for cold winter nights. Who else loves intense combos?`,likes:24,comments:[{id:`sc-4`,author:`AmberAddict`,date:Date.now()-864e5*.8,text:`This is EXACTLY what I've been looking for! The warmth from both regions must be incredible together.`,replies:[{id:`sc-4r1`,author:`OudLover`,date:Date.now()-864e5*.5,text:`It really is — the saffron opens bright and then the rooibos-vanilla base just wraps around you.`}]},{id:`sc-5`,author:`NightOwlScents`,date:Date.now()-864e5*.6,text:`Have you tried adding a single drop of Scandinavian oil to cool it down slightly? Adds an interesting twist.`,replies:[]}]},{id:`sp-4`,author:`FloralFusion`,date:Date.now()-864e5*2,title:`Spring cherry blossom layering`,topicType:`combination`,topicCombination:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],content:`Cherry blossom from East Asia with neroli and fig from Mediterranean oil creates this gorgeous springtime aura. Light, feminine, and so uplifting. Perfect for daytime!`,likes:31,comments:[{id:`sc-6`,author:`GardenBreeze`,date:Date.now()-864e5*1.5,text:`This sounds absolutely heavenly! Trying this tomorrow morning.`,replies:[{id:`sc-6r1`,author:`FloralFusion`,date:Date.now()-864e5*1,text:`Let me know how you like it! The fig really brings out the floral notes.`},{id:`sc-6r2`,author:`GardenBreeze`,date:Date.now()-864e5*.4,text:`Update: I LOVE it. Got three compliments at brunch today. This is my new signature.`}]},{id:`sc-7`,author:`PerfumeNovice`,date:Date.now()-864e5*1.2,text:`Would this work well in warm weather? I'm worried about the oil being too heavy in summer.`,replies:[{id:`sc-7r1`,author:`FloralFusion`,date:Date.now()-864e5*.8,text:`It's actually quite light! The Mediterranean oil is more fresh than heavy. Give it a try.`}]}]},{id:`sp-5`,author:`SeasonalSniffer`,date:Date.now()-864e5*4,title:`Summer vs winter layering strategies`,topicType:`free`,topicLabel:`Seasonal Tips`,content:`I've noticed that in summer I prefer spray-only combos (2 regions, light application), while in winter I go heavy on oils with maybe one spray on top. Does anyone else change their approach with seasons?`,likes:19,comments:[{id:`sc-8`,author:`AllSeasonScenter`,date:Date.now()-864e5*3.5,text:`Absolutely! Summer is all about Mediterranean + East Asia for me. Winter I switch to Middle East + South Africa.`,replies:[{id:`sc-8r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*3,text:`That's almost exactly my rotation! Great minds think alike.`},{id:`sc-8r2`,author:`NordicNose`,date:Date.now()-864e5*2.5,text:`Don't sleep on Scandinavian in summer though — the birch and juniper are so refreshing.`}]},{id:`sc-9`,author:`TropicalVibes`,date:Date.now()-864e5*3,text:`Living in a tropical climate I use light sprays year-round. Oils are too intense in 35°C heat!`,replies:[]},{id:`sc-10`,author:`FourSeasons`,date:Date.now()-864e5*2,text:`I keep a separate shelf for each season. Spring: florals. Summer: citrus. Fall: woody. Winter: spicy-sweet.`,replies:[{id:`sc-10r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*1.5,text:`That level of organization is goals! Do you have a favorite fall combo?`},{id:`sc-10r2`,author:`FourSeasons`,date:Date.now()-864e5*1,text:`Scandinavian spray + Middle East oil. The cedar-oud combination is *chef's kiss* for autumn walks.`}]}]},{id:`sp-6`,author:`GiftGuru`,date:Date.now()-864e5*6,title:`Gifting layering sets — any tips?`,topicType:`trending`,topicRef:`cf-2`,content:`I want to gift a friend a layering combo but I'm not sure how to present it. Anyone wrapped up Mon Accord sets as gifts before? Which combos are crowd-pleasers?`,likes:15,comments:[{id:`sc-11`,author:`ThoughtfulGifter`,date:Date.now()-864e5*5,text:`Mediterranean + East Asia is always a safe bet. Almost everyone loves the freshness.`,replies:[{id:`sc-11r1`,author:`GiftGuru`,date:Date.now()-864e5*4.5,text:`That's what I was leaning towards! Simple and universally appealing.`}]},{id:`sc-12`,author:`WrapQueen`,date:Date.now()-864e5*5,text:`I put the spray + oil in a nice pouch with a card explaining the layering technique. People love it!`,replies:[]}]},{id:`sp-7`,author:`VanillaCloud`,date:Date.now()-864e5*1.5,title:`Gourmand lovers unite — best sweet combos?`,topicType:`trending`,topicRef:`cf-5`,content:`I'm obsessed with Cocoa Cloud but looking for more sweet, cozy combinations. Who else here loves gourmand-leaning layering? Drop your favourites!`,likes:22,comments:[{id:`sc-13`,author:`SweetTooth`,date:Date.now()-864e5*1.2,text:`Cocoa Cloud is my absolute favourite! I also add 1 drop of Middle East oil on top for a rich amber-vanilla twist.`,replies:[{id:`sc-13r1`,author:`VanillaCloud`,date:Date.now()-864e5*1,text:`Oh that sounds amazing, the oud would add so much depth!`},{id:`sc-13r2`,author:`GourmandQueen`,date:Date.now()-864e5*.8,text:`Can confirm this works beautifully. The saffron note from Middle East pairs perfectly with the cocoa.`,replies:[]}]},{id:`sc-14`,author:`CozyNights`,date:Date.now()-864e5*1,text:`Try South America spray + South Africa oil + a single East Asia oil drop. Tonka-vanilla-cherry blossom is heavenly.`,replies:[{id:`sc-14r1`,author:`VanillaCloud`,date:Date.now()-864e5*.5,text:`Three layers! That's ambitious. Adding it to my list to try this weekend.`}]}]},{id:`sp-8`,author:`NoseTrainer`,date:Date.now()-864e5*3.5,title:`How I trained my nose for layering`,topicType:`free`,topicLabel:`Tips & Guides`,content:`When I started layering I couldn't tell the difference between combos. Here's what helped: start with just ONE spray and ONE oil. Wear it for a full day. Next day, swap one layer. After 2 weeks you'll notice nuances you never imagined!`,likes:34,comments:[{id:`sc-15`,author:`BeginnerSniffer`,date:Date.now()-864e5*3,text:`This is exactly what I needed! I've been overwhelmed trying 3-layer combos from the start.`,replies:[{id:`sc-15r1`,author:`NoseTrainer`,date:Date.now()-864e5*2.8,text:`Start simple! Mediterranean spray + Scandinavian oil is a great first combo. Very distinct notes.`},{id:`sc-15r2`,author:`ScentExplorer`,date:Date.now()-864e5*2.5,text:`Agreed. I started the same way and now I can pick apart 4-layer combos no problem.`}]},{id:`sc-16`,author:`OlfactoryJourney`,date:Date.now()-864e5*2.5,text:`Another tip: smell coffee beans between testing different combos. It resets your nose.`,replies:[]},{id:`sc-17`,author:`FragranceNerd`,date:Date.now()-864e5*2,text:`I keep a scent journal — I write down what I smell at 0min, 1hr, 4hr, and 8hr. Game changer for understanding how layers evolve.`,replies:[{id:`sc-17r1`,author:`NoseTrainer`,date:Date.now()-864e5*1.5,text:`The journal idea is brilliant! I should start doing that too.`}]}]},{id:`sp-9`,author:`MidnightRose`,date:Date.now()-864e5*.5,title:`Amber Veil is the new obsession`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],content:`Just tried this three-layer combo and I'm speechless. The Arabian amber opens rich and warm, the South American tonka adds this gorgeous sweetness, and that single drop of Scandinavian oil on top gives it a cool, clean edge. Pure sophistication!`,likes:28,comments:[{id:`sc-18`,author:`LayeringPro`,date:Date.now()-864e5*.4,text:`Three regions in one combo? Bold move. How's the longevity?`,replies:[{id:`sc-18r1`,author:`MidnightRose`,date:Date.now()-864e5*.3,text:`Easily 8+ hours. The oil base really anchors everything.`},{id:`sc-18r2`,author:`OudLover`,date:Date.now()-864e5*.2,text:`Middle East oil as a base is always a longevity cheat code. Great choice.`}]},{id:`sc-19`,author:`NordicNose`,date:Date.now()-864e5*.3,text:`Love the Scandinavian finishing touch. That birch-juniper coolness must cut through the sweetness perfectly.`,replies:[]}]},{id:`sp-10`,author:`WorkdayScenter`,date:Date.now()-864e5*7,title:`My week of different combos — review`,topicType:`free`,topicLabel:`Reviews`,content:`I wore a different trending combo each workday last week: Mon — Azure Morning, Tue — Zen Garden, Wed — Golden Hour, Thu — Forest Ceremony, Fri — Velvet Rose. Here's my ranking: Velvet Rose > Azure Morning > Zen Garden > Golden Hour > Forest Ceremony. Friday combo got 4 compliments!`,likes:21,comments:[{id:`sc-20`,author:`CorporateChic`,date:Date.now()-864e5*6.5,text:`Velvet Rose for WORK? That's brave! I usually save that for evenings.`,replies:[{id:`sc-20r1`,author:`WorkdayScenter`,date:Date.now()-864e5*6,text:`I went light — just 1 spray + 1 drop instead of the full recommended amount. Keeps it office-appropriate.`},{id:`sc-20r2`,author:`MinimalistMusk`,date:Date.now()-864e5*5.5,text:`Smart approach! Half-dosing heavier combos is underrated.`}]},{id:`sc-21`,author:`AllSeasonScenter`,date:Date.now()-864e5*6,text:`Azure Morning on Monday is perfect — fresh and energizing to start the week. I do the same!`,replies:[{id:`sc-21r1`,author:`WorkdayScenter`,date:Date.now()-864e5*5,text:`Right?! It's like a morning espresso in fragrance form.`}]}]}];function I(){let e=t.getPosts();if(!e.length)e=Xe,t.setPosts(e);else{let n=new Set(e.map(e=>e.id)),r=Xe.filter(e=>!n.has(e.id));r.length&&(e=[...e,...r],t.setPosts(e))}return e}function Ze(e,n){let a=Je(),c=t.getProfile(),u=`likes`,d=`newest`,f=null,p=!1,m=null,h=`community_daily_suggestion`,g=new Date().toISOString().slice(0,10),_=null;try{_=JSON.parse(sessionStorage.getItem(h)||`null`)}catch{}let v=_?.date===g?_.remix:null,y=!v;function b(e){if(!c)return Math.floor(Math.random()*40)+30;let t=50,n=c.primaryFamilies||[];return(e.layers||[]).forEach(e=>{let r=l(e.perfumeId);r&&(r.scentFamily.split(`-`).forEach(e=>{n.includes(e)&&(t+=12)}),c.recommendedRegions?.includes(r.region)&&(t+=8))}),Math.min(t,98)}let x=a.map(e=>({...e,matchPercent:b(e)}));function S(){let e=[...x];return u===`likes`?e.sort((e,t)=>(t.likes||0)-(e.likes||0)):u===`match`?e.sort((e,t)=>t.matchPercent-e.matchPercent):u===`newest`&&e.sort((e,t)=>t.id>e.id?1:-1),e}function ee(e){let t=[...e];return d===`newest`?t.sort((e,t)=>t.date-e.date):d===`likes`?t.sort((e,t)=>(t.likes||0)-(e.likes||0)):d===`comments`&&t.sort((e,t)=>E(t)-E(e)),t}function C(){let n=S(),i=I(),a=f?i.find(e=>e.id===f):null;e.innerHTML=`
      <div class="page__container">
        <!-- ═══ TRENDING SECTION ═══ -->
        <div class="community-top-grid">
          <div class="community-panel">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Trending Combinations</h3>
              <div class="community-sort">
                <span class="community-sort-label">⇅ Sort by</span>
                <button class="community-sort-btn ${u===`likes`?`community-sort-btn--active`:``}" data-sort="likes">Popular</button>
                <button class="community-sort-btn ${u===`match`?`community-sort-btn--active`:``}" data-sort="match">For You</button>
                <button class="community-sort-btn ${u===`newest`?`community-sort-btn--active`:``}" data-sort="newest">New</button>
              </div>
            </div>
            <div class="community-trending-list">
              ${n.slice(0,5).map((e,n)=>{let i=t.isLiked(e.id),a=(e.likes||0)+(i?1:0);return`
                <div class="community-trending-item" data-id="${e.id}">
                  <div class="community-trending-rank">${n+1}</div>
                  <div class="community-trending-content">
                    <div class="community-trending-top">
                      <h4 class="community-trending-name">${e.name}</h4>
                    </div>
                    <div class="community-trending-layers">
                      ${(e.layers||[]).map(e=>{let t=l(e.perfumeId);return`<span style="color: ${(t?r.find(e=>e.id===t.region):null)?.color||`var(--text-tertiary)`};">${t?.name||``}</span>`}).join(` <span style="color: var(--text-tertiary);">+</span> `)}
                    </div>
                  </div>
                  <div class="community-trending-meta">
                    <span class="community-trending-match" style="color: ${e.matchPercent>70?`#4CAF50`:e.matchPercent>50?`var(--accent)`:`var(--text-tertiary)`};">${e.matchPercent}% match</span>
                    <button class="community-like-btn ${i?`community-like-btn--active`:``}" data-like-formula="${e.id}">
                      ${i?`♥`:`♡`} ${a}
                    </button>
                    <button class="btn btn--ghost btn--sm community-vault-btn" data-vault-formula="${e.id}">Add to Vault</button>
                  </div>
                </div>
              `}).join(``)}
            </div>
          </div>

          <div class="community-panel community-panel--selection">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Today's Selection For You</h3>
            </div>
            <div id="suggestion-container" style="display:flex;flex-direction:column;flex:1;min-height:0;">
              ${Qe(v,y)}
            </div>
          </div>
        </div>

        <!-- ═══ CHOICE ROW ═══ -->
        <div class="community-choice-row">
          <div class="community-choice-card">
            <div class="community-choice-card__photo-wrap">
              <img src="${Ye}" alt="Duygu Özaslan" class="community-choice-card__photo" loading="lazy" decoding="async" />
            </div>
            <p class="community-choice-card__name">Duygu Özaslan</p>
            <p class="community-choice-card__role">Influencer</p>
            <p class="community-choice-card__quote">"Cherry blossom and fig together feel like a spring garden by the sea — feminine, luminous, and unforgettable."</p>
            <div class="community-choice-card__combo">
              <div class="community-choice-card__layer">
                <span style="color:${r.find(e=>e.id===`eastasia`)?.color};">East Asia — Spray</span>
                <span class="community-choice-card__amount">2 sprays</span>
              </div>
              <div class="community-choice-card__layer">
                <span style="color:${r.find(e=>e.id===`mediterranean`)?.color};">Mediterranean — Oil</span>
                <span class="community-choice-card__amount">3 drops</span>
              </div>
            </div>
          </div>
          <div class="community-choice-card community-choice-card--placeholder">
            <div class="community-choice-card__avatar-ph"></div>
            <p class="community-choice-card__name community-choice-card__name--ph">Coming Soon</p>
            <p class="community-choice-card__role">—</p>
          </div>
          <div class="community-choice-card community-choice-card--placeholder">
            <div class="community-choice-card__avatar-ph"></div>
            <p class="community-choice-card__name community-choice-card__name--ph">Coming Soon</p>
            <p class="community-choice-card__role">—</p>
          </div>
        </div>

        <!-- ═══ DISCUSSION SECTION ═══ -->
        <div class="community-discussion-section">
          <div class="community-discussion-header">
            <h3 class="community-panel-title">Discussion</h3>
            <div style="display:flex;align-items:center;gap:var(--space-sm);">
              <div class="community-sort">
                <button class="community-sort-btn ${d===`newest`?`community-sort-btn--active`:``}" data-post-sort="newest">Newest</button>
                <button class="community-sort-btn ${d===`likes`?`community-sort-btn--active`:``}" data-post-sort="likes">Most Liked</button>
                <button class="community-sort-btn ${d===`comments`?`community-sort-btn--active`:``}" data-post-sort="comments">Most Discussed</button>
              </div>
              <button class="btn btn--primary" id="btn-new-post">+ New Post</button>
            </div>
          </div>

          ${p?te(n):``}

          <div class="community-discussion-layout">
            <!-- Post List (left) -->
            <div class="community-post-list">
              ${i.length===0?`<p style="color:var(--text-tertiary);font-size:var(--text-sm);padding:var(--space-lg);">No posts yet. Be the first to share!</p>`:ee(i).map(e=>`
                  <div class="community-post-item ${f===e.id?`community-post-item--active`:``}" data-post-id="${e.id}">
                    <div class="community-post-item__top">
                      <span class="community-post-item__date">${D(e.date)}</span>
                    </div>
                    <h4 class="community-post-item__title">${e.title}</h4>
                    <div class="community-post-item__bottom">
                      <span class="community-post-item__topic">${re(e)}</span>
                      <span class="community-post-item__stats">${e.likes||0} · ${E(e)} comments</span>
                    </div>
                  </div>
                `).join(``)}
            </div>

            <!-- Post Detail (right) -->
            <div class="community-post-detail">
              ${a?ne(a):`
                <div class="community-post-empty">
                  <p>Select a post to view</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `,$e(),k(n,i)}function te(e){let t=[...i.map(e=>({id:e.id,label:`${r.find(t=>t.id===e.region)?.icon||``} ${e.name} (${e.format})`,group:`Mon Accord`})),...o.map(e=>({id:e.id,label:`${e.brand} — ${e.name}`,group:`L'Oreal Luxe`}))];return`
      <div class="community-new-post-form">
        <div class="input-group">
          <label class="input-label">Title</label>
          <input type="text" class="input" id="new-post-title" placeholder="Give your post a title..." />
        </div>

        <div class="input-group">
          <label class="input-label">Topic Type</label>
          <div class="community-topic-selector">
            <button class="community-topic-btn ${m===`combination`?`community-topic-btn--active`:``}" data-topic="combination">Custom Combination</button>
            <button class="community-topic-btn ${m===`trending`?`community-topic-btn--active`:``}" data-topic="trending">Trending Combo</button>
            <button class="community-topic-btn ${m===`free`?`community-topic-btn--active`:``}" data-topic="free">Free Topic</button>
          </div>
        </div>

        ${m===`combination`?`
          <div class="input-group">
            <label class="input-label">Build your combination</label>
            <div id="combo-builder">
              <div id="combo-layers"></div>
              <div class="community-combo-add">
                <select class="select" id="combo-perfume-select" style="flex:1;">
                  <option value="">Select perfume...</option>
                  ${t.map(e=>`<option value="${e.id}">${e.label}</option>`).join(``)}
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
        `:``}

        ${m===`trending`?`
          <div class="input-group">
            <label class="input-label">Select trending combination</label>
            <select class="select" id="trending-select">
              <option value="">Choose...</option>
              ${s.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
        `:``}

        ${m===`free`?`
          <div class="input-group">
            <label class="input-label">Topic</label>
            <input type="text" class="input" id="free-topic-label" placeholder="What's this about?" />
          </div>
        `:``}

        ${m?`
          <div class="input-group">
            <label class="input-label">Content</label>
            <textarea class="input" id="new-post-content" rows="4" placeholder="Share your thoughts..."></textarea>
          </div>
          <div class="flex gap-sm">
            <button class="btn btn--primary btn--sm" id="btn-submit-post">Post</button>
            <button class="btn btn--ghost btn--sm" id="btn-cancel-post">Cancel</button>
          </div>
        `:``}
      </div>
    `}let w=[];function ne(e){let n=t.isPostLiked(e.id),r=ie(e);return`
      <div class="community-post-detail__inner">
        <div class="community-post-detail__header">
          <h3 class="community-post-detail__title">${e.title}</h3>
          <div class="community-post-detail__meta">
            <span class="community-post-detail__author">${e.author}</span>
            <span class="community-post-detail__date">${new Date(e.date).toLocaleDateString()}</span>
          </div>
        </div>
        ${r}
        <p class="community-post-detail__content">${e.content}</p>
        <div class="community-post-detail__actions">
          <button class="community-like-btn ${n?`community-like-btn--active`:``}" data-like-post="${e.id}">
            ${n?`♥`:`♡`} ${e.likes||0}
          </button>
          <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${E(e)} comments</span>
        </div>
        <div class="divider--gold"></div>
        <div class="community-comments">
          <h4 style="font-size:var(--text-xl);font-weight:700;margin-bottom:var(--space-sm);">Comments</h4>
          ${T(e.comments||[],e.id,0)}
          <div class="community-add-comment">
            <input type="text" class="input" id="new-comment-input" placeholder="Write a comment..." style="flex:1;" />
            <button class="btn btn--primary btn--sm" id="btn-add-comment" data-post-id="${e.id}">Post</button>
          </div>
        </div>
      </div>
    `}function T(e,t,n){return!e||!e.length?``:e.map(e=>`
      <div class="community-comment" style="margin-left:${n*20}px;">
        <div class="community-comment__meta">
          <span class="community-comment__author">${e.author}</span>
          <span class="community-comment__date">${D(e.date)}</span>
        </div>
        <p class="community-comment__text">${e.text}</p>
        <button class="community-reply-toggle" data-comment-id="${e.id}" data-post-id="${t}">Reply</button>
        <div class="community-reply-input" id="reply-${e.id}" style="display:none;">
          <input type="text" class="input" placeholder="Write a reply..." style="flex:1;font-size:var(--text-xs);" />
          <button class="btn btn--ghost btn--sm community-reply-submit" data-comment-id="${e.id}" data-post-id="${t}">Post</button>
        </div>
        ${T(e.replies||[],t,n+1)}
      </div>
    `).join(``)}function re(e){if(e.topicType===`trending`){let t=s.find(t=>t.id===e.topicRef);return t?t.name:`Trending`}return e.topicType===`combination`?`Custom Combo`:e.topicLabel||`General`}function ie(e){if(e.topicType===`trending`){let t=s.find(t=>t.id===e.topicRef);return t?`<div class="community-post-topic-badge">Trending: ${t.name}</div>`:``}return e.topicType===`combination`&&e.topicCombination?.length?`<div class="community-post-topic-badge">${e.topicCombination.map(e=>`${l(e.perfumeId)?.name||e.perfumeId} (${e.amount} ${e.unit})`).join(` + `)}</div>`:e.topicType===`free`&&e.topicLabel?`<div class="community-post-topic-badge">${e.topicLabel}</div>`:``}function E(e){let t=0;function n(e){(e||[]).forEach(e=>{t++,n(e.replies)})}return n(e.comments),t}function D(e){let t=Date.now()-e,n=Math.floor(t/6e4);if(n<60)return`${n}m ago`;let r=Math.floor(n/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}function O(e,t){for(let n of e||[]){if(n.id===t)return n;let e=O(n.replies,t);if(e)return e}return null}function k(i,a){e.querySelectorAll(`.community-sort-btn[data-sort]`).forEach(e=>{e.addEventListener(`click`,()=>{u=e.dataset.sort,C()})}),e.querySelectorAll(`.community-sort-btn[data-post-sort]`).forEach(e=>{e.addEventListener(`click`,()=>{d=e.dataset.postSort,C()})}),e.querySelectorAll(`[data-like-formula]`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation(),t.toggleLike(e.dataset.likeFormula),C()})}),e.querySelectorAll(`[data-vault-formula]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=i.find(t=>t.id===e.dataset.vaultFormula);if(!n)return;let a=(n.layers||[]).map(e=>{let t=l(e.perfumeId);return t&&r.find(e=>e.id===t.region),{...e,name:t?.name||e.perfumeId}});Ee({...n,id:`saved-`+n.id,layers:a},{showNameInput:!1})})});let s=e.querySelector(`#btn-load-suggestion`);s&&s.addEventListener(`click`,()=>{v?.layers?.length&&(sessionStorage.setItem(`labPending`,JSON.stringify(v.layers.map(e=>e.perfumeId).filter(e=>l(e)))),n(`#lab`))}),e.querySelectorAll(`[data-post-id]`).forEach(e=>{e.classList.contains(`community-post-item`)&&e.addEventListener(`click`,()=>{f=e.dataset.postId,C()})});let c=e.querySelector(`#btn-new-post`);c&&c.addEventListener(`click`,()=>{p=!0,m=null,w=[],C()}),e.querySelectorAll(`.community-topic-btn`).forEach(e=>{e.addEventListener(`click`,()=>{m=e.dataset.topic,w=[],C()})});let h=e.querySelector(`#combo-add-layer`);h&&h.addEventListener(`click`,()=>{let t=e.querySelector(`#combo-perfume-select`),n=e.querySelector(`#combo-amount`),r=e.querySelector(`#combo-unit`);t.value&&(w.push({perfumeId:t.value,amount:parseInt(n.value)||2,unit:r.value}),g())});function g(){let t=e.querySelector(`#combo-layers`);t&&(t.innerHTML=w.map((e,t)=>{let n=l(e.perfumeId),r=o.find(t=>t.id===e.perfumeId);return`<div class="community-combo-layer"><span>${n?.name||(r?`${r.brand} — ${r.name}`:e.perfumeId)} (${e.amount} ${e.unit})</span><button class="community-combo-remove" data-idx="${t}">✕</button></div>`}).join(``),t.querySelectorAll(`.community-combo-remove`).forEach(e=>{e.addEventListener(`click`,()=>{w.splice(parseInt(e.dataset.idx),1),g()})}))}let _=e.querySelector(`#btn-cancel-post`);_&&_.addEventListener(`click`,()=>{p=!1,m=null,C()});let y=e.querySelector(`#btn-submit-post`);y&&y.addEventListener(`click`,()=>{let n=e.querySelector(`#new-post-title`)?.value.trim(),r=e.querySelector(`#new-post-content`)?.value.trim();if(!n||!r||!m){window.showToast(`Please fill in all fields.`,`error`);return}let i={id:`p-`+Date.now(),author:t.getUsername(),date:Date.now(),title:n,content:r,topicType:m,likes:0,comments:[]};m===`combination`&&(i.topicCombination=[...w]),m===`trending`&&(i.topicRef=e.querySelector(`#trending-select`)?.value||``),m===`free`&&(i.topicLabel=e.querySelector(`#free-topic-label`)?.value.trim()||`General`);let a=I();a.unshift(i),t.setPosts(a),p=!1,m=null,f=i.id,C(),window.showToast(`Post published!`)}),e.querySelectorAll(`[data-like-post]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.likePost,r=t.isPostLiked(n);t.togglePostLike(n);let i=I(),a=i.find(e=>e.id===n);a&&(a.likes=(a.likes||0)+(r?-1:1),t.setPosts(i)),C()})});let b=e.querySelector(`#btn-add-comment`);b&&b.addEventListener(`click`,()=>{let n=e.querySelector(`#new-comment-input`)?.value.trim();if(!n)return;let r=I(),i=r.find(e=>e.id===b.dataset.postId);i&&(i.comments||=[],i.comments.push({id:`c-`+Date.now(),author:t.getUsername(),date:Date.now(),text:n,replies:[]}),t.setPosts(r),C())}),e.querySelectorAll(`.community-reply-toggle`).forEach(t=>{t.addEventListener(`click`,()=>{let n=e.querySelector(`#reply-${t.dataset.commentId}`);n&&(n.style.display=n.style.display===`none`?`flex`:`none`)})}),e.querySelectorAll(`.community-reply-submit`).forEach(n=>{n.addEventListener(`click`,()=>{let r=(e.querySelector(`#reply-${n.dataset.commentId}`)?.querySelector(`input`))?.value.trim();if(!r)return;let i=I(),a=i.find(e=>e.id===n.dataset.postId);if(a){let e=O(a.comments,n.dataset.commentId);e&&(e.replies||=[],e.replies.push({id:`r-`+Date.now(),author:t.getUsername(),date:Date.now(),text:r,replies:[]}),t.setPosts(i),C())}})})}C(),v||(async()=>{let e;if(A()){let t=await qe();e=t.success&&t.remix?t.remix:j()}else e=j();v=e,y=!1,sessionStorage.setItem(h,JSON.stringify({date:g,remix:e})),C()})();function j(){let e=x.slice().sort((e,t)=>t.matchPercent-e.matchPercent)[0]||a[0];return{remixName:e?.name||`Daily Selection`,layers:e?.layers||[],inspiration:e?.description||`A community-loved formula selected for your profile.`,scentDescription:`Balanced for versatility across day and evening wear.`}}}function Qe(e,t){return t?`<div style="padding:var(--space-xl);text-align:center;"><span class="loading-spinner"></span><p style="margin-top:var(--space-md);color:var(--text-tertiary);">Preparing today's suggestion...</p></div>`:e?`
    <div style="padding:var(--space-lg);display:flex;flex-direction:column;flex:1;min-height:0;">
      <div class="ai-response" style="flex:1;">
        <div class="ai-response__label">${e.remixName||`Curated Suggestion`}</div>
        <div class="ai-response__text">
          ${e.layers?.length?`<div style="margin-bottom:var(--space-md);">${e.layers.map(e=>{let t=l(e.perfumeId),n=t?r.find(e=>e.id===t.region):null;return`<p>${n?.icon||`•`} ${e.amount} ${e.unit} of <strong style="color:${n?.color||`var(--text-primary)`};">${t?.name||e.perfumeId}</strong></p>`}).join(``)}</div>`:``}
          ${e.inspiration?`<p>${e.inspiration}</p>`:``}
        </div>
      </div>
      <button class="btn btn--primary btn--sm" style="margin-top:var(--space-lg);" id="btn-load-suggestion">Load to Lab</button>
    </div>
  `:`<p style="font-size:var(--text-sm);color:var(--text-tertiary);padding:var(--space-lg);">No suggestion available.</p>`}function $e(){if(document.getElementById(`community-styles`))return;let e=document.createElement(`style`);e.id=`community-styles`,e.textContent=`
    /* ── Top Grid: Trending + Today's Selection ── */
    .community-top-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(18rem, var(--sidebar-width));
      gap: var(--space-xl);
      align-items: stretch;
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

    .community-sort { display: flex; align-items: center; gap: 4px; }
    .community-sort-label { font-size: var(--text-xs); font-weight: 500; color: var(--text-tertiary); margin-right: 4px; white-space: nowrap; }

    .community-sort-btn {
      padding: 4px 10px; font-size: var(--text-xs); font-weight: 500;
      border: 1px solid var(--border); border-radius: var(--radius-full);
      background: var(--surface); color: var(--text-secondary); cursor: pointer;
      transition: all var(--transition-fast);
    }
    .community-sort-btn:hover { border-color: var(--accent-light); color: var(--accent); }
    .community-sort-btn--active { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; }

    /* ── Trending Items ── */
    .community-trending-list { display: flex; flex-direction: column; flex: 1; }

    .community-trending-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-lg);
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background var(--transition-fast);
      flex: 1;
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

    .community-vault-btn { font-size: var(--text-xs) !important; padding: 2px 8px !important; color: var(--accent-dark) !important; background: var(--accent-bg) !important; border-color: var(--border-accent) !important; }

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
    .community-post-item__date { font-size: 10px; color: var(--text-tertiary); }
    .community-post-item__title { font-size: var(--text-base); font-weight: 600; margin-bottom: 4px; }
    .community-post-item__bottom { display: flex; justify-content: space-between; align-items: center; }
    .community-post-item__topic { font-size: 10px; color: var(--text-tertiary); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1px 6px; }
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

    /* ── Choice Row ── */
    .community-choice-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-lg);
      margin-bottom: var(--space-2xl);
    }

    .community-choice-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-lg);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .community-choice-card--placeholder {
      justify-content: center;
      opacity: 0.45;
    }

    .community-choice-card__photo-wrap { margin-bottom: var(--space-md); }

    .community-choice-card__photo {
      width: 96px; height: 96px; border-radius: 50%; object-fit: cover;
      border: 3px solid var(--accent-light);
    }

    .community-choice-card__avatar-ph {
      width: 96px; height: 96px; border-radius: 50%;
      background: var(--bg-secondary); border: 2px dashed var(--border);
      margin-bottom: var(--space-md);
    }

    .community-choice-card__name { font-size: var(--text-base); font-weight: 600; margin: 0 0 2px; }
    .community-choice-card__name--ph { color: var(--text-tertiary); }
    .community-choice-card__role { font-size: var(--text-xs); color: var(--text-tertiary); margin: 0 0 var(--space-md); }

    .community-choice-card__quote {
      font-size: var(--text-sm); font-style: italic; color: var(--text-secondary);
      line-height: 1.6; margin-bottom: var(--space-md); text-align: left;
      padding-left: var(--space-md); border-left: 2px solid var(--accent-light);
    }

    .community-choice-card__combo {
      display: flex; flex-direction: column; gap: var(--space-xs); text-align: left; width: 100%;
    }

    .community-choice-card__layer {
      display: flex; align-items: center; gap: var(--space-sm);
      font-size: var(--text-sm); padding: var(--space-xs) var(--space-sm);
      background: var(--bg-primary); border-radius: var(--radius-md);
    }

    .community-choice-card__amount {
      margin-left: auto; font-size: var(--text-xs); color: var(--text-tertiary); font-weight: 500;
    }

    @media (max-width: 1024px) {
      .community-top-grid { grid-template-columns: 1fr; }
      .community-choice-row { grid-template-columns: 1fr; }
      .community-discussion-layout { grid-template-columns: 1fr; }
      .community-post-list { border-right: none; border-bottom: 1px solid var(--border); max-height: 300px; }
    }
  `,document.head.appendChild(e)}var et=`/mon_accord/assets/Sephora-Logo-0PIDe1Np.png`,tt=`/mon_accord/assets/Boyner_Logo-CbMLtvDJ.webp`,nt=`/mon_accord/assets/Trendyol_logo-CfMQtlYm.png`,rt=`/mon_accord/assets/hepsiburada-logo-I_Ul_zcU.png`,it={scandinavian:new URL(`/mon_accord/assets/scandinavian-DvtLirp4.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-UzXNmAB4.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-PFpjigF9.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-CV0fuGZk.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DyzbduD3.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Bmlf8LlT.webp`,``+import.meta.url).href},at={scandinavian:new URL(`/mon_accord/assets/scandinavian-BBoj4W5D.webp`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-D93RVLet.webp`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-hdHFYwXs.webp`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-B_fMAvaC.webp`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-DcR51yl4.webp`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DMI8-64c.webp`,``+import.meta.url).href};function ot(e,n){let a=t.getShopCart(),o=[...new Set(t.consumePendingShopCart())],s=[...new Set([...a,...o])],c=s.map(e=>({id:e}));if(o.length){let e=s.length-a.length;window.showToast(`Added ${e} new item${e===1?``:`s`} from your recommended combination.`)}u();function u(){t.setShopCart(c.map(e=>e.id))}function d(){let a=t.getOwnedPerfumes().monAccord||[];st(a,c),e.innerHTML=`
      <div class="page__container">
        <div class="shop-layout">
          <div class="shop-products">
            ${r.map(e=>{let t=i.find(t=>t.region===e.id&&t.format===`spray`),n=i.find(t=>t.region===e.id&&t.format===`oil`);return`
                <div class="shop-region-card" style="--region-color: ${e.color}; --region-light: ${e.colorLight};">
                  <div class="shop-region-card__header">
                    <h3 class="shop-region-card__name">${e.name}</h3>
                  </div>
                  <div class="shop-region-card__products">
                    ${t?(()=>{let n=c.find(e=>e.id===t.id),r=a.includes(t.id);return`
                        <button class="shop-bottle-btn ${n?`shop-bottle-btn--in-cart`:``} ${r?`shop-bottle-btn--owned`:``}" data-id="${t.id}" style="--region-color:${e.color};">
                          ${n?`<div class="shop-bottle-check">✓</div>`:``}
                          ${r?`<div class="shop-bottle-owned">Owned</div>`:``}
                          <img src="${it[e.id]}" class="shop-bottle-img" alt="Spray" loading="lazy" decoding="async" />
                          <span class="shop-bottle-type">SPRAY</span>
                        </button>`})():``}
                    ${n?(()=>{let t=c.find(e=>e.id===n.id),r=a.includes(n.id);return`
                        <button class="shop-bottle-btn ${t?`shop-bottle-btn--in-cart`:``} ${r?`shop-bottle-btn--owned`:``}" data-id="${n.id}" style="--region-color:${e.color};">
                          ${t?`<div class="shop-bottle-check">✓</div>`:``}
                          ${r?`<div class="shop-bottle-owned">Owned</div>`:``}
                          <img src="${at[e.id]}" class="shop-bottle-img" alt="Oil" loading="lazy" decoding="async" />
                          <span class="shop-bottle-type">OIL</span>
                        </button>`})():``}
                  </div>
                </div>
              `}).join(``)}
          </div>

          <!-- Cart Sidebar -->
          <div class="shop-cart">
            <div class="shop-cart__header">
              <h3 class="shop-cart__title">Your Cart</h3>
              <span class="shop-cart__count">${c.length} item${c.length===1?``:`s`}</span>
            </div>
            ${c.length===0?`
              <div class="shop-cart__empty">
                <p>Your cart is empty</p>
                <p style="font-size: var(--text-xs); color: var(--text-tertiary);">Add sprays and oils to get started.</p>
              </div>
            `:`
              <div class="shop-cart__items">
                ${c.map(e=>{let t=l(e.id);return r.find(e=>e.id===t.region),`
                    <div class="shop-cart__item">
                      <div class="shop-cart__item-info">
                        <span>${t.name}</span>
                      </div>
                      <button class="shop-cart__item-remove" data-id="${t.id}">✕</button>
                    </div>
                  `}).join(``)}
              </div>
              <div class="shop-cart__footer">
                <button class="btn btn--primary w-full" id="btn-confirm-order">Confirm Order</button>
              </div>
            `}

          </div>
        </div>
      </div>
    `,lt(),e.querySelectorAll(`.shop-bottle-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=c.findIndex(e=>e.id===n);r>=0?c.splice(r,1):c.push({id:n}),u(),d()})}),e.querySelectorAll(`.shop-cart__item-remove`).forEach(e=>{e.addEventListener(`click`,()=>{c=c.filter(t=>t.id!==e.dataset.id),u(),d()})});let o=e.querySelector(`#btn-confirm-order`);o&&o.addEventListener(`click`,()=>{ct(c,e,n)})}d()}function st(e,t){if(!e.length)return null;let n=t.map(e=>e.id),r=e.map(e=>l(e)).filter(Boolean),a=[...new Set(r.flatMap(e=>e.scentFamily.split(`-`)))],o=i.filter(t=>!e.includes(t.id)&&!n.includes(t.id)&&t.scentFamily.split(`-`).some(e=>a.includes(e))).slice(0,2);return o.length?`Based on your owned ${r.map(e=>e.name).join(` & `)}: try adding ${o.map(e=>e.name).join(` or `)}.`:null}function ct(e,n,r){t.clearShopCart();let i=document.createElement(`div`);i.className=`modal-overlay`,i.innerHTML=`
    <div class="modal order-confirmed-modal">
      <button class="modal__close" id="btn-close-retailers" aria-label="Close">✕</button>
      <div class="modal__body order-confirmed-body">
        <div class="order-confirmed-icon"></div>
        <h3 class="order-confirmed-title">Now Available</h3>

        <div class="order-retailers">
          <div class="order-retailers__grid">
            <div class="order-retailer-card" aria-label="Sephora">
              <img src="${et}" alt="Sephora" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Boyner">
              <img src="${tt}" alt="Boyner" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Trendyol">
              <img src="${nt}" alt="Trendyol" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Hepsiburada">
              <img src="${rt}" alt="Hepsiburada" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="btn-go-profile">Go to Profile</button>
      </div>
    </div>
  `,document.body.appendChild(i),i.querySelector(`#btn-go-profile`).addEventListener(`click`,()=>{i.remove(),r(`#profile`)}),i.querySelector(`#btn-close-retailers`).addEventListener(`click`,()=>{i.remove()}),i.onclick=e=>{e.target===i&&i.remove()}}function lt(){if(document.getElementById(`shop-styles`))return;let e=document.createElement(`style`);e.id=`shop-styles`,e.textContent=`

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
  `,document.head.appendChild(e)}function L(e){return new Promise(t=>setTimeout(t,e))}function R(e,t){if(!e)return L(0);var n=t===void 0?90:t,r=e.getBoundingClientRect().top+window.scrollY-n;return window.scrollTo({top:Math.max(0,r),behavior:`smooth`}),L(700)}function ut(e,t,n){return Math.min(n,Math.max(t,e))}function dt(e){let t={};for(let n=0;n<e.length;n+=1){let r=e.key(n);r&&(t[r]=e.getItem(r))}return t}function ft(e,t){e.clear(),Object.entries(t||{}).forEach(([t,n])=>{n!=null&&e.setItem(t,n)})}async function pt(){let e=document.createElement(`div`);e.id=`dt-flash`,e.style.cssText=`
    position:fixed;inset:0;z-index:99994;
    background:rgba(200,169,126,0.07);
    pointer-events:none;opacity:0;
    transition:opacity 0.18s ease;
  `,document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.opacity=`1`})),await L(210),e.style.opacity=`0`,setTimeout(()=>e.remove(),230)}async function z(e){window.location.hash!==e&&pt(),window.location.hash===e&&(window.location.hash=`#_nav`,await L(150)),window.location.hash=e,await L(450)}function B(e,t,n=2e3){return new Promise(r=>{let i=()=>document.querySelector(e)||(t?document.querySelector(t):null),a=i();if(a){r(a);return}let o=new MutationObserver(()=>{let e=i();e&&(o.disconnect(),clearTimeout(s),r(e))});o.observe(document.body,{childList:!0,subtree:!0});let s=setTimeout(()=>{o.disconnect(),r(document.getElementById(`page-content`)||document.body)},n)})}var mt={username:`Alp`,archetypeName:`The Elegant Minimalist`,description:`You are drawn to understated sophistication - scents that whisper rather than shout. Your olfactory identity is defined by clean precision, refined florals, and the quiet depth of woody bases. You seek harmony, not performance.`,primaryFamilies:[`floral`,`woody`,`citrus`],sillageProfile:`Medium - intimate yet memorable, discovered only in close proximity.`,notePreferences:{loves:[`iris`,`sandalwood`,`bergamot`,`white musk`],explore:[`oud`,`rose`,`vetiver`,`ambergris`],avoid:[`heavy synthetics`,`excessive sweetness`,`dense patchouli`]},recommendedRegions:[`scandinavian`,`mediterranean`,`eastasia`],updatedAt:Date.now()},ht=`monaccord_profile`,gt=`monaccord_quiz_state`,V=``,H=null,U=null,W=void 0,G=[{title:`Mon Accord`,run:async()=>(await z(`#landing`),window.scrollTo({top:0,behavior:`auto`}),await B(`#hero-section .hero__content`,`#hero-section`,2e3)),duration:3500},{title:`Six World Regions`,run:async()=>{let e=document.querySelector(`#regions-section`);return e&&await R(e,60),document.querySelector(`.region-card`)||e||document.querySelector(`.page__container`)},duration:4e3},{title:`Spray & Oil Notes`,run:async()=>(document.querySelector(`.notes-popup`)?.remove(),document.querySelector(`.region-format-btn[data-format="spray"]`)?.click(),await L(250),document.querySelector(`.notes-popup`)?.scrollIntoView({behavior:`smooth`,block:`nearest`}),await L(300),document.querySelector(`.notes-popup__inner`)||document.querySelector(`#regions-section`)),duration:4e3},{title:`Take the Quiz`,samePage:!0,run:async()=>{document.querySelector(`.notes-popup`)?.remove();let e=document.querySelector(`#cta-section`);e?e.scrollIntoView({behavior:`smooth`,block:`center`}):window.scrollTo({top:document.body.scrollHeight,behavior:`smooth`}),await L(700);let t=document.querySelector(`#bottom-cta`);return t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),await L(500)),t||document.querySelector(`#cta-section`)||document.querySelector(`.page__container`)},duration:3e3},{title:`Step 1 - Your Name`,run:async()=>{document.querySelector(`.notes-popup`)?.remove(),localStorage.removeItem(gt),window.__retakeQuiz=!0,await z(`#profile`);let e=await B(`.quiz-container`,`.page__container`,2500);await L(300);let t=document.querySelector(`#quiz-username`);if(t){t.focus();for(let e of`Alp`)t.value+=e,t.dispatchEvent(new Event(`input`)),await L(120)}return e},duration:2500},{title:`Step 2 - Scent Families`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await L(400);let e=[...document.querySelectorAll(`.quiz-grid--families .quiz-option`)];for(let t of e.slice(0,3))t.click(),await L(280);return document.querySelector(`.quiz-grid--families`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 3 - Perfumes You Love`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await L(450);let e=[...document.querySelectorAll(`.quiz-option--perfume`)];for(let t of e.slice(0,2))t.click(),await L(220);return document.querySelector(`.quiz-perfume-list`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 4 - Performance`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await L(400);for(let e of[{id:`slider-sillage`,valId:`sillage-val`,target:7},{id:`slider-longevity`,valId:`longevity-val`,target:10},{id:`slider-intensity`,valId:`intensity-val`,target:5}]){let t=document.querySelector(`#`+e.id);t&&(t.value=e.target,t.dispatchEvent(new Event(`input`,{bubbles:!0})),await L(350))}return document.querySelector(`.quiz-sliders`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 5 - Your Personality`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await L(400),(document.querySelector(`[id="ctx-elegant"]`)||document.querySelector(`.quiz-grid--context .quiz-option`))?.click(),await L(300);let e=document.querySelector(`#quiz-notes`);if(e){e.focus();for(let t of`I love the scent of fresh linen and evening air.`)e.value+=t,e.dispatchEvent(new Event(`input`)),await L(38)}return document.querySelector(`.quiz-grid--context`)||document.querySelector(`.quiz-container`)},duration:5500},{title:`Your Olfactory Profile`,run:async()=>(localStorage.setItem(ht,JSON.stringify(mt)),localStorage.setItem(`monaccord_my_perfumes`,JSON.stringify({monAccord:[`scandinavian-spray`,`eastasia-spray`,`mediterranean-oil`],loreal:[`ysl-libre`,`ysl-black-opium`]})),window.__retakeQuiz=!1,window.dispatchEvent(new Event(`hashchange`)),await L(500),window.scrollTo({top:0,behavior:`auto`}),await B(`.profile-result`,`.page__container`,3e3),document.querySelector(`.section-header`)||document.querySelector(`.profile-result`)||document.querySelector(`.page__container`)),duration:4e3},{title:`Identity & Preferences`,run:async()=>{let e=document.querySelector(`.profile-overview`),t=document.querySelector(`.profile-details`)||e;return await R(e),t||document.querySelector(`.profile-result`)},duration:4e3},{title:`Mon Accord Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`)[0],t=e?.previousElementSibling?.previousElementSibling||e,n=e?.querySelector(`.combo-card`)||e;return await R(t||n,80),n||document.querySelector(`.profile-result`)},duration:4e3},{title:`L'Oreal Luxe Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`),t=e.length>1?e[1]:e[0],n=t?.previousElementSibling?.previousElementSibling||t,r=t?.querySelector(`.combo-card`)||t;return await R(n||r,80),r||document.querySelector(`.profile-result`)},duration:4e3},{title:`Shop - Build Your Collection`,run:async()=>{let e=document.querySelector(`[data-buy-combo]`);return e?(e.click(),await L(600)):await z(`#shop`),await B(`.shop-region-card`,`.shop-layout`,2e3)},duration:4e3},{title:`Add to Cart`,run:async()=>{let e=[...document.querySelectorAll(`.shop-product__btn:not(.shop-product__btn--added)`)];e[0]&&(e[0].click(),await L(180)),e[1]&&(e[1].click(),await L(180));let t=document.querySelector(`.shop-cart`);return t?.scrollIntoView({behavior:`smooth`,block:`center`}),await L(300),t||document.querySelector(`.page__container`)},duration:4e3},{title:`Now Available`,run:async()=>(document.querySelector(`#btn-confirm-order`)?.click(),await L(350),document.querySelector(`.order-confirmed-modal`)||document.querySelector(`.modal-overlay`)||document.querySelector(`.page__container`)),duration:4e3},{title:`The Layering Lab`,run:async()=>{document.querySelector(`.modal-overlay`)?.remove(),await z(`#lab`),window.scrollTo({top:0,behavior:`auto`}),await L(200);let e=[...document.querySelectorAll(`.lab-add-btn:not(.lab-add-btn--added)`)];return e[0]&&(e[0].click(),await L(200)),e[2]&&(e[2].click(),await L(200)),await L(300),document.querySelector(`#lab-layers`)||document.querySelector(`#lab-add-section`)},duration:5e3},{title:`Virtual Scent Simulation`,samePage:!0,run:async()=>{let e=document.querySelector(`#btn-simulate`);e&&(await R(e),e.innerHTML=`<span class=”loading-spinner”></span> Simulating...`,e.disabled=!0,await L(1200),e.innerHTML=`✦ Simulate Scent`,e.disabled=!1);let t=document.querySelector(`#simulation-result`);if(!t){t=document.createElement(`div`),t.id=`simulation-result`,t.className=`ai-response mt-lg`;let e=document.querySelector(`#lab-actions`);e?e.insertAdjacentElement(`afterend`,t):document.querySelector(`#lab-layers`)?.appendChild(t)}return t&&(t.style.display=``,t.innerHTML=`
          <div class=”ai-response__label”>✦ Virtual Scent Simulation</div>
          <div class=”ai-response__text”>
            <p><strong style=”color: var(--accent);”>OPENING:</strong> A bright burst of bergamot and yuzu zest — sparkling, citrus-forward, immediately uplifting.</p>
            <p><strong style=”color: var(--accent);”>HEART:</strong> The iris and white tea settle into a soft floral corridor, whispering elegance without weight.</p>
            <p><strong style=”color: var(--accent);”>DRY DOWN:</strong> Sandalwood and sheer musk create a warm, skin-close finish that lingers for hours.</p>
            <p><strong style=”color: var(--accent);”>SILLAGE:</strong> Medium — intimate yet memorable, discovered only in close proximity.</p>
          </div>
        `,await R(t)),t||document.querySelector(`#lab-layers`)||document.querySelector(`.page__container`)},duration:4500},{title:`Contextual Advisor`,run:async()=>{let e=document.querySelector(`.lab-advisor`);await R(e),document.querySelector(`#mood-chips .lab-chip`)?.click(),await L(100),document.querySelector(`#occasion-chips .lab-chip`)?.click(),await L(100),document.querySelector(`#season-chips .lab-chip`)?.click(),await L(250);let t=document.querySelector(`#advisor-result`);return t||(t=document.createElement(`div`),t.id=`advisor-result`,t.className=`lab-advisor__result mt-lg`,document.querySelector(`.lab-advisor__form`)?.insertAdjacentElement(`afterend`,t)),t&&(t.style.display=``,t.innerHTML=`
          <div style="padding:var(--space-md);background:rgba(200,169,126,0.06);border-radius:var(--radius-md);border:1px solid rgba(200,169,126,0.18);">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">Combination Tip</div>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.65;margin:0;">
              For a <strong style="color:var(--text-primary);">romantic evening</strong>, your current blend reads beautifully - the bergamot top note softens into the woody base creating quiet intimacy. Consider adding a touch of rose absolute to amplify the floral heart without overpowering the composition.
            </p>
          </div>
        `),t||document.querySelector(`.lab-advisor__form`)||e||document.querySelector(`.page__container`)},duration:5e3},{title:`Save to Vault`,samePage:!0,run:async()=>{let e=await B(`#btn-save-formula`,`.page__container`,1200);e&&e.id===`btn-save-formula`&&(await R(e),e.click(),await L(450));let t=await B(`#save-vault-overlay .modal`,`#save-vault-overlay`,2e3),n=document.querySelector(`#sv-name`);if(n){n.value=``,n.focus();for(let e of`Evening Velvet`)n.value+=e,n.dispatchEvent(new Event(`input`)),await L(55);await L(300)}let r=document.querySelector(`#sv-folder-dropdown`);if(r){let e=[...r.options].find(e=>e.value===`evening`||e.text.toLowerCase().includes(`evening`));e&&(r.value=e.value,r.dispatchEvent(new Event(`change`))),await L(400)}return t||document.querySelector(`#save-vault-overlay`)||document.querySelector(`.page__container`)},duration:4500},{title:`Your Vault`,run:async()=>(document.querySelector(`#sv-confirm`)?.click(),await L(350),await z(`#vault`),await B(`.vault-folders-col`,`.page__container`,2e3)),duration:4e3},{title:`My Perfumes`,samePage:!0,run:async()=>{let e=document.querySelector(`.vault-myperfumes-col`);return window.scrollTo({top:0,behavior:`smooth`}),await L(400),e||document.querySelector(`.vault-main-layout`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Trending Combinations`,run:async()=>{await z(`#community`);let e=document.querySelector(`.duygu-card__photo`);return e&&!e.complete&&await new Promise(t=>{e.onload=t,e.onerror=t,setTimeout(t,3e3)}),await L(200),await B(`.community-trending-item`,`.community-trending-list`,2e3)},duration:4e3},{title:`Today's Selection`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-panel--selection`);return await R(e),e||document.querySelector(`.community-top-grid`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Duygu's Choice`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-duygu-choice`);return e?(await R(e),e):document.querySelector(`.community-right-col`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Community Discussion`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-discussion-section`);return await R(e,60),document.querySelector(`.community-post-item`)?.click(),await L(300),document.querySelector(`.community-discussion-layout`)||e||document.querySelector(`.page__container`)},duration:4500}],_t=[3e3,3500,3500,3e3,2500,2500,2500,2500,5e3,4500,3e3,4e3,3e3,3500,3500,3500,4500,4500,4e3,3500,3500,3500,3500,3e3,3500,3500];G.forEach((e,t)=>{e.duration=_t[t]??e.duration});function vt(){return document.getElementById(`dt-card`)}function yt(){return document.getElementById(`dt-prog`)}function bt(){return document.getElementById(`dt-cd`)}function xt(){return document.getElementById(`dt-dots`)}function St(){return document.getElementById(`dt-count`)}function Ct(){return document.getElementById(`dt-title`)}function wt(){return document.getElementById(`dt-next`)}var Tt=24,K=20;function Et(e){let t=vt();if(!t)return;let n=window.innerWidth,r=window.innerHeight,i=Tt,a=Math.min(t.offsetWidth||288,n-i*2),o=t.offsetHeight||126,s=e?e.getBoundingClientRect():null;if(!s||(s.width||0)===0||(s.height||0)===0||s.bottom<=0||s.top>=r||s.right<=0||s.left>=n){let e=Math.min(n-i*2,320),t=Math.min(r-i*2,160);s={left:(n-e)/2,top:(r-t)/2,right:(n+e)/2,bottom:(r+t)/2}}let c=s.right-s.left,l=s.bottom-s.top,u=[{placement:`bottom`,x:s.left+(c-a)/2,y:s.bottom+K},{placement:`top`,x:s.left+(c-a)/2,y:s.top-o-K},{placement:`right`,x:s.right+K,y:s.top+(l-o)/2},{placement:`left`,x:s.left-a-K,y:s.top+(l-o)/2},{placement:`bottom-right`,x:s.right-a,y:s.bottom+K},{placement:`bottom-left`,x:s.left,y:s.bottom+K},{placement:`top-right`,x:s.right-a,y:s.top-o-K},{placement:`top-left`,x:s.left,y:s.top-o-K}];function d(e){let t=ut(e.x,i,Math.max(i,n-a-i)),s=ut(e.y,i,Math.max(i,r-o-i));return{placement:e.placement,left:t,top:s,right:t+a,bottom:s+o,clampDelta:Math.abs(e.x-t)+Math.abs(e.y-s)}}function f(e){let t=(e.left+e.right)/2,n=(e.top+e.bottom)/2,r=(s.left+s.right)/2,i=(s.top+s.bottom)/2;return Math.hypot(t-r,n-i)}function p(e){let t=Math.max(e.left,s.left),n=Math.max(e.top,s.top),r=Math.min(e.right,s.right),i=Math.min(e.bottom,s.bottom);return r>t&&i>n?(r-t)*(i-n):0}let m=u.map(e=>{let t=d(e);return{rect:t,score:p(t)*4+f(t)+t.clampDelta*6}}).sort((e,t)=>e.score-t.score)[0];t.dataset.placement=m.rect.placement,t.style.transform=`translate(${Math.round(m.rect.left)}px, ${Math.round(m.rect.top)}px)`}function Dt(e){let t=G[e],n=G.length,r=St(),i=Ct(),a=xt(),o=yt(),s=wt();if(r&&(r.textContent=`${String(e+1).padStart(2,`0`)} / ${String(n).padStart(2,`0`)}`),i&&(i.textContent=t.title),o&&(o.style.width=`${(e+1)/n*100}%`),s&&(s.textContent=e===n-1?`Finish`:`Next`),a){let t=Math.min(n,12),r=Math.max(0,e-Math.floor(t/2));a.innerHTML=Array.from({length:t},(t,n)=>{let i=n+r;return`<span class="dt-dot ${i===e?`dt-dot--active`:i<e?`dt-dot--done`:`dt-dot--pending`}"></span>`}).join(``)}}var q=null;function Ot(e){clearInterval(q);let t=bt();if(!t)return;t.style.width=`0%`;let n=Date.now();q=setInterval(()=>{let r=Math.min(100,(Date.now()-n)/e*100);t.style.width=r+`%`,r>=100&&clearInterval(q)},40)}var J=!1,Y=0,X=null;async function kt(e){if(!J)return;Y=e;let t=G[e];Dt(e);let n;try{n=await t.run()}catch{n=document.getElementById(`page-content`)||document.body}J&&(Et(n),Ot(t.duration),clearTimeout(X),X=setTimeout(()=>At(),t.duration))}function At(){J&&(clearTimeout(X),Y>=G.length-1?Z():kt(Y+1))}function jt(){Mt(),Pt();let e=document.createElement(`div`);e.id=`dt-card`,e.innerHTML=`
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
  `,document.body.appendChild(e),document.getElementById(`dt-skip`).addEventListener(`click`,Z),document.getElementById(`dt-next`).addEventListener(`click`,()=>{clearTimeout(X),clearInterval(q),At()})}function Mt(){document.getElementById(`dt-card`)?.remove(),document.getElementById(`dt-flash`)?.remove()}function Nt(){J&&Z(),V=window.location.hash||``,H=dt(localStorage),U=dt(sessionStorage),W=window.__retakeQuiz,localStorage.clear(),sessionStorage.clear(),delete window.__retakeQuiz,localStorage.removeItem(ht),J=!0,Y=0,jt(),kt(0)}function Z(){J=!1,clearTimeout(X),clearInterval(q),ft(localStorage,H),ft(sessionStorage,U),H=null,U=null,W===void 0?delete window.__retakeQuiz:window.__retakeQuiz=W,W=void 0,(V||``)!==(window.location.hash||``)&&(window.location.hash=V||`#landing`),V=``,Mt()}function Pt(){if(document.getElementById(`dt-styles`))return;let e=document.createElement(`style`);e.id=`dt-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var Q=document.getElementById(`app`);function $(e){document.documentElement.setAttribute(`data-theme`,e),t.set(`theme`,e)}function Ft(){let e=t.get(`theme`,`dark`);document.documentElement.setAttribute(`data-theme`,e)}var It={"":f,"#landing":f,"#profile":de,"#lab":Pe,"#vault":Ue,"#shop":ot,"#community":Ze};function Lt(){return window.location.hash||``}function Rt(e){window.location.hash=e}function zt(){let e=Lt(),t=It[e]||f;Q.innerHTML=``,Q.appendChild(n(Rt,e));let r=document.createElement(`div`);if(r.className=`page page-enter`,r.id=`page-content`,t(r,Rt),Q.appendChild(r),!document.querySelector(`.toast-container`)){let e=document.createElement(`div`);e.className=`toast-container`,e.id=`toast-container`,document.body.appendChild(e)}window.scrollTo({top:0,behavior:`auto`})}window.showToast=function(e,t=`success`){let n=document.getElementById(`toast-container`);if(!n)return;let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.innerHTML=`<span class="toast__message">${e}</span>`,n.appendChild(r),setTimeout(()=>{r.style.animation=`fadeOut 0.3s var(--ease-out) forwards`,setTimeout(()=>r.remove(),300)},3e3)},window.showSettings=function(){let e=document.querySelector(`.modal-overlay`);e&&e.remove();let n=t.get(`theme`,`dark`),r=document.createElement(`div`);r.className=`modal-overlay`,r.id=`settings-modal`,r.innerHTML=`
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">Settings</h3>
        <button class="modal__close" id="close-settings">✕</button>
      </div>
      <div class="modal__body">

        <!-- Appearance -->
        <div class="input-group">
          <label class="input-label">Appearance</label>
          <div style="display:flex; gap:var(--space-md); margin-top:var(--space-sm);">

            <button id="theme-opt-dark" data-theme-opt="dark" style="
              flex:1; padding:var(--space-md); border-radius:var(--radius-lg);
              border: 2px solid ${n===`dark`?`var(--accent)`:`var(--border)`};
              background: ${n===`dark`?`var(--accent-bg)`:`var(--surface)`};
              cursor:pointer; transition: all var(--transition-fast);
              display:flex; flex-direction:column; align-items:center; gap:var(--space-sm);
            ">
              <div style="
                width:100%; height:52px; border-radius:var(--radius-md); overflow:hidden;
                background:#0A0A0A; border:1px solid rgba(255,255,255,0.08);
                display:flex; flex-direction:column; gap:3px; padding:6px;
              ">
                <div style="height:7px; border-radius:3px; background:rgba(255,255,255,0.12); width:60%;"></div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(201,169,110,0.15); border:1px solid rgba(201,169,110,0.2);"></div>
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);"></div>
                </div>
              </div>
              <span style="font-size:var(--text-xs); font-weight:600; color:${n===`dark`?`var(--accent)`:`var(--text-secondary)`}; letter-spacing:0.05em;">DARK</span>
            </button>

            <button id="theme-opt-light" data-theme-opt="light" style="
              flex:1; padding:var(--space-md); border-radius:var(--radius-lg);
              border: 2px solid ${n===`light`?`var(--accent)`:`var(--border)`};
              background: ${n===`light`?`var(--accent-bg)`:`var(--surface)`};
              cursor:pointer; transition: all var(--transition-fast);
              display:flex; flex-direction:column; align-items:center; gap:var(--space-sm);
            ">
              <div style="
                width:100%; height:52px; border-radius:var(--radius-md); overflow:hidden;
                background:#FAFAF8; border:1px solid rgba(26,26,46,0.08);
                display:flex; flex-direction:column; gap:3px; padding:6px;
              ">
                <div style="height:7px; border-radius:3px; background:rgba(26,26,46,0.12); width:60%;"></div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                  <div style="flex:1; height:20px; border-radius:3px; background:rgba(200,169,126,0.12); border:1px solid rgba(200,169,126,0.25);"></div>
                  <div style="flex:1; height:20px; border-radius:3px; background:#FFFFFF; border:1px solid rgba(26,26,46,0.08);"></div>
                </div>
              </div>
              <span style="font-size:var(--text-xs); font-weight:600; color:${n===`light`?`var(--accent)`:`var(--text-secondary)`}; letter-spacing:0.05em;">LIGHT</span>
            </button>

          </div>
        </div>

        <!-- Profile -->
        <div class="input-group" style="margin-top:var(--space-lg); padding-top:var(--space-lg); border-top:1px solid var(--border);">
          <label class="input-label">Profile</label>
          ${t.getProfile()?`<p style="font-size:var(--text-sm); color:var(--text-secondary);">Archetype: <strong>${t.getProfile().archetypeName||`Set`}</strong></p>
               <button class="btn btn--ghost btn--sm mt-sm" id="reset-profile-btn" style="color:#e74c3c;">Reset All Data</button>`:`<p style="font-size:var(--text-sm); color:var(--text-tertiary);">No profile created yet.</p>`}
        </div>

        <!-- Demo -->
        <div class="input-group" style="margin-top:var(--space-lg); padding-top:var(--space-lg); border-top:1px solid var(--border);">
          <label class="input-label">Demo</label>
          <button class="btn btn--secondary btn--sm" id="settings-demo-btn">▶ Watch Demo</button>
        </div>

      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="cancel-settings">Cancel</button>
        <button class="btn btn--primary" id="save-settings">Save</button>
      </div>
    </div>
  `,document.body.appendChild(r);let i=n;function a(e){i=e,$(e),[`dark`,`light`].forEach(t=>{let n=r.querySelector(`#theme-opt-${t}`);if(!n)return;let i=t===e;n.style.borderColor=i?`var(--accent)`:`var(--border)`,n.style.background=i?`var(--accent-bg)`:`var(--surface)`,n.querySelector(`span`).style.color=i?`var(--accent)`:`var(--text-secondary)`})}r.querySelector(`#theme-opt-dark`).onclick=()=>a(`dark`),r.querySelector(`#theme-opt-light`).onclick=()=>a(`light`),r.querySelector(`#close-settings`).onclick=()=>{$(n),r.remove()},r.querySelector(`#cancel-settings`).onclick=()=>{$(n),r.remove()},r.onclick=e=>{e.target===r&&($(n),r.remove())},r.querySelector(`#save-settings`).onclick=()=>{$(i),window.showToast(`Settings saved!`),r.remove()};let o=r.querySelector(`#reset-profile-btn`);o&&(o.onclick=()=>{[`profile`,`quiz_state`,`vault`,`interactions`,`likes`,`my_perfumes`,`pending_shop_cart`,`shop_cart`,`community_posts`,`post_likes`,`vault_folders`].forEach(e=>t.remove(e)),sessionStorage.clear(),window.showToast(`All data cleared. Starting fresh!`),r.remove(),zt()});let s=r.querySelector(`#settings-demo-btn`);s&&(s.onclick=()=>{r.remove(),typeof window.startDemoTour==`function`&&window.startDemoTour()})},window.startDemoTour=Nt,window.endDemoTour=Z,Ft(),window.addEventListener(`hashchange`,zt),zt();