# Mon Accord — Sunum Öncesi Anlatım Rehberi

Bu rehber, web geliştirme ve yapay zeka (LLM) konusunda hiç bilgisi olmayan
birinin, sunum öncesinde okuyup uygulamayla ilgili gelebilecek soruların
büyük çoğunluğuna cevap verebilmesi için yazıldı. Sırayla okumanız yeterli;
en sona da "muhtemel sorular ve cevapları" eklendi.

---

## 1. Mon Accord nedir? (Ürün olarak)

Mon Accord, kullanıcının kendi **parfüm karışımını (formülünü)** oluşturmasına
yardımcı olan bir web uygulaması mock-up'ı (taslak/prototip). Fikir şu:

- Dünyanın 6 farklı bölgesinden (İskandinavya, Doğu Asya, Güney Afrika,
  Akdeniz, Güney Amerika, Orta Doğu) esinlenen 12 parfüm var (her bölgenin
  bir **sprey** bir de **yağ** versiyonu var).
- Kullanıcı bunları "katmanlayarak" (layering) kendine özel bir koku
  yaratabiliyor — örneğin "2 sıkım Akdeniz spreyi + 2 damla Orta Doğu yağı".
- Uygulama, kullanıcının zevkini öğrenip ona uygun karışımları **yapay zeka
  ile önerir**, bu önerileri açıklar, ve kullanıcı bunları kaydedip
  paylaşabilir.

Uygulamanın ana sayfaları:
- **Landing (Ana sayfa):** Tanıtım, bölgelerin/parfümlerin görsel sunumu.
- **Profile Quiz (Profil Anketi):** Kullanıcıya birkaç soru sorulur (hangi
  koku ailelerini sever, hangi parfümleri kullanıyor, ne kadar yoğun koku
  ister vb.). Cevaplar LLM'e gönderilir, LLM kullanıcı için bir "koku
  kimliği / arketip" (örn. "Warm Oriental") üretir.
- **Layering Lab (Karışım Atölyesi):** Kullanıcı parfümleri seçip kendi
  formülünü oluşturur; isterse LLM'den o anki ruh haline/ortama göre öneri
  ister, ya da seçtiği karışımın "kokusunun zaman içindeki gelişimini"
  (ilk koku - orta koku - dip koku) LLM'e simüle ettirir.
- **Vault (Kasa):** Kaydedilen formüllerin listesi.
- **Shop (Mağaza):** Sepet/satın alma akışının mock-up'ı.
- **Community (Topluluk):** Başka kullanıcıların paylaştığı formüller;
  LLM, "bu formül senin profiline neden uyar/uymaz" diye açıklama üretir.

> Önemli: Bu bir **mock-up**. Gerçek bir e-ticaret/ödeme altyapısı yok;
> amaç konsepti ve deneyimi göstermek.

---

## 2. "Web uygulaması" ne demek, bu nasıl çalışıyor?

Hiç bilmeyen biri için en temel ayrım:

- **Frontend (ön yüz):** Kullanıcının tarayıcıda gördüğü ve tıkladığı her şey
  (butonlar, sayfalar, görseller). Mon Accord'da bu, düz **JavaScript** ile
  yazılmış — yani React/Vue gibi büyük bir "framework" kullanılmıyor, sayfa
  içerikleri doğrudan kodla (HTML şablonları) oluşturuluyor.
- **Backend (arka yüz / sunucu):** Genelde veritabanı, kullanıcı hesapları,
  güvenlik gibi işleri yapan taraf. Bu uygulamada klasik bir backend yok;
  onun yerine iki basit parça var:
  1. Tarayıcının kendi hafızası (**localStorage**) — kullanıcının profili,
     kaydettiği formüller, beğenileri vs. kullanıcının kendi
     bilgisayarında/tarayıcısında saklanıyor. Sunucuda bir veritabanı yok.
  2. Bir **Cloudflare Worker** — sadece yapay zekaya (Gemini'ye) güvenli
     şekilde istek atmaya yarayan, çok küçük bir "aracı sunucu". Bunu
     aşağıda Bölüm 4'te detaylandırıyoruz.

**Sayfalar arası geçiş nasıl oluyor?**
Adres çubuğundaki `#profile`, `#lab`, `#vault` gibi parçalar (URL "hash"i)
hangi sayfanın gösterileceğini belirliyor (`src/main.js` içindeki basit bir
yönlendirici/router bunu yönetiyor). Sayfa yenilenmeden, JavaScript ekranın
içeriğini değiştiriyor — buna **SPA (Single Page Application / tek sayfa
uygulama)** denir.

**Uygulama nerede barınıyor (deploy)?**
- Frontend, **GitHub Pages** üzerinde statik bir site olarak yayınlanıyor
  (`npm run deploy` ile `dist` klasörü GitHub Pages'e yükleniyor).
- Yapay zeka isteklerini yöneten Cloudflare Worker ise ayrı, küçük bir
  sunucu olarak Cloudflare üzerinde çalışıyor.

---

## 3. LLM nedir? (En temelden)

**LLM (Large Language Model / Büyük Dil Modeli)**, çok büyük miktarda metinle
eğitilmiş, kendisine yazılan bir metne (**prompt**) karşılık anlamlı, akıcı
bir metin **üretebilen** bir yapay zeka modelidir. ChatGPT, Gemini, Claude
gibi ürünlerin arkasındaki teknoloji budur.

Basitçe: Siz bir soru/talimat yazarsınız (prompt), model de bunun "devamı"
olacak en uygun metni tahmin ederek üretir. Doğru talimatlarla (prompt
mühendisliği) modelin **belirli bir formatta, belirli bir kişilikle**
cevap vermesini sağlayabilirsiniz.

**Mon Accord hangi LLM'i kullanıyor?**
Google'ın **Gemini** modelini (özellikle `gemini-3.1-flash-lite` — hızlı ve
ucuz bir versiyon) kullanıyor. Bu model, Google'ın sunucularında çalışıyor;
biz sadece internet üzerinden ona istek gönderip cevap alıyoruz (bir
**API** üzerinden).

**API ne demek?**
API (Application Programming Interface), iki yazılımın birbiriyle
"konuşmasını" sağlayan bir arayüz/kapı. Bizim uygulamamız Gemini'nin
API'sine "şu bilgileri ver, bana bu formatta bir cevap üret" diye istek
gönderiyor, Gemini de cevabı geri yolluyor.

---

## 4. Uygulama LLM'e nasıl bağlanıyor? (Mimari)

Burası teknik soruların en sık geldiği yer, dikkatli okuyun.

```
Kullanıcının     →   Cloudflare Worker   →   Google Gemini API
Tarayıcısı            (aracı/proxy)              (gerçek LLM)
   (Frontend)         API anahtarını gizler
```

**Neden direkt tarayıcıdan Gemini'ye istek atılmıyor?**
Çünkü Gemini'yi kullanmak için gizli bir **API anahtarı (API key)**
gerekiyor — bu, bir tür şifre. Eğer bu anahtarı doğrudan tarayıcıda
çalışan kodun içine koysaydık, herkes tarayıcının "kaynak kodunu" görüp
anahtarı çalabilir, kendi işine kullanabilir (ve bizim hesabımıza fatura
çıkarabilir). Bunu engellemek için araya bir **Cloudflare Worker**
koyduk — bu, anahtarı sadece kendi üzerinde (sunucu tarafında, gizli
olarak) tutan, küçük bir aracı sunucu.

Akış şöyle (`src/services/ai-engine.js` ve `cloudflare-worker/worker.js`):

1. Kullanıcı bir özelliği tetikler (örn. "Bana öneri ver" butonuna basar).
2. Frontend kodu, isteği **kendi sunucu anahtarı olmadan**, sadece paylaşılan
   bir "Worker Token" ile Cloudflare Worker'a gönderir.
3. Worker şu kontrolleri yapar (güvenlik katmanları):
   - Token doğru mu? (yanlışsa reddeder)
   - Bu IP adresi çok sık istek atıyor mu? (dakikada limit var — kötüye
     kullanımı/aşırı maliyeti önlemek için)
   - İstek çok büyük mü? (gereksiz/zararlı yük göndermeyi önlemek için)
   - Sadece izinli adreslerden (CORS: GitHub Pages, localhost) gelen
     istekleri kabul eder.
4. Tüm kontroller geçerse, Worker kendi sakladığı **gizli** Gemini API
   anahtarıyla Google'a isteği iletir.
5. Gemini'nin cevabı aynı yoldan geri, kullanıcının tarayıcısına ulaşır.

Yani: **API anahtarı asla tarayıcıya / kullanıcıya görünmüyor**, sadece
Cloudflare'in sunucusunda duruyor. Bu, gerçek hayatta yapay zeka entegre
eden web uygulamalarının standart ve güvenli bir yapısıdır.

**Yerel geliştirme (local dev) farkı:** Geliştirme sırasında (henüz
Worker kurulmamışken) uygulama, kullanıcının kendi tarayıcısına girdiği
bir API anahtarını (Ayarlar > kendi Gemini anahtarınızı) kullanarak da
çalışabilir — ama bu sadece test/geliştirme amaçlı, canlıda (production)
kullanılan yöntem Worker üzerinden gidendir.

---

## 5. LLM'den tam olarak ne isteniyor? (Uygulamadaki kullanım yerleri)

LLM'e her zaman iki şey gönderilir:
- **Sistem talimatı (system instruction):** Modelin "kimliğini" belirler.
  Mon Accord'da bu, modele "Sen Mon Accord'un parfüm uzmanı danışmanısın,
  şu 12 parfümü ve katmanlama mantığını biliyorsun, üslubun sofistike ve
  sıcak olsun" der. Bu talimat her istekte sabit kalır.
- **Prompt (asıl istek):** Kullanıcının o anki durumuna özel bilgi
  (anket cevapları, seçtiği parfümler, ruh hali vb.) ve modelden
  istenen **çıktı formatı** (genelde belirli alanları olan bir JSON).

Uygulamada LLM'in kullanıldığı 5 ana yer:

| Özellik | Nerede | Ne giriyor | Ne çıkıyor |
|---|---|---|---|
| **Koku Profili Oluşturma** | Profile Quiz | Anket cevapları (sevdiği koku aileleri, sahip olduğu parfümler, yoğunluk tercihi) | Kullanıcının "arketipi" (örn. Warm Oriental), açıklaması, önerilen bölgeler, imza karışımı — JSON formatında |
| **Bağlamsal Öneri** | Layering Lab | Ruh hali, ortam, sezon, günün saati, istenen yoğunluk + kullanıcının profili/sahip olduğu parfümler | Önerilen formül (hangi parfümden kaç sıkım/damla), neden uyduğu, kokunun nasıl olacağına dair betimleme |
| **Koku Simülasyonu** | Layering Lab | Seçilen formülün katmanları (notaları ile) | Kokunun zaman içindeki gelişimi: "ilk 15 dk", "30dk-2sa", "2sa+" şeklinde 3 aşamalı betimleme |
| **Remix Önerisi** | Vault/Trends | Kullanıcının geçmiş formülleri, profili, kullanım eğilimleri | Yeni bir "remix" formül önerisi — alışkanlıklarına benzer ama yeni bir bölge/nota katan |
| **Topluluk Formülü Açıklama** | Community | Bir topluluk formülü + kullanıcının profili | "Bu formül sana neden uyar/uymaz" şeklinde 2-3 cümlelik açıklama |

Bütün bu istekler `src/services/` klasöründeki dosyalarda toplanıyor:
`profile-engine.js`, `contextual-advisor.js`, `learning-engine.js`,
`collective-intel.js` — hepsi de tek bir ortak fonksiyonu
(`generateAIResponse`, `ai-engine.js` içinde) çağırıyor.

**LLM'den hep JSON istemenin sebebi:** Modelin ürettiği metni uygulamanın
otomatik olarak okuyup ekrana güzel kartlar/butonlar şeklinde
basabilmesi için. Yani kullanıcı düz bir "sohbet" görmüyor, model
arka planda yapılandırılmış veri üretiyor, uygulama bu veriyi alıp
kendi tasarımıyla gösteriyor.

---

## 6. LLM çalışmazsa / yoksa ne olur?

Bu önemli bir tasarım detayı: Eğer Gemini'den cevap gelmezse (internet
sorunu, rate limit, anahtar sorunu vb.), uygulama **çökmüyor**. Her
LLM çağrısının bir **fallback (yedek plan)** mantığı var:

- Bağlamsal öneri çalışmazsa, ruh haline/sezona göre **önceden yazılmış,
  hazır bir formül** gösterilir ("Golden Dusk", "Morning Clarity" gibi).
- Profil oluşturma başarısız olursa, anket cevaplarına göre basit
  kurallarla (if/else mantığıyla) bir profil tahmin edilir.
- Koku simülasyonu başarısız olursa, formüldeki parfümlerin zaten bilinen
  notalarından basit bir cümle kurulur.

Bu sayede demo/sunum sırasında internet ya da API sorunu olsa bile
uygulama "boş ekran" göstermez, kullanıcı deneyimi kesintisiz kalır.

---

## 7. Sözlük (Terimler)

- **Frontend:** Kullanıcının tarayıcıda gördüğü arayüz/kod.
- **Backend:** Sunucu tarafında çalışan, veri/iş mantığını yöneten kısım.
- **API:** İki sistemin birbirine istek gönderip cevap aldığı arayüz.
- **API anahtarı (API key):** Bir servisi kullanmak için gereken gizli şifre.
- **LLM:** Metin üreten büyük yapay zeka dil modeli (örn. Gemini, ChatGPT).
- **Prompt:** LLM'e gönderilen, ne yapmasını istediğimizi anlatan metin.
- **Sistem talimatı:** LLM'in genel "kişiliğini"/rolünü belirleyen sabit talimat.
- **Proxy / aracı sunucu:** İsteği doğrudan değil, araya girip ileten sunucu
  (burada: Cloudflare Worker — API anahtarını gizlemek için kullanılıyor).
- **Rate limit:** Belirli bir sürede yapılabilecek istek sayısının
  sınırlanması (kötüye kullanımı/maliyeti önlemek için).
- **CORS:** Hangi web adreslerinin bu sunucuya istek atabileceğini
  sınırlayan tarayıcı güvenlik kuralı.
- **localStorage:** Tarayıcının, kullanıcıya özel verileri (sunucuya
  göndermeden) kendi bilgisayarında sakladığı küçük bir depo.
- **SPA (Single Page Application):** Sayfa yenilenmeden, JavaScript ile
  içeriğin değiştiği web uygulaması türü.
- **JSON:** Verinin "anahtar: değer" şeklinde, hem insan hem de program
  tarafından okunabilir basit bir formatı.
- **Deploy / Yayına alma:** Kodu, kullanıcıların erişebileceği canlı bir
  adrese yüklemek.

---

## 8. Muhtemel sorular ve hazır cevaplar

**S: Uygulamanın bir veritabanı var mı?**
C: Klasik anlamda hayır. Kullanıcı verileri (profil, kaydedilen formüller,
beğeniler) doğrudan kullanıcının kendi tarayıcısında (`localStorage`)
tutuluyor. Sunucu tarafında sadece yapay zeka isteklerini yöneten küçük
bir Cloudflare Worker var.

**S: Yapay zekayı biz mi eğittik?**
C: Hayır. Google'ın hazır, eğitilmiş Gemini modelini kullanıyoruz. Biz
modeli eğitmiyoruz; ona doğru talimatları (prompt) vererek, parfüm
alanına özel, istediğimiz formatta cevaplar üretmesini sağlıyoruz. Buna
**prompt engineering** denir, model eğitimi değildir.

**S: API anahtarımız çalınabilir mi?**
C: Hayır, çünkü anahtar tarayıcıya hiç gönderilmiyor; sadece Cloudflare
Worker'ın gizli ortam değişkeninde duruyor. Tarayıcı yalnızca paylaşılan
bir "worker token" ile Worker'a istek atıyor, Worker da Gemini'ye gerçek
anahtarla bağlanıyor.

**S: İnternet/API kesilirse uygulama çalışmaz mı?**
C: Çalışır — her yapay zeka özelliğinin önceden hazırlanmış bir "yedek
cevap" mantığı var, böylece kullanıcı hata değil, makul bir öneri görür.

**S: Hangi model kullanılıyor, neden bu model?**
C: Google Gemini'nin "flash-lite" versiyonu — hızlı ve düşük maliyetli,
bu tür kısa, yapılandırılmış (JSON) cevaplar için yeterli güçte bir model.

**S: Uygulama mobilde de çalışır mı?**
C: Evet, bu bir web uygulaması olduğu için tarayıcı üzerinden hem
bilgisayardan hem telefondan açılabilir; ayrı bir mobil uygulama değil.

**S: Kodun büyük bir kısmı hangi dilde?**
C: JavaScript (ve biraz TypeScript) — herhangi bir büyük framework
(React, Vue vb.) kullanılmadan, doğrudan yazılmış. `Vite` adlı araç,
geliştirme sırasında hızlı önizleme ve son üründe küçük/optimize dosyalar
üretmek için kullanılıyor.

**S: Uygulama nerede çalışıyor, kim barındırıyor?**
C: Statik frontend GitHub Pages'te; yapay zeka isteklerini yöneten küçük
sunucu (Worker) ise Cloudflare'de barınıyor.

---

Bu rehberi baştan sona okuduktan sonra uygulamayı bir tarayıcıda
(`npm run dev` ile yerelde, ya da canlı linkten) gezip Profile Quiz →
Layering Lab → Vault → Community akışını birkaç dakika deneyimlemeniz,
buradaki kavramları gözünüzde canlandırmanızı çok kolaylaştıracaktır.
