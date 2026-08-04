-- ─────────────────────────────────────────────────────────────────────────────
-- ARTEMIS — Supabase PostgreSQL Schema
-- Jalankan di SQL Editor Supabase setelah membuat project baru.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";       -- untuk full-text search

-- ─── Profiles (extend auth.users) ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL DEFAULT '',
  avatar_url      TEXT,
  school          TEXT,
  graduation_year SMALLINT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ─── Subjects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subjects (
  id              TEXT PRIMARY KEY,              -- mis. 'tka-bind'
  code            TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  exam_type       TEXT NOT NULL CHECK (exam_type IN ('TKA', 'UTBK')),
  category        TEXT NOT NULL,
  description     TEXT,
  icon            TEXT DEFAULT '📚',
  color           TEXT DEFAULT 'text-blue-400',
  total_packages  SMALLINT DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Packages ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.packages (
  id                 TEXT PRIMARY KEY,           -- mis. 'tka-bind-01'
  subject_id         TEXT NOT NULL REFERENCES public.subjects(id),
  code               TEXT NOT NULL,
  name               TEXT NOT NULL,
  description        TEXT,
  difficulty         TEXT NOT NULL CHECK (difficulty IN ('MUDAH', 'SEDANG', 'SULIT')),
  total_questions    SMALLINT NOT NULL,
  duration_minutes   SMALLINT NOT NULL,
  is_free            BOOLEAN DEFAULT TRUE,
  "order"            SMALLINT DEFAULT 1,
  tags               TEXT[] DEFAULT '{}',
  is_active          BOOLEAN DEFAULT TRUE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Questions ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.questions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id            TEXT NOT NULL REFERENCES public.packages(id),
  "order"               SMALLINT NOT NULL,
  type                  TEXT NOT NULL CHECK (type IN ('PGS', 'MCMA', 'KATEGORI')),
  question_text         TEXT NOT NULL,
  question_image_url    TEXT,
  options               JSONB NOT NULL DEFAULT '[]',   -- [{id, label, text, image_url?}]
  correct_answer_ids    TEXT[] NOT NULL,
  difficulty            TEXT NOT NULL CHECK (difficulty IN ('MUDAH', 'SEDANG', 'SULIT')),
  chapter               TEXT,
  topic                 TEXT,
  explanation           TEXT,
  concept_tested        TEXT,
  common_mistakes       TEXT,
  study_tips            TEXT,
  reference             TEXT,
  tags                  TEXT[] DEFAULT '{}',
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_package ON public.questions(package_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic   ON public.questions(topic);

-- ─── Exam Sessions ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id             TEXT NOT NULL REFERENCES public.packages(id),
  started_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at            TIMESTAMPTZ,
  duration_minutes       SMALLINT NOT NULL,
  answers                JSONB NOT NULL DEFAULT '{}',  -- {question_id: UserAnswer}
  current_question_index SMALLINT DEFAULT 0,
  status                 TEXT NOT NULL DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS','FINISHED','TIMED_OUT'))
);

ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users access own sessions" ON public.exam_sessions FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_user     ON public.exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_package  ON public.exam_sessions(package_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status   ON public.exam_sessions(status);

-- ─── Exam Results ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.exam_results (
  id                              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id                      UUID NOT NULL UNIQUE REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  user_id                         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id                      TEXT NOT NULL REFERENCES public.packages(id),
  score                           NUMERIC(5,2) NOT NULL,
  raw_score                       SMALLINT NOT NULL,
  total_questions                 SMALLINT NOT NULL,
  correct_count                   SMALLINT NOT NULL,
  incorrect_count                 SMALLINT NOT NULL,
  empty_count                     SMALLINT NOT NULL,
  accuracy_pct                    NUMERIC(5,2) NOT NULL,
  time_taken_minutes              SMALLINT,
  avg_time_per_question_seconds   SMALLINT,
  topic_breakdown                 JSONB DEFAULT '[]',
  estimated_rank_pct              SMALLINT,
  strengths                       TEXT[] DEFAULT '{}',
  weaknesses                      TEXT[] DEFAULT '{}',
  recommendations                 TEXT[] DEFAULT '{}',
  question_results                JSONB DEFAULT '[]',  -- detail per soal (diringkas)
  completed_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own results" ON public.exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role insert results" ON public.exam_results FOR INSERT WITH CHECK (TRUE);

CREATE INDEX IF NOT EXISTS idx_results_user     ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_package  ON public.exam_results(package_id);
CREATE INDEX IF NOT EXISTS idx_results_score    ON public.exam_results(score DESC);

-- ─── User Stats (materialized / computed) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_sessions             INT DEFAULT 0,
  total_questions_answered   INT DEFAULT 0,
  average_score              NUMERIC(5,2) DEFAULT 0,
  best_score                 NUMERIC(5,2) DEFAULT 0,
  total_study_time_minutes   INT DEFAULT 0,
  streak_days                SMALLINT DEFAULT 0,
  last_activity_at           TIMESTAMPTZ,
  updated_at                 TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own stats" ON public.user_stats FOR SELECT USING (auth.uid() = user_id);

-- ─── Leaderboard View ────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  ROW_NUMBER() OVER (ORDER BY us.average_score DESC, us.total_sessions DESC) AS rank,
  p.id           AS user_id,
  COALESCE(p.full_name, 'Anonim')  AS display_name,
  p.avatar_url,
  p.school,
  us.average_score  AS avg_score,
  us.total_sessions,
  CASE
    WHEN us.average_score >= 90 THEN '🏆 Grandmaster'
    WHEN us.average_score >= 75 THEN '⭐ Expert'
    WHEN us.average_score >= 60 THEN '💎 Proficient'
    ELSE '🌱 Learner'
  END AS badge
FROM public.profiles p
JOIN public.user_stats us ON p.id = us.user_id
WHERE us.total_sessions > 0
ORDER BY avg_score DESC;

-- ─── Function: update user stats after result insert ─────────────────────────
CREATE OR REPLACE FUNCTION public.update_user_stats_on_result()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_sessions, total_questions_answered, average_score, best_score, total_study_time_minutes, last_activity_at)
  VALUES (
    NEW.user_id, 1, NEW.total_questions, NEW.score, NEW.score,
    COALESCE(NEW.time_taken_minutes, 0), NEW.completed_at
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_sessions           = user_stats.total_sessions + 1,
    total_questions_answered = user_stats.total_questions_answered + NEW.total_questions,
    average_score            = ROUND((user_stats.average_score * user_stats.total_sessions + NEW.score) / (user_stats.total_sessions + 1), 2),
    best_score               = GREATEST(user_stats.best_score, NEW.score),
    total_study_time_minutes = user_stats.total_study_time_minutes + COALESCE(NEW.time_taken_minutes, 0),
    last_activity_at         = NEW.completed_at,
    updated_at               = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_update_user_stats
AFTER INSERT ON public.exam_results
FOR EACH ROW EXECUTE FUNCTION public.update_user_stats_on_result();

-- ─── Function: create profile on signup ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_stats (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
