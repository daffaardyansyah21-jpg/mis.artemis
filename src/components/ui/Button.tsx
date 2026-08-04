'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'relative overflow-hidden bg-gradient-to-r from-[#6b3fff] to-[#a855f7] text-white border border-purple-500/30 ' +
    'hover:shadow-neon-purple hover:border-purple-400/60 active:scale-[0.98]',
  secondary:
    'bg-transparent text-cyan-400 border border-cyan-500/40 ' +
    'hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-neon-cyan active:scale-[0.98]',
  ghost:
    'bg-transparent text-white/70 border border-white/10 ' +
    'hover:bg-white/5 hover:text-white hover:border-white/20 active:scale-[0.98]',
  danger:
    'bg-red-500/20 text-red-400 border border-red-500/30 ' +
    'hover:bg-red-500/30 hover:border-red-400 active:scale-[0.98]',
  success:
    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 ' +
    'hover:bg-emerald-500/30 hover:border-emerald-400 active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-7 py-3 rounded-xl gap-2.5',
  xl: 'text-lg px-9 py-4 rounded-2xl gap-3',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-semibold font-body',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span className="relative z-10">{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
