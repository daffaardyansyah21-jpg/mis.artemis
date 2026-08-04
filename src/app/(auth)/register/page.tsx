'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, School, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const benefits = [
  'Akses seluruh paket latihan gratis',
  'Pantau progress belajarmu',
  'Pembahasan soal lengkap',
  'Analitik performa detail',
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', school: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Lengkapi semua kolom wajib.'); return; }
    if (form.password !== form.confirm) { toast.error('Konfirmasi kata sandi tidak cocok.'); return; }
    if (form.password.length < 8) { toast.error('Kata sandi minimal 8 karakter.'); return; }
    setLoading(true);
    // TODO: await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.name, school: form.school } } })
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    toast.success('Akun berhasil dibuat! Selamat datang di Artemis.');
    router.push('/dashboard');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Left — benefits */}
      <div className="hidden lg:flex flex-col justify-center gap-6 pr-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">
            Mulai perjalanan belajarmu
          </h2>
          <p className="text-white/50 leading-relaxed">
            Daftar gratis dan akses seluruh fitur Artemis. Tidak ada biaya tersembunyi.
          </p>
        </div>
        <div className="space-y-4">
          {benefits.map(b => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle size={18} className="text-emerald-400 shrink-0" />
              <span className="text-white/70 text-sm">{b}</span>
            </div>
          ))}
        </div>
        <div className="glass-card p-5 mt-4">
          <p className="text-white/60 text-sm italic">"Artemis membantu aku memahami pola soal TKA jauh lebih baik. Pembahasan-nya detail dan mudah dipahami."</p>
          <p className="text-white/40 text-xs mt-2">— Siswa SMA, Yogyakarta</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="glass-card p-8">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Buat Akun</h1>
          <p className="text-white/50 text-sm">Sepenuhnya gratis</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name', label: 'Nama Lengkap *', placeholder: 'Nama lengkapmu', icon: User,   type: 'text' },
            { key: 'email', label: 'Email *',        placeholder: 'nama@email.com',  icon: Mail,   type: 'email' },
            { key: 'school', label: 'Sekolah (opsional)', placeholder: 'Nama sekolahmu', icon: School, type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-white/60 mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={f.type}
                  value={(form as any)[f.key]}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30',
                    'bg-white/[0.04] border border-white/10',
                    'focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all',
                  )}
                />
              </div>
            </div>
          ))}

          {/* Password */}
          {[
            { key: 'password', label: 'Kata Sandi *', placeholder: 'Min. 8 karakter' },
            { key: 'confirm',  label: 'Konfirmasi Kata Sandi *', placeholder: 'Ulangi kata sandi' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-white/60 mb-1.5">{f.label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={(form as any)[f.key]}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                  className={cn(
                    'w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-white/30',
                    'bg-white/[0.04] border border-white/10',
                    'focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all',
                  )}
                />
                {f.key === 'password' && (
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 mt-2">
            {loading
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <>Buat Akun Gratis <ArrowRight size={16} /></>
            }
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-5">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Masuk</Link>
        </p>
      </div>
    </motion.div>
  );
}
