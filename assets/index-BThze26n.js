var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=`monaccord_`,u={get(e,t=null){try{let n=localStorage.getItem(l+e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(l+e,JSON.stringify(t))}catch(e){console.warn(`Storage write failed:`,e)}},remove(e){localStorage.removeItem(l+e)},getProfile(){return this.get(`profile`,null)},setProfile(e){this.set(`profile`,{...e,updatedAt:Date.now()})},getVault(){return this.get(`vault`,[])},saveFormula(e){let t=this.getVault(),n=t.findIndex(t=>t.id===e.id);return n>=0?t[n]={...e,savedAt:Date.now()}:t.push({...e,id:e.id||`f-`+Date.now(),savedAt:Date.now()}),this.set(`vault`,t),this.addInteraction({type:`save`,formulaId:e.id,timestamp:Date.now()}),t},removeFormula(e){let t=this.getVault().filter(t=>t.id!==e);return this.set(`vault`,t),t},getInteractions(){return this.get(`interactions`,[])},addInteraction(e){let t=this.getInteractions();t.push({...e,timestamp:e.timestamp||Date.now()}),t.length>500&&t.splice(0,t.length-500),this.set(`interactions`,t)},getLikes(){return this.get(`likes`,[])},toggleLike(e){let t=this.getLikes(),n=t.indexOf(e);return n>=0?(t.splice(n,1),this.addInteraction({type:`unlike`,formulaId:e,timestamp:Date.now()})):(t.push(e),this.addInteraction({type:`like`,formulaId:e,timestamp:Date.now()})),this.set(`likes`,t),t},isLiked(e){return this.getLikes().includes(e)},getOwnedPerfumes(){let e=this.get(`my_perfumes`,null);return Array.isArray(e)?{monAccord:e.map(e=>e.id),loreal:[]}:e||{monAccord:[],loreal:[]}},setOwnedPerfumes(e){this.set(`my_perfumes`,e)},getApiKey(){return this.get(`gemini_api_key`,``)},setApiKey(e){this.set(`gemini_api_key`,e)},getQuizState(){return this.get(`quiz_state`,null)},setQuizState(e){this.set(`quiz_state`,e)},clearQuizState(){this.remove(`quiz_state`)},setPendingShopCart(e){this.set(`pending_shop_cart`,e)},consumePendingShopCart(){let e=this.get(`pending_shop_cart`,[]);return this.remove(`pending_shop_cart`),Array.isArray(e)?e:[]},getShopCart(){let e=this.get(`shop_cart`,[]);return Array.isArray(e)?e:[]},setShopCart(e){this.set(`shop_cart`,e)},clearShopCart(){this.remove(`shop_cart`)},getUsername(){return this.getProfile()?.username||`Anonymous`},getPosts(){return this.get(`community_posts`,[])},setPosts(e){this.set(`community_posts`,e)},getPostLikes(){return this.get(`post_likes`,[])},togglePostLike(e){let t=this.getPostLikes(),n=t.indexOf(e);return n>=0?t.splice(n,1):t.push(e),this.set(`post_likes`,t),t},isPostLiked(e){return this.getPostLikes().includes(e)}};function d(e,t){let n=document.createElement(`nav`);return n.className=`navbar`,n.id=`main-nav`,u.getProfile(),n.innerHTML=`
    <div class="navbar__brand">
      <a href="#landing" class="navbar__logo" id="nav-brand">
        MON ACCORD
        <span class="navbar__logo-sub">by L'Oreal Luxe</span>
      </a>
    </div>
    <div class="navbar__links" id="nav-links">
      ${[{hash:`#landing`,label:`Home`,always:!0},{hash:`#profile`,label:`Profile`,always:!0},{hash:`#lab`,label:`Layering Lab`,always:!0},{hash:`#vault`,label:`Vault`,always:!0},{hash:`#shop`,label:`Shop`,always:!0},{hash:`#community`,label:`Community`,always:!0}].map(e=>`
        <a href="${e.hash}" class="navbar__link ${t===e.hash||t===``&&e.hash===`#landing`?`active`:``}" id="nav-${e.hash.replace(`#`,``)}">${e.label}</a>
      `).join(``)}
    </div>
    <button class="navbar__settings-btn" id="nav-settings-btn" title="Settings">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    </button>
  `,setTimeout(()=>{window.addEventListener(`scroll`,()=>{let e=document.getElementById(`main-nav`);e&&e.classList.toggle(`scrolled`,window.scrollY>10)},{passive:!0})},0),n.querySelector(`#nav-settings-btn`).addEventListener(`click`,()=>{window.showSettings()}),n}var f=[{id:`scandinavian`,name:`Scandinavian`,tagline:`Crisp Nordic Purity`,description:`Inspired by the pristine landscapes of the North — frozen lakes, evergreen forests, and Arctic air. A study in minimalist elegance and crystalline freshness.`,color:`#7BA7BC`,colorLight:`#A8D0E0`,gradient:`linear-gradient(135deg, #7BA7BC, #A8D0E0)`,icon:``},{id:`eastasia`,name:`East Asia`,tagline:`Zen Garden Harmony`,description:`Drawing from centuries of incense tradition, temple gardens, and the quiet beauty of cherry blossoms. Delicate balance meets deep-rooted sophistication.`,color:`#D4A0A0`,colorLight:`#EACFCF`,gradient:`linear-gradient(135deg, #D4A0A0, #EACFCF)`,icon:``},{id:`southafrica`,name:`South Africa`,tagline:`Wild Earth Warmth`,description:`The raw beauty of the Cape — fynbos-covered mountains, red earth, and the warm embrace of rooibos. Bold, grounding, and unmistakably alive.`,color:`#C4956A`,colorLight:`#DDB892`,gradient:`linear-gradient(135deg, #C4956A, #DDB892)`,icon:``},{id:`mediterranean`,name:`Mediterranean`,tagline:`Sun-Kissed Coast`,description:`The luminous spirit of the Mediterranean shore — sun-warmed citrus groves, herb-scented hillsides, and sea-salt breezes through olive trees.`,color:`#7BAF8E`,colorLight:`#A8D4B8`,gradient:`linear-gradient(135deg, #7BAF8E, #A8D4B8)`,icon:``},{id:`southamerica`,name:`South America`,tagline:`Tropical Depth`,description:`The lush intensity of Amazonian rainforests — rich earth, exotic botanicals, and the sweet warmth of tonka and cocoa beneath a canopy of green.`,color:`#8B9F6B`,colorLight:`#B0C490`,gradient:`linear-gradient(135deg, #8B9F6B, #B0C490)`,icon:``},{id:`middleeast`,name:`Middle East`,tagline:`Ancient Opulence`,description:`The timeless luxury of Arabian perfumery — precious oud, damask rose, golden saffron, and the whisper of musk in palace halls. Richness without restraint.`,color:`#B8879B`,colorLight:`#D4ADC0`,gradient:`linear-gradient(135deg, #B8879B, #D4ADC0)`,icon:``}],p=[{id:`scandinavian-spray`,name:`Scandinavian - Spray`,region:`scandinavian`,format:`spray`,topNotes:[`bergamot ice`,`frozen mint`,`arctic birch`],middleNotes:[`white tea`,`sea moss`,`juniper berry`],baseNotes:[`pine resin`,`white musk`,`driftwood`],sillage:4,longevity:5,intensity:3,scentFamily:`fresh`,layeringRole:`brightener`,description:`A crisp, transparent spray that opens with an icy burst of bergamot and settles into a serene blend of white tea and Nordic pine.`},{id:`scandinavian-oil`,name:`Scandinavian - Oil`,region:`scandinavian`,format:`oil`,topNotes:[`frozen violet leaf`,`cold air accord`],middleNotes:[`birch sap`,`white tea`,`lichen`],baseNotes:[`cedarwood`,`clean musk`,`mineral stone`],sillage:2,longevity:7,intensity:4,scentFamily:`fresh`,layeringRole:`base-anchor`,description:`An intimate oil concentrate that wraps the skin in soft birch and cedarwood, creating a whispering Nordic calm that lasts all day.`},{id:`eastasia-spray`,name:`East Asia - Spray`,region:`eastasia`,format:`spray`,topNotes:[`sakura blossom`,`yuzu`,`shiso leaf`],middleNotes:[`green tea`,`bamboo`,`rice steam`],baseNotes:[`hinoki wood`,`white sandalwood`,`silk musk`],sillage:5,longevity:6,intensity:4,scentFamily:`floral-green`,layeringRole:`harmonizer`,description:`A delicate spray that captures the ephemeral beauty of sakura season — yuzu brightness melting into green tea serenity over warm hinoki.`},{id:`eastasia-oil`,name:`East Asia - Oil`,region:`eastasia`,format:`oil`,topNotes:[`osmanthus`,`rice milk`],middleNotes:[`sakura`,`matcha`,`bamboo heart`],baseNotes:[`hinoki`,`shiso`,`incense smoke`],sillage:3,longevity:8,intensity:5,scentFamily:`floral-woody`,layeringRole:`depth-builder`,description:`A contemplative oil that unfolds like a tea ceremony — osmanthus and rice milk yielding to the meditative warmth of temple incense.`},{id:`southafrica-spray`,name:`South Africa - Spray`,region:`southafrica`,format:`spray`,topNotes:[`wild fynbos`,`bergamot`,`pink pepper`],middleNotes:[`rooibos tea`,`honeybush`,`geranium`],baseNotes:[`vanilla bean`,`earth accord`,`coffee absolute`],sillage:6,longevity:7,intensity:6,scentFamily:`warm-spicy`,layeringRole:`statement`,description:`A bold spray that captures the untamed spirit of the Cape — wild fynbos opening into warm rooibos, grounded by rich vanilla and coffee.`},{id:`southafrica-oil`,name:`South Africa - Oil`,region:`southafrica`,format:`oil`,topNotes:[`buchu leaf`,`sparkling citrus`],middleNotes:[`rooibos`,`fynbos`,`wild honey`],baseNotes:[`coffee`,`vanilla`,`red earth`,`tonka`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`base-anchor`,description:`A sumptuous oil that stays close to the skin like a warm embrace — deep vanilla and coffee woven through with the wild sweetness of fynbos honey.`},{id:`mediterranean-spray`,name:`Mediterranean - Spray`,region:`mediterranean`,format:`spray`,topNotes:[`lemon zest`,`bergamot`,`orange blossom`],middleNotes:[`fig leaf`,`olive blossom`,`lavender`],baseNotes:[`sea salt`,`sun-bleached wood`,`white musk`],sillage:5,longevity:5,intensity:4,scentFamily:`citrus-aromatic`,layeringRole:`brightener`,description:`Bottled sunlight — a sparkling burst of citrus and orange blossom that dries to a breezy blend of fig and Mediterranean sea salt.`},{id:`mediterranean-oil`,name:`Mediterranean - Oil`,region:`mediterranean`,format:`oil`,topNotes:[`neroli`,`bergamot`],middleNotes:[`fig milk`,`lavender absolute`,`orange blossom`],baseNotes:[`olive wood`,`lemon rind`,`ambergris`],sillage:3,longevity:8,intensity:5,scentFamily:`green-aromatic`,layeringRole:`harmonizer`,description:`A golden oil that envelops the skin in the warmth of a Mediterranean afternoon — neroli and fig milk over sun-warmed olive wood.`},{id:`southamerica-spray`,name:`South America - Spray`,region:`southamerica`,format:`spray`,topNotes:[`pink pepper`,`tropical green leaf`,`lime`],middleNotes:[`cocoa blossom`,`jungle orchid`,`mate`],baseNotes:[`tonka bean`,`vetiver`,`palo santo`],sillage:6,longevity:6,intensity:5,scentFamily:`green-woody`,layeringRole:`statement`,description:`A vibrant spray that plunges you into tropical abundance — pink pepper and lime dissolving into rich cocoa and smoky palo santo.`},{id:`southamerica-oil`,name:`South America - Oil`,region:`southamerica`,format:`oil`,topNotes:[`açaí berry`,`green mandarin`],middleNotes:[`cocoa absolute`,`tobacco flower`,`tropical green`],baseNotes:[`tonka`,`vetiver heart`,`copaiba balsam`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`depth-builder`,description:`A luxurious oil of remarkable depth — cocoa and tobacco flower resting on a bed of tonka and vetiver, intimate yet unforgettable.`},{id:`middleeast-spray`,name:`Middle East - Spray`,region:`middleeast`,format:`spray`,topNotes:[`saffron`,`pink rose`,`cardamom`],middleNotes:[`damask rose`,`oud`,`incense`],baseNotes:[`musk`,`amber`,`sandalwood`],sillage:8,longevity:8,intensity:8,scentFamily:`oriental`,layeringRole:`statement`,description:`A majestic spray that commands presence — saffron-laced rose unfolding over precious oud and golden amber. Opulent and unapologetic.`},{id:`middleeast-oil`,name:`Middle East - Oil`,region:`middleeast`,format:`oil`,topNotes:[`saffron threads`,`bergamot`],middleNotes:[`Bulgarian rose`,`oud assam`,`frankincense`],baseNotes:[`royal musk`,`amber resin`,`agarwood`],sillage:4,longevity:10,intensity:9,scentFamily:`oriental-woody`,layeringRole:`base-anchor`,description:`The crown jewel — a deeply concentrated oil of finest oud and rose, anointed with saffron and sealed in royal musk. Lasts from dawn to dusk.`}],m=[{id:`fresh`,name:`Fresh`,description:`Clean, aquatic, and invigorating`,icon:`💧`},{id:`floral`,name:`Floral`,description:`Romantic blooms and petal softness`,icon:`🌹`},{id:`woody`,name:`Woody`,description:`Warm woods and natural depth`,icon:`🌲`},{id:`oriental`,name:`Oriental`,description:`Rich, warm, and spice-laden`,icon:`✨`},{id:`citrus`,name:`Citrus`,description:`Bright, zesty, and energizing`,icon:`🍋`},{id:`gourmand`,name:`Gourmand`,description:`Sweet, edible, and comforting`,icon:`🍫`},{id:`green`,name:`Green`,description:`Leafy, herbal, and natural`,icon:`🍃`},{id:`aromatic`,name:`Aromatic`,description:`Herbal, lavender, and sage`,icon:`🌿`},{id:`spicy`,name:`Spicy`,description:`Warm spices and fiery accents`,icon:`🌶`},{id:`musky`,name:`Musky`,description:`Skin-like warmth and intimacy`,icon:`🤍`}],h=[{id:`ysl-libre`,brand:`Yves Saint Laurent`,name:`Libre EDP`,gender:`women`,family:`oriental-fougere`,topNotes:[`lavender`,`mandarin`,`black currant`],middleNotes:[`orange blossom`,`jasmine`],baseNotes:[`vanilla`,`musk`],longevity:8,sillage:7},{id:`ysl-libre-intense`,brand:`Yves Saint Laurent`,name:`Libre EDP Intense`,gender:`women`,family:`oriental-floral`,topNotes:[`mandarin`,`lavender`],middleNotes:[`orange blossom`,`lavender`],baseNotes:[`vanilla`,`musk`],longevity:9,sillage:9},{id:`ysl-libre-le-parfum`,brand:`Yves Saint Laurent`,name:`Libre Le Parfum`,gender:`women`,family:`oriental-floral`,topNotes:[`bergamot`,`saffron`],middleNotes:[`lavender`,`orange blossom`],baseNotes:[`vetiver`,`tonka`,`vanilla bourbon`],longevity:10,sillage:9},{id:`ysl-libre-absolu-platine`,brand:`Yves Saint Laurent`,name:`Libre L'Absolu Platine`,gender:`women`,family:`floral-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`orange blossom`,`aldehydes`],baseNotes:[`vanilla`,`amber`],longevity:8,sillage:7},{id:`ysl-libre-berry-crush`,brand:`Yves Saint Laurent`,name:`Libre Berry Crush`,gender:`women`,family:`fruity-floral`,topNotes:[`raspberry`],middleNotes:[`orange blossom`,`lavender`],baseNotes:[`vanilla`,`coconut`,`musk`],longevity:7,sillage:6},{id:`ysl-libre-leau-nue`,brand:`Yves Saint Laurent`,name:`Libre L'Eau Nue`,gender:`women`,family:`floral-citrus`,topNotes:[`lemon`,`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`lavender`,`musk`],longevity:4,sillage:3},{id:`ysl-black-opium`,brand:`Yves Saint Laurent`,name:`Black Opium EDP`,gender:`women`,family:`amber-vanilla`,topNotes:[`pear`,`pink pepper`],middleNotes:[`coffee`,`jasmine`,`orange blossom`],baseNotes:[`vanilla`,`cedar`,`patchouli`],longevity:8,sillage:8},{id:`ysl-black-opium-le-parfum`,brand:`Yves Saint Laurent`,name:`Black Opium Le Parfum`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`pear`],middleNotes:[`coffee flower`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`],longevity:9,sillage:9},{id:`ysl-mon-paris`,brand:`Yves Saint Laurent`,name:`Mon Paris EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`strawberry`,`raspberry`,`pear`],middleNotes:[`peony`,`datura`],baseNotes:[`patchouli`,`white musk`],longevity:7,sillage:7},{id:`ysl-myslf`,brand:`Yves Saint Laurent`,name:`MYSLF EDP`,gender:`men`,family:`woody-floral`,topNotes:[`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`,`ambrofix`],longevity:7,sillage:6},{id:`ysl-myslf-absolu`,brand:`Yves Saint Laurent`,name:`MYSLF L'Absolu`,gender:`men`,family:`spicy-floral-woody`,topNotes:[`bergamot`,`ginger`,`cardamom`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`],longevity:8,sillage:7},{id:`ysl-y-edp`,brand:`Yves Saint Laurent`,name:`Y EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`ginger`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`tonka`],longevity:7,sillage:6},{id:`ysl-y-le-parfum`,brand:`Yves Saint Laurent`,name:`Y Le Parfum`,gender:`men`,family:`aromatic-amber`,topNotes:[`ginger`,`bergamot`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`incense`],longevity:9,sillage:8},{id:`ysl-y-edt`,brand:`Yves Saint Laurent`,name:`Y EDT`,gender:`men`,family:`aromatic-fresh`,topNotes:[`apple`,`ginger`,`bergamot`],middleNotes:[`sage`,`juniper`],baseNotes:[`cedar`,`vetiver`,`olibanum`],longevity:5,sillage:5},{id:`ysl-la-nuit`,brand:`Yves Saint Laurent`,name:`La Nuit de L'Homme EDT`,gender:`men`,family:`spicy-oriental`,topNotes:[`cardamom`,`bergamot`,`lavender`],middleNotes:[`cedar`,`vetiver`],baseNotes:[`coumarin`,`tonka`],longevity:5,sillage:5},{id:`ysl-lhomme`,brand:`Yves Saint Laurent`,name:`L'Homme EDT`,gender:`men`,family:`floral-woody`,topNotes:[`ginger`,`bergamot`],middleNotes:[`white pepper`,`violet leaf`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`ysl-tuxedo`,brand:`Yves Saint Laurent`,name:`Tuxedo (Le Vestiaire)`,gender:`unisex`,family:`spicy-woody`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`black pepper`,`patchouli`],baseNotes:[`cedar`,`incense`,`musk`],longevity:9,sillage:8},{id:`armani-si`,brand:`Giorgio Armani`,name:`Sì EDP`,gender:`women`,family:`chypre-fruity`,topNotes:[`black currant`,`mandarin`],middleNotes:[`may rose`,`neroli`],baseNotes:[`vanilla`,`patchouli`,`amber`],longevity:7,sillage:7},{id:`armani-si-passione`,brand:`Giorgio Armani`,name:`Sì Passione EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`black currant`,`pink pepper`,`pear`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`cedar`,`white musk`],longevity:7,sillage:6},{id:`armani-my-way`,brand:`Giorgio Armani`,name:`My Way EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`cedar`,`vanilla`,`white musk`],longevity:8,sillage:7},{id:`armani-my-way-parfum`,brand:`Giorgio Armani`,name:`My Way Parfum`,gender:`women`,family:`floral-amber`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`,`amber`],longevity:9,sillage:8},{id:`armani-power-of-you`,brand:`Giorgio Armani`,name:`Power of You EDP`,gender:`women`,family:`floral-musky`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`jasmine`,`iris`],baseNotes:[`musk`,`cedar`],longevity:7,sillage:6},{id:`armani-acqua-di-gio`,brand:`Giorgio Armani`,name:`Acqua di Giò EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`neroli`,`green mandarin`],middleNotes:[`rosemary`,`jasmine`],baseNotes:[`cedar`,`patchouli`,`white musk`],longevity:4,sillage:4},{id:`armani-acqua-di-gio-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`sea notes`,`green mandarin`],middleNotes:[`sage`,`lavender`],baseNotes:[`mineral`,`vetiver`,`patchouli`],longevity:7,sillage:6},{id:`armani-acqua-di-gio-parfum`,brand:`Giorgio Armani`,name:`Acqua di Giò Parfum`,gender:`men`,family:`woody-aquatic`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`rosemary`,`sage`],baseNotes:[`olibanum`,`patchouli`],longevity:7,sillage:6},{id:`armani-adg-profondo-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDP`,gender:`men`,family:`aquatic-amber`,topNotes:[`bergamot`,`sea notes`,`green mandarin`],middleNotes:[`rosemary`,`lavender`,`cypress`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`armani-adg-profondo-edt`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rosemary`,`lavender`],baseNotes:[`patchouli`,`amber`],longevity:6,sillage:5},{id:`armani-adg-elixir`,brand:`Giorgio Armani`,name:`Acqua di Giò Elixir`,gender:`men`,family:`aromatic-woody`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`lavender`,`sage`],baseNotes:[`oudh`,`amber`,`patchouli`],longevity:9,sillage:8},{id:`armani-adg-edp-intense`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP Intense`,gender:`men`,family:`aromatic-woody`,topNotes:[`bergamot`,`mandarin`],middleNotes:[`rosemary`,`clary sage`],baseNotes:[`vetiver`,`patchouli`,`incense`],longevity:8,sillage:7},{id:`armani-code-parfum`,brand:`Giorgio Armani`,name:`Armani Code Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`iris`,`bergamot`],middleNotes:[`lavender`,`iris`],baseNotes:[`tonka`,`vanilla`],longevity:8,sillage:8},{id:`armani-code-edt`,brand:`Giorgio Armani`,name:`Armani Code EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`lemon`],middleNotes:[`olive blossom`,`star anise`],baseNotes:[`guaiac wood`,`tonka`],longevity:5,sillage:5},{id:`armani-stronger-with-you`,brand:`Giorgio Armani`,name:`Stronger With You Intensely`,gender:`men`,family:`amber-vanilla`,topNotes:[`pink pepper`,`violet leaf`],middleNotes:[`chestnut`,`cinnamon`],baseNotes:[`vanilla`,`amber`,`suede`],longevity:9,sillage:8},{id:`armani-prive-rose-arabie`,brand:`Giorgio Armani`,name:`Privé Rose d'Arabie`,gender:`unisex`,family:`oriental-rose`,topNotes:[`rose`,`saffron`],middleNotes:[`oud`,`papyrus`],baseNotes:[`amber`,`musk`],longevity:10,sillage:9},{id:`armani-prive-vert-malachite`,brand:`Giorgio Armani`,name:`Privé Vert Malachite`,gender:`unisex`,family:`green-floral`,topNotes:[`mandarin`,`jasmine`],middleNotes:[`tuberose`,`ylang ylang`],baseNotes:[`wood`,`vanilla`],longevity:8,sillage:7},{id:`armani-prive-rouge-malachite`,brand:`Giorgio Armani`,name:`Privé Rouge Malachite`,gender:`unisex`,family:`spicy-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`clove`,`cinnamon`],baseNotes:[`amber`,`oud`,`benzoin`],longevity:10,sillage:9},{id:`armani-prive-musc-shamal`,brand:`Giorgio Armani`,name:`Privé Musc Shamal`,gender:`unisex`,family:`musky-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`oud`,`rose`],baseNotes:[`musk`,`amber`,`sandalwood`],longevity:10,sillage:9},{id:`armani-prive-blanc-kogane`,brand:`Giorgio Armani`,name:`Privé Blanc Kogane`,gender:`unisex`,family:`white-floral`,topNotes:[`bergamot`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`sandalwood`,`white musk`],longevity:8,sillage:7},{id:`lancome-la-vie-est-belle`,brand:`Lancôme`,name:`La Vie Est Belle EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`pear`],middleNotes:[`iris`,`jasmine`,`orange blossom`],baseNotes:[`praline`,`vanilla`,`patchouli`],longevity:8,sillage:7},{id:`lancome-la-vie-intensement`,brand:`Lancôme`,name:`La Vie Est Belle Intensément`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`red currant`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`red sandalwood`,`vanilla`],longevity:8,sillage:8},{id:`lancome-la-vie-elixir`,brand:`Lancôme`,name:`La Vie Est Belle L'Elixir`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`iris`,`jasmine`],baseNotes:[`vanilla`,`praline`,`patchouli`],longevity:9,sillage:8},{id:`lancome-la-vie-iris-absolu`,brand:`Lancôme`,name:`La Vie Est Belle Iris Absolu`,gender:`women`,family:`floral-powdery`,topNotes:[`bergamot`,`pear`],middleNotes:[`iris`,`rose`],baseNotes:[`musk`,`patchouli`],longevity:7,sillage:6},{id:`lancome-la-vie-rose`,brand:`Lancôme`,name:`La Vie Est Belle Rose Extraordinaire`,gender:`women`,family:`floral-rose`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rose`,`peony`],baseNotes:[`musk`,`patchouli`,`vanilla`],longevity:7,sillage:6},{id:`lancome-la-vie-vanille-nude`,brand:`Lancôme`,name:`La Vie Est Belle Vanille Nude`,gender:`women`,family:`vanilla-gourmand`,topNotes:[`pear`,`bergamot`],middleNotes:[`iris`],baseNotes:[`vanilla`,`musk`],longevity:7,sillage:6},{id:`lancome-la-vie-soleil`,brand:`Lancôme`,name:`La Vie Est Belle Soleil Cristal`,gender:`women`,family:`floral-solar`,topNotes:[`coconut`,`citrus`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`musk`,`vanilla`],longevity:6,sillage:5},{id:`lancome-idole`,brand:`Lancôme`,name:`Idôle EDP`,gender:`women`,family:`floral-chypre`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`white musk`,`cedar`],longevity:7,sillage:6},{id:`lancome-tresor`,brand:`Lancôme`,name:`Trésor EDP`,gender:`women`,family:`oriental-floral`,topNotes:[`rose`,`lilac`,`peach`],middleNotes:[`iris`,`rose`,`muguet`],baseNotes:[`sandalwood`,`amber`,`musk`,`vanilla`],longevity:7,sillage:6},{id:`prada-paradoxe`,brand:`Prada`,name:`Paradoxe EDP`,gender:`women`,family:`floral-amber`,topNotes:[`neroli bud`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`ambrofix`,`musk`],longevity:8,sillage:7},{id:`prada-paradoxe-intense`,brand:`Prada`,name:`Paradoxe Intense`,gender:`women`,family:`floral-amber-vanilla`,topNotes:[`bergamot`,`neroli`,`pear`],middleNotes:[`jasmine`,`moss`],baseNotes:[`ambrofix`,`vanilla bourbon`],longevity:9,sillage:8},{id:`prada-paradoxe-virtual-flower`,brand:`Prada`,name:`Paradoxe Virtual Flower`,gender:`women`,family:`floral-green`,topNotes:[`bergamot`,`green notes`],middleNotes:[`jasmine`,`peony`],baseNotes:[`musk`,`ambrofix`],longevity:6,sillage:5},{id:`prada-paradoxe-radical-essence`,brand:`Prada`,name:`Paradoxe Radical Essence`,gender:`women`,family:`floral-woody`,topNotes:[`neroli`,`bergamot`],middleNotes:[`jasmine`,`iris`],baseNotes:[`cedar`,`ambrofix`,`musk`],longevity:7,sillage:6},{id:`prada-candy`,brand:`Prada`,name:`Candy EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`caramel`],middleNotes:[`musk`,`almond`],baseNotes:[`vanilla`,`benzoin`],longevity:7,sillage:6},{id:`prada-la-femme`,brand:`Prada`,name:`La Femme Prada`,gender:`women`,family:`floral-chypre`,topNotes:[`mandarin`,`frangipani`],middleNotes:[`tuberose`,`ylang ylang`,`jasmine`],baseNotes:[`vetiver`,`vanilla`,`beeswax`],longevity:7,sillage:6},{id:`prada-infusion-iris`,brand:`Prada`,name:`Infusion d'Iris EDP`,gender:`women`,family:`floral-powdery`,topNotes:[`mandarin`,`orange`],middleNotes:[`iris`,`incense`],baseNotes:[`vetiver`,`cedar`,`benzoin`],longevity:6,sillage:5},{id:`prada-luna-rossa-edt`,brand:`Prada`,name:`Luna Rossa EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`lavender`,`bitter orange`],middleNotes:[`clary sage`,`spearmint`],baseNotes:[`ambroxan`],longevity:5,sillage:5},{id:`prada-luna-rossa-carbon`,brand:`Prada`,name:`Luna Rossa Carbon EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`pepper`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`],longevity:7,sillage:6},{id:`prada-luna-rossa-carbon-edp`,brand:`Prada`,name:`Luna Rossa Carbon EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`dry amber`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`,`cedar`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-edt`,brand:`Prada`,name:`Luna Rossa Ocean EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`lavender`,`cashmere wood`],baseNotes:[`patchouli`,`musk`],longevity:6,sillage:5},{id:`prada-luna-rossa-ocean-edp`,brand:`Prada`,name:`Luna Rossa Ocean EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`patchouli`,`musk`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-le-parfum`,brand:`Prada`,name:`Luna Rossa Ocean Le Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`oud`,`patchouli`],longevity:9,sillage:8},{id:`prada-luna-rossa-black`,brand:`Prada`,name:`Luna Rossa Black`,gender:`men`,family:`amber-fougere`,topNotes:[`bergamot`,`angelica`],middleNotes:[`coumarin`,`patchouli`],baseNotes:[`amber`,`sandalwood`],longevity:8,sillage:7},{id:`prada-lhomme`,brand:`Prada`,name:`L'Homme Prada EDT`,gender:`men`,family:`amber-fougere`,topNotes:[`iris`,`neroli`],middleNotes:[`amber`,`patchouli`],baseNotes:[`cedar`,`sandalwood`],longevity:6,sillage:5},{id:`prada-paradigme`,brand:`Prada`,name:`Paradigme EDP`,gender:`men`,family:`amber-woody`,topNotes:[`citrus`,`amber`],middleNotes:[`floral`,`soapy accord`],baseNotes:[`vanilla`,`balsam`,`woody`],longevity:8,sillage:7},{id:`valentino-donna-born-in-roma`,brand:`Valentino`,name:`Donna Born in Roma EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`black currant`,`bergamot`,`pink pepper`],middleNotes:[`jasmine sambac`,`jasmine grandiflorum`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:7,sillage:7},{id:`valentino-donna-intense`,brand:`Valentino`,name:`Born in Roma Donna Intense`,gender:`women`,family:`floral-amber`,topNotes:[`black currant`,`raspberry`],middleNotes:[`jasmine`,`tuberose`],baseNotes:[`vanilla`,`amber`,`sandalwood`],longevity:8,sillage:8},{id:`valentino-donna-extradose`,brand:`Valentino`,name:`Born in Roma Donna Extradose`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`jasmine sambac`,`osmanthus`],baseNotes:[`vanilla`,`tonka`],longevity:8,sillage:7},{id:`valentino-donna-purple-mel`,brand:`Valentino`,name:`Born in Roma Purple Melancholia Donna`,gender:`women`,family:`floral-leather`,topNotes:[`bergamot`],middleNotes:[`jasmine`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`cashmere wood`],longevity:8,sillage:7},{id:`valentino-uomo`,brand:`Valentino`,name:`Uomo Born in Roma EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`mineral salt`,`ginger`],middleNotes:[`sage`,`lavender`],baseNotes:[`vetiver`,`cashmere wood`],longevity:7,sillage:6},{id:`valentino-uomo-intense`,brand:`Valentino`,name:`Uomo Born in Roma Intense`,gender:`men`,family:`oriental-vanilla`,topNotes:[`lavender`],middleNotes:[`vetiver`,`iris`],baseNotes:[`vanilla`,`tonka`],longevity:9,sillage:8},{id:`valentino-uomo-coral`,brand:`Valentino`,name:`Uomo Born in Roma Coral Fantasy`,gender:`men`,family:`aromatic-woody`,topNotes:[`grapefruit`,`basil`],middleNotes:[`sage`,`geranium`],baseNotes:[`vetiver`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-extradose`,brand:`Valentino`,name:`Uomo Born in Roma Extradose`,gender:`men`,family:`oriental-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`vetiver`],baseNotes:[`vanilla`,`amber`,`tonka`],longevity:8,sillage:7},{id:`valentino-uomo-ivory`,brand:`Valentino`,name:`Uomo Born in Roma Ivory`,gender:`men`,family:`aromatic-fresh`,topNotes:[`bergamot`,`lavender`],middleNotes:[`sage`,`iris`],baseNotes:[`musk`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-purple-mel`,brand:`Valentino`,name:`Uomo Born in Roma Purple Melancholia`,gender:`men`,family:`oriental-leather`,topNotes:[`bergamot`,`lavender`],middleNotes:[`iris`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`oud`],longevity:9,sillage:8},{id:`valentino-anatomy-dreams`,brand:`Valentino`,name:`Anatomy of Dreams Collection`,gender:`unisex`,family:`niche-various`,topNotes:[`artistic notes`],middleNotes:[`rare ingredients`],baseNotes:[`premium woods`],longevity:8,sillage:7},{id:`mugler-angel`,brand:`Mugler`,name:`Angel EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`coconut`,`pineapple`],middleNotes:[`honey`,`chocolate`,`caramel`],baseNotes:[`patchouli`,`vanilla`,`tonka`],longevity:10,sillage:9},{id:`mugler-angel-nova`,brand:`Mugler`,name:`Angel Nova EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`lychee`],middleNotes:[`damask rose`,`peony`],baseNotes:[`akigalawood`,`benzoin`],longevity:8,sillage:7},{id:`mugler-alien`,brand:`Mugler`,name:`Alien EDP`,gender:`women`,family:`woody-solar`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`],baseNotes:[`white amber`],longevity:10,sillage:9},{id:`mugler-alien-goddess`,brand:`Mugler`,name:`Alien Goddess EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`coconut water`],middleNotes:[`jasmine`,`heliotrope`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:8,sillage:7},{id:`mugler-alien-hypersense`,brand:`Mugler`,name:`Alien Hypersense EDP`,gender:`women`,family:`floral-solar`,topNotes:[`ylang ylang`],middleNotes:[`jasmine sambac`,`tuberose`],baseNotes:[`cashmere wood`,`white amber`],longevity:8,sillage:8},{id:`mugler-alien-supra-florale`,brand:`Mugler`,name:`Alien Supra Florale`,gender:`women`,family:`white-floral`,topNotes:[`jasmine`,`tuberose`],middleNotes:[`orange blossom`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-alien-extraintense`,brand:`Mugler`,name:`Alien Extraintense`,gender:`women`,family:`amber-woody`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`,`vanilla`],baseNotes:[`white amber`,`benzoin`],longevity:10,sillage:9},{id:`mugler-alien-pulp`,brand:`Mugler`,name:`Alien Pulp`,gender:`women`,family:`fruity-floral`,topNotes:[`pear`,`passion fruit`],middleNotes:[`jasmine`,`peony`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-amen`,brand:`Mugler`,name:`A*Men EDT`,gender:`men`,family:`oriental-woody`,topNotes:[`mint`,`lavender`,`bergamot`],middleNotes:[`coffee`,`tar`],baseNotes:[`tonka`,`patchouli`,`vanilla`,`caramel`],longevity:8,sillage:7},{id:`mugler-alien-man`,brand:`Mugler`,name:`Alien Man EDT`,gender:`men`,family:`amber-woody`,topNotes:[`white osmanthus`],middleNotes:[`leather`,`smoked beechwood`],baseNotes:[`cashmere wood`,`amber`],longevity:6,sillage:5},{id:`vr-flowerbomb`,brand:`Viktor & Rolf`,name:`Flowerbomb EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`tea`,`bergamot`],middleNotes:[`sambac jasmine`,`rose`,`orchid`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`vr-flowerbomb-ruby`,brand:`Viktor & Rolf`,name:`Flowerbomb Ruby Orchid`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`saffron`],middleNotes:[`orchid`,`vanilla`],baseNotes:[`sandalwood`,`musk`],longevity:8,sillage:7},{id:`vr-flowerbomb-extreme-2025`,brand:`Viktor & Rolf`,name:`Flowerbomb Extreme 2025`,gender:`women`,family:`floral-oriental`,topNotes:[`rose`,`bergamot`],middleNotes:[`jasmine`,`orchid`,`orange blossom`],baseNotes:[`patchouli`,`tonka`,`vanilla`],longevity:9,sillage:8},{id:`vr-good-fortune`,brand:`Viktor & Rolf`,name:`Good Fortune EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`jasmine`],middleNotes:[`vanilla`],baseNotes:[`amber`,`vetiver`,`crème brûlée`],longevity:8,sillage:7},{id:`vr-bonbon`,brand:`Viktor & Rolf`,name:`Bonbon EDP`,gender:`women`,family:`gourmand-fruity`,topNotes:[`mandarin`,`peach`],middleNotes:[`caramel`,`orange blossom`],baseNotes:[`cedar`,`guaiac wood`,`sandalwood`],longevity:7,sillage:6},{id:`vr-spicebomb`,brand:`Viktor & Rolf`,name:`Spicebomb EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`grapefruit`,`pink pepper`],middleNotes:[`cinnamon`,`saffron`],baseNotes:[`tobacco`,`vetiver`,`leather`],longevity:7,sillage:7},{id:`vr-spicebomb-extreme`,brand:`Viktor & Rolf`,name:`Spicebomb Extreme EDP`,gender:`men`,family:`oriental-spicy`,topNotes:[`black pepper`,`saffron`],middleNotes:[`lavender`,`cinnamon`],baseNotes:[`tonka`,`tobacco`,`amber`],longevity:9,sillage:9},{id:`vr-spicebomb-night-vision`,brand:`Viktor & Rolf`,name:`Spicebomb Night Vision EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`clary sage`,`grapefruit`],middleNotes:[`cinnamon`,`green cardamom`],baseNotes:[`benzoin`,`tobacco`],longevity:7,sillage:6},{id:`vr-spicebomb-dark-leather`,brand:`Viktor & Rolf`,name:`Spicebomb Dark Leather EDP`,gender:`men`,family:`leather-spicy`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`leather`,`cinnamon`],baseNotes:[`tonka`,`benzoin`],longevity:9,sillage:8},{id:`vr-spicebomb-metallic-musk`,brand:`Viktor & Rolf`,name:`Spicebomb Metallic Musk EDP`,gender:`men`,family:`musky-spicy`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`musk`,`lavender`],baseNotes:[`amber`,`cedar`],longevity:7,sillage:6},{id:`azzaro-wanted`,brand:`Azzaro`,name:`Azzaro Wanted EDT`,gender:`men`,family:`spicy-woody`,topNotes:[`lemon`,`ginger`,`mint`],middleNotes:[`cardamom`,`juniper`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`azzaro-most-wanted`,brand:`Azzaro`,name:`The Most Wanted EDP`,gender:`men`,family:`amber-spicy`,topNotes:[`cardamom`,`toffee`],middleNotes:[`lavender`,`iris`],baseNotes:[`amber wood`,`woody notes`],longevity:8,sillage:7},{id:`azzaro-most-wanted-parfum`,brand:`Azzaro`,name:`The Most Wanted Parfum`,gender:`men`,family:`amber-vanilla`,topNotes:[`cardamom`,`fig`],middleNotes:[`amber`,`lavender`],baseNotes:[`vanilla`,`tonka`],longevity:10,sillage:9},{id:`azzaro-chrome`,brand:`Azzaro`,name:`Azzaro Chrome EDT`,gender:`men`,family:`citrus-aquatic`,topNotes:[`lemon`,`neroli`,`rosemary`],middleNotes:[`cyclamen`,`jasmine`],baseNotes:[`musk`,`oakmoss`,`cedar`],longevity:5,sillage:4},{id:`mm-by-the-fireplace`,brand:`Maison Margiela`,name:`By the Fireplace`,gender:`unisex`,family:`woody-spicy`,topNotes:[`clove oil`,`pink pepper`],middleNotes:[`chestnut`,`guaiac wood`],baseNotes:[`vanilla`,`peru balsam`,`cashmere wood`],longevity:7,sillage:6},{id:`mm-jazz-club`,brand:`Maison Margiela`,name:`Jazz Club`,gender:`unisex`,family:`aromatic-fougere`,topNotes:[`pink pepper`,`neroli`,`lemon`],middleNotes:[`rose`,`sage`],baseNotes:[`tobacco`,`vanilla`,`styrax`],longevity:7,sillage:5},{id:`mm-lazy-sunday`,brand:`Maison Margiela`,name:`Lazy Sunday Morning`,gender:`unisex`,family:`floral-musky`,topNotes:[`muguet`,`pear`,`aldehydes`],middleNotes:[`iris`,`rose`,`orange blossom`],baseNotes:[`white musk`,`patchouli`],longevity:5,sillage:4},{id:`mm-beach-walk`,brand:`Maison Margiela`,name:`Beach Walk`,gender:`unisex`,family:`floral-aquatic`,topNotes:[`bergamot`,`lemon`,`pink pepper`],middleNotes:[`ylang ylang`,`coconut milk`],baseNotes:[`musk`,`cedar`,`benzoin`],longevity:5,sillage:4},{id:`mm-whispers`,brand:`Maison Margiela`,name:`Whispers in the Library`,gender:`unisex`,family:`woody-spicy`,topNotes:[`pepper`],middleNotes:[`vanilla`,`cedar`],baseNotes:[`benzoin`,`musk`],longevity:7,sillage:5},{id:`mm-across-sands`,brand:`Maison Margiela`,name:`Across Sands`,gender:`unisex`,family:`oriental-amber`,topNotes:[`saffron`,`bergamot`],middleNotes:[`rose`,`amber`],baseNotes:[`oud`,`vanilla`],longevity:8,sillage:8},{id:`mm-on-a-date`,brand:`Maison Margiela`,name:`On a Date`,gender:`unisex`,family:`gourmand-floral`,topNotes:[`pear`],middleNotes:[`rose`,`iris`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`mm-flying`,brand:`Maison Margiela`,name:`Flying`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`citrus`],middleNotes:[`aromatic notes`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`mm-soul-of-forest`,brand:`Maison Margiela`,name:`Soul of the Forest`,gender:`unisex`,family:`woody-green`,topNotes:[`green notes`],middleNotes:[`mushroom`,`woody notes`],baseNotes:[`cedar`,`musk`],longevity:5,sillage:5},{id:`rl-polo-blue-edt`,brand:`Ralph Lauren`,name:`Polo Blue EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`melon`,`cucumber`],middleNotes:[`sage`,`basil`],baseNotes:[`suede`,`musk`,`woody notes`],longevity:5,sillage:5},{id:`rl-polo-blue`,brand:`Ralph Lauren`,name:`Polo Blue EDP`,gender:`men`,family:`citrus-woody`,topNotes:[`bergamot`,`salt notes`],middleNotes:[`cardamom`,`sage`],baseNotes:[`patchouli`,`vetiver`,`suede`],longevity:7,sillage:6},{id:`rl-polo-red`,brand:`Ralph Lauren`,name:`Polo Red EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`grapefruit`,`cranberry`],middleNotes:[`sage`,`amber wood`],baseNotes:[`cedar`,`coffee`],longevity:5,sillage:5},{id:`rl-ralphs-club`,brand:`Ralph Lauren`,name:`Ralph's Club EDP`,gender:`men`,family:`woody-aromatic`,topNotes:[`lavender`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`vetiver`,`musk`],longevity:7,sillage:6},{id:`rl-ralphs-club-parfum`,brand:`Ralph Lauren`,name:`Ralph's Club Parfum`,gender:`men`,family:`woody-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`tonka bean`,`iris`],baseNotes:[`cedar`,`vanilla`,`sandalwood`],longevity:9,sillage:8},{id:`rl-beyond-romance`,brand:`Ralph Lauren`,name:`Beyond Romance EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`raspberry`,`damask rose`],middleNotes:[`jasmine`,`iris`],baseNotes:[`vanilla`,`cashmere wood`],longevity:7,sillage:6},{id:`cacharel-yes-i-am`,brand:`Cacharel`,name:`Yes I Am EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`peach`,`red currant`],middleNotes:[`rose`,`iris`],baseNotes:[`vanilla`,`caramel`,`cedar`],longevity:5,sillage:5},{id:`cacharel-anais-anais`,brand:`Cacharel`,name:`Anaïs Anaïs L'Original EDT`,gender:`women`,family:`floral-white`,topNotes:[`hyacinth`,`muguet`],middleNotes:[`jasmine`,`ylang ylang`,`iris`],baseNotes:[`sandalwood`,`vetiver`,`musk`],longevity:5,sillage:4},{id:`cacharel-amor-amor`,brand:`Cacharel`,name:`Amor Amor EDT`,gender:`women`,family:`floral-fruity`,topNotes:[`grapefruit`,`blood orange`,`mandarin`],middleNotes:[`jasmine`,`lily`,`rose`],baseNotes:[`vanilla`,`amber`,`musk`],longevity:5,sillage:5},{id:`diesel-d`,brand:`Diesel`,name:`Diesel D EDT`,gender:`men`,family:`fresh-woody`,topNotes:[`lavender`,`bergamot`],middleNotes:[`denim accord`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`diesel-only-the-brave`,brand:`Diesel`,name:`Only The Brave EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`lemon`,`mandarin`,`parsley`],middleNotes:[`coriander`,`violet leaf`],baseNotes:[`amber`,`cedar`,`styrax`],longevity:5,sillage:5},{id:`miu-miu-miutine`,brand:`Miu Miu`,name:`Miutine EDP`,gender:`women`,family:`floral`,topNotes:[`muguet`],middleNotes:[`floral notes`],baseNotes:[`musk`,`amber`],longevity:7,sillage:5},{id:`aesop-hwyl`,brand:`Aesop`,name:`Hwyl EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`cypress`],middleNotes:[`vetiver`,`incense`],baseNotes:[`moss`],longevity:7,sillage:5},{id:`aesop-marrakech`,brand:`Aesop`,name:`Marrakech Intense EDT`,gender:`unisex`,family:`spicy-floral`,topNotes:[`neroli`],middleNotes:[`rose`,`cardamom`],baseNotes:[`sandalwood`,`cedar`],longevity:5,sillage:4},{id:`aesop-rozu`,brand:`Aesop`,name:`Rozu EDP`,gender:`unisex`,family:`floral-green`,topNotes:[`guaiac wood`],middleNotes:[`shiso`,`rose`],baseNotes:[`vetiver`,`patchouli`],longevity:5,sillage:4},{id:`aesop-karst`,brand:`Aesop`,name:`Karst EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`florentine iris`],middleNotes:[`smoked vetiver`],baseNotes:[`smoky cedar`],longevity:7,sillage:5},{id:`aesop-miraceti`,brand:`Aesop`,name:`Miraceti EDP`,gender:`unisex`,family:`musky-amber`,topNotes:[`labdanum`],middleNotes:[`musk`],baseNotes:[`ambrette`],longevity:7,sillage:5},{id:`aesop-eidesis`,brand:`Aesop`,name:`Eidesis EDP`,gender:`unisex`,family:`floral-musky`,topNotes:[`jasmine`],middleNotes:[`orange blossom`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`ac-clementine-california`,brand:`Atelier Cologne`,name:`Clémentine California`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`clementine`,`red pepper`],middleNotes:[`juniper berry`],baseNotes:[`vetiver`,`sandalwood`],longevity:5,sillage:5},{id:`ac-orange-sanguine`,brand:`Atelier Cologne`,name:`Orange Sanguine`,gender:`unisex`,family:`citrus`,topNotes:[`blood orange`],middleNotes:[`jasmine`],baseNotes:[`tonka bean`,`sandalwood`],longevity:4,sillage:3},{id:`ac-vanille-insensee`,brand:`Atelier Cologne`,name:`Vanille Insensée`,gender:`unisex`,family:`vanilla-woody`,topNotes:[`lemon`],middleNotes:[`vanilla`],baseNotes:[`oak moss`,`amber`],longevity:5,sillage:5}],g=[{id:`cf-1`,name:`Midnight Silk Road`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:3,unit:`drops`}],context:`evening`,likes:234,saves:89,tags:[`evening`,`date-night`,`warm`],description:`A mysterious East-meets-East blend. Oud and saffron from the Middle East intertwined with the contemplative incense of East Asian temples.`},{id:`cf-2`,name:`Golden Hour`,authorProfile:`fresh-citrus`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:187,saves:72,tags:[`summer`,`casual`,`warm`],description:`Sun-kissed Mediterranean citrus anchored by the warm vanilla-coffee richness of South Africa. Like a golden sunset over the Cape.`},{id:`cf-3`,name:`Forest Ceremony`,authorProfile:`woody-green`,layers:[{perfumeId:`scandinavian-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`},{perfumeId:`eastasia-oil`,amount:1,unit:`drops`}],context:`office`,likes:156,saves:64,tags:[`office`,`sophisticated`,`green`],description:`Nordic freshness layered over Amazonian depth with a whisper of Japanese hinoki. A global forest walk in three layers.`},{id:`cf-4`,name:`Velvet Rose`,authorProfile:`floral-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`mediterranean-spray`,amount:2,unit:`sprays`}],context:`evening`,likes:312,saves:128,tags:[`romantic`,`elegant`,`evening`],description:`The opulent rose and oud of the Middle East lightened by Mediterranean citrus and fig. Elegance without heaviness.`},{id:`cf-5`,name:`Cocoa Cloud`,authorProfile:`gourmand-lover`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:3,unit:`drops`}],context:`weekend`,likes:198,saves:85,tags:[`cozy`,`winter`,`gourmand`],description:`A dessert-like warmth — tropical cocoa and palo santo fused with South African vanilla and coffee absolute. Comfort in a bottle.`},{id:`cf-6`,name:`Zen Garden`,authorProfile:`fresh-clean`,layers:[{perfumeId:`eastasia-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:2,unit:`drops`}],context:`meditation`,likes:145,saves:67,tags:[`calm`,`clean`,`daytime`],description:`Sakura and green tea floating above a crystalline Nordic base. Serene minimalism for moments of mindfulness.`},{id:`cf-7`,name:`Saharan Night`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-oil`,amount:1,unit:`drops`}],context:`evening`,likes:276,saves:112,tags:[`bold`,`evening`,`statement`],description:`A commanding nighttime blend — Arabian oud intensified by African coffee-vanilla and a drop of South American tonka. Not for the faint-hearted.`},{id:`cf-8`,name:`Azure Morning`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`morning`,likes:203,saves:91,tags:[`morning`,`fresh`,`office`],description:`Bright Mediterranean citrus with a cool Scandinavian mineral finish. Like diving into the Aegean Sea at dawn.`},{id:`cf-9`,name:`Imperial Garden`,authorProfile:`floral-green`,layers:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`},{perfumeId:`mediterranean-oil`,amount:1,unit:`drops`}],context:`special-occasion`,likes:167,saves:73,tags:[`elegant`,`special`,`floral`],description:`East Asian florals crowned with a touch of Middle Eastern oud and Mediterranean neroli. A garden fit for royalty.`},{id:`cf-10`,name:`Safari Dawn`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`adventure`,likes:134,saves:56,tags:[`adventure`,`daytime`,`warm`],description:`The wild warmth of the African savanna softened by Mediterranean olive blossom and fig. For the modern explorer.`},{id:`cf-11`,name:`Spice Bazaar`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`}],context:`evening`,likes:189,saves:78,tags:[`bold`,`evening`,`spicy`],description:`Arabian saffron meets Amazonian tonka and dark chocolate. A walk through a moonlit spice market.`},{id:`cf-12`,name:`Nordic Bloom`,authorProfile:`floral-green`,layers:[{perfumeId:`scandinavian-spray`,amount:3,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:162,saves:61,tags:[`spring`,`fresh`,`floral`],description:`Crisp birch and juniper lifted by cherry blossom and yuzu. Scandinavian clarity with Japanese elegance.`},{id:`cf-13`,name:`Cape Sunset`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:3,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`}],context:`weekend`,likes:147,saves:59,tags:[`weekend`,`warm`,`rich`],description:`South African rooibos warmth deepened by a single drop of Arabian oud. Bold yet comforting.`},{id:`cf-14`,name:`Tropical Breeze`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`summer`,likes:173,saves:68,tags:[`summer`,`casual`,`tropical`],description:`Amazonian green notes and palo santo with Mediterranean neroli and fig. A sun-drenched tropical getaway.`},{id:`cf-15`,name:`Amber Veil`,authorProfile:`warm-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`evening`,likes:215,saves:94,tags:[`evening`,`sophisticated`,`warm`],description:`Arabian amber and rose oil layered with South American tonka, finished with a cool Nordic touch. Mysterious elegance.`}],_=[{id:`warm-oriental`,name:`Warm Oriental`,description:`Rich, spice-laden warmth with amber and resinous depth`,families:[`oriental`,`spicy`,`gourmand`]},{id:`fresh-aquatic`,name:`Fresh Aquatic`,description:`Clean, crisp, and invigorating like ocean air`,families:[`fresh`,`citrus`,`aromatic`]},{id:`floral-romantic`,name:`Floral Romantic`,description:`Lush blooms, soft petals, and romantic elegance`,families:[`floral`,`musky`]},{id:`woody-earthy`,name:`Woody Earthy`,description:`Grounded in nature — forests, earth, and bark`,families:[`woody`,`green`,`aromatic`]},{id:`citrus-bright`,name:`Citrus Bright`,description:`Zesty, luminous, and energizing sunshine`,families:[`citrus`,`fresh`,`green`]},{id:`gourmand-cozy`,name:`Gourmand Cozy`,description:`Edible comfort — vanilla, cocoa, and sweet warmth`,families:[`gourmand`,`oriental`]}];function v(e){return p.find(t=>t.id===e)}var y={scandinavian:new URL(`/mon_accord/assets/scandinavian-5ibAHdAH.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-DZK4DeZe.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DwLt2ni5.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-fZMNFcGl.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-PQykoay7.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DEEY7Abs.png`,``+import.meta.url).href},b={scandinavian:new URL(`/mon_accord/assets/scandinavian-T91uXqs1.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-C6p3o17-.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DqiVXp2O.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-zaCtkOEY.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-BEKaFRIH.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Df_0XU0d.png`,``+import.meta.url).href};function x(e,t){let n=!!u.getProfile();e.innerHTML=`
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
            ${f.map((e,t)=>`
              <div class="cf-card" data-index="${t}" data-region="${e.id}">
                <img src="${y[e.id]}" alt="${e.name} Spray" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
                <img src="${b[e.id]}" alt="${e.name} Oil" class="cf-card__img" draggable="false" loading="eager" fetchpriority="high" decoding="async" />
              </div>
            `).join(``)}
          </div>
          <button class="cf-nav cf-nav--next" id="cf-next" aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div class="cf-dots" id="cf-dots">
            ${f.map((e,t)=>`<button class="cf-dot" data-index="${t}" style="--rc: ${e.color};" aria-label="${e.name}"></button>`).join(``)}
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
              <p class="how-step__text">Answer a short quiz and our AI creates your unique olfactory archetype — your taste, your language, your starting point.</p>
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
          <p class="section-subtitle mb-lg">Start with a quick profile quiz — your AI-powered scent journey begins here.</p>
          <button class="btn btn--primary btn--lg" id="bottom-cta">
            ${n?`Go to Lab`:`Take the Quiz`}
          </button>
        </div>
      </div>
    </section>
  `,S(),e.querySelector(`#scroll-hint`).addEventListener(`click`,()=>{document.getElementById(`origin-section`)?.scrollIntoView({behavior:`smooth`})}),e.querySelector(`#bottom-cta`).addEventListener(`click`,()=>{t(n?`#lab`:`#profile`)});let r=[0,1,2,3,4,5];function i(t){return e.querySelector(`.cf-card[data-index="${t}"]`)}function a(e,t,n=!1){let r=Math.abs(t),i=t*320,a=r===0?1:r===1?.68:.5,o=r===0?1:r===1?.55:0,s=r===0?5:r===1?3:1;n&&(e.style.transition=`none`),e.style.transform=`translateX(calc(-50% + ${i}px)) translateY(-50%) scale(${a})`,e.style.opacity=o,e.style.zIndex=s,n&&(e.offsetHeight,e.style.transition=``)}function o(t=!1){r.forEach((e,n)=>{a(i(e),n-2,t),i(e).classList.toggle(`cf-card--active`,n===2)}),e.querySelectorAll(`.cf-dot`).forEach((e,t)=>{e.classList.toggle(`active`,t===r[2])}),s()}function s(){let t=f[r[2]],n=p.find(e=>e.region===t.id&&e.format===`spray`),i=p.find(e=>e.region===t.id&&e.format===`oil`),a=e.querySelector(`#cf-info`),o=(e,t)=>`
      <div class="cf-info__note-col">
        <p class="cf-info__note-heading">${e}</p>
        <p class="cf-info__note-vals">${t.join(`, `)}</p>
      </div>`;a.innerHTML=`
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
              ${o(`TOP`,n.topNotes)}
              ${o(`HEART`,n.middleNotes)}
              ${o(`BASE`,n.baseNotes)}
            </div>
          </div>`:``}
        ${i?`
          <div class="cf-info__notes-block">
            <p class="cf-info__notes-type">Oil</p>
            <div class="cf-info__notes-cols">
              ${o(`TOP`,i.topNotes)}
              ${o(`HEART`,i.middleNotes)}
              ${o(`BASE`,i.baseNotes)}
            </div>
          </div>`:``}
      </div>
    `,a.querySelector(`.cf-info__inner`).animate([{opacity:0,transform:`translateX(16px)`},{opacity:1,transform:`translateX(0)`}],{duration:340,easing:`cubic-bezier(0.16,1,0.3,1)`,fill:`forwards`})}function c(){a(i(r[0]),3,!0),r=[...r.slice(1),r[0]],o()}function l(){a(i(r[5]),-3,!0),r=[r[5],...r.slice(0,5)],o()}function d(e){if(r.indexOf(e)-2==0)return;let t=r.indexOf(e);r=[...r.slice(t),...r.slice(0,t)],o(!0)}e.querySelector(`#cf-prev`).addEventListener(`click`,l),e.querySelector(`#cf-next`).addEventListener(`click`,c),e.querySelectorAll(`.cf-dot`).forEach((e,t)=>{e.addEventListener(`click`,()=>d(t))}),e.querySelectorAll(`.cf-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=r.indexOf(Number(e.dataset.index));t!==2&&(t>2?c():l())})}),e.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&l(),e.key===`ArrowRight`&&c()}),o(!0);let m=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.1});e.querySelectorAll(`.how-step`).forEach(e=>m.observe(e))}function S(){if(document.getElementById(`landing-styles`))return;let e=document.createElement(`style`);e.id=`landing-styles`,e.textContent=`
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
      background: rgba(255,255,255,0.85);
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
      background: rgba(26,26,46,0.2);
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
      background: linear-gradient(135deg, var(--accent-bg), rgba(200,169,126,0.03));
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
  `,document.head.appendChild(e)}var C=`/mon_accord/assets/aromatic-DWjP6BVr.png`,w=`/mon_accord/assets/citrus-D8TDl6xe.png`,T=`/mon_accord/assets/floral-glVrpiWz.png`,E=`/mon_accord/assets/fresh-BFmGFrMP.png`,D=`/mon_accord/assets/gourmand-CGXhpT3R.png`,O=`/mon_accord/assets/green-WRJ2vWnP.png`,k=`/mon_accord/assets/musky-DamQXXMh.png`,A=`/mon_accord/assets/oriental-FtX0uIsC.png`,j=`/mon_accord/assets/spicy-CPptZyIq.png`,ee=`/mon_accord/assets/woody-B8ZJqfkR.png`,te=o(((e,t)=>{function n(e,t){typeof t==`boolean`&&(t={forever:t}),this._originalTimeouts=JSON.parse(JSON.stringify(e)),this._timeouts=e,this._options=t||{},this._maxRetryTime=t&&t.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._timer=null,this._options.forever&&(this._cachedTimeouts=this._timeouts.slice(0))}t.exports=n,n.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts.slice(0)},n.prototype.stop=function(){this._timeout&&clearTimeout(this._timeout),this._timer&&clearTimeout(this._timer),this._timeouts=[],this._cachedTimeouts=null},n.prototype.retry=function(e){if(this._timeout&&clearTimeout(this._timeout),!e)return!1;var t=new Date().getTime();if(e&&t-this._operationStart>=this._maxRetryTime)return this._errors.push(e),this._errors.unshift(Error(`RetryOperation timeout occurred`)),!1;this._errors.push(e);var n=this._timeouts.shift();if(n===void 0)if(this._cachedTimeouts)this._errors.splice(0,this._errors.length-1),n=this._cachedTimeouts.slice(-1);else return!1;var r=this;return this._timer=setTimeout(function(){r._attempts++,r._operationTimeoutCb&&(r._timeout=setTimeout(function(){r._operationTimeoutCb(r._attempts)},r._operationTimeout),r._options.unref&&r._timeout.unref()),r._fn(r._attempts)},n),this._options.unref&&this._timer.unref(),!0},n.prototype.attempt=function(e,t){this._fn=e,t&&(t.timeout&&(this._operationTimeout=t.timeout),t.cb&&(this._operationTimeoutCb=t.cb));var n=this;this._operationTimeoutCb&&(this._timeout=setTimeout(function(){n._operationTimeoutCb()},n._operationTimeout)),this._operationStart=new Date().getTime(),this._fn(this._attempts)},n.prototype.try=function(e){console.log(`Using RetryOperation.try() is deprecated`),this.attempt(e)},n.prototype.start=function(e){console.log(`Using RetryOperation.start() is deprecated`),this.attempt(e)},n.prototype.start=n.prototype.try,n.prototype.errors=function(){return this._errors},n.prototype.attempts=function(){return this._attempts},n.prototype.mainError=function(){if(this._errors.length===0)return null;for(var e={},t=null,n=0,r=0;r<this._errors.length;r++){var i=this._errors[r],a=i.message,o=(e[a]||0)+1;e[a]=o,o>=n&&(t=i,n=o)}return t}})),ne=o((e=>{var t=te();e.operation=function(n){return new t(e.timeouts(n),{forever:n&&(n.forever||n.retries===1/0),unref:n&&n.unref,maxRetryTime:n&&n.maxRetryTime})},e.timeouts=function(e){if(e instanceof Array)return[].concat(e);var t={retries:10,factor:2,minTimeout:1*1e3,maxTimeout:1/0,randomize:!1};for(var n in e)t[n]=e[n];if(t.minTimeout>t.maxTimeout)throw Error(`minTimeout is greater than maxTimeout`);for(var r=[],i=0;i<t.retries;i++)r.push(this.createTimeout(i,t));return e&&e.forever&&!r.length&&r.push(this.createTimeout(i,t)),r.sort(function(e,t){return e-t}),r},e.createTimeout=function(e,t){var n=t.randomize?Math.random()+1:1,r=Math.round(n*Math.max(t.minTimeout,1)*t.factor**+e);return r=Math.min(r,t.maxTimeout),r},e.wrap=function(t,n,r){if(n instanceof Array&&(r=n,n=null),!r)for(var i in r=[],t)typeof t[i]==`function`&&r.push(i);for(var a=0;a<r.length;a++){var o=r[a],s=t[o];t[o]=function(r){var i=e.operation(n),a=Array.prototype.slice.call(arguments,1),o=a.pop();a.push(function(e){i.retry(e)||(e&&(arguments[0]=i.mainError()),o.apply(this,arguments))}),i.attempt(function(){r.apply(t,a)})}.bind(t,s),t[o].options=n}}})),re=o(((e,t)=>{t.exports=ne()})),ie=c(o(((e,t)=>{var n=re(),r=[`Failed to fetch`,`NetworkError when attempting to fetch resource.`,`The Internet connection appears to be offline.`,`Network request failed`],i=class extends Error{constructor(e){super(),e instanceof Error?(this.originalError=e,{message:e}=e):(this.originalError=Error(e),this.originalError.stack=this.stack),this.name=`AbortError`,this.message=e}},a=(e,t,n)=>{let r=n.retries-(t-1);return e.attemptNumber=t,e.retriesLeft=r,e},o=e=>r.includes(e),s=(e,t)=>new Promise((r,s)=>{t={onFailedAttempt:()=>{},retries:10,...t};let c=n.operation(t);c.attempt(async n=>{try{r(await e(n))}catch(e){if(!(e instanceof Error)){s(TypeError(`Non-error was thrown: "${e}". You should only throw errors.`));return}if(e instanceof i)c.stop(),s(e.originalError);else if(e instanceof TypeError&&!o(e.message))c.stop(),s(e);else{a(e,n,t);try{await t.onFailedAttempt(e)}catch(e){s(e);return}c.retry(e)||s(c.mainError())}}})});t.exports=s,t.exports.default=s,t.exports.AbortError=i}))(),1),ae=void 0,oe=void 0;function se(){return{geminiUrl:ae,vertexUrl:oe}}function ce(e,t,n,r){if(!e?.baseUrl){let e=se();return t?e.vertexUrl??n:e.geminiUrl??r}return e.baseUrl}var M=class{};function N(e,t){return e.replace(/\{([^}]+)\}/g,(e,n)=>{if(Object.prototype.hasOwnProperty.call(t,n)){let e=t[n];return e==null?``:String(e)}else throw Error(`Key '${n}' not found in valueMap.`)})}function P(e,t,n){for(let r=0;r<t.length-1;r++){let i=t[r];if(i.endsWith(`[]`)){let a=i.slice(0,-2);if(!(a in e))if(Array.isArray(n))e[a]=Array.from({length:n.length},()=>({}));else throw Error(`Value must be a list given an array path ${i}`);if(Array.isArray(e[a])){let i=e[a];if(Array.isArray(n))for(let e=0;e<i.length;e++){let a=i[e];P(a,t.slice(r+1),n[e])}else for(let e of i)P(e,t.slice(r+1),n)}return}else if(i.endsWith(`[0]`)){let a=i.slice(0,-3);a in e||(e[a]=[{}]);let o=e[a];P(o[0],t.slice(r+1),n);return}(!e[i]||typeof e[i]!=`object`)&&(e[i]={}),e=e[i]}let r=t[t.length-1],i=e[r];if(i!==void 0){if(!n||typeof n==`object`&&Object.keys(n).length===0||n===i)return;if(typeof i==`object`&&typeof n==`object`&&i!==null&&n!==null)Object.assign(i,n);else throw Error(`Cannot set value for an existing key. Key: ${r}`)}else r===`_self`&&typeof n==`object`&&n&&!Array.isArray(n)?Object.assign(e,n):e[r]=n}function F(e,t,n=void 0){try{if(t.length===1&&t[0]===`_self`)return e;for(let r=0;r<t.length;r++){if(typeof e!=`object`||!e)return n;let i=t[r];if(i.endsWith(`[]`)){let a=i.slice(0,-2);if(a in e){let i=e[a];return Array.isArray(i)?i.map(e=>F(e,t.slice(r+1),n)):n}else return n}else e=e[i]}return e}catch(e){if(e instanceof TypeError)return n;throw e}}function le(e,t){for(let[n,r]of Object.entries(t)){let t=n.split(`.`),i=r.split(`.`),a=new Set,o=-1;for(let e=0;e<t.length;e++)if(t[e]===`*`){o=e;break}if(o!==-1&&i.length>o)for(let e=o;e<i.length;e++){let t=i[e];t!==`*`&&!t.endsWith(`[]`)&&!t.endsWith(`[0]`)&&a.add(t)}ue(e,t,i,0,a)}}function ue(e,t,n,r,i){if(r>=t.length||typeof e!=`object`||!e)return;let a=t[r];if(a.endsWith(`[]`)){let o=a.slice(0,-2),s=e;if(o in s&&Array.isArray(s[o]))for(let e of s[o])ue(e,t,n,r+1,i)}else if(a===`*`){if(typeof e==`object`&&e&&!Array.isArray(e)){let t=e,a=Object.keys(t).filter(e=>!e.startsWith(`_`)&&!i.has(e)),o={};for(let e of a)o[e]=t[e];for(let[e,i]of Object.entries(o)){let a=[];for(let t of n.slice(r))t===`*`?a.push(e):a.push(t);P(t,a,i)}for(let e of a)delete t[e]}}else{let o=e;a in o&&ue(o[a],t,n,r+1,i)}}function de(e){if(typeof e!=`string`)throw Error(`fromImageBytes must be a string`);return e}function fe(e){let t={},n=F(e,[`operationName`]);n!=null&&P(t,[`operationName`],n);let r=F(e,[`resourceName`]);return r!=null&&P(t,[`_url`,`resourceName`],r),t}function pe(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`response`,`generateVideoResponse`]);return o!=null&&P(t,[`response`],he(o)),t}function me(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`response`]);return o!=null&&P(t,[`response`],ge(o)),t}function he(e){let t={},n=F(e,[`generatedSamples`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>_e(e))),P(t,[`generatedVideos`],e)}let r=F(e,[`raiMediaFilteredCount`]);r!=null&&P(t,[`raiMediaFilteredCount`],r);let i=F(e,[`raiMediaFilteredReasons`]);return i!=null&&P(t,[`raiMediaFilteredReasons`],i),t}function ge(e){let t={},n=F(e,[`videos`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>ve(e))),P(t,[`generatedVideos`],e)}let r=F(e,[`raiMediaFilteredCount`]);r!=null&&P(t,[`raiMediaFilteredCount`],r);let i=F(e,[`raiMediaFilteredReasons`]);return i!=null&&P(t,[`raiMediaFilteredReasons`],i),t}function _e(e){let t={},n=F(e,[`video`]);return n!=null&&P(t,[`video`],Te(n)),t}function ve(e){let t={},n=F(e,[`_self`]);return n!=null&&P(t,[`video`],Ee(n)),t}function ye(e){let t={},n=F(e,[`operationName`]);return n!=null&&P(t,[`_url`,`operationName`],n),t}function be(e){let t={},n=F(e,[`operationName`]);return n!=null&&P(t,[`_url`,`operationName`],n),t}function xe(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`response`]);return o!=null&&P(t,[`response`],Se(o)),t}function Se(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`parent`]);r!=null&&P(t,[`parent`],r);let i=F(e,[`documentName`]);return i!=null&&P(t,[`documentName`],i),t}function Ce(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`response`]);return o!=null&&P(t,[`response`],we(o)),t}function we(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`parent`]);r!=null&&P(t,[`parent`],r);let i=F(e,[`documentName`]);return i!=null&&P(t,[`documentName`],i),t}function Te(e){let t={},n=F(e,[`uri`]);n!=null&&P(t,[`uri`],n);let r=F(e,[`encodedVideo`]);r!=null&&P(t,[`videoBytes`],de(r));let i=F(e,[`encoding`]);return i!=null&&P(t,[`mimeType`],i),t}function Ee(e){let t={},n=F(e,[`gcsUri`]);n!=null&&P(t,[`uri`],n);let r=F(e,[`bytesBase64Encoded`]);r!=null&&P(t,[`videoBytes`],de(r));let i=F(e,[`mimeType`]);return i!=null&&P(t,[`mimeType`],i),t}var De;(function(e){e.LANGUAGE_UNSPECIFIED=`LANGUAGE_UNSPECIFIED`,e.PYTHON=`PYTHON`})(De||={});var Oe;(function(e){e.OUTCOME_UNSPECIFIED=`OUTCOME_UNSPECIFIED`,e.OUTCOME_OK=`OUTCOME_OK`,e.OUTCOME_FAILED=`OUTCOME_FAILED`,e.OUTCOME_DEADLINE_EXCEEDED=`OUTCOME_DEADLINE_EXCEEDED`})(Oe||={});var ke;(function(e){e.SCHEDULING_UNSPECIFIED=`SCHEDULING_UNSPECIFIED`,e.SILENT=`SILENT`,e.WHEN_IDLE=`WHEN_IDLE`,e.INTERRUPT=`INTERRUPT`})(ke||={});var Ae;(function(e){e.TYPE_UNSPECIFIED=`TYPE_UNSPECIFIED`,e.STRING=`STRING`,e.NUMBER=`NUMBER`,e.INTEGER=`INTEGER`,e.BOOLEAN=`BOOLEAN`,e.ARRAY=`ARRAY`,e.OBJECT=`OBJECT`,e.NULL=`NULL`})(Ae||={});var je;(function(e){e.ENVIRONMENT_UNSPECIFIED=`ENVIRONMENT_UNSPECIFIED`,e.ENVIRONMENT_BROWSER=`ENVIRONMENT_BROWSER`})(je||={});var Me;(function(e){e.AUTH_TYPE_UNSPECIFIED=`AUTH_TYPE_UNSPECIFIED`,e.NO_AUTH=`NO_AUTH`,e.API_KEY_AUTH=`API_KEY_AUTH`,e.HTTP_BASIC_AUTH=`HTTP_BASIC_AUTH`,e.GOOGLE_SERVICE_ACCOUNT_AUTH=`GOOGLE_SERVICE_ACCOUNT_AUTH`,e.OAUTH=`OAUTH`,e.OIDC_AUTH=`OIDC_AUTH`})(Me||={});var Ne;(function(e){e.HTTP_IN_UNSPECIFIED=`HTTP_IN_UNSPECIFIED`,e.HTTP_IN_QUERY=`HTTP_IN_QUERY`,e.HTTP_IN_HEADER=`HTTP_IN_HEADER`,e.HTTP_IN_PATH=`HTTP_IN_PATH`,e.HTTP_IN_BODY=`HTTP_IN_BODY`,e.HTTP_IN_COOKIE=`HTTP_IN_COOKIE`})(Ne||={});var Pe;(function(e){e.API_SPEC_UNSPECIFIED=`API_SPEC_UNSPECIFIED`,e.SIMPLE_SEARCH=`SIMPLE_SEARCH`,e.ELASTIC_SEARCH=`ELASTIC_SEARCH`})(Pe||={});var Fe;(function(e){e.PHISH_BLOCK_THRESHOLD_UNSPECIFIED=`PHISH_BLOCK_THRESHOLD_UNSPECIFIED`,e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_HIGH_AND_ABOVE=`BLOCK_HIGH_AND_ABOVE`,e.BLOCK_HIGHER_AND_ABOVE=`BLOCK_HIGHER_AND_ABOVE`,e.BLOCK_VERY_HIGH_AND_ABOVE=`BLOCK_VERY_HIGH_AND_ABOVE`,e.BLOCK_ONLY_EXTREMELY_HIGH=`BLOCK_ONLY_EXTREMELY_HIGH`})(Fe||={});var Ie;(function(e){e.UNSPECIFIED=`UNSPECIFIED`,e.BLOCKING=`BLOCKING`,e.NON_BLOCKING=`NON_BLOCKING`})(Ie||={});var Le;(function(e){e.MODE_UNSPECIFIED=`MODE_UNSPECIFIED`,e.MODE_DYNAMIC=`MODE_DYNAMIC`})(Le||={});var Re;(function(e){e.MODE_UNSPECIFIED=`MODE_UNSPECIFIED`,e.AUTO=`AUTO`,e.ANY=`ANY`,e.NONE=`NONE`,e.VALIDATED=`VALIDATED`})(Re||={});var ze;(function(e){e.THINKING_LEVEL_UNSPECIFIED=`THINKING_LEVEL_UNSPECIFIED`,e.MINIMAL=`MINIMAL`,e.LOW=`LOW`,e.MEDIUM=`MEDIUM`,e.HIGH=`HIGH`})(ze||={});var Be;(function(e){e.DONT_ALLOW=`DONT_ALLOW`,e.ALLOW_ADULT=`ALLOW_ADULT`,e.ALLOW_ALL=`ALLOW_ALL`})(Be||={});var Ve;(function(e){e.PROMINENT_PEOPLE_UNSPECIFIED=`PROMINENT_PEOPLE_UNSPECIFIED`,e.ALLOW_PROMINENT_PEOPLE=`ALLOW_PROMINENT_PEOPLE`,e.BLOCK_PROMINENT_PEOPLE=`BLOCK_PROMINENT_PEOPLE`})(Ve||={});var He;(function(e){e.HARM_CATEGORY_UNSPECIFIED=`HARM_CATEGORY_UNSPECIFIED`,e.HARM_CATEGORY_HARASSMENT=`HARM_CATEGORY_HARASSMENT`,e.HARM_CATEGORY_HATE_SPEECH=`HARM_CATEGORY_HATE_SPEECH`,e.HARM_CATEGORY_SEXUALLY_EXPLICIT=`HARM_CATEGORY_SEXUALLY_EXPLICIT`,e.HARM_CATEGORY_DANGEROUS_CONTENT=`HARM_CATEGORY_DANGEROUS_CONTENT`,e.HARM_CATEGORY_CIVIC_INTEGRITY=`HARM_CATEGORY_CIVIC_INTEGRITY`,e.HARM_CATEGORY_IMAGE_HATE=`HARM_CATEGORY_IMAGE_HATE`,e.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT=`HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT`,e.HARM_CATEGORY_IMAGE_HARASSMENT=`HARM_CATEGORY_IMAGE_HARASSMENT`,e.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT=`HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT`,e.HARM_CATEGORY_JAILBREAK=`HARM_CATEGORY_JAILBREAK`})(He||={});var Ue;(function(e){e.HARM_BLOCK_METHOD_UNSPECIFIED=`HARM_BLOCK_METHOD_UNSPECIFIED`,e.SEVERITY=`SEVERITY`,e.PROBABILITY=`PROBABILITY`})(Ue||={});var We;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED=`HARM_BLOCK_THRESHOLD_UNSPECIFIED`,e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_ONLY_HIGH=`BLOCK_ONLY_HIGH`,e.BLOCK_NONE=`BLOCK_NONE`,e.OFF=`OFF`})(We||={});var Ge;(function(e){e.FINISH_REASON_UNSPECIFIED=`FINISH_REASON_UNSPECIFIED`,e.STOP=`STOP`,e.MAX_TOKENS=`MAX_TOKENS`,e.SAFETY=`SAFETY`,e.RECITATION=`RECITATION`,e.LANGUAGE=`LANGUAGE`,e.OTHER=`OTHER`,e.BLOCKLIST=`BLOCKLIST`,e.PROHIBITED_CONTENT=`PROHIBITED_CONTENT`,e.SPII=`SPII`,e.MALFORMED_FUNCTION_CALL=`MALFORMED_FUNCTION_CALL`,e.IMAGE_SAFETY=`IMAGE_SAFETY`,e.UNEXPECTED_TOOL_CALL=`UNEXPECTED_TOOL_CALL`,e.IMAGE_PROHIBITED_CONTENT=`IMAGE_PROHIBITED_CONTENT`,e.NO_IMAGE=`NO_IMAGE`,e.IMAGE_RECITATION=`IMAGE_RECITATION`,e.IMAGE_OTHER=`IMAGE_OTHER`})(Ge||={});var Ke;(function(e){e.HARM_PROBABILITY_UNSPECIFIED=`HARM_PROBABILITY_UNSPECIFIED`,e.NEGLIGIBLE=`NEGLIGIBLE`,e.LOW=`LOW`,e.MEDIUM=`MEDIUM`,e.HIGH=`HIGH`})(Ke||={});var qe;(function(e){e.HARM_SEVERITY_UNSPECIFIED=`HARM_SEVERITY_UNSPECIFIED`,e.HARM_SEVERITY_NEGLIGIBLE=`HARM_SEVERITY_NEGLIGIBLE`,e.HARM_SEVERITY_LOW=`HARM_SEVERITY_LOW`,e.HARM_SEVERITY_MEDIUM=`HARM_SEVERITY_MEDIUM`,e.HARM_SEVERITY_HIGH=`HARM_SEVERITY_HIGH`})(qe||={});var Je;(function(e){e.URL_RETRIEVAL_STATUS_UNSPECIFIED=`URL_RETRIEVAL_STATUS_UNSPECIFIED`,e.URL_RETRIEVAL_STATUS_SUCCESS=`URL_RETRIEVAL_STATUS_SUCCESS`,e.URL_RETRIEVAL_STATUS_ERROR=`URL_RETRIEVAL_STATUS_ERROR`,e.URL_RETRIEVAL_STATUS_PAYWALL=`URL_RETRIEVAL_STATUS_PAYWALL`,e.URL_RETRIEVAL_STATUS_UNSAFE=`URL_RETRIEVAL_STATUS_UNSAFE`})(Je||={});var Ye;(function(e){e.BLOCKED_REASON_UNSPECIFIED=`BLOCKED_REASON_UNSPECIFIED`,e.SAFETY=`SAFETY`,e.OTHER=`OTHER`,e.BLOCKLIST=`BLOCKLIST`,e.PROHIBITED_CONTENT=`PROHIBITED_CONTENT`,e.IMAGE_SAFETY=`IMAGE_SAFETY`,e.MODEL_ARMOR=`MODEL_ARMOR`,e.JAILBREAK=`JAILBREAK`})(Ye||={});var Xe;(function(e){e.TRAFFIC_TYPE_UNSPECIFIED=`TRAFFIC_TYPE_UNSPECIFIED`,e.ON_DEMAND=`ON_DEMAND`,e.ON_DEMAND_PRIORITY=`ON_DEMAND_PRIORITY`,e.ON_DEMAND_FLEX=`ON_DEMAND_FLEX`,e.PROVISIONED_THROUGHPUT=`PROVISIONED_THROUGHPUT`})(Xe||={});var Ze;(function(e){e.MODALITY_UNSPECIFIED=`MODALITY_UNSPECIFIED`,e.TEXT=`TEXT`,e.IMAGE=`IMAGE`,e.AUDIO=`AUDIO`})(Ze||={});var Qe;(function(e){e.MODEL_STAGE_UNSPECIFIED=`MODEL_STAGE_UNSPECIFIED`,e.UNSTABLE_EXPERIMENTAL=`UNSTABLE_EXPERIMENTAL`,e.EXPERIMENTAL=`EXPERIMENTAL`,e.PREVIEW=`PREVIEW`,e.STABLE=`STABLE`,e.LEGACY=`LEGACY`,e.DEPRECATED=`DEPRECATED`,e.RETIRED=`RETIRED`})(Qe||={});var $e;(function(e){e.MEDIA_RESOLUTION_UNSPECIFIED=`MEDIA_RESOLUTION_UNSPECIFIED`,e.MEDIA_RESOLUTION_LOW=`MEDIA_RESOLUTION_LOW`,e.MEDIA_RESOLUTION_MEDIUM=`MEDIA_RESOLUTION_MEDIUM`,e.MEDIA_RESOLUTION_HIGH=`MEDIA_RESOLUTION_HIGH`})($e||={});var et;(function(e){e.TUNING_MODE_UNSPECIFIED=`TUNING_MODE_UNSPECIFIED`,e.TUNING_MODE_FULL=`TUNING_MODE_FULL`,e.TUNING_MODE_PEFT_ADAPTER=`TUNING_MODE_PEFT_ADAPTER`})(et||={});var tt;(function(e){e.ADAPTER_SIZE_UNSPECIFIED=`ADAPTER_SIZE_UNSPECIFIED`,e.ADAPTER_SIZE_ONE=`ADAPTER_SIZE_ONE`,e.ADAPTER_SIZE_TWO=`ADAPTER_SIZE_TWO`,e.ADAPTER_SIZE_FOUR=`ADAPTER_SIZE_FOUR`,e.ADAPTER_SIZE_EIGHT=`ADAPTER_SIZE_EIGHT`,e.ADAPTER_SIZE_SIXTEEN=`ADAPTER_SIZE_SIXTEEN`,e.ADAPTER_SIZE_THIRTY_TWO=`ADAPTER_SIZE_THIRTY_TWO`})(tt||={});var nt;(function(e){e.JOB_STATE_UNSPECIFIED=`JOB_STATE_UNSPECIFIED`,e.JOB_STATE_QUEUED=`JOB_STATE_QUEUED`,e.JOB_STATE_PENDING=`JOB_STATE_PENDING`,e.JOB_STATE_RUNNING=`JOB_STATE_RUNNING`,e.JOB_STATE_SUCCEEDED=`JOB_STATE_SUCCEEDED`,e.JOB_STATE_FAILED=`JOB_STATE_FAILED`,e.JOB_STATE_CANCELLING=`JOB_STATE_CANCELLING`,e.JOB_STATE_CANCELLED=`JOB_STATE_CANCELLED`,e.JOB_STATE_PAUSED=`JOB_STATE_PAUSED`,e.JOB_STATE_EXPIRED=`JOB_STATE_EXPIRED`,e.JOB_STATE_UPDATING=`JOB_STATE_UPDATING`,e.JOB_STATE_PARTIALLY_SUCCEEDED=`JOB_STATE_PARTIALLY_SUCCEEDED`})(nt||={});var rt;(function(e){e.TUNING_JOB_STATE_UNSPECIFIED=`TUNING_JOB_STATE_UNSPECIFIED`,e.TUNING_JOB_STATE_WAITING_FOR_QUOTA=`TUNING_JOB_STATE_WAITING_FOR_QUOTA`,e.TUNING_JOB_STATE_PROCESSING_DATASET=`TUNING_JOB_STATE_PROCESSING_DATASET`,e.TUNING_JOB_STATE_WAITING_FOR_CAPACITY=`TUNING_JOB_STATE_WAITING_FOR_CAPACITY`,e.TUNING_JOB_STATE_TUNING=`TUNING_JOB_STATE_TUNING`,e.TUNING_JOB_STATE_POST_PROCESSING=`TUNING_JOB_STATE_POST_PROCESSING`})(rt||={});var it;(function(e){e.AGGREGATION_METRIC_UNSPECIFIED=`AGGREGATION_METRIC_UNSPECIFIED`,e.AVERAGE=`AVERAGE`,e.MODE=`MODE`,e.STANDARD_DEVIATION=`STANDARD_DEVIATION`,e.VARIANCE=`VARIANCE`,e.MINIMUM=`MINIMUM`,e.MAXIMUM=`MAXIMUM`,e.MEDIAN=`MEDIAN`,e.PERCENTILE_P90=`PERCENTILE_P90`,e.PERCENTILE_P95=`PERCENTILE_P95`,e.PERCENTILE_P99=`PERCENTILE_P99`})(it||={});var at;(function(e){e.PAIRWISE_CHOICE_UNSPECIFIED=`PAIRWISE_CHOICE_UNSPECIFIED`,e.BASELINE=`BASELINE`,e.CANDIDATE=`CANDIDATE`,e.TIE=`TIE`})(at||={});var ot;(function(e){e.TUNING_TASK_UNSPECIFIED=`TUNING_TASK_UNSPECIFIED`,e.TUNING_TASK_I2V=`TUNING_TASK_I2V`,e.TUNING_TASK_T2V=`TUNING_TASK_T2V`,e.TUNING_TASK_R2V=`TUNING_TASK_R2V`})(ot||={});var st;(function(e){e.STATE_UNSPECIFIED=`STATE_UNSPECIFIED`,e.STATE_PENDING=`STATE_PENDING`,e.STATE_ACTIVE=`STATE_ACTIVE`,e.STATE_FAILED=`STATE_FAILED`})(st||={});var ct;(function(e){e.MEDIA_RESOLUTION_UNSPECIFIED=`MEDIA_RESOLUTION_UNSPECIFIED`,e.MEDIA_RESOLUTION_LOW=`MEDIA_RESOLUTION_LOW`,e.MEDIA_RESOLUTION_MEDIUM=`MEDIA_RESOLUTION_MEDIUM`,e.MEDIA_RESOLUTION_HIGH=`MEDIA_RESOLUTION_HIGH`,e.MEDIA_RESOLUTION_ULTRA_HIGH=`MEDIA_RESOLUTION_ULTRA_HIGH`})(ct||={});var lt;(function(e){e.TOOL_TYPE_UNSPECIFIED=`TOOL_TYPE_UNSPECIFIED`,e.GOOGLE_SEARCH_WEB=`GOOGLE_SEARCH_WEB`,e.GOOGLE_SEARCH_IMAGE=`GOOGLE_SEARCH_IMAGE`,e.URL_CONTEXT=`URL_CONTEXT`,e.GOOGLE_MAPS=`GOOGLE_MAPS`,e.FILE_SEARCH=`FILE_SEARCH`})(lt||={});var ut;(function(e){e.COLLECTION=`COLLECTION`})(ut||={});var dt;(function(e){e.SERVICE_TIER_UNSPECIFIED=`SERVICE_TIER_UNSPECIFIED`,e.SERVICE_TIER_FLEX=`SERVICE_TIER_FLEX`,e.SERVICE_TIER_STANDARD=`SERVICE_TIER_STANDARD`,e.SERVICE_TIER_PRIORITY=`SERVICE_TIER_PRIORITY`})(dt||={});var ft;(function(e){e.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED=`FEATURE_SELECTION_PREFERENCE_UNSPECIFIED`,e.PRIORITIZE_QUALITY=`PRIORITIZE_QUALITY`,e.BALANCED=`BALANCED`,e.PRIORITIZE_COST=`PRIORITIZE_COST`})(ft||={});var pt;(function(e){e.PREDICT=`PREDICT`,e.EMBED_CONTENT=`EMBED_CONTENT`})(pt||={});var mt;(function(e){e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_ONLY_HIGH=`BLOCK_ONLY_HIGH`,e.BLOCK_NONE=`BLOCK_NONE`})(mt||={});var ht;(function(e){e.auto=`auto`,e.en=`en`,e.ja=`ja`,e.ko=`ko`,e.hi=`hi`,e.zh=`zh`,e.pt=`pt`,e.es=`es`})(ht||={});var gt;(function(e){e.MASK_MODE_DEFAULT=`MASK_MODE_DEFAULT`,e.MASK_MODE_USER_PROVIDED=`MASK_MODE_USER_PROVIDED`,e.MASK_MODE_BACKGROUND=`MASK_MODE_BACKGROUND`,e.MASK_MODE_FOREGROUND=`MASK_MODE_FOREGROUND`,e.MASK_MODE_SEMANTIC=`MASK_MODE_SEMANTIC`})(gt||={});var _t;(function(e){e.CONTROL_TYPE_DEFAULT=`CONTROL_TYPE_DEFAULT`,e.CONTROL_TYPE_CANNY=`CONTROL_TYPE_CANNY`,e.CONTROL_TYPE_SCRIBBLE=`CONTROL_TYPE_SCRIBBLE`,e.CONTROL_TYPE_FACE_MESH=`CONTROL_TYPE_FACE_MESH`})(_t||={});var vt;(function(e){e.SUBJECT_TYPE_DEFAULT=`SUBJECT_TYPE_DEFAULT`,e.SUBJECT_TYPE_PERSON=`SUBJECT_TYPE_PERSON`,e.SUBJECT_TYPE_ANIMAL=`SUBJECT_TYPE_ANIMAL`,e.SUBJECT_TYPE_PRODUCT=`SUBJECT_TYPE_PRODUCT`})(vt||={});var yt;(function(e){e.EDIT_MODE_DEFAULT=`EDIT_MODE_DEFAULT`,e.EDIT_MODE_INPAINT_REMOVAL=`EDIT_MODE_INPAINT_REMOVAL`,e.EDIT_MODE_INPAINT_INSERTION=`EDIT_MODE_INPAINT_INSERTION`,e.EDIT_MODE_OUTPAINT=`EDIT_MODE_OUTPAINT`,e.EDIT_MODE_CONTROLLED_EDITING=`EDIT_MODE_CONTROLLED_EDITING`,e.EDIT_MODE_STYLE=`EDIT_MODE_STYLE`,e.EDIT_MODE_BGSWAP=`EDIT_MODE_BGSWAP`,e.EDIT_MODE_PRODUCT_IMAGE=`EDIT_MODE_PRODUCT_IMAGE`})(yt||={});var bt;(function(e){e.FOREGROUND=`FOREGROUND`,e.BACKGROUND=`BACKGROUND`,e.PROMPT=`PROMPT`,e.SEMANTIC=`SEMANTIC`,e.INTERACTIVE=`INTERACTIVE`})(bt||={});var xt;(function(e){e.ASSET=`ASSET`,e.STYLE=`STYLE`})(xt||={});var St;(function(e){e.INSERT=`INSERT`,e.REMOVE=`REMOVE`,e.REMOVE_STATIC=`REMOVE_STATIC`,e.OUTPAINT=`OUTPAINT`})(St||={});var Ct;(function(e){e.OPTIMIZED=`OPTIMIZED`,e.LOSSLESS=`LOSSLESS`})(Ct||={});var wt;(function(e){e.SUPERVISED_FINE_TUNING=`SUPERVISED_FINE_TUNING`,e.PREFERENCE_TUNING=`PREFERENCE_TUNING`,e.DISTILLATION=`DISTILLATION`})(wt||={});var Tt;(function(e){e.STATE_UNSPECIFIED=`STATE_UNSPECIFIED`,e.PROCESSING=`PROCESSING`,e.ACTIVE=`ACTIVE`,e.FAILED=`FAILED`})(Tt||={});var Et;(function(e){e.SOURCE_UNSPECIFIED=`SOURCE_UNSPECIFIED`,e.UPLOADED=`UPLOADED`,e.GENERATED=`GENERATED`,e.REGISTERED=`REGISTERED`})(Et||={});var Dt;(function(e){e.TURN_COMPLETE_REASON_UNSPECIFIED=`TURN_COMPLETE_REASON_UNSPECIFIED`,e.MALFORMED_FUNCTION_CALL=`MALFORMED_FUNCTION_CALL`,e.RESPONSE_REJECTED=`RESPONSE_REJECTED`,e.NEED_MORE_INPUT=`NEED_MORE_INPUT`})(Dt||={});var Ot;(function(e){e.MODALITY_UNSPECIFIED=`MODALITY_UNSPECIFIED`,e.TEXT=`TEXT`,e.IMAGE=`IMAGE`,e.VIDEO=`VIDEO`,e.AUDIO=`AUDIO`,e.DOCUMENT=`DOCUMENT`})(Ot||={});var kt;(function(e){e.VAD_SIGNAL_TYPE_UNSPECIFIED=`VAD_SIGNAL_TYPE_UNSPECIFIED`,e.VAD_SIGNAL_TYPE_SOS=`VAD_SIGNAL_TYPE_SOS`,e.VAD_SIGNAL_TYPE_EOS=`VAD_SIGNAL_TYPE_EOS`})(kt||={});var At;(function(e){e.TYPE_UNSPECIFIED=`TYPE_UNSPECIFIED`,e.ACTIVITY_START=`ACTIVITY_START`,e.ACTIVITY_END=`ACTIVITY_END`})(At||={});var jt;(function(e){e.START_SENSITIVITY_UNSPECIFIED=`START_SENSITIVITY_UNSPECIFIED`,e.START_SENSITIVITY_HIGH=`START_SENSITIVITY_HIGH`,e.START_SENSITIVITY_LOW=`START_SENSITIVITY_LOW`})(jt||={});var Mt;(function(e){e.END_SENSITIVITY_UNSPECIFIED=`END_SENSITIVITY_UNSPECIFIED`,e.END_SENSITIVITY_HIGH=`END_SENSITIVITY_HIGH`,e.END_SENSITIVITY_LOW=`END_SENSITIVITY_LOW`})(Mt||={});var Nt;(function(e){e.ACTIVITY_HANDLING_UNSPECIFIED=`ACTIVITY_HANDLING_UNSPECIFIED`,e.START_OF_ACTIVITY_INTERRUPTS=`START_OF_ACTIVITY_INTERRUPTS`,e.NO_INTERRUPTION=`NO_INTERRUPTION`})(Nt||={});var Pt;(function(e){e.TURN_COVERAGE_UNSPECIFIED=`TURN_COVERAGE_UNSPECIFIED`,e.TURN_INCLUDES_ONLY_ACTIVITY=`TURN_INCLUDES_ONLY_ACTIVITY`,e.TURN_INCLUDES_ALL_INPUT=`TURN_INCLUDES_ALL_INPUT`,e.TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO=`TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`})(Pt||={});var Ft;(function(e){e.SCALE_UNSPECIFIED=`SCALE_UNSPECIFIED`,e.C_MAJOR_A_MINOR=`C_MAJOR_A_MINOR`,e.D_FLAT_MAJOR_B_FLAT_MINOR=`D_FLAT_MAJOR_B_FLAT_MINOR`,e.D_MAJOR_B_MINOR=`D_MAJOR_B_MINOR`,e.E_FLAT_MAJOR_C_MINOR=`E_FLAT_MAJOR_C_MINOR`,e.E_MAJOR_D_FLAT_MINOR=`E_MAJOR_D_FLAT_MINOR`,e.F_MAJOR_D_MINOR=`F_MAJOR_D_MINOR`,e.G_FLAT_MAJOR_E_FLAT_MINOR=`G_FLAT_MAJOR_E_FLAT_MINOR`,e.G_MAJOR_E_MINOR=`G_MAJOR_E_MINOR`,e.A_FLAT_MAJOR_F_MINOR=`A_FLAT_MAJOR_F_MINOR`,e.A_MAJOR_G_FLAT_MINOR=`A_MAJOR_G_FLAT_MINOR`,e.B_FLAT_MAJOR_G_MINOR=`B_FLAT_MAJOR_G_MINOR`,e.B_MAJOR_A_FLAT_MINOR=`B_MAJOR_A_FLAT_MINOR`})(Ft||={});var It;(function(e){e.MUSIC_GENERATION_MODE_UNSPECIFIED=`MUSIC_GENERATION_MODE_UNSPECIFIED`,e.QUALITY=`QUALITY`,e.DIVERSITY=`DIVERSITY`,e.VOCALIZATION=`VOCALIZATION`})(It||={});var Lt;(function(e){e.PLAYBACK_CONTROL_UNSPECIFIED=`PLAYBACK_CONTROL_UNSPECIFIED`,e.PLAY=`PLAY`,e.PAUSE=`PAUSE`,e.STOP=`STOP`,e.RESET_CONTEXT=`RESET_CONTEXT`})(Lt||={});var Rt=class{constructor(e){let t={};for(let n of e.headers.entries())t[n[0]]=n[1];this.headers=t,this.responseInternal=e}json(){return this.responseInternal.json()}},zt=class{get text(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning text from the first one.`);let e=``,t=!1,n=[];for(let r of this.candidates?.[0]?.content?.parts??[]){for(let[e,t]of Object.entries(r))e!==`text`&&e!==`thought`&&e!==`thoughtSignature`&&(t!==null||t!==void 0)&&n.push(e);if(typeof r.text==`string`){if(typeof r.thought==`boolean`&&r.thought)continue;t=!0,e+=r.text}}return n.length>0&&console.warn(`there are non-text parts ${n} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),t?e:void 0}get data(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning data from the first one.`);let e=``,t=[];for(let n of this.candidates?.[0]?.content?.parts??[]){for(let[e,r]of Object.entries(n))e!==`inlineData`&&(r!==null||r!==void 0)&&t.push(e);n.inlineData&&typeof n.inlineData.data==`string`&&(e+=atob(n.inlineData.data))}return t.length>0&&console.warn(`there are non-data parts ${t} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),e.length>0?btoa(e):void 0}get functionCalls(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning function calls from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.functionCall).map(e=>e.functionCall).filter(e=>e!==void 0);if(e?.length!==0)return e}get executableCode(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning executable code from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.executableCode).map(e=>e.executableCode).filter(e=>e!==void 0);if(e?.length!==0)return e?.[0]?.code}get codeExecutionResult(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning code execution result from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.codeExecutionResult).map(e=>e.codeExecutionResult).filter(e=>e!==void 0);if(e?.length!==0)return e?.[0]?.output}},Bt=class{},Vt=class{},Ht=class{},Ut=class{},Wt=class{},Gt=class{},Kt=class{},qt=class{},Jt=class{},Yt=class{},Xt=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i,a=t;return i=n?me(a):pe(a),Object.assign(r,i),r}},Zt=class{},Qt=class{},$t=class{},en=class{},tn=class{},nn=class{},rn=class{},an=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i=xe(t);return Object.assign(r,i),r}},on=class{},sn=class{},cn=class{},ln=class{},un=class{},dn=class{get text(){let e=``,t=!1,n=[];for(let r of this.serverContent?.modelTurn?.parts??[]){for(let[e,t]of Object.entries(r))e!==`text`&&e!==`thought`&&t!==null&&n.push(e);if(typeof r.text==`string`){if(typeof r.thought==`boolean`&&r.thought)continue;t=!0,e+=r.text}}return n.length>0&&console.warn(`there are non-text parts ${n} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),t?e:void 0}get data(){let e=``,t=[];for(let n of this.serverContent?.modelTurn?.parts??[]){for(let[e,r]of Object.entries(n))e!==`inlineData`&&r!==null&&t.push(e);n.inlineData&&typeof n.inlineData.data==`string`&&(e+=atob(n.inlineData.data))}return t.length>0&&console.warn(`there are non-data parts ${t} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),e.length>0?btoa(e):void 0}},fn=class{get audioChunk(){if(this.serverContent&&this.serverContent.audioChunks&&this.serverContent.audioChunks.length>0)return this.serverContent.audioChunks[0]}},pn=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i=Ce(t);return Object.assign(r,i),r}};function I(e,t){if(!t||typeof t!=`string`)throw Error(`model is required and must be a string`);if(t.includes(`..`)||t.includes(`?`)||t.includes(`&`))throw Error(`invalid model parameter`);if(e.isVertexAI()){if(t.startsWith(`publishers/`)||t.startsWith(`projects/`)||t.startsWith(`models/`))return t;if(t.indexOf(`/`)>=0){let e=t.split(`/`,2);return`publishers/${e[0]}/models/${e[1]}`}else return`publishers/google/models/${t}`}else if(t.startsWith(`models/`)||t.startsWith(`tunedModels/`))return t;else return`models/${t}`}function mn(e,t){let n=I(e,t);return n?n.startsWith(`publishers/`)&&e.isVertexAI()?`projects/${e.getProject()}/locations/${e.getLocation()}/${n}`:n.startsWith(`models/`)&&e.isVertexAI()?`projects/${e.getProject()}/locations/${e.getLocation()}/publishers/google/${n}`:n:``}function hn(e){return Array.isArray(e)?e.map(e=>gn(e)):[gn(e)]}function gn(e){if(typeof e==`object`&&e)return e;throw Error(`Could not parse input as Blob. Unsupported blob type: ${typeof e}`)}function _n(e){let t=gn(e);if(t.mimeType&&t.mimeType.startsWith(`image/`))return t;throw Error(`Unsupported mime type: ${t.mimeType}`)}function vn(e){let t=gn(e);if(t.mimeType&&t.mimeType.startsWith(`audio/`))return t;throw Error(`Unsupported mime type: ${t.mimeType}`)}function yn(e){if(e==null)throw Error(`PartUnion is required`);if(typeof e==`object`)return e;if(typeof e==`string`)return{text:e};throw Error(`Unsupported part type: ${typeof e}`)}function bn(e){if(e==null||Array.isArray(e)&&e.length===0)throw Error(`PartListUnion is required`);return Array.isArray(e)?e.map(e=>yn(e)):[yn(e)]}function xn(e){return typeof e==`object`&&!!e&&`parts`in e&&Array.isArray(e.parts)}function Sn(e){return typeof e==`object`&&!!e&&`functionCall`in e}function Cn(e){return typeof e==`object`&&!!e&&`functionResponse`in e}function L(e){if(e==null)throw Error(`ContentUnion is required`);return xn(e)?e:{role:`user`,parts:bn(e)}}function wn(e,t){if(!t)return[];if(e.isVertexAI()&&Array.isArray(t))return t.flatMap(e=>{let t=L(e);return t.parts&&t.parts.length>0&&t.parts[0].text!==void 0?[t.parts[0].text]:[]});if(e.isVertexAI()){let e=L(t);return e.parts&&e.parts.length>0&&e.parts[0].text!==void 0?[e.parts[0].text]:[]}return Array.isArray(t)?t.map(e=>L(e)):[L(t)]}function R(e){if(e==null||Array.isArray(e)&&e.length===0)throw Error(`contents are required`);if(!Array.isArray(e)){if(Sn(e)||Cn(e))throw Error(`To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them`);return[L(e)]}let t=[],n=[],r=xn(e[0]);for(let i of e){let e=xn(i);if(e!=r)throw Error(`Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them`);if(e)t.push(i);else if(Sn(i)||Cn(i))throw Error(`To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them`);else n.push(i)}return r||t.push({role:`user`,parts:bn(n)}),t}function Tn(e,t){e.includes(`null`)&&(t.nullable=!0);let n=e.filter(e=>e!==`null`);if(n.length===1)t.type=Object.values(Ae).includes(n[0].toUpperCase())?n[0].toUpperCase():Ae.TYPE_UNSPECIFIED;else{t.anyOf=[];for(let e of n)t.anyOf.push({type:Object.values(Ae).includes(e.toUpperCase())?e.toUpperCase():Ae.TYPE_UNSPECIFIED})}}function En(e){let t={},n=[`items`],r=[`anyOf`],i=[`properties`];if(e.type&&e.anyOf)throw Error(`type and anyOf cannot be both populated.`);let a=e.anyOf;a!=null&&a.length==2&&(a[0].type===`null`?(t.nullable=!0,e=a[1]):a[1].type===`null`&&(t.nullable=!0,e=a[0])),e.type instanceof Array&&Tn(e.type,t);for(let[a,o]of Object.entries(e))if(o!=null)if(a==`type`){if(o===`null`)throw Error(`type: null can not be the only possible type for the field.`);if(o instanceof Array)continue;t.type=Object.values(Ae).includes(o.toUpperCase())?o.toUpperCase():Ae.TYPE_UNSPECIFIED}else if(n.includes(a))t[a]=En(o);else if(r.includes(a)){let e=[];for(let n of o){if(n.type==`null`){t.nullable=!0;continue}e.push(En(n))}t[a]=e}else if(i.includes(a)){let e={};for(let[t,n]of Object.entries(o))e[t]=En(n);t[a]=e}else{if(a===`additionalProperties`)continue;t[a]=o}return t}function Dn(e){return En(e)}function On(e){if(typeof e==`object`)return e;if(typeof e==`string`)return{voiceConfig:{prebuiltVoiceConfig:{voiceName:e}}};throw Error(`Unsupported speechConfig type: ${typeof e}`)}function kn(e){if(`multiSpeakerVoiceConfig`in e)throw Error(`multiSpeakerVoiceConfig is not supported in the live API.`);return e}function An(e){if(e.functionDeclarations)for(let t of e.functionDeclarations)t.parameters&&(Object.keys(t.parameters).includes(`$schema`)?t.parametersJsonSchema||(t.parametersJsonSchema=t.parameters,delete t.parameters):t.parameters=En(t.parameters)),t.response&&(Object.keys(t.response).includes(`$schema`)?t.responseJsonSchema||(t.responseJsonSchema=t.response,delete t.response):t.response=En(t.response));return e}function jn(e){if(e==null)throw Error(`tools is required`);if(!Array.isArray(e))throw Error(`tools is required and must be an array of Tools`);let t=[];for(let n of e)t.push(n);return t}function Mn(e,t,n,r=1){let i=!t.startsWith(`${n}/`)&&t.split(`/`).length===r;return e.isVertexAI()?t.startsWith(`projects/`)?t:t.startsWith(`locations/`)?`projects/${e.getProject()}/${t}`:t.startsWith(`${n}/`)?`projects/${e.getProject()}/locations/${e.getLocation()}/${t}`:i?`projects/${e.getProject()}/locations/${e.getLocation()}/${n}/${t}`:t:i?`${n}/${t}`:t}function z(e,t){if(typeof t!=`string`)throw Error(`name must be a string`);return Mn(e,t,`cachedContents`)}function Nn(e){switch(e){case`STATE_UNSPECIFIED`:return`JOB_STATE_UNSPECIFIED`;case`CREATING`:return`JOB_STATE_RUNNING`;case`ACTIVE`:return`JOB_STATE_SUCCEEDED`;case`FAILED`:return`JOB_STATE_FAILED`;default:return e}}function B(e){return de(e)}function Pn(e){return typeof e==`object`&&!!e&&`name`in e}function Fn(e){return typeof e==`object`&&!!e&&`video`in e}function In(e){return typeof e==`object`&&!!e&&`uri`in e}function Ln(e){let t;if(Pn(e)&&(t=e.name),!(In(e)&&(t=e.uri,t===void 0))&&!(Fn(e)&&(t=e.video?.uri,t===void 0))){if(typeof e==`string`&&(t=e),t===void 0)throw Error(`Could not extract file name from the provided input.`);if(t.startsWith(`https://`)){let e=t.split(`files/`)[1].match(/[a-z0-9]+/);if(e===null)throw Error(`Could not extract file name from URI ${t}`);t=e[0]}else t.startsWith(`files/`)&&(t=t.split(`files/`)[1]);return t}}function Rn(e,t){let n;return n=e.isVertexAI()?t?`publishers/google/models`:`models`:t?`models`:`tunedModels`,n}function zn(e){for(let t of[`models`,`tunedModels`,`publisherModels`])if(Bn(e,t))return e[t];return[]}function Bn(e,t){return typeof e==`object`&&!!e&&t in e}function Vn(e,t={}){let n=e,r={name:n.name,description:n.description,parametersJsonSchema:n.inputSchema};return n.outputSchema&&(r.responseJsonSchema=n.outputSchema),t.behavior&&(r.behavior=t.behavior),{functionDeclarations:[r]}}function Hn(e,t={}){let n=[],r=new Set;for(let i of e){let e=i.name;if(r.has(e))throw Error(`Duplicate function name ${e} found in MCP tools. Please ensure function names are unique.`);r.add(e);let a=Vn(i,t);a.functionDeclarations&&n.push(...a.functionDeclarations)}return{functionDeclarations:n}}function Un(e,t){let n;if(typeof t==`string`)if(e.isVertexAI())if(t.startsWith(`gs://`))n={format:`jsonl`,gcsUri:[t]};else if(t.startsWith(`bq://`))n={format:`bigquery`,bigqueryUri:t};else throw Error(`Unsupported string source for Vertex AI: ${t}`);else if(t.startsWith(`files/`))n={fileName:t};else throw Error(`Unsupported string source for Gemini API: ${t}`);else if(Array.isArray(t)){if(e.isVertexAI())throw Error(`InlinedRequest[] is not supported in Vertex AI.`);n={inlinedRequests:t}}else n=t;let r=[n.gcsUri,n.bigqueryUri].filter(Boolean).length,i=[n.inlinedRequests,n.fileName].filter(Boolean).length;if(e.isVertexAI()){if(i>0||r!==1)throw Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.")}else if(r>0||i!==1)throw Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");return n}function Wn(e){if(typeof e!=`string`)return e;let t=e;if(t.startsWith(`gs://`))return{format:`jsonl`,gcsUri:t};if(t.startsWith(`bq://`))return{format:`bigquery`,bigqueryUri:t};throw Error(`Unsupported destination: ${t}`)}function Gn(e){if(typeof e!=`object`||!e)return{};let t=e,n=t.inlinedResponses;if(typeof n!=`object`||!n)return e;let r=n.inlinedResponses;if(!Array.isArray(r)||r.length===0)return e;let i=!1;for(let e of r){if(typeof e!=`object`||!e)continue;let t=e.response;if(!(typeof t!=`object`||!t)&&t.embedding!==void 0){i=!0;break}}return i&&(t.inlinedEmbedContentResponses=t.inlinedResponses,delete t.inlinedResponses),e}function Kn(e,t){let n=t;if(!e.isVertexAI()){if(/batches\/[^/]+$/.test(n))return n.split(`/`).pop();throw Error(`Invalid batch job name: ${n}.`)}if(/^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/.test(n))return n.split(`/`).pop();if(/^\d+$/.test(n))return n;throw Error(`Invalid batch job name: ${n}.`)}function qn(e){let t=e;return t===`BATCH_STATE_UNSPECIFIED`?`JOB_STATE_UNSPECIFIED`:t===`BATCH_STATE_PENDING`?`JOB_STATE_PENDING`:t===`BATCH_STATE_RUNNING`?`JOB_STATE_RUNNING`:t===`BATCH_STATE_SUCCEEDED`?`JOB_STATE_SUCCEEDED`:t===`BATCH_STATE_FAILED`?`JOB_STATE_FAILED`:t===`BATCH_STATE_CANCELLED`?`JOB_STATE_CANCELLED`:t===`BATCH_STATE_EXPIRED`?`JOB_STATE_EXPIRED`:t}function Jn(e){return e.includes(`gemini`)&&e!==`gemini-embedding-001`||e.includes(`maas`)}function Yn(e){let t={},n=F(e,[`apiKey`]);if(n!=null&&P(t,[`apiKey`],n),F(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(F(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(F(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(F(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(F(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(F(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Xn(e){let t={},n=F(e,[`responsesFile`]);n!=null&&P(t,[`fileName`],n);let r=F(e,[`inlinedResponses`,`inlinedResponses`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Pr(e))),P(t,[`inlinedResponses`],e)}let i=F(e,[`inlinedEmbedContentResponses`,`inlinedResponses`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`inlinedEmbedContentResponses`],e)}return t}function Zn(e){let t={},n=F(e,[`predictionsFormat`]);n!=null&&P(t,[`format`],n);let r=F(e,[`gcsDestination`,`outputUriPrefix`]);r!=null&&P(t,[`gcsUri`],r);let i=F(e,[`bigqueryDestination`,`outputUri`]);return i!=null&&P(t,[`bigqueryUri`],i),t}function Qn(e){let t={},n=F(e,[`format`]);n!=null&&P(t,[`predictionsFormat`],n);let r=F(e,[`gcsUri`]);r!=null&&P(t,[`gcsDestination`,`outputUriPrefix`],r);let i=F(e,[`bigqueryUri`]);if(i!=null&&P(t,[`bigqueryDestination`,`outputUri`],i),F(e,[`fileName`])!==void 0)throw Error(`fileName parameter is not supported in Vertex AI.`);if(F(e,[`inlinedResponses`])!==void 0)throw Error(`inlinedResponses parameter is not supported in Vertex AI.`);if(F(e,[`inlinedEmbedContentResponses`])!==void 0)throw Error(`inlinedEmbedContentResponses parameter is not supported in Vertex AI.`);return t}function $n(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`,`displayName`]);r!=null&&P(t,[`displayName`],r);let i=F(e,[`metadata`,`state`]);i!=null&&P(t,[`state`],qn(i));let a=F(e,[`metadata`,`createTime`]);a!=null&&P(t,[`createTime`],a);let o=F(e,[`metadata`,`endTime`]);o!=null&&P(t,[`endTime`],o);let s=F(e,[`metadata`,`updateTime`]);s!=null&&P(t,[`updateTime`],s);let c=F(e,[`metadata`,`model`]);c!=null&&P(t,[`model`],c);let l=F(e,[`metadata`,`output`]);return l!=null&&P(t,[`dest`],Xn(Gn(l))),t}function er(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`displayName`]);r!=null&&P(t,[`displayName`],r);let i=F(e,[`state`]);i!=null&&P(t,[`state`],qn(i));let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`createTime`]);o!=null&&P(t,[`createTime`],o);let s=F(e,[`startTime`]);s!=null&&P(t,[`startTime`],s);let c=F(e,[`endTime`]);c!=null&&P(t,[`endTime`],c);let l=F(e,[`updateTime`]);l!=null&&P(t,[`updateTime`],l);let u=F(e,[`model`]);u!=null&&P(t,[`model`],u);let d=F(e,[`inputConfig`]);d!=null&&P(t,[`src`],tr(d));let f=F(e,[`outputConfig`]);f!=null&&P(t,[`dest`],Zn(Gn(f)));let p=F(e,[`completionStats`]);return p!=null&&P(t,[`completionStats`],p),t}function tr(e){let t={},n=F(e,[`instancesFormat`]);n!=null&&P(t,[`format`],n);let r=F(e,[`gcsSource`,`uris`]);r!=null&&P(t,[`gcsUri`],r);let i=F(e,[`bigquerySource`,`inputUri`]);return i!=null&&P(t,[`bigqueryUri`],i),t}function nr(e,t){let n={};if(F(t,[`format`])!==void 0)throw Error(`format parameter is not supported in Gemini API.`);if(F(t,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);if(F(t,[`bigqueryUri`])!==void 0)throw Error(`bigqueryUri parameter is not supported in Gemini API.`);let r=F(t,[`fileName`]);r!=null&&P(n,[`fileName`],r);let i=F(t,[`inlinedRequests`]);if(i!=null){let t=i;Array.isArray(t)&&(t=t.map(t=>Nr(e,t))),P(n,[`requests`,`requests`],t)}return n}function rr(e){let t={},n=F(e,[`format`]);n!=null&&P(t,[`instancesFormat`],n);let r=F(e,[`gcsUri`]);r!=null&&P(t,[`gcsSource`,`uris`],r);let i=F(e,[`bigqueryUri`]);if(i!=null&&P(t,[`bigquerySource`,`inputUri`],i),F(e,[`fileName`])!==void 0)throw Error(`fileName parameter is not supported in Vertex AI.`);if(F(e,[`inlinedRequests`])!==void 0)throw Error(`inlinedRequests parameter is not supported in Vertex AI.`);return t}function ir(e){let t={},n=F(e,[`data`]);if(n!=null&&P(t,[`data`],n),F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function ar(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function or(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function sr(e){let t={},n=F(e,[`content`]);n!=null&&P(t,[`content`],n);let r=F(e,[`citationMetadata`]);r!=null&&P(t,[`citationMetadata`],cr(r));let i=F(e,[`tokenCount`]);i!=null&&P(t,[`tokenCount`],i);let a=F(e,[`finishReason`]);a!=null&&P(t,[`finishReason`],a);let o=F(e,[`groundingMetadata`]);o!=null&&P(t,[`groundingMetadata`],o);let s=F(e,[`avgLogprobs`]);s!=null&&P(t,[`avgLogprobs`],s);let c=F(e,[`index`]);c!=null&&P(t,[`index`],c);let l=F(e,[`logprobsResult`]);l!=null&&P(t,[`logprobsResult`],l);let u=F(e,[`safetyRatings`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`safetyRatings`],e)}let d=F(e,[`urlContextMetadata`]);return d!=null&&P(t,[`urlContextMetadata`],d),t}function cr(e){let t={},n=F(e,[`citationSources`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`citations`],e)}return t}function lr(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>Vr(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function ur(e,t){let n={},r=F(e,[`displayName`]);if(t!==void 0&&r!=null&&P(t,[`batch`,`displayName`],r),F(e,[`dest`])!==void 0)throw Error(`dest parameter is not supported in Gemini API.`);return n}function dr(e,t){let n={},r=F(e,[`displayName`]);t!==void 0&&r!=null&&P(t,[`displayName`],r);let i=F(e,[`dest`]);return t!==void 0&&i!=null&&P(t,[`outputConfig`],Qn(Wn(i))),n}function fr(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`_url`,`model`],I(e,r));let i=F(t,[`src`]);i!=null&&P(n,[`batch`,`inputConfig`],nr(e,Un(e,i)));let a=F(t,[`config`]);return a!=null&&ur(a,n),n}function pr(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`model`],I(e,r));let i=F(t,[`src`]);i!=null&&P(n,[`inputConfig`],rr(Un(e,i)));let a=F(t,[`config`]);return a!=null&&dr(a,n),n}function mr(e,t){let n={},r=F(e,[`displayName`]);return t!==void 0&&r!=null&&P(t,[`batch`,`displayName`],r),n}function hr(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`_url`,`model`],I(e,r));let i=F(t,[`src`]);i!=null&&P(n,[`batch`,`inputConfig`],Sr(e,i));let a=F(t,[`config`]);return a!=null&&mr(a,n),n}function gr(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function _r(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function vr(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`name`]);r!=null&&P(t,[`name`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);return a!=null&&P(t,[`error`],a),t}function yr(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`name`]);r!=null&&P(t,[`name`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);return a!=null&&P(t,[`error`],a),t}function br(e,t){let n={},r=F(t,[`contents`]);if(r!=null){let t=wn(e,r);Array.isArray(t)&&(t=t.map(e=>e)),P(n,[`requests[]`,`request`,`content`],t)}let i=F(t,[`config`]);return i!=null&&(P(n,[`_self`],xr(i,n)),le(n,{"requests[].*":`requests[].request.*`})),n}function xr(e,t){let n={},r=F(e,[`taskType`]);t!==void 0&&r!=null&&P(t,[`requests[]`,`taskType`],r);let i=F(e,[`title`]);t!==void 0&&i!=null&&P(t,[`requests[]`,`title`],i);let a=F(e,[`outputDimensionality`]);if(t!==void 0&&a!=null&&P(t,[`requests[]`,`outputDimensionality`],a),F(e,[`mimeType`])!==void 0)throw Error(`mimeType parameter is not supported in Gemini API.`);if(F(e,[`autoTruncate`])!==void 0)throw Error(`autoTruncate parameter is not supported in Gemini API.`);return n}function Sr(e,t){let n={},r=F(t,[`fileName`]);r!=null&&P(n,[`file_name`],r);let i=F(t,[`inlinedRequests`]);return i!=null&&P(n,[`requests`],br(e,i)),n}function Cr(e){let t={};if(F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=F(e,[`fileUri`]);n!=null&&P(t,[`fileUri`],n);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function wr(e){let t={},n=F(e,[`id`]);n!=null&&P(t,[`id`],n);let r=F(e,[`args`]);r!=null&&P(t,[`args`],r);let i=F(e,[`name`]);if(i!=null&&P(t,[`name`],i),F(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(F(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function Tr(e){let t={},n=F(e,[`allowedFunctionNames`]);n!=null&&P(t,[`allowedFunctionNames`],n);let r=F(e,[`mode`]);if(r!=null&&P(t,[`mode`],r),F(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return t}function Er(e,t,n){let r={},i=F(t,[`systemInstruction`]);n!==void 0&&i!=null&&P(n,[`systemInstruction`],lr(L(i)));let a=F(t,[`temperature`]);a!=null&&P(r,[`temperature`],a);let o=F(t,[`topP`]);o!=null&&P(r,[`topP`],o);let s=F(t,[`topK`]);s!=null&&P(r,[`topK`],s);let c=F(t,[`candidateCount`]);c!=null&&P(r,[`candidateCount`],c);let l=F(t,[`maxOutputTokens`]);l!=null&&P(r,[`maxOutputTokens`],l);let u=F(t,[`stopSequences`]);u!=null&&P(r,[`stopSequences`],u);let d=F(t,[`responseLogprobs`]);d!=null&&P(r,[`responseLogprobs`],d);let f=F(t,[`logprobs`]);f!=null&&P(r,[`logprobs`],f);let p=F(t,[`presencePenalty`]);p!=null&&P(r,[`presencePenalty`],p);let m=F(t,[`frequencyPenalty`]);m!=null&&P(r,[`frequencyPenalty`],m);let h=F(t,[`seed`]);h!=null&&P(r,[`seed`],h);let g=F(t,[`responseMimeType`]);g!=null&&P(r,[`responseMimeType`],g);let _=F(t,[`responseSchema`]);_!=null&&P(r,[`responseSchema`],Dn(_));let v=F(t,[`responseJsonSchema`]);if(v!=null&&P(r,[`responseJsonSchema`],v),F(t,[`routingConfig`])!==void 0)throw Error(`routingConfig parameter is not supported in Gemini API.`);if(F(t,[`modelSelectionConfig`])!==void 0)throw Error(`modelSelectionConfig parameter is not supported in Gemini API.`);let y=F(t,[`safetySettings`]);if(n!==void 0&&y!=null){let e=y;Array.isArray(e)&&(e=e.map(e=>Hr(e))),P(n,[`safetySettings`],e)}let b=F(t,[`tools`]);if(n!==void 0&&b!=null){let e=jn(b);Array.isArray(e)&&(e=e.map(e=>Wr(An(e)))),P(n,[`tools`],e)}let x=F(t,[`toolConfig`]);if(n!==void 0&&x!=null&&P(n,[`toolConfig`],Ur(x)),F(t,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let S=F(t,[`cachedContent`]);n!==void 0&&S!=null&&P(n,[`cachedContent`],z(e,S));let C=F(t,[`responseModalities`]);C!=null&&P(r,[`responseModalities`],C);let w=F(t,[`mediaResolution`]);w!=null&&P(r,[`mediaResolution`],w);let T=F(t,[`speechConfig`]);if(T!=null&&P(r,[`speechConfig`],On(T)),F(t,[`audioTimestamp`])!==void 0)throw Error(`audioTimestamp parameter is not supported in Gemini API.`);let E=F(t,[`thinkingConfig`]);E!=null&&P(r,[`thinkingConfig`],E);let D=F(t,[`imageConfig`]);D!=null&&P(r,[`imageConfig`],Mr(D));let O=F(t,[`enableEnhancedCivicAnswers`]);if(O!=null&&P(r,[`enableEnhancedCivicAnswers`],O),F(t,[`modelArmorConfig`])!==void 0)throw Error(`modelArmorConfig parameter is not supported in Gemini API.`);let k=F(t,[`serviceTier`]);return n!==void 0&&k!=null&&P(n,[`serviceTier`],k),r}function Dr(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`candidates`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>sr(e))),P(t,[`candidates`],e)}let i=F(e,[`modelVersion`]);i!=null&&P(t,[`modelVersion`],i);let a=F(e,[`promptFeedback`]);a!=null&&P(t,[`promptFeedback`],a);let o=F(e,[`responseId`]);o!=null&&P(t,[`responseId`],o);let s=F(e,[`usageMetadata`]);s!=null&&P(t,[`usageMetadata`],s);let c=F(e,[`modelStatus`]);return c!=null&&P(t,[`modelStatus`],c),t}function Or(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function kr(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],Kn(e,r)),n}function Ar(e){let t={},n=F(e,[`authConfig`]);n!=null&&P(t,[`authConfig`],Yn(n));let r=F(e,[`enableWidget`]);return r!=null&&P(t,[`enableWidget`],r),t}function jr(e){let t={},n=F(e,[`searchTypes`]);if(n!=null&&P(t,[`searchTypes`],n),F(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(F(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=F(e,[`timeRangeFilter`]);return r!=null&&P(t,[`timeRangeFilter`],r),t}function Mr(e){let t={},n=F(e,[`aspectRatio`]);n!=null&&P(t,[`aspectRatio`],n);let r=F(e,[`imageSize`]);if(r!=null&&P(t,[`imageSize`],r),F(e,[`personGeneration`])!==void 0)throw Error(`personGeneration parameter is not supported in Gemini API.`);if(F(e,[`prominentPeople`])!==void 0)throw Error(`prominentPeople parameter is not supported in Gemini API.`);if(F(e,[`outputMimeType`])!==void 0)throw Error(`outputMimeType parameter is not supported in Gemini API.`);if(F(e,[`outputCompressionQuality`])!==void 0)throw Error(`outputCompressionQuality parameter is not supported in Gemini API.`);if(F(e,[`imageOutputOptions`])!==void 0)throw Error(`imageOutputOptions parameter is not supported in Gemini API.`);return t}function Nr(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`request`,`model`],I(e,r));let i=F(t,[`contents`]);if(i!=null){let e=R(i);Array.isArray(e)&&(e=e.map(e=>lr(e))),P(n,[`request`,`contents`],e)}let a=F(t,[`metadata`]);a!=null&&P(n,[`metadata`],a);let o=F(t,[`config`]);return o!=null&&P(n,[`request`,`generationConfig`],Er(e,o,F(n,[`request`],{}))),n}function Pr(e){let t={},n=F(e,[`response`]);n!=null&&P(t,[`response`],Dr(n));let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`error`]);return i!=null&&P(t,[`error`],i),t}function Fr(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);if(t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),F(e,[`filter`])!==void 0)throw Error(`filter parameter is not supported in Gemini API.`);return n}function Ir(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i);let a=F(e,[`filter`]);return t!==void 0&&a!=null&&P(t,[`_query`,`filter`],a),n}function Lr(e){let t={},n=F(e,[`config`]);return n!=null&&Fr(n,t),t}function Rr(e){let t={},n=F(e,[`config`]);return n!=null&&Ir(n,t),t}function zr(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`operations`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>$n(e))),P(t,[`batchJobs`],e)}return t}function Br(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`batchPredictionJobs`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>er(e))),P(t,[`batchJobs`],e)}return t}function Vr(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],Cr(a));let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],wr(o));let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],ir(c));let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);f!=null&&P(t,[`videoMetadata`],f);let p=F(e,[`toolCall`]);p!=null&&P(t,[`toolCall`],p);let m=F(e,[`toolResponse`]);m!=null&&P(t,[`toolResponse`],m);let h=F(e,[`partMetadata`]);return h!=null&&P(t,[`partMetadata`],h),t}function Hr(e){let t={},n=F(e,[`category`]);if(n!=null&&P(t,[`category`],n),F(e,[`method`])!==void 0)throw Error(`method parameter is not supported in Gemini API.`);let r=F(e,[`threshold`]);return r!=null&&P(t,[`threshold`],r),t}function Ur(e){let t={},n=F(e,[`retrievalConfig`]);n!=null&&P(t,[`retrievalConfig`],n);let r=F(e,[`functionCallingConfig`]);r!=null&&P(t,[`functionCallingConfig`],Tr(r));let i=F(e,[`includeServerSideToolInvocations`]);return i!=null&&P(t,[`includeServerSideToolInvocations`],i),t}function Wr(e){let t={};if(F(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=F(e,[`computerUse`]);n!=null&&P(t,[`computerUse`],n);let r=F(e,[`fileSearch`]);r!=null&&P(t,[`fileSearch`],r);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],jr(i));let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],Ar(a));let o=F(e,[`codeExecution`]);if(o!=null&&P(t,[`codeExecution`],o),F(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=F(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`functionDeclarations`],e)}let c=F(e,[`googleSearchRetrieval`]);if(c!=null&&P(t,[`googleSearchRetrieval`],c),F(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=F(e,[`urlContext`]);l!=null&&P(t,[`urlContext`],l);let u=F(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`mcpServers`],e)}return t}var V;(function(e){e.PAGED_ITEM_BATCH_JOBS=`batchJobs`,e.PAGED_ITEM_MODELS=`models`,e.PAGED_ITEM_TUNING_JOBS=`tuningJobs`,e.PAGED_ITEM_FILES=`files`,e.PAGED_ITEM_CACHED_CONTENTS=`cachedContents`,e.PAGED_ITEM_FILE_SEARCH_STORES=`fileSearchStores`,e.PAGED_ITEM_DOCUMENTS=`documents`})(V||={});var Gr=class{constructor(e,t,n,r){this.pageInternal=[],this.paramsInternal={},this.requestInternal=t,this.init(e,n,r)}init(e,t,n){this.nameInternal=e,this.pageInternal=t[this.nameInternal]||[],this.sdkHttpResponseInternal=t?.sdkHttpResponse,this.idxInternal=0;let r={config:{}};r=!n||Object.keys(n).length===0?{config:{}}:typeof n==`object`?Object.assign({},n):n,r.config&&(r.config.pageToken=t.nextPageToken),this.paramsInternal=r,this.pageInternalSize=r.config?.pageSize??this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get sdkHttpResponse(){return this.sdkHttpResponseInternal}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};let e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw Error(`No more pages to fetch.`);let e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){return this.params.config?.pageToken!==void 0}},Kr=class extends M{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Gr(V.PAGED_ITEM_BATCH_JOBS,e=>this.listInternal(e),await this.listInternal(e),e),this.create=async e=>(this.apiClient.isVertexAI()&&(e.config=this.formatDestination(e.src,e.config)),this.createInternal(e)),this.createEmbeddings=async e=>{if(console.warn(`batches.createEmbeddings() is experimental and may change without notice.`),this.apiClient.isVertexAI())throw Error(`Vertex AI does not support batches.createEmbeddings.`);return this.createEmbeddingsInternal(e)}}createInlinedGenerateContentRequest(e){let t=fr(this.apiClient,e),n=t._url,r=N(`{model}:batchGenerateContent`,n),i=t.batch.inputConfig.requests,a=i.requests,o=[];for(let e of a){let t=Object.assign({},e);if(t.systemInstruction){let e=t.systemInstruction;delete t.systemInstruction;let n=t.request;n.systemInstruction=e,t.request=n}o.push(t)}return i.requests=o,delete t.config,delete t._url,delete t._query,{path:r,body:t}}getGcsUri(e){if(typeof e==`string`)return e.startsWith(`gs://`)?e:void 0;if(!Array.isArray(e)&&e.gcsUri&&e.gcsUri.length>0)return e.gcsUri[0]}getBigqueryUri(e){if(typeof e==`string`)return e.startsWith(`bq://`)?e:void 0;if(!Array.isArray(e))return e.bigqueryUri}formatDestination(e,t){let n=t?Object.assign({},t):{},r=Date.now().toString();if(n.displayName||=`genaiBatchJob_${r}`,n.dest===void 0){let t=this.getGcsUri(e),i=this.getBigqueryUri(e);if(t)t.endsWith(`.jsonl`)?n.dest=`${t.slice(0,-6)}/dest`:n.dest=`${t}_dest_${r}`;else if(i)n.dest=`${i}_dest_${r}`;else throw Error(`Unsupported source for Vertex AI: No GCS or BigQuery URI found.`)}return n}async createInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=pr(this.apiClient,e);return n=N(`batchPredictionJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>er(e))}else{let i=fr(this.apiClient,e);return n=N(`{model}:batchGenerateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>$n(e))}}async createEmbeddingsInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=hr(this.apiClient,e);return n=N(`{model}:asyncBatchEmbedContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>$n(e))}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=kr(this.apiClient,e);return n=N(`batchPredictionJobs/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>er(e))}else{let i=Or(this.apiClient,e);return n=N(`batches/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>$n(e))}}async cancel(e){let t=``,n={};if(this.apiClient.isVertexAI()){let r=or(this.apiClient,e);t=N(`batchPredictionJobs/{name}:cancel`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}else{let r=ar(this.apiClient,e);t=N(`batches/{name}:cancel`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Rr(e);return n=N(`batchPredictionJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Br(e),n=new un;return Object.assign(n,t),n})}else{let i=Lr(e);return n=N(`batches`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=zr(e),n=new un;return Object.assign(n,t),n})}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=_r(this.apiClient,e);return n=N(`batchPredictionJobs/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>yr(e))}else{let i=gr(this.apiClient,e);return n=N(`batches/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>vr(e))}}};function qr(e){let t={},n=F(e,[`apiKey`]);if(n!=null&&P(t,[`apiKey`],n),F(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(F(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(F(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(F(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(F(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(F(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Jr(e){let t={},n=F(e,[`data`]);if(n!=null&&P(t,[`data`],n),F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function Yr(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>yi(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function Xr(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>bi(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function Zr(e,t){let n={},r=F(e,[`ttl`]);t!==void 0&&r!=null&&P(t,[`ttl`],r);let i=F(e,[`expireTime`]);t!==void 0&&i!=null&&P(t,[`expireTime`],i);let a=F(e,[`displayName`]);t!==void 0&&a!=null&&P(t,[`displayName`],a);let o=F(e,[`contents`]);if(t!==void 0&&o!=null){let e=R(o);Array.isArray(e)&&(e=e.map(e=>Yr(e))),P(t,[`contents`],e)}let s=F(e,[`systemInstruction`]);t!==void 0&&s!=null&&P(t,[`systemInstruction`],Yr(L(s)));let c=F(e,[`tools`]);if(t!==void 0&&c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>Ci(e))),P(t,[`tools`],e)}let l=F(e,[`toolConfig`]);if(t!==void 0&&l!=null&&P(t,[`toolConfig`],xi(l)),F(e,[`kmsKeyName`])!==void 0)throw Error(`kmsKeyName parameter is not supported in Gemini API.`);return n}function Qr(e,t){let n={},r=F(e,[`ttl`]);t!==void 0&&r!=null&&P(t,[`ttl`],r);let i=F(e,[`expireTime`]);t!==void 0&&i!=null&&P(t,[`expireTime`],i);let a=F(e,[`displayName`]);t!==void 0&&a!=null&&P(t,[`displayName`],a);let o=F(e,[`contents`]);if(t!==void 0&&o!=null){let e=R(o);Array.isArray(e)&&(e=e.map(e=>Xr(e))),P(t,[`contents`],e)}let s=F(e,[`systemInstruction`]);t!==void 0&&s!=null&&P(t,[`systemInstruction`],Xr(L(s)));let c=F(e,[`tools`]);if(t!==void 0&&c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>wi(e))),P(t,[`tools`],e)}let l=F(e,[`toolConfig`]);t!==void 0&&l!=null&&P(t,[`toolConfig`],Si(l));let u=F(e,[`kmsKeyName`]);return t!==void 0&&u!=null&&P(t,[`encryption_spec`,`kmsKeyName`],u),n}function $r(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`model`],mn(e,r));let i=F(t,[`config`]);return i!=null&&Zr(i,n),n}function ei(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`model`],mn(e,r));let i=F(t,[`config`]);return i!=null&&Qr(i,n),n}function ti(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],z(e,r)),n}function ni(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],z(e,r)),n}function ri(e){let t={},n=F(e,[`sdkHttpResponse`]);return n!=null&&P(t,[`sdkHttpResponse`],n),t}function ii(e){let t={},n=F(e,[`sdkHttpResponse`]);return n!=null&&P(t,[`sdkHttpResponse`],n),t}function ai(e){let t={};if(F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=F(e,[`fileUri`]);n!=null&&P(t,[`fileUri`],n);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function oi(e){let t={},n=F(e,[`id`]);n!=null&&P(t,[`id`],n);let r=F(e,[`args`]);r!=null&&P(t,[`args`],r);let i=F(e,[`name`]);if(i!=null&&P(t,[`name`],i),F(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(F(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function si(e){let t={},n=F(e,[`allowedFunctionNames`]);n!=null&&P(t,[`allowedFunctionNames`],n);let r=F(e,[`mode`]);if(r!=null&&P(t,[`mode`],r),F(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return t}function ci(e){let t={},n=F(e,[`description`]);n!=null&&P(t,[`description`],n);let r=F(e,[`name`]);r!=null&&P(t,[`name`],r);let i=F(e,[`parameters`]);i!=null&&P(t,[`parameters`],i);let a=F(e,[`parametersJsonSchema`]);a!=null&&P(t,[`parametersJsonSchema`],a);let o=F(e,[`response`]);o!=null&&P(t,[`response`],o);let s=F(e,[`responseJsonSchema`]);if(s!=null&&P(t,[`responseJsonSchema`],s),F(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return t}function li(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],z(e,r)),n}function ui(e,t){let n={},r=F(t,[`name`]);return r!=null&&P(n,[`_url`,`name`],z(e,r)),n}function di(e){let t={},n=F(e,[`authConfig`]);n!=null&&P(t,[`authConfig`],qr(n));let r=F(e,[`enableWidget`]);return r!=null&&P(t,[`enableWidget`],r),t}function fi(e){let t={},n=F(e,[`searchTypes`]);if(n!=null&&P(t,[`searchTypes`],n),F(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(F(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=F(e,[`timeRangeFilter`]);return r!=null&&P(t,[`timeRangeFilter`],r),t}function pi(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);return t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),n}function mi(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);return t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),n}function hi(e){let t={},n=F(e,[`config`]);return n!=null&&pi(n,t),t}function gi(e){let t={},n=F(e,[`config`]);return n!=null&&mi(n,t),t}function _i(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`cachedContents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`cachedContents`],e)}return t}function vi(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`cachedContents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`cachedContents`],e)}return t}function yi(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],ai(a));let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],oi(o));let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],Jr(c));let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);f!=null&&P(t,[`videoMetadata`],f);let p=F(e,[`toolCall`]);p!=null&&P(t,[`toolCall`],p);let m=F(e,[`toolResponse`]);m!=null&&P(t,[`toolResponse`],m);let h=F(e,[`partMetadata`]);return h!=null&&P(t,[`partMetadata`],h),t}function bi(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],a);let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],o);let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],c);let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);if(f!=null&&P(t,[`videoMetadata`],f),F(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(F(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(F(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return t}function xi(e){let t={},n=F(e,[`retrievalConfig`]);n!=null&&P(t,[`retrievalConfig`],n);let r=F(e,[`functionCallingConfig`]);r!=null&&P(t,[`functionCallingConfig`],si(r));let i=F(e,[`includeServerSideToolInvocations`]);return i!=null&&P(t,[`includeServerSideToolInvocations`],i),t}function Si(e){let t={},n=F(e,[`retrievalConfig`]);n!=null&&P(t,[`retrievalConfig`],n);let r=F(e,[`functionCallingConfig`]);if(r!=null&&P(t,[`functionCallingConfig`],r),F(e,[`includeServerSideToolInvocations`])!==void 0)throw Error(`includeServerSideToolInvocations parameter is not supported in Vertex AI.`);return t}function Ci(e){let t={};if(F(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=F(e,[`computerUse`]);n!=null&&P(t,[`computerUse`],n);let r=F(e,[`fileSearch`]);r!=null&&P(t,[`fileSearch`],r);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],fi(i));let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],di(a));let o=F(e,[`codeExecution`]);if(o!=null&&P(t,[`codeExecution`],o),F(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=F(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`functionDeclarations`],e)}let c=F(e,[`googleSearchRetrieval`]);if(c!=null&&P(t,[`googleSearchRetrieval`],c),F(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=F(e,[`urlContext`]);l!=null&&P(t,[`urlContext`],l);let u=F(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`mcpServers`],e)}return t}function wi(e){let t={},n=F(e,[`retrieval`]);n!=null&&P(t,[`retrieval`],n);let r=F(e,[`computerUse`]);if(r!=null&&P(t,[`computerUse`],r),F(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],i);let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],a);let o=F(e,[`codeExecution`]);o!=null&&P(t,[`codeExecution`],o);let s=F(e,[`enterpriseWebSearch`]);s!=null&&P(t,[`enterpriseWebSearch`],s);let c=F(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>ci(e))),P(t,[`functionDeclarations`],e)}let l=F(e,[`googleSearchRetrieval`]);l!=null&&P(t,[`googleSearchRetrieval`],l);let u=F(e,[`parallelAiSearch`]);u!=null&&P(t,[`parallelAiSearch`],u);let d=F(e,[`urlContext`]);if(d!=null&&P(t,[`urlContext`],d),F(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return t}function Ti(e,t){let n={},r=F(e,[`ttl`]);t!==void 0&&r!=null&&P(t,[`ttl`],r);let i=F(e,[`expireTime`]);return t!==void 0&&i!=null&&P(t,[`expireTime`],i),n}function Ei(e,t){let n={},r=F(e,[`ttl`]);t!==void 0&&r!=null&&P(t,[`ttl`],r);let i=F(e,[`expireTime`]);return t!==void 0&&i!=null&&P(t,[`expireTime`],i),n}function Di(e,t){let n={},r=F(t,[`name`]);r!=null&&P(n,[`_url`,`name`],z(e,r));let i=F(t,[`config`]);return i!=null&&Ti(i,n),n}function Oi(e,t){let n={},r=F(t,[`name`]);r!=null&&P(n,[`_url`,`name`],z(e,r));let i=F(t,[`config`]);return i!=null&&Ei(i,n),n}var ki=class extends M{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Gr(V.PAGED_ITEM_CACHED_CONTENTS,e=>this.listInternal(e),await this.listInternal(e),e)}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ei(this.apiClient,e);return n=N(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=$r(this.apiClient,e);return n=N(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ui(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=li(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ni(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ii(e),n=new $t;return Object.assign(n,t),n})}else{let i=ti(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ri(e),n=new $t;return Object.assign(n,t),n})}}async update(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Oi(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=Di(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=gi(e);return n=N(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=vi(e),n=new en;return Object.assign(n,t),n})}else{let i=hi(e);return n=N(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=_i(e),n=new en;return Object.assign(n,t),n})}}};function Ai(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function ji(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function H(e){return this instanceof H?(this.v=e,this):new H(e)}function U(e,t,n){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var r=n.apply(e,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator==`function`?AsyncIterator:Object).prototype),s(`next`),s(`throw`),s(`return`,o),i[Symbol.asyncIterator]=function(){return this},i;function o(e){return function(t){return Promise.resolve(t).then(e,d)}}function s(e,t){r[e]&&(i[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||c(e,t)})},t&&(i[e]=t(i[e])))}function c(e,t){try{l(r[e](t))}catch(e){f(a[0][3],e)}}function l(e){e.value instanceof H?Promise.resolve(e.value.v).then(u,d):f(a[0][2],e)}function u(e){c(`next`,e)}function d(e){c(`throw`,e)}function f(e,t){e(t),a.shift(),a.length&&c(a[0][0],a[0][1])}}function W(e){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof ji==`function`?ji(e):e[Symbol.iterator](),n={},r(`next`),r(`throw`),r(`return`),n[Symbol.asyncIterator]=function(){return this},n);function r(t){n[t]=e[t]&&function(n){return new Promise(function(r,a){n=e[t](n),i(r,a,n.done,n.value)})}}function i(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}}function Mi(e){if(e.candidates==null||e.candidates.length===0)return!1;let t=e.candidates[0]?.content;return t===void 0?!1:Ni(t)}function Ni(e){if(e.parts===void 0||e.parts.length===0)return!1;for(let t of e.parts)if(t===void 0||Object.keys(t).length===0)return!1;return!0}function Pi(e){if(e.length!==0){for(let t of e)if(t.role!==`user`&&t.role!==`model`)throw Error(`Role must be user or model, but got ${t.role}.`)}}function Fi(e){if(e===void 0||e.length===0)return[];let t=[],n=e.length,r=0;for(;r<n;)if(e[r].role===`user`)t.push(e[r]),r++;else{let i=[],a=!0;for(;r<n&&e[r].role===`model`;)i.push(e[r]),a&&!Ni(e[r])&&(a=!1),r++;a?t.push(...i):t.pop()}return t}var Ii=class{constructor(e,t){this.modelsModule=e,this.apiClient=t}create(e){return new Li(this.apiClient,this.modelsModule,e.model,e.config,structuredClone(e.history))}},Li=class{constructor(e,t,n,r={},i=[]){this.apiClient=e,this.modelsModule=t,this.model=n,this.config=r,this.history=i,this.sendPromise=Promise.resolve(),Pi(i)}async sendMessage(e){await this.sendPromise;let t=L(e.message),n=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(t),config:e.config??this.config});return this.sendPromise=(async()=>{let e=await n,r=e.candidates?.[0]?.content,i=e.automaticFunctionCallingHistory,a=this.getHistory(!0).length,o=[];i!=null&&(o=i.slice(a)??[]);let s=r?[r]:[];this.recordHistory(t,s,o)})(),await this.sendPromise.catch(()=>{this.sendPromise=Promise.resolve()}),n}async sendMessageStream(e){await this.sendPromise;let t=L(e.message),n=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(t),config:e.config??this.config});this.sendPromise=n.then(()=>void 0).catch(()=>void 0);let r=await n;return this.processStreamResponse(r,t)}getHistory(e=!1){let t=e?Fi(this.history):this.history;return structuredClone(t)}processStreamResponse(e,t){return U(this,arguments,function*(){var n,r,i,a;let o=[];try{for(var s=!0,c=W(e),l;l=yield H(c.next()),n=l.done,!n;s=!0){a=l.value,s=!1;let e=a;if(Mi(e)){let t=e.candidates?.[0]?.content;t!==void 0&&o.push(t)}yield yield H(e)}}catch(e){r={error:e}}finally{try{!s&&!n&&(i=c.return)&&(yield H(i.call(c)))}finally{if(r)throw r.error}}this.recordHistory(t,o)})}recordHistory(e,t,n){let r=[];t.length>0&&t.every(e=>e.role!==void 0)?r=t:r.push({role:`model`,parts:[]}),n&&n.length>0?this.history.push(...Fi(n)):this.history.push(e),this.history.push(...r)}},Ri=class e extends Error{constructor(t){super(t.message),this.name=`ApiError`,this.status=t.status,Object.setPrototypeOf(this,e.prototype)}};function zi(e){let t={},n=F(e,[`file`]);return n!=null&&P(t,[`file`],n),t}function Bi(e){let t={},n=F(e,[`sdkHttpResponse`]);return n!=null&&P(t,[`sdkHttpResponse`],n),t}function Vi(e){let t={},n=F(e,[`name`]);return n!=null&&P(t,[`_url`,`file`],Ln(n)),t}function Hi(e){let t={},n=F(e,[`sdkHttpResponse`]);return n!=null&&P(t,[`sdkHttpResponse`],n),t}function Ui(e){let t={},n=F(e,[`name`]);return n!=null&&P(t,[`_url`,`file`],Ln(n)),t}function Wi(e){let t={},n=F(e,[`uris`]);return n!=null&&P(t,[`uris`],n),t}function Gi(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);return t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),n}function Ki(e){let t={},n=F(e,[`config`]);return n!=null&&Gi(n,t),t}function qi(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`files`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`files`],e)}return t}function Ji(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`files`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`files`],e)}return t}var Yi=class extends M{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Gr(V.PAGED_ITEM_FILES,e=>this.listInternal(e),await this.listInternal(e),e)}async upload(e){if(this.apiClient.isVertexAI())throw Error(`Vertex AI does not support uploading files. You can share files through a GCS bucket.`);return this.apiClient.uploadFile(e.file,e.config).then(e=>e)}async download(e){await this.apiClient.downloadFile(e)}async registerFiles(e){throw Error(`registerFiles is only supported in Node.js environments.`)}async _registerFiles(e){return this.registerFilesInternal(e)}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Ki(e);return n=N(`files`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=qi(e),n=new on;return Object.assign(n,t),n})}}async createInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=zi(e);return n=N(`upload/v1beta/files`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Bi(e),n=new sn;return Object.assign(n,t),n})}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Ui(e);return n=N(`files/{file}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Vi(e);return n=N(`files/{file}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Hi(e),n=new cn;return Object.assign(n,t),n})}}async registerFilesInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Wi(e);return n=N(`files:register`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Ji(e),n=new ln;return Object.assign(n,t),n})}}};function Xi(e){let t={};if(F(e,[`languageCodes`])!==void 0)throw Error(`languageCodes parameter is not supported in Gemini API.`);return t}function Zi(e){let t={},n=F(e,[`apiKey`]);if(n!=null&&P(t,[`apiKey`],n),F(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(F(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(F(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(F(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(F(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(F(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Qi(e){let t={},n=F(e,[`data`]);if(n!=null&&P(t,[`data`],n),F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function $i(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>_a(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function ea(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>va(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function ta(e){let t={};if(F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=F(e,[`fileUri`]);n!=null&&P(t,[`fileUri`],n);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function na(e){let t={},n=F(e,[`id`]);n!=null&&P(t,[`id`],n);let r=F(e,[`args`]);r!=null&&P(t,[`args`],r);let i=F(e,[`name`]);if(i!=null&&P(t,[`name`],i),F(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(F(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function ra(e){let t={},n=F(e,[`description`]);n!=null&&P(t,[`description`],n);let r=F(e,[`name`]);r!=null&&P(t,[`name`],r);let i=F(e,[`parameters`]);i!=null&&P(t,[`parameters`],i);let a=F(e,[`parametersJsonSchema`]);a!=null&&P(t,[`parametersJsonSchema`],a);let o=F(e,[`response`]);o!=null&&P(t,[`response`],o);let s=F(e,[`responseJsonSchema`]);if(s!=null&&P(t,[`responseJsonSchema`],s),F(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return t}function ia(e){let t={},n=F(e,[`modelSelectionConfig`]);n!=null&&P(t,[`modelConfig`],n);let r=F(e,[`responseJsonSchema`]);r!=null&&P(t,[`responseJsonSchema`],r);let i=F(e,[`audioTimestamp`]);i!=null&&P(t,[`audioTimestamp`],i);let a=F(e,[`candidateCount`]);a!=null&&P(t,[`candidateCount`],a);let o=F(e,[`enableAffectiveDialog`]);o!=null&&P(t,[`enableAffectiveDialog`],o);let s=F(e,[`frequencyPenalty`]);s!=null&&P(t,[`frequencyPenalty`],s);let c=F(e,[`logprobs`]);c!=null&&P(t,[`logprobs`],c);let l=F(e,[`maxOutputTokens`]);l!=null&&P(t,[`maxOutputTokens`],l);let u=F(e,[`mediaResolution`]);u!=null&&P(t,[`mediaResolution`],u);let d=F(e,[`presencePenalty`]);d!=null&&P(t,[`presencePenalty`],d);let f=F(e,[`responseLogprobs`]);f!=null&&P(t,[`responseLogprobs`],f);let p=F(e,[`responseMimeType`]);p!=null&&P(t,[`responseMimeType`],p);let m=F(e,[`responseModalities`]);m!=null&&P(t,[`responseModalities`],m);let h=F(e,[`responseSchema`]);h!=null&&P(t,[`responseSchema`],h);let g=F(e,[`routingConfig`]);g!=null&&P(t,[`routingConfig`],g);let _=F(e,[`seed`]);_!=null&&P(t,[`seed`],_);let v=F(e,[`speechConfig`]);v!=null&&P(t,[`speechConfig`],Sa(v));let y=F(e,[`stopSequences`]);y!=null&&P(t,[`stopSequences`],y);let b=F(e,[`temperature`]);b!=null&&P(t,[`temperature`],b);let x=F(e,[`thinkingConfig`]);x!=null&&P(t,[`thinkingConfig`],x);let S=F(e,[`topK`]);S!=null&&P(t,[`topK`],S);let C=F(e,[`topP`]);if(C!=null&&P(t,[`topP`],C),F(e,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);return t}function aa(e){let t={},n=F(e,[`authConfig`]);n!=null&&P(t,[`authConfig`],Zi(n));let r=F(e,[`enableWidget`]);return r!=null&&P(t,[`enableWidget`],r),t}function oa(e){let t={},n=F(e,[`searchTypes`]);if(n!=null&&P(t,[`searchTypes`],n),F(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(F(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=F(e,[`timeRangeFilter`]);return r!=null&&P(t,[`timeRangeFilter`],r),t}function sa(e,t){let n={},r=F(e,[`generationConfig`]);t!==void 0&&r!=null&&P(t,[`setup`,`generationConfig`],r);let i=F(e,[`responseModalities`]);t!==void 0&&i!=null&&P(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=F(e,[`temperature`]);t!==void 0&&a!=null&&P(t,[`setup`,`generationConfig`,`temperature`],a);let o=F(e,[`topP`]);t!==void 0&&o!=null&&P(t,[`setup`,`generationConfig`,`topP`],o);let s=F(e,[`topK`]);t!==void 0&&s!=null&&P(t,[`setup`,`generationConfig`,`topK`],s);let c=F(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&P(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=F(e,[`mediaResolution`]);t!==void 0&&l!=null&&P(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=F(e,[`seed`]);t!==void 0&&u!=null&&P(t,[`setup`,`generationConfig`,`seed`],u);let d=F(e,[`speechConfig`]);t!==void 0&&d!=null&&P(t,[`setup`,`generationConfig`,`speechConfig`],kn(d));let f=F(e,[`thinkingConfig`]);t!==void 0&&f!=null&&P(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=F(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&P(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=F(e,[`systemInstruction`]);t!==void 0&&m!=null&&P(t,[`setup`,`systemInstruction`],$i(L(m)));let h=F(e,[`tools`]);if(t!==void 0&&h!=null){let e=jn(h);Array.isArray(e)&&(e=e.map(e=>Ca(An(e)))),P(t,[`setup`,`tools`],e)}let g=F(e,[`sessionResumption`]);t!==void 0&&g!=null&&P(t,[`setup`,`sessionResumption`],ba(g));let _=F(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&P(t,[`setup`,`inputAudioTranscription`],Xi(_));let v=F(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&P(t,[`setup`,`outputAudioTranscription`],Xi(v));let y=F(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&P(t,[`setup`,`realtimeInputConfig`],y);let b=F(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&P(t,[`setup`,`contextWindowCompression`],b);let x=F(e,[`proactivity`]);if(t!==void 0&&x!=null&&P(t,[`setup`,`proactivity`],x),F(e,[`explicitVadSignal`])!==void 0)throw Error(`explicitVadSignal parameter is not supported in Gemini API.`);return n}function ca(e,t){let n={},r=F(e,[`generationConfig`]);t!==void 0&&r!=null&&P(t,[`setup`,`generationConfig`],ia(r));let i=F(e,[`responseModalities`]);t!==void 0&&i!=null&&P(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=F(e,[`temperature`]);t!==void 0&&a!=null&&P(t,[`setup`,`generationConfig`,`temperature`],a);let o=F(e,[`topP`]);t!==void 0&&o!=null&&P(t,[`setup`,`generationConfig`,`topP`],o);let s=F(e,[`topK`]);t!==void 0&&s!=null&&P(t,[`setup`,`generationConfig`,`topK`],s);let c=F(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&P(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=F(e,[`mediaResolution`]);t!==void 0&&l!=null&&P(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=F(e,[`seed`]);t!==void 0&&u!=null&&P(t,[`setup`,`generationConfig`,`seed`],u);let d=F(e,[`speechConfig`]);t!==void 0&&d!=null&&P(t,[`setup`,`generationConfig`,`speechConfig`],Sa(kn(d)));let f=F(e,[`thinkingConfig`]);t!==void 0&&f!=null&&P(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=F(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&P(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=F(e,[`systemInstruction`]);t!==void 0&&m!=null&&P(t,[`setup`,`systemInstruction`],ea(L(m)));let h=F(e,[`tools`]);if(t!==void 0&&h!=null){let e=jn(h);Array.isArray(e)&&(e=e.map(e=>wa(An(e)))),P(t,[`setup`,`tools`],e)}let g=F(e,[`sessionResumption`]);t!==void 0&&g!=null&&P(t,[`setup`,`sessionResumption`],g);let _=F(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&P(t,[`setup`,`inputAudioTranscription`],_);let v=F(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&P(t,[`setup`,`outputAudioTranscription`],v);let y=F(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&P(t,[`setup`,`realtimeInputConfig`],y);let b=F(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&P(t,[`setup`,`contextWindowCompression`],b);let x=F(e,[`proactivity`]);t!==void 0&&x!=null&&P(t,[`setup`,`proactivity`],x);let S=F(e,[`explicitVadSignal`]);return t!==void 0&&S!=null&&P(t,[`setup`,`explicitVadSignal`],S),n}function la(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`setup`,`model`],I(e,r));let i=F(t,[`config`]);return i!=null&&P(n,[`config`],sa(i,n)),n}function ua(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`setup`,`model`],I(e,r));let i=F(t,[`config`]);return i!=null&&P(n,[`config`],ca(i,n)),n}function da(e){let t={},n=F(e,[`musicGenerationConfig`]);return n!=null&&P(t,[`musicGenerationConfig`],n),t}function fa(e){let t={},n=F(e,[`weightedPrompts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`weightedPrompts`],e)}return t}function pa(e){let t={},n=F(e,[`media`]);if(n!=null){let e=hn(n);Array.isArray(e)&&(e=e.map(e=>Qi(e))),P(t,[`mediaChunks`],e)}let r=F(e,[`audio`]);r!=null&&P(t,[`audio`],Qi(vn(r)));let i=F(e,[`audioStreamEnd`]);i!=null&&P(t,[`audioStreamEnd`],i);let a=F(e,[`video`]);a!=null&&P(t,[`video`],Qi(_n(a)));let o=F(e,[`text`]);o!=null&&P(t,[`text`],o);let s=F(e,[`activityStart`]);s!=null&&P(t,[`activityStart`],s);let c=F(e,[`activityEnd`]);return c!=null&&P(t,[`activityEnd`],c),t}function ma(e){let t={},n=F(e,[`media`]);if(n!=null){let e=hn(n);Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`mediaChunks`],e)}let r=F(e,[`audio`]);r!=null&&P(t,[`audio`],vn(r));let i=F(e,[`audioStreamEnd`]);i!=null&&P(t,[`audioStreamEnd`],i);let a=F(e,[`video`]);a!=null&&P(t,[`video`],_n(a));let o=F(e,[`text`]);o!=null&&P(t,[`text`],o);let s=F(e,[`activityStart`]);s!=null&&P(t,[`activityStart`],s);let c=F(e,[`activityEnd`]);return c!=null&&P(t,[`activityEnd`],c),t}function ha(e){let t={},n=F(e,[`setupComplete`]);n!=null&&P(t,[`setupComplete`],n);let r=F(e,[`serverContent`]);r!=null&&P(t,[`serverContent`],r);let i=F(e,[`toolCall`]);i!=null&&P(t,[`toolCall`],i);let a=F(e,[`toolCallCancellation`]);a!=null&&P(t,[`toolCallCancellation`],a);let o=F(e,[`usageMetadata`]);o!=null&&P(t,[`usageMetadata`],Ta(o));let s=F(e,[`goAway`]);s!=null&&P(t,[`goAway`],s);let c=F(e,[`sessionResumptionUpdate`]);c!=null&&P(t,[`sessionResumptionUpdate`],c);let l=F(e,[`voiceActivityDetectionSignal`]);l!=null&&P(t,[`voiceActivityDetectionSignal`],l);let u=F(e,[`voiceActivity`]);return u!=null&&P(t,[`voiceActivity`],Ea(u)),t}function ga(e){let t={},n=F(e,[`speakerVoiceConfigs`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>xa(e))),P(t,[`speakerVoiceConfigs`],e)}return t}function _a(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],ta(a));let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],na(o));let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],Qi(c));let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);f!=null&&P(t,[`videoMetadata`],f);let p=F(e,[`toolCall`]);p!=null&&P(t,[`toolCall`],p);let m=F(e,[`toolResponse`]);m!=null&&P(t,[`toolResponse`],m);let h=F(e,[`partMetadata`]);return h!=null&&P(t,[`partMetadata`],h),t}function va(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],a);let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],o);let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],c);let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);if(f!=null&&P(t,[`videoMetadata`],f),F(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(F(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(F(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return t}function ya(e){let t={},n=F(e,[`mimeType`]);n!=null&&P(t,[`mimeType`],n);let r=F(e,[`voiceSampleAudio`]);return r!=null&&P(t,[`voiceSampleAudio`],r),t}function ba(e){let t={},n=F(e,[`handle`]);if(n!=null&&P(t,[`handle`],n),F(e,[`transparent`])!==void 0)throw Error(`transparent parameter is not supported in Gemini API.`);return t}function xa(e){let t={},n=F(e,[`speaker`]);n!=null&&P(t,[`speaker`],n);let r=F(e,[`voiceConfig`]);return r!=null&&P(t,[`voiceConfig`],Da(r)),t}function Sa(e){let t={},n=F(e,[`voiceConfig`]);n!=null&&P(t,[`voiceConfig`],Da(n));let r=F(e,[`languageCode`]);r!=null&&P(t,[`languageCode`],r);let i=F(e,[`multiSpeakerVoiceConfig`]);return i!=null&&P(t,[`multiSpeakerVoiceConfig`],ga(i)),t}function Ca(e){let t={};if(F(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=F(e,[`computerUse`]);n!=null&&P(t,[`computerUse`],n);let r=F(e,[`fileSearch`]);r!=null&&P(t,[`fileSearch`],r);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],oa(i));let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],aa(a));let o=F(e,[`codeExecution`]);if(o!=null&&P(t,[`codeExecution`],o),F(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=F(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`functionDeclarations`],e)}let c=F(e,[`googleSearchRetrieval`]);if(c!=null&&P(t,[`googleSearchRetrieval`],c),F(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=F(e,[`urlContext`]);l!=null&&P(t,[`urlContext`],l);let u=F(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`mcpServers`],e)}return t}function wa(e){let t={},n=F(e,[`retrieval`]);n!=null&&P(t,[`retrieval`],n);let r=F(e,[`computerUse`]);if(r!=null&&P(t,[`computerUse`],r),F(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],i);let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],a);let o=F(e,[`codeExecution`]);o!=null&&P(t,[`codeExecution`],o);let s=F(e,[`enterpriseWebSearch`]);s!=null&&P(t,[`enterpriseWebSearch`],s);let c=F(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>ra(e))),P(t,[`functionDeclarations`],e)}let l=F(e,[`googleSearchRetrieval`]);l!=null&&P(t,[`googleSearchRetrieval`],l);let u=F(e,[`parallelAiSearch`]);u!=null&&P(t,[`parallelAiSearch`],u);let d=F(e,[`urlContext`]);if(d!=null&&P(t,[`urlContext`],d),F(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return t}function Ta(e){let t={},n=F(e,[`promptTokenCount`]);n!=null&&P(t,[`promptTokenCount`],n);let r=F(e,[`cachedContentTokenCount`]);r!=null&&P(t,[`cachedContentTokenCount`],r);let i=F(e,[`candidatesTokenCount`]);i!=null&&P(t,[`responseTokenCount`],i);let a=F(e,[`toolUsePromptTokenCount`]);a!=null&&P(t,[`toolUsePromptTokenCount`],a);let o=F(e,[`thoughtsTokenCount`]);o!=null&&P(t,[`thoughtsTokenCount`],o);let s=F(e,[`totalTokenCount`]);s!=null&&P(t,[`totalTokenCount`],s);let c=F(e,[`promptTokensDetails`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`promptTokensDetails`],e)}let l=F(e,[`cacheTokensDetails`]);if(l!=null){let e=l;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`cacheTokensDetails`],e)}let u=F(e,[`candidatesTokensDetails`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`responseTokensDetails`],e)}let d=F(e,[`toolUsePromptTokensDetails`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`toolUsePromptTokensDetails`],e)}let f=F(e,[`trafficType`]);return f!=null&&P(t,[`trafficType`],f),t}function Ea(e){let t={},n=F(e,[`type`]);return n!=null&&P(t,[`voiceActivityType`],n),t}function Da(e){let t={},n=F(e,[`replicatedVoiceConfig`]);n!=null&&P(t,[`replicatedVoiceConfig`],ya(n));let r=F(e,[`prebuiltVoiceConfig`]);return r!=null&&P(t,[`prebuiltVoiceConfig`],r),t}function Oa(e,t){let n={},r=F(e,[`apiKey`]);if(r!=null&&P(n,[`apiKey`],r),F(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(F(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(F(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(F(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(F(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(F(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return n}function ka(e,t){let n={},r=F(e,[`data`]);if(r!=null&&P(n,[`data`],r),F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let i=F(e,[`mimeType`]);return i!=null&&P(n,[`mimeType`],i),n}function Aa(e,t){let n={},r=F(e,[`content`]);r!=null&&P(n,[`content`],r);let i=F(e,[`citationMetadata`]);i!=null&&P(n,[`citationMetadata`],ja(i));let a=F(e,[`tokenCount`]);a!=null&&P(n,[`tokenCount`],a);let o=F(e,[`finishReason`]);o!=null&&P(n,[`finishReason`],o);let s=F(e,[`groundingMetadata`]);s!=null&&P(n,[`groundingMetadata`],s);let c=F(e,[`avgLogprobs`]);c!=null&&P(n,[`avgLogprobs`],c);let l=F(e,[`index`]);l!=null&&P(n,[`index`],l);let u=F(e,[`logprobsResult`]);u!=null&&P(n,[`logprobsResult`],u);let d=F(e,[`safetyRatings`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`safetyRatings`],e)}let f=F(e,[`urlContextMetadata`]);return f!=null&&P(n,[`urlContextMetadata`],f),n}function ja(e,t){let n={},r=F(e,[`citationSources`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`citations`],e)}return n}function Ma(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let e=R(a);Array.isArray(e)&&(e=e.map(e=>La(e))),P(r,[`contents`],e)}return r}function Na(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`tokensInfo`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`tokensInfo`],e)}return n}function Pa(e,t){let n={},r=F(e,[`values`]);r!=null&&P(n,[`values`],r);let i=F(e,[`statistics`]);return i!=null&&P(n,[`statistics`],Fa(i)),n}function Fa(e,t){let n={},r=F(e,[`truncated`]);r!=null&&P(n,[`truncated`],r);let i=F(e,[`token_count`]);return i!=null&&P(n,[`tokenCount`],i),n}function Ia(e,t){let n={},r=F(e,[`parts`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>rs(e))),P(n,[`parts`],e)}let i=F(e,[`role`]);return i!=null&&P(n,[`role`],i),n}function La(e,t){let n={},r=F(e,[`parts`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>is(e))),P(n,[`parts`],e)}let i=F(e,[`role`]);return i!=null&&P(n,[`role`],i),n}function Ra(e,t){let n={},r=F(e,[`controlType`]);r!=null&&P(n,[`controlType`],r);let i=F(e,[`enableControlImageComputation`]);return i!=null&&P(n,[`computeControl`],i),n}function za(e,t){let n={};if(F(e,[`systemInstruction`])!==void 0)throw Error(`systemInstruction parameter is not supported in Gemini API.`);if(F(e,[`tools`])!==void 0)throw Error(`tools parameter is not supported in Gemini API.`);if(F(e,[`generationConfig`])!==void 0)throw Error(`generationConfig parameter is not supported in Gemini API.`);return n}function Ba(e,t,n){let r={},i=F(e,[`systemInstruction`]);t!==void 0&&i!=null&&P(t,[`systemInstruction`],La(L(i)));let a=F(e,[`tools`]);if(t!==void 0&&a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>Ts(e))),P(t,[`tools`],e)}let o=F(e,[`generationConfig`]);return t!==void 0&&o!=null&&P(t,[`generationConfig`],Lo(o)),r}function Va(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let e=R(a);Array.isArray(e)&&(e=e.map(e=>Ia(e))),P(r,[`contents`],e)}let o=F(t,[`config`]);return o!=null&&za(o),r}function Ha(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let e=R(a);Array.isArray(e)&&(e=e.map(e=>La(e))),P(r,[`contents`],e)}let o=F(t,[`config`]);return o!=null&&Ba(o,r),r}function Ua(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`totalTokens`]);i!=null&&P(n,[`totalTokens`],i);let a=F(e,[`cachedContentTokenCount`]);return a!=null&&P(n,[`cachedContentTokenCount`],a),n}function Wa(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`totalTokens`]);return i!=null&&P(n,[`totalTokens`],i),n}function Ga(e,t,n){let r={},i=F(t,[`model`]);return i!=null&&P(r,[`_url`,`name`],I(e,i)),r}function Ka(e,t,n){let r={},i=F(t,[`model`]);return i!=null&&P(r,[`_url`,`name`],I(e,i)),r}function qa(e,t){let n={},r=F(e,[`sdkHttpResponse`]);return r!=null&&P(n,[`sdkHttpResponse`],r),n}function Ja(e,t){let n={},r=F(e,[`sdkHttpResponse`]);return r!=null&&P(n,[`sdkHttpResponse`],r),n}function Ya(e,t,n){let r={},i=F(e,[`outputGcsUri`]);t!==void 0&&i!=null&&P(t,[`parameters`,`storageUri`],i);let a=F(e,[`negativePrompt`]);t!==void 0&&a!=null&&P(t,[`parameters`,`negativePrompt`],a);let o=F(e,[`numberOfImages`]);t!==void 0&&o!=null&&P(t,[`parameters`,`sampleCount`],o);let s=F(e,[`aspectRatio`]);t!==void 0&&s!=null&&P(t,[`parameters`,`aspectRatio`],s);let c=F(e,[`guidanceScale`]);t!==void 0&&c!=null&&P(t,[`parameters`,`guidanceScale`],c);let l=F(e,[`seed`]);t!==void 0&&l!=null&&P(t,[`parameters`,`seed`],l);let u=F(e,[`safetyFilterLevel`]);t!==void 0&&u!=null&&P(t,[`parameters`,`safetySetting`],u);let d=F(e,[`personGeneration`]);t!==void 0&&d!=null&&P(t,[`parameters`,`personGeneration`],d);let f=F(e,[`includeSafetyAttributes`]);t!==void 0&&f!=null&&P(t,[`parameters`,`includeSafetyAttributes`],f);let p=F(e,[`includeRaiReason`]);t!==void 0&&p!=null&&P(t,[`parameters`,`includeRaiReason`],p);let m=F(e,[`language`]);t!==void 0&&m!=null&&P(t,[`parameters`,`language`],m);let h=F(e,[`outputMimeType`]);t!==void 0&&h!=null&&P(t,[`parameters`,`outputOptions`,`mimeType`],h);let g=F(e,[`outputCompressionQuality`]);t!==void 0&&g!=null&&P(t,[`parameters`,`outputOptions`,`compressionQuality`],g);let _=F(e,[`addWatermark`]);t!==void 0&&_!=null&&P(t,[`parameters`,`addWatermark`],_);let v=F(e,[`labels`]);t!==void 0&&v!=null&&P(t,[`labels`],v);let y=F(e,[`editMode`]);t!==void 0&&y!=null&&P(t,[`parameters`,`editMode`],y);let b=F(e,[`baseSteps`]);return t!==void 0&&b!=null&&P(t,[`parameters`,`editConfig`,`baseSteps`],b),r}function Xa(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`prompt`]);a!=null&&P(r,[`instances[0]`,`prompt`],a);let o=F(t,[`referenceImages`]);if(o!=null){let e=o;Array.isArray(e)&&(e=e.map(e=>us(e))),P(r,[`instances[0]`,`referenceImages`],e)}let s=F(t,[`config`]);return s!=null&&Ya(s,r),r}function Za(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>No(e))),P(n,[`generatedImages`],e)}return n}function Qa(e,t,n){let r={},i=F(e,[`taskType`]);t!==void 0&&i!=null&&P(t,[`requests[]`,`taskType`],i);let a=F(e,[`title`]);t!==void 0&&a!=null&&P(t,[`requests[]`,`title`],a);let o=F(e,[`outputDimensionality`]);if(t!==void 0&&o!=null&&P(t,[`requests[]`,`outputDimensionality`],o),F(e,[`mimeType`])!==void 0)throw Error(`mimeType parameter is not supported in Gemini API.`);if(F(e,[`autoTruncate`])!==void 0)throw Error(`autoTruncate parameter is not supported in Gemini API.`);return r}function $a(e,t,n){let r={},i=F(n,[`embeddingApiType`]);if(i===void 0&&(i=`PREDICT`),i===`PREDICT`){let n=F(e,[`taskType`]);t!==void 0&&n!=null&&P(t,[`instances[]`,`task_type`],n)}else if(i===`EMBED_CONTENT`){let n=F(e,[`taskType`]);t!==void 0&&n!=null&&P(t,[`taskType`],n)}let a=F(n,[`embeddingApiType`]);if(a===void 0&&(a=`PREDICT`),a===`PREDICT`){let n=F(e,[`title`]);t!==void 0&&n!=null&&P(t,[`instances[]`,`title`],n)}else if(a===`EMBED_CONTENT`){let n=F(e,[`title`]);t!==void 0&&n!=null&&P(t,[`title`],n)}let o=F(n,[`embeddingApiType`]);if(o===void 0&&(o=`PREDICT`),o===`PREDICT`){let n=F(e,[`outputDimensionality`]);t!==void 0&&n!=null&&P(t,[`parameters`,`outputDimensionality`],n)}else if(o===`EMBED_CONTENT`){let n=F(e,[`outputDimensionality`]);t!==void 0&&n!=null&&P(t,[`outputDimensionality`],n)}let s=F(n,[`embeddingApiType`]);if(s===void 0&&(s=`PREDICT`),s===`PREDICT`){let n=F(e,[`mimeType`]);t!==void 0&&n!=null&&P(t,[`instances[]`,`mimeType`],n)}let c=F(n,[`embeddingApiType`]);if(c===void 0&&(c=`PREDICT`),c===`PREDICT`){let n=F(e,[`autoTruncate`]);t!==void 0&&n!=null&&P(t,[`parameters`,`autoTruncate`],n)}else if(c===`EMBED_CONTENT`){let n=F(e,[`autoTruncate`]);t!==void 0&&n!=null&&P(t,[`autoTruncate`],n)}return r}function eo(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let t=wn(e,a);Array.isArray(t)&&(t=t.map(e=>e)),P(r,[`requests[]`,`content`],t)}let o=F(t,[`content`]);o!=null&&Ia(L(o));let s=F(t,[`config`]);s!=null&&Qa(s,r);let c=F(t,[`model`]);return c!==void 0&&P(r,[`requests[]`,`model`],I(e,c)),r}function to(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(n,[`embeddingApiType`]);if(a===void 0&&(a=`PREDICT`),a===`PREDICT`){let n=F(t,[`contents`]);if(n!=null){let t=wn(e,n);Array.isArray(t)&&(t=t.map(e=>e)),P(r,[`instances[]`,`content`],t)}}let o=F(n,[`embeddingApiType`]);if(o===void 0&&(o=`PREDICT`),o===`EMBED_CONTENT`){let e=F(t,[`content`]);e!=null&&P(r,[`content`],La(L(e)))}let s=F(t,[`config`]);return s!=null&&$a(s,r,n),r}function no(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`embeddings`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`embeddings`],e)}let a=F(e,[`metadata`]);return a!=null&&P(n,[`metadata`],a),n}function ro(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`predictions[]`,`embeddings`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Pa(e))),P(n,[`embeddings`],e)}let a=F(e,[`metadata`]);if(a!=null&&P(n,[`metadata`],a),t&&F(t,[`embeddingApiType`])===`EMBED_CONTENT`){let t=F(e,[`embedding`]),r=F(e,[`usageMetadata`]),i=F(e,[`truncated`]);if(t){let e={};r&&r.promptTokenCount&&(e.tokenCount=r.promptTokenCount),i&&(e.truncated=i),t.statistics=e,P(n,[`embeddings`],[t])}}return n}function io(e,t){let n={},r=F(e,[`endpoint`]);r!=null&&P(n,[`name`],r);let i=F(e,[`deployedModelId`]);return i!=null&&P(n,[`deployedModelId`],i),n}function ao(e,t){let n={};if(F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=F(e,[`fileUri`]);r!=null&&P(n,[`fileUri`],r);let i=F(e,[`mimeType`]);return i!=null&&P(n,[`mimeType`],i),n}function oo(e,t){let n={},r=F(e,[`id`]);r!=null&&P(n,[`id`],r);let i=F(e,[`args`]);i!=null&&P(n,[`args`],i);let a=F(e,[`name`]);if(a!=null&&P(n,[`name`],a),F(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(F(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return n}function so(e,t){let n={},r=F(e,[`allowedFunctionNames`]);r!=null&&P(n,[`allowedFunctionNames`],r);let i=F(e,[`mode`]);if(i!=null&&P(n,[`mode`],i),F(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return n}function co(e,t){let n={},r=F(e,[`description`]);r!=null&&P(n,[`description`],r);let i=F(e,[`name`]);i!=null&&P(n,[`name`],i);let a=F(e,[`parameters`]);a!=null&&P(n,[`parameters`],a);let o=F(e,[`parametersJsonSchema`]);o!=null&&P(n,[`parametersJsonSchema`],o);let s=F(e,[`response`]);s!=null&&P(n,[`response`],s);let c=F(e,[`responseJsonSchema`]);if(c!=null&&P(n,[`responseJsonSchema`],c),F(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return n}function lo(e,t,n,r){let i={},a=F(t,[`systemInstruction`]);n!==void 0&&a!=null&&P(n,[`systemInstruction`],Ia(L(a)));let o=F(t,[`temperature`]);o!=null&&P(i,[`temperature`],o);let s=F(t,[`topP`]);s!=null&&P(i,[`topP`],s);let c=F(t,[`topK`]);c!=null&&P(i,[`topK`],c);let l=F(t,[`candidateCount`]);l!=null&&P(i,[`candidateCount`],l);let u=F(t,[`maxOutputTokens`]);u!=null&&P(i,[`maxOutputTokens`],u);let d=F(t,[`stopSequences`]);d!=null&&P(i,[`stopSequences`],d);let f=F(t,[`responseLogprobs`]);f!=null&&P(i,[`responseLogprobs`],f);let p=F(t,[`logprobs`]);p!=null&&P(i,[`logprobs`],p);let m=F(t,[`presencePenalty`]);m!=null&&P(i,[`presencePenalty`],m);let h=F(t,[`frequencyPenalty`]);h!=null&&P(i,[`frequencyPenalty`],h);let g=F(t,[`seed`]);g!=null&&P(i,[`seed`],g);let _=F(t,[`responseMimeType`]);_!=null&&P(i,[`responseMimeType`],_);let v=F(t,[`responseSchema`]);v!=null&&P(i,[`responseSchema`],Dn(v));let y=F(t,[`responseJsonSchema`]);if(y!=null&&P(i,[`responseJsonSchema`],y),F(t,[`routingConfig`])!==void 0)throw Error(`routingConfig parameter is not supported in Gemini API.`);if(F(t,[`modelSelectionConfig`])!==void 0)throw Error(`modelSelectionConfig parameter is not supported in Gemini API.`);let b=F(t,[`safetySettings`]);if(n!==void 0&&b!=null){let e=b;Array.isArray(e)&&(e=e.map(e=>ms(e))),P(n,[`safetySettings`],e)}let x=F(t,[`tools`]);if(n!==void 0&&x!=null){let e=jn(x);Array.isArray(e)&&(e=e.map(e=>ws(An(e)))),P(n,[`tools`],e)}let S=F(t,[`toolConfig`]);if(n!==void 0&&S!=null&&P(n,[`toolConfig`],Ss(S)),F(t,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let C=F(t,[`cachedContent`]);n!==void 0&&C!=null&&P(n,[`cachedContent`],z(e,C));let w=F(t,[`responseModalities`]);w!=null&&P(i,[`responseModalities`],w);let T=F(t,[`mediaResolution`]);T!=null&&P(i,[`mediaResolution`],T);let E=F(t,[`speechConfig`]);if(E!=null&&P(i,[`speechConfig`],On(E)),F(t,[`audioTimestamp`])!==void 0)throw Error(`audioTimestamp parameter is not supported in Gemini API.`);let D=F(t,[`thinkingConfig`]);D!=null&&P(i,[`thinkingConfig`],D);let O=F(t,[`imageConfig`]);O!=null&&P(i,[`imageConfig`],Ho(O));let k=F(t,[`enableEnhancedCivicAnswers`]);if(k!=null&&P(i,[`enableEnhancedCivicAnswers`],k),F(t,[`modelArmorConfig`])!==void 0)throw Error(`modelArmorConfig parameter is not supported in Gemini API.`);let A=F(t,[`serviceTier`]);return n!==void 0&&A!=null&&P(n,[`serviceTier`],A),i}function uo(e,t,n,r){let i={},a=F(t,[`systemInstruction`]);n!==void 0&&a!=null&&P(n,[`systemInstruction`],La(L(a)));let o=F(t,[`temperature`]);o!=null&&P(i,[`temperature`],o);let s=F(t,[`topP`]);s!=null&&P(i,[`topP`],s);let c=F(t,[`topK`]);c!=null&&P(i,[`topK`],c);let l=F(t,[`candidateCount`]);l!=null&&P(i,[`candidateCount`],l);let u=F(t,[`maxOutputTokens`]);u!=null&&P(i,[`maxOutputTokens`],u);let d=F(t,[`stopSequences`]);d!=null&&P(i,[`stopSequences`],d);let f=F(t,[`responseLogprobs`]);f!=null&&P(i,[`responseLogprobs`],f);let p=F(t,[`logprobs`]);p!=null&&P(i,[`logprobs`],p);let m=F(t,[`presencePenalty`]);m!=null&&P(i,[`presencePenalty`],m);let h=F(t,[`frequencyPenalty`]);h!=null&&P(i,[`frequencyPenalty`],h);let g=F(t,[`seed`]);g!=null&&P(i,[`seed`],g);let _=F(t,[`responseMimeType`]);_!=null&&P(i,[`responseMimeType`],_);let v=F(t,[`responseSchema`]);v!=null&&P(i,[`responseSchema`],Dn(v));let y=F(t,[`responseJsonSchema`]);y!=null&&P(i,[`responseJsonSchema`],y);let b=F(t,[`routingConfig`]);b!=null&&P(i,[`routingConfig`],b);let x=F(t,[`modelSelectionConfig`]);x!=null&&P(i,[`modelConfig`],x);let S=F(t,[`safetySettings`]);if(n!==void 0&&S!=null){let e=S;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`safetySettings`],e)}let C=F(t,[`tools`]);if(n!==void 0&&C!=null){let e=jn(C);Array.isArray(e)&&(e=e.map(e=>Ts(An(e)))),P(n,[`tools`],e)}let w=F(t,[`toolConfig`]);n!==void 0&&w!=null&&P(n,[`toolConfig`],Cs(w));let T=F(t,[`labels`]);n!==void 0&&T!=null&&P(n,[`labels`],T);let E=F(t,[`cachedContent`]);n!==void 0&&E!=null&&P(n,[`cachedContent`],z(e,E));let D=F(t,[`responseModalities`]);D!=null&&P(i,[`responseModalities`],D);let O=F(t,[`mediaResolution`]);O!=null&&P(i,[`mediaResolution`],O);let k=F(t,[`speechConfig`]);k!=null&&P(i,[`speechConfig`],xs(On(k)));let A=F(t,[`audioTimestamp`]);A!=null&&P(i,[`audioTimestamp`],A);let j=F(t,[`thinkingConfig`]);j!=null&&P(i,[`thinkingConfig`],j);let ee=F(t,[`imageConfig`]);if(ee!=null&&P(i,[`imageConfig`],Uo(ee)),F(t,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);let te=F(t,[`modelArmorConfig`]);if(n!==void 0&&te!=null&&P(n,[`modelArmorConfig`],te),F(t,[`serviceTier`])!==void 0)throw Error(`serviceTier parameter is not supported in Vertex AI.`);return i}function fo(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let e=R(a);Array.isArray(e)&&(e=e.map(e=>Ia(e))),P(r,[`contents`],e)}let o=F(t,[`config`]);return o!=null&&P(r,[`generationConfig`],lo(e,o,r)),r}function po(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`contents`]);if(a!=null){let e=R(a);Array.isArray(e)&&(e=e.map(e=>La(e))),P(r,[`contents`],e)}let o=F(t,[`config`]);return o!=null&&P(r,[`generationConfig`],uo(e,o,r)),r}function mo(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`candidates`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Aa(e))),P(n,[`candidates`],e)}let a=F(e,[`modelVersion`]);a!=null&&P(n,[`modelVersion`],a);let o=F(e,[`promptFeedback`]);o!=null&&P(n,[`promptFeedback`],o);let s=F(e,[`responseId`]);s!=null&&P(n,[`responseId`],s);let c=F(e,[`usageMetadata`]);c!=null&&P(n,[`usageMetadata`],c);let l=F(e,[`modelStatus`]);return l!=null&&P(n,[`modelStatus`],l),n}function ho(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`candidates`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`candidates`],e)}let a=F(e,[`createTime`]);a!=null&&P(n,[`createTime`],a);let o=F(e,[`modelVersion`]);o!=null&&P(n,[`modelVersion`],o);let s=F(e,[`promptFeedback`]);s!=null&&P(n,[`promptFeedback`],s);let c=F(e,[`responseId`]);c!=null&&P(n,[`responseId`],c);let l=F(e,[`usageMetadata`]);return l!=null&&P(n,[`usageMetadata`],l),n}function go(e,t,n){let r={};if(F(e,[`outputGcsUri`])!==void 0)throw Error(`outputGcsUri parameter is not supported in Gemini API.`);if(F(e,[`negativePrompt`])!==void 0)throw Error(`negativePrompt parameter is not supported in Gemini API.`);let i=F(e,[`numberOfImages`]);t!==void 0&&i!=null&&P(t,[`parameters`,`sampleCount`],i);let a=F(e,[`aspectRatio`]);t!==void 0&&a!=null&&P(t,[`parameters`,`aspectRatio`],a);let o=F(e,[`guidanceScale`]);if(t!==void 0&&o!=null&&P(t,[`parameters`,`guidanceScale`],o),F(e,[`seed`])!==void 0)throw Error(`seed parameter is not supported in Gemini API.`);let s=F(e,[`safetyFilterLevel`]);t!==void 0&&s!=null&&P(t,[`parameters`,`safetySetting`],s);let c=F(e,[`personGeneration`]);t!==void 0&&c!=null&&P(t,[`parameters`,`personGeneration`],c);let l=F(e,[`includeSafetyAttributes`]);t!==void 0&&l!=null&&P(t,[`parameters`,`includeSafetyAttributes`],l);let u=F(e,[`includeRaiReason`]);t!==void 0&&u!=null&&P(t,[`parameters`,`includeRaiReason`],u);let d=F(e,[`language`]);t!==void 0&&d!=null&&P(t,[`parameters`,`language`],d);let f=F(e,[`outputMimeType`]);t!==void 0&&f!=null&&P(t,[`parameters`,`outputOptions`,`mimeType`],f);let p=F(e,[`outputCompressionQuality`]);if(t!==void 0&&p!=null&&P(t,[`parameters`,`outputOptions`,`compressionQuality`],p),F(e,[`addWatermark`])!==void 0)throw Error(`addWatermark parameter is not supported in Gemini API.`);if(F(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let m=F(e,[`imageSize`]);if(t!==void 0&&m!=null&&P(t,[`parameters`,`sampleImageSize`],m),F(e,[`enhancePrompt`])!==void 0)throw Error(`enhancePrompt parameter is not supported in Gemini API.`);return r}function _o(e,t,n){let r={},i=F(e,[`outputGcsUri`]);t!==void 0&&i!=null&&P(t,[`parameters`,`storageUri`],i);let a=F(e,[`negativePrompt`]);t!==void 0&&a!=null&&P(t,[`parameters`,`negativePrompt`],a);let o=F(e,[`numberOfImages`]);t!==void 0&&o!=null&&P(t,[`parameters`,`sampleCount`],o);let s=F(e,[`aspectRatio`]);t!==void 0&&s!=null&&P(t,[`parameters`,`aspectRatio`],s);let c=F(e,[`guidanceScale`]);t!==void 0&&c!=null&&P(t,[`parameters`,`guidanceScale`],c);let l=F(e,[`seed`]);t!==void 0&&l!=null&&P(t,[`parameters`,`seed`],l);let u=F(e,[`safetyFilterLevel`]);t!==void 0&&u!=null&&P(t,[`parameters`,`safetySetting`],u);let d=F(e,[`personGeneration`]);t!==void 0&&d!=null&&P(t,[`parameters`,`personGeneration`],d);let f=F(e,[`includeSafetyAttributes`]);t!==void 0&&f!=null&&P(t,[`parameters`,`includeSafetyAttributes`],f);let p=F(e,[`includeRaiReason`]);t!==void 0&&p!=null&&P(t,[`parameters`,`includeRaiReason`],p);let m=F(e,[`language`]);t!==void 0&&m!=null&&P(t,[`parameters`,`language`],m);let h=F(e,[`outputMimeType`]);t!==void 0&&h!=null&&P(t,[`parameters`,`outputOptions`,`mimeType`],h);let g=F(e,[`outputCompressionQuality`]);t!==void 0&&g!=null&&P(t,[`parameters`,`outputOptions`,`compressionQuality`],g);let _=F(e,[`addWatermark`]);t!==void 0&&_!=null&&P(t,[`parameters`,`addWatermark`],_);let v=F(e,[`labels`]);t!==void 0&&v!=null&&P(t,[`labels`],v);let y=F(e,[`imageSize`]);t!==void 0&&y!=null&&P(t,[`parameters`,`sampleImageSize`],y);let b=F(e,[`enhancePrompt`]);return t!==void 0&&b!=null&&P(t,[`parameters`,`enhancePrompt`],b),r}function vo(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`prompt`]);a!=null&&P(r,[`instances[0]`,`prompt`],a);let o=F(t,[`config`]);return o!=null&&go(o,r),r}function yo(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`prompt`]);a!=null&&P(r,[`instances[0]`,`prompt`],a);let o=F(t,[`config`]);return o!=null&&_o(o,r),r}function bo(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Mo(e))),P(n,[`generatedImages`],e)}let a=F(e,[`positivePromptSafetyAttributes`]);return a!=null&&P(n,[`positivePromptSafetyAttributes`],fs(a)),n}function xo(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>No(e))),P(n,[`generatedImages`],e)}let a=F(e,[`positivePromptSafetyAttributes`]);return a!=null&&P(n,[`positivePromptSafetyAttributes`],ps(a)),n}function So(e,t,n){let r={},i=F(e,[`numberOfVideos`]);if(t!==void 0&&i!=null&&P(t,[`parameters`,`sampleCount`],i),F(e,[`outputGcsUri`])!==void 0)throw Error(`outputGcsUri parameter is not supported in Gemini API.`);if(F(e,[`fps`])!==void 0)throw Error(`fps parameter is not supported in Gemini API.`);let a=F(e,[`durationSeconds`]);if(t!==void 0&&a!=null&&P(t,[`parameters`,`durationSeconds`],a),F(e,[`seed`])!==void 0)throw Error(`seed parameter is not supported in Gemini API.`);let o=F(e,[`aspectRatio`]);t!==void 0&&o!=null&&P(t,[`parameters`,`aspectRatio`],o);let s=F(e,[`resolution`]);t!==void 0&&s!=null&&P(t,[`parameters`,`resolution`],s);let c=F(e,[`personGeneration`]);if(t!==void 0&&c!=null&&P(t,[`parameters`,`personGeneration`],c),F(e,[`pubsubTopic`])!==void 0)throw Error(`pubsubTopic parameter is not supported in Gemini API.`);let l=F(e,[`negativePrompt`]);t!==void 0&&l!=null&&P(t,[`parameters`,`negativePrompt`],l);let u=F(e,[`enhancePrompt`]);if(t!==void 0&&u!=null&&P(t,[`parameters`,`enhancePrompt`],u),F(e,[`generateAudio`])!==void 0)throw Error(`generateAudio parameter is not supported in Gemini API.`);let d=F(e,[`lastFrame`]);t!==void 0&&d!=null&&P(t,[`instances[0]`,`lastFrame`],Ko(d));let f=F(e,[`referenceImages`]);if(t!==void 0&&f!=null){let e=f;Array.isArray(e)&&(e=e.map(e=>Rs(e))),P(t,[`instances[0]`,`referenceImages`],e)}if(F(e,[`mask`])!==void 0)throw Error(`mask parameter is not supported in Gemini API.`);if(F(e,[`compressionQuality`])!==void 0)throw Error(`compressionQuality parameter is not supported in Gemini API.`);if(F(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);return r}function Co(e,t,n){let r={},i=F(e,[`numberOfVideos`]);t!==void 0&&i!=null&&P(t,[`parameters`,`sampleCount`],i);let a=F(e,[`outputGcsUri`]);t!==void 0&&a!=null&&P(t,[`parameters`,`storageUri`],a);let o=F(e,[`fps`]);t!==void 0&&o!=null&&P(t,[`parameters`,`fps`],o);let s=F(e,[`durationSeconds`]);t!==void 0&&s!=null&&P(t,[`parameters`,`durationSeconds`],s);let c=F(e,[`seed`]);t!==void 0&&c!=null&&P(t,[`parameters`,`seed`],c);let l=F(e,[`aspectRatio`]);t!==void 0&&l!=null&&P(t,[`parameters`,`aspectRatio`],l);let u=F(e,[`resolution`]);t!==void 0&&u!=null&&P(t,[`parameters`,`resolution`],u);let d=F(e,[`personGeneration`]);t!==void 0&&d!=null&&P(t,[`parameters`,`personGeneration`],d);let f=F(e,[`pubsubTopic`]);t!==void 0&&f!=null&&P(t,[`parameters`,`pubsubTopic`],f);let p=F(e,[`negativePrompt`]);t!==void 0&&p!=null&&P(t,[`parameters`,`negativePrompt`],p);let m=F(e,[`enhancePrompt`]);t!==void 0&&m!=null&&P(t,[`parameters`,`enhancePrompt`],m);let h=F(e,[`generateAudio`]);t!==void 0&&h!=null&&P(t,[`parameters`,`generateAudio`],h);let g=F(e,[`lastFrame`]);t!==void 0&&g!=null&&P(t,[`instances[0]`,`lastFrame`],G(g));let _=F(e,[`referenceImages`]);if(t!==void 0&&_!=null){let e=_;Array.isArray(e)&&(e=e.map(e=>zs(e))),P(t,[`instances[0]`,`referenceImages`],e)}let v=F(e,[`mask`]);t!==void 0&&v!=null&&P(t,[`instances[0]`,`mask`],Ls(v));let y=F(e,[`compressionQuality`]);t!==void 0&&y!=null&&P(t,[`parameters`,`compressionQuality`],y);let b=F(e,[`labels`]);return t!==void 0&&b!=null&&P(t,[`labels`],b),r}function wo(e,t){let n={},r=F(e,[`name`]);r!=null&&P(n,[`name`],r);let i=F(e,[`metadata`]);i!=null&&P(n,[`metadata`],i);let a=F(e,[`done`]);a!=null&&P(n,[`done`],a);let o=F(e,[`error`]);o!=null&&P(n,[`error`],o);let s=F(e,[`response`,`generateVideoResponse`]);return s!=null&&P(n,[`response`],Oo(s)),n}function To(e,t){let n={},r=F(e,[`name`]);r!=null&&P(n,[`name`],r);let i=F(e,[`metadata`]);i!=null&&P(n,[`metadata`],i);let a=F(e,[`done`]);a!=null&&P(n,[`done`],a);let o=F(e,[`error`]);o!=null&&P(n,[`error`],o);let s=F(e,[`response`]);return s!=null&&P(n,[`response`],ko(s)),n}function Eo(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`prompt`]);a!=null&&P(r,[`instances[0]`,`prompt`],a);let o=F(t,[`image`]);o!=null&&P(r,[`instances[0]`,`image`],Ko(o));let s=F(t,[`video`]);s!=null&&P(r,[`instances[0]`,`video`],Bs(s));let c=F(t,[`source`]);c!=null&&Ao(c,r);let l=F(t,[`config`]);return l!=null&&So(l,r),r}function Do(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`prompt`]);a!=null&&P(r,[`instances[0]`,`prompt`],a);let o=F(t,[`image`]);o!=null&&P(r,[`instances[0]`,`image`],G(o));let s=F(t,[`video`]);s!=null&&P(r,[`instances[0]`,`video`],Vs(s));let c=F(t,[`source`]);c!=null&&jo(c,r);let l=F(t,[`config`]);return l!=null&&Co(l,r),r}function Oo(e,t){let n={},r=F(e,[`generatedSamples`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Fo(e))),P(n,[`generatedVideos`],e)}let i=F(e,[`raiMediaFilteredCount`]);i!=null&&P(n,[`raiMediaFilteredCount`],i);let a=F(e,[`raiMediaFilteredReasons`]);return a!=null&&P(n,[`raiMediaFilteredReasons`],a),n}function ko(e,t){let n={},r=F(e,[`videos`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Io(e))),P(n,[`generatedVideos`],e)}let i=F(e,[`raiMediaFilteredCount`]);i!=null&&P(n,[`raiMediaFilteredCount`],i);let a=F(e,[`raiMediaFilteredReasons`]);return a!=null&&P(n,[`raiMediaFilteredReasons`],a),n}function Ao(e,t,n){let r={},i=F(e,[`prompt`]);t!==void 0&&i!=null&&P(t,[`instances[0]`,`prompt`],i);let a=F(e,[`image`]);t!==void 0&&a!=null&&P(t,[`instances[0]`,`image`],Ko(a));let o=F(e,[`video`]);return t!==void 0&&o!=null&&P(t,[`instances[0]`,`video`],Bs(o)),r}function jo(e,t,n){let r={},i=F(e,[`prompt`]);t!==void 0&&i!=null&&P(t,[`instances[0]`,`prompt`],i);let a=F(e,[`image`]);t!==void 0&&a!=null&&P(t,[`instances[0]`,`image`],G(a));let o=F(e,[`video`]);return t!==void 0&&o!=null&&P(t,[`instances[0]`,`video`],Vs(o)),r}function Mo(e,t){let n={},r=F(e,[`_self`]);r!=null&&P(n,[`image`],Wo(r));let i=F(e,[`raiFilteredReason`]);i!=null&&P(n,[`raiFilteredReason`],i);let a=F(e,[`_self`]);return a!=null&&P(n,[`safetyAttributes`],fs(a)),n}function No(e,t){let n={},r=F(e,[`_self`]);r!=null&&P(n,[`image`],Go(r));let i=F(e,[`raiFilteredReason`]);i!=null&&P(n,[`raiFilteredReason`],i);let a=F(e,[`_self`]);a!=null&&P(n,[`safetyAttributes`],ps(a));let o=F(e,[`prompt`]);return o!=null&&P(n,[`enhancedPrompt`],o),n}function Po(e,t){let n={},r=F(e,[`_self`]);r!=null&&P(n,[`mask`],Go(r));let i=F(e,[`labels`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`labels`],e)}return n}function Fo(e,t){let n={},r=F(e,[`video`]);return r!=null&&P(n,[`video`],Fs(r)),n}function Io(e,t){let n={},r=F(e,[`_self`]);return r!=null&&P(n,[`video`],Is(r)),n}function Lo(e,t){let n={},r=F(e,[`modelSelectionConfig`]);r!=null&&P(n,[`modelConfig`],r);let i=F(e,[`responseJsonSchema`]);i!=null&&P(n,[`responseJsonSchema`],i);let a=F(e,[`audioTimestamp`]);a!=null&&P(n,[`audioTimestamp`],a);let o=F(e,[`candidateCount`]);o!=null&&P(n,[`candidateCount`],o);let s=F(e,[`enableAffectiveDialog`]);s!=null&&P(n,[`enableAffectiveDialog`],s);let c=F(e,[`frequencyPenalty`]);c!=null&&P(n,[`frequencyPenalty`],c);let l=F(e,[`logprobs`]);l!=null&&P(n,[`logprobs`],l);let u=F(e,[`maxOutputTokens`]);u!=null&&P(n,[`maxOutputTokens`],u);let d=F(e,[`mediaResolution`]);d!=null&&P(n,[`mediaResolution`],d);let f=F(e,[`presencePenalty`]);f!=null&&P(n,[`presencePenalty`],f);let p=F(e,[`responseLogprobs`]);p!=null&&P(n,[`responseLogprobs`],p);let m=F(e,[`responseMimeType`]);m!=null&&P(n,[`responseMimeType`],m);let h=F(e,[`responseModalities`]);h!=null&&P(n,[`responseModalities`],h);let g=F(e,[`responseSchema`]);g!=null&&P(n,[`responseSchema`],g);let _=F(e,[`routingConfig`]);_!=null&&P(n,[`routingConfig`],_);let v=F(e,[`seed`]);v!=null&&P(n,[`seed`],v);let y=F(e,[`speechConfig`]);y!=null&&P(n,[`speechConfig`],xs(y));let b=F(e,[`stopSequences`]);b!=null&&P(n,[`stopSequences`],b);let x=F(e,[`temperature`]);x!=null&&P(n,[`temperature`],x);let S=F(e,[`thinkingConfig`]);S!=null&&P(n,[`thinkingConfig`],S);let C=F(e,[`topK`]);C!=null&&P(n,[`topK`],C);let w=F(e,[`topP`]);if(w!=null&&P(n,[`topP`],w),F(e,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);return n}function Ro(e,t,n){let r={},i=F(t,[`model`]);return i!=null&&P(r,[`_url`,`name`],I(e,i)),r}function zo(e,t,n){let r={},i=F(t,[`model`]);return i!=null&&P(r,[`_url`,`name`],I(e,i)),r}function Bo(e,t){let n={},r=F(e,[`authConfig`]);r!=null&&P(n,[`authConfig`],Oa(r));let i=F(e,[`enableWidget`]);return i!=null&&P(n,[`enableWidget`],i),n}function Vo(e,t){let n={},r=F(e,[`searchTypes`]);if(r!=null&&P(n,[`searchTypes`],r),F(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(F(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let i=F(e,[`timeRangeFilter`]);return i!=null&&P(n,[`timeRangeFilter`],i),n}function Ho(e,t){let n={},r=F(e,[`aspectRatio`]);r!=null&&P(n,[`aspectRatio`],r);let i=F(e,[`imageSize`]);if(i!=null&&P(n,[`imageSize`],i),F(e,[`personGeneration`])!==void 0)throw Error(`personGeneration parameter is not supported in Gemini API.`);if(F(e,[`prominentPeople`])!==void 0)throw Error(`prominentPeople parameter is not supported in Gemini API.`);if(F(e,[`outputMimeType`])!==void 0)throw Error(`outputMimeType parameter is not supported in Gemini API.`);if(F(e,[`outputCompressionQuality`])!==void 0)throw Error(`outputCompressionQuality parameter is not supported in Gemini API.`);if(F(e,[`imageOutputOptions`])!==void 0)throw Error(`imageOutputOptions parameter is not supported in Gemini API.`);return n}function Uo(e,t){let n={},r=F(e,[`aspectRatio`]);r!=null&&P(n,[`aspectRatio`],r);let i=F(e,[`imageSize`]);i!=null&&P(n,[`imageSize`],i);let a=F(e,[`personGeneration`]);a!=null&&P(n,[`personGeneration`],a);let o=F(e,[`prominentPeople`]);o!=null&&P(n,[`prominentPeople`],o);let s=F(e,[`outputMimeType`]);s!=null&&P(n,[`imageOutputOptions`,`mimeType`],s);let c=F(e,[`outputCompressionQuality`]);c!=null&&P(n,[`imageOutputOptions`,`compressionQuality`],c);let l=F(e,[`imageOutputOptions`]);return l!=null&&P(n,[`imageOutputOptions`],l),n}function Wo(e,t){let n={},r=F(e,[`bytesBase64Encoded`]);r!=null&&P(n,[`imageBytes`],B(r));let i=F(e,[`mimeType`]);return i!=null&&P(n,[`mimeType`],i),n}function Go(e,t){let n={},r=F(e,[`gcsUri`]);r!=null&&P(n,[`gcsUri`],r);let i=F(e,[`bytesBase64Encoded`]);i!=null&&P(n,[`imageBytes`],B(i));let a=F(e,[`mimeType`]);return a!=null&&P(n,[`mimeType`],a),n}function Ko(e,t){let n={};if(F(e,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);let r=F(e,[`imageBytes`]);r!=null&&P(n,[`bytesBase64Encoded`],B(r));let i=F(e,[`mimeType`]);return i!=null&&P(n,[`mimeType`],i),n}function G(e,t){let n={},r=F(e,[`gcsUri`]);r!=null&&P(n,[`gcsUri`],r);let i=F(e,[`imageBytes`]);i!=null&&P(n,[`bytesBase64Encoded`],B(i));let a=F(e,[`mimeType`]);return a!=null&&P(n,[`mimeType`],a),n}function qo(e,t,n,r){let i={},a=F(t,[`pageSize`]);n!==void 0&&a!=null&&P(n,[`_query`,`pageSize`],a);let o=F(t,[`pageToken`]);n!==void 0&&o!=null&&P(n,[`_query`,`pageToken`],o);let s=F(t,[`filter`]);n!==void 0&&s!=null&&P(n,[`_query`,`filter`],s);let c=F(t,[`queryBase`]);return n!==void 0&&c!=null&&P(n,[`_url`,`models_url`],Rn(e,c)),i}function Jo(e,t,n,r){let i={},a=F(t,[`pageSize`]);n!==void 0&&a!=null&&P(n,[`_query`,`pageSize`],a);let o=F(t,[`pageToken`]);n!==void 0&&o!=null&&P(n,[`_query`,`pageToken`],o);let s=F(t,[`filter`]);n!==void 0&&s!=null&&P(n,[`_query`,`filter`],s);let c=F(t,[`queryBase`]);return n!==void 0&&c!=null&&P(n,[`_url`,`models_url`],Rn(e,c)),i}function Yo(e,t,n){let r={},i=F(t,[`config`]);return i!=null&&qo(e,i,r),r}function Xo(e,t,n){let r={},i=F(t,[`config`]);return i!=null&&Jo(e,i,r),r}function Zo(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`nextPageToken`]);i!=null&&P(n,[`nextPageToken`],i);let a=F(e,[`_self`]);if(a!=null){let e=zn(a);Array.isArray(e)&&(e=e.map(e=>es(e))),P(n,[`models`],e)}return n}function Qo(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`nextPageToken`]);i!=null&&P(n,[`nextPageToken`],i);let a=F(e,[`_self`]);if(a!=null){let e=zn(a);Array.isArray(e)&&(e=e.map(e=>ts(e))),P(n,[`models`],e)}return n}function $o(e,t){let n={},r=F(e,[`maskMode`]);r!=null&&P(n,[`maskMode`],r);let i=F(e,[`segmentationClasses`]);i!=null&&P(n,[`maskClasses`],i);let a=F(e,[`maskDilation`]);return a!=null&&P(n,[`dilation`],a),n}function es(e,t){let n={},r=F(e,[`name`]);r!=null&&P(n,[`name`],r);let i=F(e,[`displayName`]);i!=null&&P(n,[`displayName`],i);let a=F(e,[`description`]);a!=null&&P(n,[`description`],a);let o=F(e,[`version`]);o!=null&&P(n,[`version`],o);let s=F(e,[`_self`]);s!=null&&P(n,[`tunedModelInfo`],Es(s));let c=F(e,[`inputTokenLimit`]);c!=null&&P(n,[`inputTokenLimit`],c);let l=F(e,[`outputTokenLimit`]);l!=null&&P(n,[`outputTokenLimit`],l);let u=F(e,[`supportedGenerationMethods`]);u!=null&&P(n,[`supportedActions`],u);let d=F(e,[`temperature`]);d!=null&&P(n,[`temperature`],d);let f=F(e,[`maxTemperature`]);f!=null&&P(n,[`maxTemperature`],f);let p=F(e,[`topP`]);p!=null&&P(n,[`topP`],p);let m=F(e,[`topK`]);m!=null&&P(n,[`topK`],m);let h=F(e,[`thinking`]);return h!=null&&P(n,[`thinking`],h),n}function ts(e,t){let n={},r=F(e,[`name`]);r!=null&&P(n,[`name`],r);let i=F(e,[`displayName`]);i!=null&&P(n,[`displayName`],i);let a=F(e,[`description`]);a!=null&&P(n,[`description`],a);let o=F(e,[`versionId`]);o!=null&&P(n,[`version`],o);let s=F(e,[`deployedModels`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>io(e))),P(n,[`endpoints`],e)}let c=F(e,[`labels`]);c!=null&&P(n,[`labels`],c);let l=F(e,[`_self`]);l!=null&&P(n,[`tunedModelInfo`],Ds(l));let u=F(e,[`defaultCheckpointId`]);u!=null&&P(n,[`defaultCheckpointId`],u);let d=F(e,[`checkpoints`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`checkpoints`],e)}return n}function ns(e,t){let n={},r=F(e,[`speakerVoiceConfigs`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>bs(e))),P(n,[`speakerVoiceConfigs`],e)}return n}function rs(e,t){let n={},r=F(e,[`mediaResolution`]);r!=null&&P(n,[`mediaResolution`],r);let i=F(e,[`codeExecutionResult`]);i!=null&&P(n,[`codeExecutionResult`],i);let a=F(e,[`executableCode`]);a!=null&&P(n,[`executableCode`],a);let o=F(e,[`fileData`]);o!=null&&P(n,[`fileData`],ao(o));let s=F(e,[`functionCall`]);s!=null&&P(n,[`functionCall`],oo(s));let c=F(e,[`functionResponse`]);c!=null&&P(n,[`functionResponse`],c);let l=F(e,[`inlineData`]);l!=null&&P(n,[`inlineData`],ka(l));let u=F(e,[`text`]);u!=null&&P(n,[`text`],u);let d=F(e,[`thought`]);d!=null&&P(n,[`thought`],d);let f=F(e,[`thoughtSignature`]);f!=null&&P(n,[`thoughtSignature`],f);let p=F(e,[`videoMetadata`]);p!=null&&P(n,[`videoMetadata`],p);let m=F(e,[`toolCall`]);m!=null&&P(n,[`toolCall`],m);let h=F(e,[`toolResponse`]);h!=null&&P(n,[`toolResponse`],h);let g=F(e,[`partMetadata`]);return g!=null&&P(n,[`partMetadata`],g),n}function is(e,t){let n={},r=F(e,[`mediaResolution`]);r!=null&&P(n,[`mediaResolution`],r);let i=F(e,[`codeExecutionResult`]);i!=null&&P(n,[`codeExecutionResult`],i);let a=F(e,[`executableCode`]);a!=null&&P(n,[`executableCode`],a);let o=F(e,[`fileData`]);o!=null&&P(n,[`fileData`],o);let s=F(e,[`functionCall`]);s!=null&&P(n,[`functionCall`],s);let c=F(e,[`functionResponse`]);c!=null&&P(n,[`functionResponse`],c);let l=F(e,[`inlineData`]);l!=null&&P(n,[`inlineData`],l);let u=F(e,[`text`]);u!=null&&P(n,[`text`],u);let d=F(e,[`thought`]);d!=null&&P(n,[`thought`],d);let f=F(e,[`thoughtSignature`]);f!=null&&P(n,[`thoughtSignature`],f);let p=F(e,[`videoMetadata`]);if(p!=null&&P(n,[`videoMetadata`],p),F(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(F(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(F(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return n}function as(e,t){let n={},r=F(e,[`productImage`]);return r!=null&&P(n,[`image`],G(r)),n}function os(e,t,n){let r={},i=F(e,[`numberOfImages`]);t!==void 0&&i!=null&&P(t,[`parameters`,`sampleCount`],i);let a=F(e,[`baseSteps`]);t!==void 0&&a!=null&&P(t,[`parameters`,`baseSteps`],a);let o=F(e,[`outputGcsUri`]);t!==void 0&&o!=null&&P(t,[`parameters`,`storageUri`],o);let s=F(e,[`seed`]);t!==void 0&&s!=null&&P(t,[`parameters`,`seed`],s);let c=F(e,[`safetyFilterLevel`]);t!==void 0&&c!=null&&P(t,[`parameters`,`safetySetting`],c);let l=F(e,[`personGeneration`]);t!==void 0&&l!=null&&P(t,[`parameters`,`personGeneration`],l);let u=F(e,[`addWatermark`]);t!==void 0&&u!=null&&P(t,[`parameters`,`addWatermark`],u);let d=F(e,[`outputMimeType`]);t!==void 0&&d!=null&&P(t,[`parameters`,`outputOptions`,`mimeType`],d);let f=F(e,[`outputCompressionQuality`]);t!==void 0&&f!=null&&P(t,[`parameters`,`outputOptions`,`compressionQuality`],f);let p=F(e,[`enhancePrompt`]);t!==void 0&&p!=null&&P(t,[`parameters`,`enhancePrompt`],p);let m=F(e,[`labels`]);return t!==void 0&&m!=null&&P(t,[`labels`],m),r}function ss(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`source`]);a!=null&&ls(a,r);let o=F(t,[`config`]);return o!=null&&os(o,r),r}function cs(e,t){let n={},r=F(e,[`predictions`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>No(e))),P(n,[`generatedImages`],e)}return n}function ls(e,t,n){let r={},i=F(e,[`prompt`]);t!==void 0&&i!=null&&P(t,[`instances[0]`,`prompt`],i);let a=F(e,[`personImage`]);t!==void 0&&a!=null&&P(t,[`instances[0]`,`personImage`,`image`],G(a));let o=F(e,[`productImages`]);if(t!==void 0&&o!=null){let e=o;Array.isArray(e)&&(e=e.map(e=>as(e))),P(t,[`instances[0]`,`productImages`],e)}return r}function us(e,t){let n={},r=F(e,[`referenceImage`]);r!=null&&P(n,[`referenceImage`],G(r));let i=F(e,[`referenceId`]);i!=null&&P(n,[`referenceId`],i);let a=F(e,[`referenceType`]);a!=null&&P(n,[`referenceType`],a);let o=F(e,[`maskImageConfig`]);o!=null&&P(n,[`maskImageConfig`],$o(o));let s=F(e,[`controlImageConfig`]);s!=null&&P(n,[`controlImageConfig`],Ra(s));let c=F(e,[`styleImageConfig`]);c!=null&&P(n,[`styleImageConfig`],c);let l=F(e,[`subjectImageConfig`]);return l!=null&&P(n,[`subjectImageConfig`],l),n}function ds(e,t){let n={},r=F(e,[`mimeType`]);r!=null&&P(n,[`mimeType`],r);let i=F(e,[`voiceSampleAudio`]);return i!=null&&P(n,[`voiceSampleAudio`],i),n}function fs(e,t){let n={},r=F(e,[`safetyAttributes`,`categories`]);r!=null&&P(n,[`categories`],r);let i=F(e,[`safetyAttributes`,`scores`]);i!=null&&P(n,[`scores`],i);let a=F(e,[`contentType`]);return a!=null&&P(n,[`contentType`],a),n}function ps(e,t){let n={},r=F(e,[`safetyAttributes`,`categories`]);r!=null&&P(n,[`categories`],r);let i=F(e,[`safetyAttributes`,`scores`]);i!=null&&P(n,[`scores`],i);let a=F(e,[`contentType`]);return a!=null&&P(n,[`contentType`],a),n}function ms(e,t){let n={},r=F(e,[`category`]);if(r!=null&&P(n,[`category`],r),F(e,[`method`])!==void 0)throw Error(`method parameter is not supported in Gemini API.`);let i=F(e,[`threshold`]);return i!=null&&P(n,[`threshold`],i),n}function hs(e,t){let n={},r=F(e,[`image`]);return r!=null&&P(n,[`image`],G(r)),n}function gs(e,t,n){let r={},i=F(e,[`mode`]);t!==void 0&&i!=null&&P(t,[`parameters`,`mode`],i);let a=F(e,[`maxPredictions`]);t!==void 0&&a!=null&&P(t,[`parameters`,`maxPredictions`],a);let o=F(e,[`confidenceThreshold`]);t!==void 0&&o!=null&&P(t,[`parameters`,`confidenceThreshold`],o);let s=F(e,[`maskDilation`]);t!==void 0&&s!=null&&P(t,[`parameters`,`maskDilation`],s);let c=F(e,[`binaryColorThreshold`]);t!==void 0&&c!=null&&P(t,[`parameters`,`binaryColorThreshold`],c);let l=F(e,[`labels`]);return t!==void 0&&l!=null&&P(t,[`labels`],l),r}function _s(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`source`]);a!=null&&ys(a,r);let o=F(t,[`config`]);return o!=null&&gs(o,r),r}function vs(e,t){let n={},r=F(e,[`predictions`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Po(e))),P(n,[`generatedMasks`],e)}return n}function ys(e,t,n){let r={},i=F(e,[`prompt`]);t!==void 0&&i!=null&&P(t,[`instances[0]`,`prompt`],i);let a=F(e,[`image`]);t!==void 0&&a!=null&&P(t,[`instances[0]`,`image`],G(a));let o=F(e,[`scribbleImage`]);return t!==void 0&&o!=null&&P(t,[`instances[0]`,`scribble`],hs(o)),r}function bs(e,t){let n={},r=F(e,[`speaker`]);r!=null&&P(n,[`speaker`],r);let i=F(e,[`voiceConfig`]);return i!=null&&P(n,[`voiceConfig`],Hs(i)),n}function xs(e,t){let n={},r=F(e,[`voiceConfig`]);r!=null&&P(n,[`voiceConfig`],Hs(r));let i=F(e,[`languageCode`]);i!=null&&P(n,[`languageCode`],i);let a=F(e,[`multiSpeakerVoiceConfig`]);return a!=null&&P(n,[`multiSpeakerVoiceConfig`],ns(a)),n}function Ss(e,t){let n={},r=F(e,[`retrievalConfig`]);r!=null&&P(n,[`retrievalConfig`],r);let i=F(e,[`functionCallingConfig`]);i!=null&&P(n,[`functionCallingConfig`],so(i));let a=F(e,[`includeServerSideToolInvocations`]);return a!=null&&P(n,[`includeServerSideToolInvocations`],a),n}function Cs(e,t){let n={},r=F(e,[`retrievalConfig`]);r!=null&&P(n,[`retrievalConfig`],r);let i=F(e,[`functionCallingConfig`]);if(i!=null&&P(n,[`functionCallingConfig`],i),F(e,[`includeServerSideToolInvocations`])!==void 0)throw Error(`includeServerSideToolInvocations parameter is not supported in Vertex AI.`);return n}function ws(e,t){let n={};if(F(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let r=F(e,[`computerUse`]);r!=null&&P(n,[`computerUse`],r);let i=F(e,[`fileSearch`]);i!=null&&P(n,[`fileSearch`],i);let a=F(e,[`googleSearch`]);a!=null&&P(n,[`googleSearch`],Vo(a));let o=F(e,[`googleMaps`]);o!=null&&P(n,[`googleMaps`],Bo(o));let s=F(e,[`codeExecution`]);if(s!=null&&P(n,[`codeExecution`],s),F(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let c=F(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`functionDeclarations`],e)}let l=F(e,[`googleSearchRetrieval`]);if(l!=null&&P(n,[`googleSearchRetrieval`],l),F(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let u=F(e,[`urlContext`]);u!=null&&P(n,[`urlContext`],u);let d=F(e,[`mcpServers`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`mcpServers`],e)}return n}function Ts(e,t){let n={},r=F(e,[`retrieval`]);r!=null&&P(n,[`retrieval`],r);let i=F(e,[`computerUse`]);if(i!=null&&P(n,[`computerUse`],i),F(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let a=F(e,[`googleSearch`]);a!=null&&P(n,[`googleSearch`],a);let o=F(e,[`googleMaps`]);o!=null&&P(n,[`googleMaps`],o);let s=F(e,[`codeExecution`]);s!=null&&P(n,[`codeExecution`],s);let c=F(e,[`enterpriseWebSearch`]);c!=null&&P(n,[`enterpriseWebSearch`],c);let l=F(e,[`functionDeclarations`]);if(l!=null){let e=l;Array.isArray(e)&&(e=e.map(e=>co(e))),P(n,[`functionDeclarations`],e)}let u=F(e,[`googleSearchRetrieval`]);u!=null&&P(n,[`googleSearchRetrieval`],u);let d=F(e,[`parallelAiSearch`]);d!=null&&P(n,[`parallelAiSearch`],d);let f=F(e,[`urlContext`]);if(f!=null&&P(n,[`urlContext`],f),F(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return n}function Es(e,t){let n={},r=F(e,[`baseModel`]);r!=null&&P(n,[`baseModel`],r);let i=F(e,[`createTime`]);i!=null&&P(n,[`createTime`],i);let a=F(e,[`updateTime`]);return a!=null&&P(n,[`updateTime`],a),n}function Ds(e,t){let n={},r=F(e,[`labels`,`google-vertex-llm-tuning-base-model-id`]);r!=null&&P(n,[`baseModel`],r);let i=F(e,[`createTime`]);i!=null&&P(n,[`createTime`],i);let a=F(e,[`updateTime`]);return a!=null&&P(n,[`updateTime`],a),n}function Os(e,t,n){let r={},i=F(e,[`displayName`]);t!==void 0&&i!=null&&P(t,[`displayName`],i);let a=F(e,[`description`]);t!==void 0&&a!=null&&P(t,[`description`],a);let o=F(e,[`defaultCheckpointId`]);return t!==void 0&&o!=null&&P(t,[`defaultCheckpointId`],o),r}function ks(e,t,n){let r={},i=F(e,[`displayName`]);t!==void 0&&i!=null&&P(t,[`displayName`],i);let a=F(e,[`description`]);t!==void 0&&a!=null&&P(t,[`description`],a);let o=F(e,[`defaultCheckpointId`]);return t!==void 0&&o!=null&&P(t,[`defaultCheckpointId`],o),r}function As(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`name`],I(e,i));let a=F(t,[`config`]);return a!=null&&Os(a,r),r}function js(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`config`]);return a!=null&&ks(a,r),r}function Ms(e,t,n){let r={},i=F(e,[`outputGcsUri`]);t!==void 0&&i!=null&&P(t,[`parameters`,`storageUri`],i);let a=F(e,[`safetyFilterLevel`]);t!==void 0&&a!=null&&P(t,[`parameters`,`safetySetting`],a);let o=F(e,[`personGeneration`]);t!==void 0&&o!=null&&P(t,[`parameters`,`personGeneration`],o);let s=F(e,[`includeRaiReason`]);t!==void 0&&s!=null&&P(t,[`parameters`,`includeRaiReason`],s);let c=F(e,[`outputMimeType`]);t!==void 0&&c!=null&&P(t,[`parameters`,`outputOptions`,`mimeType`],c);let l=F(e,[`outputCompressionQuality`]);t!==void 0&&l!=null&&P(t,[`parameters`,`outputOptions`,`compressionQuality`],l);let u=F(e,[`enhanceInputImage`]);t!==void 0&&u!=null&&P(t,[`parameters`,`upscaleConfig`,`enhanceInputImage`],u);let d=F(e,[`imagePreservationFactor`]);t!==void 0&&d!=null&&P(t,[`parameters`,`upscaleConfig`,`imagePreservationFactor`],d);let f=F(e,[`labels`]);t!==void 0&&f!=null&&P(t,[`labels`],f);let p=F(e,[`numberOfImages`]);t!==void 0&&p!=null&&P(t,[`parameters`,`sampleCount`],p);let m=F(e,[`mode`]);return t!==void 0&&m!=null&&P(t,[`parameters`,`mode`],m),r}function Ns(e,t,n){let r={},i=F(t,[`model`]);i!=null&&P(r,[`_url`,`model`],I(e,i));let a=F(t,[`image`]);a!=null&&P(r,[`instances[0]`,`image`],G(a));let o=F(t,[`upscaleFactor`]);o!=null&&P(r,[`parameters`,`upscaleConfig`,`upscaleFactor`],o);let s=F(t,[`config`]);return s!=null&&Ms(s,r),r}function Ps(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>No(e))),P(n,[`generatedImages`],e)}return n}function Fs(e,t){let n={},r=F(e,[`uri`]);r!=null&&P(n,[`uri`],r);let i=F(e,[`encodedVideo`]);i!=null&&P(n,[`videoBytes`],B(i));let a=F(e,[`encoding`]);return a!=null&&P(n,[`mimeType`],a),n}function Is(e,t){let n={},r=F(e,[`gcsUri`]);r!=null&&P(n,[`uri`],r);let i=F(e,[`bytesBase64Encoded`]);i!=null&&P(n,[`videoBytes`],B(i));let a=F(e,[`mimeType`]);return a!=null&&P(n,[`mimeType`],a),n}function Ls(e,t){let n={},r=F(e,[`image`]);r!=null&&P(n,[`_self`],G(r));let i=F(e,[`maskMode`]);return i!=null&&P(n,[`maskMode`],i),n}function Rs(e,t){let n={},r=F(e,[`image`]);r!=null&&P(n,[`image`],Ko(r));let i=F(e,[`referenceType`]);return i!=null&&P(n,[`referenceType`],i),n}function zs(e,t){let n={},r=F(e,[`image`]);r!=null&&P(n,[`image`],G(r));let i=F(e,[`referenceType`]);return i!=null&&P(n,[`referenceType`],i),n}function Bs(e,t){let n={},r=F(e,[`uri`]);r!=null&&P(n,[`uri`],r);let i=F(e,[`videoBytes`]);i!=null&&P(n,[`encodedVideo`],B(i));let a=F(e,[`mimeType`]);return a!=null&&P(n,[`encoding`],a),n}function Vs(e,t){let n={},r=F(e,[`uri`]);r!=null&&P(n,[`gcsUri`],r);let i=F(e,[`videoBytes`]);i!=null&&P(n,[`bytesBase64Encoded`],B(i));let a=F(e,[`mimeType`]);return a!=null&&P(n,[`mimeType`],a),n}function Hs(e,t){let n={},r=F(e,[`replicatedVoiceConfig`]);r!=null&&P(n,[`replicatedVoiceConfig`],ds(r));let i=F(e,[`prebuiltVoiceConfig`]);return i!=null&&P(n,[`prebuiltVoiceConfig`],i),n}function Us(e,t){let n={},r=F(e,[`displayName`]);return t!==void 0&&r!=null&&P(t,[`displayName`],r),n}function Ws(e){let t={},n=F(e,[`config`]);return n!=null&&Us(n,t),t}function Gs(e,t){let n={},r=F(e,[`force`]);return t!==void 0&&r!=null&&P(t,[`_query`,`force`],r),n}function Ks(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`_url`,`name`],n);let r=F(e,[`config`]);return r!=null&&Gs(r,t),t}function qs(e){let t={},n=F(e,[`name`]);return n!=null&&P(t,[`_url`,`name`],n),t}function Js(e,t){let n={},r=F(e,[`customMetadata`]);if(t!==void 0&&r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`customMetadata`],e)}let i=F(e,[`chunkingConfig`]);return t!==void 0&&i!=null&&P(t,[`chunkingConfig`],i),n}function Ys(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`name`],n);let r=F(e,[`metadata`]);r!=null&&P(t,[`metadata`],r);let i=F(e,[`done`]);i!=null&&P(t,[`done`],i);let a=F(e,[`error`]);a!=null&&P(t,[`error`],a);let o=F(e,[`response`]);return o!=null&&P(t,[`response`],Zs(o)),t}function Xs(e){let t={},n=F(e,[`fileSearchStoreName`]);n!=null&&P(t,[`_url`,`file_search_store_name`],n);let r=F(e,[`fileName`]);r!=null&&P(t,[`fileName`],r);let i=F(e,[`config`]);return i!=null&&Js(i,t),t}function Zs(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`parent`]);r!=null&&P(t,[`parent`],r);let i=F(e,[`documentName`]);return i!=null&&P(t,[`documentName`],i),t}function Qs(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);return t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),n}function $s(e){let t={},n=F(e,[`config`]);return n!=null&&Qs(n,t),t}function ec(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`fileSearchStores`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`fileSearchStores`],e)}return t}function tc(e,t){let n={},r=F(e,[`mimeType`]);t!==void 0&&r!=null&&P(t,[`mimeType`],r);let i=F(e,[`displayName`]);t!==void 0&&i!=null&&P(t,[`displayName`],i);let a=F(e,[`customMetadata`]);if(t!==void 0&&a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`customMetadata`],e)}let o=F(e,[`chunkingConfig`]);return t!==void 0&&o!=null&&P(t,[`chunkingConfig`],o),n}function nc(e){let t={},n=F(e,[`fileSearchStoreName`]);n!=null&&P(t,[`_url`,`file_search_store_name`],n);let r=F(e,[`config`]);return r!=null&&tc(r,t),t}function rc(e){let t={},n=F(e,[`sdkHttpResponse`]);return n!=null&&P(t,[`sdkHttpResponse`],n),t}var ic=`Content-Type`,ac=`X-Server-Timeout`,oc=`User-Agent`,sc=`x-goog-api-client`,cc=`google-genai-sdk/1.47.0`,lc=`v1beta1`,uc=`v1beta`,dc=5,fc=[408,429,500,502,503,504],pc=class{constructor(e){this.clientOptions=Object.assign({},e),this.customBaseUrl=e.httpOptions?.baseUrl,this.clientOptions.vertexai&&(this.clientOptions.project&&this.clientOptions.location?this.clientOptions.apiKey=void 0:this.clientOptions.apiKey&&(this.clientOptions.project=void 0,this.clientOptions.location=void 0));let t={};if(this.clientOptions.vertexai){if(!this.clientOptions.location&&!this.clientOptions.apiKey&&!this.customBaseUrl&&(this.clientOptions.location=`global`),!(this.clientOptions.project&&this.clientOptions.location||this.clientOptions.apiKey)&&!this.customBaseUrl)throw Error(`Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.`);let n=e.project&&e.location||!!e.apiKey;this.customBaseUrl&&!n?(t.baseUrl=this.customBaseUrl,this.clientOptions.project=void 0,this.clientOptions.location=void 0):this.clientOptions.apiKey||this.clientOptions.location===`global`?t.baseUrl=`https://aiplatform.googleapis.com/`:this.clientOptions.project&&this.clientOptions.location&&this.clientOptions.location===`us`?t.baseUrl=`https://aiplatform.${this.clientOptions.location}.rep.googleapis.com/`:this.clientOptions.project&&this.clientOptions.location&&(t.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`),t.apiVersion=this.clientOptions.apiVersion??lc}else this.clientOptions.apiKey||console.warn(`API key should be set when using the Gemini API.`),t.apiVersion=this.clientOptions.apiVersion??uc,t.baseUrl=`https://generativelanguage.googleapis.com/`;t.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=t,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(t,e.httpOptions))}isVertexAI(){return this.clientOptions.vertexai??!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getCustomBaseUrl(){return this.customBaseUrl}async getAuthHeaders(){let e=new Headers;return await this.clientOptions.auth.addAuthHeaders(e),e}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw Error(`API version is not set.`)}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw Error(`Base URL is not set.`)}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw Error(`Headers are not set.`)}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw Error(`HTTP options are not correctly set.`);let t=[e.baseUrl.endsWith(`/`)?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==``&&t.push(e.apiVersion),t.join(`/`)}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){let e=this.getBaseUrl(),t=new URL(e);return t.protocol=t.protocol==`http:`?`ws`:`wss`,t.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw Error(`HTTP options are not correctly set.`)}constructUrl(e,t,n){let r=[this.getRequestUrlInternal(t)];return n&&r.push(this.getBaseResourcePath()),e!==``&&r.push(e),new URL(`${r.join(`/`)}`)}shouldPrependVertexProjectPath(e,t){return!(t.baseUrl&&t.baseUrlResourceScope===ut.COLLECTION||this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith(`projects/`)||e.httpMethod===`GET`&&e.path.startsWith(`publishers/google/models`))}async request(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));let n=this.shouldPrependVertexProjectPath(e,t),r=this.constructUrl(e.path,t,n);if(e.queryParams)for(let[t,n]of Object.entries(e.queryParams))r.searchParams.append(t,String(n));let i={};if(e.httpMethod===`GET`){if(e.body&&e.body!==`{}`)throw Error(`Request body should be empty for GET request, but got non empty request body`)}else i.body=e.body;return i=await this.includeExtraHttpOptionsToRequestInit(i,t,r.toString(),e.abortSignal),this.unaryApiCall(r,i,e.httpMethod)}patchHttpOptions(e,t){let n=JSON.parse(JSON.stringify(e));for(let[e,r]of Object.entries(t))typeof r==`object`?n[e]=Object.assign(Object.assign({},n[e]),r):r!==void 0&&(n[e]=r);return n}async requestStream(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));let n=this.shouldPrependVertexProjectPath(e,t),r=this.constructUrl(e.path,t,n);(!r.searchParams.has(`alt`)||r.searchParams.get(`alt`)!==`sse`)&&r.searchParams.set(`alt`,`sse`);let i={};return i.body=e.body,i=await this.includeExtraHttpOptionsToRequestInit(i,t,r.toString(),e.abortSignal),this.streamApiCall(r,i,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,t,n,r){if(t&&t.timeout||r){let n=new AbortController,i=n.signal;if(t.timeout&&t?.timeout>0){let e=setTimeout(()=>n.abort(),t.timeout);e&&typeof e.unref==`function`&&e.unref()}r&&r.addEventListener(`abort`,()=>{n.abort()}),e.signal=i}return t&&t.extraBody!==null&&hc(e,t.extraBody),e.headers=await this.getHeadersInternal(t,n),e}async unaryApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async e=>(await mc(e),new Rt(e))).catch(e=>{throw e instanceof Error?e:Error(JSON.stringify(e))})}async streamApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async e=>(await mc(e),this.processStreamResponse(e))).catch(e=>{throw e instanceof Error?e:Error(JSON.stringify(e))})}processStreamResponse(e){return U(this,arguments,function*(){let t=(e?.body)?.getReader(),n=new TextDecoder(`utf-8`);if(!t)throw Error(`Response body is empty`);try{let r=``,i=[`

`,`\r\r`,`\r
\r
`];for(;;){let{done:a,value:o}=yield H(t.read());if(a){if(r.trim().length>0)throw Error(`Incomplete JSON segment at the end`);break}let s=n.decode(o,{stream:!0});try{let e=JSON.parse(s);if(`error`in e){let t=JSON.parse(JSON.stringify(e.error)),n=t.status,r=t.code,i=`got status: ${n}. ${JSON.stringify(e)}`;if(r>=400&&r<600)throw new Ri({message:i,status:r})}}catch(e){if(e.name===`ApiError`)throw e}r+=s;let c=-1,l=0;for(;;){c=-1,l=0;for(let e of i){let t=r.indexOf(e);t!==-1&&(c===-1||t<c)&&(c=t,l=e.length)}if(c===-1)break;let t=r.substring(0,c);r=r.substring(c+l);let n=t.trim();if(n.startsWith(`data:`)){let t=n.substring(5).trim();try{yield yield H(new Rt(new Response(t,{headers:e?.headers,status:e?.status,statusText:e?.statusText})))}catch(e){throw Error(`exception parsing stream chunk ${t}. ${e}`)}}}}}finally{t.releaseLock()}})}async apiCall(e,t){if(!this.clientOptions.httpOptions||!this.clientOptions.httpOptions.retryOptions)return fetch(e,t);let n=this.clientOptions.httpOptions.retryOptions;return(0,ie.default)(async()=>{let n=await fetch(e,t);if(n.ok)return n;throw fc.includes(n.status)?Error(`Retryable HTTP Error: ${n.statusText}`):new ie.AbortError(`Non-retryable exception ${n.statusText} sending request`)},{retries:(n.attempts??dc)-1})}getDefaultHeaders(){let e={},t=cc+` `+this.clientOptions.userAgentExtra;return e[oc]=t,e[sc]=t,e[ic]=`application/json`,e}async getHeadersInternal(e,t){let n=new Headers;if(e&&e.headers){for(let[t,r]of Object.entries(e.headers))n.append(t,r);e.timeout&&e.timeout>0&&n.append(ac,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(n,t),n}getFileName(e){let t=``;return typeof e==`string`&&(t=e.replace(/[/\\]+$/,``),t=t.split(/[/\\]/).pop()??``),t}async uploadFile(e,t){let n={};t!=null&&(n.mimeType=t.mimeType,n.name=t.name,n.displayName=t.displayName),n.name&&!n.name.startsWith(`files/`)&&(n.name=`files/${n.name}`);let r=this.clientOptions.uploader,i=await r.stat(e);n.sizeBytes=String(i.size);let a=t?.mimeType??i.type;if(a===void 0||a===``)throw Error(`Can not determine mimeType. Please provide mimeType in the config.`);n.mimeType=a;let o={file:n},s=this.getFileName(e),c=N(`upload/v1beta/files`,o._url),l=await this.fetchUploadUrl(c,n.sizeBytes,n.mimeType,s,o,t?.httpOptions);return r.upload(e,l,this)}async uploadFileToFileSearchStore(e,t,n){let r=this.clientOptions.uploader,i=await r.stat(t),a=String(i.size),o=n?.mimeType??i.type;if(o===void 0||o===``)throw Error(`Can not determine mimeType. Please provide mimeType in the config.`);let s=`upload/v1beta/${e}:uploadToFileSearchStore`,c=this.getFileName(t),l={};n!=null&&tc(n,l);let u=await this.fetchUploadUrl(s,a,o,c,l,n?.httpOptions);return r.uploadToFileSearchStore(t,u,this)}async downloadFile(e){await this.clientOptions.downloader.download(e,this)}async fetchUploadUrl(e,t,n,r,i,a){let o={};o=a||{apiVersion:``,headers:Object.assign({"Content-Type":`application/json`,"X-Goog-Upload-Protocol":`resumable`,"X-Goog-Upload-Command":`start`,"X-Goog-Upload-Header-Content-Length":`${t}`,"X-Goog-Upload-Header-Content-Type":`${n}`},r?{"X-Goog-Upload-File-Name":r}:{})};let s=await this.request({path:e,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:o});if(!s||!s?.headers)throw Error(`Server did not return an HttpResponse or the returned HttpResponse did not have headers.`);let c=s?.headers?.[`x-goog-upload-url`];if(c===void 0)throw Error(`Failed to get upload url. Server did not return the x-google-upload-url in the headers`);return c}};async function mc(e){if(e===void 0)throw Error(`response is undefined`);if(!e.ok){let t=e.status,n;n=e.headers.get(`content-type`)?.includes(`application/json`)?await e.json():{error:{message:await e.text(),code:e.status,status:e.statusText}};let r=JSON.stringify(n);throw t>=400&&t<600?new Ri({message:r,status:t}):Error(r)}}function hc(e,t){if(!t||Object.keys(t).length===0)return;if(e.body instanceof Blob){console.warn(`includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.`);return}let n={};if(typeof e.body==`string`&&e.body.length>0)try{let t=JSON.parse(e.body);if(typeof t==`object`&&t&&!Array.isArray(t))n=t;else{console.warn(`includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.`);return}}catch{console.warn(`includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.`);return}function r(e,t){let n=Object.assign({},e);for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e],a=n[e];i&&typeof i==`object`&&!Array.isArray(i)&&a&&typeof a==`object`&&!Array.isArray(a)?n[e]=r(a,i):(a&&i&&typeof a!=typeof i&&console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${e}". Original type: ${typeof a}, New type: ${typeof i}. Overwriting.`),n[e]=i)}return n}let i=r(n,t);e.body=JSON.stringify(i)}var gc=`mcp_used/unknown`,_c=!1;function vc(e){for(let t of e)if(bc(t)||typeof t==`object`&&`inputSchema`in t)return!0;return _c}function yc(e){e[sc]=((e[sc]??``)+` ${gc}`).trimStart()}function bc(e){return typeof e==`object`&&!!e&&e instanceof Sc}function xc(e){return U(this,arguments,function*(e,t=100){let n,r=0;for(;r<t;){let t=yield H(e.listTools({cursor:n}));for(let e of t.tools)yield yield H(e),r++;if(!t.nextCursor)break;n=t.nextCursor}})}var Sc=class e{constructor(e=[],t){this.mcpTools=[],this.functionNameToMcpClient={},this.mcpClients=e,this.config=t}static create(t,n){return new e(t,n)}async initialize(){var e,t,n,r;if(this.mcpTools.length>0)return;let i={},a=[];for(let l of this.mcpClients)try{for(var o=!0,s=(t=void 0,W(xc(l))),c;c=await s.next(),e=c.done,!e;o=!0){r=c.value,o=!1;let e=r;a.push(e);let t=e.name;if(i[t])throw Error(`Duplicate function name ${t} found in MCP tools. Please ensure function names are unique.`);i[t]=l}}catch(e){t={error:e}}finally{try{!o&&!e&&(n=s.return)&&await n.call(s)}finally{if(t)throw t.error}}this.mcpTools=a,this.functionNameToMcpClient=i}async tool(){return await this.initialize(),Hn(this.mcpTools,this.config)}async callTool(e){await this.initialize();let t=[];for(let n of e)if(n.name in this.functionNameToMcpClient){let e=this.functionNameToMcpClient[n.name],r;this.config.timeout&&(r={timeout:this.config.timeout});let i=await e.callTool({name:n.name,arguments:n.args},void 0,r);t.push({functionResponse:{name:n.name,response:i.isError?{error:i}:i}})}return t}};async function Cc(e,t,n){let r=new fn,i;i=n.data instanceof Blob?JSON.parse(await n.data.text()):JSON.parse(n.data),Object.assign(r,i),t(r)}var wc=class{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n}async connect(e){if(this.apiClient.isVertexAI())throw Error(`Live music is not supported for Vertex AI.`);console.warn(`Live music generation is experimental and may change in future versions.`);let t=this.apiClient.getWebsocketBaseUrl(),n=this.apiClient.getApiVersion(),r=Dc(this.apiClient.getDefaultHeaders()),i=`${t}/ws/google.ai.generativelanguage.${n}.GenerativeService.BidiGenerateMusic?key=${this.apiClient.getApiKey()}`,a=()=>{},o=new Promise(e=>{a=e}),s=e.callbacks,c=function(){a({})},l=this.apiClient,u={onopen:c,onmessage:e=>{Cc(l,s.onmessage,e)},onerror:s?.onerror??function(e){},onclose:s?.onclose??function(e){}},d=this.webSocketFactory.create(i,Ec(r),u);d.connect(),await o;let f={setup:{model:I(this.apiClient,e.model)}};return d.send(JSON.stringify(f)),new Tc(d,this.apiClient)}},Tc=class{constructor(e,t){this.conn=e,this.apiClient=t}async setWeightedPrompts(e){if(!e.weightedPrompts||Object.keys(e.weightedPrompts).length===0)throw Error(`Weighted prompts must be set and contain at least one entry.`);let t=fa(e);this.conn.send(JSON.stringify({clientContent:t}))}async setMusicGenerationConfig(e){e.musicGenerationConfig||={};let t=da(e);this.conn.send(JSON.stringify(t))}sendPlaybackControl(e){let t={playbackControl:e};this.conn.send(JSON.stringify(t))}play(){this.sendPlaybackControl(Lt.PLAY)}pause(){this.sendPlaybackControl(Lt.PAUSE)}stop(){this.sendPlaybackControl(Lt.STOP)}resetContext(){this.sendPlaybackControl(Lt.RESET_CONTEXT)}close(){this.conn.close()}};function Ec(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}function Dc(e){let t=new Headers;for(let[n,r]of Object.entries(e))t.append(n,r);return t}var Oc="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function kc(e,t,n){let r=new dn,i;i=n.data instanceof Blob?await n.data.text():n.data instanceof ArrayBuffer?new TextDecoder().decode(n.data):n.data;let a=JSON.parse(i);if(e.isVertexAI()){let e=ha(a);Object.assign(r,e)}else Object.assign(r,a);t(r)}var Ac=class{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n,this.music=new wc(this.apiClient,this.auth,this.webSocketFactory)}async connect(e){if(e.config&&e.config.httpOptions)throw Error(`The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.`);let t=this.apiClient.getWebsocketBaseUrl(),n=this.apiClient.getApiVersion(),r,i=this.apiClient.getHeaders();e.config&&e.config.tools&&vc(e.config.tools)&&yc(i);let a=Pc(i);if(this.apiClient.isVertexAI()){let e=this.apiClient.getProject(),i=this.apiClient.getLocation(),o=this.apiClient.getApiKey(),s=!!e&&!!i||!!o;this.apiClient.getCustomBaseUrl()&&!s?r=t:(r=`${t}/ws/google.cloud.aiplatform.${n}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(a,r))}else{let e=this.apiClient.getApiKey(),i=`BidiGenerateContent`,a=`key`;e?.startsWith(`auth_tokens/`)&&(console.warn(`Warning: Ephemeral token support is experimental and may change in future versions.`),n!==`v1alpha`&&console.warn(`Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection.`),i=`BidiGenerateContentConstrained`,a=`access_token`),r=`${t}/ws/google.ai.generativelanguage.${n}.GenerativeService.${i}?${a}=${e}`}let o=()=>{},s=new Promise(e=>{o=e}),c=e.callbacks,l=function(){var e;(e=c?.onopen)==null||e.call(c),o({})},u=this.apiClient,d={onopen:l,onmessage:e=>{kc(u,c.onmessage,e)},onerror:c?.onerror??function(e){},onclose:c?.onclose??function(e){}},f=this.webSocketFactory.create(r,Nc(a),d);f.connect(),await s;let p=I(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&p.startsWith(`publishers/`)){let e=this.apiClient.getProject(),t=this.apiClient.getLocation();e&&t&&(p=`projects/${e}/locations/${t}/`+p)}let m={};this.apiClient.isVertexAI()&&e.config?.responseModalities===void 0&&(e.config===void 0?e.config={responseModalities:[Ze.AUDIO]}:e.config.responseModalities=[Ze.AUDIO]),e.config?.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");let h=e.config?.tools??[],g=[];for(let e of h)if(this.isCallableTool(e)){let t=e;g.push(await t.tool())}else g.push(e);g.length>0&&(e.config.tools=g);let _={model:p,config:e.config,callbacks:e.callbacks};return m=this.apiClient.isVertexAI()?ua(this.apiClient,_):la(this.apiClient,_),delete m.config,f.send(JSON.stringify(m)),new Mc(f,this.apiClient)}isCallableTool(e){return`callTool`in e&&typeof e.callTool==`function`}},jc={turnComplete:!0},Mc=class{constructor(e,t){this.conn=e,this.apiClient=t}tLiveClientContent(e,t){if(t.turns!==null&&t.turns!==void 0){let n=[];try{n=R(t.turns),e.isVertexAI()||(n=n.map(e=>Ia(e)))}catch{throw Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`)}return{clientContent:{turns:n,turnComplete:t.turnComplete}}}return{clientContent:{turnComplete:t.turnComplete}}}tLiveClienttToolResponse(e,t){let n=[];if(t.functionResponses==null||(n=Array.isArray(t.functionResponses)?t.functionResponses:[t.functionResponses],n.length===0))throw Error(`functionResponses is required.`);for(let t of n){if(typeof t!=`object`||!t||!(`name`in t)||!(`response`in t))throw Error(`Could not parse function response, type '${typeof t}'.`);if(!e.isVertexAI()&&!(`id`in t))throw Error(Oc)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},jc),e);let t=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendRealtimeInput(e){let t={};t=this.apiClient.isVertexAI()?{realtimeInput:ma(e)}:{realtimeInput:pa(e)},this.conn.send(JSON.stringify(t))}sendToolResponse(e){if(e.functionResponses==null)throw Error(`Tool response parameters are required.`);let t=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(t))}close(){this.conn.close()}};function Nc(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}function Pc(e){let t=new Headers;for(let[n,r]of Object.entries(e))t.append(n,r);return t}var Fc=10;function Ic(e){if(e?.automaticFunctionCalling?.disable)return!0;let t=!1;for(let n of e?.tools??[])if(Lc(n)){t=!0;break}if(!t)return!0;let n=e?.automaticFunctionCalling?.maximumRemoteCalls;return n&&(n<0||!Number.isInteger(n))||n==0?(console.warn(`Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:`,n),!0):!1}function Lc(e){return`callTool`in e&&typeof e.callTool==`function`}function Rc(e){return(e.config?.tools)?.some(e=>Lc(e))??!1}function zc(e){let t=[];return e?.config?.tools&&e.config.tools.forEach((e,n)=>{if(Lc(e))return;let r=e;r.functionDeclarations&&r.functionDeclarations.length>0&&t.push(n)}),t}function Bc(e){return!e?.automaticFunctionCalling?.ignoreCallHistory}var Vc=class extends M{constructor(e){super(),this.apiClient=e,this.embedContent=async e=>{if(!this.apiClient.isVertexAI())return await this.embedContentInternal(e);if(e.model.includes(`gemini`)&&e.model!==`gemini-embedding-001`||e.model.includes(`maas`)){let t=R(e.contents);if(t.length>1)throw Error(`The embedContent API for this model only supports one content at a time.`);let n=Object.assign(Object.assign({},e),{content:t[0],embeddingApiType:pt.EMBED_CONTENT});return await this.embedContentInternal(n)}else{let t=Object.assign(Object.assign({},e),{embeddingApiType:pt.PREDICT});return await this.embedContentInternal(t)}},this.generateContent=async e=>{let t=await this.processParamsMaybeAddMcpUsage(e);if(this.maybeMoveToResponseJsonSchem(e),!Rc(e)||Ic(e.config))return await this.generateContentInternal(t);let n=zc(e);if(n.length>0){let e=n.map(e=>`tools[${e}]`).join(`, `);throw Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${e}.`)}let r,i,a=R(t.contents),o=t.config?.automaticFunctionCalling?.maximumRemoteCalls??Fc,s=0;for(;s<o&&(r=await this.generateContentInternal(t),!(!r.functionCalls||r.functionCalls.length===0));){let n=r.candidates[0].content,o=[];for(let t of e.config?.tools??[])if(Lc(t)){let e=await t.callTool(r.functionCalls);o.push(...e)}s++,i={role:`user`,parts:o},t.contents=R(t.contents),t.contents.push(n),t.contents.push(i),Bc(t.config)&&(a.push(n),a.push(i))}return Bc(t.config)&&(r.automaticFunctionCallingHistory=a),r},this.generateContentStream=async e=>{if(this.maybeMoveToResponseJsonSchem(e),Ic(e.config)){let t=await this.processParamsMaybeAddMcpUsage(e);return await this.generateContentStreamInternal(t)}let t=zc(e);if(t.length>0){let e=t.map(e=>`tools[${e}]`).join(`, `);throw Error(`Incompatible tools found at ${e}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`)}let n=e?.config?.toolConfig?.functionCallingConfig?.streamFunctionCallArguments,r=e?.config?.automaticFunctionCalling?.disable;if(n&&!r)throw Error(`Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.`);return await this.processAfcStream(e)},this.generateImages=async e=>await this.generateImagesInternal(e).then(e=>{let t,n=[];if(e?.generatedImages)for(let r of e.generatedImages)r&&r?.safetyAttributes&&r?.safetyAttributes?.contentType===`Positive Prompt`?t=r?.safetyAttributes:n.push(r);let r;return r=t?{generatedImages:n,positivePromptSafetyAttributes:t,sdkHttpResponse:e.sdkHttpResponse}:{generatedImages:n,sdkHttpResponse:e.sdkHttpResponse},r}),this.list=async e=>{let t={config:Object.assign(Object.assign({},{queryBase:!0}),e?.config)};if(this.apiClient.isVertexAI()&&!t.config.queryBase){if(t.config?.filter)throw Error(`Filtering tuned models list for Vertex AI is not currently supported`);t.config.filter=`labels.tune-type:*`}return new Gr(V.PAGED_ITEM_MODELS,e=>this.listInternal(e),await this.listInternal(t),t)},this.editImage=async e=>{let t={model:e.model,prompt:e.prompt,referenceImages:[],config:e.config};return e.referenceImages&&e.referenceImages&&(t.referenceImages=e.referenceImages.map(e=>e.toReferenceImageAPI())),await this.editImageInternal(t)},this.upscaleImage=async e=>{let t={numberOfImages:1,mode:`upscale`};e.config&&(t=Object.assign(Object.assign({},t),e.config));let n={model:e.model,image:e.image,upscaleFactor:e.upscaleFactor,config:t};return await this.upscaleImageInternal(n)},this.generateVideos=async e=>{if((e.prompt||e.image||e.video)&&e.source)throw Error(`Source and prompt/image/video are mutually exclusive. Please only use source.`);return this.apiClient.isVertexAI()||(e.video?.uri&&e.video?.videoBytes?e.video={uri:e.video.uri,mimeType:e.video.mimeType}:e.source?.video?.uri&&e.source?.video?.videoBytes&&(e.source.video={uri:e.source.video.uri,mimeType:e.source.video.mimeType})),await this.generateVideosInternal(e)}}maybeMoveToResponseJsonSchem(e){e.config&&e.config.responseSchema&&(e.config.responseJsonSchema||Object.keys(e.config.responseSchema).includes(`$schema`)&&(e.config.responseJsonSchema=e.config.responseSchema,delete e.config.responseSchema))}async processParamsMaybeAddMcpUsage(e){let t=e.config?.tools;if(!t)return e;let n=await Promise.all(t.map(async e=>Lc(e)?await e.tool():e)),r={model:e.model,contents:e.contents,config:Object.assign(Object.assign({},e.config),{tools:n})};if(r.config.tools=n,e.config&&e.config.tools&&vc(e.config.tools)){let t=e.config.httpOptions?.headers??{},n=Object.assign({},t);Object.keys(n).length===0&&(n=this.apiClient.getDefaultHeaders()),yc(n),r.config.httpOptions=Object.assign(Object.assign({},e.config.httpOptions),{headers:n})}return r}async initAfcToolsMap(e){let t=new Map;for(let n of e.config?.tools??[])if(Lc(n)){let e=n,r=await e.tool();for(let n of r.functionDeclarations??[]){if(!n.name)throw Error(`Function declaration name is required.`);if(t.has(n.name))throw Error(`Duplicate tool declaration name: ${n.name}`);t.set(n.name,e)}}return t}async processAfcStream(e){let t=e.config?.automaticFunctionCalling?.maximumRemoteCalls??Fc,n=!1,r=0,i=await this.initAfcToolsMap(e);return(function(e,i,a){return U(this,arguments,function*(){for(var o,s,c,l;r<t;){n&&=(r++,!1);let p=yield H(e.processParamsMaybeAddMcpUsage(a)),m=yield H(e.generateContentStreamInternal(p)),h=[],g=[];try{for(var u=!0,d=(s=void 0,W(m)),f;f=yield H(d.next()),o=f.done,!o;u=!0){l=f.value,u=!1;let e=l;if(yield yield H(e),e.candidates&&e.candidates[0]?.content){g.push(e.candidates[0].content);for(let n of e.candidates[0].content.parts??[])if(r<t&&n.functionCall){if(!n.functionCall.name)throw Error(`Function call name was not returned by the model.`);if(i.has(n.functionCall.name)){let e=yield H(i.get(n.functionCall.name).callTool([n.functionCall]));h.push(...e)}else throw Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${i.keys()}, mising tool: ${n.functionCall.name}`)}}}}catch(e){s={error:e}}finally{try{!u&&!o&&(c=d.return)&&(yield H(c.call(d)))}finally{if(s)throw s.error}}if(h.length>0){n=!0;let e=new zt;e.candidates=[{content:{role:`user`,parts:h}}],yield yield H(e);let t=[];t.push(...g),t.push({role:`user`,parts:h}),a.contents=R(a.contents).concat(t)}else break}})})(this,i,e)}async generateContentInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=po(this.apiClient,e);return n=N(`{model}:generateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ho(e),n=new zt;return Object.assign(n,t),n})}else{let i=fo(this.apiClient,e);return n=N(`{model}:generateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=mo(e),n=new zt;return Object.assign(n,t),n})}}async generateContentStreamInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=po(this.apiClient,e);return n=N(`{model}:streamGenerateContent?alt=sse`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.requestStream({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}),t.then(function(t){return U(this,arguments,function*(){var n,r,i,a;try{for(var o=!0,s=W(t),c;c=yield H(s.next()),n=c.done,!n;o=!0){a=c.value,o=!1;let t=a,n=ho(yield H(t.json()),e);n.sdkHttpResponse={headers:t.headers};let r=new zt;Object.assign(r,n),yield yield H(r)}}catch(e){r={error:e}}finally{try{!o&&!n&&(i=s.return)&&(yield H(i.call(s)))}finally{if(r)throw r.error}}})})}else{let i=fo(this.apiClient,e);return n=N(`{model}:streamGenerateContent?alt=sse`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.requestStream({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}),t.then(function(t){return U(this,arguments,function*(){var n,r,i,a;try{for(var o=!0,s=W(t),c;c=yield H(s.next()),n=c.done,!n;o=!0){a=c.value,o=!1;let t=a,n=mo(yield H(t.json()),e);n.sdkHttpResponse={headers:t.headers};let r=new zt;Object.assign(r,n),yield yield H(r)}}catch(e){r={error:e}}finally{try{!o&&!n&&(i=s.return)&&(yield H(i.call(s)))}finally{if(r)throw r.error}}})})}}async embedContentInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=to(this.apiClient,e,e);return n=N(Jn(e.model)?`{model}:embedContent`:`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(t=>{let n=ro(t,e),r=new Bt;return Object.assign(r,n),r})}else{let i=eo(this.apiClient,e);return n=N(`{model}:batchEmbedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=no(e),n=new Bt;return Object.assign(n,t),n})}}async generateImagesInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=yo(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=xo(e),n=new Vt;return Object.assign(n,t),n})}else{let i=vo(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=bo(e),n=new Vt;return Object.assign(n,t),n})}}async editImageInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Xa(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Za(e),n=new Ht;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async upscaleImageInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ns(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ps(e),n=new Ut;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async recontextImage(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ss(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=cs(e),n=new Wt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async segmentImage(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=_s(this.apiClient,e);return n=N(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=vs(e),n=new Gt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=zo(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>ts(e))}else{let i=Ro(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>es(e))}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Xo(this.apiClient,e);return n=N(`{models_url}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Qo(e),n=new Kt;return Object.assign(n,t),n})}else{let i=Yo(this.apiClient,e);return n=N(`{models_url}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Zo(e),n=new Kt;return Object.assign(n,t),n})}}async update(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=js(this.apiClient,e);return n=N(`{model}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>ts(e))}else{let i=As(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>es(e))}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ka(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ja(e),n=new qt;return Object.assign(n,t),n})}else{let i=Ga(this.apiClient,e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=qa(e),n=new qt;return Object.assign(n,t),n})}}async countTokens(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ha(this.apiClient,e);return n=N(`{model}:countTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Wa(e),n=new Jt;return Object.assign(n,t),n})}else{let i=Va(this.apiClient,e);return n=N(`{model}:countTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ua(e),n=new Jt;return Object.assign(n,t),n})}}async computeTokens(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ma(this.apiClient,e);return n=N(`{model}:computeTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Na(e),n=new Yt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async generateVideosInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Do(this.apiClient,e);return n=N(`{model}:predictLongRunning`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=To(e),n=new Xt;return Object.assign(n,t),n})}else{let i=Eo(this.apiClient,e);return n=N(`{model}:predictLongRunning`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=wo(e),n=new Xt;return Object.assign(n,t),n})}}},Hc=class extends M{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){let t=e.operation,n=e.config;if(t.name===void 0||t.name===``)throw Error(`Operation name is required.`);if(this.apiClient.isVertexAI()){let e=t.name.split(`/operations/`)[0],r;n&&`httpOptions`in n&&(r=n.httpOptions);let i=await this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:e,config:{httpOptions:r}});return t._fromAPIResponse({apiResponse:i,_isVertexAI:!0})}else{let e=await this.getVideosOperationInternal({operationName:t.name,config:n});return t._fromAPIResponse({apiResponse:e,_isVertexAI:!1})}}async get(e){let t=e.operation,n=e.config;if(t.name===void 0||t.name===``)throw Error(`Operation name is required.`);if(this.apiClient.isVertexAI()){let e=t.name.split(`/operations/`)[0],r;n&&`httpOptions`in n&&(r=n.httpOptions);let i=await this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:e,config:{httpOptions:r}});return t._fromAPIResponse({apiResponse:i,_isVertexAI:!0})}else{let e=await this.getVideosOperationInternal({operationName:t.name,config:n});return t._fromAPIResponse({apiResponse:e,_isVertexAI:!1})}}async getVideosOperationInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=be(e);return n=N(`{operationName}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}else{let i=ye(e);return n=N(`{operationName}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}}async fetchPredictVideosOperationInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=fe(e);return n=N(`{resourceName}:fetchPredictOperation`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}else throw Error(`This method is only supported by the Vertex AI.`)}};function Uc(e){let t={};if(F(e,[`languageCodes`])!==void 0)throw Error(`languageCodes parameter is not supported in Gemini API.`);return t}function Wc(e){let t={},n=F(e,[`apiKey`]);if(n!=null&&P(t,[`apiKey`],n),F(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(F(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(F(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(F(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(F(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(F(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Gc(e){let t={},n=F(e,[`data`]);if(n!=null&&P(t,[`data`],n),F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function Kc(e){let t={},n=F(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>tl(e))),P(t,[`parts`],e)}let r=F(e,[`role`]);return r!=null&&P(t,[`role`],r),t}function qc(e,t,n){let r={},i=F(t,[`expireTime`]);n!==void 0&&i!=null&&P(n,[`expireTime`],i);let a=F(t,[`newSessionExpireTime`]);n!==void 0&&a!=null&&P(n,[`newSessionExpireTime`],a);let o=F(t,[`uses`]);n!==void 0&&o!=null&&P(n,[`uses`],o);let s=F(t,[`liveConnectConstraints`]);n!==void 0&&s!=null&&P(n,[`bidiGenerateContentSetup`],el(e,s));let c=F(t,[`lockAdditionalFields`]);return n!==void 0&&c!=null&&P(n,[`fieldMask`],c),r}function Jc(e,t){let n={},r=F(t,[`config`]);return r!=null&&P(n,[`config`],qc(e,r,n)),n}function Yc(e){let t={};if(F(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=F(e,[`fileUri`]);n!=null&&P(t,[`fileUri`],n);let r=F(e,[`mimeType`]);return r!=null&&P(t,[`mimeType`],r),t}function Xc(e){let t={},n=F(e,[`id`]);n!=null&&P(t,[`id`],n);let r=F(e,[`args`]);r!=null&&P(t,[`args`],r);let i=F(e,[`name`]);if(i!=null&&P(t,[`name`],i),F(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(F(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function Zc(e){let t={},n=F(e,[`authConfig`]);n!=null&&P(t,[`authConfig`],Wc(n));let r=F(e,[`enableWidget`]);return r!=null&&P(t,[`enableWidget`],r),t}function Qc(e){let t={},n=F(e,[`searchTypes`]);if(n!=null&&P(t,[`searchTypes`],n),F(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(F(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=F(e,[`timeRangeFilter`]);return r!=null&&P(t,[`timeRangeFilter`],r),t}function $c(e,t){let n={},r=F(e,[`generationConfig`]);t!==void 0&&r!=null&&P(t,[`setup`,`generationConfig`],r);let i=F(e,[`responseModalities`]);t!==void 0&&i!=null&&P(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=F(e,[`temperature`]);t!==void 0&&a!=null&&P(t,[`setup`,`generationConfig`,`temperature`],a);let o=F(e,[`topP`]);t!==void 0&&o!=null&&P(t,[`setup`,`generationConfig`,`topP`],o);let s=F(e,[`topK`]);t!==void 0&&s!=null&&P(t,[`setup`,`generationConfig`,`topK`],s);let c=F(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&P(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=F(e,[`mediaResolution`]);t!==void 0&&l!=null&&P(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=F(e,[`seed`]);t!==void 0&&u!=null&&P(t,[`setup`,`generationConfig`,`seed`],u);let d=F(e,[`speechConfig`]);t!==void 0&&d!=null&&P(t,[`setup`,`generationConfig`,`speechConfig`],kn(d));let f=F(e,[`thinkingConfig`]);t!==void 0&&f!=null&&P(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=F(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&P(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=F(e,[`systemInstruction`]);t!==void 0&&m!=null&&P(t,[`setup`,`systemInstruction`],Kc(L(m)));let h=F(e,[`tools`]);if(t!==void 0&&h!=null){let e=jn(h);Array.isArray(e)&&(e=e.map(e=>rl(An(e)))),P(t,[`setup`,`tools`],e)}let g=F(e,[`sessionResumption`]);t!==void 0&&g!=null&&P(t,[`setup`,`sessionResumption`],nl(g));let _=F(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&P(t,[`setup`,`inputAudioTranscription`],Uc(_));let v=F(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&P(t,[`setup`,`outputAudioTranscription`],Uc(v));let y=F(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&P(t,[`setup`,`realtimeInputConfig`],y);let b=F(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&P(t,[`setup`,`contextWindowCompression`],b);let x=F(e,[`proactivity`]);if(t!==void 0&&x!=null&&P(t,[`setup`,`proactivity`],x),F(e,[`explicitVadSignal`])!==void 0)throw Error(`explicitVadSignal parameter is not supported in Gemini API.`);return n}function el(e,t){let n={},r=F(t,[`model`]);r!=null&&P(n,[`setup`,`model`],I(e,r));let i=F(t,[`config`]);return i!=null&&P(n,[`config`],$c(i,n)),n}function tl(e){let t={},n=F(e,[`mediaResolution`]);n!=null&&P(t,[`mediaResolution`],n);let r=F(e,[`codeExecutionResult`]);r!=null&&P(t,[`codeExecutionResult`],r);let i=F(e,[`executableCode`]);i!=null&&P(t,[`executableCode`],i);let a=F(e,[`fileData`]);a!=null&&P(t,[`fileData`],Yc(a));let o=F(e,[`functionCall`]);o!=null&&P(t,[`functionCall`],Xc(o));let s=F(e,[`functionResponse`]);s!=null&&P(t,[`functionResponse`],s);let c=F(e,[`inlineData`]);c!=null&&P(t,[`inlineData`],Gc(c));let l=F(e,[`text`]);l!=null&&P(t,[`text`],l);let u=F(e,[`thought`]);u!=null&&P(t,[`thought`],u);let d=F(e,[`thoughtSignature`]);d!=null&&P(t,[`thoughtSignature`],d);let f=F(e,[`videoMetadata`]);f!=null&&P(t,[`videoMetadata`],f);let p=F(e,[`toolCall`]);p!=null&&P(t,[`toolCall`],p);let m=F(e,[`toolResponse`]);m!=null&&P(t,[`toolResponse`],m);let h=F(e,[`partMetadata`]);return h!=null&&P(t,[`partMetadata`],h),t}function nl(e){let t={},n=F(e,[`handle`]);if(n!=null&&P(t,[`handle`],n),F(e,[`transparent`])!==void 0)throw Error(`transparent parameter is not supported in Gemini API.`);return t}function rl(e){let t={};if(F(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=F(e,[`computerUse`]);n!=null&&P(t,[`computerUse`],n);let r=F(e,[`fileSearch`]);r!=null&&P(t,[`fileSearch`],r);let i=F(e,[`googleSearch`]);i!=null&&P(t,[`googleSearch`],Qc(i));let a=F(e,[`googleMaps`]);a!=null&&P(t,[`googleMaps`],Zc(a));let o=F(e,[`codeExecution`]);if(o!=null&&P(t,[`codeExecution`],o),F(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=F(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`functionDeclarations`],e)}let c=F(e,[`googleSearchRetrieval`]);if(c!=null&&P(t,[`googleSearchRetrieval`],c),F(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=F(e,[`urlContext`]);l!=null&&P(t,[`urlContext`],l);let u=F(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`mcpServers`],e)}return t}function il(e){let t=[];for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)){let r=e[n];if(typeof r==`object`&&r&&Object.keys(r).length>0){let e=Object.keys(r).map(e=>`${n}.${e}`);t.push(...e)}else t.push(n)}return t.join(`,`)}function al(e,t){let n=null,r=e.bidiGenerateContentSetup;if(typeof r==`object`&&r&&`setup`in r){let t=r.setup;typeof t==`object`&&t?(e.bidiGenerateContentSetup=t,n=t):delete e.bidiGenerateContentSetup}else r!==void 0&&delete e.bidiGenerateContentSetup;let i=e.fieldMask;if(n){let r=il(n);if(Array.isArray(t?.lockAdditionalFields)&&t?.lockAdditionalFields.length===0)r?e.fieldMask=r:delete e.fieldMask;else if(t?.lockAdditionalFields&&t.lockAdditionalFields.length>0&&i!==null&&Array.isArray(i)&&i.length>0){let t=[`temperature`,`topK`,`topP`,`maxOutputTokens`,`responseModalities`,`seed`,`speechConfig`],n=[];i.length>0&&(n=i.map(e=>t.includes(e)?`generationConfig.${e}`:e));let a=[];r&&a.push(r),n.length>0&&a.push(...n),a.length>0?e.fieldMask=a.join(`,`):delete e.fieldMask}else delete e.fieldMask}else i!==null&&Array.isArray(i)&&i.length>0?e.fieldMask=i.join(`,`):delete e.fieldMask;return e}var ol=class extends M{constructor(e){super(),this.apiClient=e}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`The client.tokens.create method is only supported by the Gemini Developer API.`);{let i=Jc(this.apiClient,e);n=N(`auth_tokens`,i._url),r=i._query,delete i.config,delete i._url,delete i._query;let a=al(i,e.config);return t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(a),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}};function sl(e,t){let n={},r=F(e,[`force`]);return t!==void 0&&r!=null&&P(t,[`_query`,`force`],r),n}function cl(e){let t={},n=F(e,[`name`]);n!=null&&P(t,[`_url`,`name`],n);let r=F(e,[`config`]);return r!=null&&sl(r,t),t}function ll(e){let t={},n=F(e,[`name`]);return n!=null&&P(t,[`_url`,`name`],n),t}function ul(e,t){let n={},r=F(e,[`pageSize`]);t!==void 0&&r!=null&&P(t,[`_query`,`pageSize`],r);let i=F(e,[`pageToken`]);return t!==void 0&&i!=null&&P(t,[`_query`,`pageToken`],i),n}function dl(e){let t={},n=F(e,[`parent`]);n!=null&&P(t,[`_url`,`parent`],n);let r=F(e,[`config`]);return r!=null&&ul(r,t),t}function fl(e){let t={},n=F(e,[`sdkHttpResponse`]);n!=null&&P(t,[`sdkHttpResponse`],n);let r=F(e,[`nextPageToken`]);r!=null&&P(t,[`nextPageToken`],r);let i=F(e,[`documents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),P(t,[`documents`],e)}return t}var pl=class extends M{constructor(e){super(),this.apiClient=e,this.list=async e=>new Gr(V.PAGED_ITEM_DOCUMENTS,t=>this.listInternal({parent:e.parent,config:t.config}),await this.listInternal(e),e)}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=ll(e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t=``,n={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let r=cl(e);t=N(`{name}`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=dl(e);return n=N(`{parent}/documents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=fl(e),n=new tn;return Object.assign(n,t),n})}}},ml=class extends M{constructor(e,t=new pl(e)){super(),this.apiClient=e,this.documents=t,this.list=async(e={})=>new Gr(V.PAGED_ITEM_FILE_SEARCH_STORES,e=>this.listInternal(e),await this.listInternal(e),e)}async uploadToFileSearchStore(e){if(this.apiClient.isVertexAI())throw Error(`Vertex AI does not support uploading files to a file search store.`);return this.apiClient.uploadFileToFileSearchStore(e.fileSearchStoreName,e.file,e.config)}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Ws(e);return n=N(`fileSearchStores`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=qs(e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t=``,n={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let r=Ks(e);t=N(`{name}`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=$s(e);return n=N(`fileSearchStores`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=ec(e),n=new nn;return Object.assign(n,t),n})}}async uploadToFileSearchStoreInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=nc(e);return n=N(`upload/v1beta/{file_search_store_name}:uploadToFileSearchStore`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=rc(e),n=new rn;return Object.assign(n,t),n})}}async importFile(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Xs(e);return n=N(`{file_search_store_name}:importFile`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Ys(e),n=new an;return Object.assign(n,t),n})}}},hl=function(){let{crypto:e}=globalThis;if(e?.randomUUID)return hl=e.randomUUID.bind(e),e.randomUUID();let t=new Uint8Array(1),n=e?()=>e.getRandomValues(t)[0]:()=>Math.random()*255&255;return`10000000-1000-4000-8000-100000000000`.replace(/[018]/g,e=>(e^n()&15>>e/4).toString(16))},gl=()=>hl();function _l(e){return typeof e==`object`&&!!e&&(`name`in e&&e.name===`AbortError`||`message`in e&&String(e.message).includes(`FetchRequestCanceledException`))}var vl=e=>{if(e instanceof Error)return e;if(typeof e==`object`&&e){try{if(Object.prototype.toString.call(e)===`[object Error]`){let t=Error(e.message,e.cause?{cause:e.cause}:{});return e.stack&&(t.stack=e.stack),e.cause&&!t.cause&&(t.cause=e.cause),e.name&&(t.name=e.name),t}}catch{}try{return Error(JSON.stringify(e))}catch{}}return Error(e)},K=class extends Error{},q=class e extends K{constructor(t,n,r,i){super(`${e.makeMessage(t,n,r)}`),this.status=t,this.headers=i,this.error=n}static makeMessage(e,t,n){let r=t?.message?typeof t.message==`string`?t.message:JSON.stringify(t.message):t?JSON.stringify(t):n;return e&&r?`${e} ${r}`:e?`${e} status code (no body)`:r||`(no status code or body)`}static generate(t,n,r,i){if(!t||!i)return new bl({message:r,cause:vl(n)});let a=n;return t===400?new Sl(t,a,r,i):t===401?new Cl(t,a,r,i):t===403?new wl(t,a,r,i):t===404?new Tl(t,a,r,i):t===409?new El(t,a,r,i):t===422?new Dl(t,a,r,i):t===429?new Ol(t,a,r,i):t>=500?new kl(t,a,r,i):new e(t,a,r,i)}},yl=class extends q{constructor({message:e}={}){super(void 0,void 0,e||`Request was aborted.`,void 0)}},bl=class extends q{constructor({message:e,cause:t}){super(void 0,void 0,e||`Connection error.`,void 0),t&&(this.cause=t)}},xl=class extends bl{constructor({message:e}={}){super({message:e??`Request timed out.`})}},Sl=class extends q{},Cl=class extends q{},wl=class extends q{},Tl=class extends q{},El=class extends q{},Dl=class extends q{},Ol=class extends q{},kl=class extends q{},Al=/^[a-z][a-z0-9+.-]*:/i,jl=e=>Al.test(e),Ml=e=>(Ml=Array.isArray,Ml(e)),Nl=Ml;function Pl(e){if(!e)return!0;for(let t in e)return!1;return!0}function Fl(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Il=(e,t)=>{if(typeof t!=`number`||!Number.isInteger(t))throw new K(`${e} must be an integer`);if(t<0)throw new K(`${e} must be a positive integer`);return t},Ll=e=>{try{return JSON.parse(e)}catch{return}},Rl=e=>new Promise(t=>setTimeout(t,e));function zl(){if(typeof fetch<`u`)return fetch;throw Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")}function Bl(...e){let t=globalThis.ReadableStream;if(t===void 0)throw Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");return new t(...e)}function Vl(e){let t=Symbol.asyncIterator in e?e[Symbol.asyncIterator]():e[Symbol.iterator]();return Bl({start(){},async pull(e){let{done:n,value:r}=await t.next();n?e.close():e.enqueue(r)},async cancel(){await t.return?.call(t)}})}function Hl(e){if(e[Symbol.asyncIterator])return e;let t=e.getReader();return{async next(){try{let e=await t.read();return e?.done&&t.releaseLock(),e}catch(e){throw t.releaseLock(),e}},async return(){let e=t.cancel();return t.releaseLock(),await e,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}async function Ul(e){var t;if(typeof e!=`object`||!e)return;if(e[Symbol.asyncIterator]){await(t=e[Symbol.asyncIterator]()).return?.call(t);return}let n=e.getReader(),r=n.cancel();n.releaseLock(),await r}var Wl=({headers:e,body:t})=>({bodyHeaders:{"content-type":`application/json`},body:JSON.stringify(t)});function Gl(e){return Object.entries(e).filter(([e,t])=>t!==void 0).map(([e,t])=>{if(typeof t==`string`||typeof t==`number`||typeof t==`boolean`)return`${encodeURIComponent(e)}=${encodeURIComponent(t)}`;if(t===null)return`${encodeURIComponent(e)}=`;throw new K(`Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)}).join(`&`)}var Kl=`0.0.1`,ql=()=>{if(typeof File>`u`){let{process:e}=globalThis,t=typeof e?.versions?.node==`string`&&parseInt(e.versions.node.split(`.`))<20;throw Error("`File` is not defined as a global, which is required for file uploads."+(t?" Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`.":``))}};function Jl(e,t,n){return ql(),new File(e,t??`unknown_file`,n)}function Yl(e){return(typeof e==`object`&&!!e&&(`name`in e&&e.name&&String(e.name)||`url`in e&&e.url&&String(e.url)||`filename`in e&&e.filename&&String(e.filename)||`path`in e&&e.path&&String(e.path))||``).split(/[\\/]/).pop()||void 0}var Xl=e=>typeof e==`object`&&!!e&&typeof e[Symbol.asyncIterator]==`function`,Zl=e=>typeof e==`object`&&!!e&&typeof e.size==`number`&&typeof e.type==`string`&&typeof e.text==`function`&&typeof e.slice==`function`&&typeof e.arrayBuffer==`function`,Ql=e=>typeof e==`object`&&!!e&&typeof e.name==`string`&&typeof e.lastModified==`number`&&Zl(e),$l=e=>typeof e==`object`&&!!e&&typeof e.url==`string`&&typeof e.blob==`function`;async function eu(e,t,n){if(ql(),e=await e,Ql(e))return e instanceof File?e:Jl([await e.arrayBuffer()],e.name);if($l(e)){let r=await e.blob();return t||=new URL(e.url).pathname.split(/[\\/]/).pop(),Jl(await tu(r),t,n)}let r=await tu(e);if(t||=Yl(e),!n?.type){let e=r.find(e=>typeof e==`object`&&`type`in e&&e.type);typeof e==`string`&&(n=Object.assign(Object.assign({},n),{type:e}))}return Jl(r,t,n)}async function tu(e){var t,n,r,i;let a=[];if(typeof e==`string`||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)a.push(e);else if(Zl(e))a.push(e instanceof Blob?e:await e.arrayBuffer());else if(Xl(e))try{for(var o=!0,s=W(e),c;c=await s.next(),t=c.done,!t;o=!0){i=c.value,o=!1;let e=i;a.push(...await tu(e))}}catch(e){n={error:e}}finally{try{!o&&!t&&(r=s.return)&&await r.call(s)}finally{if(n)throw n.error}}else{let t=e?.constructor?.name;throw Error(`Unexpected data type: ${typeof e}${t?`; constructor: ${t}`:``}${nu(e)}`)}return a}function nu(e){return typeof e!=`object`||!e?``:`; props: [${Object.getOwnPropertyNames(e).map(e=>`"${e}"`).join(`, `)}]`}var ru=class{constructor(e){this._client=e}};ru._key=[];function iu(e){return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g,encodeURIComponent)}var au=Object.freeze(Object.create(null)),ou=((e=iu)=>(function(t,...n){if(t.length===1)return t[0];let r=!1,i=[],a=t.reduce((t,a,o)=>{/[?#]/.test(a)&&(r=!0);let s=n[o],c=(r?encodeURIComponent:e)(``+s);return o!==n.length&&(s==null||typeof s==`object`&&s.toString===Object.getPrototypeOf(Object.getPrototypeOf(s.hasOwnProperty??au)??au)?.toString)&&(c=s+``,i.push({start:t.length+a.length,length:c.length,error:`Value of type ${Object.prototype.toString.call(s).slice(8,-1)} is not a valid path parameter`})),t+a+(o===n.length?``:c)},``),o=a.split(/[?#]/,1)[0],s=/(^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,c;for(;(c=s.exec(o))!==null;){let e=c[0].startsWith(`/`),t=e?1:0,n=e?c[0].slice(1):c[0];i.push({start:c.index+t,length:n.length,error:`Value "${n}" can\'t be safely passed as a path parameter`})}if(i.sort((e,t)=>e.start-t.start),i.length>0){let e=0,t=i.reduce((t,n)=>{let r=` `.repeat(n.start-e),i=`^`.repeat(n.length);return e=n.start+n.length,t+r+i},``);throw new K(`Path parameters result in path with invalid segments:\n${i.map(e=>e.error).join(`
`)}\n${a}\n${t}`)}return a}))(iu),su=class extends ru{create(e,t){let{api_version:n=this._client.apiVersion}=e,r=Ai(e,[`api_version`]);if(`model`in r&&`agent_config`in r)throw new K("Invalid request: specified `model` and `agent_config`. If specifying `model`, use `generation_config`.");if(`agent`in r&&`generation_config`in r)throw new K("Invalid request: specified `agent` and `generation_config`. If specifying `agent`, use `agent_config`.");return this._client.post(ou`/${n}/interactions`,Object.assign(Object.assign({body:r},t),{stream:e.stream??!1}))}delete(e,t={},n){let{api_version:r=this._client.apiVersion}=t??{};return this._client.delete(ou`/${r}/interactions/${e}`,n)}cancel(e,t={},n){let{api_version:r=this._client.apiVersion}=t??{};return this._client.post(ou`/${r}/interactions/${e}/cancel`,n)}get(e,t={},n){let r=t??{},{api_version:i=this._client.apiVersion}=r,a=Ai(r,[`api_version`]);return this._client.get(ou`/${i}/interactions/${e}`,Object.assign(Object.assign({query:a},n),{stream:t?.stream??!1}))}};su._key=Object.freeze([`interactions`]);var cu=class extends su{};function lu(e){let t=0;for(let n of e)t+=n.length;let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n}var uu;function du(e){let t;return(uu??=(t=new globalThis.TextEncoder,t.encode.bind(t)))(e)}var fu;function pu(e){let t;return(fu??=(t=new globalThis.TextDecoder,t.decode.bind(t)))(e)}var mu=class{constructor(){this.buffer=new Uint8Array,this.carriageReturnIndex=null,this.searchIndex=0}decode(e){if(e==null)return[];let t=e instanceof ArrayBuffer?new Uint8Array(e):typeof e==`string`?du(e):e;this.buffer=lu([this.buffer,t]);let n=[],r;for(;(r=hu(this.buffer,this.carriageReturnIndex??this.searchIndex))!=null;){if(r.carriage&&this.carriageReturnIndex==null){this.carriageReturnIndex=r.index;continue}if(this.carriageReturnIndex!=null&&(r.index!==this.carriageReturnIndex+1||r.carriage)){n.push(pu(this.buffer.subarray(0,this.carriageReturnIndex-1))),this.buffer=this.buffer.subarray(this.carriageReturnIndex),this.carriageReturnIndex=null,this.searchIndex=0;continue}let e=this.carriageReturnIndex===null?r.preceding:r.preceding-1,t=pu(this.buffer.subarray(0,e));n.push(t),this.buffer=this.buffer.subarray(r.index),this.carriageReturnIndex=null,this.searchIndex=0}return this.searchIndex=Math.max(0,this.buffer.length-1),n}flush(){return this.buffer.length?this.decode(`
`):[]}};mu.NEWLINE_CHARS=new Set([`
`,`\r`]),mu.NEWLINE_REGEXP=/\r\n|[\n\r]/g;function hu(e,t){let n=t??0,r=e.indexOf(10,n),i=e.indexOf(13,n);if(r===-1&&i===-1)return null;let a;return a=r!==-1&&i!==-1?Math.min(r,i):r===-1?i:r,e[a]===10?{preceding:a,index:a+1,carriage:!1}:{preceding:a,index:a+1,carriage:!0}}var gu={off:0,error:200,warn:300,info:400,debug:500},_u=(e,t,n)=>{if(e){if(Fl(gu,e))return e;J(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(gu))}`)}};function vu(){}function yu(e,t,n){return!t||gu[e]>gu[n]?vu:t[e].bind(t)}var bu={error:vu,warn:vu,info:vu,debug:vu},xu=new WeakMap;function J(e){let t=e.logger,n=e.logLevel??`off`;if(!t)return bu;let r=xu.get(t);if(r&&r[0]===n)return r[1];let i={error:yu(`error`,t,n),warn:yu(`warn`,t,n),info:yu(`info`,t,n),debug:yu(`debug`,t,n)};return xu.set(t,[n,i]),i}var Su=e=>(e.options&&(e.options=Object.assign({},e.options),delete e.options.headers),e.headers&&=Object.fromEntries((e.headers instanceof Headers?[...e.headers]:Object.entries(e.headers)).map(([e,t])=>[e,e.toLowerCase()===`x-goog-api-key`||e.toLowerCase()===`authorization`||e.toLowerCase()===`cookie`||e.toLowerCase()===`set-cookie`?`***`:t])),`retryOfRequestLogID`in e&&(e.retryOfRequestLogID&&(e.retryOf=e.retryOfRequestLogID),delete e.retryOfRequestLogID),e),Cu=class e{constructor(e,t,n){this.iterator=e,this.controller=t,this.client=n}static fromSSEResponse(t,n,r){let i=!1,a=r?J(r):console;function o(){return U(this,arguments,function*(){var e,r,o,s;if(i)throw new K("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let c=!1;try{try{for(var l=!0,u=W(wu(t,n)),d;d=yield H(u.next()),e=d.done,!e;l=!0){s=d.value,l=!1;let e=s;if(!c)if(e.data.startsWith(`[DONE]`)){c=!0;continue}else try{yield yield H(JSON.parse(e.data))}catch(t){throw a.error(`Could not parse message into JSON:`,e.data),a.error(`From chunk:`,e.raw),t}}}catch(e){r={error:e}}finally{try{!l&&!e&&(o=u.return)&&(yield H(o.call(u)))}finally{if(r)throw r.error}}c=!0}catch(e){if(_l(e))return yield H(void 0);throw e}finally{c||n.abort()}})}return new e(o,n,r)}static fromReadableStream(t,n,r){let i=!1;function a(){return U(this,arguments,function*(){var e,n,r,i;let a=new mu,o=Hl(t);try{for(var s=!0,c=W(o),l;l=yield H(c.next()),e=l.done,!e;s=!0){i=l.value,s=!1;let e=i;for(let t of a.decode(e))yield yield H(t)}}catch(e){n={error:e}}finally{try{!s&&!e&&(r=c.return)&&(yield H(r.call(c)))}finally{if(n)throw n.error}}for(let e of a.flush())yield yield H(e)})}function o(){return U(this,arguments,function*(){var e,t,r,o;if(i)throw new K("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let s=!1;try{try{for(var c=!0,l=W(a()),u;u=yield H(l.next()),e=u.done,!e;c=!0){o=u.value,c=!1;let e=o;s||e&&(yield yield H(JSON.parse(e)))}}catch(e){t={error:e}}finally{try{!c&&!e&&(r=l.return)&&(yield H(r.call(l)))}finally{if(t)throw t.error}}s=!0}catch(e){if(_l(e))return yield H(void 0);throw e}finally{s||n.abort()}})}return new e(o,n,r)}[Symbol.asyncIterator](){return this.iterator()}tee(){let t=[],n=[],r=this.iterator(),i=e=>({next:()=>{if(e.length===0){let e=r.next();t.push(e),n.push(e)}return e.shift()}});return[new e(()=>i(t),this.controller,this.client),new e(()=>i(n),this.controller,this.client)]}toReadableStream(){let e=this,t;return Bl({async start(){t=e[Symbol.asyncIterator]()},async pull(e){try{let{value:n,done:r}=await t.next();if(r)return e.close();let i=du(JSON.stringify(n)+`
`);e.enqueue(i)}catch(t){e.error(t)}},async cancel(){await t.return?.call(t)}})}};function wu(e,t){return U(this,arguments,function*(){var n,r,i,a;if(!e.body)throw t.abort(),globalThis.navigator!==void 0&&globalThis.navigator.product===`ReactNative`?new K(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`):new K(`Attempted to iterate over a response with no body`);let o=new Eu,s=new mu,c=Hl(e.body);try{for(var l=!0,u=W(Tu(c)),d;d=yield H(u.next()),n=d.done,!n;l=!0){a=d.value,l=!1;let e=a;for(let t of s.decode(e)){let e=o.decode(t);e&&(yield yield H(e))}}}catch(e){r={error:e}}finally{try{!l&&!n&&(i=u.return)&&(yield H(i.call(u)))}finally{if(r)throw r.error}}for(let e of s.flush()){let t=o.decode(e);t&&(yield yield H(t))}})}function Tu(e){return U(this,arguments,function*(){var t,n,r,i;try{for(var a=!0,o=W(e),s;s=yield H(o.next()),t=s.done,!t;a=!0){i=s.value,a=!1;let e=i;e!=null&&(yield yield H(e instanceof ArrayBuffer?new Uint8Array(e):typeof e==`string`?du(e):e))}}catch(e){n={error:e}}finally{try{!a&&!t&&(r=o.return)&&(yield H(r.call(o)))}finally{if(n)throw n.error}}})}var Eu=class{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(e){if(e.endsWith(`\r`)&&(e=e.substring(0,e.length-1)),!e){if(!this.event&&!this.data.length)return null;let e={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],e}if(this.chunks.push(e),e.startsWith(`:`))return null;let[t,n,r]=Du(e,`:`);return r.startsWith(` `)&&(r=r.substring(1)),t===`event`?this.event=r:t===`data`&&this.data.push(r),null}};function Du(e,t){let n=e.indexOf(t);return n===-1?[e,``,``]:[e.substring(0,n),t,e.substring(n+t.length)]}async function Ou(e,t){let{response:n,requestLogID:r,retryOfRequestLogID:i,startTime:a}=t,o=await(async()=>{if(t.options.stream)return J(e).debug(`response`,n.status,n.url,n.headers,n.body),t.options.__streamClass?t.options.__streamClass.fromSSEResponse(n,t.controller,e):Cu.fromSSEResponse(n,t.controller,e);if(n.status===204)return null;if(t.options.__binaryResponse)return n;let r=(n.headers.get(`content-type`)?.split(`;`)[0])?.trim();return r?.includes(`application/json`)||r?.endsWith(`+json`)?n.headers.get(`content-length`)===`0`?void 0:await n.json():await n.text()})();return J(e).debug(`[${r}] response parsed`,Su({retryOfRequestLogID:i,url:n.url,status:n.status,body:o,durationMs:Date.now()-a})),o}var ku=class e extends Promise{constructor(e,t,n=Ou){super(e=>{e(null)}),this.responsePromise=t,this.parseResponse=n,this.client=e}_thenUnwrap(t){return new e(this.client,this.responsePromise,async(e,n)=>t(await this.parseResponse(e,n),n))}asResponse(){return this.responsePromise.then(e=>e.response)}async withResponse(){let[e,t]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:t}}parse(){return this.parsedPromise||=this.responsePromise.then(e=>this.parseResponse(this.client,e)),this.parsedPromise}then(e,t){return this.parse().then(e,t)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}},Au=Symbol(`brand.privateNullableHeaders`);function*ju(e){if(!e)return;if(Au in e){let{values:t,nulls:n}=e;yield*t.entries();for(let e of n)yield[e,null];return}let t=!1,n;e instanceof Headers?n=e.entries():Nl(e)?n=e:(t=!0,n=Object.entries(e??{}));for(let e of n){let n=e[0];if(typeof n!=`string`)throw TypeError(`expected header name to be a string`);let r=Nl(e[1])?e[1]:[e[1]],i=!1;for(let e of r)e!==void 0&&(t&&!i&&(i=!0,yield[n,null]),yield[n,e])}}var Mu=e=>{let t=new Headers,n=new Set;for(let r of e){let e=new Set;for(let[i,a]of ju(r)){let r=i.toLowerCase();e.has(r)||(t.delete(i),e.add(r)),a===null?(t.delete(i),n.add(r)):(t.append(i,a),n.delete(r))}}return{[Au]:!0,values:t,nulls:n}},Nu=e=>{var t;if(globalThis.process!==void 0)return({}?.[e])?.trim()??void 0;if(globalThis.Deno!==void 0)return(((t=globalThis.Deno.env)?.get)?.call(t,e))?.trim()},Pu,Fu=class e{constructor(t){var{baseURL:n=Nu(`GEMINI_NEXT_GEN_API_BASE_URL`),apiKey:r=Nu(`GEMINI_API_KEY`)??null,apiVersion:i=`v1beta`}=t,a=Ai(t,[`baseURL`,`apiKey`,`apiVersion`]);let o=Object.assign(Object.assign({apiKey:r,apiVersion:i},a),{baseURL:n||`https://generativelanguage.googleapis.com`});this.baseURL=o.baseURL,this.timeout=o.timeout??e.DEFAULT_TIMEOUT,this.logger=o.logger??console;let s=`warn`;this.logLevel=s,this.logLevel=_u(o.logLevel,`ClientOptions.logLevel`,this)??_u(Nu(`GEMINI_NEXT_GEN_API_LOG`),`process.env['GEMINI_NEXT_GEN_API_LOG']`,this)??s,this.fetchOptions=o.fetchOptions,this.maxRetries=o.maxRetries??2,this.fetch=o.fetch??zl(),this.encoder=Wl,this._options=o,this.apiKey=r,this.apiVersion=i,this.clientAdapter=o.clientAdapter}withOptions(e){return new this.constructor(Object.assign(Object.assign(Object.assign({},this._options),{baseURL:this.baseURL,maxRetries:this.maxRetries,timeout:this.timeout,logger:this.logger,logLevel:this.logLevel,fetch:this.fetch,fetchOptions:this.fetchOptions,apiKey:this.apiKey,apiVersion:this.apiVersion}),e))}baseURLOverridden(){return this.baseURL!==`https://generativelanguage.googleapis.com`}defaultQuery(){return this._options.defaultQuery}validateHeaders({values:e,nulls:t}){if(!(e.has(`authorization`)||e.has(`x-goog-api-key`))&&!(this.apiKey&&e.get(`x-goog-api-key`))&&!t.has(`x-goog-api-key`))throw Error(`Could not resolve authentication method. Expected the apiKey to be set. Or for the "x-goog-api-key" headers to be explicitly omitted`)}async authHeaders(e){let t=Mu([e.headers]);if(!(t.values.has(`authorization`)||t.values.has(`x-goog-api-key`))){if(this.apiKey)return Mu([{"x-goog-api-key":this.apiKey}]);if(this.clientAdapter.isVertexAI())return Mu([await this.clientAdapter.getAuthHeaders()])}}stringifyQuery(e){return Gl(e)}getUserAgent(){return`${this.constructor.name}/JS ${Kl}`}defaultIdempotencyKey(){return`stainless-node-retry-${gl()}`}makeStatusError(e,t,n,r){return q.generate(e,t,n,r)}buildURL(e,t,n){let r=!this.baseURLOverridden()&&n||this.baseURL,i=jl(e)?new URL(e):new URL(r+(r.endsWith(`/`)&&e.startsWith(`/`)?e.slice(1):e)),a=this.defaultQuery(),o=Object.fromEntries(i.searchParams);return(!Pl(a)||!Pl(o))&&(t=Object.assign(Object.assign(Object.assign({},o),a),t)),typeof t==`object`&&t&&!Array.isArray(t)&&(i.search=this.stringifyQuery(t)),i.toString()}async prepareOptions(e){if(this.clientAdapter&&this.clientAdapter.isVertexAI()&&!e.path.startsWith(`/${this.apiVersion}/projects/`)){let t=e.path.slice(this.apiVersion.length+1);e.path=`/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${t}`}}async prepareRequest(e,{url:t,options:n}){}get(e,t){return this.methodRequest(`get`,e,t)}post(e,t){return this.methodRequest(`post`,e,t)}patch(e,t){return this.methodRequest(`patch`,e,t)}put(e,t){return this.methodRequest(`put`,e,t)}delete(e,t){return this.methodRequest(`delete`,e,t)}methodRequest(e,t,n){return this.request(Promise.resolve(n).then(n=>Object.assign({method:e,path:t},n)))}request(e,t=null){return new ku(this,this.makeRequest(e,t,void 0))}async makeRequest(e,t,n){let r=await e,i=r.maxRetries??this.maxRetries;t??=i,await this.prepareOptions(r);let{req:a,url:o,timeout:s}=await this.buildRequest(r,{retryCount:i-t});await this.prepareRequest(a,{url:o,options:r});let c=`log_`+(Math.random()*(1<<24)|0).toString(16).padStart(6,`0`),l=n===void 0?``:`, retryOf: ${n}`,u=Date.now();if(J(this).debug(`[${c}] sending request`,Su({retryOfRequestLogID:n,method:r.method,url:o,options:r,headers:a.headers})),r.signal?.aborted)throw new yl;let d=new AbortController,f=await this.fetchWithTimeout(o,a,s,d).catch(vl),p=Date.now();if(f instanceof globalThis.Error){let e=`retrying, ${t} attempts remaining`;if(r.signal?.aborted)throw new yl;let i=_l(f)||/timed? ?out/i.test(String(f)+(`cause`in f?String(f.cause):``));if(t)return J(this).info(`[${c}] connection ${i?`timed out`:`failed`} - ${e}`),J(this).debug(`[${c}] connection ${i?`timed out`:`failed`} (${e})`,Su({retryOfRequestLogID:n,url:o,durationMs:p-u,message:f.message})),this.retryRequest(r,t,n??c);throw J(this).info(`[${c}] connection ${i?`timed out`:`failed`} - error; no more retries left`),J(this).debug(`[${c}] connection ${i?`timed out`:`failed`} (error; no more retries left)`,Su({retryOfRequestLogID:n,url:o,durationMs:p-u,message:f.message})),i?new xl:new bl({cause:f})}let m=`[${c}${l}] ${a.method} ${o} ${f.ok?`succeeded`:`failed`} with status ${f.status} in ${p-u}ms`;if(!f.ok){let e=await this.shouldRetry(f);if(t&&e){let e=`retrying, ${t} attempts remaining`;return await Ul(f.body),J(this).info(`${m} - ${e}`),J(this).debug(`[${c}] response error (${e})`,Su({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,durationMs:p-u})),this.retryRequest(r,t,n??c,f.headers)}let i=e?`error; no more retries left`:`error; not retryable`;J(this).info(`${m} - ${i}`);let a=await f.text().catch(e=>vl(e).message),o=Ll(a),s=o?void 0:a;throw J(this).debug(`[${c}] response error (${i})`,Su({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,message:s,durationMs:Date.now()-u})),this.makeStatusError(f.status,o,s,f.headers)}return J(this).info(m),J(this).debug(`[${c}] response start`,Su({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,durationMs:p-u})),{response:f,options:r,controller:d,requestLogID:c,retryOfRequestLogID:n,startTime:u}}async fetchWithTimeout(e,t,n,r){let i=t||{},{signal:a,method:o}=i,s=Ai(i,[`signal`,`method`]),c=this._makeAbort(r);a&&a.addEventListener(`abort`,c,{once:!0});let l=setTimeout(c,n),u=globalThis.ReadableStream&&s.body instanceof globalThis.ReadableStream||typeof s.body==`object`&&s.body!==null&&Symbol.asyncIterator in s.body,d=Object.assign(Object.assign(Object.assign({signal:r.signal},u?{duplex:`half`}:{}),{method:`GET`}),s);o&&(d.method=o.toUpperCase());try{return await this.fetch.call(void 0,e,d)}finally{clearTimeout(l)}}async shouldRetry(e){let t=e.headers.get(`x-should-retry`);return t===`true`?!0:t===`false`?!1:e.status===408||e.status===409||e.status===429||e.status>=500}async retryRequest(e,t,n,r){let i,a=r?.get(`retry-after-ms`);if(a){let e=parseFloat(a);Number.isNaN(e)||(i=e)}let o=r?.get(`retry-after`);if(o&&!i){let e=parseFloat(o);i=Number.isNaN(e)?Date.parse(o)-Date.now():e*1e3}if(i===void 0){let n=e.maxRetries??this.maxRetries;i=this.calculateDefaultRetryTimeoutMillis(t,n)}return await Rl(i),this.makeRequest(e,t-1,n)}calculateDefaultRetryTimeoutMillis(e,t){let n=t-e;return Math.min(.5*2**n,8)*(1-Math.random()*.25)*1e3}async buildRequest(e,{retryCount:t=0}={}){let n=Object.assign({},e),{method:r,path:i,query:a,defaultBaseURL:o}=n,s=this.buildURL(i,a,o);`timeout`in n&&Il(`timeout`,n.timeout),n.timeout=n.timeout??this.timeout;let{bodyHeaders:c,body:l}=this.buildBody({options:n}),u=await this.buildHeaders({options:e,method:r,bodyHeaders:c,retryCount:t});return{req:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({method:r,headers:u},n.signal&&{signal:n.signal}),globalThis.ReadableStream&&l instanceof globalThis.ReadableStream&&{duplex:`half`}),l&&{body:l}),this.fetchOptions??{}),n.fetchOptions??{}),url:s,timeout:n.timeout}}async buildHeaders({options:e,method:t,bodyHeaders:n,retryCount:r}){let i={};this.idempotencyHeader&&t!==`get`&&(e.idempotencyKey||=this.defaultIdempotencyKey(),i[this.idempotencyHeader]=e.idempotencyKey);let a=await this.authHeaders(e),o=Mu([i,{Accept:`application/json`,"User-Agent":this.getUserAgent()},this._options.defaultHeaders,n,e.headers,a]);return this.validateHeaders(o),o.values}_makeAbort(e){return()=>e.abort()}buildBody({options:{body:e,headers:t}}){if(!e)return{bodyHeaders:void 0,body:void 0};let n=Mu([t]);return ArrayBuffer.isView(e)||e instanceof ArrayBuffer||e instanceof DataView||typeof e==`string`&&n.values.has(`content-type`)||globalThis.Blob&&e instanceof globalThis.Blob||e instanceof FormData||e instanceof URLSearchParams||globalThis.ReadableStream&&e instanceof globalThis.ReadableStream?{bodyHeaders:void 0,body:e}:typeof e==`object`&&(Symbol.asyncIterator in e||Symbol.iterator in e&&`next`in e&&typeof e.next==`function`)?{bodyHeaders:void 0,body:Vl(e)}:typeof e==`object`&&n.values.get(`content-type`)===`application/x-www-form-urlencoded`?{bodyHeaders:{"content-type":`application/x-www-form-urlencoded`},body:this.stringifyQuery(e)}:this.encoder({body:e,headers:n})}};Fu.DEFAULT_TIMEOUT=6e4;var Y=class extends Fu{constructor(){super(...arguments),this.interactions=new cu(this)}};Pu=Y,Y.GeminiNextGenAPIClient=Pu,Y.GeminiNextGenAPIClientError=K,Y.APIError=q,Y.APIConnectionError=bl,Y.APIConnectionTimeoutError=xl,Y.APIUserAbortError=yl,Y.NotFoundError=Tl,Y.ConflictError=El,Y.RateLimitError=Ol,Y.BadRequestError=Sl,Y.AuthenticationError=Cl,Y.InternalServerError=kl,Y.PermissionDeniedError=wl,Y.UnprocessableEntityError=Dl,Y.toFile=eu,Y.Interactions=cu;function Iu(e,t){let n={},r=F(e,[`name`]);return r!=null&&P(n,[`_url`,`name`],r),n}function Lu(e,t){let n={},r=F(e,[`name`]);return r!=null&&P(n,[`_url`,`name`],r),n}function Ru(e,t){let n={},r=F(e,[`sdkHttpResponse`]);return r!=null&&P(n,[`sdkHttpResponse`],r),n}function zu(e,t){let n={},r=F(e,[`sdkHttpResponse`]);return r!=null&&P(n,[`sdkHttpResponse`],r),n}function Bu(e,t,n){let r={};if(F(e,[`validationDataset`])!==void 0)throw Error(`validationDataset parameter is not supported in Gemini API.`);let i=F(e,[`tunedModelDisplayName`]);if(t!==void 0&&i!=null&&P(t,[`displayName`],i),F(e,[`description`])!==void 0)throw Error(`description parameter is not supported in Gemini API.`);let a=F(e,[`epochCount`]);t!==void 0&&a!=null&&P(t,[`tuningTask`,`hyperparameters`,`epochCount`],a);let o=F(e,[`learningRateMultiplier`]);if(o!=null&&P(r,[`tuningTask`,`hyperparameters`,`learningRateMultiplier`],o),F(e,[`exportLastCheckpointOnly`])!==void 0)throw Error(`exportLastCheckpointOnly parameter is not supported in Gemini API.`);if(F(e,[`preTunedModelCheckpointId`])!==void 0)throw Error(`preTunedModelCheckpointId parameter is not supported in Gemini API.`);if(F(e,[`adapterSize`])!==void 0)throw Error(`adapterSize parameter is not supported in Gemini API.`);if(F(e,[`tuningMode`])!==void 0)throw Error(`tuningMode parameter is not supported in Gemini API.`);if(F(e,[`customBaseModel`])!==void 0)throw Error(`customBaseModel parameter is not supported in Gemini API.`);let s=F(e,[`batchSize`]);t!==void 0&&s!=null&&P(t,[`tuningTask`,`hyperparameters`,`batchSize`],s);let c=F(e,[`learningRate`]);if(t!==void 0&&c!=null&&P(t,[`tuningTask`,`hyperparameters`,`learningRate`],c),F(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);if(F(e,[`beta`])!==void 0)throw Error(`beta parameter is not supported in Gemini API.`);if(F(e,[`baseTeacherModel`])!==void 0)throw Error(`baseTeacherModel parameter is not supported in Gemini API.`);if(F(e,[`tunedTeacherModelSource`])!==void 0)throw Error(`tunedTeacherModelSource parameter is not supported in Gemini API.`);if(F(e,[`sftLossWeightMultiplier`])!==void 0)throw Error(`sftLossWeightMultiplier parameter is not supported in Gemini API.`);if(F(e,[`outputUri`])!==void 0)throw Error(`outputUri parameter is not supported in Gemini API.`);if(F(e,[`encryptionSpec`])!==void 0)throw Error(`encryptionSpec parameter is not supported in Gemini API.`);return r}function Vu(e,t,n){let r={},i=F(n,[`config`,`method`]);if(i===void 0&&(i=`SUPERVISED_FINE_TUNING`),i===`SUPERVISED_FINE_TUNING`){let n=F(e,[`validationDataset`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`],id(n))}else if(i===`PREFERENCE_TUNING`){let n=F(e,[`validationDataset`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`],id(n))}else if(i===`DISTILLATION`){let n=F(e,[`validationDataset`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`],id(n))}let a=F(e,[`tunedModelDisplayName`]);t!==void 0&&a!=null&&P(t,[`tunedModelDisplayName`],a);let o=F(e,[`description`]);t!==void 0&&o!=null&&P(t,[`description`],o);let s=F(n,[`config`,`method`]);if(s===void 0&&(s=`SUPERVISED_FINE_TUNING`),s===`SUPERVISED_FINE_TUNING`){let n=F(e,[`epochCount`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`hyperParameters`,`epochCount`],n)}else if(s===`PREFERENCE_TUNING`){let n=F(e,[`epochCount`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`hyperParameters`,`epochCount`],n)}else if(s===`DISTILLATION`){let n=F(e,[`epochCount`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`hyperParameters`,`epochCount`],n)}let c=F(n,[`config`,`method`]);if(c===void 0&&(c=`SUPERVISED_FINE_TUNING`),c===`SUPERVISED_FINE_TUNING`){let n=F(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`hyperParameters`,`learningRateMultiplier`],n)}else if(c===`PREFERENCE_TUNING`){let n=F(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`hyperParameters`,`learningRateMultiplier`],n)}else if(c===`DISTILLATION`){let n=F(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`hyperParameters`,`learningRateMultiplier`],n)}let l=F(n,[`config`,`method`]);if(l===void 0&&(l=`SUPERVISED_FINE_TUNING`),l===`SUPERVISED_FINE_TUNING`){let n=F(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`exportLastCheckpointOnly`],n)}else if(l===`PREFERENCE_TUNING`){let n=F(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`exportLastCheckpointOnly`],n)}else if(l===`DISTILLATION`){let n=F(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`exportLastCheckpointOnly`],n)}let u=F(n,[`config`,`method`]);if(u===void 0&&(u=`SUPERVISED_FINE_TUNING`),u===`SUPERVISED_FINE_TUNING`){let n=F(e,[`adapterSize`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`hyperParameters`,`adapterSize`],n)}else if(u===`PREFERENCE_TUNING`){let n=F(e,[`adapterSize`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`hyperParameters`,`adapterSize`],n)}else if(u===`DISTILLATION`){let n=F(e,[`adapterSize`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`hyperParameters`,`adapterSize`],n)}let d=F(n,[`config`,`method`]);if(d===void 0&&(d=`SUPERVISED_FINE_TUNING`),d===`SUPERVISED_FINE_TUNING`){let n=F(e,[`tuningMode`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`tuningMode`],n)}else if(d===`DISTILLATION`){let n=F(e,[`tuningMode`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`tuningMode`],n)}let f=F(e,[`customBaseModel`]);t!==void 0&&f!=null&&P(t,[`customBaseModel`],f);let p=F(n,[`config`,`method`]);if(p===void 0&&(p=`SUPERVISED_FINE_TUNING`),p===`SUPERVISED_FINE_TUNING`){let n=F(e,[`batchSize`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`hyperParameters`,`batchSize`],n)}else if(p===`DISTILLATION`){let n=F(e,[`batchSize`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`hyperParameters`,`batchSize`],n)}let m=F(n,[`config`,`method`]);if(m===void 0&&(m=`SUPERVISED_FINE_TUNING`),m===`SUPERVISED_FINE_TUNING`){let n=F(e,[`learningRate`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`hyperParameters`,`learningRate`],n)}else if(m===`DISTILLATION`){let n=F(e,[`learningRate`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`hyperParameters`,`learningRate`],n)}let h=F(e,[`labels`]);t!==void 0&&h!=null&&P(t,[`labels`],h);let g=F(e,[`beta`]);t!==void 0&&g!=null&&P(t,[`preferenceOptimizationSpec`,`hyperParameters`,`beta`],g);let _=F(e,[`baseTeacherModel`]);t!==void 0&&_!=null&&P(t,[`distillationSpec`,`baseTeacherModel`],_);let v=F(e,[`tunedTeacherModelSource`]);t!==void 0&&v!=null&&P(t,[`distillationSpec`,`tunedTeacherModelSource`],v);let y=F(e,[`sftLossWeightMultiplier`]);t!==void 0&&y!=null&&P(t,[`distillationSpec`,`hyperParameters`,`sftLossWeightMultiplier`],y);let b=F(e,[`outputUri`]);t!==void 0&&b!=null&&P(t,[`outputUri`],b);let x=F(e,[`encryptionSpec`]);return t!==void 0&&x!=null&&P(t,[`encryptionSpec`],x),r}function Hu(e,t){let n={},r=F(e,[`baseModel`]);r!=null&&P(n,[`baseModel`],r);let i=F(e,[`preTunedModel`]);i!=null&&P(n,[`preTunedModel`],i);let a=F(e,[`trainingDataset`]);a!=null&&$u(a);let o=F(e,[`config`]);return o!=null&&Bu(o,n),n}function Uu(e,t){let n={},r=F(e,[`baseModel`]);r!=null&&P(n,[`baseModel`],r);let i=F(e,[`preTunedModel`]);i!=null&&P(n,[`preTunedModel`],i);let a=F(e,[`trainingDataset`]);a!=null&&ed(a,n,t);let o=F(e,[`config`]);return o!=null&&Vu(o,n,t),n}function Wu(e,t){let n={},r=F(e,[`name`]);return r!=null&&P(n,[`_url`,`name`],r),n}function Gu(e,t){let n={},r=F(e,[`name`]);return r!=null&&P(n,[`_url`,`name`],r),n}function Ku(e,t,n){let r={},i=F(e,[`pageSize`]);t!==void 0&&i!=null&&P(t,[`_query`,`pageSize`],i);let a=F(e,[`pageToken`]);t!==void 0&&a!=null&&P(t,[`_query`,`pageToken`],a);let o=F(e,[`filter`]);return t!==void 0&&o!=null&&P(t,[`_query`,`filter`],o),r}function qu(e,t,n){let r={},i=F(e,[`pageSize`]);t!==void 0&&i!=null&&P(t,[`_query`,`pageSize`],i);let a=F(e,[`pageToken`]);t!==void 0&&a!=null&&P(t,[`_query`,`pageToken`],a);let o=F(e,[`filter`]);return t!==void 0&&o!=null&&P(t,[`_query`,`filter`],o),r}function Ju(e,t){let n={},r=F(e,[`config`]);return r!=null&&Ku(r,n),n}function Yu(e,t){let n={},r=F(e,[`config`]);return r!=null&&qu(r,n),n}function Xu(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`nextPageToken`]);i!=null&&P(n,[`nextPageToken`],i);let a=F(e,[`tunedModels`]);if(a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>td(e))),P(n,[`tuningJobs`],e)}return n}function Zu(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`nextPageToken`]);i!=null&&P(n,[`nextPageToken`],i);let a=F(e,[`tuningJobs`]);if(a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>nd(e))),P(n,[`tuningJobs`],e)}return n}function Qu(e,t){let n={},r=F(e,[`name`]);r!=null&&P(n,[`model`],r);let i=F(e,[`name`]);return i!=null&&P(n,[`endpoint`],i),n}function $u(e,t){let n={};if(F(e,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);if(F(e,[`vertexDatasetResource`])!==void 0)throw Error(`vertexDatasetResource parameter is not supported in Gemini API.`);let r=F(e,[`examples`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`examples`,`examples`],e)}return n}function ed(e,t,n){let r={},i=F(n,[`config`,`method`]);if(i===void 0&&(i=`SUPERVISED_FINE_TUNING`),i===`SUPERVISED_FINE_TUNING`){let n=F(e,[`gcsUri`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`trainingDatasetUri`],n)}else if(i===`PREFERENCE_TUNING`){let n=F(e,[`gcsUri`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`trainingDatasetUri`],n)}else if(i===`DISTILLATION`){let n=F(e,[`gcsUri`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`promptDatasetUri`],n)}let a=F(n,[`config`,`method`]);if(a===void 0&&(a=`SUPERVISED_FINE_TUNING`),a===`SUPERVISED_FINE_TUNING`){let n=F(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&P(t,[`supervisedTuningSpec`,`trainingDatasetUri`],n)}else if(a===`PREFERENCE_TUNING`){let n=F(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&P(t,[`preferenceOptimizationSpec`,`trainingDatasetUri`],n)}else if(a===`DISTILLATION`){let n=F(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&P(t,[`distillationSpec`,`promptDatasetUri`],n)}if(F(e,[`examples`])!==void 0)throw Error(`examples parameter is not supported in Vertex AI.`);return r}function td(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`name`]);i!=null&&P(n,[`name`],i);let a=F(e,[`state`]);a!=null&&P(n,[`state`],Nn(a));let o=F(e,[`createTime`]);o!=null&&P(n,[`createTime`],o);let s=F(e,[`tuningTask`,`startTime`]);s!=null&&P(n,[`startTime`],s);let c=F(e,[`tuningTask`,`completeTime`]);c!=null&&P(n,[`endTime`],c);let l=F(e,[`updateTime`]);l!=null&&P(n,[`updateTime`],l);let u=F(e,[`description`]);u!=null&&P(n,[`description`],u);let d=F(e,[`baseModel`]);d!=null&&P(n,[`baseModel`],d);let f=F(e,[`_self`]);return f!=null&&P(n,[`tunedModel`],Qu(f)),n}function nd(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`name`]);i!=null&&P(n,[`name`],i);let a=F(e,[`state`]);a!=null&&P(n,[`state`],Nn(a));let o=F(e,[`createTime`]);o!=null&&P(n,[`createTime`],o);let s=F(e,[`startTime`]);s!=null&&P(n,[`startTime`],s);let c=F(e,[`endTime`]);c!=null&&P(n,[`endTime`],c);let l=F(e,[`updateTime`]);l!=null&&P(n,[`updateTime`],l);let u=F(e,[`error`]);u!=null&&P(n,[`error`],u);let d=F(e,[`description`]);d!=null&&P(n,[`description`],d);let f=F(e,[`baseModel`]);f!=null&&P(n,[`baseModel`],f);let p=F(e,[`tunedModel`]);p!=null&&P(n,[`tunedModel`],p);let m=F(e,[`preTunedModel`]);m!=null&&P(n,[`preTunedModel`],m);let h=F(e,[`supervisedTuningSpec`]);h!=null&&P(n,[`supervisedTuningSpec`],h);let g=F(e,[`preferenceOptimizationSpec`]);g!=null&&P(n,[`preferenceOptimizationSpec`],g);let _=F(e,[`distillationSpec`]);_!=null&&P(n,[`distillationSpec`],_);let v=F(e,[`tuningDataStats`]);v!=null&&P(n,[`tuningDataStats`],v);let y=F(e,[`encryptionSpec`]);y!=null&&P(n,[`encryptionSpec`],y);let b=F(e,[`partnerModelTuningSpec`]);b!=null&&P(n,[`partnerModelTuningSpec`],b);let x=F(e,[`customBaseModel`]);x!=null&&P(n,[`customBaseModel`],x);let S=F(e,[`evaluateDatasetRuns`]);if(S!=null){let e=S;Array.isArray(e)&&(e=e.map(e=>e)),P(n,[`evaluateDatasetRuns`],e)}let C=F(e,[`experiment`]);C!=null&&P(n,[`experiment`],C);let w=F(e,[`fullFineTuningSpec`]);w!=null&&P(n,[`fullFineTuningSpec`],w);let T=F(e,[`labels`]);T!=null&&P(n,[`labels`],T);let E=F(e,[`outputUri`]);E!=null&&P(n,[`outputUri`],E);let D=F(e,[`pipelineJob`]);D!=null&&P(n,[`pipelineJob`],D);let O=F(e,[`serviceAccount`]);O!=null&&P(n,[`serviceAccount`],O);let k=F(e,[`tunedModelDisplayName`]);k!=null&&P(n,[`tunedModelDisplayName`],k);let A=F(e,[`tuningJobState`]);A!=null&&P(n,[`tuningJobState`],A);let j=F(e,[`veoTuningSpec`]);j!=null&&P(n,[`veoTuningSpec`],j);let ee=F(e,[`distillationSamplingSpec`]);ee!=null&&P(n,[`distillationSamplingSpec`],ee);let te=F(e,[`tuningJobMetadata`]);return te!=null&&P(n,[`tuningJobMetadata`],te),n}function rd(e,t){let n={},r=F(e,[`sdkHttpResponse`]);r!=null&&P(n,[`sdkHttpResponse`],r);let i=F(e,[`name`]);i!=null&&P(n,[`name`],i);let a=F(e,[`metadata`]);a!=null&&P(n,[`metadata`],a);let o=F(e,[`done`]);o!=null&&P(n,[`done`],o);let s=F(e,[`error`]);return s!=null&&P(n,[`error`],s),n}function id(e,t){let n={},r=F(e,[`gcsUri`]);r!=null&&P(n,[`validationDatasetUri`],r);let i=F(e,[`vertexDatasetResource`]);return i!=null&&P(n,[`validationDatasetUri`],i),n}var ad=class extends M{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Gr(V.PAGED_ITEM_TUNING_JOBS,e=>this.listInternal(e),await this.listInternal(e),e),this.get=async e=>await this.getInternal(e),this.tune=async e=>{if(this.apiClient.isVertexAI())if(e.baseModel.startsWith(`projects/`)){let t={tunedModelName:e.baseModel};e.config?.preTunedModelCheckpointId&&(t.checkpointId=e.config.preTunedModelCheckpointId);let n=Object.assign(Object.assign({},e),{preTunedModel:t});return n.baseModel=void 0,await this.tuneInternal(n)}else{let t=Object.assign({},e);return await this.tuneInternal(t)}else{let t=Object.assign({},e),n=await this.tuneMldevInternal(t),r=``;return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?r=n.metadata.tunedModel:n.name!==void 0&&n.name.includes(`/operations/`)&&(r=n.name.split(`/operations/`)[0]),{name:r,state:nt.JOB_STATE_QUEUED}}}}async getInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Gu(e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>nd(e))}else{let i=Wu(e);return n=N(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>td(e))}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Yu(e);return n=N(`tuningJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Zu(e),n=new Zt;return Object.assign(n,t),n})}else{let i=Ju(e);return n=N(`tunedModels`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Xu(e),n=new Zt;return Object.assign(n,t),n})}}async cancel(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Lu(e);return n=N(`{name}:cancel`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=zu(e),n=new Qt;return Object.assign(n,t),n})}else{let i=Iu(e);return n=N(`{name}:cancel`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ru(e),n=new Qt;return Object.assign(n,t),n})}}async tuneInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Uu(e,e);return n=N(`tuningJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>nd(e))}else throw Error(`This method is only supported by the Vertex AI.`)}async tuneMldevInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Hu(e);return n=N(`tunedModels`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>rd(e))}}},od=class{async download(e,t){throw Error(`Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.`)}},sd=1024*1024*8,cd=3,ld=1e3,ud=2,dd=`x-goog-upload-status`;async function fd(e,t,n,r){let i=await md(e,t,n,r),a=await i?.json();if(i?.headers?.[dd]!==`final`)throw Error(`Failed to upload file: Upload status is not finalized.`);return a.file}async function pd(e,t,n,r){let i=await md(e,t,n,r),a=await i?.json();if(i?.headers?.[dd]!==`final`)throw Error(`Failed to upload file: Upload status is not finalized.`);let o=Ce(a),s=new pn;return Object.assign(s,o),s}async function md(e,t,n,r){let i=t,a=r?.baseUrl||n.clientOptions.httpOptions?.baseUrl;if(a){let e=new URL(a),n=new URL(t);n.protocol=e.protocol,n.host=e.host,n.port=e.port,i=n.toString()}let o=0,s=0,c=new Rt(new Response),l=`upload`;for(o=e.size;s<o;){let t=Math.min(sd,o-s),a=e.slice(s,s+t);s+t>=o&&(l+=`, finalize`);let u=0,d=ld;for(;u<cd;){let e=Object.assign(Object.assign({},r?.headers||{}),{"X-Goog-Upload-Command":l,"X-Goog-Upload-Offset":String(s),"Content-Length":String(t)});if(c=await n.request({path:``,body:a,httpMethod:`POST`,httpOptions:Object.assign(Object.assign({},r),{apiVersion:``,baseUrl:i,headers:e})}),c?.headers?.[dd])break;u++,await gd(d),d*=ud}if(s+=t,c?.headers?.[dd]!==`active`)break;if(o<=s)throw Error(`All content has been uploaded, but the upload status is not finalized.`)}return c}async function hd(e){return{size:e.size,type:e.type}}function gd(e){return new Promise(t=>setTimeout(t,e))}var _d=class{async upload(e,t,n,r){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await fd(e,t,n,r)}async uploadToFileSearchStore(e,t,n,r){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await pd(e,t,n,r)}async stat(e){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await hd(e)}},vd=class{create(e,t,n){return new yd(e,t,n)}},yd=class{constructor(e,t,n){this.url=e,this.headers=t,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw Error(`WebSocket is not connected`);this.ws.send(e)}close(){if(this.ws===void 0)throw Error(`WebSocket is not connected`);this.ws.close()}},bd=`x-goog-api-key`,xd=class{constructor(e){this.apiKey=e}async addAuthHeaders(e,t){if(e.get(bd)===null){if(this.apiKey.startsWith(`auth_tokens/`))throw Error(`Ephemeral tokens are only supported by the live API.`);if(!this.apiKey)throw Error(`API key is missing. Please provide a valid API key.`);e.append(bd,this.apiKey)}}},Sd=`gl-node/`,Cd=class{get interactions(){if(this._interactions!==void 0)return this._interactions;console.warn(`GoogleGenAI.interactions: Interactions usage is experimental and may change in future versions.`);let e=this.httpOptions;return e?.extraBody&&console.warn(`GoogleGenAI.interactions: Client level httpOptions.extraBody is not supported by the interactions client and will be ignored.`),this._interactions=new Y({baseURL:this.apiClient.getBaseUrl(),apiKey:this.apiKey,apiVersion:this.apiClient.getApiVersion(),clientAdapter:this.apiClient,defaultHeaders:this.apiClient.getDefaultHeaders(),timeout:e?.timeout,maxRetries:e?.retryOptions?.attempts}).interactions,this._interactions}constructor(e){if(e.apiKey==null)throw Error(`An API Key must be set when running in a browser`);if(e.project||e.location)throw Error(`Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.`);this.vertexai=e.vertexai??!1,this.apiKey=e.apiKey;let t=ce(e.httpOptions,e.vertexai,void 0,void 0);t&&(e.httpOptions?e.httpOptions.baseUrl=t:e.httpOptions={baseUrl:t}),this.apiVersion=e.apiVersion,this.httpOptions=e.httpOptions;let n=new xd(this.apiKey);this.apiClient=new pc({auth:n,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:this.httpOptions,userAgentExtra:Sd+`web`,uploader:new _d,downloader:new od}),this.models=new Vc(this.apiClient),this.live=new Ac(this.apiClient,n,new vd),this.batches=new Kr(this.apiClient),this.chats=new Ii(this.models,this.apiClient),this.caches=new ki(this.apiClient),this.files=new Yi(this.apiClient),this.operations=new Hc(this.apiClient),this.authTokens=new ol(this.apiClient),this.tunings=new ad(this.apiClient),this.fileSearchStores=new ml(this.apiClient)}},wd=null,Td=`You are Mon Accord's AI Perfume Advisor — a world-class fragrance expert specializing in scent layering and olfactory profiling.

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
Keep responses concise but rich. Use fragrance terminology naturally.`;function Ed(){return`AIzaSyBDM0uAE2O9Pm3HcbkCN5feQn5ctnBD9f0`}function Dd(){let e=Ed();if(!e)return!1;try{return wd=new Cd({apiKey:e}),!0}catch(e){return console.error(`Failed to initialize Gemini:`,e),!1}}async function Od(e,t=2){if(!wd&&!Dd())return{success:!1,error:`no-api-key`,text:`Please set your Gemini API key in Settings to enable AI features.`};try{let t=(await wd.models.generateContent({model:`gemini-2.5-flash`,contents:e,config:{systemInstruction:Td}})).text;return t?{success:!0,text:t}:(console.error(`Empty response from Gemini`),{success:!1,error:`empty-response`,text:`AI returned an empty response. Please try again.`})}catch(n){let r=n.message||String(n);if(console.error(`AI generation error:`,r),r.includes(`429`)||r.includes(`quota`)||r.includes(`rate`)||r.includes(`RESOURCE_EXHAUSTED`)){let n=r.match(/retry in (\d+)/i)||r.match(/retryDelay.*?(\d+)/),i=n?parseInt(n[1]):30;return t>0?(console.log(`Rate limited. Waiting ${i}s before retry... (${t} retries left)`),await new Promise(e=>setTimeout(e,(i+2)*1e3)),Od(e,t-1)):{success:!1,error:`rate-limit`,text:`Rate limit exceeded. The free tier has per-minute and daily limits. Please wait ${i} seconds and try again, or check your quota at ai.google.dev.`}}return r.includes(`API_KEY`)||r.includes(`API key`)||r.includes(`401`)||r.includes(`403`)?(wd=null,{success:!1,error:`invalid-key`,text:`Invalid API key. Please check your Gemini API key in Settings.`}):r.includes(`fetch`)||r.includes(`network`)||r.includes(`ECONNREFUSED`)?{success:!1,error:`network`,text:`Network error. Please check your internet connection and try again.`}:{success:!1,error:`generation-failed`,text:`AI generation failed: ${r.slice(0,200)}`}}}function kd(){return!!Ed()}async function Ad(e){let t=await Od(jd(e));if(t.success){let n=Md(t.text,e);return u.setProfile(n),u.addInteraction({type:`profile-created`,profile:n.archetype}),{success:!0,profile:n}}return{success:!1,error:t.text}}function jd(e){let t=e.scentFamilies?.join(`, `)||`not specified`,n=(e.knownPerfumes||[]).map(e=>{let t=h.find(t=>t.id===e);return t?`${t.brand} ${t.name} (${t.family})`:e}).join(`, `)||`none selected`,r=e.interestedRegions?.join(`, `)||`all regions`;return`Analyze this user's fragrance preferences and create their olfactory profile.

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
}`}function Md(e,t){try{let n=e.trim();return n.startsWith("```")&&(n=n.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``)),{...JSON.parse(n),createdAt:Date.now(),quizAnswers:t}}catch(e){return console.error(`Failed to parse profile JSON:`,e),Nd(t)}}function Nd(e){let t=e.scentFamilies||[`woody`],n=`woody-earthy`;t.includes(`oriental`)||t.includes(`spicy`)?n=`warm-oriental`:t.includes(`fresh`)||t.includes(`citrus`)?n=`fresh-aquatic`:t.includes(`floral`)?n=`floral-romantic`:t.includes(`gourmand`)&&(n=`gourmand-cozy`);let r=_.find(e=>e.id===n)||_[0];return{archetype:n,archetypeName:r.name,description:r.description,primaryFamilies:t.slice(0,3),sillageProfile:e.sillage>7?`high`:e.sillage>4?`medium`:`low`,notePreferences:{loves:[],explore:[],avoid:[]},recommendedRegions:e.interestedRegions||[`mediterranean`,`eastasia`],signatureBlend:null,createdAt:Date.now(),quizAnswers:e}}async function Pd(e){return await Od(`You are simulating the scent experience of this fragrance combination. Describe what the wearer would smell in three temporal phases.

FORMULA:
${e.map(e=>{let t=p.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} of ${t.name} (Top: ${t.topNotes.join(`, `)}; Mid: ${t.middleNotes.join(`, `)}; Base: ${t.baseNotes.join(`, `)})`:``}).filter(Boolean).join(`
`)}

Respond with a vivid, sensory text description in this format:

OPENING (first 15 minutes): [describe the initial burst]
HEART (30 min - 2 hours): [describe the middle development]
DRY DOWN (2+ hours): [describe the lasting base]
OVERALL CHARACTER: [one-sentence summary of the blend's personality]
SILLAGE & LONGEVITY: [brief assessment]

Be poetic but precise. Help the reader "smell" this blend through words. Keep it under 200 words total.`)}var Fd=Object.fromEntries([`fresh`,`floral`,`woody`,`oriental`,`citrus`,`gourmand`,`green`,`aromatic`,`spicy`,`musky`].map(e=>[e,new URL(Object.assign({"../assets/quiz_scent_families/aromatic.png":C,"../assets/quiz_scent_families/citrus.png":w,"../assets/quiz_scent_families/floral.png":T,"../assets/quiz_scent_families/fresh.png":E,"../assets/quiz_scent_families/gourmand.png":D,"../assets/quiz_scent_families/green.png":O,"../assets/quiz_scent_families/musky.png":k,"../assets/quiz_scent_families/oriental.png":A,"../assets/quiz_scent_families/spicy.png":j,"../assets/quiz_scent_families/woody.png":ee})[`../assets/quiz_scent_families/${e}.png`],import.meta.url).href])),Id={elegant:new URL(`/mon_accord/assets/elegant_classic-DRER5jBh.png`,``+import.meta.url).href,adventurous:new URL(`/mon_accord/assets/adventurous_bold-SjNP7L-r.png`,``+import.meta.url).href,romantic:new URL(`/mon_accord/assets/romantic_dreamy-CLUpTJmt.png`,``+import.meta.url).href,minimalist:new URL(`/mon_accord/assets/minimalist_clean-BrPXV53H.png`,``+import.meta.url).href,creative:new URL(`/mon_accord/assets/creative_expressive-Cd5TtKJD.png`,``+import.meta.url).href,confident:new URL(`/mon_accord/assets/confident_powerful-w73bkLNN.png`,``+import.meta.url).href},Ld=5;function Rd(e,t){let n=u.getProfile();if(n&&!window.__retakeQuiz){qd(e,n,t);return}window.__retakeQuiz=!1;let r=u.getQuizState(),i=r?.step||1,a=r?.answers||{username:``,scentFamilies:[],knownPerfumes:[],sillage:5,longevity:5,intensity:5,personality:``,notes:``};function o(){u.setQuizState({step:i,answers:a}),e.innerHTML=`
      <div class="page__container">
        <div class="quiz-container">
          <div class="quiz-stepper">
            ${Array.from({length:Ld},(e,t)=>{let n=t+1,r=n<i?`completed`:n===i?`active`:``,a=n<i?`done`:``;return`<div class="quiz-stepper__item ${r}"><div class="quiz-stepper__circle">${n<i?`✓`:String(n)}</div></div>${t<Ld-1?`<div class="quiz-stepper__line ${a}"></div>`:``}`}).join(``)}
          </div>
          <div class="quiz-content" id="quiz-step-content">
            ${zd(i,a)}
          </div>
          <div class="quiz-actions">
            ${i>1?`<button class="btn btn--ghost" id="quiz-back">← Back</button>`:`<div></div>`}
            ${i<Ld?`<button class="btn btn--primary" id="quiz-next">Continue →</button>`:`<button class="btn btn--primary" id="quiz-finish">
                  ${kd()?`✦ Generate My Profile`:`✦ Generate Profile`}
                </button>`}
          </div>
        </div>
      </div>
    `,Jd(),Vd(i,a,e);let n=e.querySelector(`#quiz-back`),r=e.querySelector(`#quiz-next`),s=e.querySelector(`#quiz-finish`);n&&n.addEventListener(`click`,()=>{Hd(i,a,e),i--,o()}),r&&r.addEventListener(`click`,()=>{Hd(i,a,e),i++,o()}),s&&s.addEventListener(`click`,async()=>{if(Hd(i,a,e),!kd()){window.showToast(`Please set your Gemini API key in Settings first.`,`error`),window.showSettings();return}s.disabled=!0,s.innerHTML=`<span class="loading-spinner"></span> Generating...`;let n=e.querySelector(`#generation-status`);n||(n=document.createElement(`p`),n.id=`generation-status`,n.style.cssText=`font-size: var(--text-xs); color: var(--text-tertiary); text-align: center; margin-top: var(--space-sm);`,s.parentElement.appendChild(n)),n.textContent=`Analyzing your preferences with AI...`;let r=await Ad(a);r.success?(r.profile.username=a.username||`Anonymous`,u.setProfile(r.profile),u.clearQuizState(),Ud(e,r.profile,t),window.showToast(`Your olfactory profile has been created! ✦`)):(s.disabled=!1,s.innerHTML=`✦ Generate My Profile`,n.textContent=``,window.showToast(r.error||`Failed to generate profile.`,`error`))})}o()}function zd(e,t){switch(e){case 1:return`
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
          ${m.map(e=>`
            <div class="quiz-option quiz-option--img-card ${t.scentFamilies.includes(e.id)?`quiz-option--selected`:``}" data-value="${e.id}" id="family-${e.id}">
              <img class="quiz-option__img" src="${Fd[e.id]}" alt="${e.name}" loading="lazy" decoding="async" />
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
          ${Bd(t.knownPerfumes,``)}
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
              <img class="quiz-option__img" src="${Id[e.id]}" alt="${e.name}" loading="lazy" decoding="async" />
            </div>
          `).join(``)}
        </div>
        <div class="input-group mt-lg">
          <label class="input-label">Any additional notes? (optional)</label>
          <textarea class="input" id="quiz-notes" placeholder="E.g., I love the smell of rain, old books, or fresh coffee...">${t.notes||``}</textarea>
        </div>
      `}}function Bd(e,t){let n=t?h.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.brand.toLowerCase().includes(t.toLowerCase())):h,r={};return n.forEach(e=>{r[e.brand]||(r[e.brand]=[]),r[e.brand].push(e)}),Object.entries(r).map(([t,n])=>`
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
  `).join(``)}function Vd(e,t,n){if(e===2&&n.querySelectorAll(`.quiz-grid--families .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.value;t.scentFamilies.includes(n)?(t.scentFamilies=t.scentFamilies.filter(e=>e!==n),e.classList.remove(`quiz-option--selected`)):(t.scentFamilies.push(n),e.classList.add(`quiz-option--selected`))})}),e===3){let e=n.querySelector(`#perfume-search`),r=n.querySelector(`#perfume-list`),i=e=>{r.innerHTML=Bd(t.knownPerfumes,e),r.querySelectorAll(`.quiz-option--perfume`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.value;t.knownPerfumes.includes(r)?(t.knownPerfumes=t.knownPerfumes.filter(e=>e!==r),e.classList.remove(`quiz-option--selected`)):(t.knownPerfumes.push(r),e.classList.add(`quiz-option--selected`)),n.querySelector(`.quiz-hint`).textContent=`Selected: ${t.knownPerfumes.length} perfume${t.knownPerfumes.length===1?``:`s`}`})})};e.addEventListener(`input`,e=>i(e.target.value)),i(``)}e===4&&[`sillage`,`longevity`,`intensity`].forEach(e=>{let r=n.querySelector(`#slider-${e}`),i=n.querySelector(`#${e}-val`);r&&r.addEventListener(`input`,()=>{t[e]=parseInt(r.value),i.textContent=`${r.value}/10`,r.style.setProperty(`--pct`,`${(parseInt(r.value)-1)/9*100}%`)})}),e===5&&n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>e.classList.remove(`quiz-option--selected`)),e.classList.add(`quiz-option--selected`),t.personality=e.dataset.value})})}function Hd(e,t,n){if(e===1){let e=n.querySelector(`#quiz-username`);e&&(t.username=e.value.trim())}if(e===5){let e=n.querySelector(`#quiz-notes`);e&&(t.notes=e.value)}}function Ud(e,t,n){let r=Gd(t),i=Kd(t);e.innerHTML=`
    <div class="page__container">
      <div class="profile-result">
        <div class="profile-hero">
          <p class="profile-hero__label">Your Olfactory Profile</p>
          <h1 class="profile-hero__title">${t.archetypeName||`Your Scent Identity`}</h1>
        </div>

        <div class="profile-summary-card card mt-xl">
          <p class="profile-summary-card__desc">${t.description||`Your unique olfactory archetype has been defined.`}</p>

          <div class="profile-summary-card__divider"></div>

          <div class="profile-summary-card__meta">
            ${t.notePreferences?`
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Note Preferences</p>
              <div class="profile-summary-card__notes">
                <div><span class="note-label note-label--love">♥ Love</span><span class="note-values">${(t.notePreferences.loves||[]).join(`, `)}</span></div>
                <div><span class="note-label note-label--explore">✦ Explore</span><span class="note-values">${(t.notePreferences.explore||[]).join(`, `)}</span></div>
                <div><span class="note-label note-label--avoid">↓ Avoid</span><span class="note-values">${(t.notePreferences.avoid||[]).join(`, `)}</span></div>
              </div>
            </div>`:``}
            <div class="profile-summary-card__section">
              <p class="profile-summary-card__heading">Scent Families</p>
              <ul class="profile-families-list">
                ${(t.primaryFamilies||[]).map(e=>`<li>${e}</li>`).join(``)}
              </ul>
              <p class="profile-summary-card__sillage">Sillage — ${t.sillageProfile||`Medium`}</p>
            </div>
          </div>
        </div>

        <!-- Region-Only Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Recommended Combinations — Mon Accord</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Sprays and oils from our 6 world regions, curated for your profile.</p>
          <div class="recommendation-grid">
            ${r.map(e=>Wd(e,{showBuyButton:!0})).join(``)}
          </div>
        </div>

        <!-- Mixed Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Extended Combinations — with L'Oréal Luxe</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Combine Mon Accord scents with iconic luxury perfumes.</p>
          <div class="recommendation-grid">
            ${i.map(e=>Wd(e)).join(``)}
          </div>
        </div>

        <div class="profile-actions mt-xl text-center">
          <button class="btn btn--primary btn--lg" id="go-to-shop">Shop Now →</button>
          <button class="btn btn--secondary btn--lg" id="go-to-lab">Enter the Lab</button>
          <button class="btn btn--ghost" id="retake-quiz">Retake Quiz</button>
        </div>
      </div>
    </div>
  `,Jd(),e.querySelector(`#go-to-shop`).addEventListener(`click`,()=>n(`#shop`)),e.querySelectorAll(`[data-buy-combo]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.comboIds.split(`,`).map(e=>e.trim()).filter(Boolean);u.setPendingShopCart(t),n(`#shop`)})}),e.querySelector(`#go-to-lab`).addEventListener(`click`,()=>n(`#lab`)),e.querySelector(`#retake-quiz`).addEventListener(`click`,()=>{window.__retakeQuiz=!0,u.clearQuizState(),Rd(e,n)})}function Wd(e,t={}){let n=(e.productIds||[]).join(`,`);return`
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
  `}function Gd(e){let t=u.getOwnedPerfumes().monAccord||[];function n(e,t){let n=v(e);if(!n)return null;let r=f.find(e=>e.id===n.region);return{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:r}}let r=t.filter(e=>v(e)?.format===`spray`),i=t.filter(e=>v(e)?.format===`oil`),a=(e,t=[])=>p.find(n=>n.format===e&&!t.includes(n.id)),o=r[0]||a(`spray`,[])?.id||`scandinavian-spray`,s=r[1]||a(`spray`,[o])?.id||`mediterranean-spray`,c=r[2]||a(`spray`,[o,s])?.id||`middleeast-spray`,l=i[0]||a(`oil`,[])?.id||`eastasia-oil`,d=i[1]||a(`oil`,[l])?.id||`southafrica-oil`;return[{name:`Morning Clarity`,description:t.length?`Built around your ${v(o)?.name||`collection`} — crisp and bright for daytime.`:`A crisp, bright opening with spray-forward projection, anchored by a subtle oil base.`,layers:[n(o,3),n(s,2),n(l,1)].filter(Boolean)},{name:`Golden Evening`,description:t.length?`Your ${v(c)?.name||`spray`} takes centre stage in this warm evening blend.`:`A warm, opulent blend of spray richness over deep oil.`,layers:[n(c,3),n(d,2),n(s,1)].filter(Boolean)},{name:`Signature Blend`,description:t.length?`A layering of your owned collection that showcases your personal scent identity.`:`A balanced blend drawing from multiple regions.`,layers:[n(o,2),n(c,2),n(l,1)].filter(Boolean)}].map(e=>({...e,productIds:[...new Set(e.layers.map(e=>e.id).filter(Boolean))]}))}function Kd(e){let t=u.getOwnedPerfumes(),n=t.loreal||[],r=t.monAccord||[];function i(e,t){let n=v(e);return n?{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:f.find(e=>e.id===n.region)}:null}function a(e,t){let n=h.find(t=>t.id===e);return n?{name:`${n.brand} ${n.name}`,amount:t,unit:`sprays`,regionData:{icon:`✦`,color:`var(--accent)`}}:null}let o=n.length?n:[`ysl-libre`,`ysl-black-opium`,`armani-my-way`],s=r.length?r:[`scandinavian-spray`,`southafrica-spray`,`mediterranean-spray`,`eastasia-oil`,`southamerica-oil`,`middleeast-oil`],c=(e,t=[])=>p.find(n=>n.format===e&&!t.includes(n.id))?.id,l=o[0]||`ysl-libre`,d=o[1]||`ysl-black-opium`,m=o[2]||`armani-my-way`,g=s.find(e=>v(e)?.format===`spray`)||c(`spray`),_=s.filter(e=>v(e)?.format===`spray`)[1]||c(`spray`,[g]),y=s.find(e=>v(e)?.format===`oil`)||c(`oil`),b=h.find(e=>e.id===l),x=h.find(e=>e.id===d),S=h.find(e=>e.id===m);return[{name:b?`${b.name} Accord`:`Libre Accord`,description:b?`Your ${b.brand} ${b.name} elevated with Mon Accord layering.`:`YSL Libre layered with Scandinavian freshness for a modern twist.`,layers:[a(l,2),i(g,2),i(y,1)].filter(Boolean)},{name:x?`${x.name} Fusion`:`Velvet Opium`,description:x?`${x.brand} ${x.name} deepened with Mon Accord warmth.`:`Black Opium's coffee-vanilla paired with depth and warmth.`,layers:[a(d,2),i(_||g,2),i(y,1)].filter(Boolean)},{name:S?`${S.name} Journey`:`Mediterranean Way`,description:S?`${S.brand} ${S.name} blended with complementary Mon Accord scents.`:`Armani My Way paired with Mediterranean sunshine.`,layers:[a(m,2),i(g,2),i(y,1)].filter(Boolean)}]}function qd(e,t,n){Ud(e,t,n)}function Jd(){if(document.getElementById(`quiz-styles`))return;let e=document.createElement(`style`);e.id=`quiz-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var Yd=[{id:`confident`,name:`Confident`,icon:``,description:`Bold and commanding`},{id:`romantic`,name:`Romantic`,icon:``,description:`Soft and alluring`},{id:`calm`,name:`Calm`,icon:``,description:`Peaceful and centered`},{id:`energetic`,name:`Energetic`,icon:``,description:`Vibrant and lively`},{id:`mysterious`,name:`Mysterious`,icon:``,description:`Enigmatic and deep`},{id:`playful`,name:`Playful`,icon:``,description:`Light and fun`}],Xd=[{id:`office`,name:`Office / Work`,icon:``},{id:`date-night`,name:`Date Night`,icon:``},{id:`casual`,name:`Casual Outing`,icon:``},{id:`formal`,name:`Formal Event`,icon:``},{id:`outdoor`,name:`Outdoor Adventure`,icon:``},{id:`cozy`,name:`Cozy Night In`,icon:``}],Zd=[{id:`spring`,name:`Spring`,icon:``},{id:`summer`,name:`Summer`,icon:``},{id:`autumn`,name:`Autumn`,icon:``},{id:`winter`,name:`Winter`,icon:``}],Qd=[{id:`whisper`,name:`Whisper`,value:1,description:`Barely there, intimate`},{id:`soft`,name:`Soft`,value:3,description:`Close range only`},{id:`moderate`,name:`Moderate`,value:5,description:`Noticeable arm's length`},{id:`present`,name:`Present`,value:7,description:`Fills the room gently`},{id:`bold`,name:`Bold`,value:9,description:`Leaves a trail`}];function $d(){let e=u.getOwnedPerfumes(),t=[];if(e.monAccord?.length){let n=e.monAccord.map(e=>p.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`Mon Accord owned: ${n.join(`, `)}`)}if(e.loreal?.length){let n=e.loreal.map(e=>h.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`L'Oréal Luxe owned: ${n.join(`, `)}`)}return t.length?t.join(`
`):null}async function ef(e){let t=u.getProfile(),n=$d(),r=await Od(`Based on the user's context, recommend a Mon Accord layering formula.

USER PROFILE: ${t?`Archetype: ${t.archetypeName}, Preferred families: ${t.primaryFamilies?.join(`, `)}, Sillage: ${t.sillageProfile}`:`No profile yet — make a versatile recommendation.`}

${n?`USER'S OWNED PERFUMES (prioritize recommendations that use or complement these):
${n}

`:``}CURRENT CONTEXT:
- Mood: ${e.mood||`not specified`}
- Occasion: ${e.occasion||`not specified`}
- Season: ${e.season||`not specified`}
- Time of day: ${e.timeOfDay||`not specified`}
- Desired intensity: ${e.intensity||`moderate`}

Available perfumes (use exact IDs):
${p.map(e=>`- ${e.id}: ${e.name} (${e.scentFamily}, sillage: ${e.sillage}/10)`).join(`
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
}`);if(r.success)try{let t=r.text.trim();t.startsWith("```")&&(t=t.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let n=JSON.parse(t);return u.addInteraction({type:`contextual-recommendation`,context:e,recommendation:n.formulaName}),{success:!0,recommendation:n}}catch(e){return console.error(`Failed to parse recommendation:`,e),{success:!0,recommendation:{formulaName:`AI Recommendation`,layers:[],reasoning:r.text,scentPreview:``,tips:``}}}return{success:!1,error:r.text}}function tf(e,t={}){let{showNameInput:n=!0,onSaved:r}=t,i=u.get(`vault_folders`,[{id:`default`,name:`All Formulas`,icon:``}]),a=`default`,o=!1;function s(){let t=document.getElementById(`save-vault-overlay`);t&&t.remove();let c=document.createElement(`div`);c.className=`modal-overlay`,c.id=`save-vault-overlay`,c.innerHTML=`
      <div class="modal" style="max-width: 480px;">
        <div class="modal__header">
          <h3 class="modal__title">Save to Vault</h3>
          <button class="modal__close" id="sv-close">✕</button>
        </div>
        <div class="modal__body">
          ${n?`
            <div class="input-group sv-group">
              <label class="input-label">Formula Name</label>
              <input type="text" class="input" id="sv-name" placeholder="Give your creation a name..." value="${e.name||``}" />
            </div>
          `:``}

          <div class="input-group sv-group">
            <label class="input-label">Choose Folder</label>
            <div class="sv-folder-select-wrap">
              <select class="input sv-folder-select" id="sv-folder-dropdown">
                ${i.map(e=>`
                  <option value="${e.id}" ${e.id===a?`selected`:``}>
                    ${e.icon||`📁`} ${e.name}
                  </option>
                `).join(``)}
              </select>
              <button class="btn btn--ghost btn--sm sv-new-folder-toggle" id="sv-toggle-new" title="New folder">
                + New
              </button>
            </div>
          </div>

          ${o?`
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
    `,document.body.appendChild(c),nf(),c.querySelector(`#sv-close`).onclick=()=>c.remove(),c.querySelector(`#sv-cancel`).onclick=()=>c.remove(),c.onclick=e=>{e.target===c&&c.remove()},c.querySelector(`#sv-folder-dropdown`).onchange=e=>{a=e.target.value},c.querySelector(`#sv-toggle-new`).onclick=()=>{o=!o,s()};let l=c.querySelector(`#sv-create-folder`);l&&(l.onclick=()=>{let e=c.querySelector(`#sv-new-folder-name`).value.trim();if(!e)return;let t={id:`folder-`+Date.now(),name:e,icon:``};i.push(t),u.set(`vault_folders`,i),a=t.id,o=!1,s(),window.showToast(`Folder "${e}" created!`)});let d=c.querySelector(`#sv-cancel-new`);if(d&&(d.onclick=()=>{o=!1,s()}),c.querySelector(`#sv-confirm`).onclick=()=>{let t=c.querySelector(`#sv-name`),n=(t?t.value.trim():e.name)||`Blend ${Date.now().toString(36).slice(-4)}`,o={...e,id:e.id||`f-`+Date.now(),name:n,folderId:a===`default`?void 0:a,savedAt:Date.now()};u.saveFormula(o),c.remove();let s=i.find(e=>e.id===a)?.name||`Vault`;window.showToast(`"${n}" saved to ${s}!`),r&&r(o)},n){let e=c.querySelector(`#sv-name`);e&&setTimeout(()=>e.focus(),100)}}s()}function nf(){if(document.getElementById(`save-modal-styles`))return;let e=document.createElement(`style`);e.id=`save-modal-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var rf={scandinavian:new URL(`/mon_accord/assets/scandinavian-Ufy3hcXT.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-ZOLilsJx.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DiWwpsLm.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-BMwBLMbR.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-0d3PjZaO.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-D6fedABT.png`,``+import.meta.url).href},af={scandinavian:new URL(`/mon_accord/assets/scandinavian-5ibAHdAH.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-DZK4DeZe.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DwLt2ni5.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-fZMNFcGl.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-PQykoay7.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DEEY7Abs.png`,``+import.meta.url).href},of={scandinavian:new URL(`/mon_accord/assets/scandinavian-T91uXqs1.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-C6p3o17-.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DqiVXp2O.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-zaCtkOEY.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-BEKaFRIH.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Df_0XU0d.png`,``+import.meta.url).href},sf=`lab_session_state`;function cf(e){try{sessionStorage.setItem(sf,JSON.stringify(e))}catch{}}function lf(){try{return JSON.parse(sessionStorage.getItem(sf)||`null`)}catch{return null}}function uf(e,t){let n=lf(),r=n?.layers||[],i=n?.scentSimulation||null,a=!1,o=n?.contextResult||null,s=!1,c=n?.selectedMood||null,l=n?.selectedOccasion||null,u=n?.selectedSeason||null,d=n?.selectedTime||null,m=n?.selectedIntensity||5;function h(){cf({layers:r,scentSimulation:i,contextResult:o,selectedMood:c,selectedOccasion:l,selectedSeason:u,selectedTime:d,selectedIntensity:m})}let g=JSON.parse(sessionStorage.getItem(`labPending`)||`[]`);g.length>0&&(g.forEach(e=>{let t=v(e);t&&!r.find(t=>t.perfumeId===e)&&r.push({perfumeId:e,amount:t.format===`spray`?2:3,unit:t.format===`spray`?`sprays`:`drops`})}),sessionStorage.removeItem(`labPending`),h());function _(){e.innerHTML=`
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
                ${f.map(e=>{let t=p.find(t=>t.region===e.id&&t.format===`spray`),n=p.find(t=>t.region===e.id&&t.format===`oil`),i=t&&r.find(e=>e.perfumeId===t.id),a=n&&r.find(e=>e.perfumeId===n.id);return`
                    <div class="lab-region-group" style="--region-color: ${e.color};">
                      <p class="lab-region-label">${e.name}</p>
                      <div class="lab-bottle-row">
                        ${t?`
                          <button class="lab-bottle-btn ${i?`lab-bottle-btn--added`:``}" data-id="${t.id}" style="--region-color: ${e.color};" title="${e.name} Spray">
                            <img src="${af[e.id]}" alt="${e.name} Spray" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">SPRAY</span>
                            ${i?`<div class="lab-bottle-check">✓</div>`:``}
                          </button>`:``}
                        ${n?`
                          <button class="lab-bottle-btn ${a?`lab-bottle-btn--added`:``}" data-id="${n.id}" style="--region-color: ${e.color};" title="${e.name} Oil">
                            <img src="${of[e.id]}" alt="${e.name} Oil" class="lab-bottle-img" loading="lazy" decoding="async" />
                            <span class="lab-bottle-type">OIL</span>
                            ${a?`<div class="lab-bottle-check">✓</div>`:``}
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
                    ${Yd.map(e=>`<button class="lab-chip ${c===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Occasion</label>
                  <div class="lab-advisor__chips" id="occasion-chips">
                    ${Xd.map(e=>`<button class="lab-chip ${l===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Season</label>
                  <div class="lab-advisor__chips" id="season-chips">
                    ${Zd.map(e=>`<button class="lab-chip ${u===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                  </div>
                </div>

                <div class="input-group">
                  <label class="input-label">Time of Day</label>
                  <div class="lab-advisor__chips" id="time-chips">
                    ${[`Morning`,`Afternoon`,`Evening`,`Night`].map(e=>`<button class="lab-chip ${d===e.toLowerCase()?`lab-chip--active`:``}" data-value="${e.toLowerCase()}">${e}</button>`).join(``)}
                  </div>
                </div>

                <div class="slider-container">
                  <div class="slider-header">
                    <span class="slider-label">Intensity</span>
                    <span class="slider-value" id="advisor-intensity-val">${(Qd.find(e=>e.value===m)||{}).name||`Moderate`}</span>
                  </div>
                  <input type="range" min="1" max="9" value="${m}" step="2" id="advisor-intensity" />
                </div>

                <button class="btn btn--primary w-full" id="btn-get-advice" ${s?`disabled`:``}>
                  ${s?`<span class="loading-spinner"></span> Crafting...`:`✦ Get Recommendation`}
                </button>
              </div>

              ${o?`
                <div class="lab-advisor__result mt-lg" id="advisor-result">
                  <div class="ai-response">
                    <div class="ai-response__label">✦ ${o.formulaName||`Your Formula`}</div>
                    <div class="ai-response__text ai-response__text--compact">
                      ${o.reasoning?`<p>${df(o.reasoning,150)}</p>`:``}
                      ${o.scentPreview?`<p><em>${df(o.scentPreview,100)}</em></p>`:``}
                      ${o.tips?`<p style="color: var(--accent); font-size: var(--text-xs);">◈ ${df(o.tips,100)}</p>`:``}
                    </div>
                  </div>
                  ${o.layers?.length>0?`
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
              ${r.length===0?`
                <div class="lab-empty">
                  <p class="lab-empty__symbol">◈</p>
                  <p class="lab-empty__text">Your canvas is empty</p>
                  <p class="lab-empty__hint">Select fragrances to begin composing your accord.</p>
                </div>
              `:r.map((e,t)=>{let n=v(e.perfumeId),r=f.find(e=>e.id===n.region);return`
                  <div class="lab-layer" data-idx="${t}" style="--region-color: ${r.color};">
                    <div class="lab-layer__bg" style="background-image: url('${rf[r.id]}')"></div>
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

            ${r.length>0?`
              <div class="lab-actions" id="lab-actions">
                <button class="btn btn--primary" id="btn-simulate">
                  ${a?`<span class="loading-spinner"></span> Simulating...`:`✦ Simulate Scent`}
                </button>
                <button class="btn btn--secondary" id="btn-save-formula">Save to Vault</button>
                <button class="btn btn--ghost" id="btn-clear-layers">Clear All</button>
              </div>
            `:``}

            ${i?`
              <div class="ai-response mt-lg" id="simulation-result">
                <div class="ai-response__label">✦ Scent Portrait</div>
                <div class="ai-response__text">
                  ${ff(i)}
                </div>
              </div>
            `:``}
          </div>

        </div>
      </div>
    `,pf(),y()}function y(){e.querySelectorAll(`.lab-bottle-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id,n=r.findIndex(e=>e.perfumeId===t);if(n>=0)r.splice(n,1);else{let e=v(t);r.push({perfumeId:t,amount:e.format===`spray`?2:3,unit:e.format===`spray`?`sprays`:`drops`})}i=null,h(),_()})}),e.querySelectorAll(`.lab-layer__remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),r.splice(parseInt(e.dataset.idx),1),i=null,h(),_()})}),e.querySelectorAll(`.lab-layer__amount-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.idx);e.dataset.action===`increase`?r[n].amount=Math.min(r[n].amount+1,10):r[n].amount=Math.max(r[n].amount-1,1),h(),_()})});let t=e.querySelector(`#btn-simulate`);t&&t.addEventListener(`click`,async()=>{if(!kd()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}a=!0,_();let e=await Pd(r);a=!1,e.success?(i=e.text,h()):window.showToast(e.text||`Simulation failed.`,`error`),_()});let n=e.querySelector(`#btn-save-formula`);n&&n.addEventListener(`click`,()=>{b(r,i)});let f=e.querySelector(`#btn-clear-layers`);f&&f.addEventListener(`click`,()=>{r=[],i=null,h(),_()}),[`mood`,`occasion`,`season`,`time`].forEach(t=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(n=>{n.addEventListener(`click`,()=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(e=>e.classList.remove(`lab-chip--active`)),n.classList.add(`lab-chip--active`);let r=n.dataset.value;t===`mood`?c=r:t===`occasion`?l=r:t===`season`?u=r:t===`time`&&(d=r),h()})})});let p=e.querySelector(`#advisor-intensity`);p&&p.addEventListener(`input`,()=>{m=parseInt(p.value);let t=Qd.find(e=>e.value===m);e.querySelector(`#advisor-intensity-val`).textContent=t?.name||`Moderate`,h()});let g=e.querySelector(`#btn-get-advice`);g&&g.addEventListener(`click`,async()=>{if(!kd()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}let t=e.querySelector(`#mood-chips .lab-chip--active`)?.dataset.value,n=e.querySelector(`#occasion-chips .lab-chip--active`)?.dataset.value,r=e.querySelector(`#season-chips .lab-chip--active`)?.dataset.value,i=e.querySelector(`#time-chips .lab-chip--active`)?.dataset.value,a=Qd.find(t=>t.value===parseInt(e.querySelector(`#advisor-intensity`)?.value||5))?.name||`moderate`;s=!0,_();let c=await ef({mood:t,occasion:n,season:r,timeOfDay:i,intensity:a});s=!1,c.success?(o=c.recommendation,h()):window.showToast(c.error||`Advice failed.`,`error`),_()});let y=e.querySelector(`#btn-apply-recommendation`);y&&y.addEventListener(`click`,()=>{o?.layers&&(r=o.layers.map(e=>({perfumeId:e.perfumeId,amount:e.amount,unit:e.unit||(e.perfumeId.includes(`oil`)?`drops`:`sprays`)})).filter(e=>v(e.perfumeId)),i=null,h(),_(),window.showToast(`Formula applied! Try simulating the scent.`))})}function b(e,t){let n=e.map(e=>{let t=v(e.perfumeId);return{...e,name:t?.name||e.perfumeId}});tf({id:`f-`+Date.now(),layers:n,simulation:t,createdAt:Date.now()},{showNameInput:!0})}_()}function df(e,t=150){return!e||e.length<=t?e:e.substring(0,t).replace(/\s+\S*$/,``)+`…`}function ff(e){return e?e.split(`
`).filter(e=>e.trim()).map(e=>{if(e.match(/^(OPENING|HEART|DRY DOWN|OVERALL|SILLAGE)/i)){let[t,...n]=e.split(`:`);return`<p><strong style="color: var(--accent);">${t.trim()}:</strong> ${n.join(`:`).trim()}</p>`}return`<p>${e}</p>`}).join(``):``}function pf(){if(document.getElementById(`lab-styles`))return;let e=document.createElement(`style`);e.id=`lab-styles`,e.textContent=`
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
      scrollbar-width: none;
      -ms-overflow-style: none;
      display: flex;
      flex-direction: column;
    }
    .lab-canvas::-webkit-scrollbar { display: none; }

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

    @media (max-width: 1024px) {
      .lab-layout { grid-template-columns: 1fr; }
      .lab-canvas { position: static; }
    }
  `,document.head.appendChild(e)}var mf=`/mon_accord/assets/folder-BRsxHk1w.png`,hf={scandinavian:new URL(`/mon_accord/assets/scandinavian-5ibAHdAH.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-DZK4DeZe.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DwLt2ni5.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-fZMNFcGl.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-PQykoay7.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DEEY7Abs.png`,``+import.meta.url).href},gf={scandinavian:new URL(`/mon_accord/assets/scandinavian-T91uXqs1.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-C6p3o17-.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DqiVXp2O.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-zaCtkOEY.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-BEKaFRIH.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Df_0XU0d.png`,``+import.meta.url).href},_f={"mugler-angel":new URL(`/mon_accord/assets/angel-D_kA6fPK.png`,``+import.meta.url).href,"ysl-black-opium":new URL(`/mon_accord/assets/black_opium-DMAdw-Xv.png`,``+import.meta.url).href,"lancome-la-vie-est-belle":new URL(`/mon_accord/assets/la_vie_est_belle-Cgv61fN4.png`,``+import.meta.url).href},vf=[`mugler-angel`,`ysl-black-opium`,`lancome-la-vie-est-belle`],yf=[{id:`evening`,name:`Evening Wear`},{id:`daytime`,name:`Daytime`},{id:`office`,name:`Office`},{id:`weekend`,name:`Weekend`},{id:`seasonal`,name:`Seasonal`}];function bf(e,t){let n=u.getOwnedPerfumes(),r=vf.filter(e=>!n.loreal.includes(e));r.length&&(n.loreal=[...n.loreal,...r],u.setOwnedPerfumes(n));let i=u.get(`vault_folders`,null),a;if(!i)a=yf.map(e=>({...e})),u.set(`vault_folders`,a);else{let e=i.filter(e=>e.id!==`default`),t=new Set(e.map(e=>e.id)),n=yf.filter(e=>!t.has(e.id));a=[...e,...n].map(e=>({id:e.id,name:e.name})),u.set(`vault_folders`,a)}let o=null,s=!1,c=null,l=null;function d(){u.set(`vault_folders`,a)}function m(e){return u.getVault().filter(t=>t.folderId===e)}function g(){let t=u.getVault();e.innerHTML=`
      <div class="page__container">
        ${o?b(o,t):_(t)}
      </div>
      ${x()}
    `,xf(),S(t)}function _(e){return`
      <div class="vault-main-layout">
        <div class="vault-folders-col">
          <div class="vault-folders-header">
            <h3 style="font-size: var(--text-lg);">Folders</h3>
            <button class="btn btn--secondary btn--sm" id="btn-create-folder">+ New Folder</button>
          </div>

          ${s?`
            <div class="vault-create-folder mb-lg">
              <input type="text" class="input" id="new-folder-name" placeholder="Folder name..." style="max-width: 260px;" />
              <button class="btn btn--primary btn--sm" id="btn-save-folder">Create</button>
              <button class="btn btn--ghost btn--sm" id="btn-cancel-folder">Cancel</button>
            </div>
          `:``}

          <div class="vault-folders-grid">
            ${a.map(e=>{let t=m(e.id).length;return`
                <div class="vault-folder-card card card--interactive" data-folder="${e.id}">
                  <img src="${mf}" class="vault-folder-icon" alt="folder" loading="lazy" decoding="async" />
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
    `}function y(){let e=u.getOwnedPerfumes();function t(e){return e.length?`<div class="vault-bottle-grid">
        ${e.map(e=>{let t=v(e),n=t?f.find(e=>e.id===t.region):null,r=t?.format===`spray`?hf[t.region]:gf[t.region],i=t?.name||e;return`
            <div class="vault-bottle-card" style="--region-color:${n?.color||`var(--accent)`};">
              <button class="vault-bottle-remove" data-remove="${e}" data-type="monAccord">✕</button>
              <img src="${r}" alt="${i}" class="vault-bottle-img" loading="lazy" decoding="async" />
              <span class="vault-bottle-name">${i}</span>
            </div>`}).join(``)}
      </div>`:`<p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-sm);">None added yet.</p>`}function n(e){return e.length?`<div class="vault-bottle-grid">
        ${e.map(e=>{let t=h.find(t=>t.id===e),n=_f[e],r=t?t.name:e,i=t?.brand||``;return`
            <div class="vault-bottle-card vault-bottle-card--loreal">
              <button class="vault-bottle-remove" data-remove="${e}" data-type="loreal">✕</button>
              ${n?`<img src="${n}" alt="${r}" class="vault-bottle-img" loading="lazy" decoding="async" />`:`<div class="vault-bottle-placeholder">${i.charAt(0)}</div>`}
              <span class="vault-bottle-name">${r}</span>
              <span class="vault-bottle-brand">${i}</span>
            </div>`}).join(``)}
      </div>`:`<p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-sm);">None added yet.</p>`}return`
      <div class="vault-myperfumes-col">
        <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-xs);">My Perfumes</h3>
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-lg);">Your collection guides all AI recommendations across the app.</p>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">Mon Accord</p>
          ${t(e.monAccord)}
          <button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="monAccord" style="margin-top:var(--space-xs);">+ Add</button>
        </div>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">L'Oréal Luxe</p>
          ${n(e.loreal)}
          <button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="loreal" style="margin-top:var(--space-xs);">+ Add</button>
        </div>
      </div>
    `}function b(e,t){let n=m(e.id);return`
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
                  ${n.map(e=>{let t=v(e.perfumeId),n=t?f.find(e=>e.id===t.region):null;return`<span class="vault-formula-layer" style="color: ${n?.color||`var(--text-secondary)`};">${n?.icon||`•`} ${e.amount} ${e.unit} ${t?.name||e.perfumeId}</span>`}).join(` + `)}
                </div>
                <div class="vault-formula-actions">
                  <button class="btn btn--ghost btn--sm vault-load-btn" data-id="${t.id}">Load to Lab</button>
                  ${e.id===`default`?`
                    <select class="select vault-move-select" data-id="${t.id}" style="font-size: var(--text-xs); padding: 4px 30px 4px 8px;">
                      <option value="">Move to...</option>
                      ${a.filter(e=>e.id!==`default`).map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
                    </select>
                  `:``}
                  <button class="btn btn--ghost btn--sm vault-delete-btn" data-id="${t.id}" style="color: var(--text-tertiary);">✕</button>
                </div>
              </div>
            `}).join(``)}
        </div>
      `}
    `}function x(){if(!c)return``;let e=u.getOwnedPerfumes();if(c===`monAccord`)return`
        <div class="modal-overlay" id="vault-owned-modal-overlay">
          <div class="modal vault-owned-modal">
            <div class="modal__header">
              <h3 class="modal__title">Add Mon Accord Perfume</h3>
              <button class="modal__close" id="vault-close-owned-modal">✕</button>
            </div>
            <div class="modal__body">
              <div class="vault-modal-bottle-grid">
                ${f.map(t=>{let n=p.find(e=>e.region===t.id&&e.format===`spray`),r=p.find(e=>e.region===t.id&&e.format===`oil`),i=n&&e.monAccord.includes(n.id),a=r&&e.monAccord.includes(r.id);return`
                    <div class="vault-modal-region" style="--region-color:${t.color};">
                      <p class="vault-modal-region-label">${t.name}</p>
                      <div class="vault-modal-bottle-row">
                        ${n?`
                          <button class="vault-modal-bottle-btn vault-owned-add-btn ${i?`vault-modal-bottle-btn--owned`:``}"
                            data-type="monAccord" data-id="${n.id}"
                            ${i?`disabled`:``}>
                            <img src="${hf[t.id]}" alt="Spray" class="vault-modal-bottle-img" loading="lazy" decoding="async" />
                            <span class="vault-modal-bottle-type">SPRAY</span>
                            ${i?`<div class="vault-modal-bottle-check">✓</div>`:``}
                          </button>`:``}
                        ${r?`
                          <button class="vault-modal-bottle-btn vault-owned-add-btn ${a?`vault-modal-bottle-btn--owned`:``}"
                            data-type="monAccord" data-id="${r.id}"
                            ${a?`disabled`:``}>
                            <img src="${gf[t.id]}" alt="Oil" class="vault-modal-bottle-img" loading="lazy" decoding="async" />
                            <span class="vault-modal-bottle-type">OIL</span>
                            ${a?`<div class="vault-modal-bottle-check">✓</div>`:``}
                          </button>`:``}
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            </div>
          </div>
        </div>
      `;let t=h.filter(t=>!e.loreal.includes(t.id)),n=[...new Set(t.map(e=>e.brand))].sort((e,t)=>e.localeCompare(t)),r=l?t.filter(e=>e.brand===l):[];return`
      <div class="modal-overlay" id="vault-owned-modal-overlay">
        <div class="modal vault-owned-modal">
          <div class="modal__header">
            <h3 class="modal__title">Add L'Oréal Luxe Perfume</h3>
            <button class="modal__close" id="vault-close-owned-modal">✕</button>
          </div>
          <div class="modal__body">
            ${l?`
              <div class="flex" style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
                <p class="vault-owned-modal-subtitle" style="margin:0;">${l}</p>
                <button class="btn btn--ghost btn--sm" id="vault-back-to-brands">← Brands</button>
              </div>
              <div class="vault-loreal-list">
                ${r.length?r.map(e=>`
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
                ${n.map(e=>`<button class="btn btn--secondary vault-brand-btn" data-brand="${e}">${e}</button>`).join(``)}
              </div>
            `}
          </div>
        </div>
      </div>
    `}function S(n){e.querySelectorAll(`.vault-folder-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.vault-folder-delete`))return;let n=e.dataset.folder;o=a.find(e=>e.id===n),g()})}),e.querySelectorAll(`.vault-folder-delete`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.delete,r=u.getVault();r.forEach(e=>{e.folderId===n&&(e.folderId=void 0)}),u.set(`vault`,r),a=a.filter(e=>e.id!==n),d(),g()})});let r=e.querySelector(`#btn-create-folder`);r&&r.addEventListener(`click`,()=>{s=!0,g()});let i=e.querySelector(`#btn-save-folder`);i&&i.addEventListener(`click`,()=>{let t=e.querySelector(`#new-folder-name`).value.trim();t&&(a.push({id:`folder-`+Date.now(),name:t}),d(),s=!1,g())});let f=e.querySelector(`#btn-cancel-folder`);f&&f.addEventListener(`click`,()=>{s=!1,g()});let p=e.querySelector(`#btn-back-folders`);p&&p.addEventListener(`click`,()=>{o=null,g()});let m=e.querySelector(`#go-to-lab`);m&&m.addEventListener(`click`,()=>t(`#lab`)),e.querySelectorAll(`.vault-load-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let r=n.find(t=>t.id===e.dataset.id);if(r?.layers){let e=r.layers.map(e=>e.perfumeId).filter(Boolean);sessionStorage.setItem(`labPending`,JSON.stringify(e)),t(`#lab`)}})}),e.querySelectorAll(`.vault-delete-btn`).forEach(e=>{e.addEventListener(`click`,()=>{u.removeFormula(e.dataset.id),g(),window.showToast(`Formula removed from vault.`)})}),e.querySelectorAll(`.vault-move-select`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.value;if(!t)return;let n=u.getVault(),r=n.find(t=>t.id===e.dataset.id);r&&(r.folderId=t,u.set(`vault`,n),g(),window.showToast(`Formula moved to folder.`))})}),e.querySelectorAll(`.vault-add-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{c=e.dataset.section,l=null,g()})}),e.querySelectorAll(`.vault-cancel-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{c=null,l=null,g()})}),e.querySelectorAll(`.vault-owned-add-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=u.getOwnedPerfumes(),n=e.dataset.type,r=e.dataset.id;t[n].includes(r)||(t[n]=[...t[n],r],u.setOwnedPerfumes(t),window.showToast(`Added to your collection.`)),n===`monAccord`&&(c=null),g()})}),e.querySelectorAll(`.vault-brand-btn`).forEach(e=>{e.addEventListener(`click`,()=>{l=e.dataset.brand,g()})});let h=e.querySelector(`#vault-back-to-brands`);h&&h.addEventListener(`click`,()=>{l=null,g()});let _=e.querySelector(`#vault-close-owned-modal`);_&&_.addEventListener(`click`,()=>{c=null,l=null,g()});let v=e.querySelector(`#vault-owned-modal-overlay`);v&&v.addEventListener(`click`,e=>{e.target.id===`vault-owned-modal-overlay`&&(c=null,l=null,g())}),e.querySelectorAll(`.vault-myperfume-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let{remove:t,type:n}=e.dataset,r=u.getOwnedPerfumes();r[n]=r[n].filter(e=>e!==t),u.setOwnedPerfumes(r),g()})})}g()}function xf(){if(document.getElementById(`vault-styles`))return;let e=document.createElement(`style`);e.id=`vault-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}function Sf(){let e=u.getInteractions(),t=u.getVault(),n=u.getLikes(),r=u.getProfile();if(e.length===0&&t.length===0)return null;let i={},a={spray:0,oil:0},o=[];t.forEach(e=>{(e.layers||[]).forEach(e=>{let t=p.find(t=>t.id===e.perfumeId);t&&(i[t.region]=(i[t.region]||0)+1,a[t.format]++,o.push({...e,region:t.region,format:t.format,family:t.scentFamily}))})});let s=Object.entries(i).sort(([,e],[,t])=>t-e).map(([e,t])=>({region:e,count:t,data:f.find(t=>t.id===e)})),c=Date.now()-720*60*60*1e3,l=e.filter(e=>e.timestamp>c);e.filter(e=>e.timestamp<=c),t.length;let d=n.length,m=t.filter(e=>e.savedAt>c).length;return{topRegions:s,formatPreference:a.spray>a.oil?`spray-dominant`:a.oil>a.spray?`oil-dominant`:`balanced`,totalFormulas:t.length,totalLikes:d,recentActivity:l.length,engagementLevel:l.length>10?`high`:l.length>3?`medium`:`low`,profile:r,recentSaves:m}}function Cf(){let e=u.getOwnedPerfumes(),t=[];if(e.monAccord?.length){let n=e.monAccord.map(e=>p.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`Mon Accord owned: ${n.join(`, `)}`)}if(e.loreal?.length){let n=e.loreal.map(e=>h.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`L'Oréal Luxe owned: ${n.join(`, `)}`)}return t.length?t.join(`
`):`No owned perfumes registered.`}async function wf(){let e=Sf(),t=u.getVault(),n=u.getProfile();if(!t.length&&!n)return{success:!1,error:`No usage data yet. Create some formulas first!`};let r=t.slice(0,3).map(e=>{let t=(e.layers||[]).map(e=>{let t=p.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} ${t.name}`:``}).filter(Boolean).join(` + `);return`"${e.name}": ${t}`}).join(`
`),i=await Od(`Based on this user's fragrance journey, suggest a fresh remix.

USER PROFILE: ${n?`${n.archetypeName} (${n.primaryFamilies?.join(`, `)})`:`No formal profile`}

USER'S OWNED PERFUMES (these are their starting point — prioritize combinations using these):
${Cf()}

FAVORITE FORMULAS:
${r||`None saved yet`}

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
}`);if(i.success)try{let e=i.text.trim();e.startsWith("```")&&(e=e.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let t=JSON.parse(e);return u.addInteraction({type:`remix-generated`,name:t.remixName}),{success:!0,remix:t}}catch{return{success:!0,remix:{remixName:`AI Remix`,layers:[],inspiration:i.text,newElement:``,scentDescription:``}}}return{success:!1,error:i.text}}function Tf(){let e=u.getInteractions().filter(e=>e.type===`like`&&e.timestamp>Date.now()-720*60*60*1e3),t={};return e.forEach(e=>{t[e.formulaId]=(t[e.formulaId]||0)+1}),g.sort((e,n)=>n.likes+(t[n.id]||0)*10-(e.likes+(t[e.id]||0)*10)).slice(0,10)}var Ef=`/mon_accord/assets/duyguozaslan-Je_2yn9O.png`,Df=[{id:`sp-1`,author:`ScentExplorer`,date:Date.now()-864e5*3,title:`My go-to date night combo`,topicType:`trending`,topicRef:`cf-4`,content:`Velvet Rose is absolutely stunning for evenings out. The oud-citrus balance is perfect — not too heavy, not too light. My partner always compliments this one!`,likes:18,comments:[{id:`sc-1`,author:`RoseAddict`,date:Date.now()-864e5*2,text:`Totally agree! I add an extra drop of the oil for more longevity.`,replies:[{id:`sc-1r1`,author:`ScentExplorer`,date:Date.now()-864e5,text:`Great tip, I'll try that next time!`},{id:`sc-1r2`,author:`VelvetQueen`,date:Date.now()-864e5*.5,text:`The oil trick really does work — I noticed at least 2 extra hours of longevity with it.`,replies:[]}]},{id:`sc-2`,author:`NordicNose`,date:Date.now()-864e5,text:`Have you tried mixing it with a Scandinavian spray? The contrast is amazing.`,replies:[{id:`sc-2r1`,author:`ScentExplorer`,date:Date.now()-864e5*.8,text:`Not yet but that sounds like an interesting idea! Warm + cool could be really unique.`,replies:[]},{id:`sc-2r2`,author:`LayeringPro`,date:Date.now()-864e5*.3,text:`I do this combo regularly. The birch from Scandinavia really grounds the rose beautifully.`,replies:[]}]}]},{id:`sp-2`,author:`MinimalistMusk`,date:Date.now()-864e5*5,title:`Best office-safe layering?`,topicType:`free`,topicLabel:`Office Fragrances`,content:`Looking for recommendations on subtle combinations that work in a professional setting. I love the Zen Garden combo but wondering if there are other options that project softly.`,likes:12,comments:[{id:`sc-3`,author:`CorporateChic`,date:Date.now()-864e5*4,text:`Azure Morning is my daily driver for work. Very clean and inoffensive.`,replies:[{id:`sc-3r1`,author:`MinimalistMusk`,date:Date.now()-864e5*3,text:`Oh that sounds perfect, adding it to my cart!`},{id:`sc-3r2`,author:`FreshFan`,date:Date.now()-864e5*2,text:`Second this. Mediterranean spray + Scandinavian oil is chef's kiss for office.`}]},{id:`sc-3b`,author:`QuietScenter`,date:Date.now()-864e5*3,text:`I go with just 2 sprays of East Asia spray. The green tea and bamboo are super subtle but elegant.`,replies:[{id:`sc-3b1`,author:`MinimalistMusk`,date:Date.now()-864e5*2,text:`That's actually brilliant — single region, minimal projection. Love it.`}]}]},{id:`sp-3`,author:`OudLover`,date:Date.now()-864e5*1,title:`Custom evening blend I created`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],content:`I've been experimenting with this bold combo for a while. The saffron-oud meets vanilla-coffee and it's absolutely divine for cold winter nights. Who else loves intense combos?`,likes:24,comments:[{id:`sc-4`,author:`AmberAddict`,date:Date.now()-864e5*.8,text:`This is EXACTLY what I've been looking for! The warmth from both regions must be incredible together.`,replies:[{id:`sc-4r1`,author:`OudLover`,date:Date.now()-864e5*.5,text:`It really is — the saffron opens bright and then the rooibos-vanilla base just wraps around you.`}]},{id:`sc-5`,author:`NightOwlScents`,date:Date.now()-864e5*.6,text:`Have you tried adding a single drop of Scandinavian oil to cool it down slightly? Adds an interesting twist.`,replies:[]}]},{id:`sp-4`,author:`FloralFusion`,date:Date.now()-864e5*2,title:`Spring cherry blossom layering`,topicType:`combination`,topicCombination:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],content:`Cherry blossom from East Asia with neroli and fig from Mediterranean oil creates this gorgeous springtime aura. Light, feminine, and so uplifting. Perfect for daytime!`,likes:31,comments:[{id:`sc-6`,author:`GardenBreeze`,date:Date.now()-864e5*1.5,text:`This sounds absolutely heavenly! Trying this tomorrow morning.`,replies:[{id:`sc-6r1`,author:`FloralFusion`,date:Date.now()-864e5*1,text:`Let me know how you like it! The fig really brings out the floral notes.`},{id:`sc-6r2`,author:`GardenBreeze`,date:Date.now()-864e5*.4,text:`Update: I LOVE it. Got three compliments at brunch today. This is my new signature.`}]},{id:`sc-7`,author:`PerfumeNovice`,date:Date.now()-864e5*1.2,text:`Would this work well in warm weather? I'm worried about the oil being too heavy in summer.`,replies:[{id:`sc-7r1`,author:`FloralFusion`,date:Date.now()-864e5*.8,text:`It's actually quite light! The Mediterranean oil is more fresh than heavy. Give it a try.`}]}]},{id:`sp-5`,author:`SeasonalSniffer`,date:Date.now()-864e5*4,title:`Summer vs winter layering strategies`,topicType:`free`,topicLabel:`Seasonal Tips`,content:`I've noticed that in summer I prefer spray-only combos (2 regions, light application), while in winter I go heavy on oils with maybe one spray on top. Does anyone else change their approach with seasons?`,likes:19,comments:[{id:`sc-8`,author:`AllSeasonScenter`,date:Date.now()-864e5*3.5,text:`Absolutely! Summer is all about Mediterranean + East Asia for me. Winter I switch to Middle East + South Africa.`,replies:[{id:`sc-8r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*3,text:`That's almost exactly my rotation! Great minds think alike.`},{id:`sc-8r2`,author:`NordicNose`,date:Date.now()-864e5*2.5,text:`Don't sleep on Scandinavian in summer though — the birch and juniper are so refreshing.`}]},{id:`sc-9`,author:`TropicalVibes`,date:Date.now()-864e5*3,text:`Living in a tropical climate I use light sprays year-round. Oils are too intense in 35°C heat!`,replies:[]},{id:`sc-10`,author:`FourSeasons`,date:Date.now()-864e5*2,text:`I keep a separate shelf for each season. Spring: florals. Summer: citrus. Fall: woody. Winter: spicy-sweet.`,replies:[{id:`sc-10r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*1.5,text:`That level of organization is goals! Do you have a favorite fall combo?`},{id:`sc-10r2`,author:`FourSeasons`,date:Date.now()-864e5*1,text:`Scandinavian spray + Middle East oil. The cedar-oud combination is *chef's kiss* for autumn walks.`}]}]},{id:`sp-6`,author:`GiftGuru`,date:Date.now()-864e5*6,title:`Gifting layering sets — any tips?`,topicType:`trending`,topicRef:`cf-2`,content:`I want to gift a friend a layering combo but I'm not sure how to present it. Anyone wrapped up Mon Accord sets as gifts before? Which combos are crowd-pleasers?`,likes:15,comments:[{id:`sc-11`,author:`ThoughtfulGifter`,date:Date.now()-864e5*5,text:`Mediterranean + East Asia is always a safe bet. Almost everyone loves the freshness.`,replies:[{id:`sc-11r1`,author:`GiftGuru`,date:Date.now()-864e5*4.5,text:`That's what I was leaning towards! Simple and universally appealing.`}]},{id:`sc-12`,author:`WrapQueen`,date:Date.now()-864e5*5,text:`I put the spray + oil in a nice pouch with a card explaining the layering technique. People love it!`,replies:[]}]},{id:`sp-7`,author:`VanillaCloud`,date:Date.now()-864e5*1.5,title:`Gourmand lovers unite — best sweet combos?`,topicType:`trending`,topicRef:`cf-5`,content:`I'm obsessed with Cocoa Cloud but looking for more sweet, cozy combinations. Who else here loves gourmand-leaning layering? Drop your favourites!`,likes:22,comments:[{id:`sc-13`,author:`SweetTooth`,date:Date.now()-864e5*1.2,text:`Cocoa Cloud is my absolute favourite! I also add 1 drop of Middle East oil on top for a rich amber-vanilla twist.`,replies:[{id:`sc-13r1`,author:`VanillaCloud`,date:Date.now()-864e5*1,text:`Oh that sounds amazing, the oud would add so much depth!`},{id:`sc-13r2`,author:`GourmandQueen`,date:Date.now()-864e5*.8,text:`Can confirm this works beautifully. The saffron note from Middle East pairs perfectly with the cocoa.`,replies:[]}]},{id:`sc-14`,author:`CozyNights`,date:Date.now()-864e5*1,text:`Try South America spray + South Africa oil + a single East Asia oil drop. Tonka-vanilla-cherry blossom is heavenly.`,replies:[{id:`sc-14r1`,author:`VanillaCloud`,date:Date.now()-864e5*.5,text:`Three layers! That's ambitious. Adding it to my list to try this weekend.`}]}]},{id:`sp-8`,author:`NoseTrainer`,date:Date.now()-864e5*3.5,title:`How I trained my nose for layering`,topicType:`free`,topicLabel:`Tips & Guides`,content:`When I started layering I couldn't tell the difference between combos. Here's what helped: start with just ONE spray and ONE oil. Wear it for a full day. Next day, swap one layer. After 2 weeks you'll notice nuances you never imagined!`,likes:34,comments:[{id:`sc-15`,author:`BeginnerSniffer`,date:Date.now()-864e5*3,text:`This is exactly what I needed! I've been overwhelmed trying 3-layer combos from the start.`,replies:[{id:`sc-15r1`,author:`NoseTrainer`,date:Date.now()-864e5*2.8,text:`Start simple! Mediterranean spray + Scandinavian oil is a great first combo. Very distinct notes.`},{id:`sc-15r2`,author:`ScentExplorer`,date:Date.now()-864e5*2.5,text:`Agreed. I started the same way and now I can pick apart 4-layer combos no problem.`}]},{id:`sc-16`,author:`OlfactoryJourney`,date:Date.now()-864e5*2.5,text:`Another tip: smell coffee beans between testing different combos. It resets your nose.`,replies:[]},{id:`sc-17`,author:`FragranceNerd`,date:Date.now()-864e5*2,text:`I keep a scent journal — I write down what I smell at 0min, 1hr, 4hr, and 8hr. Game changer for understanding how layers evolve.`,replies:[{id:`sc-17r1`,author:`NoseTrainer`,date:Date.now()-864e5*1.5,text:`The journal idea is brilliant! I should start doing that too.`}]}]},{id:`sp-9`,author:`MidnightRose`,date:Date.now()-864e5*.5,title:`Amber Veil is the new obsession`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],content:`Just tried this three-layer combo and I'm speechless. The Arabian amber opens rich and warm, the South American tonka adds this gorgeous sweetness, and that single drop of Scandinavian oil on top gives it a cool, clean edge. Pure sophistication!`,likes:28,comments:[{id:`sc-18`,author:`LayeringPro`,date:Date.now()-864e5*.4,text:`Three regions in one combo? Bold move. How's the longevity?`,replies:[{id:`sc-18r1`,author:`MidnightRose`,date:Date.now()-864e5*.3,text:`Easily 8+ hours. The oil base really anchors everything.`},{id:`sc-18r2`,author:`OudLover`,date:Date.now()-864e5*.2,text:`Middle East oil as a base is always a longevity cheat code. Great choice.`}]},{id:`sc-19`,author:`NordicNose`,date:Date.now()-864e5*.3,text:`Love the Scandinavian finishing touch. That birch-juniper coolness must cut through the sweetness perfectly.`,replies:[]}]},{id:`sp-10`,author:`WorkdayScenter`,date:Date.now()-864e5*7,title:`My week of different combos — review`,topicType:`free`,topicLabel:`Reviews`,content:`I wore a different trending combo each workday last week: Mon — Azure Morning, Tue — Zen Garden, Wed — Golden Hour, Thu — Forest Ceremony, Fri — Velvet Rose. Here's my ranking: Velvet Rose > Azure Morning > Zen Garden > Golden Hour > Forest Ceremony. Friday combo got 4 compliments!`,likes:21,comments:[{id:`sc-20`,author:`CorporateChic`,date:Date.now()-864e5*6.5,text:`Velvet Rose for WORK? That's brave! I usually save that for evenings.`,replies:[{id:`sc-20r1`,author:`WorkdayScenter`,date:Date.now()-864e5*6,text:`I went light — just 1 spray + 1 drop instead of the full recommended amount. Keeps it office-appropriate.`},{id:`sc-20r2`,author:`MinimalistMusk`,date:Date.now()-864e5*5.5,text:`Smart approach! Half-dosing heavier combos is underrated.`}]},{id:`sc-21`,author:`AllSeasonScenter`,date:Date.now()-864e5*6,text:`Azure Morning on Monday is perfect — fresh and energizing to start the week. I do the same!`,replies:[{id:`sc-21r1`,author:`WorkdayScenter`,date:Date.now()-864e5*5,text:`Right?! It's like a morning espresso in fragrance form.`}]}]}];function Of(){let e=u.getPosts();if(!e.length)e=Df,u.setPosts(e);else{let t=new Set(e.map(e=>e.id)),n=Df.filter(e=>!t.has(e.id));n.length&&(e=[...e,...n],u.setPosts(e))}return e}function kf(e,t){let n=Tf(),r=u.getProfile(),i=`likes`,a=`newest`,o=null,s=!1,c=null,l=`community_daily_suggestion`,d=new Date().toISOString().slice(0,10),m=null;try{m=JSON.parse(sessionStorage.getItem(l)||`null`)}catch{}let _=m?.date===d?m.remix:null,y=!_;function b(e){if(!r)return Math.floor(Math.random()*40)+30;let t=50,n=r.primaryFamilies||[];return(e.layers||[]).forEach(e=>{let i=v(e.perfumeId);i&&(i.scentFamily.split(`-`).forEach(e=>{n.includes(e)&&(t+=12)}),r.recommendedRegions?.includes(i.region)&&(t+=8))}),Math.min(t,98)}let x=n.map(e=>({...e,matchPercent:b(e)}));function S(){let e=[...x];return i===`likes`?e.sort((e,t)=>(t.likes||0)-(e.likes||0)):i===`match`?e.sort((e,t)=>t.matchPercent-e.matchPercent):i===`newest`&&e.sort((e,t)=>t.id>e.id?1:-1),e}function C(e){let t=[...e];return a===`newest`?t.sort((e,t)=>t.date-e.date):a===`likes`?t.sort((e,t)=>(t.likes||0)-(e.likes||0)):a===`comments`&&t.sort((e,t)=>j(t)-j(e)),t}function w(){let t=S(),n=Of(),r=o?n.find(e=>e.id===o):null;e.innerHTML=`
      <div class="page__container">
        <!-- ═══ TRENDING SECTION ═══ -->
        <div class="community-top-grid">
          <div class="community-panel">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Trending Combinations</h3>
              <div class="community-sort">
                <span class="community-sort-label">⇅ Sort by</span>
                <button class="community-sort-btn ${i===`likes`?`community-sort-btn--active`:``}" data-sort="likes">Popular</button>
                <button class="community-sort-btn ${i===`match`?`community-sort-btn--active`:``}" data-sort="match">For You</button>
                <button class="community-sort-btn ${i===`newest`?`community-sort-btn--active`:``}" data-sort="newest">New</button>
              </div>
            </div>
            <div class="community-trending-list">
              ${t.slice(0,5).map((e,t)=>{let n=u.isLiked(e.id),r=(e.likes||0)+(n?1:0);return`
                <div class="community-trending-item" data-id="${e.id}">
                  <div class="community-trending-rank">${t+1}</div>
                  <div class="community-trending-content">
                    <div class="community-trending-top">
                      <h4 class="community-trending-name">${e.name}</h4>
                    </div>
                    <div class="community-trending-layers">
                      ${(e.layers||[]).map(e=>{let t=v(e.perfumeId);return`<span style="color: ${(t?f.find(e=>e.id===t.region):null)?.color||`var(--text-tertiary)`};">${t?.name||``}</span>`}).join(` <span style="color: var(--text-tertiary);">+</span> `)}
                    </div>
                  </div>
                  <div class="community-trending-meta">
                    <span class="community-trending-match" style="color: ${e.matchPercent>70?`#4CAF50`:e.matchPercent>50?`var(--accent)`:`var(--text-tertiary)`};">${e.matchPercent}% match</span>
                    <button class="community-like-btn ${n?`community-like-btn--active`:``}" data-like-formula="${e.id}">
                      ${n?`♥`:`♡`} ${r}
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
              ${Af(_,y)}
            </div>
          </div>
        </div>

        <!-- ═══ CHOICE ROW ═══ -->
        <div class="community-choice-row">
          <div class="community-choice-card">
            <div class="community-choice-card__photo-wrap">
              <img src="${Ef}" alt="Duygu Özaslan" class="community-choice-card__photo" loading="lazy" decoding="async" />
            </div>
            <p class="community-choice-card__name">Duygu Özaslan</p>
            <p class="community-choice-card__role">Influencer</p>
            <p class="community-choice-card__quote">"Cherry blossom and fig together feel like a spring garden by the sea — feminine, luminous, and unforgettable."</p>
            <div class="community-choice-card__combo">
              <div class="community-choice-card__layer">
                <span style="color:${f.find(e=>e.id===`eastasia`)?.color};">East Asia — Spray</span>
                <span class="community-choice-card__amount">2 sprays</span>
              </div>
              <div class="community-choice-card__layer">
                <span style="color:${f.find(e=>e.id===`mediterranean`)?.color};">Mediterranean — Oil</span>
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
                <button class="community-sort-btn ${a===`newest`?`community-sort-btn--active`:``}" data-post-sort="newest">Newest</button>
                <button class="community-sort-btn ${a===`likes`?`community-sort-btn--active`:``}" data-post-sort="likes">Most Liked</button>
                <button class="community-sort-btn ${a===`comments`?`community-sort-btn--active`:``}" data-post-sort="comments">Most Discussed</button>
              </div>
              <button class="btn btn--primary" id="btn-new-post">+ New Post</button>
            </div>
          </div>

          ${s?T(t):``}

          <div class="community-discussion-layout">
            <!-- Post List (left) -->
            <div class="community-post-list">
              ${n.length===0?`<p style="color:var(--text-tertiary);font-size:var(--text-sm);padding:var(--space-lg);">No posts yet. Be the first to share!</p>`:C(n).map(e=>`
                  <div class="community-post-item ${o===e.id?`community-post-item--active`:``}" data-post-id="${e.id}">
                    <div class="community-post-item__top">
                      <span class="community-post-item__date">${ee(e.date)}</span>
                    </div>
                    <h4 class="community-post-item__title">${e.title}</h4>
                    <div class="community-post-item__bottom">
                      <span class="community-post-item__topic">${k(e)}</span>
                      <span class="community-post-item__stats">${e.likes||0} · ${j(e)} comments</span>
                    </div>
                  </div>
                `).join(``)}
            </div>

            <!-- Post Detail (right) -->
            <div class="community-post-detail">
              ${r?D(r):`
                <div class="community-post-empty">
                  <p>Select a post to view</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `,jf(),ne(t,n)}function T(e){let t=[...p.map(e=>({id:e.id,label:`${f.find(t=>t.id===e.region)?.icon||``} ${e.name} (${e.format})`,group:`Mon Accord`})),...h.map(e=>({id:e.id,label:`${e.brand} — ${e.name}`,group:`L'Oreal Luxe`}))];return`
      <div class="community-new-post-form">
        <div class="input-group">
          <label class="input-label">Title</label>
          <input type="text" class="input" id="new-post-title" placeholder="Give your post a title..." />
        </div>

        <div class="input-group">
          <label class="input-label">Topic Type</label>
          <div class="community-topic-selector">
            <button class="community-topic-btn ${c===`combination`?`community-topic-btn--active`:``}" data-topic="combination">Custom Combination</button>
            <button class="community-topic-btn ${c===`trending`?`community-topic-btn--active`:``}" data-topic="trending">Trending Combo</button>
            <button class="community-topic-btn ${c===`free`?`community-topic-btn--active`:``}" data-topic="free">Free Topic</button>
          </div>
        </div>

        ${c===`combination`?`
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

        ${c===`trending`?`
          <div class="input-group">
            <label class="input-label">Select trending combination</label>
            <select class="select" id="trending-select">
              <option value="">Choose...</option>
              ${g.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
        `:``}

        ${c===`free`?`
          <div class="input-group">
            <label class="input-label">Topic</label>
            <input type="text" class="input" id="free-topic-label" placeholder="What's this about?" />
          </div>
        `:``}

        ${c?`
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
    `}let E=[];function D(e){let t=u.isPostLiked(e.id),n=A(e);return`
      <div class="community-post-detail__inner">
        <div class="community-post-detail__header">
          <h3 class="community-post-detail__title">${e.title}</h3>
          <div class="community-post-detail__meta">
            <span class="community-post-detail__author">${e.author}</span>
            <span class="community-post-detail__date">${new Date(e.date).toLocaleDateString()}</span>
          </div>
        </div>
        ${n}
        <p class="community-post-detail__content">${e.content}</p>
        <div class="community-post-detail__actions">
          <button class="community-like-btn ${t?`community-like-btn--active`:``}" data-like-post="${e.id}">
            ${t?`♥`:`♡`} ${e.likes||0}
          </button>
          <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${j(e)} comments</span>
        </div>
        <div class="divider--gold"></div>
        <div class="community-comments">
          <h4 style="font-size:var(--text-xl);font-weight:700;margin-bottom:var(--space-sm);">Comments</h4>
          ${O(e.comments||[],e.id,0)}
          <div class="community-add-comment">
            <input type="text" class="input" id="new-comment-input" placeholder="Write a comment..." style="flex:1;" />
            <button class="btn btn--primary btn--sm" id="btn-add-comment" data-post-id="${e.id}">Post</button>
          </div>
        </div>
      </div>
    `}function O(e,t,n){return!e||!e.length?``:e.map(e=>`
      <div class="community-comment" style="margin-left:${n*20}px;">
        <div class="community-comment__meta">
          <span class="community-comment__author">${e.author}</span>
          <span class="community-comment__date">${ee(e.date)}</span>
        </div>
        <p class="community-comment__text">${e.text}</p>
        <button class="community-reply-toggle" data-comment-id="${e.id}" data-post-id="${t}">Reply</button>
        <div class="community-reply-input" id="reply-${e.id}" style="display:none;">
          <input type="text" class="input" placeholder="Write a reply..." style="flex:1;font-size:var(--text-xs);" />
          <button class="btn btn--ghost btn--sm community-reply-submit" data-comment-id="${e.id}" data-post-id="${t}">Post</button>
        </div>
        ${O(e.replies||[],t,n+1)}
      </div>
    `).join(``)}function k(e){if(e.topicType===`trending`){let t=g.find(t=>t.id===e.topicRef);return t?t.name:`Trending`}return e.topicType===`combination`?`Custom Combo`:e.topicLabel||`General`}function A(e){if(e.topicType===`trending`){let t=g.find(t=>t.id===e.topicRef);return t?`<div class="community-post-topic-badge">Trending: ${t.name}</div>`:``}return e.topicType===`combination`&&e.topicCombination?.length?`<div class="community-post-topic-badge">${e.topicCombination.map(e=>`${v(e.perfumeId)?.name||e.perfumeId} (${e.amount} ${e.unit})`).join(` + `)}</div>`:e.topicType===`free`&&e.topicLabel?`<div class="community-post-topic-badge">${e.topicLabel}</div>`:``}function j(e){let t=0;function n(e){(e||[]).forEach(e=>{t++,n(e.replies)})}return n(e.comments),t}function ee(e){let t=Date.now()-e,n=Math.floor(t/6e4);if(n<60)return`${n}m ago`;let r=Math.floor(n/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}function te(e,t){for(let n of e||[]){if(n.id===t)return n;let e=te(n.replies,t);if(e)return e}return null}function ne(n,r){e.querySelectorAll(`.community-sort-btn[data-sort]`).forEach(e=>{e.addEventListener(`click`,()=>{i=e.dataset.sort,w()})}),e.querySelectorAll(`.community-sort-btn[data-post-sort]`).forEach(e=>{e.addEventListener(`click`,()=>{a=e.dataset.postSort,w()})}),e.querySelectorAll(`[data-like-formula]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),u.toggleLike(e.dataset.likeFormula),w()})}),e.querySelectorAll(`[data-vault-formula]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=n.find(t=>t.id===e.dataset.vaultFormula);if(!r)return;let i=(r.layers||[]).map(e=>{let t=v(e.perfumeId);return t&&f.find(e=>e.id===t.region),{...e,name:t?.name||e.perfumeId}});tf({...r,id:`saved-`+r.id,layers:i},{showNameInput:!1})})});let l=e.querySelector(`#btn-load-suggestion`);l&&l.addEventListener(`click`,()=>{_?.layers?.length&&(sessionStorage.setItem(`labPending`,JSON.stringify(_.layers.map(e=>e.perfumeId).filter(e=>v(e)))),t(`#lab`))}),e.querySelectorAll(`[data-post-id]`).forEach(e=>{e.classList.contains(`community-post-item`)&&e.addEventListener(`click`,()=>{o=e.dataset.postId,w()})});let d=e.querySelector(`#btn-new-post`);d&&d.addEventListener(`click`,()=>{s=!0,c=null,E=[],w()}),e.querySelectorAll(`.community-topic-btn`).forEach(e=>{e.addEventListener(`click`,()=>{c=e.dataset.topic,E=[],w()})});let p=e.querySelector(`#combo-add-layer`);p&&p.addEventListener(`click`,()=>{let t=e.querySelector(`#combo-perfume-select`),n=e.querySelector(`#combo-amount`),r=e.querySelector(`#combo-unit`);t.value&&(E.push({perfumeId:t.value,amount:parseInt(n.value)||2,unit:r.value}),m())});function m(){let t=e.querySelector(`#combo-layers`);t&&(t.innerHTML=E.map((e,t)=>{let n=v(e.perfumeId),r=h.find(t=>t.id===e.perfumeId);return`<div class="community-combo-layer"><span>${n?.name||(r?`${r.brand} — ${r.name}`:e.perfumeId)} (${e.amount} ${e.unit})</span><button class="community-combo-remove" data-idx="${t}">✕</button></div>`}).join(``),t.querySelectorAll(`.community-combo-remove`).forEach(e=>{e.addEventListener(`click`,()=>{E.splice(parseInt(e.dataset.idx),1),m()})}))}let g=e.querySelector(`#btn-cancel-post`);g&&g.addEventListener(`click`,()=>{s=!1,c=null,w()});let y=e.querySelector(`#btn-submit-post`);y&&y.addEventListener(`click`,()=>{let t=e.querySelector(`#new-post-title`)?.value.trim(),n=e.querySelector(`#new-post-content`)?.value.trim();if(!t||!n||!c){window.showToast(`Please fill in all fields.`,`error`);return}let r={id:`p-`+Date.now(),author:u.getUsername(),date:Date.now(),title:t,content:n,topicType:c,likes:0,comments:[]};c===`combination`&&(r.topicCombination=[...E]),c===`trending`&&(r.topicRef=e.querySelector(`#trending-select`)?.value||``),c===`free`&&(r.topicLabel=e.querySelector(`#free-topic-label`)?.value.trim()||`General`);let i=Of();i.unshift(r),u.setPosts(i),s=!1,c=null,o=r.id,w(),window.showToast(`Post published!`)}),e.querySelectorAll(`[data-like-post]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.likePost,n=u.isPostLiked(t);u.togglePostLike(t);let r=Of(),i=r.find(e=>e.id===t);i&&(i.likes=(i.likes||0)+(n?-1:1),u.setPosts(r)),w()})});let b=e.querySelector(`#btn-add-comment`);b&&b.addEventListener(`click`,()=>{let t=e.querySelector(`#new-comment-input`)?.value.trim();if(!t)return;let n=Of(),r=n.find(e=>e.id===b.dataset.postId);r&&(r.comments||=[],r.comments.push({id:`c-`+Date.now(),author:u.getUsername(),date:Date.now(),text:t,replies:[]}),u.setPosts(n),w())}),e.querySelectorAll(`.community-reply-toggle`).forEach(t=>{t.addEventListener(`click`,()=>{let n=e.querySelector(`#reply-${t.dataset.commentId}`);n&&(n.style.display=n.style.display===`none`?`flex`:`none`)})}),e.querySelectorAll(`.community-reply-submit`).forEach(t=>{t.addEventListener(`click`,()=>{let n=(e.querySelector(`#reply-${t.dataset.commentId}`)?.querySelector(`input`))?.value.trim();if(!n)return;let r=Of(),i=r.find(e=>e.id===t.dataset.postId);if(i){let e=te(i.comments,t.dataset.commentId);e&&(e.replies||=[],e.replies.push({id:`r-`+Date.now(),author:u.getUsername(),date:Date.now(),text:n,replies:[]}),u.setPosts(r),w())}})})}w(),_||(async()=>{let e;if(kd()){let t=await wf();e=t.success&&t.remix?t.remix:re()}else e=re();_=e,y=!1,sessionStorage.setItem(l,JSON.stringify({date:d,remix:e})),w()})();function re(){let e=x.slice().sort((e,t)=>t.matchPercent-e.matchPercent)[0]||n[0];return{remixName:e?.name||`Daily Selection`,layers:e?.layers||[],inspiration:e?.description||`A community-loved formula selected for your profile.`,scentDescription:`Balanced for versatility across day and evening wear.`}}}function Af(e,t){return t?`<div style="padding:var(--space-xl);text-align:center;"><span class="loading-spinner"></span><p style="margin-top:var(--space-md);color:var(--text-tertiary);">Preparing today's suggestion...</p></div>`:e?`
    <div style="padding:var(--space-lg);display:flex;flex-direction:column;flex:1;min-height:0;">
      <div class="ai-response" style="flex:1;">
        <div class="ai-response__label">${e.remixName||`AI Suggestion`}</div>
        <div class="ai-response__text">
          ${e.layers?.length?`<div style="margin-bottom:var(--space-md);">${e.layers.map(e=>{let t=v(e.perfumeId),n=t?f.find(e=>e.id===t.region):null;return`<p>${n?.icon||`•`} ${e.amount} ${e.unit} of <strong style="color:${n?.color||`var(--text-primary)`};">${t?.name||e.perfumeId}</strong></p>`}).join(``)}</div>`:``}
          ${e.inspiration?`<p>${e.inspiration}</p>`:``}
        </div>
      </div>
      <button class="btn btn--primary btn--sm" style="margin-top:var(--space-lg);" id="btn-load-suggestion">Load to Lab</button>
    </div>
  `:`<p style="font-size:var(--text-sm);color:var(--text-tertiary);padding:var(--space-lg);">No suggestion available.</p>`}function jf(){if(document.getElementById(`community-styles`))return;let e=document.createElement(`style`);e.id=`community-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var Mf=`/mon_accord/assets/Sephora-Logo-0PIDe1Np.png`,Nf=`/mon_accord/assets/Boyner_Logo-CHQxYmdT.jpg`,Pf=`/mon_accord/assets/Trendyol_logo-CfMQtlYm.png`,Ff=`/mon_accord/assets/hepsiburada-logo-I_Ul_zcU.png`,If={scandinavian:new URL(`/mon_accord/assets/scandinavian-5ibAHdAH.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-DZK4DeZe.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DwLt2ni5.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-fZMNFcGl.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-PQykoay7.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-DEEY7Abs.png`,``+import.meta.url).href},Lf={scandinavian:new URL(`/mon_accord/assets/scandinavian-T91uXqs1.png`,``+import.meta.url).href,eastasia:new URL(`/mon_accord/assets/east_asia-C6p3o17-.png`,``+import.meta.url).href,southafrica:new URL(`/mon_accord/assets/south_africa-DqiVXp2O.png`,``+import.meta.url).href,mediterranean:new URL(`/mon_accord/assets/mediterranean-zaCtkOEY.png`,``+import.meta.url).href,southamerica:new URL(`/mon_accord/assets/south_america-BEKaFRIH.png`,``+import.meta.url).href,middleeast:new URL(`/mon_accord/assets/middle_east-Df_0XU0d.png`,``+import.meta.url).href};function Rf(e,t){let n=u.getShopCart(),r=[...new Set(u.consumePendingShopCart())],i=[...new Set([...n,...r])],a=i.map(e=>({id:e}));if(r.length){let e=i.length-n.length;window.showToast(`Added ${e} new item${e===1?``:`s`} from your recommended combination.`)}o();function o(){u.setShopCart(a.map(e=>e.id))}function s(){let n=u.getOwnedPerfumes().monAccord||[];zf(n,a),e.innerHTML=`
      <div class="page__container">
        <div class="shop-layout">
          <div class="shop-products">
            ${f.map(e=>{let t=p.find(t=>t.region===e.id&&t.format===`spray`),r=p.find(t=>t.region===e.id&&t.format===`oil`);return`
                <div class="shop-region-card" style="--region-color: ${e.color}; --region-light: ${e.colorLight};">
                  <div class="shop-region-card__header">
                    <h3 class="shop-region-card__name">${e.name}</h3>
                  </div>
                  <div class="shop-region-card__products">
                    ${t?(()=>{let r=a.find(e=>e.id===t.id),i=n.includes(t.id);return`
                        <button class="shop-bottle-btn ${r?`shop-bottle-btn--in-cart`:``} ${i?`shop-bottle-btn--owned`:``}" data-id="${t.id}" style="--region-color:${e.color};">
                          ${r?`<div class="shop-bottle-check">✓</div>`:``}
                          ${i?`<div class="shop-bottle-owned">Owned</div>`:``}
                          <img src="${If[e.id]}" class="shop-bottle-img" alt="Spray" loading="lazy" decoding="async" />
                          <span class="shop-bottle-type">SPRAY</span>
                        </button>`})():``}
                    ${r?(()=>{let t=a.find(e=>e.id===r.id),i=n.includes(r.id);return`
                        <button class="shop-bottle-btn ${t?`shop-bottle-btn--in-cart`:``} ${i?`shop-bottle-btn--owned`:``}" data-id="${r.id}" style="--region-color:${e.color};">
                          ${t?`<div class="shop-bottle-check">✓</div>`:``}
                          ${i?`<div class="shop-bottle-owned">Owned</div>`:``}
                          <img src="${Lf[e.id]}" class="shop-bottle-img" alt="Oil" loading="lazy" decoding="async" />
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
              <span class="shop-cart__count">${a.length} item${a.length===1?``:`s`}</span>
            </div>
            ${a.length===0?`
              <div class="shop-cart__empty">
                <p>Your cart is empty</p>
                <p style="font-size: var(--text-xs); color: var(--text-tertiary);">Add sprays and oils to get started.</p>
              </div>
            `:`
              <div class="shop-cart__items">
                ${a.map(e=>{let t=v(e.id);return f.find(e=>e.id===t.region),`
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
    `,Vf(),e.querySelectorAll(`.shop-bottle-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=a.findIndex(e=>e.id===n);r>=0?a.splice(r,1):a.push({id:n}),o(),s()})}),e.querySelectorAll(`.shop-cart__item-remove`).forEach(e=>{e.addEventListener(`click`,()=>{a=a.filter(t=>t.id!==e.dataset.id),o(),s()})});let r=e.querySelector(`#btn-confirm-order`);r&&r.addEventListener(`click`,()=>{Bf(a,e,t)})}s()}function zf(e,t){if(!e.length)return null;let n=t.map(e=>e.id),r=e.map(e=>v(e)).filter(Boolean),i=[...new Set(r.flatMap(e=>e.scentFamily.split(`-`)))],a=p.filter(t=>!e.includes(t.id)&&!n.includes(t.id)&&t.scentFamily.split(`-`).some(e=>i.includes(e))).slice(0,2);return a.length?`Based on your owned ${r.map(e=>e.name).join(` & `)}: try adding ${a.map(e=>e.name).join(` or `)}.`:null}function Bf(e,t,n){u.clearShopCart();let r=document.createElement(`div`);r.className=`modal-overlay`,r.innerHTML=`
    <div class="modal order-confirmed-modal">
      <button class="modal__close" id="btn-close-retailers" aria-label="Close">✕</button>
      <div class="modal__body order-confirmed-body">
        <div class="order-confirmed-icon"></div>
        <h3 class="order-confirmed-title">Now Available</h3>

        <div class="order-retailers">
          <div class="order-retailers__grid">
            <div class="order-retailer-card" aria-label="Sephora">
              <img src="${Mf}" alt="Sephora" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Boyner">
              <img src="${Nf}" alt="Boyner" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Trendyol">
              <img src="${Pf}" alt="Trendyol" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
            <div class="order-retailer-card" aria-label="Hepsiburada">
              <img src="${Ff}" alt="Hepsiburada" class="order-retailer-card__logo" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="btn-go-profile">Go to Profile</button>
      </div>
    </div>
  `,document.body.appendChild(r),r.querySelector(`#btn-go-profile`).addEventListener(`click`,()=>{r.remove(),n(`#profile`)}),r.querySelector(`#btn-close-retailers`).addEventListener(`click`,()=>{r.remove()}),r.onclick=e=>{e.target===r&&r.remove()}}function Vf(){if(document.getElementById(`shop-styles`))return;let e=document.createElement(`style`);e.id=`shop-styles`,e.textContent=`

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
  `,document.head.appendChild(e)}function X(e){return new Promise(t=>setTimeout(t,e))}function Z(e,t){if(!e)return X(0);var n=t===void 0?90:t,r=e.getBoundingClientRect().top+window.scrollY-n;return window.scrollTo({top:Math.max(0,r),behavior:`smooth`}),X(700)}function Hf(e,t,n){return Math.min(n,Math.max(t,e))}function Uf(e){let t={};for(let n=0;n<e.length;n+=1){let r=e.key(n);r&&(t[r]=e.getItem(r))}return t}function Wf(e,t){e.clear(),Object.entries(t||{}).forEach(([t,n])=>{n!=null&&e.setItem(t,n)})}async function Gf(){let e=document.createElement(`div`);e.id=`dt-flash`,e.style.cssText=`
    position:fixed;inset:0;z-index:99994;
    background:rgba(200,169,126,0.07);
    pointer-events:none;opacity:0;
    transition:opacity 0.18s ease;
  `,document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.opacity=`1`})),await X(210),e.style.opacity=`0`,setTimeout(()=>e.remove(),230)}async function Kf(e){window.location.hash!==e&&Gf(),window.location.hash===e&&(window.location.hash=`#_nav`,await X(150)),window.location.hash=e,await X(450)}function Q(e,t,n=2e3){return new Promise(r=>{let i=()=>document.querySelector(e)||(t?document.querySelector(t):null),a=i();if(a){r(a);return}let o=new MutationObserver(()=>{let e=i();e&&(o.disconnect(),clearTimeout(s),r(e))});o.observe(document.body,{childList:!0,subtree:!0});let s=setTimeout(()=>{o.disconnect(),r(document.getElementById(`page-content`)||document.body)},n)})}var qf={username:`Alp`,archetypeName:`The Elegant Minimalist`,description:`You are drawn to understated sophistication - scents that whisper rather than shout. Your olfactory identity is defined by clean precision, refined florals, and the quiet depth of woody bases. You seek harmony, not performance.`,primaryFamilies:[`floral`,`woody`,`citrus`],sillageProfile:`Medium - intimate yet memorable, discovered only in close proximity.`,notePreferences:{loves:[`iris`,`sandalwood`,`bergamot`,`white musk`],explore:[`oud`,`rose`,`vetiver`,`ambergris`],avoid:[`heavy synthetics`,`excessive sweetness`,`dense patchouli`]},recommendedRegions:[`scandinavian`,`mediterranean`,`eastasia`],updatedAt:Date.now()},Jf=`monaccord_profile`,Yf=`monaccord_quiz_state`,Xf=``,Zf=null,Qf=null,$f=void 0,ep=[{title:`Mon Accord`,run:async()=>(await Kf(`#landing`),window.scrollTo({top:0,behavior:`auto`}),await Q(`#hero-section .hero__content`,`#hero-section`,2e3)),duration:3500},{title:`Six World Regions`,run:async()=>{let e=document.querySelector(`#regions-section`);return e&&await Z(e,60),document.querySelector(`.region-card`)||e||document.querySelector(`.page__container`)},duration:4e3},{title:`Spray & Oil Notes`,run:async()=>(document.querySelector(`.notes-popup`)?.remove(),document.querySelector(`.region-format-btn[data-format="spray"]`)?.click(),await X(250),document.querySelector(`.notes-popup`)?.scrollIntoView({behavior:`smooth`,block:`nearest`}),await X(300),document.querySelector(`.notes-popup__inner`)||document.querySelector(`#regions-section`)),duration:4e3},{title:`Take the Quiz`,samePage:!0,run:async()=>{document.querySelector(`.notes-popup`)?.remove();let e=document.querySelector(`#cta-section`);e?e.scrollIntoView({behavior:`smooth`,block:`center`}):window.scrollTo({top:document.body.scrollHeight,behavior:`smooth`}),await X(700);let t=document.querySelector(`#bottom-cta`);return t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),await X(500)),t||document.querySelector(`#cta-section`)||document.querySelector(`.page__container`)},duration:3e3},{title:`Step 1 - Your Name`,run:async()=>{document.querySelector(`.notes-popup`)?.remove(),localStorage.removeItem(Yf),window.__retakeQuiz=!0,await Kf(`#profile`);let e=await Q(`.quiz-container`,`.page__container`,2500);await X(300);let t=document.querySelector(`#quiz-username`);if(t){t.focus();for(let e of`Alp`)t.value+=e,t.dispatchEvent(new Event(`input`)),await X(120)}return e},duration:2500},{title:`Step 2 - Scent Families`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400);let e=[...document.querySelectorAll(`.quiz-grid--families .quiz-option`)];for(let t of e.slice(0,3))t.click(),await X(280);return document.querySelector(`.quiz-grid--families`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 3 - Perfumes You Love`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(450);let e=[...document.querySelectorAll(`.quiz-option--perfume`)];for(let t of e.slice(0,2))t.click(),await X(220);return document.querySelector(`.quiz-perfume-list`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 4 - Performance`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400);for(let e of[{id:`slider-sillage`,valId:`sillage-val`,target:7},{id:`slider-longevity`,valId:`longevity-val`,target:10},{id:`slider-intensity`,valId:`intensity-val`,target:5}]){let t=document.querySelector(`#`+e.id);t&&(t.value=e.target,t.dispatchEvent(new Event(`input`,{bubbles:!0})),await X(350))}return document.querySelector(`.quiz-sliders`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 5 - Your Personality`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400),(document.querySelector(`[id="ctx-elegant"]`)||document.querySelector(`.quiz-grid--context .quiz-option`))?.click(),await X(300);let e=document.querySelector(`#quiz-notes`);if(e){e.focus();for(let t of`I love the scent of fresh linen and evening air.`)e.value+=t,e.dispatchEvent(new Event(`input`)),await X(38)}return document.querySelector(`.quiz-grid--context`)||document.querySelector(`.quiz-container`)},duration:5500},{title:`Your Olfactory Profile`,run:async()=>(localStorage.setItem(Jf,JSON.stringify(qf)),localStorage.setItem(`monaccord_my_perfumes`,JSON.stringify({monAccord:[`scandinavian-spray`,`eastasia-spray`,`mediterranean-oil`],loreal:[`ysl-libre`,`ysl-black-opium`]})),window.__retakeQuiz=!1,window.dispatchEvent(new Event(`hashchange`)),await X(500),window.scrollTo({top:0,behavior:`auto`}),await Q(`.profile-result`,`.page__container`,3e3),document.querySelector(`.section-header`)||document.querySelector(`.profile-result`)||document.querySelector(`.page__container`)),duration:4e3},{title:`Identity & Preferences`,run:async()=>{let e=document.querySelector(`.profile-overview`),t=document.querySelector(`.profile-details`)||e;return await Z(e),t||document.querySelector(`.profile-result`)},duration:4e3},{title:`Mon Accord Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`)[0],t=e?.previousElementSibling?.previousElementSibling||e,n=e?.querySelector(`.combo-card`)||e;return await Z(t||n,80),n||document.querySelector(`.profile-result`)},duration:4e3},{title:`L'Oreal Luxe Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`),t=e.length>1?e[1]:e[0],n=t?.previousElementSibling?.previousElementSibling||t,r=t?.querySelector(`.combo-card`)||t;return await Z(n||r,80),r||document.querySelector(`.profile-result`)},duration:4e3},{title:`Shop - Build Your Collection`,run:async()=>{let e=document.querySelector(`[data-buy-combo]`);return e?(e.click(),await X(600)):await Kf(`#shop`),await Q(`.shop-region-card`,`.shop-layout`,2e3)},duration:4e3},{title:`Add to Cart`,run:async()=>{let e=[...document.querySelectorAll(`.shop-product__btn:not(.shop-product__btn--added)`)];e[0]&&(e[0].click(),await X(180)),e[1]&&(e[1].click(),await X(180));let t=document.querySelector(`.shop-cart`);return t?.scrollIntoView({behavior:`smooth`,block:`center`}),await X(300),t||document.querySelector(`.page__container`)},duration:4e3},{title:`Now Available`,run:async()=>(document.querySelector(`#btn-confirm-order`)?.click(),await X(350),document.querySelector(`.order-confirmed-modal`)||document.querySelector(`.modal-overlay`)||document.querySelector(`.page__container`)),duration:4e3},{title:`The Layering Lab`,run:async()=>{document.querySelector(`.modal-overlay`)?.remove(),await Kf(`#lab`),window.scrollTo({top:0,behavior:`auto`}),await X(200);let e=[...document.querySelectorAll(`.lab-add-btn:not(.lab-add-btn--added)`)];return e[0]&&(e[0].click(),await X(200)),e[2]&&(e[2].click(),await X(200)),await X(300),document.querySelector(`#lab-layers`)||document.querySelector(`#lab-add-section`)},duration:5e3},{title:`Virtual Scent Simulation`,samePage:!0,run:async()=>{let e=document.querySelector(`#btn-simulate`);e&&(await Z(e),e.innerHTML=`<span class=”loading-spinner”></span> Simulating...`,e.disabled=!0,await X(1200),e.innerHTML=`✦ Simulate Scent`,e.disabled=!1);let t=document.querySelector(`#simulation-result`);if(!t){t=document.createElement(`div`),t.id=`simulation-result`,t.className=`ai-response mt-lg`;let e=document.querySelector(`#lab-actions`);e?e.insertAdjacentElement(`afterend`,t):document.querySelector(`#lab-layers`)?.appendChild(t)}return t&&(t.style.display=``,t.innerHTML=`
          <div class=”ai-response__label”>✦ Virtual Scent Simulation</div>
          <div class=”ai-response__text”>
            <p><strong style=”color: var(--accent);”>OPENING:</strong> A bright burst of bergamot and yuzu zest — sparkling, citrus-forward, immediately uplifting.</p>
            <p><strong style=”color: var(--accent);”>HEART:</strong> The iris and white tea settle into a soft floral corridor, whispering elegance without weight.</p>
            <p><strong style=”color: var(--accent);”>DRY DOWN:</strong> Sandalwood and sheer musk create a warm, skin-close finish that lingers for hours.</p>
            <p><strong style=”color: var(--accent);”>SILLAGE:</strong> Medium — intimate yet memorable, discovered only in close proximity.</p>
          </div>
        `,await Z(t)),t||document.querySelector(`#lab-layers`)||document.querySelector(`.page__container`)},duration:4500},{title:`AI Contextual Advisor`,run:async()=>{let e=document.querySelector(`.lab-advisor`);await Z(e),document.querySelector(`#mood-chips .lab-chip`)?.click(),await X(100),document.querySelector(`#occasion-chips .lab-chip`)?.click(),await X(100),document.querySelector(`#season-chips .lab-chip`)?.click(),await X(250);let t=document.querySelector(`#advisor-result`);return t||(t=document.createElement(`div`),t.id=`advisor-result`,t.className=`lab-advisor__result mt-lg`,document.querySelector(`.lab-advisor__form`)?.insertAdjacentElement(`afterend`,t)),t&&(t.style.display=``,t.innerHTML=`
          <div style="padding:var(--space-md);background:rgba(200,169,126,0.06);border-radius:var(--radius-md);border:1px solid rgba(200,169,126,0.18);">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;">Combination Tip</div>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.65;margin:0;">
              For a <strong style="color:var(--text-primary);">romantic evening</strong>, your current blend reads beautifully - the bergamot top note softens into the woody base creating quiet intimacy. Consider adding a touch of rose absolute to amplify the floral heart without overpowering the composition.
            </p>
          </div>
        `),t||document.querySelector(`.lab-advisor__form`)||e||document.querySelector(`.page__container`)},duration:5e3},{title:`Save to Vault`,samePage:!0,run:async()=>{let e=await Q(`#btn-save-formula`,`.page__container`,1200);e&&e.id===`btn-save-formula`&&(await Z(e),e.click(),await X(450));let t=await Q(`#save-vault-overlay .modal`,`#save-vault-overlay`,2e3),n=document.querySelector(`#sv-name`);if(n){n.value=``,n.focus();for(let e of`Evening Velvet`)n.value+=e,n.dispatchEvent(new Event(`input`)),await X(55);await X(300)}let r=document.querySelector(`#sv-folder-dropdown`);if(r){let e=[...r.options].find(e=>e.value===`evening`||e.text.toLowerCase().includes(`evening`));e&&(r.value=e.value,r.dispatchEvent(new Event(`change`))),await X(400)}return t||document.querySelector(`#save-vault-overlay`)||document.querySelector(`.page__container`)},duration:4500},{title:`Your Vault`,run:async()=>(document.querySelector(`#sv-confirm`)?.click(),await X(350),await Kf(`#vault`),await Q(`.vault-folders-col`,`.page__container`,2e3)),duration:4e3},{title:`My Perfumes`,samePage:!0,run:async()=>{let e=document.querySelector(`.vault-myperfumes-col`);return window.scrollTo({top:0,behavior:`smooth`}),await X(400),e||document.querySelector(`.vault-main-layout`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Trending Combinations`,run:async()=>{await Kf(`#community`);let e=document.querySelector(`.duygu-card__photo`);return e&&!e.complete&&await new Promise(t=>{e.onload=t,e.onerror=t,setTimeout(t,3e3)}),await X(200),await Q(`.community-trending-item`,`.community-trending-list`,2e3)},duration:4e3},{title:`Today's Selection`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-panel--selection`);return await Z(e),e||document.querySelector(`.community-top-grid`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Duygu's Choice`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-duygu-choice`);return e?(await Z(e),e):document.querySelector(`.community-right-col`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Community Discussion`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-discussion-section`);return await Z(e,60),document.querySelector(`.community-post-item`)?.click(),await X(300),document.querySelector(`.community-discussion-layout`)||e||document.querySelector(`.page__container`)},duration:4500}],tp=[3e3,3500,3500,3e3,2500,2500,2500,2500,5e3,4500,3e3,4e3,3e3,3500,3500,3500,4500,4500,4e3,3500,3500,3500,3500,3e3,3500,3500];ep.forEach((e,t)=>{e.duration=tp[t]??e.duration});function np(){return document.getElementById(`dt-card`)}function rp(){return document.getElementById(`dt-prog`)}function ip(){return document.getElementById(`dt-cd`)}function ap(){return document.getElementById(`dt-dots`)}function op(){return document.getElementById(`dt-count`)}function sp(){return document.getElementById(`dt-title`)}function cp(){return document.getElementById(`dt-next`)}var lp=24,$=20;function up(e){let t=np();if(!t)return;let n=window.innerWidth,r=window.innerHeight,i=lp,a=Math.min(t.offsetWidth||288,n-i*2),o=t.offsetHeight||126,s=e?e.getBoundingClientRect():null;if(!s||(s.width||0)===0||(s.height||0)===0||s.bottom<=0||s.top>=r||s.right<=0||s.left>=n){let e=Math.min(n-i*2,320),t=Math.min(r-i*2,160);s={left:(n-e)/2,top:(r-t)/2,right:(n+e)/2,bottom:(r+t)/2}}let c=s.right-s.left,l=s.bottom-s.top,u=[{placement:`bottom`,x:s.left+(c-a)/2,y:s.bottom+$},{placement:`top`,x:s.left+(c-a)/2,y:s.top-o-$},{placement:`right`,x:s.right+$,y:s.top+(l-o)/2},{placement:`left`,x:s.left-a-$,y:s.top+(l-o)/2},{placement:`bottom-right`,x:s.right-a,y:s.bottom+$},{placement:`bottom-left`,x:s.left,y:s.bottom+$},{placement:`top-right`,x:s.right-a,y:s.top-o-$},{placement:`top-left`,x:s.left,y:s.top-o-$}];function d(e){let t=Hf(e.x,i,Math.max(i,n-a-i)),s=Hf(e.y,i,Math.max(i,r-o-i));return{placement:e.placement,left:t,top:s,right:t+a,bottom:s+o,clampDelta:Math.abs(e.x-t)+Math.abs(e.y-s)}}function f(e){let t=(e.left+e.right)/2,n=(e.top+e.bottom)/2,r=(s.left+s.right)/2,i=(s.top+s.bottom)/2;return Math.hypot(t-r,n-i)}function p(e){let t=Math.max(e.left,s.left),n=Math.max(e.top,s.top),r=Math.min(e.right,s.right),i=Math.min(e.bottom,s.bottom);return r>t&&i>n?(r-t)*(i-n):0}let m=u.map(e=>{let t=d(e);return{rect:t,score:p(t)*4+f(t)+t.clampDelta*6}}).sort((e,t)=>e.score-t.score)[0];t.dataset.placement=m.rect.placement,t.style.transform=`translate(${Math.round(m.rect.left)}px, ${Math.round(m.rect.top)}px)`}function dp(e){let t=ep[e],n=ep.length,r=op(),i=sp(),a=ap(),o=rp(),s=cp();if(r&&(r.textContent=`${String(e+1).padStart(2,`0`)} / ${String(n).padStart(2,`0`)}`),i&&(i.textContent=t.title),o&&(o.style.width=`${(e+1)/n*100}%`),s&&(s.textContent=e===n-1?`Finish`:`Next`),a){let t=Math.min(n,12),r=Math.max(0,e-Math.floor(t/2));a.innerHTML=Array.from({length:t},(t,n)=>{let i=n+r;return`<span class="dt-dot ${i===e?`dt-dot--active`:i<e?`dt-dot--done`:`dt-dot--pending`}"></span>`}).join(``)}}var fp=null;function pp(e){clearInterval(fp);let t=ip();if(!t)return;t.style.width=`0%`;let n=Date.now();fp=setInterval(()=>{let r=Math.min(100,(Date.now()-n)/e*100);t.style.width=r+`%`,r>=100&&clearInterval(fp)},40)}var mp=!1,hp=0,gp=null;async function _p(e){if(!mp)return;hp=e;let t=ep[e];dp(e);let n;try{n=await t.run()}catch{n=document.getElementById(`page-content`)||document.body}mp&&(up(n),pp(t.duration),clearTimeout(gp),gp=setTimeout(()=>vp(),t.duration))}function vp(){mp&&(clearTimeout(gp),hp>=ep.length-1?Sp():_p(hp+1))}function yp(){bp(),Cp();let e=document.createElement(`div`);e.id=`dt-card`,e.innerHTML=`
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
  `,document.body.appendChild(e),document.getElementById(`dt-skip`).addEventListener(`click`,Sp),document.getElementById(`dt-next`).addEventListener(`click`,()=>{clearTimeout(gp),clearInterval(fp),vp()})}function bp(){document.getElementById(`dt-card`)?.remove(),document.getElementById(`dt-flash`)?.remove()}function xp(){mp&&Sp(),Xf=window.location.hash||``,Zf=Uf(localStorage),Qf=Uf(sessionStorage),$f=window.__retakeQuiz,localStorage.clear(),sessionStorage.clear(),delete window.__retakeQuiz,localStorage.removeItem(Jf),mp=!0,hp=0,yp(),_p(0)}function Sp(){mp=!1,clearTimeout(gp),clearInterval(fp),Wf(localStorage,Zf),Wf(sessionStorage,Qf),Zf=null,Qf=null,$f===void 0?delete window.__retakeQuiz:window.__retakeQuiz=$f,$f=void 0,(Xf||``)!==(window.location.hash||``)&&(window.location.hash=Xf||`#landing`),Xf=``,bp()}function Cp(){if(document.getElementById(`dt-styles`))return;let e=document.createElement(`style`);e.id=`dt-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var wp=document.getElementById(`app`),Tp={"":x,"#landing":x,"#profile":Rd,"#lab":uf,"#vault":bf,"#shop":Rf,"#community":kf};function Ep(){return window.location.hash||``}function Dp(e){window.location.hash=e}function Op(){let e=Ep(),t=Tp[e]||x;wp.innerHTML=``,wp.appendChild(d(Dp,e));let n=document.createElement(`div`);if(n.className=`page page-enter`,n.id=`page-content`,t(n,Dp),wp.appendChild(n),!document.querySelector(`.toast-container`)){let e=document.createElement(`div`);e.className=`toast-container`,e.id=`toast-container`,document.body.appendChild(e)}window.scrollTo({top:0,behavior:`auto`})}window.showToast=function(e,t=`success`){let n=document.getElementById(`toast-container`);if(!n)return;let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.innerHTML=`<span class="toast__message">${e}</span>`,n.appendChild(r),setTimeout(()=>{r.style.animation=`fadeOut 0.3s var(--ease-out) forwards`,setTimeout(()=>r.remove(),300)},3e3)},window.showSettings=function(){let e=document.querySelector(`.modal-overlay`);e&&e.remove();let t=document.createElement(`div`);t.className=`modal-overlay`,t.id=`settings-modal`,t.innerHTML=`
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">Settings</h3>
        <button class="modal__close" id="close-settings">✕</button>
      </div>
      <div class="modal__body">
        <div class="input-group">
          <label class="input-label">Profile</label>
          ${u.getProfile()?`<p style="font-size: var(--text-sm); color: var(--text-secondary);">Archetype: <strong>${u.getProfile().archetypeName||`Set`}</strong></p>
               <button class="btn btn--ghost btn--sm mt-sm" id="reset-profile-btn" style="color: #e74c3c;">Reset All Data</button>`:`<p style="font-size: var(--text-sm); color: var(--text-tertiary);">No profile created yet.</p>`}
        </div>
        <div class="input-group" style="margin-top: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--border);">
          <label class="input-label">Demo</label>
          <button class="btn btn--secondary btn--sm" id="settings-demo-btn">▶ Watch Demo</button>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary" id="cancel-settings">Cancel</button>
        <button class="btn btn--primary" id="save-settings">Save</button>
      </div>
    </div>
  `,document.body.appendChild(t),t.querySelector(`#close-settings`).onclick=()=>t.remove(),t.querySelector(`#cancel-settings`).onclick=()=>t.remove(),t.onclick=e=>{e.target===t&&t.remove()},t.querySelector(`#save-settings`).onclick=()=>{window.showToast(`Settings saved!`),t.remove()};let n=t.querySelector(`#reset-profile-btn`);n&&(n.onclick=()=>{[`profile`,`quiz_state`,`vault`,`interactions`,`likes`,`my_perfumes`,`pending_shop_cart`,`shop_cart`,`community_posts`,`post_likes`,`vault_folders`].forEach(e=>u.remove(e)),sessionStorage.clear(),window.showToast(`All data cleared. Starting fresh!`),t.remove(),Op()});let r=t.querySelector(`#settings-demo-btn`);r&&(r.onclick=()=>{t.remove(),typeof window.startDemoTour==`function`&&window.startDemoTour()})},window.startDemoTour=xp,window.endDemoTour=Sp,window.addEventListener(`hashchange`,Op),Op();