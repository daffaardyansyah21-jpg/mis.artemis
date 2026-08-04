'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export default function LoginPage() {
  const router = useRouter();
  const [email,   setEmail]   = useState('');
  const [password, setPassword] = useState('');
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { toast.error('Isi semua kolom terlebih dahulu.'); return; }
    setLoading(true);
    // TODO: integrate with Supabase Auth
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    await new Promise(r => setTimeout(r, 1200)); // simulasi
    setLoading(false);
    toast.success('Selamat datang kembali!');
    router.push('/dashboard');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-white mb-2">Selamat Datang</h1>
          <p className="text-white/50 text-sm">Masuk untuk melanjutkan belajar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={cn(
                  'w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30',
                  'bg-white/[0.04] border border-white/10',
                  'focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06]',
                  'transition-all duration-200',
                )}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-white/60">Kata Sandi</label>
              <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Lupa sandi?</Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  'w-full pl-11 pr-12 py-3 rounded-xl text-sm text-white placeholder-white/30',
                  'bg-white/[0.04] border border-white/10',
                  'focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06]',
                  'transition-all duration-200',
                )}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 mt-2"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <>Masuk <ArrowRight size={16} /></>
            }
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-white/20 mt-6 max-w-sm mx-auto">
        Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi Artemis.
      </p>
    </motion.div>
  );
}
