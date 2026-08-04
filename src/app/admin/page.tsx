'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, BookOpen, TrendingUp, Award, LogOut, Eye, EyeOff,
  BarChart2, Clock, CheckCircle2, XCircle, Search, RefreshCw,
  Shield, ChevronDown, ChevronUp, Database, AlertCircle, Trash2,
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { cn } from '@/lib/utils';
import type { ExamSession, Question, UserAnswer } from '@/types';

// ─── Konstanta ────────────────────────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@artemis.id';
const ADMIN_PASSWORD = 'artemis2026';

// Peta subjek → label tampilan
const SUBJECT_LABEL: Record<string, string> = {
  'tka-bind':  'Bahasa Indonesia',
  'tka-mat':   'Matematika',
  'tka-bing':  'Bahasa Inggris',
  'tka-fis':   'Fisika',
  'tka-kim':   'Kimia',
  'tka-bio':   'Biologi',
  'tka-eko':   'Ekonomi',
  'tka-geo':   'Geografi',
  'tka-sos':   'Sosiologi',
  'tka-sej':   'Sejarah',
  'utbk-pu':   'TPS Penalaran Umum',
  'utbk-pk':   'TPS Pengetahuan & Pemahaman Umum',
  'utbk-pm':   'Penalaran Matematika',
  'utbk-lbi':  'Literasi Bahasa Indonesia',
  'utbk-lbing':'Literasi Bahasa Inggris',
};

// ─── Tipe data sesi yang ditampilkan ─────────────────────────────────────────
interface DisplaySession {
  id: string;
  packageId: string;
  packageCode: string;
  packageName: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  emptyAnswers: number;
  duration: number;       // menit terpakai
  finishedAt: string;
  status: 'FINISHED' | 'TIMED_OUT' | 'IN_PROGRESS';
}

// ─── Fungsi membaca sesi dari localStorage ────────────────────────────────────
function isAnswerCorrect(q: Question, ans: UserAnswer): boolean {
  if (!ans || ans.selected_ids.length === 0) return false;
  const correct = new Set(q.correct_answer_ids);
  const selected = new Set(ans.selected_ids);
  if (correct.size !== selected.size) return false;
  for (const id of correct) { if (!selected.has(id)) return false; }
  return true;
}

function loadSessionsFromStorage(): DisplaySession[] {
  if (typeof window === 'undefined') return [];
  const result: DisplaySession[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith('session_')) continue;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { session: ExamSession; questions: Question[] };
      const { session, questions } = parsed;

      if (!session || !questions) continue;

      const pkg = getPackageById(session.package_id);
      let correct = 0;
      let incorrect = 0;
      let empty = 0;

      for (const q of questions) {
        const ans = session.answers[q.id];
        if (!ans || ans.selected_ids.length === 0) { empty++; continue; }
        if (isAnswerCorrect(q, ans)) correct++;
        else incorrect++;
      }

      const total = questions.length;
      const score = total > 0 ? Math.round((correct / total) * 100) : 0;

      // Estimasi waktu terpakai dari jumlah waktu per soal
      const totalSeconds = Object.values(session.answers)
        .reduce((sum, a) => sum + (a.time_spent_seconds ?? 0), 0);
      const durationUsed = Math.round(Math.min(totalSeconds / 60, session.duration_minutes));

      result.push({
        id: session.id,
        packageId: session.package_id,
        packageCode: pkg?.code ?? session.package_id,
        packageName: pkg?.name ?? session.package_id,
        subject: SUBJECT_LABEL[pkg?.subject_id ?? ''] ?? pkg?.subject_id ?? 'Tidak Diketahui',
        score,
        totalQuestions: total,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        emptyAnswers: empty,
        duration: durationUsed,
        finishedAt: session.finished_at ?? session.started_at,
        status: session.status as DisplaySession['status'],
      });
    } catch {
      // skip entri yang rusak
    }
  }

  // Urutkan terbaru dulu
  result.sort((a, b) => (a.finishedAt < b.finishedAt ? 1 : -1));
  return result;
}

// ─── Komponen StatCard ────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="glass-card p-5 flex items-start gap-4">
      <div className={cn('p-2.5 rounded-xl', color)}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-white/40 mb-0.5">{label}</p>
        <p className="text-2xl font-display font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-white/40 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-10 text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 mb-5">
        <Database size={28} className="text-white/30" />
      </div>
      <h3 className="text-lg font-display font-bold text-white mb-2">
        Belum Ada Data Sesi
      </h3>
      <p className="text-sm text-white/40 max-w-md mx-auto mb-6">
        Data sesi ujian akan muncul di sini setelah siswa menyelesaikan latihan soal di browser ini.
        Saat ini aplikasi menyimpan sesi ke <code className="text-purple-300 font-mono text-xs">localStorage</code> browser.
      </p>
      <div className="glass p-4 rounded-xl border border-amber-500/20 text-left max-w-lg mx-auto">
        <p className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
          <AlertCircle size={12} /> Untuk Monitoring Skala Besar
        </p>
        <ul className="text-xs text-white/50 space-y-1.5 list-disc list-inside">
          <li>Hubungkan database <strong className="text-white/70">Supabase</strong> agar data tersimpan terpusat</li>
          <li>Aktifkan autentikasi siswa agar setiap sesi tertaut ke akun</li>
          <li>Data akan otomatis terbaca di panel ini melalui API route</li>
          <li>Panduan: lihat <code className="text-purple-300 font-mono text-xs">SUPABASE_SETUP.md</code> di repo</li>
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('artemis_admin', '1');
      onLogin();
    } else {
      setError('Email atau password salah.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 mb-4">
            <Shield size={28} className="text-purple-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Admin Artemis</h1>
          <p className="text-white/40 text-sm mt-1">Panel pemantauan aktivitas siswa</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Email Admin</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@artemis.id" required
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="btn-primary w-full !py-2.5 text-sm flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Shield size={14} />}
            {loading ? 'Memverifikasi...' : 'Masuk sebagai Admin'}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-4">
          Akses terbatas — hanya untuk pengelola platform
        </p>
      </motion.div>
    </div>
  );
}

// ─── Dashboard utama ──────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [sessions, setSessions]     = useState<DisplaySession[]>([]);
  const [search, setSearch]         = useState('');
  const [sortField, setSortField]   = useState<keyof DisplaySession>('finishedAt');
  const [sortAsc, setSortAsc]       = useState(false);
  const [expanded, setExpanded]     = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 300));
    setSessions(loadSessionsFromStorage());
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    setSessions(loadSessionsFromStorage());
  }, []);

  const handleClearSession = (id: string) => {
    if (!confirm('Hapus sesi ini dari localStorage? Tindakan ini tidak dapat dibatalkan.')) return;
    localStorage.removeItem(`session_${id}`);
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const filtered = sessions
    .filter(s =>
      s.packageName.toLowerCase().includes(search.toLowerCase()) ||
      s.packageCode.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const va = a[sortField] as string | number;
      const vb = b[sortField] as string | number;
      return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const totalSessions  = sessions.length;
  const avgScore       = totalSessions > 0
    ? Math.round(sessions.reduce((s, x) => s + x.score, 0) / totalSessions)
    : 0;
  const passCount      = sessions.filter(s => s.score >= 70).length;
  const uniquePackages = new Set(sessions.map(s => s.packageId)).size;

  const toggleSort = (field: keyof DisplaySession) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const SortIcon = ({ field }: { field: keyof DisplaySession }) =>
    sortField === field
      ? (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
      : <ChevronDown size={12} className="opacity-20" />;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-purple-400" />
            <span className="font-display font-bold text-white">Artemis Admin</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Panel Monitoring
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <RefreshCw size={13} className={cn(isRefreshing && 'animate-spin')} />
              Refresh
            </button>
            <button onClick={onLogout}
              className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors">
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookOpen}   label="Total Sesi Ujian"      value={totalSessions}
            sub="tersimpan di browser ini"   color="bg-blue-500/20"
          />
          <StatCard
            icon={TrendingUp} label="Rata-Rata Skor"        value={totalSessions > 0 ? `${avgScore}` : '—'}
            sub="dari 100 poin"              color="bg-cyan-500/20"
          />
          <StatCard
            icon={Award}      label="Lulus (≥ 70)"          value={totalSessions > 0 ? `${passCount}/${totalSessions}` : '—'}
            sub={totalSessions > 0 ? `${Math.round((passCount / totalSessions) * 100)}% tingkat kelulusan` : 'belum ada data'}
            color="bg-green-500/20"
          />
          <StatCard
            icon={Users}      label="Paket Dikerjakan"      value={uniquePackages}
            sub="paket berbeda"              color="bg-purple-500/20"
          />
        </div>

        {totalSessions === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Subject breakdown */}
            <div className="glass-card p-6">
              <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                <BarChart2 size={16} className="text-purple-400" /> Performa per Mata Pelajaran
              </h2>
              <div className="space-y-3">
                {(() => {
                  const bySubject: Record<string, number[]> = {};
                  sessions.forEach(s => {
                    if (!bySubject[s.subject]) bySubject[s.subject] = [];
                    bySubject[s.subject].push(s.score);
                  });
                  return Object.entries(bySubject).map(([subject, scores]) => {
                    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                    return (
                      <div key={subject} className="flex items-center gap-4">
                        <span className="text-xs text-white/50 w-52 shrink-0 truncate">{subject}</span>
                        <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all',
                              avg >= 70 ? 'bg-green-500' : avg >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
                            style={{ width: `${avg}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-white/60 w-10 text-right">{avg}</span>
                        <span className="text-xs text-white/30 w-16">({scores.length} sesi)</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Tabel sesi */}
            <div className="glass-card overflow-hidden">
              <div className="p-5 border-b border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Clock size={16} className="text-purple-400" /> Log Pengerjaan Siswa
                </h2>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Cari paket, mata pelajaran..."
                    className="bg-white/[0.06] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 w-56"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {[
                        { label: 'Paket',          field: 'packageCode' as const },
                        { label: 'Mata Pelajaran', field: 'subject' as const },
                        { label: 'Skor',           field: 'score' as const },
                        { label: 'Benar',          field: 'correctAnswers' as const },
                        { label: 'Durasi',         field: 'duration' as const },
                        { label: 'Status',         field: 'status' as const },
                        { label: 'Waktu Selesai',  field: 'finishedAt' as const },
                      ].map(col => (
                        <th key={col.field}
                          onClick={() => toggleSort(col.field)}
                          className="px-4 py-3 text-left text-white/40 font-medium cursor-pointer hover:text-white/60 transition-colors select-none">
                          <span className="flex items-center gap-1">
                            {col.label} <SortIcon field={col.field} />
                          </span>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-white/40 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filtered.map((s, i) => (
                        <>
                          <motion.tr key={s.id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                            className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <span className="font-mono text-cyan-400">{s.packageCode}</span>
                                <p className="text-white/30 mt-0.5 max-w-[180px] truncate">{s.packageName}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-white/60">{s.subject}</td>
                            <td className="px-4 py-3">
                              <span className={cn(
                                'font-display font-bold text-base',
                                s.score >= 70 ? 'text-green-400' : s.score >= 50 ? 'text-yellow-400' : 'text-red-400',
                              )}>{s.score}</span>
                            </td>
                            <td className="px-4 py-3 text-white/60">{s.correctAnswers}/{s.totalQuestions}</td>
                            <td className="px-4 py-3 text-white/60">{s.duration} mnt</td>
                            <td className="px-4 py-3">
                              <span className={cn(
                                'px-2 py-0.5 rounded-full text-xs font-medium',
                                s.status === 'FINISHED'   ? 'bg-green-500/20 text-green-400' :
                                s.status === 'TIMED_OUT'  ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400',
                              )}>
                                {s.status === 'FINISHED' ? 'Selesai' : s.status === 'TIMED_OUT' ? 'Waktu Habis' : 'Berlangsung'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-white/40">
                              {new Date(s.finishedAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                                  className="text-purple-400 hover:text-purple-300 transition-colors">
                                  {expanded === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                <button onClick={() => handleClearSession(s.id)}
                                  className="text-white/20 hover:text-red-400 transition-colors"
                                  title="Hapus sesi ini">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                          {expanded === s.id && (
                            <tr key={`${s.id}-detail`} className="bg-purple-500/5">
                              <td colSpan={8} className="px-6 py-4">
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                                  <div>
                                    <p className="text-white/30 mb-1">ID Sesi</p>
                                    <p className="text-white/50 font-mono text-[10px] truncate">{s.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-white/30 mb-1">Akurasi</p>
                                    <p className="text-white/70">{s.totalQuestions > 0 ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0}%</p>
                                  </div>
                                  <div>
                                    <p className="text-white/30 mb-1">Jawaban Benar</p>
                                    <p className="text-green-400">{s.correctAnswers} soal</p>
                                  </div>
                                  <div>
                                    <p className="text-white/30 mb-1">Jawaban Salah</p>
                                    <p className="text-red-400">{s.incorrectAnswers} soal</p>
                                  </div>
                                  <div>
                                    <p className="text-white/30 mb-1">Tidak Dijawab</p>
                                    <p className="text-white/40">{s.emptyAnswers} soal</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </AnimatePresence>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-white/30">
                          Tidak ada sesi yang sesuai pencarian.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 border-t border-white/[0.06] text-xs text-white/30 flex items-center justify-between">
                <span>Menampilkan {filtered.length} dari {totalSessions} sesi · Sumber: localStorage browser ini</span>
                <span className="text-white/20">Hubungkan Supabase untuk monitoring lintas-perangkat</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('artemis_admin');
    if (saved === '1') setIsLoggedIn(true);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('artemis_admin');
    setIsLoggedIn(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <RefreshCw size={20} className="text-purple-400 animate-spin" />
    </div>
  );

  return isLoggedIn
    ? <Dashboard onLogout={handleLogout} />
    : <LoginPage onLogin={() => setIsLoggedIn(true)} />;
}
