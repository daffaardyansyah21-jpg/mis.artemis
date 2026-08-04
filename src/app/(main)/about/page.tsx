'use client';

import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, Shield, Mail, Github } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl rotate-45" />
          <div className="absolute inset-[4px] bg-[#060612] rounded-xl rotate-45" />
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-display font-bold gradient-text">A</span>
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-3">
          Tentang <span className="gradient-text">Artemis</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          Platform latihan soal TKA dan UTBK/SNBT yang dibangun untuk semua siswa SMA di Indonesia — tanpa syarat, tanpa biaya.
        </p>
      </motion.div>

      {/* Mission */}
      <div className="glass-card p-8 mb-8">
        <h2 className="text-xl font-display font-bold text-white mb-4">Misi Kami</h2>
        <p className="text-white/60 leading-relaxed">
          Artemis lahir dari keyakinan bahwa setiap siswa berhak mendapatkan akses ke latihan berkualitas tinggi, terlepas dari latar belakang ekonomi. Kami membangun platform ini dengan fokus pada kualitas soal, kedalaman pembahasan, dan kemudahan penggunaan — setara dengan platform edtech berbayar, namun sepenuhnya gratis.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {[
          { icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', title: 'Berbasis Kurikulum Resmi', desc: 'Semua konten mengacu pada pedoman TKA (BSKAP No. 045/H/AN/2025) dan struktur UTBK/SNBT 2026 yang ditetapkan SNPMB.' },
          { icon: Target,   color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', title: 'Transparan', desc: 'Sistem penilaian Artemis adalah simulasi edukatif. Kami tidak pernah mengklaim bahwa skor di platform ini setara dengan nilai resmi TKA atau UTBK.' },
          { icon: Zap,      color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Performa Tinggi', desc: 'Dibangun dengan Next.js 14, TypeScript, dan Supabase — memastikan pengalaman yang cepat dan andal untuk ribuan pengguna bersamaan.' },
          { icon: Shield,   color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Privasi Pengguna', desc: 'Data belajarmu hanya digunakan untuk meningkatkan pengalaman personalisasimu. Tidak dijual ke pihak ketiga.' },
        ].map(v => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${v.bg}`}>
              <v.icon size={20} className={v.color} />
            </div>
            <h3 className="font-semibold text-white mb-2">{v.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer box */}
      <div className="glass-card p-6 border border-amber-500/20 mb-8">
        <h3 className="font-semibold text-amber-400 mb-3">⚠️ Disclaimer Penting</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          Artemis adalah platform simulasi edukasi mandiri dan <strong>tidak berafiliasi dengan</strong> Kemendikdasmen, BSKAP, SNPMB, atau lembaga pemerintah lainnya. Struktur soal dan konten mengacu pada dokumen publik yang tersedia. Skor yang dihasilkan oleh Artemis <strong>tidak merepresentasikan nilai resmi TKA atau UTBK/SNBT</strong> dan dimaksudkan semata-mata sebagai alat evaluasi belajar mandiri.
        </p>
      </div>

      {/* Contact */}
      <div className="glass-card p-8 text-center" id="contact">
        <h2 className="text-xl font-display font-bold text-white mb-4">Hubungi Kami</h2>
        <p className="text-white/50 text-sm mb-6">Ada pertanyaan, saran, atau ingin berkontribusi soal? Kami senang mendengar dari Anda.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`mailto:${APP_CONFIG.contact_email}`} className="btn-secondary inline-flex items-center gap-2 !py-2.5 !px-6">
            <Mail size={16} /> {APP_CONFIG.contact_email}
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2 !py-2.5 !px-6">
            <Github size={16} /> GitHub (Open Source)
          </a>
        </div>
      </div>
    </div>
  );
}
