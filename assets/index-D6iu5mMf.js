var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=`monaccord_`,d={get(e,t=null){try{let n=localStorage.getItem(u+e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(u+e,JSON.stringify(t))}catch(e){console.warn(`Storage write failed:`,e)}},remove(e){localStorage.removeItem(u+e)},getProfile(){return this.get(`profile`,null)},setProfile(e){this.set(`profile`,{...e,updatedAt:Date.now()})},getVault(){return this.get(`vault`,[])},saveFormula(e){let t=this.getVault(),n=t.findIndex(t=>t.id===e.id);return n>=0?t[n]={...e,savedAt:Date.now()}:t.push({...e,id:e.id||`f-`+Date.now(),savedAt:Date.now()}),this.set(`vault`,t),this.addInteraction({type:`save`,formulaId:e.id,timestamp:Date.now()}),t},removeFormula(e){let t=this.getVault().filter(t=>t.id!==e);return this.set(`vault`,t),t},getInteractions(){return this.get(`interactions`,[])},addInteraction(e){let t=this.getInteractions();t.push({...e,timestamp:e.timestamp||Date.now()}),t.length>500&&t.splice(0,t.length-500),this.set(`interactions`,t)},getLikes(){return this.get(`likes`,[])},toggleLike(e){let t=this.getLikes(),n=t.indexOf(e);return n>=0?(t.splice(n,1),this.addInteraction({type:`unlike`,formulaId:e,timestamp:Date.now()})):(t.push(e),this.addInteraction({type:`like`,formulaId:e,timestamp:Date.now()})),this.set(`likes`,t),t},isLiked(e){return this.getLikes().includes(e)},getOwnedPerfumes(){let e=this.get(`my_perfumes`,null);return Array.isArray(e)?{monAccord:e.map(e=>e.id),loreal:[]}:e||{monAccord:[],loreal:[]}},setOwnedPerfumes(e){this.set(`my_perfumes`,e)},getApiKey(){return this.get(`gemini_api_key`,``)},setApiKey(e){this.set(`gemini_api_key`,e)},getQuizState(){return this.get(`quiz_state`,null)},setQuizState(e){this.set(`quiz_state`,e)},clearQuizState(){this.remove(`quiz_state`)},setPendingShopCart(e){this.set(`pending_shop_cart`,e)},consumePendingShopCart(){let e=this.get(`pending_shop_cart`,[]);return this.remove(`pending_shop_cart`),Array.isArray(e)?e:[]},getShopCart(){let e=this.get(`shop_cart`,[]);return Array.isArray(e)?e:[]},setShopCart(e){this.set(`shop_cart`,e)},clearShopCart(){this.remove(`shop_cart`)},getUsername(){return this.getProfile()?.username||`Anonymous`},getPosts(){return this.get(`community_posts`,[])},setPosts(e){this.set(`community_posts`,e)},getPostLikes(){return this.get(`post_likes`,[])},togglePostLike(e){let t=this.getPostLikes(),n=t.indexOf(e);return n>=0?t.splice(n,1):t.push(e),this.set(`post_likes`,t),t},isPostLiked(e){return this.getPostLikes().includes(e)}};function f(e,t){let n=document.createElement(`nav`);return n.className=`navbar`,n.id=`main-nav`,d.getProfile(),n.innerHTML=`
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
  `,setTimeout(()=>{window.addEventListener(`scroll`,()=>{let e=document.getElementById(`main-nav`);e&&e.classList.toggle(`scrolled`,window.scrollY>10)},{passive:!0})},0),n.querySelector(`#nav-settings-btn`).addEventListener(`click`,()=>{window.showSettings()}),n}var p=[{id:`scandinavian`,name:`Scandinavian`,tagline:`Crisp Nordic Purity`,description:`Inspired by the pristine landscapes of the North — frozen lakes, evergreen forests, and Arctic air. A study in minimalist elegance and crystalline freshness.`,color:`#7BA7BC`,colorLight:`#A8D0E0`,gradient:`linear-gradient(135deg, #7BA7BC, #A8D0E0)`,icon:`❄`},{id:`eastasia`,name:`East Asia`,tagline:`Zen Garden Harmony`,description:`Drawing from centuries of incense tradition, temple gardens, and the quiet beauty of cherry blossoms. Delicate balance meets deep-rooted sophistication.`,color:`#D4A0A0`,colorLight:`#EACFCF`,gradient:`linear-gradient(135deg, #D4A0A0, #EACFCF)`,icon:`🌸`},{id:`southafrica`,name:`South Africa`,tagline:`Wild Earth Warmth`,description:`The raw beauty of the Cape — fynbos-covered mountains, red earth, and the warm embrace of rooibos. Bold, grounding, and unmistakably alive.`,color:`#C4956A`,colorLight:`#DDB892`,gradient:`linear-gradient(135deg, #C4956A, #DDB892)`,icon:`🌍`},{id:`mediterranean`,name:`Mediterranean`,tagline:`Sun-Kissed Coast`,description:`The luminous spirit of the Mediterranean shore — sun-warmed citrus groves, herb-scented hillsides, and sea-salt breezes through olive trees.`,color:`#7BAF8E`,colorLight:`#A8D4B8`,gradient:`linear-gradient(135deg, #7BAF8E, #A8D4B8)`,icon:`🫒`},{id:`southamerica`,name:`South America`,tagline:`Tropical Depth`,description:`The lush intensity of Amazonian rainforests — rich earth, exotic botanicals, and the sweet warmth of tonka and cocoa beneath a canopy of green.`,color:`#8B9F6B`,colorLight:`#B0C490`,gradient:`linear-gradient(135deg, #8B9F6B, #B0C490)`,icon:`🌿`},{id:`middleeast`,name:`Middle East`,tagline:`Ancient Opulence`,description:`The timeless luxury of Arabian perfumery — precious oud, damask rose, golden saffron, and the whisper of musk in palace halls. Richness without restraint.`,color:`#B8879B`,colorLight:`#D4ADC0`,gradient:`linear-gradient(135deg, #B8879B, #D4ADC0)`,icon:`🌙`}],m=[{id:`scandinavian-spray`,name:`Scandinavian - Spray`,region:`scandinavian`,format:`spray`,topNotes:[`bergamot ice`,`frozen mint`,`arctic birch`],middleNotes:[`white tea`,`sea moss`,`juniper berry`],baseNotes:[`pine resin`,`white musk`,`driftwood`],sillage:4,longevity:5,intensity:3,scentFamily:`fresh`,layeringRole:`brightener`,description:`A crisp, transparent spray that opens with an icy burst of bergamot and settles into a serene blend of white tea and Nordic pine.`},{id:`scandinavian-oil`,name:`Scandinavian - Oil`,region:`scandinavian`,format:`oil`,topNotes:[`frozen violet leaf`,`cold air accord`],middleNotes:[`birch sap`,`white tea`,`lichen`],baseNotes:[`cedarwood`,`clean musk`,`mineral stone`],sillage:2,longevity:7,intensity:4,scentFamily:`fresh`,layeringRole:`base-anchor`,description:`An intimate oil concentrate that wraps the skin in soft birch and cedarwood, creating a whispering Nordic calm that lasts all day.`},{id:`eastasia-spray`,name:`East Asia - Spray`,region:`eastasia`,format:`spray`,topNotes:[`sakura blossom`,`yuzu`,`shiso leaf`],middleNotes:[`green tea`,`bamboo`,`rice steam`],baseNotes:[`hinoki wood`,`white sandalwood`,`silk musk`],sillage:5,longevity:6,intensity:4,scentFamily:`floral-green`,layeringRole:`harmonizer`,description:`A delicate spray that captures the ephemeral beauty of sakura season — yuzu brightness melting into green tea serenity over warm hinoki.`},{id:`eastasia-oil`,name:`East Asia - Oil`,region:`eastasia`,format:`oil`,topNotes:[`osmanthus`,`rice milk`],middleNotes:[`sakura`,`matcha`,`bamboo heart`],baseNotes:[`hinoki`,`shiso`,`incense smoke`],sillage:3,longevity:8,intensity:5,scentFamily:`floral-woody`,layeringRole:`depth-builder`,description:`A contemplative oil that unfolds like a tea ceremony — osmanthus and rice milk yielding to the meditative warmth of temple incense.`},{id:`southafrica-spray`,name:`South Africa - Spray`,region:`southafrica`,format:`spray`,topNotes:[`wild fynbos`,`bergamot`,`pink pepper`],middleNotes:[`rooibos tea`,`honeybush`,`geranium`],baseNotes:[`vanilla bean`,`earth accord`,`coffee absolute`],sillage:6,longevity:7,intensity:6,scentFamily:`warm-spicy`,layeringRole:`statement`,description:`A bold spray that captures the untamed spirit of the Cape — wild fynbos opening into warm rooibos, grounded by rich vanilla and coffee.`},{id:`southafrica-oil`,name:`South Africa - Oil`,region:`southafrica`,format:`oil`,topNotes:[`buchu leaf`,`sparkling citrus`],middleNotes:[`rooibos`,`fynbos`,`wild honey`],baseNotes:[`coffee`,`vanilla`,`red earth`,`tonka`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`base-anchor`,description:`A sumptuous oil that stays close to the skin like a warm embrace — deep vanilla and coffee woven through with the wild sweetness of fynbos honey.`},{id:`mediterranean-spray`,name:`Mediterranean - Spray`,region:`mediterranean`,format:`spray`,topNotes:[`lemon zest`,`bergamot`,`orange blossom`],middleNotes:[`fig leaf`,`olive blossom`,`lavender`],baseNotes:[`sea salt`,`sun-bleached wood`,`white musk`],sillage:5,longevity:5,intensity:4,scentFamily:`citrus-aromatic`,layeringRole:`brightener`,description:`Bottled sunlight — a sparkling burst of citrus and orange blossom that dries to a breezy blend of fig and Mediterranean sea salt.`},{id:`mediterranean-oil`,name:`Mediterranean - Oil`,region:`mediterranean`,format:`oil`,topNotes:[`neroli`,`bergamot`],middleNotes:[`fig milk`,`lavender absolute`,`orange blossom`],baseNotes:[`olive wood`,`lemon rind`,`ambergris`],sillage:3,longevity:8,intensity:5,scentFamily:`green-aromatic`,layeringRole:`harmonizer`,description:`A golden oil that envelops the skin in the warmth of a Mediterranean afternoon — neroli and fig milk over sun-warmed olive wood.`},{id:`southamerica-spray`,name:`South America - Spray`,region:`southamerica`,format:`spray`,topNotes:[`pink pepper`,`tropical green leaf`,`lime`],middleNotes:[`cocoa blossom`,`jungle orchid`,`mate`],baseNotes:[`tonka bean`,`vetiver`,`palo santo`],sillage:6,longevity:6,intensity:5,scentFamily:`green-woody`,layeringRole:`statement`,description:`A vibrant spray that plunges you into tropical abundance — pink pepper and lime dissolving into rich cocoa and smoky palo santo.`},{id:`southamerica-oil`,name:`South America - Oil`,region:`southamerica`,format:`oil`,topNotes:[`açaí berry`,`green mandarin`],middleNotes:[`cocoa absolute`,`tobacco flower`,`tropical green`],baseNotes:[`tonka`,`vetiver heart`,`copaiba balsam`],sillage:3,longevity:9,intensity:7,scentFamily:`warm-gourmand`,layeringRole:`depth-builder`,description:`A luxurious oil of remarkable depth — cocoa and tobacco flower resting on a bed of tonka and vetiver, intimate yet unforgettable.`},{id:`middleeast-spray`,name:`Middle East - Spray`,region:`middleeast`,format:`spray`,topNotes:[`saffron`,`pink rose`,`cardamom`],middleNotes:[`damask rose`,`oud`,`incense`],baseNotes:[`musk`,`amber`,`sandalwood`],sillage:8,longevity:8,intensity:8,scentFamily:`oriental`,layeringRole:`statement`,description:`A majestic spray that commands presence — saffron-laced rose unfolding over precious oud and golden amber. Opulent and unapologetic.`},{id:`middleeast-oil`,name:`Middle East - Oil`,region:`middleeast`,format:`oil`,topNotes:[`saffron threads`,`bergamot`],middleNotes:[`Bulgarian rose`,`oud assam`,`frankincense`],baseNotes:[`royal musk`,`amber resin`,`agarwood`],sillage:4,longevity:10,intensity:9,scentFamily:`oriental-woody`,layeringRole:`base-anchor`,description:`The crown jewel — a deeply concentrated oil of finest oud and rose, anointed with saffron and sealed in royal musk. Lasts from dawn to dusk.`}],h=[{id:`fresh`,name:`Fresh`,description:`Clean, aquatic, and invigorating`,icon:`💧`},{id:`floral`,name:`Floral`,description:`Romantic blooms and petal softness`,icon:`🌹`},{id:`woody`,name:`Woody`,description:`Warm woods and natural depth`,icon:`🌲`},{id:`oriental`,name:`Oriental`,description:`Rich, warm, and spice-laden`,icon:`✨`},{id:`citrus`,name:`Citrus`,description:`Bright, zesty, and energizing`,icon:`🍋`},{id:`gourmand`,name:`Gourmand`,description:`Sweet, edible, and comforting`,icon:`🍫`},{id:`green`,name:`Green`,description:`Leafy, herbal, and natural`,icon:`🍃`},{id:`aromatic`,name:`Aromatic`,description:`Herbal, lavender, and sage`,icon:`🌿`},{id:`spicy`,name:`Spicy`,description:`Warm spices and fiery accents`,icon:`🌶`},{id:`musky`,name:`Musky`,description:`Skin-like warmth and intimacy`,icon:`🤍`}],g=[{id:`ysl-libre`,brand:`Yves Saint Laurent`,name:`Libre EDP`,gender:`women`,family:`oriental-fougere`,topNotes:[`lavender`,`mandarin`,`black currant`],middleNotes:[`orange blossom`,`jasmine`],baseNotes:[`vanilla`,`musk`],longevity:8,sillage:7},{id:`ysl-libre-le-parfum`,brand:`Yves Saint Laurent`,name:`Libre Le Parfum`,gender:`women`,family:`oriental-floral`,topNotes:[`bergamot`,`saffron`],middleNotes:[`lavender`,`orange blossom`],baseNotes:[`vetiver`,`tonka`,`vanilla bourbon`],longevity:10,sillage:9},{id:`ysl-libre-absolu-platine`,brand:`Yves Saint Laurent`,name:`Libre L'Absolu Platine`,gender:`women`,family:`floral-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`orange blossom`,`aldehydes`],baseNotes:[`vanilla`,`amber`],longevity:8,sillage:7},{id:`ysl-libre-berry-crush`,brand:`Yves Saint Laurent`,name:`Libre Berry Crush`,gender:`women`,family:`fruity-floral`,topNotes:[`raspberry`],middleNotes:[`orange blossom`,`lavender`],baseNotes:[`vanilla`,`coconut`,`musk`],longevity:7,sillage:6},{id:`ysl-libre-leau-nue`,brand:`Yves Saint Laurent`,name:`Libre L'Eau Nue`,gender:`women`,family:`floral-citrus`,topNotes:[`lemon`,`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`lavender`,`musk`],longevity:4,sillage:3},{id:`ysl-black-opium`,brand:`Yves Saint Laurent`,name:`Black Opium EDP`,gender:`women`,family:`amber-vanilla`,topNotes:[`pear`,`pink pepper`],middleNotes:[`coffee`,`jasmine`,`orange blossom`],baseNotes:[`vanilla`,`cedar`,`patchouli`],longevity:8,sillage:8},{id:`ysl-black-opium-le-parfum`,brand:`Yves Saint Laurent`,name:`Black Opium Le Parfum`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`pear`],middleNotes:[`coffee flower`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`],longevity:9,sillage:9},{id:`ysl-mon-paris`,brand:`Yves Saint Laurent`,name:`Mon Paris EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`strawberry`,`raspberry`,`pear`],middleNotes:[`peony`,`datura`],baseNotes:[`patchouli`,`white musk`],longevity:7,sillage:7},{id:`ysl-myslf`,brand:`Yves Saint Laurent`,name:`MYSLF EDP`,gender:`men`,family:`woody-floral`,topNotes:[`bergamot`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`,`ambrofix`],longevity:7,sillage:6},{id:`ysl-myslf-absolu`,brand:`Yves Saint Laurent`,name:`MYSLF L'Absolu`,gender:`men`,family:`spicy-floral-woody`,topNotes:[`bergamot`,`ginger`,`cardamom`],middleNotes:[`orange blossom`],baseNotes:[`patchouli`],longevity:8,sillage:7},{id:`ysl-y-edp`,brand:`Yves Saint Laurent`,name:`Y EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`ginger`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`tonka`],longevity:7,sillage:6},{id:`ysl-y-le-parfum`,brand:`Yves Saint Laurent`,name:`Y Le Parfum`,gender:`men`,family:`aromatic-amber`,topNotes:[`ginger`,`bergamot`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`amber`,`incense`],longevity:9,sillage:8},{id:`ysl-y-edt`,brand:`Yves Saint Laurent`,name:`Y EDT`,gender:`men`,family:`aromatic-fresh`,topNotes:[`apple`,`ginger`,`bergamot`],middleNotes:[`sage`,`juniper`],baseNotes:[`cedar`,`vetiver`,`olibanum`],longevity:5,sillage:5},{id:`ysl-la-nuit`,brand:`Yves Saint Laurent`,name:`La Nuit de L'Homme EDT`,gender:`men`,family:`spicy-oriental`,topNotes:[`cardamom`,`bergamot`,`lavender`],middleNotes:[`cedar`,`vetiver`],baseNotes:[`coumarin`,`tonka`],longevity:5,sillage:5},{id:`ysl-lhomme`,brand:`Yves Saint Laurent`,name:`L'Homme EDT`,gender:`men`,family:`floral-woody`,topNotes:[`ginger`,`bergamot`],middleNotes:[`white pepper`,`violet leaf`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`ysl-tuxedo`,brand:`Yves Saint Laurent`,name:`Tuxedo (Le Vestiaire)`,gender:`unisex`,family:`spicy-woody`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`black pepper`,`patchouli`],baseNotes:[`cedar`,`incense`,`musk`],longevity:9,sillage:8},{id:`armani-si`,brand:`Giorgio Armani`,name:`Sì EDP`,gender:`women`,family:`chypre-fruity`,topNotes:[`black currant`,`mandarin`],middleNotes:[`may rose`,`neroli`],baseNotes:[`vanilla`,`patchouli`,`amber`],longevity:7,sillage:7},{id:`armani-si-passione`,brand:`Giorgio Armani`,name:`Sì Passione EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`black currant`,`pink pepper`,`pear`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`cedar`,`white musk`],longevity:7,sillage:6},{id:`armani-my-way`,brand:`Giorgio Armani`,name:`My Way EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`cedar`,`vanilla`,`white musk`],longevity:8,sillage:7},{id:`armani-my-way-parfum`,brand:`Giorgio Armani`,name:`My Way Parfum`,gender:`women`,family:`floral-amber`,topNotes:[`bergamot`,`orange blossom`],middleNotes:[`tuberose`,`jasmine`],baseNotes:[`vanilla`,`sandalwood`,`amber`],longevity:9,sillage:8},{id:`armani-power-of-you`,brand:`Giorgio Armani`,name:`Power of You EDP`,gender:`women`,family:`floral-musky`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`jasmine`,`iris`],baseNotes:[`musk`,`cedar`],longevity:7,sillage:6},{id:`armani-acqua-di-gio`,brand:`Giorgio Armani`,name:`Acqua di Giò EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`neroli`,`green mandarin`],middleNotes:[`rosemary`,`jasmine`],baseNotes:[`cedar`,`patchouli`,`white musk`],longevity:4,sillage:4},{id:`armani-acqua-di-gio-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`sea notes`,`green mandarin`],middleNotes:[`sage`,`lavender`],baseNotes:[`mineral`,`vetiver`,`patchouli`],longevity:7,sillage:6},{id:`armani-acqua-di-gio-parfum`,brand:`Giorgio Armani`,name:`Acqua di Giò Parfum`,gender:`men`,family:`woody-aquatic`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`rosemary`,`sage`],baseNotes:[`olibanum`,`patchouli`],longevity:7,sillage:6},{id:`armani-adg-profondo-edp`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDP`,gender:`men`,family:`aquatic-amber`,topNotes:[`bergamot`,`sea notes`,`green mandarin`],middleNotes:[`rosemary`,`lavender`,`cypress`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`armani-adg-profondo-edt`,brand:`Giorgio Armani`,name:`Acqua di Giò Profondo EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rosemary`,`lavender`],baseNotes:[`patchouli`,`amber`],longevity:6,sillage:5},{id:`armani-adg-elixir`,brand:`Giorgio Armani`,name:`Acqua di Giò Elixir`,gender:`men`,family:`aromatic-woody`,topNotes:[`sea notes`,`bergamot`],middleNotes:[`lavender`,`sage`],baseNotes:[`oudh`,`amber`,`patchouli`],longevity:9,sillage:8},{id:`armani-adg-edp-intense`,brand:`Giorgio Armani`,name:`Acqua di Giò EDP Intense`,gender:`men`,family:`aromatic-woody`,topNotes:[`bergamot`,`mandarin`],middleNotes:[`rosemary`,`clary sage`],baseNotes:[`vetiver`,`patchouli`,`incense`],longevity:8,sillage:7},{id:`armani-code-parfum`,brand:`Giorgio Armani`,name:`Armani Code Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`iris`,`bergamot`],middleNotes:[`lavender`,`iris`],baseNotes:[`tonka`,`vanilla`],longevity:8,sillage:8},{id:`armani-code-edt`,brand:`Giorgio Armani`,name:`Armani Code EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`lemon`],middleNotes:[`olive blossom`,`star anise`],baseNotes:[`guaiac wood`,`tonka`],longevity:5,sillage:5},{id:`armani-stronger-with-you`,brand:`Giorgio Armani`,name:`Stronger With You Intensely`,gender:`men`,family:`amber-vanilla`,topNotes:[`pink pepper`,`violet leaf`],middleNotes:[`chestnut`,`cinnamon`],baseNotes:[`vanilla`,`amber`,`suede`],longevity:9,sillage:8},{id:`armani-prive-rose-arabie`,brand:`Giorgio Armani`,name:`Privé Rose d'Arabie`,gender:`unisex`,family:`oriental-rose`,topNotes:[`rose`,`saffron`],middleNotes:[`oud`,`papyrus`],baseNotes:[`amber`,`musk`],longevity:10,sillage:9},{id:`armani-prive-vert-malachite`,brand:`Giorgio Armani`,name:`Privé Vert Malachite`,gender:`unisex`,family:`green-floral`,topNotes:[`mandarin`,`jasmine`],middleNotes:[`tuberose`,`ylang ylang`],baseNotes:[`wood`,`vanilla`],longevity:8,sillage:7},{id:`armani-prive-rouge-malachite`,brand:`Giorgio Armani`,name:`Privé Rouge Malachite`,gender:`unisex`,family:`spicy-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`clove`,`cinnamon`],baseNotes:[`amber`,`oud`,`benzoin`],longevity:10,sillage:9},{id:`armani-prive-musc-shamal`,brand:`Giorgio Armani`,name:`Privé Musc Shamal`,gender:`unisex`,family:`musky-amber`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`oud`,`rose`],baseNotes:[`musk`,`amber`,`sandalwood`],longevity:10,sillage:9},{id:`armani-prive-blanc-kogane`,brand:`Giorgio Armani`,name:`Privé Blanc Kogane`,gender:`unisex`,family:`white-floral`,topNotes:[`bergamot`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`sandalwood`,`white musk`],longevity:8,sillage:7},{id:`lancome-la-vie-est-belle`,brand:`Lancôme`,name:`La Vie Est Belle EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`pear`],middleNotes:[`iris`,`jasmine`,`orange blossom`],baseNotes:[`praline`,`vanilla`,`patchouli`],longevity:8,sillage:7},{id:`lancome-la-vie-intensement`,brand:`Lancôme`,name:`La Vie Est Belle Intensément`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`red currant`],middleNotes:[`jasmine sambac`,`orange blossom`],baseNotes:[`red sandalwood`,`vanilla`],longevity:8,sillage:8},{id:`lancome-la-vie-elixir`,brand:`Lancôme`,name:`La Vie Est Belle L'Elixir`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`iris`,`jasmine`],baseNotes:[`vanilla`,`praline`,`patchouli`],longevity:9,sillage:8},{id:`lancome-la-vie-iris-absolu`,brand:`Lancôme`,name:`La Vie Est Belle Iris Absolu`,gender:`women`,family:`floral-powdery`,topNotes:[`bergamot`,`pear`],middleNotes:[`iris`,`rose`],baseNotes:[`musk`,`patchouli`],longevity:7,sillage:6},{id:`lancome-la-vie-rose`,brand:`Lancôme`,name:`La Vie Est Belle Rose Extraordinaire`,gender:`women`,family:`floral-rose`,topNotes:[`mandarin`,`bergamot`],middleNotes:[`rose`,`peony`],baseNotes:[`musk`,`patchouli`,`vanilla`],longevity:7,sillage:6},{id:`lancome-la-vie-vanille-nude`,brand:`Lancôme`,name:`La Vie Est Belle Vanille Nude`,gender:`women`,family:`vanilla-gourmand`,topNotes:[`pear`,`bergamot`],middleNotes:[`iris`],baseNotes:[`vanilla`,`musk`],longevity:7,sillage:6},{id:`lancome-la-vie-soleil`,brand:`Lancôme`,name:`La Vie Est Belle Soleil Cristal`,gender:`women`,family:`floral-solar`,topNotes:[`coconut`,`citrus`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`musk`,`vanilla`],longevity:6,sillage:5},{id:`lancome-idole`,brand:`Lancôme`,name:`Idôle EDP`,gender:`women`,family:`floral-chypre`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`rose`,`jasmine`],baseNotes:[`vanilla`,`white musk`,`cedar`],longevity:7,sillage:6},{id:`lancome-tresor`,brand:`Lancôme`,name:`Trésor EDP`,gender:`women`,family:`oriental-floral`,topNotes:[`rose`,`lilac`,`peach`],middleNotes:[`iris`,`rose`,`muguet`],baseNotes:[`sandalwood`,`amber`,`musk`,`vanilla`],longevity:7,sillage:6},{id:`prada-paradoxe`,brand:`Prada`,name:`Paradoxe EDP`,gender:`women`,family:`floral-amber`,topNotes:[`neroli bud`],middleNotes:[`jasmine`,`orange blossom`],baseNotes:[`ambrofix`,`musk`],longevity:8,sillage:7},{id:`prada-paradoxe-intense`,brand:`Prada`,name:`Paradoxe Intense`,gender:`women`,family:`floral-amber-vanilla`,topNotes:[`bergamot`,`neroli`,`pear`],middleNotes:[`jasmine`,`moss`],baseNotes:[`ambrofix`,`vanilla bourbon`],longevity:9,sillage:8},{id:`prada-paradoxe-virtual-flower`,brand:`Prada`,name:`Paradoxe Virtual Flower`,gender:`women`,family:`floral-green`,topNotes:[`bergamot`,`green notes`],middleNotes:[`jasmine`,`peony`],baseNotes:[`musk`,`ambrofix`],longevity:6,sillage:5},{id:`prada-paradoxe-radical-essence`,brand:`Prada`,name:`Paradoxe Radical Essence`,gender:`women`,family:`floral-woody`,topNotes:[`neroli`,`bergamot`],middleNotes:[`jasmine`,`iris`],baseNotes:[`cedar`,`ambrofix`,`musk`],longevity:7,sillage:6},{id:`prada-candy`,brand:`Prada`,name:`Candy EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`caramel`],middleNotes:[`musk`,`almond`],baseNotes:[`vanilla`,`benzoin`],longevity:7,sillage:6},{id:`prada-la-femme`,brand:`Prada`,name:`La Femme Prada`,gender:`women`,family:`floral-chypre`,topNotes:[`mandarin`,`frangipani`],middleNotes:[`tuberose`,`ylang ylang`,`jasmine`],baseNotes:[`vetiver`,`vanilla`,`beeswax`],longevity:7,sillage:6},{id:`prada-infusion-iris`,brand:`Prada`,name:`Infusion d'Iris EDP`,gender:`women`,family:`floral-powdery`,topNotes:[`mandarin`,`orange`],middleNotes:[`iris`,`incense`],baseNotes:[`vetiver`,`cedar`,`benzoin`],longevity:6,sillage:5},{id:`prada-luna-rossa-edt`,brand:`Prada`,name:`Luna Rossa EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`lavender`,`bitter orange`],middleNotes:[`clary sage`,`spearmint`],baseNotes:[`ambroxan`],longevity:5,sillage:5},{id:`prada-luna-rossa-carbon`,brand:`Prada`,name:`Luna Rossa Carbon EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`pepper`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`],longevity:7,sillage:6},{id:`prada-luna-rossa-carbon-edp`,brand:`Prada`,name:`Luna Rossa Carbon EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`,`dry amber`],middleNotes:[`lavender`,`metallic notes`],baseNotes:[`ambroxan`,`patchouli`,`cedar`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-edt`,brand:`Prada`,name:`Luna Rossa Ocean EDT`,gender:`men`,family:`aromatic-aquatic`,topNotes:[`bergamot`,`pink pepper`],middleNotes:[`lavender`,`cashmere wood`],baseNotes:[`patchouli`,`musk`],longevity:6,sillage:5},{id:`prada-luna-rossa-ocean-edp`,brand:`Prada`,name:`Luna Rossa Ocean EDP`,gender:`men`,family:`aromatic-fougere`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`patchouli`,`musk`],longevity:8,sillage:7},{id:`prada-luna-rossa-ocean-le-parfum`,brand:`Prada`,name:`Luna Rossa Ocean Le Parfum`,gender:`men`,family:`amber-aromatic`,topNotes:[`bergamot`],middleNotes:[`lavender`,`iris`,`saffron`],baseNotes:[`amber`,`oud`,`patchouli`],longevity:9,sillage:8},{id:`prada-luna-rossa-black`,brand:`Prada`,name:`Luna Rossa Black`,gender:`men`,family:`amber-fougere`,topNotes:[`bergamot`,`angelica`],middleNotes:[`coumarin`,`patchouli`],baseNotes:[`amber`,`sandalwood`],longevity:8,sillage:7},{id:`prada-lhomme`,brand:`Prada`,name:`L'Homme Prada EDT`,gender:`men`,family:`amber-fougere`,topNotes:[`iris`,`neroli`],middleNotes:[`amber`,`patchouli`],baseNotes:[`cedar`,`sandalwood`],longevity:6,sillage:5},{id:`prada-paradigme`,brand:`Prada`,name:`Paradigme EDP`,gender:`men`,family:`amber-woody`,topNotes:[`citrus`,`amber`],middleNotes:[`floral`,`soapy accord`],baseNotes:[`vanilla`,`balsam`,`woody`],longevity:8,sillage:7},{id:`valentino-donna-born-in-roma`,brand:`Valentino`,name:`Donna Born in Roma EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`black currant`,`bergamot`,`pink pepper`],middleNotes:[`jasmine sambac`,`jasmine grandiflorum`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:7,sillage:7},{id:`valentino-donna-intense`,brand:`Valentino`,name:`Born in Roma Donna Intense`,gender:`women`,family:`floral-amber`,topNotes:[`black currant`,`raspberry`],middleNotes:[`jasmine`,`tuberose`],baseNotes:[`vanilla`,`amber`,`sandalwood`],longevity:8,sillage:8},{id:`valentino-donna-extradose`,brand:`Valentino`,name:`Born in Roma Donna Extradose`,gender:`women`,family:`floral-gourmand`,topNotes:[`black currant`,`bergamot`],middleNotes:[`jasmine sambac`,`osmanthus`],baseNotes:[`vanilla`,`tonka`],longevity:8,sillage:7},{id:`valentino-donna-purple-mel`,brand:`Valentino`,name:`Born in Roma Purple Melancholia Donna`,gender:`women`,family:`floral-leather`,topNotes:[`bergamot`],middleNotes:[`jasmine`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`cashmere wood`],longevity:8,sillage:7},{id:`valentino-uomo`,brand:`Valentino`,name:`Uomo Born in Roma EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`mineral salt`,`ginger`],middleNotes:[`sage`,`lavender`],baseNotes:[`vetiver`,`cashmere wood`],longevity:7,sillage:6},{id:`valentino-uomo-intense`,brand:`Valentino`,name:`Uomo Born in Roma Intense`,gender:`men`,family:`oriental-vanilla`,topNotes:[`lavender`],middleNotes:[`vetiver`,`iris`],baseNotes:[`vanilla`,`tonka`],longevity:9,sillage:8},{id:`valentino-uomo-coral`,brand:`Valentino`,name:`Uomo Born in Roma Coral Fantasy`,gender:`men`,family:`aromatic-woody`,topNotes:[`grapefruit`,`basil`],middleNotes:[`sage`,`geranium`],baseNotes:[`vetiver`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-extradose`,brand:`Valentino`,name:`Uomo Born in Roma Extradose`,gender:`men`,family:`oriental-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`vetiver`],baseNotes:[`vanilla`,`amber`,`tonka`],longevity:8,sillage:7},{id:`valentino-uomo-ivory`,brand:`Valentino`,name:`Uomo Born in Roma Ivory`,gender:`men`,family:`aromatic-fresh`,topNotes:[`bergamot`,`lavender`],middleNotes:[`sage`,`iris`],baseNotes:[`musk`,`cedar`],longevity:6,sillage:5},{id:`valentino-uomo-purple-mel`,brand:`Valentino`,name:`Uomo Born in Roma Purple Melancholia`,gender:`men`,family:`oriental-leather`,topNotes:[`bergamot`,`lavender`],middleNotes:[`iris`,`violet leaf`],baseNotes:[`leather`,`vanilla`,`oud`],longevity:9,sillage:8},{id:`valentino-anatomy-dreams`,brand:`Valentino`,name:`Anatomy of Dreams Collection`,gender:`unisex`,family:`niche-various`,topNotes:[`artistic notes`],middleNotes:[`rare ingredients`],baseNotes:[`premium woods`],longevity:8,sillage:7},{id:`mugler-angel`,brand:`Mugler`,name:`Angel EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`bergamot`,`coconut`,`pineapple`],middleNotes:[`honey`,`chocolate`,`caramel`],baseNotes:[`patchouli`,`vanilla`,`tonka`],longevity:10,sillage:9},{id:`mugler-angel-nova`,brand:`Mugler`,name:`Angel Nova EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`lychee`],middleNotes:[`damask rose`,`peony`],baseNotes:[`akigalawood`,`benzoin`],longevity:8,sillage:7},{id:`mugler-alien`,brand:`Mugler`,name:`Alien EDP`,gender:`women`,family:`woody-solar`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`],baseNotes:[`white amber`],longevity:10,sillage:9},{id:`mugler-alien-goddess`,brand:`Mugler`,name:`Alien Goddess EDP`,gender:`women`,family:`floral-woody`,topNotes:[`bergamot`,`coconut water`],middleNotes:[`jasmine`,`heliotrope`],baseNotes:[`vanilla bourbon`,`cashmere wood`],longevity:8,sillage:7},{id:`mugler-alien-hypersense`,brand:`Mugler`,name:`Alien Hypersense EDP`,gender:`women`,family:`floral-solar`,topNotes:[`ylang ylang`],middleNotes:[`jasmine sambac`,`tuberose`],baseNotes:[`cashmere wood`,`white amber`],longevity:8,sillage:8},{id:`mugler-alien-supra-florale`,brand:`Mugler`,name:`Alien Supra Florale`,gender:`women`,family:`white-floral`,topNotes:[`jasmine`,`tuberose`],middleNotes:[`orange blossom`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-alien-extraintense`,brand:`Mugler`,name:`Alien Extraintense`,gender:`women`,family:`amber-woody`,topNotes:[`jasmine sambac`],middleNotes:[`cashmere wood`,`vanilla`],baseNotes:[`white amber`,`benzoin`],longevity:10,sillage:9},{id:`mugler-alien-pulp`,brand:`Mugler`,name:`Alien Pulp`,gender:`women`,family:`fruity-floral`,topNotes:[`pear`,`passion fruit`],middleNotes:[`jasmine`,`peony`],baseNotes:[`cashmere wood`,`musk`],longevity:7,sillage:6},{id:`mugler-amen`,brand:`Mugler`,name:`A*Men EDT`,gender:`men`,family:`oriental-woody`,topNotes:[`mint`,`lavender`,`bergamot`],middleNotes:[`coffee`,`tar`],baseNotes:[`tonka`,`patchouli`,`vanilla`,`caramel`],longevity:8,sillage:7},{id:`mugler-alien-man`,brand:`Mugler`,name:`Alien Man EDT`,gender:`men`,family:`amber-woody`,topNotes:[`white osmanthus`],middleNotes:[`leather`,`smoked beechwood`],baseNotes:[`cashmere wood`,`amber`],longevity:6,sillage:5},{id:`vr-flowerbomb`,brand:`Viktor & Rolf`,name:`Flowerbomb EDP`,gender:`women`,family:`floral-oriental`,topNotes:[`tea`,`bergamot`],middleNotes:[`sambac jasmine`,`rose`,`orchid`],baseNotes:[`patchouli`,`musk`,`amber`],longevity:8,sillage:7},{id:`vr-flowerbomb-ruby`,brand:`Viktor & Rolf`,name:`Flowerbomb Ruby Orchid`,gender:`women`,family:`floral-gourmand`,topNotes:[`raspberry`,`saffron`],middleNotes:[`orchid`,`vanilla`],baseNotes:[`sandalwood`,`musk`],longevity:8,sillage:7},{id:`vr-flowerbomb-extreme-2025`,brand:`Viktor & Rolf`,name:`Flowerbomb Extreme 2025`,gender:`women`,family:`floral-oriental`,topNotes:[`rose`,`bergamot`],middleNotes:[`jasmine`,`orchid`,`orange blossom`],baseNotes:[`patchouli`,`tonka`,`vanilla`],longevity:9,sillage:8},{id:`vr-good-fortune`,brand:`Viktor & Rolf`,name:`Good Fortune EDP`,gender:`women`,family:`oriental-gourmand`,topNotes:[`jasmine`],middleNotes:[`vanilla`],baseNotes:[`amber`,`vetiver`,`crème brûlée`],longevity:8,sillage:7},{id:`vr-bonbon`,brand:`Viktor & Rolf`,name:`Bonbon EDP`,gender:`women`,family:`gourmand-fruity`,topNotes:[`mandarin`,`peach`],middleNotes:[`caramel`,`orange blossom`],baseNotes:[`cedar`,`guaiac wood`,`sandalwood`],longevity:7,sillage:6},{id:`vr-spicebomb`,brand:`Viktor & Rolf`,name:`Spicebomb EDT`,gender:`men`,family:`oriental-spicy`,topNotes:[`bergamot`,`grapefruit`,`pink pepper`],middleNotes:[`cinnamon`,`saffron`],baseNotes:[`tobacco`,`vetiver`,`leather`],longevity:7,sillage:7},{id:`vr-spicebomb-extreme`,brand:`Viktor & Rolf`,name:`Spicebomb Extreme EDP`,gender:`men`,family:`oriental-spicy`,topNotes:[`black pepper`,`saffron`],middleNotes:[`lavender`,`cinnamon`],baseNotes:[`tonka`,`tobacco`,`amber`],longevity:9,sillage:9},{id:`vr-spicebomb-night-vision`,brand:`Viktor & Rolf`,name:`Spicebomb Night Vision EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`clary sage`,`grapefruit`],middleNotes:[`cinnamon`,`green cardamom`],baseNotes:[`benzoin`,`tobacco`],longevity:7,sillage:6},{id:`vr-spicebomb-dark-leather`,brand:`Viktor & Rolf`,name:`Spicebomb Dark Leather EDP`,gender:`men`,family:`leather-spicy`,topNotes:[`saffron`,`pink pepper`],middleNotes:[`leather`,`cinnamon`],baseNotes:[`tonka`,`benzoin`],longevity:9,sillage:8},{id:`vr-spicebomb-metallic-musk`,brand:`Viktor & Rolf`,name:`Spicebomb Metallic Musk EDP`,gender:`men`,family:`musky-spicy`,topNotes:[`pink pepper`,`bergamot`],middleNotes:[`musk`,`lavender`],baseNotes:[`amber`,`cedar`],longevity:7,sillage:6},{id:`azzaro-wanted`,brand:`Azzaro`,name:`Azzaro Wanted EDT`,gender:`men`,family:`spicy-woody`,topNotes:[`lemon`,`ginger`,`mint`],middleNotes:[`cardamom`,`juniper`],baseNotes:[`vetiver`,`tonka`],longevity:5,sillage:5},{id:`azzaro-most-wanted`,brand:`Azzaro`,name:`The Most Wanted EDP`,gender:`men`,family:`amber-spicy`,topNotes:[`cardamom`,`toffee`],middleNotes:[`lavender`,`iris`],baseNotes:[`amber wood`,`woody notes`],longevity:8,sillage:7},{id:`azzaro-most-wanted-parfum`,brand:`Azzaro`,name:`The Most Wanted Parfum`,gender:`men`,family:`amber-vanilla`,topNotes:[`cardamom`,`fig`],middleNotes:[`amber`,`lavender`],baseNotes:[`vanilla`,`tonka`],longevity:10,sillage:9},{id:`azzaro-chrome`,brand:`Azzaro`,name:`Azzaro Chrome EDT`,gender:`men`,family:`citrus-aquatic`,topNotes:[`lemon`,`neroli`,`rosemary`],middleNotes:[`cyclamen`,`jasmine`],baseNotes:[`musk`,`oakmoss`,`cedar`],longevity:5,sillage:4},{id:`mm-by-the-fireplace`,brand:`Maison Margiela`,name:`By the Fireplace`,gender:`unisex`,family:`woody-spicy`,topNotes:[`clove oil`,`pink pepper`],middleNotes:[`chestnut`,`guaiac wood`],baseNotes:[`vanilla`,`peru balsam`,`cashmere wood`],longevity:7,sillage:6},{id:`mm-jazz-club`,brand:`Maison Margiela`,name:`Jazz Club`,gender:`unisex`,family:`aromatic-fougere`,topNotes:[`pink pepper`,`neroli`,`lemon`],middleNotes:[`rose`,`sage`],baseNotes:[`tobacco`,`vanilla`,`styrax`],longevity:7,sillage:5},{id:`mm-lazy-sunday`,brand:`Maison Margiela`,name:`Lazy Sunday Morning`,gender:`unisex`,family:`floral-musky`,topNotes:[`muguet`,`pear`,`aldehydes`],middleNotes:[`iris`,`rose`,`orange blossom`],baseNotes:[`white musk`,`patchouli`],longevity:5,sillage:4},{id:`mm-beach-walk`,brand:`Maison Margiela`,name:`Beach Walk`,gender:`unisex`,family:`floral-aquatic`,topNotes:[`bergamot`,`lemon`,`pink pepper`],middleNotes:[`ylang ylang`,`coconut milk`],baseNotes:[`musk`,`cedar`,`benzoin`],longevity:5,sillage:4},{id:`mm-whispers`,brand:`Maison Margiela`,name:`Whispers in the Library`,gender:`unisex`,family:`woody-spicy`,topNotes:[`pepper`],middleNotes:[`vanilla`,`cedar`],baseNotes:[`benzoin`,`musk`],longevity:7,sillage:5},{id:`mm-across-sands`,brand:`Maison Margiela`,name:`Across Sands`,gender:`unisex`,family:`oriental-amber`,topNotes:[`saffron`,`bergamot`],middleNotes:[`rose`,`amber`],baseNotes:[`oud`,`vanilla`],longevity:8,sillage:8},{id:`mm-on-a-date`,brand:`Maison Margiela`,name:`On a Date`,gender:`unisex`,family:`gourmand-floral`,topNotes:[`pear`],middleNotes:[`rose`,`iris`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`mm-flying`,brand:`Maison Margiela`,name:`Flying`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`citrus`],middleNotes:[`aromatic notes`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`mm-soul-of-forest`,brand:`Maison Margiela`,name:`Soul of the Forest`,gender:`unisex`,family:`woody-green`,topNotes:[`green notes`],middleNotes:[`mushroom`,`woody notes`],baseNotes:[`cedar`,`musk`],longevity:5,sillage:5},{id:`rl-polo-blue-edt`,brand:`Ralph Lauren`,name:`Polo Blue EDT`,gender:`men`,family:`aromatic-fougere`,topNotes:[`melon`,`cucumber`],middleNotes:[`sage`,`basil`],baseNotes:[`suede`,`musk`,`woody notes`],longevity:5,sillage:5},{id:`rl-polo-blue`,brand:`Ralph Lauren`,name:`Polo Blue EDP`,gender:`men`,family:`citrus-woody`,topNotes:[`bergamot`,`salt notes`],middleNotes:[`cardamom`,`sage`],baseNotes:[`patchouli`,`vetiver`,`suede`],longevity:7,sillage:6},{id:`rl-polo-red`,brand:`Ralph Lauren`,name:`Polo Red EDT`,gender:`men`,family:`aromatic-spicy`,topNotes:[`grapefruit`,`cranberry`],middleNotes:[`sage`,`amber wood`],baseNotes:[`cedar`,`coffee`],longevity:5,sillage:5},{id:`rl-ralphs-club`,brand:`Ralph Lauren`,name:`Ralph's Club EDP`,gender:`men`,family:`woody-aromatic`,topNotes:[`lavender`,`apple`],middleNotes:[`sage`,`geranium`],baseNotes:[`cedar`,`vetiver`,`musk`],longevity:7,sillage:6},{id:`rl-ralphs-club-parfum`,brand:`Ralph Lauren`,name:`Ralph's Club Parfum`,gender:`men`,family:`woody-amber`,topNotes:[`lavender`,`bergamot`],middleNotes:[`tonka bean`,`iris`],baseNotes:[`cedar`,`vanilla`,`sandalwood`],longevity:9,sillage:8},{id:`rl-beyond-romance`,brand:`Ralph Lauren`,name:`Beyond Romance EDP`,gender:`women`,family:`floral-fruity`,topNotes:[`raspberry`,`damask rose`],middleNotes:[`jasmine`,`iris`],baseNotes:[`vanilla`,`cashmere wood`],longevity:7,sillage:6},{id:`cacharel-yes-i-am`,brand:`Cacharel`,name:`Yes I Am EDP`,gender:`women`,family:`floral-gourmand`,topNotes:[`peach`,`red currant`],middleNotes:[`rose`,`iris`],baseNotes:[`vanilla`,`caramel`,`cedar`],longevity:5,sillage:5},{id:`cacharel-anais-anais`,brand:`Cacharel`,name:`Anaïs Anaïs L'Original EDT`,gender:`women`,family:`floral-white`,topNotes:[`hyacinth`,`muguet`],middleNotes:[`jasmine`,`ylang ylang`,`iris`],baseNotes:[`sandalwood`,`vetiver`,`musk`],longevity:5,sillage:4},{id:`cacharel-amor-amor`,brand:`Cacharel`,name:`Amor Amor EDT`,gender:`women`,family:`floral-fruity`,topNotes:[`grapefruit`,`blood orange`,`mandarin`],middleNotes:[`jasmine`,`lily`,`rose`],baseNotes:[`vanilla`,`amber`,`musk`],longevity:5,sillage:5},{id:`diesel-d`,brand:`Diesel`,name:`Diesel D EDT`,gender:`men`,family:`fresh-woody`,topNotes:[`lavender`,`bergamot`],middleNotes:[`denim accord`],baseNotes:[`musk`,`vanilla`],longevity:5,sillage:5},{id:`diesel-only-the-brave`,brand:`Diesel`,name:`Only The Brave EDT`,gender:`men`,family:`woody-spicy`,topNotes:[`lemon`,`mandarin`,`parsley`],middleNotes:[`coriander`,`violet leaf`],baseNotes:[`amber`,`cedar`,`styrax`],longevity:5,sillage:5},{id:`miu-miu-miutine`,brand:`Miu Miu`,name:`Miutine EDP`,gender:`women`,family:`floral`,topNotes:[`muguet`],middleNotes:[`floral notes`],baseNotes:[`musk`,`amber`],longevity:7,sillage:5},{id:`aesop-hwyl`,brand:`Aesop`,name:`Hwyl EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`cypress`],middleNotes:[`vetiver`,`incense`],baseNotes:[`moss`],longevity:7,sillage:5},{id:`aesop-marrakech`,brand:`Aesop`,name:`Marrakech Intense EDT`,gender:`unisex`,family:`spicy-floral`,topNotes:[`neroli`],middleNotes:[`rose`,`cardamom`],baseNotes:[`sandalwood`,`cedar`],longevity:5,sillage:4},{id:`aesop-rozu`,brand:`Aesop`,name:`Rozu EDP`,gender:`unisex`,family:`floral-green`,topNotes:[`guaiac wood`],middleNotes:[`shiso`,`rose`],baseNotes:[`vetiver`,`patchouli`],longevity:5,sillage:4},{id:`aesop-karst`,brand:`Aesop`,name:`Karst EDP`,gender:`unisex`,family:`woody-aromatic`,topNotes:[`florentine iris`],middleNotes:[`smoked vetiver`],baseNotes:[`smoky cedar`],longevity:7,sillage:5},{id:`aesop-miraceti`,brand:`Aesop`,name:`Miraceti EDP`,gender:`unisex`,family:`musky-amber`,topNotes:[`labdanum`],middleNotes:[`musk`],baseNotes:[`ambrette`],longevity:7,sillage:5},{id:`aesop-eidesis`,brand:`Aesop`,name:`Eidesis EDP`,gender:`unisex`,family:`floral-musky`,topNotes:[`jasmine`],middleNotes:[`orange blossom`],baseNotes:[`musk`],longevity:5,sillage:4},{id:`ac-clementine-california`,brand:`Atelier Cologne`,name:`Clémentine California`,gender:`unisex`,family:`citrus-aromatic`,topNotes:[`clementine`,`red pepper`],middleNotes:[`juniper berry`],baseNotes:[`vetiver`,`sandalwood`],longevity:5,sillage:5},{id:`ac-orange-sanguine`,brand:`Atelier Cologne`,name:`Orange Sanguine`,gender:`unisex`,family:`citrus`,topNotes:[`blood orange`],middleNotes:[`jasmine`],baseNotes:[`tonka bean`,`sandalwood`],longevity:4,sillage:3},{id:`ac-vanille-insensee`,brand:`Atelier Cologne`,name:`Vanille Insensée`,gender:`unisex`,family:`vanilla-woody`,topNotes:[`lemon`],middleNotes:[`vanilla`],baseNotes:[`oak moss`,`amber`],longevity:5,sillage:5}],_=[{id:`cf-1`,name:`Midnight Silk Road`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:3,unit:`drops`}],context:`evening`,likes:234,saves:89,tags:[`evening`,`date-night`,`warm`],description:`A mysterious East-meets-East blend. Oud and saffron from the Middle East intertwined with the contemplative incense of East Asian temples.`},{id:`cf-2`,name:`Golden Hour`,authorProfile:`fresh-citrus`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:187,saves:72,tags:[`summer`,`casual`,`warm`],description:`Sun-kissed Mediterranean citrus anchored by the warm vanilla-coffee richness of South Africa. Like a golden sunset over the Cape.`},{id:`cf-3`,name:`Forest Ceremony`,authorProfile:`woody-green`,layers:[{perfumeId:`scandinavian-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`},{perfumeId:`eastasia-oil`,amount:1,unit:`drops`}],context:`office`,likes:156,saves:64,tags:[`office`,`sophisticated`,`green`],description:`Nordic freshness layered over Amazonian depth with a whisper of Japanese hinoki. A global forest walk in three layers.`},{id:`cf-4`,name:`Velvet Rose`,authorProfile:`floral-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`mediterranean-spray`,amount:2,unit:`sprays`}],context:`evening`,likes:312,saves:128,tags:[`romantic`,`elegant`,`evening`],description:`The opulent rose and oud of the Middle East lightened by Mediterranean citrus and fig. Elegance without heaviness.`},{id:`cf-5`,name:`Cocoa Cloud`,authorProfile:`gourmand-lover`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:3,unit:`drops`}],context:`weekend`,likes:198,saves:85,tags:[`cozy`,`winter`,`gourmand`],description:`A dessert-like warmth — tropical cocoa and palo santo fused with South African vanilla and coffee absolute. Comfort in a bottle.`},{id:`cf-6`,name:`Zen Garden`,authorProfile:`fresh-clean`,layers:[{perfumeId:`eastasia-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:2,unit:`drops`}],context:`meditation`,likes:145,saves:67,tags:[`calm`,`clean`,`daytime`],description:`Sakura and green tea floating above a crystalline Nordic base. Serene minimalism for moments of mindfulness.`},{id:`cf-7`,name:`Saharan Night`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-oil`,amount:1,unit:`drops`}],context:`evening`,likes:276,saves:112,tags:[`bold`,`evening`,`statement`],description:`A commanding nighttime blend — Arabian oud intensified by African coffee-vanilla and a drop of South American tonka. Not for the faint-hearted.`},{id:`cf-8`,name:`Azure Morning`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`mediterranean-spray`,amount:3,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`morning`,likes:203,saves:91,tags:[`morning`,`fresh`,`office`],description:`Bright Mediterranean citrus with a cool Scandinavian mineral finish. Like diving into the Aegean Sea at dawn.`},{id:`cf-9`,name:`Imperial Garden`,authorProfile:`floral-green`,layers:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`},{perfumeId:`mediterranean-oil`,amount:1,unit:`drops`}],context:`special-occasion`,likes:167,saves:73,tags:[`elegant`,`special`,`floral`],description:`East Asian florals crowned with a touch of Middle Eastern oud and Mediterranean neroli. A garden fit for royalty.`},{id:`cf-10`,name:`Safari Dawn`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`adventure`,likes:134,saves:56,tags:[`adventure`,`daytime`,`warm`],description:`The wild warmth of the African savanna softened by Mediterranean olive blossom and fig. For the modern explorer.`},{id:`cf-11`,name:`Spice Bazaar`,authorProfile:`oriental-lover`,layers:[{perfumeId:`middleeast-spray`,amount:2,unit:`sprays`},{perfumeId:`southamerica-oil`,amount:2,unit:`drops`}],context:`evening`,likes:189,saves:78,tags:[`bold`,`evening`,`spicy`],description:`Arabian saffron meets Amazonian tonka and dark chocolate. A walk through a moonlit spice market.`},{id:`cf-12`,name:`Nordic Bloom`,authorProfile:`floral-green`,layers:[{perfumeId:`scandinavian-spray`,amount:3,unit:`sprays`},{perfumeId:`eastasia-oil`,amount:2,unit:`drops`}],context:`daytime`,likes:162,saves:61,tags:[`spring`,`fresh`,`floral`],description:`Crisp birch and juniper lifted by cherry blossom and yuzu. Scandinavian clarity with Japanese elegance.`},{id:`cf-13`,name:`Cape Sunset`,authorProfile:`earthy-warm`,layers:[{perfumeId:`southafrica-spray`,amount:3,unit:`sprays`},{perfumeId:`middleeast-oil`,amount:1,unit:`drops`}],context:`weekend`,likes:147,saves:59,tags:[`weekend`,`warm`,`rich`],description:`South African rooibos warmth deepened by a single drop of Arabian oud. Bold yet comforting.`},{id:`cf-14`,name:`Tropical Breeze`,authorProfile:`citrus-aquatic`,layers:[{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],context:`summer`,likes:173,saves:68,tags:[`summer`,`casual`,`tropical`],description:`Amazonian green notes and palo santo with Mediterranean neroli and fig. A sun-drenched tropical getaway.`},{id:`cf-15`,name:`Amber Veil`,authorProfile:`warm-oriental`,layers:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],context:`evening`,likes:215,saves:94,tags:[`evening`,`sophisticated`,`warm`],description:`Arabian amber and rose oil layered with South American tonka, finished with a cool Nordic touch. Mysterious elegance.`}],v=[{id:`warm-oriental`,name:`Warm Oriental`,description:`Rich, spice-laden warmth with amber and resinous depth`,families:[`oriental`,`spicy`,`gourmand`]},{id:`fresh-aquatic`,name:`Fresh Aquatic`,description:`Clean, crisp, and invigorating like ocean air`,families:[`fresh`,`citrus`,`aromatic`]},{id:`floral-romantic`,name:`Floral Romantic`,description:`Lush blooms, soft petals, and romantic elegance`,families:[`floral`,`musky`]},{id:`woody-earthy`,name:`Woody Earthy`,description:`Grounded in nature — forests, earth, and bark`,families:[`woody`,`green`,`aromatic`]},{id:`citrus-bright`,name:`Citrus Bright`,description:`Zesty, luminous, and energizing sunshine`,families:[`citrus`,`fresh`,`green`]},{id:`gourmand-cozy`,name:`Gourmand Cozy`,description:`Edible comfort — vanilla, cocoa, and sweet warmth`,families:[`gourmand`,`oriental`]}];function y(e){return m.find(t=>t.id===e)}function b(e,t){let n=!!d.getProfile();e.innerHTML=`
    <!-- HERO -->
    <section class="hero" id="hero-section">
      <div class="hero__bg">
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__orb hero__orb--3"></div>
        <div class="hero__orb hero__orb--4"></div>
        <div class="hero__orb hero__orb--5"></div>
        <div class="hero__orb hero__orb--6"></div>
      </div>
      <div class="hero__content">
        <h1 class="hero__title" id="hero-title">
          <span class="hero__title-line">Build Your</span>
          <span class="hero__title-line hero__title-accent">Signature.</span>
        </h1>
        <p class="hero__subtitle">
          Discover the art of fragrance layering with six world regions.<br>
          Create your unique olfactory identity.
        </p>
        <div class="hero__actions">
          <button class="btn btn--primary btn--lg" id="hero-cta">
            ${n?`Enter the Lab`:`Begin Your Journey`}
          </button>
          <!-- Watch Demo moved to Settings -->
        </div>
      </div>
      <div class="hero__scroll-hint" id="scroll-hint">
        <span>Discover</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    <!-- REGIONS -->
    <section class="landing-regions" id="regions-section">
      <div class="page__container">
        <div class="section-header">
          <p class="section-label">The Collection</p>
          <h2 class="section-title">Six Regions, One Language</h2>
          <p class="section-subtitle">Each region carries centuries of olfactory tradition — distilled into spray and oil formats for infinite layering.</p>
        </div>
        <div class="regions-grid" id="regions-grid">
          ${p.map((e,t)=>{let n=m.find(t=>t.region===e.id&&t.format===`spray`),r=m.find(t=>t.region===e.id&&t.format===`oil`),i=x(e.color);return`
              <div class="region-card" data-region="${e.id}" id="region-card-${e.id}" style="--delay: ${t*.1}s; --region-color: ${e.color}; --region-light: ${e.colorLight};">
                <div class="region-card__orb">${e.icon}</div>
                <h3 class="region-card__name">${e.name}</h3>
                <p class="region-card__tagline">${e.tagline}</p>
                <p class="region-card__description">${e.description}</p>
                <div class="region-card__formats">
                  ${n?`<button class="region-format-btn" data-region="${e.id}" data-format="spray" style="--rc: ${e.color}; --rc-rgb: ${i};">💨 Spray</button>`:``}
                  ${r?`<button class="region-format-btn" data-region="${e.id}" data-format="oil"   style="--rc: ${e.color}; --rc-rgb: ${i};">💧 Oil</button>`:``}
                </div>
              </div>
            `}).join(``)}
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
              <h3 class="how-step__title">Discover Your Profile</h3>
              <p class="how-step__text">Our AI analyzes your scent preferences, experience, and lifestyle to create your unique olfactory archetype.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-2">
            <div class="how-step__number">02</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Explore & Layer</h3>
              <p class="how-step__text">Combine sprays and oils from different regions. Our AI simulates the scent and guides your layering ratios.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-3">
            <div class="how-step__number">03</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Get Contextual Advice</h3>
              <p class="how-step__text">Tell us your mood, occasion, and season — the AI crafts a personalized formula just for that moment.</p>
            </div>
          </div>
          <div class="how-step" id="how-step-4">
            <div class="how-step__number">04</div>
            <div class="how-step__content">
              <h3 class="how-step__title">Evolve Your Scent</h3>
              <p class="how-step__text">Your profile grows with you. AI tracks your preferences and suggests remixes as your taste evolves.</p>
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
  `,e.querySelector(`#hero-cta`).addEventListener(`click`,()=>{t(n?`#lab`:`#profile`)}),e.querySelector(`#bottom-cta`).addEventListener(`click`,()=>{t(n?`#lab`:`#profile`)}),e.querySelectorAll(`.region-format-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.region,r=e.dataset.format,i=p.find(e=>e.id===n),a=m.find(e=>e.region===n&&e.format===r);if(!a||!i)return;document.querySelector(`.notes-popup`)?.remove();let o=document.createElement(`div`);o.className=`notes-popup`,o.innerHTML=`
        <div class="notes-popup__inner" style="--rc: ${i.color}; --rc-rgb: ${x(i.color)};">
          <div class="notes-popup__header">
            <span class="notes-popup__title">${i.icon} ${i.name} — ${r===`spray`?`💨 Spray`:`💧 Oil`}</span>
            <button class="notes-popup__close">✕</button>
          </div>
          <div class="notes-popup__rows">
            <div class="notes-popup__row">
              <span class="notes-popup__label">Top</span>
              <span class="notes-popup__val">${a.topNotes.join(`, `)}</span>
            </div>
            <div class="notes-popup__row">
              <span class="notes-popup__label">Middle</span>
              <span class="notes-popup__val">${a.middleNotes.join(`, `)}</span>
            </div>
            <div class="notes-popup__row">
              <span class="notes-popup__label">Base</span>
              <span class="notes-popup__val">${a.baseNotes.join(`, `)}</span>
            </div>
          </div>
        </div>
      `,document.body.appendChild(o);let s=e.getBoundingClientRect(),c=o.querySelector(`.notes-popup__inner`);requestAnimationFrame(()=>{let e=c.offsetWidth,t=c.offsetHeight,n=s.left+s.width/2-e/2,r=s.bottom+window.scrollY+10;n+e>window.innerWidth-12&&(n=window.innerWidth-e-12),n<12&&(n=12);let i=window.scrollY+window.innerHeight-12;r+t>i&&(r=s.top+window.scrollY-t-10);let a=window.scrollY+12;r<a&&(r=a),o.style.left=n+`px`,o.style.top=r+`px`});let l=()=>o.remove();o.querySelector(`.notes-popup__close`).addEventListener(`click`,l),setTimeout(()=>document.addEventListener(`click`,l,{once:!0}),0)})});let r=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.1});e.querySelectorAll(`.region-card, .how-step`).forEach(e=>{r.observe(e)}),S()}function x(e){return`${parseInt(e.slice(1,3),16)}, ${parseInt(e.slice(3,5),16)}, ${parseInt(e.slice(5,7),16)}`}function S(){if(document.getElementById(`landing-styles`))return;let e=document.createElement(`style`);e.id=`landing-styles`,e.textContent=`
    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: var(--space-xl);
    }

    .hero__bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .hero__orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.25;
      animation: float 8s ease-in-out infinite;
    }

    .hero__orb--1 { width: 300px; height: 300px; background: var(--region-scandinavian-light); top: 10%; left: 5%; animation-delay: 0s; }
    .hero__orb--2 { width: 250px; height: 250px; background: var(--region-eastasia-light); top: 20%; right: 10%; animation-delay: 1.5s; }
    .hero__orb--3 { width: 350px; height: 350px; background: var(--region-mediterranean-light); bottom: 15%; left: 15%; animation-delay: 3s; }
    .hero__orb--4 { width: 200px; height: 200px; background: var(--region-middleeast-light); top: 50%; right: 20%; animation-delay: 2s; }
    .hero__orb--5 { width: 280px; height: 280px; background: var(--region-southamerica-light); bottom: 20%; right: 5%; animation-delay: 4s; }
    .hero__orb--6 { width: 220px; height: 220px; background: var(--region-southafrica-light); top: 5%; left: 40%; animation-delay: 1s; }

    .hero__content {
      text-align: center;
      position: relative;
      z-index: 1;
      max-width: 700px;
    }

    .hero__title {
      font-size: var(--text-hero);
      font-weight: 600;
      line-height: 1.1;
      margin-bottom: var(--space-lg);
      animation: fadeIn 0.8s var(--ease-out) 0.3s both;
    }

    .hero__title-line {
      display: block;
    }

    .hero__title-accent {
      color: var(--accent);
      font-style: italic;
    }

    .hero__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: var(--space-2xl);
      animation: fadeIn 0.8s var(--ease-out) 0.5s both;
    }

    .hero__actions {
      display: flex;
      gap: var(--space-md);
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeIn 0.8s var(--ease-out) 0.7s both;
    }

    .hero__demo-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--text-base);
      letter-spacing: 0.02em;
    }

    .hero__scroll-hint {
      position: absolute;
      bottom: var(--space-xl);
      left: 0;
      right: 0;
      width: fit-content;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: var(--text-lg);
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--accent);
      animation: float 3s ease-in-out infinite, fadeIn 1s var(--ease-out) 1.2s both;
      cursor: pointer;
      text-transform: uppercase;
      text-align: center;
    }

    /* ── Regions Grid ── */
    .landing-regions {
      padding: var(--space-4xl) 0;
    }

    .regions-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-lg);
    }

    .region-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-2xl) var(--space-xl);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-slow);
      opacity: 0;
      transform: translateY(24px);
      position: relative;
      overflow: hidden;
      min-height: var(--card-min-tall);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .region-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--region-color), var(--region-light));
      opacity: 0;
      transition: opacity var(--transition-base);
    }

    .region-card.visible {
      opacity: 1;
      transform: translateY(0);
      transition-delay: var(--delay);
    }

    .region-card:hover {
      border-color: var(--region-color);
      box-shadow: 0 12px 40px rgba(0,0,0,0.06);
      transform: translateY(-4px);
    }

    .region-card:hover::before {
      opacity: 1;
    }

    .region-card__orb {
      font-size: 2.5rem;
      margin-bottom: var(--space-md);
      display: inline-block;
      transition: transform var(--transition-base);
    }

    .region-card:hover .region-card__orb {
      transform: scale(1.15);
    }

    .region-card__name {
      font-size: var(--text-xl);
      margin-bottom: var(--space-xs);
    }

    .region-card__tagline {
      font-size: var(--text-sm);
      color: var(--accent);
      font-weight: 500;
      margin-bottom: var(--space-md);
    }

    .region-card__description {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      line-height: 1.6;
      margin-bottom: var(--space-md);
      flex: 1;
    }

    .region-card__formats {
      display: flex;
      gap: var(--space-xs);
      justify-content: center;
      margin-bottom: 0;
      margin-top: auto;
    }

    .region-format-btn {
      padding: 6px 16px;
      font-size: var(--text-xs);
      font-weight: 600;
      border: 1px solid rgba(var(--rc-rgb), 0.35);
      border-radius: var(--radius-full);
      background: rgba(var(--rc-rgb), 0.07);
      color: var(--rc);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .region-format-btn:hover,
    .region-format-btn--active {
      background: rgba(var(--rc-rgb), 0.18);
      border-color: var(--rc);
    }

    .notes-popup {
      position: absolute;
      z-index: 2000;
      animation: fadeIn 0.15s var(--ease-out);
    }

    .notes-popup__inner {
      background: var(--surface);
      border: 1px solid rgba(var(--rc-rgb), 0.3);
      border-radius: var(--radius-lg);
      box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      padding: var(--space-lg);
      width: 280px;
    }

    .notes-popup__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid rgba(var(--rc-rgb), 0.2);
    }

    .notes-popup__title {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--rc);
    }

    .notes-popup__close {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      transition: background var(--transition-fast);
    }

    .notes-popup__close:hover { background: var(--bg-secondary); }

    .notes-popup__rows { margin-bottom: var(--space-md); }

    .notes-popup__row {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: 6px;
      font-size: var(--text-xs);
      line-height: 1.5;
    }

    .notes-popup__label {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-tertiary);
      min-width: 46px;
      flex-shrink: 0;
    }

    .notes-popup__val { color: var(--text-secondary); }

    /* ── How It Works ── */
    .landing-how {
      padding: var(--space-3xl) 0 var(--space-4xl);
    }

    .how-steps {
      max-width: 700px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .how-step {
      display: flex;
      gap: var(--space-xl);
      align-items: flex-start;
      opacity: 0;
      transform: translateX(-24px);
      transition: all var(--transition-slow);
    }

    .how-step.visible {
      opacity: 1;
      transform: translateX(0);
    }

    .how-step__number {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--accent-light);
      min-width: 60px;
      line-height: 1;
    }

    .how-step__title {
      font-size: var(--text-lg);
      margin-bottom: var(--space-xs);
    }

    .how-step__text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* ── Bottom CTA ── */
    .landing-cta {
      padding: var(--space-2xl) 0 var(--space-4xl);
    }

    .cta-card {
      background: linear-gradient(135deg, var(--accent-bg), rgba(200,169,126,0.03));
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-xl);
      padding: var(--space-4xl) var(--space-2xl);
      width: min(100%, 760px);
      margin: 0 auto;
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .regions-grid {
        grid-template-columns: 1fr;
      }

      .how-step {
        flex-direction: column;
        gap: var(--space-sm);
      }

      .hero__title {
        font-size: 2.2rem;
      }
    }
  `,document.head.appendChild(e)}var C=o(((e,t)=>{function n(e,t){typeof t==`boolean`&&(t={forever:t}),this._originalTimeouts=JSON.parse(JSON.stringify(e)),this._timeouts=e,this._options=t||{},this._maxRetryTime=t&&t.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._timer=null,this._options.forever&&(this._cachedTimeouts=this._timeouts.slice(0))}t.exports=n,n.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts.slice(0)},n.prototype.stop=function(){this._timeout&&clearTimeout(this._timeout),this._timer&&clearTimeout(this._timer),this._timeouts=[],this._cachedTimeouts=null},n.prototype.retry=function(e){if(this._timeout&&clearTimeout(this._timeout),!e)return!1;var t=new Date().getTime();if(e&&t-this._operationStart>=this._maxRetryTime)return this._errors.push(e),this._errors.unshift(Error(`RetryOperation timeout occurred`)),!1;this._errors.push(e);var n=this._timeouts.shift();if(n===void 0)if(this._cachedTimeouts)this._errors.splice(0,this._errors.length-1),n=this._cachedTimeouts.slice(-1);else return!1;var r=this;return this._timer=setTimeout(function(){r._attempts++,r._operationTimeoutCb&&(r._timeout=setTimeout(function(){r._operationTimeoutCb(r._attempts)},r._operationTimeout),r._options.unref&&r._timeout.unref()),r._fn(r._attempts)},n),this._options.unref&&this._timer.unref(),!0},n.prototype.attempt=function(e,t){this._fn=e,t&&(t.timeout&&(this._operationTimeout=t.timeout),t.cb&&(this._operationTimeoutCb=t.cb));var n=this;this._operationTimeoutCb&&(this._timeout=setTimeout(function(){n._operationTimeoutCb()},n._operationTimeout)),this._operationStart=new Date().getTime(),this._fn(this._attempts)},n.prototype.try=function(e){console.log(`Using RetryOperation.try() is deprecated`),this.attempt(e)},n.prototype.start=function(e){console.log(`Using RetryOperation.start() is deprecated`),this.attempt(e)},n.prototype.start=n.prototype.try,n.prototype.errors=function(){return this._errors},n.prototype.attempts=function(){return this._attempts},n.prototype.mainError=function(){if(this._errors.length===0)return null;for(var e={},t=null,n=0,r=0;r<this._errors.length;r++){var i=this._errors[r],a=i.message,o=(e[a]||0)+1;e[a]=o,o>=n&&(t=i,n=o)}return t}})),w=o((e=>{var t=C();e.operation=function(n){return new t(e.timeouts(n),{forever:n&&(n.forever||n.retries===1/0),unref:n&&n.unref,maxRetryTime:n&&n.maxRetryTime})},e.timeouts=function(e){if(e instanceof Array)return[].concat(e);var t={retries:10,factor:2,minTimeout:1*1e3,maxTimeout:1/0,randomize:!1};for(var n in e)t[n]=e[n];if(t.minTimeout>t.maxTimeout)throw Error(`minTimeout is greater than maxTimeout`);for(var r=[],i=0;i<t.retries;i++)r.push(this.createTimeout(i,t));return e&&e.forever&&!r.length&&r.push(this.createTimeout(i,t)),r.sort(function(e,t){return e-t}),r},e.createTimeout=function(e,t){var n=t.randomize?Math.random()+1:1,r=Math.round(n*Math.max(t.minTimeout,1)*t.factor**+e);return r=Math.min(r,t.maxTimeout),r},e.wrap=function(t,n,r){if(n instanceof Array&&(r=n,n=null),!r)for(var i in r=[],t)typeof t[i]==`function`&&r.push(i);for(var a=0;a<r.length;a++){var o=r[a],s=t[o];t[o]=function(r){var i=e.operation(n),a=Array.prototype.slice.call(arguments,1),o=a.pop();a.push(function(e){i.retry(e)||(e&&(arguments[0]=i.mainError()),o.apply(this,arguments))}),i.attempt(function(){r.apply(t,a)})}.bind(t,s),t[o].options=n}}})),T=o(((e,t)=>{t.exports=w()})),E=l(o(((e,t)=>{var n=T(),r=[`Failed to fetch`,`NetworkError when attempting to fetch resource.`,`The Internet connection appears to be offline.`,`Network request failed`],i=class extends Error{constructor(e){super(),e instanceof Error?(this.originalError=e,{message:e}=e):(this.originalError=Error(e),this.originalError.stack=this.stack),this.name=`AbortError`,this.message=e}},a=(e,t,n)=>{let r=n.retries-(t-1);return e.attemptNumber=t,e.retriesLeft=r,e},o=e=>r.includes(e),s=(e,t)=>new Promise((r,s)=>{t={onFailedAttempt:()=>{},retries:10,...t};let c=n.operation(t);c.attempt(async n=>{try{r(await e(n))}catch(e){if(!(e instanceof Error)){s(TypeError(`Non-error was thrown: "${e}". You should only throw errors.`));return}if(e instanceof i)c.stop(),s(e.originalError);else if(e instanceof TypeError&&!o(e.message))c.stop(),s(e);else{a(e,n,t);try{await t.onFailedAttempt(e)}catch(e){s(e);return}c.retry(e)||s(c.mainError())}}})});t.exports=s,t.exports.default=s,t.exports.AbortError=i}))(),1),D=void 0,O=void 0;function k(){return{geminiUrl:D,vertexUrl:O}}function A(e,t,n,r){if(!e?.baseUrl){let e=k();return t?e.vertexUrl??n:e.geminiUrl??r}return e.baseUrl}var j=class{};function M(e,t){return e.replace(/\{([^}]+)\}/g,(e,n)=>{if(Object.prototype.hasOwnProperty.call(t,n)){let e=t[n];return e==null?``:String(e)}else throw Error(`Key '${n}' not found in valueMap.`)})}function N(e,t,n){for(let r=0;r<t.length-1;r++){let i=t[r];if(i.endsWith(`[]`)){let a=i.slice(0,-2);if(!(a in e))if(Array.isArray(n))e[a]=Array.from({length:n.length},()=>({}));else throw Error(`Value must be a list given an array path ${i}`);if(Array.isArray(e[a])){let i=e[a];if(Array.isArray(n))for(let e=0;e<i.length;e++){let a=i[e];N(a,t.slice(r+1),n[e])}else for(let e of i)N(e,t.slice(r+1),n)}return}else if(i.endsWith(`[0]`)){let a=i.slice(0,-3);a in e||(e[a]=[{}]);let o=e[a];N(o[0],t.slice(r+1),n);return}(!e[i]||typeof e[i]!=`object`)&&(e[i]={}),e=e[i]}let r=t[t.length-1],i=e[r];if(i!==void 0){if(!n||typeof n==`object`&&Object.keys(n).length===0||n===i)return;if(typeof i==`object`&&typeof n==`object`&&i!==null&&n!==null)Object.assign(i,n);else throw Error(`Cannot set value for an existing key. Key: ${r}`)}else r===`_self`&&typeof n==`object`&&n&&!Array.isArray(n)?Object.assign(e,n):e[r]=n}function P(e,t,n=void 0){try{if(t.length===1&&t[0]===`_self`)return e;for(let r=0;r<t.length;r++){if(typeof e!=`object`||!e)return n;let i=t[r];if(i.endsWith(`[]`)){let a=i.slice(0,-2);if(a in e){let i=e[a];return Array.isArray(i)?i.map(e=>P(e,t.slice(r+1),n)):n}else return n}else e=e[i]}return e}catch(e){if(e instanceof TypeError)return n;throw e}}function ee(e,t){for(let[n,r]of Object.entries(t)){let t=n.split(`.`),i=r.split(`.`),a=new Set,o=-1;for(let e=0;e<t.length;e++)if(t[e]===`*`){o=e;break}if(o!==-1&&i.length>o)for(let e=o;e<i.length;e++){let t=i[e];t!==`*`&&!t.endsWith(`[]`)&&!t.endsWith(`[0]`)&&a.add(t)}te(e,t,i,0,a)}}function te(e,t,n,r,i){if(r>=t.length||typeof e!=`object`||!e)return;let a=t[r];if(a.endsWith(`[]`)){let o=a.slice(0,-2),s=e;if(o in s&&Array.isArray(s[o]))for(let e of s[o])te(e,t,n,r+1,i)}else if(a===`*`){if(typeof e==`object`&&e&&!Array.isArray(e)){let t=e,a=Object.keys(t).filter(e=>!e.startsWith(`_`)&&!i.has(e)),o={};for(let e of a)o[e]=t[e];for(let[e,i]of Object.entries(o)){let a=[];for(let t of n.slice(r))t===`*`?a.push(e):a.push(t);N(t,a,i)}for(let e of a)delete t[e]}}else{let o=e;a in o&&te(o[a],t,n,r+1,i)}}function ne(e){if(typeof e!=`string`)throw Error(`fromImageBytes must be a string`);return e}function re(e){let t={},n=P(e,[`operationName`]);n!=null&&N(t,[`operationName`],n);let r=P(e,[`resourceName`]);return r!=null&&N(t,[`_url`,`resourceName`],r),t}function ie(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`response`,`generateVideoResponse`]);return o!=null&&N(t,[`response`],oe(o)),t}function ae(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`response`]);return o!=null&&N(t,[`response`],se(o)),t}function oe(e){let t={},n=P(e,[`generatedSamples`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>ce(e))),N(t,[`generatedVideos`],e)}let r=P(e,[`raiMediaFilteredCount`]);r!=null&&N(t,[`raiMediaFilteredCount`],r);let i=P(e,[`raiMediaFilteredReasons`]);return i!=null&&N(t,[`raiMediaFilteredReasons`],i),t}function se(e){let t={},n=P(e,[`videos`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>le(e))),N(t,[`generatedVideos`],e)}let r=P(e,[`raiMediaFilteredCount`]);r!=null&&N(t,[`raiMediaFilteredCount`],r);let i=P(e,[`raiMediaFilteredReasons`]);return i!=null&&N(t,[`raiMediaFilteredReasons`],i),t}function ce(e){let t={},n=P(e,[`video`]);return n!=null&&N(t,[`video`],ge(n)),t}function le(e){let t={},n=P(e,[`_self`]);return n!=null&&N(t,[`video`],_e(n)),t}function ue(e){let t={},n=P(e,[`operationName`]);return n!=null&&N(t,[`_url`,`operationName`],n),t}function de(e){let t={},n=P(e,[`operationName`]);return n!=null&&N(t,[`_url`,`operationName`],n),t}function fe(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`response`]);return o!=null&&N(t,[`response`],pe(o)),t}function pe(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`parent`]);r!=null&&N(t,[`parent`],r);let i=P(e,[`documentName`]);return i!=null&&N(t,[`documentName`],i),t}function me(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`response`]);return o!=null&&N(t,[`response`],he(o)),t}function he(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`parent`]);r!=null&&N(t,[`parent`],r);let i=P(e,[`documentName`]);return i!=null&&N(t,[`documentName`],i),t}function ge(e){let t={},n=P(e,[`uri`]);n!=null&&N(t,[`uri`],n);let r=P(e,[`encodedVideo`]);r!=null&&N(t,[`videoBytes`],ne(r));let i=P(e,[`encoding`]);return i!=null&&N(t,[`mimeType`],i),t}function _e(e){let t={},n=P(e,[`gcsUri`]);n!=null&&N(t,[`uri`],n);let r=P(e,[`bytesBase64Encoded`]);r!=null&&N(t,[`videoBytes`],ne(r));let i=P(e,[`mimeType`]);return i!=null&&N(t,[`mimeType`],i),t}var ve;(function(e){e.LANGUAGE_UNSPECIFIED=`LANGUAGE_UNSPECIFIED`,e.PYTHON=`PYTHON`})(ve||={});var ye;(function(e){e.OUTCOME_UNSPECIFIED=`OUTCOME_UNSPECIFIED`,e.OUTCOME_OK=`OUTCOME_OK`,e.OUTCOME_FAILED=`OUTCOME_FAILED`,e.OUTCOME_DEADLINE_EXCEEDED=`OUTCOME_DEADLINE_EXCEEDED`})(ye||={});var be;(function(e){e.SCHEDULING_UNSPECIFIED=`SCHEDULING_UNSPECIFIED`,e.SILENT=`SILENT`,e.WHEN_IDLE=`WHEN_IDLE`,e.INTERRUPT=`INTERRUPT`})(be||={});var xe;(function(e){e.TYPE_UNSPECIFIED=`TYPE_UNSPECIFIED`,e.STRING=`STRING`,e.NUMBER=`NUMBER`,e.INTEGER=`INTEGER`,e.BOOLEAN=`BOOLEAN`,e.ARRAY=`ARRAY`,e.OBJECT=`OBJECT`,e.NULL=`NULL`})(xe||={});var Se;(function(e){e.ENVIRONMENT_UNSPECIFIED=`ENVIRONMENT_UNSPECIFIED`,e.ENVIRONMENT_BROWSER=`ENVIRONMENT_BROWSER`})(Se||={});var Ce;(function(e){e.AUTH_TYPE_UNSPECIFIED=`AUTH_TYPE_UNSPECIFIED`,e.NO_AUTH=`NO_AUTH`,e.API_KEY_AUTH=`API_KEY_AUTH`,e.HTTP_BASIC_AUTH=`HTTP_BASIC_AUTH`,e.GOOGLE_SERVICE_ACCOUNT_AUTH=`GOOGLE_SERVICE_ACCOUNT_AUTH`,e.OAUTH=`OAUTH`,e.OIDC_AUTH=`OIDC_AUTH`})(Ce||={});var we;(function(e){e.HTTP_IN_UNSPECIFIED=`HTTP_IN_UNSPECIFIED`,e.HTTP_IN_QUERY=`HTTP_IN_QUERY`,e.HTTP_IN_HEADER=`HTTP_IN_HEADER`,e.HTTP_IN_PATH=`HTTP_IN_PATH`,e.HTTP_IN_BODY=`HTTP_IN_BODY`,e.HTTP_IN_COOKIE=`HTTP_IN_COOKIE`})(we||={});var Te;(function(e){e.API_SPEC_UNSPECIFIED=`API_SPEC_UNSPECIFIED`,e.SIMPLE_SEARCH=`SIMPLE_SEARCH`,e.ELASTIC_SEARCH=`ELASTIC_SEARCH`})(Te||={});var Ee;(function(e){e.PHISH_BLOCK_THRESHOLD_UNSPECIFIED=`PHISH_BLOCK_THRESHOLD_UNSPECIFIED`,e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_HIGH_AND_ABOVE=`BLOCK_HIGH_AND_ABOVE`,e.BLOCK_HIGHER_AND_ABOVE=`BLOCK_HIGHER_AND_ABOVE`,e.BLOCK_VERY_HIGH_AND_ABOVE=`BLOCK_VERY_HIGH_AND_ABOVE`,e.BLOCK_ONLY_EXTREMELY_HIGH=`BLOCK_ONLY_EXTREMELY_HIGH`})(Ee||={});var De;(function(e){e.UNSPECIFIED=`UNSPECIFIED`,e.BLOCKING=`BLOCKING`,e.NON_BLOCKING=`NON_BLOCKING`})(De||={});var Oe;(function(e){e.MODE_UNSPECIFIED=`MODE_UNSPECIFIED`,e.MODE_DYNAMIC=`MODE_DYNAMIC`})(Oe||={});var ke;(function(e){e.MODE_UNSPECIFIED=`MODE_UNSPECIFIED`,e.AUTO=`AUTO`,e.ANY=`ANY`,e.NONE=`NONE`,e.VALIDATED=`VALIDATED`})(ke||={});var Ae;(function(e){e.THINKING_LEVEL_UNSPECIFIED=`THINKING_LEVEL_UNSPECIFIED`,e.MINIMAL=`MINIMAL`,e.LOW=`LOW`,e.MEDIUM=`MEDIUM`,e.HIGH=`HIGH`})(Ae||={});var je;(function(e){e.DONT_ALLOW=`DONT_ALLOW`,e.ALLOW_ADULT=`ALLOW_ADULT`,e.ALLOW_ALL=`ALLOW_ALL`})(je||={});var Me;(function(e){e.PROMINENT_PEOPLE_UNSPECIFIED=`PROMINENT_PEOPLE_UNSPECIFIED`,e.ALLOW_PROMINENT_PEOPLE=`ALLOW_PROMINENT_PEOPLE`,e.BLOCK_PROMINENT_PEOPLE=`BLOCK_PROMINENT_PEOPLE`})(Me||={});var Ne;(function(e){e.HARM_CATEGORY_UNSPECIFIED=`HARM_CATEGORY_UNSPECIFIED`,e.HARM_CATEGORY_HARASSMENT=`HARM_CATEGORY_HARASSMENT`,e.HARM_CATEGORY_HATE_SPEECH=`HARM_CATEGORY_HATE_SPEECH`,e.HARM_CATEGORY_SEXUALLY_EXPLICIT=`HARM_CATEGORY_SEXUALLY_EXPLICIT`,e.HARM_CATEGORY_DANGEROUS_CONTENT=`HARM_CATEGORY_DANGEROUS_CONTENT`,e.HARM_CATEGORY_CIVIC_INTEGRITY=`HARM_CATEGORY_CIVIC_INTEGRITY`,e.HARM_CATEGORY_IMAGE_HATE=`HARM_CATEGORY_IMAGE_HATE`,e.HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT=`HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT`,e.HARM_CATEGORY_IMAGE_HARASSMENT=`HARM_CATEGORY_IMAGE_HARASSMENT`,e.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT=`HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT`,e.HARM_CATEGORY_JAILBREAK=`HARM_CATEGORY_JAILBREAK`})(Ne||={});var Pe;(function(e){e.HARM_BLOCK_METHOD_UNSPECIFIED=`HARM_BLOCK_METHOD_UNSPECIFIED`,e.SEVERITY=`SEVERITY`,e.PROBABILITY=`PROBABILITY`})(Pe||={});var Fe;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED=`HARM_BLOCK_THRESHOLD_UNSPECIFIED`,e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_ONLY_HIGH=`BLOCK_ONLY_HIGH`,e.BLOCK_NONE=`BLOCK_NONE`,e.OFF=`OFF`})(Fe||={});var Ie;(function(e){e.FINISH_REASON_UNSPECIFIED=`FINISH_REASON_UNSPECIFIED`,e.STOP=`STOP`,e.MAX_TOKENS=`MAX_TOKENS`,e.SAFETY=`SAFETY`,e.RECITATION=`RECITATION`,e.LANGUAGE=`LANGUAGE`,e.OTHER=`OTHER`,e.BLOCKLIST=`BLOCKLIST`,e.PROHIBITED_CONTENT=`PROHIBITED_CONTENT`,e.SPII=`SPII`,e.MALFORMED_FUNCTION_CALL=`MALFORMED_FUNCTION_CALL`,e.IMAGE_SAFETY=`IMAGE_SAFETY`,e.UNEXPECTED_TOOL_CALL=`UNEXPECTED_TOOL_CALL`,e.IMAGE_PROHIBITED_CONTENT=`IMAGE_PROHIBITED_CONTENT`,e.NO_IMAGE=`NO_IMAGE`,e.IMAGE_RECITATION=`IMAGE_RECITATION`,e.IMAGE_OTHER=`IMAGE_OTHER`})(Ie||={});var Le;(function(e){e.HARM_PROBABILITY_UNSPECIFIED=`HARM_PROBABILITY_UNSPECIFIED`,e.NEGLIGIBLE=`NEGLIGIBLE`,e.LOW=`LOW`,e.MEDIUM=`MEDIUM`,e.HIGH=`HIGH`})(Le||={});var Re;(function(e){e.HARM_SEVERITY_UNSPECIFIED=`HARM_SEVERITY_UNSPECIFIED`,e.HARM_SEVERITY_NEGLIGIBLE=`HARM_SEVERITY_NEGLIGIBLE`,e.HARM_SEVERITY_LOW=`HARM_SEVERITY_LOW`,e.HARM_SEVERITY_MEDIUM=`HARM_SEVERITY_MEDIUM`,e.HARM_SEVERITY_HIGH=`HARM_SEVERITY_HIGH`})(Re||={});var ze;(function(e){e.URL_RETRIEVAL_STATUS_UNSPECIFIED=`URL_RETRIEVAL_STATUS_UNSPECIFIED`,e.URL_RETRIEVAL_STATUS_SUCCESS=`URL_RETRIEVAL_STATUS_SUCCESS`,e.URL_RETRIEVAL_STATUS_ERROR=`URL_RETRIEVAL_STATUS_ERROR`,e.URL_RETRIEVAL_STATUS_PAYWALL=`URL_RETRIEVAL_STATUS_PAYWALL`,e.URL_RETRIEVAL_STATUS_UNSAFE=`URL_RETRIEVAL_STATUS_UNSAFE`})(ze||={});var Be;(function(e){e.BLOCKED_REASON_UNSPECIFIED=`BLOCKED_REASON_UNSPECIFIED`,e.SAFETY=`SAFETY`,e.OTHER=`OTHER`,e.BLOCKLIST=`BLOCKLIST`,e.PROHIBITED_CONTENT=`PROHIBITED_CONTENT`,e.IMAGE_SAFETY=`IMAGE_SAFETY`,e.MODEL_ARMOR=`MODEL_ARMOR`,e.JAILBREAK=`JAILBREAK`})(Be||={});var Ve;(function(e){e.TRAFFIC_TYPE_UNSPECIFIED=`TRAFFIC_TYPE_UNSPECIFIED`,e.ON_DEMAND=`ON_DEMAND`,e.ON_DEMAND_PRIORITY=`ON_DEMAND_PRIORITY`,e.ON_DEMAND_FLEX=`ON_DEMAND_FLEX`,e.PROVISIONED_THROUGHPUT=`PROVISIONED_THROUGHPUT`})(Ve||={});var He;(function(e){e.MODALITY_UNSPECIFIED=`MODALITY_UNSPECIFIED`,e.TEXT=`TEXT`,e.IMAGE=`IMAGE`,e.AUDIO=`AUDIO`})(He||={});var Ue;(function(e){e.MODEL_STAGE_UNSPECIFIED=`MODEL_STAGE_UNSPECIFIED`,e.UNSTABLE_EXPERIMENTAL=`UNSTABLE_EXPERIMENTAL`,e.EXPERIMENTAL=`EXPERIMENTAL`,e.PREVIEW=`PREVIEW`,e.STABLE=`STABLE`,e.LEGACY=`LEGACY`,e.DEPRECATED=`DEPRECATED`,e.RETIRED=`RETIRED`})(Ue||={});var We;(function(e){e.MEDIA_RESOLUTION_UNSPECIFIED=`MEDIA_RESOLUTION_UNSPECIFIED`,e.MEDIA_RESOLUTION_LOW=`MEDIA_RESOLUTION_LOW`,e.MEDIA_RESOLUTION_MEDIUM=`MEDIA_RESOLUTION_MEDIUM`,e.MEDIA_RESOLUTION_HIGH=`MEDIA_RESOLUTION_HIGH`})(We||={});var Ge;(function(e){e.TUNING_MODE_UNSPECIFIED=`TUNING_MODE_UNSPECIFIED`,e.TUNING_MODE_FULL=`TUNING_MODE_FULL`,e.TUNING_MODE_PEFT_ADAPTER=`TUNING_MODE_PEFT_ADAPTER`})(Ge||={});var Ke;(function(e){e.ADAPTER_SIZE_UNSPECIFIED=`ADAPTER_SIZE_UNSPECIFIED`,e.ADAPTER_SIZE_ONE=`ADAPTER_SIZE_ONE`,e.ADAPTER_SIZE_TWO=`ADAPTER_SIZE_TWO`,e.ADAPTER_SIZE_FOUR=`ADAPTER_SIZE_FOUR`,e.ADAPTER_SIZE_EIGHT=`ADAPTER_SIZE_EIGHT`,e.ADAPTER_SIZE_SIXTEEN=`ADAPTER_SIZE_SIXTEEN`,e.ADAPTER_SIZE_THIRTY_TWO=`ADAPTER_SIZE_THIRTY_TWO`})(Ke||={});var qe;(function(e){e.JOB_STATE_UNSPECIFIED=`JOB_STATE_UNSPECIFIED`,e.JOB_STATE_QUEUED=`JOB_STATE_QUEUED`,e.JOB_STATE_PENDING=`JOB_STATE_PENDING`,e.JOB_STATE_RUNNING=`JOB_STATE_RUNNING`,e.JOB_STATE_SUCCEEDED=`JOB_STATE_SUCCEEDED`,e.JOB_STATE_FAILED=`JOB_STATE_FAILED`,e.JOB_STATE_CANCELLING=`JOB_STATE_CANCELLING`,e.JOB_STATE_CANCELLED=`JOB_STATE_CANCELLED`,e.JOB_STATE_PAUSED=`JOB_STATE_PAUSED`,e.JOB_STATE_EXPIRED=`JOB_STATE_EXPIRED`,e.JOB_STATE_UPDATING=`JOB_STATE_UPDATING`,e.JOB_STATE_PARTIALLY_SUCCEEDED=`JOB_STATE_PARTIALLY_SUCCEEDED`})(qe||={});var Je;(function(e){e.TUNING_JOB_STATE_UNSPECIFIED=`TUNING_JOB_STATE_UNSPECIFIED`,e.TUNING_JOB_STATE_WAITING_FOR_QUOTA=`TUNING_JOB_STATE_WAITING_FOR_QUOTA`,e.TUNING_JOB_STATE_PROCESSING_DATASET=`TUNING_JOB_STATE_PROCESSING_DATASET`,e.TUNING_JOB_STATE_WAITING_FOR_CAPACITY=`TUNING_JOB_STATE_WAITING_FOR_CAPACITY`,e.TUNING_JOB_STATE_TUNING=`TUNING_JOB_STATE_TUNING`,e.TUNING_JOB_STATE_POST_PROCESSING=`TUNING_JOB_STATE_POST_PROCESSING`})(Je||={});var Ye;(function(e){e.AGGREGATION_METRIC_UNSPECIFIED=`AGGREGATION_METRIC_UNSPECIFIED`,e.AVERAGE=`AVERAGE`,e.MODE=`MODE`,e.STANDARD_DEVIATION=`STANDARD_DEVIATION`,e.VARIANCE=`VARIANCE`,e.MINIMUM=`MINIMUM`,e.MAXIMUM=`MAXIMUM`,e.MEDIAN=`MEDIAN`,e.PERCENTILE_P90=`PERCENTILE_P90`,e.PERCENTILE_P95=`PERCENTILE_P95`,e.PERCENTILE_P99=`PERCENTILE_P99`})(Ye||={});var Xe;(function(e){e.PAIRWISE_CHOICE_UNSPECIFIED=`PAIRWISE_CHOICE_UNSPECIFIED`,e.BASELINE=`BASELINE`,e.CANDIDATE=`CANDIDATE`,e.TIE=`TIE`})(Xe||={});var Ze;(function(e){e.TUNING_TASK_UNSPECIFIED=`TUNING_TASK_UNSPECIFIED`,e.TUNING_TASK_I2V=`TUNING_TASK_I2V`,e.TUNING_TASK_T2V=`TUNING_TASK_T2V`,e.TUNING_TASK_R2V=`TUNING_TASK_R2V`})(Ze||={});var Qe;(function(e){e.STATE_UNSPECIFIED=`STATE_UNSPECIFIED`,e.STATE_PENDING=`STATE_PENDING`,e.STATE_ACTIVE=`STATE_ACTIVE`,e.STATE_FAILED=`STATE_FAILED`})(Qe||={});var $e;(function(e){e.MEDIA_RESOLUTION_UNSPECIFIED=`MEDIA_RESOLUTION_UNSPECIFIED`,e.MEDIA_RESOLUTION_LOW=`MEDIA_RESOLUTION_LOW`,e.MEDIA_RESOLUTION_MEDIUM=`MEDIA_RESOLUTION_MEDIUM`,e.MEDIA_RESOLUTION_HIGH=`MEDIA_RESOLUTION_HIGH`,e.MEDIA_RESOLUTION_ULTRA_HIGH=`MEDIA_RESOLUTION_ULTRA_HIGH`})($e||={});var et;(function(e){e.TOOL_TYPE_UNSPECIFIED=`TOOL_TYPE_UNSPECIFIED`,e.GOOGLE_SEARCH_WEB=`GOOGLE_SEARCH_WEB`,e.GOOGLE_SEARCH_IMAGE=`GOOGLE_SEARCH_IMAGE`,e.URL_CONTEXT=`URL_CONTEXT`,e.GOOGLE_MAPS=`GOOGLE_MAPS`,e.FILE_SEARCH=`FILE_SEARCH`})(et||={});var tt;(function(e){e.COLLECTION=`COLLECTION`})(tt||={});var nt;(function(e){e.SERVICE_TIER_UNSPECIFIED=`SERVICE_TIER_UNSPECIFIED`,e.SERVICE_TIER_FLEX=`SERVICE_TIER_FLEX`,e.SERVICE_TIER_STANDARD=`SERVICE_TIER_STANDARD`,e.SERVICE_TIER_PRIORITY=`SERVICE_TIER_PRIORITY`})(nt||={});var rt;(function(e){e.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED=`FEATURE_SELECTION_PREFERENCE_UNSPECIFIED`,e.PRIORITIZE_QUALITY=`PRIORITIZE_QUALITY`,e.BALANCED=`BALANCED`,e.PRIORITIZE_COST=`PRIORITIZE_COST`})(rt||={});var it;(function(e){e.PREDICT=`PREDICT`,e.EMBED_CONTENT=`EMBED_CONTENT`})(it||={});var at;(function(e){e.BLOCK_LOW_AND_ABOVE=`BLOCK_LOW_AND_ABOVE`,e.BLOCK_MEDIUM_AND_ABOVE=`BLOCK_MEDIUM_AND_ABOVE`,e.BLOCK_ONLY_HIGH=`BLOCK_ONLY_HIGH`,e.BLOCK_NONE=`BLOCK_NONE`})(at||={});var ot;(function(e){e.auto=`auto`,e.en=`en`,e.ja=`ja`,e.ko=`ko`,e.hi=`hi`,e.zh=`zh`,e.pt=`pt`,e.es=`es`})(ot||={});var st;(function(e){e.MASK_MODE_DEFAULT=`MASK_MODE_DEFAULT`,e.MASK_MODE_USER_PROVIDED=`MASK_MODE_USER_PROVIDED`,e.MASK_MODE_BACKGROUND=`MASK_MODE_BACKGROUND`,e.MASK_MODE_FOREGROUND=`MASK_MODE_FOREGROUND`,e.MASK_MODE_SEMANTIC=`MASK_MODE_SEMANTIC`})(st||={});var ct;(function(e){e.CONTROL_TYPE_DEFAULT=`CONTROL_TYPE_DEFAULT`,e.CONTROL_TYPE_CANNY=`CONTROL_TYPE_CANNY`,e.CONTROL_TYPE_SCRIBBLE=`CONTROL_TYPE_SCRIBBLE`,e.CONTROL_TYPE_FACE_MESH=`CONTROL_TYPE_FACE_MESH`})(ct||={});var lt;(function(e){e.SUBJECT_TYPE_DEFAULT=`SUBJECT_TYPE_DEFAULT`,e.SUBJECT_TYPE_PERSON=`SUBJECT_TYPE_PERSON`,e.SUBJECT_TYPE_ANIMAL=`SUBJECT_TYPE_ANIMAL`,e.SUBJECT_TYPE_PRODUCT=`SUBJECT_TYPE_PRODUCT`})(lt||={});var ut;(function(e){e.EDIT_MODE_DEFAULT=`EDIT_MODE_DEFAULT`,e.EDIT_MODE_INPAINT_REMOVAL=`EDIT_MODE_INPAINT_REMOVAL`,e.EDIT_MODE_INPAINT_INSERTION=`EDIT_MODE_INPAINT_INSERTION`,e.EDIT_MODE_OUTPAINT=`EDIT_MODE_OUTPAINT`,e.EDIT_MODE_CONTROLLED_EDITING=`EDIT_MODE_CONTROLLED_EDITING`,e.EDIT_MODE_STYLE=`EDIT_MODE_STYLE`,e.EDIT_MODE_BGSWAP=`EDIT_MODE_BGSWAP`,e.EDIT_MODE_PRODUCT_IMAGE=`EDIT_MODE_PRODUCT_IMAGE`})(ut||={});var dt;(function(e){e.FOREGROUND=`FOREGROUND`,e.BACKGROUND=`BACKGROUND`,e.PROMPT=`PROMPT`,e.SEMANTIC=`SEMANTIC`,e.INTERACTIVE=`INTERACTIVE`})(dt||={});var ft;(function(e){e.ASSET=`ASSET`,e.STYLE=`STYLE`})(ft||={});var pt;(function(e){e.INSERT=`INSERT`,e.REMOVE=`REMOVE`,e.REMOVE_STATIC=`REMOVE_STATIC`,e.OUTPAINT=`OUTPAINT`})(pt||={});var mt;(function(e){e.OPTIMIZED=`OPTIMIZED`,e.LOSSLESS=`LOSSLESS`})(mt||={});var ht;(function(e){e.SUPERVISED_FINE_TUNING=`SUPERVISED_FINE_TUNING`,e.PREFERENCE_TUNING=`PREFERENCE_TUNING`,e.DISTILLATION=`DISTILLATION`})(ht||={});var gt;(function(e){e.STATE_UNSPECIFIED=`STATE_UNSPECIFIED`,e.PROCESSING=`PROCESSING`,e.ACTIVE=`ACTIVE`,e.FAILED=`FAILED`})(gt||={});var _t;(function(e){e.SOURCE_UNSPECIFIED=`SOURCE_UNSPECIFIED`,e.UPLOADED=`UPLOADED`,e.GENERATED=`GENERATED`,e.REGISTERED=`REGISTERED`})(_t||={});var vt;(function(e){e.TURN_COMPLETE_REASON_UNSPECIFIED=`TURN_COMPLETE_REASON_UNSPECIFIED`,e.MALFORMED_FUNCTION_CALL=`MALFORMED_FUNCTION_CALL`,e.RESPONSE_REJECTED=`RESPONSE_REJECTED`,e.NEED_MORE_INPUT=`NEED_MORE_INPUT`})(vt||={});var yt;(function(e){e.MODALITY_UNSPECIFIED=`MODALITY_UNSPECIFIED`,e.TEXT=`TEXT`,e.IMAGE=`IMAGE`,e.VIDEO=`VIDEO`,e.AUDIO=`AUDIO`,e.DOCUMENT=`DOCUMENT`})(yt||={});var bt;(function(e){e.VAD_SIGNAL_TYPE_UNSPECIFIED=`VAD_SIGNAL_TYPE_UNSPECIFIED`,e.VAD_SIGNAL_TYPE_SOS=`VAD_SIGNAL_TYPE_SOS`,e.VAD_SIGNAL_TYPE_EOS=`VAD_SIGNAL_TYPE_EOS`})(bt||={});var xt;(function(e){e.TYPE_UNSPECIFIED=`TYPE_UNSPECIFIED`,e.ACTIVITY_START=`ACTIVITY_START`,e.ACTIVITY_END=`ACTIVITY_END`})(xt||={});var St;(function(e){e.START_SENSITIVITY_UNSPECIFIED=`START_SENSITIVITY_UNSPECIFIED`,e.START_SENSITIVITY_HIGH=`START_SENSITIVITY_HIGH`,e.START_SENSITIVITY_LOW=`START_SENSITIVITY_LOW`})(St||={});var Ct;(function(e){e.END_SENSITIVITY_UNSPECIFIED=`END_SENSITIVITY_UNSPECIFIED`,e.END_SENSITIVITY_HIGH=`END_SENSITIVITY_HIGH`,e.END_SENSITIVITY_LOW=`END_SENSITIVITY_LOW`})(Ct||={});var wt;(function(e){e.ACTIVITY_HANDLING_UNSPECIFIED=`ACTIVITY_HANDLING_UNSPECIFIED`,e.START_OF_ACTIVITY_INTERRUPTS=`START_OF_ACTIVITY_INTERRUPTS`,e.NO_INTERRUPTION=`NO_INTERRUPTION`})(wt||={});var Tt;(function(e){e.TURN_COVERAGE_UNSPECIFIED=`TURN_COVERAGE_UNSPECIFIED`,e.TURN_INCLUDES_ONLY_ACTIVITY=`TURN_INCLUDES_ONLY_ACTIVITY`,e.TURN_INCLUDES_ALL_INPUT=`TURN_INCLUDES_ALL_INPUT`,e.TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO=`TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`})(Tt||={});var Et;(function(e){e.SCALE_UNSPECIFIED=`SCALE_UNSPECIFIED`,e.C_MAJOR_A_MINOR=`C_MAJOR_A_MINOR`,e.D_FLAT_MAJOR_B_FLAT_MINOR=`D_FLAT_MAJOR_B_FLAT_MINOR`,e.D_MAJOR_B_MINOR=`D_MAJOR_B_MINOR`,e.E_FLAT_MAJOR_C_MINOR=`E_FLAT_MAJOR_C_MINOR`,e.E_MAJOR_D_FLAT_MINOR=`E_MAJOR_D_FLAT_MINOR`,e.F_MAJOR_D_MINOR=`F_MAJOR_D_MINOR`,e.G_FLAT_MAJOR_E_FLAT_MINOR=`G_FLAT_MAJOR_E_FLAT_MINOR`,e.G_MAJOR_E_MINOR=`G_MAJOR_E_MINOR`,e.A_FLAT_MAJOR_F_MINOR=`A_FLAT_MAJOR_F_MINOR`,e.A_MAJOR_G_FLAT_MINOR=`A_MAJOR_G_FLAT_MINOR`,e.B_FLAT_MAJOR_G_MINOR=`B_FLAT_MAJOR_G_MINOR`,e.B_MAJOR_A_FLAT_MINOR=`B_MAJOR_A_FLAT_MINOR`})(Et||={});var Dt;(function(e){e.MUSIC_GENERATION_MODE_UNSPECIFIED=`MUSIC_GENERATION_MODE_UNSPECIFIED`,e.QUALITY=`QUALITY`,e.DIVERSITY=`DIVERSITY`,e.VOCALIZATION=`VOCALIZATION`})(Dt||={});var Ot;(function(e){e.PLAYBACK_CONTROL_UNSPECIFIED=`PLAYBACK_CONTROL_UNSPECIFIED`,e.PLAY=`PLAY`,e.PAUSE=`PAUSE`,e.STOP=`STOP`,e.RESET_CONTEXT=`RESET_CONTEXT`})(Ot||={});var kt=class{constructor(e){let t={};for(let n of e.headers.entries())t[n[0]]=n[1];this.headers=t,this.responseInternal=e}json(){return this.responseInternal.json()}},At=class{get text(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning text from the first one.`);let e=``,t=!1,n=[];for(let r of this.candidates?.[0]?.content?.parts??[]){for(let[e,t]of Object.entries(r))e!==`text`&&e!==`thought`&&e!==`thoughtSignature`&&(t!==null||t!==void 0)&&n.push(e);if(typeof r.text==`string`){if(typeof r.thought==`boolean`&&r.thought)continue;t=!0,e+=r.text}}return n.length>0&&console.warn(`there are non-text parts ${n} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),t?e:void 0}get data(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning data from the first one.`);let e=``,t=[];for(let n of this.candidates?.[0]?.content?.parts??[]){for(let[e,r]of Object.entries(n))e!==`inlineData`&&(r!==null||r!==void 0)&&t.push(e);n.inlineData&&typeof n.inlineData.data==`string`&&(e+=atob(n.inlineData.data))}return t.length>0&&console.warn(`there are non-data parts ${t} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),e.length>0?btoa(e):void 0}get functionCalls(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning function calls from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.functionCall).map(e=>e.functionCall).filter(e=>e!==void 0);if(e?.length!==0)return e}get executableCode(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning executable code from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.executableCode).map(e=>e.executableCode).filter(e=>e!==void 0);if(e?.length!==0)return e?.[0]?.code}get codeExecutionResult(){if(this.candidates?.[0]?.content?.parts?.length===0)return;this.candidates&&this.candidates.length>1&&console.warn(`there are multiple candidates in the response, returning code execution result from the first one.`);let e=(this.candidates?.[0]?.content?.parts)?.filter(e=>e.codeExecutionResult).map(e=>e.codeExecutionResult).filter(e=>e!==void 0);if(e?.length!==0)return e?.[0]?.output}},jt=class{},Mt=class{},Nt=class{},Pt=class{},Ft=class{},It=class{},Lt=class{},Rt=class{},zt=class{},Bt=class{},Vt=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i,a=t;return i=n?ae(a):ie(a),Object.assign(r,i),r}},Ht=class{},Ut=class{},Wt=class{},Gt=class{},Kt=class{},qt=class{},Jt=class{},Yt=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i=fe(t);return Object.assign(r,i),r}},Xt=class{},Zt=class{},Qt=class{},$t=class{},en=class{},tn=class{get text(){let e=``,t=!1,n=[];for(let r of this.serverContent?.modelTurn?.parts??[]){for(let[e,t]of Object.entries(r))e!==`text`&&e!==`thought`&&t!==null&&n.push(e);if(typeof r.text==`string`){if(typeof r.thought==`boolean`&&r.thought)continue;t=!0,e+=r.text}}return n.length>0&&console.warn(`there are non-text parts ${n} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),t?e:void 0}get data(){let e=``,t=[];for(let n of this.serverContent?.modelTurn?.parts??[]){for(let[e,r]of Object.entries(n))e!==`inlineData`&&r!==null&&t.push(e);n.inlineData&&typeof n.inlineData.data==`string`&&(e+=atob(n.inlineData.data))}return t.length>0&&console.warn(`there are non-data parts ${t} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),e.length>0?btoa(e):void 0}},nn=class{get audioChunk(){if(this.serverContent&&this.serverContent.audioChunks&&this.serverContent.audioChunks.length>0)return this.serverContent.audioChunks[0]}},rn=class e{_fromAPIResponse({apiResponse:t,_isVertexAI:n}){let r=new e,i=me(t);return Object.assign(r,i),r}};function F(e,t){if(!t||typeof t!=`string`)throw Error(`model is required and must be a string`);if(t.includes(`..`)||t.includes(`?`)||t.includes(`&`))throw Error(`invalid model parameter`);if(e.isVertexAI()){if(t.startsWith(`publishers/`)||t.startsWith(`projects/`)||t.startsWith(`models/`))return t;if(t.indexOf(`/`)>=0){let e=t.split(`/`,2);return`publishers/${e[0]}/models/${e[1]}`}else return`publishers/google/models/${t}`}else if(t.startsWith(`models/`)||t.startsWith(`tunedModels/`))return t;else return`models/${t}`}function an(e,t){let n=F(e,t);return n?n.startsWith(`publishers/`)&&e.isVertexAI()?`projects/${e.getProject()}/locations/${e.getLocation()}/${n}`:n.startsWith(`models/`)&&e.isVertexAI()?`projects/${e.getProject()}/locations/${e.getLocation()}/publishers/google/${n}`:n:``}function on(e){return Array.isArray(e)?e.map(e=>sn(e)):[sn(e)]}function sn(e){if(typeof e==`object`&&e)return e;throw Error(`Could not parse input as Blob. Unsupported blob type: ${typeof e}`)}function cn(e){let t=sn(e);if(t.mimeType&&t.mimeType.startsWith(`image/`))return t;throw Error(`Unsupported mime type: ${t.mimeType}`)}function ln(e){let t=sn(e);if(t.mimeType&&t.mimeType.startsWith(`audio/`))return t;throw Error(`Unsupported mime type: ${t.mimeType}`)}function un(e){if(e==null)throw Error(`PartUnion is required`);if(typeof e==`object`)return e;if(typeof e==`string`)return{text:e};throw Error(`Unsupported part type: ${typeof e}`)}function dn(e){if(e==null||Array.isArray(e)&&e.length===0)throw Error(`PartListUnion is required`);return Array.isArray(e)?e.map(e=>un(e)):[un(e)]}function fn(e){return typeof e==`object`&&!!e&&`parts`in e&&Array.isArray(e.parts)}function pn(e){return typeof e==`object`&&!!e&&`functionCall`in e}function mn(e){return typeof e==`object`&&!!e&&`functionResponse`in e}function I(e){if(e==null)throw Error(`ContentUnion is required`);return fn(e)?e:{role:`user`,parts:dn(e)}}function hn(e,t){if(!t)return[];if(e.isVertexAI()&&Array.isArray(t))return t.flatMap(e=>{let t=I(e);return t.parts&&t.parts.length>0&&t.parts[0].text!==void 0?[t.parts[0].text]:[]});if(e.isVertexAI()){let e=I(t);return e.parts&&e.parts.length>0&&e.parts[0].text!==void 0?[e.parts[0].text]:[]}return Array.isArray(t)?t.map(e=>I(e)):[I(t)]}function L(e){if(e==null||Array.isArray(e)&&e.length===0)throw Error(`contents are required`);if(!Array.isArray(e)){if(pn(e)||mn(e))throw Error(`To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them`);return[I(e)]}let t=[],n=[],r=fn(e[0]);for(let i of e){let e=fn(i);if(e!=r)throw Error(`Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them`);if(e)t.push(i);else if(pn(i)||mn(i))throw Error(`To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them`);else n.push(i)}return r||t.push({role:`user`,parts:dn(n)}),t}function gn(e,t){e.includes(`null`)&&(t.nullable=!0);let n=e.filter(e=>e!==`null`);if(n.length===1)t.type=Object.values(xe).includes(n[0].toUpperCase())?n[0].toUpperCase():xe.TYPE_UNSPECIFIED;else{t.anyOf=[];for(let e of n)t.anyOf.push({type:Object.values(xe).includes(e.toUpperCase())?e.toUpperCase():xe.TYPE_UNSPECIFIED})}}function _n(e){let t={},n=[`items`],r=[`anyOf`],i=[`properties`];if(e.type&&e.anyOf)throw Error(`type and anyOf cannot be both populated.`);let a=e.anyOf;a!=null&&a.length==2&&(a[0].type===`null`?(t.nullable=!0,e=a[1]):a[1].type===`null`&&(t.nullable=!0,e=a[0])),e.type instanceof Array&&gn(e.type,t);for(let[a,o]of Object.entries(e))if(o!=null)if(a==`type`){if(o===`null`)throw Error(`type: null can not be the only possible type for the field.`);if(o instanceof Array)continue;t.type=Object.values(xe).includes(o.toUpperCase())?o.toUpperCase():xe.TYPE_UNSPECIFIED}else if(n.includes(a))t[a]=_n(o);else if(r.includes(a)){let e=[];for(let n of o){if(n.type==`null`){t.nullable=!0;continue}e.push(_n(n))}t[a]=e}else if(i.includes(a)){let e={};for(let[t,n]of Object.entries(o))e[t]=_n(n);t[a]=e}else{if(a===`additionalProperties`)continue;t[a]=o}return t}function vn(e){return _n(e)}function yn(e){if(typeof e==`object`)return e;if(typeof e==`string`)return{voiceConfig:{prebuiltVoiceConfig:{voiceName:e}}};throw Error(`Unsupported speechConfig type: ${typeof e}`)}function bn(e){if(`multiSpeakerVoiceConfig`in e)throw Error(`multiSpeakerVoiceConfig is not supported in the live API.`);return e}function xn(e){if(e.functionDeclarations)for(let t of e.functionDeclarations)t.parameters&&(Object.keys(t.parameters).includes(`$schema`)?t.parametersJsonSchema||(t.parametersJsonSchema=t.parameters,delete t.parameters):t.parameters=_n(t.parameters)),t.response&&(Object.keys(t.response).includes(`$schema`)?t.responseJsonSchema||(t.responseJsonSchema=t.response,delete t.response):t.response=_n(t.response));return e}function Sn(e){if(e==null)throw Error(`tools is required`);if(!Array.isArray(e))throw Error(`tools is required and must be an array of Tools`);let t=[];for(let n of e)t.push(n);return t}function Cn(e,t,n,r=1){let i=!t.startsWith(`${n}/`)&&t.split(`/`).length===r;return e.isVertexAI()?t.startsWith(`projects/`)?t:t.startsWith(`locations/`)?`projects/${e.getProject()}/${t}`:t.startsWith(`${n}/`)?`projects/${e.getProject()}/locations/${e.getLocation()}/${t}`:i?`projects/${e.getProject()}/locations/${e.getLocation()}/${n}/${t}`:t:i?`${n}/${t}`:t}function R(e,t){if(typeof t!=`string`)throw Error(`name must be a string`);return Cn(e,t,`cachedContents`)}function wn(e){switch(e){case`STATE_UNSPECIFIED`:return`JOB_STATE_UNSPECIFIED`;case`CREATING`:return`JOB_STATE_RUNNING`;case`ACTIVE`:return`JOB_STATE_SUCCEEDED`;case`FAILED`:return`JOB_STATE_FAILED`;default:return e}}function z(e){return ne(e)}function Tn(e){return typeof e==`object`&&!!e&&`name`in e}function En(e){return typeof e==`object`&&!!e&&`video`in e}function Dn(e){return typeof e==`object`&&!!e&&`uri`in e}function On(e){let t;if(Tn(e)&&(t=e.name),!(Dn(e)&&(t=e.uri,t===void 0))&&!(En(e)&&(t=e.video?.uri,t===void 0))){if(typeof e==`string`&&(t=e),t===void 0)throw Error(`Could not extract file name from the provided input.`);if(t.startsWith(`https://`)){let e=t.split(`files/`)[1].match(/[a-z0-9]+/);if(e===null)throw Error(`Could not extract file name from URI ${t}`);t=e[0]}else t.startsWith(`files/`)&&(t=t.split(`files/`)[1]);return t}}function kn(e,t){let n;return n=e.isVertexAI()?t?`publishers/google/models`:`models`:t?`models`:`tunedModels`,n}function An(e){for(let t of[`models`,`tunedModels`,`publisherModels`])if(jn(e,t))return e[t];return[]}function jn(e,t){return typeof e==`object`&&!!e&&t in e}function Mn(e,t={}){let n=e,r={name:n.name,description:n.description,parametersJsonSchema:n.inputSchema};return n.outputSchema&&(r.responseJsonSchema=n.outputSchema),t.behavior&&(r.behavior=t.behavior),{functionDeclarations:[r]}}function Nn(e,t={}){let n=[],r=new Set;for(let i of e){let e=i.name;if(r.has(e))throw Error(`Duplicate function name ${e} found in MCP tools. Please ensure function names are unique.`);r.add(e);let a=Mn(i,t);a.functionDeclarations&&n.push(...a.functionDeclarations)}return{functionDeclarations:n}}function Pn(e,t){let n;if(typeof t==`string`)if(e.isVertexAI())if(t.startsWith(`gs://`))n={format:`jsonl`,gcsUri:[t]};else if(t.startsWith(`bq://`))n={format:`bigquery`,bigqueryUri:t};else throw Error(`Unsupported string source for Vertex AI: ${t}`);else if(t.startsWith(`files/`))n={fileName:t};else throw Error(`Unsupported string source for Gemini API: ${t}`);else if(Array.isArray(t)){if(e.isVertexAI())throw Error(`InlinedRequest[] is not supported in Vertex AI.`);n={inlinedRequests:t}}else n=t;let r=[n.gcsUri,n.bigqueryUri].filter(Boolean).length,i=[n.inlinedRequests,n.fileName].filter(Boolean).length;if(e.isVertexAI()){if(i>0||r!==1)throw Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.")}else if(r>0||i!==1)throw Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");return n}function Fn(e){if(typeof e!=`string`)return e;let t=e;if(t.startsWith(`gs://`))return{format:`jsonl`,gcsUri:t};if(t.startsWith(`bq://`))return{format:`bigquery`,bigqueryUri:t};throw Error(`Unsupported destination: ${t}`)}function In(e){if(typeof e!=`object`||!e)return{};let t=e,n=t.inlinedResponses;if(typeof n!=`object`||!n)return e;let r=n.inlinedResponses;if(!Array.isArray(r)||r.length===0)return e;let i=!1;for(let e of r){if(typeof e!=`object`||!e)continue;let t=e.response;if(!(typeof t!=`object`||!t)&&t.embedding!==void 0){i=!0;break}}return i&&(t.inlinedEmbedContentResponses=t.inlinedResponses,delete t.inlinedResponses),e}function Ln(e,t){let n=t;if(!e.isVertexAI()){if(/batches\/[^/]+$/.test(n))return n.split(`/`).pop();throw Error(`Invalid batch job name: ${n}.`)}if(/^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/.test(n))return n.split(`/`).pop();if(/^\d+$/.test(n))return n;throw Error(`Invalid batch job name: ${n}.`)}function Rn(e){let t=e;return t===`BATCH_STATE_UNSPECIFIED`?`JOB_STATE_UNSPECIFIED`:t===`BATCH_STATE_PENDING`?`JOB_STATE_PENDING`:t===`BATCH_STATE_RUNNING`?`JOB_STATE_RUNNING`:t===`BATCH_STATE_SUCCEEDED`?`JOB_STATE_SUCCEEDED`:t===`BATCH_STATE_FAILED`?`JOB_STATE_FAILED`:t===`BATCH_STATE_CANCELLED`?`JOB_STATE_CANCELLED`:t===`BATCH_STATE_EXPIRED`?`JOB_STATE_EXPIRED`:t}function zn(e){return e.includes(`gemini`)&&e!==`gemini-embedding-001`||e.includes(`maas`)}function Bn(e){let t={},n=P(e,[`apiKey`]);if(n!=null&&N(t,[`apiKey`],n),P(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(P(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(P(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(P(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(P(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(P(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Vn(e){let t={},n=P(e,[`responsesFile`]);n!=null&&N(t,[`fileName`],n);let r=P(e,[`inlinedResponses`,`inlinedResponses`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Tr(e))),N(t,[`inlinedResponses`],e)}let i=P(e,[`inlinedEmbedContentResponses`,`inlinedResponses`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`inlinedEmbedContentResponses`],e)}return t}function Hn(e){let t={},n=P(e,[`predictionsFormat`]);n!=null&&N(t,[`format`],n);let r=P(e,[`gcsDestination`,`outputUriPrefix`]);r!=null&&N(t,[`gcsUri`],r);let i=P(e,[`bigqueryDestination`,`outputUri`]);return i!=null&&N(t,[`bigqueryUri`],i),t}function Un(e){let t={},n=P(e,[`format`]);n!=null&&N(t,[`predictionsFormat`],n);let r=P(e,[`gcsUri`]);r!=null&&N(t,[`gcsDestination`,`outputUriPrefix`],r);let i=P(e,[`bigqueryUri`]);if(i!=null&&N(t,[`bigqueryDestination`,`outputUri`],i),P(e,[`fileName`])!==void 0)throw Error(`fileName parameter is not supported in Vertex AI.`);if(P(e,[`inlinedResponses`])!==void 0)throw Error(`inlinedResponses parameter is not supported in Vertex AI.`);if(P(e,[`inlinedEmbedContentResponses`])!==void 0)throw Error(`inlinedEmbedContentResponses parameter is not supported in Vertex AI.`);return t}function Wn(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`,`displayName`]);r!=null&&N(t,[`displayName`],r);let i=P(e,[`metadata`,`state`]);i!=null&&N(t,[`state`],Rn(i));let a=P(e,[`metadata`,`createTime`]);a!=null&&N(t,[`createTime`],a);let o=P(e,[`metadata`,`endTime`]);o!=null&&N(t,[`endTime`],o);let s=P(e,[`metadata`,`updateTime`]);s!=null&&N(t,[`updateTime`],s);let c=P(e,[`metadata`,`model`]);c!=null&&N(t,[`model`],c);let l=P(e,[`metadata`,`output`]);return l!=null&&N(t,[`dest`],Vn(In(l))),t}function Gn(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`displayName`]);r!=null&&N(t,[`displayName`],r);let i=P(e,[`state`]);i!=null&&N(t,[`state`],Rn(i));let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`createTime`]);o!=null&&N(t,[`createTime`],o);let s=P(e,[`startTime`]);s!=null&&N(t,[`startTime`],s);let c=P(e,[`endTime`]);c!=null&&N(t,[`endTime`],c);let l=P(e,[`updateTime`]);l!=null&&N(t,[`updateTime`],l);let u=P(e,[`model`]);u!=null&&N(t,[`model`],u);let d=P(e,[`inputConfig`]);d!=null&&N(t,[`src`],Kn(d));let f=P(e,[`outputConfig`]);f!=null&&N(t,[`dest`],Hn(In(f)));let p=P(e,[`completionStats`]);return p!=null&&N(t,[`completionStats`],p),t}function Kn(e){let t={},n=P(e,[`instancesFormat`]);n!=null&&N(t,[`format`],n);let r=P(e,[`gcsSource`,`uris`]);r!=null&&N(t,[`gcsUri`],r);let i=P(e,[`bigquerySource`,`inputUri`]);return i!=null&&N(t,[`bigqueryUri`],i),t}function qn(e,t){let n={};if(P(t,[`format`])!==void 0)throw Error(`format parameter is not supported in Gemini API.`);if(P(t,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);if(P(t,[`bigqueryUri`])!==void 0)throw Error(`bigqueryUri parameter is not supported in Gemini API.`);let r=P(t,[`fileName`]);r!=null&&N(n,[`fileName`],r);let i=P(t,[`inlinedRequests`]);if(i!=null){let t=i;Array.isArray(t)&&(t=t.map(t=>wr(e,t))),N(n,[`requests`,`requests`],t)}return n}function Jn(e){let t={},n=P(e,[`format`]);n!=null&&N(t,[`instancesFormat`],n);let r=P(e,[`gcsUri`]);r!=null&&N(t,[`gcsSource`,`uris`],r);let i=P(e,[`bigqueryUri`]);if(i!=null&&N(t,[`bigquerySource`,`inputUri`],i),P(e,[`fileName`])!==void 0)throw Error(`fileName parameter is not supported in Vertex AI.`);if(P(e,[`inlinedRequests`])!==void 0)throw Error(`inlinedRequests parameter is not supported in Vertex AI.`);return t}function Yn(e){let t={},n=P(e,[`data`]);if(n!=null&&N(t,[`data`],n),P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Xn(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function Zn(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function Qn(e){let t={},n=P(e,[`content`]);n!=null&&N(t,[`content`],n);let r=P(e,[`citationMetadata`]);r!=null&&N(t,[`citationMetadata`],$n(r));let i=P(e,[`tokenCount`]);i!=null&&N(t,[`tokenCount`],i);let a=P(e,[`finishReason`]);a!=null&&N(t,[`finishReason`],a);let o=P(e,[`groundingMetadata`]);o!=null&&N(t,[`groundingMetadata`],o);let s=P(e,[`avgLogprobs`]);s!=null&&N(t,[`avgLogprobs`],s);let c=P(e,[`index`]);c!=null&&N(t,[`index`],c);let l=P(e,[`logprobsResult`]);l!=null&&N(t,[`logprobsResult`],l);let u=P(e,[`safetyRatings`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`safetyRatings`],e)}let d=P(e,[`urlContextMetadata`]);return d!=null&&N(t,[`urlContextMetadata`],d),t}function $n(e){let t={},n=P(e,[`citationSources`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`citations`],e)}return t}function er(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>Mr(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function tr(e,t){let n={},r=P(e,[`displayName`]);if(t!==void 0&&r!=null&&N(t,[`batch`,`displayName`],r),P(e,[`dest`])!==void 0)throw Error(`dest parameter is not supported in Gemini API.`);return n}function nr(e,t){let n={},r=P(e,[`displayName`]);t!==void 0&&r!=null&&N(t,[`displayName`],r);let i=P(e,[`dest`]);return t!==void 0&&i!=null&&N(t,[`outputConfig`],Un(Fn(i))),n}function rr(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`_url`,`model`],F(e,r));let i=P(t,[`src`]);i!=null&&N(n,[`batch`,`inputConfig`],qn(e,Pn(e,i)));let a=P(t,[`config`]);return a!=null&&tr(a,n),n}function ir(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`model`],F(e,r));let i=P(t,[`src`]);i!=null&&N(n,[`inputConfig`],Jn(Pn(e,i)));let a=P(t,[`config`]);return a!=null&&nr(a,n),n}function ar(e,t){let n={},r=P(e,[`displayName`]);return t!==void 0&&r!=null&&N(t,[`batch`,`displayName`],r),n}function or(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`_url`,`model`],F(e,r));let i=P(t,[`src`]);i!=null&&N(n,[`batch`,`inputConfig`],pr(e,i));let a=P(t,[`config`]);return a!=null&&ar(a,n),n}function sr(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function cr(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function lr(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`name`]);r!=null&&N(t,[`name`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);return a!=null&&N(t,[`error`],a),t}function ur(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`name`]);r!=null&&N(t,[`name`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);return a!=null&&N(t,[`error`],a),t}function dr(e,t){let n={},r=P(t,[`contents`]);if(r!=null){let t=hn(e,r);Array.isArray(t)&&(t=t.map(e=>e)),N(n,[`requests[]`,`request`,`content`],t)}let i=P(t,[`config`]);return i!=null&&(N(n,[`_self`],fr(i,n)),ee(n,{"requests[].*":`requests[].request.*`})),n}function fr(e,t){let n={},r=P(e,[`taskType`]);t!==void 0&&r!=null&&N(t,[`requests[]`,`taskType`],r);let i=P(e,[`title`]);t!==void 0&&i!=null&&N(t,[`requests[]`,`title`],i);let a=P(e,[`outputDimensionality`]);if(t!==void 0&&a!=null&&N(t,[`requests[]`,`outputDimensionality`],a),P(e,[`mimeType`])!==void 0)throw Error(`mimeType parameter is not supported in Gemini API.`);if(P(e,[`autoTruncate`])!==void 0)throw Error(`autoTruncate parameter is not supported in Gemini API.`);return n}function pr(e,t){let n={},r=P(t,[`fileName`]);r!=null&&N(n,[`file_name`],r);let i=P(t,[`inlinedRequests`]);return i!=null&&N(n,[`requests`],dr(e,i)),n}function mr(e){let t={};if(P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=P(e,[`fileUri`]);n!=null&&N(t,[`fileUri`],n);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function hr(e){let t={},n=P(e,[`id`]);n!=null&&N(t,[`id`],n);let r=P(e,[`args`]);r!=null&&N(t,[`args`],r);let i=P(e,[`name`]);if(i!=null&&N(t,[`name`],i),P(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(P(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function gr(e){let t={},n=P(e,[`allowedFunctionNames`]);n!=null&&N(t,[`allowedFunctionNames`],n);let r=P(e,[`mode`]);if(r!=null&&N(t,[`mode`],r),P(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return t}function _r(e,t,n){let r={},i=P(t,[`systemInstruction`]);n!==void 0&&i!=null&&N(n,[`systemInstruction`],er(I(i)));let a=P(t,[`temperature`]);a!=null&&N(r,[`temperature`],a);let o=P(t,[`topP`]);o!=null&&N(r,[`topP`],o);let s=P(t,[`topK`]);s!=null&&N(r,[`topK`],s);let c=P(t,[`candidateCount`]);c!=null&&N(r,[`candidateCount`],c);let l=P(t,[`maxOutputTokens`]);l!=null&&N(r,[`maxOutputTokens`],l);let u=P(t,[`stopSequences`]);u!=null&&N(r,[`stopSequences`],u);let d=P(t,[`responseLogprobs`]);d!=null&&N(r,[`responseLogprobs`],d);let f=P(t,[`logprobs`]);f!=null&&N(r,[`logprobs`],f);let p=P(t,[`presencePenalty`]);p!=null&&N(r,[`presencePenalty`],p);let m=P(t,[`frequencyPenalty`]);m!=null&&N(r,[`frequencyPenalty`],m);let h=P(t,[`seed`]);h!=null&&N(r,[`seed`],h);let g=P(t,[`responseMimeType`]);g!=null&&N(r,[`responseMimeType`],g);let _=P(t,[`responseSchema`]);_!=null&&N(r,[`responseSchema`],vn(_));let v=P(t,[`responseJsonSchema`]);if(v!=null&&N(r,[`responseJsonSchema`],v),P(t,[`routingConfig`])!==void 0)throw Error(`routingConfig parameter is not supported in Gemini API.`);if(P(t,[`modelSelectionConfig`])!==void 0)throw Error(`modelSelectionConfig parameter is not supported in Gemini API.`);let y=P(t,[`safetySettings`]);if(n!==void 0&&y!=null){let e=y;Array.isArray(e)&&(e=e.map(e=>Nr(e))),N(n,[`safetySettings`],e)}let b=P(t,[`tools`]);if(n!==void 0&&b!=null){let e=Sn(b);Array.isArray(e)&&(e=e.map(e=>Fr(xn(e)))),N(n,[`tools`],e)}let x=P(t,[`toolConfig`]);if(n!==void 0&&x!=null&&N(n,[`toolConfig`],Pr(x)),P(t,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let S=P(t,[`cachedContent`]);n!==void 0&&S!=null&&N(n,[`cachedContent`],R(e,S));let C=P(t,[`responseModalities`]);C!=null&&N(r,[`responseModalities`],C);let w=P(t,[`mediaResolution`]);w!=null&&N(r,[`mediaResolution`],w);let T=P(t,[`speechConfig`]);if(T!=null&&N(r,[`speechConfig`],yn(T)),P(t,[`audioTimestamp`])!==void 0)throw Error(`audioTimestamp parameter is not supported in Gemini API.`);let E=P(t,[`thinkingConfig`]);E!=null&&N(r,[`thinkingConfig`],E);let D=P(t,[`imageConfig`]);D!=null&&N(r,[`imageConfig`],Cr(D));let O=P(t,[`enableEnhancedCivicAnswers`]);if(O!=null&&N(r,[`enableEnhancedCivicAnswers`],O),P(t,[`modelArmorConfig`])!==void 0)throw Error(`modelArmorConfig parameter is not supported in Gemini API.`);let k=P(t,[`serviceTier`]);return n!==void 0&&k!=null&&N(n,[`serviceTier`],k),r}function vr(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`candidates`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Qn(e))),N(t,[`candidates`],e)}let i=P(e,[`modelVersion`]);i!=null&&N(t,[`modelVersion`],i);let a=P(e,[`promptFeedback`]);a!=null&&N(t,[`promptFeedback`],a);let o=P(e,[`responseId`]);o!=null&&N(t,[`responseId`],o);let s=P(e,[`usageMetadata`]);s!=null&&N(t,[`usageMetadata`],s);let c=P(e,[`modelStatus`]);return c!=null&&N(t,[`modelStatus`],c),t}function yr(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function br(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],Ln(e,r)),n}function xr(e){let t={},n=P(e,[`authConfig`]);n!=null&&N(t,[`authConfig`],Bn(n));let r=P(e,[`enableWidget`]);return r!=null&&N(t,[`enableWidget`],r),t}function Sr(e){let t={},n=P(e,[`searchTypes`]);if(n!=null&&N(t,[`searchTypes`],n),P(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(P(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=P(e,[`timeRangeFilter`]);return r!=null&&N(t,[`timeRangeFilter`],r),t}function Cr(e){let t={},n=P(e,[`aspectRatio`]);n!=null&&N(t,[`aspectRatio`],n);let r=P(e,[`imageSize`]);if(r!=null&&N(t,[`imageSize`],r),P(e,[`personGeneration`])!==void 0)throw Error(`personGeneration parameter is not supported in Gemini API.`);if(P(e,[`prominentPeople`])!==void 0)throw Error(`prominentPeople parameter is not supported in Gemini API.`);if(P(e,[`outputMimeType`])!==void 0)throw Error(`outputMimeType parameter is not supported in Gemini API.`);if(P(e,[`outputCompressionQuality`])!==void 0)throw Error(`outputCompressionQuality parameter is not supported in Gemini API.`);if(P(e,[`imageOutputOptions`])!==void 0)throw Error(`imageOutputOptions parameter is not supported in Gemini API.`);return t}function wr(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`request`,`model`],F(e,r));let i=P(t,[`contents`]);if(i!=null){let e=L(i);Array.isArray(e)&&(e=e.map(e=>er(e))),N(n,[`request`,`contents`],e)}let a=P(t,[`metadata`]);a!=null&&N(n,[`metadata`],a);let o=P(t,[`config`]);return o!=null&&N(n,[`request`,`generationConfig`],_r(e,o,P(n,[`request`],{}))),n}function Tr(e){let t={},n=P(e,[`response`]);n!=null&&N(t,[`response`],vr(n));let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`error`]);return i!=null&&N(t,[`error`],i),t}function Er(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);if(t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),P(e,[`filter`])!==void 0)throw Error(`filter parameter is not supported in Gemini API.`);return n}function Dr(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i);let a=P(e,[`filter`]);return t!==void 0&&a!=null&&N(t,[`_query`,`filter`],a),n}function Or(e){let t={},n=P(e,[`config`]);return n!=null&&Er(n,t),t}function kr(e){let t={},n=P(e,[`config`]);return n!=null&&Dr(n,t),t}function Ar(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`operations`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Wn(e))),N(t,[`batchJobs`],e)}return t}function jr(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`batchPredictionJobs`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Gn(e))),N(t,[`batchJobs`],e)}return t}function Mr(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],mr(a));let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],hr(o));let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],Yn(c));let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);f!=null&&N(t,[`videoMetadata`],f);let p=P(e,[`toolCall`]);p!=null&&N(t,[`toolCall`],p);let m=P(e,[`toolResponse`]);m!=null&&N(t,[`toolResponse`],m);let h=P(e,[`partMetadata`]);return h!=null&&N(t,[`partMetadata`],h),t}function Nr(e){let t={},n=P(e,[`category`]);if(n!=null&&N(t,[`category`],n),P(e,[`method`])!==void 0)throw Error(`method parameter is not supported in Gemini API.`);let r=P(e,[`threshold`]);return r!=null&&N(t,[`threshold`],r),t}function Pr(e){let t={},n=P(e,[`retrievalConfig`]);n!=null&&N(t,[`retrievalConfig`],n);let r=P(e,[`functionCallingConfig`]);r!=null&&N(t,[`functionCallingConfig`],gr(r));let i=P(e,[`includeServerSideToolInvocations`]);return i!=null&&N(t,[`includeServerSideToolInvocations`],i),t}function Fr(e){let t={};if(P(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=P(e,[`computerUse`]);n!=null&&N(t,[`computerUse`],n);let r=P(e,[`fileSearch`]);r!=null&&N(t,[`fileSearch`],r);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],Sr(i));let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],xr(a));let o=P(e,[`codeExecution`]);if(o!=null&&N(t,[`codeExecution`],o),P(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=P(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`functionDeclarations`],e)}let c=P(e,[`googleSearchRetrieval`]);if(c!=null&&N(t,[`googleSearchRetrieval`],c),P(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=P(e,[`urlContext`]);l!=null&&N(t,[`urlContext`],l);let u=P(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`mcpServers`],e)}return t}var B;(function(e){e.PAGED_ITEM_BATCH_JOBS=`batchJobs`,e.PAGED_ITEM_MODELS=`models`,e.PAGED_ITEM_TUNING_JOBS=`tuningJobs`,e.PAGED_ITEM_FILES=`files`,e.PAGED_ITEM_CACHED_CONTENTS=`cachedContents`,e.PAGED_ITEM_FILE_SEARCH_STORES=`fileSearchStores`,e.PAGED_ITEM_DOCUMENTS=`documents`})(B||={});var Ir=class{constructor(e,t,n,r){this.pageInternal=[],this.paramsInternal={},this.requestInternal=t,this.init(e,n,r)}init(e,t,n){this.nameInternal=e,this.pageInternal=t[this.nameInternal]||[],this.sdkHttpResponseInternal=t?.sdkHttpResponse,this.idxInternal=0;let r={config:{}};r=!n||Object.keys(n).length===0?{config:{}}:typeof n==`object`?Object.assign({},n):n,r.config&&(r.config.pageToken=t.nextPageToken),this.paramsInternal=r,this.pageInternalSize=r.config?.pageSize??this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get sdkHttpResponse(){return this.sdkHttpResponseInternal}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};let e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw Error(`No more pages to fetch.`);let e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){return this.params.config?.pageToken!==void 0}},Lr=class extends j{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Ir(B.PAGED_ITEM_BATCH_JOBS,e=>this.listInternal(e),await this.listInternal(e),e),this.create=async e=>(this.apiClient.isVertexAI()&&(e.config=this.formatDestination(e.src,e.config)),this.createInternal(e)),this.createEmbeddings=async e=>{if(console.warn(`batches.createEmbeddings() is experimental and may change without notice.`),this.apiClient.isVertexAI())throw Error(`Vertex AI does not support batches.createEmbeddings.`);return this.createEmbeddingsInternal(e)}}createInlinedGenerateContentRequest(e){let t=rr(this.apiClient,e),n=t._url,r=M(`{model}:batchGenerateContent`,n),i=t.batch.inputConfig.requests,a=i.requests,o=[];for(let e of a){let t=Object.assign({},e);if(t.systemInstruction){let e=t.systemInstruction;delete t.systemInstruction;let n=t.request;n.systemInstruction=e,t.request=n}o.push(t)}return i.requests=o,delete t.config,delete t._url,delete t._query,{path:r,body:t}}getGcsUri(e){if(typeof e==`string`)return e.startsWith(`gs://`)?e:void 0;if(!Array.isArray(e)&&e.gcsUri&&e.gcsUri.length>0)return e.gcsUri[0]}getBigqueryUri(e){if(typeof e==`string`)return e.startsWith(`bq://`)?e:void 0;if(!Array.isArray(e))return e.bigqueryUri}formatDestination(e,t){let n=t?Object.assign({},t):{},r=Date.now().toString();if(n.displayName||=`genaiBatchJob_${r}`,n.dest===void 0){let t=this.getGcsUri(e),i=this.getBigqueryUri(e);if(t)t.endsWith(`.jsonl`)?n.dest=`${t.slice(0,-6)}/dest`:n.dest=`${t}_dest_${r}`;else if(i)n.dest=`${i}_dest_${r}`;else throw Error(`Unsupported source for Vertex AI: No GCS or BigQuery URI found.`)}return n}async createInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ir(this.apiClient,e);return n=M(`batchPredictionJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Gn(e))}else{let i=rr(this.apiClient,e);return n=M(`{model}:batchGenerateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Wn(e))}}async createEmbeddingsInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=or(this.apiClient,e);return n=M(`{model}:asyncBatchEmbedContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Wn(e))}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=br(this.apiClient,e);return n=M(`batchPredictionJobs/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Gn(e))}else{let i=yr(this.apiClient,e);return n=M(`batches/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Wn(e))}}async cancel(e){let t=``,n={};if(this.apiClient.isVertexAI()){let r=Zn(this.apiClient,e);t=M(`batchPredictionJobs/{name}:cancel`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}else{let r=Xn(this.apiClient,e);t=M(`batches/{name}:cancel`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=kr(e);return n=M(`batchPredictionJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=jr(e),n=new en;return Object.assign(n,t),n})}else{let i=Or(e);return n=M(`batches`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ar(e),n=new en;return Object.assign(n,t),n})}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=cr(this.apiClient,e);return n=M(`batchPredictionJobs/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>ur(e))}else{let i=sr(this.apiClient,e);return n=M(`batches/{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>lr(e))}}};function Rr(e){let t={},n=P(e,[`apiKey`]);if(n!=null&&N(t,[`apiKey`],n),P(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(P(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(P(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(P(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(P(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(P(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function zr(e){let t={},n=P(e,[`data`]);if(n!=null&&N(t,[`data`],n),P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Br(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>ui(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function Vr(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>di(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function Hr(e,t){let n={},r=P(e,[`ttl`]);t!==void 0&&r!=null&&N(t,[`ttl`],r);let i=P(e,[`expireTime`]);t!==void 0&&i!=null&&N(t,[`expireTime`],i);let a=P(e,[`displayName`]);t!==void 0&&a!=null&&N(t,[`displayName`],a);let o=P(e,[`contents`]);if(t!==void 0&&o!=null){let e=L(o);Array.isArray(e)&&(e=e.map(e=>Br(e))),N(t,[`contents`],e)}let s=P(e,[`systemInstruction`]);t!==void 0&&s!=null&&N(t,[`systemInstruction`],Br(I(s)));let c=P(e,[`tools`]);if(t!==void 0&&c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>mi(e))),N(t,[`tools`],e)}let l=P(e,[`toolConfig`]);if(t!==void 0&&l!=null&&N(t,[`toolConfig`],fi(l)),P(e,[`kmsKeyName`])!==void 0)throw Error(`kmsKeyName parameter is not supported in Gemini API.`);return n}function Ur(e,t){let n={},r=P(e,[`ttl`]);t!==void 0&&r!=null&&N(t,[`ttl`],r);let i=P(e,[`expireTime`]);t!==void 0&&i!=null&&N(t,[`expireTime`],i);let a=P(e,[`displayName`]);t!==void 0&&a!=null&&N(t,[`displayName`],a);let o=P(e,[`contents`]);if(t!==void 0&&o!=null){let e=L(o);Array.isArray(e)&&(e=e.map(e=>Vr(e))),N(t,[`contents`],e)}let s=P(e,[`systemInstruction`]);t!==void 0&&s!=null&&N(t,[`systemInstruction`],Vr(I(s)));let c=P(e,[`tools`]);if(t!==void 0&&c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>hi(e))),N(t,[`tools`],e)}let l=P(e,[`toolConfig`]);t!==void 0&&l!=null&&N(t,[`toolConfig`],pi(l));let u=P(e,[`kmsKeyName`]);return t!==void 0&&u!=null&&N(t,[`encryption_spec`,`kmsKeyName`],u),n}function Wr(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`model`],an(e,r));let i=P(t,[`config`]);return i!=null&&Hr(i,n),n}function Gr(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`model`],an(e,r));let i=P(t,[`config`]);return i!=null&&Ur(i,n),n}function Kr(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],R(e,r)),n}function qr(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],R(e,r)),n}function Jr(e){let t={},n=P(e,[`sdkHttpResponse`]);return n!=null&&N(t,[`sdkHttpResponse`],n),t}function Yr(e){let t={},n=P(e,[`sdkHttpResponse`]);return n!=null&&N(t,[`sdkHttpResponse`],n),t}function Xr(e){let t={};if(P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=P(e,[`fileUri`]);n!=null&&N(t,[`fileUri`],n);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Zr(e){let t={},n=P(e,[`id`]);n!=null&&N(t,[`id`],n);let r=P(e,[`args`]);r!=null&&N(t,[`args`],r);let i=P(e,[`name`]);if(i!=null&&N(t,[`name`],i),P(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(P(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function Qr(e){let t={},n=P(e,[`allowedFunctionNames`]);n!=null&&N(t,[`allowedFunctionNames`],n);let r=P(e,[`mode`]);if(r!=null&&N(t,[`mode`],r),P(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return t}function $r(e){let t={},n=P(e,[`description`]);n!=null&&N(t,[`description`],n);let r=P(e,[`name`]);r!=null&&N(t,[`name`],r);let i=P(e,[`parameters`]);i!=null&&N(t,[`parameters`],i);let a=P(e,[`parametersJsonSchema`]);a!=null&&N(t,[`parametersJsonSchema`],a);let o=P(e,[`response`]);o!=null&&N(t,[`response`],o);let s=P(e,[`responseJsonSchema`]);if(s!=null&&N(t,[`responseJsonSchema`],s),P(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return t}function ei(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],R(e,r)),n}function ti(e,t){let n={},r=P(t,[`name`]);return r!=null&&N(n,[`_url`,`name`],R(e,r)),n}function ni(e){let t={},n=P(e,[`authConfig`]);n!=null&&N(t,[`authConfig`],Rr(n));let r=P(e,[`enableWidget`]);return r!=null&&N(t,[`enableWidget`],r),t}function ri(e){let t={},n=P(e,[`searchTypes`]);if(n!=null&&N(t,[`searchTypes`],n),P(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(P(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=P(e,[`timeRangeFilter`]);return r!=null&&N(t,[`timeRangeFilter`],r),t}function ii(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);return t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),n}function ai(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);return t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),n}function oi(e){let t={},n=P(e,[`config`]);return n!=null&&ii(n,t),t}function si(e){let t={},n=P(e,[`config`]);return n!=null&&ai(n,t),t}function ci(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`cachedContents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`cachedContents`],e)}return t}function li(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`cachedContents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`cachedContents`],e)}return t}function ui(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],Xr(a));let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],Zr(o));let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],zr(c));let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);f!=null&&N(t,[`videoMetadata`],f);let p=P(e,[`toolCall`]);p!=null&&N(t,[`toolCall`],p);let m=P(e,[`toolResponse`]);m!=null&&N(t,[`toolResponse`],m);let h=P(e,[`partMetadata`]);return h!=null&&N(t,[`partMetadata`],h),t}function di(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],a);let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],o);let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],c);let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);if(f!=null&&N(t,[`videoMetadata`],f),P(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(P(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(P(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return t}function fi(e){let t={},n=P(e,[`retrievalConfig`]);n!=null&&N(t,[`retrievalConfig`],n);let r=P(e,[`functionCallingConfig`]);r!=null&&N(t,[`functionCallingConfig`],Qr(r));let i=P(e,[`includeServerSideToolInvocations`]);return i!=null&&N(t,[`includeServerSideToolInvocations`],i),t}function pi(e){let t={},n=P(e,[`retrievalConfig`]);n!=null&&N(t,[`retrievalConfig`],n);let r=P(e,[`functionCallingConfig`]);if(r!=null&&N(t,[`functionCallingConfig`],r),P(e,[`includeServerSideToolInvocations`])!==void 0)throw Error(`includeServerSideToolInvocations parameter is not supported in Vertex AI.`);return t}function mi(e){let t={};if(P(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=P(e,[`computerUse`]);n!=null&&N(t,[`computerUse`],n);let r=P(e,[`fileSearch`]);r!=null&&N(t,[`fileSearch`],r);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],ri(i));let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],ni(a));let o=P(e,[`codeExecution`]);if(o!=null&&N(t,[`codeExecution`],o),P(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=P(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`functionDeclarations`],e)}let c=P(e,[`googleSearchRetrieval`]);if(c!=null&&N(t,[`googleSearchRetrieval`],c),P(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=P(e,[`urlContext`]);l!=null&&N(t,[`urlContext`],l);let u=P(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`mcpServers`],e)}return t}function hi(e){let t={},n=P(e,[`retrieval`]);n!=null&&N(t,[`retrieval`],n);let r=P(e,[`computerUse`]);if(r!=null&&N(t,[`computerUse`],r),P(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],i);let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],a);let o=P(e,[`codeExecution`]);o!=null&&N(t,[`codeExecution`],o);let s=P(e,[`enterpriseWebSearch`]);s!=null&&N(t,[`enterpriseWebSearch`],s);let c=P(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>$r(e))),N(t,[`functionDeclarations`],e)}let l=P(e,[`googleSearchRetrieval`]);l!=null&&N(t,[`googleSearchRetrieval`],l);let u=P(e,[`parallelAiSearch`]);u!=null&&N(t,[`parallelAiSearch`],u);let d=P(e,[`urlContext`]);if(d!=null&&N(t,[`urlContext`],d),P(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return t}function gi(e,t){let n={},r=P(e,[`ttl`]);t!==void 0&&r!=null&&N(t,[`ttl`],r);let i=P(e,[`expireTime`]);return t!==void 0&&i!=null&&N(t,[`expireTime`],i),n}function _i(e,t){let n={},r=P(e,[`ttl`]);t!==void 0&&r!=null&&N(t,[`ttl`],r);let i=P(e,[`expireTime`]);return t!==void 0&&i!=null&&N(t,[`expireTime`],i),n}function vi(e,t){let n={},r=P(t,[`name`]);r!=null&&N(n,[`_url`,`name`],R(e,r));let i=P(t,[`config`]);return i!=null&&gi(i,n),n}function yi(e,t){let n={},r=P(t,[`name`]);r!=null&&N(n,[`_url`,`name`],R(e,r));let i=P(t,[`config`]);return i!=null&&_i(i,n),n}var bi=class extends j{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Ir(B.PAGED_ITEM_CACHED_CONTENTS,e=>this.listInternal(e),await this.listInternal(e),e)}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Gr(this.apiClient,e);return n=M(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=Wr(this.apiClient,e);return n=M(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ti(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=ei(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=qr(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Yr(e),n=new Wt;return Object.assign(n,t),n})}else{let i=Kr(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Jr(e),n=new Wt;return Object.assign(n,t),n})}}async update(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=yi(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}else{let i=vi(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=si(e);return n=M(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=li(e),n=new Gt;return Object.assign(n,t),n})}else{let i=oi(e);return n=M(`cachedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ci(e),n=new Gt;return Object.assign(n,t),n})}}};function xi(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function Si(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function V(e){return this instanceof V?(this.v=e,this):new V(e)}function H(e,t,n){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var r=n.apply(e,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator==`function`?AsyncIterator:Object).prototype),s(`next`),s(`throw`),s(`return`,o),i[Symbol.asyncIterator]=function(){return this},i;function o(e){return function(t){return Promise.resolve(t).then(e,d)}}function s(e,t){r[e]&&(i[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||c(e,t)})},t&&(i[e]=t(i[e])))}function c(e,t){try{l(r[e](t))}catch(e){f(a[0][3],e)}}function l(e){e.value instanceof V?Promise.resolve(e.value.v).then(u,d):f(a[0][2],e)}function u(e){c(`next`,e)}function d(e){c(`throw`,e)}function f(e,t){e(t),a.shift(),a.length&&c(a[0][0],a[0][1])}}function U(e){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof Si==`function`?Si(e):e[Symbol.iterator](),n={},r(`next`),r(`throw`),r(`return`),n[Symbol.asyncIterator]=function(){return this},n);function r(t){n[t]=e[t]&&function(n){return new Promise(function(r,a){n=e[t](n),i(r,a,n.done,n.value)})}}function i(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}}function Ci(e){if(e.candidates==null||e.candidates.length===0)return!1;let t=e.candidates[0]?.content;return t===void 0?!1:wi(t)}function wi(e){if(e.parts===void 0||e.parts.length===0)return!1;for(let t of e.parts)if(t===void 0||Object.keys(t).length===0)return!1;return!0}function Ti(e){if(e.length!==0){for(let t of e)if(t.role!==`user`&&t.role!==`model`)throw Error(`Role must be user or model, but got ${t.role}.`)}}function Ei(e){if(e===void 0||e.length===0)return[];let t=[],n=e.length,r=0;for(;r<n;)if(e[r].role===`user`)t.push(e[r]),r++;else{let i=[],a=!0;for(;r<n&&e[r].role===`model`;)i.push(e[r]),a&&!wi(e[r])&&(a=!1),r++;a?t.push(...i):t.pop()}return t}var Di=class{constructor(e,t){this.modelsModule=e,this.apiClient=t}create(e){return new Oi(this.apiClient,this.modelsModule,e.model,e.config,structuredClone(e.history))}},Oi=class{constructor(e,t,n,r={},i=[]){this.apiClient=e,this.modelsModule=t,this.model=n,this.config=r,this.history=i,this.sendPromise=Promise.resolve(),Ti(i)}async sendMessage(e){await this.sendPromise;let t=I(e.message),n=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(t),config:e.config??this.config});return this.sendPromise=(async()=>{let e=await n,r=e.candidates?.[0]?.content,i=e.automaticFunctionCallingHistory,a=this.getHistory(!0).length,o=[];i!=null&&(o=i.slice(a)??[]);let s=r?[r]:[];this.recordHistory(t,s,o)})(),await this.sendPromise.catch(()=>{this.sendPromise=Promise.resolve()}),n}async sendMessageStream(e){await this.sendPromise;let t=I(e.message),n=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(t),config:e.config??this.config});this.sendPromise=n.then(()=>void 0).catch(()=>void 0);let r=await n;return this.processStreamResponse(r,t)}getHistory(e=!1){let t=e?Ei(this.history):this.history;return structuredClone(t)}processStreamResponse(e,t){return H(this,arguments,function*(){var n,r,i,a;let o=[];try{for(var s=!0,c=U(e),l;l=yield V(c.next()),n=l.done,!n;s=!0){a=l.value,s=!1;let e=a;if(Ci(e)){let t=e.candidates?.[0]?.content;t!==void 0&&o.push(t)}yield yield V(e)}}catch(e){r={error:e}}finally{try{!s&&!n&&(i=c.return)&&(yield V(i.call(c)))}finally{if(r)throw r.error}}this.recordHistory(t,o)})}recordHistory(e,t,n){let r=[];t.length>0&&t.every(e=>e.role!==void 0)?r=t:r.push({role:`model`,parts:[]}),n&&n.length>0?this.history.push(...Ei(n)):this.history.push(e),this.history.push(...r)}},ki=class e extends Error{constructor(t){super(t.message),this.name=`ApiError`,this.status=t.status,Object.setPrototypeOf(this,e.prototype)}};function Ai(e){let t={},n=P(e,[`file`]);return n!=null&&N(t,[`file`],n),t}function ji(e){let t={},n=P(e,[`sdkHttpResponse`]);return n!=null&&N(t,[`sdkHttpResponse`],n),t}function Mi(e){let t={},n=P(e,[`name`]);return n!=null&&N(t,[`_url`,`file`],On(n)),t}function Ni(e){let t={},n=P(e,[`sdkHttpResponse`]);return n!=null&&N(t,[`sdkHttpResponse`],n),t}function Pi(e){let t={},n=P(e,[`name`]);return n!=null&&N(t,[`_url`,`file`],On(n)),t}function Fi(e){let t={},n=P(e,[`uris`]);return n!=null&&N(t,[`uris`],n),t}function Ii(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);return t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),n}function Li(e){let t={},n=P(e,[`config`]);return n!=null&&Ii(n,t),t}function Ri(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`files`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`files`],e)}return t}function zi(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`files`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`files`],e)}return t}var Bi=class extends j{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Ir(B.PAGED_ITEM_FILES,e=>this.listInternal(e),await this.listInternal(e),e)}async upload(e){if(this.apiClient.isVertexAI())throw Error(`Vertex AI does not support uploading files. You can share files through a GCS bucket.`);return this.apiClient.uploadFile(e.file,e.config).then(e=>e)}async download(e){await this.apiClient.downloadFile(e)}async registerFiles(e){throw Error(`registerFiles is only supported in Node.js environments.`)}async _registerFiles(e){return this.registerFilesInternal(e)}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Li(e);return n=M(`files`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ri(e),n=new Xt;return Object.assign(n,t),n})}}async createInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Ai(e);return n=M(`upload/v1beta/files`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=ji(e),n=new Zt;return Object.assign(n,t),n})}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Pi(e);return n=M(`files/{file}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Mi(e);return n=M(`files/{file}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ni(e),n=new Qt;return Object.assign(n,t),n})}}async registerFilesInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Fi(e);return n=M(`files:register`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=zi(e),n=new $t;return Object.assign(n,t),n})}}};function Vi(e){let t={};if(P(e,[`languageCodes`])!==void 0)throw Error(`languageCodes parameter is not supported in Gemini API.`);return t}function Hi(e){let t={},n=P(e,[`apiKey`]);if(n!=null&&N(t,[`apiKey`],n),P(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(P(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(P(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(P(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(P(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(P(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Ui(e){let t={},n=P(e,[`data`]);if(n!=null&&N(t,[`data`],n),P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Wi(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>ca(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function Gi(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>la(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function Ki(e){let t={};if(P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=P(e,[`fileUri`]);n!=null&&N(t,[`fileUri`],n);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function qi(e){let t={},n=P(e,[`id`]);n!=null&&N(t,[`id`],n);let r=P(e,[`args`]);r!=null&&N(t,[`args`],r);let i=P(e,[`name`]);if(i!=null&&N(t,[`name`],i),P(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(P(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function Ji(e){let t={},n=P(e,[`description`]);n!=null&&N(t,[`description`],n);let r=P(e,[`name`]);r!=null&&N(t,[`name`],r);let i=P(e,[`parameters`]);i!=null&&N(t,[`parameters`],i);let a=P(e,[`parametersJsonSchema`]);a!=null&&N(t,[`parametersJsonSchema`],a);let o=P(e,[`response`]);o!=null&&N(t,[`response`],o);let s=P(e,[`responseJsonSchema`]);if(s!=null&&N(t,[`responseJsonSchema`],s),P(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return t}function Yi(e){let t={},n=P(e,[`modelSelectionConfig`]);n!=null&&N(t,[`modelConfig`],n);let r=P(e,[`responseJsonSchema`]);r!=null&&N(t,[`responseJsonSchema`],r);let i=P(e,[`audioTimestamp`]);i!=null&&N(t,[`audioTimestamp`],i);let a=P(e,[`candidateCount`]);a!=null&&N(t,[`candidateCount`],a);let o=P(e,[`enableAffectiveDialog`]);o!=null&&N(t,[`enableAffectiveDialog`],o);let s=P(e,[`frequencyPenalty`]);s!=null&&N(t,[`frequencyPenalty`],s);let c=P(e,[`logprobs`]);c!=null&&N(t,[`logprobs`],c);let l=P(e,[`maxOutputTokens`]);l!=null&&N(t,[`maxOutputTokens`],l);let u=P(e,[`mediaResolution`]);u!=null&&N(t,[`mediaResolution`],u);let d=P(e,[`presencePenalty`]);d!=null&&N(t,[`presencePenalty`],d);let f=P(e,[`responseLogprobs`]);f!=null&&N(t,[`responseLogprobs`],f);let p=P(e,[`responseMimeType`]);p!=null&&N(t,[`responseMimeType`],p);let m=P(e,[`responseModalities`]);m!=null&&N(t,[`responseModalities`],m);let h=P(e,[`responseSchema`]);h!=null&&N(t,[`responseSchema`],h);let g=P(e,[`routingConfig`]);g!=null&&N(t,[`routingConfig`],g);let _=P(e,[`seed`]);_!=null&&N(t,[`seed`],_);let v=P(e,[`speechConfig`]);v!=null&&N(t,[`speechConfig`],pa(v));let y=P(e,[`stopSequences`]);y!=null&&N(t,[`stopSequences`],y);let b=P(e,[`temperature`]);b!=null&&N(t,[`temperature`],b);let x=P(e,[`thinkingConfig`]);x!=null&&N(t,[`thinkingConfig`],x);let S=P(e,[`topK`]);S!=null&&N(t,[`topK`],S);let C=P(e,[`topP`]);if(C!=null&&N(t,[`topP`],C),P(e,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);return t}function Xi(e){let t={},n=P(e,[`authConfig`]);n!=null&&N(t,[`authConfig`],Hi(n));let r=P(e,[`enableWidget`]);return r!=null&&N(t,[`enableWidget`],r),t}function Zi(e){let t={},n=P(e,[`searchTypes`]);if(n!=null&&N(t,[`searchTypes`],n),P(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(P(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=P(e,[`timeRangeFilter`]);return r!=null&&N(t,[`timeRangeFilter`],r),t}function Qi(e,t){let n={},r=P(e,[`generationConfig`]);t!==void 0&&r!=null&&N(t,[`setup`,`generationConfig`],r);let i=P(e,[`responseModalities`]);t!==void 0&&i!=null&&N(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=P(e,[`temperature`]);t!==void 0&&a!=null&&N(t,[`setup`,`generationConfig`,`temperature`],a);let o=P(e,[`topP`]);t!==void 0&&o!=null&&N(t,[`setup`,`generationConfig`,`topP`],o);let s=P(e,[`topK`]);t!==void 0&&s!=null&&N(t,[`setup`,`generationConfig`,`topK`],s);let c=P(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&N(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=P(e,[`mediaResolution`]);t!==void 0&&l!=null&&N(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=P(e,[`seed`]);t!==void 0&&u!=null&&N(t,[`setup`,`generationConfig`,`seed`],u);let d=P(e,[`speechConfig`]);t!==void 0&&d!=null&&N(t,[`setup`,`generationConfig`,`speechConfig`],bn(d));let f=P(e,[`thinkingConfig`]);t!==void 0&&f!=null&&N(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=P(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&N(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=P(e,[`systemInstruction`]);t!==void 0&&m!=null&&N(t,[`setup`,`systemInstruction`],Wi(I(m)));let h=P(e,[`tools`]);if(t!==void 0&&h!=null){let e=Sn(h);Array.isArray(e)&&(e=e.map(e=>ma(xn(e)))),N(t,[`setup`,`tools`],e)}let g=P(e,[`sessionResumption`]);t!==void 0&&g!=null&&N(t,[`setup`,`sessionResumption`],da(g));let _=P(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&N(t,[`setup`,`inputAudioTranscription`],Vi(_));let v=P(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&N(t,[`setup`,`outputAudioTranscription`],Vi(v));let y=P(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&N(t,[`setup`,`realtimeInputConfig`],y);let b=P(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&N(t,[`setup`,`contextWindowCompression`],b);let x=P(e,[`proactivity`]);if(t!==void 0&&x!=null&&N(t,[`setup`,`proactivity`],x),P(e,[`explicitVadSignal`])!==void 0)throw Error(`explicitVadSignal parameter is not supported in Gemini API.`);return n}function $i(e,t){let n={},r=P(e,[`generationConfig`]);t!==void 0&&r!=null&&N(t,[`setup`,`generationConfig`],Yi(r));let i=P(e,[`responseModalities`]);t!==void 0&&i!=null&&N(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=P(e,[`temperature`]);t!==void 0&&a!=null&&N(t,[`setup`,`generationConfig`,`temperature`],a);let o=P(e,[`topP`]);t!==void 0&&o!=null&&N(t,[`setup`,`generationConfig`,`topP`],o);let s=P(e,[`topK`]);t!==void 0&&s!=null&&N(t,[`setup`,`generationConfig`,`topK`],s);let c=P(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&N(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=P(e,[`mediaResolution`]);t!==void 0&&l!=null&&N(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=P(e,[`seed`]);t!==void 0&&u!=null&&N(t,[`setup`,`generationConfig`,`seed`],u);let d=P(e,[`speechConfig`]);t!==void 0&&d!=null&&N(t,[`setup`,`generationConfig`,`speechConfig`],pa(bn(d)));let f=P(e,[`thinkingConfig`]);t!==void 0&&f!=null&&N(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=P(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&N(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=P(e,[`systemInstruction`]);t!==void 0&&m!=null&&N(t,[`setup`,`systemInstruction`],Gi(I(m)));let h=P(e,[`tools`]);if(t!==void 0&&h!=null){let e=Sn(h);Array.isArray(e)&&(e=e.map(e=>ha(xn(e)))),N(t,[`setup`,`tools`],e)}let g=P(e,[`sessionResumption`]);t!==void 0&&g!=null&&N(t,[`setup`,`sessionResumption`],g);let _=P(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&N(t,[`setup`,`inputAudioTranscription`],_);let v=P(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&N(t,[`setup`,`outputAudioTranscription`],v);let y=P(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&N(t,[`setup`,`realtimeInputConfig`],y);let b=P(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&N(t,[`setup`,`contextWindowCompression`],b);let x=P(e,[`proactivity`]);t!==void 0&&x!=null&&N(t,[`setup`,`proactivity`],x);let S=P(e,[`explicitVadSignal`]);return t!==void 0&&S!=null&&N(t,[`setup`,`explicitVadSignal`],S),n}function ea(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`setup`,`model`],F(e,r));let i=P(t,[`config`]);return i!=null&&N(n,[`config`],Qi(i,n)),n}function ta(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`setup`,`model`],F(e,r));let i=P(t,[`config`]);return i!=null&&N(n,[`config`],$i(i,n)),n}function na(e){let t={},n=P(e,[`musicGenerationConfig`]);return n!=null&&N(t,[`musicGenerationConfig`],n),t}function ra(e){let t={},n=P(e,[`weightedPrompts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`weightedPrompts`],e)}return t}function ia(e){let t={},n=P(e,[`media`]);if(n!=null){let e=on(n);Array.isArray(e)&&(e=e.map(e=>Ui(e))),N(t,[`mediaChunks`],e)}let r=P(e,[`audio`]);r!=null&&N(t,[`audio`],Ui(ln(r)));let i=P(e,[`audioStreamEnd`]);i!=null&&N(t,[`audioStreamEnd`],i);let a=P(e,[`video`]);a!=null&&N(t,[`video`],Ui(cn(a)));let o=P(e,[`text`]);o!=null&&N(t,[`text`],o);let s=P(e,[`activityStart`]);s!=null&&N(t,[`activityStart`],s);let c=P(e,[`activityEnd`]);return c!=null&&N(t,[`activityEnd`],c),t}function aa(e){let t={},n=P(e,[`media`]);if(n!=null){let e=on(n);Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`mediaChunks`],e)}let r=P(e,[`audio`]);r!=null&&N(t,[`audio`],ln(r));let i=P(e,[`audioStreamEnd`]);i!=null&&N(t,[`audioStreamEnd`],i);let a=P(e,[`video`]);a!=null&&N(t,[`video`],cn(a));let o=P(e,[`text`]);o!=null&&N(t,[`text`],o);let s=P(e,[`activityStart`]);s!=null&&N(t,[`activityStart`],s);let c=P(e,[`activityEnd`]);return c!=null&&N(t,[`activityEnd`],c),t}function oa(e){let t={},n=P(e,[`setupComplete`]);n!=null&&N(t,[`setupComplete`],n);let r=P(e,[`serverContent`]);r!=null&&N(t,[`serverContent`],r);let i=P(e,[`toolCall`]);i!=null&&N(t,[`toolCall`],i);let a=P(e,[`toolCallCancellation`]);a!=null&&N(t,[`toolCallCancellation`],a);let o=P(e,[`usageMetadata`]);o!=null&&N(t,[`usageMetadata`],ga(o));let s=P(e,[`goAway`]);s!=null&&N(t,[`goAway`],s);let c=P(e,[`sessionResumptionUpdate`]);c!=null&&N(t,[`sessionResumptionUpdate`],c);let l=P(e,[`voiceActivityDetectionSignal`]);l!=null&&N(t,[`voiceActivityDetectionSignal`],l);let u=P(e,[`voiceActivity`]);return u!=null&&N(t,[`voiceActivity`],_a(u)),t}function sa(e){let t={},n=P(e,[`speakerVoiceConfigs`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>fa(e))),N(t,[`speakerVoiceConfigs`],e)}return t}function ca(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],Ki(a));let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],qi(o));let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],Ui(c));let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);f!=null&&N(t,[`videoMetadata`],f);let p=P(e,[`toolCall`]);p!=null&&N(t,[`toolCall`],p);let m=P(e,[`toolResponse`]);m!=null&&N(t,[`toolResponse`],m);let h=P(e,[`partMetadata`]);return h!=null&&N(t,[`partMetadata`],h),t}function la(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],a);let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],o);let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],c);let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);if(f!=null&&N(t,[`videoMetadata`],f),P(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(P(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(P(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return t}function ua(e){let t={},n=P(e,[`mimeType`]);n!=null&&N(t,[`mimeType`],n);let r=P(e,[`voiceSampleAudio`]);return r!=null&&N(t,[`voiceSampleAudio`],r),t}function da(e){let t={},n=P(e,[`handle`]);if(n!=null&&N(t,[`handle`],n),P(e,[`transparent`])!==void 0)throw Error(`transparent parameter is not supported in Gemini API.`);return t}function fa(e){let t={},n=P(e,[`speaker`]);n!=null&&N(t,[`speaker`],n);let r=P(e,[`voiceConfig`]);return r!=null&&N(t,[`voiceConfig`],va(r)),t}function pa(e){let t={},n=P(e,[`voiceConfig`]);n!=null&&N(t,[`voiceConfig`],va(n));let r=P(e,[`languageCode`]);r!=null&&N(t,[`languageCode`],r);let i=P(e,[`multiSpeakerVoiceConfig`]);return i!=null&&N(t,[`multiSpeakerVoiceConfig`],sa(i)),t}function ma(e){let t={};if(P(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=P(e,[`computerUse`]);n!=null&&N(t,[`computerUse`],n);let r=P(e,[`fileSearch`]);r!=null&&N(t,[`fileSearch`],r);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],Zi(i));let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],Xi(a));let o=P(e,[`codeExecution`]);if(o!=null&&N(t,[`codeExecution`],o),P(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=P(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`functionDeclarations`],e)}let c=P(e,[`googleSearchRetrieval`]);if(c!=null&&N(t,[`googleSearchRetrieval`],c),P(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=P(e,[`urlContext`]);l!=null&&N(t,[`urlContext`],l);let u=P(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`mcpServers`],e)}return t}function ha(e){let t={},n=P(e,[`retrieval`]);n!=null&&N(t,[`retrieval`],n);let r=P(e,[`computerUse`]);if(r!=null&&N(t,[`computerUse`],r),P(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],i);let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],a);let o=P(e,[`codeExecution`]);o!=null&&N(t,[`codeExecution`],o);let s=P(e,[`enterpriseWebSearch`]);s!=null&&N(t,[`enterpriseWebSearch`],s);let c=P(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>Ji(e))),N(t,[`functionDeclarations`],e)}let l=P(e,[`googleSearchRetrieval`]);l!=null&&N(t,[`googleSearchRetrieval`],l);let u=P(e,[`parallelAiSearch`]);u!=null&&N(t,[`parallelAiSearch`],u);let d=P(e,[`urlContext`]);if(d!=null&&N(t,[`urlContext`],d),P(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return t}function ga(e){let t={},n=P(e,[`promptTokenCount`]);n!=null&&N(t,[`promptTokenCount`],n);let r=P(e,[`cachedContentTokenCount`]);r!=null&&N(t,[`cachedContentTokenCount`],r);let i=P(e,[`candidatesTokenCount`]);i!=null&&N(t,[`responseTokenCount`],i);let a=P(e,[`toolUsePromptTokenCount`]);a!=null&&N(t,[`toolUsePromptTokenCount`],a);let o=P(e,[`thoughtsTokenCount`]);o!=null&&N(t,[`thoughtsTokenCount`],o);let s=P(e,[`totalTokenCount`]);s!=null&&N(t,[`totalTokenCount`],s);let c=P(e,[`promptTokensDetails`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`promptTokensDetails`],e)}let l=P(e,[`cacheTokensDetails`]);if(l!=null){let e=l;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`cacheTokensDetails`],e)}let u=P(e,[`candidatesTokensDetails`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`responseTokensDetails`],e)}let d=P(e,[`toolUsePromptTokensDetails`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`toolUsePromptTokensDetails`],e)}let f=P(e,[`trafficType`]);return f!=null&&N(t,[`trafficType`],f),t}function _a(e){let t={},n=P(e,[`type`]);return n!=null&&N(t,[`voiceActivityType`],n),t}function va(e){let t={},n=P(e,[`replicatedVoiceConfig`]);n!=null&&N(t,[`replicatedVoiceConfig`],ua(n));let r=P(e,[`prebuiltVoiceConfig`]);return r!=null&&N(t,[`prebuiltVoiceConfig`],r),t}function ya(e,t){let n={},r=P(e,[`apiKey`]);if(r!=null&&N(n,[`apiKey`],r),P(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(P(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(P(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(P(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(P(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(P(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return n}function ba(e,t){let n={},r=P(e,[`data`]);if(r!=null&&N(n,[`data`],r),P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let i=P(e,[`mimeType`]);return i!=null&&N(n,[`mimeType`],i),n}function xa(e,t){let n={},r=P(e,[`content`]);r!=null&&N(n,[`content`],r);let i=P(e,[`citationMetadata`]);i!=null&&N(n,[`citationMetadata`],Sa(i));let a=P(e,[`tokenCount`]);a!=null&&N(n,[`tokenCount`],a);let o=P(e,[`finishReason`]);o!=null&&N(n,[`finishReason`],o);let s=P(e,[`groundingMetadata`]);s!=null&&N(n,[`groundingMetadata`],s);let c=P(e,[`avgLogprobs`]);c!=null&&N(n,[`avgLogprobs`],c);let l=P(e,[`index`]);l!=null&&N(n,[`index`],l);let u=P(e,[`logprobsResult`]);u!=null&&N(n,[`logprobsResult`],u);let d=P(e,[`safetyRatings`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`safetyRatings`],e)}let f=P(e,[`urlContextMetadata`]);return f!=null&&N(n,[`urlContextMetadata`],f),n}function Sa(e,t){let n={},r=P(e,[`citationSources`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`citations`],e)}return n}function Ca(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let e=L(a);Array.isArray(e)&&(e=e.map(e=>Oa(e))),N(r,[`contents`],e)}return r}function wa(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`tokensInfo`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`tokensInfo`],e)}return n}function Ta(e,t){let n={},r=P(e,[`values`]);r!=null&&N(n,[`values`],r);let i=P(e,[`statistics`]);return i!=null&&N(n,[`statistics`],Ea(i)),n}function Ea(e,t){let n={},r=P(e,[`truncated`]);r!=null&&N(n,[`truncated`],r);let i=P(e,[`token_count`]);return i!=null&&N(n,[`tokenCount`],i),n}function Da(e,t){let n={},r=P(e,[`parts`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Jo(e))),N(n,[`parts`],e)}let i=P(e,[`role`]);return i!=null&&N(n,[`role`],i),n}function Oa(e,t){let n={},r=P(e,[`parts`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Yo(e))),N(n,[`parts`],e)}let i=P(e,[`role`]);return i!=null&&N(n,[`role`],i),n}function ka(e,t){let n={},r=P(e,[`controlType`]);r!=null&&N(n,[`controlType`],r);let i=P(e,[`enableControlImageComputation`]);return i!=null&&N(n,[`computeControl`],i),n}function Aa(e,t){let n={};if(P(e,[`systemInstruction`])!==void 0)throw Error(`systemInstruction parameter is not supported in Gemini API.`);if(P(e,[`tools`])!==void 0)throw Error(`tools parameter is not supported in Gemini API.`);if(P(e,[`generationConfig`])!==void 0)throw Error(`generationConfig parameter is not supported in Gemini API.`);return n}function ja(e,t,n){let r={},i=P(e,[`systemInstruction`]);t!==void 0&&i!=null&&N(t,[`systemInstruction`],Oa(I(i)));let a=P(e,[`tools`]);if(t!==void 0&&a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>gs(e))),N(t,[`tools`],e)}let o=P(e,[`generationConfig`]);return t!==void 0&&o!=null&&N(t,[`generationConfig`],Oo(o)),r}function Ma(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let e=L(a);Array.isArray(e)&&(e=e.map(e=>Da(e))),N(r,[`contents`],e)}let o=P(t,[`config`]);return o!=null&&Aa(o),r}function Na(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let e=L(a);Array.isArray(e)&&(e=e.map(e=>Oa(e))),N(r,[`contents`],e)}let o=P(t,[`config`]);return o!=null&&ja(o,r),r}function Pa(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`totalTokens`]);i!=null&&N(n,[`totalTokens`],i);let a=P(e,[`cachedContentTokenCount`]);return a!=null&&N(n,[`cachedContentTokenCount`],a),n}function Fa(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`totalTokens`]);return i!=null&&N(n,[`totalTokens`],i),n}function Ia(e,t,n){let r={},i=P(t,[`model`]);return i!=null&&N(r,[`_url`,`name`],F(e,i)),r}function La(e,t,n){let r={},i=P(t,[`model`]);return i!=null&&N(r,[`_url`,`name`],F(e,i)),r}function Ra(e,t){let n={},r=P(e,[`sdkHttpResponse`]);return r!=null&&N(n,[`sdkHttpResponse`],r),n}function za(e,t){let n={},r=P(e,[`sdkHttpResponse`]);return r!=null&&N(n,[`sdkHttpResponse`],r),n}function Ba(e,t,n){let r={},i=P(e,[`outputGcsUri`]);t!==void 0&&i!=null&&N(t,[`parameters`,`storageUri`],i);let a=P(e,[`negativePrompt`]);t!==void 0&&a!=null&&N(t,[`parameters`,`negativePrompt`],a);let o=P(e,[`numberOfImages`]);t!==void 0&&o!=null&&N(t,[`parameters`,`sampleCount`],o);let s=P(e,[`aspectRatio`]);t!==void 0&&s!=null&&N(t,[`parameters`,`aspectRatio`],s);let c=P(e,[`guidanceScale`]);t!==void 0&&c!=null&&N(t,[`parameters`,`guidanceScale`],c);let l=P(e,[`seed`]);t!==void 0&&l!=null&&N(t,[`parameters`,`seed`],l);let u=P(e,[`safetyFilterLevel`]);t!==void 0&&u!=null&&N(t,[`parameters`,`safetySetting`],u);let d=P(e,[`personGeneration`]);t!==void 0&&d!=null&&N(t,[`parameters`,`personGeneration`],d);let f=P(e,[`includeSafetyAttributes`]);t!==void 0&&f!=null&&N(t,[`parameters`,`includeSafetyAttributes`],f);let p=P(e,[`includeRaiReason`]);t!==void 0&&p!=null&&N(t,[`parameters`,`includeRaiReason`],p);let m=P(e,[`language`]);t!==void 0&&m!=null&&N(t,[`parameters`,`language`],m);let h=P(e,[`outputMimeType`]);t!==void 0&&h!=null&&N(t,[`parameters`,`outputOptions`,`mimeType`],h);let g=P(e,[`outputCompressionQuality`]);t!==void 0&&g!=null&&N(t,[`parameters`,`outputOptions`,`compressionQuality`],g);let _=P(e,[`addWatermark`]);t!==void 0&&_!=null&&N(t,[`parameters`,`addWatermark`],_);let v=P(e,[`labels`]);t!==void 0&&v!=null&&N(t,[`labels`],v);let y=P(e,[`editMode`]);t!==void 0&&y!=null&&N(t,[`parameters`,`editMode`],y);let b=P(e,[`baseSteps`]);return t!==void 0&&b!=null&&N(t,[`parameters`,`editConfig`,`baseSteps`],b),r}function Va(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`prompt`]);a!=null&&N(r,[`instances[0]`,`prompt`],a);let o=P(t,[`referenceImages`]);if(o!=null){let e=o;Array.isArray(e)&&(e=e.map(e=>ts(e))),N(r,[`instances[0]`,`referenceImages`],e)}let s=P(t,[`config`]);return s!=null&&Ba(s,r),r}function Ha(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>wo(e))),N(n,[`generatedImages`],e)}return n}function Ua(e,t,n){let r={},i=P(e,[`taskType`]);t!==void 0&&i!=null&&N(t,[`requests[]`,`taskType`],i);let a=P(e,[`title`]);t!==void 0&&a!=null&&N(t,[`requests[]`,`title`],a);let o=P(e,[`outputDimensionality`]);if(t!==void 0&&o!=null&&N(t,[`requests[]`,`outputDimensionality`],o),P(e,[`mimeType`])!==void 0)throw Error(`mimeType parameter is not supported in Gemini API.`);if(P(e,[`autoTruncate`])!==void 0)throw Error(`autoTruncate parameter is not supported in Gemini API.`);return r}function Wa(e,t,n){let r={},i=P(n,[`embeddingApiType`]);if(i===void 0&&(i=`PREDICT`),i===`PREDICT`){let n=P(e,[`taskType`]);t!==void 0&&n!=null&&N(t,[`instances[]`,`task_type`],n)}else if(i===`EMBED_CONTENT`){let n=P(e,[`taskType`]);t!==void 0&&n!=null&&N(t,[`taskType`],n)}let a=P(n,[`embeddingApiType`]);if(a===void 0&&(a=`PREDICT`),a===`PREDICT`){let n=P(e,[`title`]);t!==void 0&&n!=null&&N(t,[`instances[]`,`title`],n)}else if(a===`EMBED_CONTENT`){let n=P(e,[`title`]);t!==void 0&&n!=null&&N(t,[`title`],n)}let o=P(n,[`embeddingApiType`]);if(o===void 0&&(o=`PREDICT`),o===`PREDICT`){let n=P(e,[`outputDimensionality`]);t!==void 0&&n!=null&&N(t,[`parameters`,`outputDimensionality`],n)}else if(o===`EMBED_CONTENT`){let n=P(e,[`outputDimensionality`]);t!==void 0&&n!=null&&N(t,[`outputDimensionality`],n)}let s=P(n,[`embeddingApiType`]);if(s===void 0&&(s=`PREDICT`),s===`PREDICT`){let n=P(e,[`mimeType`]);t!==void 0&&n!=null&&N(t,[`instances[]`,`mimeType`],n)}let c=P(n,[`embeddingApiType`]);if(c===void 0&&(c=`PREDICT`),c===`PREDICT`){let n=P(e,[`autoTruncate`]);t!==void 0&&n!=null&&N(t,[`parameters`,`autoTruncate`],n)}else if(c===`EMBED_CONTENT`){let n=P(e,[`autoTruncate`]);t!==void 0&&n!=null&&N(t,[`autoTruncate`],n)}return r}function Ga(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let t=hn(e,a);Array.isArray(t)&&(t=t.map(e=>e)),N(r,[`requests[]`,`content`],t)}let o=P(t,[`content`]);o!=null&&Da(I(o));let s=P(t,[`config`]);s!=null&&Ua(s,r);let c=P(t,[`model`]);return c!==void 0&&N(r,[`requests[]`,`model`],F(e,c)),r}function Ka(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(n,[`embeddingApiType`]);if(a===void 0&&(a=`PREDICT`),a===`PREDICT`){let n=P(t,[`contents`]);if(n!=null){let t=hn(e,n);Array.isArray(t)&&(t=t.map(e=>e)),N(r,[`instances[]`,`content`],t)}}let o=P(n,[`embeddingApiType`]);if(o===void 0&&(o=`PREDICT`),o===`EMBED_CONTENT`){let e=P(t,[`content`]);e!=null&&N(r,[`content`],Oa(I(e)))}let s=P(t,[`config`]);return s!=null&&Wa(s,r,n),r}function qa(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`embeddings`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`embeddings`],e)}let a=P(e,[`metadata`]);return a!=null&&N(n,[`metadata`],a),n}function Ja(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`predictions[]`,`embeddings`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Ta(e))),N(n,[`embeddings`],e)}let a=P(e,[`metadata`]);if(a!=null&&N(n,[`metadata`],a),t&&P(t,[`embeddingApiType`])===`EMBED_CONTENT`){let t=P(e,[`embedding`]),r=P(e,[`usageMetadata`]),i=P(e,[`truncated`]);if(t){let e={};r&&r.promptTokenCount&&(e.tokenCount=r.promptTokenCount),i&&(e.truncated=i),t.statistics=e,N(n,[`embeddings`],[t])}}return n}function Ya(e,t){let n={},r=P(e,[`endpoint`]);r!=null&&N(n,[`name`],r);let i=P(e,[`deployedModelId`]);return i!=null&&N(n,[`deployedModelId`],i),n}function Xa(e,t){let n={};if(P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=P(e,[`fileUri`]);r!=null&&N(n,[`fileUri`],r);let i=P(e,[`mimeType`]);return i!=null&&N(n,[`mimeType`],i),n}function Za(e,t){let n={},r=P(e,[`id`]);r!=null&&N(n,[`id`],r);let i=P(e,[`args`]);i!=null&&N(n,[`args`],i);let a=P(e,[`name`]);if(a!=null&&N(n,[`name`],a),P(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(P(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return n}function Qa(e,t){let n={},r=P(e,[`allowedFunctionNames`]);r!=null&&N(n,[`allowedFunctionNames`],r);let i=P(e,[`mode`]);if(i!=null&&N(n,[`mode`],i),P(e,[`streamFunctionCallArguments`])!==void 0)throw Error(`streamFunctionCallArguments parameter is not supported in Gemini API.`);return n}function $a(e,t){let n={},r=P(e,[`description`]);r!=null&&N(n,[`description`],r);let i=P(e,[`name`]);i!=null&&N(n,[`name`],i);let a=P(e,[`parameters`]);a!=null&&N(n,[`parameters`],a);let o=P(e,[`parametersJsonSchema`]);o!=null&&N(n,[`parametersJsonSchema`],o);let s=P(e,[`response`]);s!=null&&N(n,[`response`],s);let c=P(e,[`responseJsonSchema`]);if(c!=null&&N(n,[`responseJsonSchema`],c),P(e,[`behavior`])!==void 0)throw Error(`behavior parameter is not supported in Vertex AI.`);return n}function eo(e,t,n,r){let i={},a=P(t,[`systemInstruction`]);n!==void 0&&a!=null&&N(n,[`systemInstruction`],Da(I(a)));let o=P(t,[`temperature`]);o!=null&&N(i,[`temperature`],o);let s=P(t,[`topP`]);s!=null&&N(i,[`topP`],s);let c=P(t,[`topK`]);c!=null&&N(i,[`topK`],c);let l=P(t,[`candidateCount`]);l!=null&&N(i,[`candidateCount`],l);let u=P(t,[`maxOutputTokens`]);u!=null&&N(i,[`maxOutputTokens`],u);let d=P(t,[`stopSequences`]);d!=null&&N(i,[`stopSequences`],d);let f=P(t,[`responseLogprobs`]);f!=null&&N(i,[`responseLogprobs`],f);let p=P(t,[`logprobs`]);p!=null&&N(i,[`logprobs`],p);let m=P(t,[`presencePenalty`]);m!=null&&N(i,[`presencePenalty`],m);let h=P(t,[`frequencyPenalty`]);h!=null&&N(i,[`frequencyPenalty`],h);let g=P(t,[`seed`]);g!=null&&N(i,[`seed`],g);let _=P(t,[`responseMimeType`]);_!=null&&N(i,[`responseMimeType`],_);let v=P(t,[`responseSchema`]);v!=null&&N(i,[`responseSchema`],vn(v));let y=P(t,[`responseJsonSchema`]);if(y!=null&&N(i,[`responseJsonSchema`],y),P(t,[`routingConfig`])!==void 0)throw Error(`routingConfig parameter is not supported in Gemini API.`);if(P(t,[`modelSelectionConfig`])!==void 0)throw Error(`modelSelectionConfig parameter is not supported in Gemini API.`);let b=P(t,[`safetySettings`]);if(n!==void 0&&b!=null){let e=b;Array.isArray(e)&&(e=e.map(e=>as(e))),N(n,[`safetySettings`],e)}let x=P(t,[`tools`]);if(n!==void 0&&x!=null){let e=Sn(x);Array.isArray(e)&&(e=e.map(e=>hs(xn(e)))),N(n,[`tools`],e)}let S=P(t,[`toolConfig`]);if(n!==void 0&&S!=null&&N(n,[`toolConfig`],ps(S)),P(t,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let C=P(t,[`cachedContent`]);n!==void 0&&C!=null&&N(n,[`cachedContent`],R(e,C));let w=P(t,[`responseModalities`]);w!=null&&N(i,[`responseModalities`],w);let T=P(t,[`mediaResolution`]);T!=null&&N(i,[`mediaResolution`],T);let E=P(t,[`speechConfig`]);if(E!=null&&N(i,[`speechConfig`],yn(E)),P(t,[`audioTimestamp`])!==void 0)throw Error(`audioTimestamp parameter is not supported in Gemini API.`);let D=P(t,[`thinkingConfig`]);D!=null&&N(i,[`thinkingConfig`],D);let O=P(t,[`imageConfig`]);O!=null&&N(i,[`imageConfig`],No(O));let k=P(t,[`enableEnhancedCivicAnswers`]);if(k!=null&&N(i,[`enableEnhancedCivicAnswers`],k),P(t,[`modelArmorConfig`])!==void 0)throw Error(`modelArmorConfig parameter is not supported in Gemini API.`);let A=P(t,[`serviceTier`]);return n!==void 0&&A!=null&&N(n,[`serviceTier`],A),i}function to(e,t,n,r){let i={},a=P(t,[`systemInstruction`]);n!==void 0&&a!=null&&N(n,[`systemInstruction`],Oa(I(a)));let o=P(t,[`temperature`]);o!=null&&N(i,[`temperature`],o);let s=P(t,[`topP`]);s!=null&&N(i,[`topP`],s);let c=P(t,[`topK`]);c!=null&&N(i,[`topK`],c);let l=P(t,[`candidateCount`]);l!=null&&N(i,[`candidateCount`],l);let u=P(t,[`maxOutputTokens`]);u!=null&&N(i,[`maxOutputTokens`],u);let d=P(t,[`stopSequences`]);d!=null&&N(i,[`stopSequences`],d);let f=P(t,[`responseLogprobs`]);f!=null&&N(i,[`responseLogprobs`],f);let p=P(t,[`logprobs`]);p!=null&&N(i,[`logprobs`],p);let m=P(t,[`presencePenalty`]);m!=null&&N(i,[`presencePenalty`],m);let h=P(t,[`frequencyPenalty`]);h!=null&&N(i,[`frequencyPenalty`],h);let g=P(t,[`seed`]);g!=null&&N(i,[`seed`],g);let _=P(t,[`responseMimeType`]);_!=null&&N(i,[`responseMimeType`],_);let v=P(t,[`responseSchema`]);v!=null&&N(i,[`responseSchema`],vn(v));let y=P(t,[`responseJsonSchema`]);y!=null&&N(i,[`responseJsonSchema`],y);let b=P(t,[`routingConfig`]);b!=null&&N(i,[`routingConfig`],b);let x=P(t,[`modelSelectionConfig`]);x!=null&&N(i,[`modelConfig`],x);let S=P(t,[`safetySettings`]);if(n!==void 0&&S!=null){let e=S;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`safetySettings`],e)}let C=P(t,[`tools`]);if(n!==void 0&&C!=null){let e=Sn(C);Array.isArray(e)&&(e=e.map(e=>gs(xn(e)))),N(n,[`tools`],e)}let w=P(t,[`toolConfig`]);n!==void 0&&w!=null&&N(n,[`toolConfig`],ms(w));let T=P(t,[`labels`]);n!==void 0&&T!=null&&N(n,[`labels`],T);let E=P(t,[`cachedContent`]);n!==void 0&&E!=null&&N(n,[`cachedContent`],R(e,E));let D=P(t,[`responseModalities`]);D!=null&&N(i,[`responseModalities`],D);let O=P(t,[`mediaResolution`]);O!=null&&N(i,[`mediaResolution`],O);let k=P(t,[`speechConfig`]);k!=null&&N(i,[`speechConfig`],fs(yn(k)));let A=P(t,[`audioTimestamp`]);A!=null&&N(i,[`audioTimestamp`],A);let j=P(t,[`thinkingConfig`]);j!=null&&N(i,[`thinkingConfig`],j);let M=P(t,[`imageConfig`]);if(M!=null&&N(i,[`imageConfig`],Po(M)),P(t,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);let ee=P(t,[`modelArmorConfig`]);if(n!==void 0&&ee!=null&&N(n,[`modelArmorConfig`],ee),P(t,[`serviceTier`])!==void 0)throw Error(`serviceTier parameter is not supported in Vertex AI.`);return i}function no(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let e=L(a);Array.isArray(e)&&(e=e.map(e=>Da(e))),N(r,[`contents`],e)}let o=P(t,[`config`]);return o!=null&&N(r,[`generationConfig`],eo(e,o,r)),r}function ro(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`contents`]);if(a!=null){let e=L(a);Array.isArray(e)&&(e=e.map(e=>Oa(e))),N(r,[`contents`],e)}let o=P(t,[`config`]);return o!=null&&N(r,[`generationConfig`],to(e,o,r)),r}function io(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`candidates`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>xa(e))),N(n,[`candidates`],e)}let a=P(e,[`modelVersion`]);a!=null&&N(n,[`modelVersion`],a);let o=P(e,[`promptFeedback`]);o!=null&&N(n,[`promptFeedback`],o);let s=P(e,[`responseId`]);s!=null&&N(n,[`responseId`],s);let c=P(e,[`usageMetadata`]);c!=null&&N(n,[`usageMetadata`],c);let l=P(e,[`modelStatus`]);return l!=null&&N(n,[`modelStatus`],l),n}function ao(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`candidates`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`candidates`],e)}let a=P(e,[`createTime`]);a!=null&&N(n,[`createTime`],a);let o=P(e,[`modelVersion`]);o!=null&&N(n,[`modelVersion`],o);let s=P(e,[`promptFeedback`]);s!=null&&N(n,[`promptFeedback`],s);let c=P(e,[`responseId`]);c!=null&&N(n,[`responseId`],c);let l=P(e,[`usageMetadata`]);return l!=null&&N(n,[`usageMetadata`],l),n}function oo(e,t,n){let r={};if(P(e,[`outputGcsUri`])!==void 0)throw Error(`outputGcsUri parameter is not supported in Gemini API.`);if(P(e,[`negativePrompt`])!==void 0)throw Error(`negativePrompt parameter is not supported in Gemini API.`);let i=P(e,[`numberOfImages`]);t!==void 0&&i!=null&&N(t,[`parameters`,`sampleCount`],i);let a=P(e,[`aspectRatio`]);t!==void 0&&a!=null&&N(t,[`parameters`,`aspectRatio`],a);let o=P(e,[`guidanceScale`]);if(t!==void 0&&o!=null&&N(t,[`parameters`,`guidanceScale`],o),P(e,[`seed`])!==void 0)throw Error(`seed parameter is not supported in Gemini API.`);let s=P(e,[`safetyFilterLevel`]);t!==void 0&&s!=null&&N(t,[`parameters`,`safetySetting`],s);let c=P(e,[`personGeneration`]);t!==void 0&&c!=null&&N(t,[`parameters`,`personGeneration`],c);let l=P(e,[`includeSafetyAttributes`]);t!==void 0&&l!=null&&N(t,[`parameters`,`includeSafetyAttributes`],l);let u=P(e,[`includeRaiReason`]);t!==void 0&&u!=null&&N(t,[`parameters`,`includeRaiReason`],u);let d=P(e,[`language`]);t!==void 0&&d!=null&&N(t,[`parameters`,`language`],d);let f=P(e,[`outputMimeType`]);t!==void 0&&f!=null&&N(t,[`parameters`,`outputOptions`,`mimeType`],f);let p=P(e,[`outputCompressionQuality`]);if(t!==void 0&&p!=null&&N(t,[`parameters`,`outputOptions`,`compressionQuality`],p),P(e,[`addWatermark`])!==void 0)throw Error(`addWatermark parameter is not supported in Gemini API.`);if(P(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);let m=P(e,[`imageSize`]);if(t!==void 0&&m!=null&&N(t,[`parameters`,`sampleImageSize`],m),P(e,[`enhancePrompt`])!==void 0)throw Error(`enhancePrompt parameter is not supported in Gemini API.`);return r}function so(e,t,n){let r={},i=P(e,[`outputGcsUri`]);t!==void 0&&i!=null&&N(t,[`parameters`,`storageUri`],i);let a=P(e,[`negativePrompt`]);t!==void 0&&a!=null&&N(t,[`parameters`,`negativePrompt`],a);let o=P(e,[`numberOfImages`]);t!==void 0&&o!=null&&N(t,[`parameters`,`sampleCount`],o);let s=P(e,[`aspectRatio`]);t!==void 0&&s!=null&&N(t,[`parameters`,`aspectRatio`],s);let c=P(e,[`guidanceScale`]);t!==void 0&&c!=null&&N(t,[`parameters`,`guidanceScale`],c);let l=P(e,[`seed`]);t!==void 0&&l!=null&&N(t,[`parameters`,`seed`],l);let u=P(e,[`safetyFilterLevel`]);t!==void 0&&u!=null&&N(t,[`parameters`,`safetySetting`],u);let d=P(e,[`personGeneration`]);t!==void 0&&d!=null&&N(t,[`parameters`,`personGeneration`],d);let f=P(e,[`includeSafetyAttributes`]);t!==void 0&&f!=null&&N(t,[`parameters`,`includeSafetyAttributes`],f);let p=P(e,[`includeRaiReason`]);t!==void 0&&p!=null&&N(t,[`parameters`,`includeRaiReason`],p);let m=P(e,[`language`]);t!==void 0&&m!=null&&N(t,[`parameters`,`language`],m);let h=P(e,[`outputMimeType`]);t!==void 0&&h!=null&&N(t,[`parameters`,`outputOptions`,`mimeType`],h);let g=P(e,[`outputCompressionQuality`]);t!==void 0&&g!=null&&N(t,[`parameters`,`outputOptions`,`compressionQuality`],g);let _=P(e,[`addWatermark`]);t!==void 0&&_!=null&&N(t,[`parameters`,`addWatermark`],_);let v=P(e,[`labels`]);t!==void 0&&v!=null&&N(t,[`labels`],v);let y=P(e,[`imageSize`]);t!==void 0&&y!=null&&N(t,[`parameters`,`sampleImageSize`],y);let b=P(e,[`enhancePrompt`]);return t!==void 0&&b!=null&&N(t,[`parameters`,`enhancePrompt`],b),r}function co(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`prompt`]);a!=null&&N(r,[`instances[0]`,`prompt`],a);let o=P(t,[`config`]);return o!=null&&oo(o,r),r}function lo(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`prompt`]);a!=null&&N(r,[`instances[0]`,`prompt`],a);let o=P(t,[`config`]);return o!=null&&so(o,r),r}function uo(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>Co(e))),N(n,[`generatedImages`],e)}let a=P(e,[`positivePromptSafetyAttributes`]);return a!=null&&N(n,[`positivePromptSafetyAttributes`],rs(a)),n}function fo(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>wo(e))),N(n,[`generatedImages`],e)}let a=P(e,[`positivePromptSafetyAttributes`]);return a!=null&&N(n,[`positivePromptSafetyAttributes`],is(a)),n}function po(e,t,n){let r={},i=P(e,[`numberOfVideos`]);if(t!==void 0&&i!=null&&N(t,[`parameters`,`sampleCount`],i),P(e,[`outputGcsUri`])!==void 0)throw Error(`outputGcsUri parameter is not supported in Gemini API.`);if(P(e,[`fps`])!==void 0)throw Error(`fps parameter is not supported in Gemini API.`);let a=P(e,[`durationSeconds`]);if(t!==void 0&&a!=null&&N(t,[`parameters`,`durationSeconds`],a),P(e,[`seed`])!==void 0)throw Error(`seed parameter is not supported in Gemini API.`);let o=P(e,[`aspectRatio`]);t!==void 0&&o!=null&&N(t,[`parameters`,`aspectRatio`],o);let s=P(e,[`resolution`]);t!==void 0&&s!=null&&N(t,[`parameters`,`resolution`],s);let c=P(e,[`personGeneration`]);if(t!==void 0&&c!=null&&N(t,[`parameters`,`personGeneration`],c),P(e,[`pubsubTopic`])!==void 0)throw Error(`pubsubTopic parameter is not supported in Gemini API.`);let l=P(e,[`negativePrompt`]);t!==void 0&&l!=null&&N(t,[`parameters`,`negativePrompt`],l);let u=P(e,[`enhancePrompt`]);if(t!==void 0&&u!=null&&N(t,[`parameters`,`enhancePrompt`],u),P(e,[`generateAudio`])!==void 0)throw Error(`generateAudio parameter is not supported in Gemini API.`);let d=P(e,[`lastFrame`]);t!==void 0&&d!=null&&N(t,[`instances[0]`,`lastFrame`],Lo(d));let f=P(e,[`referenceImages`]);if(t!==void 0&&f!=null){let e=f;Array.isArray(e)&&(e=e.map(e=>ks(e))),N(t,[`instances[0]`,`referenceImages`],e)}if(P(e,[`mask`])!==void 0)throw Error(`mask parameter is not supported in Gemini API.`);if(P(e,[`compressionQuality`])!==void 0)throw Error(`compressionQuality parameter is not supported in Gemini API.`);if(P(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);return r}function mo(e,t,n){let r={},i=P(e,[`numberOfVideos`]);t!==void 0&&i!=null&&N(t,[`parameters`,`sampleCount`],i);let a=P(e,[`outputGcsUri`]);t!==void 0&&a!=null&&N(t,[`parameters`,`storageUri`],a);let o=P(e,[`fps`]);t!==void 0&&o!=null&&N(t,[`parameters`,`fps`],o);let s=P(e,[`durationSeconds`]);t!==void 0&&s!=null&&N(t,[`parameters`,`durationSeconds`],s);let c=P(e,[`seed`]);t!==void 0&&c!=null&&N(t,[`parameters`,`seed`],c);let l=P(e,[`aspectRatio`]);t!==void 0&&l!=null&&N(t,[`parameters`,`aspectRatio`],l);let u=P(e,[`resolution`]);t!==void 0&&u!=null&&N(t,[`parameters`,`resolution`],u);let d=P(e,[`personGeneration`]);t!==void 0&&d!=null&&N(t,[`parameters`,`personGeneration`],d);let f=P(e,[`pubsubTopic`]);t!==void 0&&f!=null&&N(t,[`parameters`,`pubsubTopic`],f);let p=P(e,[`negativePrompt`]);t!==void 0&&p!=null&&N(t,[`parameters`,`negativePrompt`],p);let m=P(e,[`enhancePrompt`]);t!==void 0&&m!=null&&N(t,[`parameters`,`enhancePrompt`],m);let h=P(e,[`generateAudio`]);t!==void 0&&h!=null&&N(t,[`parameters`,`generateAudio`],h);let g=P(e,[`lastFrame`]);t!==void 0&&g!=null&&N(t,[`instances[0]`,`lastFrame`],W(g));let _=P(e,[`referenceImages`]);if(t!==void 0&&_!=null){let e=_;Array.isArray(e)&&(e=e.map(e=>As(e))),N(t,[`instances[0]`,`referenceImages`],e)}let v=P(e,[`mask`]);t!==void 0&&v!=null&&N(t,[`instances[0]`,`mask`],Os(v));let y=P(e,[`compressionQuality`]);t!==void 0&&y!=null&&N(t,[`parameters`,`compressionQuality`],y);let b=P(e,[`labels`]);return t!==void 0&&b!=null&&N(t,[`labels`],b),r}function ho(e,t){let n={},r=P(e,[`name`]);r!=null&&N(n,[`name`],r);let i=P(e,[`metadata`]);i!=null&&N(n,[`metadata`],i);let a=P(e,[`done`]);a!=null&&N(n,[`done`],a);let o=P(e,[`error`]);o!=null&&N(n,[`error`],o);let s=P(e,[`response`,`generateVideoResponse`]);return s!=null&&N(n,[`response`],yo(s)),n}function go(e,t){let n={},r=P(e,[`name`]);r!=null&&N(n,[`name`],r);let i=P(e,[`metadata`]);i!=null&&N(n,[`metadata`],i);let a=P(e,[`done`]);a!=null&&N(n,[`done`],a);let o=P(e,[`error`]);o!=null&&N(n,[`error`],o);let s=P(e,[`response`]);return s!=null&&N(n,[`response`],bo(s)),n}function _o(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`prompt`]);a!=null&&N(r,[`instances[0]`,`prompt`],a);let o=P(t,[`image`]);o!=null&&N(r,[`instances[0]`,`image`],Lo(o));let s=P(t,[`video`]);s!=null&&N(r,[`instances[0]`,`video`],js(s));let c=P(t,[`source`]);c!=null&&xo(c,r);let l=P(t,[`config`]);return l!=null&&po(l,r),r}function vo(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`prompt`]);a!=null&&N(r,[`instances[0]`,`prompt`],a);let o=P(t,[`image`]);o!=null&&N(r,[`instances[0]`,`image`],W(o));let s=P(t,[`video`]);s!=null&&N(r,[`instances[0]`,`video`],Ms(s));let c=P(t,[`source`]);c!=null&&So(c,r);let l=P(t,[`config`]);return l!=null&&mo(l,r),r}function yo(e,t){let n={},r=P(e,[`generatedSamples`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Eo(e))),N(n,[`generatedVideos`],e)}let i=P(e,[`raiMediaFilteredCount`]);i!=null&&N(n,[`raiMediaFilteredCount`],i);let a=P(e,[`raiMediaFilteredReasons`]);return a!=null&&N(n,[`raiMediaFilteredReasons`],a),n}function bo(e,t){let n={},r=P(e,[`videos`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>Do(e))),N(n,[`generatedVideos`],e)}let i=P(e,[`raiMediaFilteredCount`]);i!=null&&N(n,[`raiMediaFilteredCount`],i);let a=P(e,[`raiMediaFilteredReasons`]);return a!=null&&N(n,[`raiMediaFilteredReasons`],a),n}function xo(e,t,n){let r={},i=P(e,[`prompt`]);t!==void 0&&i!=null&&N(t,[`instances[0]`,`prompt`],i);let a=P(e,[`image`]);t!==void 0&&a!=null&&N(t,[`instances[0]`,`image`],Lo(a));let o=P(e,[`video`]);return t!==void 0&&o!=null&&N(t,[`instances[0]`,`video`],js(o)),r}function So(e,t,n){let r={},i=P(e,[`prompt`]);t!==void 0&&i!=null&&N(t,[`instances[0]`,`prompt`],i);let a=P(e,[`image`]);t!==void 0&&a!=null&&N(t,[`instances[0]`,`image`],W(a));let o=P(e,[`video`]);return t!==void 0&&o!=null&&N(t,[`instances[0]`,`video`],Ms(o)),r}function Co(e,t){let n={},r=P(e,[`_self`]);r!=null&&N(n,[`image`],Fo(r));let i=P(e,[`raiFilteredReason`]);i!=null&&N(n,[`raiFilteredReason`],i);let a=P(e,[`_self`]);return a!=null&&N(n,[`safetyAttributes`],rs(a)),n}function wo(e,t){let n={},r=P(e,[`_self`]);r!=null&&N(n,[`image`],Io(r));let i=P(e,[`raiFilteredReason`]);i!=null&&N(n,[`raiFilteredReason`],i);let a=P(e,[`_self`]);a!=null&&N(n,[`safetyAttributes`],is(a));let o=P(e,[`prompt`]);return o!=null&&N(n,[`enhancedPrompt`],o),n}function To(e,t){let n={},r=P(e,[`_self`]);r!=null&&N(n,[`mask`],Io(r));let i=P(e,[`labels`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`labels`],e)}return n}function Eo(e,t){let n={},r=P(e,[`video`]);return r!=null&&N(n,[`video`],Es(r)),n}function Do(e,t){let n={},r=P(e,[`_self`]);return r!=null&&N(n,[`video`],Ds(r)),n}function Oo(e,t){let n={},r=P(e,[`modelSelectionConfig`]);r!=null&&N(n,[`modelConfig`],r);let i=P(e,[`responseJsonSchema`]);i!=null&&N(n,[`responseJsonSchema`],i);let a=P(e,[`audioTimestamp`]);a!=null&&N(n,[`audioTimestamp`],a);let o=P(e,[`candidateCount`]);o!=null&&N(n,[`candidateCount`],o);let s=P(e,[`enableAffectiveDialog`]);s!=null&&N(n,[`enableAffectiveDialog`],s);let c=P(e,[`frequencyPenalty`]);c!=null&&N(n,[`frequencyPenalty`],c);let l=P(e,[`logprobs`]);l!=null&&N(n,[`logprobs`],l);let u=P(e,[`maxOutputTokens`]);u!=null&&N(n,[`maxOutputTokens`],u);let d=P(e,[`mediaResolution`]);d!=null&&N(n,[`mediaResolution`],d);let f=P(e,[`presencePenalty`]);f!=null&&N(n,[`presencePenalty`],f);let p=P(e,[`responseLogprobs`]);p!=null&&N(n,[`responseLogprobs`],p);let m=P(e,[`responseMimeType`]);m!=null&&N(n,[`responseMimeType`],m);let h=P(e,[`responseModalities`]);h!=null&&N(n,[`responseModalities`],h);let g=P(e,[`responseSchema`]);g!=null&&N(n,[`responseSchema`],g);let _=P(e,[`routingConfig`]);_!=null&&N(n,[`routingConfig`],_);let v=P(e,[`seed`]);v!=null&&N(n,[`seed`],v);let y=P(e,[`speechConfig`]);y!=null&&N(n,[`speechConfig`],fs(y));let b=P(e,[`stopSequences`]);b!=null&&N(n,[`stopSequences`],b);let x=P(e,[`temperature`]);x!=null&&N(n,[`temperature`],x);let S=P(e,[`thinkingConfig`]);S!=null&&N(n,[`thinkingConfig`],S);let C=P(e,[`topK`]);C!=null&&N(n,[`topK`],C);let w=P(e,[`topP`]);if(w!=null&&N(n,[`topP`],w),P(e,[`enableEnhancedCivicAnswers`])!==void 0)throw Error(`enableEnhancedCivicAnswers parameter is not supported in Vertex AI.`);return n}function ko(e,t,n){let r={},i=P(t,[`model`]);return i!=null&&N(r,[`_url`,`name`],F(e,i)),r}function Ao(e,t,n){let r={},i=P(t,[`model`]);return i!=null&&N(r,[`_url`,`name`],F(e,i)),r}function jo(e,t){let n={},r=P(e,[`authConfig`]);r!=null&&N(n,[`authConfig`],ya(r));let i=P(e,[`enableWidget`]);return i!=null&&N(n,[`enableWidget`],i),n}function Mo(e,t){let n={},r=P(e,[`searchTypes`]);if(r!=null&&N(n,[`searchTypes`],r),P(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(P(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let i=P(e,[`timeRangeFilter`]);return i!=null&&N(n,[`timeRangeFilter`],i),n}function No(e,t){let n={},r=P(e,[`aspectRatio`]);r!=null&&N(n,[`aspectRatio`],r);let i=P(e,[`imageSize`]);if(i!=null&&N(n,[`imageSize`],i),P(e,[`personGeneration`])!==void 0)throw Error(`personGeneration parameter is not supported in Gemini API.`);if(P(e,[`prominentPeople`])!==void 0)throw Error(`prominentPeople parameter is not supported in Gemini API.`);if(P(e,[`outputMimeType`])!==void 0)throw Error(`outputMimeType parameter is not supported in Gemini API.`);if(P(e,[`outputCompressionQuality`])!==void 0)throw Error(`outputCompressionQuality parameter is not supported in Gemini API.`);if(P(e,[`imageOutputOptions`])!==void 0)throw Error(`imageOutputOptions parameter is not supported in Gemini API.`);return n}function Po(e,t){let n={},r=P(e,[`aspectRatio`]);r!=null&&N(n,[`aspectRatio`],r);let i=P(e,[`imageSize`]);i!=null&&N(n,[`imageSize`],i);let a=P(e,[`personGeneration`]);a!=null&&N(n,[`personGeneration`],a);let o=P(e,[`prominentPeople`]);o!=null&&N(n,[`prominentPeople`],o);let s=P(e,[`outputMimeType`]);s!=null&&N(n,[`imageOutputOptions`,`mimeType`],s);let c=P(e,[`outputCompressionQuality`]);c!=null&&N(n,[`imageOutputOptions`,`compressionQuality`],c);let l=P(e,[`imageOutputOptions`]);return l!=null&&N(n,[`imageOutputOptions`],l),n}function Fo(e,t){let n={},r=P(e,[`bytesBase64Encoded`]);r!=null&&N(n,[`imageBytes`],z(r));let i=P(e,[`mimeType`]);return i!=null&&N(n,[`mimeType`],i),n}function Io(e,t){let n={},r=P(e,[`gcsUri`]);r!=null&&N(n,[`gcsUri`],r);let i=P(e,[`bytesBase64Encoded`]);i!=null&&N(n,[`imageBytes`],z(i));let a=P(e,[`mimeType`]);return a!=null&&N(n,[`mimeType`],a),n}function Lo(e,t){let n={};if(P(e,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);let r=P(e,[`imageBytes`]);r!=null&&N(n,[`bytesBase64Encoded`],z(r));let i=P(e,[`mimeType`]);return i!=null&&N(n,[`mimeType`],i),n}function W(e,t){let n={},r=P(e,[`gcsUri`]);r!=null&&N(n,[`gcsUri`],r);let i=P(e,[`imageBytes`]);i!=null&&N(n,[`bytesBase64Encoded`],z(i));let a=P(e,[`mimeType`]);return a!=null&&N(n,[`mimeType`],a),n}function Ro(e,t,n,r){let i={},a=P(t,[`pageSize`]);n!==void 0&&a!=null&&N(n,[`_query`,`pageSize`],a);let o=P(t,[`pageToken`]);n!==void 0&&o!=null&&N(n,[`_query`,`pageToken`],o);let s=P(t,[`filter`]);n!==void 0&&s!=null&&N(n,[`_query`,`filter`],s);let c=P(t,[`queryBase`]);return n!==void 0&&c!=null&&N(n,[`_url`,`models_url`],kn(e,c)),i}function zo(e,t,n,r){let i={},a=P(t,[`pageSize`]);n!==void 0&&a!=null&&N(n,[`_query`,`pageSize`],a);let o=P(t,[`pageToken`]);n!==void 0&&o!=null&&N(n,[`_query`,`pageToken`],o);let s=P(t,[`filter`]);n!==void 0&&s!=null&&N(n,[`_query`,`filter`],s);let c=P(t,[`queryBase`]);return n!==void 0&&c!=null&&N(n,[`_url`,`models_url`],kn(e,c)),i}function Bo(e,t,n){let r={},i=P(t,[`config`]);return i!=null&&Ro(e,i,r),r}function Vo(e,t,n){let r={},i=P(t,[`config`]);return i!=null&&zo(e,i,r),r}function Ho(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`nextPageToken`]);i!=null&&N(n,[`nextPageToken`],i);let a=P(e,[`_self`]);if(a!=null){let e=An(a);Array.isArray(e)&&(e=e.map(e=>Go(e))),N(n,[`models`],e)}return n}function Uo(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`nextPageToken`]);i!=null&&N(n,[`nextPageToken`],i);let a=P(e,[`_self`]);if(a!=null){let e=An(a);Array.isArray(e)&&(e=e.map(e=>Ko(e))),N(n,[`models`],e)}return n}function Wo(e,t){let n={},r=P(e,[`maskMode`]);r!=null&&N(n,[`maskMode`],r);let i=P(e,[`segmentationClasses`]);i!=null&&N(n,[`maskClasses`],i);let a=P(e,[`maskDilation`]);return a!=null&&N(n,[`dilation`],a),n}function Go(e,t){let n={},r=P(e,[`name`]);r!=null&&N(n,[`name`],r);let i=P(e,[`displayName`]);i!=null&&N(n,[`displayName`],i);let a=P(e,[`description`]);a!=null&&N(n,[`description`],a);let o=P(e,[`version`]);o!=null&&N(n,[`version`],o);let s=P(e,[`_self`]);s!=null&&N(n,[`tunedModelInfo`],_s(s));let c=P(e,[`inputTokenLimit`]);c!=null&&N(n,[`inputTokenLimit`],c);let l=P(e,[`outputTokenLimit`]);l!=null&&N(n,[`outputTokenLimit`],l);let u=P(e,[`supportedGenerationMethods`]);u!=null&&N(n,[`supportedActions`],u);let d=P(e,[`temperature`]);d!=null&&N(n,[`temperature`],d);let f=P(e,[`maxTemperature`]);f!=null&&N(n,[`maxTemperature`],f);let p=P(e,[`topP`]);p!=null&&N(n,[`topP`],p);let m=P(e,[`topK`]);m!=null&&N(n,[`topK`],m);let h=P(e,[`thinking`]);return h!=null&&N(n,[`thinking`],h),n}function Ko(e,t){let n={},r=P(e,[`name`]);r!=null&&N(n,[`name`],r);let i=P(e,[`displayName`]);i!=null&&N(n,[`displayName`],i);let a=P(e,[`description`]);a!=null&&N(n,[`description`],a);let o=P(e,[`versionId`]);o!=null&&N(n,[`version`],o);let s=P(e,[`deployedModels`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>Ya(e))),N(n,[`endpoints`],e)}let c=P(e,[`labels`]);c!=null&&N(n,[`labels`],c);let l=P(e,[`_self`]);l!=null&&N(n,[`tunedModelInfo`],vs(l));let u=P(e,[`defaultCheckpointId`]);u!=null&&N(n,[`defaultCheckpointId`],u);let d=P(e,[`checkpoints`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`checkpoints`],e)}return n}function qo(e,t){let n={},r=P(e,[`speakerVoiceConfigs`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>ds(e))),N(n,[`speakerVoiceConfigs`],e)}return n}function Jo(e,t){let n={},r=P(e,[`mediaResolution`]);r!=null&&N(n,[`mediaResolution`],r);let i=P(e,[`codeExecutionResult`]);i!=null&&N(n,[`codeExecutionResult`],i);let a=P(e,[`executableCode`]);a!=null&&N(n,[`executableCode`],a);let o=P(e,[`fileData`]);o!=null&&N(n,[`fileData`],Xa(o));let s=P(e,[`functionCall`]);s!=null&&N(n,[`functionCall`],Za(s));let c=P(e,[`functionResponse`]);c!=null&&N(n,[`functionResponse`],c);let l=P(e,[`inlineData`]);l!=null&&N(n,[`inlineData`],ba(l));let u=P(e,[`text`]);u!=null&&N(n,[`text`],u);let d=P(e,[`thought`]);d!=null&&N(n,[`thought`],d);let f=P(e,[`thoughtSignature`]);f!=null&&N(n,[`thoughtSignature`],f);let p=P(e,[`videoMetadata`]);p!=null&&N(n,[`videoMetadata`],p);let m=P(e,[`toolCall`]);m!=null&&N(n,[`toolCall`],m);let h=P(e,[`toolResponse`]);h!=null&&N(n,[`toolResponse`],h);let g=P(e,[`partMetadata`]);return g!=null&&N(n,[`partMetadata`],g),n}function Yo(e,t){let n={},r=P(e,[`mediaResolution`]);r!=null&&N(n,[`mediaResolution`],r);let i=P(e,[`codeExecutionResult`]);i!=null&&N(n,[`codeExecutionResult`],i);let a=P(e,[`executableCode`]);a!=null&&N(n,[`executableCode`],a);let o=P(e,[`fileData`]);o!=null&&N(n,[`fileData`],o);let s=P(e,[`functionCall`]);s!=null&&N(n,[`functionCall`],s);let c=P(e,[`functionResponse`]);c!=null&&N(n,[`functionResponse`],c);let l=P(e,[`inlineData`]);l!=null&&N(n,[`inlineData`],l);let u=P(e,[`text`]);u!=null&&N(n,[`text`],u);let d=P(e,[`thought`]);d!=null&&N(n,[`thought`],d);let f=P(e,[`thoughtSignature`]);f!=null&&N(n,[`thoughtSignature`],f);let p=P(e,[`videoMetadata`]);if(p!=null&&N(n,[`videoMetadata`],p),P(e,[`toolCall`])!==void 0)throw Error(`toolCall parameter is not supported in Vertex AI.`);if(P(e,[`toolResponse`])!==void 0)throw Error(`toolResponse parameter is not supported in Vertex AI.`);if(P(e,[`partMetadata`])!==void 0)throw Error(`partMetadata parameter is not supported in Vertex AI.`);return n}function Xo(e,t){let n={},r=P(e,[`productImage`]);return r!=null&&N(n,[`image`],W(r)),n}function Zo(e,t,n){let r={},i=P(e,[`numberOfImages`]);t!==void 0&&i!=null&&N(t,[`parameters`,`sampleCount`],i);let a=P(e,[`baseSteps`]);t!==void 0&&a!=null&&N(t,[`parameters`,`baseSteps`],a);let o=P(e,[`outputGcsUri`]);t!==void 0&&o!=null&&N(t,[`parameters`,`storageUri`],o);let s=P(e,[`seed`]);t!==void 0&&s!=null&&N(t,[`parameters`,`seed`],s);let c=P(e,[`safetyFilterLevel`]);t!==void 0&&c!=null&&N(t,[`parameters`,`safetySetting`],c);let l=P(e,[`personGeneration`]);t!==void 0&&l!=null&&N(t,[`parameters`,`personGeneration`],l);let u=P(e,[`addWatermark`]);t!==void 0&&u!=null&&N(t,[`parameters`,`addWatermark`],u);let d=P(e,[`outputMimeType`]);t!==void 0&&d!=null&&N(t,[`parameters`,`outputOptions`,`mimeType`],d);let f=P(e,[`outputCompressionQuality`]);t!==void 0&&f!=null&&N(t,[`parameters`,`outputOptions`,`compressionQuality`],f);let p=P(e,[`enhancePrompt`]);t!==void 0&&p!=null&&N(t,[`parameters`,`enhancePrompt`],p);let m=P(e,[`labels`]);return t!==void 0&&m!=null&&N(t,[`labels`],m),r}function Qo(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`source`]);a!=null&&es(a,r);let o=P(t,[`config`]);return o!=null&&Zo(o,r),r}function $o(e,t){let n={},r=P(e,[`predictions`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>wo(e))),N(n,[`generatedImages`],e)}return n}function es(e,t,n){let r={},i=P(e,[`prompt`]);t!==void 0&&i!=null&&N(t,[`instances[0]`,`prompt`],i);let a=P(e,[`personImage`]);t!==void 0&&a!=null&&N(t,[`instances[0]`,`personImage`,`image`],W(a));let o=P(e,[`productImages`]);if(t!==void 0&&o!=null){let e=o;Array.isArray(e)&&(e=e.map(e=>Xo(e))),N(t,[`instances[0]`,`productImages`],e)}return r}function ts(e,t){let n={},r=P(e,[`referenceImage`]);r!=null&&N(n,[`referenceImage`],W(r));let i=P(e,[`referenceId`]);i!=null&&N(n,[`referenceId`],i);let a=P(e,[`referenceType`]);a!=null&&N(n,[`referenceType`],a);let o=P(e,[`maskImageConfig`]);o!=null&&N(n,[`maskImageConfig`],Wo(o));let s=P(e,[`controlImageConfig`]);s!=null&&N(n,[`controlImageConfig`],ka(s));let c=P(e,[`styleImageConfig`]);c!=null&&N(n,[`styleImageConfig`],c);let l=P(e,[`subjectImageConfig`]);return l!=null&&N(n,[`subjectImageConfig`],l),n}function ns(e,t){let n={},r=P(e,[`mimeType`]);r!=null&&N(n,[`mimeType`],r);let i=P(e,[`voiceSampleAudio`]);return i!=null&&N(n,[`voiceSampleAudio`],i),n}function rs(e,t){let n={},r=P(e,[`safetyAttributes`,`categories`]);r!=null&&N(n,[`categories`],r);let i=P(e,[`safetyAttributes`,`scores`]);i!=null&&N(n,[`scores`],i);let a=P(e,[`contentType`]);return a!=null&&N(n,[`contentType`],a),n}function is(e,t){let n={},r=P(e,[`safetyAttributes`,`categories`]);r!=null&&N(n,[`categories`],r);let i=P(e,[`safetyAttributes`,`scores`]);i!=null&&N(n,[`scores`],i);let a=P(e,[`contentType`]);return a!=null&&N(n,[`contentType`],a),n}function as(e,t){let n={},r=P(e,[`category`]);if(r!=null&&N(n,[`category`],r),P(e,[`method`])!==void 0)throw Error(`method parameter is not supported in Gemini API.`);let i=P(e,[`threshold`]);return i!=null&&N(n,[`threshold`],i),n}function os(e,t){let n={},r=P(e,[`image`]);return r!=null&&N(n,[`image`],W(r)),n}function ss(e,t,n){let r={},i=P(e,[`mode`]);t!==void 0&&i!=null&&N(t,[`parameters`,`mode`],i);let a=P(e,[`maxPredictions`]);t!==void 0&&a!=null&&N(t,[`parameters`,`maxPredictions`],a);let o=P(e,[`confidenceThreshold`]);t!==void 0&&o!=null&&N(t,[`parameters`,`confidenceThreshold`],o);let s=P(e,[`maskDilation`]);t!==void 0&&s!=null&&N(t,[`parameters`,`maskDilation`],s);let c=P(e,[`binaryColorThreshold`]);t!==void 0&&c!=null&&N(t,[`parameters`,`binaryColorThreshold`],c);let l=P(e,[`labels`]);return t!==void 0&&l!=null&&N(t,[`labels`],l),r}function cs(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`source`]);a!=null&&us(a,r);let o=P(t,[`config`]);return o!=null&&ss(o,r),r}function ls(e,t){let n={},r=P(e,[`predictions`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>To(e))),N(n,[`generatedMasks`],e)}return n}function us(e,t,n){let r={},i=P(e,[`prompt`]);t!==void 0&&i!=null&&N(t,[`instances[0]`,`prompt`],i);let a=P(e,[`image`]);t!==void 0&&a!=null&&N(t,[`instances[0]`,`image`],W(a));let o=P(e,[`scribbleImage`]);return t!==void 0&&o!=null&&N(t,[`instances[0]`,`scribble`],os(o)),r}function ds(e,t){let n={},r=P(e,[`speaker`]);r!=null&&N(n,[`speaker`],r);let i=P(e,[`voiceConfig`]);return i!=null&&N(n,[`voiceConfig`],Ns(i)),n}function fs(e,t){let n={},r=P(e,[`voiceConfig`]);r!=null&&N(n,[`voiceConfig`],Ns(r));let i=P(e,[`languageCode`]);i!=null&&N(n,[`languageCode`],i);let a=P(e,[`multiSpeakerVoiceConfig`]);return a!=null&&N(n,[`multiSpeakerVoiceConfig`],qo(a)),n}function ps(e,t){let n={},r=P(e,[`retrievalConfig`]);r!=null&&N(n,[`retrievalConfig`],r);let i=P(e,[`functionCallingConfig`]);i!=null&&N(n,[`functionCallingConfig`],Qa(i));let a=P(e,[`includeServerSideToolInvocations`]);return a!=null&&N(n,[`includeServerSideToolInvocations`],a),n}function ms(e,t){let n={},r=P(e,[`retrievalConfig`]);r!=null&&N(n,[`retrievalConfig`],r);let i=P(e,[`functionCallingConfig`]);if(i!=null&&N(n,[`functionCallingConfig`],i),P(e,[`includeServerSideToolInvocations`])!==void 0)throw Error(`includeServerSideToolInvocations parameter is not supported in Vertex AI.`);return n}function hs(e,t){let n={};if(P(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let r=P(e,[`computerUse`]);r!=null&&N(n,[`computerUse`],r);let i=P(e,[`fileSearch`]);i!=null&&N(n,[`fileSearch`],i);let a=P(e,[`googleSearch`]);a!=null&&N(n,[`googleSearch`],Mo(a));let o=P(e,[`googleMaps`]);o!=null&&N(n,[`googleMaps`],jo(o));let s=P(e,[`codeExecution`]);if(s!=null&&N(n,[`codeExecution`],s),P(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let c=P(e,[`functionDeclarations`]);if(c!=null){let e=c;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`functionDeclarations`],e)}let l=P(e,[`googleSearchRetrieval`]);if(l!=null&&N(n,[`googleSearchRetrieval`],l),P(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let u=P(e,[`urlContext`]);u!=null&&N(n,[`urlContext`],u);let d=P(e,[`mcpServers`]);if(d!=null){let e=d;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`mcpServers`],e)}return n}function gs(e,t){let n={},r=P(e,[`retrieval`]);r!=null&&N(n,[`retrieval`],r);let i=P(e,[`computerUse`]);if(i!=null&&N(n,[`computerUse`],i),P(e,[`fileSearch`])!==void 0)throw Error(`fileSearch parameter is not supported in Vertex AI.`);let a=P(e,[`googleSearch`]);a!=null&&N(n,[`googleSearch`],a);let o=P(e,[`googleMaps`]);o!=null&&N(n,[`googleMaps`],o);let s=P(e,[`codeExecution`]);s!=null&&N(n,[`codeExecution`],s);let c=P(e,[`enterpriseWebSearch`]);c!=null&&N(n,[`enterpriseWebSearch`],c);let l=P(e,[`functionDeclarations`]);if(l!=null){let e=l;Array.isArray(e)&&(e=e.map(e=>$a(e))),N(n,[`functionDeclarations`],e)}let u=P(e,[`googleSearchRetrieval`]);u!=null&&N(n,[`googleSearchRetrieval`],u);let d=P(e,[`parallelAiSearch`]);d!=null&&N(n,[`parallelAiSearch`],d);let f=P(e,[`urlContext`]);if(f!=null&&N(n,[`urlContext`],f),P(e,[`mcpServers`])!==void 0)throw Error(`mcpServers parameter is not supported in Vertex AI.`);return n}function _s(e,t){let n={},r=P(e,[`baseModel`]);r!=null&&N(n,[`baseModel`],r);let i=P(e,[`createTime`]);i!=null&&N(n,[`createTime`],i);let a=P(e,[`updateTime`]);return a!=null&&N(n,[`updateTime`],a),n}function vs(e,t){let n={},r=P(e,[`labels`,`google-vertex-llm-tuning-base-model-id`]);r!=null&&N(n,[`baseModel`],r);let i=P(e,[`createTime`]);i!=null&&N(n,[`createTime`],i);let a=P(e,[`updateTime`]);return a!=null&&N(n,[`updateTime`],a),n}function ys(e,t,n){let r={},i=P(e,[`displayName`]);t!==void 0&&i!=null&&N(t,[`displayName`],i);let a=P(e,[`description`]);t!==void 0&&a!=null&&N(t,[`description`],a);let o=P(e,[`defaultCheckpointId`]);return t!==void 0&&o!=null&&N(t,[`defaultCheckpointId`],o),r}function bs(e,t,n){let r={},i=P(e,[`displayName`]);t!==void 0&&i!=null&&N(t,[`displayName`],i);let a=P(e,[`description`]);t!==void 0&&a!=null&&N(t,[`description`],a);let o=P(e,[`defaultCheckpointId`]);return t!==void 0&&o!=null&&N(t,[`defaultCheckpointId`],o),r}function xs(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`name`],F(e,i));let a=P(t,[`config`]);return a!=null&&ys(a,r),r}function Ss(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`config`]);return a!=null&&bs(a,r),r}function Cs(e,t,n){let r={},i=P(e,[`outputGcsUri`]);t!==void 0&&i!=null&&N(t,[`parameters`,`storageUri`],i);let a=P(e,[`safetyFilterLevel`]);t!==void 0&&a!=null&&N(t,[`parameters`,`safetySetting`],a);let o=P(e,[`personGeneration`]);t!==void 0&&o!=null&&N(t,[`parameters`,`personGeneration`],o);let s=P(e,[`includeRaiReason`]);t!==void 0&&s!=null&&N(t,[`parameters`,`includeRaiReason`],s);let c=P(e,[`outputMimeType`]);t!==void 0&&c!=null&&N(t,[`parameters`,`outputOptions`,`mimeType`],c);let l=P(e,[`outputCompressionQuality`]);t!==void 0&&l!=null&&N(t,[`parameters`,`outputOptions`,`compressionQuality`],l);let u=P(e,[`enhanceInputImage`]);t!==void 0&&u!=null&&N(t,[`parameters`,`upscaleConfig`,`enhanceInputImage`],u);let d=P(e,[`imagePreservationFactor`]);t!==void 0&&d!=null&&N(t,[`parameters`,`upscaleConfig`,`imagePreservationFactor`],d);let f=P(e,[`labels`]);t!==void 0&&f!=null&&N(t,[`labels`],f);let p=P(e,[`numberOfImages`]);t!==void 0&&p!=null&&N(t,[`parameters`,`sampleCount`],p);let m=P(e,[`mode`]);return t!==void 0&&m!=null&&N(t,[`parameters`,`mode`],m),r}function ws(e,t,n){let r={},i=P(t,[`model`]);i!=null&&N(r,[`_url`,`model`],F(e,i));let a=P(t,[`image`]);a!=null&&N(r,[`instances[0]`,`image`],W(a));let o=P(t,[`upscaleFactor`]);o!=null&&N(r,[`parameters`,`upscaleConfig`,`upscaleFactor`],o);let s=P(t,[`config`]);return s!=null&&Cs(s,r),r}function Ts(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`predictions`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>wo(e))),N(n,[`generatedImages`],e)}return n}function Es(e,t){let n={},r=P(e,[`uri`]);r!=null&&N(n,[`uri`],r);let i=P(e,[`encodedVideo`]);i!=null&&N(n,[`videoBytes`],z(i));let a=P(e,[`encoding`]);return a!=null&&N(n,[`mimeType`],a),n}function Ds(e,t){let n={},r=P(e,[`gcsUri`]);r!=null&&N(n,[`uri`],r);let i=P(e,[`bytesBase64Encoded`]);i!=null&&N(n,[`videoBytes`],z(i));let a=P(e,[`mimeType`]);return a!=null&&N(n,[`mimeType`],a),n}function Os(e,t){let n={},r=P(e,[`image`]);r!=null&&N(n,[`_self`],W(r));let i=P(e,[`maskMode`]);return i!=null&&N(n,[`maskMode`],i),n}function ks(e,t){let n={},r=P(e,[`image`]);r!=null&&N(n,[`image`],Lo(r));let i=P(e,[`referenceType`]);return i!=null&&N(n,[`referenceType`],i),n}function As(e,t){let n={},r=P(e,[`image`]);r!=null&&N(n,[`image`],W(r));let i=P(e,[`referenceType`]);return i!=null&&N(n,[`referenceType`],i),n}function js(e,t){let n={},r=P(e,[`uri`]);r!=null&&N(n,[`uri`],r);let i=P(e,[`videoBytes`]);i!=null&&N(n,[`encodedVideo`],z(i));let a=P(e,[`mimeType`]);return a!=null&&N(n,[`encoding`],a),n}function Ms(e,t){let n={},r=P(e,[`uri`]);r!=null&&N(n,[`gcsUri`],r);let i=P(e,[`videoBytes`]);i!=null&&N(n,[`bytesBase64Encoded`],z(i));let a=P(e,[`mimeType`]);return a!=null&&N(n,[`mimeType`],a),n}function Ns(e,t){let n={},r=P(e,[`replicatedVoiceConfig`]);r!=null&&N(n,[`replicatedVoiceConfig`],ns(r));let i=P(e,[`prebuiltVoiceConfig`]);return i!=null&&N(n,[`prebuiltVoiceConfig`],i),n}function Ps(e,t){let n={},r=P(e,[`displayName`]);return t!==void 0&&r!=null&&N(t,[`displayName`],r),n}function Fs(e){let t={},n=P(e,[`config`]);return n!=null&&Ps(n,t),t}function Is(e,t){let n={},r=P(e,[`force`]);return t!==void 0&&r!=null&&N(t,[`_query`,`force`],r),n}function Ls(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`_url`,`name`],n);let r=P(e,[`config`]);return r!=null&&Is(r,t),t}function Rs(e){let t={},n=P(e,[`name`]);return n!=null&&N(t,[`_url`,`name`],n),t}function zs(e,t){let n={},r=P(e,[`customMetadata`]);if(t!==void 0&&r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`customMetadata`],e)}let i=P(e,[`chunkingConfig`]);return t!==void 0&&i!=null&&N(t,[`chunkingConfig`],i),n}function Bs(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`name`],n);let r=P(e,[`metadata`]);r!=null&&N(t,[`metadata`],r);let i=P(e,[`done`]);i!=null&&N(t,[`done`],i);let a=P(e,[`error`]);a!=null&&N(t,[`error`],a);let o=P(e,[`response`]);return o!=null&&N(t,[`response`],Hs(o)),t}function Vs(e){let t={},n=P(e,[`fileSearchStoreName`]);n!=null&&N(t,[`_url`,`file_search_store_name`],n);let r=P(e,[`fileName`]);r!=null&&N(t,[`fileName`],r);let i=P(e,[`config`]);return i!=null&&zs(i,t),t}function Hs(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`parent`]);r!=null&&N(t,[`parent`],r);let i=P(e,[`documentName`]);return i!=null&&N(t,[`documentName`],i),t}function Us(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);return t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),n}function Ws(e){let t={},n=P(e,[`config`]);return n!=null&&Us(n,t),t}function Gs(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`fileSearchStores`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`fileSearchStores`],e)}return t}function Ks(e,t){let n={},r=P(e,[`mimeType`]);t!==void 0&&r!=null&&N(t,[`mimeType`],r);let i=P(e,[`displayName`]);t!==void 0&&i!=null&&N(t,[`displayName`],i);let a=P(e,[`customMetadata`]);if(t!==void 0&&a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`customMetadata`],e)}let o=P(e,[`chunkingConfig`]);return t!==void 0&&o!=null&&N(t,[`chunkingConfig`],o),n}function qs(e){let t={},n=P(e,[`fileSearchStoreName`]);n!=null&&N(t,[`_url`,`file_search_store_name`],n);let r=P(e,[`config`]);return r!=null&&Ks(r,t),t}function Js(e){let t={},n=P(e,[`sdkHttpResponse`]);return n!=null&&N(t,[`sdkHttpResponse`],n),t}var Ys=`Content-Type`,Xs=`X-Server-Timeout`,Zs=`User-Agent`,Qs=`x-goog-api-client`,$s=`google-genai-sdk/1.47.0`,ec=`v1beta1`,tc=`v1beta`,nc=5,rc=[408,429,500,502,503,504],ic=class{constructor(e){this.clientOptions=Object.assign({},e),this.customBaseUrl=e.httpOptions?.baseUrl,this.clientOptions.vertexai&&(this.clientOptions.project&&this.clientOptions.location?this.clientOptions.apiKey=void 0:this.clientOptions.apiKey&&(this.clientOptions.project=void 0,this.clientOptions.location=void 0));let t={};if(this.clientOptions.vertexai){if(!this.clientOptions.location&&!this.clientOptions.apiKey&&!this.customBaseUrl&&(this.clientOptions.location=`global`),!(this.clientOptions.project&&this.clientOptions.location||this.clientOptions.apiKey)&&!this.customBaseUrl)throw Error(`Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.`);let n=e.project&&e.location||!!e.apiKey;this.customBaseUrl&&!n?(t.baseUrl=this.customBaseUrl,this.clientOptions.project=void 0,this.clientOptions.location=void 0):this.clientOptions.apiKey||this.clientOptions.location===`global`?t.baseUrl=`https://aiplatform.googleapis.com/`:this.clientOptions.project&&this.clientOptions.location&&this.clientOptions.location===`us`?t.baseUrl=`https://aiplatform.${this.clientOptions.location}.rep.googleapis.com/`:this.clientOptions.project&&this.clientOptions.location&&(t.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`),t.apiVersion=this.clientOptions.apiVersion??ec}else this.clientOptions.apiKey||console.warn(`API key should be set when using the Gemini API.`),t.apiVersion=this.clientOptions.apiVersion??tc,t.baseUrl=`https://generativelanguage.googleapis.com/`;t.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=t,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(t,e.httpOptions))}isVertexAI(){return this.clientOptions.vertexai??!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getCustomBaseUrl(){return this.customBaseUrl}async getAuthHeaders(){let e=new Headers;return await this.clientOptions.auth.addAuthHeaders(e),e}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw Error(`API version is not set.`)}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw Error(`Base URL is not set.`)}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw Error(`Headers are not set.`)}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw Error(`HTTP options are not correctly set.`);let t=[e.baseUrl.endsWith(`/`)?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==``&&t.push(e.apiVersion),t.join(`/`)}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){let e=this.getBaseUrl(),t=new URL(e);return t.protocol=t.protocol==`http:`?`ws`:`wss`,t.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw Error(`HTTP options are not correctly set.`)}constructUrl(e,t,n){let r=[this.getRequestUrlInternal(t)];return n&&r.push(this.getBaseResourcePath()),e!==``&&r.push(e),new URL(`${r.join(`/`)}`)}shouldPrependVertexProjectPath(e,t){return!(t.baseUrl&&t.baseUrlResourceScope===tt.COLLECTION||this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith(`projects/`)||e.httpMethod===`GET`&&e.path.startsWith(`publishers/google/models`))}async request(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));let n=this.shouldPrependVertexProjectPath(e,t),r=this.constructUrl(e.path,t,n);if(e.queryParams)for(let[t,n]of Object.entries(e.queryParams))r.searchParams.append(t,String(n));let i={};if(e.httpMethod===`GET`){if(e.body&&e.body!==`{}`)throw Error(`Request body should be empty for GET request, but got non empty request body`)}else i.body=e.body;return i=await this.includeExtraHttpOptionsToRequestInit(i,t,r.toString(),e.abortSignal),this.unaryApiCall(r,i,e.httpMethod)}patchHttpOptions(e,t){let n=JSON.parse(JSON.stringify(e));for(let[e,r]of Object.entries(t))typeof r==`object`?n[e]=Object.assign(Object.assign({},n[e]),r):r!==void 0&&(n[e]=r);return n}async requestStream(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));let n=this.shouldPrependVertexProjectPath(e,t),r=this.constructUrl(e.path,t,n);(!r.searchParams.has(`alt`)||r.searchParams.get(`alt`)!==`sse`)&&r.searchParams.set(`alt`,`sse`);let i={};return i.body=e.body,i=await this.includeExtraHttpOptionsToRequestInit(i,t,r.toString(),e.abortSignal),this.streamApiCall(r,i,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,t,n,r){if(t&&t.timeout||r){let n=new AbortController,i=n.signal;if(t.timeout&&t?.timeout>0){let e=setTimeout(()=>n.abort(),t.timeout);e&&typeof e.unref==`function`&&e.unref()}r&&r.addEventListener(`abort`,()=>{n.abort()}),e.signal=i}return t&&t.extraBody!==null&&oc(e,t.extraBody),e.headers=await this.getHeadersInternal(t,n),e}async unaryApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async e=>(await ac(e),new kt(e))).catch(e=>{throw e instanceof Error?e:Error(JSON.stringify(e))})}async streamApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async e=>(await ac(e),this.processStreamResponse(e))).catch(e=>{throw e instanceof Error?e:Error(JSON.stringify(e))})}processStreamResponse(e){return H(this,arguments,function*(){let t=(e?.body)?.getReader(),n=new TextDecoder(`utf-8`);if(!t)throw Error(`Response body is empty`);try{let r=``,i=[`

`,`\r\r`,`\r
\r
`];for(;;){let{done:a,value:o}=yield V(t.read());if(a){if(r.trim().length>0)throw Error(`Incomplete JSON segment at the end`);break}let s=n.decode(o,{stream:!0});try{let e=JSON.parse(s);if(`error`in e){let t=JSON.parse(JSON.stringify(e.error)),n=t.status,r=t.code,i=`got status: ${n}. ${JSON.stringify(e)}`;if(r>=400&&r<600)throw new ki({message:i,status:r})}}catch(e){if(e.name===`ApiError`)throw e}r+=s;let c=-1,l=0;for(;;){c=-1,l=0;for(let e of i){let t=r.indexOf(e);t!==-1&&(c===-1||t<c)&&(c=t,l=e.length)}if(c===-1)break;let t=r.substring(0,c);r=r.substring(c+l);let n=t.trim();if(n.startsWith(`data:`)){let t=n.substring(5).trim();try{yield yield V(new kt(new Response(t,{headers:e?.headers,status:e?.status,statusText:e?.statusText})))}catch(e){throw Error(`exception parsing stream chunk ${t}. ${e}`)}}}}}finally{t.releaseLock()}})}async apiCall(e,t){if(!this.clientOptions.httpOptions||!this.clientOptions.httpOptions.retryOptions)return fetch(e,t);let n=this.clientOptions.httpOptions.retryOptions;return(0,E.default)(async()=>{let n=await fetch(e,t);if(n.ok)return n;throw rc.includes(n.status)?Error(`Retryable HTTP Error: ${n.statusText}`):new E.AbortError(`Non-retryable exception ${n.statusText} sending request`)},{retries:(n.attempts??nc)-1})}getDefaultHeaders(){let e={},t=$s+` `+this.clientOptions.userAgentExtra;return e[Zs]=t,e[Qs]=t,e[Ys]=`application/json`,e}async getHeadersInternal(e,t){let n=new Headers;if(e&&e.headers){for(let[t,r]of Object.entries(e.headers))n.append(t,r);e.timeout&&e.timeout>0&&n.append(Xs,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(n,t),n}getFileName(e){let t=``;return typeof e==`string`&&(t=e.replace(/[/\\]+$/,``),t=t.split(/[/\\]/).pop()??``),t}async uploadFile(e,t){let n={};t!=null&&(n.mimeType=t.mimeType,n.name=t.name,n.displayName=t.displayName),n.name&&!n.name.startsWith(`files/`)&&(n.name=`files/${n.name}`);let r=this.clientOptions.uploader,i=await r.stat(e);n.sizeBytes=String(i.size);let a=t?.mimeType??i.type;if(a===void 0||a===``)throw Error(`Can not determine mimeType. Please provide mimeType in the config.`);n.mimeType=a;let o={file:n},s=this.getFileName(e),c=M(`upload/v1beta/files`,o._url),l=await this.fetchUploadUrl(c,n.sizeBytes,n.mimeType,s,o,t?.httpOptions);return r.upload(e,l,this)}async uploadFileToFileSearchStore(e,t,n){let r=this.clientOptions.uploader,i=await r.stat(t),a=String(i.size),o=n?.mimeType??i.type;if(o===void 0||o===``)throw Error(`Can not determine mimeType. Please provide mimeType in the config.`);let s=`upload/v1beta/${e}:uploadToFileSearchStore`,c=this.getFileName(t),l={};n!=null&&Ks(n,l);let u=await this.fetchUploadUrl(s,a,o,c,l,n?.httpOptions);return r.uploadToFileSearchStore(t,u,this)}async downloadFile(e){await this.clientOptions.downloader.download(e,this)}async fetchUploadUrl(e,t,n,r,i,a){let o={};o=a||{apiVersion:``,headers:Object.assign({"Content-Type":`application/json`,"X-Goog-Upload-Protocol":`resumable`,"X-Goog-Upload-Command":`start`,"X-Goog-Upload-Header-Content-Length":`${t}`,"X-Goog-Upload-Header-Content-Type":`${n}`},r?{"X-Goog-Upload-File-Name":r}:{})};let s=await this.request({path:e,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:o});if(!s||!s?.headers)throw Error(`Server did not return an HttpResponse or the returned HttpResponse did not have headers.`);let c=s?.headers?.[`x-goog-upload-url`];if(c===void 0)throw Error(`Failed to get upload url. Server did not return the x-google-upload-url in the headers`);return c}};async function ac(e){if(e===void 0)throw Error(`response is undefined`);if(!e.ok){let t=e.status,n;n=e.headers.get(`content-type`)?.includes(`application/json`)?await e.json():{error:{message:await e.text(),code:e.status,status:e.statusText}};let r=JSON.stringify(n);throw t>=400&&t<600?new ki({message:r,status:t}):Error(r)}}function oc(e,t){if(!t||Object.keys(t).length===0)return;if(e.body instanceof Blob){console.warn(`includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.`);return}let n={};if(typeof e.body==`string`&&e.body.length>0)try{let t=JSON.parse(e.body);if(typeof t==`object`&&t&&!Array.isArray(t))n=t;else{console.warn(`includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.`);return}}catch{console.warn(`includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.`);return}function r(e,t){let n=Object.assign({},e);for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e],a=n[e];i&&typeof i==`object`&&!Array.isArray(i)&&a&&typeof a==`object`&&!Array.isArray(a)?n[e]=r(a,i):(a&&i&&typeof a!=typeof i&&console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${e}". Original type: ${typeof a}, New type: ${typeof i}. Overwriting.`),n[e]=i)}return n}let i=r(n,t);e.body=JSON.stringify(i)}var sc=`mcp_used/unknown`,cc=!1;function lc(e){for(let t of e)if(dc(t)||typeof t==`object`&&`inputSchema`in t)return!0;return cc}function uc(e){e[Qs]=((e[Qs]??``)+` ${sc}`).trimStart()}function dc(e){return typeof e==`object`&&!!e&&e instanceof pc}function fc(e){return H(this,arguments,function*(e,t=100){let n,r=0;for(;r<t;){let t=yield V(e.listTools({cursor:n}));for(let e of t.tools)yield yield V(e),r++;if(!t.nextCursor)break;n=t.nextCursor}})}var pc=class e{constructor(e=[],t){this.mcpTools=[],this.functionNameToMcpClient={},this.mcpClients=e,this.config=t}static create(t,n){return new e(t,n)}async initialize(){var e,t,n,r;if(this.mcpTools.length>0)return;let i={},a=[];for(let l of this.mcpClients)try{for(var o=!0,s=(t=void 0,U(fc(l))),c;c=await s.next(),e=c.done,!e;o=!0){r=c.value,o=!1;let e=r;a.push(e);let t=e.name;if(i[t])throw Error(`Duplicate function name ${t} found in MCP tools. Please ensure function names are unique.`);i[t]=l}}catch(e){t={error:e}}finally{try{!o&&!e&&(n=s.return)&&await n.call(s)}finally{if(t)throw t.error}}this.mcpTools=a,this.functionNameToMcpClient=i}async tool(){return await this.initialize(),Nn(this.mcpTools,this.config)}async callTool(e){await this.initialize();let t=[];for(let n of e)if(n.name in this.functionNameToMcpClient){let e=this.functionNameToMcpClient[n.name],r;this.config.timeout&&(r={timeout:this.config.timeout});let i=await e.callTool({name:n.name,arguments:n.args},void 0,r);t.push({functionResponse:{name:n.name,response:i.isError?{error:i}:i}})}return t}};async function mc(e,t,n){let r=new nn,i;i=n.data instanceof Blob?JSON.parse(await n.data.text()):JSON.parse(n.data),Object.assign(r,i),t(r)}var hc=class{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n}async connect(e){if(this.apiClient.isVertexAI())throw Error(`Live music is not supported for Vertex AI.`);console.warn(`Live music generation is experimental and may change in future versions.`);let t=this.apiClient.getWebsocketBaseUrl(),n=this.apiClient.getApiVersion(),r=vc(this.apiClient.getDefaultHeaders()),i=`${t}/ws/google.ai.generativelanguage.${n}.GenerativeService.BidiGenerateMusic?key=${this.apiClient.getApiKey()}`,a=()=>{},o=new Promise(e=>{a=e}),s=e.callbacks,c=function(){a({})},l=this.apiClient,u={onopen:c,onmessage:e=>{mc(l,s.onmessage,e)},onerror:s?.onerror??function(e){},onclose:s?.onclose??function(e){}},d=this.webSocketFactory.create(i,_c(r),u);d.connect(),await o;let f={setup:{model:F(this.apiClient,e.model)}};return d.send(JSON.stringify(f)),new gc(d,this.apiClient)}},gc=class{constructor(e,t){this.conn=e,this.apiClient=t}async setWeightedPrompts(e){if(!e.weightedPrompts||Object.keys(e.weightedPrompts).length===0)throw Error(`Weighted prompts must be set and contain at least one entry.`);let t=ra(e);this.conn.send(JSON.stringify({clientContent:t}))}async setMusicGenerationConfig(e){e.musicGenerationConfig||={};let t=na(e);this.conn.send(JSON.stringify(t))}sendPlaybackControl(e){let t={playbackControl:e};this.conn.send(JSON.stringify(t))}play(){this.sendPlaybackControl(Ot.PLAY)}pause(){this.sendPlaybackControl(Ot.PAUSE)}stop(){this.sendPlaybackControl(Ot.STOP)}resetContext(){this.sendPlaybackControl(Ot.RESET_CONTEXT)}close(){this.conn.close()}};function _c(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}function vc(e){let t=new Headers;for(let[n,r]of Object.entries(e))t.append(n,r);return t}var yc="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function bc(e,t,n){let r=new tn,i;i=n.data instanceof Blob?await n.data.text():n.data instanceof ArrayBuffer?new TextDecoder().decode(n.data):n.data;let a=JSON.parse(i);if(e.isVertexAI()){let e=oa(a);Object.assign(r,e)}else Object.assign(r,a);t(r)}var xc=class{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n,this.music=new hc(this.apiClient,this.auth,this.webSocketFactory)}async connect(e){if(e.config&&e.config.httpOptions)throw Error(`The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.`);let t=this.apiClient.getWebsocketBaseUrl(),n=this.apiClient.getApiVersion(),r,i=this.apiClient.getHeaders();e.config&&e.config.tools&&lc(e.config.tools)&&uc(i);let a=Tc(i);if(this.apiClient.isVertexAI()){let e=this.apiClient.getProject(),i=this.apiClient.getLocation(),o=this.apiClient.getApiKey(),s=!!e&&!!i||!!o;this.apiClient.getCustomBaseUrl()&&!s?r=t:(r=`${t}/ws/google.cloud.aiplatform.${n}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(a,r))}else{let e=this.apiClient.getApiKey(),i=`BidiGenerateContent`,a=`key`;e?.startsWith(`auth_tokens/`)&&(console.warn(`Warning: Ephemeral token support is experimental and may change in future versions.`),n!==`v1alpha`&&console.warn(`Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection.`),i=`BidiGenerateContentConstrained`,a=`access_token`),r=`${t}/ws/google.ai.generativelanguage.${n}.GenerativeService.${i}?${a}=${e}`}let o=()=>{},s=new Promise(e=>{o=e}),c=e.callbacks,l=function(){var e;(e=c?.onopen)==null||e.call(c),o({})},u=this.apiClient,d={onopen:l,onmessage:e=>{bc(u,c.onmessage,e)},onerror:c?.onerror??function(e){},onclose:c?.onclose??function(e){}},f=this.webSocketFactory.create(r,wc(a),d);f.connect(),await s;let p=F(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&p.startsWith(`publishers/`)){let e=this.apiClient.getProject(),t=this.apiClient.getLocation();e&&t&&(p=`projects/${e}/locations/${t}/`+p)}let m={};this.apiClient.isVertexAI()&&e.config?.responseModalities===void 0&&(e.config===void 0?e.config={responseModalities:[He.AUDIO]}:e.config.responseModalities=[He.AUDIO]),e.config?.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");let h=e.config?.tools??[],g=[];for(let e of h)if(this.isCallableTool(e)){let t=e;g.push(await t.tool())}else g.push(e);g.length>0&&(e.config.tools=g);let _={model:p,config:e.config,callbacks:e.callbacks};return m=this.apiClient.isVertexAI()?ta(this.apiClient,_):ea(this.apiClient,_),delete m.config,f.send(JSON.stringify(m)),new Cc(f,this.apiClient)}isCallableTool(e){return`callTool`in e&&typeof e.callTool==`function`}},Sc={turnComplete:!0},Cc=class{constructor(e,t){this.conn=e,this.apiClient=t}tLiveClientContent(e,t){if(t.turns!==null&&t.turns!==void 0){let n=[];try{n=L(t.turns),e.isVertexAI()||(n=n.map(e=>Da(e)))}catch{throw Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`)}return{clientContent:{turns:n,turnComplete:t.turnComplete}}}return{clientContent:{turnComplete:t.turnComplete}}}tLiveClienttToolResponse(e,t){let n=[];if(t.functionResponses==null||(n=Array.isArray(t.functionResponses)?t.functionResponses:[t.functionResponses],n.length===0))throw Error(`functionResponses is required.`);for(let t of n){if(typeof t!=`object`||!t||!(`name`in t)||!(`response`in t))throw Error(`Could not parse function response, type '${typeof t}'.`);if(!e.isVertexAI()&&!(`id`in t))throw Error(yc)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},Sc),e);let t=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendRealtimeInput(e){let t={};t=this.apiClient.isVertexAI()?{realtimeInput:aa(e)}:{realtimeInput:ia(e)},this.conn.send(JSON.stringify(t))}sendToolResponse(e){if(e.functionResponses==null)throw Error(`Tool response parameters are required.`);let t=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(t))}close(){this.conn.close()}};function wc(e){let t={};return e.forEach((e,n)=>{t[n]=e}),t}function Tc(e){let t=new Headers;for(let[n,r]of Object.entries(e))t.append(n,r);return t}var Ec=10;function Dc(e){if(e?.automaticFunctionCalling?.disable)return!0;let t=!1;for(let n of e?.tools??[])if(Oc(n)){t=!0;break}if(!t)return!0;let n=e?.automaticFunctionCalling?.maximumRemoteCalls;return n&&(n<0||!Number.isInteger(n))||n==0?(console.warn(`Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:`,n),!0):!1}function Oc(e){return`callTool`in e&&typeof e.callTool==`function`}function kc(e){return(e.config?.tools)?.some(e=>Oc(e))??!1}function Ac(e){let t=[];return e?.config?.tools&&e.config.tools.forEach((e,n)=>{if(Oc(e))return;let r=e;r.functionDeclarations&&r.functionDeclarations.length>0&&t.push(n)}),t}function jc(e){return!e?.automaticFunctionCalling?.ignoreCallHistory}var Mc=class extends j{constructor(e){super(),this.apiClient=e,this.embedContent=async e=>{if(!this.apiClient.isVertexAI())return await this.embedContentInternal(e);if(e.model.includes(`gemini`)&&e.model!==`gemini-embedding-001`||e.model.includes(`maas`)){let t=L(e.contents);if(t.length>1)throw Error(`The embedContent API for this model only supports one content at a time.`);let n=Object.assign(Object.assign({},e),{content:t[0],embeddingApiType:it.EMBED_CONTENT});return await this.embedContentInternal(n)}else{let t=Object.assign(Object.assign({},e),{embeddingApiType:it.PREDICT});return await this.embedContentInternal(t)}},this.generateContent=async e=>{let t=await this.processParamsMaybeAddMcpUsage(e);if(this.maybeMoveToResponseJsonSchem(e),!kc(e)||Dc(e.config))return await this.generateContentInternal(t);let n=Ac(e);if(n.length>0){let e=n.map(e=>`tools[${e}]`).join(`, `);throw Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${e}.`)}let r,i,a=L(t.contents),o=t.config?.automaticFunctionCalling?.maximumRemoteCalls??Ec,s=0;for(;s<o&&(r=await this.generateContentInternal(t),!(!r.functionCalls||r.functionCalls.length===0));){let n=r.candidates[0].content,o=[];for(let t of e.config?.tools??[])if(Oc(t)){let e=await t.callTool(r.functionCalls);o.push(...e)}s++,i={role:`user`,parts:o},t.contents=L(t.contents),t.contents.push(n),t.contents.push(i),jc(t.config)&&(a.push(n),a.push(i))}return jc(t.config)&&(r.automaticFunctionCallingHistory=a),r},this.generateContentStream=async e=>{if(this.maybeMoveToResponseJsonSchem(e),Dc(e.config)){let t=await this.processParamsMaybeAddMcpUsage(e);return await this.generateContentStreamInternal(t)}let t=Ac(e);if(t.length>0){let e=t.map(e=>`tools[${e}]`).join(`, `);throw Error(`Incompatible tools found at ${e}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`)}let n=e?.config?.toolConfig?.functionCallingConfig?.streamFunctionCallArguments,r=e?.config?.automaticFunctionCalling?.disable;if(n&&!r)throw Error(`Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.`);return await this.processAfcStream(e)},this.generateImages=async e=>await this.generateImagesInternal(e).then(e=>{let t,n=[];if(e?.generatedImages)for(let r of e.generatedImages)r&&r?.safetyAttributes&&r?.safetyAttributes?.contentType===`Positive Prompt`?t=r?.safetyAttributes:n.push(r);let r;return r=t?{generatedImages:n,positivePromptSafetyAttributes:t,sdkHttpResponse:e.sdkHttpResponse}:{generatedImages:n,sdkHttpResponse:e.sdkHttpResponse},r}),this.list=async e=>{let t={config:Object.assign(Object.assign({},{queryBase:!0}),e?.config)};if(this.apiClient.isVertexAI()&&!t.config.queryBase){if(t.config?.filter)throw Error(`Filtering tuned models list for Vertex AI is not currently supported`);t.config.filter=`labels.tune-type:*`}return new Ir(B.PAGED_ITEM_MODELS,e=>this.listInternal(e),await this.listInternal(t),t)},this.editImage=async e=>{let t={model:e.model,prompt:e.prompt,referenceImages:[],config:e.config};return e.referenceImages&&e.referenceImages&&(t.referenceImages=e.referenceImages.map(e=>e.toReferenceImageAPI())),await this.editImageInternal(t)},this.upscaleImage=async e=>{let t={numberOfImages:1,mode:`upscale`};e.config&&(t=Object.assign(Object.assign({},t),e.config));let n={model:e.model,image:e.image,upscaleFactor:e.upscaleFactor,config:t};return await this.upscaleImageInternal(n)},this.generateVideos=async e=>{if((e.prompt||e.image||e.video)&&e.source)throw Error(`Source and prompt/image/video are mutually exclusive. Please only use source.`);return this.apiClient.isVertexAI()||(e.video?.uri&&e.video?.videoBytes?e.video={uri:e.video.uri,mimeType:e.video.mimeType}:e.source?.video?.uri&&e.source?.video?.videoBytes&&(e.source.video={uri:e.source.video.uri,mimeType:e.source.video.mimeType})),await this.generateVideosInternal(e)}}maybeMoveToResponseJsonSchem(e){e.config&&e.config.responseSchema&&(e.config.responseJsonSchema||Object.keys(e.config.responseSchema).includes(`$schema`)&&(e.config.responseJsonSchema=e.config.responseSchema,delete e.config.responseSchema))}async processParamsMaybeAddMcpUsage(e){let t=e.config?.tools;if(!t)return e;let n=await Promise.all(t.map(async e=>Oc(e)?await e.tool():e)),r={model:e.model,contents:e.contents,config:Object.assign(Object.assign({},e.config),{tools:n})};if(r.config.tools=n,e.config&&e.config.tools&&lc(e.config.tools)){let t=e.config.httpOptions?.headers??{},n=Object.assign({},t);Object.keys(n).length===0&&(n=this.apiClient.getDefaultHeaders()),uc(n),r.config.httpOptions=Object.assign(Object.assign({},e.config.httpOptions),{headers:n})}return r}async initAfcToolsMap(e){let t=new Map;for(let n of e.config?.tools??[])if(Oc(n)){let e=n,r=await e.tool();for(let n of r.functionDeclarations??[]){if(!n.name)throw Error(`Function declaration name is required.`);if(t.has(n.name))throw Error(`Duplicate tool declaration name: ${n.name}`);t.set(n.name,e)}}return t}async processAfcStream(e){let t=e.config?.automaticFunctionCalling?.maximumRemoteCalls??Ec,n=!1,r=0,i=await this.initAfcToolsMap(e);return(function(e,i,a){return H(this,arguments,function*(){for(var o,s,c,l;r<t;){n&&=(r++,!1);let p=yield V(e.processParamsMaybeAddMcpUsage(a)),m=yield V(e.generateContentStreamInternal(p)),h=[],g=[];try{for(var u=!0,d=(s=void 0,U(m)),f;f=yield V(d.next()),o=f.done,!o;u=!0){l=f.value,u=!1;let e=l;if(yield yield V(e),e.candidates&&e.candidates[0]?.content){g.push(e.candidates[0].content);for(let n of e.candidates[0].content.parts??[])if(r<t&&n.functionCall){if(!n.functionCall.name)throw Error(`Function call name was not returned by the model.`);if(i.has(n.functionCall.name)){let e=yield V(i.get(n.functionCall.name).callTool([n.functionCall]));h.push(...e)}else throw Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${i.keys()}, mising tool: ${n.functionCall.name}`)}}}}catch(e){s={error:e}}finally{try{!u&&!o&&(c=d.return)&&(yield V(c.call(d)))}finally{if(s)throw s.error}}if(h.length>0){n=!0;let e=new At;e.candidates=[{content:{role:`user`,parts:h}}],yield yield V(e);let t=[];t.push(...g),t.push({role:`user`,parts:h}),a.contents=L(a.contents).concat(t)}else break}})})(this,i,e)}async generateContentInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ro(this.apiClient,e);return n=M(`{model}:generateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ao(e),n=new At;return Object.assign(n,t),n})}else{let i=no(this.apiClient,e);return n=M(`{model}:generateContent`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=io(e),n=new At;return Object.assign(n,t),n})}}async generateContentStreamInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ro(this.apiClient,e);return n=M(`{model}:streamGenerateContent?alt=sse`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.requestStream({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}),t.then(function(t){return H(this,arguments,function*(){var n,r,i,a;try{for(var o=!0,s=U(t),c;c=yield V(s.next()),n=c.done,!n;o=!0){a=c.value,o=!1;let t=a,n=ao(yield V(t.json()),e);n.sdkHttpResponse={headers:t.headers};let r=new At;Object.assign(r,n),yield yield V(r)}}catch(e){r={error:e}}finally{try{!o&&!n&&(i=s.return)&&(yield V(i.call(s)))}finally{if(r)throw r.error}}})})}else{let i=no(this.apiClient,e);return n=M(`{model}:streamGenerateContent?alt=sse`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.requestStream({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}),t.then(function(t){return H(this,arguments,function*(){var n,r,i,a;try{for(var o=!0,s=U(t),c;c=yield V(s.next()),n=c.done,!n;o=!0){a=c.value,o=!1;let t=a,n=io(yield V(t.json()),e);n.sdkHttpResponse={headers:t.headers};let r=new At;Object.assign(r,n),yield yield V(r)}}catch(e){r={error:e}}finally{try{!o&&!n&&(i=s.return)&&(yield V(i.call(s)))}finally{if(r)throw r.error}}})})}}async embedContentInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ka(this.apiClient,e,e);return n=M(zn(e.model)?`{model}:embedContent`:`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(t=>{let n=Ja(t,e),r=new jt;return Object.assign(r,n),r})}else{let i=Ga(this.apiClient,e);return n=M(`{model}:batchEmbedContents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=qa(e),n=new jt;return Object.assign(n,t),n})}}async generateImagesInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=lo(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=fo(e),n=new Mt;return Object.assign(n,t),n})}else{let i=co(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=uo(e),n=new Mt;return Object.assign(n,t),n})}}async editImageInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Va(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ha(e),n=new Nt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async upscaleImageInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=ws(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ts(e),n=new Pt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async recontextImage(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Qo(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=$o(e),n=new Ft;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async segmentImage(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=cs(this.apiClient,e);return n=M(`{model}:predict`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=ls(e),n=new It;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ao(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Ko(e))}else{let i=ko(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Go(e))}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Vo(this.apiClient,e);return n=M(`{models_url}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Uo(e),n=new Lt;return Object.assign(n,t),n})}else{let i=Bo(this.apiClient,e);return n=M(`{models_url}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ho(e),n=new Lt;return Object.assign(n,t),n})}}async update(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ss(this.apiClient,e);return n=M(`{model}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Ko(e))}else{let i=xs(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`PATCH`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>Go(e))}}async delete(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=La(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=za(e),n=new Rt;return Object.assign(n,t),n})}else{let i=Ia(this.apiClient,e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ra(e),n=new Rt;return Object.assign(n,t),n})}}async countTokens(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Na(this.apiClient,e);return n=M(`{model}:countTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Fa(e),n=new zt;return Object.assign(n,t),n})}else{let i=Ma(this.apiClient,e);return n=M(`{model}:countTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Pa(e),n=new zt;return Object.assign(n,t),n})}}async computeTokens(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Ca(this.apiClient,e);return n=M(`{model}:computeTokens`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=wa(e),n=new Bt;return Object.assign(n,t),n})}else throw Error(`This method is only supported by the Vertex AI.`)}async generateVideosInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=vo(this.apiClient,e);return n=M(`{model}:predictLongRunning`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=go(e),n=new Vt;return Object.assign(n,t),n})}else{let i=_o(this.apiClient,e);return n=M(`{model}:predictLongRunning`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=ho(e),n=new Vt;return Object.assign(n,t),n})}}},Nc=class extends j{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){let t=e.operation,n=e.config;if(t.name===void 0||t.name===``)throw Error(`Operation name is required.`);if(this.apiClient.isVertexAI()){let e=t.name.split(`/operations/`)[0],r;n&&`httpOptions`in n&&(r=n.httpOptions);let i=await this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:e,config:{httpOptions:r}});return t._fromAPIResponse({apiResponse:i,_isVertexAI:!0})}else{let e=await this.getVideosOperationInternal({operationName:t.name,config:n});return t._fromAPIResponse({apiResponse:e,_isVertexAI:!1})}}async get(e){let t=e.operation,n=e.config;if(t.name===void 0||t.name===``)throw Error(`Operation name is required.`);if(this.apiClient.isVertexAI()){let e=t.name.split(`/operations/`)[0],r;n&&`httpOptions`in n&&(r=n.httpOptions);let i=await this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:e,config:{httpOptions:r}});return t._fromAPIResponse({apiResponse:i,_isVertexAI:!0})}else{let e=await this.getVideosOperationInternal({operationName:t.name,config:n});return t._fromAPIResponse({apiResponse:e,_isVertexAI:!1})}}async getVideosOperationInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=de(e);return n=M(`{operationName}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}else{let i=ue(e);return n=M(`{operationName}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}}async fetchPredictVideosOperationInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=re(e);return n=M(`{resourceName}:fetchPredictOperation`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t}else throw Error(`This method is only supported by the Vertex AI.`)}};function Pc(e){let t={};if(P(e,[`languageCodes`])!==void 0)throw Error(`languageCodes parameter is not supported in Gemini API.`);return t}function Fc(e){let t={},n=P(e,[`apiKey`]);if(n!=null&&N(t,[`apiKey`],n),P(e,[`apiKeyConfig`])!==void 0)throw Error(`apiKeyConfig parameter is not supported in Gemini API.`);if(P(e,[`authType`])!==void 0)throw Error(`authType parameter is not supported in Gemini API.`);if(P(e,[`googleServiceAccountConfig`])!==void 0)throw Error(`googleServiceAccountConfig parameter is not supported in Gemini API.`);if(P(e,[`httpBasicAuthConfig`])!==void 0)throw Error(`httpBasicAuthConfig parameter is not supported in Gemini API.`);if(P(e,[`oauthConfig`])!==void 0)throw Error(`oauthConfig parameter is not supported in Gemini API.`);if(P(e,[`oidcConfig`])!==void 0)throw Error(`oidcConfig parameter is not supported in Gemini API.`);return t}function Ic(e){let t={},n=P(e,[`data`]);if(n!=null&&N(t,[`data`],n),P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Lc(e){let t={},n=P(e,[`parts`]);if(n!=null){let e=n;Array.isArray(e)&&(e=e.map(e=>Kc(e))),N(t,[`parts`],e)}let r=P(e,[`role`]);return r!=null&&N(t,[`role`],r),t}function Rc(e,t,n){let r={},i=P(t,[`expireTime`]);n!==void 0&&i!=null&&N(n,[`expireTime`],i);let a=P(t,[`newSessionExpireTime`]);n!==void 0&&a!=null&&N(n,[`newSessionExpireTime`],a);let o=P(t,[`uses`]);n!==void 0&&o!=null&&N(n,[`uses`],o);let s=P(t,[`liveConnectConstraints`]);n!==void 0&&s!=null&&N(n,[`bidiGenerateContentSetup`],Gc(e,s));let c=P(t,[`lockAdditionalFields`]);return n!==void 0&&c!=null&&N(n,[`fieldMask`],c),r}function zc(e,t){let n={},r=P(t,[`config`]);return r!=null&&N(n,[`config`],Rc(e,r,n)),n}function Bc(e){let t={};if(P(e,[`displayName`])!==void 0)throw Error(`displayName parameter is not supported in Gemini API.`);let n=P(e,[`fileUri`]);n!=null&&N(t,[`fileUri`],n);let r=P(e,[`mimeType`]);return r!=null&&N(t,[`mimeType`],r),t}function Vc(e){let t={},n=P(e,[`id`]);n!=null&&N(t,[`id`],n);let r=P(e,[`args`]);r!=null&&N(t,[`args`],r);let i=P(e,[`name`]);if(i!=null&&N(t,[`name`],i),P(e,[`partialArgs`])!==void 0)throw Error(`partialArgs parameter is not supported in Gemini API.`);if(P(e,[`willContinue`])!==void 0)throw Error(`willContinue parameter is not supported in Gemini API.`);return t}function Hc(e){let t={},n=P(e,[`authConfig`]);n!=null&&N(t,[`authConfig`],Fc(n));let r=P(e,[`enableWidget`]);return r!=null&&N(t,[`enableWidget`],r),t}function Uc(e){let t={},n=P(e,[`searchTypes`]);if(n!=null&&N(t,[`searchTypes`],n),P(e,[`blockingConfidence`])!==void 0)throw Error(`blockingConfidence parameter is not supported in Gemini API.`);if(P(e,[`excludeDomains`])!==void 0)throw Error(`excludeDomains parameter is not supported in Gemini API.`);let r=P(e,[`timeRangeFilter`]);return r!=null&&N(t,[`timeRangeFilter`],r),t}function Wc(e,t){let n={},r=P(e,[`generationConfig`]);t!==void 0&&r!=null&&N(t,[`setup`,`generationConfig`],r);let i=P(e,[`responseModalities`]);t!==void 0&&i!=null&&N(t,[`setup`,`generationConfig`,`responseModalities`],i);let a=P(e,[`temperature`]);t!==void 0&&a!=null&&N(t,[`setup`,`generationConfig`,`temperature`],a);let o=P(e,[`topP`]);t!==void 0&&o!=null&&N(t,[`setup`,`generationConfig`,`topP`],o);let s=P(e,[`topK`]);t!==void 0&&s!=null&&N(t,[`setup`,`generationConfig`,`topK`],s);let c=P(e,[`maxOutputTokens`]);t!==void 0&&c!=null&&N(t,[`setup`,`generationConfig`,`maxOutputTokens`],c);let l=P(e,[`mediaResolution`]);t!==void 0&&l!=null&&N(t,[`setup`,`generationConfig`,`mediaResolution`],l);let u=P(e,[`seed`]);t!==void 0&&u!=null&&N(t,[`setup`,`generationConfig`,`seed`],u);let d=P(e,[`speechConfig`]);t!==void 0&&d!=null&&N(t,[`setup`,`generationConfig`,`speechConfig`],bn(d));let f=P(e,[`thinkingConfig`]);t!==void 0&&f!=null&&N(t,[`setup`,`generationConfig`,`thinkingConfig`],f);let p=P(e,[`enableAffectiveDialog`]);t!==void 0&&p!=null&&N(t,[`setup`,`generationConfig`,`enableAffectiveDialog`],p);let m=P(e,[`systemInstruction`]);t!==void 0&&m!=null&&N(t,[`setup`,`systemInstruction`],Lc(I(m)));let h=P(e,[`tools`]);if(t!==void 0&&h!=null){let e=Sn(h);Array.isArray(e)&&(e=e.map(e=>Jc(xn(e)))),N(t,[`setup`,`tools`],e)}let g=P(e,[`sessionResumption`]);t!==void 0&&g!=null&&N(t,[`setup`,`sessionResumption`],qc(g));let _=P(e,[`inputAudioTranscription`]);t!==void 0&&_!=null&&N(t,[`setup`,`inputAudioTranscription`],Pc(_));let v=P(e,[`outputAudioTranscription`]);t!==void 0&&v!=null&&N(t,[`setup`,`outputAudioTranscription`],Pc(v));let y=P(e,[`realtimeInputConfig`]);t!==void 0&&y!=null&&N(t,[`setup`,`realtimeInputConfig`],y);let b=P(e,[`contextWindowCompression`]);t!==void 0&&b!=null&&N(t,[`setup`,`contextWindowCompression`],b);let x=P(e,[`proactivity`]);if(t!==void 0&&x!=null&&N(t,[`setup`,`proactivity`],x),P(e,[`explicitVadSignal`])!==void 0)throw Error(`explicitVadSignal parameter is not supported in Gemini API.`);return n}function Gc(e,t){let n={},r=P(t,[`model`]);r!=null&&N(n,[`setup`,`model`],F(e,r));let i=P(t,[`config`]);return i!=null&&N(n,[`config`],Wc(i,n)),n}function Kc(e){let t={},n=P(e,[`mediaResolution`]);n!=null&&N(t,[`mediaResolution`],n);let r=P(e,[`codeExecutionResult`]);r!=null&&N(t,[`codeExecutionResult`],r);let i=P(e,[`executableCode`]);i!=null&&N(t,[`executableCode`],i);let a=P(e,[`fileData`]);a!=null&&N(t,[`fileData`],Bc(a));let o=P(e,[`functionCall`]);o!=null&&N(t,[`functionCall`],Vc(o));let s=P(e,[`functionResponse`]);s!=null&&N(t,[`functionResponse`],s);let c=P(e,[`inlineData`]);c!=null&&N(t,[`inlineData`],Ic(c));let l=P(e,[`text`]);l!=null&&N(t,[`text`],l);let u=P(e,[`thought`]);u!=null&&N(t,[`thought`],u);let d=P(e,[`thoughtSignature`]);d!=null&&N(t,[`thoughtSignature`],d);let f=P(e,[`videoMetadata`]);f!=null&&N(t,[`videoMetadata`],f);let p=P(e,[`toolCall`]);p!=null&&N(t,[`toolCall`],p);let m=P(e,[`toolResponse`]);m!=null&&N(t,[`toolResponse`],m);let h=P(e,[`partMetadata`]);return h!=null&&N(t,[`partMetadata`],h),t}function qc(e){let t={},n=P(e,[`handle`]);if(n!=null&&N(t,[`handle`],n),P(e,[`transparent`])!==void 0)throw Error(`transparent parameter is not supported in Gemini API.`);return t}function Jc(e){let t={};if(P(e,[`retrieval`])!==void 0)throw Error(`retrieval parameter is not supported in Gemini API.`);let n=P(e,[`computerUse`]);n!=null&&N(t,[`computerUse`],n);let r=P(e,[`fileSearch`]);r!=null&&N(t,[`fileSearch`],r);let i=P(e,[`googleSearch`]);i!=null&&N(t,[`googleSearch`],Uc(i));let a=P(e,[`googleMaps`]);a!=null&&N(t,[`googleMaps`],Hc(a));let o=P(e,[`codeExecution`]);if(o!=null&&N(t,[`codeExecution`],o),P(e,[`enterpriseWebSearch`])!==void 0)throw Error(`enterpriseWebSearch parameter is not supported in Gemini API.`);let s=P(e,[`functionDeclarations`]);if(s!=null){let e=s;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`functionDeclarations`],e)}let c=P(e,[`googleSearchRetrieval`]);if(c!=null&&N(t,[`googleSearchRetrieval`],c),P(e,[`parallelAiSearch`])!==void 0)throw Error(`parallelAiSearch parameter is not supported in Gemini API.`);let l=P(e,[`urlContext`]);l!=null&&N(t,[`urlContext`],l);let u=P(e,[`mcpServers`]);if(u!=null){let e=u;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`mcpServers`],e)}return t}function Yc(e){let t=[];for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)){let r=e[n];if(typeof r==`object`&&r&&Object.keys(r).length>0){let e=Object.keys(r).map(e=>`${n}.${e}`);t.push(...e)}else t.push(n)}return t.join(`,`)}function Xc(e,t){let n=null,r=e.bidiGenerateContentSetup;if(typeof r==`object`&&r&&`setup`in r){let t=r.setup;typeof t==`object`&&t?(e.bidiGenerateContentSetup=t,n=t):delete e.bidiGenerateContentSetup}else r!==void 0&&delete e.bidiGenerateContentSetup;let i=e.fieldMask;if(n){let r=Yc(n);if(Array.isArray(t?.lockAdditionalFields)&&t?.lockAdditionalFields.length===0)r?e.fieldMask=r:delete e.fieldMask;else if(t?.lockAdditionalFields&&t.lockAdditionalFields.length>0&&i!==null&&Array.isArray(i)&&i.length>0){let t=[`temperature`,`topK`,`topP`,`maxOutputTokens`,`responseModalities`,`seed`,`speechConfig`],n=[];i.length>0&&(n=i.map(e=>t.includes(e)?`generationConfig.${e}`:e));let a=[];r&&a.push(r),n.length>0&&a.push(...n),a.length>0?e.fieldMask=a.join(`,`):delete e.fieldMask}else delete e.fieldMask}else i!==null&&Array.isArray(i)&&i.length>0?e.fieldMask=i.join(`,`):delete e.fieldMask;return e}var Zc=class extends j{constructor(e){super(),this.apiClient=e}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`The client.tokens.create method is only supported by the Gemini Developer API.`);{let i=zc(this.apiClient,e);n=M(`auth_tokens`,i._url),r=i._query,delete i.config,delete i._url,delete i._query;let a=Xc(i,e.config);return t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(a),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}};function Qc(e,t){let n={},r=P(e,[`force`]);return t!==void 0&&r!=null&&N(t,[`_query`,`force`],r),n}function $c(e){let t={},n=P(e,[`name`]);n!=null&&N(t,[`_url`,`name`],n);let r=P(e,[`config`]);return r!=null&&Qc(r,t),t}function el(e){let t={},n=P(e,[`name`]);return n!=null&&N(t,[`_url`,`name`],n),t}function tl(e,t){let n={},r=P(e,[`pageSize`]);t!==void 0&&r!=null&&N(t,[`_query`,`pageSize`],r);let i=P(e,[`pageToken`]);return t!==void 0&&i!=null&&N(t,[`_query`,`pageToken`],i),n}function nl(e){let t={},n=P(e,[`parent`]);n!=null&&N(t,[`_url`,`parent`],n);let r=P(e,[`config`]);return r!=null&&tl(r,t),t}function rl(e){let t={},n=P(e,[`sdkHttpResponse`]);n!=null&&N(t,[`sdkHttpResponse`],n);let r=P(e,[`nextPageToken`]);r!=null&&N(t,[`nextPageToken`],r);let i=P(e,[`documents`]);if(i!=null){let e=i;Array.isArray(e)&&(e=e.map(e=>e)),N(t,[`documents`],e)}return t}var il=class extends j{constructor(e){super(),this.apiClient=e,this.list=async e=>new Ir(B.PAGED_ITEM_DOCUMENTS,t=>this.listInternal({parent:e.parent,config:t.config}),await this.listInternal(e),e)}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=el(e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t=``,n={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let r=$c(e);t=M(`{name}`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=nl(e);return n=M(`{parent}/documents`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=rl(e),n=new Kt;return Object.assign(n,t),n})}}},al=class extends j{constructor(e,t=new il(e)){super(),this.apiClient=e,this.documents=t,this.list=async(e={})=>new Ir(B.PAGED_ITEM_FILE_SEARCH_STORES,e=>this.listInternal(e),await this.listInternal(e),e)}async uploadToFileSearchStore(e){if(this.apiClient.isVertexAI())throw Error(`Vertex AI does not support uploading files to a file search store.`);return this.apiClient.uploadFileToFileSearchStore(e.fileSearchStoreName,e.file,e.config)}async create(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Fs(e);return n=M(`fileSearchStores`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async get(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Rs(e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>e)}}async delete(e){let t=``,n={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let r=Ls(e);t=M(`{name}`,r._url),n=r._query,delete r._url,delete r._query,await this.apiClient.request({path:t,queryParams:n,body:JSON.stringify(r),httpMethod:`DELETE`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal})}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Ws(e);return n=M(`fileSearchStores`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Gs(e),n=new qt;return Object.assign(n,t),n})}}async uploadToFileSearchStoreInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=qs(e);return n=M(`upload/v1beta/{file_search_store_name}:uploadToFileSearchStore`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Js(e),n=new Jt;return Object.assign(n,t),n})}}async importFile(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Vs(e);return n=M(`{file_search_store_name}:importFile`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json()),t.then(e=>{let t=Bs(e),n=new Yt;return Object.assign(n,t),n})}}},ol=function(){let{crypto:e}=globalThis;if(e?.randomUUID)return ol=e.randomUUID.bind(e),e.randomUUID();let t=new Uint8Array(1),n=e?()=>e.getRandomValues(t)[0]:()=>Math.random()*255&255;return`10000000-1000-4000-8000-100000000000`.replace(/[018]/g,e=>(e^n()&15>>e/4).toString(16))},sl=()=>ol();function cl(e){return typeof e==`object`&&!!e&&(`name`in e&&e.name===`AbortError`||`message`in e&&String(e.message).includes(`FetchRequestCanceledException`))}var ll=e=>{if(e instanceof Error)return e;if(typeof e==`object`&&e){try{if(Object.prototype.toString.call(e)===`[object Error]`){let t=Error(e.message,e.cause?{cause:e.cause}:{});return e.stack&&(t.stack=e.stack),e.cause&&!t.cause&&(t.cause=e.cause),e.name&&(t.name=e.name),t}}catch{}try{return Error(JSON.stringify(e))}catch{}}return Error(e)},G=class extends Error{},K=class e extends G{constructor(t,n,r,i){super(`${e.makeMessage(t,n,r)}`),this.status=t,this.headers=i,this.error=n}static makeMessage(e,t,n){let r=t?.message?typeof t.message==`string`?t.message:JSON.stringify(t.message):t?JSON.stringify(t):n;return e&&r?`${e} ${r}`:e?`${e} status code (no body)`:r||`(no status code or body)`}static generate(t,n,r,i){if(!t||!i)return new dl({message:r,cause:ll(n)});let a=n;return t===400?new pl(t,a,r,i):t===401?new ml(t,a,r,i):t===403?new hl(t,a,r,i):t===404?new gl(t,a,r,i):t===409?new _l(t,a,r,i):t===422?new vl(t,a,r,i):t===429?new yl(t,a,r,i):t>=500?new bl(t,a,r,i):new e(t,a,r,i)}},ul=class extends K{constructor({message:e}={}){super(void 0,void 0,e||`Request was aborted.`,void 0)}},dl=class extends K{constructor({message:e,cause:t}){super(void 0,void 0,e||`Connection error.`,void 0),t&&(this.cause=t)}},fl=class extends dl{constructor({message:e}={}){super({message:e??`Request timed out.`})}},pl=class extends K{},ml=class extends K{},hl=class extends K{},gl=class extends K{},_l=class extends K{},vl=class extends K{},yl=class extends K{},bl=class extends K{},xl=/^[a-z][a-z0-9+.-]*:/i,Sl=e=>xl.test(e),Cl=e=>(Cl=Array.isArray,Cl(e)),wl=Cl;function Tl(e){if(!e)return!0;for(let t in e)return!1;return!0}function El(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Dl=(e,t)=>{if(typeof t!=`number`||!Number.isInteger(t))throw new G(`${e} must be an integer`);if(t<0)throw new G(`${e} must be a positive integer`);return t},Ol=e=>{try{return JSON.parse(e)}catch{return}},kl=e=>new Promise(t=>setTimeout(t,e));function Al(){if(typeof fetch<`u`)return fetch;throw Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")}function jl(...e){let t=globalThis.ReadableStream;if(t===void 0)throw Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");return new t(...e)}function Ml(e){let t=Symbol.asyncIterator in e?e[Symbol.asyncIterator]():e[Symbol.iterator]();return jl({start(){},async pull(e){let{done:n,value:r}=await t.next();n?e.close():e.enqueue(r)},async cancel(){await t.return?.call(t)}})}function Nl(e){if(e[Symbol.asyncIterator])return e;let t=e.getReader();return{async next(){try{let e=await t.read();return e?.done&&t.releaseLock(),e}catch(e){throw t.releaseLock(),e}},async return(){let e=t.cancel();return t.releaseLock(),await e,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}async function Pl(e){var t;if(typeof e!=`object`||!e)return;if(e[Symbol.asyncIterator]){await(t=e[Symbol.asyncIterator]()).return?.call(t);return}let n=e.getReader(),r=n.cancel();n.releaseLock(),await r}var Fl=({headers:e,body:t})=>({bodyHeaders:{"content-type":`application/json`},body:JSON.stringify(t)});function Il(e){return Object.entries(e).filter(([e,t])=>t!==void 0).map(([e,t])=>{if(typeof t==`string`||typeof t==`number`||typeof t==`boolean`)return`${encodeURIComponent(e)}=${encodeURIComponent(t)}`;if(t===null)return`${encodeURIComponent(e)}=`;throw new G(`Cannot stringify type ${typeof t}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)}).join(`&`)}var Ll=`0.0.1`,Rl=()=>{if(typeof File>`u`){let{process:e}=globalThis,t=typeof e?.versions?.node==`string`&&parseInt(e.versions.node.split(`.`))<20;throw Error("`File` is not defined as a global, which is required for file uploads."+(t?" Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`.":``))}};function zl(e,t,n){return Rl(),new File(e,t??`unknown_file`,n)}function Bl(e){return(typeof e==`object`&&!!e&&(`name`in e&&e.name&&String(e.name)||`url`in e&&e.url&&String(e.url)||`filename`in e&&e.filename&&String(e.filename)||`path`in e&&e.path&&String(e.path))||``).split(/[\\/]/).pop()||void 0}var Vl=e=>typeof e==`object`&&!!e&&typeof e[Symbol.asyncIterator]==`function`,Hl=e=>typeof e==`object`&&!!e&&typeof e.size==`number`&&typeof e.type==`string`&&typeof e.text==`function`&&typeof e.slice==`function`&&typeof e.arrayBuffer==`function`,Ul=e=>typeof e==`object`&&!!e&&typeof e.name==`string`&&typeof e.lastModified==`number`&&Hl(e),Wl=e=>typeof e==`object`&&!!e&&typeof e.url==`string`&&typeof e.blob==`function`;async function Gl(e,t,n){if(Rl(),e=await e,Ul(e))return e instanceof File?e:zl([await e.arrayBuffer()],e.name);if(Wl(e)){let r=await e.blob();return t||=new URL(e.url).pathname.split(/[\\/]/).pop(),zl(await Kl(r),t,n)}let r=await Kl(e);if(t||=Bl(e),!n?.type){let e=r.find(e=>typeof e==`object`&&`type`in e&&e.type);typeof e==`string`&&(n=Object.assign(Object.assign({},n),{type:e}))}return zl(r,t,n)}async function Kl(e){var t,n,r,i;let a=[];if(typeof e==`string`||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)a.push(e);else if(Hl(e))a.push(e instanceof Blob?e:await e.arrayBuffer());else if(Vl(e))try{for(var o=!0,s=U(e),c;c=await s.next(),t=c.done,!t;o=!0){i=c.value,o=!1;let e=i;a.push(...await Kl(e))}}catch(e){n={error:e}}finally{try{!o&&!t&&(r=s.return)&&await r.call(s)}finally{if(n)throw n.error}}else{let t=e?.constructor?.name;throw Error(`Unexpected data type: ${typeof e}${t?`; constructor: ${t}`:``}${ql(e)}`)}return a}function ql(e){return typeof e!=`object`||!e?``:`; props: [${Object.getOwnPropertyNames(e).map(e=>`"${e}"`).join(`, `)}]`}var Jl=class{constructor(e){this._client=e}};Jl._key=[];function Yl(e){return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g,encodeURIComponent)}var Xl=Object.freeze(Object.create(null)),Zl=((e=Yl)=>(function(t,...n){if(t.length===1)return t[0];let r=!1,i=[],a=t.reduce((t,a,o)=>{/[?#]/.test(a)&&(r=!0);let s=n[o],c=(r?encodeURIComponent:e)(``+s);return o!==n.length&&(s==null||typeof s==`object`&&s.toString===Object.getPrototypeOf(Object.getPrototypeOf(s.hasOwnProperty??Xl)??Xl)?.toString)&&(c=s+``,i.push({start:t.length+a.length,length:c.length,error:`Value of type ${Object.prototype.toString.call(s).slice(8,-1)} is not a valid path parameter`})),t+a+(o===n.length?``:c)},``),o=a.split(/[?#]/,1)[0],s=/(^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,c;for(;(c=s.exec(o))!==null;){let e=c[0].startsWith(`/`),t=e?1:0,n=e?c[0].slice(1):c[0];i.push({start:c.index+t,length:n.length,error:`Value "${n}" can\'t be safely passed as a path parameter`})}if(i.sort((e,t)=>e.start-t.start),i.length>0){let e=0,t=i.reduce((t,n)=>{let r=` `.repeat(n.start-e),i=`^`.repeat(n.length);return e=n.start+n.length,t+r+i},``);throw new G(`Path parameters result in path with invalid segments:\n${i.map(e=>e.error).join(`
`)}\n${a}\n${t}`)}return a}))(Yl),Ql=class extends Jl{create(e,t){let{api_version:n=this._client.apiVersion}=e,r=xi(e,[`api_version`]);if(`model`in r&&`agent_config`in r)throw new G("Invalid request: specified `model` and `agent_config`. If specifying `model`, use `generation_config`.");if(`agent`in r&&`generation_config`in r)throw new G("Invalid request: specified `agent` and `generation_config`. If specifying `agent`, use `agent_config`.");return this._client.post(Zl`/${n}/interactions`,Object.assign(Object.assign({body:r},t),{stream:e.stream??!1}))}delete(e,t={},n){let{api_version:r=this._client.apiVersion}=t??{};return this._client.delete(Zl`/${r}/interactions/${e}`,n)}cancel(e,t={},n){let{api_version:r=this._client.apiVersion}=t??{};return this._client.post(Zl`/${r}/interactions/${e}/cancel`,n)}get(e,t={},n){let r=t??{},{api_version:i=this._client.apiVersion}=r,a=xi(r,[`api_version`]);return this._client.get(Zl`/${i}/interactions/${e}`,Object.assign(Object.assign({query:a},n),{stream:t?.stream??!1}))}};Ql._key=Object.freeze([`interactions`]);var $l=class extends Ql{};function eu(e){let t=0;for(let n of e)t+=n.length;let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n}var tu;function nu(e){let t;return(tu??=(t=new globalThis.TextEncoder,t.encode.bind(t)))(e)}var ru;function iu(e){let t;return(ru??=(t=new globalThis.TextDecoder,t.decode.bind(t)))(e)}var au=class{constructor(){this.buffer=new Uint8Array,this.carriageReturnIndex=null,this.searchIndex=0}decode(e){if(e==null)return[];let t=e instanceof ArrayBuffer?new Uint8Array(e):typeof e==`string`?nu(e):e;this.buffer=eu([this.buffer,t]);let n=[],r;for(;(r=ou(this.buffer,this.carriageReturnIndex??this.searchIndex))!=null;){if(r.carriage&&this.carriageReturnIndex==null){this.carriageReturnIndex=r.index;continue}if(this.carriageReturnIndex!=null&&(r.index!==this.carriageReturnIndex+1||r.carriage)){n.push(iu(this.buffer.subarray(0,this.carriageReturnIndex-1))),this.buffer=this.buffer.subarray(this.carriageReturnIndex),this.carriageReturnIndex=null,this.searchIndex=0;continue}let e=this.carriageReturnIndex===null?r.preceding:r.preceding-1,t=iu(this.buffer.subarray(0,e));n.push(t),this.buffer=this.buffer.subarray(r.index),this.carriageReturnIndex=null,this.searchIndex=0}return this.searchIndex=Math.max(0,this.buffer.length-1),n}flush(){return this.buffer.length?this.decode(`
`):[]}};au.NEWLINE_CHARS=new Set([`
`,`\r`]),au.NEWLINE_REGEXP=/\r\n|[\n\r]/g;function ou(e,t){let n=t??0,r=e.indexOf(10,n),i=e.indexOf(13,n);if(r===-1&&i===-1)return null;let a;return a=r!==-1&&i!==-1?Math.min(r,i):r===-1?i:r,e[a]===10?{preceding:a,index:a+1,carriage:!1}:{preceding:a,index:a+1,carriage:!0}}var su={off:0,error:200,warn:300,info:400,debug:500},cu=(e,t,n)=>{if(e){if(El(su,e))return e;q(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(su))}`)}};function lu(){}function uu(e,t,n){return!t||su[e]>su[n]?lu:t[e].bind(t)}var du={error:lu,warn:lu,info:lu,debug:lu},fu=new WeakMap;function q(e){let t=e.logger,n=e.logLevel??`off`;if(!t)return du;let r=fu.get(t);if(r&&r[0]===n)return r[1];let i={error:uu(`error`,t,n),warn:uu(`warn`,t,n),info:uu(`info`,t,n),debug:uu(`debug`,t,n)};return fu.set(t,[n,i]),i}var J=e=>(e.options&&(e.options=Object.assign({},e.options),delete e.options.headers),e.headers&&=Object.fromEntries((e.headers instanceof Headers?[...e.headers]:Object.entries(e.headers)).map(([e,t])=>[e,e.toLowerCase()===`x-goog-api-key`||e.toLowerCase()===`authorization`||e.toLowerCase()===`cookie`||e.toLowerCase()===`set-cookie`?`***`:t])),`retryOfRequestLogID`in e&&(e.retryOfRequestLogID&&(e.retryOf=e.retryOfRequestLogID),delete e.retryOfRequestLogID),e),pu=class e{constructor(e,t,n){this.iterator=e,this.controller=t,this.client=n}static fromSSEResponse(t,n,r){let i=!1,a=r?q(r):console;function o(){return H(this,arguments,function*(){var e,r,o,s;if(i)throw new G("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let c=!1;try{try{for(var l=!0,u=U(mu(t,n)),d;d=yield V(u.next()),e=d.done,!e;l=!0){s=d.value,l=!1;let e=s;if(!c)if(e.data.startsWith(`[DONE]`)){c=!0;continue}else try{yield yield V(JSON.parse(e.data))}catch(t){throw a.error(`Could not parse message into JSON:`,e.data),a.error(`From chunk:`,e.raw),t}}}catch(e){r={error:e}}finally{try{!l&&!e&&(o=u.return)&&(yield V(o.call(u)))}finally{if(r)throw r.error}}c=!0}catch(e){if(cl(e))return yield V(void 0);throw e}finally{c||n.abort()}})}return new e(o,n,r)}static fromReadableStream(t,n,r){let i=!1;function a(){return H(this,arguments,function*(){var e,n,r,i;let a=new au,o=Nl(t);try{for(var s=!0,c=U(o),l;l=yield V(c.next()),e=l.done,!e;s=!0){i=l.value,s=!1;let e=i;for(let t of a.decode(e))yield yield V(t)}}catch(e){n={error:e}}finally{try{!s&&!e&&(r=c.return)&&(yield V(r.call(c)))}finally{if(n)throw n.error}}for(let e of a.flush())yield yield V(e)})}function o(){return H(this,arguments,function*(){var e,t,r,o;if(i)throw new G("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");i=!0;let s=!1;try{try{for(var c=!0,l=U(a()),u;u=yield V(l.next()),e=u.done,!e;c=!0){o=u.value,c=!1;let e=o;s||e&&(yield yield V(JSON.parse(e)))}}catch(e){t={error:e}}finally{try{!c&&!e&&(r=l.return)&&(yield V(r.call(l)))}finally{if(t)throw t.error}}s=!0}catch(e){if(cl(e))return yield V(void 0);throw e}finally{s||n.abort()}})}return new e(o,n,r)}[Symbol.asyncIterator](){return this.iterator()}tee(){let t=[],n=[],r=this.iterator(),i=e=>({next:()=>{if(e.length===0){let e=r.next();t.push(e),n.push(e)}return e.shift()}});return[new e(()=>i(t),this.controller,this.client),new e(()=>i(n),this.controller,this.client)]}toReadableStream(){let e=this,t;return jl({async start(){t=e[Symbol.asyncIterator]()},async pull(e){try{let{value:n,done:r}=await t.next();if(r)return e.close();let i=nu(JSON.stringify(n)+`
`);e.enqueue(i)}catch(t){e.error(t)}},async cancel(){await t.return?.call(t)}})}};function mu(e,t){return H(this,arguments,function*(){var n,r,i,a;if(!e.body)throw t.abort(),globalThis.navigator!==void 0&&globalThis.navigator.product===`ReactNative`?new G(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`):new G(`Attempted to iterate over a response with no body`);let o=new gu,s=new au,c=Nl(e.body);try{for(var l=!0,u=U(hu(c)),d;d=yield V(u.next()),n=d.done,!n;l=!0){a=d.value,l=!1;let e=a;for(let t of s.decode(e)){let e=o.decode(t);e&&(yield yield V(e))}}}catch(e){r={error:e}}finally{try{!l&&!n&&(i=u.return)&&(yield V(i.call(u)))}finally{if(r)throw r.error}}for(let e of s.flush()){let t=o.decode(e);t&&(yield yield V(t))}})}function hu(e){return H(this,arguments,function*(){var t,n,r,i;try{for(var a=!0,o=U(e),s;s=yield V(o.next()),t=s.done,!t;a=!0){i=s.value,a=!1;let e=i;e!=null&&(yield yield V(e instanceof ArrayBuffer?new Uint8Array(e):typeof e==`string`?nu(e):e))}}catch(e){n={error:e}}finally{try{!a&&!t&&(r=o.return)&&(yield V(r.call(o)))}finally{if(n)throw n.error}}})}var gu=class{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(e){if(e.endsWith(`\r`)&&(e=e.substring(0,e.length-1)),!e){if(!this.event&&!this.data.length)return null;let e={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],e}if(this.chunks.push(e),e.startsWith(`:`))return null;let[t,n,r]=_u(e,`:`);return r.startsWith(` `)&&(r=r.substring(1)),t===`event`?this.event=r:t===`data`&&this.data.push(r),null}};function _u(e,t){let n=e.indexOf(t);return n===-1?[e,``,``]:[e.substring(0,n),t,e.substring(n+t.length)]}async function vu(e,t){let{response:n,requestLogID:r,retryOfRequestLogID:i,startTime:a}=t,o=await(async()=>{if(t.options.stream)return q(e).debug(`response`,n.status,n.url,n.headers,n.body),t.options.__streamClass?t.options.__streamClass.fromSSEResponse(n,t.controller,e):pu.fromSSEResponse(n,t.controller,e);if(n.status===204)return null;if(t.options.__binaryResponse)return n;let r=(n.headers.get(`content-type`)?.split(`;`)[0])?.trim();return r?.includes(`application/json`)||r?.endsWith(`+json`)?n.headers.get(`content-length`)===`0`?void 0:await n.json():await n.text()})();return q(e).debug(`[${r}] response parsed`,J({retryOfRequestLogID:i,url:n.url,status:n.status,body:o,durationMs:Date.now()-a})),o}var yu=class e extends Promise{constructor(e,t,n=vu){super(e=>{e(null)}),this.responsePromise=t,this.parseResponse=n,this.client=e}_thenUnwrap(t){return new e(this.client,this.responsePromise,async(e,n)=>t(await this.parseResponse(e,n),n))}asResponse(){return this.responsePromise.then(e=>e.response)}async withResponse(){let[e,t]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:t}}parse(){return this.parsedPromise||=this.responsePromise.then(e=>this.parseResponse(this.client,e)),this.parsedPromise}then(e,t){return this.parse().then(e,t)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}},bu=Symbol(`brand.privateNullableHeaders`);function*xu(e){if(!e)return;if(bu in e){let{values:t,nulls:n}=e;yield*t.entries();for(let e of n)yield[e,null];return}let t=!1,n;e instanceof Headers?n=e.entries():wl(e)?n=e:(t=!0,n=Object.entries(e??{}));for(let e of n){let n=e[0];if(typeof n!=`string`)throw TypeError(`expected header name to be a string`);let r=wl(e[1])?e[1]:[e[1]],i=!1;for(let e of r)e!==void 0&&(t&&!i&&(i=!0,yield[n,null]),yield[n,e])}}var Su=e=>{let t=new Headers,n=new Set;for(let r of e){let e=new Set;for(let[i,a]of xu(r)){let r=i.toLowerCase();e.has(r)||(t.delete(i),e.add(r)),a===null?(t.delete(i),n.add(r)):(t.append(i,a),n.delete(r))}}return{[bu]:!0,values:t,nulls:n}},Cu=e=>{var t;if(globalThis.process!==void 0)return({}?.[e])?.trim()??void 0;if(globalThis.Deno!==void 0)return(((t=globalThis.Deno.env)?.get)?.call(t,e))?.trim()},wu,Tu=class e{constructor(t){var{baseURL:n=Cu(`GEMINI_NEXT_GEN_API_BASE_URL`),apiKey:r=Cu(`GEMINI_API_KEY`)??null,apiVersion:i=`v1beta`}=t,a=xi(t,[`baseURL`,`apiKey`,`apiVersion`]);let o=Object.assign(Object.assign({apiKey:r,apiVersion:i},a),{baseURL:n||`https://generativelanguage.googleapis.com`});this.baseURL=o.baseURL,this.timeout=o.timeout??e.DEFAULT_TIMEOUT,this.logger=o.logger??console;let s=`warn`;this.logLevel=s,this.logLevel=cu(o.logLevel,`ClientOptions.logLevel`,this)??cu(Cu(`GEMINI_NEXT_GEN_API_LOG`),`process.env['GEMINI_NEXT_GEN_API_LOG']`,this)??s,this.fetchOptions=o.fetchOptions,this.maxRetries=o.maxRetries??2,this.fetch=o.fetch??Al(),this.encoder=Fl,this._options=o,this.apiKey=r,this.apiVersion=i,this.clientAdapter=o.clientAdapter}withOptions(e){return new this.constructor(Object.assign(Object.assign(Object.assign({},this._options),{baseURL:this.baseURL,maxRetries:this.maxRetries,timeout:this.timeout,logger:this.logger,logLevel:this.logLevel,fetch:this.fetch,fetchOptions:this.fetchOptions,apiKey:this.apiKey,apiVersion:this.apiVersion}),e))}baseURLOverridden(){return this.baseURL!==`https://generativelanguage.googleapis.com`}defaultQuery(){return this._options.defaultQuery}validateHeaders({values:e,nulls:t}){if(!(e.has(`authorization`)||e.has(`x-goog-api-key`))&&!(this.apiKey&&e.get(`x-goog-api-key`))&&!t.has(`x-goog-api-key`))throw Error(`Could not resolve authentication method. Expected the apiKey to be set. Or for the "x-goog-api-key" headers to be explicitly omitted`)}async authHeaders(e){let t=Su([e.headers]);if(!(t.values.has(`authorization`)||t.values.has(`x-goog-api-key`))){if(this.apiKey)return Su([{"x-goog-api-key":this.apiKey}]);if(this.clientAdapter.isVertexAI())return Su([await this.clientAdapter.getAuthHeaders()])}}stringifyQuery(e){return Il(e)}getUserAgent(){return`${this.constructor.name}/JS ${Ll}`}defaultIdempotencyKey(){return`stainless-node-retry-${sl()}`}makeStatusError(e,t,n,r){return K.generate(e,t,n,r)}buildURL(e,t,n){let r=!this.baseURLOverridden()&&n||this.baseURL,i=Sl(e)?new URL(e):new URL(r+(r.endsWith(`/`)&&e.startsWith(`/`)?e.slice(1):e)),a=this.defaultQuery(),o=Object.fromEntries(i.searchParams);return(!Tl(a)||!Tl(o))&&(t=Object.assign(Object.assign(Object.assign({},o),a),t)),typeof t==`object`&&t&&!Array.isArray(t)&&(i.search=this.stringifyQuery(t)),i.toString()}async prepareOptions(e){if(this.clientAdapter&&this.clientAdapter.isVertexAI()&&!e.path.startsWith(`/${this.apiVersion}/projects/`)){let t=e.path.slice(this.apiVersion.length+1);e.path=`/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${t}`}}async prepareRequest(e,{url:t,options:n}){}get(e,t){return this.methodRequest(`get`,e,t)}post(e,t){return this.methodRequest(`post`,e,t)}patch(e,t){return this.methodRequest(`patch`,e,t)}put(e,t){return this.methodRequest(`put`,e,t)}delete(e,t){return this.methodRequest(`delete`,e,t)}methodRequest(e,t,n){return this.request(Promise.resolve(n).then(n=>Object.assign({method:e,path:t},n)))}request(e,t=null){return new yu(this,this.makeRequest(e,t,void 0))}async makeRequest(e,t,n){let r=await e,i=r.maxRetries??this.maxRetries;t??=i,await this.prepareOptions(r);let{req:a,url:o,timeout:s}=await this.buildRequest(r,{retryCount:i-t});await this.prepareRequest(a,{url:o,options:r});let c=`log_`+(Math.random()*(1<<24)|0).toString(16).padStart(6,`0`),l=n===void 0?``:`, retryOf: ${n}`,u=Date.now();if(q(this).debug(`[${c}] sending request`,J({retryOfRequestLogID:n,method:r.method,url:o,options:r,headers:a.headers})),r.signal?.aborted)throw new ul;let d=new AbortController,f=await this.fetchWithTimeout(o,a,s,d).catch(ll),p=Date.now();if(f instanceof globalThis.Error){let e=`retrying, ${t} attempts remaining`;if(r.signal?.aborted)throw new ul;let i=cl(f)||/timed? ?out/i.test(String(f)+(`cause`in f?String(f.cause):``));if(t)return q(this).info(`[${c}] connection ${i?`timed out`:`failed`} - ${e}`),q(this).debug(`[${c}] connection ${i?`timed out`:`failed`} (${e})`,J({retryOfRequestLogID:n,url:o,durationMs:p-u,message:f.message})),this.retryRequest(r,t,n??c);throw q(this).info(`[${c}] connection ${i?`timed out`:`failed`} - error; no more retries left`),q(this).debug(`[${c}] connection ${i?`timed out`:`failed`} (error; no more retries left)`,J({retryOfRequestLogID:n,url:o,durationMs:p-u,message:f.message})),i?new fl:new dl({cause:f})}let m=`[${c}${l}] ${a.method} ${o} ${f.ok?`succeeded`:`failed`} with status ${f.status} in ${p-u}ms`;if(!f.ok){let e=await this.shouldRetry(f);if(t&&e){let e=`retrying, ${t} attempts remaining`;return await Pl(f.body),q(this).info(`${m} - ${e}`),q(this).debug(`[${c}] response error (${e})`,J({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,durationMs:p-u})),this.retryRequest(r,t,n??c,f.headers)}let i=e?`error; no more retries left`:`error; not retryable`;q(this).info(`${m} - ${i}`);let a=await f.text().catch(e=>ll(e).message),o=Ol(a),s=o?void 0:a;throw q(this).debug(`[${c}] response error (${i})`,J({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,message:s,durationMs:Date.now()-u})),this.makeStatusError(f.status,o,s,f.headers)}return q(this).info(m),q(this).debug(`[${c}] response start`,J({retryOfRequestLogID:n,url:f.url,status:f.status,headers:f.headers,durationMs:p-u})),{response:f,options:r,controller:d,requestLogID:c,retryOfRequestLogID:n,startTime:u}}async fetchWithTimeout(e,t,n,r){let i=t||{},{signal:a,method:o}=i,s=xi(i,[`signal`,`method`]),c=this._makeAbort(r);a&&a.addEventListener(`abort`,c,{once:!0});let l=setTimeout(c,n),u=globalThis.ReadableStream&&s.body instanceof globalThis.ReadableStream||typeof s.body==`object`&&s.body!==null&&Symbol.asyncIterator in s.body,d=Object.assign(Object.assign(Object.assign({signal:r.signal},u?{duplex:`half`}:{}),{method:`GET`}),s);o&&(d.method=o.toUpperCase());try{return await this.fetch.call(void 0,e,d)}finally{clearTimeout(l)}}async shouldRetry(e){let t=e.headers.get(`x-should-retry`);return t===`true`?!0:t===`false`?!1:e.status===408||e.status===409||e.status===429||e.status>=500}async retryRequest(e,t,n,r){let i,a=r?.get(`retry-after-ms`);if(a){let e=parseFloat(a);Number.isNaN(e)||(i=e)}let o=r?.get(`retry-after`);if(o&&!i){let e=parseFloat(o);i=Number.isNaN(e)?Date.parse(o)-Date.now():e*1e3}if(i===void 0){let n=e.maxRetries??this.maxRetries;i=this.calculateDefaultRetryTimeoutMillis(t,n)}return await kl(i),this.makeRequest(e,t-1,n)}calculateDefaultRetryTimeoutMillis(e,t){let n=t-e;return Math.min(.5*2**n,8)*(1-Math.random()*.25)*1e3}async buildRequest(e,{retryCount:t=0}={}){let n=Object.assign({},e),{method:r,path:i,query:a,defaultBaseURL:o}=n,s=this.buildURL(i,a,o);`timeout`in n&&Dl(`timeout`,n.timeout),n.timeout=n.timeout??this.timeout;let{bodyHeaders:c,body:l}=this.buildBody({options:n}),u=await this.buildHeaders({options:e,method:r,bodyHeaders:c,retryCount:t});return{req:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({method:r,headers:u},n.signal&&{signal:n.signal}),globalThis.ReadableStream&&l instanceof globalThis.ReadableStream&&{duplex:`half`}),l&&{body:l}),this.fetchOptions??{}),n.fetchOptions??{}),url:s,timeout:n.timeout}}async buildHeaders({options:e,method:t,bodyHeaders:n,retryCount:r}){let i={};this.idempotencyHeader&&t!==`get`&&(e.idempotencyKey||=this.defaultIdempotencyKey(),i[this.idempotencyHeader]=e.idempotencyKey);let a=await this.authHeaders(e),o=Su([i,{Accept:`application/json`,"User-Agent":this.getUserAgent()},this._options.defaultHeaders,n,e.headers,a]);return this.validateHeaders(o),o.values}_makeAbort(e){return()=>e.abort()}buildBody({options:{body:e,headers:t}}){if(!e)return{bodyHeaders:void 0,body:void 0};let n=Su([t]);return ArrayBuffer.isView(e)||e instanceof ArrayBuffer||e instanceof DataView||typeof e==`string`&&n.values.has(`content-type`)||globalThis.Blob&&e instanceof globalThis.Blob||e instanceof FormData||e instanceof URLSearchParams||globalThis.ReadableStream&&e instanceof globalThis.ReadableStream?{bodyHeaders:void 0,body:e}:typeof e==`object`&&(Symbol.asyncIterator in e||Symbol.iterator in e&&`next`in e&&typeof e.next==`function`)?{bodyHeaders:void 0,body:Ml(e)}:typeof e==`object`&&n.values.get(`content-type`)===`application/x-www-form-urlencoded`?{bodyHeaders:{"content-type":`application/x-www-form-urlencoded`},body:this.stringifyQuery(e)}:this.encoder({body:e,headers:n})}};Tu.DEFAULT_TIMEOUT=6e4;var Y=class extends Tu{constructor(){super(...arguments),this.interactions=new $l(this)}};wu=Y,Y.GeminiNextGenAPIClient=wu,Y.GeminiNextGenAPIClientError=G,Y.APIError=K,Y.APIConnectionError=dl,Y.APIConnectionTimeoutError=fl,Y.APIUserAbortError=ul,Y.NotFoundError=gl,Y.ConflictError=_l,Y.RateLimitError=yl,Y.BadRequestError=pl,Y.AuthenticationError=ml,Y.InternalServerError=bl,Y.PermissionDeniedError=hl,Y.UnprocessableEntityError=vl,Y.toFile=Gl,Y.Interactions=$l;function Eu(e,t){let n={},r=P(e,[`name`]);return r!=null&&N(n,[`_url`,`name`],r),n}function Du(e,t){let n={},r=P(e,[`name`]);return r!=null&&N(n,[`_url`,`name`],r),n}function Ou(e,t){let n={},r=P(e,[`sdkHttpResponse`]);return r!=null&&N(n,[`sdkHttpResponse`],r),n}function ku(e,t){let n={},r=P(e,[`sdkHttpResponse`]);return r!=null&&N(n,[`sdkHttpResponse`],r),n}function Au(e,t,n){let r={};if(P(e,[`validationDataset`])!==void 0)throw Error(`validationDataset parameter is not supported in Gemini API.`);let i=P(e,[`tunedModelDisplayName`]);if(t!==void 0&&i!=null&&N(t,[`displayName`],i),P(e,[`description`])!==void 0)throw Error(`description parameter is not supported in Gemini API.`);let a=P(e,[`epochCount`]);t!==void 0&&a!=null&&N(t,[`tuningTask`,`hyperparameters`,`epochCount`],a);let o=P(e,[`learningRateMultiplier`]);if(o!=null&&N(r,[`tuningTask`,`hyperparameters`,`learningRateMultiplier`],o),P(e,[`exportLastCheckpointOnly`])!==void 0)throw Error(`exportLastCheckpointOnly parameter is not supported in Gemini API.`);if(P(e,[`preTunedModelCheckpointId`])!==void 0)throw Error(`preTunedModelCheckpointId parameter is not supported in Gemini API.`);if(P(e,[`adapterSize`])!==void 0)throw Error(`adapterSize parameter is not supported in Gemini API.`);if(P(e,[`tuningMode`])!==void 0)throw Error(`tuningMode parameter is not supported in Gemini API.`);if(P(e,[`customBaseModel`])!==void 0)throw Error(`customBaseModel parameter is not supported in Gemini API.`);let s=P(e,[`batchSize`]);t!==void 0&&s!=null&&N(t,[`tuningTask`,`hyperparameters`,`batchSize`],s);let c=P(e,[`learningRate`]);if(t!==void 0&&c!=null&&N(t,[`tuningTask`,`hyperparameters`,`learningRate`],c),P(e,[`labels`])!==void 0)throw Error(`labels parameter is not supported in Gemini API.`);if(P(e,[`beta`])!==void 0)throw Error(`beta parameter is not supported in Gemini API.`);if(P(e,[`baseTeacherModel`])!==void 0)throw Error(`baseTeacherModel parameter is not supported in Gemini API.`);if(P(e,[`tunedTeacherModelSource`])!==void 0)throw Error(`tunedTeacherModelSource parameter is not supported in Gemini API.`);if(P(e,[`sftLossWeightMultiplier`])!==void 0)throw Error(`sftLossWeightMultiplier parameter is not supported in Gemini API.`);if(P(e,[`outputUri`])!==void 0)throw Error(`outputUri parameter is not supported in Gemini API.`);if(P(e,[`encryptionSpec`])!==void 0)throw Error(`encryptionSpec parameter is not supported in Gemini API.`);return r}function ju(e,t,n){let r={},i=P(n,[`config`,`method`]);if(i===void 0&&(i=`SUPERVISED_FINE_TUNING`),i===`SUPERVISED_FINE_TUNING`){let n=P(e,[`validationDataset`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`],Ju(n))}else if(i===`PREFERENCE_TUNING`){let n=P(e,[`validationDataset`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`],Ju(n))}else if(i===`DISTILLATION`){let n=P(e,[`validationDataset`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`],Ju(n))}let a=P(e,[`tunedModelDisplayName`]);t!==void 0&&a!=null&&N(t,[`tunedModelDisplayName`],a);let o=P(e,[`description`]);t!==void 0&&o!=null&&N(t,[`description`],o);let s=P(n,[`config`,`method`]);if(s===void 0&&(s=`SUPERVISED_FINE_TUNING`),s===`SUPERVISED_FINE_TUNING`){let n=P(e,[`epochCount`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`hyperParameters`,`epochCount`],n)}else if(s===`PREFERENCE_TUNING`){let n=P(e,[`epochCount`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`hyperParameters`,`epochCount`],n)}else if(s===`DISTILLATION`){let n=P(e,[`epochCount`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`hyperParameters`,`epochCount`],n)}let c=P(n,[`config`,`method`]);if(c===void 0&&(c=`SUPERVISED_FINE_TUNING`),c===`SUPERVISED_FINE_TUNING`){let n=P(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`hyperParameters`,`learningRateMultiplier`],n)}else if(c===`PREFERENCE_TUNING`){let n=P(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`hyperParameters`,`learningRateMultiplier`],n)}else if(c===`DISTILLATION`){let n=P(e,[`learningRateMultiplier`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`hyperParameters`,`learningRateMultiplier`],n)}let l=P(n,[`config`,`method`]);if(l===void 0&&(l=`SUPERVISED_FINE_TUNING`),l===`SUPERVISED_FINE_TUNING`){let n=P(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`exportLastCheckpointOnly`],n)}else if(l===`PREFERENCE_TUNING`){let n=P(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`exportLastCheckpointOnly`],n)}else if(l===`DISTILLATION`){let n=P(e,[`exportLastCheckpointOnly`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`exportLastCheckpointOnly`],n)}let u=P(n,[`config`,`method`]);if(u===void 0&&(u=`SUPERVISED_FINE_TUNING`),u===`SUPERVISED_FINE_TUNING`){let n=P(e,[`adapterSize`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`hyperParameters`,`adapterSize`],n)}else if(u===`PREFERENCE_TUNING`){let n=P(e,[`adapterSize`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`hyperParameters`,`adapterSize`],n)}else if(u===`DISTILLATION`){let n=P(e,[`adapterSize`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`hyperParameters`,`adapterSize`],n)}let d=P(n,[`config`,`method`]);if(d===void 0&&(d=`SUPERVISED_FINE_TUNING`),d===`SUPERVISED_FINE_TUNING`){let n=P(e,[`tuningMode`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`tuningMode`],n)}else if(d===`DISTILLATION`){let n=P(e,[`tuningMode`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`tuningMode`],n)}let f=P(e,[`customBaseModel`]);t!==void 0&&f!=null&&N(t,[`customBaseModel`],f);let p=P(n,[`config`,`method`]);if(p===void 0&&(p=`SUPERVISED_FINE_TUNING`),p===`SUPERVISED_FINE_TUNING`){let n=P(e,[`batchSize`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`hyperParameters`,`batchSize`],n)}else if(p===`DISTILLATION`){let n=P(e,[`batchSize`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`hyperParameters`,`batchSize`],n)}let m=P(n,[`config`,`method`]);if(m===void 0&&(m=`SUPERVISED_FINE_TUNING`),m===`SUPERVISED_FINE_TUNING`){let n=P(e,[`learningRate`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`hyperParameters`,`learningRate`],n)}else if(m===`DISTILLATION`){let n=P(e,[`learningRate`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`hyperParameters`,`learningRate`],n)}let h=P(e,[`labels`]);t!==void 0&&h!=null&&N(t,[`labels`],h);let g=P(e,[`beta`]);t!==void 0&&g!=null&&N(t,[`preferenceOptimizationSpec`,`hyperParameters`,`beta`],g);let _=P(e,[`baseTeacherModel`]);t!==void 0&&_!=null&&N(t,[`distillationSpec`,`baseTeacherModel`],_);let v=P(e,[`tunedTeacherModelSource`]);t!==void 0&&v!=null&&N(t,[`distillationSpec`,`tunedTeacherModelSource`],v);let y=P(e,[`sftLossWeightMultiplier`]);t!==void 0&&y!=null&&N(t,[`distillationSpec`,`hyperParameters`,`sftLossWeightMultiplier`],y);let b=P(e,[`outputUri`]);t!==void 0&&b!=null&&N(t,[`outputUri`],b);let x=P(e,[`encryptionSpec`]);return t!==void 0&&x!=null&&N(t,[`encryptionSpec`],x),r}function Mu(e,t){let n={},r=P(e,[`baseModel`]);r!=null&&N(n,[`baseModel`],r);let i=P(e,[`preTunedModel`]);i!=null&&N(n,[`preTunedModel`],i);let a=P(e,[`trainingDataset`]);a!=null&&Uu(a);let o=P(e,[`config`]);return o!=null&&Au(o,n),n}function Nu(e,t){let n={},r=P(e,[`baseModel`]);r!=null&&N(n,[`baseModel`],r);let i=P(e,[`preTunedModel`]);i!=null&&N(n,[`preTunedModel`],i);let a=P(e,[`trainingDataset`]);a!=null&&Wu(a,n,t);let o=P(e,[`config`]);return o!=null&&ju(o,n,t),n}function Pu(e,t){let n={},r=P(e,[`name`]);return r!=null&&N(n,[`_url`,`name`],r),n}function Fu(e,t){let n={},r=P(e,[`name`]);return r!=null&&N(n,[`_url`,`name`],r),n}function Iu(e,t,n){let r={},i=P(e,[`pageSize`]);t!==void 0&&i!=null&&N(t,[`_query`,`pageSize`],i);let a=P(e,[`pageToken`]);t!==void 0&&a!=null&&N(t,[`_query`,`pageToken`],a);let o=P(e,[`filter`]);return t!==void 0&&o!=null&&N(t,[`_query`,`filter`],o),r}function Lu(e,t,n){let r={},i=P(e,[`pageSize`]);t!==void 0&&i!=null&&N(t,[`_query`,`pageSize`],i);let a=P(e,[`pageToken`]);t!==void 0&&a!=null&&N(t,[`_query`,`pageToken`],a);let o=P(e,[`filter`]);return t!==void 0&&o!=null&&N(t,[`_query`,`filter`],o),r}function Ru(e,t){let n={},r=P(e,[`config`]);return r!=null&&Iu(r,n),n}function zu(e,t){let n={},r=P(e,[`config`]);return r!=null&&Lu(r,n),n}function Bu(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`nextPageToken`]);i!=null&&N(n,[`nextPageToken`],i);let a=P(e,[`tunedModels`]);if(a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>Gu(e))),N(n,[`tuningJobs`],e)}return n}function Vu(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`nextPageToken`]);i!=null&&N(n,[`nextPageToken`],i);let a=P(e,[`tuningJobs`]);if(a!=null){let e=a;Array.isArray(e)&&(e=e.map(e=>Ku(e))),N(n,[`tuningJobs`],e)}return n}function Hu(e,t){let n={},r=P(e,[`name`]);r!=null&&N(n,[`model`],r);let i=P(e,[`name`]);return i!=null&&N(n,[`endpoint`],i),n}function Uu(e,t){let n={};if(P(e,[`gcsUri`])!==void 0)throw Error(`gcsUri parameter is not supported in Gemini API.`);if(P(e,[`vertexDatasetResource`])!==void 0)throw Error(`vertexDatasetResource parameter is not supported in Gemini API.`);let r=P(e,[`examples`]);if(r!=null){let e=r;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`examples`,`examples`],e)}return n}function Wu(e,t,n){let r={},i=P(n,[`config`,`method`]);if(i===void 0&&(i=`SUPERVISED_FINE_TUNING`),i===`SUPERVISED_FINE_TUNING`){let n=P(e,[`gcsUri`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`trainingDatasetUri`],n)}else if(i===`PREFERENCE_TUNING`){let n=P(e,[`gcsUri`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`trainingDatasetUri`],n)}else if(i===`DISTILLATION`){let n=P(e,[`gcsUri`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`promptDatasetUri`],n)}let a=P(n,[`config`,`method`]);if(a===void 0&&(a=`SUPERVISED_FINE_TUNING`),a===`SUPERVISED_FINE_TUNING`){let n=P(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&N(t,[`supervisedTuningSpec`,`trainingDatasetUri`],n)}else if(a===`PREFERENCE_TUNING`){let n=P(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&N(t,[`preferenceOptimizationSpec`,`trainingDatasetUri`],n)}else if(a===`DISTILLATION`){let n=P(e,[`vertexDatasetResource`]);t!==void 0&&n!=null&&N(t,[`distillationSpec`,`promptDatasetUri`],n)}if(P(e,[`examples`])!==void 0)throw Error(`examples parameter is not supported in Vertex AI.`);return r}function Gu(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`name`]);i!=null&&N(n,[`name`],i);let a=P(e,[`state`]);a!=null&&N(n,[`state`],wn(a));let o=P(e,[`createTime`]);o!=null&&N(n,[`createTime`],o);let s=P(e,[`tuningTask`,`startTime`]);s!=null&&N(n,[`startTime`],s);let c=P(e,[`tuningTask`,`completeTime`]);c!=null&&N(n,[`endTime`],c);let l=P(e,[`updateTime`]);l!=null&&N(n,[`updateTime`],l);let u=P(e,[`description`]);u!=null&&N(n,[`description`],u);let d=P(e,[`baseModel`]);d!=null&&N(n,[`baseModel`],d);let f=P(e,[`_self`]);return f!=null&&N(n,[`tunedModel`],Hu(f)),n}function Ku(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`name`]);i!=null&&N(n,[`name`],i);let a=P(e,[`state`]);a!=null&&N(n,[`state`],wn(a));let o=P(e,[`createTime`]);o!=null&&N(n,[`createTime`],o);let s=P(e,[`startTime`]);s!=null&&N(n,[`startTime`],s);let c=P(e,[`endTime`]);c!=null&&N(n,[`endTime`],c);let l=P(e,[`updateTime`]);l!=null&&N(n,[`updateTime`],l);let u=P(e,[`error`]);u!=null&&N(n,[`error`],u);let d=P(e,[`description`]);d!=null&&N(n,[`description`],d);let f=P(e,[`baseModel`]);f!=null&&N(n,[`baseModel`],f);let p=P(e,[`tunedModel`]);p!=null&&N(n,[`tunedModel`],p);let m=P(e,[`preTunedModel`]);m!=null&&N(n,[`preTunedModel`],m);let h=P(e,[`supervisedTuningSpec`]);h!=null&&N(n,[`supervisedTuningSpec`],h);let g=P(e,[`preferenceOptimizationSpec`]);g!=null&&N(n,[`preferenceOptimizationSpec`],g);let _=P(e,[`distillationSpec`]);_!=null&&N(n,[`distillationSpec`],_);let v=P(e,[`tuningDataStats`]);v!=null&&N(n,[`tuningDataStats`],v);let y=P(e,[`encryptionSpec`]);y!=null&&N(n,[`encryptionSpec`],y);let b=P(e,[`partnerModelTuningSpec`]);b!=null&&N(n,[`partnerModelTuningSpec`],b);let x=P(e,[`customBaseModel`]);x!=null&&N(n,[`customBaseModel`],x);let S=P(e,[`evaluateDatasetRuns`]);if(S!=null){let e=S;Array.isArray(e)&&(e=e.map(e=>e)),N(n,[`evaluateDatasetRuns`],e)}let C=P(e,[`experiment`]);C!=null&&N(n,[`experiment`],C);let w=P(e,[`fullFineTuningSpec`]);w!=null&&N(n,[`fullFineTuningSpec`],w);let T=P(e,[`labels`]);T!=null&&N(n,[`labels`],T);let E=P(e,[`outputUri`]);E!=null&&N(n,[`outputUri`],E);let D=P(e,[`pipelineJob`]);D!=null&&N(n,[`pipelineJob`],D);let O=P(e,[`serviceAccount`]);O!=null&&N(n,[`serviceAccount`],O);let k=P(e,[`tunedModelDisplayName`]);k!=null&&N(n,[`tunedModelDisplayName`],k);let A=P(e,[`tuningJobState`]);A!=null&&N(n,[`tuningJobState`],A);let j=P(e,[`veoTuningSpec`]);j!=null&&N(n,[`veoTuningSpec`],j);let M=P(e,[`distillationSamplingSpec`]);M!=null&&N(n,[`distillationSamplingSpec`],M);let ee=P(e,[`tuningJobMetadata`]);return ee!=null&&N(n,[`tuningJobMetadata`],ee),n}function qu(e,t){let n={},r=P(e,[`sdkHttpResponse`]);r!=null&&N(n,[`sdkHttpResponse`],r);let i=P(e,[`name`]);i!=null&&N(n,[`name`],i);let a=P(e,[`metadata`]);a!=null&&N(n,[`metadata`],a);let o=P(e,[`done`]);o!=null&&N(n,[`done`],o);let s=P(e,[`error`]);return s!=null&&N(n,[`error`],s),n}function Ju(e,t){let n={},r=P(e,[`gcsUri`]);r!=null&&N(n,[`validationDatasetUri`],r);let i=P(e,[`vertexDatasetResource`]);return i!=null&&N(n,[`validationDatasetUri`],i),n}var Yu=class extends j{constructor(e){super(),this.apiClient=e,this.list=async(e={})=>new Ir(B.PAGED_ITEM_TUNING_JOBS,e=>this.listInternal(e),await this.listInternal(e),e),this.get=async e=>await this.getInternal(e),this.tune=async e=>{if(this.apiClient.isVertexAI())if(e.baseModel.startsWith(`projects/`)){let t={tunedModelName:e.baseModel};e.config?.preTunedModelCheckpointId&&(t.checkpointId=e.config.preTunedModelCheckpointId);let n=Object.assign(Object.assign({},e),{preTunedModel:t});return n.baseModel=void 0,await this.tuneInternal(n)}else{let t=Object.assign({},e);return await this.tuneInternal(t)}else{let t=Object.assign({},e),n=await this.tuneMldevInternal(t),r=``;return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?r=n.metadata.tunedModel:n.name!==void 0&&n.name.includes(`/operations/`)&&(r=n.name.split(`/operations/`)[0]),{name:r,state:qe.JOB_STATE_QUEUED}}}}async getInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Fu(e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>Ku(e))}else{let i=Pu(e);return n=M(`{name}`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>Gu(e))}}async listInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=zu(e);return n=M(`tuningJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Vu(e),n=new Ht;return Object.assign(n,t),n})}else{let i=Ru(e);return n=M(`tunedModels`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`GET`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Bu(e),n=new Ht;return Object.assign(n,t),n})}}async cancel(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Du(e);return n=M(`{name}:cancel`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=ku(e),n=new Ut;return Object.assign(n,t),n})}else{let i=Eu(e);return n=M(`{name}:cancel`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>{let t=Ou(e),n=new Ut;return Object.assign(n,t),n})}}async tuneInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI()){let i=Nu(e,e);return n=M(`tuningJobs`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>Ku(e))}else throw Error(`This method is only supported by the Vertex AI.`)}async tuneMldevInternal(e){let t,n=``,r={};if(this.apiClient.isVertexAI())throw Error(`This method is only supported by the Gemini Developer API.`);{let i=Mu(e);return n=M(`tunedModels`,i._url),r=i._query,delete i._url,delete i._query,t=this.apiClient.request({path:n,queryParams:r,body:JSON.stringify(i),httpMethod:`POST`,httpOptions:e.config?.httpOptions,abortSignal:e.config?.abortSignal}).then(e=>e.json().then(t=>{let n=t;return n.sdkHttpResponse={headers:e.headers},n})),t.then(e=>qu(e))}}},Xu=class{async download(e,t){throw Error(`Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.`)}},Zu=1024*1024*8,Qu=3,$u=1e3,ed=2,td=`x-goog-upload-status`;async function nd(e,t,n,r){let i=await id(e,t,n,r),a=await i?.json();if(i?.headers?.[td]!==`final`)throw Error(`Failed to upload file: Upload status is not finalized.`);return a.file}async function rd(e,t,n,r){let i=await id(e,t,n,r),a=await i?.json();if(i?.headers?.[td]!==`final`)throw Error(`Failed to upload file: Upload status is not finalized.`);let o=me(a),s=new rn;return Object.assign(s,o),s}async function id(e,t,n,r){let i=t,a=r?.baseUrl||n.clientOptions.httpOptions?.baseUrl;if(a){let e=new URL(a),n=new URL(t);n.protocol=e.protocol,n.host=e.host,n.port=e.port,i=n.toString()}let o=0,s=0,c=new kt(new Response),l=`upload`;for(o=e.size;s<o;){let t=Math.min(Zu,o-s),a=e.slice(s,s+t);s+t>=o&&(l+=`, finalize`);let u=0,d=$u;for(;u<Qu;){let e=Object.assign(Object.assign({},r?.headers||{}),{"X-Goog-Upload-Command":l,"X-Goog-Upload-Offset":String(s),"Content-Length":String(t)});if(c=await n.request({path:``,body:a,httpMethod:`POST`,httpOptions:Object.assign(Object.assign({},r),{apiVersion:``,baseUrl:i,headers:e})}),c?.headers?.[td])break;u++,await od(d),d*=ed}if(s+=t,c?.headers?.[td]!==`active`)break;if(o<=s)throw Error(`All content has been uploaded, but the upload status is not finalized.`)}return c}async function ad(e){return{size:e.size,type:e.type}}function od(e){return new Promise(t=>setTimeout(t,e))}var sd=class{async upload(e,t,n,r){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await nd(e,t,n,r)}async uploadToFileSearchStore(e,t,n,r){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await rd(e,t,n,r)}async stat(e){if(typeof e==`string`)throw Error(`File path is not supported in browser uploader.`);return await ad(e)}},cd=class{create(e,t,n){return new ld(e,t,n)}},ld=class{constructor(e,t,n){this.url=e,this.headers=t,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw Error(`WebSocket is not connected`);this.ws.send(e)}close(){if(this.ws===void 0)throw Error(`WebSocket is not connected`);this.ws.close()}},ud=`x-goog-api-key`,dd=class{constructor(e){this.apiKey=e}async addAuthHeaders(e,t){if(e.get(ud)===null){if(this.apiKey.startsWith(`auth_tokens/`))throw Error(`Ephemeral tokens are only supported by the live API.`);if(!this.apiKey)throw Error(`API key is missing. Please provide a valid API key.`);e.append(ud,this.apiKey)}}},fd=`gl-node/`,pd=class{get interactions(){if(this._interactions!==void 0)return this._interactions;console.warn(`GoogleGenAI.interactions: Interactions usage is experimental and may change in future versions.`);let e=this.httpOptions;return e?.extraBody&&console.warn(`GoogleGenAI.interactions: Client level httpOptions.extraBody is not supported by the interactions client and will be ignored.`),this._interactions=new Y({baseURL:this.apiClient.getBaseUrl(),apiKey:this.apiKey,apiVersion:this.apiClient.getApiVersion(),clientAdapter:this.apiClient,defaultHeaders:this.apiClient.getDefaultHeaders(),timeout:e?.timeout,maxRetries:e?.retryOptions?.attempts}).interactions,this._interactions}constructor(e){if(e.apiKey==null)throw Error(`An API Key must be set when running in a browser`);if(e.project||e.location)throw Error(`Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.`);this.vertexai=e.vertexai??!1,this.apiKey=e.apiKey;let t=A(e.httpOptions,e.vertexai,void 0,void 0);t&&(e.httpOptions?e.httpOptions.baseUrl=t:e.httpOptions={baseUrl:t}),this.apiVersion=e.apiVersion,this.httpOptions=e.httpOptions;let n=new dd(this.apiKey);this.apiClient=new ic({auth:n,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:this.httpOptions,userAgentExtra:fd+`web`,uploader:new sd,downloader:new Xu}),this.models=new Mc(this.apiClient),this.live=new xc(this.apiClient,n,new cd),this.batches=new Lr(this.apiClient),this.chats=new Di(this.models,this.apiClient),this.caches=new bi(this.apiClient),this.files=new Bi(this.apiClient),this.operations=new Nc(this.apiClient),this.authTokens=new Zc(this.apiClient),this.tunings=new Yu(this.apiClient),this.fileSearchStores=new al(this.apiClient)}},md=s({generateAIResponse:()=>vd,initializeAI:()=>_d,isAIAvailable:()=>yd,resetAI:()=>bd}),hd=null,gd=`You are Mon Accord's AI Perfume Advisor — a world-class fragrance expert specializing in scent layering and olfactory profiling.

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
Keep responses concise but rich. Use fragrance terminology naturally.`;function _d(){let e=d.getApiKey();if(!e)return!1;try{return hd=new pd({apiKey:e}),!0}catch(e){return console.error(`Failed to initialize Gemini:`,e),!1}}async function vd(e,t=2){if(!hd&&!_d())return{success:!1,error:`no-api-key`,text:`Please set your Gemini API key in Settings to enable AI features.`};try{let t=(await hd.models.generateContent({model:`gemini-2.5-flash`,contents:e,config:{systemInstruction:gd}})).text;return t?{success:!0,text:t}:(console.error(`Empty response from Gemini`),{success:!1,error:`empty-response`,text:`AI returned an empty response. Please try again.`})}catch(n){let r=n.message||String(n);if(console.error(`AI generation error:`,r),r.includes(`429`)||r.includes(`quota`)||r.includes(`rate`)||r.includes(`RESOURCE_EXHAUSTED`)){let n=r.match(/retry in (\d+)/i)||r.match(/retryDelay.*?(\d+)/),i=n?parseInt(n[1]):30;return t>0?(console.log(`Rate limited. Waiting ${i}s before retry... (${t} retries left)`),await new Promise(e=>setTimeout(e,(i+2)*1e3)),vd(e,t-1)):{success:!1,error:`rate-limit`,text:`Rate limit exceeded. The free tier has per-minute and daily limits. Please wait ${i} seconds and try again, or check your quota at ai.google.dev.`}}return r.includes(`API_KEY`)||r.includes(`API key`)||r.includes(`401`)||r.includes(`403`)?(hd=null,{success:!1,error:`invalid-key`,text:`Invalid API key. Please check your Gemini API key in Settings.`}):r.includes(`fetch`)||r.includes(`network`)||r.includes(`ECONNREFUSED`)?{success:!1,error:`network`,text:`Network error. Please check your internet connection and try again.`}:{success:!1,error:`generation-failed`,text:`AI generation failed: ${r.slice(0,200)}`}}}function yd(){return!!d.getApiKey()}function bd(){hd=null}async function xd(e){let t=await vd(Sd(e));if(t.success){let n=Cd(t.text,e);return d.setProfile(n),d.addInteraction({type:`profile-created`,profile:n.archetype}),{success:!0,profile:n}}return{success:!1,error:t.text}}function Sd(e){let t=e.scentFamilies?.join(`, `)||`not specified`,n=(e.knownPerfumes||[]).map(e=>{let t=g.find(t=>t.id===e);return t?`${t.brand} ${t.name} (${t.family})`:e}).join(`, `)||`none selected`,r=e.interestedRegions?.join(`, `)||`all regions`;return`Analyze this user's fragrance preferences and create their olfactory profile.

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
}`}function Cd(e,t){try{let n=e.trim();return n.startsWith("```")&&(n=n.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``)),{...JSON.parse(n),createdAt:Date.now(),quizAnswers:t}}catch(e){return console.error(`Failed to parse profile JSON:`,e),wd(t)}}function wd(e){let t=e.scentFamilies||[`woody`],n=`woody-earthy`;t.includes(`oriental`)||t.includes(`spicy`)?n=`warm-oriental`:t.includes(`fresh`)||t.includes(`citrus`)?n=`fresh-aquatic`:t.includes(`floral`)?n=`floral-romantic`:t.includes(`gourmand`)&&(n=`gourmand-cozy`);let r=v.find(e=>e.id===n)||v[0];return{archetype:n,archetypeName:r.name,description:r.description,primaryFamilies:t.slice(0,3),sillageProfile:e.sillage>7?`high`:e.sillage>4?`medium`:`low`,notePreferences:{loves:[],explore:[],avoid:[]},recommendedRegions:e.interestedRegions||[`mediterranean`,`eastasia`],signatureBlend:null,createdAt:Date.now(),quizAnswers:e}}async function Td(e){return await vd(`You are simulating the scent experience of this fragrance combination. Describe what the wearer would smell in three temporal phases.

FORMULA:
${e.map(e=>{let t=m.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} of ${t.name} (Top: ${t.topNotes.join(`, `)}; Mid: ${t.middleNotes.join(`, `)}; Base: ${t.baseNotes.join(`, `)})`:``}).filter(Boolean).join(`
`)}

Respond with a vivid, sensory text description in this format:

OPENING (first 15 minutes): [describe the initial burst]
HEART (30 min - 2 hours): [describe the middle development]
DRY DOWN (2+ hours): [describe the lasting base]
OVERALL CHARACTER: [one-sentence summary of the blend's personality]
SILLAGE & LONGEVITY: [brief assessment]

Be poetic but precise. Help the reader "smell" this blend through words. Keep it under 200 words total.`)}var Ed=5;function Dd(e,t){let n=d.getProfile();if(n&&!window.__retakeQuiz){Id(e,n,t);return}window.__retakeQuiz=!1;let r=d.getQuizState(),i=r?.step||1,a=r?.answers||{username:``,scentFamilies:[],knownPerfumes:[],sillage:5,longevity:5,intensity:5,personality:``,notes:``};function o(){d.setQuizState({step:i,answers:a}),e.innerHTML=`
      <div class="page__container">
        <div class="quiz-container">
          <div class="quiz-progress">
            <div class="quiz-progress__bar" style="width: ${i/Ed*100}%"></div>
          </div>
          <p class="quiz-step-label">Step ${i} of ${Ed}</p>
          <div class="quiz-content" id="quiz-step-content">
            ${Od(i,a)}
          </div>
          <div class="quiz-actions">
            ${i>1?`<button class="btn btn--ghost" id="quiz-back">← Back</button>`:`<div></div>`}
            ${i<Ed?`<button class="btn btn--primary" id="quiz-next">Continue →</button>`:`<button class="btn btn--primary" id="quiz-finish">
                  ${yd()?`✦ Generate My Profile`:`✦ Generate Profile`}
                </button>`}
          </div>
        </div>
      </div>
    `,Ld(),Ad(i,a,e);let n=e.querySelector(`#quiz-back`),r=e.querySelector(`#quiz-next`),s=e.querySelector(`#quiz-finish`);n&&n.addEventListener(`click`,()=>{jd(i,a,e),i--,o()}),r&&r.addEventListener(`click`,()=>{jd(i,a,e),i++,o()}),s&&s.addEventListener(`click`,async()=>{if(jd(i,a,e),!yd()){window.showToast(`Please set your Gemini API key in Settings first.`,`error`),window.showSettings();return}s.disabled=!0,s.innerHTML=`<span class="loading-spinner"></span> Generating...`;let n=e.querySelector(`#generation-status`);n||(n=document.createElement(`p`),n.id=`generation-status`,n.style.cssText=`font-size: var(--text-xs); color: var(--text-tertiary); text-align: center; margin-top: var(--space-sm);`,s.parentElement.appendChild(n)),n.textContent=`Analyzing your preferences with AI...`;let r=await xd(a);r.success?(r.profile.username=a.username||`Anonymous`,d.setProfile(r.profile),d.clearQuizState(),Md(e,r.profile,t),window.showToast(`Your olfactory profile has been created! ✦`)):(s.disabled=!1,s.innerHTML=`✦ Generate My Profile`,n.textContent=``,window.showToast(r.error||`Failed to generate profile.`,`error`))})}o()}function Od(e,t){switch(e){case 1:return`
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
          ${h.map(e=>`
            <div class="quiz-option ${t.scentFamilies.includes(e.id)?`quiz-option--selected`:``}" data-value="${e.id}" id="family-${e.id}">
              <span class="quiz-option__icon">${e.icon}</span>
              <span class="quiz-option__name">${e.name}</span>
              <span class="quiz-option__desc">${e.description}</span>
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
          ${kd(t.knownPerfumes,``)}
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
            <input type="range" min="1" max="10" value="${t.sillage}" id="slider-sillage" />
            <div class="slider-labels"><span>Intimate</span><span>Room-filling</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Longevity</span>
              <span class="slider-value" id="longevity-val">${t.longevity}/10</span>
            </div>
            <input type="range" min="1" max="10" value="${t.longevity}" id="slider-longevity" />
            <div class="slider-labels"><span>Few hours</span><span>All day</span></div>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="slider-label">Intensity</span>
              <span class="slider-value" id="intensity-val">${t.intensity}/10</span>
            </div>
            <input type="range" min="1" max="10" value="${t.intensity}" id="slider-intensity" />
            <div class="slider-labels"><span>Subtle</span><span>Bold</span></div>
          </div>
        </div>
      `;case 5:return`
        <h2 class="quiz-title">What describes you best?</h2>
        <p class="quiz-subtitle">Choose the personality trait that resonates most with your style.</p>
        <div class="quiz-grid quiz-grid--context">
          ${[{id:`elegant`,name:`Elegant & Classic`,icon:`👑`,desc:`Timeless sophistication`},{id:`adventurous`,name:`Adventurous & Bold`,icon:`🌍`,desc:`Love discovering the new`},{id:`romantic`,name:`Romantic & Dreamy`,icon:`🌙`,desc:`Soft, poetic, emotional`},{id:`minimalist`,name:`Minimalist & Clean`,icon:`✨`,desc:`Less is more`},{id:`creative`,name:`Creative & Expressive`,icon:`🎨`,desc:`Unique, unconventional`},{id:`confident`,name:`Confident & Powerful`,icon:`🔥`,desc:`Commands attention`}].map(e=>`
            <div class="quiz-option ${t.personality===e.id?`quiz-option--selected`:``}" data-value="${e.id}" id="ctx-${e.id}">
              <span class="quiz-option__icon">${e.icon}</span>
              <span class="quiz-option__name">${e.name}</span>
              <span class="quiz-option__desc">${e.desc}</span>
            </div>
          `).join(``)}
        </div>
        <div class="input-group mt-lg">
          <label class="input-label">Any additional notes? (optional)</label>
          <textarea class="input" id="quiz-notes" placeholder="E.g., I love the smell of rain, old books, or fresh coffee...">${t.notes||``}</textarea>
        </div>
      `}}function kd(e,t){let n=t?g.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.brand.toLowerCase().includes(t.toLowerCase())):g,r={};return n.forEach(e=>{r[e.brand]||(r[e.brand]=[]),r[e.brand].push(e)}),Object.entries(r).map(([t,n])=>`
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
  `).join(``)}function Ad(e,t,n){if(e===2&&n.querySelectorAll(`.quiz-grid--families .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.value;t.scentFamilies.includes(n)?(t.scentFamilies=t.scentFamilies.filter(e=>e!==n),e.classList.remove(`quiz-option--selected`)):(t.scentFamilies.push(n),e.classList.add(`quiz-option--selected`))})}),e===3){let e=n.querySelector(`#perfume-search`),r=n.querySelector(`#perfume-list`),i=e=>{r.innerHTML=kd(t.knownPerfumes,e),r.querySelectorAll(`.quiz-option--perfume`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.value;t.knownPerfumes.includes(r)?(t.knownPerfumes=t.knownPerfumes.filter(e=>e!==r),e.classList.remove(`quiz-option--selected`)):(t.knownPerfumes.push(r),e.classList.add(`quiz-option--selected`)),n.querySelector(`.quiz-hint`).textContent=`Selected: ${t.knownPerfumes.length} perfume${t.knownPerfumes.length===1?``:`s`}`})})};e.addEventListener(`input`,e=>i(e.target.value)),i(``)}e===4&&[`sillage`,`longevity`,`intensity`].forEach(e=>{let r=n.querySelector(`#slider-${e}`),i=n.querySelector(`#${e}-val`);r&&r.addEventListener(`input`,()=>{t[e]=parseInt(r.value),i.textContent=`${r.value}/10`})}),e===5&&n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>{e.addEventListener(`click`,()=>{n.querySelectorAll(`.quiz-grid--context .quiz-option`).forEach(e=>e.classList.remove(`quiz-option--selected`)),e.classList.add(`quiz-option--selected`),t.personality=e.dataset.value})})}function jd(e,t,n){if(e===1){let e=n.querySelector(`#quiz-username`);e&&(t.username=e.value.trim())}if(e===5){let e=n.querySelector(`#quiz-notes`);e&&(t.notes=e.value)}}function Md(e,t,n){let r=Pd(t),i=Fd(t);e.innerHTML=`
    <div class="page__container">
      <div class="profile-result">
        <div class="section-header">
          <p class="section-label">Your Olfactory Profile</p>
          <h2 class="section-title">${t.archetypeName||`Your Scent Identity`}</h2>
        </div>

        <div class="profile-overview mt-xl">
          <div class="ai-response profile-overview__identity" id="profile-description">
          <div class="ai-response__label">✦ Your Scent Identity</div>
          <div class="ai-response__text">
            <p>${t.description||`Your unique olfactory archetype has been defined.`}</p>
          </div>
          </div>

        <!-- Merged Cards -->
          <div class="profile-details">
            <div class="card">
              <h4 style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Scent Families & Sillage</h4>
              <div class="flex gap-sm mb-sm" style="flex-wrap: wrap;">
                ${(t.primaryFamilies||[]).map(e=>`<span class="tag tag--accent">${e}</span>`).join(``)}
              </div>
              <p style="font-size: var(--text-sm); color: var(--accent); font-weight: 600;">Sillage: ${t.sillageProfile||`Medium`}</p>
            </div>
            <div class="card">
              <h4 style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-sm);">Note Preferences</h4>
              ${t.notePreferences?`
                <div style="margin-bottom: var(--space-xs);">
                  <span style="font-size: var(--text-xs); color: #4CAF50; font-weight: 600;">♥ Love: </span>
                  <span style="font-size: var(--text-xs);">${(t.notePreferences.loves||[]).join(`, `)}</span>
                </div>
                <div style="margin-bottom: var(--space-xs);">
                  <span style="font-size: var(--text-xs); color: var(--accent); font-weight: 600;">✦ Explore: </span>
                  <span style="font-size: var(--text-xs);">${(t.notePreferences.explore||[]).join(`, `)}</span>
                </div>
                <div>
                  <span style="font-size: var(--text-xs); color: var(--text-tertiary); font-weight: 600;">↓ Avoid: </span>
                  <span style="font-size: var(--text-xs);">${(t.notePreferences.avoid||[]).join(`, `)}</span>
                </div>
              `:`<p style="font-size: var(--text-xs); color: var(--text-tertiary);">Not available yet.</p>`}
            </div>
          </div>
        </div>

        <!-- Region-Only Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Recommended Combinations — Mon Accord</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Sprays and oils from our 6 world regions, curated for your profile.</p>
          <div class="recommendation-grid">
            ${r.map(e=>Nd(e,{showBuyButton:!0})).join(``)}
          </div>
        </div>

        <!-- Mixed Recommendations -->
        <div class="mt-xl">
          <h3 style="font-size: var(--text-xl); margin-bottom: var(--space-md);">✦ Extended Combinations — with L'Oréal Luxe</h3>
          <p style="font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: var(--space-lg);">Combine Mon Accord scents with iconic luxury perfumes.</p>
          <div class="recommendation-grid">
            ${i.map(e=>Nd(e)).join(``)}
          </div>
        </div>

        <div class="profile-actions mt-xl text-center">
          <button class="btn btn--primary btn--lg" id="go-to-shop">Shop Now →</button>
          <button class="btn btn--secondary btn--lg" id="go-to-lab">Enter the Lab</button>
          <button class="btn btn--ghost" id="retake-quiz">Retake Quiz</button>
        </div>
      </div>
    </div>
  `,Ld(),e.querySelector(`#go-to-shop`).addEventListener(`click`,()=>n(`#shop`)),e.querySelectorAll(`[data-buy-combo]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.comboIds.split(`,`).map(e=>e.trim()).filter(Boolean);d.setPendingShopCart(t),n(`#shop`)})}),e.querySelector(`#go-to-lab`).addEventListener(`click`,()=>n(`#lab`)),e.querySelector(`#retake-quiz`).addEventListener(`click`,()=>{window.__retakeQuiz=!0,d.clearQuizState(),Dd(e,n)})}function Nd(e,t={}){let n=(e.productIds||[]).join(`,`);return`
    <div class="combo-card card">
      <h4 class="combo-card__name">${e.name}</h4>
      <div class="combo-card__layers">
        ${e.layers.map(e=>{let t=e.regionData;return`<p style="font-size: var(--text-sm); margin-bottom: 2px;">
            <span style="color: ${t?.color||`var(--accent)`};">${t?.icon||`•`}</span>
            ${e.amount} ${e.unit} — <strong>${e.name}</strong>
          </p>`}).join(``)}
      </div>
      <p class="combo-card__desc">${e.description}</p>
      ${t.showBuyButton&&e.productIds?.length?`
        <button class="btn btn--primary combo-card__buy" data-buy-combo="true" data-combo-ids="${n}">
          Buy this combination
        </button>
      `:``}
    </div>
  `}function Pd(e){let t=d.getOwnedPerfumes().monAccord||[];function n(e,t){let n=y(e);if(!n)return null;let r=p.find(e=>e.id===n.region);return{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:r}}let r=t.filter(e=>y(e)?.format===`spray`),i=t.filter(e=>y(e)?.format===`oil`),a=(e,t=[])=>m.find(n=>n.format===e&&!t.includes(n.id)),o=r[0]||a(`spray`,[])?.id||`scandinavian-spray`,s=r[1]||a(`spray`,[o])?.id||`mediterranean-spray`,c=r[2]||a(`spray`,[o,s])?.id||`middleeast-spray`,l=i[0]||a(`oil`,[])?.id||`eastasia-oil`,u=i[1]||a(`oil`,[l])?.id||`southafrica-oil`;return[{name:`Morning Clarity`,description:t.length?`Built around your ${y(o)?.name||`collection`} — crisp and bright for daytime.`:`A crisp, bright opening with spray-forward projection, anchored by a subtle oil base.`,layers:[n(o,3),n(s,2),n(l,1)].filter(Boolean)},{name:`Golden Evening`,description:t.length?`Your ${y(c)?.name||`spray`} takes centre stage in this warm evening blend.`:`A warm, opulent blend of spray richness over deep oil.`,layers:[n(c,3),n(u,2),n(s,1)].filter(Boolean)},{name:`Signature Blend`,description:t.length?`A layering of your owned collection that showcases your personal scent identity.`:`A balanced blend drawing from multiple regions.`,layers:[n(o,2),n(c,2),n(l,1)].filter(Boolean)}].map(e=>({...e,productIds:[...new Set(e.layers.map(e=>e.id).filter(Boolean))]}))}function Fd(e){let t=d.getOwnedPerfumes(),n=t.loreal||[],r=t.monAccord||[];function i(e,t){let n=y(e);return n?{id:n.id,name:n.name,amount:t,unit:n.format===`spray`?`sprays`:`drops`,regionData:p.find(e=>e.id===n.region)}:null}function a(e,t){let n=g.find(t=>t.id===e);return n?{name:`${n.brand} ${n.name}`,amount:t,unit:`sprays`,regionData:{icon:`✦`,color:`var(--accent)`}}:null}let o=n.length?n:[`ysl-libre`,`ysl-black-opium`,`armani-my-way`],s=r.length?r:[`scandinavian-spray`,`southafrica-spray`,`mediterranean-spray`,`eastasia-oil`,`southamerica-oil`,`middleeast-oil`],c=(e,t=[])=>m.find(n=>n.format===e&&!t.includes(n.id))?.id,l=o[0]||`ysl-libre`,u=o[1]||`ysl-black-opium`,f=o[2]||`armani-my-way`,h=s.find(e=>y(e)?.format===`spray`)||c(`spray`),_=s.filter(e=>y(e)?.format===`spray`)[1]||c(`spray`,[h]),v=s.find(e=>y(e)?.format===`oil`)||c(`oil`),b=g.find(e=>e.id===l),x=g.find(e=>e.id===u),S=g.find(e=>e.id===f);return[{name:b?`${b.name} Accord`:`Libre Accord`,description:b?`Your ${b.brand} ${b.name} elevated with Mon Accord layering.`:`YSL Libre layered with Scandinavian freshness for a modern twist.`,layers:[a(l,2),i(h,2),i(v,1)].filter(Boolean)},{name:x?`${x.name} Fusion`:`Velvet Opium`,description:x?`${x.brand} ${x.name} deepened with Mon Accord warmth.`:`Black Opium's coffee-vanilla paired with depth and warmth.`,layers:[a(u,2),i(_||h,2),i(v,1)].filter(Boolean)},{name:S?`${S.name} Journey`:`Mediterranean Way`,description:S?`${S.brand} ${S.name} blended with complementary Mon Accord scents.`:`Armani My Way paired with Mediterranean sunshine.`,layers:[a(f,2),i(h,2),i(v,1)].filter(Boolean)}]}function Id(e,t,n){Md(e,t,n)}function Ld(){if(document.getElementById(`quiz-styles`))return;let e=document.createElement(`style`);e.id=`quiz-styles`,e.textContent=`
    /* ── Quiz container ── */
    .quiz-container { margin: 0 auto; padding: var(--space-2xl) var(--space-2xl); }
    .quiz-progress { height: 3px; background: var(--bg-tertiary); border-radius: var(--radius-full); margin-bottom: var(--space-sm); overflow: hidden; }
    .quiz-progress__bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-dark)); border-radius: var(--radius-full); transition: width var(--transition-slow); }
    .quiz-step-label { font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-tertiary); margin-bottom: var(--space-xl); }
    .quiz-title { font-size: var(--text-3xl); margin-bottom: var(--space-sm); }
    .quiz-subtitle { font-size: var(--text-base); color: var(--text-secondary); margin-bottom: var(--space-lg); }
    .quiz-step-centered { text-align: center; }

    /* ── Grids: more columns so rows are shorter ── */
    .quiz-grid { display: grid; gap: var(--space-md); }
    .quiz-grid--families { grid-template-columns: repeat(5, 1fr); }
    .quiz-grid--context  { grid-template-columns: repeat(3, 1fr); }

    .quiz-option {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);
      padding: var(--space-lg) var(--space-md); cursor: pointer; transition: all var(--transition-fast);
      text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 120px;
    }
    .quiz-option:hover { border-color: var(--accent-light); background: var(--accent-bg); }
    .quiz-option--selected { border-color: var(--accent); background: var(--accent-bg); box-shadow: var(--shadow-gold); }
    .quiz-option__icon { display: block; font-size: 1.8rem; margin-bottom: var(--space-sm); }
    .quiz-option__name { display: block; font-weight: 600; font-size: var(--text-sm); margin-bottom: 4px; }
    .quiz-option__desc { display: block; font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.4; }
    .quiz-actions { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--border); }

    /* ── Sliders: vertical stack, centered ── */
    .quiz-sliders { display: flex; flex-direction: column; gap: var(--space-xl); max-width: 600px; margin: 0 auto; }
    .slider-container { display: flex; flex-direction: column; }
    .slider-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xs); }
    .slider-label { font-size: var(--text-sm); font-weight: 600; }
    .slider-value { font-size: var(--text-sm); color: var(--text-tertiary); }
    .slider-labels { display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 4px; }

    /* ── Perfume list: more columns, no fixed max-height ── */
    .quiz-search-container { margin-bottom: var(--space-md); }
    .quiz-search { width: 100%; }
    .quiz-perfume-list { overflow-y: auto; max-height: calc(100vh - 340px); display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--surface); }
    .perfume-brand-group { position: relative; }
    .perfume-brand-label { position: sticky; top: 0; z-index: 2; font-size: var(--text-sm); font-weight: 700; color: var(--text-primary); background: var(--bg-secondary); padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--border); letter-spacing: 0.01em; }
    .perfume-brand-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-xs); padding: var(--space-sm) var(--space-md); }
    .quiz-option--perfume { text-align: left; padding: var(--space-sm) var(--space-md); }
    .quiz-hint { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-sm); }

    /* ── Profile result ── */
    .profile-result { margin: 0 auto; }
    .profile-overview { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.85fr); gap: var(--space-lg); align-items: start; }
    .profile-overview__identity { margin: 0; min-height: 100%; }
    .profile-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-lg); align-content: start; }
    .profile-actions { display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; }
    .recommendation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-md); }
    .combo-card { display: flex; flex-direction: column; min-height: var(--card-min-regular); }
    .combo-card__name { font-size: var(--text-lg); font-family: var(--font-display); margin-bottom: var(--space-md); }
    .combo-card__layers { margin-bottom: var(--space-md); flex: 1; }
    .combo-card__desc { font-size: var(--text-xs); color: var(--text-tertiary); line-height: 1.6; margin-top: auto; }
    .combo-card__buy { width: 100%; margin-top: var(--space-md); }

    @media (max-width: 1024px) { .profile-overview { grid-template-columns: 1fr; } }
    @media (max-width: 900px) {
      .quiz-grid--families { grid-template-columns: repeat(2, 1fr); }
      .quiz-grid--context  { grid-template-columns: repeat(2, 1fr); }
      .perfume-brand-items { grid-template-columns: 1fr; }
    }
  `,document.head.appendChild(e)}var Rd=[{id:`confident`,name:`Confident`,icon:`💪`,description:`Bold and commanding`},{id:`romantic`,name:`Romantic`,icon:`💕`,description:`Soft and alluring`},{id:`calm`,name:`Calm`,icon:`🧘`,description:`Peaceful and centered`},{id:`energetic`,name:`Energetic`,icon:`⚡`,description:`Vibrant and lively`},{id:`mysterious`,name:`Mysterious`,icon:`🌙`,description:`Enigmatic and deep`},{id:`playful`,name:`Playful`,icon:`✨`,description:`Light and fun`}],zd=[{id:`office`,name:`Office / Work`,icon:`💼`},{id:`date-night`,name:`Date Night`,icon:`🕯`},{id:`casual`,name:`Casual Outing`,icon:`☀️`},{id:`formal`,name:`Formal Event`,icon:`🎩`},{id:`outdoor`,name:`Outdoor Adventure`,icon:`🏔`},{id:`cozy`,name:`Cozy Night In`,icon:`🛋`}],Bd=[{id:`spring`,name:`Spring`,icon:`🌸`},{id:`summer`,name:`Summer`,icon:`☀️`},{id:`autumn`,name:`Autumn`,icon:`🍂`},{id:`winter`,name:`Winter`,icon:`❄️`}],Vd=[{id:`whisper`,name:`Whisper`,value:1,description:`Barely there, intimate`},{id:`soft`,name:`Soft`,value:3,description:`Close range only`},{id:`moderate`,name:`Moderate`,value:5,description:`Noticeable arm's length`},{id:`present`,name:`Present`,value:7,description:`Fills the room gently`},{id:`bold`,name:`Bold`,value:9,description:`Leaves a trail`}];function Hd(){let e=d.getOwnedPerfumes(),t=[];if(e.monAccord?.length){let n=e.monAccord.map(e=>m.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`Mon Accord owned: ${n.join(`, `)}`)}if(e.loreal?.length){let n=e.loreal.map(e=>g.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`L'Oréal Luxe owned: ${n.join(`, `)}`)}return t.length?t.join(`
`):null}async function Ud(e){let t=d.getProfile(),n=Hd(),r=await vd(`Based on the user's context, recommend a Mon Accord layering formula.

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
${m.map(e=>`- ${e.id}: ${e.name} (${e.scentFamily}, sillage: ${e.sillage}/10)`).join(`
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
}`);if(r.success)try{let t=r.text.trim();t.startsWith("```")&&(t=t.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let n=JSON.parse(t);return d.addInteraction({type:`contextual-recommendation`,context:e,recommendation:n.formulaName}),{success:!0,recommendation:n}}catch(e){return console.error(`Failed to parse recommendation:`,e),{success:!0,recommendation:{formulaName:`AI Recommendation`,layers:[],reasoning:r.text,scentPreview:``,tips:``}}}return{success:!1,error:r.text}}function Wd(e,t={}){let{showNameInput:n=!0,onSaved:r}=t,i=d.get(`vault_folders`,[{id:`default`,name:`All Formulas`,icon:`📁`}]),a=`default`,o=!1;function s(){let t=document.getElementById(`save-vault-overlay`);t&&t.remove();let c=document.createElement(`div`);c.className=`modal-overlay`,c.id=`save-vault-overlay`,c.innerHTML=`
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
          <button class="btn btn--primary" id="sv-confirm">Save ✦</button>
        </div>
      </div>
    `,document.body.appendChild(c),Gd(),c.querySelector(`#sv-close`).onclick=()=>c.remove(),c.querySelector(`#sv-cancel`).onclick=()=>c.remove(),c.onclick=e=>{e.target===c&&c.remove()},c.querySelector(`#sv-folder-dropdown`).onchange=e=>{a=e.target.value},c.querySelector(`#sv-toggle-new`).onclick=()=>{o=!o,s()};let l=c.querySelector(`#sv-create-folder`);l&&(l.onclick=()=>{let e=c.querySelector(`#sv-new-folder-name`).value.trim();if(!e)return;let t={id:`folder-`+Date.now(),name:e,icon:`📂`};i.push(t),d.set(`vault_folders`,i),a=t.id,o=!1,s(),window.showToast(`Folder "${e}" created!`)});let u=c.querySelector(`#sv-cancel-new`);if(u&&(u.onclick=()=>{o=!1,s()}),c.querySelector(`#sv-confirm`).onclick=()=>{let t=c.querySelector(`#sv-name`),n=(t?t.value.trim():e.name)||`Blend ${Date.now().toString(36).slice(-4)}`,o={...e,id:e.id||`f-`+Date.now(),name:n,folderId:a===`default`?void 0:a,savedAt:Date.now()};d.saveFormula(o),c.remove();let s=i.find(e=>e.id===a)?.name||`Vault`;window.showToast(`"${n}" saved to ${s}! ✦`),r&&r(o)},n){let e=c.querySelector(`#sv-name`);e&&setTimeout(()=>e.focus(),100)}}s()}function Gd(){if(document.getElementById(`save-modal-styles`))return;let e=document.createElement(`style`);e.id=`save-modal-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var Kd=`lab_session_state`;function qd(e){try{sessionStorage.setItem(Kd,JSON.stringify(e))}catch{}}function Jd(){try{return JSON.parse(sessionStorage.getItem(Kd)||`null`)}catch{return null}}function Yd(e,t){let n=Jd(),r=n?.layers||[],i=n?.scentSimulation||null,a=!1,o=n?.contextResult||null,s=!1,c=n?.selectedMood||null,l=n?.selectedOccasion||null,u=n?.selectedSeason||null,d=n?.selectedTime||null,f=n?.selectedIntensity||5;function m(){qd({layers:r,scentSimulation:i,contextResult:o,selectedMood:c,selectedOccasion:l,selectedSeason:u,selectedTime:d,selectedIntensity:f})}let h=JSON.parse(sessionStorage.getItem(`labPending`)||`[]`);h.length>0&&(h.forEach(e=>{let t=y(e);t&&!r.find(t=>t.perfumeId===e)&&r.push({perfumeId:e,amount:t.format===`spray`?2:3,unit:t.format===`spray`?`sprays`:`drops`})}),sessionStorage.removeItem(`labPending`),m());function g(){e.innerHTML=`
      <div class="page__container">
        <div class="lab-layout">

          <!-- Col 1: Workspace (add section + layers + actions + simulation) -->
          <div class="lab-workspace">
            <div class="lab-add-section" id="lab-add-section">
              <p class="lab-add-label">Add a layer</p>
              <div class="lab-perfume-selector">
                ${p.map(e=>`
                  <div class="lab-region-group">
                    <p class="lab-region-label" style="color: ${e.color};">${e.icon} ${e.name}</p>
                    <div class="lab-region-items">
                      ${Xd(e.id).map(t=>`
                        <button class="lab-add-btn ${r.find(e=>e.perfumeId===t.id)?`lab-add-btn--added`:``}" data-id="${t.id}" style="--region-color: ${e.color};">
                          ${t.format===`spray`?`💨`:`💧`} ${t.format===`spray`?`Spray`:`Oil`}
                          ${r.find(e=>e.perfumeId===t.id)?` ✓`:` +`}
                        </button>
                      `).join(``)}
                    </div>
                  </div>
                `).join(``)}
              </div>
            </div>

            <div class="lab-layers" id="lab-layers">
              ${r.length===0?`
                <div class="lab-empty">
                  <p class="lab-empty__text">Add perfumes above to start layering.</p>
                  <p class="lab-empty__hint">Combine sprays and oils from different regions to create your unique blend.</p>
                </div>
              `:r.map((e,t)=>{let n=y(e.perfumeId),r=p.find(e=>e.id===n.region);return`
                  <div class="lab-layer" data-idx="${t}" style="--region-color: ${r.color};">
                    <div class="lab-layer__header">
                      <div class="lab-layer__info">
                        <span class="lab-layer__icon">${r.icon}</span>
                        <div>
                          <span class="lab-layer__name">${n.name}</span>
                          <span class="lab-layer__meta">${n.scentFamily} · ${n.layeringRole}</span>
                        </div>
                      </div>
                      <button class="lab-layer__remove" data-idx="${t}" title="Remove">✕</button>
                    </div>
                    <div class="lab-layer__controls">
                      <div class="lab-layer__amount">
                        <button class="lab-layer__amount-btn" data-action="decrease" data-idx="${t}">−</button>
                        <span class="lab-layer__amount-value">${e.amount}</span>
                        <button class="lab-layer__amount-btn" data-action="increase" data-idx="${t}">+</button>
                        <span class="lab-layer__amount-unit">${e.unit}</span>
                      </div>
                      <div class="lab-layer__notes">
                        Top: ${n.topNotes.slice(0,2).join(`, `)} · Base: ${n.baseNotes.slice(0,2).join(`, `)}
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
                <div class="ai-response__label">✦ Virtual Scent Simulation</div>
                <div class="ai-response__text">
                  ${Qd(i)}
                </div>
              </div>
            `:``}
          </div>

          <!-- Col 2: Contextual Advisor -->
          <div class="lab-advisor">
            <div class="lab-advisor__header">
              <h3 class="lab-advisor__title">✦ Contextual Advisor</h3>
              <p class="lab-advisor__subtitle">Tell us the moment, we'll craft the formula.</p>
            </div>

            <div class="lab-advisor__form">
              <div class="input-group">
                <label class="input-label">Mood</label>
                <div class="lab-advisor__chips" id="mood-chips">
                  ${Rd.map(e=>`<button class="lab-chip ${c===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                </div>
              </div>

              <div class="input-group">
                <label class="input-label">Occasion</label>
                <div class="lab-advisor__chips" id="occasion-chips">
                  ${zd.map(e=>`<button class="lab-chip ${l===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
                </div>
              </div>

              <div class="input-group">
                <label class="input-label">Season</label>
                <div class="lab-advisor__chips" id="season-chips">
                  ${Bd.map(e=>`<button class="lab-chip ${u===e.id?`lab-chip--active`:``}" data-value="${e.id}">${e.icon} ${e.name}</button>`).join(``)}
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
                  <span class="slider-value" id="advisor-intensity-val">${(Vd.find(e=>e.value===f)||{}).name||`Moderate`}</span>
                </div>
                <input type="range" min="1" max="9" value="${f}" step="2" id="advisor-intensity" />
              </div>

              <button class="btn btn--primary w-full" id="btn-get-advice" ${s?`disabled`:``}>
                ${s?`<span class="loading-spinner"></span> Crafting...`:`✦ Get Recommendation`}
              </button>
            </div>

            ${o?`
              <div class="lab-advisor__result mt-lg" id="advisor-result">
                ${o.layers?.length>0?`
                  <button class="btn btn--primary btn--sm w-full" id="btn-apply-recommendation" style="margin-bottom: var(--space-md);">✦ Apply This Formula</button>
                `:``}
                <div class="ai-response">
                  <div class="ai-response__label">✦ ${o.formulaName||`Recommendation`}</div>
                  <div class="ai-response__text ai-response__text--compact">
                    ${o.reasoning?`<p>${Zd(o.reasoning,150)}</p>`:``}
                    ${o.scentPreview?`<p><em>${Zd(o.scentPreview,100)}</em></p>`:``}
                    ${o.tips?`<p style="color: var(--accent); font-size: var(--text-xs);">💡 ${Zd(o.tips,100)}</p>`:``}
                  </div>
                </div>
              </div>
            `:``}
          </div>

        </div>
      </div>
    `,$d(),_()}function _(){e.querySelectorAll(`.lab-add-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id,n=r.findIndex(e=>e.perfumeId===t);if(n>=0)r.splice(n,1);else{let e=y(t);r.push({perfumeId:t,amount:e.format===`spray`?2:3,unit:e.format===`spray`?`sprays`:`drops`})}i=null,m(),g()})}),e.querySelectorAll(`.lab-layer__remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),r.splice(parseInt(e.dataset.idx),1),i=null,m(),g()})}),e.querySelectorAll(`.lab-layer__amount-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.idx);e.dataset.action===`increase`?r[n].amount=Math.min(r[n].amount+1,10):r[n].amount=Math.max(r[n].amount-1,1),m(),g()})});let t=e.querySelector(`#btn-simulate`);t&&t.addEventListener(`click`,async()=>{if(!yd()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}a=!0,g();let e=await Td(r);a=!1,e.success?(i=e.text,m()):window.showToast(e.text||`Simulation failed.`,`error`),g()});let n=e.querySelector(`#btn-save-formula`);n&&n.addEventListener(`click`,()=>{v(r,i)});let p=e.querySelector(`#btn-clear-layers`);p&&p.addEventListener(`click`,()=>{r=[],i=null,o=null,m(),g()}),[`mood`,`occasion`,`season`,`time`].forEach(t=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(n=>{n.addEventListener(`click`,()=>{e.querySelectorAll(`#${t}-chips .lab-chip`).forEach(e=>e.classList.remove(`lab-chip--active`)),n.classList.add(`lab-chip--active`);let r=n.dataset.value;t===`mood`?c=r:t===`occasion`?l=r:t===`season`?u=r:t===`time`&&(d=r),m()})})});let h=e.querySelector(`#advisor-intensity`);h&&h.addEventListener(`input`,()=>{f=parseInt(h.value);let t=Vd.find(e=>e.value===f);e.querySelector(`#advisor-intensity-val`).textContent=t?.name||`Moderate`,m()});let _=e.querySelector(`#btn-get-advice`);_&&_.addEventListener(`click`,async()=>{if(!yd()){window.showToast(`Please set your Gemini API key in Settings.`,`error`),window.showSettings();return}let t=e.querySelector(`#mood-chips .lab-chip--active`)?.dataset.value,n=e.querySelector(`#occasion-chips .lab-chip--active`)?.dataset.value,r=e.querySelector(`#season-chips .lab-chip--active`)?.dataset.value,i=e.querySelector(`#time-chips .lab-chip--active`)?.dataset.value,a=Vd.find(t=>t.value===parseInt(e.querySelector(`#advisor-intensity`)?.value||5))?.name||`moderate`;s=!0,g();let c=await Ud({mood:t,occasion:n,season:r,timeOfDay:i,intensity:a});s=!1,c.success?(o=c.recommendation,m()):window.showToast(c.error||`Advice failed.`,`error`),g()});let b=e.querySelector(`#btn-apply-recommendation`);b&&b.addEventListener(`click`,()=>{o?.layers&&(r=o.layers.map(e=>({perfumeId:e.perfumeId,amount:e.amount,unit:e.unit||(e.perfumeId.includes(`oil`)?`drops`:`sprays`)})).filter(e=>y(e.perfumeId)),i=null,m(),g(),window.showToast(`Formula applied! Try simulating the scent.`))})}function v(e,t){let n=e.map(e=>{let t=y(e.perfumeId);return{...e,name:t?.name||e.perfumeId}});Wd({id:`f-`+Date.now(),layers:n,simulation:t,createdAt:Date.now()},{showNameInput:!0})}g()}function Xd(e){return m.filter(t=>t.region===e)}function Zd(e,t=150){return!e||e.length<=t?e:e.substring(0,t).replace(/\s+\S*$/,``)+`…`}function Qd(e){return e?e.split(`
`).filter(e=>e.trim()).map(e=>{if(e.match(/^(OPENING|HEART|DRY DOWN|OVERALL|SILLAGE)/i)){let[t,...n]=e.split(`:`);return`<p><strong style="color: var(--accent);">${t.trim()}:</strong> ${n.join(`:`).trim()}</p>`}return`<p>${e}</p>`}).join(``):``}function $d(){if(document.getElementById(`lab-styles`))return;let e=document.createElement(`style`);e.id=`lab-styles`,e.textContent=`
    .lab-layout {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: var(--space-2xl);
      align-items: start;
      max-width: 1680px;
    }

    /* ── Col 1: Workspace ── */
    .lab-workspace {
      display: flex;
      flex-direction: column;
    }

    /* ── Add Section ── */
    .lab-add-section {
      margin-bottom: var(--space-md);
    }

    .lab-add-label {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: var(--space-sm);
    }

    .lab-perfume-selector {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
    }

    .lab-region-group {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-sm);
      display: flex;
      flex-direction: column;
    }

    .lab-region-label {
      font-size: var(--text-xs);
      font-weight: 700;
      margin-bottom: var(--space-sm);
    }

    .lab-region-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .lab-add-btn {
      padding: 6px 10px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-align: left;
    }

    .lab-add-btn:hover {
      border-color: var(--region-color);
      color: var(--region-color);
      background: var(--surface);
    }

    .lab-add-btn--added {
      border-color: var(--region-color);
      background: rgba(0,0,0,0.02);
      color: var(--region-color);
      font-weight: 600;
    }

    /* ── Layers ── */
    .lab-layers {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }

    .lab-empty {
      text-align: center;
      padding: var(--space-md) var(--space-xl);
      border: 2px dashed var(--border);
      border-radius: var(--radius-lg);
    }

    .lab-empty__text {
      font-size: var(--text-lg);
      color: var(--text-tertiary);
      margin-bottom: var(--space-xs);
    }

    .lab-empty__hint {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }

    .lab-layer {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--region-color);
      border-radius: var(--radius-md);
      padding: var(--space-md) var(--space-lg);
      transition: all var(--transition-fast);
    }

    .lab-layer:hover {
      box-shadow: var(--shadow-sm);
    }

    .lab-layer__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-sm);
    }

    .lab-layer__info {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .lab-layer__icon {
      font-size: 1.3rem;
    }

    .lab-layer__name {
      font-weight: 600;
      font-size: var(--text-sm);
      display: block;
    }

    .lab-layer__meta {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__remove {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      color: var(--text-tertiary);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
      background: none;
      border: none;
    }

    .lab-layer__remove:hover {
      background: rgba(244, 67, 54, 0.08);
      color: #F44336;
    }

    .lab-layer__controls {
      display: flex;
      justify-content: space-between;
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

    .lab-layer__amount-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .lab-layer__amount-value {
      font-size: var(--text-lg);
      font-weight: 700;
      min-width: 24px;
      text-align: center;
      color: var(--text-primary);
    }

    .lab-layer__amount-unit {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-layer__notes {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .lab-actions {
      display: flex;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      flex-wrap: wrap;
    }

    /* ── Col 2: Advisor Panel ── */
    .lab-advisor {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
    }

    .lab-advisor__header {
      margin-bottom: var(--space-md);
    }

    .lab-advisor__title {
      font-size: var(--text-lg);
      margin-bottom: 4px;
    }

    .lab-advisor__subtitle {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
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
      padding: 6px 12px;
      font-size: var(--text-xs);
      font-weight: 500;
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      background: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lab-chip:hover {
      border-color: var(--accent-light);
      color: var(--accent-dark);
    }

    .lab-chip--active {
      border-color: var(--accent);
      background: var(--accent-bg);
      color: var(--accent-dark);
      font-weight: 600;
    }

    @media (max-width: 1024px) {
      .lab-layout {
        grid-template-columns: 1fr;
      }
    }
  `,document.head.appendChild(e)}var ef=`/mon_accord/assets/open-folder-BdwKQCux.png`,tf=[{id:`default`,name:`All Formulas`},{id:`evening`,name:`Evening Wear`},{id:`daytime`,name:`Daytime`},{id:`office`,name:`Office`},{id:`weekend`,name:`Weekend`},{id:`seasonal`,name:`Seasonal`}];function nf(e,t){let n=d.get(`vault_folders`,null),r;if(!n)r=tf.map(e=>({...e})),d.set(`vault_folders`,r);else{let e=new Set(n.map(e=>e.id)),t=tf.filter(t=>!e.has(t.id));t.length?(r=[...n,...t].map(e=>({id:e.id,name:e.name})),d.set(`vault_folders`,r)):r=n.map(e=>({id:e.id,name:e.name}))}let i=null,a=!1,o=null,s=null;function c(){d.set(`vault_folders`,r)}function l(e){let t=d.getVault();return e===`default`?t:t.filter(t=>t.folderId===e)}function u(){let t=d.getVault();e.innerHTML=`
      <div class="page__container">
        ${i?v(i,t):f(t)}
      </div>
      ${b()}
    `,rf(),x(t)}function f(e){return`
      <div class="vault-main-layout">
        <div class="vault-folders-col">
          <div class="vault-folders-header">
            <h3 style="font-size: var(--text-lg);">Folders</h3>
            <button class="btn btn--secondary btn--sm" id="btn-create-folder">+ New Folder</button>
          </div>

          ${a?`
            <div class="vault-create-folder mb-lg">
              <input type="text" class="input" id="new-folder-name" placeholder="Folder name..." style="max-width: 260px;" />
              <button class="btn btn--primary btn--sm" id="btn-save-folder">Create</button>
              <button class="btn btn--ghost btn--sm" id="btn-cancel-folder">Cancel</button>
            </div>
          `:``}

          <div class="vault-folders-grid">
            ${r.map(e=>{let t=l(e.id).length;return`
                <div class="vault-folder-card card card--interactive" data-folder="${e.id}">
                  <img src="${ef}" class="vault-folder-icon" alt="folder" />
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

        ${h()}
      </div>
    `}function h(){let e=d.getOwnedPerfumes();function t(e,t){return e.length?`<div class="vault-myperfumes-list">
        ${e.map(e=>{let n,r;if(t===`monAccord`){let t=y(e),i=t?p.find(e=>e.id===t.region):null;n=t?.name||e,r=`<span style="color:${i?.color||`inherit`};">${i?.icon||`•`}</span>`}else{let t=g.find(t=>t.id===e);n=t?`${t.brand} — ${t.name}`:e,r=`<span>✦</span>`}return`<div class="vault-myperfume-chip">
            ${r}<span>${n}</span>
            <button class="vault-myperfume-remove" data-remove="${e}" data-type="${t}">✕</button>
          </div>`}).join(``)}
      </div>`:`<p style="font-size:var(--text-xs);color:var(--text-tertiary);">None added yet.</p>`}function n(e){return o===e?`<div class="vault-myperfumes-input">
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin:0;">Selection opens in popup.</p>
        <button class="btn btn--ghost btn--sm vault-cancel-owned-btn">Cancel</button>
      </div>`:`<button class="btn btn--ghost btn--sm vault-add-owned-btn" data-section="${e}" style="margin-top:var(--space-xs);">+ Add</button>`}let r=_(e);return`
      <div class="vault-myperfumes-col">
        <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-xs);">My Perfumes</h3>
        <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-lg);">Your collection guides all AI recommendations across the app.</p>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">Mon Accord</p>
          ${t(e.monAccord,`monAccord`)}
          ${n(`monAccord`)}
        </div>

        <div class="vault-myperfumes-section">
          <p class="vault-myperfumes-section-label">L'Oréal Luxe</p>
          ${t(e.loreal,`loreal`)}
          ${n(`loreal`)}
        </div>

        ${r?`
          <div class="vault-myperfumes-rec mt-md">
            <p class="vault-myperfumes-rec-label">✦ Based on your collection</p>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;">${r}</p>
          </div>
        `:``}
      </div>
    `}function _(e){let t=e.monAccord||[];if(!t.length)return``;let n=t.map(e=>y(e)).filter(Boolean),r=[...new Set(n.flatMap(e=>e.scentFamily.split(`-`)))],i=m.filter(e=>!t.includes(e.id)&&e.scentFamily.split(`-`).some(e=>r.includes(e))).slice(0,3);return i.length?`Pairs well with: ${i.map(e=>`${p.find(t=>t.id===e.region)?.icon||``} ${e.name}`).join(`, `)}.`:`Your collection spans ${r.slice(0,3).join(`, `)} notes. Explore the Layering Lab to create blends.`}function v(e,t){let n=l(e.id);return`
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
                  ${n.map(e=>{let t=y(e.perfumeId),n=t?p.find(e=>e.id===t.region):null;return`<span class="vault-formula-layer" style="color: ${n?.color||`var(--text-secondary)`};">${n?.icon||`•`} ${e.amount} ${e.unit} ${t?.name||e.perfumeId}</span>`}).join(` + `)}
                </div>
                <div class="vault-formula-actions">
                  <button class="btn btn--ghost btn--sm vault-load-btn" data-id="${t.id}">Load to Lab</button>
                  ${e.id===`default`?`
                    <select class="select vault-move-select" data-id="${t.id}" style="font-size: var(--text-xs); padding: 4px 30px 4px 8px;">
                      <option value="">Move to...</option>
                      ${r.filter(e=>e.id!==`default`).map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
                    </select>
                  `:``}
                  <button class="btn btn--ghost btn--sm vault-delete-btn" data-id="${t.id}" style="color: var(--text-tertiary);">✕</button>
                </div>
              </div>
            `}).join(``)}
        </div>
      `}
    `}function b(){if(!o)return``;let e=d.getOwnedPerfumes();if(o===`monAccord`)return`
        <div class="modal-overlay" id="vault-owned-modal-overlay">
          <div class="modal vault-owned-modal">
            <div class="modal__header">
              <h3 class="modal__title">Add Mon Accord Perfume</h3>
              <button class="modal__close" id="vault-close-owned-modal">✕</button>
            </div>
            <div class="modal__body">
              <p class="vault-owned-modal-subtitle">Choose one of the six regions, then select Spray or Oil.</p>
              <div class="vault-region-grid">
                ${p.map(t=>{let n=m.find(e=>e.region===t.id&&e.format===`spray`),r=m.find(e=>e.region===t.id&&e.format===`oil`);return`
                    <div class="vault-region-card" style="--region-color:${t.color};">
                      <p class="vault-region-card__title">${t.icon} ${t.name}</p>
                      <div class="vault-region-card__actions">
                        ${n?`<button class="btn btn--secondary btn--sm vault-owned-add-btn" data-type="monAccord" data-id="${n.id}" ${e.monAccord.includes(n.id)?`disabled`:``}>💨 Spray ${e.monAccord.includes(n.id)?`✓`:``}</button>`:``}
                        ${r?`<button class="btn btn--secondary btn--sm vault-owned-add-btn" data-type="monAccord" data-id="${r.id}" ${e.monAccord.includes(r.id)?`disabled`:``}>💧 Oil ${e.monAccord.includes(r.id)?`✓`:``}</button>`:``}
                      </div>
                    </div>
                  `}).join(``)}
              </div>
            </div>
          </div>
        </div>
      `;let t=g.filter(t=>!e.loreal.includes(t.id)),n=[...new Set(t.map(e=>e.brand))].sort((e,t)=>e.localeCompare(t)),r=s?t.filter(e=>e.brand===s):[];return`
      <div class="modal-overlay" id="vault-owned-modal-overlay">
        <div class="modal vault-owned-modal">
          <div class="modal__header">
            <h3 class="modal__title">Add L'Oréal Luxe Perfume</h3>
            <button class="modal__close" id="vault-close-owned-modal">✕</button>
          </div>
          <div class="modal__body">
            ${s?`
              <div class="flex" style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
                <p class="vault-owned-modal-subtitle" style="margin:0;">${s}</p>
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
    `}function x(n){e.querySelectorAll(`.vault-folder-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.vault-folder-delete`))return;let n=e.dataset.folder;i=r.find(e=>e.id===n),u()})}),e.querySelectorAll(`.vault-folder-delete`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.delete,i=d.getVault();i.forEach(e=>{e.folderId===n&&(e.folderId=void 0)}),d.set(`vault`,i),r=r.filter(e=>e.id!==n),c(),u()})});let l=e.querySelector(`#btn-create-folder`);l&&l.addEventListener(`click`,()=>{a=!0,u()});let f=e.querySelector(`#btn-save-folder`);f&&f.addEventListener(`click`,()=>{let t=e.querySelector(`#new-folder-name`).value.trim();t&&(r.push({id:`folder-`+Date.now(),name:t}),c(),a=!1,u())});let p=e.querySelector(`#btn-cancel-folder`);p&&p.addEventListener(`click`,()=>{a=!1,u()});let m=e.querySelector(`#btn-back-folders`);m&&m.addEventListener(`click`,()=>{i=null,u()});let h=e.querySelector(`#go-to-lab`);h&&h.addEventListener(`click`,()=>t(`#lab`)),e.querySelectorAll(`.vault-load-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let r=n.find(t=>t.id===e.dataset.id);if(r?.layers){let e=r.layers.map(e=>e.perfumeId).filter(Boolean);sessionStorage.setItem(`labPending`,JSON.stringify(e)),t(`#lab`)}})}),e.querySelectorAll(`.vault-delete-btn`).forEach(e=>{e.addEventListener(`click`,()=>{d.removeFormula(e.dataset.id),u(),window.showToast(`Formula removed from vault.`)})}),e.querySelectorAll(`.vault-move-select`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.value;if(!t)return;let n=d.getVault(),r=n.find(t=>t.id===e.dataset.id);r&&(r.folderId=t,d.set(`vault`,n),u(),window.showToast(`Formula moved to folder.`))})}),e.querySelectorAll(`.vault-add-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o=e.dataset.section,s=null,u()})}),e.querySelectorAll(`.vault-cancel-owned-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o=null,s=null,u()})}),e.querySelectorAll(`.vault-owned-add-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=d.getOwnedPerfumes(),n=e.dataset.type,r=e.dataset.id;t[n].includes(r)||(t[n]=[...t[n],r],d.setOwnedPerfumes(t),window.showToast(`Added to your collection.`)),n===`monAccord`&&(o=null),u()})}),e.querySelectorAll(`.vault-brand-btn`).forEach(e=>{e.addEventListener(`click`,()=>{s=e.dataset.brand,u()})});let g=e.querySelector(`#vault-back-to-brands`);g&&g.addEventListener(`click`,()=>{s=null,u()});let _=e.querySelector(`#vault-close-owned-modal`);_&&_.addEventListener(`click`,()=>{o=null,s=null,u()});let v=e.querySelector(`#vault-owned-modal-overlay`);v&&v.addEventListener(`click`,e=>{e.target.id===`vault-owned-modal-overlay`&&(o=null,s=null,u())}),e.querySelectorAll(`.vault-myperfume-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let{remove:t,type:n}=e.dataset,r=d.getOwnedPerfumes();r[n]=r[n].filter(e=>e!==t),d.setOwnedPerfumes(r),u()})})}u()}function rf(){if(document.getElementById(`vault-styles`))return;let e=document.createElement(`style`);e.id=`vault-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}function af(){let e=d.getInteractions(),t=d.getVault(),n=d.getLikes(),r=d.getProfile();if(e.length===0&&t.length===0)return null;let i={},a={spray:0,oil:0},o=[];t.forEach(e=>{(e.layers||[]).forEach(e=>{let t=m.find(t=>t.id===e.perfumeId);t&&(i[t.region]=(i[t.region]||0)+1,a[t.format]++,o.push({...e,region:t.region,format:t.format,family:t.scentFamily}))})});let s=Object.entries(i).sort(([,e],[,t])=>t-e).map(([e,t])=>({region:e,count:t,data:p.find(t=>t.id===e)})),c=Date.now()-720*60*60*1e3,l=e.filter(e=>e.timestamp>c);e.filter(e=>e.timestamp<=c),t.length;let u=n.length,f=t.filter(e=>e.savedAt>c).length;return{topRegions:s,formatPreference:a.spray>a.oil?`spray-dominant`:a.oil>a.spray?`oil-dominant`:`balanced`,totalFormulas:t.length,totalLikes:u,recentActivity:l.length,engagementLevel:l.length>10?`high`:l.length>3?`medium`:`low`,profile:r,recentSaves:f}}function of(){let e=d.getOwnedPerfumes(),t=[];if(e.monAccord?.length){let n=e.monAccord.map(e=>m.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`Mon Accord owned: ${n.join(`, `)}`)}if(e.loreal?.length){let n=e.loreal.map(e=>g.find(t=>t.id===e)?.name).filter(Boolean);n.length&&t.push(`L'Oréal Luxe owned: ${n.join(`, `)}`)}return t.length?t.join(`
`):`No owned perfumes registered.`}async function sf(){let e=af(),t=d.getVault(),n=d.getProfile();if(!t.length&&!n)return{success:!1,error:`No usage data yet. Create some formulas first!`};let r=t.slice(0,3).map(e=>{let t=(e.layers||[]).map(e=>{let t=m.find(t=>t.id===e.perfumeId);return t?`${e.amount} ${e.unit} ${t.name}`:``}).filter(Boolean).join(` + `);return`"${e.name}": ${t}`}).join(`
`),i=await vd(`Based on this user's fragrance journey, suggest a fresh remix.

USER PROFILE: ${n?`${n.archetypeName} (${n.primaryFamilies?.join(`, `)})`:`No formal profile`}

USER'S OWNED PERFUMES (these are their starting point — prioritize combinations using these):
${of()}

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
}`);if(i.success)try{let e=i.text.trim();e.startsWith("```")&&(e=e.replace(/^```(?:json)?\n?/,``).replace(/\n?```$/,``));let t=JSON.parse(e);return d.addInteraction({type:`remix-generated`,name:t.remixName}),{success:!0,remix:t}}catch{return{success:!0,remix:{remixName:`AI Remix`,layers:[],inspiration:i.text,newElement:``,scentDescription:``}}}return{success:!1,error:i.text}}function cf(){let e=d.getInteractions().filter(e=>e.type===`like`&&e.timestamp>Date.now()-720*60*60*1e3),t={};return e.forEach(e=>{t[e.formulaId]=(t[e.formulaId]||0)+1}),_.sort((e,n)=>n.likes+(t[n.id]||0)*10-(e.likes+(t[e.id]||0)*10)).slice(0,10)}var lf=`/mon_accord/assets/duyguozaslan-Je_2yn9O.png`,uf=[{id:`sp-1`,author:`ScentExplorer`,date:Date.now()-864e5*3,title:`My go-to date night combo`,topicType:`trending`,topicRef:`cf-4`,content:`Velvet Rose is absolutely stunning for evenings out. The oud-citrus balance is perfect — not too heavy, not too light. My partner always compliments this one!`,likes:18,comments:[{id:`sc-1`,author:`RoseAddict`,date:Date.now()-864e5*2,text:`Totally agree! I add an extra drop of the oil for more longevity.`,replies:[{id:`sc-1r1`,author:`ScentExplorer`,date:Date.now()-864e5,text:`Great tip, I'll try that next time!`},{id:`sc-1r2`,author:`VelvetQueen`,date:Date.now()-864e5*.5,text:`The oil trick really does work — I noticed at least 2 extra hours of longevity with it.`,replies:[]}]},{id:`sc-2`,author:`NordicNose`,date:Date.now()-864e5,text:`Have you tried mixing it with a Scandinavian spray? The contrast is amazing.`,replies:[{id:`sc-2r1`,author:`ScentExplorer`,date:Date.now()-864e5*.8,text:`Not yet but that sounds like an interesting idea! Warm + cool could be really unique.`,replies:[]},{id:`sc-2r2`,author:`LayeringPro`,date:Date.now()-864e5*.3,text:`I do this combo regularly. The birch from Scandinavia really grounds the rose beautifully.`,replies:[]}]}]},{id:`sp-2`,author:`MinimalistMusk`,date:Date.now()-864e5*5,title:`Best office-safe layering?`,topicType:`free`,topicLabel:`Office Fragrances`,content:`Looking for recommendations on subtle combinations that work in a professional setting. I love the Zen Garden combo but wondering if there are other options that project softly.`,likes:12,comments:[{id:`sc-3`,author:`CorporateChic`,date:Date.now()-864e5*4,text:`Azure Morning is my daily driver for work. Very clean and inoffensive.`,replies:[{id:`sc-3r1`,author:`MinimalistMusk`,date:Date.now()-864e5*3,text:`Oh that sounds perfect, adding it to my cart!`},{id:`sc-3r2`,author:`FreshFan`,date:Date.now()-864e5*2,text:`Second this. Mediterranean spray + Scandinavian oil is chef's kiss for office.`}]},{id:`sc-3b`,author:`QuietScenter`,date:Date.now()-864e5*3,text:`I go with just 2 sprays of East Asia spray. The green tea and bamboo are super subtle but elegant.`,replies:[{id:`sc-3b1`,author:`MinimalistMusk`,date:Date.now()-864e5*2,text:`That's actually brilliant — single region, minimal projection. Love it.`}]}]},{id:`sp-3`,author:`OudLover`,date:Date.now()-864e5*1,title:`Custom evening blend I created`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-spray`,amount:3,unit:`sprays`},{perfumeId:`southafrica-oil`,amount:2,unit:`drops`}],content:`I've been experimenting with this bold combo for a while. The saffron-oud meets vanilla-coffee and it's absolutely divine for cold winter nights. Who else loves intense combos?`,likes:24,comments:[{id:`sc-4`,author:`AmberAddict`,date:Date.now()-864e5*.8,text:`This is EXACTLY what I've been looking for! The warmth from both regions must be incredible together.`,replies:[{id:`sc-4r1`,author:`OudLover`,date:Date.now()-864e5*.5,text:`It really is — the saffron opens bright and then the rooibos-vanilla base just wraps around you.`}]},{id:`sc-5`,author:`NightOwlScents`,date:Date.now()-864e5*.6,text:`Have you tried adding a single drop of Scandinavian oil to cool it down slightly? Adds an interesting twist.`,replies:[]}]},{id:`sp-4`,author:`FloralFusion`,date:Date.now()-864e5*2,title:`Spring cherry blossom layering`,topicType:`combination`,topicCombination:[{perfumeId:`eastasia-spray`,amount:2,unit:`sprays`},{perfumeId:`mediterranean-oil`,amount:2,unit:`drops`}],content:`Cherry blossom from East Asia with neroli and fig from Mediterranean oil creates this gorgeous springtime aura. Light, feminine, and so uplifting. Perfect for daytime!`,likes:31,comments:[{id:`sc-6`,author:`GardenBreeze`,date:Date.now()-864e5*1.5,text:`This sounds absolutely heavenly! Trying this tomorrow morning.`,replies:[{id:`sc-6r1`,author:`FloralFusion`,date:Date.now()-864e5*1,text:`Let me know how you like it! The fig really brings out the floral notes.`},{id:`sc-6r2`,author:`GardenBreeze`,date:Date.now()-864e5*.4,text:`Update: I LOVE it. Got three compliments at brunch today. This is my new signature.`}]},{id:`sc-7`,author:`PerfumeNovice`,date:Date.now()-864e5*1.2,text:`Would this work well in warm weather? I'm worried about the oil being too heavy in summer.`,replies:[{id:`sc-7r1`,author:`FloralFusion`,date:Date.now()-864e5*.8,text:`It's actually quite light! The Mediterranean oil is more fresh than heavy. Give it a try.`}]}]},{id:`sp-5`,author:`SeasonalSniffer`,date:Date.now()-864e5*4,title:`Summer vs winter layering strategies`,topicType:`free`,topicLabel:`Seasonal Tips`,content:`I've noticed that in summer I prefer spray-only combos (2 regions, light application), while in winter I go heavy on oils with maybe one spray on top. Does anyone else change their approach with seasons?`,likes:19,comments:[{id:`sc-8`,author:`AllSeasonScenter`,date:Date.now()-864e5*3.5,text:`Absolutely! Summer is all about Mediterranean + East Asia for me. Winter I switch to Middle East + South Africa.`,replies:[{id:`sc-8r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*3,text:`That's almost exactly my rotation! Great minds think alike.`},{id:`sc-8r2`,author:`NordicNose`,date:Date.now()-864e5*2.5,text:`Don't sleep on Scandinavian in summer though — the birch and juniper are so refreshing.`}]},{id:`sc-9`,author:`TropicalVibes`,date:Date.now()-864e5*3,text:`Living in a tropical climate I use light sprays year-round. Oils are too intense in 35°C heat!`,replies:[]},{id:`sc-10`,author:`FourSeasons`,date:Date.now()-864e5*2,text:`I keep a separate shelf for each season. Spring: florals. Summer: citrus. Fall: woody. Winter: spicy-sweet.`,replies:[{id:`sc-10r1`,author:`SeasonalSniffer`,date:Date.now()-864e5*1.5,text:`That level of organization is goals! Do you have a favorite fall combo?`},{id:`sc-10r2`,author:`FourSeasons`,date:Date.now()-864e5*1,text:`Scandinavian spray + Middle East oil. The cedar-oud combination is *chef's kiss* for autumn walks.`}]}]},{id:`sp-6`,author:`GiftGuru`,date:Date.now()-864e5*6,title:`Gifting layering sets — any tips?`,topicType:`trending`,topicRef:`cf-2`,content:`I want to gift a friend a layering combo but I'm not sure how to present it. Anyone wrapped up Mon Accord sets as gifts before? Which combos are crowd-pleasers?`,likes:15,comments:[{id:`sc-11`,author:`ThoughtfulGifter`,date:Date.now()-864e5*5,text:`Mediterranean + East Asia is always a safe bet. Almost everyone loves the freshness.`,replies:[{id:`sc-11r1`,author:`GiftGuru`,date:Date.now()-864e5*4.5,text:`That's what I was leaning towards! Simple and universally appealing.`}]},{id:`sc-12`,author:`WrapQueen`,date:Date.now()-864e5*5,text:`I put the spray + oil in a nice pouch with a card explaining the layering technique. People love it!`,replies:[]}]},{id:`sp-7`,author:`VanillaCloud`,date:Date.now()-864e5*1.5,title:`Gourmand lovers unite — best sweet combos?`,topicType:`trending`,topicRef:`cf-5`,content:`I'm obsessed with Cocoa Cloud but looking for more sweet, cozy combinations. Who else here loves gourmand-leaning layering? Drop your favourites!`,likes:22,comments:[{id:`sc-13`,author:`SweetTooth`,date:Date.now()-864e5*1.2,text:`Cocoa Cloud is my absolute favourite! I also add 1 drop of Middle East oil on top for a rich amber-vanilla twist.`,replies:[{id:`sc-13r1`,author:`VanillaCloud`,date:Date.now()-864e5*1,text:`Oh that sounds amazing, the oud would add so much depth!`},{id:`sc-13r2`,author:`GourmandQueen`,date:Date.now()-864e5*.8,text:`Can confirm this works beautifully. The saffron note from Middle East pairs perfectly with the cocoa.`,replies:[]}]},{id:`sc-14`,author:`CozyNights`,date:Date.now()-864e5*1,text:`Try South America spray + South Africa oil + a single East Asia oil drop. Tonka-vanilla-cherry blossom is heavenly.`,replies:[{id:`sc-14r1`,author:`VanillaCloud`,date:Date.now()-864e5*.5,text:`Three layers! That's ambitious. Adding it to my list to try this weekend.`}]}]},{id:`sp-8`,author:`NoseTrainer`,date:Date.now()-864e5*3.5,title:`How I trained my nose for layering`,topicType:`free`,topicLabel:`Tips & Guides`,content:`When I started layering I couldn't tell the difference between combos. Here's what helped: start with just ONE spray and ONE oil. Wear it for a full day. Next day, swap one layer. After 2 weeks you'll notice nuances you never imagined!`,likes:34,comments:[{id:`sc-15`,author:`BeginnerSniffer`,date:Date.now()-864e5*3,text:`This is exactly what I needed! I've been overwhelmed trying 3-layer combos from the start.`,replies:[{id:`sc-15r1`,author:`NoseTrainer`,date:Date.now()-864e5*2.8,text:`Start simple! Mediterranean spray + Scandinavian oil is a great first combo. Very distinct notes.`},{id:`sc-15r2`,author:`ScentExplorer`,date:Date.now()-864e5*2.5,text:`Agreed. I started the same way and now I can pick apart 4-layer combos no problem.`}]},{id:`sc-16`,author:`OlfactoryJourney`,date:Date.now()-864e5*2.5,text:`Another tip: smell coffee beans between testing different combos. It resets your nose.`,replies:[]},{id:`sc-17`,author:`FragranceNerd`,date:Date.now()-864e5*2,text:`I keep a scent journal — I write down what I smell at 0min, 1hr, 4hr, and 8hr. Game changer for understanding how layers evolve.`,replies:[{id:`sc-17r1`,author:`NoseTrainer`,date:Date.now()-864e5*1.5,text:`The journal idea is brilliant! I should start doing that too.`}]}]},{id:`sp-9`,author:`MidnightRose`,date:Date.now()-864e5*.5,title:`Amber Veil is the new obsession`,topicType:`combination`,topicCombination:[{perfumeId:`middleeast-oil`,amount:2,unit:`drops`},{perfumeId:`southamerica-spray`,amount:2,unit:`sprays`},{perfumeId:`scandinavian-oil`,amount:1,unit:`drops`}],content:`Just tried this three-layer combo and I'm speechless. The Arabian amber opens rich and warm, the South American tonka adds this gorgeous sweetness, and that single drop of Scandinavian oil on top gives it a cool, clean edge. Pure sophistication!`,likes:28,comments:[{id:`sc-18`,author:`LayeringPro`,date:Date.now()-864e5*.4,text:`Three regions in one combo? Bold move. How's the longevity?`,replies:[{id:`sc-18r1`,author:`MidnightRose`,date:Date.now()-864e5*.3,text:`Easily 8+ hours. The oil base really anchors everything.`},{id:`sc-18r2`,author:`OudLover`,date:Date.now()-864e5*.2,text:`Middle East oil as a base is always a longevity cheat code. Great choice.`}]},{id:`sc-19`,author:`NordicNose`,date:Date.now()-864e5*.3,text:`Love the Scandinavian finishing touch. That birch-juniper coolness must cut through the sweetness perfectly.`,replies:[]}]},{id:`sp-10`,author:`WorkdayScenter`,date:Date.now()-864e5*7,title:`My week of different combos — review`,topicType:`free`,topicLabel:`Reviews`,content:`I wore a different trending combo each workday last week: Mon — Azure Morning, Tue — Zen Garden, Wed — Golden Hour, Thu — Forest Ceremony, Fri — Velvet Rose. Here's my ranking: Velvet Rose > Azure Morning > Zen Garden > Golden Hour > Forest Ceremony. Friday combo got 4 compliments!`,likes:21,comments:[{id:`sc-20`,author:`CorporateChic`,date:Date.now()-864e5*6.5,text:`Velvet Rose for WORK? That's brave! I usually save that for evenings.`,replies:[{id:`sc-20r1`,author:`WorkdayScenter`,date:Date.now()-864e5*6,text:`I went light — just 1 spray + 1 drop instead of the full recommended amount. Keeps it office-appropriate.`},{id:`sc-20r2`,author:`MinimalistMusk`,date:Date.now()-864e5*5.5,text:`Smart approach! Half-dosing heavier combos is underrated.`}]},{id:`sc-21`,author:`AllSeasonScenter`,date:Date.now()-864e5*6,text:`Azure Morning on Monday is perfect — fresh and energizing to start the week. I do the same!`,replies:[{id:`sc-21r1`,author:`WorkdayScenter`,date:Date.now()-864e5*5,text:`Right?! It's like a morning espresso in fragrance form.`}]}]}];function df(){let e=d.getPosts();if(!e.length)e=uf,d.setPosts(e);else{let t=new Set(e.map(e=>e.id)),n=uf.filter(e=>!t.has(e.id));n.length&&(e=[...e,...n],d.setPosts(e))}return e}function ff(e,t){let n=cf(),r=d.getProfile(),i=`likes`,a=null,o=!1,s=null,c=`community_daily_suggestion`,l=new Date().toISOString().slice(0,10),u=null;try{u=JSON.parse(sessionStorage.getItem(c)||`null`)}catch{}let f=u?.date===l?u.remix:null,h=!f;function v(e){if(!r)return Math.floor(Math.random()*40)+30;let t=50,n=r.primaryFamilies||[];return(e.layers||[]).forEach(e=>{let i=y(e.perfumeId);i&&(i.scentFamily.split(`-`).forEach(e=>{n.includes(e)&&(t+=12)}),r.recommendedRegions?.includes(i.region)&&(t+=8))}),Math.min(t,98)}let b=n.map(e=>({...e,matchPercent:v(e)}));function x(){let e=[...b];return i===`likes`?e.sort((e,t)=>(t.likes||0)-(e.likes||0)):i===`match`?e.sort((e,t)=>t.matchPercent-e.matchPercent):i===`newest`&&e.sort((e,t)=>t.id>e.id?1:-1),e}function S(){let t=x(),n=df(),r=a?n.find(e=>e.id===a):null;e.innerHTML=`
      <div class="page__container">
        <!-- ═══ TRENDING SECTION ═══ -->
        <div class="community-top-grid">
          <div class="community-panel">
            <div class="community-panel-header">
              <h3 class="community-panel-title">Trending Combinations</h3>
              <div class="community-sort">
                <button class="community-sort-btn ${i===`likes`?`community-sort-btn--active`:``}" data-sort="likes">Popular</button>
                <button class="community-sort-btn ${i===`match`?`community-sort-btn--active`:``}" data-sort="match">For You</button>
                <button class="community-sort-btn ${i===`newest`?`community-sort-btn--active`:``}" data-sort="newest">New</button>
              </div>
            </div>
            <div class="community-trending-list">
              ${t.map((e,t)=>{let n=d.isLiked(e.id),r=(e.likes||0)+(n?1:0);return`
                <div class="community-trending-item" data-id="${e.id}">
                  <div class="community-trending-rank">${t+1}</div>
                  <div class="community-trending-content">
                    <div class="community-trending-top">
                      <h4 class="community-trending-name">${e.name}</h4>
                    </div>
                    <div class="community-trending-layers">
                      ${(e.layers||[]).map(e=>{let t=y(e.perfumeId),n=t?p.find(e=>e.id===t.region):null;return`<span style="color: ${n?.color||`var(--text-tertiary)`};">${n?.icon||``} ${t?.name||``}</span>`}).join(` <span style="color: var(--text-tertiary);">+</span> `)}
                    </div>
                  </div>
                  <div class="community-trending-meta">
                    <span class="community-trending-match" style="color: ${e.matchPercent>70?`#4CAF50`:e.matchPercent>50?`var(--accent)`:`var(--text-tertiary)`};">${e.matchPercent}% match</span>
                    <button class="community-like-btn ${n?`community-like-btn--active`:``}" data-like-formula="${e.id}">
                      ${n?`♥`:`♡`} ${r}
                    </button>
                    <button class="btn btn--ghost btn--sm community-vault-btn" data-vault-formula="${e.id}">+ Vault</button>
                  </div>
                </div>
              `}).join(``)}
            </div>
          </div>

          <!-- Right Column: Today's Selection + Duygu's Choice -->
          <div class="community-right-col">
            <div class="community-panel community-panel--selection">
              <div class="community-panel-header">
                <h3 class="community-panel-title">✦ Today's Selection</h3>
              </div>
              <div id="suggestion-container">
                ${pf(f,h)}
              </div>
            </div>

            <!-- Duygu's Choice -->
            <div class="community-panel community-duygu-choice">
              <div class="community-panel-header">
                <h3 class="community-panel-title">Duygu's Choice</h3>
              </div>
              <div class="duygu-card">
                <div class="duygu-card__photo-wrap">
                  <img src="${lf}" alt="Duygu Özaslan" class="duygu-card__photo" />
                </div>
                <p class="duygu-card__name">Duygu Özaslan</p>
                <p class="duygu-card__role">Influencer</p>
                <p class="duygu-card__quote">"Cherry blossom and fig together feel like a spring garden by the sea — feminine, luminous, and unforgettable."</p>
                <div class="duygu-card__combo">
                  <div class="duygu-card__layer">
                    <span style="color: ${p.find(e=>e.id===`eastasia`)?.color||`#888`};">${p.find(e=>e.id===`eastasia`)?.icon||``}</span>
                    <span>East Asia — Spray</span>
                    <span class="duygu-card__amount">2 sprays</span>
                  </div>
                  <div class="duygu-card__layer">
                    <span style="color: ${p.find(e=>e.id===`mediterranean`)?.color||`#888`};">${p.find(e=>e.id===`mediterranean`)?.icon||``}</span>
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

          ${o?C(t):``}

          <div class="community-discussion-layout">
            <!-- Post List (left) -->
            <div class="community-post-list">
              ${n.length===0?`<p style="color:var(--text-tertiary);font-size:var(--text-sm);padding:var(--space-lg);">No posts yet. Be the first to share!</p>`:n.map(e=>`
                  <div class="community-post-item ${a===e.id?`community-post-item--active`:``}" data-post-id="${e.id}">
                    <div class="community-post-item__top">
                      <span class="community-post-item__author">${e.author}</span>
                      <span class="community-post-item__date">${A(e.date)}</span>
                    </div>
                    <h4 class="community-post-item__title">${e.title}</h4>
                    <div class="community-post-item__bottom">
                      <span class="community-post-item__topic">${D(e)}</span>
                      <span class="community-post-item__stats">♥ ${e.likes||0} · ${k(e)} comments</span>
                    </div>
                  </div>
                `).join(``)}
            </div>

            <!-- Post Detail (right) -->
            <div class="community-post-detail">
              ${r?T(r):`
                <div class="community-post-empty">
                  <p>Select a post to view</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `,mf(),M(t,n)}function C(e){let t=[...m.map(e=>({id:e.id,label:`${p.find(t=>t.id===e.region)?.icon||``} ${e.name} (${e.format})`,group:`Mon Accord`})),...g.map(e=>({id:e.id,label:`${e.brand} — ${e.name}`,group:`L'Oreal Luxe`}))];return`
      <div class="community-new-post-form">
        <div class="input-group">
          <label class="input-label">Title</label>
          <input type="text" class="input" id="new-post-title" placeholder="Give your post a title..." />
        </div>

        <div class="input-group">
          <label class="input-label">Topic Type</label>
          <div class="community-topic-selector">
            <button class="community-topic-btn ${s===`combination`?`community-topic-btn--active`:``}" data-topic="combination">Custom Combination</button>
            <button class="community-topic-btn ${s===`trending`?`community-topic-btn--active`:``}" data-topic="trending">Trending Combo</button>
            <button class="community-topic-btn ${s===`free`?`community-topic-btn--active`:``}" data-topic="free">Free Topic</button>
          </div>
        </div>

        ${s===`combination`?`
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

        ${s===`trending`?`
          <div class="input-group">
            <label class="input-label">Select trending combination</label>
            <select class="select" id="trending-select">
              <option value="">Choose...</option>
              ${_.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
        `:``}

        ${s===`free`?`
          <div class="input-group">
            <label class="input-label">Topic</label>
            <input type="text" class="input" id="free-topic-label" placeholder="What's this about?" />
          </div>
        `:``}

        ${s?`
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
    `}let w=[];function T(e){let t=d.isPostLiked(e.id),n=O(e);return`
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
          <span style="font-size:var(--text-xs);color:var(--text-tertiary);">${k(e)} comments</span>
        </div>
        <div class="divider--gold"></div>
        <div class="community-comments">
          <h4 style="font-size:var(--text-sm);margin-bottom:var(--space-sm);">Comments</h4>
          ${E(e.comments||[],e.id,0)}
          <div class="community-add-comment">
            <input type="text" class="input" id="new-comment-input" placeholder="Write a comment..." style="flex:1;" />
            <button class="btn btn--primary btn--sm" id="btn-add-comment" data-post-id="${e.id}">Post</button>
          </div>
        </div>
      </div>
    `}function E(e,t,n){return!e||!e.length?``:e.map(e=>`
      <div class="community-comment" style="margin-left:${n*20}px;">
        <div class="community-comment__meta">
          <span class="community-comment__author">${e.author}</span>
          <span class="community-comment__date">${A(e.date)}</span>
        </div>
        <p class="community-comment__text">${e.text}</p>
        <button class="community-reply-toggle" data-comment-id="${e.id}" data-post-id="${t}">Reply</button>
        <div class="community-reply-input" id="reply-${e.id}" style="display:none;">
          <input type="text" class="input" placeholder="Write a reply..." style="flex:1;font-size:var(--text-xs);" />
          <button class="btn btn--ghost btn--sm community-reply-submit" data-comment-id="${e.id}" data-post-id="${t}">Post</button>
        </div>
        ${E(e.replies||[],t,n+1)}
      </div>
    `).join(``)}function D(e){if(e.topicType===`trending`){let t=_.find(t=>t.id===e.topicRef);return t?`📈 ${t.name}`:`📈 Trending`}return e.topicType===`combination`?`🧪 Custom Combo`:e.topicLabel||`General`}function O(e){if(e.topicType===`trending`){let t=_.find(t=>t.id===e.topicRef);return t?`<div class="community-post-topic-badge">📈 Trending: ${t.name}</div>`:``}return e.topicType===`combination`&&e.topicCombination?.length?`<div class="community-post-topic-badge">🧪 ${e.topicCombination.map(e=>{let t=y(e.perfumeId);return`${(t?p.find(e=>e.id===t.region):null)?.icon||``} ${t?.name||e.perfumeId} (${e.amount} ${e.unit})`}).join(` + `)}</div>`:e.topicType===`free`&&e.topicLabel?`<div class="community-post-topic-badge">${e.topicLabel}</div>`:``}function k(e){let t=0;function n(e){(e||[]).forEach(e=>{t++,n(e.replies)})}return n(e.comments),t}function A(e){let t=Date.now()-e,n=Math.floor(t/6e4);if(n<60)return`${n}m ago`;let r=Math.floor(n/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}function j(e,t){for(let n of e||[]){if(n.id===t)return n;let e=j(n.replies,t);if(e)return e}return null}function M(n,r){e.querySelectorAll(`.community-sort-btn`).forEach(e=>{e.addEventListener(`click`,()=>{i=e.dataset.sort,S()})}),e.querySelectorAll(`[data-like-formula]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),d.toggleLike(e.dataset.likeFormula),S()})}),e.querySelectorAll(`[data-vault-formula]`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=n.find(t=>t.id===e.dataset.vaultFormula);if(!r)return;let i=(r.layers||[]).map(e=>{let t=y(e.perfumeId),n=t?p.find(e=>e.id===t.region):null;return{...e,name:`${n?.icon||``} ${t?.name||e.perfumeId}`}});Wd({...r,id:`saved-`+r.id,layers:i},{showNameInput:!1})})});let c=e.querySelector(`#btn-load-suggestion`);c&&c.addEventListener(`click`,()=>{f?.layers?.length&&(sessionStorage.setItem(`labPending`,JSON.stringify(f.layers.map(e=>e.perfumeId).filter(e=>y(e)))),t(`#lab`))}),e.querySelectorAll(`[data-post-id]`).forEach(e=>{e.classList.contains(`community-post-item`)&&e.addEventListener(`click`,()=>{a=e.dataset.postId,S()})});let l=e.querySelector(`#btn-new-post`);l&&l.addEventListener(`click`,()=>{o=!0,s=null,w=[],S()}),e.querySelectorAll(`.community-topic-btn`).forEach(e=>{e.addEventListener(`click`,()=>{s=e.dataset.topic,w=[],S()})});let u=e.querySelector(`#combo-add-layer`);u&&u.addEventListener(`click`,()=>{let t=e.querySelector(`#combo-perfume-select`),n=e.querySelector(`#combo-amount`),r=e.querySelector(`#combo-unit`);t.value&&(w.push({perfumeId:t.value,amount:parseInt(n.value)||2,unit:r.value}),m())});function m(){let t=e.querySelector(`#combo-layers`);t&&(t.innerHTML=w.map((e,t)=>{let n=y(e.perfumeId),r=g.find(t=>t.id===e.perfumeId);return`<div class="community-combo-layer"><span>${n?.name||(r?`${r.brand} — ${r.name}`:e.perfumeId)} (${e.amount} ${e.unit})</span><button class="community-combo-remove" data-idx="${t}">✕</button></div>`}).join(``),t.querySelectorAll(`.community-combo-remove`).forEach(e=>{e.addEventListener(`click`,()=>{w.splice(parseInt(e.dataset.idx),1),m()})}))}let h=e.querySelector(`#btn-cancel-post`);h&&h.addEventListener(`click`,()=>{o=!1,s=null,S()});let _=e.querySelector(`#btn-submit-post`);_&&_.addEventListener(`click`,()=>{let t=e.querySelector(`#new-post-title`)?.value.trim(),n=e.querySelector(`#new-post-content`)?.value.trim();if(!t||!n||!s){window.showToast(`Please fill in all fields.`,`error`);return}let r={id:`p-`+Date.now(),author:d.getUsername(),date:Date.now(),title:t,content:n,topicType:s,likes:0,comments:[]};s===`combination`&&(r.topicCombination=[...w]),s===`trending`&&(r.topicRef=e.querySelector(`#trending-select`)?.value||``),s===`free`&&(r.topicLabel=e.querySelector(`#free-topic-label`)?.value.trim()||`General`);let i=df();i.unshift(r),d.setPosts(i),o=!1,s=null,a=r.id,S(),window.showToast(`Post published!`)}),e.querySelectorAll(`[data-like-post]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.likePost,n=d.isPostLiked(t);d.togglePostLike(t);let r=df(),i=r.find(e=>e.id===t);i&&(i.likes=(i.likes||0)+(n?-1:1),d.setPosts(r)),S()})});let v=e.querySelector(`#btn-add-comment`);v&&v.addEventListener(`click`,()=>{let t=e.querySelector(`#new-comment-input`)?.value.trim();if(!t)return;let n=df(),r=n.find(e=>e.id===v.dataset.postId);r&&(r.comments||=[],r.comments.push({id:`c-`+Date.now(),author:d.getUsername(),date:Date.now(),text:t,replies:[]}),d.setPosts(n),S())}),e.querySelectorAll(`.community-reply-toggle`).forEach(t=>{t.addEventListener(`click`,()=>{let n=e.querySelector(`#reply-${t.dataset.commentId}`);n&&(n.style.display=n.style.display===`none`?`flex`:`none`)})}),e.querySelectorAll(`.community-reply-submit`).forEach(t=>{t.addEventListener(`click`,()=>{let n=(e.querySelector(`#reply-${t.dataset.commentId}`)?.querySelector(`input`))?.value.trim();if(!n)return;let r=df(),i=r.find(e=>e.id===t.dataset.postId);if(i){let e=j(i.comments,t.dataset.commentId);e&&(e.replies||=[],e.replies.push({id:`r-`+Date.now(),author:d.getUsername(),date:Date.now(),text:n,replies:[]}),d.setPosts(r),S())}})})}S(),f||(async()=>{let e;if(yd()){let t=await sf();e=t.success&&t.remix?t.remix:N()}else e=N();f=e,h=!1,sessionStorage.setItem(c,JSON.stringify({date:l,remix:e})),S()})();function N(){let e=b.slice().sort((e,t)=>t.matchPercent-e.matchPercent)[0]||n[0];return{remixName:e?.name||`Daily Selection`,layers:e?.layers||[],inspiration:e?.description||`A community-loved formula selected for your profile.`,scentDescription:`Balanced for versatility across day and evening wear.`}}}function pf(e,t){return t?`<div style="padding:var(--space-xl);text-align:center;"><span class="loading-spinner"></span><p style="margin-top:var(--space-md);color:var(--text-tertiary);">Preparing today's suggestion...</p></div>`:e?`
    <div style="padding:var(--space-lg);">
      <div class="ai-response">
        <div class="ai-response__label">✦ ${e.remixName||`AI Suggestion`}</div>
        <div class="ai-response__text">
          ${e.layers?.length?`<div style="margin-bottom:var(--space-md);">${e.layers.map(e=>{let t=y(e.perfumeId);return`<p>${(t?p.find(e=>e.id===t.region):null)?.icon||`•`} ${e.amount} ${e.unit} of <strong>${t?.name||e.perfumeId}</strong></p>`}).join(``)}</div>`:``}
          ${e.inspiration?`<p>${e.inspiration}</p>`:``}
        </div>
      </div>
      <button class="btn btn--primary btn--sm mt-md" id="btn-load-suggestion">Load to Lab</button>
    </div>
  `:`<p style="font-size:var(--text-sm);color:var(--text-tertiary);padding:var(--space-lg);">No suggestion available.</p>`}function mf(){if(document.getElementById(`community-styles`))return;let e=document.createElement(`style`);e.id=`community-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var hf=`/mon_accord/assets/Sephora-Logo-0PIDe1Np.png`,gf=`/mon_accord/assets/Boyner_Logo-CHQxYmdT.jpg`,_f=`/mon_accord/assets/Trendyol_logo-CfMQtlYm.png`,vf=`/mon_accord/assets/hepsiburada-logo-I_Ul_zcU.png`;function yf(e,t){let n=d.getShopCart(),r=[...new Set(d.consumePendingShopCart())],i=[...new Set([...n,...r])],a=i.map(e=>({id:e}));if(r.length){let e=i.length-n.length;window.showToast(`Added ${e} new item${e===1?``:`s`} from your recommended combination.`)}o();function o(){d.setShopCart(a.map(e=>e.id))}function s(){let n=d.getOwnedPerfumes().monAccord||[],r=bf(n,a);e.innerHTML=`
      <div class="page__container">
        <div class="shop-layout">
          <div class="shop-products">
            ${p.map(e=>{let t=m.filter(t=>t.region===e.id&&t.format===`spray`),r=m.filter(t=>t.region===e.id&&t.format===`oil`);return`
                <div class="shop-region-card" style="--region-color: ${e.color}; --region-light: ${e.colorLight};">
                  <div class="shop-region-card__header">
                    <span class="shop-region-card__icon">${e.icon}</span>
                    <h3 class="shop-region-card__name">${e.name}</h3>
                    <p class="shop-region-card__tagline">${e.tagline}</p>
                  </div>
                  <div class="shop-region-card__products">
                    ${[...t,...r].map(e=>{let t=a.find(t=>t.id===e.id),r=n.includes(e.id);return`
                        <div class="shop-product ${t?`shop-product--in-cart`:``} ${r?`shop-product--owned`:``}" data-id="${e.id}">
                          <div class="shop-product__info">
                            <span class="shop-product__format">${e.format===`spray`?`💨 Spray`:`💧 Oil`}</span>
                            <span class="shop-product__name">${e.name}${r?` <span class="shop-owned-badge">Owned</span>`:``}</span>
                          </div>
                          <button class="shop-product__btn ${t?`shop-product__btn--added`:``}" data-id="${e.id}">
                            ${t?`✓ Added`:`+ Add`}
                          </button>
                        </div>
                      `}).join(``)}
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
                ${a.map(e=>{let t=y(e.id),n=p.find(e=>e.id===t.region);return`
                    <div class="shop-cart__item">
                      <div class="shop-cart__item-info">
                        <span style="color: ${n.color};">${n.icon}</span>
                        <span>${t.format===`spray`?`💨`:`💧`} ${t.name}</span>
                      </div>
                      <button class="shop-cart__item-remove" data-id="${t.id}">✕</button>
                    </div>
                  `}).join(``)}
              </div>
              <div class="shop-cart__footer">
                <button class="btn btn--primary w-full" id="btn-confirm-order">Confirm Order ✦</button>
              </div>
            `}

            ${r?`
              <div class="shop-cart__rec">
                <p class="shop-cart__rec-label">✦ Pairs with your collection</p>
                <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6;">${r}</p>
              </div>
            `:``}
          </div>
        </div>
      </div>
    `,Sf(),e.querySelectorAll(`.shop-product__btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=a.findIndex(e=>e.id===n);r>=0?a.splice(r,1):a.push({id:n}),o(),s()})}),e.querySelectorAll(`.shop-cart__item-remove`).forEach(e=>{e.addEventListener(`click`,()=>{a=a.filter(t=>t.id!==e.dataset.id),o(),s()})});let i=e.querySelector(`#btn-confirm-order`);i&&i.addEventListener(`click`,()=>{xf(a,e,t)})}s()}function bf(e,t){if(!e.length)return null;let n=t.map(e=>e.id),r=e.map(e=>y(e)).filter(Boolean),i=[...new Set(r.flatMap(e=>e.scentFamily.split(`-`)))],a=m.filter(t=>!e.includes(t.id)&&!n.includes(t.id)&&t.scentFamily.split(`-`).some(e=>i.includes(e))).slice(0,2);return a.length?`Based on your owned ${r.map(e=>e.name).join(` & `)}: try adding ${a.map(e=>`${p.find(t=>t.id===e.region)?.icon||``} ${e.name}`).join(` or `)}.`:null}function xf(e,t,n){d.clearShopCart();let r=document.createElement(`div`);r.className=`modal-overlay`,r.innerHTML=`
    <div class="modal order-confirmed-modal">
      <button class="modal__close" id="btn-close-retailers" aria-label="Close">✕</button>
      <div class="modal__body order-confirmed-body">
        <div class="order-confirmed-icon">✦</div>
        <h3 class="order-confirmed-title">Now Available</h3>

        <div class="order-retailers">
          <div class="order-retailers__grid">
            <div class="order-retailer-card" aria-label="Sephora">
              <img src="${hf}" alt="Sephora" class="order-retailer-card__logo" />
            </div>
            <div class="order-retailer-card" aria-label="Boyner">
              <img src="${gf}" alt="Boyner" class="order-retailer-card__logo" />
            </div>
            <div class="order-retailer-card" aria-label="Trendyol">
              <img src="${_f}" alt="Trendyol" class="order-retailer-card__logo" />
            </div>
            <div class="order-retailer-card" aria-label="Hepsiburada">
              <img src="${vf}" alt="Hepsiburada" class="order-retailer-card__logo" />
            </div>
          </div>
        </div>

        <button class="btn btn--primary btn--lg" id="btn-go-profile">Go to Profile →</button>
      </div>
    </div>
  `,document.body.appendChild(r),r.querySelector(`#btn-go-profile`).addEventListener(`click`,()=>{r.remove(),n(`#profile`)}),r.querySelector(`#btn-close-retailers`).addEventListener(`click`,()=>{r.remove()}),r.onclick=e=>{e.target===r&&r.remove()}}function Sf(){if(document.getElementById(`shop-styles`))return;let e=document.createElement(`style`);e.id=`shop-styles`,e.textContent=`

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

    .shop-region-card__icon { font-size: 1.3rem; display: block; margin-bottom: 2px; }
    .shop-region-card__name { font-size: var(--text-base); margin-bottom: 1px; }
    .shop-region-card__tagline { font-size: var(--text-xs); color: var(--region-color); font-weight: 500; }

    .shop-region-card__products {
      padding: var(--space-sm);
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      justify-content: flex-start;
    }

    .shop-product {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-xs) var(--space-sm);
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

    .shop-product--owned { background: var(--accent-bg); }
    .shop-owned-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-dark);
      background: var(--accent-bg-hover);
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-full);
      padding: 1px 6px;
      margin-left: 4px;
      vertical-align: middle;
    }

    .shop-cart__rec {
      margin-top: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
    }

    .shop-cart__rec-label {
      font-size: var(--text-xs);
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
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
  `,document.head.appendChild(e)}var Cf=`/mon_accord/assets/hero-5sT3BiRD.png`;function X(e){return new Promise(t=>setTimeout(t,e))}function Z(e,t){if(!e)return X(0);var n=t===void 0?90:t,r=e.getBoundingClientRect().top+window.scrollY-n;return window.scrollTo({top:Math.max(0,r),behavior:`smooth`}),X(700)}function wf(e,t,n){return Math.min(n,Math.max(t,e))}function Tf(e){let t={};for(let n=0;n<e.length;n+=1){let r=e.key(n);r&&(t[r]=e.getItem(r))}return t}function Ef(e,t){e.clear(),Object.entries(t||{}).forEach(([t,n])=>{n!=null&&e.setItem(t,n)})}async function Df(){let e=document.createElement(`div`);e.id=`dt-flash`,e.style.cssText=`
    position:fixed;inset:0;z-index:99994;
    background:rgba(200,169,126,0.07);
    pointer-events:none;opacity:0;
    transition:opacity 0.18s ease;
  `,document.body.appendChild(e),requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.opacity=`1`})),await X(210),e.style.opacity=`0`,setTimeout(()=>e.remove(),230)}async function Of(e){window.location.hash!==e&&Df(),window.location.hash===e&&(window.location.hash=`#_nav`,await X(150)),window.location.hash=e,await X(450)}function Q(e,t,n=2e3){return new Promise(r=>{let i=()=>document.querySelector(e)||(t?document.querySelector(t):null),a=i();if(a){r(a);return}let o=new MutationObserver(()=>{let e=i();e&&(o.disconnect(),clearTimeout(s),r(e))});o.observe(document.body,{childList:!0,subtree:!0});let s=setTimeout(()=>{o.disconnect(),r(document.getElementById(`page-content`)||document.body)},n)})}var kf={username:`Alp`,archetypeName:`The Elegant Minimalist`,description:`You are drawn to understated sophistication - scents that whisper rather than shout. Your olfactory identity is defined by clean precision, refined florals, and the quiet depth of woody bases. You seek harmony, not performance.`,primaryFamilies:[`floral`,`woody`,`citrus`],sillageProfile:`Medium - intimate yet memorable, discovered only in close proximity.`,notePreferences:{loves:[`iris`,`sandalwood`,`bergamot`,`white musk`],explore:[`oud`,`rose`,`vetiver`,`ambergris`],avoid:[`heavy synthetics`,`excessive sweetness`,`dense patchouli`]},recommendedRegions:[`scandinavian`,`mediterranean`,`eastasia`],updatedAt:Date.now()},Af=`monaccord_profile`,jf=`monaccord_quiz_state`,Mf=``,Nf=null,Pf=null,Ff=void 0,If=[{title:`Mon Accord`,run:async()=>(await Of(`#landing`),window.scrollTo({top:0,behavior:`auto`}),await Q(`#hero-section .hero__content`,`#hero-section`,2e3)),duration:3500},{title:`Six World Regions`,run:async()=>{let e=document.querySelector(`#regions-section`);return e&&await Z(e,60),document.querySelector(`.region-card`)||e||document.querySelector(`.page__container`)},duration:4e3},{title:`Spray & Oil Notes`,run:async()=>(document.querySelector(`.notes-popup`)?.remove(),document.querySelector(`.region-format-btn[data-format="spray"]`)?.click(),await X(250),document.querySelector(`.notes-popup`)?.scrollIntoView({behavior:`smooth`,block:`nearest`}),await X(300),document.querySelector(`.notes-popup__inner`)||document.querySelector(`#regions-section`)),duration:4e3},{title:`Take the Quiz`,samePage:!0,run:async()=>{document.querySelector(`.notes-popup`)?.remove();let e=document.querySelector(`#cta-section`);e?e.scrollIntoView({behavior:`smooth`,block:`center`}):window.scrollTo({top:document.body.scrollHeight,behavior:`smooth`}),await X(700);let t=document.querySelector(`#bottom-cta`);return t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),await X(500)),t||document.querySelector(`#cta-section`)||document.querySelector(`.page__container`)},duration:3e3},{title:`Step 1 - Your Name`,run:async()=>{document.querySelector(`.notes-popup`)?.remove(),localStorage.removeItem(jf),window.__retakeQuiz=!0,await Of(`#profile`);let e=await Q(`.quiz-container`,`.page__container`,2500);await X(300);let t=document.querySelector(`#quiz-username`);if(t){t.focus();for(let e of`Alp`)t.value+=e,t.dispatchEvent(new Event(`input`)),await X(120)}return e},duration:2500},{title:`Step 2 - Scent Families`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400);let e=[...document.querySelectorAll(`.quiz-grid--families .quiz-option`)];for(let t of e.slice(0,3))t.click(),await X(280);return document.querySelector(`.quiz-grid--families`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 3 - Perfumes You Love`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(450);let e=[...document.querySelectorAll(`.quiz-option--perfume`)];for(let t of e.slice(0,2))t.click(),await X(220);return document.querySelector(`.quiz-perfume-list`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 4 - Performance`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400);for(let e of[{id:`slider-sillage`,valId:`sillage-val`,target:7},{id:`slider-longevity`,valId:`longevity-val`,target:10},{id:`slider-intensity`,valId:`intensity-val`,target:5}]){let t=document.querySelector(`#`+e.id);t&&(t.value=e.target,t.dispatchEvent(new Event(`input`,{bubbles:!0})),await X(350))}return document.querySelector(`.quiz-sliders`)||document.querySelector(`.quiz-container`)},duration:2500},{title:`Step 5 - Your Personality`,run:async()=>{document.querySelector(`#quiz-next`)?.click(),await X(400),(document.querySelector(`[id="ctx-elegant"]`)||document.querySelector(`.quiz-grid--context .quiz-option`))?.click(),await X(300);let e=document.querySelector(`#quiz-notes`);if(e){e.focus();for(let t of`I love the scent of fresh linen and evening air.`)e.value+=t,e.dispatchEvent(new Event(`input`)),await X(38)}return document.querySelector(`.quiz-grid--context`)||document.querySelector(`.quiz-container`)},duration:5500},{title:`Your Olfactory Profile`,run:async()=>(localStorage.setItem(Af,JSON.stringify(kf)),localStorage.setItem(`monaccord_my_perfumes`,JSON.stringify({monAccord:[`scandinavian-spray`,`eastasia-spray`,`mediterranean-oil`],loreal:[`ysl-libre`,`ysl-black-opium`]})),window.__retakeQuiz=!1,window.dispatchEvent(new Event(`hashchange`)),await X(500),window.scrollTo({top:0,behavior:`auto`}),await Q(`.profile-result`,`.page__container`,3e3),document.querySelector(`.section-header`)||document.querySelector(`.profile-result`)||document.querySelector(`.page__container`)),duration:4e3},{title:`Identity & Preferences`,run:async()=>{let e=document.querySelector(`.profile-overview`),t=document.querySelector(`.profile-details`)||e;return await Z(e),t||document.querySelector(`.profile-result`)},duration:4e3},{title:`Mon Accord Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`)[0],t=e?.previousElementSibling?.previousElementSibling||e,n=e?.querySelector(`.combo-card`)||e;return await Z(t||n,80),n||document.querySelector(`.profile-result`)},duration:4e3},{title:`L'Oreal Luxe Combinations`,run:async()=>{let e=document.querySelectorAll(`.recommendation-grid`),t=e.length>1?e[1]:e[0],n=t?.previousElementSibling?.previousElementSibling||t,r=t?.querySelector(`.combo-card`)||t;return await Z(n||r,80),r||document.querySelector(`.profile-result`)},duration:4e3},{title:`Shop - Build Your Collection`,run:async()=>{let e=document.querySelector(`[data-buy-combo]`);return e?(e.click(),await X(600)):await Of(`#shop`),await Q(`.shop-region-card`,`.shop-layout`,2e3)},duration:4e3},{title:`Add to Cart`,run:async()=>{let e=[...document.querySelectorAll(`.shop-product__btn:not(.shop-product__btn--added)`)];e[0]&&(e[0].click(),await X(180)),e[1]&&(e[1].click(),await X(180));let t=document.querySelector(`.shop-cart`);return t?.scrollIntoView({behavior:`smooth`,block:`center`}),await X(300),t||document.querySelector(`.page__container`)},duration:4e3},{title:`Now Available`,run:async()=>(document.querySelector(`#btn-confirm-order`)?.click(),await X(350),document.querySelector(`.order-confirmed-modal`)||document.querySelector(`.modal-overlay`)||document.querySelector(`.page__container`)),duration:4e3},{title:`The Layering Lab`,run:async()=>{document.querySelector(`.modal-overlay`)?.remove(),await Of(`#lab`),window.scrollTo({top:0,behavior:`auto`}),await X(200);let e=[...document.querySelectorAll(`.lab-add-btn:not(.lab-add-btn--added)`)];return e[0]&&(e[0].click(),await X(200)),e[2]&&(e[2].click(),await X(200)),await X(300),document.querySelector(`#lab-layers`)||document.querySelector(`#lab-add-section`)},duration:5e3},{title:`Virtual Scent Simulation`,samePage:!0,run:async()=>{let e=document.querySelector(`#btn-simulate`);e&&(await Z(e),e.innerHTML=`<span class=”loading-spinner”></span> Simulating...`,e.disabled=!0,await X(1200),e.innerHTML=`✦ Simulate Scent`,e.disabled=!1);let t=document.querySelector(`#simulation-result`);if(!t){t=document.createElement(`div`),t.id=`simulation-result`,t.className=`ai-response mt-lg`;let e=document.querySelector(`#lab-actions`);e?e.insertAdjacentElement(`afterend`,t):document.querySelector(`#lab-layers`)?.appendChild(t)}return t&&(t.style.display=``,t.innerHTML=`
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
        `),t||document.querySelector(`.lab-advisor__form`)||e||document.querySelector(`.page__container`)},duration:5e3},{title:`Save to Vault`,samePage:!0,run:async()=>{let e=await Q(`#btn-save-formula`,`.page__container`,1200);e&&e.id===`btn-save-formula`&&(await Z(e),e.click(),await X(450));let t=await Q(`#save-vault-overlay .modal`,`#save-vault-overlay`,2e3),n=document.querySelector(`#sv-name`);if(n){n.value=``,n.focus();for(let e of`Evening Velvet`)n.value+=e,n.dispatchEvent(new Event(`input`)),await X(55);await X(300)}let r=document.querySelector(`#sv-folder-dropdown`);if(r){let e=[...r.options].find(e=>e.value===`evening`||e.text.toLowerCase().includes(`evening`));e&&(r.value=e.value,r.dispatchEvent(new Event(`change`))),await X(400)}return t||document.querySelector(`#save-vault-overlay`)||document.querySelector(`.page__container`)},duration:4500},{title:`Your Vault`,run:async()=>(document.querySelector(`#sv-confirm`)?.click(),await X(350),await Of(`#vault`),await Q(`.vault-folders-col`,`.page__container`,2e3)),duration:4e3},{title:`My Perfumes`,samePage:!0,run:async()=>{let e=document.querySelector(`.vault-myperfumes-col`);return window.scrollTo({top:0,behavior:`smooth`}),await X(400),e||document.querySelector(`.vault-main-layout`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Trending Combinations`,run:async()=>{await Of(`#community`);let e=document.querySelector(`.duygu-card__photo`);return e&&!e.complete&&await new Promise(t=>{e.onload=t,e.onerror=t,setTimeout(t,3e3)}),await X(200),await Q(`.community-trending-item`,`.community-trending-list`,2e3)},duration:4e3},{title:`Today's Selection`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-panel--selection`);return await Z(e),e||document.querySelector(`.community-top-grid`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Duygu's Choice`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-duygu-choice`);return e?(await Z(e),e):document.querySelector(`.community-right-col`)||document.querySelector(`.page__container`)},duration:4e3},{title:`Community Discussion`,samePage:!0,run:async()=>{let e=document.querySelector(`.community-discussion-section`);return await Z(e,60),document.querySelector(`.community-post-item`)?.click(),await X(300),document.querySelector(`.community-discussion-layout`)||e||document.querySelector(`.page__container`)},duration:4500}],Lf=[2e3,2e3,2e3,2e3,2300,2300,2300,2300,3800,4e3,3500,5500,6500,4e3,3e3,4e3,4500,4500,6e3,2500,3e3,3e3,3e3,5e3,3500,3500];If.forEach((e,t)=>{e.duration=Lf[t]??e.duration});function Rf(){return document.getElementById(`dt-card`)}function zf(){return document.getElementById(`dt-prog`)}function Bf(){return document.getElementById(`dt-cd`)}function Vf(){return document.getElementById(`dt-dots`)}function Hf(){return document.getElementById(`dt-count`)}function Uf(){return document.getElementById(`dt-title`)}function Wf(){return document.getElementById(`dt-next`)}var Gf=24,$=20;function Kf(e){let t=Rf();if(!t)return;let n=window.innerWidth,r=window.innerHeight,i=Gf,a=Math.min(t.offsetWidth||288,n-i*2),o=t.offsetHeight||126,s=e?e.getBoundingClientRect():null;if(!s||(s.width||0)===0||(s.height||0)===0||s.bottom<=0||s.top>=r||s.right<=0||s.left>=n){let e=Math.min(n-i*2,320),t=Math.min(r-i*2,160);s={left:(n-e)/2,top:(r-t)/2,right:(n+e)/2,bottom:(r+t)/2}}let c=s.right-s.left,l=s.bottom-s.top,u=[{placement:`bottom`,x:s.left+(c-a)/2,y:s.bottom+$},{placement:`top`,x:s.left+(c-a)/2,y:s.top-o-$},{placement:`right`,x:s.right+$,y:s.top+(l-o)/2},{placement:`left`,x:s.left-a-$,y:s.top+(l-o)/2},{placement:`bottom-right`,x:s.right-a,y:s.bottom+$},{placement:`bottom-left`,x:s.left,y:s.bottom+$},{placement:`top-right`,x:s.right-a,y:s.top-o-$},{placement:`top-left`,x:s.left,y:s.top-o-$}];function d(e){let t=wf(e.x,i,Math.max(i,n-a-i)),s=wf(e.y,i,Math.max(i,r-o-i));return{placement:e.placement,left:t,top:s,right:t+a,bottom:s+o,clampDelta:Math.abs(e.x-t)+Math.abs(e.y-s)}}function f(e){let t=(e.left+e.right)/2,n=(e.top+e.bottom)/2,r=(s.left+s.right)/2,i=(s.top+s.bottom)/2;return Math.hypot(t-r,n-i)}function p(e){let t=Math.max(e.left,s.left),n=Math.max(e.top,s.top),r=Math.min(e.right,s.right),i=Math.min(e.bottom,s.bottom);return r>t&&i>n?(r-t)*(i-n):0}let m=u.map(e=>{let t=d(e);return{rect:t,score:p(t)*4+f(t)+t.clampDelta*6}}).sort((e,t)=>e.score-t.score)[0];t.dataset.placement=m.rect.placement,t.style.transform=`translate(${Math.round(m.rect.left)}px, ${Math.round(m.rect.top)}px)`}function qf(e){let t=If[e],n=If.length,r=Hf(),i=Uf(),a=Vf(),o=zf(),s=Wf();if(r&&(r.textContent=`${String(e+1).padStart(2,`0`)} / ${String(n).padStart(2,`0`)}`),i&&(i.textContent=t.title),o&&(o.style.width=`${(e+1)/n*100}%`),s&&(s.textContent=e===n-1?`Finish`:`Next`),a){let t=Math.min(n,12),r=Math.max(0,e-Math.floor(t/2));a.innerHTML=Array.from({length:t},(t,n)=>{let i=n+r;return`<span class="dt-dot ${i===e?`dt-dot--active`:i<e?`dt-dot--done`:`dt-dot--pending`}"></span>`}).join(``)}}var Jf=null;function Yf(e){clearInterval(Jf);let t=Bf();if(!t)return;t.style.width=`0%`;let n=Date.now();Jf=setInterval(()=>{let r=Math.min(100,(Date.now()-n)/e*100);t.style.width=r+`%`,r>=100&&clearInterval(Jf)},40)}var Xf=!1,Zf=0,Qf=null;async function $f(e){if(!Xf)return;Zf=e;let t=If[e];qf(e);let n=Date.now();Yf(t.duration);let r;try{r=await t.run()}catch{r=document.getElementById(`page-content`)||document.body}if(!Xf)return;Kf(r);let i=Date.now()-n,a=Math.max(0,t.duration-i);clearTimeout(Qf),Qf=setTimeout(()=>ep(),a)}function ep(){Xf&&(clearTimeout(Qf),Zf>=If.length-1?sp():$f(Zf+1))}function tp(){np(),cp();let e=document.createElement(`div`);e.id=`dt-card`,e.innerHTML=`
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
  `,document.body.appendChild(e),document.getElementById(`dt-skip`).addEventListener(`click`,sp),document.getElementById(`dt-next`).addEventListener(`click`,()=>{clearTimeout(Qf),clearInterval(Jf),ep()})}function np(){document.getElementById(`dt-card`)?.remove(),document.getElementById(`dt-flash`)?.remove()}var rp=Object.values([gf,hf,_f,lf,vf,Cf,ef]),ip=[];function ap(){return Promise.all(rp.filter(e=>typeof e==`string`).map(e=>new Promise(t=>{if(!document.querySelector(`link[rel="preload"][href="${e}"]`)){let t=document.createElement(`link`);t.rel=`preload`,t.as=`image`,t.href=e,document.head.appendChild(t)}let n=new Image;n.onload=t,n.onerror=t,n.src=e,ip.push(n)})))}ap();async function op(){Xf&&sp(),await ap(),Mf=window.location.hash||``,Nf=Tf(localStorage),Pf=Tf(sessionStorage),Ff=window.__retakeQuiz,localStorage.clear(),sessionStorage.clear(),delete window.__retakeQuiz,localStorage.removeItem(Af),Xf=!0,Zf=0,tp(),$f(0)}function sp(){Xf=!1,clearTimeout(Qf),clearInterval(Jf),Ef(localStorage,Nf),Ef(sessionStorage,Pf),Nf=null,Pf=null,Ff===void 0?delete window.__retakeQuiz:window.__retakeQuiz=Ff,Ff=void 0,(Mf||``)!==(window.location.hash||``)&&(window.location.hash=Mf||`#landing`),Mf=``,np()}function cp(){if(document.getElementById(`dt-styles`))return;let e=document.createElement(`style`);e.id=`dt-styles`,e.textContent=`
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
  `,document.head.appendChild(e)}var lp=`modulepreload`,up=function(e){return`/mon_accord/`+e},dp={},fp=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=up(t,n),t in dp)return;dp[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:lp,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},pp=document.getElementById(`app`),mp={"":b,"#landing":b,"#profile":Dd,"#lab":Yd,"#vault":nf,"#shop":yf,"#community":ff};function hp(){return window.location.hash||``}function gp(e){window.location.hash=e}function _p(){let e=hp(),t=mp[e]||b;pp.innerHTML=``,pp.appendChild(f(gp,e));let n=document.createElement(`div`);if(n.className=`page page-enter`,n.id=`page-content`,t(n,gp),pp.appendChild(n),!document.querySelector(`.toast-container`)){let e=document.createElement(`div`);e.className=`toast-container`,e.id=`toast-container`,document.body.appendChild(e)}window.scrollTo({top:0,behavior:`auto`})}window.showToast=function(e,t=`success`){let n=document.getElementById(`toast-container`);if(!n)return;let r=document.createElement(`div`);r.className=`toast toast--${t}`,r.innerHTML=`<span class="toast__message">${e}</span>`,n.appendChild(r),setTimeout(()=>{r.style.animation=`fadeOut 0.3s var(--ease-out) forwards`,setTimeout(()=>r.remove(),300)},3e3)},window.showSettings=function(){let e=document.querySelector(`.modal-overlay`);e&&e.remove();let t=d.getApiKey(),n=document.createElement(`div`);n.className=`modal-overlay`,n.id=`settings-modal`,n.innerHTML=`
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">Settings</h3>
        <button class="modal__close" id="close-settings">✕</button>
      </div>
      <div class="modal__body">
        <div class="input-group mb-lg">
          <label class="input-label">Gemini API Key</label>
          <input type="password" class="input" id="api-key-input" placeholder="Enter your Gemini API key..." value="${t}" />
          <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 4px;">
            Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--accent);">Google AI Studio</a>
          </p>
        </div>
        <div class="input-group">
          <label class="input-label">Profile</label>
          ${d.getProfile()?`<p style="font-size: var(--text-sm); color: var(--text-secondary);">Archetype: <strong>${d.getProfile().archetypeName||`Set`}</strong></p>
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
  `,document.body.appendChild(n),n.querySelector(`#close-settings`).onclick=()=>n.remove(),n.querySelector(`#cancel-settings`).onclick=()=>n.remove(),n.onclick=e=>{e.target===n&&n.remove()},n.querySelector(`#save-settings`).onclick=()=>{let e=n.querySelector(`#api-key-input`).value.trim();d.setApiKey(e),fp(()=>Promise.resolve().then(()=>md).then(e=>e.resetAI()),void 0),window.showToast(`Settings saved!`),n.remove()};let r=n.querySelector(`#reset-profile-btn`);r&&(r.onclick=()=>{[`profile`,`quiz_state`,`vault`,`interactions`,`likes`,`my_perfumes`,`pending_shop_cart`,`shop_cart`,`community_posts`,`post_likes`,`vault_folders`].forEach(e=>d.remove(e)),sessionStorage.clear(),window.showToast(`All data cleared. Starting fresh!`),n.remove(),_p()});let i=n.querySelector(`#settings-demo-btn`);i&&(i.onclick=()=>{n.remove(),typeof window.startDemoTour==`function`&&window.startDemoTour()})},window.startDemoTour=op,window.endDemoTour=sp,window.addEventListener(`hashchange`,_p),_p();