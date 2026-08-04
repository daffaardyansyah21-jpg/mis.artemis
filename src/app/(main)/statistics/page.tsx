'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import ProgressBar from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';
import { TrendingUp, Target, Clock, BookOpen } from 'lucide-react';

const monthly = [
  { month: 'Mar', avg: 58, sessions: 6 }, { month: 'Apr', avg: 63, sessions: 9 },
  { month: 'Mei', avg: 68, sessions: 11 }, { month: 'Jun', avg: 72, sessions: 14 },
  { month: 'Jul', avg: 74, sessions: 16 }, { month: 'Agu', avg: 78, sessions: 12 },
];

const bySubject = [
  { subject: 'B.Indonesia', avg: 78, sessions: 8, best: 92 },
  { subject: 'Matematika',  avg: 65, sessions: 6, best: 80 },
  { subject: 'B.Inggris',   avg: 82, sessions: 5, best: 90 },
  { subject: 'Fisika',      avg: 60, sessions: 3, best: 72 },
  { subject: 'PU (TPS)',    avg: 71, sessions: 4, best: 85 },
  { subject: 'Lit. BI',     avg: 74, sessions: 3, best: 88 },
];

const radar = [
  { skill: 'Literasi',  value: 84 }, { skill: 'Numerasi',  value: 65 },
  { skill: 'Penalaran', value: 71 }, { skill: 'Kecepatan', value: 80 },
  { skill: 'Konsep',    value: 68 }, { skill: 'Akurasi',   value: 74 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-lg border border-white/10 text-xs text-white">
      <div className="font-semibold">{payload[0].payload.month ?? payload[0].payload.subject}</div>
      <div className="text-purple-400">Rata-rata: {payload[0].value}</div>
    </div>
  );
};

export default function StatisticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-display">Analitik</p>
        <h1 className="text-3xl font-display font-bold text-white">
          Statistik <span className="gradient-text">Belajarmu</span>
        </h1>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Sesi',    value: '24',    unit: 'sesi',    icon: BookOpen,   color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20' },
          { label: 'Rata-rata',     value: '74.5',  unit: 'poin',    icon: Target,     color: 'text-purple-400',  bg: 'bg-purple-500/10 border-purple-500/20' },
          { label: 'Skor Terbaik',  value: '92.0',  unit: 'poin',    icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Jam Belajar',   value: '18.5',  unit: 'jam',     icon: Clock,      color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card p-5">
            <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center mb-3', k.bg)}>
              <k.icon size={18} className={k.color} />
            </div>
            <div className="text-2xl font-display font-bold text-white">{k.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{k.unit} · {k.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-white mb-1">Tren Skor Bulanan</h3>
          <p className="text-xs text-white/40 mb-5">Rata-rata skor 6 bulan terakhir</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#a855f7" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avg" stroke="#a855f7" strokeWidth={2} fill="url(#areaGrad)"
                  dot={{ fill: '#a855f7', r: 4, strokeWidth: 0 }} activeDot={{ fill: '#06d6f5', r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <h3 className="font-semibold text-white mb-1">Profil Kemampuan</h3>
          <p className="text-xs text-white/40 mb-3">6 dimensi kompetensi</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 10 }} />
                <Radar dataKey="value" stroke="#06d6f5" fill="#06d6f5" fillOpacity={0.15} strokeWidth={1.5}
                  dot={{ fill: '#06d6f5', r: 3 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* By subject bar chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-white mb-1">Rata-rata per Mata Pelajaran</h3>
          <p className="text-xs text-white/40 mb-5">Dibandingkan dengan skor terbaik</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bySubject} barGap={4}>
                <XAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avg"  fill="rgba(168,85,247,0.5)"  radius={[4,4,0,0]} />
                <Bar dataKey="best" fill="rgba(6,214,245,0.25)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject detail list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="glass-card p-6">
          <h3 className="font-semibold text-white mb-5">Detail Mata Pelajaran</h3>
          <div className="space-y-5">
            {bySubject.map(s => (
              <div key={s.subject}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-white/70">{s.subject}</span>
                  <span className="text-xs font-mono text-white">{s.avg} <span className="text-white/30">/ {s.best}</span></span>
                </div>
                <ProgressBar
                  value={s.avg}
                  color={s.avg >= 75 ? 'green' : s.avg >= 60 ? 'cyan' : 'amber'}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
