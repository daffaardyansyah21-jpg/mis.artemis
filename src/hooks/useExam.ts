'use client';

import { useState, useCallback, useRef } from 'react';
import type { Question, UserAnswer, ExamSession } from '@/types';
import { generateSessionId } from '@/lib/utils';

interface UseExamOptions {
  packageId: string;
  questions: Question[];
  durationMinutes: number;
}

export function useExam({ packageId, questions, durationMinutes }: UseExamOptions) {
  const sessionId = useRef(generateSessionId());
  const startedAt = useRef(new Date().toISOString());
  const questionTimers = useRef<Record<string, number>>({});
  const lastQuestionTime = useRef<number>(Date.now());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Rekam waktu yang dihabiskan di soal saat berpindah
  const recordTimeOnQuestion = useCallback((questionId: string) => {
    const now = Date.now();
    const elapsed = Math.round((now - lastQuestionTime.current) / 1000);
    questionTimers.current[questionId] = (questionTimers.current[questionId] ?? 0) + elapsed;
    lastQuestionTime.current = now;
  }, []);

  const goTo = useCallback((index: number) => {
    if (isFinished) return;
    recordTimeOnQuestion(questions[currentIndex]?.id);
    setCurrentIndex(Math.max(0, Math.min(questions.length - 1, index)));
  }, [currentIndex, isFinished, questions, recordTimeOnQuestion]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  /** Pilih / batalkan pilihan jawaban */
  const selectAnswer = useCallback((questionId: string, optionId: string, type: Question['type']) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? {
        question_id: questionId,
        selected_ids: [],
        is_bookmarked: false,
        is_flagged: false,
        time_spent_seconds: 0,
        answered_at: new Date().toISOString(),
      };

      let selected: string[];
      if (type === 'PGS') {
        // Toggle: jika sudah dipilih → batalkan; jika belum → pilih
        selected = current.selected_ids.includes(optionId) ? [] : [optionId];
      } else {
        // MCMA & KATEGORI: multi-select
        selected = current.selected_ids.includes(optionId)
          ? current.selected_ids.filter(id => id !== optionId)
          : [...current.selected_ids, optionId];
      }

      return {
        ...prev,
        [questionId]: { ...current, selected_ids: selected, answered_at: new Date().toISOString() },
      };
    });
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? {
        question_id: questionId, selected_ids: [], is_bookmarked: false, is_flagged: false, time_spent_seconds: 0,
      };
      return { ...prev, [questionId]: { ...current, is_bookmarked: !current.is_bookmarked } };
    });
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? {
        question_id: questionId, selected_ids: [], is_bookmarked: false, is_flagged: false, time_spent_seconds: 0,
      };
      return { ...prev, [questionId]: { ...current, is_flagged: !current.is_flagged } };
    });
  }, []);

  const finishExam = useCallback((): ExamSession => {
    // Rekam waktu di soal terakhir
    recordTimeOnQuestion(questions[currentIndex]?.id);

    // Masukkan time_spent ke answers
    const finalAnswers: Record<string, UserAnswer> = {};
    for (const q of questions) {
      finalAnswers[q.id] = {
        ...(answers[q.id] ?? {
          question_id: q.id, selected_ids: [], is_bookmarked: false, is_flagged: false, time_spent_seconds: 0,
        }),
        time_spent_seconds: questionTimers.current[q.id] ?? 0,
      };
    }

    setIsFinished(true);
    const session: ExamSession = {
      id: sessionId.current,
      user_id: 'demo-user',
      package_id: packageId,
      started_at: startedAt.current,
      finished_at: new Date().toISOString(),
      duration_minutes: durationMinutes,
      answers: finalAnswers,
      current_question_index: currentIndex,
      status: 'FINISHED',
    };

    // Simpan ke localStorage untuk demo (Supabase di production)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`session_${sessionId.current}`, JSON.stringify({ session, questions }));
    }
    return session;
  }, [answers, currentIndex, durationMinutes, packageId, questions, recordTimeOnQuestion]);

  // Statistik navigasi
  const answeredCount  = Object.values(answers).filter(a => a.selected_ids.length > 0).length;
  const flaggedCount   = Object.values(answers).filter(a => a.is_flagged).length;
  const bookmarkCount  = Object.values(answers).filter(a => a.is_bookmarked).length;
  const unansweredCount = questions.length - answeredCount;

  return {
    sessionId: sessionId.current,
    currentIndex,
    currentQuestion,
    answers,
    isFinished,
    answeredCount,
    flaggedCount,
    bookmarkCount,
    unansweredCount,
    goTo,
    goNext,
    goPrev,
    selectAnswer,
    toggleBookmark,
    toggleFlag,
    finishExam,
  };
}
