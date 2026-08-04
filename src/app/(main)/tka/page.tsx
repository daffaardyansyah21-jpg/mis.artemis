'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Info } from 'lucide-react';
import { TKA_SUBJECTS } from '@/lib/constants';
import { DifficultyBadge, Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { key: 'WAJIB',       label: '📋 Mata Pelajaran Wajib',  description: 'Diikuti oleh semua peserta TKA' },
  { key: 'SAINTEK',     label: '🔬 Kelompok Saintek',       description: 'Matematika Lanjut · Fisika · Kimia · Biologi · Informatika' },
  { key: 'SOSHUM',      label: '🌏 Kelompok Soshum',        description: 'Geografi · Sejarah · Sosiologi · Ekonomi · Antropologi' },
  { key: 'BAHASA_SENI', label: '🌐 Kelompok Bahasa & Seni', description: 'Bahasa Arab · Mandarin · Jepang · Korea · Jerman · Perancis · Spanyol · Seni/Desain · Pendidikan Pancasila' },
];

export default function TKAPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-display">Latihan Soal</p>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              <span className="gradient-text">TKA</span> — Tes Kemampuan Akademik
            </h1>
            <p className="text-white/50 max-w-2xl leading-relaxed">
              Berlatih dengan soal-soal berformat resmi TKA 2026. Setiap peserta mengerjakan 3 mata pelajaran wajib dan memilih 2 dari 19 mata pelajaran pilihan.
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 glass-card p-5 border-l-4 border-l-purple-500/60">
          <div className="flex gap-3">
            <Info size={18} className="text-purple-400 shrink-0 mt-0.5" />
            <div className="text-sm text-white/60 leading-relaxed">
              <strong className="text-white/80">Format TKA 2026:</strong> Tiga tipe soal — Pilihan Ganda Sederhana (PGS), Pilihan Ganda Kompleks/MCMA, dan Soal Kategori. Sistem penilaian di Artemis adalah simulasi edukatif dan bukan representasi nilai resmi TKA.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subject groups */}
      <div className="space-y-10">
        {CATEGORIES.map((cat, ci) => {
          const subjects = TKA_SUBJECTS.filter(s => s.category === cat.key);
          if (!subjects.length) return null;
          return (
            <motion.section
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.1 }}
            >
              <div className="mb-5">
                <h2 className="text-lg font-display font-semibold text-white">{cat.label}</h2>
                <p className="text-xs text-white/40 mt-1">{cat.description}</p>
              </div>

              <div className={cn(
                'grid gap-4',
                cat.key === 'WAJIB' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
              )}>
                {subjects.map((subj, i) => (
                  <motion.div
                    key={subj.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: ci * 0.1 + i * 0.06 }}
                  >
                    <Link href={`/tka/${subj.id}`} className="glass-card p-6 flex flex-col gap-4 group block">
                      {/* Icon & category */}
                      <div className="flex items-start justify-between">
                        <div className="text-3xl">{subj.icon}</div>
                        {cat.key === 'WAJIB'
                          ? <Badge variant="purple" size="sm">Wajib</Badge>
                          : <Badge variant="cyan" size="sm">Pilihan</Badge>
                        }
                      </div>
                      {/* Name & desc */}
                      <div>
                        <h3 className={cn('font-semibold text-base text-white group-hover:text-purple-300 transition-colors', subj.color)}>
                          {subj.name}
                        </h3>
                        <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-2">{subj.description}</p>
                      </div>
                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.06]">
                        <span className="text-xs text-white/40">{subj.total_packages} paket latihan</span>
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
    </div>
  );
}
