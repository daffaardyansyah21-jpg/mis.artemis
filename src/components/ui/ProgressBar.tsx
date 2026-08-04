'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;       // 0–100
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'cyan' | 'green' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const colorMap: Record<string, string> = {
  primary: 'from-[#6b3fff] to-[#a855f7]',
  cyan:    'from-[#06d6f5] to-[#0ea5e9]',
  green:   'from-[#10f5a0] to-[#10b981]',
  amber:   'from-[#f59e0b] to-[#ef4444]',
  red:     'from-[#ef4444] to-[#dc2626]',
};

const sizeMap: Record<string, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2.5',
};

export default function ProgressBar({
  value,
  label,
  showValue = false,
  color = 'primary',
  size = 'md',
  className,
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-white/60">{label}</span>}
          {showValue && <span className="text-xs font-mono text-white/80">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-white/[0.06] rounded-full overflow-hidden', sizeMap[size])}>
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            colorMap[color],
            animated && 'transition-all duration-700 ease-out',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
