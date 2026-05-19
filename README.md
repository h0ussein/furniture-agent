# 🛋️ وكيل الأثاث الذكي

AI chatbot بيساعد عملاء شركات الأثاث يلاقوا المنتج المناسب — بالعربي.

## Tech Stack
- React + Vite
- Groq API (llama3-8b-8192)
- Google Sheets (CSV) — كتالوج المنتجات
- ImageKit — صور المنتجات
- Vercel — deployment

## إعداد المشروع

### 1. نسخ المشروع وتثبيت الـ packages
```bash
npm install
```

### 2. إعداد متغيرات البيئة
```bash
cp .env.example .env
```
افتح `.env` وحط قيمك:
```
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
VITE_SHEET_CSV_URL=https://docs.google.com/...
```

### 3. تشغيل محلياً
```bash
npm run dev
```

## Deploy على Vercel

1. ارفع المشروع على GitHub
2. ربط الـ repo بـ Vercel
3. في إعدادات Vercel → Environment Variables، أضف:
   - `VITE_GROQ_API_KEY` = مفتاحك
   - `VITE_SHEET_CSV_URL` = رابط الـ CSV

## هيكل الملفات
```
src/
├── hooks/
│   ├── useCatalog.js   # جلب بيانات الـ Sheet
│   └── useGroq.js      # التواصل مع Groq API
├── components/
│   ├── MessageBubble.jsx
│   └── ProductCard.jsx
├── App.jsx
└── App.css
```
