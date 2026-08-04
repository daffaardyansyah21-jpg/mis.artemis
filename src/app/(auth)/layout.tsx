import Link from 'next/link';
import { APP_CONFIG } from '@/lib/constants';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2.5 group mb-10">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
          <div className="absolute inset-[3px] bg-[#060612] rounded-lg rotate-45" />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-display font-bold text-cyan-400">A</span>
        </div>
        <span className="font-display font-bold text-xl text-white">{APP_CONFIG.name}</span>
      </Link>
      {children}
    </div>
  );
}
