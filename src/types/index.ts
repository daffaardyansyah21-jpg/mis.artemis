// ─── Tipe Pengguna ───────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  school?: string;
  graduation_year?: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  total_sessions: number;
  total_questions_answered: number;
  average_score: number;
  best_score: number;
  total_study_time_minutes: number;
  streak_days: number;
  last_activity_at: string;
}

// ─── Tipe Ujian ──────────────────────────────────────────────────────────────

export type ExamType = 'TKA' | 'UTBK';
export type Difficulty = 'MUDAH' | 'SEDANG' | 'SULIT';
export type QuestionType = 'PGS' | 'MCMA' | 'KATEGORI'; // PGS = Pilihan Ganda Sederhana, MCMA = Multiple Correct, KATEGORI = True/False per item

export interface Subject {
  id: string;
  code: string;
  name: string;
  exam_type: ExamType;
  category: 'WAJIB' | 'SAINTEK' | 'SOSHUM' | 'BAHASA_SENI' | 'TPS' | 'LITERASI';
  description: string;
  icon: string;              // emoji atau nama ikon Lucide
  color: string;             // kelas Tailwind warna aksen
  total_packages: number;
}

export interface Package {
  id: string;
  subject_id: string;
  subject?: Subject;
  code: string;              // mis. "TKA-BIND-01"
  name: string;              // mis. "Paket 1 — Teks Sastra"
  description: string;
  difficulty: Difficulty;
  total_questions: number;
  duration_minutes: number;
  is_free: boolean;
  order: number;
  tags: string[];
}

export interface Question {
  id: string;
  package_id: string;
  order: number;
  type: QuestionType;
  question_text: string;
  question_image_url?: string;
  options: Option[];
  // Untuk tipe KATEGORI: setiap opsi menjadi pernyataan yang dinilai B/S
  correct_answer_ids: string[];  // id opsi yang benar
  difficulty: Difficulty;
  chapter: string;              // Bab/Topik utama
  topic: string;                // Sub-topik
  explanation: string;          // Pembahasan lengkap
  concept_tested: string;       // Konsep yang diuji
  common_mistakes: string;      // Kesalahan umum siswa
  study_tips: string;           // Tips mengerjakan soal serupa
  reference: string;            // Referensi materi
  tags: string[];
}

export interface Option {
  id: string;
  label: string;               // A, B, C, D, E
  text: string;
  image_url?: string;
}

// ─── Tipe Sesi Ujian ─────────────────────────────────────────────────────────

export type AnswerStatus = 'BELUM' | 'DIJAWAB' | 'RAGU' | 'DITANDAI';

export interface UserAnswer {
  question_id: string;
  selected_ids: string[];       // bisa lebih dari satu untuk MCMA
  is_bookmarked: boolean;
  is_flagged: boolean;
  time_spent_seconds: number;
  answered_at?: string;
}

export interface ExamSession {
  id: string;
  user_id: string;
  package_id: string;
  package?: Package;
  started_at: string;
  finished_at?: string;
  duration_minutes: number;
  answers: Record<string, UserAnswer>;   // key = question_id
  current_question_index: number;
  status: 'IN_PROGRESS' | 'FINISHED' | 'TIMED_OUT';
}

// ─── Tipe Hasil ──────────────────────────────────────────────────────────────

export interface ExamResult {
  session_id: string;
  package_id: string;
  package?: Package;
  score: number;                          // 0 – 100 skala simulasi
  raw_score: number;                      // jumlah benar
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  empty_count: number;
  accuracy_pct: number;
  time_taken_minutes: number;
  avg_time_per_question_seconds: number;
  completed_at: string;
  // Per-topik
  topic_breakdown: TopicBreakdown[];
  // Estimasi ranking
  estimated_rank_pct: number;
  // Kekuatan / kelemahan
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  // Detail per soal
  question_results: QuestionResult[];
}

export interface TopicBreakdown {
  topic: string;
  total: number;
  correct: number;
  accuracy_pct: number;
}

export interface QuestionResult {
  question: Question;
  user_answer: UserAnswer;
  is_correct: boolean;
  points_earned: number;
}

// ─── Tipe Analitik ───────────────────────────────────────────────────────────

export interface SkillRating {
  label: string;
  score: number;        // 0 – 5
  description: string;
}

export interface SubjectProgress {
  subject_id: string;
  subject_name: string;
  packages_done: number;
  packages_total: number;
  avg_score: number;
  best_score: number;
  last_attempt_at?: string;
}

export interface DailyActivity {
  date: string;          // YYYY-MM-DD
  sessions: number;
  questions: number;
  study_minutes: number;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  school?: string;
  avg_score: number;
  total_sessions: number;
  badge?: string;
}
