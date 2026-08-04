'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, School, Calendar, Mail, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: 'Daffa Farras', email: 'daffafarras.2021@student.uny.ac.id',
    school: 'Universitas Negeri Yogyakarta', year: '2025',
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function save() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    toast.success('Profil berhasil diperbarui!');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white">Profil <span className="gradient-text">Saya</span></h1>
      </motion.div>

      <div className="glass-card p-8">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/[0.06]">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-display font-bold text-white">
              {form.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-purple-500 border-2 border-[#060612] flex items-center justify-center hover:bg-purple-400 transition-colors">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{form.name}</h2>
            <p className="text-white/40 text-sm">{form.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400">💎 Proficient</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">🔥 7 hari streak</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'name', label: 'Nama Lengkap', icon: User, type: 'text' },
            { key: 'email', label: 'Email', icon: Mail, type: 'email' },
            { key: 'school', label: 'Sekolah/Universitas', icon: School, type: 'text' },
            { key: 'year', label: 'Tahun Kelulusan', icon: Calendar, type: 'number' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-white/60 mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={f.type}
                  value={(form as any)[f.key]}
                  onChange={set(f.key)}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white',
                    'bg-white/[0.04] border border-white/10',
                    'focus:outline-none focus:border-purple-500/60 transition-all',
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={save} isLoading={saving} leftIcon={<Save size={15} />}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
