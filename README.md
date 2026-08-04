# 🎯 Artemis — Platform Latihan TKA & UTBK/SNBT

> Kuasai TKA & UTBK — Raih PTN Impianmu

Platform latihan soal TKA dan UTBK/SNBT berbasis simulasi cerdas untuk siswa SMA seluruh Indonesia. Dibangun dengan Next.js 14, TypeScript, Tailwind CSS, Framer Motion, dan Supabase.

---

## Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Teknologi](#teknologi)
3. [Struktur Proyek](#struktur-proyek)
4. [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
5. [Build Produksi](#build-produksi)
6. [Konfigurasi Supabase](#konfigurasi-supabase)
7. [Deploy ke Cloudflare Pages](#deploy-ke-cloudflare-pages)
8. [Mengelola Bank Soal](#mengelola-bank-soal)
9. [Menambahkan Paket Baru](#menambahkan-paket-baru)
10. [Panduan Maintenance](#panduan-maintenance)
11. [Pengembangan Lanjutan](#pengembangan-lanjutan)

---

## Fitur Utama

- **Bank Soal Komprehensif** — TKA (Wajib + 19 mata pelajaran pilihan) dan UTBK/SNBT 2026 (TPS + Literasi)
- **Tiga Tipe Soal** — Pilihan Ganda Sederhana (PGS), Kompleks/MCMA, dan Soal Kategori
- **Simulasi Ujian Real-Time** — Timer, navigasi soal, bookmark, flag
- **Review Mendalam** — Pembahasan, konsep yang diuji, kesalahan umum, tips
- **Analitik Performa** — Grafik tren, profil kemampuan radar, performa per topik
- **Estimasi Persentil** — Estimasi ranking simulasi (bukan nilai resmi)
- **Leaderboard** — Papan peringkat komunitas
- **Desain Retro-Futuristik** — Aurora gradient, glassmorphism, neon, dark mode
- **Responsif** — Desktop, tablet, mobile

---

## Teknologi

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS 3, Framer Motion 11 |
| Charts | Recharts |
| Backend | Next.js API Routes / Server Actions |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Cloudflare Pages |
| Storage | Cloudflare R2 (opsional, untuk gambar soal) |

---

## Struktur Proyek

```
artemis/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login, Register
│   │   ├── (main)/          # Layout dengan Navbar
│   │   │   ├── dashboard/
│   │   │   ├── tka/         # Pilih mata pelajaran TKA
│   │   │   │   └── [subjectId]/
│   │   │   ├── utbk/        # Pilih komponen UTBK
│   │   │   │   └── [subjectId]/
│   │   │   ├── statistics/
│   │   │   ├── leaderboard/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── about/
│   │   └── exam/
│   │       ├── [packageId]/  # Halaman ujian utama
│   │       └── review/[sessionId]/
│   ├── components/
│   │   ├── ui/              # Button, Badge, ProgressBar
│   │   └── layout/          # Navbar
│   ├── data/
│   │   ├── questions.ts     # Bank soal dummy
│   │   └── packages.ts      # Daftar paket soal
│   ├── hooks/
│   │   ├── useExam.ts       # State management ujian
│   │   └── useTimer.ts      # Countdown timer
│   ├── lib/
│   │   ├── constants.ts     # Mata pelajaran, konfigurasi
│   │   ├── utils.ts         # Kalkulasi skor, format
│   │   └── supabase/        # Client & server Supabase
│   └── types/
│       └── index.ts         # TypeScript types
├── supabase/
│   └── schema.sql           # Database schema lengkap
└── .env.local.example
```

---

## Menjalankan Secara Lokal

### Prasyarat
- Node.js ≥ 18.17.0
- npm ≥ 9 atau pnpm ≥ 8

### Langkah

```bash
# 1. Clone repository
git clone https://github.com/yourusername/artemis.git
cd artemis

# 2. Install dependensi
npm install

# 3. Salin dan isi environment variables
cp .env.local.example .env.local
# Edit .env.local dengan nilai Supabase kamu

# 4. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> **Catatan:** Tanpa konfigurasi Supabase, aplikasi tetap bisa dijalankan menggunakan data dummy dan localStorage untuk sesi ujian.

---

## Build Produksi

```bash
# Build untuk produksi
npm run build

# Jalankan build lokal
npm run start

# Type check
npm run type-check
```

---

## Konfigurasi Supabase

### 1. Buat Proyek Supabase

1. Buka [supabase.com](https://supabase.com) → Buat akun
2. **New Project** → Isi nama proyek dan password database
3. Catat: **Project URL** dan **Anon Key** dari Project Settings → API

### 2. Jalankan Schema SQL

1. Buka **SQL Editor** di dashboard Supabase
2. Salin isi file `supabase/schema.sql`
3. Jalankan (Run All)

### 3. Isi .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Konfigurasi Auth (Email)

Di Supabase Dashboard → Authentication → Settings:
- **Site URL**: `https://yourdomain.com`
- **Redirect URLs**: `https://yourdomain.com/dashboard`

---

## Deploy ke Cloudflare Pages

### Metode A: GitHub Integration (Direkomendasikan)

1. Push kode ke GitHub
2. Buka [Cloudflare Pages](https://pages.cloudflare.com)
3. **Create a project** → Connect to Git → Pilih repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: `18`
5. Tambahkan **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Metode B: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
npm run build
wrangler pages deploy .next
```

### Menghubungkan Domain Sendiri

1. Di Cloudflare Pages → Custom domains → Add custom domain
2. Masukkan domain (mis. `artemis.id`)
3. Ikuti instruksi DNS (biasanya CNAME record ke `*.pages.dev`)

---

## Mengelola Bank Soal

### Struktur Soal

Setiap soal (`Question`) memiliki properti berikut:

| Field | Deskripsi |
|-------|-----------|
| `id` | ID unik |
| `package_id` | ID paket soal |
| `order` | Nomor urut dalam paket |
| `type` | `PGS` \| `MCMA` \| `KATEGORI` |
| `question_text` | Teks soal (mendukung markdown) |
| `options` | Array opsi `{ id, label, text }` |
| `correct_answer_ids` | Array ID opsi yang benar |
| `difficulty` | `MUDAH` \| `SEDANG` \| `SULIT` |
| `chapter` | Bab/Materi |
| `topic` | Sub-topik |
| `explanation` | Pembahasan lengkap |
| `concept_tested` | Konsep yang diuji |
| `common_mistakes` | Kesalahan umum siswa |
| `study_tips` | Tips mengerjakan soal serupa |

### Menambah Soal Baru (Mode Lokal/Demo)

Edit file `src/data/questions.ts`. Tambahkan objek `Question` baru ke array paket yang sesuai. Format:

```typescript
{
  id: 'bind-p2-q1',          // unik
  package_id: 'tka-bind-02', // harus match dengan packages.ts
  order: 1,
  type: 'PGS',
  question_text: '...',
  options: [
    { id: 'a', label: 'A', text: '...' },
    { id: 'b', label: 'B', text: '...' },
    // ...
  ],
  correct_answer_ids: ['a'],
  difficulty: 'SEDANG',
  chapter: 'Teks Argumentatif',
  topic: 'Fakta vs Opini',
  explanation: 'Pembahasan lengkap...',
  concept_tested: '...',
  common_mistakes: '...',
  study_tips: '...',
  reference: '...',
  tags: ['tag1', 'tag2'],
},
```

### Menambah Soal via Supabase (Produksi)

```sql
INSERT INTO public.questions (
  package_id, "order", type, question_text, options, correct_answer_ids,
  difficulty, chapter, topic, explanation, concept_tested, common_mistakes, study_tips, reference, tags
) VALUES (
  'tka-bind-02', 1, 'PGS', 'Teks soal...', 
  '[{"id":"a","label":"A","text":"..."},{"id":"b","label":"B","text":"..."}]',
  ARRAY['a'], 'SEDANG', 'Bab', 'Topik', 'Pembahasan', 'Konsep', 'Kesalahan', 'Tips', 'Referensi',
  ARRAY['tag1','tag2']
);
```

---

## Menambahkan Paket Baru

### 1. Daftarkan paket di `src/data/packages.ts`

```typescript
{ 
  id: 'tka-bind-05', 
  subject_id: 'tka-bind', 
  code: 'BIND-05', 
  name: 'Paket 5 — Teks Baru',
  description: 'Deskripsi paket',
  difficulty: 'SEDANG', 
  total_questions: 30, 
  duration_minutes: 40, 
  is_free: true,
  order: 5, 
  tags: ['tag'] 
}
```

### 2. Tambahkan soal di `src/data/questions.ts`

Buat array baru untuk paket tersebut dan daftarkan di `QUESTION_BANK`.

### 3. Perbarui `total_packages` di `src/lib/constants.ts`

---

## Menambahkan Mata Pelajaran Baru

1. Tambahkan entri baru di array `TKA_SUBJECTS` atau `UTBK_SUBJECTS` di `src/lib/constants.ts`
2. Buat paket-paket soal di `src/data/packages.ts`
3. Tambahkan bank soal di `src/data/questions.ts`
4. (Produksi) Insert ke tabel `subjects` dan `packages` di Supabase

---

## Panduan Maintenance

### Update Dependensi

```bash
# Periksa outdated packages
npm outdated

# Update semua ke versi terbaru (dengan hati-hati)
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

### Backup Database (Supabase)

Supabase menyediakan backup otomatis harian (plan Pro). Untuk manual:

```bash
# Menggunakan pg_dump via Supabase CLI
supabase db dump -f backup.sql
```

### Monitoring

- **Cloudflare Analytics**: Tersedia otomatis di dashboard Cloudflare Pages
- **Supabase Dashboard**: Pantau query, storage, dan bandwidth real-time
- **Error tracking**: Tambahkan Sentry (`npm install @sentry/nextjs`)

---

## Pengembangan Lanjutan

Roadmap fitur yang bisa dikembangkan:

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Admin Dashboard** | Manajemen soal, paket, dan pengguna via UI | Tinggi |
| **Mode Ujian Lengkap** | Simulasi ujian penuh TKA/UTBK sesuai durasi resmi | Tinggi |
| **AI Tutor** | Pembahasan interaktif berbasis model bahasa | Sedang |
| **Adaptive Learning** | Rekomendasi soal berdasarkan kelemahan pengguna | Sedang |
| **Notifikasi Push** | Pengingat belajar harian via service worker | Rendah |
| **Mode Offline** | Service worker untuk akses tanpa internet | Rendah |
| **Gamifikasi** | Badge, streak bonus, level, achievement | Rendah |
| **Social Study** | Grup belajar dan diskusi soal | Rendah |
| **Import Soal (Excel)** | Upload bank soal via file Excel | Sedang |
| **Gambar di Soal** | Dukungan penuh diagram dan formula LaTeX | Tinggi |

---

## Disclaimer

Artemis adalah platform simulasi edukasi mandiri dan **tidak berafiliasi** dengan Kemendikdasmen, BSKAP, SNPMB, atau lembaga pemerintah lainnya. Skor yang dihasilkan oleh Artemis **tidak merepresentasikan nilai resmi TKA atau UTBK/SNBT** dan dimaksudkan semata-mata sebagai alat evaluasi belajar mandiri.

---

*Dibangun dengan ❤️ untuk siswa SMA Indonesia · © 2026 Artemis*
