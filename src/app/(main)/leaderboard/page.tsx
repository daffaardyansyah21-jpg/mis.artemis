'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const leaderboard = [
  { rank: 1, name: 'Rizky A.',    school: 'SMAN 1 Bandung',   avg: 91.2, sessions: 38, badge: '🏆 Grandmaster' },
  { rank: 2, name: 'Siti N.',     school: 'SMAN 3 Jakarta',   avg: 89.5, sessions: 42, badge: '🏆 Grandmaster' },
  { rank: 3, name: 'Budi P.',     school: 'SMAN 2 Surabaya',  avg: 87.8, sessions: 29, badge: '⭐ Expert' },
  { rank: 4, name: 'Ayu K.',      school: 'SMAN 5 Yogyakarta',avg: 85.1, sessions: 34, badge: '⭐ Expert' },
  { rank: 5, name: 'Daffa F.',    school: 'SMAN UNY',         avg: 74.5, sessions: 24, badge: '💎 Proficient', isCurrentUser: true },
  { rank: 6, name: 'Fira M.',     school: 'SMAN 4 Semarang',  avg: 72.3, sessions: 19, badge: '💎 Proficient' },
  { rank: 7, name: 'Hendra S.',   school: 'SMAN 1 Medan',     avg: 69.8, sessions: 21, badge: '💎 Proficient' },
  { rank: 8, name: 'Nia R.',      school: 'SMAN 8 Bogor',     avg: 67.1, sessions: 16, badge: '🌱 Learner' },
  { rank: 9, name: 'Farhan T.',   school: 'SMAN 2 Makassar',  avg: 65.4, sessions: 15, badge: '🌱 Learner' },
  { rank: 10, name: 'Gita P.',    school: 'SMAN 6 Palembang', avg: 62.9, sessions: 13, badge: '🌱 Learner' },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Trophy size={18} className="text-amber-400" />;
  if (rank === 2) return <Medal size={18} className="text-slate-300" />;
  if (rank === 3) return <Medal size={18} className="text-amber-600" />;
  return <span className="text-sm font-mono text-white/40">{rank}</span>;
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-display">Kompetisi</p>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          <span className="gradient-text">Papan Peringkat</span>
        </h1>
        <p className="text-white/50 text-sm">Peringkat berdasarkan rata-rata skor simulasi. Diperbarui setiap hari.</p>
        <p className="text-white/30 text-xs mt-2 italic">Peringkat ini adalah estimasi berbasis simulasi dan bukan afiliasi resmi dengan SNPMB.</p>
      </motion.div>

      {/* Top 3 podium */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-8">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((entry, i) => {
          const height = i === 1 ? 'h-32' : i === 0 ? 'h-24' : 'h-20';
          const label  = ['🥈 #2', '🥇 #1', '🥉 #3'][i];
          return (
            <div key={entry.rank} className="flex flex-col items-center gap-2">
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold',
                i === 1 ? 'bg-amber-500/20 border-2 border-amber-400/40' : 'bg-white/[0.05] border border-white/10')}>
                {entry.name.charAt(0)}
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-white">{entry.name}</div>
                <div className="text-[10px] text-white/40">{entry.avg}</div>
              </div>
              <div className={cn('w-full rounded-t-xl flex items-center justify-center text-xs font-display font-bold text-white/70', height,
                i === 1 ? 'bg-gradient-to-b from-amber-500/30 to-amber-500/10 border border-amber-500/20' :
                i === 0 ? 'bg-gradient-to-b from-slate-400/20 to-slate-400/5 border border-slate-400/20' :
                          'bg-gradient-to-b from-amber-700/20 to-amber-700/5 border border-amber-700/20')}>
                {label}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Full table */}
      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 px-5 py-3 border-b border-white/[0.06] text-xs text-white/30 uppercase tracking-wider">
          <span>#</span><span>Pengguna</span><span className="text-right">Sesi</span><span className="text-right">Rata-rata</span>
        </div>
        {leaderboard.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className={cn(
              'grid grid-cols-[auto_1fr_auto_auto] gap-x-4 items-center px-5 py-4',
              'border-b border-white/[0.04] last:border-0',
              (entry as any).isCurrentUser && 'bg-purple-500/10 border-purple-500/20',
            )}
          >
            <div className="w-8 flex items-center justify-center">{rankIcon(entry.rank)}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-medium', (entry as any).isCurrentUser ? 'text-purple-300' : 'text-white')}>
                  {entry.name} {(entry as any).isCurrentUser && <span className="text-xs text-purple-400">(Kamu)</span>}
                </span>
                <span className="text-xs">{entry.badge}</span>
              </div>
              <div className="text-xs text-white/40">{entry.school}</div>
            </div>
            <div className="text-sm text-white/50 text-right">{entry.sessions}</div>
            <div className={cn('text-sm font-display font-semibold text-right',
              entry.avg >= 90 ? 'text-emerald-400' : entry.avg >= 75 ? 'text-cyan-400' : 'text-amber-400')}>
              {entry.avg}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
