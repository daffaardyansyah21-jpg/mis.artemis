'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Eye, Shield, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative w-11 h-6 rounded-full transition-all duration-300 border',
        checked ? 'bg-purple-500/50 border-purple-500/60' : 'bg-white/[0.06] border-white/10',
      )}
    >
      <span className={cn(
        'absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center',
        checked ? 'translate-x-5 bg-purple-400' : 'bg-white/30',
      )} />
    </button>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true, sound: false, darkMode: true,
    autoSubmit: true, showExplanation: true, showTimer: true,
  });
  const toggle = (k: string) => setSettings(s => ({ ...s, [k]: !(s as any)[k] }));

  const groups = [
    {
      title: 'Notifikasi', icon: Bell, items: [
        { key: 'notifications', label: 'Notifikasi Pengingat Belajar', desc: 'Terima pengingat harian untuk belajar' },
        { key: 'sound', label: 'Efek Suara', desc: 'Aktifkan efek suara saat menjawab soal' },
      ],
    },
    {
      title: 'Tampilan', icon: Eye, items: [
        { key: 'showTimer', label: 'Tampilkan Timer', desc: 'Tampilkan countdown waktu saat ujian' },
        { key: 'showExplanation', label: 'Pembahasan Otomatis', desc: 'Tampilkan pembahasan langsung setelah review' },
      ],
    },
    {
      title: 'Ujian', icon: Shield, items: [
        { key: 'autoSubmit', label: 'Submit Otomatis', desc: 'Otomatis kirim jawaban saat waktu habis' },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Pengaturan</h1>
      </motion.div>

      <div className="space-y-6">
        {groups.map(g => (
          <motion.div key={g.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
            <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
              <g.icon size={16} className="text-purple-400" /> {g.title}
            </h2>
            <div className="space-y-4">
              {g.items.map(item => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/80">{item.label}</p>
                    <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={(settings as any)[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 border border-red-500/20">
          <h2 className="font-semibold text-red-400 mb-4 flex items-center gap-2"><Trash2 size={16} /> Zona Bahaya</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Hapus Semua Data Sesi</p>
              <p className="text-xs text-white/40 mt-0.5">Hapus seluruh riwayat belajar dan skor (tidak dapat dipulihkan)</p>
            </div>
            <button onClick={() => toast.error('Fitur ini akan memerlukan konfirmasi email.')}
              className="px-4 py-2 text-xs font-medium text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-colors">
              Hapus Data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
