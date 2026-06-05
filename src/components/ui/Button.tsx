import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
};

export default function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-[0.1em] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none rounded-2xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-background shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 focus:ring-gold-500',
    secondary: 'bg-surface text-foreground border border-surface-border shadow-sm hover:bg-surface-hover hover:-translate-y-0.5 focus:ring-surface-border',
    outline: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-background focus:ring-gold-500',
    ghost: 'text-muted hover:text-foreground hover:bg-surface focus:ring-surface',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
