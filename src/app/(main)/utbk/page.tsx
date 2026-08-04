'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Info, Clock, BookOpen } from 'lucide-react';
import { UTBK_SUBJECTS, EXAM_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const CATEGORIES = [
  { key: 'TPS',      label: '🧠 Tes Potensi Skolastik (TPS)',  description: '70 soal — Penalaran Umum · PPU · PBM · PK', color: 'from-purple-500/15 to-blue-500/15', border: 'border-purple-500/20' },
  { key: 'LITERASI', label: '📖 Tes Literasi',                description: '80 soal — Literasi B. Indonesia · B. Inggris · Penalaran Matematika', color: 'from-cyan-500/15 to-emerald-500/15', border: 'border-cyan-500/20' },
];

export default function UTBKPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-display">Latihan Soal</p>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          <span className="gradient-text">UTBK/SNBT</span> — Seleksi Nasional
        </h1>
        <p className="text-white/50 max-w-2xl leading-relaxed">
          Simulasi UTBK 2026 dengan 150 soal dalam 195 menit. Sistem penilaian berbasis IRT (Item Response Theory) — soal sulit yang benar bernilai lebih tinggi.
        </p>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Soal', value: '150' },
            { label: 'Durasi', value: '195 mnt' },
            { label: 'Blok Ujian', value: '2 blok' },
            { label: 'Penilaian', value: 'IRT' },
          ].map(m => (
            <div key={m.label} className="glass-card p-4 text-center">
              <div className="text-xl font-display font-bold gradient-text">{m.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-5 glass-card p-5 border-l-4 border-l-cyan-500/60">
          <div className="flex gap-3">
            <Info size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-sm text-white/60 leading-relaxed">
              <strong className="text-white/80">Tidak ada penalti nilai</strong> untuk jawaban salah. Sistem IRT Artemis adalah simulasi edukatif — bukan skor resmi UTBK.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      {CATEGORIES.map((cat, ci) => {
        const subjects = UTBK_SUBJECTS.filter(s => s.category === cat.key);
        return (
          <motion.section
            key={cat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.12 }}
            className="mb-10"
          >
            <div className="mb-5">
              <h2 className="text-lg font-display font-semibold text-white">{cat.label}</h2>
              <p className="text-xs text-white/40 mt-1">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {subjects.map((subj, i) => (
                <motion.div
                  key={subj.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.1 + i * 0.06 }}
                >
                  <Link href={`/utbk/${subj.id}`} className="glass-card p-6 flex flex-col gap-4 group block h-full">
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">{subj.icon}</div>
                      <Badge variant={cat.key === 'TPS' ? 'purple' : 'cyan'} size="sm">
                        {cat.key === 'TPS' ? 'TPS' : 'Literasi'}
                      </Badge>
                    </div>
                    <div>
                      <h3 className={cn('font-semibold text-sm text-white group-hover:text-purple-300 transition-colors', subj.color)}>
                        {subj.name}
                      </h3>
                      <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-3">{subj.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.06]">
                      <span className="text-xs text-white/40">{subj.total_packages} paket</span>
                      <ChevronRight size={16} className="text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
