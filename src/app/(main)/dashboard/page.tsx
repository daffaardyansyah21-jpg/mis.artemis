'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BarChart3, Zap, Clock, Target, TrendingUp, BookOpen, Award, ChevronRight, Flame } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import ProgressBar from '@/components/ui/ProgressBar';
import { DifficultyBadge } from '@/components/ui/Badge';
import { cn, formatScore, formatDuration, formatRelativeTime } from '@/lib/utils';

// Demo data — akan diganti data real dari Supabase
const stats = [
  { label: 'Total Sesi',         value: '24',   unit: 'sesi',    icon: BookOpen,  color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { label: 'Rata-rata Skor',     value: '74.5', unit: 'poin',    icon: BarChart3, color: 'text-purple-400',  bg: 'bg-purple-500/10 border-purple-500/20' },
  { label: 'Skor Terbaik',       value: '91.0', unit: 'poin',    icon: Award,     color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
  { label: 'Waktu Belajar',      value: '18',   unit: 'jam',     icon: Clock,     color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
];

const weeklyData = [
  { day: 'Sen', score: 65, sessions: 2 },
  { day: 'Sel', score: 70, sessions: 3 },
  { day: 'Rab', score: 68, sessions: 1 },
  { day: 'Kam', score: 80, sessions: 4 },
  { day: 'Jum', score: 75, sessions: 2 },
  { day: 'Sab', score: 88, sessions: 5 },
  { day: 'Min', score: 82, sessions: 3 },
];

const subjectProgress = [
  { name: 'Bahasa Indonesia', done: 3, total: 4, avg: 78, color: 'cyan' },
  { name: 'Matematika',       done: 2, total: 4, avg: 65, color: 'blue' },
  { name: 'Bahasa Inggris',   done: 1, total: 4, avg: 82, color: 'violet' },
  { name: 'Fisika',           done: 1, total: 3, avg: 60, color: 'yellow' },
  { name: 'Penalaran Umum',   done: 2, total: 4, avg: 71, color: 'purple' },
];

const recentSessions = [
  { subject: 'Bahasa Indonesia', package: 'Paket 3', score: 85, date: new Date(Date.now() - 3600000).toISOString(), difficulty: 'SULIT' as const },
  { subject: 'Matematika',       package: 'Paket 1', score: 72, date: new Date(Date.now() - 86400000).toISOString(), difficulty: 'MUDAH' as const },
  { subject: 'Penalaran Umum',   package: 'Paket 2', score: 68, date: new Date(Date.now() - 172800000).toISOString(), difficulty: 'SEDANG' as const },
];

const skillRatings = [
  { label: 'Literasi',  score: 4.2 },
  { label: 'Numerasi',  score: 3.5 },
  { label: 'Penalaran', score: 3.8 },
  { label: 'Kecepatan', score: 4.0 },
  { label: 'Konsep',    score: 3.2 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-lg border border-white/10 text-xs text-white">
      <div className="font-semibold">{payload[0].payload.day}</div>
      <div className="text-purple-400">Skor: {payload[0].value}</div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-sm mb-1">Halo 👋</p>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Selamat Datang, <span className="gradient-text">Daffa</span>
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Teruskan semangatmu! Sesi terakhir 1 jam lalu.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2.5">
            <Flame className="text-orange-400 w-5 h-5" />
            <div>
              <div className="text-xs text-white/50">Streak</div>
              <div className="text-base font-display font-bold text-orange-400">7 hari</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5"
          >
            <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center mb-3', s.bg)}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className="text-2xl font-display font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.unit} · {s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-white">Perkembangan Skor</h3>
                <p className="text-xs text-white/40 mt-0.5">7 hari terakhir</p>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                <TrendingUp size={14} />
                +8.2% minggu ini
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fill="url(#scoreGrad)"
                    dot={{ fill: '#a855f7', r: 3, strokeWidth: 0 }}
                    activeDot={{ fill: '#06d6f5', r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subject progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="glass-card p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-white">Progress Per Mata Pelajaran</h3>
              <Link href="/statistics" className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                Lihat semua <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-5">
              {subjectProgress.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/80">{s.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/40">{s.done}/{s.total} paket</span>
                      <span className="text-sm font-medium text-white">{s.avg}</span>
                    </div>
                  </div>
                  <ProgressBar value={(s.done / s.total) * 100} color={s.color as any} size="sm" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent sessions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-white">Sesi Terkini</h3>
            </div>
            <div className="space-y-3">
              {recentSessions.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold',
                      s.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : s.score >= 60 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400',
                    )}>
                      {s.score}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{s.subject}</div>
                      <div className="text-xs text-white/40">{s.package} · {formatRelativeTime(s.date)}</div>
                    </div>
                  </div>
                  <DifficultyBadge difficulty={s.difficulty} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick start */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Mulai Latihan</h3>
            <div className="space-y-3">
              <Link href="/tka" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="text-sm font-semibold text-white">TKA</div>
                    <div className="text-xs text-white/40">Tes Kemampuan Akademik</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
              <Link href="/utbk" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-sm font-semibold text-white">UTBK/SNBT</div>
                    <div className="text-xs text-white/40">Seleksi Nasional Berbasis Tes</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
              </Link>
            </div>
          </motion.div>

          {/* Skill ratings */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="glass-card p-6">
            <h3 className="font-semibold text-white mb-5">Profil Kemampuan</h3>
            <div className="space-y-4">
              {skillRatings.map(skill => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-white/60">{skill.label}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(n => (
                        <div key={n} className={cn('w-4 h-1.5 rounded-full', n <= Math.floor(skill.score) ? 'bg-purple-500' : n - 0.5 <= skill.score ? 'bg-purple-500/50' : 'bg-white/10')} />
                      ))}
                    </div>
                  </div>
                  <ProgressBar value={skill.score * 20} color="primary" size="sm" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Rekomendasi Belajar</h3>
            <div className="space-y-3">
              {[
                { text: 'Latih soal MCMA Matematika — akurasi 58%', href: '/tka', urgency: 'high' },
                { text: 'Perkuat Limit Fungsi — topik paling lemah', href: '/tka', urgency: 'high' },
                { text: 'Lanjutkan Paket 4 Bahasa Indonesia', href: '/tka', urgency: 'medium' },
              ].map((r, i) => (
                <Link key={i} href={r.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group">
                  <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', r.urgency === 'high' ? 'bg-red-400' : 'bg-amber-400')} />
                  <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">{r.text}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
