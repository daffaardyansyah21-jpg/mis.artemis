'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Bookmark, Flag, X,
  AlertTriangle, Clock, CheckSquare, List, Send,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getPackageById } from '@/data/packages';
import { getQuestionsByPackageId } from '@/data/questions';
import { useExam } from '@/hooks/useExam';
import { useTimer } from '@/hooks/useTimer';
import { formatSeconds, cn, calculateResult } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function ExamPage() {
  const { packageId } = useParams<{ packageId: string }>();
  const router = useRouter();

  const pkg       = getPackageById(packageId ?? '');
  const questions = getQuestionsByPackageId(packageId ?? '');

  const [showNav,     setShowNav]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [started,     setStarted]     = useState(false);

  const {
    sessionId, currentIndex, currentQuestion, answers, isFinished,
    answeredCount, flaggedCount, unansweredCount,
    goTo, goNext, goPrev, selectAnswer, toggleBookmark, toggleFlag, finishExam,
  } = useExam({
    packageId: packageId ?? '',
    questions,
    durationMinutes: pkg?.duration_minutes ?? 60,
  });

  const handleExpire = useCallback(() => {
    toast.error('Waktu habis! Ujian diserahkan otomatis.');
    const session = finishExam();
    router.push(`/exam/review/${session.id}`);
  }, [finishExam, router]);

  const { secondsLeft, isWarning, isCritical, pct: timerPct } = useTimer({
    initialSeconds: (pkg?.duration_minutes ?? 60) * 60,
    onExpire: handleExpire,
    autoStart: started,
  });

  const handleSubmit = useCallback(() => {
    const session = finishExam();
    router.push(`/exam/review/${session.id}`);
  }, [finishExam, router]);

  // Landing screen
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 max-w-lg w-full text-center">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">{pkg?.name ?? 'Paket Soal'}</h1>
          <p className="text-white/50 text-sm mb-6">{pkg?.description}</p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Soal', value: pkg?.total_questions ?? questions.length },
              { label: 'Durasi', value: `${pkg?.duration_minutes ?? 60} mnt` },
              { label: 'Kesulitan', value: pkg?.difficulty ?? '-' },
            ].map(m => (
              <div key={m.label} className="glass p-3 rounded-xl border border-white/10 text-center">
                <div className="text-base font-display font-bold text-white">{m.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="glass p-4 rounded-xl border border-amber-500/20 text-left mb-8">
            <p className="text-xs text-amber-400/80 font-medium mb-1">⚠️ Sebelum Memulai</p>
            <ul className="text-xs text-white/50 space-y-1 list-disc list-inside">
              <li>Timer akan berjalan setelah kamu klik "Mulai"</li>
              <li>Kamu bisa menavigasi soal bebas</li>
              <li>Gunakan 🔖 bookmark & 🚩 flag untuk menandai soal</li>
              <li>Sistem penilaian adalah simulasi — bukan nilai resmi</li>
            </ul>
          </div>
          <Button onClick={() => setStarted(true)} size="lg" className="w-full">
            Mulai Sekarang
          </Button>
          <Button variant="ghost" onClick={() => router.back()} className="w-full mt-3 text-sm">
            Kembali
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!pkg || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-white/60">Paket soal tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id];
  const selectedIds   = currentAnswer?.selected_ids ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Exam Header ──────────────────────────────────────────────────── */}
      <div className="glass border-b border-white/[0.06] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Package name */}
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setShowConfirm(true)} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
              <X size={18} />
            </button>
            <span className="text-sm font-medium text-white truncate">{pkg.name}</span>
          </div>

          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
            <CheckSquare size={14} />
            <span>{answeredCount}/{questions.length} dijawab</span>
          </div>

          {/* Timer */}
          <div className={cn(
            'flex items-center gap-2 glass px-3 py-1.5 rounded-lg border font-mono text-sm font-semibold',
            isCritical ? 'border-red-500/40 text-red-400 animate-pulse' : isWarning ? 'border-amber-500/40 text-amber-400' : 'border-white/10 text-white/80',
          )}>
            <Clock size={14} />
            {formatSeconds(secondsLeft)}
          </div>

          {/* Nav toggle */}
          <button onClick={() => setShowNav(p => !p)} className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5">
            <List size={14} /> Navigasi
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/[0.05]">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ─── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex gap-6">
        {/* Question panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-6 sm:p-8"
            >
              {/* Question header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm font-display font-bold text-purple-400">
                    {currentIndex + 1}
                  </div>
                  <div>
                    <div className="text-xs text-white/40">{currentQuestion.chapter}</div>
                    <div className="text-[10px] text-white/30">{currentQuestion.topic}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentQuestion.type !== 'PGS' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-medium">
                      {currentQuestion.type === 'MCMA' ? 'Multi-Jawaban' : 'Kategori B/S'}
                    </span>
                  )}
                  <button onClick={() => toggleBookmark(currentQuestion.id)} className={cn('p-2 rounded-lg transition-colors', currentAnswer?.is_bookmarked ? 'text-amber-400 bg-amber-500/15' : 'text-white/30 hover:text-amber-400 hover:bg-amber-500/10')}>
                    <Bookmark size={16} />
                  </button>
                  <button onClick={() => toggleFlag(currentQuestion.id)} className={cn('p-2 rounded-lg transition-colors', currentAnswer?.is_flagged ? 'text-rose-400 bg-rose-500/15' : 'text-white/30 hover:text-rose-400 hover:bg-rose-500/10')}>
                    <Flag size={16} />
                  </button>
                </div>
              </div>

              {/* Question text */}
              <div className="text-white/90 text-sm leading-relaxed whitespace-pre-line mb-8">
                {currentQuestion.question_text}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map(opt => {
                  const isSelected = selectedIds.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectAnswer(currentQuestion.id, opt.id, currentQuestion.type)}
                      className={cn(
                        'w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200',
                        'border text-sm',
                        isSelected
                          ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-neon-purple'
                          : 'bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-white/20 hover:text-white',
                      )}
                    >
                      <span className={cn(
                        'shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-display font-bold',
                        isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-white/20 text-white/50',
                      )}>
                        {opt.label}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* MCMA hint */}
              {currentQuestion.type === 'MCMA' && (
                <p className="mt-4 text-xs text-amber-400/70 flex items-center gap-1.5">
                  <AlertTriangle size={12} /> Soal ini dapat memiliki lebih dari satu jawaban benar. Pilih semua yang tepat.
                </p>
              )}
              {currentQuestion.type === 'KATEGORI' && (
                <p className="mt-4 text-xs text-cyan-400/70 flex items-center gap-1.5">
                  <AlertTriangle size={12} /> Tentukan BENAR atau SALAH untuk setiap pernyataan di atas.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-5">
            <Button
              variant="ghost"
              onClick={goPrev}
              disabled={currentIndex === 0}
              leftIcon={<ChevronLeft size={16} />}
            >
              Sebelumnya
            </Button>
            <span className="text-xs text-white/30 font-mono">{currentIndex + 1} / {questions.length}</span>
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="secondary"
                onClick={goNext}
                rightIcon={<ChevronRight size={16} />}
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirm(true)}
                rightIcon={<Send size={15} />}
              >
                Selesai & Kirim
              </Button>
            )}
          </div>
        </div>

        {/* ─── Side Navigator ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden lg:block overflow-hidden shrink-0"
            >
              <div className="glass-card p-5 w-60 sticky top-20">
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Navigator Soal</h3>
                {/* Legend */}
                <div className="grid grid-cols-2 gap-1.5 mb-4 text-[10px] text-white/40">
                  {[
                    { color: 'bg-cyan-500/40 border-cyan-500/60', label: 'Dijawab' },
                    { color: 'bg-rose-500/40 border-rose-500/60', label: 'Diflag' },
                    { color: 'bg-amber-500/40 border-amber-500/60', label: 'Bookmark' },
                    { color: 'bg-purple-500/40 border-purple-500/60', label: 'Sekarang' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={cn('w-3 h-3 rounded border', l.color)} />
                      {l.label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-1.5 mb-5">
                  {questions.map((q, i) => {
                    const ans = answers[q.id];
                    return (
                      <button
                        key={q.id}
                        onClick={() => goTo(i)}
                        className={cn(
                          'q-nav-btn',
                          i === currentIndex ? 'current' : ans?.is_flagged ? 'flagged' : ans?.is_bookmarked ? 'bookmarked' : (ans?.selected_ids.length ?? 0) > 0 ? 'answered' : '',
                        )}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                {/* Summary */}
                <div className="space-y-2 text-xs border-t border-white/[0.06] pt-4">
                  {[
                    { label: 'Dijawab',    value: answeredCount,    color: 'text-cyan-400' },
                    { label: 'Belum',      value: unansweredCount,  color: 'text-white/40' },
                    { label: 'Diflag',     value: flaggedCount,     color: 'text-rose-400' },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between">
                      <span className="text-white/40">{s.label}</span>
                      <span className={cn('font-mono font-semibold', s.color)}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <Button size="sm" onClick={() => setShowConfirm(true)} className="w-full mt-4">
                  Kirim Jawaban
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Confirm Modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-3xl text-center mb-4">📋</div>
              <h2 className="text-lg font-display font-bold text-white text-center mb-2">Kirim Jawaban?</h2>
              <p className="text-white/50 text-sm text-center mb-6 leading-relaxed">
                Pastikan semua soal sudah dijawab sebelum mengirim.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                {[
                  { label: 'Dijawab', value: answeredCount, color: 'text-emerald-400' },
                  { label: 'Belum', value: unansweredCount, color: 'text-amber-400' },
                  { label: 'Diflag', value: flaggedCount, color: 'text-rose-400' },
                ].map(s => (
                  <div key={s.label} className="glass p-3 rounded-xl border border-white/10">
                    <div className={cn('text-xl font-display font-bold', s.color)}>{s.value}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setShowConfirm(false)} className="flex-1">Kembali</Button>
                <Button onClick={handleSubmit} className="flex-1">Kirim Sekarang</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
