import type { Package } from '@/types';

// ─── Paket TKA — Bahasa Indonesia ────────────────────────────────────────────
const BIND_PACKAGES: Package[] = [
  { id: 'tka-bind-01', subject_id: 'tka-bind', code: 'BIND-01', name: 'Paket 1 — Teks Sastra & Eksposisi', description: 'Ide pokok, koherensi paragraf, unsur intrinsik sastra, dan ejaan EYD.', difficulty: 'MUDAH', total_questions: 30, duration_minutes: 40, is_free: true,  order: 1, tags: ['sastra', 'eksposisi', 'ejaan'] },
  { id: 'tka-bind-02', subject_id: 'tka-bind', code: 'BIND-02', name: 'Paket 2 — Teks Argumentatif & Persuasif', description: 'Struktur argumen, fakta vs opini, teknik persuasi, dan analisis retorika.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 40, is_free: true,  order: 2, tags: ['argumentasi', 'persuasi', 'retorika'] },
  { id: 'tka-bind-03', subject_id: 'tka-bind', code: 'BIND-03', name: 'Paket 3 — Teks Ilmiah & Akademik', description: 'Laporan penelitian, artikel akademik, abstrak, dan metodologi.', difficulty: 'SULIT', total_questions: 30, duration_minutes: 45, is_free: false, order: 3, tags: ['akademik', 'ilmiah', 'laporan'] },
  { id: 'tka-bind-04', subject_id: 'tka-bind', code: 'BIND-04', name: 'Paket 4 — Simulasi TKA Penuh', description: 'Simulasi lengkap seluruh materi TKA Bahasa Indonesia dengan soal MCMA dan Kategori.', difficulty: 'SULIT', total_questions: 40, duration_minutes: 55, is_free: false, order: 4, tags: ['simulasi', 'MCMA', 'kategori'] },
];

// ─── Paket TKA — Matematika ───────────────────────────────────────────────────
const MAT_PACKAGES: Package[] = [
  { id: 'tka-mat-01', subject_id: 'tka-mat', code: 'MAT-01', name: 'Paket 1 — Aljabar & Fungsi', description: 'Limit, logaritma, fungsi kuadrat, sistem persamaan, dan pertidaksamaan.', difficulty: 'MUDAH', total_questions: 30, duration_minutes: 45, is_free: true,  order: 1, tags: ['aljabar', 'fungsi', 'limit'] },
  { id: 'tka-mat-02', subject_id: 'tka-mat', code: 'MAT-02', name: 'Paket 2 — Geometri & Trigonometri', description: 'Bangun datar, bangun ruang, sinus, cosinus, aturan sinus/cosinus.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 45, is_free: true,  order: 2, tags: ['geometri', 'trigonometri'] },
  { id: 'tka-mat-03', subject_id: 'tka-mat', code: 'MAT-03', name: 'Paket 3 — Statistika & Peluang', description: 'Distribusi data, mean/median/modus, kombinatorika, probabilitas bersyarat.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 45, is_free: false, order: 3, tags: ['statistika', 'peluang', 'kombinatorika'] },
  { id: 'tka-mat-04', subject_id: 'tka-mat', code: 'MAT-04', name: 'Paket 4 — Simulasi TKA Penuh', description: 'Simulasi seluruh materi Matematika TKA dengan berbagai tipe soal.', difficulty: 'SULIT', total_questions: 40, duration_minutes: 60, is_free: false, order: 4, tags: ['simulasi', 'mixed'] },
];

// ─── Paket TKA — Bahasa Inggris ───────────────────────────────────────────────
const BING_PACKAGES: Package[] = [
  { id: 'tka-bing-01', subject_id: 'tka-bing', code: 'BING-01', name: 'Paket 1 — Reading & Grammar', description: 'Reading comprehension, grammar (S-V agreement, tenses), dan vocabulary.', difficulty: 'MUDAH', total_questions: 30, duration_minutes: 40, is_free: true,  order: 1, tags: ['reading', 'grammar'] },
  { id: 'tka-bing-02', subject_id: 'tka-bing', code: 'BING-02', name: 'Paket 2 — Critical Reading', description: 'Inferencing, author\'s purpose, tone & mood, dan analisis teks argumentatif.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 40, is_free: true,  order: 2, tags: ['critical reading', 'inference'] },
  { id: 'tka-bing-03', subject_id: 'tka-bing', code: 'BING-03', name: 'Paket 3 — Academic English', description: 'Teks akademik, abstrak jurnal, laporan ilmiah, dan kosa kata akademik (AWL).', difficulty: 'SULIT', total_questions: 30, duration_minutes: 45, is_free: false, order: 3, tags: ['academic', 'AWL'] },
  { id: 'tka-bing-04', subject_id: 'tka-bing', code: 'BING-04', name: 'Paket 4 — Simulasi TKA Penuh', description: 'Simulasi lengkap TKA Bahasa Inggris dengan seluruh tipe soal.', difficulty: 'SULIT', total_questions: 40, duration_minutes: 55, is_free: false, order: 4, tags: ['simulasi'] },
];

// ─── Paket TKA — Sains (sample) ───────────────────────────────────────────────
const FIS_PACKAGES: Package[] = [
  { id: 'tka-fis-01', subject_id: 'tka-fis', code: 'FIS-01', name: 'Paket 1 — Mekanika & Kinematika', description: 'Gerak lurus, gerak parabola, hukum Newton, usaha-energi, momentum.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 45, is_free: true,  order: 1, tags: ['mekanika', 'kinematika'] },
  { id: 'tka-fis-02', subject_id: 'tka-fis', code: 'FIS-02', name: 'Paket 2 — Listrik & Magnet', description: 'Hukum Coulomb, rangkaian listrik, medan magnet, induksi elektromagnetik.', difficulty: 'SULIT', total_questions: 30, duration_minutes: 45, is_free: true,  order: 2, tags: ['listrik', 'magnet'] },
  { id: 'tka-fis-03', subject_id: 'tka-fis', code: 'FIS-03', name: 'Paket 3 — Simulasi TKA Fisika', description: 'Simulasi penuh mencakup termodinamika, gelombang, optika, dan fisika modern.', difficulty: 'SULIT', total_questions: 35, duration_minutes: 55, is_free: false, order: 3, tags: ['simulasi', 'mixed'] },
];

const KIM_PACKAGES: Package[] = [
  { id: 'tka-kim-01', subject_id: 'tka-kim', code: 'KIM-01', name: 'Paket 1 — Struktur Atom & Periodik', description: 'Konfigurasi elektron, tabel periodik, ikatan kimia, dan sifat periodik unsur.', difficulty: 'MUDAH', total_questions: 30, duration_minutes: 40, is_free: true,  order: 1, tags: ['atom', 'periodik'] },
  { id: 'tka-kim-02', subject_id: 'tka-kim', code: 'KIM-02', name: 'Paket 2 — Stoikiometri & Larutan', description: 'Mol, konsentrasi, asam-basa, hidrolisis, kelarutan, dan buffer.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 45, is_free: false, order: 2, tags: ['stoikiometri', 'larutan'] },
  { id: 'tka-kim-03', subject_id: 'tka-kim', code: 'KIM-03', name: 'Paket 3 — Kimia Organik & Termokimia', description: 'Gugus fungsi, isomer, reaksi organik, entalpi, dan hukum Hess.', difficulty: 'SULIT', total_questions: 30, duration_minutes: 50, is_free: false, order: 3, tags: ['organik', 'termokimia'] },
];

const EKO_PACKAGES: Package[] = [
  { id: 'tka-eko-01', subject_id: 'tka-eko', code: 'EKO-01', name: 'Paket 1 — Mikro & Makroekonomi', description: 'Permintaan-penawaran, elastisitas, pasar, GDP, inflasi, kebijakan fiskal-moneter.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 40, is_free: true,  order: 1, tags: ['mikro', 'makro'] },
  { id: 'tka-eko-02', subject_id: 'tka-eko', code: 'EKO-02', name: 'Paket 2 — Akuntansi & Manajemen', description: 'Siklus akuntansi, laporan keuangan, analisis rasio, dan manajemen perusahaan.', difficulty: 'SEDANG', total_questions: 30, duration_minutes: 40, is_free: false, order: 2, tags: ['akuntansi', 'manajemen'] },
  { id: 'tka-eko-03', subject_id: 'tka-eko', code: 'EKO-03', name: 'Paket 3 — Simulasi TKA Ekonomi', description: 'Simulasi penuh dengan soal berbasis grafik dan analisis data ekonomi.', difficulty: 'SULIT', total_questions: 35, duration_minutes: 50, is_free: false, order: 3, tags: ['simulasi', 'grafik'] },
];

// ─── Paket UTBK ───────────────────────────────────────────────────────────────
const PU_PACKAGES: Package[] = [
  { id: 'utbk-pu-01', subject_id: 'utbk-pu', code: 'PU-01', name: 'Paket 1 — Silogisme & Analogi', description: 'Silogisme kategoris, analogi verbal, inferensi deduktif, dan modus ponens/tollens.', difficulty: 'MUDAH', total_questions: 20, duration_minutes: 30, is_free: true,  order: 1, tags: ['silogisme', 'analogi'] },
  { id: 'utbk-pu-02', subject_id: 'utbk-pu', code: 'PU-02', name: 'Paket 2 — Penalaran Logis Kompleks', description: 'Pengurutan linear, relasi, argumen berstruktur, dan pola logika majemuk.', difficulty: 'SEDANG', total_questions: 20, duration_minutes: 30, is_free: true,  order: 2, tags: ['logis', 'kompleks'] },
  { id: 'utbk-pu-03', subject_id: 'utbk-pu', code: 'PU-03', name: 'Paket 3 — Analisis Argumen & Asumsi', description: 'Evaluasi argumen, identifikasi asumsi, kelemahan argumen, dan penguatan argumen.', difficulty: 'SULIT', total_questions: 20, duration_minutes: 35, is_free: false, order: 3, tags: ['argumen', 'asumsi'] },
  { id: 'utbk-pu-04', subject_id: 'utbk-pu', code: 'PU-04', name: 'Paket 4 — Simulasi TPS PU', description: 'Simulasi penuh 30 soal setara UTBK dengan tingkat kesulitan tertinggi.', difficulty: 'SULIT', total_questions: 30, duration_minutes: 40, is_free: false, order: 4, tags: ['simulasi', 'UTBK'] },
];

const LBI_PACKAGES: Package[] = [
  { id: 'utbk-lbi-01', subject_id: 'utbk-lbi', code: 'LBI-01', name: 'Paket 1 — Memahami & Menginterpretasi Teks', description: 'Membaca kritis, menemukan makna tersirat, dan menyimpulkan informasi teks.', difficulty: 'MUDAH', total_questions: 20, duration_minutes: 25, is_free: true,  order: 1, tags: ['membaca kritis', 'interpretasi'] },
  { id: 'utbk-lbi-02', subject_id: 'utbk-lbi', code: 'LBI-02', name: 'Paket 2 — Evaluasi & Refleksi Teks', description: 'Mengevaluasi kualitas teks, mengidentifikasi bias, dan merespons teks secara kritis.', difficulty: 'SEDANG', total_questions: 20, duration_minutes: 30, is_free: false, order: 2, tags: ['evaluasi', 'refleksi'] },
  { id: 'utbk-lbi-03', subject_id: 'utbk-lbi', code: 'LBI-03', name: 'Paket 3 — Teks Kompleks Lintas Disiplin', description: 'Teks sains, ekonomi, sosial-budaya, dan humaniora dalam bingkai literasi Bahasa Indonesia.', difficulty: 'SULIT', total_questions: 25, duration_minutes: 35, is_free: false, order: 3, tags: ['interdisiplin', 'kompleks'] },
  { id: 'utbk-lbi-04', subject_id: 'utbk-lbi', code: 'LBI-04', name: 'Paket 4 — Simulasi Literasi Indonesia', description: 'Simulasi penuh 30 soal setara UTBK Literasi Bahasa Indonesia.', difficulty: 'SULIT', total_questions: 30, duration_minutes: 40, is_free: false, order: 4, tags: ['simulasi'] },
];

const PM_PACKAGES: Package[] = [
  { id: 'utbk-pm-01', subject_id: 'utbk-pm', code: 'PM-01', name: 'Paket 1 — Aritmetika & Data Kontekstual', description: 'Persentase, rasio, diskon, pajak, dan interpretasi grafik/tabel dalam konteks nyata.', difficulty: 'MUDAH', total_questions: 15, duration_minutes: 25, is_free: true,  order: 1, tags: ['aritmetika', 'data', 'kontekstual'] },
  { id: 'utbk-pm-02', subject_id: 'utbk-pm', code: 'PM-02', name: 'Paket 2 — Aljabar & Penalaran', description: 'Persamaan, pertidaksamaan, pola, dan pemodelan matematika dalam situasi kehidupan.', difficulty: 'SEDANG', total_questions: 15, duration_minutes: 25, is_free: false, order: 2, tags: ['aljabar', 'penalaran'] },
  { id: 'utbk-pm-03', subject_id: 'utbk-pm', code: 'PM-03', name: 'Paket 3 — Geometri & Probabilitas Kontekstual', description: 'Bangun ruang, transformasi, peluang terapan, dan pengambilan keputusan.', difficulty: 'SULIT', total_questions: 15, duration_minutes: 30, is_free: false, order: 3, tags: ['geometri', 'probabilitas'] },
  { id: 'utbk-pm-04', subject_id: 'utbk-pm', code: 'PM-04', name: 'Paket 4 — Simulasi Penalaran Matematika', description: 'Simulasi penuh 20 soal PM setara UTBK dengan data autentik.', difficulty: 'SULIT', total_questions: 20, duration_minutes: 35, is_free: false, order: 4, tags: ['simulasi'] },
];

// ─── Master package registry ──────────────────────────────────────────────────
export const ALL_PACKAGES: Package[] = [
  ...BIND_PACKAGES,
  ...MAT_PACKAGES,
  ...BING_PACKAGES,
  ...FIS_PACKAGES,
  ...KIM_PACKAGES,
  ...EKO_PACKAGES,
  ...PU_PACKAGES,
  ...LBI_PACKAGES,
  ...PM_PACKAGES,
];

export const PACKAGES_BY_SUBJECT: Record<string, Package[]> = {
  'tka-bind':   BIND_PACKAGES,
  'tka-mat':    MAT_PACKAGES,
  'tka-bing':   BING_PACKAGES,
  'tka-fis':    FIS_PACKAGES,
  'tka-kim':    KIM_PACKAGES,
  'tka-eko':    EKO_PACKAGES,
  'utbk-pu':    PU_PACKAGES,
  'utbk-lbi':   LBI_PACKAGES,
  'utbk-pm':    PM_PACKAGES,
};

export function getPackageById(id: string): Package | undefined {
  return ALL_PACKAGES.find(p => p.id === id);
}

export function getPackagesBySubject(subjectId: string): Package[] {
  return PACKAGES_BY_SUBJECT[subjectId] ?? [];
}
