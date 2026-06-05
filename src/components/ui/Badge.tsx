import React from 'react';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: 'gold' | 'muted' | 'outline';
  className?: string;
};

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider';
  
  const variants = {
    gold: 'bg-gold-500/10 text-gold-500 border border-gold-500/20',
    muted: 'bg-surface-hover text-muted border border-surface-border',
    outline: 'bg-transparent text-foreground border border-surface-border',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
