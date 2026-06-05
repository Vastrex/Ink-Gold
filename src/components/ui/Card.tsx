import React, { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  noPadding?: boolean;
};

export default function Card({ className = '', noPadding = false, children, ...props }: CardProps) {
  return (
    <div 
      className={`bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl shadow-xl overflow-hidden ${noPadding ? '' : 'p-6 sm:p-8'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
