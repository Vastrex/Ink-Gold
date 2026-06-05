import React, { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="text-xs font-semibold tracking-wider uppercase text-muted mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-surface-hover/50 border ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-surface-border focus:border-gold-500 focus:ring-gold-500'} text-foreground placeholder:text-muted/50 rounded-2xl px-4 py-3 transition-all focus:outline-none focus:ring-1 focus:bg-surface-hover ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
