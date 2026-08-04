'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, BookOpen, TrendingUp, Award, LogOut, Eye, EyeOff,
  BarChart2, Clock, CheckCircle2, XCircle, Search, RefreshCw,
  Shield, ChevronDown, ChevronUp,
} from 'lucide-react';
import { ALL_PACKAGES } from '@/data/packages';
import { cn } from '@/lib/utils';

// ─── Tipe data ────────────────────────────────────────────────────────────────
interface StudentSession {
  id: string;
  studentName: string;
  email: string;
  packageName: string;
  packageCode: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;       // menit
  finishedAt: string;     // ISO string
  status: 'FINISHED' | 'TIMED_OUT' | 'IN_PROGRESS';
}

// ─── Data demo siswa ──────────────────────────────────────────────────────────
const DEMO_SESSIONS: StudentSession[] = [
  { id: 's1', studentName: 'Aisyah Ramadhani', email: 'aisyah@student.com', packageName: 'Paket 1 — Teks Sastra & Eksposisi', packageCode: 'BIND-01', subject: 'Bahasa Indonesia', score: 82, totalQuestions: 30, correctAnswers: 24, duration: 38, finishedAt: '2026-08-04T08:22:00Z', status: 'FINISHED' },
  { id: 's2', studentName: 'Bima Arya Putra', email: 'bima@student.com', packageName: 'Paket 1 — Aljabar & Fungsi', packageCode: 'MAT-01', subject: 'Matematika', score: 67, totalQuestions: 30, correctAnswers: 20, duration: 45, finishedAt: '2026-08-04T09:05:00Z', status: 'FINISHED' },
  { id: 's3', studentName: 'Citra Dewi Lestari', email: 'citra@student.com', packageName: 'Paket 1 — Reading & Grammar', packageCode: 'BING-01', subject: 'Bahasa Inggris', score: 90, totalQuestions: 30, correctAnswers: 27, duration: 35, finishedAt: '2026-08-04T09:30:00Z', status: 'FINISHED' },
  { id: 's4', studentName: 'Dafa Rizky Maulana', email: 'dafa@student.com', packageName: 'Paket 1 — Silogisme & Analogi', packageCode: 'PU-01', subject: 'TPS Penalaran Umum', score: 75, totalQuestions: 20, correctAnswers: 15, duration: 28, finishedAt: '2026-08-04T10:00:00Z', status: 'FINISHED' },
  { id: 's5', studentName: 'Elsa Maharani', email: 'elsa@student.com', packageName: 'Paket 1 — Memahami & Menginterpretasi Teks', packageCode: 'LBI-01', subject: 'Literasi Bahasa Indonesia', score: 55, totalQuestions: 20, correctAnswers: 11, duration: 25, finishedAt: '2026-08-04T10:45:00Z', status: 'TIMED_OUT' },
  { id: 's6', studentName: 'Fajar Nugroho', email: 'fajar@student.com', packageName: 'Paket 2 — Geometri & Trigonometri', packageCode: 'MAT-02', subject: 'Matematika', score: 43, totalQuestions: 30, correctAnswers: 13, duration: 45, finishedAt: '2026-08-04T11:20:00Z', status: 'FINISHED' },
  { id: 's7', studentName: 'Gita Permatasari', email: 'gita@student.com', packageName: 'Paket 1 — Aritmetika & Data Kontekstual', packageCode: 'PM-01', subject: 'Penalaran Matematika', score: 88, totalQuestions: 15, correctAnswers: 13, duration: 22, finishedAt: '2026-08-04T12:00:00Z', status: 'FINISHED' },
  { id: 's8', studentName: 'Hendra Saputra', email: 'hendra@student.com', packageName: 'Paket 1 — Teks Sastra & Eksposisi', packageCode: 'BIND-01', subject: 'Bahasa Indonesia', score: 70, totalQuestions: 30, correctAnswers: 21, duration: 40, finishedAt: '2026-08-04T13:15:00Z', status: 'FINISHED' },
  { id: 's9', studentName: 'Indah Permata', email: 'indah@student.com', packageName: 'Paket 2 — Critical Reading', packageCode: 'BING-02', subject: 'Bahasa Inggris', score: 60, totalQuestions: 30, correctAnswers: 18, duration: 40, finishedAt: '2026-08-04T14:00:00Z', status: 'FINISHED' },
  { id: 's10', studentName: 'Joko Susanto', email: 'joko@student.com', packageName: 'Paket 1 — Mekanika & Kinematika', packageCode: 'FIS-01', subject: 'Fisika', score: 37, totalQuestions: 30, correctAnswers: 11, duration: 45, finishedAt: '2026-08-04T14:30:00Z', status: 'TIMED_OUT' },
];

const ADMIN_EMAIL    = 'admin@artemis.id';
const ADMIN_PASSWORD = 'artemis2026';

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
    await new Promise(r => setTimeout(r, 800));
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
          Demo: admin@artemis.id / artemis2026
        </p>
      </motion.div>
    </div>
  );
}

// ─── Dashboard utama ──────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [search, setSearch]     = useState('');
  const [sortField, setSortField] = useState<keyof StudentSession>('finishedAt');
  const [sortAsc, setSortAsc]   = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = DEMO_SESSIONS
    .filter(s =>
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase()) ||
      s.packageCode.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const va = a[sortField] as string | number;
      const vb = b[sortField] as string | number;
      return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const totalSessions  = DEMO_SESSIONS.length;
  const avgScore       = Math.round(DEMO_SESSIONS.reduce((s, x) => s + x.score, 0) / totalSessions);
  const passCount      = DEMO_SESSIONS.filter(s => s.score >= 70).length;
  const uniqueStudents = new Set(DEMO_SESSIONS.map(s => s.email)).size;

  const toggleSort = (field: keyof StudentSession) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  const SortIcon = ({ field }: { field: keyof StudentSession }) =>
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
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Panel Monitoring</span>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors">
            <LogOut size={14} /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users}     label="Total Siswa Aktif" value={uniqueStudents} sub="unik berdasarkan email" color="bg-blue-500/20" />
          <StatCard icon={BookOpen}  label="Total Sesi Ujian"  value={totalSessions}  sub="hari ini"              color="bg-purple-500/20" />
          <StatCard icon={TrendingUp} label="Rata-Rata Skor"   value={`${avgScore}`}  sub="dari 100"              color="bg-cyan-500/20" />
          <StatCard icon={Award}     label="Lulus (≥70)"       value={`${passCount}/${totalSessions}`} sub={`${Math.round(passCount/totalSessions*100)}% tingkat kelulusan`} color="bg-green-500/20" />
        </div>

        {/* Subject breakdown */}
        <div className="glass-card p-6">
          <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
            <BarChart2 size={16} className="text-purple-400" /> Performa per Mata Pelajaran
          </h2>
          <div className="space-y-3">
            {(() => {
              const bySubject: Record<string, number[]> = {};
              DEMO_SESSIONS.forEach(s => {
                if (!bySubject[s.subject]) bySubject[s.subject] = [];
                bySubject[s.subject].push(s.score);
              });
              return Object.entries(bySubject).map(([subject, scores]) => {
                const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                return (
                  <div key={subject} className="flex items-center gap-4">
                    <span className="text-xs text-white/50 w-48 shrink-0">{subject}</span>
                    <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', avg >= 70 ? 'bg-green-500' : avg >= 50 ? 'bg-yellow-500' : 'bg-red-500')}
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
                placeholder="Cari nama, email, mapel..."
                className="bg-white/[0.06] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    { label: 'Siswa', field: 'studentName' as const },
                    { label: 'Paket', field: 'packageCode' as const },
                    { label: 'Mata Pelajaran', field: 'subject' as const },
                    { label: 'Skor', field: 'score' as const },
                    { label: 'Benar', field: 'correctAnswers' as const },
                    { label: 'Durasi', field: 'duration' as const },
                    { label: 'Status', field: 'status' as const },
                    { label: 'Waktu Selesai', field: 'finishedAt' as const },
                  ].map(col => (
                    <th key={col.field}
                      onClick={() => toggleSort(col.field)}
                      className="px-4 py-3 text-left text-white/40 font-medium cursor-pointer hover:text-white/60 transition-colors select-none">
                      <span className="flex items-center gap-1">
                        {col.label} <SortIcon field={col.field} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-white/40 font-medium">Detail</th>
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
                            <p className="text-white/80 font-medium">{s.studentName}</p>
                            <p className="text-white/30">{s.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-cyan-400">{s.packageCode}</span>
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
                          <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                            className="text-purple-400 hover:text-purple-300 transition-colors">
                            {expanded === s.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>
                      </motion.tr>
                      {expanded === s.id && (
                        <tr key={`${s.id}-detail`} className="bg-purple-500/5">
                          <td colSpan={9} className="px-6 py-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                              <div>
                                <p className="text-white/30 mb-1">Paket Lengkap</p>
                                <p className="text-white/70">{s.packageName}</p>
                              </div>
                              <div>
                                <p className="text-white/30 mb-1">Akurasi</p>
                                <p className="text-white/70">{Math.round(s.correctAnswers / s.totalQuestions * 100)}%</p>
                              </div>
                              <div>
                                <p className="text-white/30 mb-1">Jawaban Salah</p>
                                <p className="text-red-400">{s.totalQuestions - s.correctAnswers} soal</p>
                              </div>
                              <div>
                                <p className="text-white/30 mb-1">Rata-rata / Soal</p>
                                <p className="text-white/70">{(s.duration * 60 / s.totalQuestions).toFixed(0)} detik</p>
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
                    <td colSpan={9} className="px-4 py-12 text-center text-white/30">
                      Tidak ada data yang sesuai pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-white/[0.06] text-xs text-white/30">
            Menampilkan {filtered.length} dari {totalSessions} sesi · Data demo (hubungkan ke Supabase untuk data real)
          </div>
        </div>
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
