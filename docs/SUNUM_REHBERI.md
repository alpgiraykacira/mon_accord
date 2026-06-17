# Mon Accord — Sunum Öncesi Anlatım Rehberi
# Mon Accord — Pre-Presentation Briefing Guide

> 🇹🇷 Bu kısa rehber, web ve yapay zeka konusunda bilgisi olmayan birinin
> sunum öncesi uygulamayı genel hatlarıyla anlayıp temel soruları
> cevaplayabilmesi içindir.
>
> 🇬🇧 This short guide helps someone with no web/AI background understand
> the app at a high level and answer basic questions before the presentation.

---

## 1. Mon Accord nedir? / What is Mon Accord?

**🇹🇷** Mon Accord, kullanıcının kendi **parfüm karışımını** oluşturmasına
yardımcı olan bir web uygulaması (prototip/mock-up). Dünyanın 6 bölgesinden
esinlenen 12 parfümü (sprey + yağ) "katmanlayarak" kişiye özel bir koku
yaratılıyor. Uygulama, kullanıcının zevkine göre **yapay zeka ile öneriler**
sunuyor; kullanıcı bunları kaydedip topluluğa paylaşabiliyor. Gerçek bir
ödeme/satış altyapısı yok — amaç konsepti göstermek.

**🇬🇧** Mon Accord is a prototype web app that helps users create their own
**perfume blend** by layering 12 perfumes (spray + oil) inspired by 6 world
regions. The app gives **AI-powered suggestions** based on the user's taste,
and lets them save and share blends. There's no real payment system — it's
a concept demo.

---

## 2. Bu bir "web uygulaması" — ne demek? / It's a "web app" — what does that mean?

**🇹🇷** Tarayıcıda açılan, indirilmesi gerekmeyen bir uygulama. Kullanıcının
profili, kaydettiği formüller gibi bilgiler kendi tarayıcısında saklanıyor
(ayrı bir veritabanı yok). Sayfalar arasında geçiş, sayfa yenilenmeden
gerçekleşiyor — modern web siteleri genelde böyle çalışır.

**🇬🇧** It's an app that opens in the browser, nothing to install. The
user's profile and saved blends are stored in their own browser (no separate
database). Moving between pages happens without a full reload — this is how
most modern websites work.

---

## 3. Yapay zeka (LLM) nerede devreye giriyor? / Where does the AI (LLM) come in?

**🇹🇷** Uygulama, Google'ın **Gemini** adlı yapay zeka modelini kullanıyor.
LLM (Büyük Dil Modeli), kendisine yazılan bir metne karşılık anlamlı bir
cevap üretebilen bir yapay zeka türüdür (ChatGPT'nin arkasındaki teknoloji
gibi). Biz Gemini'ye "kullanıcı şu zevkleri/ortamı belirtti, buna uygun bir
parfüm karışımı öner" gibi istekler gönderiyoruz, o da bize hazır bir öneri
üretip geri yolluyor.

Uygulamada yapay zeka şu yerlerde kullanılıyor:
- Kullanıcının anket cevaplarından bir **koku kimliği/profili** çıkarmak,
- Ruh haline/ortama göre **karışım önerisi** sunmak,
- Bir karışımın **kokusunun zaman içinde nasıl gelişeceğini** betimlemek,
- Topluluktaki bir formülün kullanıcıya **neden uyduğunu açıklamak**.

**🇬🇧** The app uses Google's **Gemini** AI model. An LLM (Large Language
Model) is a type of AI that can generate a meaningful response to a given
text (the same kind of technology behind ChatGPT). We send Gemini requests
like "the user likes X and is in context Y, suggest a fitting perfume blend",
and it sends back a ready-made suggestion.

The AI is used in the app to:
- Build a **scent profile** from the user's quiz answers,
- Suggest a **blend** based on mood/occasion,
- Describe how a blend's **scent will evolve over time**,
- Explain **why a community formula** suits (or doesn't suit) the user.

---

## 4. Yapay zekaya nasıl bağlanıyoruz? / How do we connect to the AI?

**🇹🇷** Yapay zeka servisini kullanmak için gizli bir **erişim anahtarı**
gerekiyor — bunu doğrudan tarayıcıya koymak güvenli olmaz, çünkü herkes
görüp kullanabilir. Bu yüzden istekler önce küçük, güvenli bir ara katmandan
(arka planda çalışan basit bir sunucu) geçiyor; anahtar sadece orada,
gizli olarak tutuluyor. Yani kullanıcı hiçbir zaman bu anahtarı görmüyor —
sadece sonucu görüyor.

**🇬🇧** Using the AI service requires a secret **access key** — putting it
directly in the browser wouldn't be safe, since anyone could see and use it.
So requests first pass through a small, secure middle layer (a simple
backend service); the key stays hidden there. The user never sees the key —
only the result.

---

## 5. Yapay zeka çalışmazsa ne olur? / What happens if the AI doesn't respond?

**🇹🇷** Bir bağlantı sorunu olursa uygulama boş ekran göstermiyor; önceden
hazırlanmış, makul bir öneriyle devam ediyor. Yani demo sırasında bir
aksaklık olsa bile kullanıcı deneyimi kesintisiz kalıyor.

**🇬🇧** If there's a connection issue, the app doesn't show a blank screen —
it falls back to a reasonable, pre-prepared suggestion. So even if something
goes wrong during a demo, the experience stays smooth.

---

## 6. Muhtemel sorular / Likely questions

**🇹🇷**
- **Veritabanı var mı?** Hayır, kullanıcı verisi tarayıcıda tutuluyor.
- **Yapay zekayı biz mi eğittik?** Hayır, hazır bir model (Gemini)
  kullanıyoruz; ona doğru talimatları vererek istediğimiz şekilde
  cevap üretmesini sağlıyoruz.
- **Erişim anahtarı çalınabilir mi?** Hayır, anahtar tarayıcıya hiç gitmiyor,
  güvenli bir ara katmanda gizli tutuluyor.
- **İnternet/yapay zeka kesilirse?** Uygulama yine de çalışır, hazır bir
  öneriyle devam eder.
- **Mobilde çalışır mı?** Evet, bir web uygulaması olduğu için telefon
  tarayıcısından da açılabilir.

**🇬🇧**
- **Is there a database?** No, user data is kept in the browser.
- **Did we train the AI?** No, we use a ready-made model (Gemini) and give
  it the right instructions to produce the responses we want.
- **Can the access key be stolen?** No, it never reaches the browser — it's
  kept secret in a secure middle layer.
- **What if the internet/AI is down?** The app still works, falling back to
  a ready-made suggestion.
- **Does it work on mobile?** Yes, since it's a web app it opens in a phone
  browser too.

---

🇹🇷 Bu rehberi okuduktan sonra uygulamayı bir tarayıcıda kısaca gezmeniz
konuyu daha iyi kavramanızı sağlayacaktır.

🇬🇧 After reading this, briefly trying the app in a browser will help these
ideas stick.
