'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 
              ${icon ? 'pl-12' : ''}
              bg-white/10 backdrop-blur-sm
              border border-white/20
              rounded-xl
              text-white placeholder: text-white/40
              focus:outline-none focus:border-purple-400/50 focus:ring-2 focus: ring-purple-400/20
              transition-all duration-200
              ${error ? 'border-red-400/50' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
