'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, Lock, Play } from 'lucide-react';
import { UTBK_SUBJECTS } from '@/lib/constants';
import { getPackagesBySubject } from '@/data/packages';
import { DifficultyBadge, FreeBadge } from '@/components/ui/Badge';
import { formatDuration } from '@/lib/utils';

export default function UTBKSubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject  = UTBK_SUBJECTS.find(s => s.id === subjectId);
  const packages = getPackagesBySubject(subjectId ?? '');

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-white/60">Komponen tidak ditemukan.</p>
          <Link href="/utbk" className="text-purple-400 hover:underline mt-4 inline-block">Kembali ke UTBK</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/utbk" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
        <ArrowLeft size={16} /> Kembali ke UTBK/SNBT
      </Link>

      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">{subject.icon}</div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-display">UTBK/SNBT</p>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{subject.name}</h1>
          </div>
        </div>
        <p className="text-white/50 leading-relaxed max-w-2xl">{subject.description}</p>
      </motion.div>

      {packages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-white/60">Paket soal sedang dipersiapkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-white/30">{pkg.code}</span>
                    <h3 className="font-semibold text-white text-sm leading-snug mt-0.5">{pkg.name}</h3>
                  </div>
                  <FreeBadge isFree={pkg.is_free} />
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{pkg.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1"><BookOpen size={12} /> {pkg.total_questions} soal</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {formatDuration(pkg.duration_minutes)}</span>
                  <DifficultyBadge difficulty={pkg.difficulty} />
                </div>
                <div className="mt-auto pt-3 border-t border-white/[0.06]">
                  {pkg.is_free ? (
                    <Link href={`/exam/${pkg.id}`} className="btn-primary w-full flex items-center justify-center gap-2 !py-2.5 text-sm">
                      <Play size={14} /> Mulai Latihan
                    </Link>
                  ) : (
                    <button disabled className="btn-secondary w-full flex items-center justify-center gap-2 !py-2.5 text-sm opacity-70 cursor-not-allowed">
                      <Lock size={14} /> Premium (Segera Hadir)
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
