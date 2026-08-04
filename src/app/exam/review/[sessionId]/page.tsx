'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Minus, ChevronDown, ChevronUp, Home, RotateCcw, BarChart3, BookOpen, Lightbulb, AlertTriangle, Target } from 'lucide-react';
import { calculateResult, formatScore, formatPct, cn, getScoreBand, formatSeconds } from '@/lib/utils';
import type { ExamResult, Question, UserAnswer } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

export default function ReviewPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'soal'>('ringkasan');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(`session_${sessionId}`);
    if (!raw) return;
    try {
      const { session, questions: qs } = JSON.parse(raw) as { session: any; questions: Question[] };
      const r = calculateResult(qs, session.answers, session.duration_minutes);
      setResult({
        ...r,
        session_id: session.id,
        package_id: session.package_id,
        completed_at: session.finished_at ?? new Date().toISOString(),
      });
      setQuestions(qs);
    } catch { /* ignore */ }
  }, [sessionId]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Memuat hasil ujian...</p>
        </div>
      </div>
    );
  }

  const band = getScoreBand(result.score);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 text-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/5" />
          <div className="relative z-10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-display">Hasil Simulasi</p>
            {/* Score ring */}
            <div className="relative w-36 h-36 mx-auto my-4">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" strokeWidth="8" className="score-ring-track" />
                <circle
                  cx="60" cy="60" r="50" strokeWidth="8"
                  className="score-ring-fill"
                  stroke={result.score >= 75 ? '#10f5a0' : result.score >= 60 ? '#06d6f5' : result.score >= 45 ? '#f59e0b' : '#ef4444'}
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.score / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-white">{result.score}</span>
                <span className="text-xs text-white/40">/ 100</span>
              </div>
            </div>
            <h2 className={cn('text-xl font-display font-bold mb-1', band.color)}>{band.label}</h2>
            <p className="text-white/50 text-sm">{band.description}</p>
            <p className="text-xs text-white/30 mt-2">
              Estimasi persentil: <span className="text-white/60 font-medium">Top {100 - result.estimated_rank_pct}%</span>
            </p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Benar',   value: result.correct_count,   pct: result.accuracy_pct,        color: 'text-emerald-400', icon: CheckCircle },
            { label: 'Salah',   value: result.incorrect_count, pct: 100 - result.accuracy_pct - (result.empty_count / result.total_questions * 100), color: 'text-red-400', icon: XCircle },
            { label: 'Kosong',  value: result.empty_count,     pct: (result.empty_count / result.total_questions) * 100, color: 'text-white/40', icon: Minus },
            { label: 'Kecepatan', value: `${result.avg_time_per_question_seconds}d`, pct: null, color: 'text-purple-400', icon: Target },
          ].map(s => (
            <div key={s.label} className="glass-card p-4 text-center">
              <s.icon size={18} className={cn('mx-auto mb-2', s.color)} />
              <div className={cn('text-2xl font-display font-bold', s.color)}>{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
              {s.pct !== null && <div className="text-[10px] text-white/30 mt-0.5">{Math.round(s.pct)}%</div>}
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['ringkasan', 'soal'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn('px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
                activeTab === tab ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/50 hover:text-white hover:bg-white/5')}>
              {tab === 'ringkasan' ? '📊 Ringkasan' : '📋 Tiap Soal'}
            </button>
          ))}
        </div>

        {activeTab === 'ringkasan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Topic breakdown */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                <BarChart3 size={18} className="text-purple-400" /> Performa per Topik
              </h3>
              <div className="space-y-4">
                {result.topic_breakdown.map(t => (
                  <div key={t.topic}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-white/70">{t.topic}</span>
                      <span className="text-sm font-medium text-white">{t.correct}/{t.total}</span>
                    </div>
                    <ProgressBar
                      value={t.accuracy_pct}
                      color={t.accuracy_pct >= 75 ? 'green' : t.accuracy_pct >= 50 ? 'cyan' : 'amber'}
                      size="sm"
                      showValue
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400" /> Kekuatan
                </h3>
                {result.strengths.length ? (
                  <ul className="space-y-2">
                    {result.strengths.map(s => (
                      <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-white/40">Belum ada data cukup.</p>}
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" /> Perlu Diperkuat
                </h3>
                {result.weaknesses.length ? (
                  <ul className="space-y-2">
                    {result.weaknesses.map(w => (
                      <li key={w} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" /> {w}
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-white/40 italic">Semua topik di atas rata-rata!</p>}
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb size={16} className="text-cyan-400" /> Rekomendasi Belajar
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-cyan-400 shrink-0 mt-0.5">→</span> {r}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-white/30 mt-4 italic">
                  * Sistem penilaian adalah simulasi edukatif, bukan nilai resmi TKA/UTBK.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'soal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {result.question_results.map((qr, i) => (
              <div key={qr.question.id} className={cn(
                'glass-card overflow-hidden',
                qr.is_correct ? 'border-emerald-500/20' : qr.user_answer.selected_ids.length === 0 ? 'border-white/10' : 'border-red-500/20',
              )}>
                {/* Question header */}
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedId(expandedId === qr.question.id ? null : qr.question.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center',
                      qr.is_correct ? 'bg-emerald-500/20' : qr.user_answer.selected_ids.length === 0 ? 'bg-white/[0.05]' : 'bg-red-500/20',
                    )}>
                      {qr.is_correct
                        ? <CheckCircle size={16} className="text-emerald-400" />
                        : qr.user_answer.selected_ids.length === 0
                          ? <Minus size={16} className="text-white/30" />
                          : <XCircle size={16} className="text-red-400" />
                      }
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">Soal {i + 1}</span>
                      <span className="text-xs text-white/40 ml-2">{qr.question.topic}</span>
                    </div>
                  </div>
                  {expandedId === qr.question.id ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
                </button>

                {/* Expanded detail */}
                {expandedId === qr.question.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/[0.06] p-5 space-y-5"
                  >
                    {/* Question text */}
                    <div>
                      <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Pertanyaan</p>
                      <p className="text-sm text-white/80 whitespace-pre-line leading-relaxed">{qr.question.question_text}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {qr.question.options.map(opt => {
                        const isCorrect  = qr.question.correct_answer_ids.includes(opt.id);
                        const isSelected = qr.user_answer.selected_ids.includes(opt.id);
                        return (
                          <div key={opt.id} className={cn(
                            'flex items-start gap-3 p-3 rounded-xl text-sm border',
                            isCorrect && isSelected  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' :
                            isCorrect                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                            isSelected               ? 'bg-red-500/15 border-red-500/40 text-red-300' :
                                                       'bg-white/[0.02] border-white/[0.05] text-white/50',
                          )}>
                            <span className="shrink-0 font-display font-bold text-xs w-5">{opt.label}</span>
                            <span>{opt.text}</span>
                            {isCorrect && <CheckCircle size={14} className="text-emerald-400 shrink-0 ml-auto mt-0.5" />}
                            {isSelected && !isCorrect && <XCircle size={14} className="text-red-400 shrink-0 ml-auto mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="glass p-4 rounded-xl border border-purple-500/20 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-purple-400 mb-1 uppercase tracking-wider flex items-center gap-1.5"><BookOpen size={12} /> Pembahasan</p>
                        <p className="text-sm text-white/70 leading-relaxed">{qr.question.explanation}</p>
                      </div>
                      {qr.question.concept_tested && (
                        <div>
                          <p className="text-xs font-semibold text-cyan-400 mb-1">Konsep yang Diuji</p>
                          <p className="text-xs text-white/60">{qr.question.concept_tested}</p>
                        </div>
                      )}
                      {qr.question.common_mistakes && (
                        <div>
                          <p className="text-xs font-semibold text-amber-400 mb-1">Kesalahan Umum</p>
                          <p className="text-xs text-white/60">{qr.question.common_mistakes}</p>
                        </div>
                      )}
                      {qr.question.study_tips && (
                        <div>
                          <p className="text-xs font-semibold text-emerald-400 mb-1">💡 Tips</p>
                          <p className="text-xs text-white/60">{qr.question.study_tips}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/dashboard" className="btn-secondary flex-1 flex items-center justify-center gap-2 !py-3">
            <Home size={16} /> Dashboard
          </Link>
          <Link href={`/tka`} className="btn-primary flex-1 flex items-center justify-center gap-2 !py-3">
            <RotateCcw size={16} /> Latihan Lagi
          </Link>
        </div>
      </div>
    </div>
  );
}
