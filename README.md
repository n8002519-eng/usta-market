# 🛠️ USTA MARKET — O'zbekistondagi Ishonchli Ustalar Bozori

> **"Ishonchli ustalar bir joyda!"**  
> USTA MARKET — O'zbekiston aholisi va bizneslari uchun har qanday ta'mirlash, qurilish va maishiy xizmatlar bo'yicha eng sara mutaxassislarni topish, baholash va buyurtma berishga mo'ljallangan zamonaviy, to'liq funksional web-platforma.

---

## 🎨 Dizayn va Stil Konsepsiyasi
- **Ranglar palitrasi**: Premium qora (`#0B0F17`, `#111827`), tiniq oq (`#FFFFFF`), va faol jozibador to'q sariq (`#FF6B00` / `brand-500`) aksentlari.
- **UI/UX**: Shaffof shisha effekti (glassmorphism), nozik neon-orange soyalar, yumaloqlangan kartalar (`rounded-2xl`, `rounded-3xl`), professional tipografiya (*Plus Jakarta Sans*).
- **Moslashuvchanlik (Responsive)**: Smartfonlar, planshetlar va keng ekranli monitorlarga to'liq moslashgan.

---

## 🚀 Texnologik Stek
- **Frontend**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Marshrutlash**: [React Router DOM v6](https://reactrouter.com/)
- **Stillashtirish**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Ikonkalar**: [Lucide React](https://lucide.dev/)
- **Ma'lumotlar saqlanishi**: Browser `LocalStorage` (Demo va to'liq oflayn rejim uchun)
- **Bayramona effektlar**: `canvas-confetti` (Buyurtma qabul qilinganda)
- **Bulutli integratsiya**: [Supabase](https://supabase.com/) integratsiyasiga to'liq tayyorlangan (`supabaseClient.js` va `.env.example`)

---

## 📂 Loyiha Tuzilmasi (Project Structure)

```text
USTA MARKET/
├── dist/                          # Ishlab chiqarishga tayyor build fayllar
├── public/                        # Statik resurslar va favicon
├── src/
│   ├── assets/                    # Rasmlar va logotiplar
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx          # Rangli holat nishonlari
│   │   │   ├── Button.jsx         # Gradient, dark va outline tugmalar
│   │   │   ├── EmptyState.jsx     # Bo'sh natijalar ko'rinishi
│   │   │   ├── Modal.jsx          # Backdrop blur modal darchasi
│   │   │   ├── RatingStars.jsx    # 5 yulduzli baholash komponenti
│   │   │   └── ScrollToTop.jsx    # Sahifa almashganda tepaga qaytaruvchi
│   │   ├── home/
│   │   │   ├── HeroSection.jsx    # Bosh sahifa qidiruv hero qismi
│   │   │   ├── CategoryGrid.jsx   # 10 ta asosiy xizmat yo'nalishi
│   │   │   ├── FeaturedMasters.jsx# Tanlangan eng sara ustalar
│   │   │   ├── HowItWorks.jsx     # 3 bosqichli ishlash qo'llanmasi
│   │   │   ├── StatisticsSection.jsx # Platforma ko'rsatkichlari (15k+ buyurtma)
│   │   │   ├── TestimonialsSection.jsx # Mijozlarning real sharhlari
│   │   │   └── CTASection.jsx     # Usta bo'lib ro'yxatdan o'tish chaqirig'i
│   │   ├── layout/
│   │   │   ├── Footer.jsx         # Bog'lanish ma'lumotlari va navigatsiya
│   │   │   ├── Layout.jsx         # Asosiy sahifa konteyneri
│   │   │   └── Navbar.jsx         # Bosh menyu, sevimlilar, savatcha, admin link
│   │   ├── masters/
│   │   │   ├── ContactModal.jsx   # Qo'ng'iroq va Telegram orqali to'g'ridan-to'g'ri aloqa
│   │   │   ├── MasterCard.jsx     # Usta kartochkasi (avatar, narx, shahar, reyting)
│   │   │   └── MasterFilters.jsx  # Soha, shahar, narx va reyting bo'yicha filterlar
│   │   └── orders/
│   │       └── OrderModal.jsx     # Har qanday sahifadan tezkor buyurtma berish darchasi
│   ├── context/
│   │   ├── AppContext.jsx         # Ustalar, buyurtmalar, arizalar va sevimlilar holati
│   │   └── ToastContext.jsx       # Bildirishnomalar tizimi (Success/Error/Info)
│   ├── data/
│   │   ├── categoriesData.js      # 10 ta xizmat toifasi
│   │   ├── citiesData.js          # O'zbekiston viloyatlari va shaharlari
│   │   └── initialMasters.js      # 14 ta realistik usta profillari (Unsplash)
│   │   └── initialOrders.js       # Boshlang'ich buyurtmalar va arizalar
│   ├── pages/
│   │   ├── HomePage.jsx           # Bosh sahifa
│   │   ├── MastersPage.jsx        # Ustalar ro'yxati (Katalog + Qidiruv + Filter)
│   │   ├── MasterProfilePage.jsx  # Shaxsiy profil, xizmatlar narxi, galereya, sharhlar
│   │   ├── CategoriesPage.jsx     # Barcha xizmat toifalari
│   │   ├── OrderPage.jsx          # Xizmatga to'liq buyurtma berish sahifasi
│   │   ├── BecomeMasterPage.jsx   # Usta sifatida ro'yxatdan o'tish anketasi
│   │   ├── UserDashboardPage.jsx  # Buyurtmalar tarixi, saqlangan ustalar, profil
│   │   ├── AdminDashboardPage.jsx # Ustalar arizalarini tasdiqlash va statistikalar
│   │   └── NotFoundPage.jsx       # 404 xatolik sahifasi
│   ├── services/
│   │   ├── localStorageService.js # LocalStorage ma'lumotlar boshqaruvi
│   │   └── supabaseClient.js      # Supabase integratsiya ko'prigi
│   ├── styles/
│   │   └── index.css              # Maxsus Tailwind va CSS animatsiyalari
│   ├── App.jsx                    # React Router yo'nalishlari
│   └── main.jsx                   # Ilova kirish nuqtasi
├── .env.example                   # Muhit o'zgaruvchilari namunasi
├── .gitignore                     # Git e'tiborga olmasligi kerak bo'lgan fayllar
├── index.html                     # Bosh HTML sahifasi
├── package.json                   # Loyiha qaramliklari va skriptlar
├── postcss.config.js              # PostCSS konfiguratsiyasi
├── tailwind.config.js             # Tailwind konfiguratsiyasi
├── vercel.json                    # Vercel SPA routing konfiguratsiyasi
└── vite.config.js                 # Vite sozlamalari
```

---

## ⚡ Asosiy Xususiyatlar va Funksionallik

### 1. Bosh Sahifa (Home Page)
- Qidiruv paneli: Usta ismi, mutaxassisligi va shaharlar bo'yicha tezkor yo'naltirish.
- 10 ta ommabop xizmat toifalari va ularning boshlang'ich narxlari.
- Eng sara tasdiqlangan ustalar ro'yxati.
- Platformaning 3 qadamli ishlash tartibi.
- Real statistik ma'lumotlar va qanoatlangan mijozlar sharhlari.

### 2. Xizmat Kategoriyalari (Service Categories)
1. **Elektrik** — Elektr montaj, avtomat shitlar, lyustralar.
2. **Santexnik** — Quvurlar, boilerlar, kran va kanalizatsiya ta'miri.
3. **Quruvchi** — G'isht terish, pol quyish, gipsokarton, kafel.
4. **Mebel ustasi** — Mebel yig'ish, oshxona garniturlari, restavratsiya.
5. **Konditsioner ustasi** — Freon quyish, xirurgik tozalash, montaj.
6. **Maishiy texnika ta'miri** — Kir yuvish mashinasi, muzlatgich, televizor.
7. **Bo'yoqchi** — Shpatlyovka, emulsiya, sifatli oboy yopishtirish.
8. **Payvandchi** — Darvoza, naves, temir panjaralar, payvandlash.
9. **Avtomobil ustasi** — Kompyuter diagnostika, motor, xodovoy qism.
10. **Kompyuter ustasi** — Windows o'rnatish, noutbuk tozalash, SSD tezlashtirish.

### 3. Ustalar Katalogi (Masters Page)
- 14+ real fotosuratli va ma'lumotli ustalar profili.
- Dinamik qidiruv (qidiruv maydoni).
- Soha (kategoriya) bo'yicha filter.
- Shahar (Toshkent, Samarqand, Buxoro, Andijon va boshqalar) bo'yicha filter.
- Minimal reyting (4.5★, 4.8★, 4.9★) bo'yicha filter.
- Saralash: Narx bo'yicha (arzon/qimmat), reyting va bajarilgan ishlar soni bo'yicha.
- Sevimlilarga qo'shish/olib tashlash imkoniyati.

### 4. Usta Shaxsiy Profili (Master Profile)
- To'liq biografiya va sertifikatlar.
- Xizmatlar jadvali: har bir xizmat nomi, bajarish vaqti, tavsifi va aniq narxi.
- Bajarilgan ishlar fotosuratlari galereyasi (Lightbox kattalashtirish imkoniyati bilan).
- Mijozlar sharhlari va yangi sharh qoldirish shakli.
- To'g'ridan-to'g'ri telefon qo'ng'irog'i yoki Telegram havolasi.
- "Buyurtma berish" tugmasi orqali aynan shu ustani tanlagan holda buyurtma yaratish.

### 5. Xizmatga Buyurtma Berish (Order Service)
- Mijoz ismi, telefon raqami, xizmat sohasi, qulay sana, manzil va ish tavsifi.
- Kiritilgan ma'lumotlar validatsiyasi.
- Muvaffaqiyatli buyurtma berilganda bayramona confetti animatsiyasi va Toast bildirishnomasi.
- Buyurtma avtomatik ravishda `LocalStorage` ga saqlanadi va Foydalanuvchi hamda Admin kabinetida paydo bo'ladi.

### 6. Usta Bo'lib Ro'yxatdan O'tish (Become a Master)
- Usta anketasi: F.I.SH, telefon, soha, shahar, tajriba, boshlang'ich narx, tavsif.
- Profil fotosuratini kompyuterdan yuklash yoki tayyor namunalardan tanlash.
- Yuborilgan ariza "Kutilmoqda" holatida saqlanadi va Admin tekshiruviga yuboriladi.

### 7. Foydalanuvchi Kabineti (User Dashboard)
- **Mening buyurtmalarim**: Barcha berilgan buyurtmalar tarixi, ularning holatlari (`Kutilmoqda`, `Qabul qilindi`, `Bajarildi`, `Bekor qilindi`).
- **Saqlangan ustalar**: Sevimlilar ro'yxatiga olingan ustalar kolleksiyasi.
- **Mening profilim**: Shaxsiy ism, telefon va manzil ma'lumotlarini tahrirlash.

### 8. Admin Boshqaruv Paneli (Admin Dashboard)
- Jami ustalar, buyurtmalar, arizalar soni va tizim ko'rsatkichlari.
- **Usta arizalarini boshqarish**: Yangi ustalarning arizasini ko'rib chiqish, "Tasdiqlash" (tasdiqlanganda usta darhol jonli katalogga yangi usta sifatida qo'shiladi!) yoki "Rad etish".
- **Buyurtmalar nazorati**: Buyurtma holatlarini o'zgartirish yoki o'chirish.
- **Kategoriyalar statistikasi**: Har bir soha bo'yicha ustalar sonini kuzatish.

---

## 💻 O'rnatish va Ishga Tushirish (Local Setup)

Loyiha kompyuteringizda ishlashi uchun quyidagi buyruqlarni bajaring:

```bash
# 1. Repozitoriyani klonlash yoki papkaga kirish
cd "USTA MARKET"

# 2. Barcha zaruriy paketlarni o'rnatish
npm install

# 3. Dasturni mahaliy ishlab chiqish (dev) rejimida ishga tushirish
npm run dev
```

Brauzeringizda quyidagi manzil ochiladi:
👉 `http://localhost:3000`

Loyihani ishlab chiqarish (production build) uchun tayyorlash:
```bash
npm run build
```

Build qilingan natijani ko'rish (preview):
```bash
npm run preview
```

---

## 🐙 GitHub ga Yuklash Qo'llanmasi (GitHub Upload)

Loyihani GitHub hisobingizga yuklash uchun terminalda quyidagi buyruqlarni bajaring:

```bash
# 1. Git repozitoriyasini boshlash
git init

# 2. Barcha fayllarni indekslash (.gitignore orqali node_modules va .env chetlab o'tiladi)
git add .

# 3. Dastlabki commitni amalga oshirish
git commit -m "feat: complete professional USTA MARKET web platform"

# 4. Asosiy tarmoqni 'main' deb belgilash
git branch -M main

# 5. O'zingizning yangi ochgan GitHub repozitoriyangiz manzilini bog'lash
git remote add origin https://github.com/SIZNING_PROFILINGIZ/usta-market.git

# 6. Loyihani GitHub ga yuklash
git push -u origin main
```

---

## ☁️ Vercel orqali Deploy Qilish (Vercel Deployment)

Loyiha Vercel platformasiga 100% moslashtirilgan. SPA yo'nalishlarida sahifani yangilaganda (F5 bosilganda) **404 xatolik chiqmasligi uchun** `vercel.json` fayli allaqachon sozlangan:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Vercel Web Dashboard orqali:
1. [Vercel.com](https://vercel.com) ga kiring va GitHub hisobingiz orqali tizimga kiring.
2. **"Add New..."** -> **"Project"** tugmasini bosing.
3. GitHub dagi **`usta-market`** repozitoriyangizni tanlang (`Import`).
4. Framework Preset: **Vite** avtomatik aniqlanadi.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. **"Deploy"** tugmasini bosing! 1-2 daqiqada saytingiz butun dunyo uchun jonli efirga chiqadi.

### Vercel CLI orqali:
```bash
npm install -g vercel
vercel
```

---

## 🔒 Supabase Integratsiyasi (Kelajak uchun)
Loyihada `src/services/supabaseClient.js` fayli mavjud.
Agar kelajakda Supabase ma'lumotlar bazasini ulamoqchi bo'lsangiz:
1. `.env.example` faylidan nusxa olib `.env` faylini yarating:
   ```env
   VITE_SUPABASE_URL=https://sizning-loyihangiz.supabase.co
   VITE_SUPABASE_ANON_KEY=sizning-anon-kalitingiz
   ```
2. Kalitlar ko'rsatilganda ilova avtomatik tarzda Supabase klientini faollashtiradi; kalitlar bo'lmaganda esa uzluksiz `LocalStorage` rejimida ishlashda davom etadi.

---

## 📄 Litsenziya
Ushbu loyiha ochiq kodli bo'lib, ta'lim va tijoriy maqsadlarda foydalanish uchun mo'ljallangan.

© 2024 **USTA MARKET** — O'zbekiston. Barcha huquqlar himoyalangan.

