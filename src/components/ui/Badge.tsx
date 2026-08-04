import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'red' | 'amber' | 'rose' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

const variantMap: Record<string, string> = {
  cyan:    'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  purple:  'bg-purple-500/15 text-purple-400 border-purple-500/30',
  green:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  red:     'bg-red-500/15 text-red-400 border-red-500/30',
  amber:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  rose:    'bg-rose-500/15 text-rose-400 border-rose-500/30',
  default: 'bg-white/5 text-white/70 border-white/10',
};

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-3 py-1',
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

const difficultyMap: Record<Difficulty, { label: string; variant: string }> = {
  MUDAH:  { label: 'Mudah',  variant: 'green' },
  SEDANG: { label: 'Sedang', variant: 'amber' },
  SULIT:  { label: 'Sulit',  variant: 'red'   },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, variant } = difficultyMap[difficulty];
  return <Badge variant={variant as any}>{label}</Badge>;
}

export function FreeBadge({ isFree }: { isFree: boolean }) {
  if (isFree) return <Badge variant="cyan">Gratis</Badge>;
  return <Badge variant="purple">Premium</Badge>;
}
