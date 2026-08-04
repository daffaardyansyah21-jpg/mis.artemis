'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, ChevronDown, User, Settings, LogOut, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tka',       label: 'TKA' },
  { href: '/utbk',      label: 'UTBK/SNBT' },
  { href: '/statistics', label: 'Statistik' },
  { href: '/leaderboard', label: 'Peringkat' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
              <div className="absolute inset-[3px] bg-[#060612] rounded-md rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-display font-bold text-cyan-400">A</span>
            </div>
            <span className="font-display font-bold text-lg text-white hidden sm:block">
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f50596] rounded-full border-2 border-[#060612]" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-white/10 hover:border-white/20 transition-all text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                  D
                </div>
                <span className="hidden sm:block text-white/80 font-medium">Daffa</span>
                <ChevronDown size={14} className={cn('text-white/40 transition-transform', profileOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-2xl border border-white/10 overflow-hidden shadow-xl"
                  >
                    {[
                      { href: '/profile', icon: User, label: 'Profil Saya' },
                      { href: '/statistics', icon: BarChart3, label: 'Statistik' },
                      { href: '/settings', icon: Settings, label: 'Pengaturan' },
                    ].map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <item.icon size={16} className="shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-1">
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LogOut size={16} className="shrink-0" />
                        Keluar
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(p => !p)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/[0.06] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
