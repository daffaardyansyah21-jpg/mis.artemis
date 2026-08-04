import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ExamResult, Question, UserAnswer } from '@/types';
import { SCORE_BANDS } from './constants';

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Format angka & waktu ────────────────────────────────────────────────────

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} menit`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} jam ${m} menit` : `${h} jam`;
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function formatPct(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins < 1)    return 'Baru saja';
  if (mins < 60)   return `${mins} menit lalu`;
  if (hours < 24)  return `${hours} jam lalu`;
  if (days < 7)    return `${days} hari lalu`;
  return formatDate(dateStr);
}

// ─── Kalkulasi skor ──────────────────────────────────────────────────────────

/**
 * Menghitung apakah jawaban pengguna benar untuk satu soal.
 * - PGS: satu jawaban tepat → benar semua
 * - MCMA: semua jawaban benar harus dipilih, tidak boleh salah memilih
 * - KATEGORI: sama dengan MCMA (semua pernyataan harus tepat)
 */
export function isAnswerCorrect(question: Question, answer: UserAnswer): boolean {
  if (!answer || answer.selected_ids.length === 0) return false;

  const correct  = new Set(question.correct_answer_ids);
  const selected = new Set(answer.selected_ids);

  if (correct.size !== selected.size) return false;
  for (const id of correct) {
    if (!selected.has(id)) return false;
  }
  return true;
}

/**
 * Menghitung hasil ujian dari sesi yang telah selesai.
 * Sistem penilaian adalah simulasi edukatif, bukan sistem resmi.
 */
export function calculateResult(
  questions: Question[],
  answers: Record<string, UserAnswer>,
  durationMinutes: number,
): Omit<ExamResult, 'session_id' | 'package_id' | 'package' | 'completed_at'> {
  const total = questions.length;
  let correct = 0;
  let incorrect = 0;
  let empty = 0;
  let totalTimeSpent = 0;

  const topicMap = new Map<string, { total: number; correct: number }>();
  const questionResults = [];

  for (const q of questions) {
    const ans = answers[q.id];
    const answered = ans && ans.selected_ids.length > 0;
    const correct_ans = answered ? isAnswerCorrect(q, ans) : false;

    if (!answered)       empty++;
    else if (correct_ans) correct++;
    else                  incorrect++;

    if (ans) totalTimeSpent += ans.time_spent_seconds ?? 0;

    // Per-topik
    if (!topicMap.has(q.topic)) topicMap.set(q.topic, { total: 0, correct: 0 });
    const t = topicMap.get(q.topic)!;
    t.total++;
    if (correct_ans) t.correct++;

    questionResults.push({
      question: q,
      user_answer: ans ?? { question_id: q.id, selected_ids: [], is_bookmarked: false, is_flagged: false, time_spent_seconds: 0 },
      is_correct: correct_ans,
      points_earned: correct_ans ? 1 : 0,
    });
  }

  const accuracy_pct = total > 0 ? (correct / total) * 100 : 0;
  // Skor simulasi 0–100 berdasarkan akurasi
  const score = Math.round(accuracy_pct);
  const timeTakenMinutes = Math.min(durationMinutes, Math.round(totalTimeSpent / 60));
  const avgTimePerQ = total > 0 ? Math.round(totalTimeSpent / total) : 0;

  // Breakdown topik
  const topicBreakdown = Array.from(topicMap.entries()).map(([topic, data]) => ({
    topic,
    total: data.total,
    correct: data.correct,
    accuracy_pct: data.total > 0 ? (data.correct / data.total) * 100 : 0,
  }));

  // Estimasi persentil ranking (simulasi kurva distribusi normal)
  const estimatedRankPct = Math.min(99, Math.max(1, Math.round(
    50 + (score - 60) * 1.2,
  )));

  // Kekuatan & kelemahan
  const sorted = [...topicBreakdown].sort((a, b) => b.accuracy_pct - a.accuracy_pct);
  const strengths     = sorted.slice(0, 3).filter(t => t.accuracy_pct >= 60).map(t => t.topic);
  const weaknesses    = sorted.slice(-3).filter(t => t.accuracy_pct < 60).map(t => t.topic);
  const recommendations = weaknesses.map(w => `Pelajari lebih lanjut topik: ${w}`);

  return {
    score,
    raw_score: correct,
    total_questions: total,
    correct_count: correct,
    incorrect_count: incorrect,
    empty_count: empty,
    accuracy_pct,
    time_taken_minutes: timeTakenMinutes,
    avg_time_per_question_seconds: avgTimePerQ,
    topic_breakdown: topicBreakdown,
    estimated_rank_pct: estimatedRankPct,
    strengths,
    weaknesses,
    recommendations,
    question_results: questionResults,
  };
}

// ─── Utilitas lainnya ────────────────────────────────────────────────────────

export function getScoreBand(score: number) {
  return SCORE_BANDS.find(b => score >= b.min) ?? SCORE_BANDS[SCORE_BANDS.length - 1];
}

export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
