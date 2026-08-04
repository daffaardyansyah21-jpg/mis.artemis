'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, Lock, Play } from 'lucide-react';
import { TKA_SUBJECTS } from '@/lib/constants';
import { getPackagesBySubject } from '@/data/packages';
import { DifficultyBadge, FreeBadge } from '@/components/ui/Badge';
import { formatDuration } from '@/lib/utils';

export default function TKASubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject  = TKA_SUBJECTS.find(s => s.id === subjectId);
  const packages = getPackagesBySubject(subjectId ?? '');

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-white/60">Mata pelajaran tidak ditemukan.</p>
          <Link href="/tka" className="text-purple-400 hover:underline mt-4 inline-block">Kembali ke TKA</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back link */}
      <Link href="/tka" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
        <ArrowLeft size={16} /> Kembali ke TKA
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">{subject.icon}</div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-display">TKA</p>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{subject.name}</h1>
          </div>
        </div>
        <p className="text-white/50 leading-relaxed max-w-2xl">{subject.description}</p>
      </motion.div>

      {/* Package list */}
      {packages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-white/60">Paket soal sedang dipersiapkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="glass-card p-6 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-white/30">{pkg.code}</span>
                    </div>
                    <h3 className="font-semibold text-white text-sm leading-snug">{pkg.name}</h3>
                  </div>
                  <FreeBadge isFree={pkg.is_free} />
                </div>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed">{pkg.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1"><BookOpen size={12} /> {pkg.total_questions} soal</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {formatDuration(pkg.duration_minutes)}</span>
                  <DifficultyBadge difficulty={pkg.difficulty} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {pkg.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40">{t}</span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-3 border-t border-white/[0.06]">
                  {pkg.is_free ? (
                    <Link
                      href={`/exam/${pkg.id}`}
                      className="btn-primary w-full flex items-center justify-center gap-2 !py-2.5 text-sm"
                    >
                      <Play size={14} /> Mulai Latihan
                    </Link>
                  ) : (
                    <button
                      className="btn-secondary w-full flex items-center justify-center gap-2 !py-2.5 text-sm opacity-70 cursor-not-allowed"
                      disabled
                    >
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
