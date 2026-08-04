'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Timer, BarChart3, Award, Users, CheckCircle, ChevronRight, Zap, Target, Brain } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] } }),
};

const stats = [
  { value: '10.000+', label: 'Soal Terstruktur' },
  { value: '15+',     label: 'Mata Pelajaran' },
  { value: '100%',    label: 'Gratis' },
  { value: 'Real-time', label: 'Analitik' },
];

const features = [
  {
    icon: BookOpen,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'Bank Soal Komprehensif',
    description: 'Ribuan soal TKA dan UTBK/SNBT terstruktur dengan tiga tipe: Pilihan Ganda Sederhana, Kompleks (MCMA), dan Soal Kategori — mengikuti format resmi 2026.',
  },
  {
    icon: Timer,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Simulasi Ujian Real-Time',
    description: 'Timer presisi, navigasi soal, fitur bookmark & flag, serta sistem evaluasi otomatis. Rasakan pengalaman ujian yang identik dengan kondisi aslinya.',
  },
  {
    icon: BarChart3,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Analitik Mendalam',
    description: 'Laporan performa per topik, radar chart kekuatan-kelemahan, estimasi persentil, dan rekomendasi materi yang dipersonalisasi.',
  },
  {
    icon: Brain,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    title: 'Pembahasan Tuntas',
    description: 'Setiap soal dilengkapi pembahasan, konsep yang diuji, kesalahan umum siswa, dan tips strategis untuk mengerjakan soal serupa.',
  },
  {
    icon: Target,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Paket Latihan Terstruktur',
    description: 'Soal diorganisir per paket dengan tingkat kesulitan progresif — dari latihan dasar hingga simulasi penuh setara ujian sesungguhnya.',
  },
  {
    icon: Zap,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Ringan & Responsif',
    description: 'Dirancang untuk kinerja optimal di segala perangkat — desktop, tablet, maupun ponsel — tanpa aplikasi tambahan.',
  },
];

const subjects = ['Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi', 'Geografi', 'Sosiologi', 'Sejarah', 'Penalaran Umum', 'Literasi B. Indonesia', 'Literasi B. Inggris', 'Penalaran Matematika', 'Informatika', 'Antropologi'];

export default function LandingPage() {
  return (
    <div className="min-h-screen font-body">
      {/* ─── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
              <div className="absolute inset-[3px] bg-[#060612] rounded-md rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-display font-bold text-cyan-400">A</span>
            </div>
            <span className="font-display font-bold text-lg text-white">{APP_CONFIG.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"    className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Masuk</Link>
            <Link href="/register" className="btn-primary text-sm !py-2 !px-5">Mulai Gratis</Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/15 border border-purple-500/30 text-purple-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Platform latihan TKA & UTBK 2026 terbaru
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-tight text-white mb-6"
          >
            Kuasai{' '}
            <span className="gradient-text">TKA & UTBK</span>
            <br />
            Raih PTN Impianmu
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Platform latihan soal berbasis simulasi cerdas untuk siswa SMA di seluruh Indonesia.
            Berlatih, analisis, dan berkembang bersama Artemis — sepenuhnya gratis.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-base !py-3.5 !px-8">
              Mulai Belajar Sekarang
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-base !py-3.5 !px-8">
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(s => (
              <div key={s.label} className="glass-card p-5 text-center">
                <div className="text-3xl font-display font-bold gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Dirancang untuk <span className="gradient-text">Hasil Terbaik</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Setiap fitur dirancang berdasarkan kebutuhan nyata siswa yang mempersiapkan TKA dan UTBK/SNBT.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card p-6 group"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${f.bg} group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Subject Marquee ─────────────────────────────────────────────── */}
      <section className="py-12 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-white/40 text-sm uppercase tracking-widest font-display">Mata Pelajaran Tersedia</p>
        </div>
        <div className="flex gap-4 animate-[marquee_30s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...subjects, ...subjects].map((s, i) => (
            <span key={i} className="glass px-5 py-2.5 rounded-full border border-white/10 text-sm text-white/60 whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Cara Kerja <span className="gradient-text">Artemis</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pilih Tes & Paket',    desc: 'Tentukan apakah kamu ingin berlatih TKA atau UTBK/SNBT, lalu pilih mata pelajaran dan paket soal sesuai level.' },
              { step: '02', title: 'Kerjakan Soal',         desc: 'Selesaikan soal dengan timer, navigasi soal, dan fitur flag/bookmark untuk menandai soal yang ingin ditinjau.' },
              { step: '03', title: 'Analisis & Perbaiki',   desc: 'Lihat hasil lengkap, pembahasan per soal, dan rekomendasi materi yang perlu diperkuat berdasarkan performamu.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
                  <span className="font-display font-bold text-xl gradient-text">{s.step}</span>
                </div>
                <h3 className="font-semibold text-white text-base mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Award className="text-amber-400 w-10 h-10" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Siap Mulai Perjalananmu?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Bergabunglah dengan ribuan siswa yang sudah meningkatkan skor mereka dengan Artemis. Daftar sekarang — gratis selamanya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-base !py-3.5 !px-8">
                  Daftar Sekarang — Gratis
                  <ArrowRight size={18} />
                </Link>
              </div>
              <p className="text-white/30 text-xs mt-6">Tidak perlu kartu kredit · Tanpa iklan · Selamanya gratis</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-md rotate-45" />
              <div className="absolute inset-[2px] bg-[#060612] rounded-sm rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-bold text-cyan-400">A</span>
            </div>
            <span className="font-display font-bold text-sm text-white">{APP_CONFIG.name}</span>
          </div>
          <p className="text-white/30 text-xs text-center">
            Platform simulasi edukasi — bukan representasi resmi nilai TKA/UTBK. &copy; 2026 Artemis.
          </p>
          <div className="flex gap-6">
            {[['Tentang', '/about'], ['Kontak', '/about#contact']].map(([l, h]) => (
              <Link key={l} href={h} className="text-white/40 hover:text-white/70 text-xs transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
